<!-- steps/StepReview.vue -->
<template>
    <div>
        <h3 class="text-lg font-semibold">Summary</h3>
        <p class="text-gray-600 text-sm">Review your map settings, then exit to proceed to the main editor.</p>

        <div class="border border-gray-200 rounded-xl p-3 my-3">
            <h4 class="font-semibold">Layers ({{ state.layers.length }})</h4>
            <div v-if="!state.layers.length" class="text-gray-600 text-sm">—</div>
            <ul v-else class="mt-2 space-y-1 text-sm">
                <li v-for="l in layers" :key="l.id">
                    <strong>{{ l.name }}</strong> — {{ l.selectedType ?? 'auto' }}
                </li>
            </ul>
        </div>

        <div class="border border-gray-200 rounded-xl p-3 my-3">
            <h4 class="font-semibold">Basemap</h4>
            <div class="text-sm">{{ state.basemap.id ?? '—' }}</div>
        </div>

        <div class="border border-gray-200 rounded-xl p-3 my-3">
            <h4 class="font-semibold">Start view</h4>
            <div class="text-sm">{{ extent.mode }}</div>
        </div>

        <ErrorList :errors="errors" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ErrorList from './error-list.vue';

const props = defineProps<{ state: any; errors: any[] }>();

const state = computed(() => props.state);
const layers = computed(() => [...state.value.layers].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
const extent = computed(() => state.value.startView);

onMounted(() => {
    console.log('state', state.value);
});
</script>

<style lang="scss" scoped></style>
