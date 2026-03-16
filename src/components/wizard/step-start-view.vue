<template>
    <div>
        <h3 class="text-lg font-semibold">Starting extent</h3>
        <p class="mt-1 text-sm text-gray-600">
            Choose the default map extent when the RAMP instance first loads.
        </p>

        <div class="mt-4 space-y-3">
            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="
                    mode === 'mercatorDefault'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                "
            >
                <input
                    v-model="mode"
                    type="radio"
                    value="mercatorDefault"
                    class="mt-0.5 h-4 w-4 border-gray-300"
                />

                <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900">World Mercator default extent</div>
                    <div class="mt-1 text-xs text-gray-500">
                        Extent set: EXT_ESRI_World_AuxMerc_3857 • WKID 102100 / 3857
                    </div>
                </div>
            </label>

            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="
                    mode === 'lambertDefault'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                "
            >
                <input
                    v-model="mode"
                    type="radio"
                    value="lambertDefault"
                    class="mt-0.5 h-4 w-4 border-gray-300"
                />

                <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900">NRCan Lambert default extent</div>
                    <div class="mt-1 text-xs text-gray-500">
                        Extent set: EXT_NRCAN_Lambert_3978 • WKID 3978
                    </div>
                </div>
            </label>

            <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                :class="
                    mode === 'custom'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                "
            >
                <input
                    v-model="mode"
                    type="radio"
                    value="custom"
                    class="mt-0.5 h-4 w-4 border-gray-300"
                />

                <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900">Custom extent</div>
                    <div class="mt-1 text-xs text-gray-500">
                        Provide xmin, xmax, ymin, and ymax values manually.
                    </div>
                </div>
            </label>
        </div>

        <div v-if="mode === 'custom'" class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">Custom extent values</h4>

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

import ErrorList from './error-list.vue';

const props = defineProps<{ state: any; errors: any[] }>();
const emit = defineEmits<{ (e: 'update:state', value: any): void }>();

const state = computed(() => props.state);

const mode = computed({
    get: () => state.value.startView.mode,
    set: value => {
        const nextStartView =
            value === 'mercatorDefault'
                ? {
                      mode: 'mercatorDefault',
                      extentSetId: 'EXT_ESRI_World_AuxMerc_3857'
                  }
                : value === 'lambertDefault'
                ? {
                      mode: 'lambertDefault',
                      extentSetId: 'EXT_NRCAN_Lambert_3978'
                  }
                : {
                      mode: 'custom',
                      extentSetId: undefined,
                      custom: state.value.startView.custom ?? {
                          xmin: undefined,
                          xmax: undefined,
                          ymin: undefined,
                          ymax: undefined,
                          spatialReference: {
                              wkid: 3857,
                              latestWkid: 3857
                          }
                      }
                  };

        emit('update:state', {
            ...state.value,
            startView: nextStartView
        });
    }
});

const custom = computed({
    get: () =>
        state.value.startView.custom ?? {
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
        emit('update:state', {
            ...state.value,
            startView: {
                ...state.value.startView,
                mode: 'custom',
                extentSetId: undefined,
                custom: value
            }
        });
    }
});
</script>