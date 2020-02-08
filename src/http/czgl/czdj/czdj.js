import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询列表
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取处置流程信息
 */
export const queryCzlc =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryCzlc', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 删除处置申请
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'del', params, true, '').then((data)=>{
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
 * 获取处置申请信息
 */
export const getCzdjAndAjxxById =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'getCzdjAndAjxxById', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 已生成的任务清单
 */
export const queryYwcbForBxqd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryYwcbForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取物证明细
 */
export const queryWzmx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryWzmx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 进入处置申请页面获取备选清单
 */
export const queryWzxxForBxqd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'queryWzxxForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 择物证后执行生成任务清单
 */
export const saveOrUpdateYwcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'saveOrUpdateYwcb', params, true, '').then((data)=>{
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
 */
export const delWzmx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'delWzmx', params, true, '').then((data)=>{
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
 * 删除申请从表
 */
export const delDycb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'delDycb', params, true, '').then((data)=>{
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
 * 提交处置申请
 */
export const submitCzdj = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'submitCzdj', params, true, '').then((data)=>{
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
 * 提交处置申请(外层)
 */
export const submitCzsqForManager = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/czdj/czdjService', 'submitCzsqForManager', params, true, '').then((data)=>{
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
 * 物流信息
 */
export const getWljj = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'getWljj', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流信息-人员信息
 */
export const getWljjSjrList = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'getWljjSjrList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
export const getWljjUserList = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'getWljjUserList', params, true, '').then((data) => {
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
 * 返回物流派单交接信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlpdInfo = (params) => {
  return new Promise((resolve, reject) => {

    http.post('/service/czgl/czdj/czdjService', 'getWlpdInfo', params, true, '').then((data) => {

      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 *查询同行人员信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlpdTxryxx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'getWlpdTxryxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
/**
 * 查询物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWlpdJjWzxx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'queryWlpdJjWzxx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
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
    http.post('/service/czgl/czdj/czdjService', 'wlpdHandPver', params, true, '').then((data) => {
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
 * 派单撤销发起功能
 * @param params
 * @returns {Promise<unknown>}
 */
export const cancelPd = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'cancelPd', params, true, '').then((data) => {
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
 * 派单强制撤销功能
 * @param params
 * @returns {Promise<unknown>}
 */
export const qzCancelPd = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/czgl/czdj/czdjService', 'qzCancelPd', params, true, '').then((data) => {
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
    http.post('/service/wzrkgl/rksq/rksqService', 'exportWlpdWord', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
