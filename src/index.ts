import { createApp as createVueApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './lang';
import ConfigEditor from './config-editor.vue';
import type { RampConfig, RampConfigs, RampOptions } from './definitions';
import VueTippy from 'vue-tippy';
import { useStore } from '@/store';
import { merge } from 'es-toolkit';
import defaultConfig from './default-config.json';

// This is the starting point for the "lib" build, which is what other apps will use as they
// just treat this editor like a tool / component.

export class API {
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

        if (configs) {
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
        const store = useStore(this.$vApp.$pinia);

        store.startingFixtures = configs?.startingFixtures ?? undefined;
        store.options = options ?? {};

        if (configs?.configs && Object.keys(configs.configs).length > 0) {
            Object.keys(configs.configs).forEach((lang: string) => {
                const cleanedLangConfig = maptipMigrator(configs.configs[lang]);
                store.configs[lang] = merge(defaultConfig[lang as 'en'], cleanedLangConfig);
            });
        } else {
            store.configs = defaultConfig;
        }

        store.initialized = true;
    }

    /**
     * Gets the current RAMP config for the specified language, or all the RAMP configs if no language is specified.
     *
     * @param lang
     * @returns the requested RAMP config, or all the RAMP configs.
     */
    getConfig(lang?: string): RampConfigs | RampConfig {
        const store = useStore(this.$vApp.$pinia);

        return lang ? store.configs[lang] : { startingFixtures: store.startingFixtures, configs: store.configs };
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

    setLanguage(newLang: string) {
        if (newLang !== 'en' && newLang !== 'fr') {
            console.error('RAMP4 Config Editor only supports English and French.');
        }
        i18n.global.locale.value = newLang;
    }
}

export const createInstance = (el: HTMLElement, config?: RampConfigs | undefined, opts?: RampOptions) => {
    return new API(el, config, opts);
};

/**
 * Will inspect a ramp config (single language config) for any old-style "maptip"
 * settings, and correct them to modern standards.
 */
const maptipMigrator = (configNugget: RampConfig): RampConfig => {
    // copy, so we don't mangle the source object
    const con = structuredClone(configNugget);

    // find layer configs

    if (con.layers) {
        con.layers.forEach(layerNugget => {
            // state.hovertips
            // @ts-expect-error state.hovertips is no longer valid, so wont be on the type
            if (layerNugget.state && layerNugget.state.hovertips !== undefined) {
                // @ts-expect-error state.hovertips is no longer valid, so wont be on the type
                layerNugget.state.maptips = layerNugget.state.hovertips;
            }

            // tooltipField
            // @ts-expect-error tooltipField is no longer valid, so wont be on the type
            if (layerNugget.tooltipField) {
                // @ts-expect-error tooltipField is no longer valid, so wont be on the type
                layerNugget.maptipField = layerNugget.tooltipField;
            }

            // tooltipArcade
            // @ts-expect-error tooltipArcade is no longer valid, so wont be on the type
            if (layerNugget.tooltipArcade) {
                // @ts-expect-error tooltipArcade is no longer valid, so wont be on the type
                layerNugget.maptipArcade = layerNugget.tooltipArcade;
            }
        });
    }

    return con;
};
