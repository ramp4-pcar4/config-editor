<script setup lang="ts">
import { type PropType, reactive, watch, ref } from 'vue';
import List from '@/components/helpers/list.vue';
import InputHeader from '@/components/helpers/input-header.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Array<any>>,
    required: false
  }
});

const emit = defineEmits(['update:modelValue']);

let groups = reactive<Array<any>>(
  props.modelValue && props.modelValue.length > 0
    ? Array.isArray(props.modelValue[0])
      ? props.modelValue.map((group: any) => {
          return {
            items:
              group?.map((item: any) => {
                if (typeof item === 'string') {
                  return { type: 'panel', panelId: item };
                } else {
                  return { type: 'custom', ...item };
                }
              }) ?? []
          };
        })
      : [
          {
            items:
              props.modelValue?.map((item) => {
                if (typeof item === 'string') {
                  return { type: 'panel', panelId: item };
                } else {
                  return { type: 'custom', ...item };
                }
              }) ?? []
          }
        ]
    : []
);

const addGroup = () => {
  groups.push({ items: [] });
};

const addItem = (idx: number) => {
  groups[idx].items.push({ type: 'panel' });
};

watch(groups, () => {
  const groupsCopy = JSON.parse(JSON.stringify(groups));
  emit(
    'update:modelValue',
    groupsCopy.length === 0
      ? undefined
      : groupsCopy.length === 1
      ? groupsCopy[0].items.map((item: any) => {
          if (item.type === 'panel') {
            return item.panelId ?? '';
          } else {
            delete item.type;
            return item;
          }
        })
      : groupsCopy.map((g: any) =>
          g.items.map((item: any) => {
            if (item.type === 'panel') {
              return item.panelId ?? '';
            } else {
              delete item.type;
              return item;
            }
          })
        )
  );
});
</script>

<template>
  <List
    v-model="groups"
    :add="addGroup"
    title="Groups"
    description="The groups that the appbar items will be split up over."
    add-prompt="Add group"
  >
    <template #item="{ index }">
      <List
        class="mt-[0]"
        v-model="groups[index].items"
        :add="
          () => {
            addItem(index);
          }
        "
        title="Items"
        description="Provides configuration to the child legend items of this item."
        add-prompt="Add item"
        custom-only
      >
        <template #item="{ element }">
          <div class="input-table">
            <div>
              <InputHeader title="Item Type" required />
              <select v-model="element.type" aria-label="Item Type">
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
              <input type="text" v-model="element.panelId" aria-label="Panel ID" />
            </div>
            <div v-if="element.type === 'custom'">
              <InputHeader title="ID" description="The ID of the custom component." />
              <input type="text" v-model="element.id" aria-label="ID" />
            </div>
            <div v-if="element.type === 'custom'">
              <InputHeader
                title="Component Name"
                description="The name of the Vue component to render as the appbar button."
              />
              <input type="text" v-model="element.componentId" aria-label="Component Name" />
            </div>
          </div>
        </template>
      </List>
    </template>
  </List>
</template>
