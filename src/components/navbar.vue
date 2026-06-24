<template>
    <div class="navbar-wrapper flex h-full">
        <nav class="section-rail flex flex-col" :aria-label="t('sidebar.sections')">
            <button
                v-for="item in railItems"
                :key="item.id"
                type="button"
                class="rail-button"
                :class="{ active: activeGroup === item.id || groupHasActiveTemplate(item.id) }"
                @click="activeGroup = item.id"
            >
                <span>{{ item.title }}</span>
            </button>

            <div class="rail-actions">
                <button
                    type="button"
                    class="rail-action"
                    :class="{ active: store.editingTemplate === 'preview' }"
                    @click="setTemplate('preview')"
                >
                    {{ t('navbar.preview') }}
                </button>

                <button
                    v-if="!props.library"
                    type="button"
                    class="rail-action"
                    :class="{ active: store.editingTemplate === 'json' }"
                    @click="setTemplate('json')"
                >
                    {{ t('navbar.json') }}
                </button>

                <button v-if="!props.library" type="button" class="rail-action" @click="download()">
                    {{ t('navbar.download') }}
                </button>
            </div>
        </nav>

        <aside class="sidebar-panel flex min-w-0 flex-1 flex-col">
            <div class="sidebar-header">
                <h3>{{ activeRailItem.title }}</h3>
                <p>{{ activeRailItem.description }}</p>
            </div>

            <div class="sidebar-content">
                <template v-if="activeGroup === 'defaults'">
                    <button
                        type="button"
                        class="sidebar-link"
                        :class="{ active: store.editingTemplate === 'starting-fixtures' }"
                        @click="setTemplate('starting-fixtures')"
                    >
                        {{ t('navbar.startingFixtures') }}
                    </button>

                    <button
                        type="button"
                        class="sidebar-link"
                        :class="{ active: store.editingTemplate === 'options' }"
                        @click="setTemplate('options')"
                    >
                        {{ t('navbar.options') }}
                    </button>
                </template>

                <template v-else-if="activeGroup === 'layers'">
                    <div class="sidebar-section-label">{{ t('navbar.configs') }}</div>
                    <button
                        type="button"
                        class="sidebar-link"
                        :class="{ active: store.editingTemplate === 'layers' }"
                        @click="setTemplate('layers')"
                    >
                        {{ t('navbar.layers') }}
                    </button>
                </template>

                <template v-else-if="activeGroup === 'basemap'">
                    <div class="sidebar-section-label">{{ t('navbar.configs') }}</div>
                    <button
                        type="button"
                        class="sidebar-link"
                        :class="{ active: store.editingTemplate === 'map' }"
                        @click="setTemplate('map')"
                    >
                        {{ t('navbar.map') }}
                    </button>
                </template>

                <template v-else-if="activeGroup === 'startView'">
                    <div class="sidebar-section-label">{{ t('navbar.configs') }}</div>
                    <button
                        v-for="section in startViewSections"
                        :key="section"
                        type="button"
                        class="sidebar-link"
                        :class="{ active: store.editingTemplate === section }"
                        @click="setTemplate(section)"
                    >
                        {{ t(`navbar.${section}`) }}
                    </button>
                </template>

                <template v-else>
                    <div class="sidebar-empty">
                        {{ t('sidebar.review.description') }}
                    </div>
                </template>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
// table of contents + buttons on the left of the app

import { useStore } from '@/store';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    library: {
        type: Boolean,
        required: true
    }
});

const store = useStore();
const { t } = useI18n();

type SidebarGroup = 'defaults' | 'layers' | 'basemap' | 'startView' | 'review';

const activeGroup = ref<SidebarGroup>('defaults');
const startViewSections = ['fixtures', 'panels', 'system'];

