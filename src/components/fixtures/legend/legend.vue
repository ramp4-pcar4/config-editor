<script setup lang="ts">
// root.fixtures.legend config nugget

import { Collapsible, Input } from '@/components/helpers';
import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import Children from '@/components/fixtures/legend/children.vue';
import HeaderControls from '@/components/fixtures/legend/header-controls.vue';
import MultilineItems from '@/components/fixtures/legend/multiline-items.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const legend = reactive<any>({ ...{ root: {} }, ...props.modelValue });

watch(legend, () => {
    if (!Array.isArray(legend.headerControls)) {
        delete legend.headerControls;
    }
    emit('update:modelValue', legend);
});
</script>

<template>
    <div class="fixture-tool-editor">
        <p class="fixture-tool-copy">{{ t('legend.editor.copy') }}</p>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('legend.editor.layout.title') }}</h5>
                <p>{{ t('legend.editor.layout.description') }}</p>
            </div>
            <div class="input-table">
                <Input
                    :title="t('panelWidth.title')"
                    :description="t('panelWidth.description')"
                    type="number"
                    v-model="legend.panelWidth"
                    min="0"
                />
            </div>
            <HeaderControls v-model="legend.headerControls" />
            <MultilineItems v-model="legend.multilineItems" />
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('legend.root.title') }}</h5>
                <p>{{ t('legend.root.description') }}</p>
            </div>
            <Collapsible :title="t('legend.root.title')" :description="t('legend.root.description')">
                <Children v-model="legend.root.children" />
            </Collapsible>
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('teleport.title') }}</h5>
                <p>{{ t('teleport.description') }}</p>
            </div>
            <PanelTeleport v-model="legend.panelTeleport" />
        </section>
    </div>
</template>

<style scoped lang="scss">
.fixture-tool-editor {
    display: grid;
    gap: 12px;
}

.fixture-tool-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.fixture-tool-section {
    display: grid;
    gap: 10px;
    border: 1px solid #d8dee5;
    border-radius: 6px;
    padding: 12px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.fixture-tool-section-header {
    display: grid;
    gap: 3px;

    h5,
    p {
        margin: 0;
    }

    h5 {
        color: #111827;
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
    }

    p {
        color: #6b7280;
        font-size: 12px;
        line-height: 16px;
    }
}
</style>
