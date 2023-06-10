<script setup lang="ts">
import { useStore } from '@/store';
import { onBeforeMount, watch } from 'vue';

const store = useStore();

onBeforeMount(() => {
  store.configs[store.editingLang].system = {};
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">System</h1>
    <p class="mt-5">Proxy URL:</p>
    <input
      class="mt-2 border-2 border-black p-3 w-full sm:w-[500px]"
      v-model="store.configs[store.editingLang].system!.proxyUrl"
    />
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="loadDefaultEvents"
        v-model="store.configs[store.editingLang].system!.animate"
        :checked="store.configs[store.editingLang].system?.animate !== false"
      />
      <label for="loadDefaultEvents">Enable visual animations</label>
    </div>
  </div>
</template>

<style lang="scss scoped"></style>
