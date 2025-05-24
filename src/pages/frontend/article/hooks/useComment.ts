import { addCommentsApi, delCommentApi, getCommentsApi, type CommentDo, type CommentListDo, type CommentVo, type CommentVoList } from '@/apis/modules/comment'


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
