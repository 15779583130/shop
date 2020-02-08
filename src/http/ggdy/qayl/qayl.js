import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 获取案件信息
 * @param {*} params
 */
export const queryTable = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/ajdjgl/ajzhcx/ajzhcxService', 'getAjxx', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
/**
 * 获取物证图片信息
 * @param {*} params
 */
export const queryDetail = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
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
 * 获取承办登记信息
 * @param {*} params
 */
export const querySubDetail = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/ajdjgl/ajzhcx/ajzhcxService', 'getCbdjList', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
/**
 * 查询案件物证信息
 * @param {*} params
 */
export const querySubTale_bak = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/qaylgl/qaylajxx/qaylajxxService', 'queryWzxxList', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
/**
 * 查询部门
 * @param {*} params
 */
export const querySubTale = (params) => {
  var temp = false;
  if (global.reqService == "local" && temp) {
    return new Promise((resolve, reject) => {
      var data = EnvelopUtil.convertXmlFileToXml("wzyk/yktz/data/queryTable.xml", 'none')
      resolve(data.getBody().getValueofBody());
    })
  } else if (global.reqService == "remote" || !temp) {
    return new Promise((resolve, reject) => {
      http.post('/service/qaylgl/qaylajxx/qaylajxxService', 'getXtDept', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
