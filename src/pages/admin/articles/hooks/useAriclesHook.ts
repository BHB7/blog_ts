import { ref } from "vue"
import { getTagApi, createTagApi, type Tag } from '@/apis/index'
import Msg from "@/utils/showMsg"
import type { ArrayResponse } from "@/type/response"

const useArticleHook = () => {
  const tagList = ref<Array<Tag>>()
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

  // 创建标签处理事件
  const clickHandelTag = (tag: Tag) => {
    createTag(tag)
  }
  return {
    tagList,
    getTagList,
    createTag
  }
}


export default useArticleHook
