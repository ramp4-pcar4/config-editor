<template>
  <div class="loader">
    {{ t('loading') }}
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="css"></style>
