<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
    @import '../../styles/iconfont/iconfont.css';
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
      width: 1px;
      background-color: #e6e6e6;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #999999;
    }
</style>
<template>
  <div style="position: relative; top: 10px">
    <home-bsmj :roleType="role_type"></home-bsmj>
    <home-cgy :roleType="role_type"></home-cgy>
    <home-lead :roleType="role_type"></home-lead>
  </div>
</template>

<script>
    import homeBsmj from './compenents/homeBsmj'
    import homeCgy from './compenents/homeCgy'
    import homeLead from './compenents/homeLead'
    import {timeFormat} from '../../utils/datetime'
    import {getBase64Utils} from '../../utils/getBase64'
    import {downLoadFile} from '../../utils/downLoadFile'
    export default {
        name: 'home',
        components: {
          homeBsmj,
          homeCgy,
          homeLead
        },
        data () {
            return {
                uploadDisplay: false,
                downSpacList: [],
                gzdtdataDis: false,
                noticeListData: false,
                nodataDis: false,
                wuZhengVal: '',
                statuslx: '6',
                wuzHengSelect: '1',
                zbajcxSelect: '1',
                zbajcxVal: '',
                role_type: '',
                user_name: '',
                // user_name: sessionStorage.getItem('user_name'),
                // role_type: sessionStorage.getItem('role_type'),
                ajzs: '',
                zbajs: '',
                zajs: '',
                zdjwzs: '',
                drkdj: 10,
                dckdj: 12,
                homePeople: '../../images/home_people.png',
                bncks: '',
                bnrks: '',
                zkwzs: '',
                pageNo: 1,
                pageSize: 10,
                RKDSQ: '', // 入库待提交申请
                DYDSQ: '', //调用待提交申请
                CZDSQ: '', // 处置待提交申请
                YKDSQ: '', // 移库待提交申请
                YSDSQ: '', // 移送待提交申请
                AJDRK: '', // 案件待入库申请
                zbajcxList: [], // 在办案件查询
                noticeList: [], // 通知公告
                workDynamicList: [] // 工作动态
            }
        },
        // methods: {
        //     init () {
        //     },
        //   pushAnJianDetail(anJianId) {
        //     this.$router.push({
        //       name: 'organizationDetail',
        //       params: {
        //         id: anJianId,
        //       }
        //     })
        //   },
        //   handleClickTab (tab, event) {
        //         if (tab.index === '1') {
        //             this.uploadDisplay = true
        //         } else {
        //             this.uploadDisplay = false
        //         }
        //   },
        //   handleChange (file) {
        //       let self = this
        //       getBase64Utils(file.raw).then((res) => {
        //           let params = {
        //               ywid: 'xiazaizhuanqu32696560C0A88901000',
        //               filebase64: res,
        //               fileio: file.raw,
        //               filename: file.name,
        //               filesize: file.size
        //           }
        //           // self.fileList.push(params)
        //           this.$api.upDataPic.upDataPic(params).then(function (res) {
        //               if (res.content.getValueofHeader().header.default.success === 'true') {
        //                   self.$message({
        //                       message: '上传成功！',
        //                       type: 'success'
        //                   });
        //               }
        //
        //              self.downLoadSpac()
        //           })
        //       })
        //
        //   },
        //   downLoadFile (url) {
        //     downLoadFile (url)
        //   },
        //   deleteFile (item) {
        //       let self = this
        //       return this.$confirm('是否确定删除该图片 ?', '提示', {
        //           confirmButtonText: '确定',
        //           cancelButtonText: '取消',
        //           type: 'warning'
        //       }).then(function (file, fileList) {
        //           self.$api.upDataPic.delPicWuzheng({id: item.id}).then(function (res) {
        //               if (res.content === 'default') {
        //                   self.$message({
        //                       message: '删除图片成功！',
        //                       type: 'success'
        //                   });
        //                   self.downLoadSpac()
        //               }
        //           })
        //       }).catch(function (e) {
        //           throw(e)
        //           stop()
        //           return false
        //       });
        //   },
        //     wuZhengValChange (val) {
        //         this.statuslx = val
        //         this.searchBtnWu()
        //     },
        //     searchBtnWu () {
        //         let self = this
        //           let param = {
        //             pagenum: this.pageNo,
        //             pagesize: this.pageSize,
        //             wzmc: this.wuZhengVal,
        //             wzbh: this.wuZhengVal,
        //             ztlx: this.statuslx
        //           }
        //             if (this.role_type === '2') {
        //                 this.$api.home.wuZhengTask(param).then((res) => {
        //                     self.zbajcxList = []
        //                     if (res.content !== undefined) {
        //                       self.zbajcxList = res.content
        //                         if (res.content.length > 5) {
        //                             self.zbajcxList = self.zbajcxList.splice(0, 5)
        //                         } else {
        //                             self.zbajcxList = res.content
        //                         }
        //                         self.zbajcxList.forEach(function (e, i) {
        //                             if (e.jjsj) {
        //                                 e.jjsj = timeFormat(e.jjsj)
        //                             }
        //                         })
        //                     } else {
        //                         self.nodataDis = true
        //                     }
        //                 }).then()
        //             }
        //
        //     },
        //     searchBtnAn () {
        //         let  self = this
        //         if (this.zbajcxVal) {
        //             if (this.zbajcxSelect === '1') {
        //                 var param = {
        //                     pagenum: this.pageNo,
        //                     pagesize: this.pageSize,
        //                     ajmc: this.zbajcxVal
        //                 }
        //             }
        //             if (this.zbajcxSelect === '2') {
        //                 var param = {
        //                     pagenum: this.pageNo,
        //                     pagesize: this.pageSize,
        //                     ajbh: this.zbajcxVal
        //                 }
        //             }
        //             if (this.role_type === '1' || this.role_type === '3') {
        //                 this.$api.home.inOffice(param).then((res) => {
        //                     self.zbajcxList = []
        //                     if (res.content !== undefined) {
        //                         if (res.content.length > 5) {
        //                             self.zbajcxList = self.zbajcxList.splice(0, 5)
        //                         } else {
        //                             self.zbajcxList = res.content
        //                         }
        //                         self.zbajcxList.forEach(function (e, i) {
        //                             if (e.created_time) {
        //                                 e.created_time = timeFormat(e.created_time)
        //                             }
        //                         })
        //                     } else {
        //                         self.nodataDis = true
        //                 }
        //                 }).then()
        //             }
        //         } else {
        //             this.$message.error('请输入搜索条件')
        //         }
        //     },
        //   zbajsPush () {this.$router.push({name: 'listWhiteList'})},
        //   zdjwpsPush () {this.$router.push({name: 'feeAcountList'})},
        //   ajwzdjPush () {this.$router.push({name: 'industryList'})},
        //   rksqPush () {this.$router.push({name: 'organizationManageList'})},
        //   rktzPush () {this.$router.push({name: 'productManageListRuku'})},
        //   cksqPush () {this.$router.push({name: 'setFee'})},
        //   ckjjPush () {this.$router.push({name: 'setFee'})},
        //   cktzPush () {this.$router.push({name: 'accountDetail'})},
        //   wzcwCangGuan () {this.$router.push({name: 'wzcwQuery'})},
        //   yssqPush () {this.$router.push({name: 'tradeFlows'})},
        //   ckglCangGuan () {this.$router.push({name: 'wzcwList'})},
        //   drkPush () {this.$router.push({name: 'organizationManageList'})},
        //   drkDjCangGunPush () {this.$router.push({name: 'accountList'})},
        //   dckDjCangGunPush () {this.$router.push({name: 'setFee'})},
        //   dckPush () {this.$router.push({name: 'setFee'})},
        //   czqysPush () {this.$router.push({name: 'tradeFlows'})},
        //   czqthPush () {this.$router.push({name: 'tradeFlows'})},
        //   ykdtjsq () {this.$router.push({name: 'yksqManageList'})},
        //   zkwzsPush () {this.$router.push({name: 'industryList'})},
        //   wzzhcxPush () {this.$router.push({name: 'feeAcountList'})},
        //   zkwzsCgPush () {this.$router.push({name: 'feeAcountList', params: {state: '2'}})}, // 仓管物证综合 yksqManageList
        //   dydtjsqPush () {this.$router.push({name: 'productManageList'})},
        //   bnrksPush () {this.$router.push({name: 'productManageListRuku'})},
        //   bncksPush () {this.$router.push({name: 'accountFrozenThawList'})},
        //   drkdjPush () {this.$router.push({name: 'organizationManageList'})},
        //   dckdjPush () {this.$router.push({name: 'setFee'})},
        //   ystzPush () {this.$router.push({name: 'ystzView'})},
        //   yksqPush () {this.$router.push({name: 'yksqManageList'})},
        //   rkdjCangGuan () {this.$router.push({name: 'accountDetailTwo'})},
        //   messageSet () {
        //       this.$message({
        //           message: '该功能尚未上线！',
        //           type: 'warning'
        //       });
        //   },
        //   gzdtPush() {
        //       this.$router.push({
        //         name: 'listWhiteList'
        //       })
        //   },
        //     downLoadSpac () {
        //       let self = this
        //       var params = {
        //         ywid: ''
        //       }
        //       this.$api.home.downLoadSpce(params).then(function (res) {
        //         if (res.content.length >= 1){
        //           self.downSpacList = res.content
        //           if (res.length >= 6){
        //             self.downSpacList.splice(0, 6)
        //           }
        //         }
        //       })
        //     },
        //     findPage (data) {
        //         let self = this
        //         const loading = this.$loading({
        //           lock: true,
        //           text: '加载中……',
        //           background: 'rgba(0, 0, 0, 0.7)'
        //         })
        //         var param = {
        //             pagenum: this.pageNo,
        //             pagesize: this.pageSize
        //         }
        //         this.$api.home.indexUser(param).then((res) => {
        //             loading.close()
        //             self.zbajs = res.content.zbajs
        //             self.zajs = res.content.zajs
        //             self.zdjwzs = res.content.zdjwzs
        //             self.userName = res.content.username
        //             self.zkwzs = res.content.zkwzs
        //             self.bnrks = res.content.bnrks
        //             self.bncks = res.content.bncks
        //         }).then(data != null ? data.callback : '').catch(function () {
        //           loading.close()
        //         })
        //       if (this.role_type === '1' || this.role_type === '2') {
        //         this.downLoadSpac()
        //       }
        //         if (this.role_type === '1' || this.role_type === '3') {
        //             this.$api.home.inOffice(param).then((res) => {
        //                 self.zbajcxList = res.content
        //                 if (self.zbajcxList.length > 5) {
        //                     self.zbajcxList = self.zbajcxList.splice(0, 5)
        //                 }
        //                 self.zbajcxList.forEach(function (e, i) {
        //                     if (e.created_time) {
        //                         e.created_time = timeFormat(e.created_time)
        //                     }
        //                 })
        //             }).then(data != null ? data.callback : '').catch(function () {
        //               loading.close()
        //
        //             })
        //         }
        //         if (this.role_type === '2') {
        //             this.$api.home.wuZhengTask(param).then((res) => {
        //                 if (res.content !== undefined) {
        //                     self.zbajcxList = res.content
        //                     if (self.zbajcxList.length > 5) {
        //                         self.zbajcxList = self.zbajcxList.splice(0, 5)
        //                     }
        //                     self.zbajcxList.forEach(function (e, i) {
        //                         if (e.jjsj) {
        //                             e.jjsj = timeFormat(e.jjsj)
        //                         }
        //                     })
        //                 } else {
        //                     this.nodataDis = true
        //                 }
        //
        //             }).then(data != null ? data.callback : '').catch(function () {
        //               loading.close()
        //               self.$message.error('图片加载失败！');
        //             })
        //         }
        //         this.$api.home.AgencyTask(param).then((res) => {
        //             if (res.content) {
        //                 if (res.content.dckdj) {
        //                     self.dckdj = res.content.dckdj
        //                 }
        //
        //                 if (res.content.drkdj) {
        //                     self.drkdj = res.content.drkdj
        //                 }
        //                 if (res.content.rkdsq) {
        //                     self.RKDSQ = res.content.rkdsq
        //                 }
        //                 if (res.content.dydsq) {
        //                     self.DYDSQ = res.content.dydsq
        //                 }
        //                 if (res.content.czdsq) {
        //                     self.CZDSQ = res.content.czdsq
        //                 }
        //                 if (res.content.ykdsq) {
        //                     self.YKDSQ = res.content.ykdsq
        //                 }
        //                 if (res.content.usdsq) {
        //                     self.YSDSQ = res.content.usdsq
        //                 }
        //                 if (res.content.ajdrk) {
        //                     self.AJDRK = res.content.ajdrk
        //                 }
        //             }
        //
        //         }).then(data != null ? data.callback : '').catch(function () {
        //           loading.close()
        //           self.$message.error('图片加载失败！');
        //         })
        //         this.$api.home.noticeList(param).then((res) => {
        //             if (res.content !== undefined) {
        //                 self.noticeList = res.content
        //                 self.noticeList.forEach(function (e, i) {
        //                     if (e.fbsj) {
        //                         e.fbsj = timeFormat(e.fbsj)
        //                     }
        //                 })
        //                 if (res.content.length >= 4) {
        //                     self.noticeList = this.noticeList.slice(0, 4)
        //                 }
        //             } else {
        //                 this.noticeListData = true
        //             }
        //
        //         }).then(data != null ? data.callback : '').catch(function () {
        //           loading.close()
        //           self.$message.error('图片加载失败！');
        //         })
        //         this.$api.home.workDynamic(param).then((res) => { // 工作动态
        //             if (res.content !== undefined) {
        //                 self.workDynamicList = res.content
        //                 if (self.workDynamicList.length > 7) {
        //                     self.workDynamicList = self.workDynamicList.slice(0, 7)
        //                 }
        //             } else {
        //               self.gzdtdataDis = true
        //             }
        //         }).then(data != null ? data.callback : '').catch(function () {
        //           loading.close()
        //           self.$message.error('图片加载失败！');
        //         })
        //         self.$api.upDataPic.getPicWuzheng({ywid: 'xiazaizhuanqu32696560C0A88901000'}).then(function (res) {
        //             for (let i = 0; i < res.content.length; i++) {
        //                 self.$refs.uploadNoew.fileList = res.content
        //                 self.fileList[i] = {
        //                     id: res.content[i].id,
        //                     url: res.content[i].file_path,
        //                     name: res.content[i].file_title
        //                 }
        //             }
        //         })
        //     },
        //     getUrlGO () {
        //         this.$router.push({
        //             name: 'jobTaskRecordList'
        //         })
        //     }
        // },
        // activated () {
        //     this.role_type = sessionStorage.getItem('role_type')
        //     this.user_name = sessionStorage.getItem('user_name')
        //     this.findPage(null)
        // },
        // computed: {
        //
        //     todayNew () {
        //         return this.$moment(new Date()).format('YYYY-MM-DD')
        //     },
        //     weekDay () {
        //         return  "日一二三四五六".charAt(new Date().getDay())
        //     },
        // },
        created () {
            this.role_type = sessionStorage.getItem('role_type')
            this.user_name = sessionStorage.getItem('user_name')
            this.findPage(null)
        }
    }
</script>
