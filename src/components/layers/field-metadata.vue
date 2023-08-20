<script setup lang="ts">
import { type PropType, reactive, watch, ref } from 'vue';

import draggable from 'vuedraggable';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import type { Field, RampLayerFieldMetadataConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<RampLayerFieldMetadataConfig>,
    required: false
  }
});

const itemFields: Array<Field> = [
  {
    type: 'string',
    property: 'name',
    title: 'Name',
    description:
      'Specifies the field name to use to link to the identifier. Must exist in the layer.',
    required: true
  },
  {
    type: 'string',
    property: 'alias',
    title: 'Alias',
    description:
      'Specifies the field title. If missing, attempts to use the service alias, then defaults to the field name.',
    required: false
  }
];

const emit = defineEmits(['update:modelValue']);

const fieldMetadata = reactive<RampLayerFieldMetadataConfig>(props.modelValue ?? {});

watch(fieldMetadata, () => {
  if (!fieldMetadata.fieldInfo) {
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
    <List
      v-model="fieldMetadata.fieldInfo"
      :item-fields="itemFields"
      title="Field Info"
      add-prompt="Add field info"
      description="Specifies field info for layer."
    />
  </Collapsible>
</template>

<style lang="scss" scoped>
.field-info-grid {
  display: grid;
  grid-template-columns: 24px 1fr 1fr 24px;
  gap: 16px;
}
</style>
