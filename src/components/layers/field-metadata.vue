<script setup lang="ts">
import { type PropType, reactive, watch, ref } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import type { RampLayerFieldMetadataConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<RampLayerFieldMetadataConfig>,
    required: false
  }
});

const addFieldInfo = () => {
  if (!fieldMetadata.fieldInfo) {
    fieldMetadata.fieldInfo = [];
  }
  fieldMetadata.fieldInfo.push({ name: '' });
};

const removeFieldInfo = (idx: number) => {
  fieldMetadata.fieldInfo?.splice(idx, 1);
};

const emit = defineEmits(['update:modelValue']);

const fieldMetadata = reactive<RampLayerFieldMetadataConfig>(props.modelValue ?? {});

watch(fieldMetadata, () => {
  if (fieldMetadata.fieldInfo && fieldMetadata.fieldInfo.length === 0) {
    delete fieldMetadata.fieldInfo;
  }
  emit('update:modelValue', Object.keys(fieldMetadata).length === 0 ? undefined : fieldMetadata);
});
</script>

<template>
  <Collapsible title="Field Metadata">
    <div class="flex items-center mb-4">
      <input type="checkbox" v-model="fieldMetadata.exclusiveFields" />
      <InputHeader
        title="Exclusive Fields"
        description="If true, only fields in fieldInfo are recognized and downloaded. Otherwise, all fields are used."
        type="checkbox"
      />
    </div>
    <Collapsible>
      <template #header>
        <button class="arrow mr-1 sm:mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        <span class="text-lg">Field Info ({{ fieldMetadata.fieldInfo?.length ?? 0 }})</span>
        <!-- add item button -->
        <button
          @click.stop="addFieldInfo"
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
          <span class="px-2"> Add field info </span>
        </button>
      </template>
      <template #default>
        <div
          v-if="fieldMetadata.fieldInfo && fieldMetadata.fieldInfo?.length > 0"
          class="field-info-grid"
        >
          <div></div>
          <InputHeader
            class="justify-center"
            title="Name"
            description="Specifies the field name to use to link to the identifier. Must exist in the layer."
            type="checkbox"
            required
          />
          <InputHeader
            class="justify-center"
            title="Alias"
            description="Specifies the field title. If missing, attempts to use the service alias, then defaults to the field name."
            type="checkbox"
          />
          <div></div>
        </div>
        <draggable
          v-if="fieldMetadata.fieldInfo && fieldMetadata.fieldInfo.length > 0"
          :list="fieldMetadata.fieldInfo"
          item-key="fake"
          handle=".handle"
        >
          <template #item="{ element, index }">
            <div>
              <hr class="border-solid border-t border-gray-300 my-2" />
              <div class="field-info-grid">
                <button class="cursor-move handle">
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
                  <input type="text" class="w-full max-w-xs" v-model="element.name" />
                </div>
                <div class="flex justify-center">
                  <input type="text" class="w-full max-w-xs" v-model="element.alias" />
                </div>
                <button @click="removeFieldInfo(index)">
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
  </Collapsible>
</template>

<style lang="scss" scoped>
.field-info-grid {
  display: grid;
  grid-template-columns: 24px 1fr 1fr 24px;
  gap: 16px;
}
</style>
