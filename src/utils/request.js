import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: 'https://backendmyeapp.herokuapp.com', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
     
      
      config.headers['Authorization'] = 'JWT '+ getToken()
    } else {
      config.headers['Authorization'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    //console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status == 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
       return Promise.reject(new Error(res.message || 'Erro ao Logar, favor verificar usuario e senha.'))
    } else {
      return res
    }
  },
  error => {
    console.log(error.response.data) // for debug
    
     
     Message({
      message: error.response.data,
      type: 'error',
      duration: 5 * 1000
    })
      if (error.response.status == '401' || error.response.data.global[0] == 'Signature has expired.'){
      store.dispatch('user/resetToken')
      router.push({ path: "/login"  })
    }

    return Promise.reject(error.response)
  }
)

export default service
