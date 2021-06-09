import axios, { AxiosError } from 'axios'
import { baseUrl } from './utils'

export const isBypassing = () => {
  return localStorage.getItem('bypass_is_active') === 'true'
}

export default {
  fetchAuthorization: () => {
    return axios({
      method: 'post',
      url: `${baseUrl}authorization/token`,
      data: 'client_id=test&client_secret=test&grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      localStorage.setItem('access_token', response.data.access_token)
      return Promise.resolve(response)
    })
  },
  loginUser: (username: string, password: string, accessToken: string) => {
    return axios
      .post(
        `${baseUrl}application/account/login`,
        {
          UserName: username,
          Password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token')
        }
        return Promise.reject(error)
      })
  },
}
