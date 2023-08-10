<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import type { MapCaptionConfig } from '@/definitions';
import type { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<MapCaptionConfig>,
    required: true,
    default() {
      return {};
    }
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (section: 'mapCoords' | 'scaleBar', key: string, val: string | boolean) => {
  const newCaption: MapCaptionConfig = { ...{ mapCoords: {}, scaleBar: {} }, ...props.modelValue };
  // @ts-ignore
  newCaption[section][key] = val;
  emit('update:modelValue', newCaption);
};
</script>

<template>
  <Collapsible
    title="Caption"
    description="Configuration for the components in the map caption bar."
    :thick-border="true"
  >
    <Collapsible
      title="Map Coords"
      description="Configuration for mouse/crosshairs co-ords."
      required
    >
      <div class="input-table">
        <div>
          <InputHeader title="Formatter" description="ID of the initial mouse point formatter" />
          <select
            :value="props.modelValue?.mapCoords?.formatter"
            @input="e => onInput('mapCoords', 'formatter', (e.target as HTMLSelectElement).options[(e.target as HTMLSelectElement).selectedIndex].text)"
          >
            <option>LAT_LONG_DMS</option>
            <option>LAT_LONG_DD</option>
            <option>LAT_LONG_DDM</option>
            <option>WEB_MERCATOR</option>
            <option>CANADA_ATLAS_LAMBERT</option>
            <option>UTM</option>
            <option>BASEMAP</option>
          </select>
        </div>
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          :checked="props.modelValue?.mapCoords?.disabled"
          @input="e => onInput('mapCoords', 'disabled', (e.target as HTMLInputElement).checked)"
        />
        <InputHeader
          title="Disabled"
          description="Specifies if map coordinates are disabled."
          type="checkbox"
        />
      </div>
    </Collapsible>
    <Collapsible title="Scale Bar" description="Configuration for the scale bar." required>
      <div class="flex items-center">
        <input
          type="checkbox"
          :checked="props.modelValue?.scaleBar?.imperialScale"
          @input="e => onInput('scaleBar', 'imperialScale', (e.target as HTMLInputElement).checked)"
        />
        <InputHeader
          title="Imperial Scale"
          description="Specifies if the scale bar should use imperial scale units."
          type="checkbox"
        />
      </div>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          :checked="props.modelValue?.scaleBar?.disabled"
          @input="e => onInput('scaleBar', 'disabled', (e.target as HTMLInputElement).checked)"
        />
        <InputHeader
          title="Disabled"
          description="Specifies if the scale bar is disabled."
          type="checkbox"
        />
      </div>
    </Collapsible>
  </Collapsible>
</template>
