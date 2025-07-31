<script setup lang="ts">
// root.fixtures.hilight config nugget

import { reactive, ref, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import Select from '@/components/helpers/select.vue';
import Input from '@/components/helpers/input.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const mode = ref<string>(props.modelValue?.mode);
const options = reactive<any>(props.modelValue?.options ?? {});
const update = () => {
    const opts: any = {};
    if (mode.value === 'fog') {
        if (options.onOpacity !== undefined) {
            opts.onOpacity = options.onOpacity;
        }
        if (options.offOpacity !== undefined) {
            opts.offOpacity = options.offOpacity;
        }
    }
    const hilight: any = {};
    if (mode.value) {
        hilight.mode = mode.value;
    }
    if (Object.keys(opts).length > 0) {
        hilight.options = opts;
    }
    emit('update:modelValue', Object.keys(hilight).length === 0 ? undefined : hilight);
};

watch(options, update);

watch(mode, update);
</script>

<template>
    <Collapsible :thick-border="true" :title="t('hilight.title')" :description="t('hilight.description')">
        <div class="input-table">
            <Select
                :title="t('hilight.mode.title')"
                :description="t('hilight.mode.description')"
                v-model="mode"
                :options="[
                    { value: 'glow', label: t('hilight.mode.glow') },
                    { value: 'lift', label: t('hilight.mode.lift') },
                    { value: 'fog', label: t('hilight.mode.fog') },
                    { value: 'none', label: t('hilight.mode.none') }
                ]"
            />
            <Input
                v-if="mode === 'fog'"
                v-model="options.onOpacity"
                :title="t('hilight.onOpacity.title')"
                :description="t('hilight.onOpacity.description')"
                type="number"
                placeholder="0.75"
                min="0"
                max="1"
            />
            <Input
                v-if="mode === 'fog'"
                v-model="options.offOpacity"
                :title="t('hilight.offOpacity.title')"
                :description="t('hilight.offOpacity.description')"
                type="number"
                placeholder="0.02"
                min="0"
                max="1"
            />
        </div>
    </Collapsible>
</template>
