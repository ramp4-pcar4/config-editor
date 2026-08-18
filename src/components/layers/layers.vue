<template>
    <div class="layers-editor">
        <template v-if="compact && !layersSection">
            <p class="layers-copy">{{ t('layers.sidebar.description') }}</p>

            <button type="button" class="layers-card primary" @click="startAddLayer">
                <span>
                    <strong>{{ t('layers.add') }}</strong>
                    <small>{{ t('layers.sidebar.add.description') }}</small>
                </span>
            </button>

            <button type="button" class="layers-card" @click="layersSection = 'advanced'">
                <span>
                    <strong>{{ t('layers.sidebar.advanced.title') }}</strong>
                    <small>{{ t('layers.sidebar.advanced.description') }}</small>
                </span>
                <em>{{ t('layers.sidebar.count', { count: store.elc.layers.length }) }}</em>
            </button>

            <button type="button" class="layers-card" @click="updateLegend">
                <span>
                    <strong>{{
                        updatedLegend ? t('layers.updatedLegend.title') : t('layers.autopopulateLegend.title')
                    }}</strong>
                    <small>{{ t('layers.autopopulateLegend.description') }}</small>
                </span>
                <em>{{ updatedLegend ? t('layers.sidebar.done') : t('layers.sidebar.action') }}</em>
            </button>
        </template>

        <template v-else>
            <button v-if="compact" type="button" class="layers-back" @click="layersSection = ''">
                <span aria-hidden="true">&lt;</span>
                {{ t('navbar.layers') }}
            </button>

            <div class="layers-workspace">
                <div class="layers-toolbar">
                    <div>
                        <h4 class="layers-section-title">
                            {{ t('layers.title') }}
                            <span>{{ t('layers.sidebar.count', { count: store.elc.layers.length }) }}</span>
                        </h4>
                        <p class="layers-copy">{{ t('layers.inspector.description') }}</p>
                    </div>

                    <div class="layers-toolbar-actions">
                        <button
                            type="button"
                            class="layers-secondary-action"
                            :class="{ done: updatedLegend }"
                            @click="updateLegend"
                            :aria-label="
                                updatedLegend ? t('layers.updatedLegend.title') : t('layers.autopopulateLegend.title')
                            "
                        >
                            {{ updatedLegend ? t('layers.updatedLegend.title') : t('layers.autopopulateLegend.title') }}
                        </button>
                        <button type="button" class="layers-primary-action" @click="startAddLayer">
                            {{ t('layers.add') }}
                        </button>
                    </div>
                </div>

                <p v-if="store.elc.layers.length > 0 && (!allHaveId || !allUniqueIds)" class="layers-warning">
                    {{ t('layers.idWarning') }}
                </p>

                <section v-if="addingLayer" class="layer-draft">
                    <div class="layer-draft-header">
                        <div>
                            <strong>{{ t('layers.draft.title') }}</strong>
                            <span>{{ t('layers.draft.description') }}</span>
                        </div>
                    </div>

                    <div class="input-table">
                        <GroupSelect
                            :title="t('layer.type')"
                            required
                            v-model="draftLayer.layerType"
                            :options="layerTypeOptions"
                        />
                        <Input
                            :title="t('layer.id.title')"
                            :description="t('layer.id.description')"
                            v-model="draftLayer.id"
                            required
                        />
                        <Input
                            :title="t('layer.name.title')"
                            :description="t('layer.name.description')"
                            v-model="draftLayer.name"
                        />
                        <Input
                            :title="t('layer.url.title')"
                            :description="t('layer.url.description')"
                            v-model="draftLayer.url"
                            required
                        />
                    </div>

                    <div class="layer-draft-actions">
                        <button type="button" class="layers-secondary-action" @click="cancelDraftLayer">
                            {{ t('layers.draft.cancel') }}
                        </button>
                        <button type="button" class="layers-primary-action" @click="createDraftLayer">
                            {{ t('layers.draft.create') }}
                        </button>
                    </div>
                </section>

                <div v-if="store.elc.layers.length === 0 && !addingLayer" class="layers-empty">
                    <strong>{{ t('layers.empty.title') }}</strong>
                    <span>{{ t('layers.empty.description') }}</span>
                    <button type="button" class="layers-primary-action" @click="startAddLayer">
                        {{ t('layers.add') }}
                    </button>
                </div>

                <div v-else class="layers-flow">
                    <section class="layers-list-panel" :aria-label="t('layers.list.title')">
                        <div class="layers-panel-header">
                            <strong>{{ t('layers.list.title') }}</strong>
                            <span>{{ t('layers.list.description') }}</span>
                        </div>

                        <draggable
                            :list="store.elc.layers"
                            item-key="fake"
                            handle=".handle"
                            class="layers-list"
                            @change="onMoveEnd"
                        >
                            <template #item="{ element, index }">
                                <article class="layer-row" :class="{ active: selectedLayer === element }">
                                    <button
                                        type="button"
                                        class="layer-row-main"
                                        @click="selectLayer(element)"
                                        :aria-current="selectedLayer === element ? 'true' : undefined"
                                    >
                                        <span class="layer-row-title">{{ layerDisplayName(element, index) }}</span>
                                        <span class="layer-row-meta">
                                            <span>{{ layerTypeLabel(element.layerType) }}</span>
                                            <span>{{
                                                element.url
                                                    ? t('layers.status.sourceSet')
                                                    : t('layers.status.needsSource')
                                            }}</span>
                                        </span>
                                    </button>

                                    <em class="layer-status" :class="layerStatusClass(element, index)">
                                        {{ layerStatusLabel(element, index) }}
                                    </em>

                                    <div class="layer-row-actions">
                                        <button
                                            type="button"
                                            class="layer-icon-button handle"
                                            :content="t('editor.reorder')"
                                            v-tippy
                                            @click.stop
                                            :aria-label="t('editor.reorder')"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            class="layer-icon-button"
                                            @click.stop="removeLayer(index)"
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
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                        <div class="layer-reorder-buttons">
                                            <button
                                                type="button"
                                                class="layer-icon-button"
                                                @click.stop="reorderLayer(index, -1)"
                                                :disabled="index === 0"
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
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                class="layer-icon-button"
                                                @click.stop="reorderLayer(index, 1)"
                                                :disabled="index === store.elc.layers.length - 1"
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
                                                    aria-hidden="true"
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
                                </article>
                            </template>
                        </draggable>
                    </section>

                    <section v-if="selectedLayer" class="layer-inspector">
                        <div class="layer-inspector-header">
                            <div>
                                <span>{{ t('layers.inspector.eyebrow') }}</span>
                                <h4>{{ layerDisplayName(selectedLayer, selectedLayerIndex) }}</h4>
                            </div>
                            <em class="layer-status" :class="layerStatusClass(selectedLayer, selectedLayerIndex)">
                                {{ layerStatusLabel(selectedLayer, selectedLayerIndex) }}
                            </em>
                        </div>

                        <div class="layer-tabs" role="tablist" :aria-label="t('layers.tabs.label')">
                            <button
                                v-for="tab in layerTabs"
                                :key="tab.id"
                                type="button"
                                role="tab"
                                :aria-selected="activeTab === tab.id"
                                :class="{ active: activeTab === tab.id }"
                                @click="activeTab = tab.id"
                            >
                                {{ tab.label }}
                            </button>
                        </div>

                        <div class="layer-tab-panel">
                            <template v-if="activeTab === 'basics'">
                                <p class="layer-tab-copy">{{ t('layers.tabs.basics.copy') }}</p>
                                <div class="input-table">
                                    <GroupSelect
                                        :title="t('layer.type')"
                                        required
                                        v-model="selectedLayer.layerType"
                                        :options="layerTypeOptions"
                                    />
                                    <Input
                                        :title="t('layer.id.title')"
                                        :description="t('layer.id.description')"
                                        :model-value="selectedLayer.id"
                                        @update:model-value="id => onLayerIdChange(id, selectedLayerIndex)"
                                        required
                                    />
                                    <Input
                                        :title="t('layer.name.title')"
                                        :description="t('layer.name.description')"
                                        v-model="selectedLayer.name"
                                    />
                                    <Input
                                        :title="t('layer.url.title')"
                                        :description="t('layer.url.description')"
                                        v-model="selectedLayer.url"
                                        required
                                    />
                                </div>
                            </template>

                            <template v-else-if="activeTab === 'source'">
                                <p class="layer-tab-copy">{{ t('layers.tabs.source.copy') }}</p>
                                <div class="input-table">
                                    <Select
                                        v-if="LayerTools.isMIL(selectedLayer)"
                                        :title="t('layer.imageFormat.title')"
                                        :description="t('layer.imageFormat.description')"
                                        v-model="selectedLayer.imageFormat"
                                        :options="imgFormatOpts.map(format => ({ label: format, value: format }))"
                                    />
                                    <Input
                                        v-if="LayerTools.isCSV(selectedLayer)"
                                        :title="t('layer.latField.title')"
                                        :description="t('layer.latField.description')"
                                        v-model="selectedLayer.latField"
                                    />
                                    <Input
                                        v-if="LayerTools.isCSV(selectedLayer)"
                                        :title="t('layer.longField.title')"
                                        :description="t('layer.longField.description')"
                                        v-model="selectedLayer.longField"
                                    />
                                    <Input
                                        v-if="LayerTools.isGeoJson(selectedLayer) || LayerTools.isCSV(selectedLayer)"
                                        :type="LayerTools.isGeoJson(selectedLayer) ? 'object' : 'text'"
                                        :title="t('layer.rawData.title')"
                                        :description="
                                            t(
                                                `layer.rawData.${
                                                    LayerTools.isGeoJson(selectedLayer) ? 'geojson' : 'csv'
                                                }.description`
                                            )
                                        "
                                        v-model="selectedLayer.rawData"
                                    />
                                </div>

                                <Checkbox
                                    v-if="LayerTools.isWFS(selectedLayer)"
                                    :title="t('layer.xyInAttribs.title')"
                                    :description="t('layer.xyInAttribs.description')"
                                    v-model="selectedLayer.xyInAttribs"
                                />
                                <Checkbox
                                    v-if="LayerTools.isFileLayer(selectedLayer)"
                                    :title="t('layer.caching.title')"
                                    :description="t('layer.caching.description')"
                                    v-model="selectedLayer.caching"
                                />
                                <Sublayers
                                    v-if="LayerTools.isParentLayer(selectedLayer)"
                                    v-model="selectedLayer.sublayers"
                                    :layer-type="selectedLayer.layerType"
                                />
                                <p v-if="!hasSourceOptions(selectedLayer)" class="layer-tab-empty">
                                    {{ t('layers.tabs.source.empty') }}
                                </p>
                            </template>

                            <template v-else-if="activeTab === 'interaction'">
                                <p class="layer-tab-copy">{{ t('layers.tabs.interaction.copy') }}</p>
                                <div class="input-table">
                                    <Input
                                        v-if="LayerTools.isAttributeLayer(selectedLayer)"
                                        :title="t('layer.nameField.title')"
                                        :description="t('layer.nameField.description')"
                                        v-model="selectedLayer.nameField"
                                    />
                                    <Input
                                        v-if="LayerTools.isVectorLayer(selectedLayer)"
                                        :title="t('layer.maptipField.title')"
                                        :description="t('layer.maptipField.description')"
                                        v-model="selectedLayer.maptipField"
                                    />
                                    <Select
                                        v-if="LayerTools.isVectorLayer(selectedLayer)"
                                        :title="t('layer.identifyMode.title')"
                                        :description="t('layer.identifyMode.description')"
                                        v-model="selectedLayer.identifyMode"
                                        :options="identifyModeOptions"
                                    />
                                    <Input
                                        v-if="LayerTools.isToleranceLayer(selectedLayer)"
                                        :title="t('layer.mouseTolerance.title')"
                                        :description="t('layer.mouseTolerance.description')"
                                        v-model="selectedLayer.mouseTolerance"
                                        type="number"
                                        min="0"
                                        placeholder="5"
                                    />
                                    <Input
                                        v-if="LayerTools.isToleranceLayer(selectedLayer)"
                                        :title="t('layer.touchTolerance.title')"
                                        :description="t('layer.touchTolerance.description')"
                                        v-model="selectedLayer.touchTolerance"
                                        type="number"
                                        min="0"
                                        placeholder="15"
                                    />
                                    <Input
                                        v-if="LayerTools.isAttributeLayer(selectedLayer)"
                                        :title="t('layer.initialFilteredQuery.title')"
                                        :description="t('layer.initialFilteredQuery.description')"
                                        v-model="selectedLayer.initialFilteredQuery"
                                    />
                                    <Input
                                        v-if="LayerTools.isAttributeLayer(selectedLayer)"
                                        :title="t('layer.permanentFilteredQuery.title')"
                                        :description="t('layer.permanentFilteredQuery.description')"
                                        v-model="selectedLayer.permanentFilteredQuery"
                                    />
                                </div>
                                <Controls v-model="selectedLayer.controls" />
                                <Controls v-model="selectedLayer.disabledControls" disabled />
                            </template>

                            <template v-else-if="activeTab === 'display'">
                                <p class="layer-tab-copy">{{ t('layers.tabs.display.copy') }}</p>
                                <div class="input-table">
                                    <Input
                                        v-if="LayerTools.isFileLayer(selectedLayer)"
                                        :title="t('layer.colour.title')"
                                        :description="t('layer.colour.description')"
                                        v-model="selectedLayer.colour"
                                    />
                                    <Input
                                        v-if="LayerTools.isVectorLayer(selectedLayer)"
                                        type="object"
                                        :title="t('layer.customRenderer.title')"
                                        :description="t('layer.customRenderer.description')"
                                        v-model="selectedLayer.customRenderer"
                                    />
                                </div>
                                <State v-model="selectedLayer.state" />
                                <DrawOrder
                                    v-model="selectedLayer.drawOrder"
                                    v-if="LayerTools.isVectorLayer(selectedLayer)"
                                />
                            </template>

                            <template v-else>
                                <p class="layer-tab-copy">{{ t('layers.tabs.advanced.copy') }}</p>
                                <div class="input-table">
                                    <Input
                                        :title="t('layer.expectedDrawTime.title')"
                                        :description="t('layer.expectedDrawTime.description')"
                                        v-model="selectedLayer.expectedDrawTime"
                                        type="number"
                                        min="0"
                                    />
                                    <Input
                                        :title="t('layer.expectedLoadTime.title')"
                                        :description="t('layer.expectedLoadTime.description')"
                                        v-model="selectedLayer.expectedLoadTime"
                                        type="number"
                                        min="0"
                                    />
                                    <Input
                                        :title="t('layer.maxLoadTime.title')"
                                        :description="t('layer.maxLoadTime.description')"
                                        v-model="selectedLayer.maxLoadTime"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>
                                <Metadata v-model="selectedLayer.metadata" />
                                <Extent v-model="selectedLayer.extent" :title="t('layer.extent')" />
                                <FieldMetadata
                                    v-model="selectedLayer.fieldMetadata"
                                    v-if="LayerTools.isAttributeLayer(selectedLayer)"
                                />
                                <Fixtures
                                    v-model="selectedLayer.fixtures"
                                    :layer-type="selectedLayer.layerType"
                                    :sublayer="false"
                                />
                            </template>
                        </div>
                    </section>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
