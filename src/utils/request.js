import axios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'
var request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // 自定义后端返回的原始数据    后端返回的原始数据 说白了也就是json 字符串
  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
      // axios  会默认  JSON.parse(data) 来处理后端返回的数据
    }
  ]
})
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么 config 本次请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 没有return config 请求出不去
    return config
  },
  function(error) {
    // 请求本身出错 还没发出去
    return Promise.reject(error)
  }
)
export default request
