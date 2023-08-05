<script setup lang="ts">
import { useStore } from '@/store';
import { onBeforeMount } from 'vue';
import draggable from 'vuedraggable';

const store = useStore();

const addPanel = () => {
  store.configs[store.editingLang].panels?.open?.push({ id: '' });
};

const removePanel = (idx: number) => {
  store.configs[store.editingLang].panels?.open?.splice(idx, 1);
};

onBeforeMount(() => {
  if (!store.configs[store.editingLang].panels?.open) {
    store.configs[store.editingLang].panels = {
      open: [],
      reorderable: store.configs[store.editingLang].panels?.reorderable
    };
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Panels</h1>
    <div class="mt-5 flex items-center">
      <input
        type="checkbox"
        class="border-2 border-black cursor-pointer mr-2"
        id="reorder"
        v-model="store.configs[store.editingLang].panels!.reorderable"
        :checked="store.configs[store.editingLang].panels!.reorderable !== false"
      />
      <label for="reorder">Enable panel reorder controls</label>
    </div>
    <!-- Menu with option to add a new item -->
    <div class="flex items-end mt-5">
      <div class="flex flex-col justify-center mr-2">
        <span class="font-bold"
          >Panels to open on startup ({{
            store.configs[store.editingLang].panels?.open?.length ?? 0
          }})</span
        >
        <span class="text-sm">Only panels without props can be specified.</span>
        <span class="text-sm"
          >Out-of-the-box panel IDs that are supported: basemap, export, geosearch, help,
          layer-reorder, legend, notifications, and wizard.</span
        >
      </div>
      <!-- add item button -->
      <button
        class="bg-black cursor-pointer hover:bg-gray-800 ml-auto p-1 text-white flex-shrink-0 flex items-center justify-center"
        @click="addPanel()"
      >
        <svg
          class="relative bottom-[2px]"
          fill="white"
          height="18px"
          width="18px"
          viewBox="0 0 23 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        <span class="px-2"> Add panel </span>
      </button>
    </div>
    <hr class="border-solid border-t-2 border-gray-300 my-2" />
    <table class="w-full">
      <thead>
        <tr>
          <th></th>
          <th class="required">Panel ID</th>
          <th>Screen ID</th>
          <th>Pin</th>
        </tr>
        <tr>
          <th></th>
          <td class="text-center text-sm">ID of the panel to open</td>
          <td class="text-center text-sm">ID of the screen to display</td>
          <td class="text-center text-sm">Whether to pin the panel</td>
        </tr>
      </thead>
      <draggable
        v-if="store.configs[store.editingLang].panels!.open!.length > 0"
        :list="store.configs[store.editingLang].panels!.open"
        tag="tbody"
        item-key="fake"
        handle=".handle"
      >
        <template #item="{ element, index }">
          <tr>
            <th>
              <button class="cursor-move handle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </th>
            <th>
              <input type="text" v-model="element.id" />
            </th>
            <th>
              <input type="text" v-model="element.screen" />
            </th>
            <th>
              <input type="checkbox" class="cursor-pointer" v-model="element.pin" />
            </th>
            <th>
              <button @click="removePanel(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </th>
          </tr>
        </template>
      </draggable>
    </table>
  </div>
</template>

<style lang="scss" scoped>
tbody th {
  vertical-align: top;
  text-align: center;
  border-top: 1px solid #ddd;
  padding: 10px;
}
table input[type='text'] {
  width: 150px;
  text-align: center;
  font-weight: normal;
  padding: 2px;
  margin-top: 0;
}
</style>
