<script setup lang="ts">
import Loading from '@/components/loading.vue';
import Navbar from './components/navbar.vue';

import '@/styles.css';
import { useI18n } from 'vue-i18n';
import type { API } from './main';
import { inject } from 'vue';
import { useInitializeStore } from './stores/initialize';

const { t } = useI18n();
const api = inject<API>('api');

const initializeStore = useInitializeStore();
</script>

<template>
  <div class="editor-container h-full">
    <div
      v-if="!initializeStore.initialized"
      class="w-full h-full bg-[#1c1717] box-border flex items-center justify-center"
    >
      <loading />
    </div>
    <div v-else class="p-5 w-full h-full absolute top-0 left-0 flex flex-col">
      <h1 class="flex-0 text-3xl font-bold text-center">{{ t('title') }}</h1>
      <div class="flex-1 mt-5 flex">
        <navbar class="basis-1/5 h-full" />
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
