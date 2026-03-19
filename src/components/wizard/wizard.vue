<template>
    <div class="ramp4-config-editor">
        <button @click="isWizardOpen = true">Open Quick Start Wizard</button>

        <WizardModal
            v-model:open="isWizardOpen"
            @confirm="applyWizardState"
            @cancel="onWizardCancel"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WizardModal from './wizard-modal.vue';

const isWizardOpen = ref(false);

// optional: keep draft state around to resume
const draftWizardState = ref<any>(undefined);

const applyWizardState = () => {
    // Later: translate wizard state -> RAMP config schema
    // For now: store draft for inspection
    // draftWizardState.value = state;

    // Example: you would call something like:
    // rampConfigStore.applyWizard(state)
};

const onWizardCancel = () => {
    // optional: keep draftWizardState so they can resume
};
</script>

<style lang="scss" scoped></style>
