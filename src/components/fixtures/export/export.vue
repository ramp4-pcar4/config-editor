<script setup lang="ts">
// root.fixtures.export config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import { Input } from '@/components/helpers';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import ExportComponent from '@/components/fixtures/export/export-component.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const xport = reactive<any>({
    title: {},
    map: {},
    mapElements: {},
    legend: {},
    footnote: {},
    timestamp: {},
    ...props.modelValue
});

watch(xport, () => {
    const xportCopy = JSON.parse(JSON.stringify(xport));
    if (xportCopy.fileName === undefined) {
        delete xportCopy.fileName;
    }
    if (xportCopy.panelWidth === undefined) {
        delete xportCopy.fileName;
    }
    if (xportCopy.title.value === undefined) {
        delete xportCopy.title.value;
    }
    if (xportCopy.footnote.value === undefined) {
        delete xportCopy.footnote.value;
    }
    if (xportCopy.legend.columnWidth === undefined) {
        delete xportCopy.legend.columnWidth;
    }
    Object.keys(xportCopy).forEach((key: string) => {
        if (typeof xportCopy[key] === 'object' && Object.keys(xportCopy[key]).length === 0) {
            delete xportCopy[key];
        }
    });
    emit('update:modelValue', Object.keys(xportCopy).length === 0 ? undefined : xportCopy);
});
</script>

<template>
    <div class="fixture-tool-editor">
        <p class="fixture-tool-copy">{{ t('export.editor.copy') }}</p>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('export.editor.basics.title') }}</h5>
                <p>{{ t('export.editor.basics.description') }}</p>
            </div>
            <div class="input-table">
                <Input
                    :title="t('panelWidth.title')"
                    :description="t('panelWidth.description')"
                    type="number"
                    v-model="xport.panelWidth"
                    min="0"
                />
                <Input
                    :title="t('export.fileName.title')"
                    :description="t('export.fileName.description')"
                    v-model="xport.fileName"
                />
            </div>
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('export.editor.content.title') }}</h5>
                <p>{{ t('export.editor.content.description') }}</p>
            </div>
            <ExportComponent
                :title="t('export.title.title')"
                :description="t('export.title.description')"
                v-model:selected="xport.title.selected"
                v-model:selectable="xport.title.selectable"
            >
                <div class="input-table">
                    <Input
                        :title="t('export.title.value.title')"
                        :description="t('export.title.value.description')"
                        v-model="xport.title.value"
                        placeholder="RAMP-Map / PCAR-Carte"
                    />
                </div>
            </ExportComponent>
            <ExportComponent
                :title="t('export.map.title')"
                :description="t('export.map.description')"
                v-model:selected="xport.map.selected"
                v-model:selectable="xport.map.selectable"
            />
            <ExportComponent
                :title="t('export.mapElements.title')"
                :description="t('export.mapElements.description')"
                v-model:selected="xport.mapElements.selected"
                v-model:selectable="xport.mapElements.selectable"
            />
            <ExportComponent
                :title="t('export.legend.title')"
                :description="t('export.legend.description')"
                v-model:selected="xport.legend.selected"
                v-model:selectable="xport.legend.selectable"
            >
                <div class="input-table">
                    <Input
                        :title="t('export.legend.columnWidth.title')"
                        :description="t('export.legend.columnWidth.description')"
                        v-model="xport.legend.columnWidth"
                        type="number"
                        min="0"
                    />
                </div>
            </ExportComponent>
            <ExportComponent
                :title="t('export.footnote.title')"
                :description="t('export.footnote.description')"
                v-model:selected="xport.footnote.selected"
                v-model:selectable="xport.footnote.selectable"
            >
                <div class="input-table">
                    <Input
                        :title="t('export.footnote.value.title')"
                        :description="t('export.footnote.value.description')"
                        v-model="xport.footnote.value"
                    />
                </div>
            </ExportComponent>
            <ExportComponent
                :title="t('export.timestamp.title')"
                :description="t('export.timestamp.description')"
                v-model:selected="xport.timestamp.selected"
                v-model:selectable="xport.timestamp.selectable"
            />
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('teleport.title') }}</h5>
                <p>{{ t('teleport.description') }}</p>
            </div>
            <PanelTeleport v-model="xport.panelTeleport" />
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
