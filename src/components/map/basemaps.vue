<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

import type { Field, RampBasemapConfig } from '@/definitions';
import List from '@/components/helpers/list.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampBasemapConfig>>,
    required: false
  },
  isOverview: {
    type: Boolean
  }
});

const onAttributionInput = (
  idx: number,
  section: 'text' | 'logo',
  key: string,
  value: string | boolean
) => {
  const newAttribution = basemaps[idx].attribution ?? { text: {}, logo: {} };

  if (!newAttribution[section]) {
    newAttribution[section] = {};
  }

  if (key !== 'disabled' && value === '') {
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
  basemaps.forEach((bm) => {
    if (bm.layers && bm.layers.length === 0) {
      delete bm.layers;
    }
  });
  emit('update:modelValue', basemaps.length === 0 ? undefined : basemaps);
});

const basemapFields: Array<Field> = props.isOverview
  ? [
      {
        property: 'tileSchemaId',
        title: 'Tile Schema ID',
        description: 'The tile schema associated with this basemap.',
        required: true,
        type: 'string'
      },
      {
        property: 'id',
        title: 'ID',
        description: 'A unique id identifying the basemap.',
        type: 'string',
        required: true
      },
      {
        property: 'name',
        title: 'Name',
        description: 'Name of the basemap used for labeling.',
        type: 'string',
        required: true
      },
      {
        property: 'description',
        title: 'Description',
        description:
          'Description of the basemap. Becomes visible when basemap selector is expanded.',
        required: true,
        type: 'string'
      },
      {
        property: 'altText',
        title: 'Alt Text',
        description: 'Alt text for the basemap thumbnail image.',
        required: true,
        type: 'string'
      },
      {
        property: 'backgroundColour',
        title: 'Background Colour',
        description: 'The hex code representing the background colour of the basemap.',
        placeholder: '#FFFFFF',
        type: 'string'
      },
      {
        property: 'thumbnailUrl',
        title: 'Thumbnail URL',
        description: 'Path to image file to display in the basemap selector.',
        type: 'string'
      },
      {
        property: 'hideThumbnail',
        title: 'Hide Thumbnail',
        description:
          'When enabled, hides the basemap thumbnail image, leaving just the text component.',
        type: 'boolean'
      }
    ]
  : [
      {
        property: 'id',
        title: 'ID',
        description: 'A unique id identifying the basemap.',
        type: 'string',
        required: true
      },
      {
        property: 'name',
        title: 'Name',
        description: 'Name of the basemap used for labeling.',
        type: 'string',
        required: true
      },
      {
        property: 'tileSchemaId',
        title: 'Tile Schema ID',
        description: 'The tile schema associated with this basemap.',
        required: true,
        type: 'string'
      },
      {
        property: 'description',
        title: 'Description',
        description:
          'Description of the basemap. Becomes visible when basemap selector is expanded.',
        required: true,
        type: 'string'
      },
      {
        property: 'altText',
        title: 'Alt Text',
        description: 'Alt text for the basemap thumbnail image.',
        required: true,
        type: 'string'
      },
      {
        property: 'backgroundColour',
        title: 'Background Colour',
        description: 'The hex code representing the background colour of the basemap.',
        placeholder: '#FFFFFF',
        type: 'string'
      },
      {
        property: 'thumbnailUrl',
        title: 'Thumbnail URL',
        description: 'Path to image file to display in the basemap selector.',
        type: 'string'
      },
      {
        property: 'hideThumbnail',
        title: 'Hide Thumbnail',
        description:
          'When enabled, hides the basemap thumbnail image, leaving just the text component.',
        type: 'boolean'
      }
    ];

const layerFields: Array<Field> = [
  {
    property: 'id',
    title: 'ID',
    description: "A unique id identifying the basemap's layer.",
    type: 'string',
    required: true
  },
  {
    property: 'layerType',
    title: 'Type',
    description: '',
    required: true,
    type: 'enum',
    options: [
      {
        value: 'esr-map-image',
        label: 'Map Image'
      },
      {
        value: 'esri-tile',
        label: 'ESRI Tile'
      },
      {
        value: 'osm-tile',
        label: 'OSM Tile'
      }
    ]
  },
  {
    property: 'url',
    title: 'URL',
    description: "The basemap layer's URL",
    type: 'string',
    required: true
  },
  {
    property: 'opacity',
    title: 'Opacity',
    description: "The basemap layer's opacity. Must be a number between 0 and 1.",
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
    title="Basemaps"
    :description="
      isOverview
        ? `Key-value dictionary where the key is the tile schema id and the value is the basemap. When duplicate tile schema id's are provided, the latest entry will be used.`
        : 'The list of basemaps to be made available via the basemap selector. Minimum one is required.'
    "
    add-prompt="Add basemap"
    :required="!isOverview"
  >
    <template #item="{ index }">
      <List
        :item-fields="layerFields"
        v-model="basemaps[index].layers"
        title="Layers"
        description="A set of URLs which should be composited to form a basemap entry. Stacked in ascending order, i.e. the first layer sits at the bottom and the last layer at the top."
        add-prompt="Add layer"
        required
      />
      <Collapsible
        title="Attribution"
        description="Custom attribution and logo for associated basemap when selected."
      >
        <Collapsible
          title="Text"
          description="Properties to help define attribution text."
          required
        >
          <div class="mt-4 input-table">
            <div>
              <InputHeader
                title="Value"
                description="Contains the attribution value. If empty, it will use copyright text from the server."
              />
              <input
                type="text"
                :value="basemaps[index]?.attribution?.text?.value"
                @input="e => onAttributionInput(index, 'text', 'value', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>
          <div class="flex items-center mt-4">
            <input
              type="checkbox"
              :checked="basemaps[index]?.attribution?.text?.disabled"
              @input="e => onAttributionInput(index, 'text', 'disabled', (e.target as HTMLInputElement).checked)"
            />
            <InputHeader
              title="Disabled"
              description="Specifies if basemap attribution text is disabled."
              type="checkbox"
            />
          </div>
        </Collapsible>
        <Collapsible
          title="Logo"
          description="Properties to help define attribution logo."
          required
        >
          <div class="mt-4 input-table">
            <div>
              <InputHeader title="Value" description="URL for the image." />
              <input
                type="text"
                :value="basemaps[index]?.attribution?.logo?.value"
                @input="e => onAttributionInput(index, 'logo', 'value', (e.target as HTMLInputElement).value)"
              />
            </div>
            <div>
              <InputHeader title="Alt Text" description="Alternate text for the image." />
              <input
                type="text"
                :value="basemaps[index]?.attribution?.logo?.altText"
                @input="e => onAttributionInput(index, 'logo', 'altText', (e.target as HTMLInputElement).value)"
              />
            </div>
            <div>
              <InputHeader title="Link" description="URL to go to when image is clicked." />
              <input
                type="text"
                :value="basemaps[index]?.attribution?.logo?.link"
                @input="e => onAttributionInput(index, 'logo', 'link', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>
          <div class="flex items-center mt-4">
            <input
              type="checkbox"
              :checked="basemaps[index]?.attribution?.logo?.disabled"
              @input="e => onAttributionInput(index, 'logo', 'disabled', (e.target as HTMLInputElement).checked)"
            />
            <InputHeader
              title="Disabled"
              description="Specifies if basemap attribution logo is disabled."
              type="checkbox"
            />
          </div>
        </Collapsible>
      </Collapsible>
    </template>
  </List>
</template>
