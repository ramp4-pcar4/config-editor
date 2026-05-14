<template>
    <div class="ramp4-config-editor h-full">
        <div ref="app-size" class="h-full">
            <StartingScreen v-if="!store.initialized && !library" />
            <div v-else class="h-full flex flex-col">
                <div class="flex items-center">
                    <h2 class="h-36 text-3xl font-semibold">{{ t('editor.title') }}</h2>
                    <span class="ml-auto"></span>

                    <button v-if="store.initialized && !library" class="black-bg-button mr-2" @click="openWizard">
                        {{ t('wizard.open') }}
                    </button>

                    <button v-if="!library" class="black-bg-button" @click="createNew">
                        {{ t('editor.new') }}
                    </button>
                </div>

                <div class="main-container flex-grow mt-12 flex">
                    <Navbar class="config-navbar h-full flex-shrink-0" :library="library" />

                    <div class="flex-grow h-full pl-20 overflow-y-auto">
                        <component
                            v-if="store.editingTemplate && editors[store.editingTemplate]"
                            :is="editors[store.editingTemplate]"
                        />
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
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import FixturesEditor from './components/fixtures/fixtures.vue';
import JsonInput from './components/json-input.vue';
import LayersEditor from '@/components/layers/layers.vue';
import MapEditor from '@/components/map/map.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';
import OptionsEditor from '@/components/options.vue';
import Preview from '@/components/preview.vue';

import CustomResizeObserver from './scripts/resize-observer';

import '@/styles.css';
import 'ramp-pcar/dist/ramp.css';
import { useI18n } from 'vue-i18n';
import { onMounted, useTemplateRef, ref } from 'vue';
import { setDefaultProps } from 'vue-tippy';
import { useStore } from '@/store';

const { t } = useI18n();
const store = useStore();
const library = ref(false);

const appSizeContainer = useTemplateRef('app-size');

const editors: { [key: string]: any } = {
    fixtures: FixturesEditor,
    json: JsonInput,
    layers: LayersEditor,
    map: MapEditor,
    options: OptionsEditor,
    panels: PanelsEditor,
    preview: Preview,
    'starting-fixtures': StartingFixturesEditor,
    system: SystemEditor
};

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
});

const createNew = () => {
    store.initialized = false;
    store.editingTemplate = '';
    store.wizardOpen = false;
};

const openWizard = () => {
    store.wizardOpen = true;
};
</script>

<style lang="scss">
$font-list: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;

.ramp4-config-editor {
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

    .config-navbar {
        width: 324px;
    }

    .main-container {
        height: calc(100% - 60px);
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
