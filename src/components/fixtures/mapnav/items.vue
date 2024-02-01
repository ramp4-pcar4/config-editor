<script setup lang="ts">
import { type PropType, watch, ref } from 'vue';

import Collapsible from '@/components/helpers/collapsible.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<string>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const allItems = [
  'home',
  'fullscreen',
  'geolocator',
  'help',
  'basemap',
  'zoom',
  'geosearch',
  'legend'
];

const items = ref<Array<string>>(
  props.modelValue ?? ['fullscreen', 'help', 'home', 'geolocator', 'basemap']
);

watch(items, () => {
  emit('update:modelValue', items.value);
});
</script>

<template>
  <Collapsible title="Items" description="Map navigation buttons to be displayed on the mapnav.">
    <div class="input-table">
      <div class="flex items-center" v-for="item in allItems">
        <input
          type="checkbox"
          class="border-2 border-black cursor-pointer text-black mr-2"
          :id="item"
          :value="item"
          v-model="items"
        />
        <label :for="item">{{ item[0].toUpperCase() + item.slice(1) }}</label>
      </div>
    </div>
  </Collapsible>
</template>
