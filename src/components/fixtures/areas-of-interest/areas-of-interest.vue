<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import List from '@/components/helpers/list.vue';
import Extent from '@/components/helpers/extent.vue';
import type { Field } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const areasOfInterest = reactive<any>(props.modelValue ?? {});

watch(areasOfInterest, () => {
  const copy = JSON.parse(JSON.stringify(areasOfInterest));
  if (!copy.areas || copy.areas.length === 0) {
    delete copy.areas;
  }
  if (!copy.panelTeleport) {
    delete copy.panelTeleport;
  }
  emit('update:modelValue', Object.keys(copy).length === 0 ? undefined : copy);
});

const itemFields: Array<Field> = [
  {
    property: 'title',
    title: 'Title',
    description: 'The title for this area of interest.',
    type: 'string',
    required: true
  },
  {
    property: 'thumbnail',
    title: 'Thumbnail',
    description:
      'The URL or base64 for the image to be used as the thumbnail graphic for this area of interest.',
    type: 'string'
  },
  {
    property: 'altText',
    title: 'Alt Text',
    description: 'The alt text for the thumbnail.',
    type: 'string'
  },
  {
    property: 'description',
    title: 'Description',
    description: 'The description blurb for this area of interest.',
    type: 'string'
  }
];
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Areas Of Interest"
    description="Provides configuration to the areas of interest fixture."
  >
    <PanelTeleport v-model="areasOfInterest.panelTeleport" />
    <List
      :item-fields="itemFields"
      v-model="areasOfInterest.areas"
      title="Areas"
      description="The areas to be displayed in the areas of interest fixture."
      add-prompt="Add area"
    >
      <template #item="{ index }">
        <Extent
          title="Extent"
          description="The map extent for this area of interest."
          required
          v-model="areasOfInterest.areas[index].extent"
        />
      </template>
    </List>
  </Collapsible>
</template>
