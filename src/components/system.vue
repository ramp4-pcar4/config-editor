<script setup lang="ts">
import InputHeader from '@/components/helpers/input-header.vue';
import type { PropType } from 'vue';

const system = defineModel({
  type: Object as PropType<{
    proxyUrl?: string;
    animate?: boolean;
    exposeOid?: boolean;
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
  </div>
</template>
