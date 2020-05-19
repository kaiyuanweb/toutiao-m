import axios from '@/utils/request'

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
