<script setup lang="ts">
// friendly halper for optional booleans

// note this currently isn't being used. Relying on the `checked` attribute of checkboxes for appropriate display
// of default values.  Doing that allows us to use checkboxes, which is nice.
// But that approach means a user can never set the value back to undefined once the value gets set.
// This tri-boolean control will allow that.

import Select from '@/components/helpers/select.vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type TriBoolery = boolean | undefined;
type ComboString = 'T' | 'F' | 'U';

const { t } = useI18n();

/**
 * This is what we are binding to. I.e. the thing linked to the actual RAMP config property
 */
const model = defineModel<TriBoolery>();

const props = defineProps({
    checked: Boolean,
    title: {
        type: String,
        required: true
    },
    disabled: Boolean,
    description: String
});

/**
 * Maps the real bound value to a char that represents the value
 */
const realToCombo = computed<ComboString>(() => (model.value === false ? 'F' : model.value ? 'T' : 'U'));

/**
 * Binds to the value of the combo box
 */
const comboValue = ref<ComboString>(realToCombo.value);

/**
 * When user changes combo, sets the real bound value to the actual fancy value we desire
 */
watch(comboValue, (newComboVal: ComboString) => {
    if (newComboVal === 'T') {
        model.value = true;
    } else if (newComboVal === 'F') {
        model.value = false;
    } else {
        model.value = undefined;
    }
});
</script>

<template>
    <Select
        :title="props.title"
        :description="props.description"
        v-model="comboValue"
        :options="[
            { label: t('triboool.true'), value: 'T' },
            { label: t('triboool.false'), value: 'F' },
            { label: t('triboool.undefined'), value: 'U' }
        ]"
    />
</template>
