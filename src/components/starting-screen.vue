<template>
    <div class="start-container" :class="{ 'start-container--uploading': uploading }">
        <section v-if="!uploading" class="start-panel" aria-labelledby="start-title">
            <h2 id="start-title">{{ t('editor.title') }}</h2>
            <p class="start-copy">{{ t('start.welcome') }}</p>

            <button class="primary-action" @click="newConfig()">
                <span class="action-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path
                            d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                        />
                    </svg>
                </span>
                {{ t('start.new') }}
            </button>

            <button class="secondary-action" @click="uploading = true">
                <span class="action-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                        <path
                            d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                        />
                    </svg>
                </span>
                {{ t('start.existing') }}
            </button>
        </section>
        <UploadScreen v-else @backToStart="uploading = false"></UploadScreen>
    </div>
</template>

<script setup lang="ts">
import { API } from '@/index';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';

import UploadScreen from './upload-screen.vue';
import { ref } from 'vue';

const { t } = useI18n();
const store = useStore();

const uploading = ref(false);

const newConfig = () => {
    ((window as any).ramp4EditorAPI as API).initialize();

    store.initialized = true;
    store.wizardOpen = true;

    if (!store.editingLang) {
        store.editingLang = 'en';
    }
};
</script>

<style lang="scss" scoped>
$primary-colour: #26374a;
$primary-hover-colour: #444;
$secondary-hover-colour: #eef4f9;
$black: #000;
$white: #fff;

.start-container {
    @apply flex justify-center;
    min-height: 420px;
    padding-top: 72px;
}

.start-panel {
    @apply flex w-full flex-col items-center text-center;
    max-width: 680px;
    padding: 32px;
}

h2 {
    font-size: 44px !important;
    line-height: 52px !important;
    margin-bottom: 18px !important;
}

.start-copy {
    font-size: 22px !important;
    line-height: 32px !important;
    margin-bottom: 36px !important;
}

.primary-action,
.secondary-action {
    outline: none;
}

.primary-action,
.secondary-action {
    @apply flex items-center justify-center rounded-[4px] border border-solid font-semibold;
}

.primary-action {
    @apply w-full px-32 text-lg;
    min-height: 64px;
    max-width: 420px;
    background-color: $primary-colour;
    border-color: $primary-colour;
    color: $white;

    &:hover,
    &:focus {
        background-color: $primary-hover-colour;
        border-color: $primary-hover-colour;
    }
}

.secondary-action {
    @apply mt-16 px-24 text-base;
    min-height: 50px;
    min-width: 300px;
    background-color: $white;
    border-color: $black;
    color: $black;

    &:hover,
    &:focus {
        background-color: $secondary-hover-colour;
        border-color: $black;
    }
}

.action-icon {
    @apply mr-8 flex;

    svg {
        fill: currentColor;
    }
}

.start-container--uploading {
    display: block;
    min-height: 0;
    padding-top: 0;
}

@media (max-width: 700px) {
    .start-container {
        min-height: 340px;
        padding-top: 56px;
    }

    .start-panel {
        padding: 32px 16px;
    }

    h2 {
        font-size: 34px !important;
        line-height: 40px !important;
    }

    .start-copy {
        font-size: 18px !important;
        line-height: 28px !important;
    }

    .secondary-action {
        min-width: 0;
        width: 100%;
    }
}
</style>
