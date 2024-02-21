<script setup lang="ts">
import { reactive, type PropType, watch, computed } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

const items = computed({
  get() {
    return (
      props.modelValue?.map((item) => {
        if (typeof item === 'string') {
          return { type: 'panel', panelId: item };
        } else {
          item.type = 'custom';
          return item;
        }
      }) ?? []
    );
  },
  set(value) {
    const itemsCopy = JSON.parse(JSON.stringify(value));
    console.log('Setting items', itemsCopy);
    emit(
      'update:modelValue',
      itemsCopy.length === 0
        ? undefined
        : itemsCopy.map((item: any) => {
            if (item.type === 'panel') {
              return item.panelId ?? '';
            } else {
              delete item.type;
              return item;
            }
          })
    );
  }
});

const addItem = () => {
  items.value = [...items.value, { type: 'panel' }];
};
</script>

<template>
  <List
    v-model="items"
    :add="addItem"
    title="Items"
    description="Provides configuration to the child legend items of this item."
    add-prompt="Add item"
    custom-only
    class="mt-0"
  >
    <template #item="{ element }">
      <div class="input-table">
        <div>
          <InputHeader title="Item Type" required />
          <select v-model="element.type">
            <option value="panel">Linked to a panel</option>
            <option value="custom">Custom component</option>
          </select>
        </div>
      </div>
      <p class="mt-1">
        ⚠️ Warning! Changing the item type will result in loss of current item config.
      </p>
      <div class="input-table">
        <div v-if="element.type === 'panel'">
          <InputHeader
            title="Panel ID"
            description="The ID of the panel that the appbar button will be linked to."
            required
          />
          <input type="text" v-model="element.panelId" />
        </div>
        <div v-if="element.type === 'custom'">
          <InputHeader title="ID" description="The ID of the custom component." />
          <input type="text" v-model="element.panelId" />
        </div>
        <div v-if="element.type === 'custom'">
          <InputHeader
            title="Component Name"
            description="The name of the Vue component to render as the appbar button."
          />
          <input type="text" v-model="element.componentId" />
        </div>
      </div>
    </template>
  </List>
</template>
