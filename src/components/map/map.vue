<script setup lang="ts">
// root.map config nugget

import Caption from '@/components/map/caption.vue';
import TileSchemas from '@/components/map/tile-schemas.vue';
import ExtentSets from '@/components/map/extent-sets.vue';
import LodSets from '@/components/map/lod-sets.vue';
import Basemaps from '@/components/map/basemaps.vue';
import LayerLabels from '@/components/layers/labels.vue';
import LayerTimes from '@/components/map/layer-times.vue';
import { Input } from '@/components/helpers';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';

defineProps({
    compact: Boolean
});

const store = useStore();
const { t } = useI18n();

type MapSectionId =
    | 'general'
    | 'initial-basemap'
    | 'tile-schemas'
    | 'extent-sets'
    | 'lod-sets'
    | 'basemaps'
    | 'caption'
    | 'default-labels'
    | 'layer-times';

const activeSection = ref<MapSectionId | ''>('');
const showAdvancedSections = ref(false);

const availableBasemaps = computed(() => store.elc.map.basemaps ?? []);
const availableTileSchemas = computed(() => store.elc.map.tileSchemas ?? []);
const selectedBasemapId = computed({
    get: () => store.elc.map.initialBasemapId,
    set: (value: string) => {
        store.elc.map.initialBasemapId = value;
    }
});

const tileSchemasById = computed(() => {
    return Object.fromEntries(availableTileSchemas.value.map((tileSchema: any) => [tileSchema.id, tileSchema]));
});

const sectionCards = computed(() => [
    {
        id: 'initial-basemap' as MapSectionId,
        title: t('map.sidebar.initialBasemap.title'),
        description: t('map.sidebar.initialBasemap.description'),
        meta: selectedBasemapName.value,
        common: true
    },
    {
        id: 'general' as MapSectionId,
        title: t('map.sidebar.general.title'),
        description: t('map.sidebar.general.description'),
        meta: t('map.sidebar.settings'),
        common: true
    },
    {
        id: 'caption' as MapSectionId,
        title: t('caption.title'),
        description: t('caption.description'),
        meta: t('map.sidebar.advanced'),
        common: false
    },
    {
        id: 'default-labels' as MapSectionId,
        title: t('map.sidebar.defaultLabels.title'),
        description: t('map.sidebar.defaultLabels.description'),
        meta: t('map.sidebar.advanced'),
        common: false
    },
    {
        id: 'layer-times' as MapSectionId,
        title: t('layerTimes.title'),
        description: t('layerTimes.description'),
        meta: t('map.sidebar.advanced'),
        common: false
    },
    {
        id: 'tile-schemas' as MapSectionId,
        title: t('tileSchemas.title'),
        description: t('tileSchemas.description'),
        meta: t('map.sidebar.count', { count: availableTileSchemas.value.length }),
        common: false
    },
    {
        id: 'extent-sets' as MapSectionId,
        title: t('extentSets.title'),
        description: t('extentSets.description'),
        meta: t('map.sidebar.count', { count: store.elc.map.extentSets?.length ?? 0 }),
        common: false
    },
    {
        id: 'lod-sets' as MapSectionId,
        title: t('lodSets.title'),
        description: t('lodSets.description'),
        meta: t('map.sidebar.count', { count: store.elc.map.lodSets?.length ?? 0 }),
        common: false
    },
    {
        id: 'basemaps' as MapSectionId,
        title: t('map.sidebar.basemapDefinitions.title'),
        description: t('basemaps.description'),
        meta: t('map.sidebar.count', { count: availableBasemaps.value.length }),
        common: false
    }
]);

const commonSectionCards = computed(() => sectionCards.value.filter(section => section.common));
const advancedSectionCards = computed(() => sectionCards.value.filter(section => !section.common));

const activeSectionTitle = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.title ?? t('navbar.map');
});

const activeSectionDescription = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.description ?? '';
});

const activeSectionMeta = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.meta ?? '';
});

const selectedBasemapName = computed(() => {
    const basemap = availableBasemaps.value.find((bm: any) => bm.id === selectedBasemapId.value);
    return basemap?.name ?? selectedBasemapId.value ?? t('map.sidebar.notSet');
});

