<script setup lang="ts">
// collects all rubbish for the fixtures section

import Appbar from '@/components/fixtures/appbar/appbar.vue';
import AreasOfInterest from '@/components/fixtures/areas-of-interest/areas-of-interest.vue';
import Basemap from '@/components/fixtures/basemap/basemap.vue';
import Details from '@/components/fixtures/details/details.vue';
import Export from '@/components/fixtures/export/export.vue';
import Geosearh from '@/components/fixtures/geosearch/geosearch.vue';
import Grid from '@/components/fixtures/grid/grid.vue';
import Help from '@/components/fixtures/help/help.vue';
import Hilight from '@/components/fixtures/hilight/hilight.vue';
import LayerReorder from '@/components/fixtures/layer-reorder/layer-reorder.vue';
import Legend from '@/components/fixtures/legend/legend.vue';
import Mapnav from '@/components/fixtures/mapnav/mapnav.vue';
import Metadata from '@/components/fixtures/metadata/metadata.vue';
import NorthArrow from '@/components/fixtures/northarrow/northarrow.vue';
import OverviewMap from '@/components/fixtures/overviewmap/overviewmap.vue';
import Settings from '@/components/fixtures/settings/settings.vue';
import Scrollguard from '@/components/fixtures/scrollguard/scrollguard.vue';
import Wizard from '@/components/fixtures/wizard/wizard.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';

const store = useStore();
const { t } = useI18n();

defineProps({
    compact: Boolean
});

type FixtureSectionId =
    | 'appbar'
    | 'areas-of-interest'
    | 'basemap'
    | 'details'
    | 'export'
    | 'geosearch'
    | 'grid'
    | 'help'
    | 'hilight'
    | 'layer-reorder'
    | 'legend'
    | 'mapnav'
    | 'metadata'
    | 'northarrow'
    | 'overviewmap'
    | 'scrollguard'
    | 'settings'
    | 'wizard';

const activeSection = ref<FixtureSectionId | ''>('');
const showAdvancedTools = ref(false);

const commonToolIds = new Set<FixtureSectionId>([
    'legend',
    'geosearch',
    'details',
    'mapnav',
    'basemap',
    'export',
    'help'
]);

const toolStatus = (id: FixtureSectionId) => {
    return store.elc?.fixtures?.[id] === undefined ? t('fixtures.sidebar.default') : t('fixtures.sidebar.custom');
};

