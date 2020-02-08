import http from '@/framework/http'

/**
 * 查询列表数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfthtz/bfthtzService', 'query', params, true, '').then((data) => {
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
    http.post('/service/wzysgl/bfthtz/bfthtzService', 'querywzxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody())
    })
  })
}

/**
 * 打开处置权退回台账
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryDetail = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfthtz/bfthtzService', 'detailBfth', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody())
    })
  })
}

/**
 * 导出移送台账
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportCzqthtz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/bfthtz/bfthtzService', 'exportBfthtz', params, true, '').then((data) => {
      var obj = {
        'success': data.getHeader().getNode().getNodeItem('success'),
        'message': data.getHeader().getNode().getNodeItem('message'),
        'data': data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj)
    })
  })
}
