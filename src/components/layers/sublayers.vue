<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import Controls from '@/components/layers/controls.vue';
import Extent from '@/components/helpers/extent.vue';
import State from '@/components/layers/state.vue';
import FieldMetadata from '@/components/layers/field-metadata.vue';
import Fixtures from '@/components/layers/fixtures.vue';
import StyleLegends from '@/components/layers/style-legends.vue';
import type { RampLayerMapImageSublayerConfig, RampLayerWmsSublayerConfig } from '@/definitions';
import { LayerType } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampLayerMapImageSublayerConfig | RampLayerWmsSublayerConfig>>,
    required: false
  },
  layerType: {
    type: String as PropType<LayerType>,
    required: true
  }
});

const addSublayer = () => {
  sublayers.push({});
};

const removeSublayer = (idx: number) => {
  sublayers?.splice(idx, 1);
};

const emit = defineEmits(['update:modelValue']);

const sublayers = reactive<Array<any>>(props.modelValue ?? []);

watch(sublayers, () => {
  emit('update:modelValue', sublayers.length === 0 ? undefined : sublayers);
});
</script>

<template>
  <Collapsible>
    <template #header>
      <button class="arrow mr-1 sm:mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      <span class="text-lg">Sublayers ({{ sublayers.length }})</span>
      <!-- add item button -->
      <button
        @click.stop="addSublayer"
        class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
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
        <span class="px-2"> Add sublayer </span>
      </button>
    </template>
    <template #default>
      <draggable v-if="sublayers.length > 0" :list="sublayers" item-key="fake" handle=".handle">
        <template #item="{ element, index }">
          <Collapsible>
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
              <button class="mr-1 sm:mr-3 arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <span class="mr-1 sm:mr-5 sm:text-lg">{{
                props.layerType === LayerType.MAPIMAGE
                  ? `Sublayer ${element.index ?? index + 1}`
                  : element.id ?? `Sublayer ${index + 1}`
              }}</span>
              <button @click.stop="removeSublayer(index)" class="ml-auto">
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
            </template>
            <template #default>
              <div class="input-table">
                <div v-if="props.layerType === LayerType.MAPIMAGE">
                  <input-header
                    title="Index"
                    description="Index of the layer in the map service."
                    required
                  />
                  <input type="number" v-model="element.index" />
                </div>
                <div v-else>
                  <input-header
                    title="ID"
                    description="Identification of the layer name in the WMS."
                    required
                  />
                  <input type="text" v-model="element.id" />
                </div>
                <div>
                  <input-header
                    title="Name"
                    description="A descriptive name for the layer, can override the name coming from the service."
                  />
                  <input type="text" v-model="element.name" />
                </div>
                <div v-if="props.layerType === LayerType.MAPIMAGE">
                  <input-header
                    title="Name Field"
                    description="The display field of the layer. If it is not present the viewer will make an attempt to scrape this information."
                  />
                  <input type="text" v-model="element.nameField" />
                </div>
                <div v-else>
                  <input-header
                    title="Current Style"
                    description="Current style for the layer entry in the WMS. Currently not supported."
                  />
                  <input type="text" v-model="element.currentStyle" />
                </div>
                <div v-if="props.layerType === LayerType.MAPIMAGE">
                  <input-header
                    title="Initial Filtered Query"
                    description="Initial filter query to be applied to the layer. SQL WHERE clause format."
                  />
                  <input type="text" v-model="element.initialFilteredQuery" />
                </div>
                <div v-if="props.layerType === LayerType.MAPIMAGE">
                  <input-header
                    title="Permanent Filtered Query"
                    description="Permanent filter query to be applied to the layer. Only passing data will be downloaded. SQL WHERE clause format."
                  />
                  <input type="text" v-model="element.permanentFilteredQuery" />
                </div>
                <div v-if="props.layerType === LayerType.MAPIMAGE">
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
              </div>
              <div v-if="props.layerType === LayerType.MAPIMAGE" class="flex items-center mt-4">
                <input type="checkbox" v-model="element.cosmetic" />
                <InputHeader
                  title="Cosmetic"
                  description="Indicates if this sublayer should only be drawn on the layer, but not be displayed or treated as an interactive layer on the UI."
                  type="checkbox"
                />
              </div>
              <Extent
                v-if="props.layerType === LayerType.MAPIMAGE"
                v-model="element.extent"
                title="Extent"
              />
              <StyleLegends v-else v-model="element.styleLegends" />
              <Controls v-model="element.controls" />
              <Controls v-model="element.disabledControls" disabled />
              <State v-model="element.state" />
              <FieldMetadata
                v-model="element.fieldMetadata"
                v-if="props.layerType === LayerType.MAPIMAGE"
              />
              <Fixtures
                v-if="props.layerType === LayerType.MAPIMAGE"
                v-model="element.fixtures"
                :layer-type="props.layerType"
              />
            </template>
          </Collapsible>
        </template>
      </draggable>
    </template>
  </Collapsible>
</template>

<style lang="scss" scoped></style>
