import axios from '@/http/axios'
import http from '@/framework/http'
import EnvelopUtil from '@/framework/EnvelopUtil'
import global from '@/utils/global.js'

/**
 * 物证管理
 * @author  lijing
 * @modify  1.00  2019/11/26   lijing
 */


/**
 * 查询左侧存放位置树
 * @author  lijing
 * @modify  1.00  2019/11/26   lijing
 */
export const queryTree = (params) => {
  if(global.reqService=="local"){
    return new Promise((resolve,reject)=>{
      var data = EnvelopUtil.convertXmlFileToXml("ckgl/bmckgl/wzcw/data/queryTree.xml", 'none')
      let parentArr = data.getBody().getValueofBody().body.default.depts.filter(l => l.pid == "");
      var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.depts, parentArr);
      // 查询树
      let findTreeData = {
        "success":data.getHeader().getNode().getNodeItem('success'),
        "message": data.getHeader().getNode().getNodeItem('message'),
        "data": treeDataSource
      }
      resolve(findTreeData);
    })
  }else if(global.reqService=="remote"){
    return new Promise((resolve,reject)=>{
      http.post('/service/xtgl/user', 'usertreetablebymanager', params, true, '').then((data)=>{
        let parentArr = data.getBody().getValueofBody().body.default.depts.filter(l => l.pid == "");
        var treeDataSource = getTreeData(data.getBody().getValueofBody().body.default.depts, parentArr);
        var obj ={
          "success": data.getHeader().getNode().getNodeItem('success'),
          "message":  data.getHeader().getNode().getNodeItem('message'),
          "data": treeDataSource
        }
        resolve(obj);
      });
    })
  }
}

/**
 * 递归方法组装树型数据
 * @author  lijing
 * @modify  1.00  2019/11/26   lijing
 */
function getTreeData(list, dataArr) {
  dataArr.map((pNode, i) => {
    let childObj = [];
    list.map((cNode, j) => {
      if (pNode.id === cNode.pid) {
        childObj.push(cNode);
      }
    });
    pNode.child = childObj;
    if (childObj.length > 0) {
      getTreeData(list, childObj);
    };
  })
  return dataArr;
}
