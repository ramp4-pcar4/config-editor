<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import type { RampExtentConfig } from '@/definitions';
import type { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
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
  <Collapsible :title="props.title">
    <div>
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
