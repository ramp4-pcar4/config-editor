<script setup lang="ts">
import Appbar from '@/components/fixtures/appbar/appbar.vue';
import AreasOfInterest from '@/components/fixtures/areas-of-interest/areas-of-interest.vue';
import Basemap from '@/components/fixtures/basemap/basemap.vue';
import Details from '@/components/fixtures/details/details.vue';
import Export from '@/components/fixtures/export/export.vue';
import Geosearh from '@/components/fixtures/geosearch/geosearch.vue';
import Grid from '@/components/fixtures/grid/grid.vue';
import Help from '@/components/fixtures/help/help.vue';
import Hilight from '@/components/fixtures/hilight/hilight.vue';
import LayerReorder from '@/components/fixtures/layer-reorder/layer-reorder.vue';
import Legend from '@/components/fixtures/legend/legend.vue';
import Mapnav from '@/components/fixtures/mapnav/mapnav.vue';
import Metadata from '@/components/fixtures/metadata/metadata.vue';
import NorthArrow from '@/components/fixtures/northarrow/northarrow.vue';
import OverviewMap from '@/components/fixtures/overviewmap/overviewmap.vue';
import Settings from '@/components/fixtures/settings/settings.vue';
import Scrollguard from '@/components/fixtures/scrollguard/scrollguard.vue';
import Wizard from '@/components/fixtures/wizard/wizard.vue';

const fixtures = defineModel({ type: Object });
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Fixtures</h1>
    <Appbar v-model="fixtures.appbar" />
    <AreasOfInterest v-model="fixtures['areas-of-interest']" />
    <Basemap v-model="fixtures.basemap" />
    <Details v-model="fixtures.details" />
    <Export v-model="fixtures.export" />
    <Geosearh v-model="fixtures.geosearch" />
    <Grid v-model="fixtures.grid" />
    <Help v-model="fixtures.help" />
    <Hilight v-model="fixtures.hilight" />
    <LayerReorder v-model="fixtures['layer-reorder']" />
    <Legend v-model="fixtures.legend" />
    <Mapnav v-model="fixtures.mapnav" />
    <Metadata v-model="fixtures.metadata" />
    <NorthArrow v-model="fixtures.northarrow" />
    <OverviewMap v-model="fixtures.overviewmap" />
    <Settings v-model="fixtures.settings" />
    <Scrollguard v-model="fixtures.scrollguard" />
    <Wizard v-model="fixtures.wizard" />
  </div>
</template>
