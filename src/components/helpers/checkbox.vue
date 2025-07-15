<script setup lang="ts">
import InputHeader from '@/components/helpers/input-header.vue';
import { computed } from 'vue';

const model = defineModel<boolean>();

const props = defineProps({
  checked: Boolean,
  title: {
    type: String,
    required: true
  },
  disabled: Boolean,
  description: String
});

const checked = computed<boolean>(() => model.value ?? !!props.checked);
const onInput = (e: Event) => {
  model.value = (e.target as HTMLInputElement).checked;
};
</script>

<template>
  <div class="mt-4 flex items-center">
    <input type="checkbox" :disabled="disabled ?? false" :checked="checked" :aria-label="title" @input="onInput" />
    <InputHeader :title="title" :description="description" type="checkbox" />
  </div>
</template>
