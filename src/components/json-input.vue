<template>
    <div class="w-full h-full relative">
        <JsonEditor
            class="border border-black"
            height="78vh"
            :key="locale"
            :modelValue="configJson"
            :lang="locale"
            @update:modelValue="onJsonChange"
        />
        <div v-if="validatorErrors.length">
            <ul class="list-disc ml-8">
                <li v-for="(error, idx) in validatorErrors" :key="idx">{{ error }}</li>
            </ul>
        </div>
        <button type="button" ref="copybtn" class="copy-btn" @click="copyToClipboard()">
            <!-- Copy icon -->
            <svg
                class="copy-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>

            <!-- Indicator to show successfully copied -->
            <svg
                class="check-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>

            <span ref="copytext" class="copy-text" aria-live="polite">Copy</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import 'ramp-json-editor/dist/ramp-json-editor.css';

const { t, locale } = useI18n();

const store = useStore();

const validatorErrors = ref<any>([]);
const configObject = ref<Object>({ startingFixtures: store.startingFixtures, configs: store.configs });
const configJson = ref<string>(JSON.stringify(configObject.value, null, 2));

const buttonEl = useTemplateRef('copybtn');
const textSpan = useTemplateRef('copytext')!;

const onJsonChange = (json: string) => {
    let parsed: any;
    try {
        parsed = JSON.parse(json);
    } catch (error: any) {
        validatorErrors.value = [error.message];
        return;
    }

    // TODO: add RAMP schema validation (ajv)?
    validatorErrors.value = [];
    configJson.value = json;
    if (JSON.stringify(parsed) === JSON.stringify(configObject.value)) {
        return;
    }

    configObject.value = parsed;
    store.startingFixtures = parsed.startingFixtures;
    store.configs = parsed.configs;
};

const copyToClipboard = () => {
    navigator.clipboard
        .writeText(JSON.stringify({ startingFixtures: store.startingFixtures, configs: store.configs }))
        .then(() => {
            showCopiedState();
        });
};

const showCopiedState = () => {
    buttonEl.value?.classList.add('is-copied');
    textSpan.value!.textContent = 'Copied';

    // revert after 2 seconds
    setTimeout(() => {
        buttonEl.value?.classList.remove('is-copied');
        textSpan.value!.textContent = 'Copy';
    }, 2000);
};
</script>

<style lang="scss">
.jsoneditor-vue {
    @apply h-full;
}
</style>

<style lang="scss" scoped>
.copy-btn {
    position: absolute;
    bottom: 8px;
    right: 8px;
    border: none;
    background: transparent;
    border: none;
    padding: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.copy-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.copy-btn .check-icon {
    display: none;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.copy-btn.is-copied {
    pointer-events: none;
    cursor: default;
}

.copy-btn.is-copied .copy-icon {
    display: none;
}

.copy-btn.is-copied .check-icon {
    display: inline-flex;
}
</style>
