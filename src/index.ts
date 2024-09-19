import { createApp as createVueApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './lang';
import ConfigEditor from './config-editor.vue';
import type { RampConfig, RampConfigs, RampOptions } from './definitions';
import VueTippy from 'vue-tippy';
import { useStore } from '@/store';
import merge from 'deepmerge';

class API {
  // FAKE CHANGES
  readonly $vApp: ComponentPublicInstance;

  constructor(el: HTMLElement, configs?: RampConfigs, options?: RampOptions) {
    const element = createVueApp(ConfigEditor);

    element.use(createPinia());
    element.use(i18n);

    element.use(VueTippy, {
      directive: 'tippy', // => v-tippy
      component: 'tippy' // => <tippy/>
    });

    this.$vApp = element.mount(el);

    if (!!configs) {
      this.initialize(configs, options);
    }
  }

  /**
   * Initializes the editor with the configs and options provided by setting respective values in root component.
   * Defaulting will be used in case nothing is provided.
   *
   * @param configs the default RAMP configs to be used
   * @param options the default RAMP options to be used
   */
  initialize(configs?: RampConfigs, options?: RampOptions) {
    // @ts-ignore seriously ts
    const store = useStore(this.$vApp.$pinia)
    
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
        panels: {},
        system: {}
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
        panels: {},
        system: {}
      }
    };

    if (configs?.configs && Object.keys(configs.configs).length > 0) {
      Object.keys(configs.configs).forEach((lang: string) => {
        store.configs[lang] = merge(defaultConfig['en'], configs.configs[lang]);
      });
    } else {
      store.configs = defaultConfig;
    }

    store.initialized = true
  }

  /**
   * Gets the current RAMP config for the specified language, or all the RAMP configs if no language is specified.
   *
   * @param lang
   * @returns the requested RAMP config, or all the RAMP configs.
   */
  getConfig(lang?: string): RampConfigs | RampConfig {
    // @ts-ignore seriously ts
    const store = useStore(this.$vApp.$pinia)
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
    // @ts-ignore seriously ts
    return useStore(this.$vApp.$pinia).options;
  }
}

export const createInstance = (
  el: HTMLElement,
  config?: RampConfigs | undefined,
  opts?: RampOptions
) => {
  return new API(el, config, opts);
};
