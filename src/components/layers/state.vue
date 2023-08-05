<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import type { RampLayerStateConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<RampLayerStateConfig>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const state = reactive<RampLayerStateConfig>({});

watch(state, () => {
  emit('update:modelValue', Object.keys(state).length === 0 ? undefined : state);
});
</script>

<template>
  <Collapsible title="State">
    <div>
      <div class="flex items-center mb-4">
        <input type="checkbox" v-model="state.visibility" :checked="state.visibility !== false" />
        <InputHeader
          title="Visibility"
          description="Initial visibility of layer on map."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mb-4">
        <input type="checkbox" v-model="state.identify" :checked="state.identify !== false" />
        <InputHeader
          title="Identify"
          description="Specifies whether or not to allow identify requests."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mb-4">
        <input type="checkbox" v-model="state.hovertips" :checked="state.hovertips !== false" />
        <InputHeader
          title="Hovertips"
          description="Specifies whether or not to disable hovertips."
          type="checkbox"
        />
      </div>
    </div>
    <div class="input-table">
      <div>
        <InputHeader
          title="Opacity"
          description="Initial opacity value of layer. Must be a decimal value between 0 and 1."
        />
        <input type="number" v-model="state.opacity" placeholder="1" min="0" max="1" />
      </div>
    </div>
  </Collapsible>
</template>
