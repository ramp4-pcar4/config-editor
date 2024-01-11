<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const settings = reactive<any>(props.modelValue ?? {});

watch(settings, () => {
  emit('update:modelValue', settings.panelTeleport ? settings : undefined);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Settings"
    description="Provides configuration to the settings fixture."
  >
    <PanelTeleport v-model="settings.panelTeleport" />
  </Collapsible>
</template>
