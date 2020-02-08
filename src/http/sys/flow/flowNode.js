/**
 * @author 董珊珊
 * @create date: 2019/12/30
 * @version:
 * @modify	 	2019/12/30	董珊珊		无		新建
 */
import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询节点列表
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 获取节点信息
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const get =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'get', params, true, '').then((data)=>{

        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody()
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 保存节点信息
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const save =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'save', params, true, '').then((data)=>{
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
 * 更新节点信息
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const update =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'update', params, true, '').then((data)=>{
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
 * 删除节点信息
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const del =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'del', params, true, '').then((data)=>{
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
 * 获取排序号
 * @author  dongshanshan
 * @modify  1.00  2019/12/31   dongshanshan   无     新建
 */
export const getOrderno =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'getMaxOrderno', params, true, '').then((data)=>{

        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody()
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 查询节点
 * @author  dongshanshan
 * @modify  1.00  2019/01/02   dongshanshan   无     新建
 */
export const query4code=(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow/flownode', 'query4code', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

// /**
//  * 查询发送节点
//  * @author  dongshanshan
//  * @modify  1.00  2019/01/02   dongshanshan   无     新建
//  */
// export const query4SendNode =(params)=>{
//   var temp = false;
//   if(global.reqService=="local" && temp){
//     return new Promise((resolve,reject)=>{
//       var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
//       resolve(data.getBody().getValueofBody());
//     })
//   }else if(global.reqService=="remote" || !temp){
//     return new Promise((resolve,reject)=>{
//       http.post('service/xtgl/flow/flownode', 'query4SendNode', params, true, '').then((data)=>{
//         resolve(data.getBody().getValueofBody());
//       });
//     })
//   }
// }

// /**
//  * 查询接收节点
//  * @author  dongshanshan
//  * @modify  1.00  2019/01/02   dongshanshan   无     新建
//  */
// export const query4ReceiveNode =(params)=>{
//   var temp = false;
//   if(global.reqService=="local" && temp){
//     return new Promise((resolve,reject)=>{
//       var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
//       resolve(data.getBody().getValueofBody());
//     })
//   }else if(global.reqService=="remote" || !temp){
//     return new Promise((resolve,reject)=>{
//       http.post('service/xtgl/flow/flownode', 'query4ReceiveNode', params, true, '').then((data)=>{
//         resolve(data.getBody().getValueofBody());
//       });
//     })
//   }
// }
