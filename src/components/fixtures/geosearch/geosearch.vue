<script setup lang="ts">
// root.fixtures.geosearch config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Collapsible } from '@/components/helpers';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import ServiceUrls from '@/components/fixtures/geosearch/service-urls.vue';
import Settings from '@/components/fixtures/geosearch/settings.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const geosearch = reactive<any>(props.modelValue ?? {});

watch(geosearch, () => {
    if (!geosearch.serviceUrls) {
        delete geosearch.serviceUrls;
    }
    emit('update:modelValue', Object.keys(geosearch).length === 0 ? undefined : geosearch);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('geosearch.title')" :description="t('geosearch.description')">
        <PanelTeleport v-model="geosearch.panelTeleport" />
        <ServiceUrls v-model="geosearch.serviceUrls" />
        <Settings v-model="geosearch.settings" />
    </Collapsible>
</template>
