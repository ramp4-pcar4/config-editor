<!-- steps/StepReview.vue -->
<template>
    <div>
        <h3>Review</h3>
        <p class="muted">Confirm your choices, then we’ll return to the main editor.</p>

        <div class="card">
            <h4>Basemap</h4>
            <div>{{ state.basemap.id ?? '—' }}</div>
        </div>

        <div class="card">
            <h4>Layers ({{ state.layers.length }})</h4>
            <div v-if="!state.layers.length" class="muted">—</div>
            <ul v-else>
                <li v-for="l in layers" :key="l.id">
                    <strong>{{ l.name }}</strong> — {{ l.layerType ?? 'auto' }} — {{ l.visibility ? 'ON' : 'OFF' }}
                </li>
            </ul>
        </div>

        <div class="card">
            <h4>Start view</h4>
            <div>{{ startViewLabel }}</div>
        </div>

        <ErrorList :errors="errors" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ErrorList from './error-list.vue';

const props = defineProps<{ state: any; errors: any[] }>();

const state = computed(() => props.state);
const layers = computed(() => [...state.value.layers].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

const startViewLabel = computed(() => {
    const m = state.value.startView.mode;
    if (m === 'zoomToLayers') return 'Zoom to layers';
    if (m === 'default') return 'Default';
    return 'Custom';
});
</script>

<style lang="scss" scoped>
.muted {
    color: #666;
    font-size: 13px;
}
.card {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    margin: 12px 0;
}
ul {
    margin: 8px 0 0;
    padding-left: 18px;
}
</style>
