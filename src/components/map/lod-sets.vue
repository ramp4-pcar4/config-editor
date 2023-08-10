<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

// @ts-ignore
import { geo } from '@/lib/ramp.esm';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

import type { RampLodConfig, RampLodSetConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampLodSetConfig>>,
    required: false
  }
});

const lambertLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[0]);
const lambertLodsStr: string = JSON.stringify(lambertLods);
const mercatorLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[1]);
const mercatorLodsStr: string = JSON.stringify(mercatorLods);

const addLodSet = () => {
  lodSets.push({ id: '' });
  lodTypes.push('custom');
};

const removeLodSet = (idx: number) => {
  lodSets?.splice(idx, 1);
  lodTypes?.splice(idx, 1);
};

const addLod = (idx: number) => {
  if (lodTypes[idx] !== 'custom') {
    return;
  }
  if (!lodSets[idx].lods) {
    lodSets[idx].lods = [];
  }

  lodSets[idx].lods?.push({});
};

const removeLod = (setIdx: number, lodIdx: number) => {
  lodSets[setIdx].lods?.splice(lodIdx, 1);
};

const onLodTypeToggle = (e: Event, idx: number) => {
  if (!(e.target as HTMLInputElement).checked) {
    lodTypes[idx] = 'custom';
    delete lodSets[idx].lods;
  } else if ((e.target as HTMLInputElement).name === 'lambert') {
    lodTypes[idx] = 'lambert';
    lodSets[idx].lods = JSON.parse(lambertLodsStr);
  } else {
    lodTypes[idx] = 'mercator';
    lodSets[idx].lods = JSON.parse(mercatorLodsStr);
  }
};

const emit = defineEmits(['update:modelValue']);

const lodSets = reactive<Array<RampLodSetConfig>>(props.modelValue ?? []);
const lodTypes = reactive<Array<string>>(
  props.modelValue?.map((ls) => {
    if (JSON.stringify(ls.lods) === lambertLodsStr) {
      return 'lambert';
    } else if (JSON.stringify(ls.lods) === mercatorLodsStr) {
      return 'mercator';
    } else {
      return 'custom';
    }
  }) ?? []
);

watch(lodSets, () => {
  lodSets.forEach((ls) => {
    if (ls.lods && ls.lods.length === 0) {
      delete ls.lods;
    }
  });
  emit('update:modelValue', lodSets.length === 0 ? undefined : lodSets);
});
</script>

<template>
  <Collapsible :thick-border="true">
    <template #header>
      <button class="arrow mr-1 sm:mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      <InputHeader
        type="header"
        :title="`Lod Sets (${lodSets.length})`"
        description="The levels of detail (zoom scales) available for the map."
      />
      <!-- add item button -->
      <button
        @click.stop="addLodSet"
        class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
      >
        <svg
          class="relative bottom-[2px]"
          fill="white"
          height="18px"
          width="18px"
          viewBox="0 0 23 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span class="px-2"> Add lod set </span>
      </button>
    </template>
    <template #default>
      <draggable v-if="lodSets.length > 0" :list="lodSets" item-key="fake" handle=".handle">
        <template #item="{ element, index }">
          <Collapsible>
            <template #header>
              <button class="cursor-move handle mr-1 sm:mr-5" @click.stop>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
              <button class="mr-1 sm:mr-3 arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <span class="mr-1 sm:mr-5 sm:text-lg">{{
                element.id || `Lod Set ${index + 1}`
              }}</span>
              <button @click.stop="removeLodSet(index)" class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </template>
            <template #default>
              <div class="input-table">
                <div>
                  <InputHeader
                    title="ID"
                    description="A unique id identifying the lod set."
                    required
                  />
                  <input type="text" v-model="element.id" />
                </div>
              </div>
              <div class="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="lambert"
                  @input="(e) => onLodTypeToggle(e, index)"
                  :checked="lodTypes[index] === 'lambert'"
                />
                <InputHeader title="Use default lambert lods" type="checkbox" />
              </div>
              <div class="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="mercator"
                  @input="(e) => onLodTypeToggle(e, index)"
                  :checked="lodTypes[index] === 'mercator'"
                />
                <InputHeader title="Use default mercator lods" type="checkbox" />
              </div>
              <Collapsible>
                <template #header>
                  <button class="arrow mr-1 sm:mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </button>
                  <InputHeader
                    type="header"
                    :title="`Lods (${lodSets[index].lods?.length ?? 0})`"
                    description="Level of details for a tile schema (i.e. zoom scales)."
                  />
                  <!-- add item button -->
                  <button
                    @click.stop="addLod(index)"
                    class="ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
                    :class="{
                      'cursor-not-allowed bg-gray-500': lodTypes[index] !== 'custom',
                      'bg-black cursor-pointer hover:bg-gray-800': lodTypes[index] === 'custom'
                    }"
                  >
                    <svg
                      class="relative bottom-[2px]"
                      fill="white"
                      height="18px"
                      width="18px"
                      viewBox="0 0 23 21"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span class="px-2"> Add lod </span>
                  </button>
                </template>
                <template #default>
                  <div
                    v-if="lodSets[index].lods && lodSets[index].lods!.length > 0"
                    class="lod-grid"
                  >
                    <div></div>
                    <InputHeader class="justify-center" title="Level" type="checkbox" required />
                    <InputHeader
                      class="justify-center"
                      title="Resolution"
                      type="checkbox"
                      required
                    />
                    <InputHeader class="justify-center" title="Scale" type="checkbox" required />
                    <div></div>
                  </div>
                  <draggable
                    v-if="lodSets[index].lods && lodSets[index].lods!.length > 0"
                    :list="lodSets[index].lods"
                    item-key="fake"
                    handle=".handle"
                  >
                    <template #item="{ element, index: lodIndex }">
                      <div>
                        <hr class="border-solid border-t border-gray-300 my-2" />
                        <div class="lod-grid">
                          <button
                            :disabled="lodTypes[index] !== 'custom'"
                            :class="{ handle: lodTypes[index] === 'custom' }"
                            class="cursor-move disabled:text-gray-500 disabled:cursor-not-allowed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                              />
                            </svg>
                          </button>
                          <div class="flex justify-center">
                            <input
                              :disabled="lodTypes[index] !== 'custom'"
                              type="number"
                              v-model="element.level"
                            />
                          </div>
                          <div class="flex justify-center">
                            <input
                              :disabled="lodTypes[index] !== 'custom'"
                              type="number"
                              v-model="element.resolution"
                            />
                          </div>
                          <div class="flex justify-center">
                            <input
                              :disabled="lodTypes[index] !== 'custom'"
                              type="number"
                              v-model="element.scale"
                            />
                          </div>
                          <button
                            :disabled="lodTypes[index] !== 'custom'"
                            class="disabled:text-gray-500 disabled:cursor-not-allowed"
                            @click="removeLod(index, lodIndex)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </template>
                  </draggable>
                </template>
              </Collapsible>
            </template>
          </Collapsible>
        </template>
      </draggable>
    </template>
  </Collapsible>
</template>

<style lang="scss" scoped>
.lod-grid {
  display: grid;
  grid-template-columns: 24px 1fr 1fr 1fr 24px;
  gap: 16px;
}

.lod-grid input {
  @apply w-full max-w-xs text-sm;
}

input:disabled {
  @apply border-gray-500 cursor-not-allowed;
}
</style>
