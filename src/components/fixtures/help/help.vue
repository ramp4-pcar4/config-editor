<script setup lang="ts">
// root.fixtures.help config nugget

import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const help = reactive<any>(props.modelValue ?? {});

watch(help, () => {
  if (!help.panelTeleport) {
    delete help.panelTeleport;
  }
  if (!help.location) {
    delete help.location;
  }
  if (help.panelWidth === undefined) {
    delete help.panelWidth;
  }
  emit('update:modelValue', Object.keys(help).length === 0 ? undefined : help);
});
</script>

<template>
  <Collapsible :thick-border="true" :title="t('help.title')" :description="t('help.description')">
    <div class="input-table">
      <Input
        :title="t('panelWidth.title')"
        :description="t('panelWidth.description')"
        type="number"
        v-model="help.panelWidth"
        min="0"
      />
      <Input
        :title="t('help.location.title')"
        :description="t('help.location.description')"
        placeholder="./help"
        v-model="help.location"
      />
    </div>
    <PanelTeleport v-model="help.panelTeleport" />
  </Collapsible>
</template>
