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

const allTypes = ['NTS', 'FSA', 'LAT/LNG'];

const types = ref<Array<string>>(props.modelValue ?? []);

watch(types, () => {
  emit('update:modelValue', types.value.length === 0 ? undefined : types.value);
});
</script>

<template>
  <Collapsible
    title="Disabled Search Types"
    description="Disable specific types of searches (NTS, FSA, or LAT/LNG)."
  >
    <div class="input-table">
      <div class="flex items-center" v-for="typ in allTypes">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :value="typ"
          v-model="types"
          aria-label="Disabled Search Types"
        />
        <label>{{ typ }}</label>
      </div>
    </div>
  </Collapsible>
</template>
