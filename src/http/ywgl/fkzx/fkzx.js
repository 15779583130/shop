import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询gridTable数据
 * @param {*} params
 */
export const queryTable =(params)=>{

return new Promise((resolve,reject)=>{
        http.post('/service/ywgl/fkzx/fkzxService', 'query', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })

  }

  /**
   * 删除
   */
  export const del = (params) => {
    return new Promise((resolve,reject)=>{
      http.post('/service/ywgl/fkzx/fkzxService', 'del', params, true, '').then((data)=>{
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
 * 新增初始化
 */
export const getbean =(params)=>{

return new Promise((resolve,reject)=>{
        http.post('/service/ywgl/fkzx/fkzxService', 'getbean', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })

  }

/**
 * 编辑
 */
export const editInfo =(params)=>{

return new Promise((resolve,reject)=>{
        http.post('/service/ywgl/fkzx/fkzxService', 'editInfo', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })

  }
  
  /**
   * 保存
   */
  export const saveInfo = (params) => {
    return new Promise((resolve,reject)=>{
      http.post('/service/ywgl/fkzx/fkzxService', 'saveInfo', params, true, '').then((data)=>{
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
  }

