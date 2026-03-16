<template>
    <div>
        <h3 class="text-lg font-semibold">Basemap</h3>
        <p class="mt-1 text-sm text-gray-600">Choose one basemap for the map background.</p>

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
                            state.basemap.id === basemap.id
                                ? 'border-gray-900 ring-2 ring-gray-900'
                                : 'border-gray-200 hover:border-gray-300'
                        "
                        @click="selectBasemap(basemap)"
                    >
                        <!-- Thumbnail -->
                        <div class="relative overflow-hidden bg-gray-100 aspect-[2/1]">
                            <!-- Tooltip info icon -->
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

                            <!-- dual tile thumbnails -->
                            <div v-if="basemap.thumbnailUrls.length > 1" class="grid h-full grid-cols-2">
                                <img
                                    v-for="(url, index) in basemap.thumbnailUrls"
                                    :key="`${basemap.id}-${index}`"
                                    :src="url"
                                    :alt="basemap.altText"
                                    class="h-full w-full object-cover"
                                />
                            </div>

                            <!-- single thumbnail -->
                            <img
                                v-else-if="basemap.thumbnailUrls.length === 1"
                                :src="basemap.thumbnailUrls[0]"
                                :alt="basemap.altText"
                                class="h-full w-full object-cover"
                            />
                        </div>

                        <!-- Card body -->
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

import ErrorList from './error-list.vue';
import { BASEMAP_OPTIONS, type BasemapOption } from './wizard-basemap-options';

const props = defineProps<{ state: any; errors: any[] }>();
const emit = defineEmits<{ (e: 'update:state', value: any): void }>();

type BasemapGroup = {
    id: string;
    title: string;
    description: string;
    items: BasemapOption[];
};

const state = computed(() => props.state);

const basemapGroups = computed<BasemapGroup[]>(() => [
    {
        id: 'lambert',
        title: 'Lambert maps',
        description: 'Canadian Lambert projection basemaps.',
        items: BASEMAP_OPTIONS.filter(option => option.projection === 'lambert')
    },
    {
        id: 'mercator',
        title: 'Mercator maps',
        description: 'World Mercator projection basemaps.',
        items: BASEMAP_OPTIONS.filter(option => option.projection === 'mercator')
    }
]);

const selectBasemap = (basemap: BasemapOption) => {
    emit('update:state', {
        ...state.value,
        basemap: {
            id: basemap.id,
            selected: basemap.config
        }
    });
};
</script>
