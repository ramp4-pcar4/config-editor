<template>
    <div class="rounded-xl border border-gray-200 bg-white w-1/2">
        <div class="border-b border-gray-200 px-16 py-12">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.legend.title') }}</h4>
        </div>

        <div v-if="!layers.length" class="p-16 text-sm text-gray-500">
            {{ t('wizard.legend.none') }}
        </div>

        <div v-else>
            <!-- mock legend header -->
            <div class="relative legend-header flex items-center">
                <!-- add layer -->
                <div class="p-16 text-gray-500 hover:text-black">
                    <svg class="h-[18px] w-[18px] fill-current scale-x-[-1]" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                </div>
                <!-- layer reorder -->
                <div class="p-8 text-gray-500 hover:text-black">
                    <svg class="h-[18px] w-[18px] fill-current scale-x-[-1]" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"
                        />
                    </svg>
                </div>
                <span class="flex-1"></span>

                <!-- groups toggle -->
                <div class="p-8 text-gray-500 hover:text-black">
                    <svg class="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                </div>

                <!-- visibility toggle -->
                <div class="p-16 text-gray-500 hover:text-black">
                    <svg class="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                        <path
                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                        />
                    </svg>
                </div>
            </div>

            <!-- mock legend items -->
            <div class="divide-y divide-gray-200">
                <div v-for="(layer, idx) in layers" :key="layer.id" class="relative">
                    <div class="flex items-center hover:bg-gray-200 default-focus-style p-12 transition">
                        <!-- symbology / icon block -->
                        <div
                            class="mr-12 flex h-32 w-32 shrink-0 items-center justify-center rounded bg-gray-100"
                            :style="{ color: getLayerColor(layer, idx) }"
                        >
                            <template v-if="layer.layerType === 'esri-feature'">
                                <div
                                    class="h-12 w-12 rounded-full border border-black bg-current"
                                    style="border-color: currentColor"
                                ></div>
                            </template>

                            <template v-else-if="layer.layerType === 'esri-map-image'">
                                <div class="grid h-16 w-16 grid-cols-2 gap-2">
                                    <div
                                        class="bg-transparent"
                                        :style="{ border: `1px solid ${getLayerColor(layer, idx)}` }"
                                    ></div>
                                    <div
                                        class="bg-transparent"
                                        :style="{ border: `1px solid ${getLayerColor(layer, idx)}` }"
                                    ></div>
                                    <div
                                        class="bg-transparent"
                                        :style="{ border: `1px solid ${getLayerColor(layer, idx)}` }"
                                    ></div>
                                    <div
                                        class="bg-transparent"
                                        :style="{ border: `1px solid ${getLayerColor(layer, idx)}` }"
                                    ></div>
                                </div>
                            </template>

                            <template v-else-if="layer.layerType === 'esri-tile'">
                                <div class="grid h-16 w-16 grid-cols-2 gap-2">
                                    <div :style="{ backgroundColor: getLayerColor(layer, idx) }"></div>
                                    <div class="bg-gray-500"></div>
                                    <div class="bg-gray-500"></div>
                                    <div :style="{ backgroundColor: getLayerColor(layer, idx) }"></div>
                                </div>
                            </template>

                            <template v-else-if="layer.layerType === 'esri-imagery'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-4 w-4 fill-current text-black"
                                >
                                    <path
                                        d="M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2ZM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5Z"
                                    />
                                </svg>
                            </template>

                            <template v-else-if="layer.layerType === 'ogc-wms'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-16 w-16 fill-current text-black"
                                >
                                    <path d="M3 5h18v2H3V5Zm0 6h18v2H3v-2Zm0 6h18v2H3v-2Z" />
                                </svg>
                            </template>

                            <template v-else-if="layer.layerType === 'ogc-wfs'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-16 w-16 fill-current text-black"
                                >
                                    <path
                                        d="M12 2 4 6v6c0 5.25 3.4 10.17 8 11.75C16.6 22.17 20 17.25 20 12V6l-8-4Zm0 2.18 6 3v4.82c0 4.22-2.61 8.32-6 9.74-3.39-1.42-6-5.52-6-9.74V7.18l6-3Z"
                                    />
                                </svg>
                            </template>

                            <template v-else-if="layer.layerType === 'file-geojson'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-16 w-16 fill-current text-black"
                                >
                                    <path
                                        d="M14 2H6c-1.1 0-2 .9-2 2v16l4-4h10c1.1 0 2-.9 2-2V8l-6-6Zm1 7V3.5L19.5 9H15Z"
                                    />
                                </svg>
                            </template>

                            <template v-else-if="layer.layerType === 'file-shape'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-16 w-16 fill-current text-black"
                                >
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z" />
                                </svg>
                            </template>

                            <template v-else-if="layer.layerType === 'file-csv'">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="h-16 w-16 fill-current text-black"
                                >
                                    <path d="M4 4h16v16H4V4Zm2 2v3h12V6H6Zm0 5v3h12v-3H6Zm0 5v2h12v-2H6Z" />
                                </svg>
                            </template>

                            <template v-else>
                                <div class="h-12 w-12 rounded-sm bg-current" style="border-color: currentColor"></div>
                            </template>
                        </div>

                        <!-- layer description -->
                        <div class="min-w-0 flex-1">
                            <div class="truncate text-sm text-gray-900">
                                {{ layer.name || layer.id }}
                            </div>
                            <div class="mt-1 truncate text-xs text-gray-500">
                                {{ formatLayerType(layer.layerType) }}
                            </div>
                        </div>

                        <!-- visibility toggle -->
                        <div class="ml-12 shrink-0">
                            <input
                                type="checkbox"
                                checked
                                disabled
                                class="h-4 w-4 cursor-default rounded border-gray-300"
                                aria-label="Layer visibility preview"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RampLayerConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    layers: RampLayerConfig[];
}>();

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

const previewColors = [
    '#2563eb', // blue
    '#16a34a', // green
    '#dc2626', // red
    '#ca8a04', // yellow
    '#7c3aed', // purple
    '#0891b2', // cyan
    '#ea580c', // orange
    '#4f46e5' // indigo
];

const getLayerColor = (layer: RampLayerConfig, index: number) => {
    return previewColors[index % previewColors.length];
};

const formatLayerType = (type: string) => layerTypeLabels[type] ?? type ?? 'Unknown';
</script>
