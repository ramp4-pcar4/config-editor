<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';
import type { RampExtentConfig } from '@/definitions';
import { ref, type PropType, onMounted, inject, watch } from 'vue';

// @ts-ignore
import { createInstance, geo } from 'ramp-pcar';
import { useI18n } from 'vue-i18n';

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

const { t } = useI18n();

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

const onInput = (key: string, val: string) => {
  const newExtent = <any>props.modelValue;

  if (['xmin', 'xmax', 'ymin', 'ymax'].includes(key)) {
    if (val === undefined) {
      delete newExtent[key];
    } else {
      newExtent[key] = val;
    }
  } else {
    newExtent.spatialReference = newExtent.spatialReference ?? {};
    if (val === undefined) {
      delete newExtent.spatialReference[key];
    } else {
      newExtent.spatialReference[key] = val;
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
    <button @click="saveExtent" class="mt-2 bg-black text-white p-1 hover:bg-gray-800">{{ t('extent.save') }}</button>
    <div class="mt-4">
      <div class="input-table">
        <Input
          :title="t('extent.xmin')"
          type="number"
          required
          :model-value="props.modelValue?.xmin"
          @update:model-value="(val) => onInput('xmin', val)"
        />
        <Input
          :title="t('extent.xmax')"
          type="number"
          required
          :model-value="props.modelValue?.xmax"
          @update:model-value="(val) => onInput('xmax', val)"
        />
        <Input
          :title="t('extent.ymin')"
          type="number"
          required
          :model-value="props.modelValue?.ymin"
          @update:model-value="(val) => onInput('ymin', val)"
        />
        <Input
          :title="t('extent.ymax')"
          type="number"
          required
          :model-value="props.modelValue?.ymax"
          @update:model-value="(val) => onInput('ymax', val)"
        />
      </div>
      <Collapsible :title="t('extent.spatialReference.title')" :description="t('extent.spatialReference.description')">
        <div class="input-table">
          <Input
            :title="t('extent.spatialReference.wkid.title')"
            :description="t('extent.spatialReference.wkid.description')"
            type="number"
            :model-value="props.modelValue?.spatialReference?.wkid"
            @update:model-value="(val) => onInput('wkid', val)"
          />
          <Input
            :title="t('extent.spatialReference.latestWkid.title')"
            :description="t('extent.spatialReference.latestWkid.description')"
            type="number"
            :model-value="props.modelValue?.spatialReference?.latestWkid"
            @update:model-value="(val) => onInput('latestWkid', val)"
          />
          <Input
            :title="t('extent.spatialReference.wkt.title')"
            :description="t('extent.spatialReference.wkt.description')"
            :model-value="props.modelValue?.spatialReference?.wkt"
            @update:model-value="(val) => onInput('wkt', val)"
          />
        </div>
      </Collapsible>
    </div>
  </Collapsible>
</template>
