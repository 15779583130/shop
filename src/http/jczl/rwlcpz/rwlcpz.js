/**
 * @author 董珊珊
 * @create date: 2019/01/03
 * @version:
 * @modify	 	2019/01/03	董珊珊		无		新建
 */
import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 查询左侧组的树
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const queryTree = (params) => {
  var temp = false;
  if(global.reqService=="local"&&temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("jczl/rwlcpz/data/queryTree.xml", 'none')
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
      http.post('service/jczl/lcjd/lcjdService', 'lcjdTreeTableByManager', params, true, '').then((data)=>{
        var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.lcjdlist);
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
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
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
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
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
 * 根据点击左侧节点获取任务流程首页右侧列表
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const query =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 获取任务流程首页右侧查询列表（未选中左侧节点）
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const queryByBean =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'queryByBean', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}

/**
 * 新增节点页面返回信息
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const getMaxOrder =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'getMaxOrder', params, true, '').then((data)=>{

        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody()
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 编辑节点页面返回信息
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const getBeanByid =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'getBeanByid', params, true, '').then((data)=>{

        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody()
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 保存节点
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const saveOrupdate =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'saveOrupdate', params, true, '').then((data)=>{
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

/**
 * 删除任务流程
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const del =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'del', params, true, '').then((data)=>{
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

/**
 * 任务流程树弹框JSON
 * @author  dongshanshan
 * @modify  1.00  2019/01/03   dongshanshan   无     新建
 */
export const wzfltreetable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryFlowNode.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('service/jczl/lcjd/lcjdService', 'wzfltreetable', params, true, '').then((data)=>{
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
