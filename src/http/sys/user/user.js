import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

// 分页查询
export const findPage = (params) => {
  if (global.reqService == "local") {
    var data = EnvelopUtil.convertXmlFileToXml('sys/user/data/query.xml', 'none');
    let pagenum = 1
    let pagesize = 10
    if(params !== null && params.pagenum!=="undefined") {
      pagenum = params.pagenum
    }
    if(params !== null && params.pagesize!=="undefined") {
      pagesize = params.pagesize
    }
    let findPageData = {};
    findPageData.pagenum = pagenum
    findPageData.pagesize = pagesize
    findPageData.totalSize = Number(data.getBody().getNode().getNodeItem('count'));
    var content = data.getBody().getValueofBody().body.default.dataset || [];
    //数据筛选
    // if (params !== null) {
    //   if (params.login_name !== "" && params.login_name !== "undefined") {
    //     content = content.filter(item => item.login_name.match(params.login_name));
    //   }
    //   if (params.user_name !== "" && params.user_name !== "undefined") {
    //     content = content.filter(item => item.user_name.match(params.user_name));
    //   }
    //   if (params.dept_id !== "" && params.dept_id !== "undefined") {
    //     content = content.filter(item => item.dept_id == params.dept_id);
    //   }
    // }
    // content = content.filter(item=>item.login_name.match('test')).filter(item=>item.user_name.match('test')).filter(item=>item.dept_id=='46AAA7F8A9FECF51711A38C0A382E5BA');
    findPageData.content = content;
    return new Promise((resolve, reject) => {
      resolve(findPageData);
    })
  } else if (global.reqService == "remote") {
    return new Promise((resolve, reject) => {
      let pagenum = 1;
      let pagesize = 8;
      if(params !== null && params.pagenum!=="undefined") {
        pagenum = params.pagenum
      }
      if(params !== null && params.pagesize!=="undefined") {
        pagesize = params.pagesize
      }
      http.post('/service/xtgl/user', 'query', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.dataset
        }
        resolve(findPageData);
      });
    })
  }
}
/**
 * 查询用户列表
 * 姚昱丹    2019 12/26
 */

export const queryTable =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'query', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }

}

/**
 * 查询部门列表树
 * 姚昱丹    2019 12/26
 */

export const queryTree =(params)=>{
  var temp = false;
  if(global.reqService=="local" && temp){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  }else if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'usertreetablebymanager', params, true, '').then((data)=>{
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


export const usertreetablebymanager =(params)=>{
  var temp = false;
 if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'usertreetablebymanager', params, true, '').then((data)=>{
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


export const save =(params)=>{
  var temp = false;
 if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      debugger
      http.post('/service/xtgl/user', 'save', params, true, '').then((data)=>{
           debugger
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


export const handleDelete = (params) => {
  var temp = false;
 if(global.reqService=="remote" ||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'del', params, true, '').then((data)=>{
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


export const get = (params) => {
  var temp = false;
 if(global.reqService=="remote" ||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'get', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}


export const update =(params)=>{
  var temp = false;
 if(global.reqService=="remote" || !temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'update', params, true, '').then((data)=>{
           debugger
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
