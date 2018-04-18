import axios from 'axios'
import { Toast } from 'antd-mobile'

// axios请求拦截器
axios.interceptors.request.use(config => {
  Toast.loading('加载中', 0)
  return config
})

// axios响应拦截器
axios.interceptors.response.use(config => {
  Toast.hide()
  return config
})
