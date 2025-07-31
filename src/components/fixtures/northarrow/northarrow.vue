<script setup lang="ts">
// root.fixtures.northarrow config nugget

import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';

import { reactive, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const northArrow = reactive<any>(props.modelValue ?? {});

watch(northArrow, () => {
    if (!northArrow.arrowIcon) {
        delete northArrow.arrowIcon;
    }
    if (!northArrow.poleIcon) {
        delete northArrow.poleIcon;
    }
    emit('update:modelValue', Object.keys(northArrow).length === 0 ? undefined : northArrow);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('northArrow.title')" :description="t('northArrow.description')">
        <div class="input-table">
            <Input
                :title="t('northArrow.arrowIcon.title')"
                :description="t('northArrow.arrowIcon.description')"
                v-model="northArrow.arrowIcon"
            />
            <Input
                :title="t('northArrow.poleIcon.title')"
                :description="t('northArrow.poleIcon.description')"
                v-model="northArrow.poleIcon"
            />
        </div>
    </Collapsible>
</template>
