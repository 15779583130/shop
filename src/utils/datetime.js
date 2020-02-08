/**
 * 时间日期相关操作
 */

import {backupBaseUrl, baseUrl, reqService} from "./global";

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format(datetime) {
  return formatWithSeperator(datetime, "/", ":");
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator(datetime, dateSeprator, timeSeprator) {
  if (datetime != null) {
    const dateMat = new Date(datetime);
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    const hh = dateMat.getHours();
    const mm = dateMat.getMinutes();
    const ss = dateMat.getSeconds();
    const timeFormat = year + dateSeprator + month + dateSeprator + day + " " + hh + timeSeprator + mm + timeSeprator + ss;
    return timeFormat;
  }
}

/**
 * 当前日期倒退或增加计算
 * days为正则减,为负则加
 * 例当前日期:"2019-12-03"
 * days(1) "2019-12-02" days(-1) "2019-12-04"
 * @param datetime "2019-12-03"
 */
export function getSubDays(days) {
  const $nowTime = new Date();
  $nowTime.setTime($nowTime.getTime() - 24 * 60 * 60 * 1000 * days);
  let $newMonth = $nowTime.getMonth() + 1;
  if ($newMonth < 10) {
    $newMonth = '0' + $newMonth;
  }
  let $newDay = $nowTime.getDate();
  if ($newDay < 10) {
    $newDay = '0' + $newDay;
  }
  return $nowTime.getFullYear() + '-' + $newMonth + '-' + $newDay;
}

/**
 * 数据库返回时间格式化
 * 例当前日期:" 20191127160640956"
 * 格式化后显示2019-11-27 16:06:40
 * @param time "20191127160640956"
 */
export function timeFormat (time) {
  if(!time) return ''
  if(time.indexOf('-') != -1) return time
  const year = (time).substring(0, 4)
  const month = (time).substring(4, 6)
  const day = (time).substring(6, 8)
  var timeFormat ='';
  if(time.length<=8){
    timeFormat = year + '-' + month + '-' + day ;
  }else{
    const hh = (time).substring(8, 10)
    const mm = (time).substring(10, 12)
    const ss = (time).substring(12, 14)
    timeFormat = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
  }
  return timeFormat
}

/**
 * 数据库返回时间格式化
 * 例当前日期:" 20191127160640956"
 * 格式化后显示2019-11-27 16:06:40
 * @param time "20191127160640956"
 */
export function timeCompare (timeStr,timeEnd) {
  let obj = {
    status:true,
    msg:null
  }
  
  if(timeStr && timeEnd&& timeStr>timeEnd){
    obj = {
      status:false,
      msg:{message: '开始日期不能大于结束日期止，请重新选择', type: 'error'}
    }
  }
  return obj
}
