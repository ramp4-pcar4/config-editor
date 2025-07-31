<script setup lang="ts">
// friendly halper for collapsible sections. boxes with arrow controls to show guts or hide/collapse them

import { ref } from 'vue';
import InputHeader from './input-header.vue';
import { useI18n } from 'vue-i18n';

const expanded = ref<boolean>(false);
const el = ref<HTMLElement>();
const { t } = useI18n();

defineProps(['title', 'description', 'thickBorder', 'required']);
</script>

<template>
    <div class="mt-4 p-3 border-black rounded-md" :class="{ 'border-2': thickBorder, border: !thickBorder }" ref="el">
        <div
            class="flex items-center cursor-pointer"
            @click="
                () => {
                    expanded = !expanded;
                    if (expanded) {
                        el?.querySelector('.arrow')?.classList.add('rotate-180');
                    } else {
                        el?.querySelector('.arrow')?.classList.remove('rotate-180');
                    }
                }
            "
        >
            <slot name="header">
                <button
                    :content="t('editor.expand')"
                    v-tippy="{ trigger: 'mouseenter focus' }"
                    class="mr-1 sm:mr-3"
                    :aria-label="t('editor.expand')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        :class="{ 'rotate-180': expanded }"
                    >
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </button>
                <InputHeader :title="title" :description="description" type="header" :required="required" />
            </slot>
        </div>
        <div v-if="expanded">
            <hr class="border-solid border-t border-gray-300 my-2" />
            <div class="mt-4"><slot></slot></div>
        </div>
    </div>
</template>
