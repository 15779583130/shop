/**Data类
 * 代表单笔的一个容器集合
 */
import _ from 'lodash'

class Data extends Map {

  /**
   * 根据属性名获取改节点String结果值
   */
  getStringItem(name) {

    return this.get(name);
  }

  /**
   * 设置value值到指定的节点
   * @param name 节点名称
   * @param value 值
   */
  setStringItem(name, value) {

    return this.set(name, value);
  }

  /**
   * 根据属性名获取改节点dataset
   * @param name 属性名
   */
  getDataSet(name) {
    return this.get(name);
  }

  /**
   * 设置value值到指定的节点
   * @param name 节点名称
   * @param dataset DataSet
   */
  setDataSet(name, dataset) {

    return this.set(name, dataset);
  }
}

export default Data;
