<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import Basemaps from '@/components/map/basemaps.vue';

import { reactive, type PropType, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const overviewMap = reactive<any>(props.modelValue ?? {});
const basemaps = reactive<Array<any>>(
  props.modelValue?.basemaps
    ? Object.keys(props.modelValue?.basemaps).map((k) => props.modelValue?.basemaps[k])
    : []
);

const update = () => {
  if (overviewMap.expandFactor === '') {
    delete overviewMap.expandFactor;
  }
  if (overviewMap.borderWidth === '') {
    delete overviewMap.borderWidth;
  }
  if (overviewMap.areaOpacity === '') {
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
  console.log(basemaps, newBasemaps);
  if (Object.keys(newBasemaps).length > 0) {
    overviewMap.basemaps = newBasemaps;
  } else {
    delete overviewMap.basemaps;
  }
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Overview Map"
    description="Provides configuration to the overview map fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Expand Factor"
          description="The ratio of the overview map's extent size compared to the main map's extent size"
        />
        <input type="number" v-model="overviewMap.expandFactor" placeholder="1.5" />
      </div>
      <div>
        <InputHeader
          title="Border Colour"
          description="The hex code representing the area rectangle border colour."
        />
        <input type="text" v-model="overviewMap.borderColour" placeholder="#FF0000" />
      </div>
      <div>
        <InputHeader
          title="Border Width"
          description="The pixel width of the area rectangle border."
        />
        <input type="number" v-model="overviewMap.borderWidth" placeholder="1" />
      </div>
      <div>
        <InputHeader
          title="Area Colour"
          description="The hex code representing the area rectangle colour."
        />
        <input type="text" v-model="overviewMap.areaColour" placeholder="#000000" />
      </div>
      <div>
        <InputHeader
          title="Area Opacity"
          description="The opacity value of the area rectangle. Accepts decimal values between 0 and 1."
        />
        <input type="number" v-model="overviewMap.areaOpacity" min="0" max="1" placeholder="0.25" />
      </div>
    </div>
    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        v-model="overviewMap.startMinimized"
        :checked="overviewMap.startMinimized !== false"
      />
      <InputHeader
        title="Start Minimized"
        description="Specifies if the overview map is minimized on startup."
        type="checkbox"
      />
    </div>
    <Basemaps v-model="basemaps" is-overview />
  </Collapsible>
</template>
