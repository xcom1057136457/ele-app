import axios from 'axios'
import store from '@/store'

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://elm.cangdu.org'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = '/api'
}

// create an axios instance
const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

// request interceptor
service.interceptors.request.use(
  config => {
    store.dispatch('global/GetLoading', true)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    store.dispatch('global/GetLoading', false)
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service