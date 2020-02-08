import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'


//获取全局参数树
export const queryTree =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'paramtreetable', params, true, '').then((data)=>{
      var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.params);
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



//查询全局参数列表
export const query =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}

//保存全局参数
export const save =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'save', params, true, '').then((data)=>{
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


//删除参数
export const del =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'del', params, true, '').then((data)=>{
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



//修改全局参数
export const update =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'update', params, true, '').then((data)=>{
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


//获得全局参数
export const get =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/param', 'get', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
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
