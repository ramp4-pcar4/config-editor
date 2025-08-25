<script setup lang="ts">
// root.layers[].state config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Checkbox, Collapsible, Input } from '@/components/helpers';
import type { RampLayerStateConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<RampLayerStateConfig>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const state = reactive<RampLayerStateConfig>(props.modelValue ?? {});

watch(state, () => {
    emit('update:modelValue', Object.keys(state).length === 0 ? undefined : state);
});
</script>

<template>
    <Collapsible :title="t('layer.state')">
        <Checkbox
            :title="t('layer.state.visibility.title')"
            :description="t('layer.state.visibility.description')"
            checked
            v-model="state.visibility"
        />
        <Checkbox
            :title="t('layer.state.identify.title')"
            :description="t('layer.state.identify.description')"
            checked
            v-model="state.identify"
        />
        <Checkbox
            :title="t('layer.state.hovertips.title')"
            :description="t('layer.state.hovertips.description')"
            checked
            v-model="state.hovertips"
        />
        <div class="input-table mt-4">
            <Input
                :title="t('layer.state.opacity.title')"
                :description="t('layer.state.opacity.description')"
                type="number"
                v-model="state.opacity"
                placeholder="1"
                min="0"
                max="1"
            />
        </div>
    </Collapsible>
</template>
