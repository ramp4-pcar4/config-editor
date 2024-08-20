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

import '@/styles.css';
import '@/lib/ramp.css';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { setDefaultProps } from 'vue-tippy';
import { useStore } from '@/store';

const { t } = useI18n();
const store = useStore()

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
</script>

<template>
  <div class="ramp4-config-editor h-full">
    <div
      v-if="!store.initialized"
      class="w-full h-full bg-[#1c1717] box-border flex items-center justify-center"
    >
      <Loading />
    </div>
    <div v-else class="h-full flex flex-col">
      <h1 class="flex-none h-9 text-3xl font-semibold">{{ t('title') }}</h1>
      <div class="grow mt-3 flex overflow-y-scroll">
        <Navbar
          class="basis-1/5 h-full"
        />
        <div class="basis-4/5 h-full px-5">
          <StartingFixturesEditor
            v-if="store.editingTemplate === 'starting-fixtures'"
          />
          <OptionsEditor v-else-if="store.editingTemplate === 'options'" />
          <Preview
            v-else-if="store.editingTemplate === 'preview'"
          />
          <component
            v-else-if="store.editingLang !== ''"
            :is="editors[store.editingTemplate]"
            :key="`${store.editingTemplate}-${store.editingLang}`"
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
