import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// 响应数据接口
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

// 扩展请求配置
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean // 是否显示loading
  showError?: boolean // 是否显示错误提示
  _retry?: boolean // 内部使用：标记是否为重试请求
}

// loading 实例
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null
let loadingCount = 0

// 显示loading
const showLoading = () => {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.5)',
    })
  }
  loadingCount++
}

// 隐藏loading
const hideLoading = () => {
  loadingCount--
  if (loadingCount <= 0) {
    loadingInstance?.close()
    loadingInstance = null
    loadingCount = 0
  }
}

// ========== Token 刷新相关 ==========
let isRefreshing = false // 是否正在刷新token
let pendingRequests: Array<(token: string) => void> = [] // 等待刷新的请求队列

// 刷新 token 的方法（根据实际接口修改）
const refreshToken = async (): Promise<string> => {
  const refreshTokenValue = localStorage.getItem('refreshToken')
  if (!refreshTokenValue) {
    throw new Error('无效的 refreshToken')
  }

  const response = await axios.post(
    (import.meta.env.VITE_API_BASE_URL || '/api') + '/auth/refresh',
    { refreshToken: refreshTokenValue },
  )

  const { token, refreshToken: newRefreshToken } = response.data.data
  localStorage.setItem('token', token)
  if (newRefreshToken) {
    localStorage.setItem('refreshToken', newRefreshToken)
  }

  return token
}

// 跳转登录页
const goToLogin = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const requestConfig = config as RequestConfig

    if (requestConfig.showLoading !== false) {
      showLoading()
    }

    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    hideLoading()

    const res = response.data
    const config = response.config as RequestConfig

    if (res.code === 200 || res.code === 0) {
      return res.data
    }

    // token 过期，尝试刷新
    if (res.code === 401 && !config._retry) {
      return handleTokenRefresh(config)
    }

    if (config.showError !== false) {
      ElMessage.error(res.message || '请求失败')
    }

    return Promise.reject(new Error(res.message || '请求失败'))
  },
  async (error) => {
    hideLoading()
    const config = error.config as RequestConfig

    // 401 状态码：尝试刷新 token
    if (error.response?.status === 401 && !config._retry) {
      return handleTokenRefresh(config)
    }

    // 其他错误处理
    let message = '网络错误'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 403:
          message = '没有访问权限'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败(${error.response.status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

/**
 * 处理 token 刷新和请求重试
 */
async function handleTokenRefresh(config: RequestConfig): Promise<any> {
  if (isRefreshing) {
    // 正在刷新，将请求加入队列等待
    return new Promise((resolve) => {
      pendingRequests.push((newToken: string) => {
        config.headers!.Authorization = `Bearer ${newToken}`
        config._retry = true
        resolve(service(config))
      })
    })
  }

  isRefreshing = true

  try {
    const newToken = await refreshToken()

    // 刷新成功，执行队列中的请求
    pendingRequests.forEach((callback) => callback(newToken))
    pendingRequests = []

    // 重试当前请求
    config.headers!.Authorization = `Bearer ${newToken}`
    config._retry = true
    return service(config)
  } catch (refreshError) {
    // 刷新失败，清空队列并跳转登录
    pendingRequests = []
    ElMessage.error('登录已过期，请重新登录')
    goToLogin()
    return Promise.reject(refreshError)
  } finally {
    isRefreshing = false
  }
}

/**
 * 通用请求方法
 * @param config 请求配置
 * @returns Promise<T>
 *
 * @example
 * // GET 请求
 * request({ url: '/user/info', method: 'GET', params: { id: 1 } })
 *
 * // POST 请求
 * request({ url: '/user/login', method: 'POST', data: { username, password } })
 *
 * // 不显示 loading
 * request({ url: '/list', method: 'GET', showLoading: false })
 */
function request<T = any>(config: RequestConfig): Promise<T> {
  return service(config) as Promise<T>
}

export default request
