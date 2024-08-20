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
let fieldMap = reactive<Array<any>>(props.modelValue ?? []);

watch(fieldMap, () => {
  emit('update:modelValue', fieldMap.length === 0 ? undefined : fieldMap);
});

const itemFields: Array<Field> = [
  {
    property: 'field',
    title: 'Field',
    description: 'The name of the field the column names are mapped to.',
    type: 'string'
  },
  {
    property: 'sources',
    title: 'Sources',
    description:
      'The names of the columns that are mapped to the destination field. Must be a comma-separated list of strings.',
    type: 'array'
  }
];
</script>

<template>
  <List
    v-model="fieldMap"
    :item-fields="itemFields"
    title="Field Mappings"
    description="Defines mappings between layer fields for merging layers with varying column names."
    add-prompt="Add mapping"
  />
</template>
