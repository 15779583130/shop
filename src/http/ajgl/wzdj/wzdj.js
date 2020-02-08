// import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询返回列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const queryTable =(params)=> {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("cbdj/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 删除案件信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const delAj = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'delAj', params, true, '').then((data)=>{
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
 * 获取新增案件初始化数据信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getInitAjxxNewBh = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'getInitAjxxNewBh', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 保存、更新案件信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveOrupdate = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'saveOrupdate', params, true, '').then((data)=>{
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
 * 获取案件信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const get = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'get', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 案件已关联的物证列表
 * @param params
 * @returns {Promise<unknown>}
 */
export const creteWzxxTree = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'creteWzxxTree', params, true, '').then((data)=>{
      let parentArr = data.getBody().getValueofBody().body.default.wzxxs.filter(l => l.pid == "1");
      var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.wzxxs, parentArr);

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
 * 获取物证分类树
 * @param params
 * @returns {Promise<unknown>}
 */
export const wzfltreetable = (params) => {
  return new Promise((resolve,reject)=>{
      http.post('/service/jczl/wzfls/wzflsService', 'wzflTree', params, true, '').then((data)=>{
      let parentArr = data.getBody().getValueofBody().body.default.wzfllist.filter(l => l.pid == "");
      var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.wzfllist);
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
 * 递归方法组装树型数据
 * @author  liuyuan
 * @modify  1.00  2019/11/15   liuyuan   无     新建
 */
function getTreeData(list, dataArr) {
  dataArr.map((pNode, i) => {
    let childObj = [];
    list.map((cNode, j) => {
      if (pNode.id === cNode.pid) {
        childObj.push(cNode);
      }
    });
    if(childObj.length>1){
      pNode.child = childObj;
    }
    if (childObj.length > 0) {
      getTreeData(list, childObj);
    };
  })
  return dataArr;
}

/**
 * 获取物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWzxxByid = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'getWzxxByid', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


/**
 * 新增物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getInitWzxx = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'getInitWzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 保存物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveOrUpdateWz = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'saveOrUpdateWz', params, true, '').then((data)=>{
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
 * 删除物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const wzTreedel = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'wzTreedel', params, true, '').then((data)=>{
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
 * 获取个性化信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getWzgxhInfo = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'getWzgxhInfo', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 保存、更新个性化物证信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const submitWzgxh = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajwzdj/ajwzdjService', 'submitWzgxh', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}
