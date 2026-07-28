<script setup lang="ts">
// root.panels config nugget

import { Checkbox, List } from '@/components/helpers';
import type { Field } from '@/definitions';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';

const store = useStore();
const { t } = useI18n();

defineProps({
    compact: Boolean
});

type PanelSectionId = 'reorderable' | 'open';

const activeSection = ref<PanelSectionId | ''>('');

const itemFields: Array<Field> = [
    {
        type: 'string',
        property: 'id',
        title: 'panels.open.id.title',
        description: 'panels.open.id.description',
        required: true
    },
    {
        type: 'string',
        property: 'screen',
        title: 'panels.open.screen.title',
        description: 'panels.open.screen.description'
    },
    {
        type: 'boolean',
        property: 'pin',
        title: 'panels.open.pin.title',
        description: 'panels.open.pin.description'
    }
];

const sectionCards = computed(() => [
    {
        id: 'reorderable' as PanelSectionId,
        title: t('panels.reorderable.title'),
        description: t('panels.reorderable.description'),
        meta: store.elc.panels!.reorderable === false ? t('panels.sidebar.off') : t('panels.sidebar.on'),
        custom: store.elc.panels!.reorderable === false
    },
    {
        id: 'open' as PanelSectionId,
        title: t('panels.open.title'),
        description: t('panels.open.description'),
        meta: t('panels.sidebar.count', { count: store.elc.panels!.open?.length ?? 0 }),
        custom: !!store.elc.panels!.open?.length
    }
]);

const activeSectionTitle = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.title ?? t('navbar.panels');
});

const activeSectionDescription = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.description ?? '';
});

const activeSectionMeta = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.meta ?? '';
});
</script>

<template>
    <div class="panels-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">{{ t('navbar.panels') }}</h3>

        <template v-if="!activeSection">
            <p class="panels-copy">{{ t('panels.sidebar.description') }}</p>

            <section class="panels-group">
                <div class="panels-group-header">
                    <h4>{{ t('panels.sidebar.group.title') }}</h4>
                    <p>{{ t('panels.sidebar.group.description') }}</p>
                </div>

                <button
                    v-for="section in sectionCards"
                    :key="section.id"
                    type="button"
                    class="panels-card"
                    @click="activeSection = section.id"
                >
                    <span>
                        <strong>{{ section.title }}</strong>
                        <small>{{ section.description }}</small>
                    </span>
                    <em :class="{ custom: section.custom }">{{ section.meta }}</em>
                </button>
            </section>
        </template>

        <template v-else>
            <button type="button" class="panels-back" @click="activeSection = ''">
                <span aria-hidden="true">&lt;</span>
                {{ t('navbar.panels') }}
            </button>

            <div class="panels-editor-header">
                <div>
                    <h4 class="panels-section-title">{{ activeSectionTitle }}</h4>
                    <p class="panels-copy">{{ activeSectionDescription }}</p>
                </div>
                <em>{{ activeSectionMeta }}</em>
            </div>

            <section v-if="activeSection === 'reorderable'" class="panels-section-card">
                <Checkbox
                    v-model="store.elc.panels!.reorderable"
                    checked
                    :title="t('panels.reorderable.title')"
                    :description="t('panels.reorderable.description')"
                />
            </section>

            <List
                v-else-if="activeSection === 'open'"
                v-model="store.elc.panels!.open"
                :item-fields="itemFields"
                :title="t('panels.open.title')"
                :add-prompt="t('panels.open.add')"
                :remove-prompt="t('panels.open.remove')"
                :description="t('panels.open.description')"
                top-level
            />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.panels-editor {
    display: grid;
    gap: 12px;
}

.panels-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.panels-group {
    display: grid;
    gap: 8px;
}

.panels-group-header {
    h4,
    p {
        margin: 0;
    }

    h4 {
        color: #111827;
        font-size: 13px;
        font-weight: 700;
        line-height: 18px;
    }

    p {
        margin-top: 2px;
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}

.panels-card {
    display: flex;
    min-height: 72px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 12px;
    background: #fff;
    color: #111827;
    text-align: left;
    outline: none;

    strong,
    small,
    em {
        display: block;
    }

    strong {
        font-size: 14px;
        line-height: 18px;
    }

    small {
        margin-top: 4px;
        color: #6b7280;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }

    em {
        flex: 0 0 auto;
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 4px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        font-weight: 700;
        font-style: normal;
        line-height: 14px;
        text-align: center;

        &.custom {
            border-color: #b7c6d6;
            background: #eef2f6;
        }
    }

    &:hover,
    &:focus {
        border-color: #26374a;
        background: #f3f6f9;
    }
}

.panels-editor-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;

    div {
        display: grid;
        gap: 4px;
    }

    em {
        flex: 0 0 auto;
        border: 1px solid #d8dee5;
        border-radius: 999px;
        padding: 4px 8px;
        background: #f8fafc;
        color: #26374a;
        font-size: 11px;
        font-weight: 700;
        font-style: normal;
        line-height: 14px;
        text-align: center;
    }
}

.panels-back {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 4px;
    padding: 6px 8px;
    color: #26374a;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;

    span {
        font-size: 20px;
        line-height: 16px;
    }

    &:hover,
    &:focus {
        background: #eef2f6;
    }
}

.panels-section-title {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}

.panels-section-card {
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
}
</style>
