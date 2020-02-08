import http from '@/framework/http'

/**
 * 查询列表数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfth/bfthService', 'query', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody())
    })
  })
}

/**
 * 查询物证信息列表数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWzxx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfth/bfthService', 'querywzxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody())
    })
  })
}

/**
 * 提交退回
 * @param params
 * @returns {Promise<unknown>}
 */
export const tjth = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfth/bfthService', 'tuihuiWzxx', params, true, '').then((data) => {
      var obj = {
        'success': data.getHeader().getNode().getNodeItem('success'),
        'message': data.getHeader().getNode().getNodeItem('message'),
        'data"': data.getBody().getValueofBody()
      }
      resolve(obj)
    })
  })
}
