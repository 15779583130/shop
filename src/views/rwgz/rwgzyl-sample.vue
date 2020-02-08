<template>
  <el-card class="box-card">
    <div style="background:#F6F6F6;text-align: center;margin-bottom:5px">
      <el-button size="mini" type="primary" icon="el-icon-truck" @click="wldetail" v-show="hasWl == '1'">查看物流信息
      </el-button>
      <el-button size="mini" type="warning" icon="el-icon-circle-close" @click="close">关闭</el-button>
    </div>
    <div class="wrapper">
      <div class="time-line" v-show="hasData">
        <div class="item" :class="item.cls" :style="item.style" v-for="item in barData" :key="item.jdsx">
          <div class="bar text-top" :class="item.barCls">
            <div class="icon iconfont" :class="item.tbh" @click="getEvent(item)">
              <div class="text-box" v-if="item.cznr">
                <span><i class="important">{{item.dqjdmc}}:</i></span>
                <span>{{item.czsj}}</span>
                <span><i class="important">{{item.czrxm}}</i>{{item.cznr}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="bt+title" :visible.sync="dialogpdsq" width="60%" :append-to-body="true">
      <div class="dialog">
        <div class="title">申请信息</div>
        <div class="apply-info">
          <div class="item">
            <span><label>申请单号</label>{{pdsqForm.sqdh}}</span>
          </div>
          <div class="item">
            <span><label>单号类型</label>{{pdsqForm.dhlx_text}}</span>
          </div>
          <div class="item">
            <span><label>押运级别</label>{{pdsqForm.yyjb_text}}</span>
          </div>
          <div class="item">
            <span><label>预约时间</label>{{pdsqForm.yyjjsjq}} 至 {{pdsqForm.yyjjsjz}}</span>
          </div>
         <!-- <div class="item">
            <span><label>申请时间</label>{{pdsqForm.sqsj||'暂无时间'}}</span>
          </div>-->
        </div>
        <div class="address">
          <div class="line">
            <i class="icon">寄</i>
            <span>{{pdsqForm.jjrxm}} | {{pdsqForm.jjrlxdh}} | {{pdsqForm.jjrsf}}{{pdsqForm.jjrcs}}{{pdsqForm.jjrqx}}{{pdsqForm.jjrdz}}</span>
          </div>
          <div class="line">
            <i class="icon receipt">收</i>
            <span>{{pdsqForm.sjrxm}} | {{pdsqForm.sjrlxdh}} | {{pdsqForm.sjrsf}}{{pdsqForm.sjrcs}}{{pdsqForm.sjrqx}}{{pdsqForm.sjrdz}}</span>
          </div>
        </div>
        <div>
          <div class="title">物证信息</div>
          <el-table ref="multipleTable" :data="pdsqTableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzlb" label="物证类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sldw" label="数量及单位" width="100" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="bt+title" :visible.sync="dialogpdfk" width="60%" :append-to-body="true">
      <div class="dialog">
        <div class="title">反馈信息<span class="rollback" v-if="isFail">【重新派单中】</span></div>
        <div class="apply-info">
          <div class="item">
            <span><label>申请单号</label>{{pdfkForm.sqdh}}</span>
          </div>
          <div class="item">
            <span><label>运单号</label>{{pdfkForm.ydh}}</span>
          </div>
          <div class="item">
            <span><label>物流状态</label>{{pdfkForm.status_text}}</span>
          </div>
          <div class="item">
            <span><label>交接状态</label>{{pdfkForm.jjzt_text}}</span>
          </div>
         <!-- <div class="item">
            <span><label>反馈时间</label>{{pdfkForm.fksj||'暂无时间'}}</span>
          </div>-->
        </div>
        <div class="handover-info">
          <div class="title">交接人信息</div>
          <div class="line">
            <div class="pic">
              <el-image
                style="width: 48px; height: 48px; "
                :src="pdfkForm.jjr_photo || emptyImg"
                :preview-src-list="pdfkjjrList"
                :fit="fit">
              </el-image>
            </div>
            <div class="msg">
              <div class="name">{{pdfkForm.jjrxm}}</div>
              <div>
                <span><i class="iconfont icon-shouji" title="联系方式"></i>{{pdfkForm.jjrlxdh}}</span>
                <span><i class="iconfont icon-shenfenzheng" title="身份证"></i>{{pdfkForm.jjrzjh}}</span>
              </div>
            </div>
          </div>
          <div class="title">司机信息</div>
          <div class="line">
            <div class="pic">
              <el-image
                style="width: 48px; height: 48px; "
                :src="pdfkForm.sj_photo || emptyImg"
                :preview-src-list="pdfksjList"
                :fit="fit">
              </el-image>
            </div>
            <div class="msg">
              <div class="name">{{pdfkForm.sjmc}}</div>
              <div>
                <span><i class="iconfont icon-shouji" title="联系方式"></i>{{pdfkForm.sjdh}}</span>
                <span><i class="iconfont icon-shenfenzheng" title="身份证"></i>{{pdfkForm.sjsfz}}</span>
                <span><i class="iconfont icon-huaban" title="车次号"></i>{{pdfkForm.cch}}</span>
                <span><i class="iconfont icon-chepaihao" title="车牌号"></i>{{pdfkForm.cph}}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="title">同行人员</div>
          <el-table ref="multipleTable" :data="pdfkTableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="rylx_text" label="人员类型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="人员图片" :show-overflow-tooltip="true" width="100">
              <template slot-scope="scope">
                <img :src="scope.row.imgurl||emptyImg" alt="" height="50" width="50" style="float:left">
              </template>
            </el-table-column>
            <el-table-column prop="ryxm" label="人员姓名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rylxdh" label="联系电话" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ryzjh" label="证件号" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog   :title="bt+title" :visible.sync="dialogwzjj" width="60%" :append-to-body="true">
      <div class="dialog">
        <div class="handover-info">
          <div class="title">交接信息</div>
          <div class="line">
            <div class="pic goods">
              <el-image
                style="width: 80px; height: 80px; "
                :src="pdfkForm.jjphoto || emptyImg"
                :preview-src-list="wzjjjjList"
                :fit="fit">
              </el-image></div>
            <div class="apply-info">
              <div class="item">
                <span><label>申请单号</label>{{pdfkForm.sqdh}}</span>
              </div>
              <div class="item">
                <span><label>运单号</label>{{pdfkForm.ydh}}</span>
              </div>
              <div class="item">
                <span><label>物流状态</label>{{pdfkForm.status_text}}</span>
              </div>
              <div class="item">
                <span><label>交接状态</label>{{pdfkForm.jjzt_text}}</span>
              </div>
             <!-- <div class="item">
                <span><label>交接时间</label>{{pdfkForm.jjsj}}</span>
              </div>-->
            </div>
          </div>
          <div class="title">交接人信息</div>
          <div class="line">
            <div class="pic">
              <el-image
                style="width: 48px; height: 48px; "
                :src="pdfkForm.jjr_photo || emptyImg"
                :preview-src-list="wzjjjrList"
                :fit="fit">
              </el-image>
            </div>
            <div class="msg">
              <div class="name">{{pdfkForm.jjrxm}}</div>
              <div>
                <span><i class="iconfont icon-shouji" title="联系方式"></i>{{pdfkForm.jjrlxdh}}</span>
                <span><i class="iconfont icon-shenfenzheng" title="身份证"></i>{{pdfkForm.jjrzjh}}</span>
              </div>
            </div>
          </div>
          <div>
          </div>
          <div class="title">交接清单</div>
          <el-table ref="multipleTable" :data="pdsqTableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzlb" label="物证类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sldw" label="数量及单位" width="100" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="bt+title" :visible.sync="dialogpdhc" width="60%" :append-to-body="true">
      <div class="dialog">
        <div class="handover-info">
          <div class="title">交接信息</div>
          <div class="line">
            <!--<div class="pic goods">
              <el-image
                style="width: 75px; height:75px; "
                :src="pdhcForm.czr_photo || emptyImg"
                :preview-src-list="hpdhcsjList"
                :fit="fit">
              </el-image>
            </div>-->
            <div class="apply-info">
              <div class="item">
                <span><label>申请单号</label>{{pdhcForm.sqdh}}</span>
              </div>
              <div class="item">
                <span><label>单号类型</label>{{pdhcForm.dhlx_text}}</span>
              </div>
              <div class="item">
                <span><label>仓库编码</label>{{pdhcForm.ckbm}}</span>
              </div>
              <div class="item">
                <span><label>仓库名称</label>{{pdhcForm.ckmc}}</span>
              </div>
             <!-- <div class="item">
                <span><label>回传时间</label>{{pdhcForm.hcsj||'暂无时间'}}</span>
              </div>-->
            </div>
          </div>
          <div class="title">操作人信息</div>
          <div class="line">
            <div class="pic">
              <el-image
                style="width: 48px; height:48px; "
                :src="pdhcForm.czr_photo || emptyImg"
                :preview-src-list="hpdhczrList"
                :fit="fit">
              </el-image>
            </div>
            <div class="msg">
              <div class="name">{{pdhcForm.czr}}</div>
              <div>
                <span><i class="iconfont icon-shenfenzheng" title="身份证"></i>{{pdhcForm.sfzh}}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="title">回传物证清单</div>
          <el-table ref="multipleTable" :data="pdhcTableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="kclx_text" label="库存类型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="xdsl" label="下单数量" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sssl" label="实收数量" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="kw" label="库位" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="物流跟踪" :visible.sync="dialogwlxx" width="60%" :append-to-body="true">
      <div class="dialog">
        <!-- <div class="title">您的包裹正在路上</div> -->
        <div class="logistics-msg" >
          <div v-for="item in wlgzTable" :key="item.time">
          <div class="line" >
            <span class="date">{{item.time}}</span>
            <!-- <span>10:45:23</span> -->
            <span>{{item.msg}}</span>
          </div>

          </div>

          <!--  <div class="line">
            <span class="date">2019-12-10 周四</span>
            <span>10:11:23</span>
            <span>包裹正在等待揽收</span>
          </div>
          <div class="line same-day">
            <span>10:45:23</span>
            <span>包裹正在等待揽收</span>
          </div> -->
        </div>
        <!-- <div class="title">物流信息</div> -->
      </div>
    </el-dialog>
    <el-dialog :title="bt+title" :visible.sync="dialogqsxx" width="60%" :append-to-body="true">
      <div class="dialog">
        <div class="title">签收信息</div>
        <div class="apply-info">
          <div class="item">
            <span><label>申请单号</label>{{pdfkForm.sqdh}}</span>
          </div>
          <div class="item">
            <span><label>运单号</label>{{pdfkForm.ydh}}</span>
          </div>
          <div class="item">
            <span><label>签收人</label>{{pdfkForm.qsr}}</span>
          </div>
          <!--<div class="item">
            <span><label>签收时间</label>{{pdfkForm.qssj}}</span>
          </div>-->
          <div class="item">
            <span><label>签收状态</label>{{pdfkForm.qszt_text}}</span>
          </div>
        </div>
        <div class="title">签收清单</div>
        <el-table ref="multipleTable" :data="pdsqTableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzlb" label="物证类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="pdsl" label="派单数量" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="qssl" label="签收数量" width="100" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog  :title="bt+title" :visible.sync="dialoghdxx" width="30%" :append-to-body="true">
      <div class="dialog">
        <div class="title">回单信息</div>
        <div class="line">
          <div class="pic">
            <el-image
              style="width: 200px; height:200px; "
              :src="pdfkForm.hdtp || emptyImg"
              :preview-src-list="hdxxtpList"
              :fit="fit">
            </el-image>
          </div>
          <!--<div class="msg">
            <div class="name">{{pdfkForm.czsj}}</div>
          </div>-->
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat} from '@/utils/datetime'

  export default {
    name: "rwgzyl",
    data() {
      return {
        hasData: false,
        barData: [],
        finishedArr: [],
        unfinishedArr: [],
        curPrePoint: null,
        len: 0,
        emptyImg: require("@/images/no-img.png"),
        tableData: [],
        pdsqTableData: [],
        pdfkTableData: [],
        pdhcTableData: [],
        pdsqForm: {},
        pdfkForm: {},
        wzjjForm: {},
        pdhcForm: {},
        wlxxForm: {},
        dialogpdsq: false,
        dialogpdfk: false,
        dialogwzjj: false,
        dialogpdhc: false,
        dialogwlxx: false,
        dialogqsxx: false,
        dialoghdxx: false,
        hasWl: '0',
        isFail:false,
        title:'',
        pdfkjjrList:[require("@/images/no-img.png")],
        pdfksjList:[require("@/images/no-img.png")],
        wzjjjjList:[require("@/images/no-img.png")],
        wzjjjrList:[require("@/images/no-img.png")],
        hdxxtpList:[require("@/images/no-img.png")],
        hpdhcsjList:[require("@/images/no-img.png")],
        hpdhczrList:[require("@/images/no-img.png")],
        fit:'contain',
        bt:'',
        wlgzTable:[{time:"2019-12-21 15:12:10",msg:"测试测试1"},{time:"2019-12-21 15:12:09",msg:"测试测试2"}]

      }
    },
    created() {
      let that = this
      that.getData();
      if (JSON.parse(sessionStorage.getItem('rwgzyl')).sfwlps) {
        //debugger
        that.hasWl = JSON.parse(sessionStorage.getItem('rwgzyl')).sfwlps
        if(that.hasWl=='是'){
          that.hasWl='1'
        }
        if(that.hasWl=='否'){
          that.hasWl='0'
        }
        if(that.hasWl==''){
          that.hasWl='0'
        }
      }
    },
    methods: {
      getData() {
        let that = this
        var params = {
          ywcb_id: JSON.parse(sessionStorage.getItem('rwgzyl')).ywcb_id||JSON.parse(sessionStorage.getItem('rwgzyl')).id
        }
        Object.assign({}, params)
        this.$api.rwgz.queryDetail(params).then((res) => {
          this.$nextTick(() => {
              if (Object.keys(res.body).length != 0) {
                that.hasData = true
                let data = res.body.default.dataset
                for (let i = 0; i < data.length; i++) {
                  data[i].czsj = timeFormat(data[i].czsj)
                  data[i].style = that.getZIndex(data[i].jdsx)
                  data[i].barCls = 'bar-info'
                  if (data[i + 1]) {
                    if (data[i].sfdd === '1' && data[i + 1].sfdd === '1') {
                      data[i].cls = 'complete'
                    } else if (data[i].sfdd === '1' && data[i].rwzt === '2') {
                      data[i - 1].cls = 'fail'
                      data[i].cls = 'fail-next'
                      data.isFail = true
                    } else {
                      data[i].cls = ''
                    }
                    if (!data[i].cznr && data[i].dqjdmc != '开始' && data[i].dqjdmc != '结束') {
                      data[i].cznr = '暂无信息'
                      data[i].cls = 'text-min hidden'
                    }
                  } else {
                    if (data[i].sfdd === '1') {
                      data[i].cls = 'complete'
                    } else {
                      if (!data[i].cznr && data[i].dqjdmc != '开始' && data[i].dqjdmc != '结束') {
                        data[i].cznr = '暂无信息'
                        data[i].cls = 'text-min hidden'
                      }
                      data[i].cls = 'hidden'
                    }
                  }
                  that.barData.push(data[i])
                }
                that.barData[0].cznr = '任务开始'
                that.barData[that.barData.length - 1].cznr = '任务结束'
                that.barData[that.barData.length - 1].barCls = '任务结束'
              } else {
                this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
              }
            }
          )
        })
      },
      getIcon(data) {
        return 'icon-weitaoshuzi' + data
      },
      getZIndex(data) {
        return 'z-index:' + (data + 1)
      },
      getEvent(data) {
        let that = this
        if(data.sfdd=='0'){
          return false
        }

      that.title = '【'+timeFormat(data.czsj)+'】'
      that.bt = data.dqjdmc
        switch (data.bz) {
          case 'pd':
            that.pdsqOpen(data)
            break
          case 'fk':
            that.pdfkOpen(data)
            break
          case 'jj':
            that.wzjjOpen(data)
            break
          case 'cc':
            that.pdhcOpen(data)
            break
          case 'qs':
            that.qsxxOpen(data)
            break
          case 'hd':
            that.hdxxOpen(data)
            break
        }
      },
      pdsqOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdsqSqxx(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialogpdsq = true;
              this.pdsqForm = res.body.data
              this.pdsqForm.yyjjsjq = timeFormat(this.pdsqForm.yyjjsjq)
              this.pdsqForm.yyjjsjz = timeFormat(this.pdsqForm.yyjjsjz)
              this.pdsqForm.sqsj = timeFormat(this.pdsqForm.sqsj)
              that.$api.rwgz.getWlfkPdsqWzxx(params).then((res) => {
                that.$nextTick(() => {
                  that.pdsqTableData = res.body.default.dataset
                })
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }

          })
        })
      },
      pdfkOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdfkxx(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialogpdfk = true;
              this.pdfkForm = res.body.data


              if(this.pdfkForm.jjr_photo!=null && this.pdfkForm.jjr_photo!=""){
                this.pdfkjjrList=[];
                this.pdfkjjrList.push(this.pdfkForm.jjr_photo)
              }

              if(this.pdfkForm.sj_photo!=null && this.pdfkForm.sj_photo!=""){
                this.pdfksjList=[];
                this.pdfksjList.push(this.pdfkForm.sj_photo)
              }

              that.$api.rwgz.getWlfkPdfkTxryxx(params).then((res) => {
                that.$nextTick(() => {
                  that.pdfkTableData = res.body.default.dataset
                })
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      wzjjOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdfkxx(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialogwzjj = true;
              this.pdfkForm = res.body.data
              this.pdfkForm.jjsj = timeFormat(this.pdfkForm.jjsj)

              if(this.pdfkForm.jjphoto!=null && this.pdfkForm.jjphoto!=""){
                this.wzjjjjList=[];
                this.wzjjjjList.push(this.pdfkForm.jjphoto)
              }

              if(this.pdfkForm.jjr_photo!=null && this.pdfkForm.jjr_photo!=""){
                this.wzjjjrList=[];
                this.wzjjjrList.push(this.pdfkForm.jjr_photo)
              }

              that.$api.rwgz.getWlfkPdsqWzxx(params).then((res) => {
                that.$nextTick(() => {
                  that.pdsqTableData = res.body.default.dataset
                })
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      pdhcOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdhcCc(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialogpdhc = true;
              this.pdhcForm = res.body.data

              if(this.pdhcForm.czr_photo!=null && this.pdhcForm.czr_photo!=""){
                this.hpdhczrList=[];
                this.hpdhczrList.push(this.pdhcForm.czr_photo)
              }

              if(this.pdhcForm.czr_photo!=null && this.pdhcForm.czr_photo!=""){
                this.hpdhcsjList=[];
                this.hpdhcsjList.push(this.pdhcForm.czr_photo)
              }

              that.$api.rwgz.getWlfkPdhcCcWzxx(params).then((res) => {
                that.$nextTick(() => {
                  that.pdhcTableData = res.body.default.dataset
                })
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      wlxxOpen(data) {
        let that = this
        that.dialogwlxx = true;
      },
      qsxxOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdfkxx(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialogqsxx = true;
              this.pdfkForm = res.body.data
              this.pdfkForm.qssj = timeFormat(this.pdfkForm.qssj)
              that.$api.rwgz.getWlfkPdsqWzxx(params).then((res) => {
                that.$nextTick(() => {
                  that.pdsqTableData = res.body.default.dataset
                })
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      hdxxOpen(data) {
        let that = this
        var params = {
          sqdh: data.zrwdh
        }
        this.$api.rwgz.getWlfkPdfkxx(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              this.dialoghdxx = true;
              this.pdfkForm = res.body.data
              this.pdfkForm.czsj =  timeFormat(this.pdfkForm.czsj)
              if(this.pdfkForm.hdtp!=null && this.pdfkForm.hdtp!=""){
                this.hdxxtpList=[];
                this.hdxxtpList.push(this.pdfkForm.hdtp)
              }
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      close() {
        this.$util.goBack(this)
      },
      wldetail() {
        var param = {
           sqdh:JSON.parse(sessionStorage.getItem('rwgzyl')).zrwdh
        };

        this.$api.rwgz.queryWlxx(param).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
             this.wlgzTable = res.body.default.wlxx
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })

        })
        this.dialogwlxx = true
        //this.$message({message: '暂未查到任何物流信息！', type: 'warning'})
      },
    },
  }
</script>

<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../../styles/deep-ele';
  @import '../page-main';
  @import "../../styles/iconfont/iconfont.css";

  /deep/ .el-dialog__body {
    padding-top: 10px;
  }

  .wrapper {
    background-color: #f5f5f5;
  }

  .time-line {
    display: flex;
    height: 590px;
    padding: 20px 120px;
    justify-content: center;
    position: relative;
    left: 60px;

    .item {
      /*width: 14.28%;*/
      width: 180px;
      display: flex;
      align-items: center;

      .bar {
        height: 0;
        width: 0;
        background: #e6e6e6;
        position: relative;
        z-index: 666;

        .icon {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: -30px;
          transform: translate(0, -50%);
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
          font-style: normal;

          &:before {
            font-size: 22px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #9c9c9c;
          }

          &.first {
            right: auto;
            left: -30px;

            &:after {
              top: auto;
              bottom: -54px;
            }

            .type-icon {
              top: 70px;
            }

            .text-box {
              top: auto;
              bottom: -110px;
            }
          }

          &:after {
            content: "";
            border-left: 1px solid #808080;
            position: absolute;
            left: 50%;
            top: -54px;
            transform: translate(-50%, 0);
            height: 54px;
          }

          .type-icon {
            display: block;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #ebebeb;
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translate(-50%, 0);
            background: #fff;
            z-index: 23;
            text-align: center;
            line-height: 28px;

            &:before {
              font-size: 16px;
              color: #999;
            }
          }

          .text-box {
            position: absolute;
            bottom: 110px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 185px;
            min-height: 58px;
            border: 1px dashed #ebebeb;
            background: #fff;
            font-size: 12px;
            color: #696969;
            padding: 6px 5px 6px 7px;
            box-sizing: border-box;
            z-index: 24;
            line-height: 18px;

            span {
              display: block;
            }

            .important {
              color: #333;
              padding-right: 5px;
              font-weight: bold;
              font-style: normal;
            }
          }
        }

        .pointer {
          cursor: pointer;
        }
      }

      .bar-info {
        height: 10px;
        background: #e6e6e6;
        width: 100%;
        position: relative;
        z-index: 666;

        .icon {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          right: -30px;
          transform: translate(0, -50%);
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
          font-style: normal;

          &:before {
            font-size: 22px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #9c9c9c;
          }

          &.first {
            right: auto;
            left: -30px;

            &:after {
              top: auto;
              bottom: -54px;
            }

            .type-icon {
              top: 70px;
            }

            .text-box {
              top: auto;
              bottom: -110px;
            }

            .text-top {
              .icon {
                &:before {
                }

                &:after {
                  top: auto;
                  bottom: -54px;
                }

                .type-icon {
                  top: 70px;
                }

                .text-box {
                  top: 110px;
                  bottom: auto;
                }
              }

              /*  position: absolute;
                bottom: 110px;
                left: 50%;
                -webkit-transform: translate(-50%, 0);
                transform: translate(-50%, 0);
                width: 185px;
                min-height: 58px;
                border: 1px dashed #ebebeb;
                background: #fff;
                font-size: 12px;
                color: #696969;
                padding: 6px 5px 6px 7px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                z-index: 24;
                line-height: 18px;
               !* &:after {
                  content: "";
                  border-left: 1px solid #808080;
                  position: absolute;
                  left: 50%;
                  top: -54px;
                  transform: translate(-50%, 0);
                  height: 54px;
                }*!*/
            }
          }

          &:after {
            content: "";
            border-left: 1px solid #808080;
            position: absolute;
            left: 50%;
            top: -54px;
            transform: translate(-50%, 0);
            height: 54px;
          }

          .type-icon {
            display: block;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #ebebeb;
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translate(-50%, 0);
            background: #fff;
            z-index: 23;
            text-align: center;
            line-height: 28px;

            &:before {
              font-size: 16px;
              color: #999;
            }
          }

          .text-box {
            position: absolute;
            bottom: 110px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 185px;
            min-height: 58px;
            border: 1px dashed #ebebeb;
            background: #fff;
            font-size: 12px;
            color: #696969;
            padding: 6px 5px 6px 7px;
            box-sizing: border-box;
            z-index: 24;
            line-height: 18px;

            span {
              display: block;
            }

            .important {
              color: #333;
              padding-right: 5px;
              font-weight: bold;
              font-style: normal;
            }
          }
        }

        .pointer {
          cursor: pointer;
        }
      }

      &.complete {
        .bar {
          background: #2570b3;

          .icon {
            &:before {
              color: #2570b3;
            }
          }
        }
      }

      /*失败*/

      &.fail {
        .bar {
          background: #e53c1b;

          .icon {
            &:before {
              color: #2570b3;
            }

            .type-icon {
              background: #2570b3;

              &:before {
                color: #fff;
              }
            }
          }
        }
      }

      &.fail-next {
        .bar {
          .icon {
            &:before {
              color: #e53c1b;
            }

            .type-icon {
              background: #e53c1b;

              &:before {
                color: #fff;
              }
            }
          }
        }
      }

      /*
            &.fail {
              .bar {
                background: #e53c1b;

                .icon {
                  &:before {
                    color: #e53c1b;
                  }

                  .type-icon {
                    background: #e53c1b;

                    &:before {
                      color: #fff;
                    }
                  }
                }
              }
            }
      */

      &:nth-child(2n) {
        .icon {
          &:before {
            /*color: #e53c1b;*/
          }

          &:after {
            top: auto;
            bottom: -54px;
          }

          .type-icon {
            top: 70px;
          }

          .text-box {
            top: 110px;
            bottom: auto;
          }
        }
      }

      &:last-child, &:first-child, &.text-min {
        .icon {
          .text-box {
            min-height: 30px;
            padding-right: 10px;
            width: 80px !important;
            text-align: left;
          }
        }
      }
      &.hidden{
        .icon{
          &:after,.type-icon,.text-box{
            display: none !important;
          }
        }
      }
    }
  }

  /* 弹窗*/
  .dialog {
    padding: 0 10px;

    .title {
      height: 28px;
      font-size: 14px;
      font-weight: bold;
      line-height: 28px;
      border-bottom: 1px solid #808080;
      padding: 0 10px;
      .rollback{
        color: #e53c1b;
        font-weight: 700;
      }
    }

    .apply-info {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px dashed #eee;
      padding: 4px 0;
      margin: 0 10px;

      .item {
        width: 50%;
        font-size: 12px;
        line-height: 28px;

        label {
          color: #999;
          padding-right: 8px;
        }

        span {
          color: #333;
        }
      }
    }

    .address {
      padding: 10px 0;
      margin: 0 10px;

      .line {
        line-height: 24px;
        padding: 0 0 20px;
        font-size: 12px;
        position: relative;

        &:before {
          content: "";
          height: 100%;
          border-left: 1px solid #808080;
          position: absolute;
          top: 0;
          left: 11px;
        }

        &:last-child {
          padding-bottom: 0;
        }

        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          font-size: 12px;
          background: #2e90e6;
          display: inline-block;
          margin-right: 5px;
          position: relative;
          z-index: 3;
          font-style: normal;

          &.receipt {
            background: #f1af00;
          }
        }
      }
    }

    /*  交接信息*/

    .handover-info {
      .title {
        color: #999;
        border-bottom: 0;
      }

      .line {
        border-bottom: 1px dashed #eee;
        position: relative;
        display: flex;
        font-size: 12px;
        padding: 10px 0;
        margin: 0 10px;

        .pic {
          width: 48px;
          height: 48px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }

          &.goods {
            width: 80px;
            height: 80px;
            border-radius: 0;
            flex-basis: 80px;
          }
        }

        .msg {
          flex-grow: 1;
          padding: 0 0 0 10px;
          display: flex;
          align-content: center;
          flex-wrap: wrap;

          div {
            width: 100%;
            line-height: 24px;
          }

          .name {
            font-weight: bold;
          }

          span {
            padding-right: 18px;

            i {
              display: inline-block;
              padding-right: 3px;

              &:before {
                font-size: 16px;
              }
            }
          }
        }
      }

      .apply-info {
        margin: 0;
        padding: 0 10px;
        flex-grow: 1;
        border-bottom: 0;
        box-sizing: border-box;
      }
    }
  }

  /*  物流进度*/
  .logistics-msg {
    font-size: 12px;
    position: relative;
    margin: 5px 6px;

    &:before {
      content: "";
      border-left: 2px solid #808080;
      position: absolute;
      height: 100%;
      left: 6px;
      top: 8px;
    }

    &:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      left: 0;
      bottom: -8px;
      background: #fff;
      z-index: 2;
    }

    .line {
      line-height: 30px;
      padding-left: 20px;
      position: relative;
      z-index: 5;

      &:before {
        content: "";
        width: 14px;
        height: 14px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }

      &:after {
        content: "";
        width: 6px;
        height: 6px;
        background: #808080;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translate(0, -50%);
        z-index: 2;
      }

      span {
        padding-right: 10px;
      }

      .date {
        font-weight: bold;
        width: 150px;
        display: inline-block;
      }

      /*  同一天信息*/

      &.same-day {
        padding-left: 141px;
      }

      &:last-child {
        &:after {
          background: #f1af00;
        }
      }
    }
  }
</style>
