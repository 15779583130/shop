import axios from 'axios'
import store from '../store'
import router from '../router/index'
import { Message, Loading } from 'element-ui'

/** 设置axios */
axios.defaults.timeout = 200000
// axios.defaults.baseURL = constants.BaseUrl
axios.defaults.baseURL = window.g.ApiUrl
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0)'
  })
  loading
}
function endLoading () {
  loading.close()
}

/** 请求拦截器 */
axios.interceptors.request.use(function (config) {
  // let token = ''
  // if (store.state.app.token) {
  //   token = store.state.app.token
  // } else {
  //   token = sessionStorage.getItem('token')
  //   store.commit('setToken', token)
  // }
  // if (token) {
  //   config.headers.common['X-Authorization'] = 'Bearer ' + token
  // }
  // 开始请求
  // iView.LoadingBar.start()
  startLoading()
  return config
}, function (error) {
  // iView.LoadingBar.finish()
  endLoading()
  return Promise.reject(error)
})

/** 响应拦截器 */
axios.interceptors.response.use(function (response) {
  // iView.LoadingBar.finish()
  endLoading()
  // if (response.data.errorCode) {
  //   iView.Message.error('错误码：' + response.data.errorCode + '; ' + response.data.message)
  //   return Promise.reject(response)
  // }
  return response
}, function (error) {
  // iView.LoadingBar.finish()
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (error.response.data.errorCode) {
          switch (error.response.data.errorCode) {
            case 'BSMSC002':
              error.response.data.message = '登录已过期，请重新登录'
              store.commit('logout')
              store.commit('clearOpenedSubmenu')
              router.push({
                name: 'login'
              })
              break
          }
        }
        break
      case 404:
        Message.error({
          message: '请求失败！'
        })
        endLoading()
        break
    }
    if (error.response.data.message) {
      // endLoading()
      // Message.error({
      //   message: '加载超时'
      // })
      // iView.Message.error(error.response.data.message)
    } else {
      endLoading()
      // if (error.response.data.byteLength) {
      //   iView.Message.error('无法下载电子回单')
      // } else {
      //   if (error.response.config.url.indexOf('transFlowHistory/download') < 0) {
      //     iView.Message.error(error.message)
      //   }
      // }
    }
  } else if (error.message) {
    endLoading()
    // iView.Message.error(error.message)
  }
  return Promise.reject(error)
})

export const http = axios
