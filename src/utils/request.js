import axios from 'axios'

var request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default request
