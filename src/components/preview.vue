<script setup lang="ts">
// @ts-ignore
import { createInstance } from '@/lib/ramp.browser.es.prod';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const rampInstance = ref<HTMLDivElement>();
const store = useStore()

onMounted(() => {
  createInstance(rampInstance.value, { startingFixtures: store.startingFixtures, configs: store.configs }, store.options);
});
</script>

<template>
  <div class="h-full flex flex-col">
    <h1 class="text-2xl font-semibold">Preview</h1>
    <p class="mt-3">
      <span class="font-semibold">Note:</span> If the RAMP instance does not initialize as expected,
      it is likely that you missed a required value and/or specified an invalid value somewhere. You
      will need to go back to your config, check that all the values are correct, and then try
      previewing again. Until we come up with a vaildator that tells you where you messed up.
    </p>
    <div ref="rampInstance" class="mt-3 flex-grow border-2 border-black"></div>
  </div>
</template>
