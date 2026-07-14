<script setup lang="ts">
// friendly halper for making inputs (stuff users enter stuff into)

import InputHeader from '@/components/helpers/input-header.vue';

import { computed } from 'vue';

const model = defineModel<any>();

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    title: {
        type: String,
        required: true
    },
    disabled: Boolean,
    description: String,
    headerClass: String,
    inputClass: String,
    required: Boolean,
    placeholder: String,
    min: String,
    max: String
});

const value = computed<string>(() => {
    if (model.value === undefined) {
        return '';
    } else if (props.type === 'array') {
        return model.value.join(',');
    } else if (props.type === 'object') {
        return JSON.stringify(model.value);
    } else if (props.type === 'number') {
        return model.value.toString();
    } else {
        return model.value;
    }
});
const onInput = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    if (props.type === 'array') {
        model.value = newValue.split(',');
    } else if (props.type === 'object') {
        model.value = JSON.parse(newValue);
    } else if (props.type === 'number') {
        model.value = newValue ? Number(newValue) : undefined;
    } else {
        model.value = newValue ? newValue : undefined;
    }
};
</script>

<template>
    <div class="ce-field">
        <InputHeader :required="required" :class="headerClass" :title="title" :description="description" />
        <input
            :disabled="disabled ?? false"
            :class="['ce-control', inputClass]"
            :value="value"
            @input="onInput"
            :aria-label="title"
            :type="type === 'number' ? 'number' : 'text'"
            :min="min"
            :max="max"
            :placeholder="placeholder"
        />
    </div>
</template>

<style scoped lang="scss">
.ce-field {
    min-width: 0;
}

.ce-control {
    width: 100%;
    min-height: 36px;
    border: 1px solid #b8c2cc;
    border-radius: 4px;
    padding: 7px 9px;
    background: #fff;
    color: #111827;
    font-size: 13px;
    line-height: 18px;
    outline: none;
    transition:
        border-color 120ms ease,
        box-shadow 120ms ease,
        background-color 120ms ease;

    &::placeholder {
        color: #9ca3af;
    }

    &:hover:not(:disabled) {
        border-color: #8c98a5;
    }

    &:focus {
        border-color: var(--editor-primary);
        box-shadow: 0 0 0 3px rgba(38, 55, 74, 0.14);
    }

    &:disabled {
        cursor: not-allowed;
        background: #f3f4f6;
        color: #6b7280;
    }
}
</style>
