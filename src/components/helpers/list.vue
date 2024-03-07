<script setup lang="ts">
import type { Field } from '@/definitions';
import { type PropType, watch, computed, reactive, useSlots, ref } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  },
  itemFields: {
    type: Object as PropType<Array<Field>>,
    required: false
  },
  add: {
    type: Function,
    required: false
  },
  remove: {
    type: Function,
    required: false
  },
  addPrompt: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  singular: { type: String, required: false },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  topLevel: {
    type: Boolean,
    required: false,
    default: false
  },
  customOnly: {
    type: Boolean,
    required: false,
    default: false
  },
  editDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

const slots = useSlots();
const emit = defineEmits(['update:modelValue']);

const list = computed({
  get() {
    return props.modelValue ?? [];
  },
  set(value) {
    console.log('Setting items', value);
    emit('update:modelValue', value);
  }
});

const add = () => {
  if (props.editDisabled) {
    return;
  } else if (!!props.add) {
    props.add();
  } else if (!props.modelValue) {
    list.value = [...list.value, {}];
  } else {
    list.value.push({});
  }
};

const remove = (idx: number) => {
  if (props.editDisabled) {
    return;
  } else if (!!props.remove) {
    props.remove(idx);
  } else {
    list.value?.splice(idx, 1);
  }
};

const reorder = (idx: number, direction: number) => {
  const [elem] = list.value?.splice(idx, 1);
  list.value?.splice(idx + direction, 0, elem);
};

const length = computed<number>(() => list.value?.length ?? 0);

// for items, we use the table layout instead of the collapsible layout iff
//      - the user doesn't want a custom item template
//      - 0 < number of fields < 4
//      - only string or boolean or number fields are present (no fancy nested objects)
const useTableLayout = computed<boolean>(
  () =>
    !slots.item &&
    length.value > 0 &&
    !!props.itemFields &&
    props.itemFields.length > 0 &&
    props.itemFields.length < 4
);

const fieldToInputType: { [key: string]: string } = {
  string: 'text',
  object: 'text',
  array: 'text',
  number: 'number',
  boolean: 'checkbox'
};
</script>

