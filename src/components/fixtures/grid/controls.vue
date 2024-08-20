<script setup lang="ts">
import { reactive, type PropType, watch, computed } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

let controls = reactive<Array<any>>(
  props.modelValue?.map((control) => {
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

const isDefault = computed<boolean>(
  () => controls.length === 2 && zoomIdx.value !== -1 && detailsIdx.value !== -1
);

const zoomIdx = computed<number>(() => controls.findIndex((c) => c.type === 'zoom'));
const detailsIdx = computed<number>(() => controls.findIndex((c) => c.type === 'details'));

watch(controls, () => {
  controls.forEach((control) => {
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
    title="Controls"
    description="Which action buttons to display for each rows. Pre-defined strings are 'zoom' and 'details'. Other entries may be an object containing an event name, an icon and a tooltip."
    add-prompt="Add control"
    custom-only
  >
    <template #item="{ element, index }">
      <div class="input-table">
        <div>
          <InputHeader
            title="Control Type"
            description="Either 'zoom' or 'details', the default grid buttons, or 'custom'. Note that the default grid buttons can only be selected once."
            required
          />
          <select v-model="controls[index].type">
            <option v-if="zoomIdx === index || zoomIdx === -1" value="zoom">Zoom</option>
            <option v-if="detailsIdx === index || detailsIdx === -1" value="details">
              Details
            </option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
      <p class="mt-1">
        ⚠️ Warning! Changing the control type from custom to zoom or details will result in custom
        properties being erased.
      </p>
      <div class="mt-4 input-table" v-if="controls[index].type === 'custom'">
        <div>
          <InputHeader
            title="Action Event"
            description="The name of the event to raise when the button is clicked."
            required
          />
          <input type="text" v-model="controls[index].actionEvent" />
        </div>
        <div>
          <InputHeader title="Icon" description="The icon to display for the button." required />
          <input type="text" v-model="controls[index].icon" />
        </div>
        <div>
          <InputHeader
            title="Tooltip"
            description="The tooltip to display when the button is hovered."
            required
          />
          <input type="text" v-model="controls[index].tooltip" />
        </div>
        <div>
          <InputHeader
            title="Display On"
            description="Which layer format this button should appear for."
          />
          <select v-model="controls[index].displayOn">
            <option value="all">All</option>
            <option value="geo">Map Layers</option>
            <option value="data">Data Layers</option>
          </select>
        </div>
      </div>
    </template>
  </List>
</template>
