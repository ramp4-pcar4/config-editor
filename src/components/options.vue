<script setup lang="ts">
// TODO this appears to align with the option param that gets passed to a createInstance method.
//      find out how this is getting used / saved, as its not part of a config

import { Checkbox } from '@/components/helpers';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

defineProps({
    compact: Boolean
});

const store = useStore();
const { t } = useI18n();
</script>

<template>
    <div class="options-editor">
        <h3 v-if="!compact" class="text-2xl font-semibold">{{ t('navbar.options') }}</h3>
        <p class="options-copy">{{ t('options.sidebar.description') }}</p>

        <section class="options-card">
            <Checkbox v-model="store.options!.loadDefaultEvents" checked :title="t('options.defaultEvents')" />
        </section>

        <section class="options-card">
            <Checkbox v-model="store.options!.loadDefaultFixtures" checked :title="t('options.defaultFixtures')" />
        </section>

        <section class="options-card">
            <Checkbox v-model="store.options!.startRequired" :title="t('options.startRequired')" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.options-editor {
    display: grid;
    gap: 12px;
}

.options-copy {
    margin: 0;
    color: #4b5563;
    font-size: 13px;
    line-height: 18px;
}

.options-card {
    border: 1px solid #d8dee5;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
}
</style>
