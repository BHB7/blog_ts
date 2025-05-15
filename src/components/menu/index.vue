<script setup lang="ts">
import { computed } from 'vue'
import type { Component, PropType } from 'vue'

export interface ListMenu {
  icon?: Component
  path?: string
  name: string
  children?: ListMenu[]
}
interface Props {
  isCollapse?: boolean,
  mode?: 'horizontal' | 'vertical'
  list: Array<ListMenu>
}
withDefaults(defineProps<Props>(), {
  isCollapse: false
})
</script>
<template>
  <el-menu :mode="mode" :collapse="isCollapse" :default-active="$route.fullPath" router class="el-menu-vertical-demo">
    <div v-for="(item, index) in list" :key="index">
      <el-sub-menu v-if="item.children">
        <template #title>
          <el-icon>
            <Component :is="item.icon"></Component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-for="(sub, index) in item.children" :key="index">
          <el-menu-item :index="sub.path">{{ sub.name }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon>
          <Component :is="item.icon"></Component>
        </el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </div>
  </el-menu>
</template>
