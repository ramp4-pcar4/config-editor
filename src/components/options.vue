<script setup lang="ts">
import Checkbox from '@/components/helpers/checkbox.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ t('navbar.options') }}</h1>
    <Checkbox
      v-model="store.options!.loadDefaultEvents"
      checked
      :title="t('options.defaultEvents')"
    />
    <Checkbox
      v-model="store.options!.loadDefaultFixtures"
      checked
      :title="t('options.defaultFixtures')"
    />
    <Checkbox v-model="store.options!.startRequired" :title="t('options.startRequired')" />
  </div>
</template>
