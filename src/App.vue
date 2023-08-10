<script setup lang="ts">
import Loading from '@/components/loading.vue';
import Navbar from './components/navbar.vue';
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import LayersEditor from '@/components/layers/layers.vue';
import MapEditor from '@/components/map/map.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';
import OptionsEditor from '@/components/options.vue';
import Preview from '@/components/preview.vue';

import '@/styles.css';
import { useI18n } from 'vue-i18n';
import type { API } from './main';
import { inject, onMounted } from 'vue';
import { useStore } from './store';
import { setDefaultProps } from 'vue-tippy';

const { t } = useI18n();
const api = inject<API>('api');

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

const editors: { [key: string]: any } = {
  'starting-fixtures': StartingFixturesEditor,
  layers: LayersEditor,
  map: MapEditor,
  panels: PanelsEditor,
  system: SystemEditor,
  options: OptionsEditor,
  preview: Preview
};

const store = useStore();
</script>

<template>
  <div class="editor-container h-full">
    <div
      v-if="!store.initialized"
      class="w-full h-full bg-[#1c1717] box-border flex items-center justify-center"
    >
      <Loading />
    </div>
    <div v-else class="p-5 w-full h-full absolute top-0 left-0 flex flex-col">
      <h1 class="flex-0 text-3xl font-bold text-center">{{ t('title') }}</h1>
      <div class="flex-1 mt-5 flex">
        <Navbar class="basis-1/5 h-full" />
        <div class="basis-4/5 h-full px-5">
          <component
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

.editor-container {
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

  input[type='checkbox'] {
    @apply border-2 border-black mr-2 cursor-pointer text-black;
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
</style>
