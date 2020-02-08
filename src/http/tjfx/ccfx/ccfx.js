import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 获取按物证类别统计物证数量信息
 */
export const queryWzsBySqWzlb =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/cfcktj/cfcktjservice', 'queryWzsBySqWzlb', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}

/**
 * 仓储分析-按月份统计
 */
export const queryWzsBySqMonth =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/jcsjgl/cfcktj/cfcktjservice', 'queryWzsBySqMonth', params, true, '').then((data)=>{
      resolve(data.getBody().getValueofBody());
    });
  })
}
