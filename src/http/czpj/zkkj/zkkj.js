import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 暂扣开具
 * @author  liuyuan
 * @modify  1.00  2019/12/20   liuyuan   无     新建
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
      http.post('/service/czpj/zkkj/zkkjService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const showPjxx =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czpj/zkkj/zkkjService', 'showPjxx', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}




export const checkPj = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czpj/zkkj/zkkjService', 'checkPj', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data":null
      }
      resolve(obj);
    });
  })
}

export const submitZkpj = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czpj/zkkj/zkkjService', 'submitZkpj', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data":null
      }
      resolve(obj);
    });
  })
}

export const queryDataForm =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czpj/zkkj/zkkjService', 'getPjzbById', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const querywzTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czpj/zkkj/zkkjService', 'queryClmxForBxqd', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const querywzTable2 =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czpj/zkkj/zkkjService', 'queryWzxxForBxqd', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const querywzTable3 =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/czpj/zkkj/zkkjService', 'queryClmxForBxqd', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

export const saveOrUpdateClmx = (params) => {
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
      http.post('/service/czpj/zkkj/zkkjService', 'saveOrUpdateClmx', params, true, '').then((data)=>{
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

// delClmx
export const delClmx = (params) => {
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
      http.post('/service/czpj/zkkj/zkkjService', 'delClmx', params, true, '').then((data)=>{
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


export const submitPjzb = (params) => {
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
      http.post('/service/czpj/zkkj/zkkjService', 'submitPjzb', params, true, '').then((data)=>{
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

export const deletePj = (params) => {
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
      http.post('/service/czpj/zkkj/zkkjService', 'del', params, true, '').then((data)=>{
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


