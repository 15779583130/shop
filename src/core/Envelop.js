/**
 * Envelop类
 * 用于展示一个完整的交易报文
 */
import _ from 'lodash'
import EnvelopHead from '@/core/EnvelopHead'
import EnvelopBody from '@/core/EnvelopBody'

var Envelop = function () {

  this.head = new EnvelopHead();
  this.body = new EnvelopBody();
  /**
   * 把对象打包成完整的报文输出
   *
   */
  this.toString = function () {

  }
  /**
   * 获取报文体对象
   */
  this.getBody = function () {
    if (this.body.body == undefined) {
      return this.body
    } else {
      return this.body.body;
    }
  }
  /**
   * 获取头部对象
   */
  this.getHead = function () {
    if (this.head.head == undefined) {
      return this.head;
    } else {
      return this.head.head;
    }
  }
  /**
   * 把报文体对象添加到报文中
   * @param envelopbody
   *
   */
  this.setBody = function (envelopbody) {

    this.body.body = envelopbody;
  }
  /**
   * 把头部对象添加到报文中
   * @param envelophead
   */
  this.setHead = function (envelophead) {
    this.head.head = envelophead;
  }
}
export default Envelop;
