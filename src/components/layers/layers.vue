<script setup lang="ts">
// root.layers config nugget

import { LayerIdentifyMode, LayerType } from '@/definitions';
import type { RampLayerConfig } from '@/definitions';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';

import Checkbox from '@/components/helpers/checkbox.vue';
import Select from '@/components/helpers/select.vue';
import Input from '@/components/helpers/input.vue';
import Metadata from '@/components/layers/metadata.vue';
import Controls from '@/components/layers/controls.vue';
import Extent from '@/components/helpers/extent.vue';
import State from '@/components/layers/state.vue';
import FieldMetadata from '@/components/layers/field-metadata.vue';
import DrawOrder from '@/components/layers/draw-order.vue';
import Fixtures from '@/components/layers/fixtures.vue';
import Sublayers from '@/components/layers/sublayers.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();

const updatedLegend = ref<boolean>(false);
const imgFormatOpts = ref(['png', 'png8', 'png24', 'png32', 'jpg', 'pdf', 'bmp', 'gif', 'svg']);

const allHaveId = computed<boolean>(() => store.elc.layers.every(layerConf => !!layerConf.id));
const allUniqueIds = computed<boolean>(() => {
    const layerIds = store.elc.layers.map(layerConf => layerConf.id).filter(id => !!id);
    const checkSet = new Set(layerIds);
    return layerIds.length === checkSet.size;
});

const onMoveEnd = (evt: any) => {
    if (!evt.moved) {
        // not a move event, ignore the change
        return;
    }

    const oldIdx: number = evt.moved.oldIndex;
    const newIdx: number = evt.moved.newIndex;

    if (oldIdx === newIdx) {
        return;
    }
};

const addLayer = () => {
    store.elc.layers.push({
        id: '',
        layerType: LayerType.FEATURE,
        url: ''
    });
};

const removeLayer = (idx: number) => {
    store.elc.layers.splice(idx, 1);
};

const reorderLayer = (idx: number, direction: number) => {
    const [elem] = store.elc.layers.splice(idx, 1);
    store.elc.layers.splice(idx + direction, 0, elem);
};

