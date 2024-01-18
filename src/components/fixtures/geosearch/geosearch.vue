<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import ServiceUrls from '@/components/fixtures/geosearch/service-urls.vue';
import Settings from '@/components/fixtures/geosearch/settings.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const geosearch = reactive<any>(props.modelValue ?? {});

watch(geosearch, () => {
  if (!geosearch.serviceUrls) {
    delete geosearch.serviceUrls;
  }
  emit('update:modelValue', Object.keys(geosearch).length === 0 ? undefined : geosearch);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Geosearch"
    description="Provides configuration to the geosearch fixture."
  >
    <PanelTeleport v-model="geosearch.panelTeleport" />
    <ServiceUrls v-model="geosearch.serviceUrls" />
    <Settings v-model="geosearch.settings" />
  </Collapsible>
</template>