const railItems = computed(() => [
    {
        id: 'defaults' as SidebarGroup,
        title: t('sidebar.defaults'),
        description: t('sidebar.defaults.description')
    },
    {
        id: 'layers' as SidebarGroup,
        title: t('sidebar.layers'),
        description: t('sidebar.layers.description')
    },
    {
        id: 'basemap' as SidebarGroup,
        title: t('sidebar.basemap'),
        description: t('sidebar.basemap.description')
    },
    {
        id: 'startView' as SidebarGroup,
        title: t('sidebar.startView'),
        description: t('sidebar.startView.description')
    },
    {
        id: 'review' as SidebarGroup,
        title: t('sidebar.review'),
        description: t('sidebar.review.description')
    }
]);

const activeRailItem = computed(() => railItems.value.find(item => item.id === activeGroup.value) ?? railItems.value[0]);
const configTemplates = ['layers', 'map', 'fixtures', 'panels', 'system'];

const groupTemplates: Record<SidebarGroup, string[]> = {
    defaults: ['starting-fixtures', 'options'],
    layers: ['layers'],
    basemap: ['map'],
    startView: startViewSections,
    review: ['preview', 'json']
};

const setTemplate = (template: string, lang?: string) => {
    store.editingTemplate = template;
    if (lang) {
        store.editingLang = lang;
    } else if (configTemplates.includes(template) && !store.editingLang) {
        store.editingLang = Object.keys(store.configs)[0] ?? '';
    }
};

const groupHasActiveTemplate = (group: SidebarGroup) => groupTemplates[group].includes(store.editingTemplate);

const download = () => {
    const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify({ startingFixtures: store.startingFixtures, configs: store.configs }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.hidden = true;
    downloadAnchorNode.setAttribute('download', 'ramp_config.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};
</script>

<style lang="scss" scoped>
.navbar-wrapper {
    border-right: 1px solid var(--editor-border);
    background: #fff;
}

.section-rail {
    width: 148px;
    flex: 0 0 148px;
    gap: 4px;
    padding: 12px 8px;
    background: var(--editor-primary);
}

.rail-button {
    display: flex;
    min-height: 48px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    outline: none;

    &:hover,
    &:focus {
        background: var(--editor-primary-hover);
    }

    &.active {
        background: #fff;
        color: var(--editor-primary);
    }
}

.rail-actions {
    display: grid;
    gap: 6px;
    margin-top: auto;
    padding-top: 12px;
}

.rail-action {
    min-height: 38px;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 8px 10px;
    background: transparent;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    text-align: center;
    outline: none;

    &:hover,
    &:focus,
    &.active {
        background: #fff;
        color: var(--editor-primary);
    }
}

.sidebar-panel {
    background: #fff;
}

.sidebar-header {
    border-bottom: 1px solid var(--editor-border);
    padding: 18px 20px;

    h3 {
        margin: 0;
        color: #111827;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
    }

    p {
        margin: 6px 0 0;
        color: #4b5563;
        font-size: 13px;
        line-height: 18px;
    }
}

.sidebar-content {
    display: grid;
    gap: 8px;
    padding: 14px;
}

.sidebar-section-label {
    margin: 4px 6px;
    color: #6b7280;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.sidebar-empty {
    border: 1px solid var(--editor-border);
    border-radius: 4px;
    padding: 14px;
    color: #4b5563;
    font-size: 14px;
    line-height: 20px;
}

.sidebar-link,
.sidebar-action {
    display: flex;
    min-height: 42px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 10px 12px;
    color: #1f2937;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    outline: none;

    span {
        color: #6b7280;
        font-size: 12px;
        text-transform: uppercase;
    }

    &:hover,
    &:focus {
        border-color: #c9d3df;
        background: #f3f6f9;
    }

    &.active {
        border-color: var(--editor-primary);
        background: #eef2f6;
        color: #111827;
        font-weight: 600;
    }
}

.sidebar-action {
    justify-content: center;
    border-color: var(--editor-primary);
    background: var(--editor-primary);
    color: #fff;
    font-weight: 600;

    &:hover,
    &:focus {
        background: var(--editor-primary-hover);
        color: #fff;
    }
}
</style>
