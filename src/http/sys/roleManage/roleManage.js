import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'
export const getRoleList = (params) => {
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

      http.post('/service/xtgl/role', 'query', params).then((data) => {
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

export const getRoleDetail = (params) => {
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

      http.post('/service/xtgl/role', 'getMenuList', params).then((data) => {

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

export const saveChildrenNode = (params) => {
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
      debugger
      http.post('/service/xtgl/role', 'saveMenuFuncRecord', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getHeader().getValueofHeader()
        }
        resolve(findPageData);
      });
    })
  }
}

export const getRoleInfo = (params) => {  // 获取角色信息
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
      http.post('/service/xtgl/role', 'get', params).then((data) => {
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

export const saveRoleInfo = (params) => {  // 获取角色信息
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

      http.post('/service/xtgl/role', params.method, params.paramsData).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getHeader().getValueofHeader().header.default
        }
        resolve(findPageData);
      });
    })
  }
}

export const delRoleInfo = (params) => {  // 删除角色信息
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

      http.post('/service/xtgl/role', 'del', params).then((data) => {
        var findPageData = {
          pagenum: pagenum,
          pagesize: pagesize,
          totalSize: Number(data.getBody().getNode().getNodeItem('count')),
          content: data.getHeader().getValueofHeader().header.default
        }
        resolve(findPageData);
      });
    })
  }
}
