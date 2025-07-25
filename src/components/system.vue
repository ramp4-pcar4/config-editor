<script setup lang="ts">
// root.system config nugget

import Checkbox from '@/components/helpers/checkbox.vue';
import Input from '@/components/helpers/input.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ t('navbar.system') }}</h1>
    <Input
      :title="t('system.proxyUrl.title')"
      :description="t('system.proxyUrl.description')"
      v-model="store.configs[store.editingLang].system!.proxyUrl"
      header-class="mt-4"
      input-class="w-full sm:w-[500px]"
    />
    <Input
      :title="t('system.zoomIcon.title')"
      :description="t('system.zoomIcon.description')"
      v-model="store.configs[store.editingLang].system!.zoomIcon"
      header-class="mt-4"
      input-class="w-full sm:w-[500px]"
    />
    <Checkbox
      v-model="store.configs[store.editingLang].system!.animate"
      checked
      :title="t('system.animate.title')"
      :description="t('system.animate.description')"
    />
    <Checkbox
      v-model="store.configs[store.editingLang].system!.exposeOid"
      :title="t('system.exposeOid.title')"
      :description="t('system.exposeOid.description')"
    />
    <Checkbox
      v-model="store.configs[store.editingLang].system!.exposeMeasurements"
      checked
      :title="t('system.exposeMeasurements.title')"
      :description="t('system.exposeMeasurements.description')"
    />
    <Checkbox
      v-model="store.configs[store.editingLang].system!.suppressNumberLocalization"
      :title="t('system.suppressNumberLocalization.title')"
      :description="t('system.suppressNumberLocalization.description')"
    />
    <Checkbox
      v-model="store.configs[store.editingLang].system!.scrollToInstance"
      :title="t('system.scrollToInstance.title')"
      :description="t('system.scrollToInstance.description')"
    />
  </div>
</template>
