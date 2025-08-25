<script setup lang="ts">
// root.fixtures.wizard config nugget

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
const wizard = reactive<any>(props.modelValue ?? {});

watch(wizard, () => {
    emit('update:modelValue', wizard.panelTeleport ? wizard : undefined);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('wizard.title')" :description="t('wizard.description')">
        <PanelTeleport v-model="wizard.panelTeleport" />
    </Collapsible>
</template>
