<script setup lang="ts">
// root.fixtures.mapnav.items config nugget

import { type PropType, watch, ref } from 'vue';

import { useI18n } from 'vue-i18n';
import MultiSelect from '@/components/helpers/multi-select.vue';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<string>>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const allItems = ['home', 'fullscreen', 'geolocator', 'help', 'basemap', 'geosearch', 'legend'];

let items = ref<Array<string>>(props.modelValue ?? ['fullscreen', 'help', 'home', 'geolocator', 'basemap']);

watch(items, () => {
    emit('update:modelValue', items.value);
});
</script>

<template>
    <MultiSelect
        :title="t('mapnav.items.title')"
        :description="t('mapnav.items.description')"
        v-model="items"
        :options="
            allItems.map(item => {
                return { value: item, label: t(`mapnav.item.${item}`) };
            })
        "
    />
</template>
