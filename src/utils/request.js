import axios from 'axios'
import store from '@/store/index'
var request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 config 本次请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 没有return config 请求出不去
    return config
  },
  function (error) {
    // 请求本身出错 还没发出去
    return Promise.reject(error)
  }
)
export default request
