<script setup lang="ts">
// root.fixtures.geosearch.settings config nugget

import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import DisabledSearchTypes from '@/components/fixtures/geosearch/disabled-search-types.vue';
import Input from '@/components/helpers/input.vue';
import Checkbox from '@/components/helpers/checkbox.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const settings = reactive<any>(props.modelValue ?? {});

watch(settings, () => {
  if (settings?.categories?.length === 0) {
    delete settings.categories;
  }
  if (settings?.sortOrder?.length === 0) {
    delete settings.sortOrder;
  }
  if (settings?.maxResults === undefined) {
    delete settings.maxResults;
  }
  if (!settings.disabledSearchTypes) {
    delete settings.disabledSearchTypes;
  }
  emit('update:modelValue', Object.keys(settings).length === 0 ? undefined : settings);
});
</script>

<template>
  <Collapsible :title="t('geosearch.settings.title')" :description="t('geosearch.settings.description')">
    <div class="input-table">
      <Input
        type="array"
        :title="t('geosearch.settings.categories.title')"
        :description="t('geosearch.settings.categories.description')"
        v-model="settings.categories"
      />
      <Input
        type="array"
        :title="t('geosearch.settings.sortOrder.title')"
        :description="t('geosearch.settings.sortOrder.description')"
        v-model="settings.sortOrder"
      />
      <Input
        type="number"
        :title="t('geosearch.settings.maxResults.title')"
        :description="t('geosearch.settings.maxResults.description')"
        v-model="settings.maxResults"
        placeholder="100"
      />
    </div>
    <Checkbox
      :title="t('geosearch.settings.officialOnly.title')"
      :description="t('geosearch.settings.officialOnly.description')"
      v-model="settings.officialOnly"
    />
    <DisabledSearchTypes v-model="settings.disabledSearchTypes" />
  </Collapsible>
</template>
