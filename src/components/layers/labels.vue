<script setup lang="ts">
// root.layers[].sublayers[].labels config nugget (MIL only)
// root.map.labelsDefault config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Collapsible, TriBoolean } from '@/components/helpers';
import type { RampLayerLabelConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<RampLayerLabelConfig>,
        required: false
    },
    /**
     * Flags if the labels setting is the map-level system default
     */
    default: {
        type: Boolean,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const state = reactive<RampLayerLabelConfig>(props.modelValue ?? {});

watch(state, () => {
    emit('update:modelValue', state.visibile === undefined ? undefined : state);
});
</script>

<template>
    <Collapsible
        :title="props.default ? t('layer.labels.default.title') : t('layer.labels.title')"
        :description="props.default ? t('layer.labels.default.description') : ''"
        :thick-border="props.default"
    >
        <TriBoolean
            :title="t('layer.labels.visible.title')"
            :description="t('layer.labels.visible.description')"
            v-model="state.visibile"
        />
    </Collapsible>
</template>
