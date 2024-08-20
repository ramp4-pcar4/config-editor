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
import type {
  Field,
  RampLayerMapImageSublayerConfig,
  RampLayerWmsSublayerConfig
} from '@/definitions';
import { LayerType } from '@/definitions';
import List from '@/components/helpers/list.vue';

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

const emit = defineEmits(['update:modelValue']);

let sublayers = reactive<Array<any>>(props.modelValue ?? []);

watch(sublayers, () => {
  emit('update:modelValue', sublayers.length === 0 ? undefined : sublayers);
});

const milFields: Array<Field> = [
  {
    property: 'index',
    type: 'number',
    title: 'Index',
    description: 'Index of the layer in the map service.',
    required: true,
    min: 0
  },
  {
    property: 'name',
    type: 'string',
    title: 'Name',
    description: 'A descriptive name for the layer, can override the name coming from the service.'
  },
  {
    property: 'nameField',
    type: 'string',
    title: 'Name Field',
    description:
      'The display field of the layer. If it is not present the viewer will make an attempt to scrape this information.'
  },
  {
    property: 'initialFilteredQuery',
    type: 'string',
    title: 'Initial Filtered Query',
    description: 'Initial filter query to be applied to the layer. SQL WHERE clause format.'
  },
  {
    property: 'permanentFilteredQuery',
    type: 'string',
    title: 'Permanent Filtered Query',
    description:
      'Permanent filter query to be applied to the layer. Only passing data will be downloaded. SQL WHERE clause format.'
  },
  {
    property: 'customRenderer',
    type: 'object',
    title: 'Custom Renderer',
    description:
      'Optional renderer object to apply to the layer. Must be JSON that follows ESRI ArcGIS Server json convention.'
  },
  {
    property: 'cosmetic',
    type: 'boolean',
    title: 'Cosmetic',
    description:
      'Indicates if this sublayer should only be drawn on the layer, but not be displayed or treated as an interactive layer on the UI.'
  }
];

const wmsFields: Array<Field> = [
  {
    property: 'id',
    type: 'string',
    title: 'ID',
    description: 'Identification of the layer name in the WMS.',
    required: true
  },
  {
    property: 'name',
    type: 'string',
    title: 'Name',
    description: 'A descriptive name for the layer, can override the name coming from the service.'
  },
  {
    property: 'currentStyle',
    type: 'string',
    title: 'Current Style',
    description: 'Current style for the layer entry in the WMS. Currently not supported.'
  }
];
</script>

<template>
  <List
    v-model="sublayers"
    :item-fields="layerType === LayerType.MAPIMAGE ? milFields : wmsFields"
    title="Sublayers"
    :description="
      layerType === LayerType.MAPIMAGE
        ? 'Layer entries rendered as part of the map image layer group.'
        : 'Layer entries rendered as part of the WMS legend block.'
    "
    add-prompt="Add sublayer"
  >
    <template #item="{ index }">
      <Extent
        v-if="props.layerType === LayerType.MAPIMAGE"
        v-model="sublayers[index].extent"
        title="Extent"
      />
      <StyleLegends v-else v-model="sublayers[index].styleLegends" />
      <Controls v-model="sublayers[index].controls" />
      <Controls v-model="sublayers[index].disabledControls" disabled />
      <State v-model="sublayers[index].state" />
      <FieldMetadata
        v-model="sublayers[index].fieldMetadata"
        v-if="props.layerType === LayerType.MAPIMAGE"
      />
      <Fixtures
        v-if="props.layerType === LayerType.MAPIMAGE"
        v-model="sublayers[index].fixtures"
        :layer-type="props.layerType"
      />
    </template>
  </List>
</template>
