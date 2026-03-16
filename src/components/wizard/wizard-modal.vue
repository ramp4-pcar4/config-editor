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
                                active: i === state.stepIndex,
                                done: stepStatus(i) === 'done',
                                blocked: stepStatus(i) === 'blocked'
                            }"
                        >
                            <button
                                class="flex w-full cursor-pointer gap-[10px] rounded-[10px] border border-transparent bg-transparent p-[10px] text-left disabled:cursor-not-allowed disabled:opacity-50"
                                :class="{
                                    'border-gray-300 bg-gray-50': i === state.stepIndex
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
                                    <span class="mt-[2px] block text-[12px] text-gray-500">{{ s.hint(state) }}</span>
                                </span>
                            </button>
                        </li>
                    </ol>
                </aside>

                <!-- Content -->
                <main class="min-h-0 overflow-auto px-6 py-5">
                    <component
                        :is="activeStep.component"
                        :state="state"
                        :errors="stepErrors"
                        @update:state="updateState"
                    />
                </main>
            </section>

            <!-- Footer -->
            <footer class="flex items-center justify-between gap-[10px] border-t border-gray-200 px-[18px] py-3">
                <div>
                    <button
                        class="cursor-pointer rounded-[10px] border border-gray-300 bg-transparent px-3 py-2 text-[13px] disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="state.stepIndex === 0"
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
import { useI18n } from 'vue-i18n';

import StepDefaults from './step-defaults.vue';
import StepLayers from './step-layers.vue';
import StepBasemap from './step-basemap.vue';
import StepStartView from './step-start-view.vue';
import StepReview from './step-review.vue';

interface WizardLayer {
    id: string;
    name: string;
    sourceMode: 'file' | 'url';
    file?: File;
    fileName?: string;
    url?: string;
    detectedTypes: string[];
    selectedType?: string;
    order: number;
    errorMessage?: string;
}

type WizardState = {
    stepIndex: number;
    dirty: boolean;

    defaults: {
        locale?: string;
    };

    layers: WizardLayer[];

    basemap: {
        id?: string;
        selected?: any;
    };

    startView: {
        mode: 'mercatorDefault' | 'lambertDefault' | 'custom';
        extentSetId?: string;
        custom?: {
            xmin?: number;
            xmax?: number;
            ymin?: number;
            ymax?: number;
            spatialReference: {
                wkid?: number;
                latestWkid?: number;
            };
        };
    };
};

const props = defineProps<{
    open: boolean;
    initialState?: Partial<WizardState>;
}>();

const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'confirm', payload: WizardState): void;
    (e: 'cancel'): void;
}>();

const { t, locale } = useI18n();

const createDefaultState = (): WizardState => {
    return {
        stepIndex: 0,
        dirty: false,
        defaults: { locale: 'en' },
        layers: [],
        basemap: { id: undefined, selected: undefined },
        startView: {
            mode: 'mercatorDefault',
            extentSetId: 'EXT_ESRI_World_AuxMerc_3857'
        }
    };
};

const state = reactive<WizardState>({
    ...createDefaultState(),
    ...(props.initialState ?? {}),
    // Ensure required keys exist even if partial passed in
    defaults: { ...createDefaultState().defaults, ...(props.initialState?.defaults ?? {}) },
    basemap: { ...createDefaultState().basemap, ...(props.initialState?.basemap ?? {}) },
    startView: { ...createDefaultState().startView, ...(props.initialState?.startView ?? {}) },
    layers: props.initialState?.layers ? [...props.initialState.layers] : []
});

// Mark dirty on meaningful changes (simple approach)
watch(
    () => ({
        defaults: state.defaults,
        layers: state.layers,
        basemap: state.basemap,
        startView: state.startView
    }),
    () => {
        if (props.open) state.dirty = true;
    },
    { deep: true }
);

watch(
    () => props.open,
    isOpen => {
        if (isOpen) {
            // When opening, mark not dirty until they change something
            state.dirty = false;
        }
    }
);

const canConfirm = computed(() => readiness.value.hasLayer && readiness.value.hasBasemap);

// --- Steps definition (UI only) ---
const steps = [
    {
        id: 'defaults',
        title: 'Defaults',
        component: StepDefaults,
        hint: (s: WizardState) => `${s.defaults.locale ?? '—'}`
    },
    {
        id: 'layers',
        title: 'Layers',
        component: StepLayers,
        hint: (s: WizardState) => `${s.layers.length} added`
    },
    {
        id: 'basemap',
        title: 'Basemap',
        component: StepBasemap,
        hint: (s: WizardState) => (s.basemap.id ? 'Selected' : '—')
    },
    {
        id: 'startView',
        title: 'Start view',
        component: StepStartView,
        hint: (s: WizardState) => {
            if (s.startView.mode === 'mercatorDefault') return 'World Mercator';
            if (s.startView.mode === 'lambertDefault') return 'NRCan Lambert';
            if (s.startView.mode === 'custom') return 'Custom extent';
            return '—';
        }
    },
    {
        id: 'review',
        title: 'Review',
        component: StepReview,
        hint: (_s: WizardState) => 'Confirm'
    }
] as const;

