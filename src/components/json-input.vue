<template>
    <div class="json-input-panel w-full h-full">
        <div class="json-editor-shell">
            <JsonEditor
                class="json-editor"
                height="100%"
                :key="locale"
                :modelValue="configJson"
                :lang="locale"
                :validator="validate"
                @update:modelValue="onJsonChange"
            />
        </div>

        <div class="json-actions flex w-full">
            <ul v-if="validatorErrors.length" class="json-errors">
                <li v-for="(error, idx) in validatorErrors" :key="`${error.path}-${idx}`">
                    <div>{{ error.path }}: {{ error.message }}</div>
                </li>
            </ul>

            <button type="button" ref="copybtn" class="copy-btn shrink-0" @click="copyToClipboard()">
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
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ErrorObject } from 'ajv';

import 'ramp-json-editor/dist/ramp-json-editor.css';
import Ajv2019 from 'ajv/dist/2019';
import schema from '../../RampSchema.json';

interface ValidationError {
    path: string;
    message: string;
}

const localizedConfigSchema = {
    type: 'object',
    required: schema.required ?? [],
    additionalProperties: false,
    properties: schema.properties
};

const rampSchema = {
    $schema: 'https://json-schema.org/draft/2019-09/schema',
    $defs: schema.$defs,
    type: 'object',
    required: ['configs'],
    additionalProperties: false,
    properties: {
        configs: {
            type: 'object',
            required: ['en', 'fr'],
            additionalProperties: false,
            properties: {
                en: localizedConfigSchema,
                fr: localizedConfigSchema
            }
        }
    }
};

const { t, locale } = useI18n();
const store = useStore();

const ajv = new Ajv2019({ strict: false, allErrors: true });
const validate = ajv.compile(rampSchema);
const configObject = ref<Object>({ startingFixtures: store.startingFixtures, configs: store.configs });
const configJson = ref<string>(JSON.stringify(configObject.value, null, 2));

const buttonEl = useTemplateRef('copybtn');
const textSpan = useTemplateRef('copytext')!;

const validatorErrors = ref<ValidationError[]>([]);

const onJsonChange = (json: string) => {
    let parsed: unknown;

    try {
        parsed = JSON.parse(json);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        // display JSON parsing error
        validatorErrors.value = [
            {
                path: '#',
                message: t('validation.invalidJson', { message })
            }
        ];
        return;
    }

    // ramp schema validation
    if (!validate(parsed)) {
        validatorErrors.value = formatValidationErrors(validate.errors as ErrorObject[]);
        return;
    }

    validatorErrors.value = [];
    configJson.value = json;

    if (JSON.stringify(parsed) === JSON.stringify(configObject.value)) {
        return;
    }

    const config = parsed as {
        startingFixtures: typeof store.startingFixtures;
        configs: typeof store.configs;
    };

    configObject.value = config;
    store.startingFixtures = config.startingFixtures;
    store.configs = config.configs;
};

// extract error path from config line
const getErrorPath = (error: ErrorObject): string => {
    let path = error.instancePath || '';

    switch (error.keyword) {
        case 'required': {
            const missingProperty = error.params.missingProperty;
            path += `/${missingProperty}`;
            break;
        }

        case 'additionalProperties': {
            const additionalProperty = error.params.additionalProperty;
            path += `/${additionalProperty}`;
            break;
        }

        case 'unevaluatedProperties': {
            const unevaluatedProperty = error.params.unevaluatedProperty;
            path += `/${unevaluatedProperty}`;
            break;
        }
    }

    // console.log('Error path:', error, path);
    return `#${path}`;
};

// ensure translated error message based on type
const getErrorMessage = (error: ErrorObject): string => {
    switch (error.keyword) {
        case 'required':
            return t('validation.requiredProperty');

        case 'additionalProperties':
        case 'unevaluatedProperties':
            return t('validation.unknownProperty');

        case 'type':
            return t('validation.invalidType', {
                type: (error.params as { type: string }).type
            });

        case 'enum':
            return t('validation.invalidOption');

        default:
            return error.message ?? t('validation.invalidValue');
    }
};

// format schema errors to readable format
const formatValidationErrors = (errors: ErrorObject[]): ValidationError[] =>
    errors.map(error => ({
        path: getErrorPath(error),
        message: getErrorMessage(error)
    }));

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
.json-input-panel {
    display: flex;
    min-height: 0;
    flex-direction: column;
}

.json-editor-shell {
    min-height: 0;
    flex: 1 1 0;
    overflow: hidden;
    border: 1px solid #111827;
}

.json-editor,
.json-editor-shell :deep(.jsoneditor-vue) {
    min-height: 0;
    height: 100%;
    overflow: hidden;
}

.json-actions {
    flex: 0 0 auto;
    min-height: 36px;
    align-items: flex-start;
    gap: 12px;
    overflow: hidden;
    border: 1px solid #111827;
    border-top: 0;
    background: #fff;
}

.json-errors {
    flex: 1 1 auto;
    max-height: 112px;
    min-width: 0;
    overflow-y: auto;
    margin: 0;
    padding: 8px 10px;
    color: #b91c1c;
    font-size: 12px;
    line-height: 16px;

    li + li {
        margin-top: 6px;
    }
}

.copy-btn {
    display: inline-flex;
    min-height: 38px;
    align-items: center;
    gap: 6px;
    margin-left: auto;
    padding: 9px 12px;
    color: #111827;
    font-size: 13px;
    line-height: 18px;
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
