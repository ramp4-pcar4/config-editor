<template>
    <div class="flex flex-col w-full p-20">
        <button @click="$emit('backToStart')" class="mr-auto w-auto flex px-4 py-12 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            {{ $t('upload.back') }}
        </button>
        <div class="flex">
            <div class="flex flex-col w-1/2">
                <div
                    class="rounded-[8px] p-40 text-center bg-gray-100 border-dashed border-2 border-gray-400 h-full content-center"
                    tabindex="0"
                    @drop.prevent="handleDrop"
                >
                    <div class="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 -2 30 30">
                        <path
                            d="M599,692 C597.896,692 597,692.896 597,694 L597,698 L575,698 L575,694 C575,692.896 574.104,692 573,692 C571.896,692 571,692.896 571,694 L571,701 C571,701.479 571.521,702 572,702 L600,702 C600.604,702 601,701.542 601,701 L601,694 C601,692.896 600.104,692 599,692 L599,692 Z M582,684 L584,684 L584,693 C584,694.104 584.896,695 586,695 C587.104,695 588,694.104 588,693 L588,684 L590,684 C590.704,684 591.326,684.095 591.719,683.7 C592.11,683.307 592.11,682.668 591.719,682.274 L586.776,676.283 C586.566,676.073 586.289,675.983 586.016,675.998 C585.742,675.983 585.465,676.073 585.256,676.283 L580.313,682.274 C579.921,682.668 579.921,683.307 580.313,683.7 C580.705,684.095 581.608,684 582,684 L582,684 Z"
                            transform="translate(-571.000000, -676.000000)"
                        />
                    </svg>
                        <p class=" pt-16 text-xl">{{ $t('upload.file.drag') }}</p>
                        <p>{{ $t('upload.file.separator') }}</p>
                        <!-- file upload button -->
                        <div class="mt-16">
                            <button
                                class="bg-white border rounded-[4px] border-black hover:bg-gray-100 font-bold p-16"
                                @click="fileInput?.click()"
                            >
                                {{ $t('upload.file.click') }}
                            </button>
                            <input
                                ref="fileInput"
                                type="file"
                                class="hidden"
                                @change="handleFileSelect"
                                accept=".json"
                                tabindex="-1"
                                :aria-label="$t('upload.file.aria')"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <span class="w-40"></span>

            <div class="flex w-1/2">
                <textarea
                    v-model="jsonText"
                    class="p-12 w-full text-xs border border-solid rounded-[8px] font-mono"
                    :placeholder="$t('upload.input.placeholder')"
                    @input="handleTextInput"
                    :aria-label="$t('upload.input.aria')"
                />
            </div>
        </div>

        <div class="flex">
            <button class="continue-button max-w-[200px] ml-auto mt-40" :disabled="!jsonText" @click="startEditor">
                {{ $t('upload.continue') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { API } from '@/index';
import { RampConfigs } from '@/definitions';

const fileInput = ref<HTMLInputElement | null>(null);
const parsedData = ref<unknown>(null);
const jsonText = ref<string>('');

const handleDrop = (event: DragEvent): void => {
    const files = event.dataTransfer?.files;
    if (files?.length) {
        handleFiles(files);
    }
};

const handleFileSelect = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
        handleFiles(target.files);
    }
};

const handleFiles = (files: FileList): void => {
    if (files.length > 0) {
        const file = files[0];
        if (!file.name.endsWith('.json')) {
            return;
        }
        readAndParseJSON(file);
    }
};

const readAndParseJSON = async (file: File): Promise<void> => {
    try {
        const text = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    resolve(result);
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsText(file);
        });

        jsonText.value = text;
        parseJSON(text);
    } catch (error) {
        parsedData.value = null;
    }
};

const parseJSON = (text: string): void => {
    try {
        const data = JSON.parse(text);
        parsedData.value = data;
    } catch (error) {
        parsedData.value = null;
    }
};

const handleTextInput = (): void => {
    if (jsonText.value.trim()) {
        parseJSON(jsonText.value);
    } else {
        parsedData.value = null;
    }
};

const startEditor = () => {
    ((window as any).ramp4EditorAPI as API).initialize(parsedData.value as RampConfigs);
};
</script>

<style scoped lang="scss">
.continue-button {
    @apply items-center mx-3 border-black border-solid border px-5 flex w-full justify-center cursor-pointer h-48;
    outline: none;
    &:disabled {
        @apply border-gray-400 text-gray-500 cursor-not-allowed;
    }

    &:hover:enabled,
    &:focus:enabled {
        background-color: #e7e7e7;
    }
}
</style>
