<template>
    <div
        v-if="open"
        class="ramp4-config-editor fixed inset-0 z-[9999] grid place-items-center bg-black/45 p-6"
        @click.self="onBackdrop"
    >
        <div
            class="grid h-full max-h-[780px] w-full max-w-[1200px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-[14px] bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Quick Start Wizard"
        >
            <!-- Header -->
            <header class="flex items-start justify-between border-b border-gray-200 px-[18px] py-4">
                <div>
                    <h2 class="m-0 text-[18px]">{{ t('wizard.quickStart') }}</h2>
                    <p class="mt-1 text-[13px] text-gray-600">{{ t('wizard.setup') }}</p>
                </div>

                <div class="flex">
                    <button
                        class="cursor-pointer rounded-[10px] border border-gray-300 bg-transparent px-[10px] py-2 text-[13px]"
                        aria-label="Close"
                        @click="requestClose"
                    >
                        ✕
                    </button>
                </div>
            </header>

            <section class="grid min-h-0 grid-cols-[240px_minmax(0,1fr)]">
                <!-- Stepper -->
                <aside class="overflow-auto border-r border-gray-200 p-3">
                    <ol class="m-0 grid list-none gap-[6px] p-0">
                        <li
                            v-for="(s, i) in steps"
                            :key="s.id"
                            :class="{
                                active: i === ui.stepIndex,
                                done: stepStatus(i) === 'done',
                                blocked: stepStatus(i) === 'blocked'
                            }"
                        >
                            <button
                                class="flex w-full cursor-pointer gap-[10px] rounded-[10px] border border-transparent bg-transparent p-[10px] text-left disabled:cursor-not-allowed disabled:opacity-50"
                                :class="{
                                    'border-gray-300 bg-gray-50': i === ui.stepIndex
                                }"
                                :disabled="!canNavigateTo(i)"
                                @click="goToStep(i)"
                            >
                                <span
                                    class="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-gray-300 text-[13px]"
                                    :class="{
                                        'bg-green-50': stepStatus(i) === 'done',
                                        'bg-orange-50': stepStatus(i) === 'blocked'
                                    }"
                                >
                                    <template v-if="stepStatus(i) === 'done'">✓</template>
                                    <template v-else>{{ i + 1 }}</template>
                                </span>

                                <span>
                                    <span class="text-[13px] font-semibold">{{ s.title }}</span>
                                    <span class="mt-[2px] block text-[12px] text-gray-500">{{ s.hint() }}</span>
                                </span>
                            </button>
                        </li>
                    </ol>
                </aside>

                <!-- Step content -->
                <main ref="stepContent" class="min-h-0 overflow-auto px-6 py-5">
                    <component :is="activeStep.component" :errors="stepErrors" />
                </main>
            </section>

            <!-- Footer -->
            <footer class="flex items-center justify-between gap-[10px] border-t border-gray-200 px-[18px] py-3">
                <div>
                    <button
                        class="cursor-pointer rounded-[10px] border border-gray-300 bg-transparent px-3 py-2 text-[13px] disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="ui.stepIndex === 0"
                        @click="back"
                    >
                        {{ t('wizard.back') }}
                    </button>
                </div>

                <div class="flex items-center gap-8">
                    <button
                        v-if="!isLastStep"
                        class="cursor-pointer rounded-[10px] border border-black bg-black px-3 py-2 text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="!canProceed"
                        :title="!canProceed ? proceedMessage : ''"
                        @click="next"
                    >
                        {{ t('wizard.next') }}
                    </button>

                    <button
                        v-else
                        class="cursor-pointer rounded-[10px] border border-black bg-black px-3 py-2 text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="!canConfirm"
                        :title="!canConfirm ? 'Complete required steps to confirm' : ''"
                        @click="confirm"
                    >
                        {{ t('wizard.confirm') }}
                    </button>
                </div>
            </footer>

            <!-- Discard changes confirmation -->
            <div
                v-if="showDiscardConfirm"
                class="absolute inset-0 grid place-items-center bg-black/35 p-4 z-10"
                @click.self="showDiscardConfirm = false"
            >
                <div class="w-full max-w-[420px] rounded-[14px] border border-gray-200 bg-white p-[14px]">
                    <h4 class="mb-[6px] mt-0">{{ t('wizard.discardChanges') }}</h4>
                    <p class="mb-3 text-[13px] text-gray-600">{{ t('wizard.discardWarning') }}</p>
                    <div class="flex justify-end gap-[10px]">
                        <button
                            class="cursor-pointer rounded-[10px] border border-gray-300 bg-transparent px-3 py-2 text-[13px]"
                            @click="showDiscardConfirm = false"
                        >
                            {{ t('wizard.cancel') }}
                        </button>
                        <button
                            class="cursor-pointer rounded-[10px] border border-red-700 bg-red-700 px-3 py-2 text-[13px] text-white"
                            @click="forceClose"
                        >
                            {{ t('wizard.discard') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, watch, ref } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

import StepDefaults from './step-defaults.vue';
import StepLayers from './step-layers.vue';
import StepBasemap from './step-basemap.vue';
import StepStartView from './step-extent.vue';
import StepReview from './step-review.vue';

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
}>();

const store = useStore();
const { t } = useI18n();

type WizardUiState = {
    stepIndex: number;
    modified: boolean;
};

type StepError = { field?: string; message: string };

const stepContent = ref<HTMLElement | null>(null);

const ui = reactive<WizardUiState>({
    stepIndex: 0,
    modified: false
});

const showDiscardConfirm = ref(false);
const stepErrors = ref<StepError[]>([]);

