/**
 * http.js
 * 封装axios，
 * 调用方法:
 * http.get('/api/enquiry/web/query',''query','{id:1}).then((res)=>{你的操作})
 * http.post('/api/enquiry/web/update','query',{id:1}).then((res)=>{你的操作})
 * http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
 */
import axios from 'axios'
import glbalArgs from '@/utils/global.js'
import commonService from '@/framework/CommonService.js'
import envelopeUtil from '../framework/EnvelopUtil'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import router from '../router/index'

export default {
  /**
   * get方法，对应get请求
   * @param {String} mapping [请求的路径]
   * @param {String} methodname [请求的方法名称]
   * @param {Object} params [请求时携带的参数]
   */

  setSession (obj) {
    this.post(obj, '', '')
  },
  get (mapping, methodname, params) {
    // 获取ip
    let sessioninfo = {}
    if (Object.prototype.toString.call(mapping) === '[object Object]') {
      sessioninfo = mapping
      localStorage.setItem('sessionInfo', JSON.stringify(mapping))
    }
    if (localStorage.getItem('sessionInfo') !== null) {
      sessioninfo = JSON.parse(localStorage.getItem('sessionInfo'))
    }
    let ip = localStorage.getItem('ip_addr')
    let paramsheader = {
      'timestamp': new Date().getTime(),
      'execute': methodname,
      'reqtime': commonService.getMyDate('yyyyMMddhhmmssSSS'),
      'mapping': mapping,
      'method': methodname,
      'transid': commonService.getuuid(),
      'reqip': ip,
      'reqclass': 'common.web.class',
      'appname': 'commonweb',
      'respip': ip,
      'reqdate': commonService.getMyDate('yyyyMMdd'),
      // 'sessionid': sessionStorage.getItem('session_id')
    }
    // sessioninfo 传参数格式
    // let sessioninfo = {
    //   by_007: '01010302',
    //   dept_code: '003',
    //   by_006: '',
    //   by_005: '',
    //   by_004: '',
    //   by_003: '',
    //   dw_word: '',
    //   by_002: '',
    //   login_type: '',
    //   by_001: '',
    //   user_name: '超级管理员',
    //   inst_word: '',
    //   last_logou_time: '',
    //   zone_id: '',
    //   user_type: '',
    //   dw_name: '',
    //   tel: '',
    //   fk_code: '',
    //   class: 'class com.syncsoft.synccloud.framework.model.SessionInfo',
    //   by_009: '',
    //   by_008: '',
    //   ip: '',
    //   mobile: '',
    //   dept_name: '跨部门涉案财物中心',
    //   login_mode: '',
    //   ginst_word: '',
    //   auth_data: '',
    //   log_time: '',
    //   zone_level: '',
    //   login_name: '',
    //   sfzh: '',
    //   user_id: '47762BB33B3D53821627E6B8935F234A',
    //   company_name: '',
    //   dept_id: '46AA4889A9FECF517FDDB304859F6629',
    //   ukey: '',
    //   dw_id: ''
    // };
    let _pramas = envelopeUtil.doRequest(paramsheader, params, sessioninfo)
    let url = glbalArgs.baseUrl + mapping + (methodname && '/invokerxml')
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: _pramas
      }, {
        headers: {'Content-Type': 'application/xml;charset=utf-8'},
        withCredentials: false,
        timeout: 60000
      })
        .then(res => {
          let envelopObj = envelopeUtil.doResponse(res.data)
          // if (envelopObj === '签名信息失败') {
          //   Message.error('登录已过期，请重新登录')
          //   router.push({
          //     name: 'login'
          //   })
          //   return false
          // }
          // if (envelopObj.getHeader().getValueofHeader().header.default.message === 'nologin') {
          //   Message.error('登录已过期，请重新登录')
          //   router.push({
          //     name: 'login'
          //   })
          //   return false
          // }
          resolve(envelopObj)
        }).catch(err => {
          reject(err)
        })
    })
  },
  /**
   * post方法，对应post请求
   * @param {String} mapping [请求的路径]
   * @param {String} methodname [请求的方法名称]
   * @param {Object} params [请求时携带的参数]
   */
  post (mapping, methodname, params) {
    // 获取ip
    let sessioninfo = {}
    if (Object.prototype.toString.call(mapping) === '[object Object]') {
      sessioninfo = mapping
      localStorage.setItem('sessionInfo', JSON.stringify(mapping))
    }
    if (localStorage.getItem('sessionInfo') !== null) {
      sessioninfo = JSON.parse(localStorage.getItem('sessionInfo'))
    }
    let ip = localStorage.getItem('ip_addr')
    let paramsheader = {
      'timestamp': new Date().getTime(),
      'execute': methodname,
      'reqtime': commonService.getMyDate('yyyyMMddhhmmssSSS'),
      'mapping': mapping,
      'method': methodname,
      'transid': commonService.getuuid(),
      'reqip': ip,
      'reqclass': 'common.web.class',
      'appname': 'commonweb',
      'respip': ip,
      'reqdate': commonService.getMyDate('yyyyMMdd'),
      // 'sessionid': sessionStorage.getItem('session_id')
    }
    // sessioninfo 传参数格式
    let _pramas = envelopeUtil.doRequest(paramsheader, params, sessioninfo)
    let url = glbalArgs.baseUrl + mapping + (methodname && '/invokerxml')
    return new Promise((resolve, reject) => {
      axios.post(
        url,
        _pramas,
        {
          headers: {'Content-Type': 'application/xml;charset=utf-8'},
          withCredentials: false,
          timeout: 60000
        })
        .then(res => {
          let envelopObj = envelopeUtil.doResponse(res.data)
          // if (envelopObj === '签名信息失败') {
          //   Message.error('登录已过期，请重新登录')
          //   router.push({
          //     name: 'login'
          //   })
          //   return false
          // }
          // if (envelopObj.getHeader().getValueofHeader().header.default.message === 'nologin') {
          //   Message.error('登录已过期，请重新登录')
          //   router.push({
          //     name: 'login'
          //   })
          //   return false
          // }
          resolve(envelopObj)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * postFormData方法，对应post请求，用来提交文件+数据
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  postFormData (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        },
        transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          return formData
        }],
        url,
        method: 'post',
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
