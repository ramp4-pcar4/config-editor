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
                    <Navbar class="config-navbar h-full flex-shrink-0" :library="library" @open-preview="openPreview" />

                    <div
                        class="editor-content flex-grow h-full min-w-0"
                        :class="{ 'json-open': store.editingTemplate === 'json' }"
                    >
                        <Preview class="editor-preview" />

                        <div v-if="store.editingTemplate === 'json'" class="json-overlay" @click.self="closeJsonOverlay">
                            <section class="json-drawer" role="dialog" :aria-label="t('navbar.json')">
                                <div class="json-drawer-header">
                                    <button type="button" class="json-drawer-back" :aria-label="t('editor.close')" @click="closeJsonOverlay">
                                        <span aria-hidden="true">&lt;</span>
                                    </button>

                                    <div>
                                        <h3>{{ t('navbar.json') }}</h3>
                                        <p>{{ t('sidebar.review.json.description') }}</p>
                                    </div>

                                    <button type="button" class="json-drawer-close" @click="closeJsonOverlay">
                                        {{ t('editor.close') }}
                                    </button>
                                </div>

                                <JsonInput />
                            </section>
                        </div>
                    </div>
                </div>

                <section
                    v-if="mobilePreviewOpen"
                    class="mobile-preview-sheet"
                    role="dialog"
                    :aria-label="t('navbar.preview')"
                >
                    <div class="mobile-preview-header">
                        <button type="button" class="mobile-preview-back" :aria-label="t('editor.close')" @click="closeMobilePreview">
                            <span aria-hidden="true">&lt;</span>
                        </button>

                        <div>
                            <h3>{{ t('navbar.preview') }}</h3>
                            <p>{{ t('sidebar.review.preview.description') }}</p>
                        </div>
                    </div>

                    <Preview class="mobile-preview-panel" />
                </section>
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
const mobilePreviewOpen = ref(false);

const appSizeContainer = useTemplateRef('app-size');

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
    mobilePreviewOpen.value = false;
};

const openWizard = () => {
    store.wizardOpen = true;
};

const setConfigLanguage = (lang: string) => {
    store.editingLang = lang;
};

const isMobileLayout = () => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
};

const openPreview = () => {
    store.editingTemplate = 'preview';

    if (isMobileLayout()) {
        mobilePreviewOpen.value = true;
    }
};

const closeMobilePreview = () => {
    mobilePreviewOpen.value = false;
};

