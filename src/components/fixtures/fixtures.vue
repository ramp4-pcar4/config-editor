<script setup lang="ts">
import { useStore } from '@/store';
import Appbar from '@/components/fixtures/appbar.vue';
import AreasOfInterest from '@/components/fixtures/areas-of-interest.vue';
import Basemap from '@/components/fixtures/basemap/basemap.vue';
import Details from '@/components/fixtures/details/details.vue';
import LayerReorder from '@/components/fixtures/layer-reorder/layer-reorder.vue';
import Legend from '@/components/fixtures/legend/legend.vue';
import Geosearh from '@/components/fixtures/geosearch/geosearch.vue';
import Grid from '@/components/fixtures/grid/grid.vue';
import Settings from '@/components/fixtures/settings/settings.vue';
import Scrollguard from '@/components/fixtures/scrollguard/scrollguard.vue';

const store = useStore();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Fixtures</h1>
    <Basemap v-model="store.configs[store.editingLang].fixtures.basemap" />
    <Details v-model="store.configs[store.editingLang].fixtures.details" />
    <Geosearh v-model="store.configs[store.editingLang].fixtures.geosearch" />
    <Grid v-model="store.configs[store.editingLang].fixtures.grid" />
    <LayerReorder v-model="store.configs[store.editingLang].fixtures['layer-reorder']" />
    <Legend v-model="store.configs[store.editingLang].fixtures.legend" />
    <Settings v-model="store.configs[store.editingLang].fixtures.settings" />
    <Scrollguard v-model="store.configs[store.editingLang].fixtures.scrollguard" />
  </div>
</template>
