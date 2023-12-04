<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import HeaderControls from '@/components/fixtures/legend/header-controls.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const legend = reactive<any>(props.modelValue ?? {});

watch(legend, () => {
  if (!Array.isArray(legend.headerControls)) {
    delete legend.headerControls;
  }
  emit('update:modelValue', legend);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Legend"
    description="Provides configuration to the legend. If not supplied, a blank legend is displayed."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Panel Width"
          description="Determines the width of the legend panel in pixels."
        />
        <input type="number" v-model="legend.panelWidth" min="0" />
      </div>
    </div>
    <HeaderControls v-model="legend.headerControls" />
    <PanelTeleport v-model="legend.panelTeleport" />
  </Collapsible>
</template>
