/**
 * @author 董珊珊
 * @create date: 2019/12/30
 * @version:
 * @modify	 	2019/12/30	董珊珊		无		新建
 */
import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'


/**
 * 查询左侧组的树
 * @author  dongshanshan
 * @modify  1.00  2019/12/30   dongshanshan   无     新建
 */
export const queryTree = (params) => {
  var temp = false;
  if(global.reqService=="local"&&temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("sys/menu/data/queryTree.xml", 'none')
      let parentArr = data.getBody().getValueofBody().body.default.menus.filter(l => l.pid == "");
      var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.menus, parentArr);
      // 查询树
      let findTreeData = {
        "success":data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(findTreeData);
    })
  }else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow', 'flowtreetable', params, true, '').then((data)=>{
        var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.flows);
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
 * @author  dongshanshan
 * @modify  1.00  2019/12/30   dongshanshan   无     新建
 */
function getTreeData(list, dataArr) {
  dataArr.map((pNode, i) => {
    let childObj = [];
    list.map((cNode, j) => {
      if (pNode.id === cNode.pid) {
        childObj.push(cNode);
      }
    });
    pNode.child = childObj;
    if (childObj.length > 0) {
      getTreeData(list, childObj);
    };
  })
  return dataArr;
}

/**
 * 数组转tree
 * @author  dongshanshan
 * @modify  1.00  2019/12/30   dongshanshan   无     新建
 */
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
 * 拷贝流程
 * @author  dongshanshan
 * @modify  1.00  2019/01/02   dongshanshan   无     新建
 */
export const copyFlow =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/xtgl/flow', 'copyFlow', params, true, '').then((data)=>{
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