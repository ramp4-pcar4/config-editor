<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import HeaderControls from '@/components/fixtures/legend/header-controls.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import Children from '@/components/fixtures/legend/children.vue';
import Input from '@/components/helpers/input.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const legend = reactive<any>({ ...{ root: {} }, ...props.modelValue });

watch(legend, () => {
  if (!Array.isArray(legend.headerControls)) {
    delete legend.headerControls;
  }
  emit('update:modelValue', legend);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('legend.title')" :description="t('legend.description')">
    <div class="input-table">
      <Input
        :title="t('panelWidth.title')"
        :description="t('panelWidth.description')"
        type="number"
        v-model="legend.panelWidth"
        min="0"
      />
    </div>
    <HeaderControls v-model="legend.headerControls" />
    <PanelTeleport v-model="legend.panelTeleport" />
    <Collapsible :title="t('legend.root.title')" :description="t('legend.root.description')">
      <Children v-model="legend.root.children" />
    </Collapsible>
  </Collapsible>
</template>
