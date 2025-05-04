<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import LineMdChevronLeft from '~icons/line-md/chevron-left'
import LineMdClose from '~icons/line-md/close'
const isShow = ref(false)
export interface Modal {
  cont?: string | (() => void)
  title?: string
  close?: () => void
}
const props = withDefaults(defineProps<Modal>(), {
  title: '系统'
})
const closeEvent = () => {
  props.close?.()
  isShow.value = false
}
onMounted(() => {
  isShow.value = true
})
const getContType = computed(() => typeof props.cont === 'function')
</script>
<template>
  <Transition leave-active-class="animate__animated animate__fadeOutDownBig"
    enter-active-class="animate__animated animate__fadeInUpBig">
    <section v-if="isShow" class="card z-50 p-2 shadow-2xl rounded-b-0 fixed bottom-0 w-full h-90 bg-base-300">
      <header class="flex justify-between mx-4">
        <section class="flex items-center space-x-2 font-bold text-md">
          <button class="btn btn-circle">
            <LineMdChevronLeft />
          </button>
          <h3>{{ title }}</h3>
        </section>
        <section>
          <button @click="closeEvent" class="btn btn-circle">
            <LineMdClose />
          </button>
        </section>
      </header>
      <main class="card-body">
        <template v-if="!getContType">{{ props.cont }}</template>
        <Component :is="props.cont" v-else />
        <slot v-if="!cont"></slot>
      </main>
    </section>
  </Transition>
</template>
