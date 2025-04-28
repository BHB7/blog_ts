<script setup lang="tsx">
import { h, nextTick, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useThemeStore, useUserInfoStore } from '@/store'
import Msg from '@/utils/showMsg'
import { postArticleApi, type ArticlePostTypeDo } from '@/apis'
import Modal from '@/utils/showModal'
import { Form, Field, ErrorMessage, type YupSchema } from 'vee-validate'
import * as yup from 'yup'
import LineMdPlus from '~icons/line-md/plus'
import LineMdMinus from '~icons/line-md/minus'
import { getTagApi, type TagDo } from '@/apis/modules/tag'
import { uploadImg } from '@/apis/modules/upload'
const themeStore = useThemeStore()
const userInfoStore = useUserInfoStore()

// 定义 FieldData 接口
interface FieldData {
  usrr_id?: string,
  content: string,
  cover?: string,
  tagIds?: Array<string | number>,
  title: string,
  desc: string
  validation?: YupSchema
  [key: string]: any
}


// 表单数据
const article = reactive<FieldData>({
  user_id: '',
  content: '',
  cover: '',
  tagIds: [],
  title: '',
  desc: '',
  validation: yup.object({
    content: yup.string().required('该字段不为空'),
    cover: yup.string().required('该字段不为空'),
    tagIds: yup.array(),
    title: yup.string().required('该字段不为空'),
    desc: yup.string().required('该字段不为空')
  }),

})
// 用 ref 保存 Vditor 实例
let vditorRef: Vditor
const inputFileRef = ref<HTMLInputElement>()
// 封面临时url
const previewUrl = ref()

// 服务器已存在的tag列表
let tagList = reactive<Array<TagDo>>([])
const selectedTag = ref()
const handleTag = (event: Event) => {
  const target = event.target as HTMLSelectElement
  article.tagIds?.push(target.value) // 更新选中的值
  selectedTag.value = target.value

}
const getTagList = async () => {
  try {
    const res = await getTagApi()
    tagList = res.data || []
  } catch (error) {
    Msg.error('获取tag失败')
  }
}
const clickInput = () => {
  inputFileRef.value?.click()
}
const closeUrl = (e: Event) => {
  e.stopPropagation()
  if (inputFileRef.value) {
    inputFileRef.value.value = '' // 清空文件输入
  }
  previewUrl.value = void 0
  // URL.revokeObjectURL(previewUrl.value)
}
// 处理文件选择事件
const formData = new FormData()
const handleFileChange = () => {
  const fileInput = inputFileRef.value;
  if (!fileInput) return;

  const file = fileInput.files?.[0]// 获取第一个文件
  if (!file) {
    Msg.error('未选择文件')
    return
  }

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    Msg.error('仅支持 JPEG、PNG、webp 和 GIF 格式的图片')
    fileInput.value = '' // 清空文件输入
    return
  }

  // 创建 Blob URL
  const fileUrl = URL.createObjectURL(file)
  previewUrl.value = fileUrl

  formData.append('file', file)

  // 在组件卸载时释放 Blob URL
  // 可以在 onUnmounted 中调用 URL.revokeObjectURL(fileUrl)
}
onMounted(() => {
  getTagList()
  // 初始化 Vditor
  vditorRef = new Vditor('vditor', {
    value: '',
    height: '100vh',
    width: '100%',
    lang: 'zh_CN',
    mode: 'ir',
    preview: {
      hljs: {
        enable: true,
        style: 'github',
      },
      markdown: {
        // 允许原始 HTML 标签通过（关闭清洗/转义）
        sanitize: false,
        // 其余可按需保留默认或自定义
        gfmAutoLink: true,
        toc: true,
      }
    },
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
          nextTick(() => {
            getTagList()
          })

          article.content = vditorRef.getHTML().replace(
            /<pre><code class="(\w*)"/g, // 匹配代码块的开始标签和语言类名
            (_, lang) => {
              return `
                    <pre>
                      <code class="language-${lang}">
                        const a = 10;
                        console.log(a);
                        </code>
                    </pre>
                `;
            }
          ).replace(/<p>/g, '<p class="text-base text-gray-700 mb-4">')
          console.log(article.content);

          Modal.show({
            title: '发布文章',
            type: 'info',
            cont: () => {
              return <>
                <section class="w-full">
                  <Form validationSchema={article.validation}>
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">文章标题</legend>
                      <Field name='title' v-model={article.title} class="input w-full" />
                      <ErrorMessage name='title' class="label text-error" ></ErrorMessage>
                    </fieldset>
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">文章封面</legend>
                      {/* 封面 */}
                      <div>
                        <section onClick={clickInput} class={'p-3 relative w-min-50 overflow-hidden hover:shadow-2xl duration-300 ease-in-out transition-all w-60 h-50 shadow-sm border-dotted border-1 box-content card'}>
                          {
                            previewUrl.value ? <img src={previewUrl.value} class={'object-cover rounded-2xl w-full h-full'} /> : <LineMdPlus class=" text-base-content w-full h-full" />
                          }
                          {
                            previewUrl.value && <div onClick={(e: Event) => closeUrl(e)} title='清除' class={'absolute top-4 right-5 p-x-1 backdrop-blur-2xl bg-white-50 rounded-sm'}>
                              <LineMdMinus class=" font-bold text-white hover:scale-110 hover:text-error duration-300 ease-in-out text-2xl" />
                            </div>
                          }
                        </section>
                        <input accept="image/jpeg, image/png, image/gif, image/webp" onChange={handleFileChange} ref={inputFileRef} class={'hidden'} type="file" name="file" />

                      </div>
                    </fieldset>


                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">文章描述</legend>
                      <Field name='desc' v-model={article.desc} class="input w-full" />
                      <ErrorMessage name='desc' class="label text-error" ></ErrorMessage>
                    </fieldset>

                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">文章标签</legend>
                      <select
                        name="tid"
                        value={selectedTag.value}
                        onChange={handleTag}
                        class="select select-neutral"
                      >
                        {tagList.length > 0 ? (
                          tagList.map(tag => (
                            <option key={tag.id} value={tag.id} >
                              {tag.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            加载中...
                          </option>
                        )}
                      </select>
                    </fieldset>
                  </Form>
                </section >
              </>
            },
            confirmText: '发布',
            close: () => {
              console.log('自定义内容模态框已关闭')
            },
            confirm() {
              (async function () {
                const imgData = await uploadImg(formData)
                article.cover = imgData.data.url
                await postArticleApi({
                  title: article.title,
                  desc: article.desc,
                  tagIds: [0],
                  content: article.content,
                  cover: article.cover
                })
                vditorRef.setValue('')
                Msg.success('文章发布成功')
                Modal.close()
              })()
            },
          })
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
          const file = files[0]
          const formData = new FormData()
          formData.append('file', file)
          uploadImg(formData)
            .then(res => {
              if (res.code === 200) {
                Msg.success(res.message)
                // 插入图片 URL 到编辑器
                vditorRef.insertValue(`![${file.name}](${res.data.url})`)
                resolve(res.data.url) // 返回图片的 URL
              } else {
                reject(new Error(res.message)) // 错误时 reject
              }
            })
            .catch(err => {
              reject(err)// 捕获异常并 reject
            })
        })
      }

    }

  })
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = vditorRef
  if (editor == null) return
  editor.destroy()
})
onUnmounted(() => {

  URL.revokeObjectURL(previewUrl.value)
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
    <!-- <ModalCom></ModalCom> -->
  </section>
  <section id="vditor"></section>
</template>
