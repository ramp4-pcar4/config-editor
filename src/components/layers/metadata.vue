<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<{ url: string; name?: string }>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const metadata = reactive<{ url: string; name?: string }>({
  url: props.modelValue?.url ?? '',
  name: props.modelValue?.name ?? ''
});

watch(metadata, () => {
  const newMetadata: any = {};
  if (metadata.url !== '') {
    newMetadata.url = metadata.url;
  }
  if (metadata.name !== '') {
    newMetadata.name = metadata.name;
  }

  emit('update:modelValue', Object.keys(newMetadata).length === 0 ? undefined : newMetadata);
});
</script>

<template>
  <Collapsible title="Metadata">
    <div class="input-table">
      <div>
        <input-header title="URL" description="Metadata url of the layer service." required />
        <input type="text" v-model="metadata.url" aria-label="URL" />
      </div>
      <div>
        <input-header
          title="Name"
          description="Name to be displayed as the header of the metadata panel."
        />
        <input type="text" v-model="metadata.name" aria-label="Name" />
      </div>
    </div>
  </Collapsible>
</template>
