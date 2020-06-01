import axios from '@/utils/request'
// 文字评论列表
export const getComments = (params) => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 评论点赞
export const addCommentLike = (target) => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    params: {
      target
    }
  })
}
// 取消评论点赞
export const deleteCommentLike = (target) => {
  return axios({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
// 评论点赞
export const addComment = (data) => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
