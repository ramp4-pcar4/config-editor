<script setup lang="ts">
// root.fixtures.grid.fieldMap config nugget

import { List } from '@/components/helpers';
import type { Field } from '@/definitions';
import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<any>>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
let fieldMap = reactive<Array<any>>(props.modelValue ?? []);

watch(fieldMap, () => {
    emit('update:modelValue', fieldMap.length === 0 ? undefined : fieldMap);
});

const itemFields: Array<Field> = [
    {
        property: 'field',
        title: 'grid.mergeGrid.fieldMap.field.title',
        description: 'grid.mergeGrid.fieldMap.field.description',
        type: 'string'
    },
    {
        property: 'sources',
        title: 'grid.mergeGrid.fieldMap.sources.title',
        description: 'grid.mergeGrid.fieldMap.sources.description',
        type: 'array'
    }
];
</script>

<template>
    <List
        v-model="fieldMap"
        :item-fields="itemFields"
        :title="t('grid.mergeGrid.fieldMap.title')"
        :description="t('grid.mergeGrid.fieldMap.description')"
        :add-prompt="t('grid.mergeGrid.fieldMap.add')"
        :remove-prompt="t('grid.mergeGrid.fieldMap.remove')"
        :singular="t('grid.mergeGrid.fieldMap.singular')"
    />
</template>
