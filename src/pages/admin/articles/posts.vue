<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useThemeStore } from '@/store'
import { http } from '@/apis/instances/instances'
import { showMsg } from '@/utils/showMsg'
import { postArticleApi, type ArticlePostTypeVo } from '@/apis'
import { showModal } from '@/utils/showModal'
const themeStore = useThemeStore()
const articleCont = reactive<ArticlePostTypeVo>({
  user_id: '',
  content: '',
  cover: '',
  tagIds: [],
  title: '',
  desc: ''
})
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
      pin: true
    },
    toolbar: [
      "emoji", "headings", "bold", "italic", "strike", "link", "|",
      "list", "ordered-list", "check", "indent", "|",
      "quote", "line", "code", "inline-code",
      "insert-before", "insert-after", "|",
      {
        hotkey: 'Article',
        tip: '发布文章',
        name: '发布文章',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" stroke-dashoffset="20" d="M21 5l-2.5 15M21 5l-12 8.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M21 5l-19 7.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M18.5 20l-9.5 -6.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.3s" values="14;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M2 12.5l7 1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.3s" values="10;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 16l-3 3M9 13.5l0 5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.3s" values="8;0"/></path></g></svg>',
        click() {
          articleCont.content = vditorRef.getHTML()
          console.log(articleCont.content);

          // postArticleApi(articleCont)
        },
      }
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
