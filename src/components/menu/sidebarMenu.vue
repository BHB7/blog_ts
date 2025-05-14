<script setup lang="ts">
import { computed } from 'vue'
import type { Component, PropType } from 'vue'

export interface ListMenu {
  icon: Component
  path: string
  name: string
}

const props = withDefaults(defineProps<{
  modelValue: boolean
  list: ListMenu[]
}>(), {
  modelValue: false,
  list: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

</script>

<template>
  <el-drawer direction="ltr" :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)"
    title="I am the title" :with-header="false">
    <span>Hi there!</span>
    <ul class="w-full menu ">
      <li v-for="(item, index) in list" :key="index" class="">
        <RouterLink :to="item.path" class="w-full justify-baseline flex items-center">
          <component :is="item.icon" class="mr-1" />
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </el-drawer>
</template>
