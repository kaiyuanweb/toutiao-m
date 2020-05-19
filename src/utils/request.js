import axios from 'axios'

var request = axios.create({
  baseURL: 'https://ttapi.research.itcast.cn'
})

export default request
