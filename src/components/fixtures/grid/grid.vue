<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import MergeGrids from '@/components/fixtures/grid/merge-grids.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const grid = reactive<any>(props.modelValue ?? {});

watch(grid, () => {
  emit('update:modelValue', grid);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Grid"
    description="Provides configuration to the grid. If not supplied, a default grid is displayed for each layer."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Panel Width"
          description="Determines the width of the grid panel in pixels."
        />
        <input type="number" v-model="grid.panelWidth" min="0" />
      </div>
    </div>
    <PanelTeleport v-model="grid.panelTeleport" />
    <MergeGrids v-model="grid.mergeGrids" />
  </Collapsible>
</template>
