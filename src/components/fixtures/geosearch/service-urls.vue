<script setup lang="ts">
// root.fixtures.geosearch.serviceUrls config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Collapsible, Input } from '@/components/helpers';

import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const serviceUrls = reactive<any>(props.modelValue ?? {});

watch(serviceUrls, () => {
    if (!serviceUrls.geoNames) {
        delete serviceUrls.geoNames;
    }
    if (!serviceUrls.geoLocation) {
        delete serviceUrls.geoLocation;
    }
    if (!serviceUrls.geoProvince) {
        delete serviceUrls.geoProvince;
    }
    if (!serviceUrls.geoTypes) {
        delete serviceUrls.geoTypes;
    }
    emit('update:modelValue', Object.keys(serviceUrls).length === 0 ? undefined : serviceUrls);
});
</script>

<template>
    <Collapsible :title="t('geosearch.serviceUrls.title')" :description="t('geosearch.serviceUrls.description')">
        <div class="input-table">
            <Input
                :title="t('geosearch.serviceUrls.geoNames.title')"
                :description="t('geosearch.serviceUrls.geoNames.description')"
                v-model="serviceUrls.geoNames"
            />
            <Input
                :title="t('geosearch.serviceUrls.geoLocation.title')"
                :description="t('geosearch.serviceUrls.geoLocation.description')"
                v-model="serviceUrls.geoLocation"
            />
            <Input
                :title="t('geosearch.serviceUrls.geoProvince.title')"
                :description="t('geosearch.serviceUrls.geoProvince.description')"
                v-model="serviceUrls.geoProvince"
            />
            <Input
                :title="t('geosearch.serviceUrls.geoTypes.title')"
                :description="t('geosearch.serviceUrls.geoTypes.description')"
                v-model="serviceUrls.geoTypes"
            />
        </div>
    </Collapsible>
</template>
