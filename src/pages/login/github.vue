<script setup lang="ts">
import Modal from '@/components/modalBox/modal.vue';
</script>
<template>
  <div class="card">
    <Modal>
      <template #body>
        点单反
      </template>
      <template #footer>
        <div class="flex w-full justify-center">
          <button class="btn btn-primary">知道了</button>
        </div>
      </template>
    </Modal>
  </div>
</template>
