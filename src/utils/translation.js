export const translation = function (str) {// 转义
  let escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;'
    }
  return String(str).replace(/&(?!\w+;)|[<>"']/g, function (s) {
    return escapeMap[s] || s
  })
}

export const unescapeHTML = function (str) {  // 反转义
  str = "" + str;
  return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
