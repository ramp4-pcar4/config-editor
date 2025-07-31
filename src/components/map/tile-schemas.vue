<script setup lang="ts">
// root.map.tileSchemas config nugget

import { type PropType, reactive, watch } from 'vue';

import type { Field, RampTileSchemaConfig } from '@/definitions';
import List from '@/components/helpers/list.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<RampTileSchemaConfig>>,
        required: false
    }
});

const emit = defineEmits(['update:modelValue']);

let tileSchemas = reactive<Array<RampTileSchemaConfig>>(props.modelValue ?? []);

watch(tileSchemas, () => {
    tileSchemas.forEach(ts => {
        if (ts.thumbnailTileUrls && ts.thumbnailTileUrls.length === 0) {
            delete ts.thumbnailTileUrls;
        }
    });
    emit('update:modelValue', tileSchemas.length === 0 ? undefined : tileSchemas);
});

const itemFields: Array<Field> = [
    {
        property: 'id',
        title: 'tileSchema.id.title',
        description: 'tileSchema.id.description',
        type: 'string',
        required: true
    },
    {
        property: 'name',
        title: 'tileSchema.name.title',
        description: 'tileSchema.name.description',
        type: 'string',
        required: true
    },
    {
        property: 'extentSetId',
        title: 'tileSchema.extentSetId.title',
        description: 'tileSchema.extentSetId.description',
        type: 'string',
        required: true
    },
    {
        property: 'lodSetId',
        title: 'tileSchema.lodSetId.title',
        description: 'tileSchema.lodSetId.description',
        type: 'string',
        required: true
    },
    {
        property: 'thumbnailTileUrls',
        title: 'tileSchema.thumbnailTileUrls.title',
        description: 'tileSchema.thumbnailTileUrls.description',
        type: 'array'
    }
];
</script>

<template>
    <List
        top-level
        :item-fields="itemFields"
        v-model="tileSchemas"
        :title="t('tileSchemas.title')"
        :add-prompt="t('tileSchemas.add')"
        :remove-prompt="t('tileSchemas.remove')"
        :singular="t('tileSchemas.singular')"
        :description="t('tileSchemas.description')"
        required
    />
</template>
