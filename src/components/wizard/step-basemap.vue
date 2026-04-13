<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.basemap.title') }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t('wizard.basemap.description') }}</p>

        <!-- Basemap list -->
        <div class="mt-4 space-y-6">
            <section v-for="group in basemapGroups" :key="group.id">
                <div class="mb-3">
                    <h4 class="text-sm font-semibold text-gray-900">{{ group.title }}</h4>
                    <p class="mt-1 text-xs text-gray-500">{{ group.description }}</p>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <button
                        v-for="basemap in group.items"
                        :key="basemap.id"
                        type="button"
                        class="overflow-hidden rounded-xl border bg-white text-left transition"
                        :class="
                            selectedBasemapId === basemap.id
                                ? 'border-gray-900 ring-2 ring-gray-900'
                                : 'border-gray-200 hover:border-gray-300'
                        "
                        @click="selectBasemap(basemap.id)"
                    >
                        <div class="relative aspect-[2/1] overflow-hidden bg-gray-100">
                            <button
                                type="button"
                                class="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs text-gray-700 shadow hover:bg-white"
                                v-tippy="{
                                    content: basemap.description,
                                    placement: 'bottom',
                                    maxWidth: 320
                                }"
                                @click.stop
                            >
                                i
                            </button>

                            <div v-if="basemap.thumbnailUrls?.length > 1" class="grid h-full grid-cols-2">
                                <img
                                    v-for="(url, index) in basemap.thumbnailUrls"
                                    :key="`${basemap.id}-${index}`"
                                    :src="url"
                                    :alt="basemap.altText || basemap.name"
                                    class="h-full w-full object-cover"
                                />
                            </div>

                            <img
                                v-else-if="basemap.thumbnailUrls?.length === 1"
                                :src="basemap.thumbnailUrls[0]"
                                :alt="basemap.altText || basemap.name"
                                class="h-full w-full object-cover"
                            />
                        </div>

                        <div class="px-4 py-3">
                            <div class="text-sm font-semibold text-gray-900">
                                {{ basemap.name }}
                            </div>
                        </div>
                    </button>
                </div>
            </section>
        </div>

        <ErrorList :errors="errors" class="mt-4" />
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

const availableBasemaps = computed(() => store.elc.map.basemaps);
const availableTileSchemas = computed(() => store.elc.map.tileSchemas);

const selectedBasemapId = computed({
    get: () => store.elc.map.initialBasemapId,
    set: (value: string) => {
        store.elc.map.initialBasemapId = value;
    }
});

const tileSchemasById = computed(() => {
    return Object.fromEntries(availableTileSchemas.value.map((tileSchema: any) => [tileSchema.id, tileSchema]));
});

// format thumbnail urls
const addThumbnails = (basemap: any) => {
    const tileSchema = tileSchemasById.value[basemap.tileSchemaId];
    const thumbnailSuffixes = tileSchema?.thumbnailTileUrls ?? [];

    const thumbnailUrls = (basemap.layers ?? []).flatMap((layer: any) =>
        thumbnailSuffixes.map((suffix: string) => `${layer.url}${suffix}`)
    );

    return {
        ...basemap,
        thumbnailUrls
    };
};

// separate groups 
const basemapGroups = computed(() => [
    {
        id: 'lambert',
        title: 'Lambert maps',
        description: 'Canadian Lambert projection basemaps.',
        items: availableBasemaps.value
            .filter((bm: any) => bm.tileSchemaId?.toLowerCase().includes('lambert'))
            .map(addThumbnails)
    },
    {
        id: 'mercator',
        title: 'Mercator maps',
        description: 'World Mercator projection basemaps.',
        items: availableBasemaps.value.filter((bm: any) => bm.tileSchemaId?.includes('AuxMerc')).map(addThumbnails)
    }
]);

const selectBasemap = (basemapId: string) => {
    selectedBasemapId.value = basemapId;
};
</script>
