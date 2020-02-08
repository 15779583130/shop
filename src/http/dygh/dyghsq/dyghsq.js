import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 *查询调用申请列表
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
      http.post('/service/ckgl/dysq/dysqService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

/**
 *查询案件列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryAjxxTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("cbdj/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/common/ajxx/ajxxSelectService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

/**
 * 获取主表详情
 * @param params
 * @returns {Promise<unknown>}
 */
export const get = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'getDysqAndAjxxById', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询从表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'queryYwcbForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询物证明细
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWzmx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'queryWzmx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 删除申请表
 * @param params
 * @returns {Promise<unknown>}
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'del', params, true, '').then((data)=>{
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
 * 获取在库清单列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWzxxForBxqd = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'queryWzxxForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 生成清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveOrUpdateYwcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'saveOrUpdateYwcb', params, true, '').then((data)=>{
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
 * 获取待调用清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcbForBxqd = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'queryYwcbForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 删除业务从表
 * @param params
 * @returns {Promise<unknown>}
 */
export const delDycb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'delDycb', params, true, '').then((data)=>{
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
 * 删除物证明细
 * @param params
 * @returns {Promise<unknown>}
 */
export const delWzmx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'delWzmx', params, true, '').then((data)=>{
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
 * 提交申请
 * @param params
 * @returns {Promise<unknown>}
 */
export const submitDysq = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'submitDysq', params, true, '').then((data)=>{
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
 * 导出调用申请
 */
export const exportDysq = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'exportDysq', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj);
    });
  })
}

/**
 * 物流信息
 */
export const getWljj = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWljj', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流信息-人员信息
 */
export const getWljjSjrList = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWljjSjrList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
export const getWljjUserList = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWljjUserList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
/**
 * 获取委托人
 */
export const selectUserQd = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'selectUserQd', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 调用归还-物流信息
 */
export const getWljjGh = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWljjGh', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
/**
 * 调用归还-人员信息
 */
export const getWljjSjrListGh = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWljjSjrListGh', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 保存物证归还
 */
export const saveGhsqWzxx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ckgl/dysq/dysqService', 'saveGhsqWzxx', params, true, '').then((data)=>{
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
 * 返回物流派单交接信息
 */
export const getWlpdInfo = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWlpdInfo', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取同行人员
 */
export const getWlpdTxryxx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'getWlpdTxryxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取物证列表
 */
export const queryWlpdJjWzxx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'queryWlpdJjWzxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}


/**
 * 物流交接word文档导出(调用)
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportWlpdWordDy = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'exportWlpdWordDy', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

/**
 * 物流交接word文档导出(归还)
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportWlpdWordGh = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'exportWlpdWord', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}


/**
 * 物流派单交接确认
 * @param params
 * @returns {Promise<unknown>}
 */
export const wlpdHandPver = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'wlpdHandPver', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

/**
 * 派单撤销发起功能(调用)
 * @param params
 * @returns {Promise<unknown>}
 */
export const cancelPdDy = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'cancelPdDy', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
/**
 * 派单撤销发起功能(归还)
 * @param params
 * @returns {Promise<unknown>}
 */
export const cancelPd = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'cancelPd', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

/**
 * 派单强制撤销功能(调用)
 * @param params
 * @returns {Promise<unknown>}
 */
export const qzCancelPdDy = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'qzCancelPdDy', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

/**
 * 派单强制撤销功能(归还)
 * @param params
 * @returns {Promise<unknown>}
 */
export const qzCancelPd = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'qzCancelPd', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}



/**
 * 物流交接word文档导出
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportWlpdWord = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/ckgl/dysq/dysqService', 'exportWlpdWord', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": data.getHeader().getNode().getNodeItem('pdfurl')
      }
      resolve(obj);
    });
  })
}