const fixtureSections = computed(() => [
    {
        id: 'legend' as FixtureSectionId,
        title: t('legend.title'),
        description: t('fixtures.sidebar.legend.description'),
        meta: toolStatus('legend'),
        configured: store.elc?.fixtures?.legend !== undefined,
        common: commonToolIds.has('legend')
    },
    {
        id: 'geosearch' as FixtureSectionId,
        title: t('geosearch.title'),
        description: t('fixtures.sidebar.geosearch.description'),
        meta: toolStatus('geosearch'),
        configured: store.elc?.fixtures?.geosearch !== undefined,
        common: commonToolIds.has('geosearch')
    },
    {
        id: 'details' as FixtureSectionId,
        title: t('details.title'),
        description: t('fixtures.sidebar.details.description'),
        meta: toolStatus('details'),
        configured: store.elc?.fixtures?.details !== undefined,
        common: commonToolIds.has('details')
    },
    {
        id: 'mapnav' as FixtureSectionId,
        title: t('mapnav.title'),
        description: t('fixtures.sidebar.mapnav.description'),
        meta: toolStatus('mapnav'),
        configured: store.elc?.fixtures?.mapnav !== undefined,
        common: commonToolIds.has('mapnav')
    },
    {
        id: 'basemap' as FixtureSectionId,
        title: t('basemap.title'),
        description: t('fixtures.sidebar.basemap.description'),
        meta: toolStatus('basemap'),
        configured: store.elc?.fixtures?.basemap !== undefined,
        common: commonToolIds.has('basemap')
    },
    {
        id: 'export' as FixtureSectionId,
        title: t('export.title'),
        description: t('fixtures.sidebar.export.description'),
        meta: toolStatus('export'),
        configured: store.elc?.fixtures?.export !== undefined,
        common: commonToolIds.has('export')
    },
    {
        id: 'help' as FixtureSectionId,
        title: t('help.title'),
        description: t('fixtures.sidebar.help.description'),
        meta: toolStatus('help'),
        configured: store.elc?.fixtures?.help !== undefined,
        common: commonToolIds.has('help')
    },
    {
        id: 'layer-reorder' as FixtureSectionId,
        title: t('layerReorder.title'),
        description: t('fixtures.sidebar.layerReorder.description'),
        meta: toolStatus('layer-reorder'),
        configured: store.elc?.fixtures?.['layer-reorder'] !== undefined,
        common: commonToolIds.has('layer-reorder')
    },
    {
        id: 'grid' as FixtureSectionId,
        title: t('grid.title'),
        description: t('fixtures.sidebar.grid.description'),
        meta: toolStatus('grid'),
        configured: store.elc?.fixtures?.grid !== undefined,
        common: commonToolIds.has('grid')
    },
    {
        id: 'appbar' as FixtureSectionId,
        title: t('appbar.title'),
        description: t('fixtures.sidebar.appbar.description'),
        meta: toolStatus('appbar'),
        configured: store.elc?.fixtures?.appbar !== undefined,
        common: commonToolIds.has('appbar')
    },
    {
        id: 'settings' as FixtureSectionId,
        title: t('settings.title'),
        description: t('fixtures.sidebar.settings.description'),
        meta: toolStatus('settings'),
        configured: store.elc?.fixtures?.settings !== undefined,
        common: commonToolIds.has('settings')
    },
    {
        id: 'overviewmap' as FixtureSectionId,
        title: t('overviewMap.title'),
        description: t('fixtures.sidebar.overviewMap.description'),
        meta: toolStatus('overviewmap'),
        configured: store.elc?.fixtures?.overviewmap !== undefined,
        common: commonToolIds.has('overviewmap')
    },
    {
        id: 'northarrow' as FixtureSectionId,
        title: t('northArrow.title'),
        description: t('fixtures.sidebar.northArrow.description'),
        meta: toolStatus('northarrow'),
        configured: store.elc?.fixtures?.northarrow !== undefined,
        common: commonToolIds.has('northarrow')
    },
    {
        id: 'metadata' as FixtureSectionId,
        title: t('metadata.title'),
        description: t('fixtures.sidebar.metadata.description'),
        meta: toolStatus('metadata'),
        configured: store.elc?.fixtures?.metadata !== undefined,
        common: commonToolIds.has('metadata')
    },
    {
        id: 'areas-of-interest' as FixtureSectionId,
        title: t('aoi.title'),
        description: t('fixtures.sidebar.aoi.description'),
        meta: toolStatus('areas-of-interest'),
        configured: store.elc?.fixtures?.['areas-of-interest'] !== undefined,
        common: commonToolIds.has('areas-of-interest')
    },
    {
        id: 'scrollguard' as FixtureSectionId,
        title: t('scrollguard.title'),
        description: t('fixtures.sidebar.scrollguard.description'),
        meta: toolStatus('scrollguard'),
        configured: store.elc?.fixtures?.scrollguard !== undefined,
        common: commonToolIds.has('scrollguard')
    },
    {
        id: 'hilight' as FixtureSectionId,
        title: t('hilight.title'),
        description: t('fixtures.sidebar.hilight.description'),
        meta: toolStatus('hilight'),
        configured: store.elc?.fixtures?.hilight !== undefined,
        common: commonToolIds.has('hilight')
    },
    {
        id: 'wizard' as FixtureSectionId,
        title: t('wizard.title'),
        description: t('fixtures.sidebar.wizard.description'),
        meta: toolStatus('wizard'),
        configured: store.elc?.fixtures?.wizard !== undefined,
        common: commonToolIds.has('wizard')
    }
]);

const commonFixtureSections = computed(() => fixtureSections.value.filter(section => section.common));
const advancedFixtureSections = computed(() => fixtureSections.value.filter(section => !section.common));

const activeSectionTitle = computed(() => {
    return fixtureSections.value.find(section => section.id === activeSection.value)?.title ?? t('navbar.fixtures');
});
</script>

