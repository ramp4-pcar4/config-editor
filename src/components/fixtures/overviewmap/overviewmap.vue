<script setup lang="ts">
// root.fixtures.overviewmap config nugget

import Collapsible from '@/components/helpers/collapsible.vue';
import Basemaps from '@/components/map/basemaps.vue';
import Input from '@/components/helpers/input.vue';
import Checkbox from '@/components/helpers/checkbox.vue';

import { reactive, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
let overviewMap = reactive<any>(props.modelValue ?? {});
let basemaps = reactive<Array<any>>(
  props.modelValue?.basemaps ? Object.keys(props.modelValue?.basemaps).map(k => props.modelValue?.basemaps[k]) : []
);

const update = () => {
  if (overviewMap.expandFactor === undefined) {
    delete overviewMap.expandFactor;
  }
  if (overviewMap.borderWidth === undefined) {
    delete overviewMap.borderWidth;
  }
  if (overviewMap.areaOpacity === undefined) {
    delete overviewMap.areaOpacity;
  }
  if (!overviewMap.borderColour) {
    delete overviewMap.borderColour;
  }
  if (!overviewMap.areaColour) {
    delete overviewMap.areaColour;
  }

  emit('update:modelValue', Object.keys(overviewMap).length === 0 ? undefined : overviewMap);
};

watch(overviewMap, update);
watch(basemaps, () => {
  const newBasemaps: { [key: string]: any } = {};
  basemaps.forEach((bm: any) => {
    if (bm.tileSchemaId) {
      newBasemaps[bm.tileSchemaId] = bm;
    }
  });
  if (Object.keys(newBasemaps).length > 0) {
    overviewMap.basemaps = newBasemaps;
  } else {
    delete overviewMap.basemaps;
  }
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('overviewMap.title')" :description="t('overviewMap.description')">
    <div class="input-table">
      <Input
        type="number"
        :title="t('overviewMap.expandFactor.title')"
        :description="t('overviewMap.expandFactor.description')"
        v-model="overviewMap.expandFactor"
        placeholder="1.5"
      />
      <Input
        :title="t('overviewMap.borderColour.title')"
        :description="t('overviewMap.borderColour.description')"
        v-model="overviewMap.borderColour"
        placeholder="#FF0000"
      />
      <Input
        type="number"
        :title="t('overviewMap.borderWidth.title')"
        :description="t('overviewMap.borderWidth.description')"
        v-model="overviewMap.borderWidth"
        min="0"
        placeholder="1"
      />
      <Input
        :title="t('overviewMap.areaColour.title')"
        :description="t('overviewMap.areaColour.description')"
        v-model="overviewMap.areaColour"
        placeholder="#000000"
      />
      <Input
        type="number"
        :title="t('overviewMap.areaOpacity.title')"
        :description="t('overviewMap.areaOpacity.description')"
        v-model="overviewMap.areaOpacity"
        min="0"
        max="1"
        placeholder="0.25"
      />
    </div>
    <Checkbox
      v-model="overviewMap.startMinimized"
      checked
      :title="t('overviewMap.startMinimized.title')"
      :description="t('overviewMap.startMinimized.description')"
    />
    <Basemaps v-model="basemaps" is-overview />
  </Collapsible>
</template>
