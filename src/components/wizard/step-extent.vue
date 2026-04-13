<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.extent.title') }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t('wizard.extent.description') }}</p>

        <div class="mt-4 space-y-4">
            <!-- Mercator -->
            <section class="rounded-xl border border-gray-200 bg-white p-4">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <div class="text-sm font-medium text-gray-900">{{ t('wizard.extent.mercator') }}</div>
                        <div class="mt-1 text-xs text-gray-500">{{ MERCATOR_EXTENT_SET_ID }}</div>
                    </div>

                    <button
                        type="button"
                        class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                        @click="mercatorDefault = { ...MERCATOR_DEFAULT }"
                    >
                        {{ t('wizard.extent.restore') }}
                    </button>
                </div>

                <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">xmin</label>
                        <input
                            v-model.number="mercatorDefault.xmin"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">xmax</label>
                        <input
                            v-model.number="mercatorDefault.xmax"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">ymin</label>
                        <input
                            v-model.number="mercatorDefault.ymin"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">ymax</label>
                        <input
                            v-model.number="mercatorDefault.ymax"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>
                </div>

                <!-- Uncomment if including WKID field -->
                <!-- <div class="mt-4 grid gap-2 md:max-w-xs">
                    <label class="text-sm font-medium text-gray-900">WKID</label>
                    <select
                        v-model.number="mercatorWkid"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    >
                        <option :value="3857">3857</option>
                        <option :value="102100">102100</option>
                    </select>
                </div> -->
            </section>

            <!-- Lambert -->
            <section class="rounded-xl border border-gray-200 bg-white p-4">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <div class="text-sm font-medium text-gray-900">{{ t('wizard.extent.lambert') }}</div>
                        <div class="mt-1 text-xs text-gray-500">{{ LAMBERT_EXTENT_SET_ID }}</div>
                    </div>

                    <button
                        type="button"
                        class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                        @click="lambertDefault = { ...LAMBERT_DEFAULT }"
                    >
                        {{ t('wizard.extent.restore') }}
                    </button>
                </div>

                <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">xmin</label>
                        <input
                            v-model.number="lambertDefault.xmin"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">xmax</label>
                        <input
                            v-model.number="lambertDefault.xmax"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">ymin</label>
                        <input
                            v-model.number="lambertDefault.ymin"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>

                    <div class="grid gap-2">
                        <label class="text-sm font-medium text-gray-900">ymax</label>
                        <input
                            v-model.number="lambertDefault.ymax"
                            type="number"
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>
                </div>

                <!-- Uncomment if including WKID field -->
                <!-- <div class="mt-4 grid gap-2 md:max-w-xs">
                    <label class="text-sm font-medium text-gray-900">WKID</label>
                    <select
                        v-model.number="lambertWkid"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    >
                        <option :value="3978">3978</option>
                    </select>
                </div> -->
            </section>
        </div>

        <ErrorList :errors="errors" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import type { RampExtentSetConfig, RampExtentConfig } from '@/definitions';

import ErrorList from './error-list.vue';

defineProps<{ errors: any[] }>();

const store = useStore();
const { t } = useI18n();

const MERCATOR_EXTENT_SET_ID = 'EXT_ESRI_World_AuxMerc_3857';
const LAMBERT_EXTENT_SET_ID = 'EXT_NRCAN_Lambert_3978';

const MERCATOR_DEFAULT: RampExtentConfig = {
    xmin: -16632697,
    xmax: -5007771,
    ymin: 5022907,
    ymax: 10015875,
    spatialReference: {
        wkid: 102100,
        latestWkid: 3857
    }
};

const LAMBERT_DEFAULT: RampExtentConfig = {
    xmin: -5281457,
    xmax: 3049492,
    ymin: -983440,
    ymax: 4482193,
    spatialReference: {
        wkid: 3978
    }
};

const extentSets = computed(() => store.elc.map.extentSets ?? []);

const mercatorDefault = computed<RampExtentConfig>({
    get: () => findExtentSet(MERCATOR_EXTENT_SET_ID)?.default ?? MERCATOR_DEFAULT,
    set: value => saveExtentSet(MERCATOR_EXTENT_SET_ID, value)
});

const lambertDefault = computed<RampExtentConfig>({
    get: () => findExtentSet(LAMBERT_EXTENT_SET_ID)?.default ?? LAMBERT_DEFAULT,
    set: value => saveExtentSet(LAMBERT_EXTENT_SET_ID, value)
});

const findExtentSet = (extentSetId: string): RampExtentSetConfig | undefined => {
    return extentSets.value.find(extentSet => extentSet.id === extentSetId);
};

const saveExtentSet = (extentSetId: string, extent: RampExtentConfig) => {
    const newExtents = [...extentSets.value];
    const index = newExtents.findIndex(extentSet => extentSet.id === extentSetId);

    if (index >= 0) {
        newExtents[index] = {
            ...newExtents[index],
            default: extent
        };
    } else {
        newExtents.push({
            id: extentSetId,
            default: extent
        } as RampExtentSetConfig);
    }

    store.elc.map.extentSets = newExtents;
};
</script>
