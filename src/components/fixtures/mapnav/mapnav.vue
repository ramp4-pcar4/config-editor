<script setup lang="ts">
// root.fixtures.mapnav config nugget

import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import Select from '@/components/helpers/select.vue';

import Items from '@/components/fixtures/mapnav/items.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const mapnav = reactive<any>(props.modelValue ?? {});
watch(mapnav, () => {
    emit('update:modelValue', Object.keys(mapnav).length === 0 ? undefined : mapnav);
});
</script>

<template>
    <Collapsible :thick-border="true" :title="t('mapnav.title')" :description="t('mapnav.description')">
        <div class="input-table">
            <Select
                :title="t('mapnav.zoomOption.title')"
                :description="t('mapnav.zoomOption.description')"
                v-model="mapnav.zoomOption"
                :options="[
                    { value: 'all', label: t('mapnav.zoomOption.all') },
                    { value: 'buttons', label: t('mapnav.zoomOption.buttons') },
                    { value: 'slider', label: t('mapnav.zoomOption.slider') }
                ]"
            />
        </div>
        <Items v-model="mapnav.items" />
    </Collapsible>
</template>
