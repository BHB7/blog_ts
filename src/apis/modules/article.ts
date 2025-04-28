import { http } from '@/apis/instances/instances'
import router from '@/routers';


// export interface ArticleType {
//   name: string,
//   password: string
// }
// 接口定义
interface Article {
  title: string;
  content: string;
  desc: string;
  cover: string;
}

export interface ArticleTypeVo extends Article {
  id?: number;
  view?: number | string;
  updatedAt: Date | string;
  createdAt: Date | string;
  tags: Array<{ id: string | number, name: string, des: string }>
}

export interface ArticlePostTypeDo extends Article {
  user_id?: number | string;
  tagIds: Array<string | number>;
}

// 获取文章列表
export const getArticlesApi = async (pageSize: number = 10, pageOffset: number = 0) => {
  try {
    const response = await http.get('article/list', {
      params: { pageOffset, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw new Error('获取文章列表失败');
  }
};
// 根据aid获取文章详情
export const getArticleByIdApi = async (aid: number | string) => {
  try {
    const response = await http.get(`/article/${aid}`)
    return response.data
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw new Error('获取文章详情失败');
  }
}
// 发布文章
export const postArticleApi = async (article: ArticlePostTypeDo) => {
  try {
    const formattedArticle = {
      title: article.title,
      content: article.content,
      desc: article.desc,
      cover: article.cover,
      user_id: article.user_id,
      tagIds: article.tagIds.map(tag => tag)
    };
    const response = await http.post('article/post', formattedArticle);
    return response.data;
  } catch (error) {
    console.error('发布文章失败:', error);
    throw new Error('发布文章失败');
  }
};
