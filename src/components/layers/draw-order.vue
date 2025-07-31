<script setup lang="ts">
// root.layers[].drawOrder config nugget

import { type PropType, reactive, watch } from 'vue';

import List from '@/components/helpers/list.vue';
import type { DrawOrder, Field } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<DrawOrder>>,
        required: false
    }
});

const itemFields: Array<Field> = [
    {
        type: 'string',
        property: 'field',
        title: 'layer.drawOrder.field.title',
        description: 'layer.drawOrder.field.description',
        required: true
    },
    {
        type: 'boolean',
        property: 'ascending',
        title: 'layer.drawOrder.ascending.title',
        description: 'layer.drawOrder.ascending.description',
        required: true
    }
];

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let drawOrder = reactive<Array<DrawOrder>>(props.modelValue ?? []);

watch(drawOrder, () => {
    emit('update:modelValue', drawOrder.length === 0 ? undefined : drawOrder);
});
</script>

<template>
    <List
        v-model="drawOrder"
        :item-fields="itemFields"
        :title="t('layer.drawOrder.title')"
        :add-prompt="t('layer.drawOrder.add')"
        :remove-prompt="t('layer.drawOrder.remove')"
        :description="t('layer.drawOrder.description')"
    />
</template>
