<script setup lang="ts">
// root.layers[].sublayers[].styleLegends config nugget

import { type PropType, reactive, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import type { Field } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<{ name: string; url: string }>>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let styleLegends = reactive<Array<{ name: string; url: string }>>(props.modelValue ?? []);

watch(styleLegends, () => {
    emit('update:modelValue', styleLegends.length === 0 ? undefined : styleLegends);
});

const itemFields: Array<Field> = [
    {
        type: 'string',
        property: 'name',
        required: true,
        title: 'layer.styleLegend.name.title',
        description: 'layer.styleLegend.name.description'
    },
    {
        type: 'string',
        property: 'url',
        required: true,
        title: 'layer.styleLegend.url.title',
        description: 'layer.styleLegend.url.description'
    }
];
</script>

<template>
    <List
        v-model="styleLegends"
        :item-fields="itemFields"
        :title="t('layer.styleLegends.title')"
        :add-prompt="t('layer.styleLegends.add')"
        :remove-prompt="t('layer.styleLegends.remove')"
        :description="t('layer.styleLegends.description')"
    />
</template>
