<script setup lang="ts">
// container.startingFixtures string array

import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
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

const COMMON_FIXTURES = ['legend', 'geosearch', 'details', 'mapnav', 'basemap', 'appbar', 'help'];

const BUILT_IN_FIXTURES = [
    'appbar',
    'areas-of-interest',
    'basemap',
    'crosshairs',
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
    'panguard',
    'scrollguard',
    'settings',
    'wizard'
];

const FIXTURE_LABEL_KEYS: Record<string, string> = {
    appbar: 'appbar.title',
    'areas-of-interest': 'aoi.title',
    basemap: 'basemap.title',
    crosshairs: 'startingFixtures.tools.crosshairs',
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
    panguard: 'startingFixtures.tools.panguard',
    scrollguard: 'scrollguard.title',
    settings: 'settings.title',
    wizard: 'wizard.title'
};

const builtInFixtureSet = new Set(BUILT_IN_FIXTURES);
const additionalFixtures = BUILT_IN_FIXTURES.filter(fixture => !COMMON_FIXTURES.includes(fixture));
const showAdditionalTools = ref(false);
const showExtensionTools = ref(false);
const extensionFixtureInput = ref('');

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

const additionalSelectedCount = computed(
    () => additionalFixtures.filter(fixture => selectedFixtures.value.includes(fixture)).length
);

const extensionFixtureIds = computed(() => {
    return selectedFixtures.value.filter(fixture => !builtInFixtureSet.has(fixture));
});

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

const addExtensionFixtureIds = () => {
    const fixtureIds = extensionFixtureInput.value
        .split(',')
        .map(fixture => fixture.trim())
        .filter(Boolean);

    if (!fixtureIds.length) {
        return;
    }

    selectedFixtures.value = [...new Set([...selectedFixtures.value, ...fixtureIds])];
    extensionFixtureInput.value = '';
};

const removeExtensionFixture = (fixture: string) => {
    selectedFixtures.value = selectedFixtures.value.filter(selectedFixture => selectedFixture !== fixture);
};

const onExtensionInputKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        addExtensionFixtureIds();
    }
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

        <section class="tool-group">
            <div class="tool-group-header">
                <h4>{{ t('startingFixtures.sidebar.common.title') }}</h4>
                <p>{{ t('startingFixtures.sidebar.common.description') }}</p>
            </div>

            <div class="fixture-list">
                <label
                    v-for="fixture in COMMON_FIXTURES"
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
        </section>

        <section class="defaults-card">
            <button
                type="button"
                class="defaults-disclosure"
                :aria-expanded="showAdditionalTools"
                @click="showAdditionalTools = !showAdditionalTools"
            >
                <span class="defaults-disclosure-copy">
                    <strong>{{ t('startingFixtures.sidebar.additional.title') }}</strong>
                    <small>{{ t('startingFixtures.sidebar.additional.description') }}</small>
                </span>
                <em>
                    {{
                        t('startingFixtures.sidebar.selected', {
                            count: additionalSelectedCount,
                            total: additionalFixtures.length
                        })
                    }}
                </em>
            </button>

            <div v-if="showAdditionalTools" class="fixture-list defaults-disclosure-content">
                <label
                    v-for="fixture in additionalFixtures"
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
        </section>

        <section class="defaults-card">
            <button
                type="button"
                class="defaults-disclosure"
                :aria-expanded="showExtensionTools"
                @click="showExtensionTools = !showExtensionTools"
            >
                <span class="defaults-disclosure-copy">
                    <strong>{{ t('startingFixtures.sidebar.extension.title') }}</strong>
                    <small>{{ t('startingFixtures.sidebar.extension.description') }}</small>
                </span>
                <em>{{ extensionFixtureIds.length }}</em>
            </button>

            <div v-if="showExtensionTools" class="extension-editor defaults-disclosure-content">
                <div v-if="extensionFixtureIds.length" class="extension-chips">
                    <span v-for="fixture in extensionFixtureIds" :key="fixture" class="extension-chip">
                        <span>{{ fixture }}</span>
                        <button
                            type="button"
                            :aria-label="t('startingFixtures.sidebar.extension.remove', { id: fixture })"
                            @click="removeExtensionFixture(fixture)"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </span>
                </div>
                <p v-else class="extension-empty">{{ t('startingFixtures.sidebar.extension.empty') }}</p>

                <form class="extension-form" @submit.prevent="addExtensionFixtureIds">
                    <label for="extension-fixture-id">
                        {{ t('startingFixtures.sidebar.extension.input') }}
                    </label>
                    <div>
                        <input
                            id="extension-fixture-id"
                            v-model="extensionFixtureInput"
                            type="text"
                            :placeholder="t('startingFixtures.sidebar.extension.placeholder')"
                            @keydown="onExtensionInputKeydown"
                        />
                        <button type="submit" :disabled="!extensionFixtureInput.trim()">
                            {{ t('startingFixtures.sidebar.extension.add') }}
                        </button>
                    </div>
                </form>
            </div>
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