// root.layers config nugget

import { LayerIdentifyMode, LayerType } from '@/definitions';
import type { RampLayerConfig } from '@/definitions';
import { computed, ref, watch } from 'vue';
import draggable from 'vuedraggable';

import { Checkbox, Extent, GroupSelect, Input, Select } from '@/components/helpers';

import Metadata from '@/components/layers/metadata.vue';
import Controls from '@/components/layers/controls.vue';
import State from '@/components/layers/state.vue';
import FieldMetadata from '@/components/layers/field-metadata.vue';
import DrawOrder from '@/components/layers/draw-order.vue';
import Fixtures from '@/components/layers/fixtures.vue';
import Sublayers from '@/components/layers/sublayers.vue';

import * as LayerTools from '@/components/layers/layer-tools';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

type LayerTab = 'basics' | 'source' | 'interaction' | 'display' | 'advanced';

const store = useStore();
const { t } = useI18n();

defineProps({
    compact: Boolean
});

const layersSection = ref<'' | 'advanced'>('');
const updatedLegend = ref<boolean>(false);
const activeTab = ref<LayerTab>('basics');
const selectedLayerRef = ref<RampLayerConfig>();
const addingLayer = ref(false);
const draftLayer = ref<RampLayerConfig>({
    id: '',
    layerType: LayerType.FEATURE,
    url: ''
});
const imgFormatOpts = ref(['png', 'png8', 'png24', 'png32', 'jpg', 'pdf', 'bmp', 'gif', 'svg']);

