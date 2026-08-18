<script setup lang="ts">
// friendly halper for multiselectors (appears as a group of checkboxes)

import Collapsible from './collapsible.vue';

const model = defineModel<Array<any>>();

defineProps({
    title: {
        type: String,
        required: true
    },
    description: String,
    options: Array<{ label: string; value: string }>
});
</script>

<template>
    <Collapsible :title="title" :description="description">
        <div class="ce-multiselect-options">
            <label class="ce-option-checkbox" v-for="(option, idx) in options" :key="idx">
                <input
                    type="checkbox"
                    class="ce-option-checkbox-input"
                    :value="option.value"
                    v-model="model"
                    :aria-label="option.label"
                />
                <span>{{ option.label }}</span>
            </label>
        </div>
    </Collapsible>
</template>

<style scoped lang="scss">
.ce-multiselect-options {
    display: grid;
    gap: 8px;
}

.ce-option-checkbox {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 9px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 8px 10px;
    background: #fff;
    color: #1f2937;
    font-size: 13px;
    line-height: 18px;
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

.ce-option-checkbox-input {
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
    accent-color: var(--editor-primary);
}
</style>
