import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 处置审批
 * @author  liuyuan
 * @modify  1.00  2019/12/26   liuyuan   无     新建
 */

//查询table
export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czgl/czdj/czdjService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const queryLcTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czgl/czdj/czdjService', 'queryCzlc', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const getInfo =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czgl/czdj/czdjService', 'getCzdjAndAjxxById', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 查询业务从表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'queryYwcbForBxqd', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询物证明细
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcbWzmx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'queryWzmx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const submitSp = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'submitSp', params, true, '').then((data) => {
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getValueofBody()
      }
      resolve(obj);
    });
  })
}



