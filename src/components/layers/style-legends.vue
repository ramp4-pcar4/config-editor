<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import type { Field } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<{ name: string; url: string }>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

let styleLegends = reactive<Array<{ name: string; url: string }>>(props.modelValue ?? []);

watch(styleLegends, () => {
  emit('update:modelValue', styleLegends.length === 0 ? undefined : styleLegends);
});

const itemFields: Array<Field> = [
  {
    type: 'string',
    property: 'name',
    required: true,
    title: 'Name',
    description: 'The name of the style.'
  },
  {
    type: 'string',
    property: 'url',
    required: true,
    title: 'URL',
    description: 'The URL to the legend graphic.'
  }
];
</script>

<template>
  <List
    v-model="styleLegends"
    :item-fields="itemFields"
    title="Style Legends"
    add-prompt="Add style legend"
    description="List of map of all styles to legend graphic URL for layer entry in the WMS. Overrides the URLs from the WMS service. Mappings to non-default styles are currently not supported."
  />
</template>
