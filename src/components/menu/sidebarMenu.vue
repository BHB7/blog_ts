<script setup lang="ts">
import { useUserInfoStore } from '@/store'
import { computed } from 'vue'
import type { Component, PropType } from 'vue'
import Theme from '@/components/btn/theme/index.vue'

const userInfoStore = useUserInfoStore()
export interface ListMenu {
  icon?: Component
  path?: string
  name: string
  children?: ListMenu[]
}

const props = defineProps({
  modelValue: Boolean,
  list: {
    type: Array as PropType<ListMenu[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <el-drawer direction="ltr" size="50%" :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)" :with-header="false">
    <slot name="header">
      <div
        class="group w-full card scale-95 transition-all duration-500 content-[''] w-80  absolute top-0 left-0 relative flex flex-col items-center justify-center gap-2 text-center rounded-box overflow-hidden">
        <div
          class="mt-10 ml-10 md:-ml-20 rounded-full  z-10 group- scale-150 group- -translate-x-24  group- -translate-y-20 transition-all duration-500">
          <el-avatar :size="104" :src="userInfoStore.getUserInfo().imgurl" />
        </div>
        <div class=" absolute right-0  ">
          <Theme />
        </div>
      </div>
    </slot>
    <slot name="body"></slot>
  </el-drawer>
</template>


<style scoped lang="scss">
.is-active {
  color: var(--color-primary);
  font-weight: 700;
}
</style>
