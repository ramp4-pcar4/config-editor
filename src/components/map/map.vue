<script setup lang="ts">
// root.map config nugget

import Caption from '@/components/map/caption.vue';
import TileSchemas from '@/components/map/tile-schemas.vue';
import ExtentSets from '@/components/map/extent-sets.vue';
import LodSets from '@/components/map/lod-sets.vue';
import Basemaps from '@/components/map/basemaps.vue';
import LayerLabels from '@/components/layers/labels.vue';
import LayerTimes from '@/components/map/layer-times.vue';
import { Input } from '@/components/helpers';
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
                v-model="store.elc.map.initialBasemapId"
            />
            <Input
                :title="t('map.pointZoomScale.title')"
                :description="t('map.pointZoomScale.description')"
                type="number"
                placeholder="50000"
                min="1"
                v-model="store.elc.map.pointZoomScale"
            />
            <Input
                :title="t('map.mapMouseThrottle.title')"
                :description="t('map.mapMouseThrottle.description')"
                type="number"
                placeholder="0"
                min="0"
                v-model="store.elc.map.mapMouseThrottle"
            />
        </div>
        <TileSchemas v-model="store.elc.map.tileSchemas" />
        <ExtentSets v-model="store.elc.map.extentSets" />
        <LodSets v-model="store.elc.map.lodSets" />
        <Basemaps v-model="store.elc.map.basemaps" />
        <Caption v-model="store.elc.map.caption" />
        <LayerLabels v-model="store.elc.map.labelsDefault" default />
        <LayerTimes v-model="store.elc.map.layerTimeDefault" />
    </div>
</template>
