<script setup lang="ts">
import { useStore } from '@/store';
import { onBeforeMount, ref } from 'vue';

const startingFixturesInput = ref<string>('');
const store = useStore();

onBeforeMount(() => {
  startingFixturesInput.value = store.startingFixtures.join(', ');
});

const onInput = (e: Event) => {
  startingFixturesInput.value = (e.target as HTMLInputElement).value;
  store.startingFixtures =
    startingFixturesInput.value === '' ? [] : startingFixturesInput.value.split(',');
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Starting Fixtures</h1>
    <p class="mt-5">Comma separated fixture IDs:</p>
    <input
      class="mt-2 border-2 border-black p-3 w-full sm:w-[500px]"
      :value="startingFixturesInput"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss scoped"></style>
