import axios from '@/utils/request'

export const getAllChannels = () => {
  return axios({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = (channel) => {
  return axios({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除用户指定频道
export const delUserChannel = (channelId) => {
  return axios({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
