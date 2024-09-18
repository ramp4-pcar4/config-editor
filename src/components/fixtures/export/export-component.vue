<script setup lang="ts">
import Checkbox from '@/components/helpers/checkbox.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import { useI18n } from 'vue-i18n';

const selectable = defineModel('selectable', { type: Boolean });
const selected = defineModel('selected', { type: Boolean });

const { t } = useI18n();

defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});
</script>

<template>
  <Collapsible :title="title" :description="description">
    <slot></slot>
    <Checkbox
      v-model="selected"
      :title="t('export.selected.title')"
      :description="t('export.selected.description')"
      checked
    />
    <Checkbox
      v-model="selectable"
      :title="t('export.selectable.title')"
      :description="t('export.selectable.description')"
      checked
    />
  </Collapsible>
</template>
