<script setup lang="ts">
import { setAuthCodeApi } from '@/apis';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'



const route = useRoute()


onMounted(async () => {
  const queryCode = route.query.code

  if (Array.isArray(queryCode)) {
    console.warn('检测到多个 code 参数，仅使用第一个')
  }

  const code = Array.isArray(queryCode) ? queryCode[0] : queryCode

  if (!code) return

  console.log(await setAuthCodeApi(code));

})

</script>
<template>
  <div>

  </div>
</template>