// reset scroll position when step changes
watch(
    () => ui.stepIndex,
    () => {
        nextTick(() => {
            stepContent.value?.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
);

watch(
    () => props.open,
    isOpen => {
        if (isOpen) {
            ui.modified = false;
            ui.stepIndex = 0;
        }
    }
);

// check if any changes were made while wizard open
watch(
    () => ({
        editingLang: store.editingLang,
        startingFixtures: store.startingFixtures,
        layers: store.elc?.layers,
        basemapId: store.elc?.map?.initialBasemapId,
        extentSets: store.elc?.map?.extentSets,
        tileSchemas: store.elc?.map?.tileSchemas
    }),
    () => {
        if (props.open) ui.modified = true;
    },
    { deep: true }
);

const currentLayers = computed(() => store.elc?.layers ?? []);
const currentBasemapId = computed(() => store.elc?.map?.initialBasemapId);
const currentExtentSetId = computed(() => store.elc?.map?.tileSchemas?.[0]?.extentSetId);

const extentModeLabel = computed(() => {
    if (currentExtentSetId.value === 'EXT_ESRI_World_AuxMerc_3857') return 'World Mercator';
    if (currentExtentSetId.value === 'EXT_NRCAN_Lambert_3978') return 'NRCan Lambert';
    if (currentExtentSetId.value) return 'Custom extent';
    return '—';
});

// defined wizard steps
const steps = [
    {
        id: 'defaults',
        title: 'Defaults',
        component: StepDefaults,
        hint: () => store.editingLang || '—'
    },
    {
        id: 'layers',
        title: 'Layers',
        component: StepLayers,
        hint: () => `${currentLayers.value.length} added`
    },
    {
        id: 'basemap',
        title: 'Basemap',
        component: StepBasemap,
        hint: () => (currentBasemapId.value ? 'Selected' : '—')
    },
    {
        id: 'startView',
        title: 'Start view',
        component: StepStartView,
        hint: () => extentModeLabel.value
    },
    {
        id: 'review',
        title: 'Review',
        component: StepReview,
        hint: () => 'Confirm'
    }
] as const;

const activeStep = computed(() => steps[ui.stepIndex]);
const isLastStep = computed(() => ui.stepIndex === steps.length - 1);

// step validation logic
const validateStep = (stepId: (typeof steps)[number]['id']): StepError[] => {
    const errors: StepError[] = [];

    if (stepId === 'layers') {
        for (const layer of currentLayers.value) {
            if (!layer.name?.trim()) {
                errors.push({ message: 'Each layer needs a name.' });
            }

            if (!layer.layerType) {
                errors.push({ message: `Layer "${layer.name || 'Unnamed'}" needs a layer type.` });
            }

            if (!layer.url?.trim()) {
                errors.push({ message: `Layer "${layer.name || 'Unnamed'}" needs a URL.` });
            }

            if (layer.layerType === 'esri-map-image' && (!layer.sublayers || layer.sublayers.length < 1)) {
                errors.push({ message: `Layer "${layer.name || 'Unnamed'}" needs at least one sublayer.` });
            }
        }
    }

    if (stepId === 'basemap') {
        if (!currentBasemapId.value) {
            errors.push({ message: 'Select a basemap to continue.' });
        }
    }

    if (stepId === 'review') {
        if (!currentBasemapId.value) {
            errors.push({ message: 'You need to choose a basemap.' });
        }
    }

    return errors;
};

const canConfirm = computed(() => !!currentBasemapId.value);
const canProceed = computed(() => validateStep(activeStep.value.id).length === 0);

const proceedMessage = computed(() => {
    const errs = validateStep(activeStep.value.id);
    return errs[0]?.message ?? '';
});

const stepStatus = (i: number): 'done' | 'active' | 'blocked' | 'NA' => {
    if (i === ui.stepIndex) {
        return 'active';
    }

    const errs = validateStep(steps[i].id);

    if (i < ui.stepIndex) {
        return errs.length ? 'blocked' : 'done';
    }

    return 'NA';
};

// whether to disable step
const canNavigateTo = (stepIdx: number) => {
    if (stepIdx <= ui.stepIndex) return true;

    for (let i = 0; i < stepIdx; i++) {
        const errs = validateStep(steps[i].id);
        if (errs.length) return false;
    }

    return true;
};

// navigate to step
const goToStep = (i: number) => {
    if (!canNavigateTo(i)) {
        return;
    }
    stepErrors.value = [];
    ui.stepIndex = i;
};

// jump to next step
const next = () => {
    const errs = validateStep(activeStep.value.id);
    stepErrors.value = errs;

    if (errs.length) {
        return;
    }

    if (ui.stepIndex < steps.length - 1) {
        ui.stepIndex++;
        stepErrors.value = [];
    }
};

// jump to last step
const back = () => {
    if (ui.stepIndex > 0) {
        ui.stepIndex--;
        stepErrors.value = [];
    }
};

// confirm and exit to main editor
const confirm = () => {
    const errs = validateStep('review');
    stepErrors.value = errs;

    if (errs.length) {
        return;
    }

    emit('confirm');
    emit('update:open', false);
};

// check if unsaved changes
const requestClose = () => {
    if (ui.modified) {
        showDiscardConfirm.value = true;
        return;
    }

    emit('cancel');
    emit('update:open', false);
};

// force close wizard
const forceClose = () => {
    showDiscardConfirm.value = false;
    emit('cancel');
    emit('update:open', false);
};

const onBackdrop = () => {
    requestClose();
};
</script>
