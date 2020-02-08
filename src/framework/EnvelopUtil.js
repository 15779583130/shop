import Envelope from '@/framework/Envelope'

let EnvelopUtil = {

  /**
   * 读取xml数据文件，返回报文字符串
   * @author  liuyuan
   * @modify  1.00  2019/11/12   liuyuan   无     新建
   */
  convertXmlFileToXml (path, ENCRYPT) {
    let xmlfile = require('../http/' + path)
    let xml2js = require('xml2js')
    let builder = new xml2js.Builder()
    let res = builder.buildObject(xmlfile)
    return this.doResponse(res, ENCRYPT)
  },
  /**
   *
   * @param {头部参数} paramsheader
   * @param {body参数} paramsbody
   * @param {session参数} sessioninfo
   */
  doRequest (paramsheader, paramsbody, sessioninfo){
    let envelope = new Envelope()
    return envelope.doRequest(paramsheader, paramsbody, sessioninfo)
  },
  /**
   *
   * @param {xml数据} xml
   * @param ENCRYPT 本地调用设置为none
   * 返回转换后的Evelope对象
   */
  doResponse (xml, ENCRYPT) {
    let envelope = new Envelope()
    if (ENCRYPT !== null && ENCRYPT !== undefined){
      envelope.ENCRYPT = ENCRYPT
    }
    return envelope.doResponse(xml)
  }
}

export default EnvelopUtil
