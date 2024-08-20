<script setup lang="ts">
import List from '@/components/helpers/list.vue';
import type { Field } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
let layers = reactive<Array<any>>(props.modelValue ?? []);

watch(layers, () => {
  const layersCopy = JSON.parse(JSON.stringify(layers));

  emit(
    'update:modelValue',
    layersCopy.length === 0
      ? undefined
      : layersCopy.map((layer: any) => {
          if (!Array.isArray(layer.sublayers) || layer.sublayers.length === 0) {
            delete layersCopy.sublayers;
          } else {
            layer.sublayers = layer.sublayers.map((sublayer: string) => parseInt(sublayer));
          }
          return layer;
        })
  );
});

const itemFields: Array<Field> = [
  {
    property: 'layerId',
    title: 'Layer ID',
    description: 'The layer ID.',
    type: 'string',
    required: true
  },
  {
    property: 'sublayers',
    title: 'Sublayers',
    description:
      'The IDs of the sublayers when the provided layer is a map image layer. Must be a comma-separated list of integers.',
    type: 'array'
  }
];
</script>

<template>
  <List
    v-model="layers"
    :item-fields="itemFields"
    title="Layers"
    description="A collection of the layers present in the grid."
    add-prompt="Add layer"
  />
</template>
