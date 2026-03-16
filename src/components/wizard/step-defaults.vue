<template>
    <div>
        <h3 class="text-lg font-semibold">Defaults</h3>
        <p class="mt-1 text-sm text-gray-600">Choose basic map defaults and startup fixture settings.</p>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">Basic defaults</h4>

            <div class="mt-4 grid gap-4 md:grid-cols-1">
                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">Locale</label>
                    <select
                        :value="defaults.locale"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                        @change="onLocaleChange"
                    >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h4 class="text-sm font-semibold text-gray-900">Map fixtures on startup</h4>
                    <p class="mt-1 text-sm text-gray-600">
                        Choose which fixtures are included when the map initializes.
                    </p>
                </div>

                <label class="inline-flex shrink-0 items-center gap-2 text-sm text-gray-800">
                    <input
                        :checked="defaults.loadDefaultFixtures"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        @change="onLoadDefaultFixturesChange"
                    />
                    <span>Load default map fixtures</span>
                </label>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                <label
                    v-for="fixture in availableFixtures"
                    :key="fixture"
                    class="flex items-center gap-3 rounded-lg border px-3 py-2 transition"
                    :class="
                        defaults.loadDefaultFixtures
                            ? 'border-gray-200 bg-gray-50 text-gray-500'
                            : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                    "
                >
                    <input
                        :checked="selectedFixtures.includes(fixture)"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        :disabled="defaults.loadDefaultFixtures"
                        @change="toggleFixture(fixture)"
                    />
                    <span class="text-sm">{{ formatFixtureName(fixture) }}</span>
                </label>
            </div>
        </div>

        <ErrorList :errors="errors" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ErrorList from './error-list.vue';

const props = defineProps<{ state: any; errors: any[] }>();
const emit = defineEmits<{ (e: 'update:state', v: any): void }>();

const DEFAULT_FIXTURES = [
    'appbar',
    'basemap',
    'crosshairs',
    'details',
    'geosearch',
    'grid',
    'help',
    'hilight',
    'layer-reorder',
    'legend',
    'mapnav',
    'northarrow',
    'overviewmap',
    'panguard',
    'scrollguard',
    'settings',
    'wizard'
];

const AVAILABLE_FIXTURES = [
    'appbar',
    'areas-of-interest',
    'basemap',
    'details',
    'draw',
    'export',
    'extentGuard',
    'geosearch',
    'grid',
    'help',
    'hilight',
    'layer-reorder',
    'legend',
    'mapnav',
    'metadata',
    'northarrow',
    'overviewmap',
    'scrollguard',
    'settings',
    'swipe',
    'wizard'
];

const state = computed(() => props.state);

const defaults = computed(() => {
    const current = state.value.defaults ?? {};

    return {
        locale: current.locale ?? 'en',
        loadDefaultFixtures: current.loadDefaultFixtures ?? true,
        fixtures: current.fixtures ?? [...DEFAULT_FIXTURES]
    };
});

const availableFixtures = AVAILABLE_FIXTURES;
const selectedFixtures = computed(() => defaults.value.fixtures ?? []);

const updateDefaults = (patch: Partial<typeof defaults.value>) => {
    const nextDefaults = {
        ...defaults.value,
        ...patch
    };

    emit('update:state', {
        ...state.value,
        defaults: nextDefaults
    });
};

const onLocaleChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    updateDefaults({ locale: value });
};

const onLoadDefaultFixturesChange = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;

    updateDefaults({
        loadDefaultFixtures: checked,
        fixtures: checked ? [...DEFAULT_FIXTURES] : [...selectedFixtures.value]
    });
};

const toggleFixture = (fixture: string) => {
    if (defaults.value.loadDefaultFixtures) return;

    const nextFixtures = [...selectedFixtures.value];
    const index = nextFixtures.indexOf(fixture);

    if (index >= 0) {
        nextFixtures.splice(index, 1);
    } else {
        nextFixtures.push(fixture);
    }

    updateDefaults({
        fixtures: nextFixtures
    });
};

const formatFixtureName = (fixture: string) => {
    return fixture
        .replace(/-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, char => char.toUpperCase());
};
</script>
