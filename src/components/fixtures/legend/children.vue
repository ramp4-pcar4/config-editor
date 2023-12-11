<script setup lang="ts">
import type { Field } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import SymbologyStack from '@/components/fixtures/legend/symbology-stack.vue';
import Controls from '@/components/fixtures/legend/controls.vue';
import LayerControls from '@/components/layers/controls.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const children = reactive<Array<any>>(
  props.modelValue?.map((child) => {
    if (child.layerId) {
      child.type = 'layer';
    } else {
      child.type = 'section';
    }
    return child;
  }) ?? []
);

const addChild = () => {
  children.push({ type: 'section' });
};

watch(children, () => {
  children.forEach((child) => {
    if (child.type === 'layer') {
      delete child.content;
    } else {
      delete child.layerControls;
      delete child.disabledLayerControls;
      delete child.symbologyStack;
    }
  });
  const childrenCopy = JSON.parse(JSON.stringify(children));
  emit(
    'update:modelValue',
    childrenCopy.length === 0
      ? undefined
      : childrenCopy.map((child: any) => {
          delete child.type;
          if (!child.children || child.children.length === 0) {
            delete child.children;
          }
          return child;
        })
  );
});
</script>

<template>
  <List
    v-model="children"
    :add="addChild"
    title="Children"
    description="Provides configuration to the child legend items of this item."
    add-prompt="Add child"
    singular="Child"
    custom-only
  >
    <template #item="{ element, index }">
      <div class="input-table">
        <div>
          <InputHeader title="Item Type" required />
          <select v-model="children[index].type">
            <option value="section">Section Item</option>
            <option value="layer">Layer Item</option>
          </select>
        </div>
      </div>
      <p class="mt-2">
        ⚠️ Warning! Changing the item type will result in type-specific properties being deleted.
      </p>
      <Children v-model="children[index].children" />
      <Controls v-model="children[index].controls" />
      <Controls v-model="children[index].disabledControls" disabled />
      <LayerControls
        v-if="children[index].type === 'layer'"
        v-model="children[index].layerControls"
        title="Layer Controls"
        description="All possible controls to be enabled on the legend layer item. Defaults to controls defined in layer config if missing."
      />
      <LayerControls
        v-if="children[index].type === 'layer'"
        v-model="children[index].disabledLayerControls"
        disabled
        title="Layer Controls"
        description="All possible controls to be disabled on the legend layer item. Defaults to disabled controls defined in layer config if missing."
      />
      <SymbologyStack
        v-if="children[index].type === 'layer'"
        v-model="children[index].symbologyStack"
      />
    </template>
  </List>
</template>
