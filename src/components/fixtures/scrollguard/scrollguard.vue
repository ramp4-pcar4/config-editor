<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const scrollguard = reactive<any>(props.modelValue ?? {});

watch(scrollguard, () => {
  emit('update:modelValue', scrollguard);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Scrollguard"
    description="Provides configuration to the scrollguard fixture."
  >
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="scrollguard.enabled" />
      <InputHeader
        title="Enabled"
        description="Specifies if the scrollguard is enabled on startup."
        type="checkbox"
      />
    </div>
  </Collapsible>
</template>
