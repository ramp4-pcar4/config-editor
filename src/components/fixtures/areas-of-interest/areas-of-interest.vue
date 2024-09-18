<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import List from '@/components/helpers/list.vue';
import Extent from '@/components/helpers/extent.vue';
import type { Field } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
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
    title: 'aoi.area.title.title',
    description: 'aoi.area.title.description',
    type: 'string',
    required: true
  },
  {
    property: 'thumbnail',
    title: 'aoi.area.thumbnail.title',
    description: 'aoi.area.thumbnail.description',
    type: 'string'
  },
  {
    property: 'altText',
    title: 'aoi.area.altText.title',
    description: 'aoi.area.altText.description',
    type: 'string'
  },
  {
    property: 'description',
    title: 'aoi.area.description.title',
    description: 'aoi.area.description.description',
    type: 'string'
  }
];
</script>

<template>
  <Collapsible :thick-border="true" :title="t('aoi.title')" :description="t('aoi.description')">
    <PanelTeleport v-model="areasOfInterest.panelTeleport" />
    <List
      :item-fields="itemFields"
      v-model="areasOfInterest.areas"
      :title="t('aoi.areas.title')"
      :description="t('aoi.areas.description')"
      :add-prompt="t('aoi.areas.add')"
      :remove-prompt="t('aoi.areas.remove')"
      :singular="t('aoi.areas.singular')"
    >
      <template #item="{ index }">
        <Extent
          :title="t('layer.extent')"
          :description="t('aoi.area.extent.description')"
          required
          v-model="areasOfInterest.areas[index].extent"
        />
      </template>
    </List>
  </Collapsible>
</template>
