<script setup lang="ts">
// root.fixtures.grid config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Input } from '@/components/helpers';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import MergeGrids from '@/components/fixtures/grid/merge-grids.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const grid = reactive<any>(props.modelValue ?? {});

watch(grid, () => {
    emit('update:modelValue', grid);
});
</script>

<template>
    <div class="fixture-tool-editor">
        <p class="fixture-tool-copy">{{ t('grid.editor.copy') }}</p>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('grid.mergeGrids.title') }}</h5>
                <p>{{ t('grid.mergeGrids.description') }}</p>
            </div>
            <MergeGrids v-model="grid.mergeGrids" />
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('grid.editor.panel.title') }}</h5>
                <p>{{ t('grid.editor.panel.description') }}</p>
            </div>
            <div class="input-table">
                <Input
                    :title="t('panelWidth.title')"
                    :description="t('panelWidth.description')"
                    type="number"
                    v-model="grid.panelWidth"
                    min="0"
                />
            </div>
            <PanelTeleport v-model="grid.panelTeleport" />
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
