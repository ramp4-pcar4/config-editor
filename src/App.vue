<script setup lang="ts">
import Loading from '@/components/loading.vue';
import Navbar from './components/navbar.vue';
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';
import OptionsEditor from '@/components/options.vue';
import Preview from '@/components/preview.vue';

import '@/styles.css';
import { useI18n } from 'vue-i18n';
import type { API } from './main';
import { inject } from 'vue';
import { useStore } from './store';

const { t } = useI18n();
const api = inject<API>('api');

const editors: { [key: string]: any } = {
  'starting-fixtures': StartingFixturesEditor,
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
      <loading />
    </div>
    <div v-else class="p-5 w-full h-full absolute top-0 left-0 flex flex-col">
      <h1 class="flex-0 text-3xl font-bold text-center">{{ t('title') }}</h1>
      <div class="flex-1 mt-5 flex">
        <navbar class="basis-1/5 h-full" />
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
}
</style>
