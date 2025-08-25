<script setup lang="ts">
// root.map.caption config nugget

// TODO deal with typescript grouses. Might need a val ?? false to shut it up

import { Checkbox, Collapsible, Select } from '@/components/helpers';
import type { MapCaptionConfig } from '@/definitions';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<MapCaptionConfig>,
        required: true,
        default() {
            return {};
        }
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

/**
 * Handles changes to the objecty properties
 *
 * @param section section we're updating, mapCoords / scaleBar / langToggle
 * @param key property name we're updating
 * @param value what the new value is to set
 */
const onInput = (section: 'mapCoords' | 'scaleBar' | 'langToggle', key: string, val: string | boolean) => {
    const newCaption: MapCaptionConfig = {
        ...{ mapCoords: {}, scaleBar: {}, langToggle: {} },
        ...props.modelValue
    };
    // @ts-ignore
    newCaption[section][key] = val;
    if (newCaption.langToggle && Object.keys(newCaption.langToggle).length === 0) {
        delete newCaption.langToggle;
    }
    emit('update:modelValue', newCaption);
};
</script>

<template>
    <Collapsible :title="t('caption.title')" :description="t('caption.description')" :thick-border="true">
        <Collapsible :title="t('caption.coords.title')" :description="t('caption.coords.description')" required>
            <div class="input-table">
                <Select
                    :title="t('caption.coords.formatter.title')"
                    :description="t('caption.coords.formatter.description')"
                    :model-value="props.modelValue?.mapCoords?.formatter"
                    @update:model-value="val => onInput('mapCoords', 'formatter', val)"
                    :options="[
                        { value: 'LAT_LONG_DMS', label: t('caption.coords.formatter.latLongDms') },
                        { value: 'LAT_LONG_DD', label: t('caption.coords.formatter.latLongDd') },
                        { value: 'LAT_LONG_DDM', label: t('caption.coords.formatter.latLongDdm') },
                        { value: 'WEB_MERCATOR', label: t('caption.coords.formatter.webMercator') },
                        {
                            value: 'CANADA_ATLAS_LAMBERT',
                            label: t('caption.coords.formatter.canadaAtlasLambert')
                        },
                        { value: 'UTM', label: t('caption.coords.formatter.utm') },
                        { value: 'BASEMAP', label: t('caption.coords.formatter.basemap') }
                    ]"
                />
            </div>
            <Checkbox
                :title="t('caption.coords.disabled.title')"
                :description="t('caption.coords.disabled.description')"
                :model-value="props.modelValue?.mapCoords?.disabled"
                @update:model-value="val => onInput('mapCoords', 'disabled', val ?? false)"
            />
        </Collapsible>
        <Collapsible :title="t('caption.scaleBar.title')" :description="t('caption.scaleBar.description')" required>
            <Checkbox
                :title="t('caption.scaleBar.imperialScale.title')"
                :description="t('caption.scaleBar.imperialScale.description')"
                :model-value="props.modelValue?.scaleBar?.imperialScale"
                @update:model-value="val => onInput('scaleBar', 'imperialScale', val ?? false)"
            />
            <Checkbox
                :title="t('caption.scaleBar.disabled.title')"
                :description="t('caption.scaleBar.disabled.description')"
                :model-value="props.modelValue?.scaleBar?.disabled"
                @update:model-value="val => onInput('scaleBar', 'disabled', val ?? false)"
            />
        </Collapsible>
        <Collapsible :title="t('caption.langToggle.title')" :description="t('caption.langToggle.description')">
            <Checkbox
                :title="t('caption.langToggle.disabled.title')"
                :description="t('caption.langToggle.disabled.description')"
                :model-value="props.modelValue?.langToggle?.disabled"
                @update:model-value="val => onInput('langToggle', 'disabled', val ?? false)"
            />
        </Collapsible>
    </Collapsible>
</template>
