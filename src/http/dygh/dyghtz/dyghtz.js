import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

export const queryTable = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service//ckgl/dytz/dytzService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


/**
 * 导出调用台账
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportDytz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service//ckgl/dytz/dytzService', 'exportDytz', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj);
    });
  })
}

