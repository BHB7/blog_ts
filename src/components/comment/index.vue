<script setup lang="ts">
import LineMdThumbsUp from '~icons/line-md/thumbs-up'
import LineMdThumbsDown from '~icons/line-md/thumbs-down'
import LineMdEmojiSmile from '~icons/line-md/emoji-smile'
import LineMdImage from '~icons/line-md/image'
import LineMdTrash from '~icons/line-md/trash';
import { pageData } from '@/events/event'
import type { ArticleTypeVo } from '@/apis'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { addCommentsApi, getCommentsApi, type CommentDo, type CommentListDo, type CommentVo, type CommentVoList } from '@/apis/modules/comment';
import Modal from '@/utils/showModal';
import Msg from '@/utils/showMsg';
import { useUserInfoStore } from '@/store';
const commentInput = ref<null | HTMLTextAreaElement>(null); // 引用输入框

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
  getComments()
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
    Object.assign(commentsList, { ...await getCommentsApi(commentParams) })
    newList.splice(0) // 清空旧数据
    for (let i = 0; i < commentsList.items.length; i++) {
      newList.push(commentsList.items[i])
      if (!commentsList.items[i].pid && commentsList.items[i].aid === commentsList.items[i].pid) {
        newList[i].children?.push(commentsList)
      }
    }
  } catch (error) {
    Msg.error('获取评论失败')
  }
}
onMounted(() => {


})
const addComment = async () => {
  try {
    const response = await addCommentsApi(comment)
    Msg.success('评论成功')
    comment.content = ''
    showCommentFooter.value = false
    getComments()
  } catch (error) {
    Msg.error('添加评论失败')
  }


}
</script>
<template>
  <KeepAlive>

    <section class="card bg-blur bg-base-300/70 mt-10">
      <div class="card-body">
        <div class="text flex items-center ">
          <h3 class=" text-xl">评论</h3>
          <span class=" mx-2">{{ commentsList.totalItems }}</span>
          <span class=" ml-4">最新</span>
          <el-divider direction="vertical" />
          <span>最热</span>
        </div>

        <div class="flex space-x-4 mb-10">
          <div class="w-14"><el-avatar class="w-28 h-28" :size="50" src="../../assets/02.webp">未登录</el-avatar></div>
          <!-- 发布框 -->
          <div class="w-full space-y-4">
            <el-input @focus="showCommentFooter = true" ref="commentInput" v-model="comment.content"
              :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            <!-- 底部 -->
            <Transition leave-active-class="animate__animated  animate__fadeOutUp"
              enter-active-class="animate__animated animate__fadeInDown">
              <div v-if="showCommentFooter" class=" flex justify-between items-center">
                <!-- 操作 -->
                <div class="space-x-8"><!-- 表情 -->
                  <button class="btn ml-2 btn-xs btn-outline">
                    <LineMdEmojiSmile />
                  </button>
                  <!-- 图片 -->
                  <button class="btn btn-xs btn-outline">
                    <LineMdImage />
                  </button>
                </div>
                <!-- 发布按钮 -->
                <div>
                  <button @click="addComment" class="btn btn-primary">发布</button>
                </div>
              </div>
            </Transition>
          </div>
        </div>


        <section v-for="(comment, index) in newList" :key="comment.aid">
          <!-- 评论 -->
          <div class="flex space-x-4 ">
            <div class="w-14"><el-avatar class="w-28 h-28" :size="50" src="../../assets/02.webp" /></div>
            <div class="space-y-2 ">
              <div class=" text-xs">昵称</div>
              <div class=" text-[1.1rem] font-sans">{{ comment.content }}</div>
              <div class="flex items-center flex-wrap space-x-4">
                <span class=" text-sm font-extralight">2025-05-01 19:25</span>
                <button class="btn text-sm font-extralight btn-xs btn-outline">
                  <LineMdThumbsUp />
                  <span>{{ comment.like }}</span>
                </button>
                <button class="btn btn-xs btn-outline">
                  <LineMdThumbsDown />
                </button>
                <button class="btn text-sm font-extralight btn-xs btn-outline">
                  回复
                </button>
                <button v-if="comment.uid === userInfoStore.userInfo.user.id"
                  class="btn text-sm font-extralight btn-xs btn-outline">
                  <LineMdTrash />
                </button>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <el-divider />
        </section>
      </div>
    </section>
  </KeepAlive>
</template>
