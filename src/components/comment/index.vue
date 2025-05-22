<script setup lang="ts">
import LineMdThumbsUp from '~icons/line-md/thumbs-up'
import LineMdThumbsDown from '~icons/line-md/thumbs-down'
import LineMdEmojiSmile from '~icons/line-md/emoji-smile'
import LineMdImage from '~icons/line-md/image'
import LineMdTrash from '~icons/line-md/trash';
import { pageData } from '@/events/event'
import type { ArticleTypeVo } from '@/apis'
import { onMounted, reactive, ref } from 'vue';
import { addCommentsApi, delCommentApi, getCommentsApi, type CommentDo, type CommentListDo, type CommentVo, type CommentVoList } from '@/apis/modules/comment';
import Modal from '@/utils/showModal';
import Msg from '@/utils/showMsg';
import { useUserInfoStore } from '@/store';
import EmojiBox, { type List } from '@/components/eomjiBox/index.vue'

const editableDiv = ref<HTMLDivElement | null>(null); // 引用输入框

const showCommentFooter = ref(false)
const comment = reactive<CommentDo>({
  content: '',
  aid: '',
  pid: null
})

const commentParams = reactive<CommentListDo>({
  sort: 'recent',
  aid: ''
})

pageData.on('articleData', async (data: ArticleTypeVo) => {
  Object.assign(comment, { ...comment, aid: data.id })
  Object.assign(commentParams, { ...commentParams, aid: data.id })
  await getComments()
})

const userInfoStore = useUserInfoStore()

interface CommentNewList extends CommentVo {
  children?: CommentVoList[]
}

const commentsList = reactive<CommentVoList>({
  "currentPage": 1,
  "pageSize": 10,
  "totalItems": 2,
  "totalPages": 1,
  "items": []
})

const newList = reactive<CommentNewList[]>([])

const getComments = async () => {
  try {
    const res = await getCommentsApi(commentParams)
    Object.assign(commentsList, res)
    newList.splice(0)
    for (let i = 0; i < commentsList.items.length; i++) {
      newList.push(commentsList.items[i])
    }
  } catch (error) {
    Msg.error('获取评论失败')
  }
}

const addComment = async (pid?: number | string) => {
  try {
    if (pid) {
      comment.pid = pid
    }
    await addCommentsApi(comment)
    Msg.success('评论成功')
    comment.content = ''
    showCommentFooter.value = false
    await getComments()
  } catch (error) {
    Msg.error('添加评论失败')
  }
}

const delComment = async (cid: string | number) => {
  Modal.show({
    cont: '删除评论后，评论下所有回复都会被删除，是否继续?',
    confirm: async () => {
      try {
        await delCommentApi(cid)
        Msg.success('删除评论成功')
        await getComments()
      } catch (error: any) {
        Msg.error(error.message)
      }
    },
  })
}

// 表情列表数据
const emojiList = reactive<List[]>([
  { desc: '疑问', url: 'https://vocucd.cn/emoji/031%25402x.gif' },
  { desc: '擦汗', url: 'https://vocucd.cn/emoji/071%25402x.gif' },
  { desc: '抠鼻', url: 'https://vocucd.cn/emoji/072%25402x.gif' },
  { desc: '哭泣', url: 'https://vocucd.cn/emoji/146%25402x.gif' },
  // 更多表情...
])

// 控制表情面板显示
const isShowEmojiBox = ref(false)
const showEmojiBox = () => {
  editableDiv.value?.focus()
  isShowEmojiBox.value = true
}

// 插入表情（使用短码）
const addEmoji = (emoji: List) => {
  isShowEmojiBox.value = false
  if (!editableDiv.value) return

  const filename = emoji.url.split('/').pop() || 'default'; // 得到 "031%25402x.gif"
  const encodedFilename = encodeURIComponent(filename); // 编码一次即可

  const emojiCode = `[emoji:${encodedFilename}]`;
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  range.deleteContents()

  const textNode = document.createTextNode(emojiCode)
  range.insertNode(textNode)

  // 设置光标在插入内容之后
  range.setStartAfter(textNode)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)

  updatedComment()
}

