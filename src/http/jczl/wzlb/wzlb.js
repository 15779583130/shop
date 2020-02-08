import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 物证
 * @author  liuyuan
 * @modify  1.00  2019/11/22   liuyuan   无     新建
 */

//单行删除
export const singleDelete = (params) => {
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data=EnvelopUtil.convertXmlFileToXml('sys/user/data/delete.xml','none');
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    })
  }else if(global.reqService=="remote" ||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/jczl/wzfls/wzflsService', 'del', params, true, '').then((data)=>{
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
  }
}

//已经点击左侧
export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/jczl/wzfls/wzflsService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}
//未点击左侧
export const queryTableALL =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/jczl/wzfls/wzflsService', 'queryByBean', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}




/**
 * 查询左侧存放位置树
 * @author  liuyuan
 * @modify  1.00  2019/11/22   liuyuan   无     新建
 */
export const queryTree = (params) => {
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTree.xml", 'none')
      let parentArr = data.getBody().getValueofBody().body.default.depts.filter(l => l.pid == "");
      var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.depts, parentArr);
      // 查询树
      let findTreeData = {
        "success":data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(findTreeData);
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/jczl/wzfls/wzflsService', 'wzflTreeTableByManager', params, true, '').then((data)=>{
        // let parentArr = data.getBody().getValueofBody().body.default.cfwzs.filter(l => l.pid == "0");
        // var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.cfwzs, parentArr);
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

//添加
export const getMaxOrder = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jczl/wzfls/wzflsService', 'getMaxOrder', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

export const get = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jczl/wzfls/wzflsService', 'getBeanByid', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}
//添加或者修改
export const saveOrupdate = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jczl/wzfls/wzflsService', 'saveOrupdate', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
      }
      resolve(obj);
    });
  })
}

//修改状态
export const updateZt = (params) => {
  return new Promise((resolve,reject)=>{
    http.post('/service/jczl/wzfls/wzflsService', 'changeStatus', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": null
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
