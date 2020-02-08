import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'



//查询第三方接口列表
export const query =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}

//查询第三方接口单位配置的明细
export const queryMx =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'queryMx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}


//保存第三方接口单位配置信息
export const save =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'save', params, true, '').then((data)=>{
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

//更新第三方接口单位配置信息
export const update =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'update', params, true, '').then((data)=>{
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

//删除第三方接口单位配置信息
export const del =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'del', params, true, '').then((data)=>{
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


//更新授权方式
export const updateMx =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'updateMx', params, true, '').then((data)=>{
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


//保存授权方式
export const saveMx =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'saveMx', params, true, '').then((data)=>{
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


//del授权方式
export const delMx =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'delMx', params, true, '').then((data)=>{
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

//获取授权方式
export const getMx =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'getMx', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}


//获取第三方接口单位配置的详细信息
export const get =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/auth/unitconfig', 'get', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}
