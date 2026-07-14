<template>
    <div class="preview-panel">
        <div ref="rampInstance" class="preview-map"></div>
        <p class="preview-note">
            <span>{{ t('preview.note') }}</span> {{ t('preview.warning') }}
        </p>
    </div>
</template>

<script setup lang="ts">
// does the ramp previewer of the config we're editing

// @ts-ignore
import { createInstance } from 'ramp-pcar';
import { useStore } from '@/store';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const rampInstance = ref<HTMLDivElement>();
const store = useStore();
const { t } = useI18n();
let rampApi: any;

onMounted(() => {
    rampApi = createInstance(
        rampInstance.value!,
        { startingFixtures: store.startingFixtures, configs: store.configs },
        store.options
    );
});

watch(
    () => store.elc?.map?.initialBasemapId,
    (newBasemapId, oldBasemapId) => {
        if (!rampApi || newBasemapId === oldBasemapId) {
            return;
        }

        rampApi.reload({ startingFixtures: store.startingFixtures, configs: store.configs }, store.options);
    }
);
</script>

<style lang="scss" scoped>
.preview-panel {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
}

.preview-map {
    min-height: 0;
    flex: 1 1 auto;
    border: 2px solid #000;
}

.preview-note {
    margin: 12px 0 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;

    span {
        color: #111827;
        font-weight: 600;
    }
}
</style>