const selectedLayer = computed<RampLayerConfig | undefined>(() => {
    if (selectedLayerRef.value && store.elc.layers.includes(selectedLayerRef.value)) {
        return selectedLayerRef.value;
    }

    return store.elc.layers[0];
});

const selectedLayerIndex = computed<number>(() => {
    return selectedLayer.value ? store.elc.layers.indexOf(selectedLayer.value) : -1;
});

const allHaveId = computed<boolean>(() => store.elc.layers.every(layerConf => !!layerConf.id));
const allUniqueIds = computed<boolean>(() => {
    const layerIds = store.elc.layers.map(layerConf => layerConf.id).filter(id => !!id);
    const checkSet = new Set(layerIds);
    return layerIds.length === checkSet.size;
});

const layerTabs = computed(() => [
    { id: 'basics' as LayerTab, label: t('layers.tabs.basics') },
    { id: 'source' as LayerTab, label: t('layers.tabs.source') },
    { id: 'interaction' as LayerTab, label: t('layers.tabs.interaction') },
    { id: 'display' as LayerTab, label: t('layers.tabs.display') },
    { id: 'advanced' as LayerTab, label: t('layers.tabs.advanced') }
]);

const layerTypeOptions = computed(() => [
    {
        groupLabel: t('layer.type.group.esri'),
        groupOptions: [
            { label: t('layer.type.feature'), value: LayerType.FEATURE },
            { label: t('layer.type.mapImage'), value: LayerType.MAPIMAGE },
            { label: t('layer.type.tile'), value: LayerType.TILE },
            { label: t('layer.type.imagery'), value: LayerType.IMAGERY }
        ]
    },
    {
        groupLabel: t('layer.type.group.ogc'),
        groupOptions: [
            { label: t('layer.type.wfs'), value: LayerType.WFS },
            { label: t('layer.type.wms'), value: LayerType.WMS }
        ]
    },
    {
        groupLabel: t('layer.type.group.file'),
        groupOptions: [
            { label: t('layer.type.csv'), value: LayerType.CSV },
            { label: t('layer.type.geojson'), value: LayerType.GEOJSON },
            { label: t('layer.type.geojsonzip'), value: LayerType.GEOJSONZIPPED },
            { label: t('layer.type.shapefile'), value: LayerType.SHAPEFILE },
            { label: t('layer.type.flatty'), value: LayerType.FLATGEOBUF },
            { label: t('layer.type.flattyzip'), value: LayerType.FLATGEOBUFZIPPED }
        ]
    },
    {
        groupLabel: t('layer.type.group.data'),
        groupOptions: [
            { label: t('layer.type.datatable'), value: LayerType.DATATABLE },
            { label: t('layer.type.datacsv'), value: LayerType.DATACSV },
            { label: t('layer.type.datajson'), value: LayerType.DATAJSON }
        ]
    }
]);

