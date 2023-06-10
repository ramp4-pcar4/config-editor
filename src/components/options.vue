<script setup lang="ts">
import { useStore } from '@/store';

const store = useStore();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Options</h1>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="loadDefaultEvents"
        v-model="store.options.loadDefaultEvents"
        :checked="store.options.loadDefaultEvents !== false"
      />
      <label for="loadDefaultEvents">Load default events</label>
    </div>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="loadDefaultFixtures"
        v-model="store.options.loadDefaultFixtures"
        :checked="store.options.loadDefaultFixtures !== false"
      />
      <label for="loadDefaultFixtures">Load default fixtures</label>
    </div>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="startRequired"
        v-model="store.options.startRequired"
      />
      <label for="startRequired">Prevent initializing the map automatically</label>
    </div>
  </div>
</template>
