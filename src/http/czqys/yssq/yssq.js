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
    http.post('/service/wzysgl/yssq/yssqService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 删除移送申请数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const del = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'del', params, true, '').then((data)=>{
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
 * 新增移送申请入口
 * @param params
 * @returns {Promise<unknown>}
 */
export const addYssqxx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'addYssqxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 编辑移送申请入库
 * @param params
 * @returns {Promise<unknown>}
 */
export const editYssqxx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'editYssqxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 查询出可移送的物证备选清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryWzxxBxqd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'queryWzxxBxqd', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/***
 * 获取部门树
 * @param params
 * @returns {Promise<unknown>}
 */
export const getDeptTree =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/common/depttree/depttreeService', 'getAllDept', params, true, '').then((data)=>{
      // var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.deptstr);
      var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.depts);
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(obj);
    });
  })
}


// 数组转tree
function composeTree(list = []) {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    const parent = map[item.pid]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 移送从表数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYxYsxxcb =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'queryYxYsxxcb', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 删除已经选择的物证清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const delyscb = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'delyscb', params, true, '').then((data)=>{
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
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveWzxxBxqd = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'saveWzxxBxqd', params, true, '').then((data)=>{
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
 * 查询出已经选择的移送物证明细清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryYxYswz =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'queryYxYswz', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 删除已经选择的物证清单
 * @param params
 * @returns {Promise<unknown>}
 */
export const delyswz = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'delyswz', params, true, '').then((data)=>{
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
export const saveInfo = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/yssq/yssqService', 'saveInfo', params, true, '').then((data)=>{
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
 * 导出入库台账信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportRktzCheck = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/wzrkgl/rktz/rktzService', 'exportRktzCheck', params, true, '').then((data)=>{
      // var obj ={
      //   "success": data.getHeader().getNode().getNodeItem('success'),
      //   "message":  data.getHeader().getNode().getNodeItem('message'),
      //   "data": null
      // }
      debugger
      resolve(data.getBody().getValueofBody());

    });
  })
}
