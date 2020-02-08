import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

//查询table
export const queryTable =(params)=>{
  return new Promise((resolve,reject)=>{
      http.post('/service/czpj/pjkp/pjkpService', 'queryPjsy', params, true, '').then((data)=>{
        resolve(data.getBody().getValueofBody());
      });
    })
}
