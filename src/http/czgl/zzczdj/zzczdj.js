import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 最终处置登记
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
      http.post('/service/czgl/czdj/czdjService', 'queryZzdj', params, true, '').then((data)=>{
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

export const queryMx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'queryWzmx', params, true, '').then((data) => {
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

export const getInfo =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czgl/czdj/czdjService', 'getYzAndAjAndYcById', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const submitSp = (params) => {
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data=EnvelopUtil.convertXmlFileToXml('sys/user/data/delete.xml','none');
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    })
  }else if(global.reqService=="remote" ||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czgl/czdj/czdjService', 'submitZzdj', params, true, '').then((data)=>{
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 获取处置流程信息
 */
export const queryFmshrz =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryFmshrz', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}




