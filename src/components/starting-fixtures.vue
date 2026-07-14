<script setup lang="ts">
// container.startingFixtures string array

import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { Input } from '@/components/helpers';
import { computed, ref } from 'vue';

defineProps({
    compact: Boolean
});

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

const FIXTURE_LABEL_KEYS: Record<string, string> = {
    appbar: 'appbar.title',
    basemap: 'basemap.title',
    details: 'details.title',
    export: 'export.title',
    geosearch: 'geosearch.title',
    grid: 'grid.title',
    help: 'help.title',
    hilight: 'hilight.title',
    'layer-reorder': 'layerReorder.title',
    legend: 'legend.title',
    mapnav: 'mapnav.title',
    metadata: 'metadata.title',
    northarrow: 'northArrow.title',
    overviewmap: 'overviewMap.title',
    scrollguard: 'scrollguard.title',
    settings: 'settings.title',
    wizard: 'wizard.title'
};

const showCustomInput = ref(false);

const selectedFixtures = computed<string[]>({
    get: () => store.startingFixtures ?? [],
    set: value => {
        store.startingFixtures = [...value];
    }
});

const usesDefaultFixtures = computed(
    () =>
        selectedFixtures.value.length === DEFAULT_FIXTURES.length &&
        selectedFixtures.value.every(fixture => DEFAULT_FIXTURES.includes(fixture))
);

const setDefaultFixtures = () => {
    selectedFixtures.value = [...DEFAULT_FIXTURES];
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
};

const fixtureLabel = (fixture: string) => {
    const key = FIXTURE_LABEL_KEYS[fixture];
    return key ? t(key) : fixture;
};
</script>

<template>
    <div class="defaults-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">
            {{ t('navbar.startingFixtures') }}
        </h3>

        <p class="defaults-copy">{{ t('startingFixtures.sidebar.description') }}</p>

        <section class="defaults-card">
            <div class="defaults-card-header">
                <div>
                    <h4>{{ t('wizard.defaults.mapFixtures.default') }}</h4>
                    <p>{{ t('wizard.defaults.mapFixtures.description') }}</p>
                </div>

                <button
                    type="button"
                    class="defaults-small-button"
                    :disabled="usesDefaultFixtures"
                    @click="setDefaultFixtures"
                >
                    {{ t('startingFixtures.sidebar.restoreDefault') }}
                </button>
            </div>
        </section>

        <div class="fixture-list">
            <label
                v-for="fixture in ALL_FIXTURES"
                :key="fixture"
                class="fixture-choice"
                :class="{ selected: selectedFixtures.includes(fixture) }"
            >
                <input
                    :checked="selectedFixtures.includes(fixture)"
                    type="checkbox"
                    @change="toggleFixture(fixture)"
                />
                <span class="fixture-choice-copy">
                    <strong>{{ fixtureLabel(fixture) }}</strong>
                    <small>{{ fixture }}</small>
                </span>
            </label>
        </div>

        <section class="defaults-card">
            <button type="button" class="defaults-disclosure" @click="showCustomInput = !showCustomInput">
                <span>{{ t('startingFixtures.sidebar.custom') }}</span>
                <span>{{ showCustomInput ? t('startingFixtures.sidebar.hide') : t('startingFixtures.sidebar.show') }}</span>
            </button>

            <Input
                v-if="showCustomInput"
                type="array"
                :title="t('startingFixtures.input')"
                v-model="store.startingFixtures"
                header-class="mt-4"
                input-class="w-full"
            />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.defaults-editor {
    display: grid;
    gap: 12px;
}

.defaults-copy,
.defaults-card p {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.defaults-card {
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
}

.defaults-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    h4 {
        margin: 0 0 4px;
        color: #111827;
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
    }
}

.defaults-small-button {
    flex: 0 0 auto;
    border: 1px solid #26374a;
    border-radius: 4px;
    padding: 6px 8px;
    background: #26374a;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;

    &:disabled {
        border-color: #d8dee5;
        background: #f3f6f9;
        color: #6b7280;
    }
}

.fixture-list {
    display: grid;
    gap: 8px;
}

.fixture-choice {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 10px 12px;
    background: #fff;
    color: #111827;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;

    &.selected {
        border-color: #26374a;
        background: #eef2f6;
    }
}

.fixture-choice-copy {
    display: grid;
    gap: 1px;

    strong,
    small {
        display: block;
    }

    strong {
        color: #111827;
        font-size: 13px;
        font-weight: 700;
        line-height: 17px;
    }

    small {
        color: #6b7280;
        font-size: 11px;
        font-weight: 500;
        line-height: 14px;
    }
}

.defaults-disclosure {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #111827;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;

    span:last-child {
        color: #26374a;
        font-size: 12px;
    }
}
</style>
