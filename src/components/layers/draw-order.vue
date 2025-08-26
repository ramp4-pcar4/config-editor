<script setup lang="ts">
// root.layers[].drawOrder config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { List } from '@/components/helpers';
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
        required: false
    },
    {
        type: 'string',
        property: 'arcade',
        title: 'layer.drawOrder.arcade.title',
        description: 'layer.drawOrder.arcade.description',
        required: false
    },
    {
        type: 'boolean',
        property: 'ascending',
        title: 'layer.drawOrder.ascending.title',
        description: 'layer.drawOrder.ascending.description',
        required: false
    }
];

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let drawOrder = reactive<Array<DrawOrder>>(props.modelValue ?? []);

watch(drawOrder, () => {
    emit('update:modelValue', drawOrder.length === 0 ? undefined : drawOrder);
});

const fancyDrawOrderAdd = () => {
    // the "ascending" property defaults to true.
    // But in vue controls world, the default value is actually undefined. Which leads the checkbox to display as unchecked.
    // This results in BIG LIES to the user. To get a valid "descending" setting they need to check the box (changing undefined to true),
    // then uncheck it (changing true to false).
    // This magical override method defaults the new field to be defaulted with true, not undefined. Will add a bit of extra spam to the output config,
    // but that is better than big lies.

    drawOrder.push({ ascending: true });
};
</script>

<template>
    <List
        v-model="drawOrder"
        :item-fields="itemFields"
        :add="fancyDrawOrderAdd"
        :title="t('layer.drawOrder.title')"
        :add-prompt="t('layer.drawOrder.add')"
        :remove-prompt="t('layer.drawOrder.remove')"
        :description="t('layer.drawOrder.description')"
    />
</template>
