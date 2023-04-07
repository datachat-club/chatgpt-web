import axios, { type AxiosResponse } from 'axios'
// import { useAuthStore } from '@/store'
import { getToken } from '@/store/modules/auth/helper'
import { router } from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pp-token')
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)

      return response

    if (response.data.Status === 'Fail')
      window.$message.error(response.data.message)
    router.replace('/login')

    throw new Error(response.status.toString())
  },
  (error) => {

    const { response } = error
    window.$message.error(response.data.message)
    router.replace('/login')
    return Promise.reject(error)
  },
)

export default service
