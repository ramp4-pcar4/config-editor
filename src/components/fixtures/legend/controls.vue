<script setup lang="ts">
import { ref, type PropType, watch } from 'vue';
import MultiSelect from '@/components/helpers/multi-select.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<string>>,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const allControls = ['visibilityButton', 'expandButton'];
let controls = ref<Array<string>>(props.modelValue ?? (props.disabled ? [] : JSON.parse(JSON.stringify(allControls))));

watch(controls, () => {
  emit(
    'update:modelValue',
    props.disabled
      ? controls.value.length === 0
        ? undefined
        : controls.value
      : controls.value.length === 2
      ? undefined
      : controls.value
  );
});
</script>

<template>
  <MultiSelect
    :title="disabled ? t('legend.item.disabledControls.title') : t('legend.item.controls.title')"
    :description="disabled ? t('legend.item.disabledControls.description') : t('legend.item.controls.description')"
    v-model="controls"
    :options="
      allControls.map((ctrl) => {
        return { value: ctrl, label: t(`legend.item.control.${ctrl}`) };
      })
    "
  />
</template>
