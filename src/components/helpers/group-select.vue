<script setup lang="ts">
// friendly halper for selection lists (pick-one style) that have groups for the selectable items

import InputHeader from '@/components/helpers/input-header.vue';

type GroupOptions = { groupLabel: string; groupOptions: Array<{ label: String; value: String }> };

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
    options: Array<GroupOptions>
});
</script>

<template>
    <div>
        <InputHeader :required="required" :class="headerClass" :title="title" :description="description" />
        <select :aria-label="title" v-model="model" :disabled="disabled ?? false">
            <optgroup v-for="(group, idxG) in options" :label="group.groupLabel" :key="idxG">
                <option v-for="(opt, idxO) in group.groupOptions" :value="opt.value" :key="idxO">
                    {{ opt.label }}
                </option>
            </optgroup>
        </select>
    </div>
</template>
