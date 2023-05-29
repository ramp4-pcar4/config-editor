<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center border-black border-2 text-lg">
    <div class="w-full hover:bg-gray-200 cursor-pointer p-3 border-b-2 border-gray font-semibold">
      Starting Fixtures
    </div>
    <div
      class="flex items-center w-full hover:bg-gray-200 cursor-pointer p-3 border-b-2 border-gray font-semibold"
    >
      <div class="expand-toggle mr-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </div>
      Configs
    </div>
    <div class="w-full hover:bg-gray-200 cursor-pointer p-3 border-b-2 border-gray font-semibold">
      Options
    </div>
    <button class="mt-3 bg-black text-white p-2 hover:bg-gray-800 rounded-md w-4/5 font-semibold">
      Preview
    </button>
  </div>
</template>
