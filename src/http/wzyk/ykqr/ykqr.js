import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询移送申请列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}


/**
 * 查询物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const querywzxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'querywzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 编辑获取主表信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const infoEdit = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'infoEdit', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 处置权移送确认详细页面下部物证信息列表查询
 * @param params
 * @returns {Promise<unknown>}
 */
export const querywzxxDetail =(params)=>{
  return new Promise((resolve,reject)=>{7
    http.post('/service/wzykgl/ykqr/ykqrService', 'querywzxxDetail', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}
/**
 * 接收处置权送
 * @param params
 * @returns {Promise<unknown>}
 */
export const jieshouYsxxcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'jieshouYwcb', params, true, '').then((data)=>{
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
 * 退回处置权移送
 * @param params
 * @returns {Promise<unknown>}
 */
export const tuihuiYsxxcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'tuihuiYwcb', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

export const selectCfck = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzykgl/yksq/yksqService', 'selectCfckList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());

    });
  })
}

export const getWljj =(params)=>{
  return new Promise((resolve,reject)=>{7
    http.post('/service/wzykgl/ykqr/ykqrService', 'getWljj', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const getWljjJjrList =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/ykqr/ykqrService', 'getWljjJjrList', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const getSjWljj =(params)=>{
  return new Promise((resolve,reject)=>{7
    http.post('/service/wzykgl/ykqr/ykqrService', 'getSjWljj', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}



export const getWljjSjrList =(params)=>{
  return new Promise((resolve,reject)=>{7
    http.post('/service/wzykgl/ykqr/ykqrService', 'getWljjSjrList', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


