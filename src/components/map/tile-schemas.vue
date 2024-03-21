<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import type { Field, RampTileSchemaConfig } from '@/definitions';
import List from '@/components/helpers/list.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampTileSchemaConfig>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const tileSchemas = reactive<Array<RampTileSchemaConfig>>(props.modelValue ?? []);

watch(tileSchemas, () => {
  tileSchemas.forEach((ts) => {
    if (ts.thumbnailTileUrls && ts.thumbnailTileUrls.length === 0) {
      delete ts.thumbnailTileUrls;
    }
  });
  emit('update:modelValue', tileSchemas.length === 0 ? undefined : tileSchemas);
});

const itemFields: Array<Field> = [
  {
    property: 'id',
    title: 'ID',
    description: 'A unique id identifying the tile schema.',
    type: 'string',
    required: true
  },
  {
    property: 'name',
    title: 'Name',
    description:
      'The name to display in the basemap selector for the set of basemaps referencing this schema.',
    type: 'string',
    required: true
  },
  {
    property: 'extentSetId',
    title: 'Extent Set ID',
    description: 'Identification link to extent set data defined in map.extentSets.',
    type: 'string',
    required: true
  },
  {
    property: 'lodSetId',
    title: 'Lod Set ID',
    description: 'Identification link to lod set data defined in map.lodSets.',
    type: 'string',
    required: true
  },
  {
    property: 'thumbnailTileUrls',
    title: 'Thumbnail Tile URLs',
    description:
      "The comma separated list of two horizontally-adjacent tile URLs used to create the basemap thumbnail. URLs take the form of '/tile/<LOD_ID>/<VERTICAL_TILE_INDEX>/<HORIZONTAL_TILE_INDEX>'.",
    type: 'array'
  }
];
</script>

<template>
  <List
    top-level
    :item-fields="itemFields"
    v-model="tileSchemas"
    title="Tile Schemas"
    add-prompt="Add tile schema"
    description="A unique combination of an LOD and an extent set (each basemap must fit into a tile schema)."
    required
  />
</template>
