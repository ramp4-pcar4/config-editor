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
const basemap = reactive<any>(props.modelValue ?? {});

watch(basemap, () => {
  emit('update:modelValue', basemap.panelTeleport ? basemap : undefined);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Basemap"
    description="Provides configuration to the basemap fixture."
  >
    <PanelTeleport v-model="basemap.panelTeleport" />
  </Collapsible>
</template>
