<script setup lang="ts">
import { reactive, type PropType, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  },
  isRoot: {
    type: Boolean,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const items = reactive<Array<any>>([]);

const additem = () => {
  items.push({ type: 'panel' });
};

watch(items, () => {
  const itemsCopy = JSON.parse(JSON.stringify(items));
  emit('update:modelValue', itemsCopy.length === 0 ? undefined : itemsCopy);
});
</script>

<template>
  <List
    v-model="items"
    :add="additem"
    title="Items"
    description="Provides configuration to the child legend items of this item."
    add-prompt="Add item"
    custom-only
  >
    <template #item="{ element, index }">
      <div class="input-table">
        <div>
          <InputHeader title="Item Type" required />
          <select v-model="items[index].type">
            <option value="panel">Linked to a panel</option>
            <option value="custom">Custom component</option>
            <option value="group" v-if="isRoot">Sub array of items</option>
          </select>
        </div>
      </div>
      <p class="mt-1">
        ⚠️ Warning! Changing the item type will result in loss of current item config.
      </p>
      <div class="input-table">
        <div v-if="items[index].type === 'panel'">
          <InputHeader
            title="Panel ID"
            description="The ID of the panel that the appbar button will be linked to."
            required
          />
          <input type="text" v-model="items[index].panelId" />
        </div>
        <div v-if="items[index].type === 'custom'">
          <InputHeader title="ID" description="The ID of the custom component." />
          <input type="text" v-model="items[index].panelId" />
        </div>
        <div v-if="items[index].type === 'custom'">
          <InputHeader
            title="Component Name"
            description="The name of the Vue component to render as the appbar button."
          />
          <input type="text" v-model="items[index].componentId" />
        </div>
      </div>
    </template>
  </List>
</template>
