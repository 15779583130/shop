import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/*
 * 入库申请
 * @author  liuyuan
 * @modify  1.00  2019/11/27   liuyuan   无     新建
 */

export const queryTable = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/wzrkgl/rksq/rksqService', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

//单行删除
export const handleDelete = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml('sys/user/data/delete.xml', 'none');
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/wzrkgl/rksq/rksqService', 'delRksqYwzb', params, true, '').then((data) => {
        var obj = {
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message": data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
  }
}


/**
 *查询案件列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryAjxxTable = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("cbdj/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/common/ajxx/ajxxSelectService', 'query', params, true, '').then((data) => {

        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

/**
 * 查看入库申请
 * @param params
 * @returns {Promise<unknown>}
 */
export const lookRksqxxYwzb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'lookRksqxxYwzb', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询业务从表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'queryYwcb', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询物证明细
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcbWzmx = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'queryYwcbWzmx', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取主表
 * @param params
 * @returns {Promise<unknown>}
 */
export const addRksqxxRwzb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'addRksqxxRwzb', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 获取未入库物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWrkwzYwzb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'queryWrkwzYwzb', params, true, '').then((data) => {
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
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'saveOrUpdateYwcb', params, true, '').then((data) => {
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
 * 查询已入库清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYrkwzYwzb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'queryYrkwzYwzb', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询已入库物证明细
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYwcbYrkwz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'queryYwcbYrkwz', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());
    });
  })
}
/**
 * 提交入库申请
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveOrUpdateYwzb = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'saveOrUpdateYwzb', params, true, '').then((data) => {
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
 * 删除待入库清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const batchDeleteYrkwz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'batchDeleteYrkwz', params, true, '').then((data) => {
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
 * 删除待入库清单物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const deleteYrkwz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'deleteYrkwz', params, true, '').then((data) => {
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
 * 获取仓库信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const selectCfck = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'selectCfckList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());

    });
  })
}
/**
 * 返回收件人信息
 * @param params
 */
export const getWljjSjrList = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzrkgl/rksq/rksqService', 'getWljjSjrList', params, true, '').then((data) => {
      resolve(data.getBody().getValueofBody());

    });
  })
}


/**
 * 获取物流寄件信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWljj = (params) => {
  return new Promise((resolve, reject) => {

    http.post('/service/wzrkgl/rksq/rksqService', 'getWljj', params, true, '').then((data) => {

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

    http.post('/service/wzrkgl/rksq/rksqService', 'getWlpdInfo', params, true, '').then((data) => {

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
    http.post('/service/wzrkgl/rksq/rksqService', 'getWlpdTxryxx', params, true, '').then((data) => {
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
    http.post('/service/wzrkgl/rksq/rksqService', 'queryWlpdJjWzxx', params, true, '').then((data) => {
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
    http.post('/service/wzrkgl/rksq/rksqService', 'wlpdHandPver', params, true, '').then((data) => {
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
    http.post('/service/wzrkgl/rksq/rksqService', 'cancelPd', params, true, '').then((data) => {
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
    http.post('/service/wzrkgl/rksq/rksqService', 'qzCancelPd', params, true, '').then((data) => {
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
        "data": data.getHeader().getNode().getNodeItem('pdfurl')
      }
      resolve(obj);
    });
  })
}


