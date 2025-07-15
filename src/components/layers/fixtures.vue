<script setup lang="ts">
import { type PropType, watch, reactive } from 'vue';
import { LayerType } from '@/definitions';

import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';
import Controls from '@/components/layers/controls.vue';
import Grid from '@/components/fixtures/grid/options.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  },
  layerType: {
    type: String as PropType<LayerType>,
    required: true
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const fixtures = reactive<any>({
  details: props.modelValue?.details ?? {},
  settings: props.modelValue?.settings ?? {},
  grid: props.modelValue?.grid ?? {}
});
watch(fixtures, () => {
  emit('update:modelValue', fixtures);
});
</script>

<template>
  <Collapsible :title="t('layer.fixtures')">
    <Collapsible :title="t('layer.fixtures.details')">
      <div class="input-table">
        <Input
          :title="t('layer.fixtures.details.template.title')"
          :description="t('layer.fixtures.details.template.description')"
          v-model="fixtures.details.template"
        />
      </div>
    </Collapsible>
    <Collapsible :title="t('layer.fixtures.settings')">
      <Controls v-model="fixtures.settings.controls" />
      <Controls v-model="fixtures.settings.disabledControls" disabled />
    </Collapsible>
    <Grid v-if="layerType !== LayerType.WMS" :title="t('layer.fixtures.grid')" v-model="fixtures.grid" />
  </Collapsible>
</template>
