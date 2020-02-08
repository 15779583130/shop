import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 获取主任务流程列表
 * @param params
 * @returns {Promise<unknown>}
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
      http.post('/service/rwlcgl/rwlcgl/rwlcService', 'queryRwzb', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
/**
 * 获取详细任务流程列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryDetail =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/rwlcgl/rwlcgl/rwlcService', 'queryZrwlc', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 物流反馈-派单申请-申请信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdsqSqxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdsqSqxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-派单申请-物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdsqWzxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdsqWzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-派单反馈-信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdfkxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdfkxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-派单反馈-同行人员信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdfkTxryxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdfkTxryxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-派单回传-仓储
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdhcCc =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdhcCc', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-派单回传-仓储物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkPdhcCcWzxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkPdhcCcWzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 物流反馈-物流实时定位
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWlfkSsdw =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlfkSsdw', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取物流信息
 */
export const queryWlxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/ywxxgl/common/wlpd/wlpdssdwservice', 'queryWlxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}
