<script setup lang="ts">
// root.layers[].fixtures.grid.controls config nugget

// TODO fix grouse

import { reactive, type PropType, watch, computed } from 'vue';
import List from '@/components/helpers/list.vue';
import Select from '@/components/helpers/select.vue';
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

let controls = reactive<Array<any>>(
  props.modelValue?.map(control => {
    if (typeof control === 'object') {
      control.type = 'custom';
      return control;
    } else {
      return { type: control };
    }
  }) ?? [{ type: 'zoom' }, { type: 'details' }]
);

const addControl = () => {
  controls.push({ type: 'custom' });
};

const isDefault = computed<boolean>(() => controls.length === 2 && zoomIdx.value !== -1 && detailsIdx.value !== -1);

const zoomIdx = computed<number>(() => controls.findIndex(c => c.type === 'zoom'));
const detailsIdx = computed<number>(() => controls.findIndex(c => c.type === 'details'));

watch(controls, () => {
  controls.forEach(control => {
    if (control.type !== 'custom') {
      delete control.actionEvent;
      delete control.icon;
      delete control.tooltip;
      delete control.displayOn;
    }
  });
  const controlsCopy = JSON.parse(JSON.stringify(controls));
  emit(
    'update:modelValue',
    isDefault.value
      ? undefined
      : controlsCopy.map((control: any) => {
          if (control.type === 'zoom' || control.type === 'details') {
            return control.type;
          } else {
            delete control.type;
            return control;
          }
        })
  );
});
</script>

<template>
  <List
    v-model="controls"
    :add="addControl"
    :title="t('grid.mergeGrid.options.controls.title')"
    :description="t('grid.mergeGrid.options.controls.description')"
    :add-prompt="t('grid.mergeGrid.options.controls.add')"
    :remove-prompt="t('grid.mergeGrid.options.controls.remove')"
    :singular="t('grid.mergeGrid.options.controls.singular')"
    custom-only
  >
    <template #item="{ element, index }">
      <div class="input-table">
        <Select
          :title="t('grid.mergeGrid.options.control.type.title')"
          :description="t('grid.mergeGrid.options.control.type.description')"
          required
          v-model="controls[index].type"
          :options="
            (zoomIdx === index || zoomIdx === -1
              ? [{ value: 'zoom', label: t('grid.mergeGrid.options.control.type.zoom') }]
              : []
            ).concat(
              detailsIdx === index || detailsIdx === -1
                ? [{ value: 'details', label: t('grid.mergeGrid.options.control.type.details') }]
                : [],
              [{ value: 'custom', label: t('grid.mergeGrid.options.control.type.custom') }]
            )
          "
        />
      </div>
      <p class="mt-1">⚠️ {{ t('grid.mergeGrid.options.control.type.warning') }}</p>
      <div class="mt-4 input-table" v-if="controls[index].type === 'custom'">
        <Input
          v-model="controls[index].actionEvent"
          :title="t('grid.mergeGrid.options.control.actionEvent.title')"
          :description="t('grid.mergeGrid.options.control.actionEvent.description')"
          required
        />
        <Input
          v-model="controls[index].icon"
          :title="t('grid.mergeGrid.options.control.icon.title')"
          :description="t('grid.mergeGrid.options.control.icon.description')"
          required
        />
        <Input
          v-model="controls[index].tooltip"
          :title="t('grid.mergeGrid.options.control.tooltip.title')"
          :description="t('grid.mergeGrid.options.control.tooltip.description')"
          required
        />
        <Select
          v-model="controls[index].displayOn"
          :title="t('grid.mergeGrid.options.control.displayOn.title')"
          :description="t('grid.mergeGrid.options.control.displayOn.description')"
          :options="[
            { value: 'all', label: t('grid.mergeGrid.options.control.displayOn.all') },
            { value: 'geo', label: t('grid.mergeGrid.options.control.displayOn.geo') },
            { value: 'data', label: t('grid.mergeGrid.options.control.displayOn.data') }
          ]"
        />
      </div>
    </template>
  </List>
</template>
