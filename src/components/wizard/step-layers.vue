<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.layers.title') }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t('wizard.layers.description') }}</p>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.layers.add') }}</h4>

            <div class="mt-4 grid gap-2">
                <label class="text-sm font-medium text-gray-900">{{ t('wizard.layers.source') }}*</label>
                <p class="mt-1 text-xs text-gray-500">{{ t('wizard.layers.source.description') }}</p>
                <input
                    v-model="draft.url"
                    class="w-full rounded-lg border px-3 py-2 text-sm outline-none transition"
                    :class="valid ? 'border-gray-300 focus:border-gray-400' : 'border-red-300 focus:border-red-400'"
                    @input="onUrlInput"
                />
            </div>

            <div class="mt-4 grid gap-4">
                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">{{ t('wizard.layers.name') }}*</label>
                    <input
                        v-model="draft.name"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>

                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">{{ t('wizard.layers.type') }}*</label>
                    <select
                        v-model="draft.selectedType"
                        :disabled="!availableLayerTypes.length"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    >
                        <option disabled value="">{{ t('wizard.layers.selectType') }}</option>
                        <option v-for="t in availableLayerTypes" :key="t" :value="t">
                            {{ formatLayerType(t) }}
                        </option>
                    </select>
                </div>
            </div>

            <div
                v-if="draft.errorMessage"
                class="mt-4 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800"
            >
                {{ draft.errorMessage }}
            </div>

            <div class="mt-4 flex justify-end">
                <button
                    type="button"
                    class="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                    @click="addLayer"
                >
                    + {{ t('wizard.layers.addLayer') }}
                </button>
            </div>
        </div>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.layers.inMap') }} ({{ layers.length }})</h4>

            <div v-if="!layers.length" class="mt-3 text-sm text-gray-500">
                {{ t('wizard.layers.none') }}
            </div>

            <draggable
                v-else
                class="mt-3 grid gap-2"
                item-key="id"
                handle=".drag-handle"
                :model-value="sortedLayers"
                @update:modelValue="updateSortedLayers"
            >
                <template #item="{ element: l, index }">
                    <div class="rounded-lg border border-gray-200 bg-white">
                        <div class="flex items-center gap-3 p-3 shadow-sm">
                            <div
                                class="drag-handle flex cursor-grab active:cursor-grabbing items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-sm text-gray-500"
                                :title="t('wizard.layers.reorder')"
                            >
                                ☰
                            </div>

                            <div class="min-w-0 flex-1">
                                <div class="truncate text-sm font-semibold text-gray-900">
                                    {{ index + 1 }}. {{ l.name }}
                                </div>
                                <div class="mt-0.5 text-xs text-gray-500">
                                    {{ formatLayerType(l.selectedType) }}
                                    <span>{{ l.url }}</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <button
                                    type="button"
                                    class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                    @click="startEditLayer(l)"
                                >
                                    {{ t('wizard.layers.edit') }}
                                </button>

                                <button
                                    type="button"
                                    class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                    @click="removeLayer(l.id)"
                                >
                                    {{ t('wizard.layers.remove') }}
                                </button>
                            </div>
                        </div>

                        <div v-if="expandedLayerId === l.id" class="border-t border-gray-200 bg-gray-50 p-4">
                            <div class="grid gap-4">
                                <div class="grid gap-2">
                                    <label class="text-sm font-medium text-gray-900">Layer name</label>
                                    <input
                                        v-model="editDraft.name"
                                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                                    />
                                </div>

                                <div class="grid gap-2">
                                    <label class="text-sm font-medium text-gray-900">{{
                                        t('wizard.layers.source')
                                    }}</label>
                                    <div
                                        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600"
                                    >
                                        <span>{{ l.url }}</span>
                                    </div>
                                </div>

                                <div class="grid gap-2">
                                    <label class="text-sm font-medium text-gray-900">{{
                                        t('wizard.layers.type')
                                    }}</label>
                                    <div
                                        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600"
                                    >
                                        {{ formatLayerType(l.selectedType) }}
                                    </div>
                                </div>

                                <div class="rounded-xl border border-gray-200 bg-white p-4">
                                    <button
                                        type="button"
                                        class="flex w-full items-center justify-between text-left"
                                        @click="editDraft.showAdvanced = !editDraft.showAdvanced"
                                    >
                                        <span class="text-sm font-medium text-gray-900">{{
                                            t('wizard.layers.advanced.settings')
                                        }}</span>
                                        <span class="text-xs text-gray-500">
                                            {{
                                                editDraft.showAdvanced
                                                    ? t('wizard.layers.hide')
                                                    : t('wizard.layers.show')
                                            }}
                                        </span>
                                    </button>

                                    <div v-if="editDraft.showAdvanced" class="mt-4 space-y-4">
                                        <div>
                                            <h5 class="text-sm font-medium text-gray-900">
                                                {{ t('wizard.layers.advanced.metadata') }}
                                            </h5>
                                            <p class="mt-1 text-xs text-gray-500">
                                                {{ t('wizard.layers.advanced.metadata.configure') }}
                                            </p>
                                            <div
                                                class="mt-3 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500"
                                            >
                                                TODO
                                            </div>
                                        </div>

                                        <div>
                                            <h5 class="text-sm font-medium text-gray-900">
                                                {{ t('wizard.layers.advanced.grid.cols') }}
                                            </h5>
                                            <p class="mt-1 text-xs text-gray-500">
                                                {{ t('wizard.layers.advanced.grid.cols.configure') }}
                                            </p>
                                            <div
                                                class="mt-3 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500"
                                            >
                                                TODO
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                        @click="cancelEditLayer"
                                    >
                                        {{ t('wizard.layers.cancel') }}
                                    </button>

                                    <button
                                        type="button"
                                        class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                                        @click="saveEditLayer"
                                    >
                                        {{ t('wizard.layers.save') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>

        <ErrorList :errors="errors" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

import draggable from 'vuedraggable';
import ErrorList from './error-list.vue';

defineProps<{ errors: any[] }>();

const { t } = useI18n();
const store = useStore();

const createDraft = () => ({
    url: '',
    name: '',
    detectedTypes: [] as string[],
    selectedType: '',
    errorMessage: ''
});
const draft = reactive(createDraft());
const valid = ref(true);
const expandedLayerId = ref<string | null>(null);

const layerTypeLabels: Record<string, string> = {
    'file-geojson': 'GeoJSON',
    'file-shape': 'Zipped Shapefile',
    'file-csv': 'CSV',
    'esri-feature': 'ESRI Feature Layer',
    'esri-map-image': 'ESRI Map Image Layer',
    'esri-tile': 'ESRI Tile Layer',
    'esri-imagery': 'ESRI Imagery Layer',
    'ogc-wms': 'OGC Web Map Service',
    'ogc-wfs': 'OGC Web Feature Service'
};

const editDraft = reactive({
    id: null as string | null,
    name: '',
    showAdvanced: false as boolean
});

const layers = computed({
    get: () => {
        if (!store.elc.layers) {
            store.elc.layers = [];
        }
        return store.elc.layers;
    },
    set: value => {
        store.elc.layers = value;
    }
});

const sortedLayers = computed(() => [...layers.value]);
const formatLayerType = (type: string) => layerTypeLabels[type] ?? type;
const availableLayerTypes = computed(() => draft.detectedTypes);

const toLayerId = (name: string) => {
    return name.trim().replace(/\s+/g, '');
};

const updateSortedLayers = (nextLayers: any[]) => {
    layers.value = [...nextLayers];
};

const startEditLayer = (layer: any) => {
    expandedLayerId.value = layer.id;

    Object.assign(editDraft, {
        id: layer.id,
        name: layer.name ?? ''
    });
};

const cancelEditLayer = () => {
    expandedLayerId.value = null;

    Object.assign(editDraft, {
        id: null,
        name: ''
    });
};

const saveEditLayer = () => {
    if (!editDraft.id) return;

    const trimmedName = editDraft.name.trim();
    if (!trimmedName) return;

    const nextId = toLayerId(trimmedName);

    layers.value = layers.value.map((layer: any) =>
        layer.id === editDraft.id
            ? {
                  ...layer,
                  id: nextId,
                  name: trimmedName
              }
            : layer
    );

    cancelEditLayer();
};

const validUrl = (url: string) => {
    try {
        const newUrl = new URL(url);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch {
        return false;
    }
};

const onUrlInput = () => {
    draft.selectedType = '';
    draft.detectedTypes = [];
    draft.errorMessage = '';

    if (!draft.url.trim()) {
        valid.value = true;
        return;
    }

    valid.value = validUrl(draft.url);

    if (!valid.value) {
        draft.errorMessage = 'Please enter a valid HTTP or HTTPS URL.';
        return;
    }

    runDetection();
};

const runDetection = () => {
    draft.errorMessage = '';

    if (!validUrl(draft.url)) {
        valid.value = false;
        draft.detectedTypes = [];
        draft.selectedType = '';
        draft.errorMessage = 'Please enter a valid HTTP or HTTPS URL.';
        return;
    }

    valid.value = true;
    let possible: string[] = [];

    try {
        const parsed = new URL(draft.url);
        const path = parsed.pathname.toLowerCase();
        if (path.endsWith('.geojson') || path.endsWith('.json')) {
            possible = ['file-geojson'];
        } else if (path.endsWith('.zip')) {
            possible = ['file-shape'];
        } else if (path.endsWith('.csv')) {
            possible = ['file-csv'];
        } else {
            possible = ['esri-feature', 'esri-map-image', 'esri-tile', 'esri-imagery', 'ogc-wms', 'ogc-wfs'];
        }
    } catch {
        possible = [];
    }

    draft.detectedTypes = possible;

    if (!possible.includes(draft.selectedType)) {
        draft.selectedType = possible.length === 1 ? possible[0] : '';
    }

    if (!possible.length && draft.url.trim()) {
        draft.errorMessage = 'Could not detect a supported layer type.';
    }
};

const addLayer = () => {
    draft.errorMessage = '';

    if (!draft.name.trim()) {
        draft.errorMessage = 'Please provide a layer name.';
        return;
    }

    if (!draft.selectedType) {
        draft.errorMessage = 'Please select a layer type.';
        return;
    }

    const trimmedName = draft.name.trim();
    const layer = {
        id: toLayerId(trimmedName),
        name: trimmedName,
        layerType: draft.selectedType as any,
        url: draft.url.trim()
    };

    layers.value = [...layers.value, layer];
    resetDraft();
};

const resetDraft = () => {
    Object.assign(draft, createDraft());
    valid.value = true;
};

const removeLayer = (id: string) => {
    layers.value = layers.value.filter((layer: any) => layer.id !== id);
};
</script>
