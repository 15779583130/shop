import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 弹窗选择人员
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
      http.post('/service/common/userlist/userlistService', 'query', params, true, '').then((data) => {
        resolve(data.getBody().getValueofBody());
      });
    })
  }
}
