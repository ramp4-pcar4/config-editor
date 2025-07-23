<script setup lang="ts">
// TODO figure out what this is. Top of the editor?
// TODO fix the TS grouses

import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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

onMounted(() => {
  Object.keys(store.configs).forEach(lang => {
    langsExpanded.value[lang] = false;
  });
});
</script>

<template>
  <div class="flex flex-col items-center border-black border-2 sm:text-lg divide-y divide-slate-200">
    <div
      class="w-full p-1 sm:p-3 hover:bg-gray-200 cursor-pointer border-gray-800"
      :class="{ 'bg-gray-200': store.editingTemplate === 'starting-fixtures' }"
      @click="setTemplate('starting-fixtures')"
    >
      {{ t('navbar.startingFixtures') }}
    </div>
    <div class="w-full">
      <div
        class="flex items-center hover:bg-gray-200 cursor-pointer w-full p-1 sm:p-3"
        @click="
          () => {
            configsExpanded = !configsExpanded;
          }
        "
      >
        <svg
          class="sm:mr-1"
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
      <div v-if="configsExpanded" v-for="lang in Object.keys(store.configs)" class="ml-2 sm:ml-5">
        <div
          class="flex items-center hover:bg-gray-200 cursor-pointer"
          @click="
            () => {
              langsExpanded[lang] = !langsExpanded[lang];
            }
          "
        >
          <svg
            class="sm:mr-1"
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
        <div
          v-if="langsExpanded[lang]"
          v-for="section in sections"
          class="hover:bg-gray-200 cursor-pointer ml-1 sm:ml-3 pl-1 sm:pl-2"
          :class="{
            'bg-gray-200': store.editingTemplate === section.toLowerCase() && store.editingLang === lang
          }"
          @click="setTemplate(section, lang)"
        >
          {{ t(`navbar.${section}`) }}
        </div>
      </div>
    </div>
    <div
      class="hover:bg-gray-200 cursor-pointer w-full p-1 sm:p-3"
      :class="{ 'bg-gray-200': store.editingTemplate === 'options' }"
      @click="setTemplate('options')"
    >
      {{ t('navbar.options') }}
    </div>
    <div class="w-full flex justify-center">
      <button
        class="mt-3 bg-black text-white p-2 hover:bg-gray-800 rounded-md mx-1 w-full sm:w-4/5"
        @click="setTemplate('preview')"
      >
        {{ t('navbar.preview') }}
      </button>
    </div>
  </div>
</template>
