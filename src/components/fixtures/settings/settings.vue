<script setup lang="ts">
// root.fixtures.settings config nugget

import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
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
const settings = reactive<any>(props.modelValue ?? {});

watch(settings, () => {
  emit('update:modelValue', settings.panelTeleport ? settings : undefined);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('settings.title')" :description="t('settings.description')">
    <PanelTeleport v-model="settings.panelTeleport" />
  </Collapsible>
</template>
