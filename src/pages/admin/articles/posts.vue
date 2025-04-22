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
        return new Promise<string>((resolve, reject) => {
          const file = files[0]; // 假设只处理一个文件
          const formData = new FormData();
          formData.append('file', file);

          interface UploadResponse {
            code: number;
            message: string;
            data: {
              url: string; // 上传后的 URL
            };
          }

          http.post<unknown, UploadResponse>('/file/put', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
              if (res.code === 200) {
                showMsg(res.message)// 展示成功消息
                // 插入图片 URL 到编辑器
                vditorRef.insertValue(`![${file.name}](${res.data.url})`);
                resolve(res.data.url) // 返回图片的 URL
              } else {
                reject(new Error(res.message)) // 错误时 reject
              }
            })
            .catch(err => {
              reject(err); // 捕获异常并 reject
            })
        });
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
