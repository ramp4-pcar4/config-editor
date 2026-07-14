<template>
    <div class="navbar-wrapper flex h-full" :class="{ 'mobile-sidebar-open': mobileSidebarOpen }">
        <button
            type="button"
            class="mobile-sidebar-toggle"
            :aria-label="t('sidebar.sections')"
            :aria-expanded="mobileSidebarOpen"
            @click="mobileSidebarOpen = !mobileSidebarOpen"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>

        <div class="mobile-sidebar-scrim" @click="mobileSidebarOpen = false"></div>

        <nav class="section-rail flex flex-col" :aria-label="t('sidebar.sections')">
            <div class="mobile-rail-header">
                <strong>{{ t('sidebar.sections') }}</strong>
                <button type="button" :aria-label="t('editor.close')" @click="mobileSidebarOpen = false">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <button
                v-for="item in railItems"
                :key="item.id"
                type="button"
                class="rail-button"
                :class="{ active: activeGroup === item.id }"
                :aria-current="activeGroup === item.id ? 'page' : undefined"
                @click="setActiveGroup(item.id)"
            >
                <span>{{ item.title }}</span>
            </button>

            <button type="button" class="mobile-preview-action" @click="openPreview">
                {{ t('navbar.preview') }}
            </button>
        </nav>

        <aside class="sidebar-panel flex min-w-0 flex-1 flex-col">
            <div v-if="!sidebarDetailOpen" class="sidebar-header">
                <h3>{{ activeRailItem.title }}</h3>
                <p>{{ activeRailItem.description }}</p>

                <div v-if="activeRailItem.summary.length" class="sidebar-summary">
                    <span v-for="summary in activeRailItem.summary" :key="summary.label" class="summary-chip">
                        <span>{{ summary.label }}</span>
                        <strong>{{ summary.value }}</strong>
                    </span>
                </div>
            </div>

            <div class="sidebar-content">
                <template v-if="sidebarDetailOpen">
                    <div class="sidebar-detail-header">
                        <button type="button" class="sidebar-back" @click="sidebarDetailOpen = ''">
                            <span aria-hidden="true">&lt;</span>
                            {{ activeRailItem.title }}
                        </button>

                        <h3 class="sidebar-detail-title">{{ detailTitle }}</h3>
                    </div>

                    <component v-if="activeDetailComponent" :is="activeDetailComponent" compact />
                </template>

                <template v-else-if="activeGroup === 'setup'">
                    <button
                        v-for="item in setupItems"
                        :key="item.id"
                        type="button"
                        class="sidebar-card-link"
                        :class="{ active: store.editingTemplate === item.id }"
                        @click="openDetail(item.id)"
                    >
                        <span>
                            <strong>{{ item.title }}</strong>
                            <small>{{ item.description }}</small>
                        </span>
                        <em>{{ item.meta }}</em>
                    </button>
                </template>

                <template v-else-if="activeGroup === 'map'">
                    <MapEditor compact />
                </template>

                <template v-else-if="activeGroup === 'layers'">
                    <LayersEditor compact />
                </template>

                <template v-else-if="activeGroup === 'tools'">
                    <FixturesEditor compact />
                </template>

                <template v-else-if="activeGroup === 'layout'">
                    <PanelsEditor compact />
                </template>

                <template v-else-if="activeGroup === 'advanced'">
                    <button
                        v-for="item in advancedItems"
                        :key="item.id"
                        type="button"
                        class="sidebar-card-link"
                        :class="{ active: store.editingTemplate === item.id }"
                        @click="openDetail(item.id)"
                    >
                        <span>
                            <strong>{{ item.title }}</strong>
                            <small>{{ item.description }}</small>
                        </span>
                        <em>{{ item.meta }}</em>
                    </button>
                </template>

                <template v-else-if="activeGroup === 'review'">
                    <button type="button" class="review-card" @click="openPreview">
                        <span>
                            <strong>{{ t('navbar.preview') }}</strong>
                            <small>{{ t('sidebar.review.preview.description') }}</small>
                        </span>
                        <em>{{ selectedBasemapName }}</em>
                    </button>

                    <button v-if="!props.library" type="button" class="review-card" @click="setReviewTemplate('json')">
                        <span>
                            <strong>{{ t('navbar.json') }}</strong>
                            <small>{{ t('sidebar.review.json.description') }}</small>
                        </span>
                        <em>{{ activeLanguageLabel }}</em>
                    </button>

                    <button v-if="!props.library" type="button" class="review-card" @click="download()">
                        <span>
                            <strong>{{ t('navbar.download') }}</strong>
                            <small>{{ t('sidebar.review.download.description') }}</small>
                        </span>
                        <em>{{ t('sidebar.meta.json') }}</em>
                    </button>
                </template>

                <template v-else>
                    <div class="sidebar-empty">{{ activeRailItem.description }}</div>
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
import StartingFixturesEditor from '@/components/starting-fixtures.vue';
import FixturesEditor from '@/components/fixtures/fixtures.vue';
import LayersEditor from '@/components/layers/layers.vue';
import MapEditor from '@/components/map/map.vue';
import OptionsEditor from '@/components/options.vue';
import PanelsEditor from '@/components/panels.vue';
import SystemEditor from '@/components/system.vue';

