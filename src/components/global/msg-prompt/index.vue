<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

export type MsgPromptType = 'error' | 'success' | 'warning' | 'info'
export interface MsgPrompt {
  msg: string
  type: MsgPromptType
  duration?: number
}

const props = withDefaults(defineProps<MsgPrompt>(), {
  msg: '提示',
  type: 'success',
  duration: 2000
})

const visible = ref(false)

const getTypeClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'alert-error'
    case 'success':
      return 'alert-success'
    case 'warning':
      return 'alert-warning'
    default:
      return 'alert-info'
  }
})

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
    setTimeout(() => {
      const el = document.querySelector('.global-msg-prompt')
      if (el && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }, 300)
  }, props.duration)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" role="alert" class="alert flex justify-center rounded-[0] h-15" :class="getTypeClass">
      <span class=" font-bold text-xl text-white-900">{{ props.msg }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
