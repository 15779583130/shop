import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'


export const queryTable = (params) => {
  // var temp = false;
  // if (global.reqService == "local" && temp) {
  //   return new Promise((resolve, reject) => {
  //     var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
  //     resolve(data.getBody().getValueofBody());
  //   })
  // } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/xtgl/dept', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  // }

}
export const queryTableBypid= (params) => {
  // var temp = false;
  // if (global.reqService == "local" && temp) {
  //   return new Promise((resolve, reject) => {
  //     var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
  //     resolve(data.getBody().getValueofBody());
  //   })
  // } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/xtgl/dept', 'get', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  // }

}

export const update= (params) => {
  // var temp = false;
  // if (global.reqService == "local" && temp) {
  //   return new Promise((resolve, reject) => {
  //     var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
  //     resolve(data.getBody().getValueofBody());
  //   })
  // } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/xtgl/dept', 'update', params, true, '').then((data) => {
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody().body.default
        }
        resolve(obj);
      });
    })
  // }

}
export const get= (params) => {
  // var temp = false;
  // if (global.reqService == "local" && temp) {
  //   return new Promise((resolve, reject) => {
  //     var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
  //     resolve(data.getBody().getValueofBody());
  //   })
  // } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/xtgl/dept', 'get', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  // }
}
export const save= (params) => {

    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/dept', 'save', params, true, '').then((data)=>{
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": data.getBody().getValueofBody().body.default
        }
        resolve(obj);
      });
    })
}



/**
 * 查询左侧存放位置树
 * @author  liuyuan
 * @modify  1.00  2019/11/22   liuyuan   无     新建
 */
export const queryTree = (params) => {
  // var temp = false;
  // if(global.reqService=="local"&&temp){
  //   return new Promise((resolve,reject)=>{
  //     var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/bmwzc/data/queryTree.xml", 'none')
  //     let parentArr = data.getBody().getValueofBody().body.default.depts.filter(l => l.pid == "");
  //     var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.depts, parentArr);
  //     // 查询树
  //     let findTreeData = {
  //       "success":data.getHeader().getNode().getNodeItem('success'),
  //       "message": data.getHeader().getNode().getNodeItem('message'),
  //       "data": treeDataSource
  //     }
  //     resolve(findTreeData);
  //   })
  // }
  // else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/dept', 'depttreetable', params, true, '').then((data)=>{
        var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.depts);
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": treeDataSource
        }
        resolve(obj);
      });
    })
  // }
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
    pNode.child = childObj;
    if (childObj.length > 0) {
      getTreeData(list, childObj);
    };
  })
  return dataArr;
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

export const gsrTree =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote" || !temp){
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
}


//单行删除
export const handleDelete = (params) => {
  // var temp = false;
  // if (global.reqService == "local" && temp) {
  //   return new Promise((resolve, reject) => {
  //     var data = EnvelopUtil.convertXmlFileToXml('sys/user/data/delete.xml', 'none');
  //     var obj = {
  //       "success": data.getHeader().getNode().getNodeItem('success'),
  //       "message": data.getHeader().getNode().getNodeItem('message'),
  //       "data": null
  //     }
  //     resolve(obj);
  //   })
  // } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/xtgl/dept', 'del', params, true, '').then((data) => {
        var obj = {
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message": data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
  // }
}
