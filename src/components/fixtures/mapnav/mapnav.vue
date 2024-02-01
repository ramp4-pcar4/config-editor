<script setup lang="ts">
import { reactive, ref, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

import Items from '@/components/fixtures/mapnav/items.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const mapnav = reactive<any>(props.modelValue ?? {});
watch(mapnav, () => {
  emit('update:modelValue', Object.keys(mapnav).length === 0 ? undefined : mapnav);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Mapnav"
    description="Provides configuration to the mapnav fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Zoom Option"
          description="Specifies between zoom buttons or zoom sliders. The default is buttons."
        />
        <select v-model="mapnav.zoomOption">
          <option value="all">All</option>
          <option value="buttons">Buttons</option>
          <option value="slider">Slider</option>
        </select>
      </div>
    </div>
    <Items v-model="mapnav.items" />
  </Collapsible>
</template>
