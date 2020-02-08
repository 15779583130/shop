/**
 * SoapUtil类
 * 用于对xml报文进行打包解包操作
 */
import _ from 'lodash'
import Envelop from '@/core/Envelop'
import EnvelopHead from '@/core/EnvelopHead'
import EnvelopBody from '@/core/EnvelopBody'
import Entity from '@/core/Entity'
import Data from '@/core/Data'
import DataSet from '@/core/DataSet.js'
import Encrypt from '@/core/Encrypt'

var xml2js = require('xml2js')

var SoapUtil = {
  /**
   * 把完整的xml报文转换为Evelope对象
   * 两个参数时(xml,evelope)
   * 三个参数时(xml,envelopehead,envelopebody)
   */
  doRequest() {
    if (arguments.length === 2) {
      this.doRequestXmlToEvelope(arguments[0], arguments[1])
    } else if (arguments.length === 3) {
      this.doRequestXmlToEvelopeHeadAndBody(arguments[0], arguments[1], arguments[2])
    }
  },
  /**
   * @param xml 完整的xml报文
   * @param envelope 存放报文的实体
   */
  doRequestXmlToEvelope(xml, envelope) {
    if (Encrypt.ENCRYPT == 'none') // {none,simple,standard,strict}
    {
      // 不进行验签操作
    } else if (Encrypt.ENCRYPT == 'simple') {
      // 简单验签获取数据
      xml = Encrypt.getSimpleData(xml, true)
    } else if (Encrypt.ENCRYPT == 'standard') {
      // 标准验签获取数据
      xml = Encrypt.getStandardData(xml, true)
    }
    if (xml == '签名信息失败' || xml == '') {
      xml = this.doError('签名信息失败');
    }
    // xml->json
    let xmlParser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      attrkey: '_attr'
    })
    let xmlJson;
    xmlParser.parseString(xml, function (err, result) {
      xmlJson = result;
    })
    // 开始组装head信息
    let envelopeHead = new EnvelopHead();
    this._packageHead(xmlJson, envelopeHead, envelope);
    // 开始组装body信息
    let envelopeBody = new EnvelopBody();
    this._packageBody(xmlJson, envelopeBody, envelope);
    return envelope;
  },
  /**
   * @param xml 完整的xml报文
   * @param envelopehead 存放报文的头部
   * @param envelopebody 存放报文的报文体
   */
  doRequestXmlToEvelopeHeadAndBody(xml, envelopehead, envelopebody) {
    if (Encrypt.ENCRYPT == 'none') // {none,simple,standard,strict}
    {
      // 不进行验签操作
    } else if (Encrypt.ENCRYPT == 'simple') {
      // 简单验签获取数据
      xml = Encrypt.getSimpleData(xml, true)
    } else if (Encrypt.ENCRYPT == 'standard') {
      // 标准验签获取数据
      xml = Encrypt.getStandardData(xml, true)
    }
    if (xml == '签名信息失败' || xml == '') {
      xml = this.doError('签名信息失败');
    }
    // xml->json
    let xmlParser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      attrkey: '_attr'
    })
    let xmlJson;
    xmlParser.parseString(xml, function (err, result) {
      xmlJson = result;
    })
    // 开始组装head信息
    this._packageHead(xmlJson, envelopehead, undefined);
    // 开始组装body信息
    this._packageBody(xmlJson, envelopebody, undefined);
  },
  /**
   * 把完整的Evelope对象转为xml报文
   * 一个个参数时(evelope)
   * 两个参数时(envelopehead,envelopebody)
   */
  doResponse() {
    // 返回完整的xml报文
    let xml = '';
    if (arguments.length === 1) {
      xml = this.doResponseEvelopeToxml(arguments[0])
    } else if (arguments.length === 2) {
      xml = this.doResponseEvelopeHeadAndBodyToxml(arguments[0], arguments[1])
    }
    return xml
  },
  /**
   *
   * @param envelope 报文的实体
   */
  doResponseEvelopeToxml(envelope) {
    // 用于存储envelope对象转成的json对象
    var commonXml = {
      xml: {
        envelope: {
          header: {},
          body: {
            logic: []
          }
        }
      }
    }
    this._unpackageHead(envelope.getHead(), commonXml);
    this._unpackageBody(envelope.getBody(), commonXml);
    // json --> xml
    var builder = new xml2js.Builder({attrkey: '_attrs'});
    // .replace(/standalone="yes"/g, "")
    var obj2xml = builder.buildObject(commonXml).replace(/\<xml>/g, '').replace(/\<\/xml>/g, '');
    if (Encrypt.ENCRYPT == 'none') // {none,simple,standard,strict}
    {
      // 不进行加签操作
    } else if (Encrypt.ENCRYPT == 'simple') {
      // 简要加签
      obj2xml = Encrypt.attchSignBySimple(obj2xml);
    } else if (Encrypt.ENCRYPT == 'standard') {
      // 标准加签
      obj2xml = Encrypt.attchSignByStandard(obj2xml);
    }
    return obj2xml;
  },
  /**
   * @param envelopehead 存放报文的头部
   * @param envelopebody 存放报文的报文体
   */
  doResponseEvelopeHeadAndBodyToxml(envelopehead, envelopebody) {
    // 用于存储envelope对象转成的json对象
    var commonXml = {
      xml: {
        _attrs: {
          version: '1.0',
          encoding: 'utf-8'
        },
        Envelope: {
          header: {},
          body: {
            logic: []
          }
        }
      }
    }
    this._unpackageHead(envelopehead, commonXml);
    this._unpackageBody(envelopebody, commonXml);
    // json --> xml
    var builder = new xml2js.Builder({attrkey: '_attrs'});
    // .replace(/standalone="yes"/g, "")
    var obj2xml = builder.buildObject(commonXml).replace(/\<xml>/g, '').replace(/\<\/xml>/g, '');
    if (Encrypt.ENCRYPT == 'none') // {none,simple,standard,strict}
    {
      // 不进行加签操作
    } else if (Encrypt.ENCRYPT == 'simple') {
      // 简要加签
      obj2xml = Encrypt.attchSignBySimple(obj2xml);
    } else if (Encrypt.ENCRYPT == 'standard') {
      // 标准加签
      obj2xml = Encrypt.attchSignByStandard(obj2xml);
    }
    return obj2xml;
  },
  /**
   * 根据头部实体打包成头部xml
   * @param envelopehead 存放报文的头部
   */
  getHeadXml(envelopehead) {
    // 用于存储envelope对象转成的json对象
    var commonXml = {
      xml: {
        _attrs: {
          version: '1.0',
          encoding: 'utf-8'
        },
        Envelope: {
          header: {}
        }
      }
    }
    this._unpackageHead(envelopehead, commonXml);
    return commonXml;
  },
  /**
   * 根据身体实体打包成身体xml
   * @param envelopebody 存放报文的头部
   */
  getBodyXml(envelopebody) {
    // 用于存储envelope对象转成的json对象
    var commonXml = {
      xml: {
        _attrs: {
          version: '1.0',
          encoding: 'utf-8'
        },
        Envelope: {
          body: {
            logic: []
          }
        }
      }
    }
    this._unpackageBody(envelopebody, commonXml);
    return commonXml;
  },
  /**
   * 根据提供的实体打包成对应的xml
   * @entity 实体
   */
  getXml(entity) {
  },
  /**
   * 根据完整的xml报文解析成头部实体
   * @param xml 完整的xml报文
   * @param envelopehead 存放报文的头部
   */
  getEnvelopHead(xml, envelopehead) {

  },
  /**
   * 根据完整的xml报文解析成身体实体
   * @param xml 完整的xml报文
   * @param envelopebody 存放报文的身体
   */
  getEnvelopBody(xml, envelopebody) {

  },
  /**
   * 根据提供的头部对象替换完整xml的头部对象返回替换后的xml
   * @param xml 完整的xml报文
   * @param envelopehead 存放报文的头部
   */
  replaceHead(xml, envelopehead) {

  },
  /**
   * 根据提供的身体对象替换完整xml的身体对象返回替换后的xml
   * @param xml 完整的xml报文
   * @param envelopebody 存放报文的身体
   */
  replaceBody(xml, envelopebody) {

  },
  /**
   * 把提供的信息打包成错误信息报文
   * 返回错误信息报文
   * @param error 提供的错误信息
   */
  doError(error) {
    let xml = `<?xml version="1.0" encoding="utf-8"?>
					<envelope>
						<header>
							<authen name="default">
							<data success="false" />
							<data message="` + error + `" />
							<data transid="c68a2a0b7d2a4f98ba1440a5331fc1e2" />
							<data parentid="593F1D44C0A8011100E252629E28DDEF" />
							</authen>
						</header>
						<body>
						  <logic>
						  </logic>
						</body>
					</envelope>`;
    return xml;
  },
  _strMapToObj(strMap) {
    let obj = Object.create(null)
    for (let [k, v] of strMap) {
      obj[k] = v
    }
    return obj
  },
  /**
   *map转换为json
   */
  _mapToJson(map) {
    return JSON.stringify(this._strMapToObj(map))
  },

  _objToStrMap(obj) {
    let strMap = new Data()
    for (let k of Object.keys(obj)) {
      strMap.setStringItem(k, obj[k])
    }
    return strMap
  },
  /**
   *json转换为map
   */
  _jsonToMap(jsonStr) {
    return this._objToStrMap(JSON.parse(jsonStr))
  },
  /**
   * 组装身体信息
   * @param xmlJson json报文
   * @param envelopeBody 身体部分
   * @param envelope 完整报文对象
   * @private
   */
  _packageBody(xmlJson, envelopeBody, envelope) {
    let arrBody = xmlJson.envelope.body.logic;
    if (arrBody == undefined || arrBody.trim() == "") {
      return;
    }
    for (let i = 0; i < arrBody.length; i++) {
      let node = arrBody[i]._attr.name
      // 设置body里面的data信息
      this._packageBodyData(node, arrBody[i], envelopeBody)
      // 设置body里面的dataset信息
      if (arrBody[i].dataset instanceof Array) {
        for (let z = 0; z < arrBody[i].dataset.length; z++) {
          let arrDataset = arrBody[i].dataset[z].row
          let datasetname = arrBody[i].dataset[z]._attr.name
          this._packageBodyDataSet(arrDataset, envelopeBody, node, datasetname)
        }
      } else {
        let arrDataset = arrBody[i].dataset.row
        let datasetname = arrBody[i].dataset._attr.name
        this._packageBodyDataSet(arrDataset, envelopeBody, node, datasetname)
      }
      if (envelope !== undefined) {
        envelope.setBody(envelopeBody)
      }
    }
  },
  /**
   * 组装头部信息
   * @param xmlJson json报文
   * @param envelopeHead 头部对象
   * @param envelope 完整报文对象
   * @private
   */
  _packageHead(xmlJson, envelopeHead, envelope) {
    let arrHead = xmlJson.envelope.header.authen.data
    let dataHead = new Data()
    for (let a = 0; a < arrHead.length; a++) {
      for (let key in arrHead[a]._attr) {
        dataHead.setStringItem(key, arrHead[a]._attr[key])
      }
    }
    envelopeHead.setNode(dataHead);
    if (envelope !== undefined) {
      envelope.setHead(envelopeHead);
    }
  },
  /**
   * 把头部报文转为json格式
   * @param envelope 完整报文对象
   * @param commonXml json报文
   * @private
   */
  _unpackageHead(envelopHead, commonXml) {
    commonXml.xml.envelope.header = {
      authen: {
        _attrs: {
          name: 'default'
        }
      }
    }
    let data = []
    let headData = envelopHead.getNode()
    for (let g = 0; g < headData.length; g++) {
      let _map = headData[g]._c
      _map.forEach(function (value, key) {
        let obj = {}
        obj[key] = value
        data.push({
          '_attrs': obj
        })
      })
    }
    commonXml.xml.envelope.header.authen.data = data
  },
  /**
   *  把身体里面的dataset转为json格式
   * @param dataset
   * @param v
   * @param k
   * @private
   */
  _unpackageBodyDataSet(dataset, v, k) {
    debugger;
    let row = []
    for (let m = 0; m < v.length; m++) {
      let _map = v[m]._c
      let obj = {}
      _map.forEach(function (value, key) {
        obj[key] = value
      })
      row.push({
        '_attrs': obj
      })
    }
    dataset.push({
      '_attrs': {
        name: k
      },
      row: row
    })
  },
  /**
   * 把身体里面data报文转为 json格式
   * @param data
   * @param v
   * @param k
   * @private
   */
  _unpackageBodyData(data, v, k) {
    let obj = {}
    obj[k] = v
    data.push({
      '_attrs': obj
    })
  },
  /**
   * 把身体报文转为json格式
   * @param envelope 完整报文对象
   * @param commonXml json报文
   * @private
   */
  _unpackageBody(envelopeBody, commonXml) {
    let logic = []
    let bodyData = envelopeBody._c
    bodyData.forEach(function (value, key) {
      let data = []
      let dataset = []
      for (let h = 0; h < value.length; h++) {
        value[h].forEach(function (v, k) {
          if (v instanceof Array) {
            SoapUtil._unpackageBodyDataSet(dataset, v, k);
          } else {
            SoapUtil._unpackageBodyData(data, v, k);
          }
        })
      }
      logic.push({
        '_attrs': {
          name: key
        },
        data: data,
        dataset: dataset
      })
    })
    // 组装完毕
    commonXml.xml.envelope.body.logic = logic
  },
  /**
   * 组装body里面的data信息
   * @param node 节点名称
   * @param arrBody 身体对象
   * @param envelopeBody 身体对象
   * @private
   */
  _packageBodyData(node, arrBody, envelopeBody) {
    // 设置body里面的data信息
    let dataBody = new Data()
    if (arrBody.data instanceof Array) {
      for (let c = 0; c < arrBody.data.length; c++) {
        for (let key in arrBody.data[c]._attr) {
          dataBody.setStringItem(key, arrBody.data[c]._attr[key])
        }
      }
      envelopeBody.setNode(node, dataBody)
    } else {
      for (let key in arrBody.data._attr) {
        dataBody.setStringItem(key, arrBody.data._attr[key])
      }
      envelopeBody.setNode(node, dataBody)
    }
  },
  /**
   * 组装body里面dataset信息
   * @param arrDataset
   * @param envelopeBody
   * @param node
   * @param datasetname
   * @private
   */
  _packageBodyDataSet(arrDataset, envelopeBody, node, datasetname) {
    if (arrDataset instanceof Array) {
      let datasetBody = new DataSet()
      for (let j = 0; j < arrDataset.length; j++) {
        let dataBody = new Data()
        for (let key in arrDataset[j]._attr) {
          dataBody.setStringItem(key, arrDataset[j]._attr[key])
        }
        datasetBody.setRow(dataBody)
      }
      envelopeBody.setNodeDataset(node, datasetname, datasetBody)
    } else {
      let datasetBody = new DataSet()
      let dataBody = new Data()
      for (let key in arrDataset._attr) {
        dataBody.setStringItem(key, arrDataset._attr[key])
      }
      datasetBody.setRow(dataBody)
      envelopeBody.setNodeDataset(node, datasetname, datasetBody)
    }
  }
}

export default SoapUtil