.tool-group {
    display: grid;
    gap: 8px;
}

.tool-group-header {
    h4 {
        margin: 0 0 3px;
        color: #111827;
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
    }

    p {
        margin: 0;
        color: #4b5563;
        font-size: 13px;
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
    cursor: pointer;

    &.selected {
        border-color: #26374a;
        background: #eef2f6;
    }
}

.fixture-choice-copy {
    display: grid;
    min-width: 0;
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
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    border: 0;
    padding: 0;
    background: transparent;
    color: #111827;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;

    cursor: pointer;

    &:focus-visible {
        outline: 2px solid #26374a;
        outline-offset: 4px;
    }
}

.defaults-disclosure-copy {
    display: grid;
    min-width: 0;
    gap: 3px;

    strong,
    small {
        display: block;
    }

    strong {
        color: #111827;
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
    }

    small {
        color: #4b5563;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }
}

.defaults-disclosure em {
    flex: 0 0 auto;
    border: 1px solid #d8dee5;
    border-radius: 999px;
    padding: 3px 7px;
    background: #f7f9fb;
    color: #26374a;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    white-space: nowrap;
}

.defaults-disclosure-content {
    margin-top: 12px;
    border-top: 1px solid #e5e9ee;
    padding-top: 12px;
}

.extension-editor {
    display: grid;
    gap: 12px;
}

.extension-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.extension-chip {
    display: inline-flex;
    min-width: 0;
    max-width: 100%;
    align-items: center;
    gap: 5px;
    border: 1px solid #b7c6d6;
    border-radius: 999px;
    padding: 4px 5px 4px 9px;
    background: #eef2f6;
    color: #26374a;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;

    > span:first-child {
        min-width: 0;
        overflow-wrap: anywhere;
    }

    button {
        display: inline-flex;
        width: 22px;
        height: 22px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        padding: 0;
        background: transparent;
        color: #26374a;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;

        &:hover,
        &:focus-visible {
            background: #d8e1ea;
        }
    }
}

.extension-empty {
    margin: 0;
    color: #6b7280;
    font-size: 12px;
    line-height: 16px;
}

.extension-form {
    display: grid;
    gap: 6px;

    > label {
        color: #111827;
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
    }

    > div {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 8px;
    }

    input {
        width: 100%;
        min-width: 0;
        min-height: 36px;
        border: 1px solid #b7c6d6;
        border-radius: 4px;
        padding: 7px 9px;
        color: #111827;
        font-size: 13px;
        line-height: 18px;

        &:focus {
            border-color: #26374a;
            outline: 2px solid rgba(38, 55, 74, 0.15);
            outline-offset: 1px;
        }
    }

    button {
        min-height: 36px;
        border: 1px solid #26374a;
        border-radius: 4px;
        padding: 7px 10px;
        background: #26374a;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
        white-space: nowrap;
        cursor: pointer;

        &:disabled {
            border-color: #d8dee5;
            background: #eef2f6;
            color: #8a96a3;
            cursor: default;
        }
    }
}

@media (max-width: 420px) {
    .extension-form > div {
        grid-template-columns: 1fr;
    }
}
</style>
