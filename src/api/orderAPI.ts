import axios, { AxiosError } from 'axios'
import { baseUrl } from './utils'

export type OrderItem = {
  OrderId: number
  Label: string
  Reference: string
  Description: string
  Remarks: string
  DeliveryDate: string
  CreateDate?: string
  OrderType?: object
}

export interface Orders {
  Count: number
  Items: OrderItem[]
}

export interface GetOrdersParams {
  limit: number
  offset: number
}

const handleError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('user')
    window.location.reload()
  }
  return Promise.reject(error)
}

const createHeaders = () => {
  let header: { Authorization?: string; User_token?: string } = {}
  const accessToken = localStorage.getItem('access_token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (accessToken) {
    header.Authorization = `Bearer ${accessToken}`
  }
  if (Object.keys(user).length) {
    header.User_token = user.UserToken.user_token
  }
  return header
}

export default {
  getOrders: (params: GetOrdersParams = { limit: 10, offset: 0 }) => {
    return axios({
      url: `${baseUrl}client/orders?limit=${params.limit}&offSet=${params.offset}`,
      method: 'get',
      headers: createHeaders(),
    }).catch(handleError)
  },
  createOrder: (data: OrderItem) => {
    return axios({
      url: `${baseUrl}client/orders`,
      method: 'post',
      data: { ...data, CreateDate: new Date().toISOString() },
      headers: createHeaders(),
    }).catch(handleError)
  },
  updateOrder: (data: OrderItem) => {
    return axios({
      url: `${baseUrl}client/orders`,
      method: 'put',
      data: { ...data, LastChangedDateTime: new Date().toISOString() },
      headers: createHeaders(),
    }).catch(handleError)
  },
  deleteOrder: (orderId: number) => {
    return axios({
      url: `${baseUrl}client/orders/${orderId}`,
      method: 'delete',
      headers: createHeaders(),
    }).catch(handleError)
  },
}
