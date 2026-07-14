<script setup lang="ts">
// friendly halper for lists of stuff.

import type { Field } from '@/definitions';
import { computed, useSlots } from 'vue';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import draggable from 'vuedraggable';
import InputHeader from './input-header.vue';
import Input from './input.vue';
import Checkbox from './checkbox.vue';
import Select from './select.vue';
import Collapsible from './collapsible.vue';

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
    removePrompt: {
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
    /**
     * Text for the "singular" of an item in the list. E.g. "egg" is singular of a list of eggs
     */
    singular: { type: String, required: false },
    /**
     * Will mark the list as "required" on the UI (adds the little red asterisk)
     */
    required: {
        type: Boolean,
        required: false,
        default: false
    },
    /**
     * What does this do? Look at tile-schemas.vue
     */
    topLevel: {
        type: Boolean,
        required: false,
        default: false
    },
    /**
     * I *think* this flags that the "list item" is ONLY populated by custom components, and does not have any stuff
     * to be generated from the contents itemFields. Note it is fine to have both (this should be false in that case)
     */
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

const { t } = useI18n();
const slots = useSlots();
const emit = defineEmits(['update:modelValue']);

const list = computed({
    get() {
        return props.modelValue ?? [];
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const add = () => {
    if (props.editDisabled) {
        return;
    } else if (props.add) {
        props.add();
    } else if (!props.modelValue) {
        list.value = [...list.value, {}];
    } else {
        list.value.push({});
    }
};

/**
 * Remove an item from the list lurking at an index
 */
const remove = (idx: number) => {
    if (props.editDisabled) {
        return;
    } else if (props.remove) {
        props.remove(idx);
    } else {
        list.value.splice(idx, 1);
    }
};

/**
 * Changes the position of an item in the list
 *
 * @param idx index where the item is currently lurking
 * @param direction an offset from the current position. where we want item to end up
 */
const reorder = (idx: number, direction: number) => {
    const [elem] = list.value.splice(idx, 1);
    list.value.splice(idx + direction, 0, elem);
};

const length = computed<number>(() => list.value.length);

// for items, we use the table layout instead of the collapsible layout iff
//      - the user doesn't want a custom item template
//      - 0 < number of fields < 4
//      - only string or boolean or number fields are present (no fancy nested objects)
//        ^ TODO is this still valid? I don't see that being checked.
//               Code looks like it stringifies the object/array into a textbox. Is that ever being done in practice? Would look horrible lol.
// table layout puts a header of field names, and then each row of the table just contains the input controls.
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
    <Collapsible class="ce-list-collapsible" :thick-border="topLevel">
        <template #header>
            <button :content="t('editor.expand')" v-tippy class="arrow mr-1 ce-sm:mr-3" :aria-label="t('editor.expand')">
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
                    'ce-list-add-button--disabled': props.editDisabled
                }"
                class="ce-list-add-button"
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
                <span>{{ addPrompt ?? t('list.add') }}</span>
            </button>
        </template>
        <template #default>
            <div v-if="useTableLayout" :class="`grid cols-${itemFields?.length} gap-4`">
                <!-- Table layout: header of labels for the controls -->
                <div></div>
                <InputHeader
                    class="justify-center"
                    v-for="field in itemFields"
                    :key="field.title"
                    :title="t(field.title)"
                    :description="field.description ? t(field.description) : ''"
                    :required="field.required"
                    type="checkbox"
                />
                <div></div>
            </div>
            <draggable v-if="length > 0" :list="list" item-key="fake" handle=".handle">
                <template #item="{ index }">
                    <div>
                        <div v-if="useTableLayout">
                            <!-- Table layout: rows of controls -->
                            <div>
                                <hr class="border-solid border-t border-gray-300 my-2" />
                                <div :class="`grid cols-${itemFields?.length} gap-4`">
                                    <button
                                            :disabled="editDisabled"
                                            :class="{ handle: !editDisabled }"
                                            class="ce-list-icon-button cursor-move disabled:cursor-not-allowed"
                                        :content="t('editor.reorder')"
                                        v-tippy
                                        :aria-label="t('editor.reorder')"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-20 h-20"
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
                                        <!-- Basic inputs: strings, numbers, boolean checkboxes -->
                                        <input
                                            v-if="['string', 'number', 'boolean'].includes(field.type)"
                                            :type="fieldToInputType[field.type]"
                                            :disabled="editDisabled"
                                            class="text-base"
                                            :class="{
                                                'w-full max-w-xs': field.type !== 'boolean',
                                                'cursor-pointer w-16 h-16': field.type === 'boolean'
                                            }"
                                            v-model="list[index][field.property]"
                                            v-bind:checked="field.type === 'boolean' ? field.checked : undefined"
                                            :aria-label="t(field.title)"
                                        />
                                        <!-- Enum combos -->
                                        <select
                                            v-else-if="field.type === 'enum'"
                                            class="w-full max-w-xs"
                                            :disabled="editDisabled"
                                            v-model="list[index][field.property]"
                                            :aria-label="t(field.title)"
                                        >
                                            <option
                                                v-for="option in field.options"
                                                :key="option.value"
                                                :value="option.value"
                                            >
                                                {{ t(option.label) }}
                                            </option>
                                        </select>
                                        <!-- Objects and Arrays. TODO: why the boolean check on :class? -->
                                        <input
                                            v-else
                                            :type="fieldToInputType[field.type]"
                                            :class="{
                                                'w-full max-w-xs': field.type.toLowerCase() !== 'boolean',
                                                'cursor-pointer w-16 h-16': field.type.toLowerCase() === 'boolean'
                                            }"
                                            :aria-label="t(field.title)"
                                            :disabled="editDisabled"
                                            :value="
                                                field.type === 'object'
                                                    ? JSON.stringify(list[index][field.property])
                                                    : list[index][field.property]?.join(',') ?? ''
                                            "
                                            @input="(e: Event) => {
                        if (field.type === 'object') {
                          list[index][field.property] = JSON.parse((e.target as HTMLInputElement).value)
                        } else {
                          list[index][field.property] = (e.target as HTMLInputElement).value === '' ? [] : (e.target as HTMLInputElement).value.split(',').map(s => s.trim());
                        }
                    }"
                                        />
                                    </div>
                                    <div class="flex ml-auto">
                                        <button
                                            @click.stop="remove(index)"
                                            :disabled="editDisabled"
                                            class="ce-list-icon-button disabled:cursor-not-allowed"
                                            :aria-label="removePrompt ?? t('list.remove')"
                                            :content="removePrompt ?? t('list.remove')"
                                            v-tippy
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-20"
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
                                                class="ce-list-icon-button disabled:cursor-not-allowed"
                                                :aria-label="t('editor.up')"
                                                :content="t('editor.up')"
                                                v-tippy
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-20"
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
                                                class="ce-list-icon-button disabled:cursor-not-allowed"
                                                :aria-label="t('editor.down')"
                                                :content="t('editor.down')"
                                                v-tippy
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-20"
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
                            <!-- Regular mode (not table layout) -->
                            <Collapsible class="ce-list-item-collapsible">
                                <template #header>
                                    <button
                                        :disabled="editDisabled"
                                        :class="{ handle: !editDisabled }"
                                        class="ce-list-icon-button cursor-move disabled:cursor-not-allowed"
                                        @click.stop
                                        :content="t('editor.reorder')"
                                        v-tippy
                                        :aria-label="t('editor.reorder')"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-20"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        :content="t('editor.expand')"
                                        v-tippy
                                        class="ce-list-icon-button arrow"
                                        :aria-label="t('editor.expand')"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            width="20"
                                        >
                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                        </svg>
                                    </button>
                                    <span class="ce-list-item-title">{{
                                        list[index].id ||
                                        list[index].name ||
                                        list[index].layerId ||
                                        list[index].gridId ||
                                        list[index].panelId ||
                                        `${props.singular || props.title?.slice(0, props.title.length - 1)} ${
                                            list[index].index ?? index + 1
                                        }`
                                    }}</span>
                                    <div class="ce-list-item-actions flex justify-center ml-auto">
                                        <button
                                            @click.stop="remove(index)"
                                            :disabled="editDisabled"
                                            class="ce-list-icon-button disabled:cursor-not-allowed"
                                            :aria-label="removePrompt ?? t('list.remove')"
                                            :content="removePrompt ?? t('list.remove')"
                                            v-tippy
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-20"
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
                                                class="ce-list-icon-button disabled:cursor-not-allowed"
                                                :aria-label="t('editor.up')"
                                                :content="t('editor.up')"
                                                v-tippy
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-20"
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
                                                class="ce-list-icon-button disabled:cursor-not-allowed"
                                                :aria-label="t('editor.down')"
                                                :content="t('editor.down')"
                                                v-tippy
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-20"
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
                                    <div v-if="!customOnly">
                                        <div class="input-table">
                                            <component
                                                v-for="field in itemFields?.filter(
                                                    f => f.type.toLowerCase() !== 'boolean'
                                                )"
                                                :key="field.title"
                                                :is="field.type === 'enum' ? Select : Input"
                                                :title="t(field.title)"
                                                :description="field.description ? t(field.description) : ''"
                                                :required="field.required"
                                                :options="
                                                    field.options?.map(opt => {
                                                        return { value: opt.value, label: t(opt.label) };
                                                    })
                                                "
                                                :type="field.type"
                                                :placeholder="field.placeholder"
                                                :min="field.min?.toString()"
                                                :max="field.max?.toString()"
                                                v-model="list[index][field.property]"
                                                :disabled="editDisabled"
                                            ></component>
                                        </div>
                                        <Checkbox
                                            v-for="(field, cbi) in itemFields?.filter(f => f.type === 'boolean')"
                                            :title="t(field.title)"
                                            :description="field.description ? t(field.description) : ''"
                                            :required="field.required"
                                            :disabled="editDisabled"
                                            v-model="list[index][field.property]"
                                            v-bind:key="cbi"
                                            v-bind:checked="field.checked"
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
    </Collapsible>
