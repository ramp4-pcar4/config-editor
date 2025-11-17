<script setup lang="ts">
// root.map.layerTimeDefault config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Collapsible, Input } from '@/components/helpers';
import type { RampLayerTimeDefaultsConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<RampLayerTimeDefaultsConfig>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const state = reactive<RampLayerTimeDefaultsConfig>(props.modelValue ?? {});

watch(state, () => {
    let realValue: any;

    if (
        state.expectedDrawTime === undefined &&
        state.expectedLoadTime === undefined &&
        (state.maxLoadTime === undefined || state.maxLoadTime === 90000)
    ) {
        // default state. so dont save an object structure
        realValue = undefined;
    } else {
        // user made valid changes, save the object
        realValue = state;
    }

    emit('update:modelValue', realValue);
});
</script>

<template>
    <Collapsible :title="t('layerTimes.title')" :description="t('layerTimes.description')" :thick-border="true">
        <div class="input-table">
            <Input
                :title="t('layerTimes.expectedDrawTime.title')"
                :description="t('layerTimes.expectedDrawTime.description')"
                type="number"
                placeholder="12000"
                min="0"
                v-model="state.expectedDrawTime"
            />
            <Input
                :title="t('layerTimes.expectedLoadTime.title')"
                :description="t('layerTimes.expectedLoadTime.description')"
                type="number"
                placeholder="12000"
                min="0"
                v-model="state.expectedLoadTime"
            />
            <Input
                :title="t('layerTimes.maxLoadTime.title')"
                :description="t('layerTimes.maxLoadTime.description')"
                type="number"
                placeholder="90000"
                min="100"
                v-model="state.maxLoadTime"
            />
        </div>
    </Collapsible>
</template>
