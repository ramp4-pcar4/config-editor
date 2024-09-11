<script setup lang="ts">
import { type PropType, watch, reactive } from 'vue';
import { LayerType } from '@/definitions';
import type { Field } from '@/definitions';

import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import List from '@/components/helpers/list.vue';
import Controls from '@/components/layers/controls.vue';
import Grid from '@/components/fixtures/grid/options.vue';

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
  <Collapsible title="Fixtures">
    <Collapsible title="Details">
      <div class="w-full max-w-[250px]">
        <InputHeader
          title="Template"
          description="Custom Vue component name to render as details template"
          required
        />
        <input
          class="w-full"
          type="text"
          v-model="fixtures.details.template"
          aria-label="Template"
        />
      </div>
    </Collapsible>
    <Collapsible title="Settings">
      <Controls v-model="fixtures.settings.controls" />
      <Controls v-model="fixtures.settings.disabledControls" disabled />
    </Collapsible>
    <Grid v-if="layerType !== LayerType.WMS" title="Grid" v-model="fixtures.grid" />
  </Collapsible>
</template>
