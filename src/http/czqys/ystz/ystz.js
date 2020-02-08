import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询列表数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/wzysgl/ystz/ystzService', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })

}

/**
 * 导出移送台账
 * @param params
 * @returns {Promise<unknown>}
 */
export const exportYstz = (params) => {
  return new Promise((resolve, reject) => {
    http.post('/service/wzysgl/ystz/ystzService', 'exportYstz', params, true, '').then((data) => {
      var obj = {
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getNode().getNodeItem('fileurl')
      }
      resolve(obj);
    });
  })
}


/***
 * 获取部门树(所有)
 * @param params
 * @returns {Promise<unknown>}
 */
export const getAllDept =(params)=>{
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


/**
 * 获取部门树(有权限)
 */
export const getDeptByRole =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/common/depttree/depttreeService', 'getDeptByRole', params, true, '').then((data)=>{
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
