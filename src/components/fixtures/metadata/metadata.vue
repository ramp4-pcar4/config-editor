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
const metadata = reactive<any>(props.modelValue ?? {});

watch(metadata, () => {
  emit('update:modelValue', metadata.panelTeleport ? metadata : undefined);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Metadata"
    description="Provides configuration to the metadata fixture."
  >
    <PanelTeleport v-model="metadata.panelTeleport" />
  </Collapsible>
</template>
