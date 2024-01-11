<script setup lang="ts">
import { useStore } from '@/store';
import Appbar from '@/components/fixtures/appbar.vue';
import AreasOfInterest from '@/components/fixtures/areas-of-interest.vue';
import Basemap from '@/components/fixtures/basemap/basemap.vue';
import Details from '@/components/fixtures/details/details.vue';
import Legend from '@/components/fixtures/legend/legend.vue';
import Grid from '@/components/fixtures/grid/grid.vue';

const store = useStore();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Fixtures</h1>
    <Basemap v-model="store.configs[store.editingLang].fixtures.basemap" />
    <Details v-model="store.configs[store.editingLang].fixtures.details" />
    <Grid v-model="store.configs[store.editingLang].fixtures.grid" />
    <Legend v-model="store.configs[store.editingLang].fixtures.legend" />
  </div>
</template>
