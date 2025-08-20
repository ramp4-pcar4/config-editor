<script setup lang="ts">
// root.layers[].fixtures config nugget

// TODO the <Grid> component is turning on for any layer other than WMS.  Big time lies.
//      should only turn on for layers that support attributes.
//      Easy way: extent to exclude MIL, Tile, Imagery
//      Smart way: refactor so the "layer tester" methods can be imported and used here, then leverage isAttributeLayer()

// TODO could consider hiding the details fixture nugget for certain layers.
//      Only Attribute-supporting and WMS layers should count.
//      Also, the "fields" list should be hidden for WMS as it doesn't have fields.

import { type PropType, watch, reactive } from 'vue';
import { LayerType } from '@/definitions';
import type { Field } from '@/definitions';
import Collapsible from '@/components/helpers/collapsible.vue';
import Input from '@/components/helpers/input.vue';
import Controls from '@/components/layers/controls.vue';
import Grid from '@/components/fixtures/grid/options.vue';
import List from '@/components/helpers/list.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    },
    layerType: {
        type: String as PropType<LayerType>,
        required: true
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);

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
        title: 'layer.fixtures.details.fields.visible.title',
        description: 'layer.fixtures.details.fields.visible.description',
        required: false
    }
];

const fancyDetailsFieldAdd = () => {
    // the "visible" property for fields defaults to true.
    // But in vue controls world, the default value is actually undefined. Which leads the checkbox to display as unchecked.
    // This results in BIG LIES to the user. To get a valid "not visible" setting they need to check the box (changing undefined to true),
    // then uncheck it (changing true to false).
    // This magical override method defaults the new field to be defaulted with true, not undefined. Will add a bit of extra spam to the output config,
    // but that is better than big lies.

    if (!Array.isArray(fixtures.details.fields)) {
        fixtures.details.fields = [];
    }
    fixtures.details.fields.push({ visible: true });
};

watch(fixtures, () => {
    // this watches for any changes to the fixture nuggets, and throws up the entire object to the parent control.
    emit('update:modelValue', fixtures);
});
</script>

<template>
    <Collapsible :title="t('layer.fixtures')">
        <Collapsible :title="t('layer.fixtures.details')">
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
                v-model="fixtures.details.fields"
                :item-fields="detailsFields"
                :add="fancyDetailsFieldAdd"
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
        <Grid v-if="layerType !== LayerType.WMS" :title="t('layer.fixtures.grid')" v-model="fixtures.grid" />
    </Collapsible>
</template>
