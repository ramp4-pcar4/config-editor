<template>
    <div class="preview-panel" :aria-busy="isBusy">
        <div ref="rampInstance" class="preview-map"></div>
        <div class="preview-footer">
            <p class="preview-note">
                <span>{{ t('preview.note') }}</span> {{ t('preview.warning') }}
            </p>
            <div class="preview-actions">
                <span
                    v-if="statusMessage"
                    class="preview-status"
                    :class="{ 'preview-status--error': previewStatus === 'error' }"
                    :title="previewError || undefined"
                    aria-live="polite"
                >
                    {{ statusMessage }}
                </span>
                <button type="button" class="preview-restart" :disabled="isBusy" @click="manuallyRestartPreview">
                    {{ t('preview.restart') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// does the ramp previewer of the config we're editing

// @ts-ignore
import { createInstance } from 'ramp-pcar';
import { useStore } from '@/store';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    refreshRequest: {
        type: Number,
        default: 0
    }
});

const rampInstance = ref<HTMLDivElement>();
const store = useStore();
const { t, locale } = useI18n();
let rampApi: any;
let updateTimer: ReturnType<typeof setTimeout> | undefined;
let statusTimer: ReturnType<typeof setTimeout> | undefined;
let operationId = 0;
let disposed = false;
let pendingUpdate: PreviewUpdate = 'reload';
let rampResizeObservers: ResizeObserver[] = [];

type PreviewUpdate = 'reload' | 'restart';
type PreviewStatus = 'idle' | 'updating' | 'restarting' | 'updated' | 'error';

const previewStatus = ref<PreviewStatus>('idle');
const previewError = ref('');
const isBusy = computed(() => ['updating', 'restarting'].includes(previewStatus.value));
const statusMessage = computed(() => {
    if (previewStatus.value === 'idle') {
        return '';
    }

    return t(`preview.${previewStatus.value}`);
});

const cloneJson = <T,>(value: T): T => {
    if (value === undefined || value === null) {
        return value;
    }

    return JSON.parse(JSON.stringify(value)) as T;
};

const previewConfigs = () => {
    if (!store.elc) {
        return cloneJson(store.configs);
    }

    // The language toggle changes presentation language, not the map being edited.
    // Give RAMP the active map config for both locales so setLanguage cannot swap
    // basemaps, layers, extents, or other structural settings. Each locale gets
    // an isolated snapshot so RAMP cannot mutate the editor or the other locale.
    return {
        en: cloneJson(store.elc),
        fr: cloneJson(store.elc)
    };
};

const previewConfig = () => ({
    startingFixtures: cloneJson(store.startingFixtures),
    configs: previewConfigs()
});

const setPreviewLanguage = () => {
    if (rampApi && locale.value && rampApi.language !== locale.value) {
        rampApi.setLanguage(locale.value);
    }
};

const clearUpdateTimer = () => {
    if (updateTimer) {
        clearTimeout(updateTimer);
        updateTimer = undefined;
    }
};

const clearStatusTimer = () => {
    if (statusTimer) {
        clearTimeout(statusTimer);
        statusTimer = undefined;
    }
};

const markPreviewUpdated = (currentOperation: number) => {
    if (disposed || currentOperation !== operationId) {
        return;
    }

    previewStatus.value = 'updated';
    clearStatusTimer();
    statusTimer = setTimeout(() => {
        if (currentOperation === operationId) {
            previewStatus.value = 'idle';
        }
    }, 1500);
};

const markPreviewError = (error: unknown, currentOperation: number) => {
    if (disposed || currentOperation !== operationId) {
        return;
    }

    previewError.value = error instanceof Error ? error.message : String(error);
    previewStatus.value = 'error';
};

const destroyPreview = () => {
    rampResizeObservers.forEach(observer => observer.disconnect());
    rampResizeObservers = [];

    try {
        rampApi?.$element?.unmount();
    } finally {
        rampApi = undefined;
    }
};

const createPreviewInstance = () => {
    const NativeResizeObserver = window.ResizeObserver;
    const observers: ResizeObserver[] = [];

    class TrackedResizeObserver {
        private readonly observer: ResizeObserver;

        constructor(callback: ResizeObserverCallback) {
            this.observer = new NativeResizeObserver(callback);
            observers.push(this.observer);
        }

        observe(target: Element, options?: ResizeObserverOptions) {
            this.observer.observe(target, options);
        }

        unobserve(target: Element) {
            this.observer.unobserve(target);
        }

        disconnect() {
            this.observer.disconnect();
        }
    }

    rampResizeObservers = observers;
    window.ResizeObserver = TrackedResizeObserver as unknown as typeof ResizeObserver;
    try {
        return createInstance(rampInstance.value, previewConfig(), cloneJson(store.options));
    } finally {
        window.ResizeObserver = NativeResizeObserver;
    }
};

