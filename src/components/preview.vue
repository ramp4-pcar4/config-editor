<script setup lang="ts">
// does the ramp previewer of the config we're editing

// @ts-ignore
import { createInstance } from 'ramp-pcar';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const rampInstance = ref<HTMLDivElement>();
const store = useStore();
const { t } = useI18n();

onMounted(() => {
    createInstance(
        rampInstance.value!,
        { startingFixtures: store.startingFixtures, configs: store.configs },
        store.options
    );
});
</script>

<template>
    <div class="h-full flex flex-col">
        <h1 class="text-2xl font-semibold">{{ t('navbar.preview') }}</h1>
        <p class="mt-3">
            <span class="font-semibold">{{ t('preview.note') }}</span> {{ t('preview.warning') }}
        </p>
        <div ref="rampInstance" class="mt-3 flex-grow border-2 border-black"></div>
    </div>
</template>
