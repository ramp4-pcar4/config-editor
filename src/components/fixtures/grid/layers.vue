<script setup lang="ts">
import List from '@/components/helpers/list.vue';
import type { Field } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const { t } = useI18n();
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
    title: 'grid.mergeGrid.layer.layerId.title',
    description: 'grid.mergeGrid.layer.layerId.description',
    type: 'string',
    required: true
  },
  {
    property: 'sublayers',
    title: 'grid.mergeGrid.layer.sublayers.title',
    description: 'grid.mergeGrid.layer.sublayers.description',
    type: 'array'
  }
];
</script>

<template>
  <List
    v-model="layers"
    :item-fields="itemFields"
    :title="t('grid.mergeGrid.layers.title')"
    :description="t('grid.mergeGrid.layers.description')"
    :add-prompt="t('grid.mergeGrid.layers.add')"
    :remove-prompt="t('grid.mergeGrid.layers.remove')"
    :singular="t('grid.mergeGrid.layers.singular')"
  />
</template>
