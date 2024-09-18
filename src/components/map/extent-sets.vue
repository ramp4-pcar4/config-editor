<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import Extent from '@/components/helpers/extent.vue';
import List from '@/components/helpers/list.vue';

import type { Field, RampExtentSetConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampExtentSetConfig>>,
    required: false
  }
});

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);
let extentSets = reactive<Array<RampExtentSetConfig>>(props.modelValue ?? []);

watch(extentSets, () => {
  emit('update:modelValue', extentSets.length === 0 ? undefined : extentSets);
});

const itemFields: Array<Field> = [
  {
    property: 'id',
    title: 'extentSet.id.title',
    description: 'extentSet.id.description',
    type: 'string',
    required: true
  }
];
</script>

<template>
  <List
    top-level
    :item-fields="itemFields"
    v-model="extentSets"
    :title="t('extentSets.title')"
    :description="t('extentSets.description')"
    :add-prompt="t('extentSets.add')"
    :remove-prompt="t('extentSets.remove')"
    :singular="t('extentSets.singular')"
  >
    <template #item="{ index }">
      <Extent
        :title="t('extentSet.default.title')"
        :description="t('extentSet.default.description')"
        v-model="extentSets[index].default"
      />
      <Extent
        :title="t('extentSet.full.title')"
        :description="t('extentSet.full.description')"
        v-model="extentSets[index].full"
      />
      <Extent
        :title="t('extentSet.maximum.title')"
        :description="t('extentSet.maximum.description')"
        v-model="extentSets[index].maximum"
      />
    </template>
  </List>
</template>
