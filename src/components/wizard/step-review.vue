<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.review.title') }}</h3>
        <p class="text-sm text-gray-600">{{ t('wizard.review.description') }}</p>

        <div class="my-3 rounded-xl border border-gray-200 p-3">
            <h4 class="font-semibold">{{ t('wizard.layers.title') }} ({{ layers.length }})</h4>
            <div v-if="!layers.length" class="text-sm text-gray-600">—</div>
            <ul v-else class="mt-2 space-y-1 text-sm">
                <li v-for="layer in layers" :key="layer.id">
                    <strong>{{ layer.name }}</strong> — {{ layer.layerType ?? '—' }}
                </li>
            </ul>
        </div>

        <div class="my-3 rounded-xl border border-gray-200 p-3">
            <h4 class="font-semibold">{{ t('wizard.basemap.title') }}</h4>
            <div class="text-sm">{{ basemapId ?? '—' }}</div>
        </div>

        <div class="my-3 rounded-xl border border-gray-200 p-3">
            <h4 class="font-semibold">{{ t('wizard.extent.title') }}</h4>
            <div class="text-sm">{{ extentLabel }}</div>
        </div>

        <ErrorList :errors="errors" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

import ErrorList from './error-list.vue';

defineProps<{ errors: any[] }>();

const store = useStore();
const { t } = useI18n();

const MERCATOR_EXTENT_SET_ID = 'EXT_ESRI_World_AuxMerc_3857';
const LAMBERT_EXTENT_SET_ID = 'EXT_NRCAN_Lambert_3978';

const layers = computed(() => store.elc?.layers ?? []);
const basemapId = computed(() => store.elc?.map?.initialBasemapId);
const extentSetId = computed(() => store.elc?.map?.tileSchemas?.[0]?.extentSetId);

const extentLabel = computed(() => {
    if (extentSetId.value === MERCATOR_EXTENT_SET_ID) return 'World Mercator';
    if (extentSetId.value === LAMBERT_EXTENT_SET_ID) return 'NRCan Lambert';
    if (extentSetId.value) return 'Custom extent';
    return '—';
});
</script>

<style scoped></style>
