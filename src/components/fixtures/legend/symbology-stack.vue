<script setup lang="ts">
// root.fixtures.legend.root.children[].symbologyStack config nugget

import List from '@/components/helpers/list.vue';
import type { Field } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<any>>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
let symbologyStack = reactive<Array<any>>(props.modelValue ?? []);

watch(symbologyStack, () => {
    emit('update:modelValue', symbologyStack.length === 0 ? undefined : symbologyStack);
});

const itemFields: Array<Field> = [
    {
        property: 'image',
        title: 'legend.item.symbol.image.title',
        description: 'legend.item.symbol.image.description',
        type: 'string',
        required: true
    },
    {
        property: 'text',
        title: 'legend.item.symbol.text.title',
        description: 'legend.item.symbol.text.description',
        type: 'string',
        required: true
    },
    {
        property: 'sqlQuery',
        title: 'legend.item.symbol.sqlQuery.title',
        description: 'legend.item.symbol.sqlQuery.description',
        type: 'string',
        required: false
    }
];
</script>

<template>
    <List
        v-model="symbologyStack"
        :item-fields="itemFields"
        :title="t('legend.item.symbologyStack.title')"
        :description="t('legend.item.symbologyStack.description')"
        :add-prompt="t('legend.item.symbologyStack.add')"
        :remove-prompt="t('legend.item.symbologyStack.remove')"
        :singular="t('legend.item.symbologyStack.singular')"
    />
</template>
