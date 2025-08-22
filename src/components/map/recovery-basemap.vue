<script setup lang="ts">
// root.map.tileSchemas[].recoveryBasemap config nugget

import { reactive } from 'vue';
import type { PropType } from 'vue';
import { Collapsible, Input } from '@/components/helpers';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const recoveryBasemap = reactive<any>(props.modelValue ?? {});

/**
 * Manages changes to the sub-object properties, and relays the change as a unit to
 * the parent component hosting this component.
 */
const onInput = (key: 'basemapId' | 'timeout', val: string | number): void => {
    if (key === 'basemapId') {
        if (val) {
            recoveryBasemap.basemapId = val;
        } else {
            delete recoveryBasemap.basemapId;
        }
    } else {
        // key is timeout
        if (val === undefined) {
            delete recoveryBasemap.timeout;
        } else {
            recoveryBasemap.timeout = val;
        }
    }

    const nothingburger = !recoveryBasemap.basemapId && recoveryBasemap.timeout === undefined;

    emit('update:modelValue', nothingburger ? undefined : recoveryBasemap);
};
</script>

<template>
    <Collapsible :title="t('tileSchema.recovery.title')" :description="t('tileSchema.recovery.description')">
        <div class="input-table">
            <Input
                :title="t('tileSchema.recovery.basemapId.title')"
                :description="t('tileSchema.recovery.basemapId.description')"
                :model-value="recoveryBasemap.basemapId"
                @update:model-value="val => onInput('basemapId', val)"
            />
            <Input
                :title="t('tileSchema.recovery.timeout.title')"
                :description="t('tileSchema.recovery.timeout.description')"
                :model-value="recoveryBasemap.timeout"
                type="number"
                placeholder="8000"
                min="0"
                @update:model-value="val => onInput('timeout', val)"
            />
        </div>
    </Collapsible>
</template>
