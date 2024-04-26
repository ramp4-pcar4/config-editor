<script setup lang="ts">
import InputHeader from '@/components/helpers/input-header.vue';
import type { PropType } from 'vue';

const system = defineModel({
  type: Object as PropType<{
    proxyUrl?: string;
    zoomIcon?: string;
    animate?: boolean;
    exposeOid?: boolean;
    suppressNumberLocalization?: boolean;
    exposeMeasurements?: boolean;
    scrollToInstance?: boolean;
  }>
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">System</h1>
    <InputHeader
      class="mt-4"
      title="Proxy URL"
      description="An optional proxy to be used for dealing with same-origin issues. URL must either be a
      relative path on the same server or an absolute path on a server which sets CORS headers.
      Applies only to map services."
    />
    <input class="border-2 border-black p-2 w-full sm:w-[500px]" v-model="system!.proxyUrl" />
    <InputHeader
      class="mt-4"
      title="Zoom Icon"
      description="Determines which icon to display for the zoom button in the grid and details panels. Can be 'globe', 'magnify', or a custom icon. Defaults to globe."
    />
    <input class="border-2 border-black p-2 w-full sm:w-[500px]" v-model="system!.zoomIcon" />
    <div class="mt-4 flex items-center">
      <input type="checkbox" v-model="system!.animate" :checked="system!.animate !== false" />
      <InputHeader
        title="Animate"
        description="Will enable visual animation when using the site, such as control transitions."
        type="checkbox"
      />
    </div>
    <div class="mt-4 flex items-center">
      <input type="checkbox" v-model="system!.exposeOid" />
      <InputHeader
        title="Expose OID"
        description="Determines whether or not to include a feature's object ID field when viewing data on the site (e.g. within the details panel when identifying a feature)."
        type="checkbox"
      />
    </div>
    <div class="mt-4 flex items-center">
      <input
        type="checkbox"
        v-model="system!.exposeMeasurements"
        :checked="system!.exposeMeasurements !== false"
      />
      <InputHeader
        title="Expose Measurements"
        description="Determines whether or not to include a feature's Shape_Length and Shape_Area (e.g. within the details panel when identifying a feature)."
        type="checkbox"
      />
    </div>
    <div class="mt-4 flex items-center">
      <input type="checkbox" v-model="system!.suppressNumberLocalization" />
      <InputHeader
        title="Suppress Number Localization"
        description="Determines whether to display numbers in plain decimal format instead of formatting them based on the app language."
        type="checkbox"
      />
    </div>
    <div class="mt-4 flex items-center">
      <input type="checkbox" v-model="system!.scrollToInstance" />
      <InputHeader
        title="Scroll To Instance"
        description="Determines whether the browser will scroll to the RAMP instance when a button within the app is pressed."
        type="checkbox"
      />
    </div>
  </div>
</template>
