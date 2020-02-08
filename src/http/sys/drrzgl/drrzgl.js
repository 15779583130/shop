import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'



//查询全局参数列表
export const query =(params)=>{
  var temp = false;
  if(global.reqService=="remote"||!temp){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/loginlog', 'query', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
  });
  })
  }
}


