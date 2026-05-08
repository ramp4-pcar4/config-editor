
<template>
    <div class="navbar-wrapper flex flex-col items-center border-black border-2 divide-y divide-slate-200">
        <div
            class="w-full p-4 ce-sm:px-12 hover:bg-gray-200 cursor-pointer border-gray-800"
            :class="{ 'bg-gray-200': store.editingTemplate === 'starting-fixtures' }"
            @click="setTemplate('starting-fixtures')"
        >
            {{ t('navbar.startingFixtures') }}
        </div>
        <div class="w-full">
            <div
                class="flex items-center hover:bg-gray-200 cursor-pointer w-full p-4 ce-sm:px-12"
                @click="
                    () => {
                        configsExpanded = !configsExpanded;
                    }
                "
            >
                <svg
                    class="ce-sm:mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 24 24"
                    width="18"
                    :class="{ 'rotate-180': configsExpanded }"
                >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
                {{ t('navbar.configs') }}
            </div>
            <template v-if="configsExpanded">
                <div v-for="lang in Object.keys(store.configs)" :key="`config-${lang}`" class="ml-8 ce-sm:ml-20">
                    <div
                        class="flex items-center hover:bg-gray-200 cursor-pointer"
                        @click="
                            () => {
                                langsExpanded[lang] = !langsExpanded[lang];
                            }
                        "
                    >
                        <svg
                            class="ce-sm:mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            height="18"
                            viewBox="0 0 24 24"
                            width="18"
                            :class="{ 'rotate-180': langsExpanded[lang] }"
                        >
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                        </svg>
                        {{ lang }}
                    </div>
                    <template v-if="langsExpanded[lang]">
                        <div
                            v-for="section in sections"
                            :key="`${section}-${lang}`"
                            class="hover:bg-gray-200 cursor-pointer ml-4 ce-sm:ml-12 pl-4 ce-sm:pl-8"
                            :class="{
                                'bg-gray-200':
                                    store.editingTemplate === section.toLowerCase() && store.editingLang === lang
                            }"
                            @click="setTemplate(section, lang)"
                        >
                            {{ t(`navbar.${section}`) }}
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <div
            class="hover:bg-gray-200 cursor-pointer w-full p-4 ce-sm:px-12"
            :class="{ 'bg-gray-200': store.editingTemplate === 'options' }"
            @click="setTemplate('options')"
        >
            {{ t('navbar.options') }}
        </div>
        <span class="mt-auto"></span>
        <div class="w-full flex-col justify-items-center">
            <div class="w-full flex justify-center ce-sm:w-4/5">
                <button
                    class="white-bg-button"
                    @click="setTemplate('preview')"
                >
                    {{ t('navbar.preview') }}
                </button>
            </div>
            <div v-if="!props.library" class="w-full flex justify-center ce-sm:w-4/5">
                <button
                    class="black-bg-button"
                    @click="setTemplate('json')"
                >
                    {{ t('navbar.json') }}
                </button>
                <button
                    class="black-bg-button"
                    @click="download()"
                >
                    {{ t('navbar.download') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// table of contents + buttons on the left of the app

import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    library: {
        type: Boolean,
        required: true
    }
});

const store = useStore();
const sections = ['map', 'layers', 'fixtures', 'panels', 'system'];

const configsExpanded = ref<boolean>(false);
const langsExpanded = ref<{ [key: string]: boolean }>({});

const { t } = useI18n();

const emit = defineEmits(['templateUpdated', 'langUpdated']);

const setTemplate = (template: string, lang?: string) => {
    store.editingTemplate = template;
    if (lang) {
        store.editingLang = lang;
    }
};

const download = () => {
    const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify({ startingFixtures: store.startingFixtures, configs: store.configs }));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', dataStr);
            downloadAnchorNode.hidden = true;
            downloadAnchorNode.setAttribute('download', 'ramp_config.json');
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
};

onMounted(() => {
    Object.keys(store.configs).forEach(lang => {
        langsExpanded.value[lang] = false;
    });
});
</script>

<style lang="scss" scoped>
@media (min-width: 640px) {
    .navbar-wrapper {
        @apply text-base;
    }
}

.black-bg-button,.white-bg-button {
    @apply flex-1 my-3 mx-1;
}
</style>
