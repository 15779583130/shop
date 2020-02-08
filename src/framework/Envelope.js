import { Header } from "@/framework/Header"
import { Body } from "@/framework/Body"
import * as parser from 'fast-xml-parser'
import JSEncrypt from 'JSEncrypt'
import  RSAUtils  from '@/utils/security'
import _ from 'lodash'
/**
 * 报文处理类
 * @author wuyuchuan
 */
var Envelope = function () {
	/**
 * 加密参数配置
*/
	this.ENCRYPT = "none";//simple,standard,none
	//头部对象
	//HEADER ={};
	//头部对象
	this.HEADER = new Header();
	//body对象
	//BODY ={};
	this.BODY = new Body();
	//返回转换的json对象
	this.XMLTOJSON = {};
	/**
	 * 获取公钥
	 */
	this.getPublickey = function () {
		var key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvXpKVh6/RMd/GZU7SyWVfBeqanGNnEhk3B2lDJZ1z6eIFOJVL3Ke2OcF2Ah/Y6zgcb5a056MWhHnLLp29/0rJL/D7TCpWP2XkKXwE8p1fPmEfQ7V8mNgjifpL2dIsibgCCVYRtqRGS5TOpUYJ76KFPy/JVIypfEzuT9xbNjmbUQIDAQAB";
		return key;
	}
	/**
	 * n(pq值)
	 */
	this.getModulus = function () {
		var _modulus = "b90b5ac267907afaa34fe5f38d90e9bafd5a0134701c222c45e1ff9690e7ce48360f8bcbef5070a640464350e505bcce810cdad808f6e4e8d133446a07548afcddb6b95acfc793c4125266764742747c81dddef35eac62e5d31f89f1d0373f28427eb66dc8941f1beafe4ed722db0d4ef0036ed5888d31d2a855b9fde13c7bf7";
		return _modulus;
	}
	/**
	 * e(公钥指数)
	 */
	this.getPublicExponent = function () {
		var _public_exponent = "10001";
		return _public_exponent;
	}
	/**
	 * 将logic单元的json转为xmljson
	 * @author hekangbin 2019/07/31
	 * @param json
	 */
	this.convertLogicToXmlJson = function (json) {
		var data = [];
		var dataset = [];
		var properties = [];
		if (json) {
			properties = Object.getOwnPropertyNames(json);
		}
		for (var i = 0; i < properties.length; i++) {
			var key = properties[i];
			if (!(json[key] instanceof Array)) {
				var obj = {};
				obj[key] = json[key];
				data.push({
					'_attrs': obj
				});
			} else if (json[key] instanceof Array) {
				var inner_arr_json = json[key];
				var row = [];
				inner_arr_json.forEach((inner_json) => {
					var obj = {};
					var inner_prop = Object.getOwnPropertyNames(inner_json);
					inner_prop.forEach((inner_key) => {
						obj[inner_key] = inner_json[inner_key];
					});
					row.push({
						'_attrs': obj
					});
				});
				dataset.push({
					'_attrs': {
						name: key
					},
					row: row
				});
			}

		}
		return {
			data,
			dataset
		}
	}
	/**
	 * json转xml
	 * paramsheader：header数据
	 * paramsbody: body数据
	 * sessioninfo：sessionifo信息
	 * @modify hekangbin 2019/07/31 按公司xml规范支持logic嵌套dataset
	 */
	this.doRequest = function (paramsheader, paramsbody, sessioninfo) {
		var commonXml = {
			xml: {
				_attrs: {
					version: "1.0",
					encoding: "utf-8"
				},
				Envelopee: {
					header: {},
					body: {
						logic: []
					}
				}
			}
		};

		//组装header
		var header_ret = this.convertLogicToXmlJson(paramsheader);
		commonXml.xml.Envelopee.header = {
			authen: {
				_attrs: {
					name: "default"
				}
			}
		};
		if (header_ret.data.length > 0) {
			commonXml.xml.Envelopee.header.authen.data = header_ret.data;
		}
		var logic = [];
		//组装SessionInfo
		var session_ret = this.convertLogicToXmlJson(sessioninfo);
		logic.push({
			'_attrs': {
				name: 'sessioninfo'
			},
			data: session_ret.data,
			dataset: session_ret.dataset
		});
		//组装自定义数据
		var ori_params_logics = this.detectBodyLogics(paramsbody);
		for (var i = 0; i < ori_params_logics.length; i++) {
			var body_ret = this.convertLogicToXmlJson(ori_params_logics[i].params);
			logic.push({
				'_attrs': {
					name: ori_params_logics[i].name //param_logic.name
				},
				data: body_ret.data,
				dataset: body_ret.dataset
			});
		}
		//组装完毕
		commonXml.xml.Envelopee.body.logic = logic;
		//转xml
		//var obj2xml = x2js.json2xml_str(commonXml);
		var obj2xml = new parser.j2xParser({
			format: true,
			attrNodeName: "_attrs",
			textNodeName: "#text",
			cdataTagName: "_cdata"
		}).parse(commonXml);
		if (this.ENCRYPT == "none") //{none,simple,standard,strict}
		{
			//不进行加签操作
		} else if (this.ENCRYPT == "simple") {
			//简要加签
			obj2xml = this.attchSignBySimple(obj2xml);

		} else if (this.ENCRYPT == "standard") {
			//标准加签
			obj2xml = this.attchSignByStandard(obj2xml);
		}
		return obj2xml;
	}
	/**
	 * 把返回的xml转为json
	 * @return json对象
	 */
	this.doResponse = function (xml) {
		var options = {
			attributeNamePrefix: "",
			//attrNodeName: false, //default is 'false'
			textNodeName: "#text",
			ignoreAttributes: false,
			ignoreNameSpace: false,
			allowBooleanAttributes: false,
			parseNodeValue: false,
			parseAttributeValue: false,
			trimValues: true,
			cdataTagName: "__cdata", //default is 'false'
			cdataPositionChar: "\\c",
			localeRange: "", //To support non english character in tag/attribute values.
			parseTrueNumberOnly: false
		};
		if (this.ENCRYPT == "none") //{none,simple,standard,strict}
		{
			//不进行验签操作
		} else if (this.ENCRYPT == "simple") {
			//简单验签获取数据
			xml = this.getSimpleData(xml, true);

		} else if (this.ENCRYPT == "standard") {
			//标准验签获取数据
			xml = this.getStandardData(xml, true);
		}
		if (xml == "签名信息失败" || xml == "") {

			xml = "签名信息失败";
			return xml;
		}
		this.XMLTOJSON = new parser.parse(xml, options);
		return this;
	}
	/**
	 *获取报文头部对象
	 * @return this
	 */
	/*getHeader = function(){
		this.HEADER = this.XMLTOJSON.Envelopee.header.authen;
		return this;
	}*/
	/**
	 *获取报文头部对象
	 * @return 头部对象
	 */
	this.getHeader = function () {
		var header = new Header();
		let xmljson = this.XMLTOJSON;
		let envelope = xmljson.envelope;
		let _header = envelope.header;
		let _authen = _header.authen;
		header.data = _authen.data;
		header.name = _authen.name;
		return header;
	}
	/**
	 *获取报文头部对象
	 * @return 头部json对象
	 */
	/*getHeaderNode = function(){

		return this.HEADER;
	}*/
	/**
	 * 获取报文头部对象中属性值
	 * @param name (属性名称)
	 * @return 属性值
	 */
	/*getHeaderNodeItem = function(name){
		var value =_.get(_.find(this.HEADER.data,function(o) { return o[name]; }),name);
		if(value == undefined){
			value="";
		}
		return value;
	}*/

	/**
	 *获取报文报文体对象
	 *@return this
	 */
	/*getBody =  function(){
		this.BODY = this.XMLTOJSON.Envelopee.body.logic;
		return this;
	}*/
	/**
	 *获取报文报文体对象
	 *@return body对象
	 */
	this.getBody = function () {
		var body = new Body();
		let xmljson = this.XMLTOJSON;
		let envelope = xmljson.envelope;
		let _body = envelope.body;
		body.logic = _body.logic;
		return body;
	}
	/**
	 *获取报文body对象
	 * @param nodeName 节点名称（默认default节点）
	 */
	/*getBodyNode = function(nodeName){
		if(nodeName == undefined || nodeName == null){
			nodeName='default';
		}
		var bodyData = _.find(this.BODY, function(o) { return o.name ==nodeName; });
		return bodyData;
	}*/
	/**
	 * 查找某个body节点data下属性值
	 * @param node 节点名
	 * @param name 属性名
	 */
	/*getBodyNodeItem = function(node,name){
		var value ="";
		if(node == undefined || node == null || node==''){
			return value;
		}
		var bodyNode = this.getBody().getBodyNode(node);
		if(bodyNode == undefined){
			return value;
		}else{
			bodyNode = bodyNode.data;
		}
		if(bodyNode instanceof Array){
			value = _.get(_.find(bodyNode,function(o) { return o[name]; }),name);
		}else{
			value = _.get(bodyNode,name);
		}
		return value;
	}*/
	/**
	 * 查找默认default节点下属性值
	 *
	 * @param name 属性名
	 */
	/*getDefaultBodyNodeItem = function(name){
		var value ="";
		var node ="default";
		var bodyNode = this.getBody().getBodyNode(node);
		if(bodyNode == undefined){
			return value;
		}else{
			bodyNode = bodyNode.data;
		}
		if(bodyNode instanceof Array){
			value = _.get(_.find(bodyNode,function(o) { return o[name]; }),name);
		}else{
			value = _.get(bodyNode,name);
		}
		return value;
	}*/
	/**
	 * 标准加签
	 * @param xml
	 */
	this.attchSignByStandard = function (xml) {
		//var sign = this.sha1(xml);
		var sign = this.sha1(xml);
		//采用标准加密算法
		sign = this.OpenCryptEncrypt(sign);
		return xml + "<!-- " + sign + " -->";
	}
	/**
	* 简要加签
	* @param xml
	*/
	this.attchSignBySimple = function (xml) {
		var sign = this.sha1(xml);
		//采用标准加密算法
		sign = this.SimpleEncrypt(String(sign)).toUpperCase();
		return xml + "<!-- " + sign + " -->";
	}
	/**
	 * 验签(标准签名)
	 * @param xml
	 */
	this.verifyAttachedStandardSign = function (obj) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return false;
		}
		// 获得最后一个<!--的位置
		var begin = obj.lastIndexOf("<!-- ");
		// 如果没找到，则没有签名
		if (begin < 0) {
			return false;
		}
		// 获得原始报文
		var trans = obj.substring(0, begin);
		// 获得电子签名域
		var attachedSign = obj.substring(begin, obj.length);
		var end = attachedSign.indexOf("-->");
		// 截取电子签名
		var sign = attachedSign.substring(5, end - 1);
		// 如果没找，则没有签名结尾
		if (end < 0) {
			return false;
		}
		// 获得sha-1
		//var sha1 = this.sha1(trans);
		var sha1 = this.sha1(trans);
		var signSha = this.OpenCryptDecrypt(sign);
		if (sha1 == signSha) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 获取原始报文
	 */
	this.getStandardData = function (obj, verifysign) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return false;
		}
		// 获得最后一个<!--的位置
		var begin = obj.lastIndexOf("<!-- ");
		// 如果没找到，则没有签名
		if (begin < 0) {
			return "签名信息失败";
		}
		// 获得原始报文
		var trans = obj.substring(0, begin);
		// 如果不验证电子签名，则直接返回原始报文
		if (verifysign == false) {
			return trans;
		}
		// 获得电子签名域
		var attachedSign = obj.substring(begin, obj.length);
		var end = attachedSign.indexOf("-->");
		// 截取电子签名
		var sign = attachedSign.substring(5, end - 1);
		// 如果没找，则没有签名结尾
		if (end < 0) {
			return "签名信息失败";
		}
		// 获得sha-1
		var sha1 = this.sha1(trans);
		var signSha = this.OpenCryptDecrypt(sign);
		if (sha1 == signSha) {
			return trans;
		} else {
			return "签名信息失败";
		}

	}
	/**
	 * 验签(简单签名)
	 * @param xml
	 */
	this.verifyAttachedSimpleSign = function (obj) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return false;
		}
		// 获得最后一个<!--的位置
		var begin = obj.lastIndexOf("<!-- ");
		// 如果没找到，则没有签名
		if (begin < 0) {
			return false;
		}
		// 获得原始报文
		var trans = obj.substring(0, begin);
		// 获得电子签名域
		var attachedSign = obj.substring(begin, obj.length);
		var end = attachedSign.indexOf("-->");
		// 截取电子签名
		var sign = attachedSign.substring(5, end - 1);
		// 如果没找，则没有签名结尾
		if (end < 0) {
			return false;
		}
		// 获得sha-1
		var sha1 = this.sha1(trans);
		var signSha = this.SimpleDecrypt(sign);
		if (sha1 == signSha) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 获取原始报文
	 */
	this.getSimpleData = function (obj, verifysign) {
		if (typeof obj == "undefined" || obj == null || obj == "") {
			return false;
		}
		// 获得最后一个<!--的位置
		var begin = obj.lastIndexOf("<!-- ");
		// 如果没找到，则没有签名
		if (begin < 0) {
			return "签名信息失败";
		}
		// 获得原始报文
		var trans = obj.substring(0, begin);
		// 如果不验证电子签名，则直接返回原始报文
		if (verifysign == false) {
			return trans;
		}
		// 获得电子签名域
		var attachedSign = obj.substring(begin, obj.length);
		var end = attachedSign.indexOf("-->");
		// 截取电子签名
		var sign = attachedSign.substring(5, end - 1);
		// 如果没找，则没有签名结尾
		if (end < 0) {
			return "签名信息失败";
		}
		// 获得sha-1
		var sha1 = this.sha1(trans);
		var signSha = this.SimpleDecrypt(sign);
		//由于跟后端加密算法问题字符串先反转
		signSha = signSha.split("").reverse().join("");
		if (sha1 == signSha) {
			return trans;
		} else {
			return "签名信息失败";
		}

	}
	/**
	 * 标准加密(公钥加密)
	 */
	this.OpenCryptEncrypt = function (sign) {
		var Encrypt = new JSEncrypt();
		Encrypt.setPublicKey(this.getPublickey());
		var enc = Encrypt.encrypt(sign);
		return enc;
	}
	/**
	 * 标准解密(公钥解密)
	 */
	this.OpenCryptDecrypt = function (sign) {
		var Encrypt = new JSEncrypt();
		Encrypt.setPublicKey(this.getPublickey());
		var enc = Encrypt.decryptByPublicKey(sign);
		return enc;

	}
	/**
	  * 简单加密(公钥加密)
	  */
	this.SimpleEncrypt = function (sign) {
		var str = sign;
		//由于跟后端加密算法问题字符串先反转
		str = str.split("").reverse().join("");
		var rsakey = RSAUtils.getKeyPair(this.getPublicExponent(), "", this.getModulus());
		var enc = RSAUtils.encryptedString(rsakey, str);
		return enc;
	}
	/**
	 * 简单解密(公钥解密)
	 */
	this.SimpleDecrypt = function (sign) {
		var rsakey = RSAUtils.getKeyPair(this.getPublicExponent(), "", this.getModulus());
		var enc = RSAUtils.decryptedStringPub(rsakey, sign);
		return enc;

	}

	/**
	 * 判断获取body的logic单元
	 * @param paramsbody
	 */
	this.detectBodyLogics = function (paramsbody) {
		var result = [];
		var default_params = false;
		var body_properties = Object.getOwnPropertyNames(paramsbody);
		for (var i = 0; i < body_properties.length; i++) {
			if ((typeof paramsbody[body_properties[i]]) != 'object') {
				//存在不是obj的元素，则默认为default的参数内容
				default_params = true;
				break;
			}
		}
		if (default_params) {
			result.push({
				name: 'default',
				params: paramsbody
			});
		} else {
			body_properties.forEach((prop) => {
				result.push({
					name: prop,
					params: paramsbody[prop]
				});
			});
		}
		return result;

	}
	this.encodeUTF8 = function (s) {
		var i,
			r = [],
			c,
			x;
		for (i = 0; i < s.length; i++)
			if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
			else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F)); else {
				if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
					c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
						r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
				else r.push(0xE0 + (c >> 12 & 0xF));
				r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
			}
		;
		return r;
	}

	// 字符串加密成 hex 字符串
	this.sha1 = function (s) {
		var data = new Uint8Array(this.encodeUTF8(s))
		var i,
			j,
			t;
		var l = ((data.length + 8) >>> 6 << 4) + 16,
			s = new Uint8Array(l << 2);
		s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
		for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
		s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
		s[l - 1] = data.length << 3;
		var w = [],
			f = [
				function () {
					return m[1] & m[2] | ~m[1] & m[3];
				},
				function () {
					return m[1] ^ m[2] ^ m[3];
				},
				function () {
					return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
				},
				function () {
					return m[1] ^ m[2] ^ m[3];
				}
			],
			rol = function (n, c) {
				return n << c | n >>> (32 - c);
			},
			k = [1518500249, 1859775393, -1894007588, -899497514],
			m = [1732584193, -271733879, null, null, -1009589776];
		m[2] = ~m[0], m[3] = ~m[1];
		for (i = 0; i < s.length; i += 16) {
			var o = m.slice(0);
			for (j = 0; j < 80; j++)
				w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
					t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
					m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
			for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
		}
		;
		t = new DataView(new Uint32Array(m).buffer);
		for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

		var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
			return (e < 16 ? "0" : "") + e.toString(16);
		}).join("");
		return hex;
	}
}

export default Envelope;
