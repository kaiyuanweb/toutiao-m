import axios from '@/utils/request'
// import store from '@/store'
export const login = (data) => {
  return axios({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const sendSMS = (mobile) => {
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