const identifyModeOptions = computed(() => [
    { label: t('layer.identifyMode.geometric'), value: LayerIdentifyMode.GEOMETRIC },
    { label: t('layer.identifyMode.symbolic'), value: LayerIdentifyMode.SYMBOLIC },
    { label: t('layer.identifyMode.hybrid'), value: LayerIdentifyMode.HYBRID }
]);

const onMoveEnd = (evt: any) => {
    if (!evt.moved) {
        return;
    }

    const oldIdx: number = evt.moved.oldIndex;
    const newIdx: number = evt.moved.newIndex;

    if (oldIdx === newIdx) {
        return;
    }
};

const resetDraftLayer = () => {
    draftLayer.value = {
        id: '',
        layerType: LayerType.FEATURE,
        url: ''
    };
};

const startAddLayer = () => {
    addingLayer.value = true;
    layersSection.value = 'advanced';
    activeTab.value = 'basics';
};

const cancelDraftLayer = () => {
    addingLayer.value = false;
    resetDraftLayer();
};

const createDraftLayer = () => {
    const layer = {
        id: draftLayer.value.id ?? '',
        layerType: draftLayer.value.layerType ?? LayerType.FEATURE,
        name: draftLayer.value.name,
        url: draftLayer.value.url ?? ''
    } as RampLayerConfig;

    store.elc.layers.push(layer);
    selectedLayerRef.value = layer;
    addingLayer.value = false;
    resetDraftLayer();
    activeTab.value = 'basics';
};

