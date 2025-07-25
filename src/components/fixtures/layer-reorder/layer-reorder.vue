<script setup lang="ts">
// root.fixtures.layer-reorder config nugget

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
const layerReorder = reactive<any>(props.modelValue ?? {});

watch(layerReorder, () => {
  emit('update:modelValue', layerReorder.panelTeleport ? layerReorder : undefined);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('layerReorder.title')" :description="t('layerReorder.description')">
    <PanelTeleport v-model="layerReorder.panelTeleport" />
  </Collapsible>
</template>
