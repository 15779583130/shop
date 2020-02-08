import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'



export const queryTable= (params) => {

    return new Promise((resolve, reject) => {
      http.post('/service/ywxxgl/clientjkrz/clientJkrzService', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })

}
export const get= (params) => {

    return new Promise((resolve, reject) => {
      http.post('/service/ywxxgl/clientjkrz/clientJkrzService', 'get', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })

}
