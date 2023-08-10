<script setup lang="ts">
import { type PropType, reactive, watch, onBeforeMount } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import Extent from '@/components/helpers/extent.vue';

import type { RampExtentSetConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampExtentSetConfig>>,
    required: false
  }
});

const addExtentSet = () => {
  extentSets.push({ id: '' });
};

const removeExtentSet = (idx: number) => {
  extentSets?.splice(idx, 1);
};

const emit = defineEmits(['update:modelValue']);

const extentSets = reactive<Array<RampExtentSetConfig>>(props.modelValue ?? []);

watch(extentSets, () => {
  emit('update:modelValue', extentSets.length === 0 ? undefined : extentSets);
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
        :title="`Extent Sets (${extentSets.length})`"
        description="The default, full and maximum extents of the map."
      />
      <!-- add item button -->
      <button
        @click.stop="addExtentSet"
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
        <span class="px-2"> Add extent set </span>
      </button>
    </template>
    <template #default>
      <draggable v-if="extentSets.length > 0" :list="extentSets" item-key="fake" handle=".handle">
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
                element.id || `Extent Set ${index + 1}`
              }}</span>
              <button @click.stop="removeExtentSet(index)" class="ml-auto">
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
                    description="A unique id identifying the extent set."
                    required
                  />
                  <input type="text" v-model="element.id" />
                </div>
              </div>
              <Extent
                title="Default"
                description="The default (starting) extent."
                v-model="element.default"
              />
              <Extent
                title="Full"
                description="The full extent; default will be used if not supplied."
                v-model="element.full"
              />
              <Extent
                title="Maximum"
                description="The maximum extent; full or default extents will be used if not supplied."
                v-model="element.maximum"
              />
            </template>
          </Collapsible>
        </template>
      </draggable>
    </template>
  </Collapsible>
</template>

<style lang="scss" scoped></style>
