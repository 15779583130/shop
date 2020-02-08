import Main from '../views/Main'

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('../views/error-page/404.vue')
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('../views/error-page/403.vue')
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('../views/error-page/500.vue')
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  redirect: '/home',
  children: [
    {path: '/home', title: {i18n: 'home'}, name: 'home_index', component: () => import('../views/home/home.vue')}]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    children: [
      { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('../views/error-page/error-page.vue') }
    ]
  },
  {
    path: '/systemManage',
    title: '系统管理',
    name: 'systemManage',
    component: Main,
    children: [
      {path: '/menuManage', title: '功能管理', name: 'menuManage', component: () => import('../views/system/menuManage/menuManage')},
      {path: '/userManage', title: '用户管理', name: 'userManage', component: () => import('../views/system/userManage/userManageList')},
      {path: '/codeManage', title: '代码表', name: 'codeManage', component: () => import('../views/system/codeManage/codeManage')},
      {path: '/flowManage', title: '流程配置', name: 'flowManage', component: () => import('../views/system/flowManage/flowManage')},
      {path: '/dsrwManage', title: '定时任务', name: 'dsrwManage', component: () => import('../views/system/dsrwManage/dsrwManage')},
      {path: '/bdsscqManage', title: '表单式生成器', name: 'bdsscqManage', component: () => import('../views/system/bdsscqManage/bdsscqManage')},
      {path: '/bmManage', title: '部门管理', name: 'bmManage', component: () => import('../views/system/bmManage/bmManageList')},
      {path: '/bmManage/addBm', title: '添加部门', name: 'addBm', component: () => import('../views/system/bmManage/addBm')},
      {path: '/bmManage/editBm', title: '编辑部门', name: 'editBm', component: () => import('../views/system/bmManage/editBm')},
      {path: '/roleManage', title: '角色管理', name: 'roleManage', component: () => import('../views/system/roleManage/roleManage')},
      {path: '/userManage/addUser', title: '添加用户', name: 'addUser', component: () => import('../views/system/userManage/addUser')},
      {path: '/userManage/userDetail/:id', title: '用户详情', name: 'userDetail', component: () => import('../views/system/userManage/userDetail')},
      {path: '/groupManage', title: '工作组管理', name: 'groupManage', component: () => import('../views/system/groupManage/groupManage')},
      {path: '/ywrzCx/ywrzCx', title: '业务日志', name: 'ywrzCx', component: () => import('../views/system/ywrzCx/ywrzCx')},
      {path: '/jyrzCx/jyrzCx', title: '交易日志', name: 'jyrzCx', component: () => import('../views/system/jyrzCx/jyrzCx')},
      {path: '/jyrzCx/fhbw', title: '返回报文', name: 'fhbw', component: () => import('../views/system/jyrzCx/fhbw')},
      {path: '/userManage/changeUserPassword/:username', title: '修改用户密码', name: 'changeUserPassword', component: () => import('../views/system/userManage/userChangePassword')},
      {path: '/roleManage/addRole', title: '角色添加', name: 'addRole', meta: {keepAlive: true}, component: () => import('../views/system/roleManage/addRole')},
      {path: '/roleManage/editRole/:id', title: '角色编辑', name: 'editRole', component: () => import('../views/system/roleManage/editRole')},
      {path: '/roleManage/detailRole/:id', title: '角色详情', name: 'detailRole', component: () => import('../views/system/roleManage/detailRole')},
      {path: '/permissionManage', title: '权限管理', name: 'permissionManage', component: () => import('../views/system/permissionManage/permissionManage')},
      {path: '/cardBinInfoList', title: '工作组管理', name: 'cardBinInfoList', component: () => import('../views/system/cardBinInfo/cardBinInfoList')},
      {path: '/cardBinInfoDetail/:id', title: '卡Bin详情', name: 'cardBinInfoDetail', component: () => import('../views/system/cardBinInfo/cardBinInfoDetail')},
      {path: '/addCardBinInfo', title: '新增卡Bin', name: 'addCardBinInfo', component: () => import('../views/system/cardBinInfo/addCardBinInfo')},
      {path: '/editCardBinInfo', title: '编辑卡Bin', name: 'editCardBinInfo', component: () => import('../views/system/cardBinInfo/editCardBinInfo')},
      {path: '/importCardBinInfo', title: '导入卡Bin', name: 'importCardBinInfo', component: () => import('../views/system/cardBinInfo/importCardBin')},
      {path: '/channelRespcodeList', title: '错误码管理', name: 'channelRespcodeList', component: () => import('../views/system/channelRespcode/channelRespcodeList')},
      {path: '/addChannelRespcode', title: '新增错误码', name: 'addChannelRespcode', component: () => import('../views/system/channelRespcode/addChannelRespcode')},
      {path: '/ggmanage', title: '公告', name: 'ggmanage', component: () => import('../views/system/ggmanage/ggmanage')},
       {path: '/ckggmanage', title: '查看公告', name: 'ckggmanage', component: () => import('../views/system/ckggmanage/ckggmanage')},
        {path: '/fwwgpzManage', title: '服务网关配置', name: 'fwwgpzManage', component: () => import('../views/system/fwwgpzManage/fwwgpzManage')},
       {path: '/qjcsMannage', title: '全局参数管理', name: 'qjcsMannage', component: () => import('../views/system/qjcsManage/qjcsManage')},
        {path: '/jmgjManage', title: '加密工具', name: 'jmgjManage', component: () => import('../views/system/jmgjManage/jmgjManage')}
    ]
  },
  {
    path: '/industry',
    title: '案件管理',
    name: 'industry',
    component: Main,
    children: [
      {path: 'industryList', title: '物证登记', name: 'industryList', component: () => import('../views/caseManage/wzdj/Wzdj')},
      {path: 'addIndustry', title: '新增案件物证信息', name: 'addIndustry', component: () => import('../views/caseManage/wzdj/addWzdj')},
      {path: 'editIndustry', title: '编辑案件物证信息', name: 'editIndustry', component: () => import('../views/caseManage/wzdj/editWzdj')},
      {path: 'feeAcountList', title: '物证综合查询', name: 'feeAcountList', component: () => import('../views/industry/feeAcountSet/feeAcountInfo')}, // 物证综合
      {path: 'listWhiteList', title: '案件查询', name: 'listWhiteList', keepAlive: false, component: () => import('../views/industry/whiteList/infoWhiteList')}, // 案件查询
      {path: 'whiteListPaymentsList', title: '查看案件详情', name: 'whiteListPaymentsList', component: () => import('../views/industry/whiteList/whiteListPayments')} // 查看案件详情
    ]
  },
  {
    path: '/organization',
    title: '物证入库',
    name: 'organization',
    component: Main,
    children: [
      {path: 'list', title: '入库申请', name: 'organizationManageList', component: () => import('../views/wzrk/rksq/rksqManage')},
      {path: 'rktz', title: '入库台账', name: 'productManageListRuku', component: () => import('../views/wzrk/rktz/Rktz')},
      {path: 'addOrganization', title: '新增入库申请信息', name: 'addOrganization', component: () => import('../views/wzrk/rksq/editRksq')},
      {path: 'editOrganization', title: '编辑入库申请信息', name: 'editOrganization', component: () => import('../views/wzrk/rksq/editRksq')},
      {path: 'viewOrganization', title: '查看入库申请信息', name: 'viewOrganization', component: () => import('../views/wzrk/rksq/viewRksq')},
      {path: 'organizationDetail/:id', title: '全案预览', name: 'organizationDetail', component: () => import('../views/wzyk/components/qayl')} // 全案预览
    ]
  },
  {
    path: '/productManage',
    title: '调用归还',
    name: 'productManage',
    component: Main,
    children: [
      {path: 'list', title: '调用归还申请', name: 'productManageList', component: () => import('../views/dygh/dyghsq/dyghsqManager')},
      {path: 'addProduct', title: '调用归还编辑', name: 'addProduct', component: () => import('../views/dygh/dyghsq/dyghsqEdit')},
      {path: 'editProduct', title: '调用归还查看', name: 'editProduct', component: () => import('../views/dygh/dyghsq/dyghsqView')},
      {path: 'dytzManger', title: '调用归还台账', name: 'dytzManger', component: () => import('../views/dygh/dyghtz/dyghtzManager')}]
  },
  {
    path: '/wzyk',
    title: '物证移库',
    name: 'wzykManage',
    component: Main,
    children: [
      {path: 'yksqlist', title: '移库申请', name: 'yksqManageList', component: () => import('../views/wzyk/yksq/Yksq')},
      {path: 'addYksq', title: '添加移库申请', name: 'addYksq', component: () => import('../views/wzyk/yksq/addYksq')},
      {path: 'editYksq', title: '编辑移库申请信息', name: 'editYksq', component: () => import('../views/wzyk/yksq/editYksq')},
      {path: 'Yksqinfo', title: '移库申请信息', name: 'Yksqinfo', component: () => import('../views/wzyk/yksq/viewYksq')},
      {path: 'qayl', title: '全案预览', name: 'qayl', component: () => import('../views/wzyk/components/qayl')},
      {path: 'editFee/:id', title: '编辑手续费模板', name: 'editFee', component: () => import('../views/wzyk/editFee')},
      {path: 'feeDetail/:id', title: '手续费模板详情', name: 'feeDetail', component: () => import('../views/wzyk/feeDetail')},
      {path: 'ykqrlist', title: '移库确认', name: 'ykqrManageList', component: () => import('../views/wzyk/ykqr/Ykqr')},
      {path: 'jsqrDetail', title: '接收确认详细信息', name: 'jsqrDetail', component: () => import('../views/wzyk/ykqr/jsqrDetail')},
      {path: 'yktzlist', title: '移库台账', name: 'yktzManageList', component: () => import('../views/wzyk/yktz/Yktz')},
      {path: 'Yktzinfo/:ywzb_id', title: '移库台账信息', name: 'Yktzinfo', component: () => import('../views/wzyk/yktz/Yktzinfo')}
    ]
  },
  {
    path: '/channel',
    title: '承办登记管理',
    name: 'channelManage',
    component: Main,
    children: [
      {path: 'list', title: '承办登记', name: 'channelManageList', component: () => import('../views/cbdj/CbdjManager')},
      {path: 'addChannel', title: '承办登记编辑', name: 'addChannel', component: () => import('../views/cbdj/Cbdjedit')}
    ]
  },
  {
    path: '/tradeFlowManage',
    title: '处置权移送',
    name: 'tradeFlowManage',
    component: Main,
    children: [
      {path: 'list', title: '移送申请', name: 'tradeFlows', component: () => import('../views/czqys/yssq/yssqManage')},
      {path: 'edit', title: '编辑移送申请', name: 'edit', component: () => import('../views/czqys/yssq/editYssq')},
      {path: 'viewYssq', title: '查看移送申请', name: 'viewYssq', component: () => import('../views/czqys/yssq/viewYssq')},
      {path: 'jsqrManager', title: '接收确认', name: 'jsqrManager', component: () => import('../views/czqys/jsqr/jsqrManage')},
      {path: 'jsqrEdit', title: '接收确认详情信息', name: 'jsqrEdit', component: () => import('../views/czqys/jsqr/jsqrEdit')},
      {path: 'ystzView', title: '移送台账', name: 'ystzView', component: () => import('../views/czqys/ystz/ystzManage')},
      {path: 'czqthManager', title: '处置权退回', name: 'czqthManager', component: () => import('../views/czqys/czqth/czqthManage')},
      {path: 'czqthtzManager', title: '处置权退回台账', name: 'czqthtzManager', component: () => import('../views/czqys/czqthtz/czqthtzManage')},
      {path: 'viewCzqthtz', title: '处置权退回台账详细信息', name: 'viewCzqthtz', component: () => import('../views/czqys/czqthtz/viewCzqthtz')}
      // {path: 'listSplitInfoDetail', title: '关联支付流水查询', name: 'listSplitInfoDetail', component: () => import('../views/tradeFlow/listSplitInfoDetail')}
    ]
  },
  {
    path: '/settle',
    title: '仓库管理',
    name: 'settle',
    component: Main,
    children: [
      {path: 'bmwzcList', title: '部门物证仓', name: 'bmwzcQuery', component: () => import('../views/ckgl/bmckgl/bmwzc/Bmwzc')},
      {path: 'wzcwList', title: '物证仓位', name: 'wzcwQuery', component: () => import('../views/ckgl/bmckgl/wzcw/Wzcw')},
      {path: 'addBmwzc', title: '新增仓库信息', name: 'addBmwzc', component: () => import('../views/ckgl/bmckgl/bmwzc/Addck')},
      //{path: 'errList', title: '部门仓库管理', name: 'errorQuery', component: () => import('../views/reconciliations/errorQuery')}
    ]
  },
  {
    path: '/accountManage',
    title: '物证管理',
    name: 'accountManage',
    component: Main,
    children: [
      {path: 'accountList', title: '入库交接', name: 'accountList', component: () => import('../views/materialEvidenceManage/entryTransfer')},
      {path: 'accountFrozenThawList', title: '入库交接台账', name: 'accountFrozenThawList', component: () => import('../views/materialEvidenceManage/entryTransferAccount')},
      {path: 'setFee', title: '出库交接', name: 'setFee', component: () => import('../views/materialEvidenceManage/outgoingTransfer')},
      {path: 'accountDetail', title: '出库交接台账', name: 'accountDetail', component: () => import('../views/materialEvidenceManage/outgoingTransferAccount')},
      {path: 'accountDetailTwo', title: '入库登记', name: 'accountDetailTwo', component: () => import('../views/materialEvidenceManage/entryRegistration')},
      {path: 'capitalAcountDetail', title: '入库登记台账', name: 'capitalAcountDetail', component: () => import('../views/materialEvidenceManage/entryRegistrationAcount')}
    ]
  },
  {
    path: '/czpj',
    title: '财政票据',
    name: 'czpj',
    component: Main,
    children: [
      {path: '/czpj/pjkj', title: '票据开具', name: 'pjkj', component: () => import('../views/czpj/pjkj/Pjkj')},
      {path: '/czpj/pjkjview/:id', title: '罚没票据信息查看', name: 'pjkjview', component: () => import('../views/czpj/pjkj/Pjkjview')},
      {path: '/czpj/pjkjkp/:id', title: '罚没票据开票', name: 'pjkjkp', component: () => import('../views/czpj/pjkj/Pjkjkp')},
      {path: '/czpj/zkkj', title: '暂扣开具', name: 'zkkj', component: () => import('../views/czpj/zkkj/Zkkj')},
      {path: '/czpj/pjsy', title: '票据使用', name: 'pjsy', component: () => import('../views/czpj/pjsy/PjsyManager')},
      {path: '/czpj/zkkjnew', title: '暂扣开具', name: 'zkkjnew', component: () => import('../views/czpj/zkkjnew/Zkkjnew')},
      {path: '/czpj/zkkjview/:id', title: '暂扣开具信息查看', name: 'zkkjview', component: () => import('../views/czpj/zkkjnew/ZkkjView')},
      {path: '/czpj/zkkjkp/:id', title: '暂扣开具开票', name: 'zkkjkp', component: () => import('../views/czpj/zkkjnew/ZkkjKp')}
    ]
  },
  {
    path: '/rwgz',
    title: '任务跟踪',
    name: 'rwgz',
    component: Main,
    children: [
      {path: 'rwgzcx', title: '任务跟踪查询', name: 'rwgzcx', component: () => import('../views/rwgz/rwgzcx')},
      {path: 'rwgzyl', title: '任务跟踪预览', name: 'rwgzyl', component: () => import('../views/rwgz/rwgzyl-sample')}
      ]
  },
  {
    path: '/wzbgzx',
    title: '物证保管中心',
    name: 'wzbgzx',
    component: Main,
    children: [
      {path: 'wlry', title: '从业人员管理', name: 'wlry', component: () => import('../views/wlgl/wlry/Wlry')},
      {path: 'wlcl', title: '车辆信息管理', name: 'wlcl', component: () => import('../views/wlgl/wlcl/wlclManager')},

    ]
  },
  {
    path: '/jczl',
    title: '基础资料',
    name: 'jczl',
    component: Main,
    children: [
      {path: 'yjclpz', title: '预警策略配置', name: 'yjclpz', component: () => import('../views/jczl/yjclpz/YjclpzManager')},
      {path: 'wzlb', title: '物证类别', name: 'wzlb', component: () => import('../views/jczl/wzlb/WzlbManager')},
      {path: 'rwlcpz', title: '任务流程配置', name: 'rwlcpz', component: () => import('../views/jczl/rwlcpz/rwlcpzManager')}

    ]
  },
  {
    path: '/ywgl',
    title: '运维管理',
    name: 'ywgl',
    component: Main,
    children: [
      {path: 'fkzx', title: '反馈中心', name: 'fkzx', component: () => import('../views/ywgl/fkzx/fkzxManager')},
      {path: 'addfk', title: '反馈信息', name: 'addfk', component: () => import('../views/ywgl/fkzx/addFk')},
      {path: 'fkhf', title: '反馈回复', name: 'fkhf', component: () => import('../views/ywgl/fkzx/fkzx')},
      {path: 'fkck', title: '反馈查看', name: 'fkck', component: () => import('../views/ywgl/fkzx/fkzx')}


    ]
  },
  {
    path: '/czgl',
    title: '处置管理',
    name: 'czgl',
    component: Main,
    children: [
      {path: 'czdj', title: '处置登记', name: 'czdj', component: () => import('../views/czgl/czdj/czdjManager')},
      {path: 'czsp', title: '处置审批', name: 'czsp', component: () => import('../views/czgl/czsp/Czsp')},
      {path: 'czdjEdit', title: '处置申请编辑', name: 'czdjEdit', component: () => import('../views/czgl/czdj/czdjEdit')},
      {path: 'czdjView', title: '处置申请查看', name: 'czdjView', component: () => import('../views/czgl/czdj/czdjView')},
      {path: 'zzczdj', title: '最终处置登记', name: 'zzczdj', component: () => import('../views/czgl/zzczdj/zzczdj')},
      {path: 'cztz', title: '处置台账', name: 'cztz', component: () => import('../views/czgl/cztz/cztzManager')},
      {path: 'zkwzcz', title: '暂扣物资处置', name: 'zkwzcz', component: () => import('../views/czgl/zkwzcz/zkwzczManager')},
      {path: 'zkwzczEdit', title: '暂扣物资处置申请编辑', name: 'zkwzczEdit', component: () => import('../views/czgl/zkwzcz/zkwzczEdit')},
      {path: 'zkwzczView', title: '暂扣物资处置申请查看', name: 'zkwzczView', component: () => import('../views/czgl/zkwzcz/zkwzczView')}
    ]
  },
{
  path: '/jkfw',
    title: '接口服务',
  name: 'jkfw',
  component: Main,
  children: [
  {path: 'jkpzzygl', title: '接口配置资源管理', name: 'jkzypz', component: () => import('../views/jkfw/jkpzzygl/jkpzzygl')},
  {path: 'jkdyrzcx', title: '接口调用日志查询', name: 'jkdyrzcx', component: () => import('../views/jkfw/jkdyrzcx/jkdyrzcx')},
  {path: 'dwjksqpz', title: '对外接口授权配置', name: 'dwjksqpz', component: () => import('../views/jkfw/dwjksqpz/dwjksqpz')},
  {path: 'dsfjkpz', title: '第三方接口资源配置', name: 'dsfjkpz', component: () => import('../views/jkfw/dsfjkpz/dsfjkpz')},
  {path: 'dsfjkpzInfo', title: '第三方单位配置明细信息', name: 'dsfjkpzInfo', component: () => import('../views/jkfw/dsfjkpz/dsfjkpzInfo')}


]
},

  {
    path: '/jrgl',
    title: '接入管理',
    name: 'jrgl',
    component: Main,
    children: [
      {path: 'jkrz', title: '接口日志', name: 'jkrz', component: () => import('../views/jrgl/jkrz')}
    ]
  },
  {
    path: '/tjfx',
    title: '统计分析',
    name: 'tjfx',
    component: Main,
    children: [
      {path: 'ccfx', title: '仓储分析', name: 'ccfx', component: () => import('../views/tjfx/ccfx/ccfxManager')}
    ]
  },

]

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('../views/login/login.vue')
}

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('../views/main-components/lockscreen/components/locking-page.vue')
}

export const routers = [
  ...appRouter,
  otherRouter,
  loginRouter,
  locking,
  page500,
  page403,
  page404
]
