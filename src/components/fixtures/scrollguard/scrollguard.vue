<script setup lang="ts">
// root.fixtures.scrollguard config nugget

import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import Checkbox from '@/components/helpers/checkbox.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const scrollguard = reactive<any>(props.modelValue ?? {});

watch(scrollguard, () => {
  emit('update:modelValue', scrollguard);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('scrollguard.title')" :description="t('scrollguard.description')">
    <Checkbox
      v-model="scrollguard.enabled"
      :title="t('scrollguard.enabled.title')"
      :description="t('scrollguard.enabled.description')"
    />
  </Collapsible>
</template>
