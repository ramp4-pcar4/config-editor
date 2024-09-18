<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import MergeGrids from '@/components/fixtures/grid/merge-grids.vue';
import Input from '@/components/helpers/input.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const grid = reactive<any>(props.modelValue ?? {});

watch(grid, () => {
  emit('update:modelValue', grid);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('grid.title')" :description="t('grid.description')">
    <div class="input-table">
      <Input
        :title="t('panelWidth.title')"
        :description="t('panelWidth.description')"
        type="number"
        v-model="grid.panelWidth"
        min="0"
      />
    </div>
    <PanelTeleport v-model="grid.panelTeleport" />
    <MergeGrids v-model="grid.mergeGrids" />
  </Collapsible>
</template>
