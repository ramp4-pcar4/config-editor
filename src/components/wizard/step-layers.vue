<template>
    <div>
        <h3 class="text-lg font-semibold">Layers</h3>
        <p class="mt-1 text-sm text-gray-600">Add layer source data (at least one layer is required).</p>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">Add a layer</h4>

            <div class="mt-4 grid gap-2">
                <label class="text-sm font-medium text-gray-900">Source URL*</label>
                <p class="mt-1 text-xs text-gray-500">Provide a URL to a file or map service.</p>
                <input
                    v-model="draft.url"
                    class="w-full rounded-lg border px-3 py-2 text-sm outline-none transition"
                    :class="valid ? 'border-gray-300 focus:border-gray-400' : 'border-red-300 focus:border-red-400'"
                    @input="onUrlInput"
                />
            </div>

            <div class="mt-4 grid gap-4">
                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">Layer name*</label>
                    <input
                        v-model="draft.name"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>

                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">Layer type*</label>
                    <select
                        v-model="draft.selectedType"
                        :disabled="!availableLayerTypes.length"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    >
                        <option disabled value="">Select a layer type</option>
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
                    + Add layer
                </button>
            </div>
        </div>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">Layers in this map ({{ layers.length }})</h4>

            <div v-if="!layers.length" class="mt-3 text-sm text-gray-500">
                No layers yet. Add your first layer to continue.
            </div>

            <draggable
                v-else
                :model-value="sortedLayers"
                item-key="id"
                handle=".drag-handle"
                :animation="180"
                ghost-class="opacity-50"
                class="mt-3 grid gap-2"
                @update:modelValue="updateSortedLayers"
            >
                <template #item="{ element: l, index }">
                    <div class="rounded-lg border border-gray-200 bg-white">
                        <div class="flex items-center gap-3 p-3 shadow-sm">
                            <div
                                class="drag-handle flex cursor-grab active:cursor-grabbing items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-sm text-gray-500"
                                title="Drag to reorder"
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
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                    @click="removeLayer(l.id)"
                                >
                                    Remove
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
                                    <label class="text-sm font-medium text-gray-900">Layer source</label>
                                    <div
                                        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600"
                                    >
                                        <span>{{ l.url }}</span>
                                    </div>
                                </div>

                                <div class="grid gap-2">
                                    <label class="text-sm font-medium text-gray-900">Layer type</label>
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
                                        <span class="text-sm font-medium text-gray-900">Advanced layer settings</span>
                                        <span class="text-xs text-gray-500">
                                            {{ editDraft.showAdvanced ? 'Hide' : 'Show' }}
                                        </span>
                                    </button>

                                    <div v-if="editDraft.showAdvanced" class="mt-4 space-y-4">
                                        <div>
                                            <h5 class="text-sm font-medium text-gray-900">Field metadata</h5>
                                            <p class="mt-1 text-xs text-gray-500">
                                                Configure layer metadata properties.
                                            </p>
                                            <div
                                                class="mt-3 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500"
                                            >
                                                TODO
                                            </div>
                                        </div>

                                        <div>
                                            <h5 class="text-sm font-medium text-gray-900">Grid columns</h5>
                                            <p class="mt-1 text-xs text-gray-500">Configure layer grid columns.</p>
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
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                                        @click="saveEditLayer"
                                    >
                                        Save changes
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
import draggable from 'vuedraggable';
import ErrorList from './error-list.vue';

defineProps<{ errors: any[] }>();

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

const editDraft = reactive({
    id: null as string | null,
    name: '',
    showAdvanced: false as boolean
});

const ensureLayers = () => {
    if (!store.elc.layers) {
        store.elc.layers = [];
    }
    return store.elc.layers;
};

const layers = computed({
    get: () => ensureLayers(),
    set: value => {
        store.elc.layers = value;
    }
});

const sortedLayers = computed(() => [...layers.value]);
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
