// import axios from '../../axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

// 分页查询
export const indexUser = (params) => {
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
      http.post('/service/ywgl/home/', 'tjxx', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const AgencyTask = (params) => {
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

      http.post('/service/ywgl/home/', 'dbrw', params).then((data) => {

        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const wuZhengTask = (params) => {  // 物证信息查询
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
      http.post('/service/ywgl/home/', 'wzxxcx', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const inOffice = (params) => {
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

      http.post('/service/ywgl/home/', 'zbajcx', params).then((data) => {

        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const noticeList = (params) => {
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

      http.post('/service/ywgl/home/', 'tzgglist', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const workDynamic = (params) => {
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

      http.post('/service/ywgl/home/', 'gzdt', params).then((data) => {

        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.default
        }
        resolve(findPageData);
      });
    })
  }
}
export const downLoadSpce = (params) => {
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
      http.post('/service/ywgl/home/', 'tzggfjlist', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getBody().getValueofBody().body.default.filelist
        }
        resolve(findPageData);
      });
    })
  }
}
