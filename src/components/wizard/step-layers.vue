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
                    {{ loadingLayerMetadata ? `${t('wizard.layers.loading')}...` : `+ ${t('wizard.layers.addLayer')}` }}
                </button>
            </div>
        </div>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.layers.count') }} ({{ layers.length }})</h4>

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
                                    <label class="text-sm font-medium text-gray-900">{{
                                        t('wizard.layers.name')
                                    }}</label>
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
                                        {{ formatLayerType(l.layerType) }}
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

                                    <div
                                        v-if="editDraft.showAdvanced"
                                        class="mt-4 space-y-4 max-h-[420px] overflow-y-auto pr-1"
                                    >
                                        <div>
                                            <h5 class="text-sm font-medium text-gray-900">
                                                {{ t('wizard.layers.advanced.metadata') }}
                                            </h5>
                                            <p class="mt-1 text-xs text-gray-500">
                                                {{ t('wizard.layers.advanced.metadata.configure') }}
                                            </p>
                                            <div
                                                v-if="!editDraft.fieldInfo.length"
                                                class="mt-3 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500"
                                            >
                                                {{ t('wizard.layers.advanced.metadata.none') }}
                                            </div>

                                            <div v-else class="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                                <div
                                                    v-for="field in editDraft.fieldInfo"
                                                    :key="field.name"
                                                    class="rounded-lg border border-gray-200 bg-white p-3"
                                                >
                                                    <div class="truncate text-xs font-semibold text-gray-900">
                                                        {{ field.name }}
                                                    </div>

                                                    <label class="mt-2 block text-[11px] text-gray-500">
                                                        {{ t('wizard.layers.advanced.metadata.alias') }}
                                                    </label>
                                                    <input
                                                        v-model="field.alias"
                                                        class="mt-1 w-full rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none transition focus:border-gray-400"
                                                    />
                                                </div>
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
                                                v-if="!editDraft.gridColumns.length"
                                                class="mt-3 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500"
                                            >
                                                {{ t('wizard.layers.advanced.grid.cols.none') }}
                                            </div>

                                            <div v-else class="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                                <div
                                                    v-for="column in editDraft.gridColumns"
                                                    :key="column.field"
                                                    class="rounded-lg border border-gray-200 bg-white p-3"
                                                >
                                                    <div class="truncate text-xs font-semibold text-gray-900">
                                                        {{ column.field }}
                                                    </div>

                                                    <label class="mt-2 block text-[11px] text-gray-500">
                                                        {{ t('wizard.layers.advanced.grid.cols.title') }}
                                                    </label>
                                                    <input
                                                        v-model="column.title"
                                                        class="mt-1 w-full rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none transition focus:border-gray-400"
                                                    />

                                                    <label
                                                        class="mt-3 inline-flex items-center gap-2 text-xs text-gray-700"
                                                    >
                                                        <input
                                                            v-model="column.visible"
                                                            type="checkbox"
                                                            class="h-4 w-4 rounded border-gray-300"
                                                        />
                                                        {{ t('wizard.layers.advanced.grid.cols.visible') }}
                                                    </label>
                                                </div>
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

        <div class="mt-4">
            <LegendPreview :layers="layers" />
        </div>

        <ErrorList :errors="errors" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { RampLayerConfig, RampLayerFieldInfoConfig } from '@/definitions';

import axios from 'redaxios';
import LegendPreview from './legend-preview.vue';
import draggable from 'vuedraggable';
import ErrorList from './error-list.vue';

defineProps<{ errors: any[] }>();

const { t } = useI18n();
const store = useStore();

interface LayerGridColumn {
    field: string;
    title: string;
    visible?: boolean;
}

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

const loadingLayerMetadata = ref(false);