const closeJsonOverlay = () => {
    store.editingTemplate = 'preview';
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
        --grid-layout-gap: 20px;
        --grid-column-count: 10;
        --grid-item--min-width: min(220px, 100%);
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
            border: 1px solid #b8c2cc;
            border-radius: 4px;
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

        input[type='text'],
        input[type='number'],
        select {
            width: 100%;
            min-height: 36px;
            padding: 7px 9px;
        }

        input[type='checkbox'] {
            width: 16px;
            height: 16px;
            accent-color: var(--editor-primary);
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
        width: 560px;
    }

    .main-container {
        height: calc(100% - 68px);
        background: #fff;
    }

    .editor-content {
        position: relative;
        overflow: hidden;
        padding: 24px 32px;
        background: #fff;
    }

    .editor-preview {
        height: 100%;
    }

    .json-overlay {
        position: absolute;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(17, 24, 39, 0.28);
    }

    .json-drawer {
        display: flex;
        width: min(920px, calc(100% - 32px));
        height: min(760px, calc(100% - 32px));
        min-height: 0;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--editor-border);
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.22);
    }

    .json-drawer-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid var(--editor-border);
        padding: 14px 16px;

        h3,
        p {
            margin: 0;
        }

        h3 {
            color: #111827;
            font-size: 18px;
            font-weight: 700;
            line-height: 24px;
        }

        p {
            margin-top: 3px;
            color: #4b5563;
            font-size: 13px;
            line-height: 18px;
        }
    }

    .json-drawer-back {
        display: none;
    }

    .json-drawer-close {
        flex: 0 0 auto;
        border: 1px solid #c9d3df;
        border-radius: 6px;
        padding: 7px 10px;
        background: #fff;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 700;
        line-height: 16px;
        outline: none;

        &:hover,
        &:focus {
            border-color: var(--editor-primary);
            background: #eef2f6;
        }
    }

    .json-drawer .json-input-panel {
        min-height: 0;
        flex: 1;
        overflow: hidden;
        padding: 14px 16px 16px;
        scrollbar-color: #8c98a5 #eef2f6;
        scrollbar-width: thin;
    }

    .mobile-preview-sheet {
        display: none;
    }

    @media (max-width: 900px) {
        .editor-toolbar {
            min-height: auto;
            flex-wrap: wrap;
            padding: 12px 14px;

            h2 {
                width: 100%;
                font-size: 22px;
                line-height: 28px;
            }

            .ml-auto {
                display: none;
            }
        }

        .main-container {
            display: block;
            flex: 1 1 auto;
            height: auto;
            min-height: 0;
        }

        .config-navbar {
            width: 100%;
            height: 100%;
        }

        .editor-content {
            display: none;
        }

        .editor-content.json-open {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: block;
            height: 100%;
            padding: 0;
            background: transparent;
        }

        .editor-content.json-open .editor-preview {
            display: none;
        }

        .editor-content.json-open .json-overlay {
            position: fixed;
            padding: 0;
        }

        .editor-content.json-open .json-drawer {
            width: 100%;
            height: 100%;
            min-height: 0;
            border: 0;
            border-radius: 0;
            box-shadow: none;
        }

        .json-drawer-header {
            position: sticky;
            top: 0;
            z-index: 2;
            align-items: center;
            justify-content: flex-start;
            flex: 0 0 auto;
            gap: 12px;
            padding: 12px 14px;
            background: #fff;

            h3 {
                font-size: 17px;
                line-height: 22px;
            }
        }

        .json-drawer-back {
            display: inline-flex;
            width: 42px;
            height: 38px;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--editor-primary);
            border-radius: 4px;
            background: var(--editor-primary);
            color: #fff;
            font-size: 22px;
            font-weight: 700;
            line-height: 1;
            outline: none;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

            &:hover,
            &:focus {
                border-color: var(--editor-primary-hover);
                background: var(--editor-primary-hover);
            }
        }

        .json-drawer-close {
            display: none;
        }

        .json-drawer .json-input-panel {
            flex: 1 1 0;
            overflow: hidden;
            padding: 12px;
        }

        .mobile-preview-sheet {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            min-height: 0;
            flex-direction: column;
            background: #fff;
        }

        .mobile-preview-header {
            display: flex;
            flex: 0 0 auto;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid var(--editor-border);
            padding: 12px 14px;
            background: #fff;

            h3,
            p {
                margin: 0;
            }

            h3 {
                color: #111827;
                font-size: 17px;
                font-weight: 700;
                line-height: 22px;
            }

            p {
                margin-top: 3px;
                color: #4b5563;
                font-size: 13px;
                line-height: 18px;
            }
        }

        .mobile-preview-back {
            display: inline-flex;
            width: 42px;
            height: 38px;
            flex: 0 0 auto;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--editor-primary);
            border-radius: 4px;
            background: var(--editor-primary);
            color: #fff;
            font-size: 22px;
            font-weight: 700;
            line-height: 1;
            outline: none;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

            &:hover,
            &:focus {
                border-color: var(--editor-primary-hover);
                background: var(--editor-primary-hover);
            }
        }

        .mobile-preview-panel {
            min-height: 0;
            flex: 1;
            padding: 12px;
            background: #f5f6f7;

            .preview-note {
                margin-top: 8px;
                font-size: 12px;
                line-height: 16px;
            }
        }
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
