import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export const baseUrl: string = process.env.REACT_APP_BASE_URL || ''

if (!baseUrl) {
  throw Error('please set REACT_APP_BASE_URL environment variable')
}

const getHeaders = () => {
  const accessToken: string | null = localStorage.getItem('access_token')
  const currentUser: string | null = localStorage.getItem('current_user')
  if (!accessToken || !currentUser) {
    return
  }
  const userToken = JSON.parse(currentUser).UserToken.user_token
  return {
    Authorization: `Bearer ${accessToken}`,
    User_token: userToken,
  }
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log('onResponse: ', response)
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.log('onResponseError: ', error.response)
  if (error.response?.status === 401) {
    // localStorage.removeItem('current_user')
    // window.location.reload()
  }
  return Promise.reject(error)
}

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

export const request = setupInterceptors(
  axios.create({
    baseURL: baseUrl,
    headers: getHeaders(),
  })
)
