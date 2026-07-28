<script setup lang="ts">
// friendly halper for checkboxes

import InputHeader from '@/components/helpers/input-header.vue';
import { computed } from 'vue';

const model = defineModel<boolean>();

const props = defineProps({
    checked: Boolean,
    title: {
        type: String,
        required: true
    },
    disabled: Boolean,
    description: String
});

const checked = computed<boolean>(() => model.value ?? !!props.checked);
const onInput = (e: Event) => {
    model.value = (e.target as HTMLInputElement).checked;
};
</script>

<template>
    <label class="ce-checkbox" :class="{ 'ce-checkbox--disabled': disabled }">
        <input
            type="checkbox"
            class="ce-checkbox-input"
            :disabled="disabled ?? false"
            :checked="checked"
            :aria-label="title"
            @input="onInput"
        />
        <InputHeader :title="title" :description="description" type="checkbox" />
    </label>
</template>

<style scoped lang="scss">
.ce-checkbox {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    gap: 9px;
    margin-top: 12px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 9px 10px;
    background: #fff;
    cursor: pointer;
    transition:
        border-color 120ms ease,
        box-shadow 120ms ease,
        background-color 120ms ease;

    &:hover,
    &:focus-within {
        border-color: var(--editor-primary);
        background: #f8fafc;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
    }
}

.ce-checkbox--disabled {
    cursor: not-allowed;
    background: #f3f4f6;
}

.ce-checkbox-input {
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    accent-color: var(--editor-primary);
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
}
</style>