const addThumbnails = (basemap: any) => {
    const tileSchema = tileSchemasById.value[basemap.tileSchemaId];
    const thumbnailSuffixes = tileSchema?.thumbnailTileUrls ?? [];
    const thumbnailUrls = basemap.thumbnailUrl
        ? [basemap.thumbnailUrl]
        : (basemap.layers ?? []).flatMap((layer: any) =>
              thumbnailSuffixes.map((suffix: string) => `${layer.url}${suffix}`)
          );

    return {
        ...basemap,
        thumbnailUrls
    };
};

const basemapGroups = computed(() => {
    const groups = [
        {
            id: 'lambert',
            title: t('map.sidebar.lambert.title'),
            description: t('map.sidebar.lambert.description'),
            items: availableBasemaps.value
                .filter((bm: any) => bm.tileSchemaId?.toLowerCase().includes('lambert'))
                .map(addThumbnails)
        },
        {
            id: 'mercator',
            title: t('map.sidebar.mercator.title'),
            description: t('map.sidebar.mercator.description'),
            items: availableBasemaps.value
                .filter((bm: any) => bm.tileSchemaId?.toLowerCase().includes('merc'))
                .map(addThumbnails)
        }
    ];

    const groupedIds = new Set(groups.flatMap(group => group.items.map((bm: any) => bm.id)));
    const otherBasemaps = availableBasemaps.value.filter((bm: any) => !groupedIds.has(bm.id)).map(addThumbnails);

    if (otherBasemaps.length) {
        groups.push({
            id: 'other',
            title: t('map.sidebar.other.title'),
            description: t('map.sidebar.other.description'),
            items: otherBasemaps
        });
    }

    return groups.filter(group => group.items.length);
});
</script>

<template>
    <div class="map-sidebar-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">Map</h3>

        <template v-if="!activeSection">
            <p class="map-sidebar-copy">{{ t('map.sidebar.description') }}</p>

            <section class="map-card-group">
                <div class="map-group-header">
                    <h4>{{ t('map.sidebar.common.title') }}</h4>
                    <p>{{ t('map.sidebar.common.description') }}</p>
                </div>

                <button
                    v-for="section in commonSectionCards"
                    :key="section.id"
                    type="button"
                    class="map-section-card"
                    @click="activeSection = section.id"
                >
                    <span>
                        <strong>{{ section.title }}</strong>
                        <small>{{ section.description }}</small>
                    </span>
                    <em>{{ section.meta }}</em>
                </button>
            </section>

            <section class="map-card-group">
                <button type="button" class="map-disclosure" @click="showAdvancedSections = !showAdvancedSections">
                    <span>
                        <strong>{{ t('map.sidebar.advancedDefinitions.title') }}</strong>
                        <small>{{ t('map.sidebar.advancedDefinitions.description') }}</small>
                    </span>
                    <em>{{ advancedSectionCards.length }}</em>
                </button>

                <div v-if="showAdvancedSections" class="map-card-list advanced">
                    <button
                        v-for="section in advancedSectionCards"
                        :key="section.id"
                        type="button"
                        class="map-section-card"
                        @click="activeSection = section.id"
                    >
                        <span>
                            <strong>{{ section.title }}</strong>
                            <small>{{ section.description }}</small>
                        </span>
                        <em>{{ section.meta }}</em>
                    </button>
                </div>
            </section>
        </template>

        <template v-else>
            <button type="button" class="map-section-back" @click="activeSection = ''">
                <span aria-hidden="true">&lt;</span>
                {{ t('navbar.map') }}
            </button>

            <div class="map-editor-header">
                <div>
                    <h4 class="map-section-title">{{ activeSectionTitle }}</h4>
                    <p class="map-sidebar-copy">{{ activeSectionDescription }}</p>
                </div>
                <em>{{ activeSectionMeta }}</em>
            </div>

            <div v-if="activeSection === 'general'" class="mt-4 input-table">
                <Input
                    :title="t('map.initialBasemapId.title')"
                    :description="t('map.initialBasemapId.description')"
                    v-model="store.elc.map.initialBasemapId"
                />
                <Input
                    :title="t('map.pointZoomScale.title')"
                    :description="t('map.pointZoomScale.description')"
                    type="number"
                    placeholder="50000"
                    min="1"
                    v-model="store.elc.map.pointZoomScale"
                />
                <Input
                    :title="t('map.mapMouseThrottle.title')"
                    :description="t('map.mapMouseThrottle.description')"
                    type="number"
                    placeholder="0"
                    min="0"
                    v-model="store.elc.map.mapMouseThrottle"
                />
            </div>

            <div v-else-if="activeSection === 'initial-basemap'" class="basemap-picker">
                <section v-for="group in basemapGroups" :key="group.id" class="basemap-group">
                    <h5>{{ group.title }}</h5>
                    <p>{{ group.description }}</p>

                    <button
                        v-for="basemap in group.items"
                        :key="basemap.id"
                        type="button"
                        class="basemap-choice"
                        :class="{ selected: selectedBasemapId === basemap.id }"
                        @click="selectedBasemapId = basemap.id"
                    >
                        <span class="basemap-thumb">
                            <img
                                v-if="basemap.thumbnailUrls?.length"
                                :src="basemap.thumbnailUrls[0]"
                                :alt="basemap.altText || basemap.name"
                            />
                            <span v-else>{{ t('map.sidebar.noPreview') }}</span>
                        </span>

                        <span class="basemap-choice-copy">
                            <strong>{{ basemap.name }}</strong>
                            <small>{{ basemap.id }}</small>
                        </span>
                    </button>
                </section>
            </div>

            <TileSchemas v-else-if="activeSection === 'tile-schemas'" v-model="store.elc.map.tileSchemas" />
            <ExtentSets v-else-if="activeSection === 'extent-sets'" v-model="store.elc.map.extentSets" />
            <LodSets v-else-if="activeSection === 'lod-sets'" v-model="store.elc.map.lodSets" />
            <Basemaps v-else-if="activeSection === 'basemaps'" v-model="store.elc.map.basemaps" />
            <Caption v-else-if="activeSection === 'caption'" v-model="store.elc.map.caption" />
            <LayerLabels v-else-if="activeSection === 'default-labels'" v-model="store.elc.map.labelsDefault" default />
            <LayerTimes v-else-if="activeSection === 'layer-times'" v-model="store.elc.map.layerTimeDefault" />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.map-sidebar-editor {
    display: grid;
    gap: 12px;
}

