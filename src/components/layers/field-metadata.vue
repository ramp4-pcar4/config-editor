<script setup lang="ts">
// root.layers[].fieldMetadata config nugget

import { type PropType, reactive, watch } from 'vue';

import List from '@/components/helpers/list.vue';
import Checkbox from '@/components/helpers/checkbox.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import type { Field, RampLayerFieldMetadataConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<RampLayerFieldMetadataConfig>,
        required: false
    }
});

const { t } = useI18n();

const itemFields: Array<Field> = [
    {
        type: 'string',
        property: 'name',
        title: 'layer.fieldMetadata.fieldInfo.name.title',
        description: 'layer.fieldMetadata.fieldInfo.name.description',
        required: true
    },
    {
        type: 'string',
        property: 'alias',
        title: 'layer.fieldMetadata.fieldInfo.alias.title',
        description: 'layer.fieldMetadata.fieldInfo.alias.description',
        required: false
    }
];

const emit = defineEmits(['update:modelValue']);

const fieldMetadata = reactive<RampLayerFieldMetadataConfig>(props.modelValue ?? {});

watch(fieldMetadata, () => {
    if (!fieldMetadata.fieldInfo) {
        delete fieldMetadata.fieldInfo;
    }
    emit('update:modelValue', Object.keys(fieldMetadata).length === 0 ? undefined : fieldMetadata);
});
</script>

<template>
    <Collapsible :title="t('layer.fieldMetadata')">
        <Checkbox
            :title="t('layer.fieldMetadata.exclusiveFields.title')"
            :description="t('layer.fieldMetadata.exclusiveFields.description')"
            v-model="fieldMetadata.exclusiveFields"
            class="mt-0"
        />
        <List
            v-model="fieldMetadata.fieldInfo"
            :item-fields="itemFields"
            :title="t('layer.fieldMetadata.fieldInfo.title')"
            :add-prompt="t('layer.fieldMetadata.fieldInfo.add')"
            :remove-prompt="t('layer.fieldMetadata.fieldInfo.remove')"
            :description="t('layer.fieldMetadata.fieldInfo.description')"
        />
    </Collapsible>
</template>
