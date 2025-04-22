<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useThemeStore } from '@/store'
import { http } from '@/apis/instances/instances'
import { showMsg } from '@/utils/showMsg'

const themeStore = useThemeStore()

// 用 ref 保存 Vditor 实例
let vditorRef: Vditor
onMounted(() => {
  // 初始化 Vditor
  vditorRef = new Vditor('vditor', {
    value: '',
    height: '100vh',
    width: '100%',
    lang: 'zh_CN',
    theme: themeStore.theme === 'dark' ? 'dark' : 'classic',
    toolbarConfig: {
      pin: false
    },
    toolbar: [
      "emoji", "headings", "bold", "italic", "strike", "link", "|",
      "list", "ordered-list", "check", "indent", "|",
      "quote", "line", "code", "inline-code",
      "insert-before", "insert-after", "|"
    ],
    upload: {
      multiple: true,
      accept: 'image/*,.pdf,.zip',
      filename(name) {
        const ext = name.substring(name.lastIndexOf('.'))
        return `${Date.now()}${ext}`
      },
      handler(files) {
        for (const file of files) {
          const formData = new FormData()
          formData.append('file', file)

          interface UploadResponse {
            code: number
            message: string
            data: {
              url: string  // 这里嵌套的 `url` 字段
            }
          }

          http.post<unknown, UploadResponse>('/file/put', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            // ✅ 这里的 res 就是 UploadResponse 类型
            if (res.code === 200) {
              showMsg(res.message)
              vditorRef.insertValue(`![${file.name}](${res.data.url})`)
            }
          }).catch(err => {
            return Promise.reject(err)
          })

        }
      }

    }

  })

})

// 监听主题切换，动态更新 vditor 的 theme
watch(
  () => themeStore.theme,
  (newTheme) => {
    if (vditorRef) {
      vditorRef.setTheme(
        newTheme === 'dark' ? 'dark' : 'classic',
        'zh_CN'
      )
    }
  }, {
  immediate: true
}
)
</script>

<template>
  <section class="card">

  </section>
  <section id="vditor"></section>
</template>
