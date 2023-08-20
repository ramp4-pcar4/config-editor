<script setup lang="ts">
import type { Field } from '@/definitions';
import { reactive, type PropType, watch, computed, useSlots } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  },
  itemFields: {
    type: Object as PropType<Array<Field>>,
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
  }
});

const emit = defineEmits(['update:modelValue', 'add', 'remove']);

const add = () => {
  list.push({});
  emit('add');
};

const remove = (idx: number) => {
  list?.splice(idx, 1);
  emit('remove', idx);
};

const list = reactive<Array<any>>(props.modelValue ?? []);

watch(list, () => {
  emit('update:modelValue', list.length === 0 ? undefined : list);
});

// for items, we use the table layout instead of the collapsible layout iff
//      - the user doesn't want a custom item template
//      - 0 < number of fields < 4
//      - only string or boolean or number fields are present (no fancy nested objects)
const useTableLayout = computed<boolean>(
  () =>
    !props.customOnly &&
    list.length > 0 &&
    !!props.itemFields &&
    props.itemFields.length > 0 &&
    props.itemFields.length < 4 &&
    props.itemFields
      .map((f) => f.type)
      .every(
        (t) =>
          t.toLowerCase() === 'string' ||
          t.toLowerCase() === 'boolean' ||
          t.toLowerCase() === 'number'
      )
);

// for items, we use the collapsible layout instead of the table layout iff
//         - the user doesn't want a custom item template
//         - number of fields > 0
//         - one of the other conditions of using a table layout does not apply
const useCollapsibleLayout = computed<boolean>(
  () => !props.customOnly && !!props.itemFields && props.itemFields.length > 0
);

const fieldToInputType: { [key: string]: string } = {
  string: 'text',
  number: 'number',
  boolean: 'checkbox'
};
</script>

<template>
  <Collapsible :thick-border="topLevel">
    <template #header>
      <button class="arrow mr-1 sm:mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      <InputHeader
        type="header"
        :title="`${title} (${list.length})`"
        :required="required"
        :description="description"
      />
      <!-- add item button -->
      <button
        @click.stop="add"
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
          :description="description"
          :required="field.required"
          type="checkbox"
        />
        <div></div>
      </div>
      <draggable v-if="list.length > 0" :list="list" item-key="fake" handle=".handle">
        <template #item="{ element, index }">
          <div>
            <div v-if="useTableLayout">
              <div>
                <hr class="border-solid border-t border-gray-300 my-2" />
                <div :class="`grid cols-${itemFields?.length} gap-4`">
                  <button class="cursor-move handle">
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
                      v-if="field.property"
                      :type="fieldToInputType[field.type]"
                      :class="{
                        'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                        'cursor-pointer': field.type.toLowerCase() === 'boolean'
                      }"
                      v-model="element[field.property]"
                    />
                    <input
                      v-else
                      :type="fieldToInputType[field.type]"
                      :class="{
                        'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                        'cursor-pointer': field.type.toLowerCase() === 'boolean'
                      }"
                      :value="field.value"
                      @input="e => {
                        if (field.onInput) {
                            field.onInput(index, (e.target as HTMLInputElement).value)
                        }
                    }"
                    />
                  </div>
                  <button @click="remove(index)">
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
                </div>
              </div>
            </div>
            <div v-else-if="useCollapsibleLayout"></div>
            <slot name="item" :element="element" :index="index"></slot>
          </div>
        </template>
      </draggable>
    </template>
  </Collapsible>
</template>

<style lang="scss" scoped>
.cols-2 {
  grid-template-columns: 24px 1fr 1fr 24px;
}

.cols-3 {
  grid-template-columns: 24px 1fr 1fr 1fr 24px;
}
</style>
