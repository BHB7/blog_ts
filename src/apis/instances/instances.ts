import axios, { type AxiosRequestConfig } from "axios"
import { useLoadingBar } from '@/components/hooks/loadingBar'
import Msg from "@/utils/showMsg"
import { useTokenStore } from "@/store"


// 创建 Axios 实例
export const http = axios.create({
  baseURL: 'https://api.vocucd.cn/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
});

let loadingCount = 0;

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    loadingCount++;
    if (loadingCount === 1) {
      useLoadingBar().startSpeed() // 启动加载动画
    }
    const token = useTokenStore().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    loadingCount = Math.max(0, loadingCount - 1)
    useLoadingBar().endSpeed() // 结束加载动画
    Msg.error('请求发送失败', 1000)
    return Promise.reject(error)
  }
);

// 响应拦截器
http.interceptors.response.use(
  function (response) {
    loadingCount = Math.max(0, loadingCount - 1)
    if (loadingCount === 0) {
      useLoadingBar().endSpeed() // 结束加载动画
    }

    const data = response.data
    if (data.code !== 200) {
      Msg.error(data.message, 1000)
      if (data.code === 401 && window.location.pathname.slice(1, 6) === 'admin') {
        window.history.pushState(null, '', '/login')
        window.location.reload()
      }
      return Promise.reject(new Error(data.message))
    }

    return data
  },
  function (error) {
    loadingCount = Math.max(0, loadingCount - 1)
    useLoadingBar().endSpeed();
    Msg.error(error.message, 1000)
    return Promise.reject(error)
  }
);

// 泛型封装请求函数
// export async function request<T>(config: AxiosRequestConfig): Promise<T> {
//   const response = await http(config)
//   return response as T
// }
