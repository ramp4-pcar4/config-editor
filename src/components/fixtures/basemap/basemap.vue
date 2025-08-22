<script setup lang="ts">
// root.fixtures.basemap config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Collapsible } from '@/components/helpers';
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
const basemap = reactive<any>(props.modelValue ?? {});

watch(basemap, () => {
    emit('update:modelValue', basemap.panelTeleport ? basemap : undefined);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('basemap.title')" :description="t('basemap.description')">
        <PanelTeleport v-model="basemap.panelTeleport" />
    </Collapsible>
</template>
