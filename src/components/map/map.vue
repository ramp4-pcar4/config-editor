<script setup lang="ts">
import Caption from '@/components/map/caption.vue';
import TileSchemas from '@/components/map/tile-schemas.vue';
import ExtentSets from '@/components/map/extent-sets.vue';
import LodSets from '@/components/map/lod-sets.vue';
import Basemaps from '@/components/map/basemaps.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import Input from '@/components/helpers/input.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Map</h1>
    <div class="mt-4 input-table">
      <Input
        :title="t('map.initialBasemapId.title')"
        :description="t('map.initialBasemapId.description')"
        v-model="store.configs[store.editingLang].map.initialBasemapId"
      />
      <Input
        :title="t('map.pointZoomScale.title')"
        :description="t('map.pointZoomScale.description')"
        type="number"
        placeholder="50000"
        min="1"
        v-model="store.configs[store.editingLang].map.pointZoomScale"
      />
      <Input
        :title="t('map.mapMouseThrottle.title')"
        :description="t('map.mapMouseThrottle.description')"
        type="number"
        placeholder="0"
        min="0"
        v-model="store.configs[store.editingLang].map.mapMouseThrottle"
      />
    </div>
    <TileSchemas v-model="store.configs[store.editingLang].map.tileSchemas" />
    <ExtentSets v-model="store.configs[store.editingLang].map.extentSets" />
    <LodSets v-model="store.configs[store.editingLang].map.lodSets" />
    <Basemaps v-model="store.configs[store.editingLang].map.basemaps" />
    <Caption v-model="store.configs[store.editingLang].map.caption" />
  </div>
</template>
