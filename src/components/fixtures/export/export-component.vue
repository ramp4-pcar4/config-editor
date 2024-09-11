<script setup lang="ts">
import { type PropType, watch, ref } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

// @ts-ignore
const selectable = defineModel('selectable', { type: Boolean });
// @ts-ignore
const selected = defineModel('selected', { type: Boolean });

defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});
</script>

<template>
  <Collapsible :title="title" :description="description">
    <slot></slot>
    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        v-model="selected"
        :checked="selected != false"
        aria-label="Selected"
      />
      <InputHeader
        title="Selected"
        description="Indicates if this component is selected on startup."
        type="checkbox"
      />
    </div>
    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        v-model="selectable"
        :checked="selectable != false"
        aria-label="Selectable"
      />
      <InputHeader
        title="Selectable"
        description="Indicates if this component is selectable."
        type="checkbox"
      />
    </div>
  </Collapsible>
</template>
