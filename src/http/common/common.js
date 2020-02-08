// import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

export const demo1 =(params)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/jcsjgl/cfck/cfckService', 'savePowerInfo', params, true, '').then((data)=>{
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": null
        }
        resolve(obj);
      });
    })
}

export const demo2 =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/cfck/cfckService', 'savePowerInfo', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//获取案件信息
export const getAjxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajzhcx/ajzhcxService', 'getAjxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//获取证物图片
export const getWztp =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/file', 'get', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//获取物证流程
export const getWzlc =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/qaylgl/wzxxlc/wzxxlcService', 'editWzxx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}



//获取承办登记信息
export const getCbdjxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/ajdjgl/ajzhcx/ajzhcxService', 'getCbdjList', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//查询案件物证信息
export const getAjwzxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/qaylgl/qaylajxx/qaylajxxService', 'queryWzxxList', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


//查询案件物证信息
export const getAjwzPicxx =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/qaylgl/qaylajxx/qaylajxxService', 'queryWzxxList', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}


//查询案件物证信息
export const getFileList =(params)=>{
  return new Promise((resolve, reject)=>{
    http.post('/service/file', 'getFilesForUrl', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//查询部门
export const getDept =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/qaylgl/qaylajxx/qaylajxxService', 'getXtDept', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

//弹窗选择人员
export const queryDialogUser =(params)=>{
  return new Promise((resolve,reject)=>{
    return new Promise((resolve,reject)=>{
      http.post('/service/common/userlist/userlistService', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  })
}

//获取存放位置
export const queryCfwz =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/pzgl/cfwz', 'cfwztreetable', params, true, '').then((data)=>{
      var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.cfwzs);
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(obj);
    });
  })
}

//获取存放位置2,只能选择叶子节点
export const queryCfwz2 =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/pzgl/cfwz', 'cfwztreetable', params, true, '').then((data)=>{
      var treeDataSource = composeTree2(data.getBody().getValueofBody().body.default.cfwzs);
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

// 数组转tree,只能选择叶子节点
function composeTree2(list = []) {
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
      parent.disabled=true;
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export const changePwd =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/xtgl/user', 'changepwd', params, true, '').then((data)=>{
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": data.getBody().getValueofBody()
      }
      resolve(obj);
    });
  })
}





