import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RampConfig, RampOptions } from './definitions';

export const useStore = defineStore('store', () => {
  const initialized = ref<boolean>(false);
  const editingTemplate = ref<string>('');
  const editingLang = ref<string>('');
  const startingFixtures = ref<Array<string>>([]);
  const configs = ref<{ [key: string]: RampConfig }>({});
  const options = ref<RampOptions>({});
  return { initialized, startingFixtures, editingLang, editingTemplate, configs, options };
});