const selectLayer = (layer: RampLayerConfig) => {
    selectedLayerRef.value = layer;
};

const removeLayer = (idx: number) => {
    const [removed] = store.elc.layers.splice(idx, 1);

    if (selectedLayerRef.value === removed) {
        selectedLayerRef.value = store.elc.layers[Math.min(idx, store.elc.layers.length - 1)];
    }
};

const reorderLayer = (idx: number, direction: number) => {
    const [elem] = store.elc.layers.splice(idx, 1);
    store.elc.layers.splice(idx + direction, 0, elem);
};

const layerDisplayName = (layer: RampLayerConfig, index: number) => {
    return layer.name || layer.id || t('layer.title', [index + 1]);
};

const layerTypeLabel = (layerType: LayerType) => {
    const options = layerTypeOptions.value.flatMap(group => group.groupOptions);
    return options.find(option => option.value === layerType)?.label ?? layerType;
};

const layerStatusClass = (layer: RampLayerConfig, index: number) => {
    if (!layer.id || duplicateLayerId(layer, index)) {
        return 'needs-id';
    }

    if (!layer.url) {
        return 'needs-source';
    }

    return 'ready';
};

const layerStatusLabel = (layer: RampLayerConfig, index: number) => {
    if (!layer.id) {
        return t('layers.status.needsId');
    }

    if (duplicateLayerId(layer, index)) {
        return t('layers.status.duplicateId');
    }

    if (!layer.url) {
        return t('layers.status.needsSource');
    }

    return t('layers.status.ready');
};

