<script setup lang="ts">
import InputHeader from '@/components/helpers/input-header.vue';

import { computed } from 'vue';
import Collapsible from './collapsible.vue';

const model = defineModel<Array<any>>();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: String,
  options: Array<{ label: string; value: string }>
});
</script>

<template>
  <Collapsible :title="title" :description="description">
    <div class="input-table">
      <div class="flex items-center" v-for="option in options">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :value="option.value"
          v-model="model"
          :aria-label="option.label"
        />
        <label>{{ option.label }}</label>
      </div>
    </div>
  </Collapsible>
</template>
