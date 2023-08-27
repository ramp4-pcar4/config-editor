import { createApp as createVueApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import { messages } from './lang';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import type { RampConfig, RampConfigs, RampOptions } from './definitions';
import { useStore } from './store';
import VueTippy from 'vue-tippy';
import merge from 'deepmerge';

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

    element.use(VueTippy, {
      directive: 'tippy', // => v-tippy
      component: 'tippy' // => <tippy/>
    });

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
    const store = useStore(this.$vApp.$pinia);

    store.initialized = true;
    store.startingFixtures = configs?.startingFixtures ?? [];
    store.options = options ?? {};

    const defaultConfig = {
      en: {
        map: {
          lodSets: [],
          extentSets: [],
          tileSchemas: [],
          basemaps: [],
          initialBasemapId: ''
        },
        fixtures: {},
        layers: [],
        panels: {}
      },
      fr: {
        map: {
          lodSets: [],
          extentSets: [],
          tileSchemas: [],
          basemaps: [],
          initialBasemapId: ''
        },
        fixtures: {},
        layers: [],
        panels: {}
      }
    };

    if (configs?.configs && Object.keys(configs.configs).length > 0) {
      Object.keys(configs.configs).forEach((lang: string) => {
        store.configs[lang] = merge(defaultConfig['en'], configs.configs[lang]);
      });
    } else {
      store.configs = defaultConfig;
    }
  }

  /**
   * Gets the current RAMP config for the specified language, or all the RAMP configs if no language is specified.
   *
   * @param lang
   * @returns the requested RAMP config, or all the RAMP configs.
   */
  getConfig(lang?: string): RampConfigs | RampConfig {
    const store = useStore(this.$vApp.$pinia);
    return lang
      ? store.configs[lang]
      : { startingFixtures: store.startingFixtures, configs: store.configs };
  }

  /**
   * Return the currently specified options.
   *
   * @returns the RAMP options
   */
  getOptions(): RampOptions {
    return useStore(this.$vApp.$pinia).options;
  }
}

// Put the editor's API on the window.
// Since this is a standalone app and pages will be integrating this using <iframe>, this will not result in multiple instances not having their
// own API.
// @ts-ignore
window.ramp4EditorAPI = new API();
