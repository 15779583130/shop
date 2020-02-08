var CommonService = {
  //获取客户端ip,目前只支持google Firefox
  getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
       iceServers: []
   }),
   noop = function() {},
   localIPs = {},
   ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
   key;

   function iterateIP(ip) {
       if (!localIPs[ip]) onNewIP(ip);
       localIPs[ip] = true;
  }

    //create a bogus data channel
   pc.createDataChannel("");

   // create offer and set local description
   pc.createOffer().then(function(sdp) {
       sdp.sdp.split('\n').forEach(function(line) {
           if (line.indexOf('candidate') < 0) return;
           line.match(ipRegex).forEach(iterateIP);
       });

       pc.setLocalDescription(sdp, noop, noop);
   }).catch(function(reason) {
       // An error occurred, so handle the failure to connect
   });

   //sten for candidate events
   pc.onicecandidate = function(ice) {
       if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
       ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
   };
},
  //生成32位key
  guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  /**
   * 脚本生成uuid
   */
  getuuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("").replace(/-/g, "");
    return uuid;
  },
  /**
   * 获取自定义时间
   * @param type 默认为当前日期（yyyy-MM-dd）
   * @param type "yyyyMMddhhmmss" -> 系统当前时间（相应的格式）
   * @param type "before7day" -> 当前时间前一周，即7天前（yyyy-MM-dd）
   * @param type "date1" -> 每月1日（yyyy-MM-dd）
   * */
  getMyDate(type = "nowDate") {
    var myDate = new Date();             // 获取系统当前时间
    var nowYear = myDate.getFullYear();  // 当前年份
    var nowMonth = myDate.getMonth() + 1;  // 当前月份
    var nowDate = myDate.getDate();      // 当前日期
    var nowHours = myDate.getHours();    // 当前时
    var nowMinutes = myDate.getMinutes();// 当前分
    var nowSeconds = myDate.getSeconds();// 当前秒
    var nowMillSeconds = myDate.getMilliseconds();
    // 月份、日期、时、分、秒不足两位数前面补0
    var nowMonthStr = nowMonth + "";
    var nowDateStr = nowDate + "";
    var nowHoursStr = nowHours + "";
    var nowMinutesStr = nowMinutes + "";
    var nowSecondsStr = nowSeconds + "";
    var nowMillSecondsStr = nowMillSeconds + "";
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonthStr = "0" + nowMonthStr;
    }
    if (nowDate >= 0 && nowDate <= 9) {
      nowDateStr = "0" + nowDateStr;
    }
    if (nowHours >= 0 && nowHours <= 9) {
      nowHoursStr = "0" + nowHoursStr;
    }
    if (nowMinutes >= 0 && nowMinutes <= 9) {
      nowMinutesStr = "0" + nowMinutesStr;
    }
    if (nowSeconds >= 0 && nowSeconds <= 9) {
      nowSecondsStr = "0" + nowSecondsStr;
    }
    if (nowSeconds >= 0 && nowSeconds <= 9) {
      nowSecondsStr = "0" + nowSecondsStr;
    }
    if (nowMillSeconds >= 0 && nowMillSeconds <= 9) {
      nowMillSecondsStr = "00" + nowMillSecondsStr;
    }
    if (nowMillSeconds >= 10 && nowMillSeconds <= 99) {
      nowMillSecondsStr = "0" + nowMillSecondsStr;
    }
    // 根据type返回值
    // 按格式返回当前时间
    if ("yyyy" == type) {
      return "" + nowYear;
    }
    if ("MM" == type) {
      return "" + nowMonthStr;
    }
    if ("dd" == type) {
      return "" + nowDateStr;
    }
    if ("hh" == type) {
      return "" + nowHours;
    }
    if ("mm" == type) {
      return "" + nowMinutes;
    }
    if ("ss" == type) {
      return "" + nowMinutes;
    }
    if ("SSS" == type) {
      return "" + nowMillSeconds;
    }
    if ("date1" == type) {
      return "" + nowYear + "-" + nowMonthStr + "-01";
    }
    if ("yyyy-MM-dd" == type || "nowDate" == type || "" == type) {
      return "" + nowYear + "-" + nowMonthStr + "-" + nowDateStr;
    }
    if ("yyyyMMdd" == type) {
      return "" + nowYear + nowMonthStr + nowDateStr;
    }
    if ("yyyyMMddhhmm" == type) {
      return "" + nowYear + nowMonthStr + nowDateStr + nowHoursStr + nowMinutesStr;
    }
    if ("yyyyMMddhhmmss" == type) {
      return "" + nowYear + nowMonthStr + nowDateStr + nowHoursStr + nowMinutesStr + nowSecondsStr;
    }
    if ("yyyyMMddhhmmssSSS" == type) {
      return "" + nowYear + nowMonthStr + nowDateStr + nowHoursStr + nowMinutesStr + nowSecondsStr + nowMillSecondsStr;
    }
    if ("yyyy-MM-dd hh:mm:ss" == type) {
      return "" + nowYear + "-" + nowMonthStr + "-" + nowDateStr + " " + nowHoursStr + ":" + nowMinutesStr + ":" + nowSecondsStr;
    }
    if ("before7day" == type) {
      var datetime = new Date(myDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      var month7 = datetime.getMonth() + 1;
      var date7 = datetime.getDate();
      var month7Str = month7 + "";
      var date7Str = date7 + "";
      if (month7 >= 1 && month7 <= 9) {
        month7Str = "0" + month7Str;
      }
      if (date7 >= 0 && date7 <= 9) {
        date7Str = "0" + date7Str;
      }
      return datetime.getFullYear() + "-" + month7Str + "-" + date7Str;
    }
    if ("before1year" == type) {
      var datetime = new Date();
      datetime.setFullYear(datetime.getFullYear() - 1);
      var month7 = datetime.getMonth() + 1;
      var date7 = datetime.getDate();
      var month7Str = month7 + "";
      var date7Str = date7 + "";
      if (month7 >= 1 && month7 <= 9) {
        month7Str = "0" + month7Str;
      }
      if (date7 >= 0 && date7 <= 9) {
        date7Str = "0" + date7Str;
      }
      return datetime.getFullYear() + "-" + month7Str + "-" + date7Str;
    }
  },
}

export default CommonService