const editDraft = reactive({
    id: null as string | null,
    name: '',
    showAdvanced: false as boolean,
    fieldInfo: [] as RampLayerFieldInfoConfig[],
    gridColumns: [] as LayerGridColumn[]
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
    updateLegend();
};

const startEditLayer = (layer: any) => {
    expandedLayerId.value = layer.id;

    Object.assign(editDraft, {
        id: layer.id,
        name: layer.name ?? '',
        showAdvanced: false,
        fieldInfo: [...(layer.fieldMetadata?.fieldInfo ?? [])],
        gridColumns: [...(layer.fixtures?.grid?.columns ?? [])]
    });
};

const cancelEditLayer = () => {
    expandedLayerId.value = null;

    Object.assign(editDraft, {
        id: null,
        name: '',
        showAdvanced: false,
        fieldInfo: [],
        gridColumns: []
    });
};

const saveEditLayer = () => {
    if (!editDraft.id) return;

    const trimmedName = editDraft.name.trim();
    if (!trimmedName) return;

    const nextId = toLayerId(trimmedName);
    const normalizedFieldInfo = editDraft.fieldInfo.filter(field => field.alias && field.alias !== field.name);
    const normalizedGridColumns = editDraft.gridColumns.filter(
        column => column.title !== column.field || column.visible === false
    );

    layers.value = layers.value.map((layer: any) =>
        layer.id === editDraft.id
            ? {
                  ...layer,
                  id: nextId,
                  name: trimmedName,
                  ...(normalizedFieldInfo.length
                      ? {
                            fieldMetadata: {
                                fieldInfo: normalizedFieldInfo
                            }
                        }
                      : {}),
                  ...(normalizedGridColumns.length
                      ? {
                            fixtures: {
                                ...layer.fixtures,
                                grid: {
                                    ...layer.fixtures?.grid,
                                    columns: normalizedGridColumns
                                }
                            }
                        }
                      : {})
              }
            : layer
    );

    console.log('added draft layer: ', editDraft, layers);

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

const addLayer = async () => {
    draft.errorMessage = '';

    if (!draft.url.trim()) {
        draft.errorMessage = 'Please provide a source URL.';
        return;
    }

    if (!validUrl(draft.url)) {
        draft.errorMessage = 'Please enter a valid HTTP or HTTPS URL.';
        return;
    }

    if (!draft.name.trim()) {
        draft.errorMessage = 'Please provide a layer name.';
        return;
    }

    if (!draft.selectedType) {
        draft.errorMessage = 'Please select a layer type.';
        return;
    }

    const trimmedName = draft.name.trim();
    const trimmedUrl = draft.url.trim();

    let fieldInfo: RampLayerFieldInfoConfig[] = [];
    let gridColumns: LayerGridColumn[] = [];

    try {
        if (draft.selectedType === 'esri-feature') {
            const fields = await fetchFeatureLayerFields(trimmedUrl);

            fieldInfo = buildFieldMetadata(fields);
            gridColumns = buildGridColumns(fields);
        }
    } catch (error) {
        draft.errorMessage = 'Unable to load field information from the layer service URL.';
        return;
    } finally {
        loadingLayerMetadata.value = false;
    }

    const layer = {
        id: toLayerId(trimmedName),
        name: trimmedName,
        layerType: draft.selectedType as any,
        url: trimmedUrl,
        fieldMetadata: {
            fieldInfo
        },
        fixtures: {
            grid: {
                columns: gridColumns
            }
        }
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
    updateLegend();
};

const legendEntryExists = (root: any, layerId: string): boolean => {
    if (root.layerId === layerId) {
        return true;
    } else {
        return root?.children?.some((child: any) => legendEntryExists(child, layerId));
    }
};

const removeLayerItems = (children: Array<any>) => {
    // remove item
    children = children.filter(
        child => child.layerId === undefined || store.elc.layers.some(layerConf => layerConf.id === child.layerId)
    );

    // recursively check child legend items
    children.forEach((child: any) => {
        if (child.children && child.children.length > 0) {
            child.children = removeLayerItems(child.children);
        }
    });

    return children;
};

const updateLegend = () => {
    if (!store.elc.fixtures.legend || store.elc.layers.length === 0) {
        store.elc.fixtures.legend = { root: { children: [] } };
    } else if (!store.elc.fixtures.legend.root) {
        store.elc.fixtures.legend.root = { children: [] };
    } else if (!store.elc.fixtures.legend.root.children) {
        store.elc.fixtures.legend.root.children = [];
    }

    store.elc.layers.forEach((layerConf: RampLayerConfig) => {
        if (!legendEntryExists(store.elc.fixtures.legend.root, layerConf.id)) {
            store.elc.fixtures.legend.root.children.push({
                layerId: layerConf.id
            });
        }
    });

    store.elc.fixtures.legend.root.children = removeLayerItems(store.elc.fixtures.legend.root.children);
};

const fetchFeatureLayerFields = async (url: string): Promise<RampLayerFieldInfoConfig[]> => {
    const response = await axios.get(url, {
        params: { f: 'json' }
    });

    console.log('FETCH LAYER ATTRIBS: ', response);
    return response.data?.fields ?? [];
};

const buildFieldMetadata = (fields: RampLayerFieldInfoConfig[]): RampLayerFieldInfoConfig[] => {
    return fields.map(field => ({
        name: field.name,
        alias: field.alias || field.name
    }));
};

const buildGridColumns = (fields: RampLayerFieldInfoConfig[]): LayerGridColumn[] => {
    return fields.map(field => ({
        field: field.name,
        title: field.alias || field.name,
        visible: true
    }));
};
</script>
