<script setup lang="ts">
// TODO this appears to align with the option param that gets passed to a createInstance method.
//      find out how this is getting used / saved, as its not part of a config

import { Checkbox } from '@/components/helpers';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const store = useStore();
const { t } = useI18n();
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold">{{ t('navbar.options') }}</h1>
        <Checkbox v-model="store.options!.loadDefaultEvents" checked :title="t('options.defaultEvents')" />
        <Checkbox v-model="store.options!.loadDefaultFixtures" checked :title="t('options.defaultFixtures')" />
        <Checkbox v-model="store.options!.startRequired" :title="t('options.startRequired')" />
    </div>
</template>
