<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const help = reactive<any>(props.modelValue ?? {});

watch(help, () => {
  if (!help.panelTeleport) {
    delete help.panelTeleport;
  }
  if (!help.location) {
    delete help.location;
  }
  if (help.panelWidth === '') {
    delete help.panelWidth;
  }
  emit('update:modelValue', Object.keys(help).length === 0 ? undefined : help);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Help"
    description="Provides configuration to the help fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Panel Width"
          description="Determines the width of the help panel in pixels."
        />
        <input type="number" v-model="help.panelWidth" min="0" />
      </div>
      <div>
        <InputHeader
          title="Location"
          description="Relative path or URL to the help directory, which contains the help content and images. Markdown files must be named for the language they support, e.g. en.md, fr.md. Images must be placed in a subfolder named images."
        />
        <input type="text" v-model="help.location" placeholder="./help" />
      </div>
    </div>
    <PanelTeleport v-model="help.panelTeleport" />
  </Collapsible>
</template>
