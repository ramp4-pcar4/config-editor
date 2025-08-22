<script setup lang="ts">
// root.fixtures.appbar config nugget

import { Collapsible } from '@/components/helpers';
import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import Groups from '@/components/fixtures/appbar/groups.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const appbar = reactive<any>(props.modelValue ?? {});

watch(appbar, () => {
    const copy = JSON.parse(JSON.stringify(appbar));
    emit('update:modelValue', Object.keys(copy).length === 0 ? undefined : copy);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('appbar.title')" :description="t('appbar.description')">
        <Groups v-model="appbar.items" />
    </Collapsible>
</template>
