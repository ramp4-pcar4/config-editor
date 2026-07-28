<script setup lang="ts">
// root.fixtures.geosearch config nugget

import { reactive, watch } from 'vue';
import type { PropType } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import ServiceUrls from '@/components/fixtures/geosearch/service-urls.vue';
import Settings from '@/components/fixtures/geosearch/settings.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: false
    }
});

const { t } = useI18n();
const emit = defineEmits(['update:modelValue']);
const geosearch = reactive<any>(props.modelValue ?? {});

watch(geosearch, () => {
    if (!geosearch.serviceUrls) {
        delete geosearch.serviceUrls;
    }
    emit('update:modelValue', Object.keys(geosearch).length === 0 ? undefined : geosearch);
});
</script>

<template>
    <div class="fixture-tool-editor">
        <p class="fixture-tool-copy">{{ t('geosearch.editor.copy') }}</p>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('geosearch.settings.title') }}</h5>
                <p>{{ t('geosearch.settings.description') }}</p>
            </div>
            <Settings v-model="geosearch.settings" />
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('geosearch.serviceUrls.title') }}</h5>
                <p>{{ t('geosearch.serviceUrls.description') }}</p>
            </div>
            <ServiceUrls v-model="geosearch.serviceUrls" />
        </section>

        <section class="fixture-tool-section">
            <div class="fixture-tool-section-header">
                <h5>{{ t('teleport.title') }}</h5>
                <p>{{ t('teleport.description') }}</p>
            </div>
            <PanelTeleport v-model="geosearch.panelTeleport" />
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
