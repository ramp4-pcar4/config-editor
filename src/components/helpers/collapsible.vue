<script setup lang="ts">
// friendly halper for collapsible sections. boxes with arrow controls to show guts or hide/collapse them

import { computed, ref, useId } from 'vue';
import InputHeader from './input-header.vue';
import { useI18n } from 'vue-i18n';

const expanded = ref<boolean>(false);
const el = ref<HTMLElement>();
const { t } = useI18n();

const props = defineProps(['title', 'description', 'thickBorder', 'required']);
const contentId = `ce-collapsible-content-${useId()}`;
const toggleLabel = computed(() =>
    t(expanded.value ? 'editor.collapse' : 'editor.expand', {
        title: props.title ?? ''
    })
);

const toggle = () => {
    expanded.value = !expanded.value;
};

const toggleFromHeader = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('button, input, select, textarea, a, [role="button"]')) {
        toggle();
    }
};
</script>

<template>
    <div
        class="ce-collapsible"
        :class="{ 'ce-collapsible--open': expanded, 'ce-collapsible--strong': thickBorder }"
        ref="el"
    >
        <div class="ce-collapsible-header" @click="toggleFromHeader">
            <slot name="header" :expanded="expanded" :toggle="toggle" :controls="contentId" :label="toggleLabel">
                <button
                    type="button"
                    :content="toggleLabel"
                    v-tippy="{ trigger: 'mouseenter focus' }"
                    class="ce-collapsible-toggle arrow"
                    :aria-label="toggleLabel"
                    :aria-expanded="expanded"
                    :aria-controls="contentId"
                    @click="toggle"
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
        <div :id="contentId" class="ce-collapsible-content" :hidden="!expanded">
            <div v-if="expanded" class="ce-collapsible-body"><slot></slot></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ce-collapsible {
    margin-top: 8px;
    border: 0;
    border-radius: 5px;
    background: transparent;
    box-shadow: none;
    overflow: visible;
}

.ce-collapsible--strong {
    overflow: hidden;
    border: 1px solid #b8c2cc;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.ce-collapsible-header {
    display: flex;
    min-width: 0;
    min-height: 44px;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 5px;
    background: #f6f8fa;
    cursor: pointer;
    transition:
        background-color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus-within {
        background: #eef2f6;
    }

    &:focus-within {
        box-shadow: inset 0 0 0 2px rgba(38, 55, 74, 0.2);
    }
}

.ce-collapsible--open:not(.ce-collapsible--strong) > .ce-collapsible-header {
    background: #eef2f6;
}

.ce-collapsible--strong > .ce-collapsible-header {
    min-height: 46px;
    padding: 10px 12px;
    border-radius: 0;
    background: #fff;

    &:hover,
    &:focus-within {
        background: #f8fafc;
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
    border-top: 0;
}

.ce-collapsible--strong > .ce-collapsible-content {
    border-top: 1px solid #eef2f6;
}

.ce-collapsible-body {
    margin-left: 0;
    padding: 8px 6px 12px 14px;
}

.ce-collapsible--strong > .ce-collapsible-content > .ce-collapsible-body {
    padding: 12px 12px 14px;
}
</style>
