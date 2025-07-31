<script setup lang="ts">
// root.fixtures.appbar.??? config nugget
// TODO figure out what this is.  .items ? the general thing that lurks in .items?

import { type PropType, reactive, watch } from 'vue';
import List from '@/components/helpers/list.vue';
import Input from '@/components/helpers/input.vue';
import Select from '@/components/helpers/select.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Object as PropType<Array<any>>,
        required: false
    }
});

const { t } = useI18n();
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
                          props.modelValue?.map(item => {
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
        :title="t('appbar.groups.title')"
        :description="t('appbar.groups.description')"
        :add-prompt="t('appbar.groups.add')"
        :remove-prompt="t('appbar.groups.remove')"
        :singular="t('appbar.groups.singular')"
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
                :title="t('appbar.group.items.title')"
                :description="t('appbar.group.items.description')"
                :add-prompt="t('appbar.group.items.add')"
                :remove-prompt="t('appbar.group.items.remove')"
                :singular="t('appbar.group.items.singular')"
                custom-only
            >
                <template #item="{ element }">
                    <div class="input-table">
                        <Select
                            :title="t('appbar.group.item.type')"
                            v-model="element.type"
                            :options="[
                                { value: 'panel', label: t('appbar.group.item.type.panel') },
                                { value: 'custom', label: t('appbar.group.item.type.custom') }
                            ]"
                            required
                        />
                    </div>
                    <p class="mt-1">⚠️ {{ t('appbar.group.item.type.warning') }}</p>
                    <div class="mt-4 input-table">
                        <Input
                            v-model="element.panelId"
                            v-if="element.type === 'panel'"
                            :title="t('appbar.group.item.panelId.title')"
                            :description="t('appbar.group.item.panelId.description')"
                            required
                        />
                        <Input
                            v-model="element.id"
                            v-if="element.type === 'custom'"
                            :title="t('appbar.group.item.id.title')"
                            :description="t('appbar.group.item.id.description')"
                        />
                        <Input
                            v-model="element.componentId"
                            v-if="element.type === 'custom'"
                            :title="t('appbar.group.item.componentId.title')"
                            :description="t('appbar.group.item.componentId.description')"
                        />
                    </div>
                </template>
            </List>
        </template>
    </List>
</template>
