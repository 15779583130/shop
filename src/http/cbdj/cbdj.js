import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 *
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("cbdj/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/wzysgl/cbdj/cbdjService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

export const get = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/cbdj/cbdjService', 'getBeanByid', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const queryUser = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/common/userlist/userlistService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const saveOrupdate = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/cbdj/cbdjService', 'saveOrupdate', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
