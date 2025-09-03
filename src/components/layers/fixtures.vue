<script setup lang="ts">
// handles both of these:
// root.layers[].fixtures config nugget
// root.layers[].sublayers[].fixtures config nugget

// its a bit tricky, since WMS has sublayers, but it only accepts .fixtures on the parent config.
// MIL sublayers on the other hand can have some fixture stuff on the parent, but also fixture stuff on the sublayers.
//     the sublayer fixtures are usually targeting "attribute"-related settings (grid, details)

import { computed, reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { LayerType } from '@/definitions';
import type { Field } from '@/definitions';
import { Collapsible, Input, List } from '@/components/helpers';
import Controls from '@/components/layers/controls.vue';
import Grid from '@/components/fixtures/grid/options.vue';
import * as LayerTools from '@/components/layers/layer-tools';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    },
    /**
     * Layer type of the top-most layer. So if we're putting fixtures on a sublayer, this will be the parent layer type
     */
    layerType: {
        type: String as PropType<LayerType>,
        required: true
    },
    /**
     * If we're targeting the fixtures of sublayers
     */
    sublayer: {
        type: Boolean as PropType<boolean>,
        required: true
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

/**
 * Determines if the thing owning the fixtures can support standard attributes
 */
const supportsAttributes = computed<boolean>(
    () => LayerTools.isAttributeLayer(props.layerType) || (LayerTools.isMIL(props.layerType) && props.sublayer)
);

const fixtures = reactive<any>({
    details: props.modelValue?.details ?? {},
    settings: props.modelValue?.settings ?? {},
    grid: props.modelValue?.grid ?? {}
});

const detailsFields: Array<Field> = [
    {
        type: 'string',
        property: 'field',
        title: 'layer.fixtures.details.fields.field.title',
        description: 'layer.fixtures.details.fields.field.description',
        required: true
    },
    {
        type: 'string',
        property: 'alias',
        title: 'layer.fixtures.details.fields.alias.title',
        description: 'layer.fixtures.details.fields.alias.description',
        required: false
    },
    {
        type: 'boolean',
        property: 'visible',
        checked: true,
        title: 'layer.fixtures.details.fields.visible.title',
        description: 'layer.fixtures.details.fields.visible.description',
        required: false
    }
];

watch(fixtures, () => {
    // this watches for any changes to the fixture nuggets, and throws up the entire object to the parent control.
    emit('update:modelValue', fixtures);
});
</script>

<template>
    <Collapsible :title="t('layer.fixtures')">
        <Collapsible v-if="supportsAttributes || LayerTools.isWMS(layerType)" :title="t('layer.fixtures.details')">
            <div class="input-table">
                <Input
                    :title="t('layer.fixtures.details.template.title')"
                    :description="t('layer.fixtures.details.template.description')"
                    v-model="fixtures.details.template"
                />
                <Input
                    :title="t('layer.fixtures.details.priority.title')"
                    :description="t('layer.fixtures.details.priority.description')"
                    v-model="fixtures.details.priority"
                    type="number"
                    placeholder="50"
                />
            </div>
            <List
                v-if="supportsAttributes"
                v-model="fixtures.details.fields"
                :item-fields="detailsFields"
                :title="t('layer.fixtures.details.fields.title')"
                :add-prompt="t('layer.fixtures.details.fields.add')"
                :remove-prompt="t('layer.fixtures.details.fields.remove')"
                :description="t('layer.fixtures.details.fields.description')"
            />
        </Collapsible>
        <Collapsible :title="t('layer.fixtures.settings')">
            <Controls v-model="fixtures.settings.controls" />
            <Controls v-model="fixtures.settings.disabledControls" disabled />
        </Collapsible>
        <Grid v-if="supportsAttributes" :title="t('layer.fixtures.grid')" v-model="fixtures.grid" />
    </Collapsible>
</template>
