<script setup lang="ts">
import { computed, defineProps } from 'vue'

export interface Modal {
  cont: string | (() => void)
  title: string
  type?: 'info' | 'warning' | 'error'
  close?: () => void
  confirm?: () => void
  closeText?: string
  confirmText?: string
}
const props = withDefaults(defineProps<Modal>(), {
  closeText: '取消',
  confirmText: '确定'
})
const getContType = computed(() => typeof props.cont === 'function')
</script>

<template>
  <dialog id="my_modal_4" class="modal" open>
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="text-lg font-bold">{{ props.title }}</h3>
      <div class="py-4">
        <template v-if="!getContType">{{ props.cont }}</template>
        <Component :is="props.cont" v-else />
      </div>
      <div class="modal-action">
        <form method="dialog">
          <div class=" space-x-5">
            <button class="btn" @click="props.close?.()">{{ closeText }}</button>
            <button class="btn btn-primary" @click="props.confirm?.()">{{ confirmText }}</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
