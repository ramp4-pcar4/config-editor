<script setup lang="ts">
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';

import { reactive, type PropType, watch } from 'vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const details = reactive<any>(props.modelValue ?? {});
const panelWidth = reactive<any>({
  default:
    typeof props.modelValue?.panelWidth === 'number'
      ? typeof props.modelValue?.panelWidth
      : props.modelValue?.panelWidth?.default,
  'details-items': props.modelValue?.panelWidth
    ? props.modelValue?.panelWidth['details-items']
    : undefined,
  'details-layers': props.modelValue?.panelWidth
    ? props.modelValue?.panelWidth['details-layers']
    : undefined
});
const panelTeleport = reactive<any>({
  'details-items': props.modelValue?.panelTeleport
    ? props.modelValue?.panelTeleport['details-items']
    : undefined,
  'details-layers': props.modelValue?.panelTeleport
    ? props.modelValue?.panelTeleport['details-layers']
    : undefined
});
const templates = reactive<any>({
  esri: props.modelValue?.templates?.esri,
  text: props.modelValue?.templates?.text,
  image: props.modelValue?.templates?.image,
  html: props.modelValue?.templates?.html,
  xml: props.modelValue?.templates?.xml,
  json: props.modelValue?.templates?.json
});

watch(details, () => {
  emit('update:modelValue', details);
});

watch(panelWidth, () => {
  Object.keys(panelWidth).forEach((key) => {
    if (panelWidth[key] === undefined || panelWidth[key] === '') {
      delete panelWidth[key];
    }
  });
  details.panelWidth = Object.keys(panelWidth).length === 0 ? undefined : panelWidth;
});

watch(panelTeleport, () => {
  Object.keys(panelTeleport).forEach((key) => {
    if (!panelTeleport[key]) {
      delete panelTeleport[key];
    }
  });
  details.panelTeleport = Object.keys(panelTeleport).length === 0 ? undefined : panelTeleport;
});

watch(templates, () => {
  Object.keys(templates).forEach((key) => {
    if (!templates[key]) {
      delete templates[key];
    }
  });
  details.templates = Object.keys(templates).length === 0 ? undefined : templates;
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Details"
    description="Provides default template configuration to the details fixture. If not supplied, RAMP default templates wil be used."
  >
    <Collapsible
      title="Panel Width"
      description="Determines the width of the various details panels in pixels."
    >
      <div class="input-table">
        <div>
          <InputHeader
            title="Default"
            description="The default panel width for all details panels."
          />
          <input type="number" v-model="panelWidth.default" aria-label="Default" />
        </div>
        <div>
          <InputHeader
            title="Details Items"
            description="The overriding panel width for the details items panel."
          />
          <input type="number" v-model="panelWidth['details-items']" aria-label="Details Items" />
        </div>
        <div>
          <InputHeader
            title="Details Layers"
            description="The overriding panel width for the details layers panel."
          />
          <input type="number" v-model="panelWidth['details-layers']" aria-label="Details Layers" />
        </div>
      </div>
    </Collapsible>
    <Collapsible
      title="Panel Teleport"
      description="Determines where to render the details panels instead of its usual spot in the panel stack."
    >
      <PanelTeleport
        v-model="panelTeleport['details-items']"
        title="Details Items"
        description="Determines where to render the details items panel instead of its usual spot in the panel stack. Note that the target must be specified to save the configuration."
      />
      <PanelTeleport
        v-model="panelTeleport['details-layers']"
        title="Details Layers"
        description="Determines where to render the details layers panel instead of its usual spot in the panel stack. Note that the target must be specified to save the configuration."
      />
    </Collapsible>
    <Collapsible
      title="Templates"
      description="Specifies a Vue component name to render as the default details template for each identify result format."
    >
      <div class="input-table">
        <div>
          <InputHeader title="ESRI" />
          <input type="text" v-model="templates.esri" aria-label="ESRI" />
        </div>
        <div>
          <InputHeader title="Text" />
          <input type="text" v-model="templates.text" aria-label="Text" />
        </div>
        <div>
          <InputHeader title="Image" />
          <input type="text" v-model="templates.image" aria-label="Image" />
        </div>
        <div>
          <InputHeader title="HTML" />
          <input type="text" v-model="templates.html" aria-label="HTML" />
        </div>
        <div>
          <InputHeader title="XML" />
          <input type="text" v-model="templates.xml" aria-label="XML" />
        </div>
        <div>
          <InputHeader title="JSON" />
          <input type="text" v-model="templates.json" aria-label="JSON" />
        </div>
      </div>
    </Collapsible>
  </Collapsible>
</template>
