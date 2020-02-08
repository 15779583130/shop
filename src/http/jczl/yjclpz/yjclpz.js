import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'


/**
 * 列表查询
 */
export const queryTable = (params) => {

   return new Promise((resolve, reject) => {
      http.post('/service/jcsjgl/yjcl/yjclService', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })

}

/**
 * 获取预警配置信息
 */
export const getInfo = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/yjcl/yjclService', 'getInfo', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


/**
 *删除
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/yjcl/yjclService', 'del', params, true, '').then((data)=>{
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
 * 保存
 */
export const saveOrupdate = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/yjcl/yjclService', 'saveOrupdate', params, true, '').then((data)=>{
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
 * 控制状态
 */
export const changeStatus = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/yjcl/yjclService', 'changeStatus', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
