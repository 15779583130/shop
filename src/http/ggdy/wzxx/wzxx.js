import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 获取物证图片信息
 * @param {*} params
 */
export const queryTable = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {//
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/file', 'get', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
/**
 * 获取物证流程及物证信息
 * @param {*} params
 */
export const queryDetail = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {//
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/file', 'get', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