.map-sidebar-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.map-card-group,
.map-card-list {
    display: grid;
    gap: 8px;

    &.advanced {
        padding-top: 2px;
    }
}

.map-group-header {
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

.map-disclosure,
.map-section-card {
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
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover,
    &:focus {
        border-color: #26374a;
        background: #f3f6f9;
    }
}

.map-disclosure {
    min-height: 64px;
    border-style: dashed;

    em {
        min-width: 32px;
    }
}

.map-editor-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;

    div {
        display: grid;
        gap: 4px;
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
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.map-section-back {
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
    outline: none;

    span {
        font-size: 20px;
        line-height: 16px;
    }

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.map-section-title {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}

.basemap-picker,
.basemap-group {
    display: grid;
    gap: 10px;
}

.basemap-group {
    margin-top: 4px;

    h5 {
        margin: 0;
        color: #111827;
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
    }

    p {
        margin: -4px 0 0;
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}

.basemap-choice {
    display: flex;
    min-height: 82px;
    width: 100%;
    align-items: stretch;
    overflow: hidden;
    border: 1px solid #d8dee5;
    border-radius: 8px;
    background: #fff;
    color: #111827;
    text-align: left;
    outline: none;

    &:hover,
    &:focus {
        border-color: #26374a;
    }

    &.selected {
        border-color: #26374a;
        box-shadow: inset 0 0 0 2px #26374a;
    }
}

.basemap-thumb {
    display: grid;
    width: 112px;
    flex: 0 0 112px;
    place-items: center;
    background: #eef2f6;
    color: #6b7280;
    font-size: 11px;
    line-height: 14px;
    text-align: center;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.basemap-choice-copy {
    min-width: 0;
    padding: 10px 12px;

    strong,
    small {
        display: block;
    }

    strong {
        color: #111827;
        font-size: 13px;
        line-height: 17px;
    }

    small {
        margin-top: 4px;
        overflow: hidden;
        color: #6b7280;
        font-size: 11px;
        line-height: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
