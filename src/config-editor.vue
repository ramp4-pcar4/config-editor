<template>
    <div class="ramp4-config-editor h-full">
        <StartingScreen v-if="!store.initialized && !library" />
        <div v-else class="h-full flex flex-col">
            <div class="flex items-center">
                <h2 class="h-9 text-3xl font-semibold">{{ t('editor.title') }}</h2>
                <span class="ml-auto"></span>
                <button
                    v-if="!library"
                    class="black-bg-button"
                    @click="() => createNew()"
                >
                    {{ t('editor.new') }}
                </button>
            </div>
            <div class="main-container flex-grow mt-3 flex">
                <Navbar class="config-navbar h-full flex-shrink-0" :library="library" />
                <div class="flex-grow h-full pl-5 overflow-y-auto">
                    <div v-if="store.editingTemplate === ''">
                        <Wizard />
                        <!-- {{ t('editor.startEditing') }} -->
                    </div>
                    <component v-else :is="editors[store.editingTemplate]"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// this is the overall editor

import StartingScreen from './components/starting-screen.vue';
import Navbar from './components/navbar.vue';
import Wizard from './components/wizard/wizard.vue';
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import FixturesEditor from './components/fixtures/fixtures.vue';
import JsonInput from './components/json-input.vue';
import LayersEditor from '@/components/layers/layers.vue';
import MapEditor from '@/components/map/map.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';
import OptionsEditor from '@/components/options.vue';
import Preview from '@/components/preview.vue';

import '@/styles.css';
import 'ramp-pcar/dist/ramp.css';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { setDefaultProps } from 'vue-tippy';
import { useStore } from '@/store';

const { t } = useI18n();
const store = useStore();
let library: boolean = false;

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

const createNew = () => {
    store.initialized = false;
    store.editingTemplate = '';
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

    if (import.meta.env.MODE.includes('lib')) {
        library = true;
    }
});
</script>

<style lang="scss">
$font-list: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji;

.ramp4-config-editor {
    height: 100%;
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
        /**
   * User input values.
   */
        --grid-layout-gap: 100px;
        --grid-column-count: 10;
        --grid-item--min-width: min(250px, 100%);

        /**
   * Calculated values.
   */
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
            @apply block border border-black text-sm;
        }

        input[type='text'],
        input[type='number'],
        select {
            @apply w-full p-2;
        }
    }

    .required:after {
        content: ' *';
        color: red;
    }

    .ramp-styles {
        .p-5 {
            padding: 5px;
        }
    }

    .config-navbar {
        width: 324px;
    }

    .main-container {
        height: calc(100% - 40px);
    }

    .black-bg-button {
        @apply bg-black text-white p-2 rounded-md;
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
