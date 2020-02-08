import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询列表信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service//wlgl/wlcl/wlclService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })


}

/**
 * 保存
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveOrupdate = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service//wlgl/wlcl/wlclService', 'saveOrupdate', params, true, '').then((data)=>{
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
 * 获取某个物流车辆信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getInfo = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service//wlgl/wlcl/wlclService', 'getInfo', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 删除
 * @param params
 * @returns {Promise<unknown>}
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service//wlgl/wlcl/wlclService', 'del', params, true, '').then((data)=>{
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
 * 审核物流车辆信息操作
 * @param params
 * @returns {Promise<unknown>}
 */
export const adopt = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service//wlgl/wlcl/wlclService', 'adopt', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
