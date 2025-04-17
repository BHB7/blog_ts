import { http } from '@/apis/instances/instances'


// export interface ArticleType {
//   name: string,
//   password: string
// }

export interface ArticleTypeVo {
  title: string,
  content: string,
  desc: string,
  cover: string,
  id: string | number,
  view: string | number,
  updatedAt: Date | string
}
export const getArticles = async (pageSize: string | number = 10, pageOffset: string | number = 0) => {
  return await http.post('article', {
    pageOffset,
    pageSize
  })
}
