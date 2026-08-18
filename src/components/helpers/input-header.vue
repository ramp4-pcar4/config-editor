<script setup lang="ts">
// friendly halper for making headers for inputs. This is like the input title, and the ℹ️ button with helpful secrets

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    required: {
        type: Boolean,
        required: false
    },
    type: {
        type: String,
        required: false
    }
});
</script>

<template>
    <div
        class="ce-input-header"
        :class="{
            'ce-input-header--field': type !== 'checkbox' && type !== 'header',
            'ce-input-header--compact': type === 'checkbox',
            'ce-input-header--section': type === 'header'
        }"
    >
        <p class="ce-input-title" :class="{ required: required }">
            {{ title }}
        </p>
        <button
            v-if="!!description"
            type="button"
            class="ce-help-button"
            :content="description"
            :aria-label="description"
            v-tippy="{
                placement: 'top',
                trigger: 'mouseenter manual focus click'
            }"
            @click.stop
        >
            <svg aria-hidden="true" class="ce-help-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                />
            </svg>
        </button>
    </div>
</template>

<style scoped lang="scss">
.ce-input-header {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 6px;
}

.ce-input-header--field {
    margin-bottom: 6px;
}

.ce-input-header--compact,
.ce-input-header--section {
    min-height: 100%;
}

.ce-input-header--section {
    .ce-input-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
    }
}

.ce-input-title {
    min-width: 0;
    margin: 0;
    color: #1f2937;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
}

.ce-help-button {
    display: inline-flex;
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 999px;
    color: #4b5563;
    outline: none;
    transition:
        background-color 120ms ease,
        border-color 120ms ease,
        color 120ms ease;

    &:hover,
    &:focus {
        border-color: #c9d3df;
        background: #eef2f6;
        color: var(--editor-primary);
    }
}

.ce-help-icon {
    width: 15px;
    height: 15px;
    fill: currentColor;
}
</style>
