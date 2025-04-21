<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, ref } from 'vue';

const vditorOb = ref()

onMounted(() => {
  vditorOb.value = new Vditor('vditor', {
    value: '',
    height: '50vh',
    width: '100%',
    lang: 'zh_CN',
    toolbar: ["emoji", "headings", "bold", "italic", "strike", "link", "|", "list", "ordered-list", "check", "indent", "|", "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|"],
  })
})
</script>
<template>
  <section id="vditor">

  </section>
</template>
