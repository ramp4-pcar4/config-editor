<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const sections = ['Map', 'Layers', 'Fixtures', 'Panels', 'System'];

const configsExpanded = ref<boolean>(false);
const langsExpanded = ref<{ [key: string]: boolean }>({});

const store = useStore();

const setTemplate = (template: string, lang?: string) => {
  store.editingTemplate = template;
  if (lang) {
    store.editingLang = lang;
  }
};

onMounted(() => {
  Object.keys(store.configs).forEach((lang) => {
    langsExpanded.value[lang] = false;
  });
});
</script>

<template>
  <div
    class="flex flex-col items-center border-black border-2 sm:text-lg divide-y divide-slate-200"
  >
    <div
      class="w-full p-1 sm:p-3 menu-item border-gray-800"
      :class="{ 'bg-gray-200': store.editingTemplate === 'starting-fixtures' }"
      @click="setTemplate('starting-fixtures')"
    >
      Starting Fixtures
    </div>
    <div class="w-full">
      <div
        class="flex items-center menu-item w-full p-1 sm:p-3"
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
        Configs
      </div>
      <div v-if="configsExpanded" v-for="lang in Object.keys(store.configs)" class="ml-2 sm:ml-5">
        <div
          class="flex items-center menu-item"
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
          class="menu-item ml-1 sm:ml-3 pl-1 sm:pl-2"
          :class="{
            'bg-gray-200':
              store.editingTemplate === section.toLowerCase() && store.editingLang === lang
          }"
          @click="setTemplate(section.toLowerCase(), lang)"
        >
          {{ section }}
        </div>
      </div>
    </div>
    <div
      class="menu-item w-full p-1 sm:p-3"
      :class="{ 'bg-gray-200': store.editingTemplate === 'options' }"
      @click="setTemplate('options')"
    >
      Options
    </div>
    <div class="w-full flex justify-center">
      <button
        class="mt-3 bg-black text-white p-2 hover:bg-gray-800 rounded-md mx-1 w-full sm:w-4/5"
        @click="setTemplate('preview')"
      >
        Preview
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-item {
  @apply hover:bg-gray-200 cursor-pointer;
}
</style>
