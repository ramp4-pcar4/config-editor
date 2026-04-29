<script setup lang="ts">
// friendly halper for selection lists (pick-one style)

import InputHeader from '@/components/helpers/input-header.vue';

const model = defineModel<any>();

defineProps({
    title: {
        type: String,
        required: true
    },
    description: String,
    headerClass: String,
    inputClass: String,
    required: Boolean,
    disabled: Boolean,
    options: Array<{ label: String; value: String }>
});
</script>

<template>
    <div>
        <InputHeader :required="required" :class="headerClass" :title="title" :description="description" />
        <select :aria-label="title" v-model="model" class="block border border-black text-sm" :disabled="disabled ?? false">
            <option v-for="(opt, idx) in options" :value="opt.value" :key="idx">{{ opt.label }}</option>
        </select>
    </div>
</template>
