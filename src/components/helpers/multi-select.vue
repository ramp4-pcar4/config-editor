<script setup lang="ts">
// friendly halper for multiselectors (appears as a group of checkboxes)

// TODO figure out these typescript grouses

import Collapsible from './collapsible.vue';

const model = defineModel<Array<any>>();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: String,
    options: Array<{ label: string; value: string }>
});
</script>

<template>
    <Collapsible :title="title" :description="description">
        <div class="input-table">
            <div class="flex items-center" v-for="option in options">
                <input
                    type="checkbox"
                    class="border-2 border-black cursor-pointer text-black mr-2"
                    :value="option.value"
                    v-model="model"
                    :aria-label="option.label"
                />
                <label>{{ option.label }}</label>
            </div>
        </div>
    </Collapsible>
</template>
