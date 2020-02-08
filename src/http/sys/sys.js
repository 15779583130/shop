//获取存放位置
export const queryDept =(params)=>{
  return new Promise((resolve,reject)=>{
    http.post('/service/common/depttree/depttreeService', 'getAllDept', params, true, '').then((data)=>{
      var treeDataSource = composeTree(data.getBody().getValueofBody().body.default.cfwzs);
      var obj ={
        "success": data.getHeader().getNode().getNodeItem('success'),
        "message":  data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(obj);
    });
  })
}

// 数组转tree
function composeTree(list = []) {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    const parent = map[item.pid]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
