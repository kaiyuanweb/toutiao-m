import axios from '@/utils/request'

export const getArticles = (params) => {
  return axios({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取文章
 */
export const getArticleById = (articleId) => {
  return axios({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return axios({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
