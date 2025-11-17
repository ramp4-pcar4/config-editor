<script setup lang="ts">
// root.fixtures.legend.multilineItems config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Checkbox, Collapsible, Input } from '@/components/helpers';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let multilineItems = reactive<any>(props.modelValue ?? { enabled: true, maxLines: 3 });

watch(multilineItems, () => {
    let realValue: any;

    if (multilineItems.enabled && multilineItems.maxLines === 3) {
        // default state. so dont save an object structure
        realValue = undefined;
    } else {
        // user made valid changes, save the object
        realValue = multilineItems;
    }

    emit('update:modelValue', realValue);
});
</script>

<template>
    <Collapsible :title="t('legend.multiline.title')" :description="t('legend.multiline.description')">
        <div class="input-table">
            <Input
                :title="t('legend.multiline.maxLines.title')"
                :description="t('legend.multiline.maxLines.description')"
                type="number"
                placeholder="3"
                min="1"
                max="6"
                v-model="multilineItems.maxLines"
            />
            <Checkbox
                :title="t('legend.multiline.enabled.title')"
                :description="t('legend.multiline.enabled.description')"
                v-model="multilineItems.enabled"
            />
        </div>
    </Collapsible>
</template>
