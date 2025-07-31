<script setup lang="ts">
// root.layers[].controls config nugget

// TODO fix typescript grouses. Keying on enums is sorta evil. Find smarter way. Maybe ditch the enum alltogether since all we really care about is the values.
//      eyeballing things, could prob use `allControls` as the source for that multiselect.

import { ref, type PropType, watch } from 'vue';
import { LayerControl } from '@/definitions';

import { useI18n } from 'vue-i18n';
import MultiSelect from '@/components/helpers/multi-select.vue';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<LayerControl>>,
        required: false
    },
    disabled: {
        type: Boolean,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

const allControls = [
    LayerControl.BoundaryZoom,
    LayerControl.Datatable,
    LayerControl.Identify,
    LayerControl.Metadata,
    LayerControl.Opacity,
    LayerControl.Refresh,
    LayerControl.Reload,
    LayerControl.Remove,
    LayerControl.Settings,
    LayerControl.Symbology,
    LayerControl.Visibility
];

const controls = ref<Array<LayerControl>>(
    props.modelValue ?? (props.disabled ? [] : JSON.parse(JSON.stringify(allControls)))
);

watch(controls, () => {
    emit(
        'update:modelValue',
        props.disabled
            ? controls.value.length === 0
                ? undefined
                : controls.value
            : controls.value.length === 11
            ? undefined
            : controls.value
    );
});
</script>

<template>
    <MultiSelect
        :title="disabled ? t('layer.disabledControls') : t('layer.controls')"
        v-model="controls"
        :options="Object.keys(LayerControl).map(ctrl => {
    return {value: LayerControl[<'Identify'>ctrl], label: t(`layer.control.${LayerControl[<'Identify'>ctrl]}`)}
  })"
    />
</template>
