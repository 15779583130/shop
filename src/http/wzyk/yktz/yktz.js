import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'
/**
 * 查询gridTable数据
 * @param {*} params
 */
export const queryTable =(params)=>{
    var temp = false;
    if(global.reqService=="local" && temp){//
      return new Promise((resolve,reject)=>{
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
        resolve(data.getBody().getValueofBody());
      })
    }else if(global.reqService=="remote" || !temp){
      return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yktz/yktzService', 'query', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }

  export const queryDetail =(params)=>{
    var temp = false;
    if(global.reqService=="local" && temp){//
      return new Promise((resolve,reject)=>{
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
        resolve(data.getBody().getValueofBody());
      })
    }else if(global.reqService=="remote" || !temp){
      return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yktz/yktzService', 'editYksqxx', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }
  export const querySubDetail =(params)=>{
    var temp = false;
    if(global.reqService=="local" && temp){//
      return new Promise((resolve,reject)=>{
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
        resolve(data.getBody().getValueofBody());
      })
    }else if(global.reqService=="remote" || !temp){
      return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yktz/yktzService', 'queryYxYwcb', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }
  export const querySubTale =(params)=>{
    var temp = false;
    if(global.reqService=="local" && temp){//
      return new Promise((resolve,reject)=>{
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
        resolve(data.getBody().getValueofBody());
      })
    }else if(global.reqService=="remote" || !temp){
      return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yktz/yktzService', 'queryYxYswz', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }

  /**
   * 导出台账文件
   */
  export const exportYktz = (params) => {
    return new Promise((resolve, reject) => {
      http.post('/service/wzykgl/yktz/yktzService', 'exportYktz', params, true, '').then((data) => {
        var obj = {
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message": data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getNode().getNodeItem('fileurl')
        }
        resolve(obj);
      });
    })
  }
