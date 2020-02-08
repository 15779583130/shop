import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询列表
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryCztz', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取处置台账详情
 */
export const getCzxxByWzxxId =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'getCzxxByWzxxId', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 导出台账
 */
export const exportExcel = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'exportExcel', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj);
    });
  })
}
