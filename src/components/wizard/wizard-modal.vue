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
                    <h2 class="m-0 text-[18px]">Quick Start Wizard</h2>
                    <p class="mt-1 text-[13px] text-gray-600">Set up a working RAMP instance in a few steps</p>
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

            <!-- Body -->
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

                <!-- Content -->
                <main class="min-h-0 overflow-auto px-6 py-5">
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
                        Back
                    </button>
                </div>

                <div class="flex items-center gap-8">
                    <button
                        v-if="!isLastStep"
                        class="cursor-pointer rounded-[10px] border border-black bg-black px-3 py-2 text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="!canProceed"
                        :title="!canProceed ? proceedTooltip : ''"
                        @click="next"
                    >
                        Next
                    </button>

                    <button
                        v-else
                        class="cursor-pointer rounded-[10px] border border-black bg-black px-3 py-2 text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="!canConfirm"
                        :title="!canConfirm ? 'Complete required steps to confirm' : ''"
                        @click="confirm"
                    >
                        Confirm & Enter Advanced Editor
                    </button>
                </div>
            </footer>

            <!-- Discard dialog -->
            <div
                v-if="showDiscardConfirm"
                class="absolute inset-0 grid place-items-center bg-black/35 p-4"
                @click.self="showDiscardConfirm = false"
            >
                <div class="w-full max-w-[420px] rounded-[14px] border border-gray-200 bg-white p-[14px]">
                    <h4 class="mb-[6px] mt-0">Discard wizard changes?</h4>
                    <p class="mb-3 text-[13px] text-gray-600">Your changes in the wizard haven’t been applied yet.</p>
                    <div class="flex justify-end gap-[10px]">
                        <button
                            class="cursor-pointer rounded-[10px] border border-gray-300 bg-transparent px-3 py-2 text-[13px]"
                            @click="showDiscardConfirm = false"
                        >
                            Keep editing
                        </button>
                        <button
                            class="cursor-pointer rounded-[10px] border border-red-700 bg-red-700 px-3 py-2 text-[13px] text-white"
                            @click="forceClose"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue';
import { useStore } from '@/store';

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

type WizardUiState = {
    stepIndex: number;
    dirty: boolean;
};

type StepError = { field?: string; message: string };

const ui = reactive<WizardUiState>({
    stepIndex: 0,
    dirty: false
});

const showDiscardConfirm = ref(false);
const stepErrors = ref<StepError[]>([]);

watch(
    () => props.open,
    isOpen => {
        if (isOpen) {
            ui.dirty = false;
            ui.stepIndex = 0;
        }
    }
);

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
        if (props.open) ui.dirty = true;
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

const validateStep = (stepId: (typeof steps)[number]['id']): StepError[] => {
    const errors: StepError[] = [];

    if (stepId === 'layers') {
        if (currentLayers.value.length < 1) {
            errors.push({ message: 'Add at least one layer to continue.' });
        } else {
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
            }
        }
    }

    if (stepId === 'basemap') {
        if (!currentBasemapId.value) {
            errors.push({ message: 'Select a basemap to continue.' });
        }
    }

    if (stepId === 'review') {
        if (currentLayers.value.length < 1) {
            errors.push({ message: 'You need at least one layer.' });
        }

        if (!currentBasemapId.value) {
            errors.push({ message: 'You need to choose a basemap.' });
        }
    }

    return errors;
};

const readiness = computed(() => ({
    hasLayer: currentLayers.value.length > 0,
    hasBasemap: !!currentBasemapId.value
}));

const canConfirm = computed(() => readiness.value.hasLayer && readiness.value.hasBasemap);

const canProceed = computed(() => validateStep(activeStep.value.id).length === 0);

const proceedTooltip = computed(() => {
    const errs = validateStep(activeStep.value.id);
    return errs[0]?.message ?? '';
});

const stepStatus = (i: number): 'done' | 'active' | 'blocked' | 'idle' => {
    if (i === ui.stepIndex) return 'active';

    const errs = validateStep(steps[i].id);

    if (i < ui.stepIndex) return errs.length ? 'blocked' : 'done';

    return 'idle';
};

const canNavigateTo = (i: number) => {
    if (i <= ui.stepIndex) return true;

    for (let k = 0; k < i; k++) {
        const errs = validateStep(steps[k].id);
        if (errs.length) return false;
    }

    return true;
};

const goToStep = (i: number) => {
    if (!canNavigateTo(i)) return;

    stepErrors.value = [];
    ui.stepIndex = i;
};

const next = () => {
    const errs = validateStep(activeStep.value.id);
    stepErrors.value = errs;

    if (errs.length) return;

    if (ui.stepIndex < steps.length - 1) {
        ui.stepIndex++;
        stepErrors.value = [];
    }
};

const back = () => {
    if (ui.stepIndex > 0) {
        ui.stepIndex--;
        stepErrors.value = [];
    }
};

const confirm = () => {
    const errs = validateStep('review');
    stepErrors.value = errs;

    if (errs.length) return;

    emit('confirm');
    emit('update:open', false);
};

const requestClose = () => {
    if (ui.dirty) {
        showDiscardConfirm.value = true;
        return;
    }

    emit('cancel');
    emit('update:open', false);
};

const forceClose = () => {
    showDiscardConfirm.value = false;
    emit('cancel');
    emit('update:open', false);
};

const onBackdrop = () => {
    requestClose();
};
</script>
