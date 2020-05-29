import axios from '@/utils/request'

export const getArticles = params => {
  return axios({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取文章
 */
export const getArticleById = articleId => {
  return axios({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
