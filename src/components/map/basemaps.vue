<script setup lang="ts">
import { type PropType, reactive, watch } from 'vue';

import draggable from 'vuedraggable';
import InputHeader from '@/components/helpers/input-header.vue';
import Collapsible from '@/components/helpers/collapsible.vue';

import type { RampBasemapConfig } from '@/definitions';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<RampBasemapConfig>>,
    required: false
  }
});

const addBasemap = () => {
  basemaps.push({ id: '' });
};

const removeBasemap = (idx: number) => {
  basemaps?.splice(idx, 1);
};

const addBasemapLayer = (idx: number) => {
  if (!basemaps[idx].layers) {
    basemaps[idx].layers = [];
  }

  basemaps[idx].layers?.push({});
};

const removeBasemapLayer = (basemapIdx: number, layerIdx: number) => {
  basemaps[basemapIdx].layers?.splice(layerIdx, 1);
};

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

const basemaps = reactive<Array<RampBasemapConfig>>(props.modelValue ?? []);

watch(basemaps, () => {
  basemaps.forEach((bm) => {
    if (bm.layers && bm.layers.length === 0) {
      delete bm.layers;
    }
  });
  emit('update:modelValue', basemaps.length === 0 ? undefined : basemaps);
});
</script>

<template>
  <Collapsible :thick-border="true">
    <template #header>
      <button class="arrow mr-1 sm:mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
      <InputHeader
        type="header"
        :title="`Basemaps (${basemaps.length})`"
        description="The list of basemaps to be made available via the basemap selector. Minimum one is required."
        required
      />
      <!-- add item button -->
      <button
        @click.stop="addBasemap"
        class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
      >
        <svg
          class="relative bottom-[2px]"
          fill="white"
          height="18px"
          width="18px"
          viewBox="0 0 23 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span class="px-2"> Add basemap </span>
      </button>
    </template>
    <template #default>
      <draggable v-if="basemaps.length > 0" :list="basemaps" item-key="fake" handle=".handle">
        <template #item="{ element, index }">
          <Collapsible>
            <template #header>
              <button class="cursor-move handle mr-1 sm:mr-5" @click.stop>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
              <button class="mr-1 sm:mr-3 arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <span class="mr-1 sm:mr-5 sm:text-lg">{{
                element.id || `Basemap ${index + 1}`
              }}</span>
              <button @click.stop="removeBasemap(index)" class="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </template>
            <template #default>
              <div class="input-table">
                <div>
                  <InputHeader
                    title="ID"
                    description="A unique id identifying the basemap."
                    required
                  />
                  <input type="text" v-model="element.id" />
                </div>
                <div>
                  <InputHeader
                    title="Name"
                    description="Name of the basemap used for labeling."
                    required
                  />
                  <input type="text" v-model="element.name" />
                </div>
                <div>
                  <InputHeader
                    title="Tile Schema ID"
                    description="The tile schema associated with this basemap."
                    required
                  />
                  <input type="text" v-model="element.tileSchemaId" />
                </div>
                <div>
                  <InputHeader
                    title="Description"
                    description="Description of the basemap. Becomes visible when basemap selector is expanded."
                    required
                  />
                  <input type="text" v-model="element.description" />
                </div>
                <div>
                  <InputHeader
                    title="Alt Text"
                    description="Alt text for the basemap thumbnail image."
                    required
                  />
                  <input type="text" v-model="element.description" />
                </div>
                <div>
                  <InputHeader
                    title="Background Colour"
                    description="The hex code representing the background colour of the basemap."
                  />
                  <input type="text" placeholder="#FFFFFF" v-model="element.backgroundColour" />
                </div>
                <div>
                  <InputHeader
                    title="Thumbnail URL"
                    description="Path to image file to display in the basemap selector."
                  />
                  <input type="text" v-model="element.thumbnailUrl" />
                </div>
              </div>
              <div class="flex items-center mt-4">
                <input type="checkbox" v-model="element.hideThumbnail" />
                <InputHeader
                  title="Hide Thumbnail"
                  description="When enabled, hides the basemap thumbnail image, leaving just the text component."
                  type="checkbox"
                />
              </div>
              <Collapsible>
                <template #header>
                  <button class="arrow mr-1 sm:mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </button>
                  <InputHeader
                    type="header"
                    :title="`Layers (${basemaps[index].layers?.length ?? 0})`"
                    description="A set of URLs which should be composited to form a basemap entry. Stacked in ascending order, i.e. the first layer sits at the bottom and the last layer at the top."
                    required
                  />
                  <!-- add item button -->
                  <button
                    @click.stop="addBasemapLayer(index)"
                    class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
                  >
                    <svg
                      class="relative bottom-[2px]"
                      fill="white"
                      height="18px"
                      width="18px"
                      viewBox="0 0 23 21"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    <span class="px-2"> Add layer </span>
                  </button>
                </template>
                <template #default>
                  <draggable
                    v-if="basemaps[index].layers && basemaps[index].layers!.length > 0"
                    :list="basemaps[index].layers"
                    item-key="fake"
                    handle=".handle"
                  >
                    <template #item="{ element: layer, index: layerIndex }">
                      <Collapsible>
                        <template #header>
                          <button class="cursor-move handle mr-1 sm:mr-5" @click.stop>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                              />
                            </svg>
                          </button>
                          <button class="mr-1 sm:mr-3 arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="20"
                              viewBox="0 0 24 24"
                              width="20"
                            >
                              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                            </svg>
                          </button>
                          <span class="mr-1 sm:mr-5 sm:text-lg">{{
                            layer.id || `Layer ${layerIndex + 1}`
                          }}</span>
                          <button
                            @click.stop="removeBasemapLayer(index, layerIndex)"
                            class="ml-auto"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </template>
                        <template #default>
                          <div class="input-table">
                            <div>
                              <InputHeader
                                title="ID"
                                description="A unique id identifying the basemap's layer."
                                required
                              />
                              <input type="text" v-model="layer.id" />
                            </div>
                            <div>
                              <InputHeader title="Type" required />
                              <select v-model="layer.layerType">
                                <option key="esri-map-image" value="esri-map-image">
                                  Map Image
                                </option>
                                <option key="esri-tile" value="esri-tile">ESRI Tile</option>
                                <option key="osm-tile" value="osm-tile">OSM Tile</option>
                              </select>
                            </div>
                            <div>
                              <InputHeader
                                title="URL"
                                description="The basemap layer's url."
                                required
                              />
                              <input type="text" v-model="layer.url" />
                            </div>
                            <div>
                              <InputHeader
                                title="Opacity"
                                description="The basemap layer's opacity. Must be a number between 0 and 1."
                              />
                              <input type="number" v-model="layer.opacity" placeholder="1" />
                            </div>
                          </div>
                        </template>
                      </Collapsible>
                    </template>
                  </draggable>
                </template>
              </Collapsible>
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
                        :value="element?.attribution?.text?.value"
                        @input="e => onAttributionInput(index, 'text', 'value', (e.target as HTMLInputElement).value)"
                      />
                    </div>
                  </div>
                  <div class="flex items-center mt-4">
                    <input
                      type="checkbox"
                      :checked="element?.attribution?.text?.disabled"
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
                        :value="element?.attribution?.logo?.value"
                        @input="e => onAttributionInput(index, 'logo', 'value', (e.target as HTMLInputElement).value)"
                      />
                    </div>
                    <div>
                      <InputHeader title="Alt Text" description="Alternate text for the image." />
                      <input
                        type="text"
                        :value="element?.attribution?.logo?.altText"
                        @input="e => onAttributionInput(index, 'logo', 'altText', (e.target as HTMLInputElement).value)"
                      />
                    </div>
                    <div>
                      <InputHeader title="Link" description="URL to go to when image is clicked." />
                      <input
                        type="text"
                        :value="element?.attribution?.logo?.link"
                        @input="e => onAttributionInput(index, 'logo', 'link', (e.target as HTMLInputElement).value)"
                      />
                    </div>
                  </div>
                  <div class="flex items-center mt-4">
                    <input
                      type="checkbox"
                      :checked="element?.attribution?.logo?.disabled"
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
          </Collapsible>
        </template>
      </draggable>
    </template>
  </Collapsible>
</template>

<style lang="scss" scoped></style>
