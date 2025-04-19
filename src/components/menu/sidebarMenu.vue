<script setup lang="ts">
import type { Component } from 'vue'

export interface ListMenu {
  icon: Component
  path: string
  name: string
}

const props = withDefaults(defineProps<{
  isDrawer?: boolean
  list?: ListMenu[]
}>(), {
  list: () => [],
  isDrawer: false
})
</script>

<template>
  <ul :class="[
    'menu gap-y-2 text-md h-full',
    isDrawer ? 'p-4 bg-base-200 min-h-full' : 'p-2 bg-base-200'
  ]">
    <li v-for="(item, index) in props.list" :key="index">
      <RouterLink :to="item.path" class="w-full justify-baseline">
        <component :is="item.icon" class="mr-1" />
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</template>
