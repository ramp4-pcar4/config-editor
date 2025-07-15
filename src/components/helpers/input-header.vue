<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    required: false
  },
  type: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div
    class="flex items-center"
    :class="{
      'mb-1': type !== 'checkbox' && type !== 'header',
      'h-full': type === 'checkbox' || type === 'header'
    }"
  >
    <p class="mr-2" :class="{ required: required, 'text-lg': type === 'header' }">
      {{ title }}
    </p>
    <button
      v-if="!!description"
      :content="description"
      :aria-label="description"
      v-tippy="{
        placement: 'top',
        trigger: 'mouseenter manual focus click'
      }"
      @click.stop
    >
      <svg class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
      </svg>
    </button>
  </div>
</template>
