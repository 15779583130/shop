/*
 * 接口统一集成模块
 */
import * as login from './login/login'
import * as user from './sys/user/user'
import * as menu from './sys/menu/menu'
import * as func from './sys/menu/func'
import * as group from './sys/group/group'
import * as groupRole from './sys/group/groupRole'
import * as groupUser from './sys/group/groupUser'
import * as codeType from './sys/code/codeType'
import * as codeInfo from './sys/code/codeInfo'
import * as flow from './sys/flow/flow'
import * as flowBizType from './sys/flow/flowBizType'
import * as flowType from './sys/flow/flowType'
import * as flowNode from './sys/flow/flowNode'
import * as flowRoute from './sys/flow/flowRoute'
import * as rwlcpz from './jczl/rwlcpz/rwlcpz'
import * as dsrw from './sys/dsrw/dsrw'
import * as ggmanage from './sys/ggmanage/ggmanage'
import * as ckggmanage from './sys/ckggmanage/ckggmanage'
import * as fwwgpzManage from './sys/fwwgpzManage/fwwgpzManage'
import * as bmwzc from './ckgl/bmckgl/bmwzc/bmwzc'
import * as wzcw from './ckgl/bmckgl/wzcw/wzcw'
import * as rksq from './wzrk/rksq/rksq'
import * as rktz from './wzrk/rktz/rktz'
import * as home from './home/home.js'
import * as capitalAcountDetail from './materialEvidenceManage/capitalAcountDetail.js'
import * as entryRegistration from './materialEvidenceManage/entryRegistration.js'
import * as entryTransfer from './materialEvidenceManage/entryTransfer.js'
import * as entryTransferAccount from './materialEvidenceManage/entryTransferAccount.js'
import * as entryRegistrationAcount from './materialEvidenceManage/entryRegistrationAcount.js'
import * as outgoingTransfer from './materialEvidenceManage/outgoingTransfer.js'
import * as outgoingTransferAccount from './materialEvidenceManage/outgoingTransferAccount.js'
import * as cbdj from './cbdj/cbdj'
import * as dyghsq from './dygh/dyghsq/dyghsq'
import * as yksq from './wzyk/yksq/yksq'
import * as ykqr from './wzyk/ykqr/ykqr'
import * as yktz from './wzyk/yktz/yktz'
import * as ajcx from './caseManage/ajcx/ajcx'
import * as wzdj from './ajgl/wzdj/wzdj'
import * as upDataPic from './ajgl/wzdj/upData'
import * as common from './common/common'
import * as sys from './sys/sys'
import * as wzzh from './ajgl/wzzh/wzzh'
import * as dytz from './dygh/dyghtz/dyghtz'
import * as yssq from './czqys/yssq/yssq'
import * as pjkj from './czpj/pjkj/pjkj'
import * as zkkj from './czpj/zkkj/zkkj'
import * as ysjsqr from './czqys/jsqr/ysjsqr'
import * as ystz from './czqys/ystz/ystz'
import * as rwgz from './rwgz/rwgz'
import * as wlcl from './wlgl/wlcl/wlcl'
import * as wlry from './wlgl/wlry/wlry'
import * as bmgl from './sys/bmgl/bmgl'
import * as yjclpz from './jczl/yjclpz/yjclpz'
import * as wzlb from './jczl/wzlb/wzlb'
import * as ywrzcx from './sys/ywrzcx/ywrzcx'
import * as czdj from './czgl/czdj/czdj'
import * as zzczdj from './czgl/zzczdj/zzczdj'
import * as czqth from './czqys/czqth/czqth'
import * as czqthtz from './czqys/czqthtz/czqthtz'
import * as cztz from './czgl/cztz/cztz'
import * as czsp from './czgl/czsp/czsp'
import * as RoleManage from './sys/roleManage/roleManage'
import * as jkrzcx from './jkgl/jkrzcx'
import * as fkzx from './ywgl/fkzx/fkzx'
import * as jkfw from './jkfw/jkpzzygl/jkpzzygl'
import * as jkdyrzcx from './jkfw/jkdyrzcx/jkdyrzcx'
import * as dwjksqpz from './jkfw/dwjksqpz/dwjksqpz'
import * as qjcsgl from './sys/qjcsmanage/qjcsgl'
import * as ccfx from './tjfx/ccfx/ccfx'
import * as drrzgl from './sys/drrzgl/drrzgl'
import * as dsfjkpz from './jkfw/dsfjkpz/dsfjkpz'
import * as pjsy from './czpj/pjsy/pjsy' 
import * as zkwzcz from './czgl/zkwzcz/zkwzcz'
// 默认全部导出
export default {
  login,
  user,
  bmwzc,
  wzcw,
  rksq,
  rktz,
  yksq,
  ykqr,
  yktz,
  home,
  capitalAcountDetail,
  entryRegistration,
  entryTransfer,
  entryTransferAccount,
  entryRegistrationAcount,
  outgoingTransfer,
  outgoingTransferAccount,
  cbdj,
  dyghsq,
  ajcx,
  wzdj,
  common,
  sys,
  wzzh,
  upDataPic,
  dytz,
  yssq,
  pjkj,
  ysjsqr,
  ystz,
  rwgz,
  wlcl,
  wlry,
  zkkj,
  bmgl,
  menu,
  func,
  group,
  groupRole,
  func,
  group,
  groupRole,
  groupUser,
  codeType,
  codeInfo,
  flow,
  flowBizType,
  flowType,
  flowNode,
  flowRoute,
  rwlcpz,
  dsrw,
  yjclpz,
  ggmanage,
  czdj,
  zzczdj,
  czqth,
  czqthtz,
  ywrzcx,
  cztz,
  czsp,
  RoleManage,
  wzlb,
  fkzx,
  RoleManage,
  jkrzcx,
  fkzx,
  jkfw,
  ckggmanage,
  qjcsgl,
  jkdyrzcx,
  qjcsgl,
  qjcsgl,
  ccfx,
  dwjksqpz,
  ccfx,
  ccfx,
  drrzgl,
  dsfjkpz,
  pjsy,
  fwwgpzManage,
  zkwzcz

}
