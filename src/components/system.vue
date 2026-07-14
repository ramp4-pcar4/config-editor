<script setup lang="ts">
// root.system config nugget

// NOTE could change the checkboxes here to TriBooleans.
//      Visually it looks better with the stack of checkboxes,
//      and because these are singular props on a nugget, the use of the `checked` attribute
//      is ok-enough.  You can't set a value back to undefined, but thats not really a big dealio.

import { Checkbox, Input } from '@/components/helpers';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';

defineProps({
    compact: Boolean
});

const store = useStore();
const { t } = useI18n();

type SystemSectionId = 'network' | 'display' | 'feature-data' | 'behavior';

const activeSection = ref<SystemSectionId | ''>('');
const showAdvancedSettings = ref(false);

const sectionCards = computed(() => [
    {
        id: 'network' as SystemSectionId,
        title: t('system.sidebar.network.title'),
        description: t('system.sidebar.network.description'),
        meta: store.elc.system!.proxyUrl || t('system.sidebar.notSet'),
        common: true,
        custom: !!store.elc.system!.proxyUrl
    },
    {
        id: 'display' as SystemSectionId,
        title: t('system.sidebar.display.title'),
        description: t('system.sidebar.display.description'),
        meta: store.elc.system!.zoomIcon || t('system.sidebar.default'),
        common: true,
        custom: !!store.elc.system!.zoomIcon
    },
    {
        id: 'feature-data' as SystemSectionId,
        title: t('system.sidebar.featureData.title'),
        description: t('system.sidebar.featureData.description'),
        meta: t('system.sidebar.advanced'),
        common: false,
        custom: store.elc.system!.exposeOid || store.elc.system!.exposeMeasurements === false
    },
    {
        id: 'behavior' as SystemSectionId,
        title: t('system.sidebar.behavior.title'),
        description: t('system.sidebar.behavior.description'),
        meta: t('system.sidebar.advanced'),
        common: false,
        custom: store.elc.system!.suppressNumberLocalization || store.elc.system!.scrollToInstance
    }
]);

const commonSectionCards = computed(() => sectionCards.value.filter(section => section.common));
const advancedSectionCards = computed(() => sectionCards.value.filter(section => !section.common));

const activeSectionTitle = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.title ?? t('navbar.system');
});

const activeSectionDescription = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.description ?? '';
});

const activeSectionMeta = computed(() => {
    return sectionCards.value.find(section => section.id === activeSection.value)?.meta ?? '';
});
</script>

<template>
    <div class="system-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">{{ t('navbar.system') }}</h3>

        <template v-if="!activeSection">
            <p class="system-copy">{{ t('system.sidebar.description') }}</p>

            <section class="system-group">
                <div class="system-group-header">
                    <h4>{{ t('system.sidebar.common.title') }}</h4>
                    <p>{{ t('system.sidebar.common.description') }}</p>
                </div>

                <button
                    v-for="section in commonSectionCards"
                    :key="section.id"
                    type="button"
                    class="system-card"
                    @click="activeSection = section.id"
                >
                    <span>
                        <strong>{{ section.title }}</strong>
                        <small>{{ section.description }}</small>
                    </span>
                    <em :class="{ custom: section.custom }">{{ section.meta }}</em>
                </button>
            </section>

            <section class="system-group">
                <button type="button" class="system-disclosure" @click="showAdvancedSettings = !showAdvancedSettings">
                    <span>
                        <strong>{{ t('system.sidebar.advancedSettings.title') }}</strong>
                        <small>{{ t('system.sidebar.advancedSettings.description') }}</small>
                    </span>
                    <em>{{ advancedSectionCards.length }}</em>
                </button>

                <div v-if="showAdvancedSettings" class="system-advanced-list">
                    <button
                        v-for="section in advancedSectionCards"
                        :key="section.id"
                        type="button"
                        class="system-card"
                        @click="activeSection = section.id"
                    >
                        <span>
                            <strong>{{ section.title }}</strong>
                            <small>{{ section.description }}</small>
                        </span>
                        <em :class="{ custom: section.custom }">{{ section.meta }}</em>
                    </button>
                </div>
            </section>
        </template>

        <template v-else>
            <button type="button" class="system-back" @click="activeSection = ''">
                <span aria-hidden="true">&lt;</span>
                {{ t('navbar.system') }}
            </button>

            <div class="system-editor-header">
                <div>
                    <h4 class="system-section-title">{{ activeSectionTitle }}</h4>
                    <p class="system-copy">{{ activeSectionDescription }}</p>
                </div>
                <em>{{ activeSectionMeta }}</em>
            </div>

            <section v-if="activeSection === 'network'" class="system-section-card">
                <Input
                    :title="t('system.proxyUrl.title')"
                    :description="t('system.proxyUrl.description')"
                    v-model="store.elc.system!.proxyUrl"
                    input-class="w-full"
                />
            </section>

            <section v-else-if="activeSection === 'display'" class="system-section-card">
                <Input
                    :title="t('system.zoomIcon.title')"
                    :description="t('system.zoomIcon.description')"
                    v-model="store.elc.system!.zoomIcon"
                    input-class="w-full"
                />
                <Checkbox
                    v-model="store.elc.system!.animate"
                    checked
                    :title="t('system.animate.title')"
                    :description="t('system.animate.description')"
                />
            </section>

            <section v-else-if="activeSection === 'feature-data'" class="system-section-card">
                <Checkbox
                    v-model="store.elc.system!.exposeOid"
                    :title="t('system.exposeOid.title')"
                    :description="t('system.exposeOid.description')"
                />
                <Checkbox
                    v-model="store.elc.system!.exposeMeasurements"
                    checked
                    :title="t('system.exposeMeasurements.title')"
                    :description="t('system.exposeMeasurements.description')"
                />
            </section>

            <section v-else-if="activeSection === 'behavior'" class="system-section-card">
                <Checkbox
                    v-model="store.elc.system!.suppressNumberLocalization"
                    :title="t('system.suppressNumberLocalization.title')"
                    :description="t('system.suppressNumberLocalization.description')"
                />
                <Checkbox
                    v-model="store.elc.system!.scrollToInstance"
                    :title="t('system.scrollToInstance.title')"
                    :description="t('system.scrollToInstance.description')"
                />
            </section>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.system-editor {
    display: grid;
    gap: 12px;
}

.system-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.system-group,
.system-advanced-list {
    display: grid;
    gap: 8px;
}

.system-group-header {
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

.system-disclosure,
.system-card {
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
        max-width: 120px;
        overflow: hidden;
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
        text-overflow: ellipsis;
        white-space: nowrap;

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

.system-disclosure {
    min-height: 64px;
    border-style: dashed;

    em {
        min-width: 32px;
    }
}

.system-editor-header {
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
        max-width: 120px;
        overflow: hidden;
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
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.system-back {
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

.system-section-title {
    margin: 0;
    color: #111827;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}

.system-section-card {
    display: grid;
    gap: 12px;
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
}
</style>
