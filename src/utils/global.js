/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
export const baseUrl = window.g.ApiUrl
// export const baseUrl = 'http://59.61.83.130:19999/'

// export const baseUrl = 'http://59.61.83.130:19997/'
// export const baseUrl = 'http://192.168.18.169:27804/'
// export const baseUrl = 'http://59.61.83.130:19999/'
// export const baseUrl = 'http://59.61.83.130:19997/'
//export const baseUrl = 'http://192.168.18.169:27804/'
// export const baseUrl = 'http://59.61.83.130:19999/'
// export const baseUrl = 'http://59.61.83.130:19999/'
//export const baseUrl = 'http://192.168.18.169:27804/'
//export const baseUrl = 'http://localhost:27804/'
// export const baseUrl = 'http://192.168.18.25:27804/'
// export const baseUrl = 'http://192.168.18.216:27804/'
// export const baseUrl = 'http://192.168.18.169:27804/'
// export const baseUrl = 'http://localhost:27804/'
// export const baseUrl = 'http://localhost:27804/'
//
// export const baseUrl = window.g.ApiUrl
// export const baseUrl = 'http://192.168.18.157:27804'
// export const baseUrl = 'http://192.168.18.217:27804'
// 系统数据备份还原服务器地址
export const backupBaseUrl = 'http://localhost:8002'
export const reqService = 'remote'
// export const reqService = 'local'

export default {
    baseUrl,
    backupBaseUrl,
    reqService
}
