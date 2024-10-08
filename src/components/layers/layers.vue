<script setup lang="ts">
import { LayerIdentifyMode, LayerType, type RampLayerConfig } from '@/definitions';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';

import InputHeader from '@/components/helpers/input-header.vue';
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

const store = useStore();

const expanded = ref<Array<boolean>>([]);
const typeOptions = ref([
  { text: 'Feature', value: LayerType.FEATURE },
  { text: 'Map Image', value: LayerType.MAPIMAGE },
  { text: 'WFS', value: LayerType.WFS },
  { text: 'WMS', value: LayerType.WMS },
  { text: 'CSV', value: LayerType.CSV },
  { text: 'Geojson', value: LayerType.GEOJSON },
  { text: 'Shapefile', value: LayerType.SHAPEFILE }
]);
const updatedLegend = ref<boolean>(false);
const imgFormatOpts = ref(['png', 'png8', 'png24', 'png32', 'jpg', 'pdf', 'bmp', 'gif', 'svg']);

const allHaveId = computed<boolean>(() =>
  store.configs[store.editingLang].layers.every((layerConf) => !!layerConf.id)
);
const allUniqueIds = computed<boolean>(() => {
  const layerIds = store.configs[store.editingLang].layers
    .map((layerConf) => layerConf.id)
    .filter((id) => !!id);
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

  const val = expanded.value[oldIdx];

  expanded.value.splice(oldIdx, 1);
  expanded.value.splice(newIdx, 0, val);
};

const addLayer = () => {
  store.configs[store.editingLang].layers.push({
    id: '',
    layerType: LayerType.FEATURE,
    url: ''
  });
  expanded.value.push(false);
};

const removeLayer = (idx: number) => {
  store.configs[store.editingLang].layers.splice(idx, 1);
  expanded.value.splice(idx, 1);
};

const reorderLayer = (idx: number, direction: number) => {
  const [elem] = store.configs[store.editingLang].layers.splice(idx, 1);
  store.configs[store.editingLang].layers.splice(idx + direction, 0, elem);

  const [exp] = expanded.value.splice(idx, 1);
  expanded.value.splice(idx + direction, 0, exp);
};

const getLegendEntry = (root: any, layerId: string): any => {
  if (root.layerId === layerId) {
    return root;
  } else {
    let result = undefined;
    root?.children?.forEach((child: any) => {
      const entry = getLegendEntry(child, layerId);
      if (!!entry) {
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
    (child) =>
      child.layerId === undefined ||
      store.configs[store.editingLang].layers.some(
        (layerConf: RampLayerConfig) => layerConf.id === child.layerId
      )
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
  if (store.configs[store.editingLang].layers.length === 0 || updatedLegend.value) {
    return;
  }
  if (!store.configs[store.editingLang].fixtures.legend) {
    store.configs[store.editingLang].fixtures.legend = { root: { children: [] } };
  } else if (!store.configs[store.editingLang].fixtures.legend.root) {
    store.configs[store.editingLang].fixtures.legend.root = { children: [] };
  } else if (!store.configs[store.editingLang].fixtures.legend.root.children) {
    store.configs[store.editingLang].fixtures.legend.root.children = [];
  }
  store.configs[store.editingLang].layers.forEach((layerConf: RampLayerConfig) => {
    if (!legendEntryExists(store.configs[store.editingLang].fixtures.legend.root, layerConf.id)) {
      store.configs[store.editingLang].fixtures.legend.root.children.push({
        layerId: layerConf.id
      });
    }
  });

  store.configs[store.editingLang].fixtures.legend.root.children = removeLayerItems(
    store.configs[store.editingLang].fixtures.legend.root.children
  );

  updatedLegend.value = true;
  setTimeout(() => {
    updatedLegend.value = false;
  }, 2000);
};

const onLayerIdChange = (e: InputEvent, idx: number) => {
  const layerConf = store.configs[store.editingLang].layers[idx];
  if (store.configs[store.editingLang].fixtures.legend?.root?.children) {
    const legendEntry = getLegendEntry(
      store.configs[store.editingLang].fixtures.legend?.root,
      layerConf.id
    );
    if (legendEntry) {
      legendEntry.layerId = (e.target as HTMLInputElement).value;
    }
  }
  layerConf.id = (e.target as HTMLInputElement).value;
};
</script>

<template>
  <div>
    <div class="flex items-center">
      <h1 class="text-2xl font-semibold">
        Layers ({{ store.configs[store.editingLang].layers.length }})
      </h1>
      <div class="flex ml-auto">
        <button
          class="bg-black hover:bg-gray-800 p-1 text-white flex-shrink-0 flex items-center justify-center"
          :class="updatedLegend ? 'cursor-default' : 'cursor-pointer'"
          @click="updateLegend"
          :aria-label="updatedLegend ? 'Updated Legend!' : 'Autopopulate Legend'"
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
            {{ updatedLegend ? 'Updated Legend!' : 'Autopopulate Legend' }}
          </span>
          <button
            class="relative bottom-[1.5px]"
            v-if="!updatedLegend && (!allHaveId || !allUniqueIds)"
            content="A unique ID must be specified for each layer for the legend to update correctly."
            v-tippy="{
              trigger: 'click focus'
            }"
            @click.stop
          >
            ⚠
          </button>
          <button
            v-if="!updatedLegend"
            content="Updates the legend by creating entries in the top root level for any layers 
            that do not have one and removing entries for layers not present in the layers config."
            aria-label="Updates the legend by creating entries in the top root level for any layers 
            that do not have one and removing entries for layers not present in the layers config."
            v-tippy="{
              trigger: 'click focus'
            }"
            @click.stop
          >
            <svg
              class="fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
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
          <span class="px-2"> Add Layer </span>
        </button>
      </div>
    </div>
    <div>
      <draggable
        v-if="store.configs[store.editingLang].layers.length > 0"
        :list="store.configs[store.editingLang].layers"
        item-key="fake"
        handle=".handle"
        @change="onMoveEnd"
      >
        <template #item="{ element, index }">
          <Collapsible :thick-border="true">
            <template #header>
              <button class="cursor-move handle mr-1 sm:mr-5" @click.stop aria-label="Reorder">
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
              <button class="mr-1 sm:mr-5" :aria-label="expanded[index] ? 'Collapse' : 'Expand'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                  :class="{ 'rotate-180': expanded[index] }"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <span class="mr-1 sm:mr-5 sm:text-lg">{{
                element.id ? element.id : `Layer ${index + 1}`
              }}</span>
              <div class="flex ml-auto">
                <button @click.stop="removeLayer(index)" class="mr-1" aria-label="Remove">
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
                    aria-label="Move up"
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
                    :disabled="index === store.configs[store.editingLang].layers.length - 1"
                    class="disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label="Move down"
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
                <div>
                  <input-header title="Type" required />
                  <select v-model="element.layerType" aria-label="Type">
                    <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <input-header
                    title="ID"
                    description="ID of the layer. Should be unique for every layer. 
                    Updating this field will also automatically update the layer ID field for the legend entry associated with this layer, if it exists."
                    required
                  />
                  <input
                    aria-label="ID"
                    type="text"
                    :value="element.id"
                    @input="($event) => onLayerIdChange($event as InputEvent, index)"
                  />
                </div>
                <div>
                  <input-header title="Name" description="Display name of the layer." />
                  <input type="text" v-model="element.name" aria-label="Name" />
                </div>
                <div>
                  <input-header
                    title="URL"
                    description="Service endpoint of the layer. Should match the layer type."
                    required
                  />
                  <input type="text" v-model="element.url" aria-label="URL" />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header title="Name Field" description="Display field of the layer." />
                  <input type="text" v-model="element.nameField" aria-label="Name Field" />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header
                    title="Tooltip Field"
                    description="Field to be used for tooltips. If not present, the viewer will use name field, if
                  provided."
                  />
                  <input type="text" v-model="element.tooltipField" aria-label="Tooltip Field" />
                </div>
                <div
                  v-if="
                    element.layerType === LayerType.MAPIMAGE ||
                    element.layerType === LayerType.WMS ||
                    element.layerType === LayerType.FEATURE
                  "
                >
                  <input-header
                    title="Refresh Interval"
                    description="Automatic refresh interval of the layer (minutes). Max is 100. Zero disables
                  refresh. Currently not supported."
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    v-model="element.refreshInterval"
                    placeholder="0"
                    aria-label="Refresh Interval"
                  />
                </div>
                <div>
                  <input-header
                    title="Expected Draw Time"
                    description="The time (in milliseconds) after which a 'slow-to-draw' notification is shown.
                  Zero disables notifications."
                  />
                  <input
                    type="number"
                    min="0"
                    v-model="element.expectedDrawTime"
                    placeholder="10000"
                    aria-label="Expected Draw Time"
                  />
                </div>
                <div>
                  <input-header
                    title="Expected Load Time"
                    description="The time (in milliseconds) after which a 'slow-to-load' notification is shown.
                  Zero disables notifications."
                  />
                  <input
                    type="number"
                    min="0"
                    v-model="element.expectedLoadTime"
                    placeholder="4000"
                    aria-label="Expected Load Time"
                  />
                </div>
                <div>
                  <input-header
                    title="Max Load Time"
                    description="The time (in milliseconds) a layer can load for before entering the error state.
                  Zero allows perpetual loading."
                  />
                  <input
                    type="number"
                    min="0"
                    v-model="element.maxLoadTime"
                    placeholder="20000"
                    aria-label="Max Load Time"
                  />
                </div>
                <div
                  v-if="
                    element.layerType === LayerType.MAPIMAGE ||
                    element.layerType === LayerType.WMS ||
                    element.layerType === LayerType.FEATURE
                  "
                >
                  <input-header
                    title="Catalogue URL"
                    description="Catalogue url of the layer service. Currently not supported."
                  />
                  <input type="text" v-model="element.catalogueUrl" aria-label="Catalogue URL" />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE &&
                    element.layerType !== LayerType.WMS &&
                    element.layerType !== LayerType.FEATURE
                  "
                >
                  <input-header
                    title="Colour"
                    description="The hex code representing the layer symbology colour."
                  />
                  <input type="text" v-model="element.colour" aria-label="Colour" />
                </div>
                <div v-if="element.layerType === LayerType.CSV">
                  <input-header title="Lat Field" description="The latitude field of the layer." />
                  <input type="text" v-model="element.latField" aria-label="Lat Field" />
                </div>
                <div v-if="element.layerType === LayerType.CSV">
                  <input-header
                    title="Long Field"
                    description="The longitude field of the layer."
                  />
                  <input type="text" v-model="element.longField" aria-label="Long Field" />
                </div>
                <div v-if="element.layerType !== LayerType.WMS">
                  <input-header
                    title="Mouse Tolerance"
                    description="Tolerance in pixels when determining if a feature was clicked."
                  />
                  <input
                    type="number"
                    v-model="element.mouseTolerance"
                    min="0"
                    placeholder="5"
                    aria-label="Mouse Tolerance"
                  />
                </div>
                <div v-if="element.layerType !== LayerType.WMS">
                  <input-header
                    title="Touch Tolerance"
                    description="Tolerance in pixels when determining if a feature was tapped."
                  />
                  <input
                    type="number"
                    v-model="element.touchTolerance"
                    min="0"
                    placeholder="15"
                    aria-label="Touch Tolerance"
                  />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header
                    title="Initial Filtered Query"
                    description="Initial filter query to be applied to the layer. SQL WHERE clause format."
                  />
                  <input
                    type="text"
                    v-model="element.initialFilteredQuery"
                    aria-label="Initial Filtered Query"
                  />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header
                    title="Permanent Filtered Query"
                    description="Permanent filter query to be applied to the layer. Only passing data will be downloaded. SQL WHERE clause format."
                  />
                  <input
                    type="text"
                    v-model="element.permanentFilteredQuery"
                    aria-label="Permanent Filtered Query"
                  />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header
                    title="Identify Mode"
                    description="Determines how features should be identified. By geometry, by symbol, or both."
                  />
                  <select v-model="element.identifyMode" aria-label="Identify Mode">
                    <option
                      v-for="mode in Object.keys(LayerIdentifyMode)
                      .map((m) => (<any>LayerIdentifyMode)[m])
                      .filter((m) => m !== 'none')"
                      :key="mode"
                      :value="mode"
                    >
                      {{ mode }}
                    </option>
                  </select>
                </div>
                <div v-if="element.layerType === LayerType.MAPIMAGE">
                  <input-header
                    title="Image Format"
                    description="The format of the layer image output. Default service setting used if not supplied (usually png32)."
                  />
                  <select v-model="element.imageFormat" aria-label="Image Format">
                    <option v-for="format in imgFormatOpts" :key="format" :value="format">
                      {{ format }}
                    </option>
                  </select>
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header
                    title="Custom Renderer"
                    description="Optional renderer object to apply to the layer. Must be JSON that follows ESRI ArcGIS Server json convention."
                  />
                  <input
                    type="text"
                    :value="JSON.stringify(element.customRenderer)"
                    @input="e => element.customRenderer = JSON.parse((e.target as HTMLInputElement).value)"
                    aria-label="Custom Renderer"
                  />
                </div>
                <div v-if="element.layerType === LayerType.GEOJSON">
                  <input-header
                    title="Raw Data"
                    description="Optional content to use as the layer source (instead of loading via the url property). GeoJSON accepts stringified object."
                  />
                  <input
                    type="text"
                    :value="JSON.stringify(element.rawData)"
                    @input="e => element.rawData = JSON.parse((e.target as HTMLInputElement).value)"
                    aria-label="Raw Data"
                  />
                </div>
                <div v-else-if="element.layerType === LayerType.CSV">
                  <input-header
                    title="Raw Data"
                    description="Optional content to use as the layer source (instead of loading via the url property). CSV accepts string."
                  />
                  <input type="text" v-model="element.rawData" aria-label="Raw Data" />
                </div>
              </div>
              <div v-if="element.layerType === LayerType.MAPIMAGE" class="flex items-center mt-4">
                <input
                  type="checkbox"
                  v-model="element.singleEntryCollapse"
                  aria-label="Single Entry Collapse"
                />
                <InputHeader
                  title="Single Entry Collapse"
                  description="Indicates that the map image layer with a single layer entry should be rendered without the root group. Currently not supported."
                  type="checkbox"
                />
              </div>
              <div v-if="element.layerType === LayerType.WFS" class="flex items-center mt-4">
                <input
                  type="checkbox"
                  v-model="element.xyInAttribs"
                  aria-label="XY In Attributes"
                />
                <InputHeader
                  title="XY In Attributes"
                  description="Indicates if the point co-ords should be copied to the feature attributes. Ignored for lines and polygons."
                  type="checkbox"
                />
              </div>
              <div
                v-if="
                  element.layerType !== LayerType.MAPIMAGE &&
                  element.layerType !== LayerType.WMS &&
                  element.layerType !== LayerType.FEATURE
                "
                class="flex items-center mt-4"
              >
                <input type="checkbox" v-model="element.caching" aria-label="Caching" />
                <InputHeader
                  title="Caching"
                  description="Indicates whether to preserve the layer's raw data after initiation. If set to true, reloading will not refresh data from the server."
                  type="checkbox"
                />
              </div>
              <Sublayers
                v-if="
                  element.layerType === LayerType.MAPIMAGE || element.layerType === LayerType.WMS
                "
                v-model="element.sublayers"
                :layer-type="element.layerType"
              />
              <Metadata v-model="element.metadata" />
              <Extent v-model="element.extent" title="Extent" />
              <Controls v-model="element.controls" />
              <Controls v-model="element.disabledControls" disabled />
              <State v-model="element.state" />
              <FieldMetadata
                v-model="element.fieldMetadata"
                v-if="
                  element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                "
              />
              <DrawOrder
                v-model="element.drawOrder"
                v-if="
                  element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                "
              />
              <Fixtures v-model="element.fixtures" :layer-type="element.layerType" />
            </template>
          </Collapsible>
        </template>
      </draggable>
    </div>
  </div>
</template>
