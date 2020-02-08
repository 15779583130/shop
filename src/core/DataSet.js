/**
 * DataSet类
 * 用于操作某张表的记录
 */
import _ from 'lodash'

class DataSet extends Array {
  /**
   * 打包成字符串输出
   */
  toString() {

  }
}
/**
 * 添加一行数据到dataset
 * @param data 实例
 */
Array.prototype.setRow = function(data) {
  this.push(data);
}
/**
 * 返回一行数据data
 * @param int 实例
 */
Array.prototype.getRow = function(int) {
  return this[int];
}
export default DataSet;
