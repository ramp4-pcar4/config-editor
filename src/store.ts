import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { RampConfig, RampOptions } from './definitions';

export const useStore = defineStore('store', () => {
    const initialized = ref<boolean>(false);
    const editingTemplate = ref<string>('');
    const editingLang = ref<string>('');
    const startingFixtures = ref<Array<string>>([]);
    const configs = ref<{ [key: string]: RampConfig }>({});
    const options = ref<RampOptions>({});

    // sadly the JSDoc gets disrespected by the defineStore grinder. While "elc" isn't as verbose, its very common so will minifiy real nice
    /**
     * Config for the editing language
     */
    const elc = computed((): RampConfig => configs.value[editingLang.value]);

    return { elc, initialized, startingFixtures, editingLang, editingTemplate, configs, options };
});