const duplicateLayerId = (layer: RampLayerConfig, index: number) => {
    return (
        !!layer.id &&
        store.elc.layers.some((candidate, candidateIndex) => {
            return candidateIndex !== index && candidate.id === layer.id;
        })
    );
};

const hasSourceOptions = (layer: RampLayerConfig) => {
    return (
        LayerTools.isMIL(layer) ||
        LayerTools.isCSV(layer) ||
        LayerTools.isGeoJson(layer) ||
        LayerTools.isWFS(layer) ||
        LayerTools.isFileLayer(layer) ||
        LayerTools.isParentLayer(layer)
    );
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
    children = children.filter(
        child => child.layerId === undefined || store.elc.layers.some(layerConf => layerConf.id === child.layerId)
    );

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

/**
 * Propagates layer id changes to a linked legend config, if exists
 */
const onLayerIdChange = (newId: string | undefined, idx: number) => {
    const layerConf = store.elc.layers[idx];

    if (!layerConf) {
        return;
    }

    if (store.elc.fixtures.legend?.root?.children) {
        const legendEntry = getLegendEntry(store.elc.fixtures.legend?.root, layerConf.id);
        if (legendEntry) {
            legendEntry.layerId = newId;
        }
    }
    layerConf.id = newId ?? '';
};

/**
 * Spits out an array of each layer's layer type, in order
 */
let layerTypeTracker = computed(() => store.elc.layers.map(l => l.layerType));

/**
 * Fancy nonsense to detect when a layer's layerType changes
 */
watch(layerTypeTracker, (newLayerTypes, oldLayerTypes) => {
    if (newLayerTypes.length === oldLayerTypes.length) {
        const allChangeIdxs = newLayerTypes
            .map((nlt, i) => (oldLayerTypes[i] === nlt ? -1 : i))
            .filter(idx => idx > -1);

        if (allChangeIdxs.length === 1) {
            const changeIdx = allChangeIdxs[0];
            rubbishRemover(store.elc.layers[changeIdx], oldLayerTypes[changeIdx], newLayerTypes[changeIdx]);
        }
    }
});

/**
 * Removes any invalid config stuff when a layer type changes
 */
const rubbishRemover = (config: RampLayerConfig, oldLayerType: LayerType, newLayerType: LayerType) => {
    const nossing = undefined;

    if (LayerTools.isParentLayer(oldLayerType)) {
        if (!LayerTools.isParentLayer(newLayerType)) {
            config.sublayers = nossing;
        }

        if (LayerTools.isMIL(oldLayerType)) {
            config.imageFormat = nossing;
        }
    } else {
        if (LayerTools.isParentLayer(newLayerType) && config.identifyMode === LayerIdentifyMode.SYMBOLIC) {
            config.identifyMode = nossing;
        }

        if (LayerTools.isAttributeLayer(oldLayerType)) {
            if (!LayerTools.isAttributeLayer(newLayerType)) {
                config.fieldMetadata = nossing;
                config.nameField = nossing;
                config.initialFilteredQuery = nossing;
                config.permanentFilteredQuery = nossing;
            }

            if (LayerTools.isVectorLayer(oldLayerType)) {
                if (!LayerTools.isVectorLayer(newLayerType)) {
                    config.maptipField = nossing;
                    config.customRenderer = nossing;
                    config.drawOrder = nossing;
                }

                if (LayerTools.isFileLayer(oldLayerType)) {
                    if (!LayerTools.isFileLayer(newLayerType)) {
                        config.caching = nossing;
                        config.colour = nossing;
                    }

                    if (LayerTools.isCSV(oldLayerType)) {
                        config.latField = nossing;
                        config.longField = nossing;
                    } else if (LayerTools.isWFS(oldLayerType)) {
                        config.xyInAttribs = nossing;
                    }
                }
            }
        }
    }

    if (LayerTools.isToleranceLayer(oldLayerType) && !LayerTools.isToleranceLayer(newLayerType)) {
        config.touchTolerance = nossing;
        config.mouseTolerance = nossing;
    }
};
</script>

<style lang="scss">
.layers-editor {
    display: grid;
    gap: 12px;
}

.layers-workspace,
.layers-flow,
.layers-list,
.layer-tab-panel {
    display: grid;
    gap: 12px;
}

.layers-copy,
.layer-tab-copy,
.layer-tab-empty {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.layers-card {
    display: flex;
    min-height: 72px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 12px;
    background: #fff;
    color: #111827;
    text-align: left;
    outline: none;
    transition:
        border-color 120ms ease,
        background-color 120ms ease,
        box-shadow 120ms ease;

    strong,
    small,
    em {
        display: block;
    }

    strong {
        font-size: 14px;
        line-height: 18px;
    }

    small {
        margin-top: 4px;
        color: #6b7280;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }

    em {
        flex: 0 0 auto;
        min-width: 56px;
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 4px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        font-weight: 700;
        font-style: normal;
        line-height: 14px;
        text-align: center;
    }

    &:hover,
    &:focus {
        border-color: #26374a;
        background: #f3f6f9;
        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
    }

    &.primary {
        border-color: #26374a;
        background: #26374a;
        color: #fff;
        justify-content: flex-start;

        small,
        em {
            color: #e5edf5;
        }

        em {
            border-color: rgba(255, 255, 255, 0.32);
            background: rgba(255, 255, 255, 0.14);
        }
    }
}

.layers-back {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 999px;
    padding: 5px 9px;
    color: #26374a;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;

    span {
        font-size: 20px;
        line-height: 16px;
    }

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.layers-toolbar {
    display: grid;
    gap: 12px;
}

.layers-toolbar-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

.layers-section-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;

    span {
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 3px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        line-height: 14px;
    }
}

.layers-primary-action,
.layers-secondary-action {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    outline: none;
    transition:
        background-color 120ms ease,
        border-color 120ms ease,
        color 120ms ease,
        box-shadow 120ms ease;
}

.layers-primary-action {
    border: 1px solid #26374a;
    background-color: #26374a;
    color: #fff !important;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

    &:hover,
    &:focus {
        border-color: #1f2d3d;
        background-color: #1f2d3d;
        color: #fff !important;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
    }
}

.layers-secondary-action {
    border: 1px solid #c9d3df;
    background-color: #eef2f6;
    color: #26374a !important;

    &:hover,
    &:focus,
    &.done {
        border-color: #26374a;
        background-color: #dfe7ef;
        color: #26374a !important;
    }
}

.layers-warning {
    margin: 0;
    border: 1px solid #f1c40f;
    border-radius: 6px;
    padding: 9px 10px;
    background: #fff8db;
    color: #4b3b00;
    font-size: 12px;
    line-height: 17px;
}

.layers-empty,
.layer-draft,
.layers-list-panel,
.layer-inspector {
    border: 1px solid #d8dee5;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.layer-draft {
    display: grid;
    gap: 12px;
    padding: 12px;
}

.layer-draft-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;

    div {
        display: grid;
        gap: 3px;
    }

    strong {
        color: #111827;
        font-size: 14px;
        line-height: 18px;
    }

    span {
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}

.layer-draft-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #eef2f6;
    padding-top: 12px;
}

@media (max-width: 520px) {
    .layers-toolbar-actions,
    .layer-draft-actions {
        display: grid;
        grid-template-columns: 1fr;
    }

    .layers-primary-action,
    .layers-secondary-action {
        width: 100%;
    }
}

.layers-empty {
    display: grid;
    gap: 8px;
    padding: 14px;

    strong {
        color: #111827;
        font-size: 14px;
        line-height: 18px;
    }

    span {
        color: #4b5563;
        font-size: 13px;
        line-height: 18px;
    }
}

.layers-panel-header {
    display: grid;
    gap: 3px;
    border-bottom: 1px solid #eef2f6;
    padding: 12px;

    strong {
        color: #111827;
        font-size: 14px;
        line-height: 18px;
    }

    span {
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}

.layers-list {
    padding: 10px;
}

.layer-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 10px;
    background: #fff;
    transition:
        border-color 120ms ease,
        background-color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus-within,
    &.active {
        border-color: #26374a;
        background: #f8fafc;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
    }
}

.layer-row-main {
    display: grid;
    min-width: 0;
    gap: 4px;
    text-align: left;
    outline: none;
}

.layer-row-title {
    min-width: 0;
    overflow: hidden;
    color: #111827;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.layer-row-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    color: #6b7280;
    font-size: 12px;
    line-height: 16px;
}

.layer-status {
    display: inline-flex;
    width: fit-content;
    max-width: 130px;
    align-items: center;
    justify-content: center;
    justify-self: end;
    overflow: hidden;
    border: 1px solid #d8dee5;
    border-radius: 999px;
    padding: 4px 8px;
    background: #f8fafc;
    color: #26374a;
    font-size: 11px;
    font-weight: 700;
    font-style: normal;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.ready {
        border-color: #b8d8c0;
        background: #eef8f0;
        color: #176a2e;
    }

    &.needs-id,
    &.needs-source {
        border-color: #f1c40f;
        background: #fff8db;
        color: #5f4700;
    }
}

.layer-row-actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: flex-end;
}

.layer-reorder-buttons {
    display: flex;
}

.layer-icon-button {
    display: inline-flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    color: #374151;
    outline: none;
    transition:
        background-color 120ms ease,
        color 120ms ease;

    svg {
        width: 18px;
        height: 18px;
    }

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
        background: #eef2f6;
        color: #26374a;
    }

    &:disabled {
        color: #9ca3af;
        cursor: not-allowed;
    }
}

.layer-inspector {
    display: grid;
    overflow: hidden;
}

.layer-inspector-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 1px solid #eef2f6;
    padding: 12px;

    span {
        color: #6b7280;
        font-size: 11px;
        font-weight: 700;
        line-height: 14px;
        text-transform: uppercase;
    }

    h4 {
        margin: 2px 0 0;
        color: #111827;
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
    }
}

.layer-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    border-bottom: 1px solid #eef2f6;
    padding: 8px 10px;

    button {
        flex: 0 0 auto;
        border-radius: 999px;
        padding: 6px 9px;
        color: #4b5563;
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        outline: none;

        &:hover,
        &:focus,
        &.active {
            background: #eef2f6;
            color: #26374a;
        }

        &.active {
            box-shadow: inset 0 0 0 1px #c9d3df;
        }
    }
}

.layer-tab-panel {
    padding: 12px;
}
</style>