<template>
  <collapsible :thick-border="topLevel">
    <template #header>
      <button class="arrow mr-1 sm:mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      <InputHeader
        type="header"
        :title="`${title} (${length})`"
        :required="required"
        :description="description"
      />
      <!-- add item button -->
      <button
        @click.stop="add"
        :class="{
          'cursor-not-allowed bg-gray-500': props.editDisabled,
          'bg-black cursor-pointer hover:bg-gray-800': !props.editDisabled
        }"
        class="ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
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
        <span class="px-2">{{ addPrompt ?? 'Add' }}</span>
      </button>
    </template>
    <template #default>
      <div v-if="useTableLayout" :class="`grid cols-${itemFields?.length} gap-4`">
        <div></div>
        <InputHeader
          class="justify-center"
          v-for="field in itemFields"
          :key="field.title"
          :title="field.title"
          :description="field.description"
          :required="field.required"
          type="checkbox"
        />
        <div></div>
      </div>
      <draggable v-if="length > 0" :list="list" item-key="fake" handle=".handle">
        <template #item="{ element, index }">
          <div>
            <div v-if="useTableLayout">
              <div>
                <hr class="border-solid border-t border-gray-300 my-2" />
                <div :class="`grid cols-${itemFields?.length} gap-4`">
                  <button
                    :disabled="editDisabled"
                    :class="{ handle: !editDisabled }"
                    class="cursor-move disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
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
                  <div
                    v-for="field in itemFields"
                    :key="field.title"
                    class="flex items-center justify-center"
                  >
                    <input
                      v-if="!['enum', 'object', 'array'].includes(field.type)"
                      :type="fieldToInputType[field.type]"
                      :disabled="editDisabled"
                      :class="{
                        'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                        'cursor-pointer': field.type.toLowerCase() === 'boolean'
                      }"
                      v-model="list[index][field.property]"
                    />
                    <select
                      v-else-if="field.type === 'enum'"
                      class="w-full max-w-xs"
                      :disabled="editDisabled"
                      v-model="list[index][field.property]"
                    >
                      <option
                        v-for="option in field.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <input
                      v-else
                      :type="fieldToInputType[field.type]"
                      :class="{
                        'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                        'cursor-pointer': field.type.toLowerCase() === 'boolean'
                      }"
                      :disabled="editDisabled"
                      :value="
                        field.type === 'object'
                          ? JSON.stringify(list[index][field.property])
                          : list[index][field.property]?.join(',') ?? ''
                      "
                      @input="e => {
                        if (field.type === 'object') {
                          list[index][field.property] = JSON.parse((e.target as HTMLInputElement).value)
                        } else {
                          list[index][field.property] = (e.target as HTMLInputElement).value === '' ? [] : (e.target as HTMLInputElement).value.split(',');
                        }
                    }"
                    />
                  </div>
                  <div class="flex ml-auto">
                    <button
                      @click.stop="remove(index)"
                      :disabled="editDisabled"
                      class="disabled:text-gray-500 disabled:cursor-not-allowed mr-1"
                    >
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
                    <div class="flex flex-col">
                      <button
                        @click.stop="reorder(index, -1)"
                        :disabled="editDisabled || index === 0"
                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
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
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </button>
                      <button
                        @click.stop="reorder(index, 1)"
                        :disabled="editDisabled || index === list.length - 1"
                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
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
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <Collapsible>
                <template #header>
                  <button
                    :disabled="editDisabled"
                    :class="{ handle: !editDisabled }"
                    class="cursor-move disabled:text-gray-500 disabled:cursor-not-allowed mr-1 sm:mr-3"
                    @click.stop
                  >
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
                  <button class="mr-1 sm:mr-3 arrow">
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
                    list[index].id ||
                    list[index].name ||
                    list[index].layerId ||
                    list[index].gridId ||
                    list[index].panelId ||
                    `${props.singular || props.title?.slice(0, props.title.length - 1)} ${
                      list[index].index ?? index + 1
                    }`
                  }}</span>
                  <div class="flex justify-center ml-auto">
                    <button
                      @click.stop="remove(index)"
                      :disabled="editDisabled"
                      class="disabled:text-gray-500 disabled:cursor-not-allowed mr-1"
                    >
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
                    <div class="flex flex-col">
                      <button
                        @click.stop="reorder(index, -1)"
                        :disabled="editDisabled || index === 0"
                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
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
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </button>
                      <button
                        @click.stop="reorder(index, 1)"
                        :disabled="editDisabled || index === list.length - 1"
                        class="disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
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
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </template>
                <template #default>
                  <div v-if="!customOnly" class="input-table">
                    <div
                      v-for="field in itemFields?.filter((f) => f.type.toLowerCase() !== 'boolean')"
                      :key="field.title"
                    >
                      <InputHeader
                        :title="field.title"
                        :description="field.description"
                        :required="field.required"
                      />
                      <input
                        v-if="!['enum', 'object', 'array'].includes(field.type)"
                        :type="fieldToInputType[field.type]"
                        :class="{
                          'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                          'cursor-pointer': field.type.toLowerCase() === 'boolean'
                        }"
                        :disabled="editDisabled"
                        v-model="list[index][field.property]"
                        :placeholder="field.placeholder"
                        :min="field.min"
                        :max="field.max"
                      />
                      <select
                        v-else-if="field.type === 'enum'"
                        class="w-full max-w-xs"
                        :disabled="editDisabled"
                        v-model="list[index][field.property]"
                      >
                        <option
                          v-for="option in field.options"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <input
                        v-else
                        :type="fieldToInputType[field.type]"
                        class="w-full max-w-xs"
                        :value="
                          field.type === 'object'
                            ? JSON.stringify(list[index][field.property])
                            : list[index][field.property]?.join(',') ?? ''
                        "
                        :disabled="editDisabled"
                        @input="e => {
                          if (field.type === 'object') {
                            list[index][field.property] = JSON.parse((e.target as HTMLInputElement).value)
                          } else {
                            list[index][field.property] = (e.target as HTMLInputElement).value === '' ? [] : (e.target as HTMLInputElement).value.split(',');
                          }
                        }"
                        :placeholder="field.placeholder"
                        :min="field.min"
                        :max="field.max"
                      />
                    </div>
                  </div>
                  <div
                    v-if="!customOnly"
                    v-for="field in itemFields?.filter((f) => f.type === 'boolean')"
                    class="flex items-center mt-4"
                  >
                    <input
                      type="checkbox"
                      v-model="list[index][field.property]"
                      :disabled="editDisabled"
                    />
                    <InputHeader
                      :title="field.title"
                      :description="field.description"
                      :required="field.required"
                      type="checkbox"
                    />
                  </div>
                  <slot name="item" :index="index" :element="list[index]"></slot>
                </template>
              </Collapsible>
            </div>
          </div>
        </template>
      </draggable>
    </template>
  </collapsible>
</template>

<style lang="scss" scoped>
.cols-2 {
  grid-template-columns: 24px 1fr 1fr 48px;
}

.cols-3 {
  grid-template-columns: 24px 1fr 1fr 1fr 48px;
}
</style>
