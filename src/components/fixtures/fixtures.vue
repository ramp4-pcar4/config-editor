<script setup lang="ts">
import { useStore } from '@/store';
import Appbar from '@/components/fixtures/appbar.vue';
import AreasOfInterest from '@/components/fixtures/areas-of-interest.vue';

const store = useStore();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Fixtures</h1>
    <Appbar />
    <AreasOfInterest />
  </div>
</template>
