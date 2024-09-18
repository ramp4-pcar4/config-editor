<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import SymbologyStack from '@/components/fixtures/legend/symbology-stack.vue';
import Controls from '@/components/fixtures/legend/controls.vue';
import LayerControls from '@/components/layers/controls.vue';
import Checkbox from '@/components/helpers/checkbox.vue';
import Input from '@/components/helpers/input.vue';
import Select from '@/components/helpers/select.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let children = reactive<Array<any>>(
  props.modelValue?.map(child => {
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
  children.forEach(child => {
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
    :title="t('legend.children.title')"
    :description="t('legend.children.description')"
    :add-prompt="t('legend.children.add')"
    :remove-prompt="t('legend.children.remove')"
    :singular="t('legend.children.singular')"
    custom-only
  >
    <template #item="{ element, index }">
      <div class="input-table">
        <Select
          :title="t('legend.item.type')"
          required
          :options="[
            { value: 'section', label: t('legend.item.type.section') },
            { value: 'layer', label: t('legend.item.type.layer') }
          ]"
          v-model="children[index].type"
        />
      </div>
      <p class="mt-1">⚠️ {{ t('legend.item.type.warning') }}</p>
      <div class="mt-4 input-table">
        <Input
          :title="t('legend.item.name.title')"
          :description="t('legend.item.name.description')"
          v-model="children[index].name"
        />
        <Select
          v-if="children[index].type === 'section'"
          v-model="children[index].infoType"
          :title="t('legend.item.infoType.title')"
          :description="t('legend.item.infoType.description')"
          :options="[
            { value: 'title', label: t('legend.item.infoType.type.title') },
            { value: 'image', label: t('legend.item.infoType.type.image') },
            { value: 'text', label: t('legend.item.infoType.type.text') },
            { value: 'markdown', label: t('legend.item.infoType.type.markdown') },
            { value: 'template', label: t('legend.item.infoType.type.template') }
          ]"
        />
        <Input
          v-if="children[index].type === 'section'"
          v-model="children[index].content"
          :title="t('legend.item.content.title')"
          :description="t('legend.item.content.description')"
        />
        <Input
          v-if="children[index].type === 'layer'"
          v-model="children[index].layerId"
          :title="t('legend.item.layerId.title')"
          :description="t('legend.item.layerId.description')"
          required
        />
        <Input
          v-if="children[index].type === 'layer'"
          v-model="children[index].sublayerIndex"
          :title="t('legend.item.sublayerIndex.title')"
          :description="t('legend.item.sublayerIndex.description')"
          type="number"
        />
        <Input
          v-if="children[index].type === 'layer'"
          v-model="children[index].coverIcon"
          :title="t('legend.item.coverIcon.title')"
          :description="t('legend.item.coverIcon.description')"
        />
        <Input
          v-if="children[index].type === 'layer'"
          v-model="children[index].description"
          :title="t('legend.item.description.title')"
          :description="t('legend.item.description.description')"
        />
        <Select
          v-if="children[index].type === 'layer'"
          v-model="children[index].symbologyRenderStyle"
          :title="t('legend.item.symbologyRenderStyle.title')"
          :description="t('legend.item.symbologyRenderStyle.description')"
          :options="[
            { value: 'icons', label: t('legend.item.symbologyRenderStyle.icons') },
            { value: 'images', label: t('legend.item.symbologyRenderStyle.images') }
          ]"
        />
      </div>
      <Checkbox
        v-model="children[index].hidden"
        :title="t('legend.item.hidden.title')"
        :description="t('legend.item.hidden.description')"
      />
      <Checkbox
        v-model="children[index].expanded"
        :title="t('legend.item.expanded.title')"
        :description="t('legend.item.expanded.description')"
        checked
      />
      <Checkbox
        v-model="children[index].exclusive"
        :title="t('legend.item.exclusive.title')"
        :description="t('legend.item.exclusive.description')"
      />
      <Checkbox
        v-if="children[index].type === 'layer'"
        v-model="children[index].symbologyExpanded"
        :title="t('legend.item.symbologyExpanded.title')"
        :description="t('legend.item.symbologyExpanded.description')"
      />
      <Children v-model="children[index].children" />
      <Controls v-model="children[index].controls" />
      <Controls v-model="children[index].disabledControls" disabled />
      <LayerControls
        v-if="children[index].type === 'layer'"
        v-model="children[index].layerControls"
        :title="t('legend.item.layerControls.title')"
        :description="t('legend.item.layerControls.description')"
      />
      <LayerControls
        v-if="children[index].type === 'layer'"
        v-model="children[index].disabledLayerControls"
        disabled
        :title="t('legend.item.disabledLayerControls.title')"
        :description="t('legend.item.disabledLayerControls.description')"
      />
      <SymbologyStack v-if="children[index].type === 'layer'" v-model="children[index].symbologyStack" />
    </template>
  </List>
</template>
