<script setup lang="ts">
import { ref } from 'vue';

const startingFixtures = defineModel({ type: Array<String> });

const startingFixturesInput = ref<string>(startingFixtures.value?.join(',') ?? '');

const onInput = (e: Event) => {
  startingFixturesInput.value = (e.target as HTMLInputElement).value;
  startingFixtures.value =
    startingFixturesInput.value === ''
      ? []
      : startingFixturesInput.value.split(',').map((s) => s.trim());
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Starting Fixtures</h1>
    <p class="mt-5">Comma separated fixture IDs:</p>
    <input
      class="mt-2 border-2 border-black p-3 w-full sm:w-[500px]"
      :value="startingFixturesInput"
      @input="onInput"
    />
  </div>
</template>
