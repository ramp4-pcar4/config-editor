<script setup lang="ts">
// friendly halper for collapsible sections. boxes with arrow controls to show guts or hide/collapse them

import { ref } from 'vue';
import InputHeader from './input-header.vue';
import { useI18n } from 'vue-i18n';

const expanded = ref<boolean>(false);
const el = ref<HTMLElement>();
const { t } = useI18n();

defineProps(['title', 'description', 'thickBorder', 'required']);

const toggle = () => {
    expanded.value = !expanded.value;
};
</script>

<template>
    <div
        class="ce-collapsible"
        :class="{ 'ce-collapsible--open': expanded, 'ce-collapsible--strong': thickBorder }"
        ref="el"
    >
        <div
            class="ce-collapsible-header"
            role="button"
            tabindex="0"
            @click="toggle"
            @keydown.enter.prevent="toggle"
            @keydown.space.prevent="toggle"
        >
            <slot name="header">
                <button
                    type="button"
                    :content="t('editor.expand')"
                    v-tippy="{ trigger: 'mouseenter focus' }"
                    class="ce-collapsible-toggle arrow"
                    :aria-label="t('editor.expand')"
                    @click.stop="toggle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        class="ce-collapsible-icon"
                        :class="{ 'ce-collapsible-icon--open': expanded }"
                    >
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </button>
                <InputHeader :title="title" :description="description" type="header" :required="required" />
            </slot>
        </div>
        <div v-if="expanded" class="ce-collapsible-content">
            <div class="ce-collapsible-body"><slot></slot></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ce-collapsible {
    margin-top: 10px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    overflow: hidden;
}

.ce-collapsible--strong {
    border-color: #b8c2cc;
}

.ce-collapsible-header {
    display: flex;
    min-width: 0;
    min-height: 46px;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    cursor: pointer;
    outline: none;
    transition:
        background-color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus {
        background: #f8fafc;
    }

    &:focus {
        box-shadow: inset 0 0 0 2px rgba(38, 55, 74, 0.2);
    }
}

.ce-collapsible-toggle {
    display: inline-flex;
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    color: var(--editor-primary);
    outline: none;
    transition: background-color 120ms ease;

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.ce-collapsible-icon {
    fill: currentColor;
    transition: transform 120ms ease;
}

.ce-collapsible-icon--open,
.ce-collapsible--open > .ce-collapsible-header :deep(.arrow svg) {
    transform: rotate(180deg);
}

.ce-collapsible-content {
    border-top: 1px solid #eef2f6;
}

.ce-collapsible-body {
    margin-left: 8px;
    border-left: 2px solid #e5e7eb;
    padding: 12px 12px 14px 10px;
}
</style>
