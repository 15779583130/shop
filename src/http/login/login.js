// import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

// 分页查询
export const loginFun = (params) => {

  if (global.reqService === 'local') {
    var data = EnvelopUtil.convertXmlFileToXml('home/data/homeUser.xml', 'none')
    let pagenum = 1
    let pagesize = 10
    if (params !== null && params.pagenum !== 'undefined') {
      pagenum = params.pagenum
    }
    if (params !== null && params.pagesize !== 'undefined') {
      pagesize = params.pagesize
    }
    let findPageData = {};
    findPageData.pagenum = pagenum
    findPageData.pagesize = pagesize
    findPageData.totalSize = Number(data.getBody().getNode().getNodeItem('count'))
    var content = data.getBody().getValueofBody().body.default.dataset || []
    findPageData.content = content;
    return new Promise((resolve, reject) => {
      resolve(findPageData);
    })
  } else if (global.reqService === 'remote') {
    return new Promise((resolve, reject) => {
      let pagenum = 1;
      let pagesize = 8;
      if (params !== null && params.pagenum !== 'undefined') {
        pagenum = params.pagenum
      }
      if (params !== null && params.pagesize !== 'undefined') {
        pagesize = params.pagesize
      }

      http.post('service/api/account', 'login', params).then((data) => {

        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody(),
          message: data.getHeader().getNode().getNodeItem('message')
        }
        resolve(findPageData);
      });
    })
  }
}

