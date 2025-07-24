<script setup lang="ts">
// root.fixtures.legend.headerControls config nugget

import { ref, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import MultiSelect from '@/components/helpers/multi-select.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<string>>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const allControls = ['wizard', 'layerReorder', 'groupToggle', 'visibilityToggle'];
let headerControls = ref<Array<string>>(props.modelValue ?? JSON.parse(JSON.stringify(allControls)));

watch(headerControls, () => {
  emit('update:modelValue', headerControls.value);
});
</script>

<template>
  <MultiSelect
    :title="t('legend.headerControls.title')"
    :description="t('legend.headerControls.description')"
    v-model="headerControls"
    :options="
      allControls.map(ctrl => {
        return { value: ctrl, label: t(`legend.headerControl.${ctrl}`) };
      })
    "
  />
</template>
