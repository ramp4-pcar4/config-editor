<script setup lang="ts">
import Caption from '@/components/map/caption.vue';
import TileSchemas from '@/components/map/tile-schemas.vue';
import ExtentSets from '@/components/map/extent-sets.vue';
import LodSets from '@/components/map/lod-sets.vue';
import Basemaps from '@/components/map/basemaps.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import { useStore } from '@/store';

const store = useStore();
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Map</h1>
    <div class="mt-4 input-table">
      <div>
        <InputHeader
          title="Initial Basemap ID"
          description="Initial basemap to load. If not supplied, viewer will select the first basemap in the basemaps list."
        />
        <input
          type="text"
          v-model="store.configs[store.editingLang].map.initialBasemapId"
          aria-label="Initial Basemap ID"
        />
      </div>
      <div>
        <InputHeader
          title="Point Zoom Scale"
          description="The zoom level when zooming to a point feature (e.g. when using the zoom button in the datagrid). Must be a positive integer."
        />
        <input
          type="number"
          placeholder="50000"
          min="1"
          v-model="store.configs[store.editingLang].map.pointZoomScale"
          aria-label="Point Zoom Scale"
        />
      </div>
      <div>
        <InputHeader
          title="Map Mouse Throttle"
          description="The amount of throttling (in milliseconds) to be used for the map mouse move event. A value of 0 means no throttle."
        />
        <input
          type="number"
          placeholder="0"
          min="0"
          v-model="store.configs[store.editingLang].map.mapMouseThrottle"
          aria-label="Map Mouse Throttle"
        />
      </div>
    </div>
    <TileSchemas v-model="store.configs[store.editingLang].map.tileSchemas" />
    <ExtentSets v-model="store.configs[store.editingLang].map.extentSets" />
    <LodSets v-model="store.configs[store.editingLang].map.lodSets" />
    <Basemaps v-model="store.configs[store.editingLang].map.basemaps" />
    <Caption v-model="store.configs[store.editingLang].map.caption" />
  </div>
</template>
