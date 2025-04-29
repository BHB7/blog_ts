<script setup lang="ts">
import { ref } from 'vue'

const pageSzie = ref(10)
const pageOffset = ref(1)
const pageTotal = ref(50)
const page = pageTotal.value / pageSzie.value

const handle = (i: number) => {
  pageOffset.value = i
}
</script>

<template>
  <div class="join">
    <input v-for="item, index in page" @click="handle(index + 1)" class="join-item btn btn-square" type="radio"
      name="options" :aria-label="String(index + 1)" checked />
  </div>

</template>
