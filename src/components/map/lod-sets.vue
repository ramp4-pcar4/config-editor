<script setup lang="ts">
// root.map.lodSets config nugget

import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import { geo } from 'ramp-pcar';
import { List } from '@/components/helpers';
import type { Field, RampLodConfig, RampLodSetConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<RampLodSetConfig>>,
        required: false
    }
});

const { t } = useI18n();

const lambertLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[0]);
const lambertLodsStr: string = JSON.stringify(lambertLods);
const mercatorLods: Array<RampLodConfig> = geo.defaultLODs(geo.defaultTileSchemas()[1]);
const mercatorLodsStr: string = JSON.stringify(mercatorLods);

const onLodTypeToggle = (name: string, idx: number) => {
    if (name === 'lambert') {
        lodSets.value[idx].lods = JSON.parse(lambertLodsStr);
    } else {
        lodSets.value[idx].lods = JSON.parse(mercatorLodsStr);
    }
};

const addLodSet = () => {
    lodSets.value.push({ id: '', lods: [] });
};

const removeLodSet = (idx: number) => {
    lodSets.value.splice(idx, 1);
};

const emit = defineEmits(['update:modelValue']);

const lodSets = ref<Array<RampLodSetConfig>>(props.modelValue ?? []);

watch(lodSets, () => {
    emit('update:modelValue', lodSets.value.length === 0 ? undefined : lodSets);
});

const setFields: Array<Field> = [
    {
        property: 'id',
        title: 'lodSet.id.title',
        description: 'lodSet.id.description',
        type: 'string',
        required: true
    }
];

const lodFields: Array<Field> = [
    {
        property: 'level',
        title: 'lod.level',
        type: 'number',
        required: true
    },
    {
        property: 'resolution',
        title: 'lod.resolution',
        type: 'number',
        required: true
    },
    {
        property: 'scale',
        title: 'lod.scale',
        type: 'number',
        required: true
    }
];
</script>

<template>
    <List
        top-level
        :item-fields="setFields"
        v-model="lodSets"
        :title="t('lodSets.title')"
        :description="t('lodSets.description')"
        :add-prompt="t('lodSets.add')"
        :remove-prompt="t('lodSets.remove')"
        :singular="t('lodSets.singular')"
        :add="addLodSet"
        :remove="removeLodSet"
    >
        <template #item="{ index }">
            <div class="mt-4 input-table">
                <div>
                    <button class="use-default" @click="onLodTypeToggle('lambert', index)">
                        {{ t('lodSets.useDefaultLambert') }}
                    </button>
                </div>
                <div>
                    <button class="use-default" @click="onLodTypeToggle('mercator', index)">
                        {{ t('lodSets.useDefaultMercator') }}
                    </button>
                </div>
            </div>
            <List
                :item-fields="lodFields"
                v-model="lodSets[index].lods"
                :title="t('lodSets.lods.title')"
                :description="t('lodSets.lods.description')"
                :add-prompt="t('lodSets.lods.add')"
                :remove-prompt="t('lodSets.lods.remove')"
            />
        </template>
    </List>
</template>

<style lang="scss" scoped>
.use-default {
    @apply bg-black text-white p-2 hover:bg-gray-800 rounded-md;
}
</style>
