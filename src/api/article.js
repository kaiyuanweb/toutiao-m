import axios from '@/utils/request'

export const getArticles = params => {
  return axios({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
