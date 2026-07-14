<script setup lang="ts">
// friendly halper for selection lists (pick-one style)

import InputHeader from '@/components/helpers/input-header.vue';

const model = defineModel<any>();

defineProps({
    title: {
        type: String,
        required: true
    },
    description: String,
    headerClass: String,
    inputClass: String,
    required: Boolean,
    disabled: Boolean,
    options: Array<{ label: String; value: String }>
});
</script>

<template>
    <div class="ce-field">
        <InputHeader :required="required" :class="headerClass" :title="title" :description="description" />
        <select
            :aria-label="title"
            v-model="model"
            :class="['ce-control', inputClass]"
            :disabled="disabled ?? false"
        >
            <option v-for="(opt, idx) in options" :value="opt.value" :key="idx">{{ opt.label }}</option>
        </select>
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
    padding: 7px 34px 7px 9px;
    background: #fff;
    color: #111827;
    font-size: 13px;
    line-height: 18px;
    outline: none;
    transition:
        border-color 120ms ease,
        box-shadow 120ms ease,
        background-color 120ms ease;

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