const activeStep = computed(() => steps[state.stepIndex]);

const isLastStep = computed(() => state.stepIndex === steps.length - 1);

// --- Validation (minimal, per-step) ---
type StepError = { field?: string; message: string };
const stepErrors = ref<StepError[]>([]);

const validateStep = (stepId: (typeof steps)[number]['id']): StepError[] => {
    const errors: StepError[] = [];

    if (stepId === 'layers') {
        if (state.layers.length < 1) {
            errors.push({ message: 'Add at least one layer to continue.' });
        } else {
            for (const l of state.layers) {
                if (!l.name?.trim()) {
                    errors.push({ message: 'Each layer needs a name.' });
                }

                const hasFile = l.sourceMode === 'file' && !!l.file;
                const hasUrl = l.sourceMode === 'url' && !!l.url?.trim();

                if (!hasFile && !hasUrl) {
                    errors.push({ message: `Layer "${l.name || 'Unnamed'}" needs a file or a URL.` });
                }

                if (!l.selectedType) {
                    errors.push({ message: `Layer "${l.name || 'Unnamed'}" needs a detected layer type.` });
                }
            }
        }
    }

    if (stepId === 'basemap') {
        if (!state.basemap.id) errors.push({ message: 'Select a basemap to continue.' });
    }

    if (stepId === 'review') {
        // final check: layers + basemap valid
        if (state.layers.length < 1) errors.push({ message: 'You need at least one layer.' });
        if (!state.basemap.id) errors.push({ message: 'You need to choose a basemap.' });
    }

    return errors;
};

const canProceed = computed(() => {
    const errs = validateStep(activeStep.value.id);
    return errs.length === 0;
});

const proceedTooltip = computed(() => {
    const errs = validateStep(activeStep.value.id);
    return errs[0]?.message ?? '';
});

const readiness = computed(() => {
    return {
        hasLayer: state.layers.length > 0,
        hasBasemap: !!state.basemap.id
    };
});

// Stepper status: done if all prior validations pass for that step
const stepStatus = (i: number): 'done' | 'active' | 'blocked' | 'idle' => {
    if (i === state.stepIndex) return 'active';

    const stepId = steps[i].id;
    const errs = validateStep(stepId);

    // We only mark "done" for steps that are past AND error-free
    if (i < state.stepIndex) return errs.length ? 'blocked' : 'done';

    // Future step: show idle (or blocked if user already has issues? keep it simple)
    return 'idle';
};

const canNavigateTo = (i: number) => {
    // Allow jumping backward freely
    if (i <= state.stepIndex) return true;

    // Allow jumping forward only if all steps up to i-1 are valid
    for (let k = 0; k < i; k++) {
        const errs = validateStep(steps[k].id);
        if (errs.length) return false;
    }
    return true;
};

// --- Navigation ---
const goToStep = (i: number) => {
    if (!canNavigateTo(i)) return;
    stepErrors.value = [];
    state.stepIndex = i;
};

const goToStepById = (id: (typeof steps)[number]['id']) => {
    const idx = steps.findIndex(s => s.id === id);
    if (idx >= 0) goToStep(idx);
};

const next = () => {
    const errs = validateStep(activeStep.value.id);
    stepErrors.value = errs;
    if (errs.length) return;

    if (state.stepIndex < steps.length - 1) {
        state.stepIndex++;
        stepErrors.value = [];
    }
};

const back = () => {
    if (state.stepIndex > 0) {
        state.stepIndex--;
        stepErrors.value = [];
    }
};

// --- Confirm / Close handling ---
const showDiscardConfirm = ref(false);

const confirm = () => {
    const errs = validateStep('review');
    stepErrors.value = errs;
    if (errs.length) return;

    // Emit a deep-ish copy so parent can apply it safely
    const payload: WizardState = JSON.parse(JSON.stringify(state));
    emit('confirm', payload);
    emit('update:open', false);
};

const requestClose = () => {
    if (state.dirty) {
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
    // Clicking backdrop acts like cancel/close
    requestClose();
};

const updateState = (nextState: Partial<WizardState> | WizardState) => {
    Object.assign(state, nextState);
};
</script>

<style lang="scss" scoped></style>