const props = defineProps({
    library: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits<{
    'open-preview': [];
}>();

const store = useStore();
const { t } = useI18n();

type SidebarGroup = 'setup' | 'map' | 'layers' | 'tools' | 'layout' | 'advanced' | 'review';
type SidebarSummary = {
    label: string;
    value: string;
};

const activeGroup = ref<SidebarGroup>('setup');
const sidebarDetailOpen = ref<string>('');
const mobileSidebarOpen = ref(false);
const configTemplates = ['layers', 'map', 'fixtures', 'panels', 'system'];

const layerCount = computed(() => store.elc?.layers?.length ?? 0);
const openPanelCount = computed(() => store.elc?.panels?.open?.length ?? 0);
const availableBasemaps = computed(() => store.elc?.map?.basemaps ?? []);
const basemapCount = computed(() => availableBasemaps.value.length);
const selectedBasemapName = computed(() => {
    const selectedId = store.elc?.map?.initialBasemapId;
    const basemap = availableBasemaps.value.find((bm: any) => bm.id === selectedId);
    return basemap?.name ?? selectedId ?? t('system.sidebar.notSet');
});
const startupFixturesMeta = computed(() => {
    const count = store.startingFixtures?.length;
    return typeof count === 'number' ? t('sidebar.meta.tools', { count }) : t('sidebar.meta.default');
});
const startupModeMeta = computed(() => {
    return store.options.startRequired ? t('sidebar.meta.manualStart') : t('sidebar.meta.autoStart');
});
const configuredFixtureCount = computed(() => {
    return Object.values(store.elc?.fixtures ?? {}).filter(value => value !== undefined).length;
});
const activeLanguageLabel = computed(() => store.editingLang.toUpperCase());

const railItems = computed(() => [
    {
        id: 'setup' as SidebarGroup,
        title: t('sidebar.setup'),
        description: t('sidebar.setup.description'),
        summary: [
            {
                label: t('sidebar.summary.mode'),
                value: startupModeMeta.value
            },
            {
                label: t('sidebar.summary.startupTools'),
                value: startupFixturesMeta.value
            }
        ] as SidebarSummary[]
    },
    {
        id: 'map' as SidebarGroup,
        title: t('sidebar.map'),
        description: t('sidebar.map.description'),
        summary: [
            {
                label: t('sidebar.summary.basemap'),
                value: selectedBasemapName.value
            }
        ] as SidebarSummary[]
    },
    {
        id: 'layers' as SidebarGroup,
        title: t('sidebar.layers'),
        description: t('sidebar.layers.description'),
        summary: [
            {
                label: t('sidebar.summary.layers'),
                value: t('sidebar.meta.layers', { count: layerCount.value })
            }
        ] as SidebarSummary[]
    },
    {
        id: 'tools' as SidebarGroup,
        title: t('sidebar.tools'),
        description: t('sidebar.tools.description'),
        summary: [
            {
                label: t('sidebar.summary.tools'),
                value: t('sidebar.meta.tools', { count: configuredFixtureCount.value })
            }
        ] as SidebarSummary[]
    },
    {
        id: 'layout' as SidebarGroup,
        title: t('sidebar.layout'),
        description: t('sidebar.layout.description'),
        summary: [
            {
                label: t('sidebar.summary.panels'),
                value: t('sidebar.meta.panels', { count: openPanelCount.value })
            }
        ] as SidebarSummary[]
    },
    {
        id: 'advanced' as SidebarGroup,
        title: t('sidebar.advanced'),
        description: t('sidebar.advanced.description'),
        summary: [
            {
                label: t('sidebar.summary.config'),
                value: activeLanguageLabel.value
            }
        ] as SidebarSummary[]
    },
    {
        id: 'review' as SidebarGroup,
        title: t('sidebar.reviewExport'),
        description: t('sidebar.reviewExport.description'),
        summary: [
            {
                label: t('sidebar.summary.ready'),
                value: t('sidebar.meta.preview')
            }
        ] as SidebarSummary[]
    }
]);

const activeRailItem = computed(() => railItems.value.find(item => item.id === activeGroup.value) ?? railItems.value[0]);

const setupItems = computed(() => [
    {
        id: 'starting-fixtures',
        title: t('sidebar.setup.startingFixtures.title'),
        description: t('sidebar.setup.startingFixtures.description'),
        meta: startupFixturesMeta.value
    },
    {
        id: 'options',
        title: t('sidebar.setup.options.title'),
        description: t('sidebar.setup.options.description'),
        meta: startupModeMeta.value
    }
]);

const advancedItems = computed(() => [
    {
        id: 'system',
        title: t('sidebar.advanced.system.title'),
        description: t('sidebar.advanced.system.description'),
        meta: store.elc?.system?.proxyUrl ? t('sidebar.meta.proxy') : t('system.sidebar.default')
    },
    {
        id: 'map',
        title: t('sidebar.advanced.map.title'),
        description: t('sidebar.advanced.map.description'),
        meta: t('sidebar.meta.basemaps', { count: basemapCount.value })
    }
]);

const detailEditors: Record<string, any> = {
    fixtures: FixturesEditor,
    layers: LayersEditor,
    map: MapEditor,
    options: OptionsEditor,
    panels: PanelsEditor,
    'starting-fixtures': StartingFixturesEditor,
    system: SystemEditor
};

const activeDetailComponent = computed(() => detailEditors[sidebarDetailOpen.value]);
const detailTitle = computed(() => {
    if (sidebarDetailOpen.value === 'starting-fixtures') {
        return t('navbar.startingFixtures');
    }

    return t(`navbar.${sidebarDetailOpen.value}`);
});

const setTemplate = (template: string, lang?: string) => {
    store.editingTemplate = template;
    if (lang) {
        store.editingLang = lang;
    } else if (configTemplates.includes(template) && !store.editingLang) {
        store.editingLang = Object.keys(store.configs)[0] ?? '';
    }
};

const openDetail = (template: string) => {
    setTemplate(template);
    sidebarDetailOpen.value = template;
};

const setActiveGroup = (group: SidebarGroup) => {
    activeGroup.value = group;
    sidebarDetailOpen.value = '';
    mobileSidebarOpen.value = false;

    if (group === 'map') {
        setTemplate('map');
    } else if (group === 'layers') {
        setTemplate('layers');
    } else if (group === 'tools') {
        setTemplate('fixtures');
    } else if (group === 'layout') {
        setTemplate('panels');
    } else if (group === 'advanced') {
        setTemplate('system');
    }
};

const setReviewTemplate = (template: string) => {
    setActiveGroup('review');
    setTemplate(template);
};

const openPreview = () => {
    setReviewTemplate('preview');
    emit('open-preview');
};

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

.mobile-sidebar-toggle,
.mobile-sidebar-scrim,
.mobile-rail-header,
.mobile-preview-action {
    display: none;
}

.section-rail {
    width: 152px;
    flex: 0 0 152px;
    gap: 3px;
    padding: 12px;
    background: var(--editor-primary);
}

.rail-button {
    position: relative;
    display: flex;
    min-height: 48px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    outline: none;
    transition:
        background-color 120ms ease,
        color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus {
        background: var(--editor-primary-hover);
    }

    &.active {
        background: #34485f;
        color: #fff;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

        &::before {
            position: absolute;
            top: 12px;
            bottom: 12px;
            left: -6px;
            width: 3px;
            border-radius: 999px;
            background: #fff;
            content: '';
        }
    }
}

.sidebar-panel {
    min-height: 0;
    background: #fff;
}

.sidebar-header {
    border-bottom: 1px solid var(--editor-border);
    padding: 20px 20px 16px;

    h3 {
        margin: 0;
        color: #111827;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
    }

    p {
        margin: 4px 0 0;
        color: #4b5563;
        font-size: 13px;
        line-height: 18px;
    }
}

.sidebar-summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
}

.summary-chip {
    display: inline-flex;
    max-width: 100%;
    align-items: center;
    gap: 6px;
    border: 1px solid #d8dee5;
    border-radius: 999px;
    padding: 4px 9px;
    background: #f8fafc;
    box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);

    span {
        color: #6b7280;
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        text-transform: uppercase;
    }

    strong {
        min-width: 0;
        overflow: hidden;
        color: #111827;
        font-size: 12px;
        line-height: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.sidebar-content {
    display: grid;
    flex: 1;
    gap: 10px;
    min-height: 0;
    align-content: start;
    overflow-y: auto;
    padding: 16px;
    scrollbar-color: #9ca3af transparent;
}

.sidebar-empty {
    border: 1px solid var(--editor-border);
    border-radius: 4px;
    padding: 14px;
    color: #4b5563;
    font-size: 14px;
    line-height: 20px;
}

.sidebar-detail-header {
    position: sticky;
    top: -16px;
    z-index: 2;
    display: grid;
    gap: 6px;
    margin: -16px -16px 2px;
    border-bottom: 1px solid #eef2f6;
    padding: 12px 16px 12px;
    background: #fff;
}

.sidebar-back,
.sidebar-content :deep(.map-section-back),
.sidebar-content :deep(.fixtures-back),
.sidebar-content :deep(.layers-back),
.sidebar-content :deep(.panels-back),
.sidebar-content :deep(.system-back) {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 999px;
    padding: 5px 9px;
    color: var(--editor-primary);
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    outline: none;
    transition:
        background-color 120ms ease,
        color 120ms ease;

    span {
        font-size: 20px;
        line-height: 16px;
    }

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.sidebar-detail-title {
    margin: 0;
    color: #111827;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
}

.sidebar-content :deep(.input-table) {
    --grid-layout-gap: 12px;
    --grid-column-count: 1;

    row-gap: 12px;
}

.review-card,
.sidebar-card-link,
.sidebar-content :deep(.map-section-card),
.sidebar-content :deep(.map-disclosure),
.sidebar-content :deep(.fixture-card),
.sidebar-content :deep(.fixtures-disclosure),
.sidebar-content :deep(.layers-card),
.sidebar-content :deep(.panels-card),
.sidebar-content :deep(.system-card) {
    position: relative;
    display: flex;
    min-height: 72px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid var(--editor-border);
    border-radius: 6px;
    padding: 12px;
    background: #fff;
    color: #111827;
    text-align: left;
    outline: none;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    transition:
        border-color 120ms ease,
        background-color 120ms ease,
        box-shadow 120ms ease,
        transform 120ms ease;

    strong,
    small,
    em {
        display: block;
    }

    strong {
        font-size: 14px;
        line-height: 18px;
    }

    small {
        margin-top: 4px;
        color: #6b7280;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }

    em {
        flex: 0 0 auto;
        max-width: 120px;
        overflow: hidden;
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 4px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        font-weight: 700;
        font-style: normal;
        line-height: 14px;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover,
    &:focus {
        border-color: var(--editor-primary);
        background: #f3f6f9;
        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
    }

    &.active {
        border-color: var(--editor-primary);
        background: #eef2f6;

        em {
            border-color: #b7c6d6;
            background: #fff;
        }
    }
}

.sidebar-content :deep(.layers-card.primary) {
    border-color: var(--editor-primary);
    background: var(--editor-primary);
    color: #fff;
    box-shadow: 0 6px 14px rgba(38, 55, 74, 0.18);

    small,
    em {
        color: #e5edf5;
    }
}

.sidebar-content :deep(.map-disclosure),
.sidebar-content :deep(.fixtures-disclosure) {
    border-style: dashed;
    box-shadow: none;
}

.sidebar-content :deep(.map-section-title),
.sidebar-content :deep(.fixtures-section-title),
.sidebar-content :deep(.layers-section-title),
.sidebar-content :deep(.panels-section-title),
.sidebar-content :deep(.system-section-title) {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
}

.sidebar-content :deep(.defaults-card),
.sidebar-content :deep(.options-card),
.sidebar-content :deep(.panels-section-card),
.sidebar-content :deep(.system-section-card) {
    border: 1px solid #d8dee5;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.sidebar-content :deep(.fixture-choice) {
    border-radius: 6px;
    transition:
        border-color 120ms ease,
        background-color 120ms ease,
        box-shadow 120ms ease;

    &:hover,
    &:focus-within {
        border-color: var(--editor-primary);
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
    }
}

.sidebar-content :deep(.map-sidebar-copy),
.sidebar-content :deep(.fixtures-copy),
.sidebar-content :deep(.layers-copy),
.sidebar-content :deep(.panels-copy),
.sidebar-content :deep(.system-copy),
.sidebar-content :deep(.options-copy),
.sidebar-content :deep(.defaults-copy) {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.sidebar-content :deep(.layers-toolbar-actions),
.sidebar-content :deep(.layer-draft-actions) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.sidebar-content :deep(.layers-primary-action),
.sidebar-content :deep(.layers-secondary-action) {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    text-decoration: none;
    outline: none;
}

.sidebar-content :deep(.layers-primary-action) {
    border: 1px solid var(--editor-primary);
    background: var(--editor-primary);
    color: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);

    &:hover,
    &:focus {
        border-color: var(--editor-primary-hover);
        background: var(--editor-primary-hover);
        color: #fff;
    }
}

.sidebar-content :deep(.layers-secondary-action) {
    border: 1px solid #c9d3df;
    background: #eef2f6;
    color: var(--editor-primary);

    &:hover,
    &:focus,
    &.done {
        border-color: var(--editor-primary);
        background: #dfe7ef;
        color: var(--editor-primary);
    }
}

@media (max-width: 900px) {
    .navbar-wrapper {
        position: relative;
        height: 100%;
        min-height: 0;
        flex-direction: row;
        overflow: hidden;
        border-right: 0;
    }

    .mobile-sidebar-toggle {
        position: relative;
        z-index: 7;
        display: inline-flex;
        width: 52px;
        min-width: 52px;
        height: 100%;
        flex: 0 0 52px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        border: 0;
        border-radius: 0;
        padding-top: 18px;
        background: var(--editor-primary);
        outline: none;
        transition: background-color 120ms ease;

        span {
            display: block;
            width: 20px;
            height: 2px;
            border-radius: 999px;
            background: #fff;
        }

        &:hover,
        &:focus {
            background: var(--editor-primary-hover);
        }
    }

    .mobile-sidebar-scrim {
        position: absolute;
        inset: 0;
        z-index: 5;
        display: block;
        background: rgba(17, 24, 39, 0);
        opacity: 0;
        pointer-events: none;
        transition:
            background-color 160ms ease,
            opacity 160ms ease;
    }

    .mobile-sidebar-open {
        .mobile-sidebar-scrim {
            background: rgba(17, 24, 39, 0.32);
            opacity: 1;
            pointer-events: auto;
        }

        .section-rail {
            transform: translateX(0);
            box-shadow: 18px 0 30px rgba(15, 23, 42, 0.24);
        }
    }

    .section-rail {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 8;
        width: min(320px, 82vw);
        flex: none;
        gap: 4px;
        overflow-y: auto;
        padding: 12px;
        transform: translateX(-100%);
        transition: transform 180ms ease;
    }

    .mobile-rail-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 4px;
        padding: 2px 2px 8px;
        color: #fff;

        strong {
            font-size: 13px;
            line-height: 18px;
            text-transform: uppercase;
        }

        button {
            display: inline-flex;
            width: 32px;
            height: 32px;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 6px;
            color: #fff;
            font-size: 24px;
            line-height: 1;
            outline: none;

            &:hover,
            &:focus {
                background: rgba(255, 255, 255, 0.12);
            }
        }
    }

    .rail-button {
        width: 100%;
        min-height: 46px;
        align-items: center;
        justify-content: flex-start;
        padding: 8px 12px;
        white-space: normal;

        &.active::before {
            top: 12px;
            right: auto;
            bottom: 12px;
            left: -6px;
            width: 3px;
            height: auto;
        }
    }

    .mobile-preview-action {
        display: flex;
        min-height: 42px;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-top: auto;
        border: 1px solid rgba(255, 255, 255, 0.75);
        border-radius: 6px;
        padding: 9px 12px;
        background: #fff;
        color: var(--editor-primary);
        font-size: 13px;
        font-weight: 700;
        line-height: 18px;
        outline: none;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);

        &:hover,
        &:focus {
            background: #eef2f6;
        }
    }

    .sidebar-panel {
        width: calc(100% - 52px);
        min-height: 0;
        flex: 1 1 auto;
    }

    .sidebar-header {
        padding: 14px 16px 12px;

        h3 {
            font-size: 17px;
            line-height: 22px;
        }
    }

    .sidebar-summary {
        gap: 6px;
        margin-top: 10px;
    }

    .summary-chip {
        padding: 3px 8px;
    }

    .sidebar-content {
        padding: 12px;
    }

    .review-card,
    .sidebar-card-link,
    .sidebar-content :deep(.map-section-card),
    .sidebar-content :deep(.map-disclosure),
    .sidebar-content :deep(.fixture-card),
    .sidebar-content :deep(.fixtures-disclosure),
    .sidebar-content :deep(.layers-card),
    .sidebar-content :deep(.panels-card),
    .sidebar-content :deep(.system-card) {
        min-height: 68px;
        padding: 11px;
    }
}
</style>
