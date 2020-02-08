import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询列表
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取处置流程信息
 */
export const queryCzlc =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'queryCzlc', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 删除处置申请
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'del', params, true, '').then((data)=>{
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
    http.post('/service/czgl/zkcz/zkczService', 'getCzdjAndAjxxById', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 已生成的任务清单
 */
export const queryYwcbForBxqd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'queryYwcbForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取物证明细
 */
export const queryWzmx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'queryWzmx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 进入处置申请页面获取备选清单
 */
export const queryWzxxForBxqd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'queryWzxxForBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 择物证后执行生成任务清单
 */
export const saveOrUpdateYwcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/czgl/zkcz/zkczService', 'saveOrUpdateYwcb', params, true, '').then((data)=>{
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
    http.post('/service/czgl/zkcz/zkczService', 'delWzmx', params, true, '').then((data)=>{
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
    http.post('/service/czgl/zkcz/zkczService', 'delYwcb', params, true, '').then((data)=>{
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
    http.post('/service/czgl/zkcz/zkczService', 'submitCzdj', params, true, '').then((data)=>{
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
    http.post('/service/czgl/zkcz/zkczService', 'submitCzsqForManager', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
