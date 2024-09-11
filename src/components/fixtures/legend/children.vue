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

let children = reactive<Array<any>>(
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
      delete child.infoType;
      delete child.content;
    } else {
      delete child.layerId;
      delete child.sublayerIndex;
      delete child.layerControls;
      delete child.disabledLayerControls;
      delete child.symbologyStack;
      delete child.symbologyExpanded;
      delete child.symbologyRenderStyle;
      delete child.description;
      delete child.coverIcon;
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
          <select v-model="children[index].type" aria-label="Item Type">
            <option value="section">Section Item</option>
            <option value="layer">Layer Item</option>
          </select>
        </div>
      </div>
      <p class="mt-1">
        ⚠️ Warning! Changing the item type will result in type-specific properties being deleted.
      </p>
      <div class="mt-4 input-table">
        <div>
          <InputHeader
            title="Name"
            description="Title of the legend item. Defaults to layer name for layer items, undefined for section items."
          />
          <input type="text" v-model="children[index].name" aria-label="Name" />
        </div>
        <div v-if="children[index].type === 'section'">
          <InputHeader
            title="Info Type"
            description="Type of custom content to display instead of the item name. Defaults to title."
          />
          <select v-model="children[index].infoType" aria-label="Info Type">
            <option value="title">Title</option>
            <option value="image">Image</option>
            <option value="text">Text</option>
            <option value="markdown">Markdown</option>
            <option value="template">HTML Template</option>
          </select>
        </div>
        <div v-if="children[index].type === 'section'">
          <InputHeader
            title="Content"
            description="Custom content to display instead of item name - description of title/text, URL to image file, or HTML for template."
          />
          <input type="text" v-model="children[index].content" aria-label="Content" />
        </div>
        <div v-if="children[index].type === 'layer'">
          <InputHeader
            title="Layer ID"
            description="ID of a layer defined in the layers section of config that this layer item will be linked to."
            required
          />
          <input type="text" v-model="children[index].layerId" aria-label="Layer ID" />
        </div>
        <div v-if="children[index].type === 'layer'">
          <InputHeader
            title="Sublayer Index"
            description="Index of the sublayer to link this item to in the case of a map image layer. If not defined, will result in tree grow of the whole MIL. If group index defined, will result in tree grow of the specified group."
          />
          <input
            type="number"
            v-model="children[index].sublayerIndex"
            aria-label="Sublayer Index"
          />
        </div>
        <div v-if="children[index].type === 'layer'">
          <InputHeader
            title="Cover Icon"
            description="Custom icon used to represent the layer item's symbology stack. Should be a URL to an image."
          />
          <input type="text" v-model="children[index].coverIcon" aria-label="Cover Icon" />
        </div>
        <div v-if="children[index].type === 'layer'">
          <InputHeader
            title="Description"
            description="Optional description displayed above the symbology stack when it is expanded."
          />
          <input type="text" v-model="children[index].description" aria-label="Description" />
        </div>
        <div v-if="children[index].type === 'layer'">
          <InputHeader
            title="Symbology Render Style"
            description="Describes how the symbology stack should be rendered. Icons makes the images icon-sized, images makes the images full-sized. Defaults to icons."
          />
          <select
            v-model="children[index].symbologyRenderStyle"
            aria-label="Symbology Render Style"
          >
            <option value="icons">Icons</option>
            <option value="images">Images</option>
          </select>
        </div>
      </div>
      <div class="flex items-center mt-4">
        <input type="checkbox" v-model="children[index].hidden" aria-label="Hidden" />
        <InputHeader
          title="Hidden"
          description="Indicates that the legend item will be hidden from the UI."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          v-model="children[index].expanded"
          :checked="children[index].expanded != false"
          aria-label="Expanded"
        />
        <InputHeader
          title="Expanded"
          description="Specifies if the legend item is expanded by default."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input type="checkbox" v-model="children[index].exclusive" aria-label="Exclusive" />
        <InputHeader
          title="Exclusive"
          description="Specifies that children of this item form an exclusive set."
          type="checkbox"
        />
      </div>
      <div v-if="children[index].type === 'layer'" class="flex items-center mt-4">
        <input
          type="checkbox"
          v-model="children[index].symbologyExpanded"
          aria-label="Symbology Expanded"
        />
        <InputHeader
          title="Symbology Expanded"
          description="Specifies if the symbology stack is expanded by default."
          type="checkbox"
        />
      </div>
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