<template>
    <div class="fixtures-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">{{ t('navbar.fixtures') }}</h3>

        <template v-if="!activeSection">
            <p class="fixtures-copy">{{ t('fixtures.sidebar.description') }}</p>

            <section class="fixture-group">
                <div class="fixture-group-header">
                    <h4>{{ t('fixtures.sidebar.common.title') }}</h4>
                    <p>{{ t('fixtures.sidebar.common.description') }}</p>
                </div>

                <button
                    v-for="section in commonFixtureSections"
                    :key="section.id"
                    type="button"
                    class="fixture-card"
                    @click="activeSection = section.id"
                >
                    <span>
                        <strong>{{ section.title }}</strong>
                        <small>{{ section.description }}</small>
                    </span>
                    <em :class="{ custom: section.configured }">{{ section.meta }}</em>
                </button>
            </section>

            <section class="fixture-group">
                <button type="button" class="fixtures-disclosure" @click="showAdvancedTools = !showAdvancedTools">
                    <span>
                        <strong>{{ t('fixtures.sidebar.advanced.title') }}</strong>
                        <small>{{ t('fixtures.sidebar.advanced.description') }}</small>
                    </span>
                    <em>{{ advancedFixtureSections.length }}</em>
                </button>

                <div v-if="showAdvancedTools" class="fixture-advanced-list">
                    <button
                        v-for="section in advancedFixtureSections"
                        :key="section.id"
                        type="button"
                        class="fixture-card"
                        @click="activeSection = section.id"
                    >
                        <span>
                            <strong>{{ section.title }}</strong>
                            <small>{{ section.description }}</small>
                        </span>
                        <em :class="{ custom: section.configured }">{{ section.meta }}</em>
                    </button>
                </div>
            </section>
        </template>

        <template v-else>
            <button type="button" class="fixtures-back" @click="activeSection = ''">
                <span aria-hidden="true">&lt;</span>
                {{ t('navbar.fixtures') }}
            </button>

            <h4 class="fixtures-section-title">{{ activeSectionTitle }}</h4>

            <Appbar v-if="activeSection === 'appbar'" v-model="store.elc.fixtures.appbar" />
            <AreasOfInterest
                v-else-if="activeSection === 'areas-of-interest'"
                v-model="store.elc.fixtures['areas-of-interest']"
            />
            <Basemap v-else-if="activeSection === 'basemap'" v-model="store.elc.fixtures.basemap" />
            <Details v-else-if="activeSection === 'details'" v-model="store.elc.fixtures.details" />
            <Export v-else-if="activeSection === 'export'" v-model="store.elc.fixtures.export" />
            <Geosearh v-else-if="activeSection === 'geosearch'" v-model="store.elc.fixtures.geosearch" />
            <Grid v-else-if="activeSection === 'grid'" v-model="store.elc.fixtures.grid" />
            <Help v-else-if="activeSection === 'help'" v-model="store.elc.fixtures.help" />
            <Hilight v-else-if="activeSection === 'hilight'" v-model="store.elc.fixtures.hilight" />
            <LayerReorder v-else-if="activeSection === 'layer-reorder'" v-model="store.elc.fixtures['layer-reorder']" />
            <Legend v-else-if="activeSection === 'legend'" v-model="store.elc.fixtures.legend" />
            <Mapnav v-else-if="activeSection === 'mapnav'" v-model="store.elc.fixtures.mapnav" />
            <Metadata v-else-if="activeSection === 'metadata'" v-model="store.elc.fixtures.metadata" />
            <NorthArrow v-else-if="activeSection === 'northarrow'" v-model="store.elc.fixtures.northarrow" />
            <OverviewMap v-else-if="activeSection === 'overviewmap'" v-model="store.elc.fixtures.overviewmap" />
            <Scrollguard v-else-if="activeSection === 'scrollguard'" v-model="store.elc.fixtures.scrollguard" />
            <Settings v-else-if="activeSection === 'settings'" v-model="store.elc.fixtures.settings" />
            <Wizard v-else-if="activeSection === 'wizard'" v-model="store.elc.fixtures.wizard" />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.fixtures-editor {
    display: grid;
    gap: 12px;
}

.fixtures-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.fixture-group,
.fixture-advanced-list {
    display: grid;
    gap: 8px;
}

.fixture-group-header {
    h4,
    p {
        margin: 0;
    }

    h4 {
        color: #111827;
        font-size: 13px;
        font-weight: 700;
        line-height: 18px;
    }

    p {
        margin-top: 2px;
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}

.fixtures-disclosure,
.fixture-card {
    display: flex;
    min-height: 72px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 12px;
    background: #fff;
    color: #111827;
    text-align: left;
    outline: none;

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
        min-width: 64px;
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 4px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        font-weight: 700;
        font-style: normal;
        line-height: 14px;
        text-align: center;

        &.custom {
            border-color: #b7c6d6;
            background: #eef2f6;
        }
    }

    &:hover,
    &:focus {
        border-color: #26374a;
        background: #f3f6f9;
    }
}

.fixtures-disclosure {
    min-height: 64px;
    border-style: dashed;

    em {
        min-width: 32px;
    }
}

.fixtures-back {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 4px;
    padding: 6px 8px;
    color: #26374a;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;

    span {
        font-size: 20px;
        line-height: 16px;
    }

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.fixtures-section-title {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}
</style>
