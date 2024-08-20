<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import Layers from '@/components/fixtures/grid/layers.vue';
import FieldMap from '@/components/fixtures/grid/field-map.vue';
import Options from '@/components/fixtures/grid/options.vue';
import Controls from '@/components/fixtures/grid/controls.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

let mergeGrids = reactive<Array<any>>(props.modelValue ?? []);

watch(mergeGrids, () => {
  emit('update:modelValue', mergeGrids.length === 0 ? undefined : mergeGrids);
});
</script>

<template>
  <List
    v-model="mergeGrids"
    title="Merge Grids"
    description="Provides specifications for merge grids. Can also be used to configure single-layer grids, but the 'gridOption' property within the layer configuration object is preferred."
    add-prompt="Add merge grid"
    custom-only
    required
  >
    <template #item="{ element, index }">
      <div class="mt-4 input-table">
        <div>
          <InputHeader title="Grid ID" description="The unique ID of the grid." required />
          <input type="text" v-model="mergeGrids[index].gridId" />
        </div>
      </div>
      <Layers v-model="mergeGrids[index].layers" />
      <FieldMap v-model="mergeGrids[index].fieldMap" />
      <Options
        v-model="mergeGrids[index].options"
        title="Options"
        description="Optional properties configuration for the merge grid."
      />
    </template>
  </List>
</template>
