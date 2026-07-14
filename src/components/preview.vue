<template>
    <div class="preview-panel">
        <div ref="rampInstance" class="preview-map"></div>
        <p class="preview-note">
            <span>{{ t('preview.note') }}</span> {{ t('preview.warning') }}
        </p>
    </div>
</template>

<script setup lang="ts">
// does the ramp previewer of the config we're editing

// @ts-ignore
import { createInstance } from 'ramp-pcar';
import { useStore } from '@/store';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
let reloadTimer: ReturnType<typeof setTimeout> | undefined;

const previewConfigs = () => {
    if (!store.elc) {
        return store.configs;
    }

    // The language toggle changes presentation language, not the map being edited.
    // Give RAMP the active map config for both locales so setLanguage cannot swap
    // basemaps, layers, extents, or other structural settings.
    return {
        en: store.elc,
        fr: store.elc
    };
};

const setPreviewLanguage = () => {
    if (rampApi && locale.value && rampApi.language !== locale.value) {
        rampApi.setLanguage(locale.value);
    }
};

const reloadPreview = () => {
    if (reloadTimer) {
        clearTimeout(reloadTimer);
        reloadTimer = undefined;
    }

    if (!rampApi) {
        return;
    }

    rampApi.reload({ startingFixtures: store.startingFixtures, configs: previewConfigs() }, store.options);
    setPreviewLanguage();
};

const schedulePreviewReload = () => {
    if (reloadTimer) {
        clearTimeout(reloadTimer);
    }

    reloadTimer = setTimeout(reloadPreview, 600);
};

onMounted(() => {
    rampApi = createInstance(
        rampInstance.value!,
        { startingFixtures: store.startingFixtures, configs: previewConfigs() },
        store.options
    );
    setPreviewLanguage();
});

watch(
    () => [store.startingFixtures, store.elc, store.options],
    schedulePreviewReload,
    { deep: true }
);

watch(locale, setPreviewLanguage);
watch(() => props.refreshRequest, reloadPreview);

onBeforeUnmount(() => {
    if (reloadTimer) {
        clearTimeout(reloadTimer);
    }

    rampApi?.$element?.unmount();
    rampApi = undefined;
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

.preview-note {
    margin: 12px 0 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;

    span {
        color: #111827;
        font-weight: 600;
    }
}
</style>
