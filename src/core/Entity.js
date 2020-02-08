/**
 * Entity类
 * 代表完整业务逻辑容器集合，可以理解为单笔、多笔、一对一、一对多业务类型的集合
 */
import _ from 'lodash'
import Data from '@/core/Data'
import DataSet from '@/core/DataSet'

class Entity extends Map {
  /**
   * 打包成字符串输出
   */
  toString() {

  }

  /** 把data设置到Entity
   * 一个参数(data) 设置到默认的default节点
   * 两个参数(name,data)设置到name节点
   */
  setNode() {
    if (arguments.length === 1) {
      return this._setDefaulNode(arguments[0]);
    } else if (arguments.length === 2) {
      return this._setSelfNode(arguments[0], arguments[1]);
    }

  }

  /**
   * @param name 节点名称
   * @param data data对象
   */
  _setSelfNode(name, data) {
    if (name == undefined || name == "") {
      return;
    }
    if (this.get(name) == undefined) {
      let defaultArr = new Array();
      defaultArr.push(data);
      this.set(name, defaultArr);
    } else {
      let defaultArr = this.get(name);
      defaultArr.push(data);
      this.set(name, defaultArr);
    }
  }

  /**
   * @param data data对象
   */
  _setDefaulNode(data) {
    if (this.get('default') == undefined) {
      let defaultArr = new Array();
      defaultArr.push(data);
      this.set('default', defaultArr);
    } else {
      let defaultArr = this.get('default');
      defaultArr.push(data);
      this.set('default', defaultArr);
    }


  }

  /**返回节点数据
   * 0个参数() 返回默认的default节点
   * 1个参数(name)返回name节点
   */
  getNode() {
    if (arguments.length === 0) {
      return this._getDefaulNode();
    } else if (arguments.length === 1) {
      return this._getSelfNode(arguments[0]);
    }

  }

  /**
   * @param name 节点名称
   */
  _getSelfNode(name) {
    return this.get(name);
  }

  /**
   * 返回默认节点数据
   */
  _getDefaulNode() {
    return this.get('default');
  }

  /**把某个属性值设置到Entity中
   * 两个个参数(name,vlaue) 设置到默认的default节点
   * 三个参数(node,name,value)设置到node节点
   */
  setNodeItem() {
    if (arguments.length === 2) {
      this._setDefaulNodeItem(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
      this._setSelfNodeItem(arguments[0], arguments[1], arguments[2]);
    }

  }

  /**
   * @param name 属性名称
   * @param value 属性值
   */
  _setDefaulNodeItem(name, value) {
    if (name == undefined || name == "") {
      return;
    }
    if (this.get('default') == undefined) {
      let defaultArr = new Array();
      let data = new Data();
      data.setStringItem(name, value);
      defaultArr.push(data);
      this.set('default', defaultArr);
    } else {
      let data = new Data();
      data.setStringItem(name, value);
      let defaultArr = this.get('default');
      defaultArr.push(data);
      this.set('default', defaultArr);
    }

  }

  /**
   * @param node 节点名称
   * @param name 属性名称
   * @param value 属性值
   */
  _setSelfNodeItem(node, name, value) {
    if (name == undefined || name == "" || node == undefined || node == "") {
      return;
    }
    if (this.get(node) == undefined) {
      let defaultArr = new Array();
      let data = new Data();
      data.setStringItem(name, value);
      defaultArr.push(data);
      this.set(node, defaultArr);
    } else {
      let data = new Data();
      data.setStringItem(name, value);
      let defaultArr = this.get(node);
      defaultArr.push(data);
      this.set(node, defaultArr);
    }

  }

  /**
   * 返回属性值
   * 1个个参数(name) 返回默认的default节点中name的属性值
   * 2个参数(node,name)返回node节点中name的属性值
   */
  getNodeItem() {
    if (arguments.length === 1) {
      return this._getDefaulNodeItem(arguments[0]);
    } else if (arguments.length === 2) {
      return this._getSelfNodeItem(arguments[0], arguments[1]);
    }

  }

  /**
   * @param name 属性名称
   */
  _getDefaulNodeItem(name) {
    let item = "";
    let defaultArr = this.get('default');
    if (defaultArr != undefined) {
      let defaultArr = this.get('default');
      defaultArr.forEach(function (map) {
        if (map.get(name) != undefined) {
          item = map.get(name);
        }
      });
    }
    return item;

  }

  /**
   * @param node 节点名称
   * @param name 属性名称
   */
  _getSelfNodeItem(node, name) {
    let item = "";
    let defaultArr = this.get(node);
    if (defaultArr != undefined) {
      defaultArr.forEach(function (map) {
        if (map.get(name) != undefined) {
          item = map.get(name);
        }
      });
    }
    return item;

  }

  /**把某个dataset设置到Entity中
   * 两个个参数(name,dataset) 设置到默认的default节点
   * 三个参数(node,name,dataset)设置到node节点
   */
  setNodeDataset() {
    if (arguments.length === 2) {
      this._setDefaulNodeDataset(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
      this._setSelfNodeDataset(arguments[0], arguments[1], arguments[2]);
    }

  }

  /**
   * @param name 属性名称
   * @param dataset dataset对象
   */
  _setDefaulNodeDataset(name, dataset) {
    if (name == undefined || name == "") {
      return;
    }
    if (this.get('default') == undefined) {
      let defaultArr = new Array();
      let data = new Data();
      data.setDataSet(name, dataset);
      defaultArr.push(data);
      this.set('default', defaultArr);
    } else {
      let data = new Data();
      data.setDataSet(name, dataset);
      let defaultArr = this.get('default');
      defaultArr.push(data);
      this.set('default', defaultArr);
    }

  }

  /**
   * @param node 节点名称
   * @param name 属性名称
   * @param dataset dataset对象
   */
  _setSelfNodeDataset(node, name, dataset) {
    if (name == undefined || name == "" || node == undefined || node == "") {
      return;
    }
    if (this.get(node) == undefined) {
      let defaultArr = new Array();
      let data = new Data();
      data.setDataSet(name, dataset);
      defaultArr.push(data);
      this.set(node, defaultArr);
    } else {
      let data = new Data();
      data.setDataSet(name, dataset);
      let defaultArr = this.get(node);
      defaultArr.push(data);
      this.set(node, defaultArr);
    }

  }

  /**返回dataset值
   * 1个个参数(name) 返回默认的default节点name名的dataset
   * 2个参数(node,name)返回node节点name名的dataset
   */
  getNodeDataset() {
    if (arguments.length === 1) {
      return this._getDefaulNodeDataset(arguments[0]);
    } else if (arguments.length === 2) {
      return this._getSelfNodeDataset(arguments[0], arguments[1]);
    }

  }

  /**
   * @param name 属性名称
   */
  _getDefaulNodeDataset(name) {
    let dataset = new DataSet();
    let defaultArr = this.get('default');
    if (defaultArr != undefined) {
      defaultArr.forEach(function (data) {
        if (data.get(name) != undefined) {
          dataset = data.get(name);
        }
      });
    }
    return dataset;
  }

  /**
   * @param node 节点名称
   * @param name 属性名称
   */
  _getSelfNodeDataset(node, name) {
    let dataset = new DataSet();
    let defaultArr = this.get(node);
    if (defaultArr != undefined) {
      defaultArr.forEach(function (data) {
        if (data.get(name) != undefined) {
          dataset = data.get(name);
        }
      });
    }
    return dataset;
  }
}

export default Entity;
