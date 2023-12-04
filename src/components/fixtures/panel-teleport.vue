<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import List from '@/components/helpers/list.vue';
import type { Field, PanelTeleportObject } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<PanelTeleportObject>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const teleport = reactive<PanelTeleportObject>(props.modelValue ?? {});
const breakpoints = reactive<Array<{ className?: string; minWidth?: number }>>(
  props.modelValue?.breakpoints
    ? Object.keys(props.modelValue.breakpoints).map((k) => {
        return { className: k, breakpoint: props.modelValue!.breakpoints![k] };
      })
    : []
);

watch(breakpoints, () => {
  const newBreakpoints: { [key: string]: number } = {};
  breakpoints.forEach((bp) => {
    if (bp.className && bp.minWidth) {
      newBreakpoints![bp.className] = bp.minWidth;
    }
  });

  if (Object.keys(newBreakpoints).length > 0) {
    teleport.breakpoints = newBreakpoints;
  }
});

watch(teleport, () => {
  emit('update:modelValue', teleport);
});

const breakpointFields: Array<Field> = [
  {
    property: 'className',
    title: 'Class Name',
    description:
      'The class that will be applied as a CSS class when the container width is greater than or equal to the breakpoint minWidth.',
    type: 'string',
    required: true
  },
  {
    property: 'minWidth',
    title: 'Minimum Width',
    description: 'The minimum width (in pixels) where the breakpoint will be applied.',
    type: 'number',
    min: 0,
    required: true
  }
];
</script>

<template>
  <Collapsible
    title="Panel Teleport"
    description="Determines where to render the panel instead of its usual spot in the panel stack."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Target"
          description="The target container where the panel will be rendered. Must be a string query selector."
          required
        />
        <input type="text" v-model="teleport.target" />
      </div>
    </div>
    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        v-model="teleport.showHeader"
        :checked="teleport.showHeader !== false"
      />
      <InputHeader
        title="Show Header"
        description="Whether to show the panel header or not."
        type="checkbox"
      />
    </div>
    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        v-model="teleport.showAppbarButton"
        :checked="teleport.showAppbarButton !== false"
      />
      <InputHeader
        title="Show Appbar Button"
        description="Whether to show the appbar button for the panel or not. Only applies to temporary appbar buttons."
        type="checkbox"
      />
    </div>
    <List
      v-model="breakpoints"
      :item-fields="breakpointFields"
      title="Breakpoints"
      description="An object of type { className<string>: minWidth<number>} pairs. If you add duplicate class name(s), the latest entry will be used as the breakpoint."
      add-prompt="Add breakpoint"
    />
  </Collapsible>
</template>
