<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import type { RampExtentConfig } from '@/definitions';
import { ref, type PropType, onMounted, inject, watch } from 'vue';

// @ts-ignore
import { createInstance, geo } from '@/lib/ramp.browser.es.prod';

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    required: false
  },
  modelValue: {
    type: Object as PropType<RampExtentConfig>,
    required: true,
    default() {
      return {};
    }
  }
});

const rampConfig = {
  startingFixtures: ['appbar', 'basemap', 'mapnav', 'help'],
  configs: {
    en: {
      map: {
        extentSets: [
          {
            id: 'EXT_ESRI_World_AuxMerc_3857',
            default: {
              xmax: -5007771.626060756,
              xmin: -16632697.354854,
              ymax: 10015875.184845109,
              ymin: 5022907.964742964,
              spatialReference: {
                wkid: 102100,
                latestWkid: 3857
              }
            }
          },
          {
            id: 'EXT_NRCAN_Lambert_3978',
            default: {
              xmax: 3549492,
              xmin: -2681457,
              ymax: 3482193,
              ymin: -883440,
              spatialReference: {
                wkid: 3978
              }
            }
          }
        ],
        caption: {
          mapCoords: {
            formatter: 'WEB_MERCATOR'
          },
          scaleBar: {
            imperialScale: true
          }
        },
        lodSets: [
          {
            id: 'LOD_NRCAN_Lambert_3978',
            lods: geo.defaultLODs(geo.defaultTileSchemas()[0])
          },
          {
            id: 'LOD_ESRI_World_AuxMerc_3857',
            lods: geo.defaultLODs(geo.defaultTileSchemas()[1])
          }
        ],
        tileSchemas: [
          {
            id: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978',
            name: 'Lambert Maps',
            extentSetId: 'EXT_NRCAN_Lambert_3978',
            lodSetId: 'LOD_NRCAN_Lambert_3978',
            thumbnailTileUrls: ['/tile/8/285/268', '/tile/8/285/269'],
            hasNorthPole: true
          },
          {
            id: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857',
            name: 'Web Mercator Maps',
            extentSetId: 'EXT_ESRI_World_AuxMerc_3857',
            lodSetId: 'LOD_ESRI_World_AuxMerc_3857',
            thumbnailTileUrls: ['/tile/8/91/74', '/tile/8/91/75']
          }
        ],
        basemaps: [
          {
            id: 'baseNrCan',
            name: 'Canada Base Map - Transportation (CBMT)',
            description:
              'The Canada Base Map - Transportation (CBMT) web mapping services of the Earth Sciences Sector at Natural Resources Canada, are intended primarily for online mapping application users and developers.',
            altText: 'The Canada Base Map - Transportation (CBMT)',
            layers: [
              {
                id: 'CBMT',
                layerType: 'esri-tile',
                url: 'https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT3978/MapServer'
              }
            ],
            tileSchemaId: 'EXT_NRCAN_Lambert_3978#LOD_NRCAN_Lambert_3978'
          },
          {
            id: 'baseEsriWorld',
            name: 'World Imagery',
            description:
              'World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide.',
            altText: 'World Imagery',
            layers: [
              {
                id: 'World_Imagery',
                layerType: 'esri-tile',
                url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
              }
            ],
            tileSchemaId: 'EXT_ESRI_World_AuxMerc_3857#LOD_ESRI_World_AuxMerc_3857',
            attribution: {
              text: {
                disabled: true
              },
              logo: {
                disabled: true
              }
            }
          }
        ],
        initialBasemapId: 'baseNrCan'
      },
      layers: [],
      fixtures: {
        appbar: {
          items: ['basemap']
        },
        mapnav: { items: ['fullscreen', 'help', 'home', 'basemap'] }
      },
      system: { animate: true }
    }
  }
};

let rampApi: any;

onMounted(() => {
  watch(rampInstance, () => {
    if (!!rampInstance.value) {
      rampApi = createInstance(rampInstance.value, rampConfig, {
        loadDefaultFixtures: true,
        loadDefaultEvents: true
      });
    }
  });
});

const saveExtent = () => {
  const rampExtent = rampApi.geo.map.getExtent();
  const newExtent = {
    xmin: rampExtent.xmin,
    xmax: rampExtent.xmax,
    ymin: rampExtent.ymin,
    ymax: rampExtent.ymax,
    spatialReference: {} as any
  };
  Object.keys(rampExtent.sr).forEach((k) => {
    if (rampExtent.sr[k] !== undefined) {
      newExtent.spatialReference[k] = rampExtent.sr[k];
    }
  });
  emit('update:modelValue', newExtent);
};

const rampInstance = ref<HTMLDivElement>();
const emit = defineEmits(['update:modelValue']);

const onInput = (e: Event) => {
  const newExtent = <any>props.modelValue;
  const key = (e.target as HTMLInputElement).name;
  const val = (e.target as HTMLInputElement).value;

  if (['xmin', 'xmax', 'ymin', 'ymax'].includes(key)) {
    if (val === '') {
      delete newExtent[key];
    } else {
      newExtent[key] = Number(val);
    }
  } else {
    newExtent.spatialReference = newExtent.spatialReference ?? {};
    if (val === '') {
      delete newExtent.spatialReference[key];
    } else if (key === 'wkt') {
      newExtent.spatialReference[key] = val;
    } else {
      newExtent.spatialReference[key] = Number(val);
    }

    if (Object.keys(newExtent.spatialReference).length === 0) {
      delete newExtent.spatialReference;
    }
  }

  emit('update:modelValue', Object.keys(newExtent).length === 0 ? undefined : newExtent);
};
</script>

<template>
  <Collapsible :title="props.title" :required="required" :description="description">
    <div ref="rampInstance" class="w-full max-w-2xl h-96"></div>
    <button @click="saveExtent" class="mt-2 bg-black text-white p-1 hover:bg-gray-800">
      Set Map Extent As Config
    </button>
    <div class="mt-4">
      <div class="input-table">
        <div>
          <input-header title="xmin" required />
          <input type="number" name="xmin" :value="props.modelValue?.xmin" @input="onInput" />
        </div>
        <div>
          <input-header title="xmax" required />
          <input type="number" name="xmax" :value="props.modelValue?.xmax" @input="onInput" />
        </div>
        <div>
          <input-header title="ymin" required />
          <input type="number" name="ymin" :value="props.modelValue?.ymin" @input="onInput" />
        </div>
        <div>
          <input-header title="ymax" required />
          <input type="number" name="ymax" :value="props.modelValue?.ymax" @input="onInput" />
        </div>
      </div>
      <InputHeader
        class="my-4"
        type="header"
        title="Spatial Reference"
        description="Properties to help define map projection. One of the wkt, wkid, and latestWkid must be
        specified."
      />
      <div class="input-table">
        <div>
          <input-header title="wkid" description="A well known ESRI id denoting a projection." />
          <input
            type="number"
            name="wkid"
            :value="props.modelValue?.spatialReference?.wkid"
            @input="onInput"
          />
        </div>
        <div>
          <input-header
            title="latestWkid"
            description="A well known ESRI id denoting a projection."
          />
          <input
            type="number"
            name="latestWkid"
            :value="props.modelValue?.spatialReference?.latestWkid"
            @input="onInput"
          />
        </div>
        <div>
          <input-header title="wkt" description="A well known type projection definition." />
          <input
            type="text"
            name="wkt"
            :value="props.modelValue?.spatialReference?.wkt"
            @input="onInput"
          />
        </div>
      </div>
    </div>
  </Collapsible>
</template>
