<script setup lang="ts">
// container.startingFixtures string array

import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import Input from '@/components/helpers/input.vue';

const store = useStore();
const { t } = useI18n();
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold">
            {{ t('navbar.startingFixtures') }}
        </h1>
        <Input
            type="array"
            :title="t('startingFixtures.input')"
            v-model="store.startingFixtures"
            header-class="mt-4"
            input-class="w-full sm:w-[500px]"
        />
    </div>
</template>
