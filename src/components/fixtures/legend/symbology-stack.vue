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
let symbologyStack = reactive<Array<any>>(props.modelValue ?? []);

watch(symbologyStack, () => {
  emit('update:modelValue', symbologyStack.length === 0 ? undefined : symbologyStack);
});

const itemFields: Array<Field> = [
  {
    property: 'image',
    title: 'Image',
    description: 'Either a data URL or a URL to a source that supports CORS headers.',
    type: 'string',
    required: true
  },
  {
    property: 'text',
    title: 'Text',
    description: 'Description of a layer feature.',
    type: 'string',
    required: true
  },
  {
    property: 'sqlQuery',
    title: 'SQL Query',
    description:
      'An SQL where clause by which the map and datatable attributes can be filtered. All the query results for the symbology stack should cover all attributes for that layer.',
    type: 'string',
    required: false
  }
];
</script>

<template>
  <List
    v-model="symbologyStack"
    :item-fields="itemFields"
    title="Symbology Stack"
    description="A collection of image-label pairings making up a layer's symbology stack."
    add-prompt="Add symbol"
    singular="Symbol"
  />
</template>