// 更新评论内容（纯文本）
const updatedComment = () => {
  if (!editableDiv.value) return
  setTimeout(() => {
    comment.content = editableDiv.value!.innerText

    console.log(renderContent(comment.content));

  }, 0)
}

// 渲染带表情的 HTML 内容
const renderContent = (raw: string): string => {
  // 匹配 [emoji:filename.gif] 的正则表达式
  const emojiRegex = /$emoji:([^\[$]+\.gif)\]/g;

  return raw.replace(emojiRegex, (_, encodedFilename) => {
    let decodedFilename = encodedFilename;

    // 尝试最多两次解码，以应对双重编码的情况
    try {
      decodedFilename = decodeURIComponent(decodedFilename);
    } catch { }

    try {
      decodedFilename = decodeURIComponent(decodedFilename);
    } catch { }

    const url = `https://vocucd.cn/emoji/${decodedFilename}`;
    return `<img src="${url}" style="max-width:2rem;display:inline-block;" alt="${decodedFilename}" />`;
  });
};


</script>
<template>
  <section class="card bg-blur bg-base-300/70 mt-10">
    <div class="card-body">
      <div class="text flex items-center">
        <h3 class="text-xl">评论</h3>
        <span class="mx-2">{{ commentsList.totalItems }}</span>
        <span class="ml-4">最新</span>
        <el-divider direction="vertical" />
        <span>最热</span>
      </div>

      <div class="flex space-x-4 mb-10">
        <div class="w-14">
          <el-avatar class="w-28 h-28" :size="50" src="../../assets/02.webp">未登录</el-avatar>
        </div>
        <!-- 发布框 -->
        <div class="w-full space-y-4">
          <!-- 表情包面板 -->
          <div class="relative">
            <EmojiBox :list="emojiList" top v-if="isShowEmojiBox" @addEmoji="addEmoji" />
            <!-- 可编辑区域 -->
            <div ref="editableDiv" contenteditable="true" @compositionend="updatedComment"
              @focus="showCommentFooter = true" class="border p-3 w-full min-h-11 outline-none"></div>
          </div>
          <!-- 底部 -->
          <Transition leave-active-class="animate__animated animate__fadeOutUp"
            enter-active-class="animate__animated animate__fadeInDown">
            <div v-show="showCommentFooter" class="flex justify-between items-center">
              <!-- 操作 -->
              <div class="space-x-8">
                <!-- 表情 -->
                <button @click="showEmojiBox" class="btn ml-2 btn-xs btn-outline">
                  <LineMdEmojiSmile />
                </button>
                <!-- 图片 -->
                <button class="btn btn-xs btn-outline">
                  <LineMdImage />
                </button>
              </div>
              <!-- 发布按钮 -->
              <div>
                <button @click="addComment()" class="btn btn-primary">发布</button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <section v-for="(comment, index) in newList" :key="index">
        <!-- 评论 -->
        <div class="flex space-x-4">
          <div class="w-14">
            <el-avatar class="w-28 h-28" :size="50" :src="comment.user.imgurl" />
          </div>
          <div class="space-y-2">
            <div class="text-xs">{{ comment.user.name }}</div>
            <div class="text-[1.1rem] font-sans" v-html="renderContent(comment.content)"></div>
            <div class="flex items-center flex-wrap space-x-4">
              <span class="text-sm font-extralight">2025-05-01 19:25</span>
              <button class="btn text-sm font-extralight btn-xs btn-outline">
                <LineMdThumbsUp />
                <span>{{ comment.like }}</span>
              </button>
              <button class="btn btn-xs btn-outline">
                <LineMdThumbsDown />
              </button>
              <button class="btn text-sm font-extralight btn-xs btn-outline">回复</button>
              <button @click="delComment(comment.id)" v-if="comment.uid === userInfoStore.userInfo.user.id"
                class="btn text-sm font-extralight btn-xs btn-outline">
                <LineMdTrash />
              </button>
            </div>
          </div>
        </div>
        <el-divider />
      </section>
    </div>
  </section>
</template>
