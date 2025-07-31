<script setup lang="ts">
// root.fixtures.[any].panelTeleport config nugget

import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';
import Checkbox from '@/components/helpers/checkbox.vue';
import List from '@/components/helpers/list.vue';
import type { Field, PanelTeleportObject } from '@/definitions';
import { reactive, type PropType, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<PanelTeleportObject>,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const teleport = reactive<PanelTeleportObject>(props.modelValue ?? {});
let breakpoints = reactive<Array<{ className?: string; minWidth?: number | undefined }>>(
    props.modelValue?.breakpoints
        ? Object.keys(props.modelValue.breakpoints).map(k => {
              return { className: k, minWidth: props.modelValue!.breakpoints![k] };
          })
        : []
);

watch(breakpoints, () => {
    const newBreakpoints: { [key: string]: number | undefined } = {};
    breakpoints.forEach(bp => {
        if (bp.className) {
            newBreakpoints![bp.className] = bp.minWidth;
        }
    });

    if (Object.keys(newBreakpoints).length > 0) {
        teleport.breakpoints = newBreakpoints;
    } else {
        delete teleport.breakpoints;
    }
});

watch(teleport, () => {
    emit('update:modelValue', teleport);
});

const breakpointFields: Array<Field> = [
    {
        property: 'className',
        title: 'teleport.breakpoint.className.title',
        description: 'teleport.breakpoint.className.description',
        type: 'string',
        required: true
    },
    {
        property: 'minWidth',
        title: 'teleport.breakpoint.minWidth.title',
        description: 'teleport.breakpoint.minWidth.description',
        type: 'number',
        min: 0,
        required: true
    }
];
</script>

<template>
    <Collapsible :title="title ?? t('teleport.title')" :description="description ?? t('teleport.description')">
        <div class="input-table">
            <Input
                :title="t('teleport.target.title')"
                :description="t('teleport.target.description')"
                required
                v-model="teleport.target"
            />
        </div>
        <Checkbox
            :title="t('teleport.showHeader.title')"
            :description="t('teleport.showHeader.description')"
            checked
            v-model="teleport.showHeader"
        />
        <Checkbox
            :title="t('teleport.showAppbarButton.title')"
            :description="t('teleport.showAppbarButton.description')"
            checked
            v-model="teleport.showAppbarButton"
        />
        <List
            v-model="breakpoints"
            :item-fields="breakpointFields"
            :title="t('teleport.breakpoints.title')"
            :description="t('teleport.breakpoints.description')"
            :add-prompt="t('teleport.breakpoints.add')"
            :remove-prompt="t('teleport.breakpoints.remove')"
        />
    </Collapsible>
</template>
