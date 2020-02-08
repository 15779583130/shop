export const downLoadFile = function (url) {
//   debugger
//   let downloadFileUrl = url
//   let elemIF = document.createElement("iframe");
//   elemIF.src = downloadFileUrl;
//   elemIF.style.display = "none";
//   document.body.appendChild(elemIF);

  if (url.split('.')[url.split('.').length - 1] === 'jpg' || url.split('.')[url.split('.').length - 1] === 'jpeg'
  || url.split('.')[url.split('.').length - 1] === 'png' || url.split('.')[url.split('.').length - 1] === 'git') {
    window.open(url)
  } else {
    let downloadFileUrl = url
    let elemIF = document.createElement("iframe");
    elemIF.src = downloadFileUrl;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
    // var a = document.createElement('a');          // 创建一个a节点插入的document
    // var event = new MouseEvent('click')           // 模拟鼠标click点击事件
    // a.download = url.split('.')[url.split('.').length - 2].split('/')[url.split('.')[url.split('.').length - 2].split('/').length - 1]                  // 设置a节点的download属性值
    // a.href = url;                                 // 将图片的src赋值给a节点的href
    // a.dispatchEvent(event)
  }
}
