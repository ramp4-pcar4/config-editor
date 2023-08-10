<script setup lang="ts">
// @ts-ignore
import { createInstance } from '@/lib/ramp.esm';
import '@/lib/ramp.css';
import type { API } from '@/main';
import { inject, onMounted, ref } from 'vue';

const rampInstance = ref<HTMLDivElement>();
const api = inject<API>('api');

onMounted(() => {
  createInstance(rampInstance.value, api?.getConfig(), api?.getOptions());
});
</script>

<template>
  <div class="h-full flex flex-col">
    <h1 class="text-2xl font-bold">Preview</h1>
    <p class="mt-3">
      <span class="font-bold">Note:</span> If the RAMP instance does not initialize as expected, it
      is likely that you missed a required value and/or specified an invalid value somewhere. You
      will need to go back to your config, check that all the values are correct, and then try
      previewing again. Until we come up with a vaildator that tells you where you messed up.
    </p>
    <div ref="rampInstance" class="mt-3 flex-grow border-2 border-black"></div>
  </div>
</template>
