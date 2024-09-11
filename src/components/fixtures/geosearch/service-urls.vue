<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const serviceUrls = reactive<any>(props.modelValue ?? {});

watch(serviceUrls, () => {
  if (!serviceUrls.geoNames) {
    delete serviceUrls.geoNames;
  }
  if (!serviceUrls.geoLocation) {
    delete serviceUrls.geoLocation;
  }
  if (!serviceUrls.geoProvince) {
    delete serviceUrls.geoProvince;
  }
  if (!serviceUrls.geoTypes) {
    delete serviceUrls.geoTypes;
  }
  emit('update:modelValue', Object.keys(serviceUrls).length === 0 ? undefined : serviceUrls);
});
</script>

<template>
  <Collapsible
    title="Service URLs"
    description="Set of URLs for lookup services. Defaults align with GeoGratis APIs."
  >
    <div class="input-table">
      <div>
        <InputHeader title="Geo Names" description="Endpoint URL for Geo Names service." />
        <input type="text" v-model="serviceUrls.geoNames" aria-label="Geo Names" />
      </div>
      <div>
        <InputHeader title="Geo Location" description="Endpoint URL for Geo Location service." />
        <input type="text" v-model="serviceUrls.geoLocation" aria-label="Geo Location" />
      </div>
      <div>
        <InputHeader title="Geo Province" description="Endpoint url for Geo Province service." />
        <input type="text" v-model="serviceUrls.geoProvince" aria-label="Geo Province" />
      </div>
      <div>
        <InputHeader title="Geo Types" description="Endpoint URL for Geo Types service." />
        <input type="text" v-model="serviceUrls.geoTypes" aria-label="Geo Types" />
      </div>
    </div>
  </Collapsible>
</template>
