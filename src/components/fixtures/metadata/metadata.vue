<script setup lang="ts">
// root.fixtures.metadata config nugget

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
const metadata = reactive<any>(props.modelValue ?? {});

watch(metadata, () => {
    emit('update:modelValue', metadata.panelTeleport ? metadata : undefined);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('metadata.title')" :description="t('metadata.description')">
        <PanelTeleport v-model="metadata.panelTeleport" />
    </Collapsible>
</template>
