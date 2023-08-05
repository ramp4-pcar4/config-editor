<script setup lang="ts">
import { ref, type PropType, onBeforeMount, watch } from 'vue';
import { LayerControl } from '@/definitions';

import Collapsible from '@/components/helpers/collapsible.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<LayerControl>>,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const allControls = [
  LayerControl.BoundaryZoom,
  LayerControl.Datatable,
  LayerControl.Identify,
  LayerControl.Metadata,
  LayerControl.Opacity,
  LayerControl.Refresh,
  LayerControl.Reload,
  LayerControl.Remove,
  LayerControl.Settings,
  LayerControl.Symbology,
  LayerControl.Visibility
];

const controls = ref<Array<LayerControl>>(
  props.modelValue ?? (props.disabled ? [] : JSON.parse(JSON.stringify(allControls)))
);

watch(controls, () => {
  emit(
    'update:modelValue',
    props.disabled
      ? controls.value.length === 0
        ? undefined
        : controls.value
      : controls.value.length === 11
      ? undefined
      : controls.value
  );
});
</script>

<template>
  <Collapsible :title="disabled ? 'Disabled Controls' : 'Controls'">
    <div class="input-table">
      <div class="flex items-center" v-for="ctrl in Object.keys(LayerControl)">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :id="ctrl"
          :value="LayerControl[<'Identify'>ctrl]"
          v-model="controls"
        />
        <label :for="ctrl">{{ ctrl.replace(/([A-Z])/g, ' $1').trim() }}</label>
      </div>
    </div>
  </Collapsible>
</template>
