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
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yksq/data/queryTable.xml", 'none')
        resolve(data.getBody().getValueofBody());
      })
    }else if(global.reqService=="remote" || !temp){
      return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yksq/yksqService', 'query', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }
  /**
   * 查询案件信息
   * @param {*} params
   */
  export const queryAjxxTable =(params)=>{
    var temp = false;
    if(temp){//global.reqService=="local" && temp
      return new Promise((resolve,reject)=>{
        var data = EnvelopUtil.convertXmlFileToXml("wzyk/yksq/data/queryAjxxTable.xml", 'none')
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
   * 添加移库申请信息
   * @param {*} params
   */
  export const addYksq =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/wzykgl/yksq/yksqService', 'addYksqxx', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })

  }
   /**
   * 编辑移库申请信息
   * @param {*} params
   */
  export const editYksq =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/wzykgl/yksq/yksqService', 'editYksqxx', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })

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
        http.post('/service/wzykgl/yksq/yksqService', 'editYksqxx', params, true, '').then((data)=>{
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
        http.post('/service/wzykgl/yksq/yksqService', 'queryYxYwcb', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
    }

  }
  /**
   * 备选清单查询
   * @param {*} params
   */
  export const queryBxqd =(params)=>{
   return new Promise((resolve,reject)=>{
     http.post('/service/wzykgl/yksq/yksqService', 'queryWzxxBxqd', params, true, '').then((data)=>{
       resolve(data.getBody().getValueofBody());
     });
   })
  }
  /**
   * 已选清单查询
   * @param {*} params
   */
  export const queryYxYwcb =(params)=>{
   return new Promise((resolve,reject)=>{
     http.post('/service/wzykgl/yksq/yksqService', 'queryYxYwcb', params, true, '').then((data)=>{
       resolve(data.getBody().getValueofBody());
     });
   })

  }
  /**
   * 查询出移库已选清单物证明细
   */
  export const queryYxYswz =(params)=>{
  return new Promise((resolve,reject)=>{
        http.post('/service/wzykgl/yksq/yksqService', 'queryYxYswz', params, true, '').then((data)=>{
          resolve(data.getBody().getValueofBody());
        });
      })
  }
  //单行删除
export const handleDelete = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/yksq/yksqService', 'del', params, true, '').then((data)=>{
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
 * 保存勾选的物证
 */
export const saveWzxxBxqd = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/yksq/yksqService', 'saveWzxxBxqd', params, true, '').then((data)=>{
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
 * 获取仓库信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const selectCfck = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzykgl/yksq/yksqService', 'selectCfckList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());

    });
  })
}

/**
 * 删除从表的数据
 */
export const delywcb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/yksq/yksqService', 'delywcb', params, true, '').then((data)=>{
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
 * 删除已经选择的物证清单
 */
export const delwzxx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/yksq/yksqService', 'delwzxx', params, true, '').then((data)=>{
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
 */
export const saveInfo = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzykgl/yksq/yksqService', 'saveInfo', params, true, '').then((data)=>{
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
 * 获取弹窗的省份地址
 */
  export const getWljj =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/wzykgl/yksq/yksqService', 'getWljj', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

/**
 * 获取寄件人信息
 */
  export const getWljjJjrList =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/wzykgl/yksq/yksqService', 'getWljjJjrList', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

/**
 * 获取收件人信息
 */
  export const getWljjSjrList =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/wzykgl/yksq/yksqService', 'getWljjSjrList', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
