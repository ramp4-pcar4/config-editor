<script setup lang="ts">
// root.layers[].sublayers config nugget

import { type PropType, reactive, watch } from 'vue';

import Controls from '@/components/layers/controls.vue';
import Extent from '@/components/helpers/extent.vue';
import State from '@/components/layers/state.vue';
import FieldMetadata from '@/components/layers/field-metadata.vue';
import Fixtures from '@/components/layers/fixtures.vue';
import StyleLegends from '@/components/layers/style-legends.vue';
import type { Field, RampLayerMapImageSublayerConfig, RampLayerWmsSublayerConfig } from '@/definitions';
import { LayerType } from '@/definitions';
import List from '@/components/helpers/list.vue';
import { useI18n } from 'vue-i18n';

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

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let sublayers = reactive<Array<any>>(props.modelValue ?? []);

watch(sublayers, () => {
  emit('update:modelValue', sublayers.length === 0 ? undefined : sublayers);
});

const milFields: Array<Field> = [
  {
    property: 'index',
    type: 'number',
    title: 'layer.sublayer.index.title',
    description: 'layer.sublayer.index.description',
    required: true,
    min: 0
  },
  {
    property: 'name',
    type: 'string',
    title: 'layer.name.title',
    description: 'layer.name.description'
  },
  {
    property: 'nameField',
    type: 'string',
    title: 'layer.nameField.title',
    description: 'layer.nameField.description'
  },
  {
    property: 'initialFilteredQuery',
    type: 'string',
    title: 'layer.initialFilteredQuery.title',
    description: 'layer.initialFilteredQuery.description'
  },
  {
    property: 'permanentFilteredQuery',
    type: 'string',
    title: 'layer.permanentFilteredQuery.title',
    description: 'layer.permanentFilteredQuery.description'
  },
  {
    property: 'customRenderer',
    type: 'object',
    title: 'layer.customRenderer.title',
    description: 'layer.customRenderer.description'
  },
  {
    property: 'cosmetic',
    type: 'boolean',
    title: 'layer.sublayer.cosmetic.title',
    description: 'layer.sublayer.cosmetic.description'
  }
];

const wmsFields: Array<Field> = [
  {
    property: 'id',
    type: 'string',
    title: 'layer.id.title',
    description: 'layer.sublayer.wms.id.description',
    required: true
  },
  {
    property: 'name',
    type: 'string',
    title: 'layer.name.title',
    description: 'layer.name.description'
  },
  {
    property: 'currentStyle',
    type: 'string',
    title: 'layer.sublayer.currentStyle.title',
    description: 'layer.sublayer.currentStyle.description'
  }
];
</script>

<template>
  <List
    v-model="sublayers"
    :item-fields="layerType === LayerType.MAPIMAGE ? milFields : wmsFields"
    :title="t('layer.sublayers.title')"
    :description="
      layerType === LayerType.MAPIMAGE
        ? t('layer.sublayers.mapImage.description')
        : t('layer.sublayers.wms.description')
    "
    :add-prompt="t('layer.sublayers.add')"
    :remove-prompt="t('layer.sublayers.remove')"
    :singular="t('layer.sublayers.singular')"
  >
    <template #item="{ index }">
      <Extent
        v-if="props.layerType === LayerType.MAPIMAGE"
        v-model="sublayers[index].extent"
        :title="t('layer.extent')"
      />
      <StyleLegends v-else v-model="sublayers[index].styleLegends" />
      <Controls v-model="sublayers[index].controls" />
      <Controls v-model="sublayers[index].disabledControls" disabled />
      <State v-model="sublayers[index].state" />
      <FieldMetadata v-model="sublayers[index].fieldMetadata" v-if="props.layerType === LayerType.MAPIMAGE" />
      <Fixtures
        v-if="props.layerType === LayerType.MAPIMAGE"
        v-model="sublayers[index].fixtures"
        :layer-type="props.layerType"
      />
    </template>
  </List>
</template>
