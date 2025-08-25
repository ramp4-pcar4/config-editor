<script setup lang="ts">
// root.layers[].fixtures.grid config nugget

import { Checkbox, Collapsible, Input, List, Select } from '@/components/helpers';
import Controls from '@/components/fixtures/grid/controls.vue';
import type { Field } from '@/definitions';

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const options = reactive<any>({
    ...props.modelValue,
    columns:
        props.modelValue?.columns?.map((col: any) => {
            return { filter: {}, ...col };
        }) ?? []
});

const addColumn = () => {
    if (!options.columns) {
        options.columns = [];
    }
    options.columns.push({ filter: { type: 'string' } });
};

const removeColumn = (idx: number) => {
    options.columns?.splice(idx, 1);
};

const columnFields: Array<Field> = [
    {
        type: 'string',
        property: 'field',
        title: 'grid.mergeGrid.options.column.field.title',
        description: 'grid.mergeGrid.options.column.field.description'
    },
    {
        type: 'string',
        property: 'title',
        title: 'grid.mergeGrid.options.column.title.title',
        description: 'grid.mergeGrid.options.column.title.description'
    },
    {
        type: 'number',
        property: 'width',
        title: 'grid.mergeGrid.options.column.width.title',
        placeholder: '400',
        min: 0,
        description: 'grid.mergeGrid.options.column.width.description'
    },
    {
        type: 'enum',
        property: 'sort',
        title: 'grid.mergeGrid.options.column.sort.title',
        description: 'grid.mergeGrid.options.column.sort.description',
        options: [
            {
                value: 'asc',
                label: 'grid.mergeGrid.options.column.sort.asc'
            },
            {
                value: 'desc',
                label: 'grid.mergeGrid.options.column.sort.desc'
            },
            {
                value: 'none',
                label: 'grid.mergeGrid.options.column.sort.none'
            }
        ]
    },
    {
        type: 'boolean',
        property: 'visible',
        title: 'grid.mergeGrid.options.column.visible.title',
        description: 'grid.mergeGrid.options.column.visible.description'
    },
    {
        type: 'boolean',
        property: 'searchable',
        title: 'grid.mergeGrid.options.column.searchable.title',
        description: 'grid.mergeGrid.options.column.searchable.description'
    }
];

watch(options, () => {
    emit('update:modelValue', Object.keys(options).length === 0 ? undefined : options);
});
</script>

<template>
    <Collapsible :title="title" :description="description">
        <div class="input-table">
            <Input
                :title="t('grid.mergeGrid.options.title.title')"
                :description="t('grid.mergeGrid.options.title.description')"
                v-model="options.title"
            />
            <Input
                :title="t('grid.mergeGrid.options.searchFilter.title')"
                :description="t('grid.mergeGrid.options.searchFilter.description')"
                v-model="options.searchFilter"
            />
        </div>
        <Checkbox
            :title="t('grid.mergeGrid.options.search.title')"
            :description="t('grid.mergeGrid.options.search.description')"
            v-model="options.search"
            checked
        />
        <Checkbox
            :title="t('grid.mergeGrid.options.showFilter.title')"
            :description="t('grid.mergeGrid.options.showFilter.description')"
            v-model="options.showFilter"
            checked
        />
        <Checkbox
            :title="t('grid.mergeGrid.options.applyToMap.title')"
            :description="t('grid.mergeGrid.options.applyToMap.description')"
            v-model="options.applyToMap"
        />
        <Checkbox
            :title="t('grid.mergeGrid.options.filterByExtent.title')"
            :description="t('grid.mergeGrid.options.filterByExtent.description')"
            v-model="options.filterByExtent"
        />
        <Controls v-model="options.controls" />
        <List
            :add="addColumn"
            :remove="removeColumn"
            v-model="options.columns"
            :item-fields="columnFields"
            :title="t('grid.mergeGrid.options.columns.title')"
            :description="t('grid.mergeGrid.options.columns.description')"
            :add-prompt="t('grid.mergeGrid.options.columns.add')"
            :remove-prompt="t('grid.mergeGrid.options.columns.remove')"
            :singular="t('grid.mergeGrid.options.columns.singular')"
        >
            <template #item="{ element }">
                <Collapsible :title="t('grid.mergeGrid.options.column.filter')">
                    <div class="input-table">
                        <Select
                            :title="t('grid.mergeGrid.options.column.filter.type.title')"
                            :description="t('grid.mergeGrid.options.column.filter.type.description')"
                            v-model="element.filter.type"
                            :options="[
                                { value: 'string', label: t('grid.mergeGrid.options.column.filter.type.string') },
                                { value: 'number', label: t('grid.mergeGrid.options.column.filter.type.number') },
                                { value: 'date', label: t('grid.mergeGrid.options.column.filter.type.date') },
                                { value: 'selector', label: t('grid.mergeGrid.options.column.filter.type.selector') }
                            ]"
                        />
                        <Input
                            v-if="element.filter.type === 'number' || element.filter.type === 'date'"
                            :type="element.filter.type === 'number' ? 'number' : 'text'"
                            v-model="element.filter.min"
                            :title="t('grid.mergeGrid.options.column.filter.min.title')"
                            :description="t('grid.mergeGrid.options.column.filter.min.description')"
                        />
                        <Input
                            v-if="element.filter.type === 'number' || element.filter.type === 'date'"
                            :type="element.filter.type === 'number' ? 'number' : 'text'"
                            v-model="element.filter.max"
                            :title="t('grid.mergeGrid.options.column.filter.max.title')"
                            :description="t('grid.mergeGrid.options.column.filter.max.description')"
                        />
                        <Input
                            v-else
                            v-model="element.filter.value"
                            :title="t('grid.mergeGrid.options.column.filter.value.title')"
                            :description="t('grid.mergeGrid.options.column.filter.value.description')"
                        />
                    </div>
                    <Checkbox
                        v-model="element.filter.static"
                        :title="t('grid.mergeGrid.options.column.filter.static.title')"
                        :description="t('grid.mergeGrid.options.column.filter.static.description')"
                    />
                </Collapsible>
            </template>
        </List>
    </Collapsible>
</template>
