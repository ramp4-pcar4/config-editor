<script setup lang="ts">
import { LayerIdentifyMode, LayerType, type RampLayerConfig } from '@/definitions';
import { ref } from 'vue';
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

const store = useStore()

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

const imgFormatOpts = ref(['png', 'png8', 'png24', 'png32', 'jpg', 'pdf', 'bmp', 'gif', 'svg']);

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
</script>

<template>
  <div>
    <div class="flex items-center">
      <h1 class="text-2xl font-semibold">Layers ({{ store.configs[store.editingLang].layers.length }})</h1>
      <!-- add item button -->
      <button
        class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
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
        <span class="px-2"> Add layer </span>
      </button>
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
              <button class="cursor-move handle mr-1 sm:mr-5" @click.stop>
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
              <button class="mr-1 sm:mr-5">
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
                <button @click.stop="removeLayer(index)" class="mr-1">
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
                  <select v-model="element.layerType">
                    <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <input-header
                    title="ID"
                    description="ID of the layer. Should be unique for every layer."
                    required
                  />
                  <input type="text" v-model="element.id" />
                </div>
                <div>
                  <input-header title="Name" description="Display name of the layer." />
                  <input type="text" v-model="element.name" />
                </div>
                <div>
                  <input-header
                    title="URL"
                    description="Service endpoint of the layer. Should match the layer type."
                    required
                  />
                  <input type="text" v-model="element.url" />
                </div>
                <div
                  v-if="
                    element.layerType !== LayerType.MAPIMAGE && element.layerType !== LayerType.WMS
                  "
                >
                  <input-header title="Name Field" description="Display field of the layer." />
                  <input type="text" v-model="element.nameField" />
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
                  <input type="text" v-model="element.tooltipField" />
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
                  />
                </div>
                <div>
                  <input-header
                    title="Max Load Time"
                    description="The time (in milliseconds) a layer can load for before entering the error state.
                  Zero allows perpetual loading."
                  />
                  <input type="number" min="0" v-model="element.maxLoadTime" placeholder="20000" />
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
                  <input type="text" v-model="element.catalogueUrl" />
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
                  <input type="text" v-model="element.colour" />
                </div>
                <div v-if="element.layerType === LayerType.CSV">
                  <input-header title="Lat Field" description="The latitude field of the layer." />
                  <input type="text" v-model="element.latField" />
                </div>
                <div v-if="element.layerType === LayerType.CSV">
                  <input-header
                    title="Long Field"
                    description="The longitude field of the layer."
                  />
                  <input type="text" v-model="element.longField" />
                </div>
                <div v-if="element.layerType !== LayerType.WMS">
                  <input-header
                    title="Mouse Tolerance"
                    description="Tolerance in pixels when determining if a feature was clicked."
                  />
                  <input type="number" v-model="element.mouseTolerance" min="0" placeholder="5" />
                </div>
                <div v-if="element.layerType !== LayerType.WMS">
                  <input-header
                    title="Touch Tolerance"
                    description="Tolerance in pixels when determining if a feature was tapped."
                  />
                  <input type="number" v-model="element.touchTolerance" min="0" placeholder="15" />
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
                  <input type="text" v-model="element.initialFilteredQuery" />
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
                  <input type="text" v-model="element.permanentFilteredQuery" />
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
                  <select v-model="element.identifyMode">
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
                  <select v-model="element.imageFormat">
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
                  />
                </div>
                <div v-else-if="element.layerType === LayerType.CSV">
                  <input-header
                    title="Raw Data"
                    description="Optional content to use as the layer source (instead of loading via the url property). CSV accepts string."
                  />
                  <input type="text" v-model="element.rawData" />
                </div>
              </div>
              <div v-if="element.layerType === LayerType.MAPIMAGE" class="flex items-center mt-4">
                <input type="checkbox" v-model="element.singleEntryCollapse" />
                <InputHeader
                  title="Single Entry Collapse"
                  description="Indicates that the map image layer with a single layer entry should be rendered without the root group. Currently not supported."
                  type="checkbox"
                />
              </div>
              <div v-if="element.layerType === LayerType.WFS" class="flex items-center mt-4">
                <input type="checkbox" v-model="element.xyInAttribs" />
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
                <input type="checkbox" v-model="element.caching" />
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
