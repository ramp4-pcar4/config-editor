<script setup lang="ts">
import { ref, type PropType, watch } from 'vue';

import Collapsible from '@/components/helpers/collapsible.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<string>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const allControls = ['wizard', 'layerReorder', 'groupToggle', 'visibilityToggle'];

const headerControls = ref<Array<string>>(
  props.modelValue ?? JSON.parse(JSON.stringify(allControls))
);

const valToLabel = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

watch(headerControls, () => {
  emit('update:modelValue', headerControls.value.length === 4 ? undefined : headerControls.value);
});
</script>

<template>
  <Collapsible
    title="Header Controls"
    description="All possible controls to show in the legend header."
  >
    <div class="input-table">
      <div class="flex items-center" v-for="ctrl in allControls">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :id="ctrl"
          :value="ctrl"
          v-model="headerControls"
        />
        <label :for="ctrl">{{ valToLabel(ctrl) }}</label>
      </div>
    </div>
  </Collapsible>
</template>
