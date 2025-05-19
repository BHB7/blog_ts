import { http } from "../instances/instances"


export interface CommentDo {
  uid?: string;
  content: string;
  aid: string | number;
  pid: number | null;
}
export interface CommentListDo {
  aid?: string | number;
  cid?: number | number;
  page?: number;
  size?: number;
  sort?: 'recent' | 'hot';
}

export const addCommentsApi = async (comment: CommentDo) => {
  try {
    const response = await http.post('/comment/add', {
      ...comment
    })
    return response.data
  } catch (error) {
    throw new Error("添加评论失败")
  }
}
export interface CommentVo {
  id: string | number;
  uid: string | number;
  pid: string | number | null;
  content: string;
  reply_uid: string | number | null;
  aid: string | number;
  like: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface CommentVoList {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  items: CommentVo[];

}
// /comment/list

export const getCommentsApi = async (params: CommentListDo): Promise<CommentVoList> => {
  try {
    const response = await http.get('/comment/list', {
      params: { ...params }
    })
    return response.data
  } catch (error) {
    throw new Error("获取评论失败")
  }
}
