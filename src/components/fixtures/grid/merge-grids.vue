<script setup lang="ts">
// root.fixtures.grid.mergeGrids config nugget

// TODO fix typescript grouse

import { reactive, type PropType, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import Layers from '@/components/fixtures/grid/layers.vue';
import FieldMap from '@/components/fixtures/grid/field-map.vue';
import Options from '@/components/fixtures/grid/options.vue';
import Input from '@/components/helpers/input.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let mergeGrids = reactive<Array<any>>(props.modelValue ?? []);

watch(mergeGrids, () => {
  emit('update:modelValue', mergeGrids.length === 0 ? undefined : mergeGrids);
});
</script>

<template>
  <List
    v-model="mergeGrids"
    :title="t('grid.mergeGrids.title')"
    :description="t('grid.mergeGrids.description')"
    :add-prompt="t('grid.mergeGrids.add')"
    :remove-prompt="t('grid.mergeGrids.remove')"
    :singular="t('grid.mergeGrids.singular')"
    custom-only
    required
  >
    <template #item="{ element, index }">
      <div class="mt-4 input-table">
        <Input
          :title="t('grid.mergeGrid.gridId.title')"
          :description="t('grid.mergeGrid.gridId.description')"
          v-model="mergeGrids[index].gridId"
          required
        />
      </div>
      <Layers v-model="mergeGrids[index].layers" />
      <FieldMap v-model="mergeGrids[index].fieldMap" />
      <Options
        v-model="mergeGrids[index].options"
        :title="t('grid.mergeGrid.options.title')"
        :description="t('grid.mergeGrid.options.description')"
      />
    </template>
  </List>
</template>
