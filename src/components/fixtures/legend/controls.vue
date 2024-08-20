<script setup lang="ts">
import { ref, type PropType, watch } from 'vue';

import Collapsible from '@/components/helpers/collapsible.vue';

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

const emit = defineEmits(['update:modelValue']);

const allControls = ['visibilityButton', 'expandButton'];

let controls = ref<Array<string>>(
  props.modelValue ?? (props.disabled ? [] : JSON.parse(JSON.stringify(allControls)))
);

const valToLabel = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

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
  <Collapsible
    :title="disabled ? 'Disabled Controls' : 'Controls'"
    :description="`Controls whether to ${
      disabled ? 'disable' : 'enable'
    }  the expand toggle and visibility checkbox for the legend item.`"
  >
    <div class="input-table">
      <div class="flex items-center" v-for="ctrl in allControls">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :id="ctrl"
          :value="ctrl"
          v-model="controls"
        />
        <label :for="ctrl">{{ valToLabel(ctrl) }}</label>
      </div>
    </div>
  </Collapsible>
</template>
