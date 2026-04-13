<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.extent.title') }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t('wizard.extent.description') }}</p>

        <div class="mt-4 space-y-3">
            <!-- Default mercator extent set -->
            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="
                    mode === 'mercatorDefault' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                "
            >
                <input v-model="mode" type="radio" value="mercatorDefault" class="mt-0.5 h-4 w-4 border-gray-300" />

                <div class="min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ t('wizard.extent.mercator') }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ MERCATOR_EXTENT_SET_ID }}</div>

                    <div class="mt-3 grid grid-cols-1 gap-2 text-xs text-gray-600 md:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">xmin:</span>
                            {{ mercatorDefault?.xmin }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">xmax:</span>
                            {{ mercatorDefault?.xmax }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">ymin:</span>
                            {{ mercatorDefault?.ymin }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">ymax:</span>
                            {{ mercatorDefault?.ymax }}
                        </div>
                    </div>
                </div>
            </label>

            <!-- Default lambert extent set -->
            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="
                    mode === 'lambertDefault' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                "
            >
                <input v-model="mode" type="radio" value="lambertDefault" class="mt-0.5 h-4 w-4 border-gray-300" />

                <div class="min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ t('wizard.extent.lambert') }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ LAMBERT_EXTENT_SET_ID }}</div>

                    <div class="mt-3 grid grid-cols-1 gap-2 text-xs text-gray-600 md:grid-cols-2">
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">xmin:</span>
                            {{ lambertDefault?.xmin }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">xmax:</span>
                            {{ lambertDefault?.xmax }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">ymin:</span>
                            {{ lambertDefault?.ymin }}
                        </div>
                        <div class="rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <span class="font-medium text-gray-800">ymax:</span>
                            {{ lambertDefault?.ymax }}
                        </div>
                    </div>
                </div>
            </label>

            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="mode === 'custom' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'"
            >
                <input v-model="mode" type="radio" value="custom" class="mt-0.5 h-4 w-4 border-gray-300" />

                <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900">{{ t('wizard.extent.custom') }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ t('wizard.extent.custom.description') }}</div>
                </div>
            </label>
        </div>

        <!-- Custom extent set -->
        <!-- TODO: further enhance with RAMP draw tools in future? -->
        <div v-if="mode === 'custom'" class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.extent.custom.values') }}</h4>

            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">xmin</label>
                    <input
                        v-model.number="custom.xmin"
                        type="number"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>

                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">xmax</label>
                    <input
                        v-model.number="custom.xmax"
                        type="number"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>

                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">ymin</label>
                    <input
                        v-model.number="custom.ymin"
                        type="number"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>

                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">ymax</label>
                    <input
                        v-model.number="custom.ymax"
                        type="number"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>
            </div>

            <div class="mt-4 grid gap-2 md:max-w-xs">
                <label class="text-sm font-medium text-gray-900">WKID</label>
                <select
                    v-model.number="custom.spatialReference.wkid"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                >
                    <option :value="3857">3857</option>
                    <option :value="3978">3978</option>
                    <option :value="102100">102100</option>
                </select>
            </div>
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

const MERCATOR_EXTENT_SET_ID = 'EXT_ESRI_World_AuxMerc_3857';
const LAMBERT_EXTENT_SET_ID = 'EXT_NRCAN_Lambert_3978';
const CUSTOM_EXTENT_SET_ID = 'EXT_CUSTOM';

const extentSets = computed(() => store.elc.map.extentSets);
const tileSchemas = computed(() => store.elc.map.tileSchemas);

const mercatorExtentSet = computed(() =>
    extentSets.value.find((extentSet: any) => extentSet.id === MERCATOR_EXTENT_SET_ID)
);

const lambertExtentSet = computed(() =>
    extentSets.value.find((extentSet: any) => extentSet.id === LAMBERT_EXTENT_SET_ID)
);

const customExtentSet = computed(() =>
    extentSets.value.find((extentSet: any) => extentSet.id === CUSTOM_EXTENT_SET_ID)
);

const currentExtentSetId = computed(() => tileSchemas.value[0]?.extentSetId);

// set extend iD of all tile schemas
const setAllTileSchemaExtentSetIds = (extentSetId: string) => {
    store.elc.map.tileSchemas = tileSchemas.value.map((tileSchema: any) => ({
        ...tileSchema,
        extentSetId
    }));
};

// add custom extent set to config
const addExtentSet = (nextExtentSet: any) => {
    const nextExtentSets = [...extentSets.value];
    const index = nextExtentSets.findIndex((extentSet: any) => extentSet.id === nextExtentSet.id);

    if (index >= 0) {
        nextExtentSets[index] = nextExtentSet;
    } else {
        nextExtentSets.push(nextExtentSet);
    }

    store.elc.map.extentSets = nextExtentSets;
};

// continuously update extent ID based on user selection
const mode = computed({
    get: () => {
        if (currentExtentSetId.value === MERCATOR_EXTENT_SET_ID) return 'mercatorDefault';
        if (currentExtentSetId.value === LAMBERT_EXTENT_SET_ID) return 'lambertDefault';
        return 'custom';
    },
    set: value => {
        if (value === 'mercatorDefault') {
            setAllTileSchemaExtentSetIds(MERCATOR_EXTENT_SET_ID);
            return;
        }

        if (value === 'lambertDefault') {
            setAllTileSchemaExtentSetIds(LAMBERT_EXTENT_SET_ID);
            return;
        }

        if (!customExtentSet.value) {
            addExtentSet({
                id: CUSTOM_EXTENT_SET_ID,
                default: {
                    xmin: undefined,
                    xmax: undefined,
                    ymin: undefined,
                    ymax: undefined,
                    spatialReference: {
                        wkid: 3857,
                        latestWkid: 3857
                    }
                }
            });
        }

        setAllTileSchemaExtentSetIds(CUSTOM_EXTENT_SET_ID);
    }
});

// getter/setter custom extent set to config
const custom = computed({
    get: () =>
        customExtentSet.value?.default ?? {
            xmin: undefined,
            xmax: undefined,
            ymin: undefined,
            ymax: undefined,
            spatialReference: {
                wkid: 3857,
                latestWkid: 3857
            }
        },
    set: value => {
        addExtentSet({
            id: CUSTOM_EXTENT_SET_ID,
            default: {
                ...value,
                spatialReference: {
                    wkid: value?.spatialReference?.wkid ?? 3857,
                    latestWkid: value?.spatialReference?.latestWkid ?? value?.spatialReference?.wkid ?? 3857
                }
            }
        });

        setAllTileSchemaExtentSetIds(CUSTOM_EXTENT_SET_ID);
    }
});

const mercatorDefault = computed(() => mercatorExtentSet.value?.default);
const lambertDefault = computed(() => lambertExtentSet.value?.default);
</script>
