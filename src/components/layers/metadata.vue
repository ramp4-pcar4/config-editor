<script setup lang="ts">
// root.layers[].metadata config nugget

import { type PropType, reactive, watch } from 'vue';

import Input from '@/components/helpers/input.vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<{ url: string; name?: string }>,
        required: false
    }
});

const emit = defineEmits(['update:modelValue']);
const { t } = useI18n();

const metadata = reactive<{ url: string; name?: string }>({
    url: props.modelValue?.url ?? '',
    name: props.modelValue?.name ?? ''
});

watch(metadata, () => {
    const newMetadata: any = {};
    if (metadata.url) {
        newMetadata.url = metadata.url;
    }
    if (metadata.name) {
        newMetadata.name = metadata.name;
    }

    emit('update:modelValue', Object.keys(newMetadata).length === 0 ? undefined : newMetadata);
});
</script>

<template>
    <Collapsible :title="t('layer.metadata')">
        <div class="input-table">
            <Input
                :title="t('layer.metadata.url.title')"
                :description="t('layer.metadata.url.description')"
                v-model="metadata.url"
            />
            <Input
                :title="t('layer.metadata.name.title')"
                :description="t('layer.metadata.name.description')"
                v-model="metadata.name"
            />
        </div>
    </Collapsible>
</template>
