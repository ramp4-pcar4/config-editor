<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import Collapsible from '@/components/helpers/collapsible.vue';
import InputHeader from '@/components/helpers/input-header.vue';
import PanelTeleport from '@/components/fixtures/panel-teleport.vue';
import ExportComponent from '@/components/fixtures/export/export-component.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);
const xport = reactive<any>({
  title: {},
  map: {},
  mapElements: {},
  legend: {},
  footnote: {},
  timestamp: {},
  ...props.modelValue
});

watch(xport, () => {
  const xportCopy = JSON.parse(JSON.stringify(xport));
  if (xportCopy.fileName === '') {
    delete xportCopy.fileName;
  }
  if (xportCopy.panelWidth === '') {
    delete xportCopy.fileName;
  }
  if (xportCopy.title.value === '') {
    delete xportCopy.title.value;
  }
  if (xportCopy.footnote.value === '') {
    delete xportCopy.footnote.value;
  }
  if (xportCopy.legend.columnWidth === '') {
    delete xportCopy.legend.columnWidth;
  }
  Object.keys(xportCopy).forEach((key: string) => {
    if (typeof xportCopy[key] === 'object' && Object.keys(xportCopy[key]).length === 0) {
      delete xportCopy[key];
    }
  });
  emit('update:modelValue', Object.keys(xportCopy).length === 0 ? undefined : xportCopy);
});
</script>

<template>
  <Collapsible
    :thick-border="true"
    title="Export"
    description="Provides configuration to the export fixture."
  >
    <div class="input-table">
      <div>
        <InputHeader
          title="Panel Width"
          description="Determines the width of the export panel in pixels."
        />
        <input type="number" v-model="xport.panelWidth" min="0" aria-label="Panel Width" />
      </div>
      <div>
        <InputHeader title="File Name" description="The filename of the exported image." />
        <input type="text" v-model="xport.fileName" aria-label="File Name" />
      </div>
    </div>
    <PanelTeleport v-model="xport.panelTeleport" />
    <ExportComponent
      title="Title"
      description="Configuration for the title."
      v-model:selected="xport.title.selected"
      v-model:selectable="xport.title.selectable"
    >
      <div class="input-table">
        <div>
          <InputHeader title="Value" description="The value of the title text." />
          <input
            type="text"
            v-model="xport.title.value"
            placeholder="RAMP-Map / PCAR-Carte"
            aria-label="Value"
          />
        </div>
      </div>
    </ExportComponent>
    <ExportComponent
      title="Map"
      description="Configuration for the map."
      v-model:selected="xport.map.selected"
      v-model:selectable="xport.map.selectable"
    />
    <ExportComponent
      title="Map Elements"
      description="Configuration for the map elements."
      v-model:selected="xport.mapElements.selected"
      v-model:selectable="xport.mapElements.selectable"
    />
    <ExportComponent
      title="Legend"
      description="Configuration for the legend."
      v-model:selected="xport.legend.selected"
      v-model:selectable="xport.legend.selectable"
    >
      <div class="input-table">
        <div>
          <InputHeader
            title="Column Width"
            description="Value in pixels to be used as the column width for the exported legend."
          />

          type="number" v-model="xport.legend.columnWidth" min="0" aria-label="Column Width" />
        </div>
      </div>
    </ExportComponent>
    <ExportComponent
      title="Footnote"
      description="Configuration for the footnote."
      v-model:selected="xport.footnote.selected"
      v-model:selectable="xport.footnote.selectable"
    >
      <div class="input-table">
        <div>
          <InputHeader title="Value" description="The value of the footnote text." />
          <input type="text" v-model="xport.footnote.value" aria-label="Value" />
        </div>
      </div>
    </ExportComponent>
    <ExportComponent
      title="Timestamp"
      description="Configuration for the timestamp."
      v-model:selected="xport.timestamp.selected"
      v-model:selectable="xport.timestamp.selectable"
    />
  </Collapsible>
</template>
