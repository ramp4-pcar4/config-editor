<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import { reactive, type PropType, watch } from 'vue';
import Items from '@/components/fixtures/appbar/items.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const appbar = reactive<any>(props.modelValue ?? {});

watch(appbar, () => {
  const copy = JSON.parse(JSON.stringify(appbar));
  emit('update:modelValue', Object.keys(copy).length === 0 ? undefined : copy);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Appbar"
    description="Provides configuration to the appbar. If not supplied, default appbar controls (legend, geosearch, basemap) are displayed."
  >
    <Items v-model="appbar.items" isRoot />
  </Collapsible>
</template>
