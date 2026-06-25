<template>
    <div class="ramp4-config-editor h-full">
        <div ref="app-size" class="h-full">
            <StartingScreen v-if="!store.initialized && !library" />
            <div v-else class="editor-layout h-full flex flex-col">
                <div class="editor-toolbar flex items-center">
                    <h2 class="m-0 text-3xl font-semibold">{{ t('editor.title') }}</h2>
                    <span class="ml-auto"></span>

                    <div class="config-language-toggle" role="group" :aria-label="t('editor.configLanguage')">
                        <button
                            v-for="option in configLanguageOptions"
                            :key="option.id"
                            type="button"
                            :class="{ active: store.editingLang === option.id }"
                            @click="setConfigLanguage(option.id)"
                        >
                            <span class="config-language-full">{{ option.label }}</span>
                            <span class="config-language-short">{{ option.shortLabel }}</span>
                        </button>
                    </div>

                    <button v-if="store.initialized && !library" class="black-bg-button" @click="openWizard">
                        {{ t('wizard.open') }}
                    </button>

                    <button v-if="!library" class="black-bg-button" @click="createNew">
                        {{ t('editor.new') }}
                    </button>
                </div>

                <div class="main-container flex-grow flex min-h-0">
                    <Navbar class="config-navbar h-full flex-shrink-0" :library="library" />

                    <div class="editor-content flex-grow h-full min-w-0 overflow-y-auto">
                        <Preview v-if="sidebarEditorTemplates.includes(store.editingTemplate)" />
                        <component v-else-if="store.editingTemplate && editors[store.editingTemplate]" :is="editors[store.editingTemplate]" />
                        <div v-else class="pt-4 text-sm text-gray-600">{{ t('editor.startEditing') }}</div>
                    </div>
                </div>
            </div>

            <WizardModal v-model:open="store.wizardOpen" @confirm="() => store.wizardOpen = false" @cancel="() => store.wizardOpen = false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StartingScreen from './components/starting-screen.vue';
import Navbar from './components/navbar.vue';
import WizardModal from './components/wizard/wizard-modal.vue';
import JsonInput from './components/json-input.vue';
import Preview from '@/components/preview.vue';

import CustomResizeObserver from './scripts/resize-observer';

import '@/styles.css';
import 'ramp-pcar/dist/ramp.css';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, useTemplateRef, ref } from 'vue';
import { setDefaultProps } from 'vue-tippy';
import { useStore } from '@/store';

const { t } = useI18n();
const store = useStore();
const library = ref(false);

const appSizeContainer = useTemplateRef('app-size');
const sidebarEditorTemplates = ['fixtures', 'layers', 'map', 'options', 'panels', 'starting-fixtures', 'system'];

const editors: { [key: string]: any } = {
    json: JsonInput,
    preview: Preview
};

const configLanguageLabels: Record<string, { label: string; shortLabel: string }> = {
    en: { label: 'English', shortLabel: 'EN' },
    fr: { label: 'Français', shortLabel: 'FR' }
};

const configLanguageOptions = computed(() =>
    Object.keys(store.configs).map(lang => ({
        id: lang,
        label: configLanguageLabels[lang]?.label ?? lang.toUpperCase(),
        shortLabel: configLanguageLabels[lang]?.shortLabel ?? lang.toUpperCase()
    }))
);

onMounted(() => {
    setDefaultProps({
        aria: {
            content: 'labelledby'
        },
        theme: 'ramp4',
        animation: 'scale',
        inertia: true,
        trigger: 'mouseenter manual focus',
        touch: ['hold', 200],
        delay: [200, 0],
        offset: [0, 5]
    });

    // Puts `ce-xs` `ce-sm` `ce-md` `ce-lg` classes on the container, used instead of window sizes because this app can live inside other pages/apps
    // `ce` (config-editor) prefix is to prevent styles bleeding into nest RAMP instances. sm:m-20 would apply to the RAMP component based on the editors size instead.
    const ro = new CustomResizeObserver();
    ro.observe(appSizeContainer.value!);

    // Used to turn off certain UI elements in library mode.
    if (import.meta.env.MODE.includes('lib')) {
        library.value = true;
    }

    if (!store.editingLang && configLanguageOptions.value.length) {
        store.editingLang = configLanguageOptions.value[0].id;
    }
});

const createNew = () => {
    store.initialized = false;
    store.editingTemplate = '';
    store.wizardOpen = false;
};

const openWizard = () => {
    store.wizardOpen = true;
};

const setConfigLanguage = (lang: string) => {
    store.editingLang = lang;
};
</script>

<style lang="scss">
$font-list: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;

.ramp4-config-editor {
    --editor-primary: #26374a;
    --editor-primary-hover: #1f2d3d;
    --editor-border: #d8dee5;
    --editor-surface: #f5f6f7;

    height: 100%;
    width: 100%;
    
    font-family: $font-list;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.5;
    }

    .input-table {
        --grid-layout-gap: 100px;
        --grid-column-count: 10;
        --grid-item--min-width: min(250px, 100%);
        --gap-count: calc(var(--grid-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
        );
        column-gap: var(--grid-layout-gap);
        row-gap: 16px;
    
        select,
        input {
            @apply border border-black text-sm;
        }

        input[type='text'],
        input[type='number'],
        select {
            width: 100%;
            padding: 4px;
        }
    }

    .required:after {
        content: ' *';
        color: red;
    }

    .editor-layout {
        min-height: 0;
        background: var(--editor-surface);
    }

    .editor-toolbar {
        gap: 8px;
        min-height: 68px;
        padding: 0 24px;
        border-bottom: 1px solid var(--editor-border);
        background: #fff;
    }

    .config-language-toggle {
        display: flex;
        align-items: center;
        gap: 0;
        margin-right: 8px;
        border: 1px solid var(--editor-border);
        border-radius: 4px;
        overflow: hidden;

        .config-language-short {
            display: none;
        }

        button {
            min-height: 36px;
            padding: 8px 10px;
            border-left: 1px solid var(--editor-border);
            background: #fff;
            color: #1f2937;
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;
            outline: none;

            &:hover,
            &:focus {
                background: #eef2f6;
            }

            &.active {
                background: var(--editor-primary);
                color: #fff;
            }
        }
    }

    .editor-toolbar {
        .black-bg-button {
            min-height: 38px;
            padding: 8px 12px;
            border-color: var(--editor-primary);
            border-radius: 4px;
            background: var(--editor-primary);
            color: #fff;
            font-size: 13px;
            font-weight: 600;
            line-height: 18px;

            &:hover,
            &:focus {
                border-color: var(--editor-primary-hover);
                background: var(--editor-primary-hover);
                color: #fff;
            }
        }
    }

    @media (max-width: 760px) {
        .config-language-toggle {
            .config-language-full {
                display: none;
            }

            .config-language-short {
                display: inline;
            }
        }
    }

    .config-navbar {
        width: 520px;
    }

    .main-container {
        height: calc(100% - 68px);
    }

    .editor-content {
        padding: 24px 32px;
        background: #fff;
    }

    .black-bg-button {
        @apply bg-black text-white p-8 rounded-[4px];
        outline: none;
        border-width: 1px;
        border-color: #000;
        &:hover,
        &:focus {
            background-color: rgba(209, 213, 219, 1);
            color: black;
        }
    }

    .white-bg-button {
        @apply  p-8 rounded-[4px];
        outline: none;
        border-width: 1px;
        border-color: #000;

        &:hover,
        &:focus {
            background-color: rgba(209, 213, 219, 1);
            color: black;
        }
    }
}
</style>
