import axios from '@/utils/request'
// import store from '@/store'
export const login = data => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const sendSMS = mobile => {
  return axios({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/user'
    // 请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const addFollow = target => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteFollow = target => {
  return axios({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + target
  })
}
// 获取用户个人资料
export const getUserProfile = () => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 更新用户个人资料
export const updateUserProfile = data => {
  return axios({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
// 更新用户照片资料
export const updateUserPhoto = data => {
  return axios({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