const getLegendEntry = (root: any, layerId: string): any => {
    if (root.layerId === layerId) {
        return root;
    } else {
        let result = undefined;
        root?.children?.forEach((child: any) => {
            const entry = getLegendEntry(child, layerId);
            if (entry) {
                result = entry;
            }
        });
        return result;
    }
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
    if (store.elc.layers.length === 0 || updatedLegend.value) {
        return;
    }
    if (!store.elc.fixtures.legend) {
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

    updatedLegend.value = true;
    setTimeout(() => {
        updatedLegend.value = false;
    }, 2000);
};

const onLayerIdChange = (newId: string, idx: number) => {
    const layerConf = store.elc.layers[idx];
    if (store.elc.fixtures.legend?.root?.children) {
        const legendEntry = getLegendEntry(store.elc.fixtures.legend?.root, layerConf.id);
        if (legendEntry) {
            legendEntry.layerId = newId;
        }
    }
    layerConf.id = newId;
};
</script>

<template>
    <div>
        <div class="flex items-center">
            <h1 class="text-2xl font-semibold">{{ t('layers.title') }} ({{ store.elc.layers.length }})</h1>
            <div class="flex ml-auto">
                <button
                    class="bg-black hover:bg-gray-800 p-1 text-white flex-shrink-0 flex items-center justify-center"
                    :class="updatedLegend ? 'cursor-default' : 'cursor-pointer'"
                    @click="updateLegend"
                    :aria-label="updatedLegend ? t('layers.updatedLegend.title') : t('layers.autopopulateLegend.title')"
                >
                    <svg
                        v-if="updatedLegend"
                        data-slot="icon"
                        fill="none"
                        stroke-width="1.5"
                        width="20px"
                        height="20px"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        height="20px"
                        width="20px"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"
                        />
                    </svg>
                    <span class="px-2">
                        {{ updatedLegend ? t('layers.updatedLegend.title') : t('layers.autopopulateLegend.title') }}
                    </span>
                    <button
                        class="relative bottom-[1.5px]"
                        v-if="!updatedLegend && (!allHaveId || !allUniqueIds)"
                        :content="t('layers.idWarning')"
                        v-tippy="{
                            placement: 'top',
                            trigger: 'mouseenter manual focus click'
                        }"
                        @click.stop
                    >
                        ⚠
                    </button>
                    <button
                        v-if="!updatedLegend"
                        :content="t('layers.autopopulateLegend.description')"
                        :aria-label="t('layers.autopopulateLegend.description')"
                        v-tippy="{
                            placement: 'top',
                            trigger: 'mouseenter manual focus click'
                        }"
                        @click.stop
                    >
                        <svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                            />
                        </svg>
                    </button>
                </button>
                <!-- add item button -->
                <button
                    class="bg-black cursor-pointer hover:bg-gray-800 ml-2 p-1 text-white flex-shrink-0 flex items-center justify-center"
                    @click="addLayer"
                >
                    <svg
                        class="relative bottom-[2px]"
                        fill="white"
                        height="18px"
                        width="18px"
                        viewBox="0 0 23 21"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span class="px-2"> {{ t('layers.add') }} </span>
                </button>
            </div>
        </div>
        <div>
            <draggable
                v-if="store.elc.layers.length > 0"
                :list="store.elc.layers"
                item-key="fake"
                handle=".handle"
                @change="onMoveEnd"
            >
                <template #item="{ element, index }">
                    <Collapsible :thick-border="true">
                        <template #header>
                            <button
                                :content="t('editor.reorder')"
                                v-tippy
                                class="cursor-move handle mr-1 sm:mr-5"
                                @click.stop
                                :aria-label="t('editor.reorder')"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                    />
                                </svg>
                            </button>
                            <button
                                :content="t('editor.expand')"
                                v-tippy
                                class="arrow mr-1 sm:mr-5"
                                :aria-label="t('editor.expand')"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                </svg>
                            </button>
                            <span class="mr-1 sm:mr-5 sm:text-lg">{{
                                element.id ? element.id : t('layer.title', [index + 1])
                            }}</span>
                            <div class="flex ml-auto">
                                <button
                                    @click.stop="removeLayer(index)"
                                    class="mr-1"
                                    :aria-label="t('layers.remove')"
                                    :content="t('layers.remove')"
                                    v-tippy
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                                <div class="flex flex-col">
                                    <button
                                        @click.stop="reorderLayer(index, -1)"
                                        :disabled="index === 0"
                                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                                        :aria-label="t('editor.up')"
                                        :content="t('editor.up')"
                                        v-tippy
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        @click.stop="reorderLayer(index, 1)"
                                        :disabled="index === store.elc.layers.length - 1"
                                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                                        :aria-label="t('editor.down')"
                                        :content="t('editor.down')"
                                        v-tippy
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <div class="input-table mt-5">
                                <Select
                                    :title="t('layer.type')"
                                    required
                                    v-model="element.layerType"
                                    :options="[
                                        { label: t('layer.type.feature'), value: LayerType.FEATURE },
                                        { label: t('layer.type.mapImage'), value: LayerType.MAPIMAGE },
                                        { label: t('layer.type.wfs'), value: LayerType.WFS },
                                        { label: t('layer.type.wms'), value: LayerType.WMS },
                                        { label: t('layer.type.csv'), value: LayerType.CSV },
                                        { label: t('layer.type.geojson'), value: LayerType.GEOJSON },
                                        { label: t('layer.type.shapefile'), value: LayerType.SHAPEFILE }
                                    ]"
                                />
                                <Input
                                    :title="t('layer.id.title')"
                                    :description="t('layer.id.description')"
                                    :model-value="element.id"
                                    @update:model-value="id => onLayerIdChange(id, index)"
                                    required
                                />
                                <Input
                                    :title="t('layer.name.title')"
                                    :description="t('layer.name.description')"
                                    v-model="element.name"
                                />
                                <Input
                                    :title="t('layer.url.title')"
                                    :description="t('layer.url.description')"
                                    v-model="element.url"
                                    required
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    :title="t('layer.nameField.title')"
                                    :description="t('layer.nameField.description')"
                                    v-model="element.nameField"
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    :title="t('layer.tooltipField.title')"
                                    :description="t('layer.tooltipField.description')"
                                    v-model="element.tooltipField"
                                />
                                <Input
                                    v-if="
                                        element.layerType === LayerType.MAPIMAGE ||
                                        element.layerType === LayerType.WMS ||
                                        element.layerType === LayerType.FEATURE
                                    "
                                    :title="t('layer.refreshInterval.title')"
                                    :description="t('layer.refreshInterval.description')"
                                    v-model="element.refreshInterval"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="0"
                                />
                                <Input
                                    :title="t('layer.expectedDrawTime.title')"
                                    :description="t('layer.expectedDrawTime.description')"
                                    v-model="element.expectedDrawTime"
                                    type="number"
                                    min="0"
                                    placeholder="10000"
                                />
                                <Input
                                    :title="t('layer.expectedLoadTime.title')"
                                    :description="t('layer.expectedLoadTime.description')"
                                    v-model="element.expectedLoadTime"
                                    type="number"
                                    min="0"
                                    placeholder="40000"
                                />
                                <Input
                                    :title="t('layer.maxLoadTime.title')"
                                    :description="t('layer.maxLoadTime.description')"
                                    v-model="element.maxLoadTime"
                                    type="number"
                                    min="0"
                                    placeholder="20000"
                                />
                                <Input
                                    v-if="
                                        element.layerType === LayerType.MAPIMAGE ||
                                        element.layerType === LayerType.WMS ||
                                        element.layerType === LayerType.FEATURE
                                    "
                                    :title="t('layer.catalogueUrl.title')"
                                    :description="t('layer.catalogueUrl.description')"
                                    v-model="element.catalogueUrl"
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE &&
                                        element.layerType !== LayerType.WMS &&
                                        element.layerType !== LayerType.FEATURE
                                    "
                                    :title="t('layer.colour.title')"
                                    :description="t('layer.colour.description')"
                                    v-model="element.colour"
                                />
                                <Input
                                    v-if="element.layerType === LayerType.CSV"
                                    :title="t('layer.latField.title')"
                                    :description="t('layer.latField.description')"
                                    v-model="element.latField"
                                />
                                <Input
                                    v-if="element.layerType === LayerType.CSV"
                                    :title="t('layer.longField.title')"
                                    :description="t('layer.longField.description')"
                                    v-model="element.longField"
                                />
                                <Input
                                    v-if="element.layerType !== LayerType.WMS"
                                    :title="t('layer.mouseTolerance.title')"
                                    :description="t('layer.mouseTolerance.description')"
                                    v-model="element.mouseTolerance"
                                    type="number"
                                    min="0"
                                    placeholder="5"
                                />
                                <Input
                                    v-if="element.layerType !== LayerType.WMS"
                                    :title="t('layer.touchTolerance.title')"
                                    :description="t('layer.touchTolerance.description')"
                                    v-model="element.touchTolerance"
                                    type="number"
                                    min="0"
                                    placeholder="15"
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    :title="t('layer.initialFilteredQuery.title')"
                                    :description="t('layer.initialFilteredQuery.description')"
                                    v-model="element.initialFilteredQuery"
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    :title="t('layer.permanentFilteredQuery.title')"
                                    :description="t('layer.permanentFilteredQuery.description')"
                                    v-model="element.permanentFilteredQuery"
                                />
                                <Select
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    :title="t('layer.identifyMode.title')"
                                    :description="t('layer.identifyMode.description')"
                                    v-model="element.identifyMode"
                                    :options="[
                                        {
                                            label: t('layer.identifyMode.geometric'),
                                            value: LayerIdentifyMode.GEOMETRIC
                                        },
                                        { label: t('layer.identifyMode.symbolic'), value: LayerIdentifyMode.SYMBOLIC },
                                        { label: t('layer.identifyMode.hybrid'), value: LayerIdentifyMode.HYBRID }
                                    ]"
                                />
                                <Select
                                    v-if="element.layerType === LayerType.MAPIMAGE"
                                    :title="t('layer.imageFormat.title')"
                                    :description="t('layer.imageFormat.description')"
                                    v-model="element.imageFormat"
                                    :options="
                                        imgFormatOpts.map(format => {
                                            return { label: format, value: format };
                                        })
                                    "
                                />
                                <Input
                                    v-if="
                                        element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                                    "
                                    type="object"
                                    :title="t('layer.customRenderer.title')"
                                    :description="t('layer.customRenderer.description')"
                                    v-model="element.customRenderer"
                                />
                                <Input
                                    v-if="
                                        element.layerType === LayerType.GEOJSON || element.layerType === LayerType.CSV
                                    "
                                    :type="element.layerType === LayerType.GEOJSON ? 'object' : 'text'"
                                    :title="t('layer.rawData.title')"
                                    :description="
                                        t(
                                            `layer.rawData.${
                                                element.layerType === LayerType.GEOJSON ? 'geojson' : 'csv'
                                            }.description`
                                        )
                                    "
                                    v-model="element.rawData"
                                />
                            </div>
                            <Checkbox
                                v-if="element.layerType === LayerType.MAPIMAGE"
                                :title="t('layer.singleEntryCollapse.title')"
                                :description="t('layer.singleEntryCollapse.description')"
                                v-model="element.singleEntryCollapse"
                            />
                            <Checkbox
                                v-if="element.layerType === LayerType.WFS"
                                :title="t('layer.xyInAttribs.title')"
                                :description="t('layer.xyInAttribs.description')"
                                v-model="element.xyInAttribs"
                            />
                            <Checkbox
                                v-if="
                                    element.layerType !== LayerType.MAPIMAGE &&
                                    element.layerType !== LayerType.WMS &&
                                    element.layerType !== LayerType.FEATURE
                                "
                                v-model="element.caching"
                                :title="t('layer.caching.title')"
                                :description="t('layer.caching.description')"
                            />
                            <Sublayers
                                v-if="element.layerType === LayerType.MAPIMAGE || element.layerType === LayerType.WMS"
                                v-model="element.sublayers"
                                :layer-type="element.layerType"
                            />
                            <Metadata v-model="element.metadata" />
                            <Extent v-model="element.extent" :title="t('layer.extent')" />
                            <Controls v-model="element.controls" />
                            <Controls v-model="element.disabledControls" disabled />
                            <State v-model="element.state" />
                            <FieldMetadata
                                v-model="element.fieldMetadata"
                                v-if="element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS"
                            />
                            <DrawOrder
                                v-model="element.drawOrder"
                                v-if="element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS"
                            />
                            <Fixtures v-model="element.fixtures" :layer-type="element.layerType" />
                        </template>
                    </Collapsible>
                </template>
            </draggable>
        </div>
    </div>
</template>
