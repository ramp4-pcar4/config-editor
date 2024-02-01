<script setup lang="ts">
import { reactive, ref, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const mode = ref<string>(props.modelValue?.mode);
const options = reactive<any>(props.modelValue?.options ?? {});
const update = () => {
  const opts: any = {};
  if (mode.value === 'fog') {
    if (options.onOpacity !== undefined && options.onOpacity !== '') {
      opts.onOpacity = options.onOpacity;
    }
    if (options.offOpacity !== undefined && options.offOpacity !== '') {
      opts.offOpacity = options.offOpacity;
    }
  }
  const hilight: any = {};
  if (mode) {
    hilight.mode = mode.value;
  }
  if (Object.keys(opts).length > 0) {
    hilight.options = opts;
  }
  emit('update:modelValue', Object.keys(hilight).length === 0 ? undefined : hilight);
};

watch(options, update);

watch(mode, update);
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Hilight"
    description="Provides configuration to the hilight fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Mode"
          description="The hilight mode to use. The default mode is glow."
        />
        <select v-model="mode">
          <option value="glow">Glow</option>
          <option value="lift">Lift</option>
          <option value="fog">Fog</option>
          <option value="none">None</option>
        </select>
      </div>
      <div v-if="mode === 'fog'">
        <InputHeader
          title="On Opacity"
          description="Opacity of the fog that obscures non-highlighted features when a feature is highlighted."
        />
        <input type="number" placeholder="0.75" min="0" max="1" v-model="options.onOpacity" />
      </div>
      <div v-if="mode === 'fog'">
        <InputHeader
          title="Off Opacity"
          description="Opacity of the fog that obscures non-highlighted features when no feature is highlighted."
        />
        <input type="number" placeholder="0.02" min="0" max="1" v-model="options.offOpacity" />
      </div>
    </div>
  </Collapsible>
</template>
