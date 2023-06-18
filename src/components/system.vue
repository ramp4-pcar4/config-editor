<script setup lang="ts">
import { useStore } from '@/store';
import { onBeforeMount, watch } from 'vue';

const store = useStore();

onBeforeMount(() => {
  if (!store.configs[store.editingLang].system) {
    store.configs[store.editingLang].system = {};
  }
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
    <p class="mt-1 text-sm">
      An optional proxy to be used for dealing with same-origin issues. URL must either be a
      relative path on the same server or an absolute path on a server which sets CORS headers.
      Applies only to map services.
    </p>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="animate"
        v-model="store.configs[store.editingLang].system!.animate"
        :checked="store.configs[store.editingLang].system?.animate !== false"
      />
      <label for="animate">Enable visual animations</label>
    </div>
    <p class="text-sm">
      Will enable visual animation when using the site, such as control transitions.
    </p>
  </div>
</template>

<style lang="scss scoped"></style>
