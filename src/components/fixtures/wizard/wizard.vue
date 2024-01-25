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
const wizard = reactive<any>(props.modelValue ?? {});

watch(wizard, () => {
  emit('update:modelValue', wizard.panelTeleport ? wizard : undefined);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Wizard"
    description="Provides configuration to the wizard fixture."
  >
    <PanelTeleport v-model="wizard.panelTeleport" />
  </Collapsible>
</template>
