import JSEncrypt from 'JSEncrypt'
import RSAUtils from 'RSAUtils'

var Encrypt = {
  /**
   * 加密参数配置
   */
  ENCRYPT: "simple",//simple,standard,none
  /**
   * 获取公钥
   */
  getPublickey() {
    var key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvXpKVh6/RMd/GZU7SyWVfBeqanGNnEhk3B2lDJZ1z6eIFOJVL3Ke2OcF2Ah/Y6zgcb5a056MWhHnLLp29/0rJL/D7TCpWP2XkKXwE8p1fPmEfQ7V8mNgjifpL2dIsibgCCVYRtqRGS5TOpUYJ76KFPy/JVIypfEzuT9xbNjmbUQIDAQAB";
    return key;
  }
  ,
  /**
   * n(pq值)
   */
  getModulus() {
    var _modulus = "b90b5ac267907afaa34fe5f38d90e9bafd5a0134701c222c45e1ff9690e7ce48360f8bcbef5070a640464350e505bcce810cdad808f6e4e8d133446a07548afcddb6b95acfc793c4125266764742747c81dddef35eac62e5d31f89f1d0373f28427eb66dc8941f1beafe4ed722db0d4ef0036ed5888d31d2a855b9fde13c7bf7";
    return _modulus;
  }
  ,
  /**
   * e(公钥指数)
   */
  getPublicExponent() {
    var _public_exponent = "10001";
    return _public_exponent;
  },
  /**
   * 标准加签
   * @param xml
   */
  attchSignByStandard(xml) {
    //var sign = sha1(xml);
    var sign = this.sha1(xml);
    //采用标准加密算法
    sign = this.OpenCryptEncrypt(sign);
    return xml + "<!-- " + sign + " -->";
  }
  ,
  /**
   * 简要加签
   * @param xml
   */
  attchSignBySimple(xml) {
    var sign = this.sha1(xml);
    //采用标准加密算法
    sign = this.SimpleEncrypt(String(sign)).toUpperCase();
    return xml + "<!-- " + sign + " -->";
  }
  ,
  /**
   * 验签(标准签名)
   * @param xml
   */
  verifyAttachedStandardSign(obj) {
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
    //var sha1 = sha1(trans);
    var sha1 = this.sha1(trans);
    var signSha = this.OpenCryptDecrypt(sign);
    if (sha1 == signSha) {
      return true;
    } else {
      return false;
    }
  }
  ,
  /**
   * 获取原始报文
   */
  getStandardData(obj, verifysign) {
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
  ,
  /**
   * 验签(简单签名)
   * @param xml
   */
  verifyAttachedSimpleSign(obj) {
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
  ,
  /**
   * 获取原始报文
   */
  getSimpleData(obj, verifysign) {
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
  ,
  /**
   * 标准加密(公钥加密)
   */
  OpenCryptEncrypt(sign) {
    var Encrypt = new JSEncrypt();
    Encrypt.setPublicKey(this.getPublickey());
    var enc = Encrypt.encrypt(sign);
    return enc;
  }
  ,
  /**
   * 标准解密(公钥解密)
   */
  OpenCryptDecrypt(sign) {
    var Encrypt = new JSEncrypt();
    Encrypt.setPublicKey(this.getPublickey());
    var enc = Encrypt.decryptByPublicKey(sign);
    return enc;

  }
  ,
  /**
   * 简单加密(公钥加密)
   */
  SimpleEncrypt(sign) {
    var str = sign;
    //由于跟后端加密算法问题字符串先反转
    str = str.split("").reverse().join("");
    var rsakey = RSAUtils.getKeyPair(this.getPublicExponent(), "", this.getModulus());
    var enc = RSAUtils.encryptedString(rsakey, str);
    return enc;
  }
  ,
  /**
   * 简单解密(公钥解密)
   */
  SimpleDecrypt(sign) {
    var rsakey = RSAUtils.getKeyPair(this.getPublicExponent(), "", this.getModulus());
    var enc = RSAUtils.decryptedStringPub(rsakey, sign);
    return enc;
  }
  ,
  encodeUTF8(s) {
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
  },
  /**
   * sha1算法
   */
  sha1(s) {
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
export default Encrypt;
