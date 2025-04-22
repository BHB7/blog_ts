import axios from "axios";
import { useLoadingBar } from '@/components/hooks/loadingBar'
import { showMsg } from "@/utils/showMsg"
import { useTokenStore } from '@/store'
const tokenStore = useTokenStore()
// 创建 Axios 实例
export const http = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
  // withCredentials: true // 携带凭证
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    useLoadingBar().startSpeed(); // 启动加载动画
    // 添加认证信息
    const token = tokenStore.getToken()
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    useLoadingBar().endSpeed(); // 结束加载动画
    showMsg('请求发送失败', 'error', 1000)
    return Promise.reject(error)
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    const data = response.data
    if (data.code !== 200) {
      showMsg(data.message, 'error', 1000)
      return Promise.reject(data.message)
    }
    useLoadingBar().endSpeed(); // 结束加载动画
    return response.data;
  },
  function (error) {
    useLoadingBar().endSpeed()// 结束加载动画
    showMsg(error.message, 'error', 1000)
    return Promise.reject(error)
  }
);
