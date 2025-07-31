<script setup lang="ts">
// collects all rubbish for the fixtures section

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
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold">{{ t('navbar.fixtures') }}</h1>
        <Appbar v-model="store.elc.fixtures.appbar" />
        <AreasOfInterest v-model="store.elc.fixtures['areas-of-interest']" />
        <Basemap v-model="store.elc.fixtures.basemap" />
        <Details v-model="store.elc.fixtures.details" />
        <Export v-model="store.elc.fixtures.export" />
        <Geosearh v-model="store.elc.fixtures.geosearch" />
        <Grid v-model="store.elc.fixtures.grid" />
        <Help v-model="store.elc.fixtures.help" />
        <Hilight v-model="store.elc.fixtures.hilight" />
        <LayerReorder v-model="store.elc.fixtures['layer-reorder']" />
        <Legend v-model="store.elc.fixtures.legend" />
        <Mapnav v-model="store.elc.fixtures.mapnav" />
        <Metadata v-model="store.elc.fixtures.metadata" />
        <NorthArrow v-model="store.elc.fixtures.northarrow" />
        <OverviewMap v-model="store.elc.fixtures.overviewmap" />
        <Scrollguard v-model="store.elc.fixtures.scrollguard" />
        <Settings v-model="store.elc.fixtures.settings" />
        <Wizard v-model="store.elc.fixtures.wizard" />
    </div>
</template>
