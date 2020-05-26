import axios from '@/utils/request'

export const getAllChannels = () => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
