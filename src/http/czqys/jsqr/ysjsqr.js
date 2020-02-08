import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询移送申请列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}


/**
 * 查询物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const querywzxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'querywzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 编辑获取主表信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const infoEdit = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'infoEdit', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 处置权移送确认详细页面下部物证信息列表查询
 * @param params
 * @returns {Promise<unknown>}
 */
export const querywzxxDetail =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'querywzxxDetail', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}
/**
 * 接收处置权送
 * @param params
 * @returns {Promise<unknown>}
 */
export const jieshouYsxxcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'jieshouYsxxcb', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

/**
 * 退回处置权移送
 * @param params
 * @returns {Promise<unknown>}
 */
export const tuihuiYsxxcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ysqr/ysqrService', 'tuihuiYsxxcb', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
