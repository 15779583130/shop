let authMenu = {
  menuList: [
    {
      icon: 'sys',
      title: '系统管理',
      access: '/xtgl',
      name: 'systemManage',
      children: [
        {access: '/xtgl/cdgl', icon: 'sys', title: '功能管理', name: 'menuManage'},
        {access: '/xtgl/yhgl', icon: 'sys', title: '用户管理', name: 'userManage'},
        {access: '/xtgl/bmgl', icon: 'sys', title: '部门管理', name: 'bmManage'},
        {access: '/xtgl/jsgl', icon: 'sys', title: '角色管理', name: 'roleManage'},
        {access: '/xtgl/zgl', icon: 'sys', title: '工作组管理', name: 'groupManage'},
        {access: '/xtgl/dmbgl', icon: 'sys', title: '代码表', name: 'codeManage'},
        {access: '/xtgl/flow', icon: 'sys', title: '流程配置', name: 'flowManage'},
        {access: '/xtgl/ywrzcx', icon: 'sys', title: '业务日志', name: 'ywrzCx'},
         {access: '/xtgl/jyrzcx', icon: 'sys', title: '交易日志', name: 'jyrzCx'},
        {access: '/xtgl/gg', icon: 'sys', title: '公告', name: 'ggmanage'},
        {access: '/xtgl/ckgg', icon: 'sys', title: '查看公告', name: 'ckggmanage'},
        {access: '/xtgl/qjcsgl', icon: 'sys', title: '全局参数管理', name: 'qjcsMannage'},
        {access: '/xtgl/dsrw', icon: 'sys', title: '定时任务', name: 'dsrwManage'},
        {access: '/xtgl/bdsscq', icon: 'sys', title: '表单式生成器', name: 'bdsscqManage'},
        {access: '/xtgl/dlrzcx', icon: 'sys', title: '登录日志查询管理', name: 'drrzManage'},
        {access: '/xtgl/jmgj', icon: 'sys', title: '加密工具', name: 'jmgjManage'} ,
         {access: '/xtgl/fwwgpz', icon: 'sys', title: '服务网关配置', name: 'fwwgpzManage'}
      ]
    },
    {
      icon: 'org',
      title: '案件管理',
      access: '/ajgl',
      name: 'industry',
      children: [
        {access: '/ajgl/ajdj', icon: 'org', title: '物证登记', name: 'industryList'},
        {access: '/ajgl/wzzh', icon: 'org', title: '物证综合查询', name: 'feeAcountList'},
        {access: '/ajgl/ajcx', icon: 'org', title: '案件查询', name: 'listWhiteList'}
      ]
    },
    {
      icon: 'pay',
      title: '物证入库',
      access: '/wzrk',
      name: 'organization',
      children: [
        {access: '/wzrk/rksq', icon: 'pay', title: '入库申请', name: 'organizationManageList'},
        {access: '/wzrk/rktz', icon: 'pay', title: '入库台账', name: 'productManageListRuku'}
      ]
    },
    {
      icon: 'product',
      title: '调用归还',
      access: '/tygh',
      name: 'productManage',
      children: [
        {access: '/tygh/dyghsq', icon: 'product', title: '调用归还申请', name: 'productManageList'},
        {access: '/tygh/dyghtz', icon: 'product', title: '调用归还台账', name: 'dytzManger'}
      ]
    },
    {
      icon: 'trade',
      title: '物证移库',
      access: '/wzyk',
      name: 'wzykManage',
      children: [
        {access: '/wzyk/yksq', icon: 'trade', title: '移库申请', name: 'yksqManageList'},
        {access: '/wzyk/ykqr', icon: 'trade', title: '移库确认', name: 'ykqrManageList'},
        {access: '/wzyk/yktz', icon: 'trade', title: '移库台账', name: 'yktzManageList'}
      ]
    },
    {
      icon: 'pass',
      title: '处置权移送',
      name: 'tradeFlowManage',
      access: '/czqys',
      children: [
        {access: '/czqys/yssq', icon: 'pass', title: '移送申请', name: 'tradeFlows'},
        {access: '/czqys/jsqr', icon: 'pass', title: '接收确认', name: 'jsqrManager'},
        {access: '/czqys/ystz', icon: 'pass', title: '移送台账', name: 'ystzView'},
        {access: '/czqys/czqth', icon: 'pass', title: '处置权退回', name: 'czqthManager'},
        {access: '/czqys/czqthtz', icon: 'pass', title: '处置权退回台账', name: 'czqthtzManager'}
      ]
    },
    {
      icon: 'channeicon',
      title: '承办登记管理',
      access: '/cbdjgl',
      name: 'channelManage',
      children: [
        {access: '/cbdjgl/cbdj', icon: 'channeicon', title: '承办登记', name: 'channelManageList'}
      ]
    },
    {
      icon: 'account',
      title: '物证管理',
      access: '/wzgl',
      name: 'account',
      children: [
        {access: '/wzgl/rkjj', icon: 'account', title: '入库交接', name: 'accountList'},
        {access: '/wzgl/rkjjtz', icon: 'account', title: '入库交接台账', name: 'accountFrozenThawList'},
        {access: '/wzgl/ckjj', icon: 'account', title: '出库交接', name: 'setFee'},
        {access: '/wzgl/ckjjtz', icon: 'account', title: '出库交接台账', name: 'accountDetail'},
        {access: '/wzgl/rkdj', icon: 'account', title: '入库登记', name: 'accountDetailTwo'},
        {access: '/wzgl/rkdjtz', icon: 'account', title: '入库登记台账', name: 'capitalAcountDetail'}

      ]
    },
    {
      icon: 'bill',
      title: '部门仓库管理',
      name: 'settle',
      access: '/bmckgl',
      children: [
        {
          access: '/bmckgl/cfck',
          icon: 'bill',
          title: '部门物证仓',
          name: 'bmwzcQuery'
        },
        {
          access: '/bmckgl/cfwzgl',
          icon: 'bill',
          title: '物证仓位',
          name: 'wzcwQuery'
        }
      ]
    },
    {
      icon: 'trade',
      title: '财政票据',
      name: 'czpj',
      access: '/czpj',
      children: [
        {
          access: '/czpj/pjkj',
          icon: 'trade',
          title: '票据开具',
          name: 'pjkj'
        },
        //old
        // {
        //   access: '/czpj/pjkj',
        //   icon: 'trade',
        //   title: '暂扣开具',
        //   name: 'zkkj'
        // },
        //new
        {
          access: '/czpj/pjkj',
          icon: 'trade',
          title: '暂扣开具',
          name: 'zkkjnew'
        },
        {
          access: '/czpj/pjsy',
          icon: 'trade',
          title: '票据使用',
          name: 'pjsy'
        }
      ]
    },
    {
      icon: 'task',
      title: '任务跟踪',
      access: '/rwgz',
      name: 'rwgz',
      children: [
        {access: '/rwgz/rwgzyl', icon: 'task', title: '任务跟踪查询', name: 'rwgzcx'}
      ]
    },
    {
      icon: 'cert',
      title: '物证保管中心',
      access: '/wzbgzx',
      name: 'wzbgzx',
      children: [
        {access: '/wzbgzx/cyrygl', icon: 'cert', title: '从业人员管理', name: 'wlry'},
        {access: '/wzbgzx/clxxgl', icon: 'cert', title: '车辆信息管理', name: 'wlcl'}
      ]
    },
    {
      icon: 'basedata',
      title: '基础资料',
      access: '/jczl',
      name: 'jczl',
      children: [
        {access: '/jczl/yjclpz', icon: 'basedata', title: '预警策略配置', name: 'yjclpz'},
        {access: '/jczl/rwlcpz', icon: 'basedata', title: '任务流程配置', name: 'rwlcpz'},
        {access: '/jczl/rwlcpz', icon: 'basedata', title: '物证类别', name: 'wzlb'},
      ]
    },
    {
      icon: 'trand',
      title: '运维管理',
      access: '/ywgl',
      name: 'ywgl',
      children: [
        {access: '/ywgl/fkzx', icon: 'trand', title: '反馈中心', name: 'fkzx'}
      ]
    },
    {
      icon: 'trand',
      title: '接口服务',
      access: '/jkfw',
      name: 'jkfw',
      children: [
        {access: '/jkfw/jkzypzgl', icon: 'trand', title: '接口资源配置管理', name: 'jkzypz'},
        {access: '/jkfw/dsfjkdwpz', icon: 'trand', title: '第三方接口单位配置', name: 'dsfjkpz'},
        {access: '/jkfw/dwjksqpz', icon: 'trand', title: '对外接口授权配置', name: 'dwjksqpz'},
        {access: '/jkfw/jkdyrzcx', icon: 'trand', title: '接口调用日志查询', name: 'jkdyrzcx'}
      ]
    },
    {
      icon: 'trand',
      title: '处置管理',
      access: '/czgl',
      name: 'czgl',
      children: [
        {access: '/czgl/czdj', icon: 'trand', title: '处置登记', name: 'czdj'},
        {access: '/czgl/czsp', icon: 'trand', title: '处置审批', name: 'czsp'},
        {access: '/czgl/zzczdj', icon: 'trand', title: '最终处置登记', name: 'zzczdj'},
        {access: '/czgl/cztz', icon: 'trand', title: '处置台账', name: 'cztz'},
        {access: '/czgl/zkwzcz', icon: 'trand', title: '暂扣物资处置', name: 'zkwzcz'}

      ]
    },
    {
      icon: 'trand',
      title: '接入管理',
      access: '/jrgl',
      name: 'jrgl',
      children: [
        {access: '/jrgl/jkrz', icon: 'trand', title: '接入日志', name: 'jkrz'}
      ]
    },
    {
      icon: 'trand',
      title: '统计分析',
      access: '/tjfx',
      name: 'tjfx',
      children: [
        {access: '/tjfx/ccfx', icon: 'trand', title: '仓储分析', name: 'ccfx'}

      ]
    }
  ]
}
export default authMenu
