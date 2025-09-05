<script setup lang="ts">
// root.fixtures.grid.mergeGrids config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Input, List } from '@/components/helpers';
import Layers from '@/components/fixtures/grid/layers.vue';
import FieldMap from '@/components/fixtures/grid/field-map.vue';
import Options from '@/components/fixtures/grid/options.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<any>>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

let mergeGrids = reactive<Array<any>>(props.modelValue ?? []);

watch(mergeGrids, () => {
    emit('update:modelValue', mergeGrids.length === 0 ? undefined : mergeGrids);
});
</script>

<template>
    <List
        v-model="mergeGrids"
        :title="t('grid.mergeGrids.title')"
        :description="t('grid.mergeGrids.description')"
        :add-prompt="t('grid.mergeGrids.add')"
        :remove-prompt="t('grid.mergeGrids.remove')"
        :singular="t('grid.mergeGrids.singular')"
        custom-only
    >
        <template #item="{ index }">
            <div class="mt-4 input-table">
                <Input
                    :title="t('grid.mergeGrid.gridId.title')"
                    :description="t('grid.mergeGrid.gridId.description')"
                    v-model="mergeGrids[index].gridId"
                    required
                />
            </div>
            <Layers v-model="mergeGrids[index].layers" />
            <FieldMap v-model="mergeGrids[index].fieldMap" />
            <Options
                v-model="mergeGrids[index].options"
                :title="t('grid.mergeGrid.options.title')"
                :description="t('grid.mergeGrid.options.description')"
            />
        </template>
    </List>
</template>
