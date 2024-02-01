<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

import { reactive, type PropType, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const northArrow = reactive<any>(props.modelValue ?? {});

watch(northArrow, () => {
  if (!northArrow.arrowIcon) {
    delete northArrow.arrowIcon;
  }
  if (!northArrow.poleIcon) {
    delete northArrow.poleIcon;
  }
  emit('update:modelValue', Object.keys(northArrow).length === 0 ? undefined : northArrow);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="North Arrow"
    description="Provides configuration to the north arrow fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Arrow Icon"
          description="The graphical icon url/data url of the north arrow."
        />
        <input type="text" v-model="northArrow.arrowIcon" />
      </div>
      <div>
        <InputHeader
          title="Pole Icon"
          description="The graphical icon url/data url of the north pole that replaces north arrow when it's on north pole."
        />
        <input type="text" v-model="northArrow.poleIcon" />
      </div>
    </div>
  </Collapsible>
</template>
