<script setup lang="ts">
import InputHeader from '@/components/helpers/input-header.vue';
import type { Field } from '@/definitions';
import List from '@/components/helpers/list.vue';
import { useStore } from '@/store';

const store = useStore();

const itemFields: Array<Field> = [
  {
    type: 'string',
    property: 'id',
    title: 'Panel ID',
    description:
      'ID of the panel to open. Out-of-the-box panel IDs that are supported: basemap, export, geosearch, help, layer-reorder, legend, notifications, and wizard.',
    required: true
  },
  {
    type: 'string',
    property: 'screen',
    title: 'Screen ID',
    description: 'ID of the screen of the panel to show.'
  },
  {
    type: 'boolean',
    property: 'pin',
    title: 'Pin',
    description: 'Whether to pin the panel as well.'
  }
];
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">Panels</h1>
    <div class="mt-5 flex items-center">
      <input
        aria-label="Reorderable"
        type="checkbox"
        v-model="store.configs[store.editingLang].panels!.reorderable"
        :checked="store.configs[store.editingLang].panels!.reorderable !== false"
      />
      <InputHeader
        title="Reorderable"
        description="Enables panel reorder controls."
        type="checkbox"
      />
    </div>
    <List
      v-model="store.configs[store.editingLang].panels!.open"
      :item-fields="itemFields"
      title="Open"
      add-prompt="Add panel"
      description="The panels to open on startup. Panels with props are currently not supported."
      top-level
    />
  </div>
</template>
