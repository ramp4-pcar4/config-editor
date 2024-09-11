<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import DisabledSearchTypes from '@/components/fixtures/geosearch/disabled-search-types.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const settings = reactive<any>(props.modelValue ?? {});

watch(settings, () => {
  if (settings?.categories?.length === 0) {
    delete settings.categories;
  }
  if (settings?.sortOrder?.length === 0) {
    delete settings.sortOrder;
  }
  if (settings?.maxResults === '') {
    delete settings.maxResults;
  }
  if (!settings.disabledSearchTypes) {
    delete settings.disabledSearchTypes;
  }
  emit('update:modelValue', Object.keys(settings).length === 0 ? undefined : settings);
});
</script>

<template>
  <Collapsible title="Settings" description="Various settings for the geosearch fixture">
    <div class="input-table">
      <div>
        <InputHeader
          title="Categories"
          description="Comma separated list that filters the search results based on the type of the geographical names. Allowed values can be found here (if using the Canadian GeoNames Search Service API): http://geogratis.gc.ca/services/geoname/en/codes/concise. Street address type ('ADDR') is also valid."
        />
        <input
          type="text"
          aria-label="Categories"
          :value="settings.categories?.join(',') ?? ''"
          @input="(e) => {settings.categories = (e.target as HTMLInputElement).value === '' ? [] : (e.target as HTMLInputElement).value.split(',').map(s => s.trim())}"
        />
      </div>
      <div>
        <InputHeader
          title="Sort Order"
          description="Comma separated list indicating the sort order of the defined 'categories'. Any missing categories are appended to the bottom of the sorted list. The results can still be sorted through this option even if there are no categories being filtered."
        />
        <input
          type="text"
          aria-label="Sort Order"
          :value="settings.sortOrder?.join(',') ?? ''"
          @input="(e) => {settings.sortOrder = (e.target as HTMLInputElement).value === '' ? [] : (e.target as HTMLInputElement).value.split(',').map(s => s.trim())}"
        />
      </div>
      <div>
        <InputHeader
          title="Max Results"
          description="The maximum number of results to return per request. The Canadian GeoNames Search Service API has a 1000 search limit which will be used as an upper limit of results returned unless another service is being used with a higher limit."
        />
        <input
          type="number"
          aria-label="Max Results"
          v-model="settings.maxResults"
          placeholder="100"
        />
      </div>
    </div>
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="settings.officialOnly" aria-label="Official Only" />
      <InputHeader
        title="Official Only"
        description="Whether to return only official names for the geographic names. Default is false which will return both official names and formerly official names."
        type="checkbox"
      />
    </div>
    <DisabledSearchTypes v-model="settings.disabledSearchTypes" />
  </Collapsible>
</template>
