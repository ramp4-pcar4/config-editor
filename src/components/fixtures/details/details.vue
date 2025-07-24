<script setup lang="ts">
// root.fixtures.details config nugget

import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';
import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const details = reactive<any>(props.modelValue ?? {});
const templates = reactive<any>({
  esri: props.modelValue?.templates?.esri,
  text: props.modelValue?.templates?.text,
  image: props.modelValue?.templates?.image,
  html: props.modelValue?.templates?.html,
  xml: props.modelValue?.templates?.xml,
  json: props.modelValue?.templates?.json
});

watch(details, () => {
  emit('update:modelValue', details);
});

watch(templates, () => {
  Object.keys(templates).forEach(key => {
    if (!templates[key]) {
      delete templates[key];
    }
  });
  details.templates = Object.keys(templates).length === 0 ? undefined : templates;
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('details.title')" :description="t('details.description')">
    <div class="input-table">
      <Input
        :title="t('panelWidth.title')"
        :description="t('panelWidth.description')"
        type="number"
        v-model="details.panelWidth"
        min="0"
      />
    </div>
    <PanelTeleport v-model="details.panelTeleport" />
    <Collapsible :title="t('details.templates.title')" :description="t('details.templates.description')">
      <div class="input-table">
        <Input v-model="templates.esri" :title="t('details.templates.esri')" />
        <Input v-model="templates.text" :title="t('details.templates.text')" />
        <Input v-model="templates.image" :title="t('details.templates.image')" />
        <Input v-model="templates.html" :title="t('details.templates.html')" />
        <Input v-model="templates.xml" :title="t('details.templates.xml')" />
        <Input v-model="templates.json" :title="t('details.templates.json')" />
      </div>
    </Collapsible>
  </Collapsible>
</template>
