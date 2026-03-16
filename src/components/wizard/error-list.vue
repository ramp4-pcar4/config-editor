<template>
    <div v-if="errors?.length" class="errors">
        <div class="title">Please fix the following:</div>
        <ul>
            <li v-for="(e, idx) in errors" :key="idx">{{ e.message }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{ errors: Array<{ message: string; field?: string }> }>();
</script>

<style scoped>
.errors {
    margin-top: 12px;
    border: 1px solid #ffd7c2;
    background: #fff7f2;
    border-radius: 12px;
    padding: 10px;
}
.title {
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 6px;
}
ul {
    margin: 0;
    padding-left: 18px;
    color: #7a2a00;
    font-size: 13px;
}
</style>
