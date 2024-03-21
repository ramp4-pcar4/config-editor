<script setup lang="ts">
import type { RampOptions } from '@/definitions';
import type { PropType } from 'vue';

const options = defineModel({ type: Object as PropType<RampOptions> });
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Options</h1>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        id="loadDefaultEvents"
        v-model="options!.loadDefaultEvents"
        :checked="options!.loadDefaultEvents !== false"
      />
      <label for="loadDefaultEvents">Load default events</label>
    </div>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        id="loadDefaultFixtures"
        v-model="options!.loadDefaultFixtures"
        :checked="options!.loadDefaultFixtures !== false"
      />
      <label for="loadDefaultFixtures">Load default fixtures</label>
    </div>
    <div class="mt-5 flex items-center">
      <input type="checkbox" id="startRequired" v-model="options!.startRequired" />
      <label for="startRequired">Prevent initializing the map automatically</label>
    </div>
  </div>
</template>
