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
const layerReorder = reactive<any>(props.modelValue ?? {});

watch(layerReorder, () => {
  emit('update:modelValue', layerReorder.panelTeleport ? layerReorder : undefined);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Layer Reorder"
    description="Provides configuration to the layer reorder fixture."
  >
    <PanelTeleport v-model="layerReorder.panelTeleport" />
  </Collapsible>
</template>
