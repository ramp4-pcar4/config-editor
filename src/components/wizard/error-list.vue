<template>
    <div v-if="errors?.length" class="mt-3 border border-solid rounded-xl p-2.5">
        <div class="font-bold mb-1.5">{{ t('wizard.errors.fix') }}</div>
        <ul class="m-0 pl-4.5">
            <li v-for="(e, idx) in errors" :key="idx">{{ e.message }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ errors: Array<{ message: string; field?: string }> }>();
</script>

<style scoped>
.errors {
    border: 1px solid #ffd7c2;
    background: #fff7f2;
}

.title {
    font-size: 13px;
}

ul {
    color: #7a2a00;
    font-size: 13px;
}
</style>
