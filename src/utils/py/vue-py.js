 /**
  * @author 董珊珊
  * @create date: 2019/12/25
  * @version:
  * @modify	 	2019/12/25	董珊珊		无		拼音应用工具
  */

import { pinyin } from './pyconst.js';

export const vPinyin = {
  chineseToPinYin: function (l1) {
          var l2 = l1.length;
          var I1 = '';
          var reg = new RegExp('[a-zA-Z0-9]');
          for (var i = 0; i < l2; i++) {
              var val = l1.substr(i, 1);
              var name = vPinyin.arraySearch(val, pinyin);
              if (reg.test(val)) {
                  I1 += val;
              } else if (name !== false) {
                  I1 += name;
              }
          }
          I1 = I1.replace(/ /g, '-');
          while (I1.indexOf('--') > 0) {
              I1 = I1.replace('--', '-');
          }
          return I1;
    },
    arraySearch: function (l1, l2) {
        for (var name in pinyin) {
            if (pinyin[name].indexOf(l1) !== -1) {
                return vPinyin.ucfirst(name);
            }
        }
        return false;
    },
    ucfirst: function (l1) {
        if (l1.length > 0) {
            var first = l1.substr(0, 1).toUpperCase();
            var spare = l1.substr(1, l1.length);
            return first + spare;
        }
    },
    pinYinToSx:function (l1){
      let SX = '';
      for (var i = 0; i < l1.length; i++) {
        var c = l1.charAt(i);
        if (/^[A-Z]+$/.test(c)) {
           SX += c;
        }
        if (/^[0-9]+$/.test(c)) {
           SX += c;
        }
        if (/^_+$/.test(c)) {
           SX += c;
        }
      }
      return SX
    },
    chineseToPysx: function (l1) {
      let py = vPinyin.chineseToPinYin(l1)
      return vPinyin.pinYinToSx(py)
    }
}
