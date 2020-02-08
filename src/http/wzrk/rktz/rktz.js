import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/*
 * 入库台账
 * @author  liuyuan
 * @modify  1.00  2019/11/27   liuyuan   无     新建
 */
export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/wzrkgl/rktz/rktzService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 导出入库台账
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportRktz = (params) => {
  debugger
  return new Promise((resolve, reject) => {
    debugger
    http.post('/service/wzrkgl/rktz/rktzService', 'exportRktz', params, true, '').then((data) => {
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
