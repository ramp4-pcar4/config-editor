<script setup lang="ts">
import { type PropType, watch, reactive } from 'vue';
import { LayerType } from '@/definitions';

import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import Controls from '@/components/layers/controls.vue';
import draggable from 'vuedraggable';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  },
  layerType: {
    type: String as PropType<LayerType>,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const fixtures = reactive<any>({
  details: props.modelValue?.details ?? {},
  settings: props.modelValue?.settings ?? {},
  grid: {
    ...props.modelValue?.grid,
    columns: props.modelValue?.grid?.columns?.map((col: any) => {
      return { filter: {}, ...col };
    })
  }
});

const addColumn = () => {
  if (!fixtures.grid.columns) {
    fixtures.grid.columns = [];
  }
  fixtures.grid.columns.push({ filter: { type: 'string' } });
};

const removeColumn = (idx: number) => {
  fixtures.grid.columns?.splice(idx, 1);
};

watch(fixtures, () => {
  emit('update:modelValue', fixtures);
});
</script>

<template>
  <Collapsible title="Fixtures">
    <Collapsible title="Details">
      <div class="w-full max-w-[250px]">
        <InputHeader
          title="Template"
          description="Custom Vue component name to render as details template"
          required
        />
        <input class="w-full" type="text" v-model="fixtures.details.template" />
      </div>
    </Collapsible>
    <Collapsible title="Settings">
      <Controls v-model="fixtures.settings.controls" />
      <Controls v-model="fixtures.settings.disabledControls" disabled />
    </Collapsible>
    <Collapsible v-if="layerType !== LayerType.WMS" title="Grid">
      <div class="input-table">
        <div>
          <InputHeader title="Title" description="Title of the datatable." />
          <input type="text" v-model="fixtures.grid.title" />
        </div>
        <div>
          <InputHeader
            title="Search Filter"
            description="Specifies the default filter to apply to a table (for global search)."
          />
          <input type="text" v-model="fixtures.grid.searchFilter" />
        </div>
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          v-model="fixtures.grid.search"
          :checked="fixtures.grid.search !== false"
        />
        <InputHeader
          title="Search"
          description="Specifies if global search is enabled by default."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          v-model="fixtures.grid.showFilter"
          :checked="fixtures.grid.showFilter !== false"
        />
        <InputHeader
          title="Show Filter"
          description="Specifies if the column filters are displayed on table load."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input type="checkbox" v-model="fixtures.grid.applyToMap" />
        <InputHeader
          title="Apply To Map"
          description="Specifies if column filters are applied to the map by default."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input type="checkbox" v-model="fixtures.grid.filterByExtent" />
        <InputHeader
          title="Filter By Extent"
          description="Specifies if the table should filter rows by extent by default."
          type="checkbox"
        />
      </div>
      <Collapsible>
        <template #header>
          <button class="arrow mr-1 sm:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
          <span class="text-lg">Columns ({{ fixtures.grid.columns?.length ?? 0 }})</span>
          <!-- add item button -->
          <button
            @click.stop="addColumn"
            class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
          >
            <svg
              class="relative bottom-[2px]"
              fill="white"
              height="18px"
              width="18px"
              viewBox="0 0 23 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span class="px-2"> Add column </span>
          </button>
        </template>
        <template #default>
          <draggable
            v-if="fixtures.grid.columns && fixtures.grid.columns.length > 0"
            :list="fixtures.grid.columns"
            item-key="fake"
            handle=".handle"
          >
            <template #item="{ element, index }">
              <Collapsible>
                <template #header>
                  <button class="cursor-move handle mr-1 sm:mr-5" @click.stop>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                      />
                    </svg>
                  </button>
                  <button class="mr-1 sm:mr-5 arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </button>
                  <span class="mr-1 sm:mr-5 sm:text-lg">{{
                    element.field ? element.field : `Column ${index + 1}`
                  }}</span>
                  <button @click.stop="removeColumn(index)" class="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </template>
                <template #default>
                  <div class="input-table">
                    <div>
                      <InputHeader
                        title="Field"
                        description="Unique identifier for the column. Aligns with the layer field name."
                      />
                      <input type="text" v-model="element.field" />
                    </div>
                    <div>
                      <InputHeader
                        title="Title"
                        description="Column title, uses the layer column name or alias if missing."
                      />
                      <input type="text" v-model="element.title" />
                    </div>
                    <div>
                      <InputHeader
                        title="Width"
                        description="Specifies the column width in pixels."
                      />
                      <input type="number" v-model="element.width" min="0" placeholder="400" />
                    </div>
                    <div>
                      <InputHeader
                        title="Sort"
                        description="Specifies if column requires to be sorted, either in ascending, descending, or no order."
                      />
                      <select v-model="element.sort">
                        <option value="none">none</option>
                        <option value="asc">ascending</option>
                        <option value="desc">descending</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex items-center mt-4">
                    <input
                      type="checkbox"
                      v-model="element.visible"
                      :checked="element.visible !== false"
                    />
                    <InputHeader
                      title="Visible"
                      description="Specifies if column is visible by default."
                      type="checkbox"
                    />
                  </div>
                  <div class="flex items-center mt-4">
                    <input
                      type="checkbox"
                      v-model="element.searchale"
                      :checked="element.searchable !== false"
                    />
                    <InputHeader
                      title="Searchable"
                      description="Specifies if column filter is available."
                      type="checkbox"
                    />
                  </div>
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
                      <div
                        v-if="element.filter.type === 'number' || element.filter.type === 'date'"
                      >
                        <InputHeader
                          title="Min"
                          description="Specifies the initial lower bound filter value for number or date types."
                        />
                        <input
                          :type="element.filter.type === 'number' ? 'number' : 'text'"
                          v-model="element.filter.min"
                        />
                      </div>
                      <div
                        v-if="element.filter.type === 'number' || element.filter.type === 'date'"
                      >
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
              </Collapsible>
            </template>
          </draggable>
        </template>
      </Collapsible>
    </Collapsible>
  </Collapsible>
</template>
