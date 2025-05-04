import { ref } from "vue"
import { getTagApi, createTagApi, type Tag, getArticlesApi, type ArticleTypeVo, type ArticleDo, delArticleApi } from '@/apis/index'
import Msg from "@/utils/showMsg"
import modalService from "@/utils/showModal"
const useArticleHook = () => {
  // 页面级op按钮状态
  const btnState = ref(false)
  const tagList = ref<Array<Tag>>()
  const articleList = ref<Array<ArticleTypeVo>>()

  const articleParams = ref<ArticleDo>()

  // 获取文章列表
  const getArticleList = async () => {
    if (!articleParams.value) {
      articleParams.value = {
        state: '010'
      }
    }
    try {
      const response = await getArticlesApi(articleParams.value)
      articleList.value = response.list
    } catch (error) {
      Msg.error('获取文章列表失败了')
    }
  }

  // 获取标签列表
  const getTagList = async () => {
    const response = await getTagApi()
    console.log(response);
    if (response) {
      tagList.value = response
    }
  }

  // 创建标签
  const createTag = async (tag: Tag) => {
    await createTagApi(tag)
    Msg.success('标签创建成功')
    // 刷新列表
    getTagList()
  }


  // 删除文章
  const delArticle = async (aid: string | number) => {
    btnState.value = true
    try {
      await modalService.show({
        cont: '确定要删除该文章吗？'
      })
      await delArticleApi(aid)
      // 刷新列表
      getArticleList()
      Msg.success('删除成功')
    } catch (error: any) {
      Msg.error(error.message || '文章删除失败qaq')
    } finally {
      btnState.value = false
    }
  }


  return {
    tagList,
    getTagList,
    createTag,
    getArticleList,
    articleList,
    delArticle,
    btnState,
    articleParams
  }
}


export default useArticleHook
