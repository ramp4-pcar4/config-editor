<script setup lang="ts">
// root.fixtures.geosearch.settings.disabledSearchTypes config nugget

import { ref, type PropType, watch } from 'vue';
import MultiSelect from '@/components/helpers/multi-select.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<string>>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const allTypes = ['NTS', 'FSA', 'LAT/LNG'];

const types = ref<Array<string>>(props.modelValue ?? []);

watch(types, () => {
  emit('update:modelValue', types.value.length === 0 ? undefined : types.value);
});
</script>

<template>
  <MultiSelect
    :title="t('geosearch.settings.disabledSearchTypes.title')"
    :description="t('geosearch.settings.disabledSearchTypes.description')"
    v-model="types"
    :options="
      allTypes.map(typ => {
        return { value: typ, label: t(`geosearch.settings.disabledSearchTypes.${typ.toLowerCase()}`) };
      })
    "
  />
</template>
