<template>
    <div>
        <h3 class="text-lg font-semibold">{{ t('wizard.defaults.title') }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t('wizard.defaults.description') }}</p>

        <!-- Config lang toggle -->
        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.defaults.basic') }}</h4>

            <div class="mt-4 grid gap-4 md:grid-cols-1">
                <div class="grid gap-2">
                    <label class="text-sm font-medium text-gray-900">{{ t('wizard.defaults.locale') }}</label>
                    <select
                        v-model="editingLang"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                    >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Define list of map fixtures on startup -->
        <div class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h4 class="text-sm font-semibold text-gray-900">{{ t('wizard.defaults.mapFixtures') }}</h4>
                    <p class="mt-1 text-sm text-gray-600">
                        {{ t('wizard.defaults.mapFixtures.description') }}
                    </p>
                </div>

                <label class="inline-flex shrink-0 items-center gap-2 text-sm text-gray-800">
                    <input
                        :checked="loadDefaultFixtures"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        @change="onLoadDefaultFixturesChange"
                    />
                    <span>{{ t('wizard.defaults.mapFixtures.default') }}</span>
                </label>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                <label
                    v-for="fixture in availableFixtures"
                    :key="fixture"
                    class="flex items-center gap-3 rounded-lg border px-3 py-2 transition"
                    :class="
                        loadDefaultFixtures
                            ? 'border-gray-200 bg-gray-50 text-gray-500'
                            : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                    "
                >
                    <input
                        :checked="selectedFixtures.includes(fixture)"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300"
                        @change="toggleFixture(fixture)"
                    />
                    <span class="text-sm">{{ fixture }}</span>
                </label>
            </div>
        </div>

        <ErrorList :errors="errors" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import ErrorList from './error-list.vue';
    
defineProps<{ errors: any[] }>();

const store = useStore();
const { t } = useI18n();

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

const ALL_FIXTURES = [
    'appbar',
    'basemap',
    'details',
    'export',
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
    'wizard'
];

const availableFixtures = ALL_FIXTURES;
const loadDefaultFixtures = ref(true);

const editingLang = computed({
    get: () => store.editingLang || 'en',
    set: (value: string) => {
        store.editingLang = value;
    }
});

const selectedFixtures = computed<string[]>({
    get: () => {
        return store.startingFixtures?.length ? [...store.startingFixtures] : [...DEFAULT_FIXTURES];
    },
    set: (value: string[]) => {
        store.startingFixtures = [...value];
    }
});

onMounted(() => {
    store.editingLang = store.editingLang || 'en';
});

const onLoadDefaultFixturesChange = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;
    loadDefaultFixtures.value = checked;

    if (checked) {
        selectedFixtures.value = [...DEFAULT_FIXTURES];
    }
};

const toggleFixture = (fixture: string) => {
    const nextFixtures = [...selectedFixtures.value];
    const index = nextFixtures.indexOf(fixture);

    if (index >= 0) {
        nextFixtures.splice(index, 1);
    } else {
        nextFixtures.push(fixture);
    }

    selectedFixtures.value = nextFixtures;
    // check if set of selected fixtures matchecs default fixtures
    loadDefaultFixtures.value = (selectedFixtures.value.length === DEFAULT_FIXTURES.length && selectedFixtures.value.every(f => DEFAULT_FIXTURES.includes(f)));
};
</script>