const waitForPreviewMap = async () => {
    const viewPromise = rampApi?.geo?.map?.viewPromise;
    if (viewPromise && typeof viewPromise.then === 'function') {
        await viewPromise;
    }
};

const recreatePreview = async () => {
    clearUpdateTimer();
    clearStatusTimer();
    pendingUpdate = 'reload';

    const currentOperation = ++operationId;
    previewStatus.value = 'restarting';
    previewError.value = '';

    try {
        destroyPreview();
        await nextTick();

        if (disposed || currentOperation !== operationId || !rampInstance.value) {
            return;
        }

        rampApi = createPreviewInstance();
        setPreviewLanguage();
        await waitForPreviewMap();
        markPreviewUpdated(currentOperation);
    } catch (error) {
        markPreviewError(error, currentOperation);
    }
};

const reloadPreview = () => {
    clearUpdateTimer();
    pendingUpdate = 'reload';

    if (!rampApi) {
        void recreatePreview();
        return;
    }

    const currentOperation = ++operationId;
    previewStatus.value = 'updating';
    previewError.value = '';

    try {
        rampApi.reload(previewConfig(), cloneJson(store.options));
        setPreviewLanguage();
        markPreviewUpdated(currentOperation);
    } catch (error) {
        markPreviewError(error, currentOperation);
    }
};

const runScheduledUpdate = () => {
    updateTimer = undefined;
    const update = pendingUpdate;
    pendingUpdate = 'reload';

    if (update === 'restart') {
        void recreatePreview();
    } else {
        reloadPreview();
    }
};

const schedulePreviewUpdate = (update: PreviewUpdate) => {
    if (update === 'restart') {
        pendingUpdate = 'restart';
    }

    operationId++;
    clearUpdateTimer();
    clearStatusTimer();
    previewStatus.value = pendingUpdate === 'restart' ? 'restarting' : 'updating';
    previewError.value = '';
    updateTimer = setTimeout(runScheduledUpdate, 600);
};

const restartTriggers = () => {
    const config = store.elc as any;
    const map = config?.map;

    return {
        startingFixtures: store.startingFixtures,
        options: store.options,
        fixtureKeys: Object.keys(config?.fixtures ?? {}).sort(),
        overviewMapStartMinimized: config?.fixtures?.overviewmap?.startMinimized,
        mapStructure: {
            initialBasemapId: map?.initialBasemapId,
            tileSchemas: map?.tileSchemas,
            extentSets: map?.extentSets,
            lodSets: map?.lodSets,
            basemapSchemas: map?.basemaps?.map((basemap: any) => ({
                id: basemap.id,
                tileSchemaId: basemap.tileSchemaId
            }))
        }
    };
};

const manuallyRestartPreview = () => {
    void recreatePreview();
};

onMounted(() => {
    void recreatePreview();
});

watch(
    () => store.elc,
    () => schedulePreviewUpdate('reload'),
    { deep: true }
);

watch(restartTriggers, () => schedulePreviewUpdate('restart'), { deep: true });
watch(locale, setPreviewLanguage);
watch(() => props.refreshRequest, manuallyRestartPreview);

onBeforeUnmount(() => {
    disposed = true;
    operationId++;
    clearUpdateTimer();
    clearStatusTimer();
    destroyPreview();
});
</script>

<style lang="scss" scoped>
.preview-panel {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
}

.preview-map {
    min-height: 0;
    flex: 1 1 auto;
    border: 2px solid #000;
}

.preview-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;
}

.preview-note {
    min-width: 0;
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;

    span {
        color: #111827;
        font-weight: 600;
    }
}

.preview-actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
}

.preview-status {
    color: #4b5563;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
}

.preview-status--error {
    color: #b91c1c;
}

.preview-restart {
    min-height: 32px;
    border: 1px solid #c9d3df;
    border-radius: 4px;
    padding: 6px 9px;
    background: #fff;
    color: var(--editor-primary);
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    outline: none;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
        border-color: var(--editor-primary);
        background: #eef2f6;
    }

    &:disabled {
        cursor: wait;
        opacity: 0.6;
    }
}

@media (max-width: 1100px) {
    .preview-footer {
        align-items: flex-start;
        flex-direction: column;
    }

    .preview-actions {
        width: 100%;
        justify-content: flex-end;
    }
}
</style>
