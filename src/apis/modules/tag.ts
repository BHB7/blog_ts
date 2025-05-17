import { http } from "../instances/instances"
import { type ArrayResponse, type ObjectResponse } from '@/type/response'
// ================== 类型定义 ==================
export interface Tag {
  id?: string | number
  tid?: string
  name?: string
  desc?: string
}

export interface TagResVo {
  message: string
  code: number | string
  token?: string
  data: Tag[] | null
}

// ================== API 方法 ==================

/**
 * 获取标签列表
 */

export const getTagApi = async (tag?: Partial<Tag>): Promise<Array<Tag>> => {
  try {
    const response = await http.get('/tag/list', {
      params: {
        tid: tag?.tid,
        name: tag?.name,
        desc: tag?.desc
      }
    });
    return response.data
  } catch (error) {
    throw new Error("获取标签失败");
  }
};

/**
 * 删除标签
 */
export const delTagApi = async (tid: string | number): Promise<TagResVo> => {
  const res = await http.delete('tag/del', {
    params: {
      tid
    }
  })
  return res.data
};

/**
 * 创建标签
 */
export const createTagApi = async ({ name, desc }: Pick<Tag, 'name' | 'desc'>): Promise<TagResVo> => {
  try {
    const response = await http.put<TagResVo>('/tag/add', {
      name,
      desc
    });
    return response.data;
  } catch (error) {
    throw new Error("创建标签失败");
  }
};
