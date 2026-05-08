<template>
    <div class="flex flex-col h-full start-container">
        <h2 class="">{{ t('editor.title') }}</h2>
        <div v-if="!uploading">
            <div class="subtitle">{{ t('start.welcome') }}</div>
            <div class="flex justify-center items-center">
                <button class="" @click="newConfig()">
                    <span class="mr-2"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#434343"
                        >
                            <path
                                d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                            /></svg></span
                    >{{ t('start.new') }}
                </button>
                <span class="separator"></span>
                <button
                    @click="
                        () => {
                            uploading = true;
                        }
                    "
                >
                    <span class="mr-2"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#434343"
                        >
                            <path
                                d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                            /></svg></span
                    >{{ t('start.existing') }}
                </button>
            </div>
        </div>
        <uploadScreen v-else @backToStart="uploading = false"></uploadScreen>
    </div>
</template>

<script setup lang="ts">
import { API } from '@/index';
import { useI18n } from 'vue-i18n';

import uploadScreen from './upload-screen.vue';
import { ref } from 'vue';

const { t } = useI18n();

let uploading = ref(false);

const newConfig = () => {
    ((window as any).ramp4EditorAPI as API).initialize();
};
</script>

<style lang="scss" scoped>
h2 {
    font-size: 36px !important;
    line-height: 40px !important;
    padding-top: 40px !important;
    padding-bottom: 80px !important;
}

.subtitle {
    font-size: 24px !important;
    line-height: 32px !important;
    margin-bottom: 20px !important;
}

.start-container {
    /* margin-right: 10%;
    margin-left: 10%; */
}

button {
    @apply items-center mx-3 border-black border-solid border px-5 flex w-full justify-center;
    height: 100px;
    outline: none;
    &:hover,
    &:focus {
        background-color: #e7e7e7;
    }
}

.separator {
    width: 24px;
}
</style>