</template>

<style scoped lang="scss">
.ce-list-collapsible {
    container: ce-list-header / inline-size;
}

.ce-list-item-collapsible {
    container: ce-list-item-header / inline-size;
}

.ce-list-add-button {
    display: inline-flex;
    flex: 0 0 auto;
    min-height: 34px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-left: auto;
    border: 1px solid var(--editor-primary);
    border-radius: 6px;
    padding: 7px 10px;
    background: var(--editor-primary);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    outline: none;
    transition:
        background-color 120ms ease,
        border-color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus {
        border-color: var(--editor-primary-hover);
        background: var(--editor-primary-hover);
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
    }
}

.ce-list-add-button--disabled {
    cursor: not-allowed;
    border-color: #9ca3af;
    background: #9ca3af;
    box-shadow: none;
}

.ce-list-icon-button {
    display: inline-flex;
    flex: 0 0 auto;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    color: #374151;
    outline: none;
    transition:
        background-color 120ms ease,
        color 120ms ease;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
        background: #eef2f6;
        color: var(--editor-primary);
    }

    &:disabled {
        color: #9ca3af;
    }
}

.ce-list-item-title {
    min-width: 0;
    overflow: hidden;
    color: #1f2937;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@container ce-list-header (max-width: 330px) {
    .ce-list-collapsible > :deep(.ce-collapsible-header) {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        align-items: center;
    }

    .ce-list-collapsible > :deep(.ce-collapsible-header) > .arrow {
        grid-column: 1;
        grid-row: 1;
        margin-right: 0;
    }

    .ce-list-collapsible > :deep(.ce-collapsible-header) > .ce-input-header {
        grid-column: 2;
        grid-row: 1;
    }

    .ce-list-collapsible > :deep(.ce-collapsible-header) > .ce-list-add-button {
        grid-column: 2;
        grid-row: 2;
        width: 100%;
        margin-left: 0;
    }
}

@container ce-list-item-header (max-width: 300px) {
    .ce-list-item-collapsible > :deep(.ce-collapsible-header) {
        display: grid;
        grid-template-columns: 30px 30px minmax(0, 1fr);
        align-items: center;
    }

    .ce-list-item-collapsible > :deep(.ce-collapsible-header) > .ce-list-item-actions {
        grid-column: 2 / 4;
        grid-row: 2;
        justify-self: end;
        margin-left: 0;
    }
}
</style>
