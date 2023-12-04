<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import Extent from '@/components/helpers/extent.vue';
import List from '@/components/helpers/list.vue';

import type { Field, RampExtentSetConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampExtentSetConfig>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const extentSets = reactive<Array<RampExtentSetConfig>>(props.modelValue ?? []);

watch(extentSets, () => {
  emit('update:modelValue', extentSets.length === 0 ? undefined : extentSets);
});

const itemFields: Array<Field> = [
  {
    property: 'id',
    title: 'ID',
    description: 'A unique id identifying the extent set.',
    type: 'string',
    required: true
  }
];
</script>

<template>
  <List
    top-level
    :item-fields="itemFields"
    v-model="extentSets"
    title="Extent Sets"
    description="The default, full and maximum extents of the map."
    add-prompt="Add extent set"
  >
    <template #item="{ index }">
      <Extent
        title="Default"
        description="The default (starting) extent."
        v-model="extentSets[index].default"
      />
      <Extent
        title="Full"
        description="The full extent; default will be used if not supplied."
        v-model="extentSets[index].full"
      />
      <Extent
        title="Maximum"
        description="The maximum extent; full or default extents will be used if not supplied."
        v-model="extentSets[index].maximum"
      />
    </template>
  </List>
</template>

<style lang="scss" scoped></style>
