import { http } from "../instances/instances"

export interface TagDo {
  id?: string | number
  tid?: string;
  name?: string;
  desc?: string;
}
export interface ResVo extends TagDo {
  message: string
  code: number | string
  token?: string
  data: Array<TagDo> | null
}
export const getTagApi = (tag?: TagDo): Promise<ResVo> => {
  return http.get('/tag', {
    params: {
      tid: tag?.tid,
      name: tag?.name,
      desc: tag?.desc
    }
  })
}

export const delTagApi = (tid: string | number): Promise<ResVo> => {
  return http.delete('tag/del', {
    params: {
      tid
    }
  })
}
