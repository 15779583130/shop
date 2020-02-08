import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'



export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/ajdjgl/wzzhgl/wzzhglService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}


export const queryTable2 =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/ajdjgl/wzzhgl/wzzhglService', 'onShowWzlog', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}



export const exportExcl = (params) => {
  debugger
  return new Promise((resolve, reject) => {
    debugger
    http.post('/service/ajdjgl/wzzhgl/wzzhglService', 'onDcexcel', params, true, '').then((data) => {
      debugger
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj);
    });
  })
}
