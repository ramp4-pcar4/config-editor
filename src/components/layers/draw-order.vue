<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import List from '@/components/helpers/list.vue';
import type { DrawOrder, Field } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<DrawOrder>>,
    required: false
  }
});

const itemFields: Array<Field> = [
  {
    type: 'string',
    property: 'field',
    title: 'Field',
    description: 'Layer field name contianing the value to order by.',
    required: true
  },
  {
    type: 'boolean',
    property: 'ascending',
    title: 'Ascending',
    description:
      'Direction to order in. True means smaller values are on top of larger values. False is the opposite.',
    required: true
  }
];

const emit = defineEmits(['update:modelValue']);

const drawOrder = reactive<Array<DrawOrder>>(props.modelValue ?? []);

watch(drawOrder, () => {
  emit('update:modelValue', drawOrder.length === 0 ? undefined : drawOrder);
});
</script>

<template>
  <List
    v-model="drawOrder"
    :item-fields="itemFields"
    title="Draw Order"
    add-prompt="Add draw order"
    description="Attribute fields used to control drawing order on the map for vector features. Note ESRI currently only supports one field."
  />
</template>
