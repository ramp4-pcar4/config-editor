import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStartingFixturesStore = defineStore('starting-fixtures', () => {
  const startingFixtures = ref<Array<string>>([]);
  return { startingFixtures };
});
