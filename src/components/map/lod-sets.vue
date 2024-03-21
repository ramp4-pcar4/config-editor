<script setup lang="ts">
import { type PropType, reactive, watch, ref } from 'vue';

// @ts-ignore
import { geo } from '@/lib/ramp.esm';

import List from '@/components/helpers/list.vue';

import type { Field, RampLodConfig, RampLodSetConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampLodSetConfig>>,
    required: false
  }
});

const lambertLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[0]);
const lambertLodsStr: string = JSON.stringify(lambertLods);
const mercatorLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[1]);
const mercatorLodsStr: string = JSON.stringify(mercatorLods);

const onLodTypeToggle = (name: string, idx: number) => {
  if (name === 'lambert') {
    lodSets.value[idx].lods = JSON.parse(lambertLodsStr);
  } else {
    lodSets.value[idx].lods = JSON.parse(mercatorLodsStr);
  }
};

const addLodSet = () => {
  lodSets.value.push({ id: '', lods: [] });
};

const removeLodSet = (idx: number) => {
  lodSets.value.splice(idx, 1);
};

const emit = defineEmits(['update:modelValue']);

const lodSets = ref<Array<RampLodSetConfig>>(props.modelValue ?? []);

watch(lodSets, () => {
  emit('update:modelValue', lodSets.value.length === 0 ? undefined : lodSets);
});

const setFields: Array<Field> = [
  {
    property: 'id',
    title: 'ID',
    description: 'A unique id identifying the lod set.',
    type: 'string',
    required: true
  }
];

const lodFields: Array<Field> = [
  {
    property: 'level',
    title: 'Level',
    type: 'number',
    required: true
  },
  {
    property: 'resolution',
    title: 'Resolution',
    type: 'number',
    required: true
  },
  {
    property: 'scale',
    title: 'Scale',
    type: 'number',
    required: true
  }
];
</script>

<template>
  <List
    top-level
    :item-fields="setFields"
    v-model="lodSets"
    title="Lod Sets"
    description="The levels of detail (zoom scales) available for the map."
    add-prompt="Add lod set"
    :add="addLodSet"
    :remove="removeLodSet"
  >
    <template #item="{ element, index }">
      <div class="mt-4 input-table">
        <div>
          <button
            class="bg-black text-white p-2 hover:bg-gray-800 rounded-md"
            @click="onLodTypeToggle('lambert', index)"
          >
            Use default lambert lods
          </button>
        </div>
        <div>
          <button
            class="bg-black text-white p-2 hover:bg-gray-800 rounded-md"
            @click="onLodTypeToggle('mercator', index)"
          >
            Use default mercator lods
          </button>
        </div>
      </div>
      <List
        :item-fields="lodFields"
        v-model="lodSets[index].lods"
        title="Lods"
        description="Level of details for a tile schema (i.e. zoom scales)."
        add-prompt="Add lod"
      />
    </template>
  </List>
</template>
