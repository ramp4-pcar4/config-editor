<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import List from '@/components/helpers/list.vue';
import Controls from '@/components/fixtures/grid/controls.vue';
import type { Field } from '@/definitions';

import { reactive, type PropType, watch } from 'vue';

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
    title: 'Field',
    description: 'Unique identifier for the column. Aligns with the layer field name.'
  },
  {
    type: 'string',
    property: 'title',
    title: 'Title',
    description: 'Column title, uses the layer column name or alias if missing.'
  },
  {
    type: 'number',
    property: 'width',
    title: 'Width',
    placeholder: '400',
    min: 0,
    description: 'Specifies the column width in pixels.'
  },
  {
    type: 'enum',
    property: 'sort',
    title: 'Sort',
    description:
      'Specifies if column requires to be sorted, either in ascending, descending, or no order.',
    options: [
      {
        value: 'asc',
        label: 'ascending'
      },
      {
        value: 'desc',
        label: 'descending'
      },
      {
        value: 'none',
        label: 'none'
      }
    ]
  },
  {
    type: 'boolean',
    property: 'visible',
    title: 'Visible',
    description: 'Specifies if the column is visible by default.'
  },
  {
    type: 'boolean',
    property: 'searchable',
    title: 'Searchable',
    description: 'Specifies if the column is searchable by default.'
  }
];

watch(options, () => {
  emit('update:modelValue', Object.keys(options).length === 0 ? undefined : options);
});
</script>

<template>
  <Collapsible :title="title" :description="description">
    <div class="input-table">
      <div>
        <InputHeader title="Title" description="Title of the datatable." />
        <input type="text" v-model="options.title" />
      </div>
      <div>
        <InputHeader
          title="Search Filter"
          description="Specifies the default filter to apply to a table (for global search)."
        />
        <input type="text" v-model="options.searchFilter" />
      </div>
    </div>
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="options.search" :checked="options.search !== false" />
      <InputHeader
        title="Search"
        description="Specifies if global search is enabled by default."
        type="checkbox"
      />
    </div>
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="options.showFilter" :checked="options.showFilter !== false" />
      <InputHeader
        title="Show Filter"
        description="Specifies if the column filters are displayed on table load."
        type="checkbox"
      />
    </div>
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="options.applyToMap" />
      <InputHeader
        title="Apply To Map"
        description="Specifies if column filters are applied to the map by default."
        type="checkbox"
      />
    </div>
    <div class="flex items-center mt-4">
      <input type="checkbox" v-model="options.filterByExtent" />
      <InputHeader
        title="Filter By Extent"
        description="Specifies if the table should filter rows by extent by default."
        type="checkbox"
      />
    </div>
    <Controls v-model="options.controls" />
    <List
      :add="addColumn"
      :remove="removeColumn"
      v-model="options.columns"
      :item-fields="columnFields"
      title="Columns"
      description="Specify how the columns (properties) of the table are defined. If a column is not present in the array, it will be shown using default values. If the property is not defined, all layer attributes will be shown using default values."
      add-prompt="Add column"
    >
      <template #item="{ element }">
        <Collapsible title="Filter">
          <div class="input-table">
            <div>
              <InputHeader
                title="Type"
                description="Specifies the filter type to use for a column. Defaults to being filtered as a string."
              />
              <select v-model="element.filter.type">
                <option value="string" selected>string</option>
                <option value="number">number</option>
                <option value="date">date</option>
                <option value="selector">selector</option>
              </select>
            </div>
            <div v-if="element.filter.type === 'number' || element.filter.type === 'date'">
              <InputHeader
                title="Min"
                description="Specifies the initial lower bound filter value for number or date types."
              />
              <input
                :type="element.filter.type === 'number' ? 'number' : 'text'"
                v-model="element.filter.min"
              />
            </div>
            <div v-if="element.filter.type === 'number' || element.filter.type === 'date'">
              <InputHeader
                title="Max"
                description="Specifies the initial upper bound filter value for number or date types."
              />
              <input
                :type="element.filter.type === 'number' ? 'number' : 'text'"
                v-model="element.filter.max"
              />
            </div>
            <div v-else>
              <InputHeader
                title="Value"
                description="Specifies the initial filter value for string or selector types."
              />
              <input type="text" v-model="element.filter.value" />
            </div>
          </div>
          <div class="flex items-center mt-4">
            <input type="checkbox" v-model="element.filter.static" />
            <InputHeader
              title="Static"
              description="Specifies if column filter is modifiable."
              type="checkbox"
            />
          </div>
        </Collapsible>
      </template>
    </List>
  </Collapsible>
</template>
