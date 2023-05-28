import { createApp as createVueApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import { messages } from './lang';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import type { RampConfig, RampConfigs, RampOptions } from './definitions';
import { useInitializeStore } from './stores/initialize';
import { useStartingFixturesStore } from './stores/starting-fixtures';

export class API {
  readonly $vApp: ComponentPublicInstance;

  constructor() {
    const element = createVueApp(App);

    element.use(createPinia());
    element.use(
      createI18n({
        legacy: false,
        // get the language of the page from the root `html` node
        locale: 'en',
        fallbackLocale: 'en',
        globalInjection: true,
        messages
      })
    );

    element.provide('api', this);
    element.config.globalProperties.api = this;
    this.$vApp = element.mount('#app');
  }

  /**
   * Initializes the editor with the configs and options provided by setting values in respective stores.
   * Defaulting will be used in case nothing is provided.
   *
   * @param configs the default RAMP configs to be used
   * @param options the default RAMP options to be used
   */
  initialize(configs?: RampConfigs, options?: RampOptions) {
    // TODO: Implement me!
    const initializeStore = useInitializeStore(this.$vApp.$pinia);
    const startingFixturesStore = useStartingFixturesStore(this.$vApp.$pinia);

    initializeStore.initialized = true;
    startingFixturesStore.startingFixtures = configs?.startingFixtures ?? [];
  }

  /**
   * Gets the current RAMP config for the specified language, or all the RAMP configs if no language is specified.
   *
   * @param lang
   * @returns the requested RAMP config, or all the RAMP configs.
   */
  getConfig(lang?: string): RampConfigs | RampConfig {
    // TODO: Implement me!
    return {} as RampConfig;
  }
}

// Put the editor's API on the window.
// Since this is a standalone app and pages will be integrating this using <iframe>, this will not result in multiple instances not having their
// own API.
// @ts-ignore
window.ramp4EditorAPI = new API();
