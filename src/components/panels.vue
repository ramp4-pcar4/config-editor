<script setup lang="ts">
import Checkbox from '@/components/helpers/checkbox.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import type { Field } from '@/definitions';
import List from '@/components/helpers/list.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();

const itemFields: Array<Field> = [
  {
    type: 'string',
    property: 'id',
    title: 'panels.open.id.title',
    description: 'panels.open.id.description',
    required: true
  },
  {
    type: 'string',
    property: 'screen',
    title: 'panels.open.screen.title',
    description: 'panels.open.screen.description'
  },
  {
    type: 'boolean',
    property: 'pin',
    title: 'panels.open.pin.title',
    description: 'panels.open.pin.description'
  }
];
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">{{ t('navbar.panels') }}</h1>
    <Checkbox
      v-model="store.configs[store.editingLang].panels!.reorderable"
      checked
      :title="t('panels.reorderable.title')"
      :description="t('panels.reorderable.description')"
    />
    <List
      v-model="store.configs[store.editingLang].panels!.open"
      :item-fields="itemFields"
      :title="t('panels.open.title')"
      :add-prompt="t('panels.open.add')"
      :remove-prompt="t('panels.open.remove')"
      :description="t('panels.open.description')"
      top-level
    />
  </div>
</template>
