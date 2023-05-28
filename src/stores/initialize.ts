import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInitializeStore = defineStore('initialize', () => {
  const initialized = ref<boolean>(false);
  return { initialized };
});
