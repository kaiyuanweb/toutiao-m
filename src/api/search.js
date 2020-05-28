import axios from '@/utils/request'

export const getSearchSuggestion = q => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}

export const getSearchResult = params => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
