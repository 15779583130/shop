let authBtn = {
  resourceAccessMap: {
    // 首页-上传-删除-民警
    'fileDelHome': '/xtgl/syscfj/del',    // 删除
    'fileDwonLoadHome': '/xtgl/syscfj/download', // 下载
    'fileUploadHome': '/xtgl/syscfj/upload',  // 上传
    // 首页-上传-删除-仓管
    'fileDelHomeCg': '/xtgl/syscfj/del',    // 删除
    'fileDwonLoadHomeCg': '/xtgl/syscfj/download', // 下载
    'fileUploadHomeCg': '/xtgl/syscfj/upload',  // 上传
    // 系统管理-功能管理
    'cdglAdd': '/xtgl/cdgl/save', // 新增
    'cdglEdit': '/xtgl/cdgl/save', // 新增
    'cdglDel': '/xtgl/cdgl/del', // 删除
    'cdglSaveFunc': '/xtgl/cdgl/saveFunc', // 新增功能
    'cdglEditFunc': '/xtgl/cdgl/saveFunc', // 新增功能
    'cdglDelFunc': '/xtgl/cdgl/delFunc', // 删除功能
    // 系统管理-用户管理
    'yhglQuery': '/xtgl/yhgl/query', // 查询
    'yhglSave': '/xtgl/yhgl/save', // 新增
    'yhglEdit': '/xtgl/yhgl/save', // 编辑
    'yhglDel': '/xtgl/yhgl/del', // 删除
    // 系统管理-部门管理
    'bmglQuery': '/xtgl/bmgl/query', // 查询
    'bmglSave': '/xtgl/bmgl/save', // 新增
    'bmglEdit': '/xtgl/bmgl/save', // 编辑
    'bmglDel': '/xtgl/bmgl/del', // 删除
    // 系统管理-角色管理
    'jsglQuery': '/xtgl/jsgl/query', // 查询
    'jsglSave': '/xtgl/jsgl/save', // 新增
    'jsglEdit': '/xtgl/jsgl/save', // 编辑
    'jsglDel': '/xtgl/jsgl/del', // 删除
    'jsglResource': '/xtgl/jsgl/resource', // 分配资源
    // 系统管理-工作组管理
    'gzzQuery': '/xtgl/gzzgl/query', // 查询
    'gzzSaveUser': '/xtgl/gzzgl/save_user', // 新增组用户
    'gzzDelUser': '/xtgl/gzzgl/del_user', // 删除组用户
    'gzzsaveRole': '/xtgl/gzzgl/save_role', // 新增角色
    'gzzDelRole': '/xtgl/gzzgl/del_role', // 删除角色
    'gzzSave': '/xtgl/gzzgl/save', // 新增组
    'gzzEdit': '/xtgl/gzzgl/save', // 编辑组
    'gzzDel': '/xtgl/gzzgl/del', // 删除组
    // 系统管理-代码表
    'dmbglSave': '/xtgl/dmbgl/save', // 新增
    'dmbglEdit': '/xtgl/dmbgl/save', // 编辑
    'dmbglDel': '/xtgl/dmbgl/del', // 删除
    'dmbglAddtheme': '/xtgl/dmbgl/addtheme', // 新增树
    'dmbglSavetheme': '/xtgl/dmbgl/savetheme', // 编辑树
    'dmbglDeltheme': '/xtgl/dmbgl/savetheme', // 删除树
    // 系统管理-公告
    'ggBack': '/xtgl/gg/back', // 退回
    'ggAdd': '/xtgl/gg/add', // 新增
    'ggModify': '/xtgl/gg/modify', // 编辑
    'ggDel': '/xtgl/gg/del', // 删除
    // 案件管理-物证登记
    'anglwzdjXz': '/ajgl/ajdj/save', // 新增案件
    'ajbjEdit': '/ajgl/ajdj/updateaj', // 编辑案件
    'wzbjEdit': '/ajgl/ajdj/updatewz', // 编辑物证
    'wzbjDel': '/ajgl/ajdj/delete', // 删除案件
    // 案件管理-物证综合查询
    'wzzhcxdcexcel': '/ajgl/wzzh/dcexcel', // 导出
    'wzrz': '/ajgl/wzzh/wzlog', // 物证日志
    // 物证入库-入库申请
    'rksqAdd': '/wzrk/rksq/add', // 新增
    'rksqEdit': '/wzrk/rksq/edit', // 编辑
    'rksqDel': '/wzrk/rksq/del', // 删除,
    // 物证入库-入库台账
    'rktzexp': '/wzrk/rktz/exp', // 导出
    // 调用归-调用归还申请
    'dyghAdd': '/tygh/dyghsq/add', // 新增
    'dyghEdit': '/tygh/dyghsq/edit', // 编辑
    'dyghEel': '/tygh/dyghsq/add', // 导出
    'dyghGzcl': '/tygh/dyghsq/gzcl', // 跟踪处理
    // 物证移库-移库申请
    'yksqAdd': '/wzyk/yksq/add', // 新增
    'yksqEdit': '/wzyk/yksq/edit', // 编辑
    'yksqDel': '/wzyk/yksq/delete', // 删除
    'yksqeye': '/wzyk/yksq/eye', // 查看
    // 物证入库-移库确认
    'ykqrBack': '/wzyk/ykqr/back', // 驳回
    'ykqrQrsq': '/wzyk/ykqr/qrsq', // 确认申请
    'ykqrEye': '/wzyk/ykqr/edit', // 查看
    // 处置权移送-移送申请
    'yssqAdd': '/czqys/yssq/add', // 新增
    'yssqDel': '/czqys/yssq/delete', // 删除
    'yssqEdit': '/czqys/yssq/edit', // 编辑
    'yssqEye': '/czqys/yssq/eye', // 查看
    // 处置权移送-接收确认
    'jsqrQrsq': '/czqys/jsqr/qrsq', // 接收确认
    'jsqrBack': '/czqys/jsqr/back', // 退回
    'jsqrEye': '/czqys/jsqr/eye', // 查看
    // 处置权移送-处置权退回
    'czqthExp': '/czqys/czqth/export', // 导出
    'czqthEye': '/czqys/czqth/eye', // 查看
    'czqthBack': '/czqys/czqth/back', // 退回
    'czqthSearch': '/czqys/czqth/search', // 查询
    // 物证入库-移送台账
    'yktzExp': '/wzyk/yktz/export', // 移送台账
    // 承办登记管理-承办登记
    'cbdjEdit': '/cbdjgl/cbdj/edit', // 查询
    // 物证管理-入库交接
    'rkjjQrjj': '/wzgl/rkjj/rkjjwcqj', // 确认交接
    // 物证管理-入库交接台账
    // 'rkjjQrjj': '/wzgl/rkjj/rkjjwcqj', // 查询
    // 物证管理-出库交接
    'rkjjCkjjwc': '/wzgl/ckjj/ckjjwcqj', // 出库交接完成
    // 物证管理-入库登记
    'rkdjPrint': '/wzgl/rkdj/print', // 条码打印
    'rkdjSaverk': '/wzgl/rkdj/saverk', // 入库完成
    'rkdjSelectcfwz': '/wzgl/rkdj/selectcfwz', // 存放位置
    // 物证管理-导出台账
    'dctzExport': '/wzgl/dctz/export', // 导出台账
    'dctzPrint': '/wzgl/dctz/print', // 条码打印
    // 仓库管理-部门物证仓
    'bmwzcAdd': '/jcsjgl/bmckgl/cfck/add', // 增加
    'bmwzcModify': '/jcsjgl/bmckgl/cfck/modify', // 修改
    'bmwzcDel': '/jcsjgl/bmckgl/cfck/del', // 删除
    'bmwzcMrck': '/jcsjgl/bmckgl/cfck/mrck', // 设置默认仓库
    // 仓库管理-物证仓位
    'wzcwAdd': '/jcsjgl/bmckgl/cfwzgl/xz', // 增加
    // 财政票据-票据开具
    'pjkjAdd': '/czpj/pjkj/add', // 增加
    // 基础资料-预警策略配置
    'yjclpzAdd': '/jczl/yjclpz/add', // 增加
    'yjclpzDel': '/jczl/yjclpz/del', // 删除
    'yjclpzModify': '/jczl/yjclpz/modify', // 修改
    // 基础资料-任务配置流程
    'rwpzlcAdd': '/jczl/rwpzlc/add', // 增加
    'rwpzlcDel': '/jczl/rwpzlc/del', // 删除
    'rwpzlcModify': '/jczl/rwpzlc/modify', // 修改
    // 运维管理-反馈中心
    'fkzxAdd': '/ywgl/fkzx/add', // 增加
    'fkzxDel': '/ywgl/fkzx/del', // 删除
    'fkzxModify': '/ywgl/fkzx/modify', // 修改
    'fkzxSearch': '/ywgl/fkzx/search', // 查询
    'fkzxHf': '/ywgl/fkzx/hf', // 回复
    'fkzxTjhf': '/ywgl/fkzx/tjhf', // 提交回复
    'fkzxTjfk': '/ywgl/fkzx/tjfk', // 提交反馈
    // 处置管理-处置登记
    'czdjAdd': '/czgl/czdj/add', // 增加
    'czdjel': '/czgl/czdj/del', // 删除
    'czdjModify': '/czgl/czdj/modify', // 修改
    // 处置管理-处置审批
    'czspModify': '/czgl/czdj/modify', // 修改
    // 处置管理-最终处置登记
    'zzczdjModify': '/czgl/zzczdj/modify', // 修改
    // 处置管理-最终处置登记
    'cztzExport': '/czgl/cztz/export', // 导出
  }
}
export default authBtn
