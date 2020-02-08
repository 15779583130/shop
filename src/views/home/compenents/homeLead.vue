<style lang="less">
  @import "../home.less";
  @import "../../../styles/common.less";
  @import '../../../styles/iconfont/iconfont.css';
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
  <div class="home-main" v-if="this.roleType==3">
    <el-row style="position: relative; top: -10px">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-row style="position: relative;">
            <el-col :span="9">
              <div class="grid-content bg-purple-dark">
                <div class="user_info_card">
                  <div class="user_info_card_pic">
                    <img src="../../../images/home_people.png">
                  </div>
                  <div class="user_info_card_text">
                    <p>{{this.user_name}}，您好</p>
                    <p>今天是星期{{weekDay}}，{{todayNew}}</p>
                  </div>
                  <div class="user_info_card_set">
                    <el-row>
                      <el-col :span="8">1</el-col>
                      <el-col :span="12"><i class="el-icon-user" style="color: white"></i><span style="color: white; display: inline-block; line-height: 28px; text-indent: 0.5em">设置个人信息</span></el-col>
                      <el-col :span="4"><i class="el-icon-circle-close" style="color: white; float: right; position: relative; top: 10px; right: 10px"></i></el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-dark" style="position: relative; left: -3px">
                <div class="case_num" style="background: #508DC3;">
                  <el-row>
                    <el-col :span="15">
                      <div class="grid-content bg-purple" @click="zkwzsPush">
                        <div class="case_num-col">
                          <div class="case_num_num">
                            {{zdjwzs}}
                          </div>
                          <div class="case_num_text">
                            总登记物证数 >
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content bg-purple-light">
                        <div class="case_num_pic"><img src="../../../images/case_num.png"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-dark" style="position: relative; left: -4px">
                <div class="case_num" style="background: #88B0D4">
                  <el-row>
                    <el-col :span="15">
                      <div class="grid-content bg-purple" @click="zdjwpsPush">
                        <div class="case_num-col">
                          <div class="case_num_num">
                            {{zkwzs}}
                          </div>
                          <div class="case_num_text">
                            在库物证数 >
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content bg-purple-light">
                        <div class="case_num_pic"><img src="../../../images/case_num_total.png"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple-dark" style="position: relative; left: -4px">
                <div class="case_num" style="background: #BED4E9">
                  <el-row>
                    <el-col :span="15">
                      <div class="grid-content bg-purple" @click="zbajsPush">
                        <div class="case_num-col">
                          <div class="case_num_num" style="color: #5691C9">
                            {{zbajs}}
                          </div>
                          <div class="case_num_text" style="color: #5691C9">
                            在办案件数 >
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content bg-purple-light">
                        <div class="case_num_pic"><img src="../../../images/thing_num_total.png"></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content bg-purple" style="position: relative; top: -5px">
          <el-row>
            <el-col :span="24" style=" float: left">
              <div class="line_title_top"></div>
              <el-card class="box-card" style="height: 212px; overflow: hidden;">
                <div class="title_top">
                  <div class="title_top_left">
                    <img src="../../../images/kuaijie.png"><span style="position: relative; top: -2px; font-weight: bold;">快捷操作</span>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <div style="margin-top: 8px">
                  <el-row style="position: relative; left: -10px; width: 103%">
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="messageSet">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_1.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">全景分析</span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="messageSet">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_1.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">处置分析</span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="messageSet">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_1.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">仓库分析</span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="messageSet">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_1.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">物证报损查询</span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <div class="grid-content bg-purple" @click="wzzhcxPush">
                          <div class="card_kj_ld">
                            <div class="img_kj_ld">
                              <img src="../../../images/kuaijie_2.png">
                            </div>
                          </div>
                          <span class="kj_text_ld">物证综合查询</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="rktzPush">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_3.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">入库台账</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="position: relative; left: -10px; width: 103%">
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="cktzPush">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/kuaijie_1.png">
                          </div>
                        </div>

                        <span class="kj_text_ld">出库台账</span>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light">
                        <div class="grid-content bg-purple" @click="ystzPush">
                          <div class="card_kj_ld">
                            <div class="img_kj_ld">
                              <img src="../../../images/kuaijie_2.png">
                            </div>
                          </div>
                          <span class="kj_text_ld">移送台账</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple" @click="messageSet">
                        <div class="card_kj_ld">
                          <div class="img_kj_ld">
                            <img src="../../../images/plusMenu.png">
                          </div>
                        </div>
                        <span class="kj_text_ld">添加菜单</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>

          </el-row>
        </div>
        <el-row style="position:relative; top: -5px">
          <el-col :span="24">
            <div style="height: 10px"></div>
            <div class="grid-content bg-purple-dark">
              <div class="line_title_top_daiban"></div>
              <el-card class="box-card">
                <div class="title_top">
                  <div class="title_top_left">
                    <img src="../../../images/zaiban.png" style="position: relative; top: 4px;"><span style="position: relative; top: 1px; font-weight: bold; left: 2px">在办案件查询</span>
                    <div style="position: absolute; right: 0; top: -5px ">
                      <el-input placeholder="请输入内容" v-model="zbajcxVal" class="input-with-select" size="mini" style="border: #2570b3 solid 1px; border-left: none;">
                        <el-select v-model="zbajcxSelect" slot="prepend" placeholder="请选择"  style="background: #2570b3; width: 145%; color: #fff; position: relative; left: -1px">
                          <el-option label="案件名称" value="1"></el-option>
                          <el-option label="案件编号" value="2"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="searchBtnAn"></el-button>
                      </el-input>
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <div style="margin-top: 10px">
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark" style="margin-top: 10px">
                        <div v-if="nodataDis">没有数据</div>
                        <div class="case_list" v-for="(item, index) of this.zbajcxList" :key="item.id" @click="pushAnJianDetail(item.id)">
                          <div class="case_list_up">
                            <el-row>
                              <el-col :span="12"><span style="display: block; position: relative;top: 8px; left: 10px">案件编号：{{item.ajbh}}</span></el-col>
                              <el-col :span="12" style="text-align: right; text-indent: -1em"><span style="display: block; position: relative;top: 8px; right: 10px">案件类型：{{item.sfsa = 1 ? '刑事案件' : '行政案件'}}</span></el-col>
                            </el-row>
                          </div>
                          <div class="case_list_dowm" style="min-height: 70px">
                            <el-row>
                              <el-col :span="8"><span class="huanhang" style="display: block; position: relative;top: 8px; left: 10px">案件名称：{{item.ajmc}}</span></el-col>
                              <el-col :span="8"><span style="display: block; position: relative;top: 8px; left: 10px">物证数量：{{item.wzsl}}个</span></el-col>
                              <el-col :span="8" style="text-align: right; text-indent: -1em"><span style="display: block; position: relative;top: 8px; right: 10px">创建时间：{{item.created_time}}</span></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8"><span style="display: block; position: relative;top: 8px; left: 10px">办案民警：{{item.bamj}}</span></el-col>
                              <el-col :span="8"><span style="display: block; position: relative;top: 8px; left: 10px">手机号码：{{item.sjhm}}</span></el-col>
                              <el-col :span="8" style="text-align: right; text-indent: -1em"><span style="display: block; position: relative;top: 8px; right: 10px">&nbsp;</span></el-col>
                            </el-row>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <!--          <div class="grid-content bg-purple-light" style="width: 98%; float: right">-->
        <!--            <el-tabs type="border-card">-->
        <!--              <el-tab-pane>-->
        <!--                <span slot="label"><i class="el-icon-date"></i> 通知公告</span>-->
        <!--                <div class="notic_ul">-->
        <!--                  <ul>-->
        <!--                    <li v-for="(item, index) of this.noticeList" :key="index">-->
        <!--                      <el-row>-->
        <!--                        <el-col :span="24">-->
        <!--                          <div class="grid-content bg-purple-dark" style="position: relative; top: 10px; left: 20px">-->
        <!--                            <span>流程<{{item.bt}}></span>-->
        <!--                          </div>-->
        <!--                        </el-col>-->
        <!--                      </el-row>-->
        <!--                      <div style="height: 10px; width: 100%"></div>-->
        <!--                      <el-row>-->
        <!--                        <el-col :span="12">-->
        <!--                          <div class="grid-content bg-purple-dark" style="color: #989a99; position: relative; top: 10px; left: 20px">-->
        <!--                            发送人：{{item.fbr_name}}-->
        <!--                            <div style="height: 15px; width: 1px; background: #fff; position: relative; top: -17px; left: 130px"></div>-->
        <!--                          </div>-->
        <!--                        </el-col>-->
        <!--                        <el-col :span="12">-->
        <!--                          <div class="grid-content bg-purple-dark" style="text-indent: 2.5em; color: #989a99;position: relative; top: 10px; left: 15px">-->
        <!--                            {{item.fbsj}}-->
        <!--                          </div>-->
        <!--                        </el-col>-->
        <!--                      </el-row>-->
        <!--                    </li>-->
        <!--                  </ul>-->
        <!--                </div>-->
        <!--              </el-tab-pane>-->
        <!--              <el-tab-pane label="下载专区"> <span slot="label"><i class="el-icon-download"></i> 下载专区</span>-->
        <!--                fasd-->
        <!--              </el-tab-pane>-->
        <!--            </el-tabs>-->
        <!--          </div>-->
        <div style="height: 0; clear: both"></div>
        <div style="clear: both; width: 96%; margin-left: 10px; position: relative; top: -11px; left: 0">
          <div style="height: 10px"></div>
          <div class="grid-content bg-purple-dark">
            <div class="line_title_top_daiban"></div>
            <el-card class="box-card">
              <div class="title_top">
                <div class="title_top_left">
                  <img src="../../../images/work_pic.png" style="position: relative; top: 4px;"><span style="position: relative; top: 1px; font-weight: bold; left: 2px">工作动态</span>
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="work_zong">
                <div v-if="gzdtdataDis">没有数据</div>
                <ul>
                  <li v-for="(item, index) of workDynamicList" :key="index">
                    <div class="work_li_up">
                      <div v-if="item.yjlx ==='1'" style="height: 18px; width: 32px; background: #2171b8;color: white; text-align: center;border-radius:3px; float: left">提示</div>
                      <div v-if="item.yjlx ==='2'" style="height: 18px; width: 32px; background: #f2af00;color: white; text-align: center;border-radius:3px; float: left">预警</div>
                      <div v-if="item.yjlx ==='3'" style="height: 18px; width: 32px; background: #e63e1a;color: white; text-align: center;border-radius:3px; float: left">报警</div>
                      <div class="work_text">{{item.yjbt}}</div>
                      <span style="color: #999999; line-height: 24px;display: inline-block;white-space: nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;">{{item.yjnr}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div> <!--领导-->
</template>
<script>
    import {timeFormat} from '../../../utils/datetime'
    import {getBase64Utils} from '../../../utils/getBase64'
    import {downLoadFile} from '../../../utils/downLoadFile'
    export default {
        name: 'homeBsmj',
        props: ["roleType"],
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
        methods: {
            init () {
            },
            pushAnJianDetail(anJianId) {
                this.$router.push({
                    name: 'organizationDetail',
                    params: {
                        id: anJianId,
                    }
                })
            },
            handleClickTab (tab, event) {
                if (tab.index === '1') {
                    this.uploadDisplay = true
                } else {
                    this.uploadDisplay = false
                }
            },
            handleChange (file) {
                let self = this
                getBase64Utils(file.raw).then((res) => {
                    let params = {
                        ywid: 'xiazaizhuanqu32696560C0A88901000',
                        filebase64: res,
                        fileio: file.raw,
                        filename: file.name,
                        filesize: file.size
                    }
                    // self.fileList.push(params)
                    this.$api.upDataPic.upDataPic(params).then(function (res) {
                        if (res.content.getValueofHeader().header.default.success === 'true') {
                            self.$message({
                                message: '上传成功！',
                                type: 'success'
                            });
                        }

                        self.downLoadSpac()
                    })
                })

            },
            downLoadFile (url) {
                downLoadFile (url)
            },
            deleteFile (item) {
                let self = this
                return this.$confirm('是否确定删除该图片 ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function (file, fileList) {
                    self.$api.upDataPic.delPicWuzheng({id: item.id}).then(function (res) {
                        if (res.content === 'default') {
                            self.$message({
                                message: '删除文件成功！',
                                type: 'success'
                            });
                            self.downLoadSpac()
                        }
                    })
                }).catch(function (e) {
                    throw(e)
                    stop()
                    return false
                });
            },
            wuZhengValChange (val) {
                this.statuslx = val
                this.searchBtnWu()
            },
            searchBtnWu () {
                let self = this
                let param = {
                    pagenum: this.pageNo,
                    pagesize: this.pageSize,
                    wzmc: this.wuZhengVal,
                    wzbh: this.wuZhengVal,
                    ztlx: this.statuslx
                }
                if (this.role_type === '2') {
                    this.$api.home.wuZhengTask(param).then((res) => {
                        self.zbajcxList = []
                        if (res.content !== undefined) {
                            self.zbajcxList = res.content
                            if (res.content.length > 5) {
                                self.zbajcxList = self.zbajcxList.splice(0, 5)
                            } else {
                                self.zbajcxList = res.content
                            }
                            self.zbajcxList.forEach(function (e, i) {
                                if (e.jjsj) {
                                    e.jjsj = timeFormat(e.jjsj)
                                }
                            })
                        } else {
                            self.nodataDis = true
                        }
                    }).then()
                }

            },
            searchBtnAn () {
                let  self = this
                if (this.zbajcxVal) {
                    if (this.zbajcxSelect === '1') {
                        var param = {
                            pagenum: this.pageNo,
                            pagesize: this.pageSize,
                            ajmc: this.zbajcxVal
                        }
                    }
                    if (this.zbajcxSelect === '2') {
                        var param = {
                            pagenum: this.pageNo,
                            pagesize: this.pageSize,
                            ajbh: this.zbajcxVal
                        }
                    }
                    if (this.role_type === '1' || this.role_type === '3') {
                        this.$api.home.inOffice(param).then((res) => {
                            self.zbajcxList = []
                            if (res.content !== undefined) {
                                if (res.content.length > 5) {
                                    self.zbajcxList = self.zbajcxList.splice(0, 5)
                                } else {
                                    self.zbajcxList = res.content
                                }
                                self.zbajcxList.forEach(function (e, i) {
                                    if (e.created_time) {
                                        e.created_time = timeFormat(e.created_time)
                                    }
                                })
                            } else {
                                self.nodataDis = true
                            }
                        }).then()
                    }
                } else {
                    this.$message.error('请输入搜索条件')
                }
            },
            zbajsPush () {this.$router.push({name: 'listWhiteList'})},
            zdjwpsPush () {this.$router.push({name: 'feeAcountList'})},
            ajwzdjPush () {this.$router.push({name: 'industryList'})},
            rksqPush () {this.$router.push({name: 'organizationManageList'})},
            rktzPush () {this.$router.push({name: 'productManageListRuku'})},
            cksqPush () {this.$router.push({name: 'setFee'})},
            ckjjPush () {this.$router.push({name: 'setFee'})},
            cktzPush () {this.$router.push({name: 'accountDetail'})},
            wzcwCangGuan () {this.$router.push({name: 'wzcwQuery'})},
            yssqPush () {this.$router.push({name: 'tradeFlows'})},
            ckglCangGuan () {this.$router.push({name: 'wzcwList'})},
            drkPush () {this.$router.push({name: 'organizationManageList'})},
            drkDjCangGunPush () {this.$router.push({name: 'accountList'})},
            dckDjCangGunPush () {this.$router.push({name: 'setFee'})},
            dckPush () {this.$router.push({name: 'setFee'})},
            czqysPush () {this.$router.push({name: 'tradeFlows'})},
            czqthPush () {this.$router.push({name: 'tradeFlows'})},
            ykdtjsq () {this.$router.push({name: 'yksqManageList'})},
            zkwzsPush () {this.$router.push({name: 'industryList'})},
            wzzhcxPush () {this.$router.push({name: 'feeAcountList'})},
            zkwzsCgPush () {this.$router.push({name: 'feeAcountList', params: {state: '2'}})}, // 仓管物证综合 yksqManageList
            dydtjsqPush () {this.$router.push({name: 'productManageList'})},
            bnrksPush () {this.$router.push({name: 'productManageListRuku'})},
            bncksPush () {this.$router.push({name: 'accountFrozenThawList'})},
            drkdjPush () {this.$router.push({name: 'organizationManageList'})},
            dckdjPush () {this.$router.push({name: 'setFee'})},
            ystzPush () {this.$router.push({name: 'ystzView'})},
            yksqPush () {this.$router.push({name: 'yksqManageList'})},
            rkdjCangGuan () {this.$router.push({name: 'accountDetailTwo'})},
            messageSet () {
                this.$message({
                    message: '该功能尚未上线！',
                    type: 'warning'
                });
            },
            gzdtPush() {
                this.$router.push({
                    name: 'listWhiteList'
                })
            },
            downLoadSpac () {
                let self = this
                var params = {
                    ywid: ''
                }
                this.$api.home.downLoadSpce(params).then(function (res) {
                    if (res.content.length >= 1){
                        self.downSpacList = res.content
                        if (res.content.length >= 6){
                            self.downSpacList.splice(0, 6)
                        }
                    }
                })
            },
            findPage (data) {
              if (this.roleType === '3') {
                let self = this
                const loading = this.$loading({
                  lock: true,
                  text: '加载中……',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                var param = {
                  pagenum: this.pageNo,
                  pagesize: this.pageSize
                }
                this.$api.home.indexUser(param).then((res) => {
                  loading.close()
                  self.zbajs = res.content.zbajs
                  self.zajs = res.content.zajs
                  self.zdjwzs = res.content.zdjwzs
                  self.userName = res.content.username
                  self.zkwzs = res.content.zkwzs
                  self.bnrks = res.content.bnrks
                  self.bncks = res.content.bncks
                }).then(data != null ? data.callback : '').catch(function () {
                  loading.close()
                })
                if (this.role_type === '1' || this.role_type === '2') {
                  this.downLoadSpac()
                }
                if (this.role_type === '1' || this.role_type === '3') {
                  this.$api.home.inOffice(param).then((res) => {
                    self.zbajcxList = res.content
                    if (self.zbajcxList.length > 5) {
                      self.zbajcxList = self.zbajcxList.splice(0, 5)
                    }
                    self.zbajcxList.forEach(function (e, i) {
                      if (e.created_time) {
                        e.created_time = timeFormat(e.created_time)
                      }
                    })
                  }).then(data != null ? data.callback : '').catch(function () {
                    loading.close()

                  })
                }
                if (this.role_type === '2') {
                  this.$api.home.wuZhengTask(param).then((res) => {
                    if (res.content !== undefined) {
                      self.zbajcxList = res.content
                      if (self.zbajcxList.length > 5) {
                        self.zbajcxList = self.zbajcxList.splice(0, 5)
                      }
                      self.zbajcxList.forEach(function (e, i) {
                        if (e.jjsj) {
                          e.jjsj = timeFormat(e.jjsj)
                        }
                      })
                    } else {
                      this.nodataDis = true
                    }

                  }).then(data != null ? data.callback : '').catch(function () {
                    loading.close()
                    self.$message.error('图片加载失败！');
                  })
                }
                this.$api.home.AgencyTask(param).then((res) => {
                  if (res.content) {
                    if (res.content.dckdj) {
                      self.dckdj = res.content.dckdj
                    }

                    if (res.content.drkdj) {
                      self.drkdj = res.content.drkdj
                    }
                    if (res.content.rkdsq) {
                      self.RKDSQ = res.content.rkdsq
                    }
                    if (res.content.dydsq) {
                      self.DYDSQ = res.content.dydsq
                    }
                    if (res.content.czdsq) {
                      self.CZDSQ = res.content.czdsq
                    }
                    if (res.content.ykdsq) {
                      self.YKDSQ = res.content.ykdsq
                    }
                    if (res.content.usdsq) {
                      self.YSDSQ = res.content.usdsq
                    }
                    if (res.content.ajdrk) {
                      self.AJDRK = res.content.ajdrk
                    }
                  }

                }).then(data != null ? data.callback : '').catch(function () {
                  loading.close()
                  self.$message.error('图片加载失败！');
                })

                this.$api.home.noticeList(param).then((res) => {

                  if (res.content !== undefined) {
                    self.noticeList = res.content
                    self.noticeList.forEach(function (e, i) {
                      if (e.fbsj) {
                        e.fbsj = timeFormat(e.fbsj)
                      }
                    })
                    if (res.content.length >= 4) {

                      self.noticeList = self.noticeList.slice(0, 4)
                    }
                  } else {
                    this.noticeListData = true
                  }

                }).then(data != null ? data.callback : '').catch(function () {
                  loading.close()
                  self.$message.error('图片加载失败！');
                })
                this.$api.home.workDynamic(param).then((res) => { // 工作动态
                  if (res.content !== undefined) {
                    self.workDynamicList = res.content
                    if (self.workDynamicList.length > 7) {
                      self.workDynamicList = self.workDynamicList.slice(0, 7)
                    }
                  } else {
                    self.gzdtdataDis = true
                  }
                }).then(data != null ? data.callback : '').catch(function () {
                  loading.close()
                  self.$message.error('图片加载失败！');
                })
                self.$api.upDataPic.getPicWuzheng({ywid: 'xiazaizhuanqu32696560C0A88901000'}).then(function (res) {
                  for (let i = 0; i < res.content.length; i++) {
                    self.$refs.uploadNoew.fileList = res.content
                    self.fileList[i] = {
                      id: res.content[i].id,
                      url: res.content[i].file_path,
                      name: res.content[i].file_title
                    }
                  }
                })
              }
            },
            getUrlGO () {
                this.$router.push({
                    name: 'jobTaskRecordList'
                })
            }
        },
        activated () {
            this.role_type = sessionStorage.getItem('role_type')
            this.user_name = sessionStorage.getItem('user_name')
            // this.findPage(null)
        },
        computed: {
            // role_type () {
            //     return sessionStorage.getItem('role_type')
            // },
            // user_name() {
            //     return sessionStorage.getItem('user_name')
            // },
            todayNew () {
                return this.$moment(new Date()).format('YYYY-MM-DD')
            },
            weekDay () {
                return  "日一二三四五六".charAt(new Date().getDay())
            },
        },
        created () {
            this.role_type = sessionStorage.getItem('role_type')
            this.user_name = sessionStorage.getItem('user_name')
            this.findPage(null)
        }
    }
</script>
