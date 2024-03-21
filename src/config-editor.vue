<script setup lang="ts">
import Loading from '@/components/loading.vue';
import Navbar from './components/navbar.vue';
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import FixturesEditor from './components/fixtures/fixtures.vue';
import LayersEditor from '@/components/layers/layers.vue';
import MapEditor from '@/components/map/map.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';
import OptionsEditor from '@/components/options.vue';
import Preview from '@/components/preview.vue';
import merge from 'deepmerge';

import '@/styles.css';
import '@/lib/ramp.css';
import { useI18n } from 'vue-i18n';
import { onMounted, ref, type PropType, watch } from 'vue';
import { setDefaultProps } from 'vue-tippy';
import type { RampConfig, RampConfigs, RampOptions } from '@/definitions';

const { t } = useI18n();

const props = defineProps({
  config: {
    type: Object as PropType<RampConfigs>
  },
  options: {
    type: Object as PropType<RampOptions>
  }
});

const editors: { [key: string]: any } = {
  fixtures: FixturesEditor,
  layers: LayersEditor,
  map: MapEditor,
  panels: PanelsEditor,
  system: SystemEditor
};

onMounted(() => {
  setDefaultProps({
    aria: {
      content: 'labelledby'
    },
    theme: 'ramp4',
    animation: 'scale',
    inertia: true,
    trigger: 'mouseenter manual focus',
    touch: ['hold', 200],
    offset: [0, 5]
  });
});

const initialized = ref<boolean>(!!props.config);
const editingTemplate = ref<string>('');
const editingLang = ref<string>('');
const startingFixtures = ref<Array<string>>(props.config?.startingFixtures ?? []);
const configs = ref<{ [key: string]: RampConfig }>({});
const options = ref<RampOptions>({});

/**
 * Initializes the editor with the configs and options provided by setting respective values.
 * Defaulting will be used in case nothing is provided.
 *
 * @param configs the default RAMP configs to be used
 * @param options the default RAMP options to be used
 */
const initialize = (confs?: RampConfigs, opts?: RampOptions) => {
  initialized.value = true;
  startingFixtures.value = confs?.startingFixtures ?? [];
  options.value = opts ?? {};

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

  if (confs?.configs && Object.keys(confs.configs).length > 0) {
    Object.keys(confs.configs).forEach((lang: string) => {
      configs.value[lang] = merge(defaultConfig['en'], confs.configs[lang]);
    });
  } else {
    configs.value = defaultConfig;
  }
  watch(startingFixtures, () => {
    const event = new Event('ramp4-config-edited');
    window.dispatchEvent(event);
  });

  watch(
    configs,
    () => {
      const event = new Event('ramp4-config-edited');
      window.dispatchEvent(event);
    },
    { deep: true }
  );

  watch(
    options,
    () => {
      const event = new Event('ramp4-config-edited');
      window.dispatchEvent(event);
    },
    { deep: true }
  );
};

if (props.config) {
  initialize(props.config, props.options);
}

/**
 * Gets the current RAMP config for the specified language, or all the RAMP configs if no language is specified.
 *
 * @param lang
 * @returns the requested RAMP config, or all the RAMP configs.
 */
const getConfig = (lang?: string): RampConfigs | RampConfig => {
  return lang
    ? configs.value[lang]
    : { startingFixtures: startingFixtures.value, configs: configs.value };
};

/**
 * Return the currently specified options.
 *
 * @returns the RAMP options
 */
const getOptions = (): RampOptions => {
  return options.value;
};

defineExpose({ initialize, getConfig, getOptions });
</script>

<template>
  <div class="ramp4-config-editor h-full">
    <div
      v-if="!initialized"
      class="w-full h-full bg-[#1c1717] box-border flex items-center justify-center"
    >
      <Loading />
    </div>
    <div v-else class="h-full flex flex-col">
      <h1 class="flex-none h-9 text-3xl font-semibold">{{ t('title') }}</h1>
      <div class="grow mt-3 flex overflow-y-scroll">
        <Navbar
          :configs="configs"
          :editing-lang="editingLang"
          @lang-updated="(lang) => (editingLang = lang)"
          :editing-template="editingTemplate"
          @template-updated="(template) => (editingTemplate = template)"
          class="basis-1/5 h-full"
        />
        <div class="basis-4/5 h-full px-5">
          <StartingFixturesEditor
            v-if="editingTemplate === 'starting-fixtures'"
            v-model="startingFixtures"
          />
          <OptionsEditor v-else-if="editingTemplate === 'options'" v-model="options" />
          <Preview
            v-else-if="editingTemplate === 'preview'"
            :config="getConfig()"
            :options="getOptions()"
          />
          <component
            v-else-if="editingLang !== ''"
            :is="editors[editingTemplate]"
            :key="`${editingTemplate}-${editingLang}`"
            v-model="configs[editingLang][editingTemplate as 'map']"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$font-list: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
  Apple Color Emoji, Segoe UI Emoji;

.ramp4-config-editor {
  height: 100%;
  font-family: $font-list;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    font-family: $font-list;
    line-height: 1.5;
  }
}

.input-table {
  /**
   * User input values.
   */
  --grid-layout-gap: 100px;
  --grid-column-count: 10;
  --grid-item--min-width: min(250px, 100%);

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  column-gap: var(--grid-layout-gap);
  row-gap: 16px;

  select,
  input {
    @apply block border border-black text-sm;
  }

  input[type='text'],
  input[type='number'],
  select {
    @apply w-full p-2;
  }
}

.required:after {
  content: ' *';
  color: red;
}

.ramp-styles {
  .p-5 {
    padding: 5px;
  }

  div:has(> button[content='About RAMP']) {
    @apply sm:hidden;
  }
}
</style>
