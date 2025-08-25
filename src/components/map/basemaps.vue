<script setup lang="ts">
// root.map.basemaps config nugget

// TODO deal with typescript grouses. Might need a val ?? false to shut it up

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Checkbox, Collapsible, Input, List } from '@/components/helpers';

import type { Field, RampBasemapConfig } from '@/definitions';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<RampBasemapConfig>>,
        required: false
    },
    isOverview: {
        type: Boolean
    }
});

/**
 * Handles changes to the attribution property
 *
 * @param idx basemap index we're updating
 * @param section section we're updating, text or logo
 * @param key property name we're updating
 * @param value what the new value is to set
 */
const onAttributionInput = (idx: number, section: 'text' | 'logo', key: string, value: string | boolean) => {
    const newAttribution = basemaps[idx].attribution ?? { text: {}, logo: {} };

    if (!newAttribution[section]) {
        newAttribution[section] = {};
    }

    if (key !== 'disabled' && value === undefined) {
        // @ts-ignore
        delete newAttribution[section][key];
    } else {
        // @ts-ignore
        newAttribution[section][key] = value;
    }

    if (
        (!newAttribution.text || Object.keys(newAttribution.text).length === 0) &&
        (!newAttribution.logo || Object.keys(newAttribution.logo).length === 0)
    ) {
        delete basemaps[idx].attribution;
    } else {
        basemaps[idx].attribution = newAttribution;
    }
};

const emit = defineEmits(['update:modelValue']);

let basemaps = reactive<Array<RampBasemapConfig>>(props.modelValue ?? []);

watch(basemaps, () => {
    basemaps.forEach(bm => {
        if (bm.layers && bm.layers.length === 0) {
            delete bm.layers;
        }
    });
    emit('update:modelValue', basemaps.length === 0 ? undefined : basemaps);
});

const basemapFields: Array<Field> = [
    {
        property: 'tileSchemaId',
        title: 'basemap.tileSchemaId.title',
        description: 'basemap.tileSchemaId.description',
        required: true,
        type: 'string'
    },
    {
        property: 'id',
        title: 'basemap.id.title',
        description: 'basemap.id.description',
        type: 'string',
        required: true
    },
    {
        property: 'name',
        title: 'basemap.name.title',
        description: 'basemap.name.description',
        type: 'string',
        required: true
    },
    {
        property: 'description',
        title: 'basemap.description.title',
        description: 'basemap.description.description',
        required: true,
        type: 'string'
    },
    {
        property: 'altText',
        title: 'basemap.altText.title',
        description: 'basemap.altText.description',
        required: true,
        type: 'string'
    },
    {
        property: 'backgroundColour',
        title: 'basemap.backgroundColour.title',
        description: 'basemap.backgroundColour.description',
        placeholder: '#FFFFFF',
        type: 'string'
    },
    {
        property: 'thumbnailUrl',
        title: 'basemap.thumbnailUrl.title',
        description: 'basemap.thumbnailUrl.description',
        type: 'string'
    },
    {
        property: 'hideThumbnail',
        title: 'basemap.hideThumbnail.title',
        description: 'basemap.hideThumbnail.description',
        type: 'boolean'
    }
];

if (!props.isOverview) {
    const temp = basemapFields[0];
    basemapFields[0] = basemapFields[1];
    basemapFields[1] = basemapFields[2];
    basemapFields[2] = temp;
}

const layerFields: Array<Field> = [
    {
        property: 'id',
        title: 'basemap.layer.id.title',
        description: 'basemap.layer.id.description',
        type: 'string',
        required: true
    },
    {
        property: 'layerType',
        title: 'basemap.layer.type.title',
        required: true,
        type: 'enum',
        options: [
            {
                value: 'esr-map-image',
                label: 'basemap.layer.type.mapImage'
            },
            {
                value: 'esri-tile',
                label: 'basemap.layer.type.esriTile'
            },
            {
                value: 'osm-tile',
                label: 'basemap.layer.type.osmTile'
            }
        ]
    },
    {
        property: 'url',
        title: 'basemap.layer.url.title',
        description: 'basemap.layer.url.description',
        type: 'string',
        required: true
    },
    {
        property: 'opacity',
        title: 'basemap.layer.opacity.title',
        description: 'basemap.layer.opacity.description',
        type: 'number',
        min: 0,
        max: 1
    }
];
</script>

<template>
    <List
        :top-level="!isOverview"
        :item-fields="basemapFields"
        v-model="basemaps"
        :title="t('basemaps.title')"
        :description="t(`basemaps.description${isOverview ? '.overview' : ''}`)"
        :add-prompt="t('basemaps.add')"
        :remove-prompt="t('basemaps.remove')"
        :singular="t('basemaps.singular')"
        :required="!isOverview"
    >
        <template #item="{ index }">
            <List
                :item-fields="layerFields"
                v-model="basemaps[index].layers"
                :title="t('basemap.layers.title')"
                :description="t('basemap.layers.description')"
                :add-prompt="t('basemap.layers.add')"
                :remove-prompt="t('basemap.layers.remove')"
                :singular="t('basemap.layers.singular')"
                required
            />
            <Collapsible :title="t('basemap.attribution.title')" :description="t('basemap.attribution.description')">
                <Collapsible
                    :title="t('basemap.attribution.text.title')"
                    :description="t('basemap.attribution.text.description')"
                    required
                >
                    <div class="mt-4 input-table">
                        <Input
                            :title="t('basemap.attribution.text.value.title')"
                            :description="t('basemap.attribution.text.value.description')"
                            :model-value="basemaps[index]?.attribution?.text?.value"
                            @update:model-value="val => onAttributionInput(index, 'text', 'value', val)"
                        />
                    </div>
                    <Checkbox
                        :model-value="basemaps[index]?.attribution?.text?.disabled"
                        @update:model-value="val => onAttributionInput(index, 'text', 'disabled', val ?? false)"
                        :title="t('basemap.attribution.text.disabled.title')"
                        :description="t('basemap.attribution.text.disabled.description')"
                    />
                </Collapsible>
                <Collapsible
                    :title="t('basemap.attribution.logo.title')"
                    :description="t('basemap.attribution.logo.description')"
                    required
                >
                    <div class="mt-4 input-table">
                        <Input
                            :title="t('basemap.attribution.logo.value.title')"
                            :description="t('basemap.attribution.logo.value.description')"
                            :model-value="basemaps[index]?.attribution?.logo?.value"
                            @update:model-value="val => onAttributionInput(index, 'logo', 'value', val)"
                        />
                        <Input
                            :title="t('basemap.attribution.logo.altText.title')"
                            :description="t('basemap.attribution.logo.altText.description')"
                            :model-value="basemaps[index]?.attribution?.logo?.altText"
                            @update:model-value="val => onAttributionInput(index, 'logo', 'altText', val)"
                        />
                        <Input
                            :title="t('basemap.attribution.logo.link.title')"
                            :description="t('basemap.attribution.logo.link.description')"
                            :model-value="basemaps[index]?.attribution?.logo?.link"
                            @update:model-value="val => onAttributionInput(index, 'logo', 'link', val)"
                        />
                    </div>
                    <Checkbox
                        :model-value="basemaps[index]?.attribution?.logo?.disabled"
                        @update:model-value="val => onAttributionInput(index, 'logo', 'disabled', val ?? false)"
                        :title="t('basemap.attribution.logo.disabled.title')"
                        :description="t('basemap.attribution.logo.disabled.description')"
                    />
                </Collapsible>
            </Collapsible>
        </template>
    </List>
</template>
