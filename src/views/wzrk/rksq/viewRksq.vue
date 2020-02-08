<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  /deep/ .el-dialog__body {
    padding-top: 0px;
  }

  .main-con {
    padding: 0 5px;
    .btn-text-box{
      margin-top: 10px;
      .btn-text {
        float: right;
        span {
          .line {
            width: 100px;
            border: none;
            border-bottom: 1px solid #000;
            line-height: 20px;
          }
          em{
            font-style: normal;
          }
          line-height: 32px;
          padding: 30px;
        }
      }
    }
    .btn-box{
      float: right;
      margin-top: 20px;
    }
  }
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            入库申请信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="6">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="入库流水号" clase="large">
                      <el-input v-model="formInline.lsh" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请时间">
                      <el-input v-model="formInline.sqsj" size="mini" clearable readonly="readonly"
                                style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请人">
                      <el-input v-model="formInline.sqrxm" size="mini" clearable readonly="readonly"
                                style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请部门">
                      <el-input v-model="formInline.sqbmmc" size="mini" clearable readonly="readonly"
                                style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-form-item label="状态">
                    <el-input v-model="formInline.zjzt" size="mini" clearable readonly="readonly" style="width: 190px">
                    </el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-dialog
        title="取件交接清单"
        :visible.sync="pdjjDialog"
        :append-to-body="true"
        :modal="true"
        width="60%"
        class="main-con">
        <el-divider content-position="left">申请信息</el-divider>
        <el-form :model="wlpdxx" label-width="100px" size="mini" label-position="right">

          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <el-input v-model="wlpdxx.sqdh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请单位">
                <el-input v-model="wlpdxx.sq_sqdw" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请人">
                <el-input v-model="wlpdxx.sq_sqrxm" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="申请人电话">
              <el-input v-model="wlpdxx.sq_phone" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间">
                <el-input v-model="wlpdxx.sq_sqsj" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-divider content-position="left" style="margin-top: 0px">派单反馈信息</el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <el-input v-model="wlpdxx.sqdh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运单号">
                <el-input v-model="wlpdxx.ydh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="取件人">
                <el-input v-model="wlpdxx.jjrxm" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="取件人电话">
                <el-input v-model="wlpdxx.jjrlxdh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="取件人证件号">
                <el-input v-model="wlpdxx.jjrzjh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="8">
              <el-form-item label="车次号">
                <el-input v-model="wlpdxx.cch" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车牌号">
                <el-input v-model="wlpdxx.cph" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="司机名称">
                <el-input v-model="wlpdxx.sjmc" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="司机电话">
                <el-input v-model="wlpdxx.sjdh" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="司机身份证号">
                <el-input v-model="wlpdxx.sjsfz" size="mini" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="24" v-show="showTxry">
            <el-divider content-position="left">同行人员</el-divider>
            <el-table ref="multipleTable" :data="txrylist" :header-cell-style="{background:'#e6e6e6'}"
                      tooltip-effect="dark" border style="width: 100%" size="mini">
              <el-table-column prop="xh" label="序号" width="50"></el-table-column>
              <el-table-column prop="rylx_text" label="人员类型" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="ryxm" label="人员名称" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="rylxdh" label="人员联系电话" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="ryzjh" label="人员证件号" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-divider content-position="left">物证信息</el-divider>
            <el-table ref="multipleTable" :data="wzxxlist" :header-cell-style="{background:'#e6e6e6'}"
                      tooltip-effect="dark" border style="width: 100%" size="mini">
              <el-table-column prop="xh" label="序号" width="50" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="dwwzbm" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="wzlb" label="物证类别" width="100" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="sldw" label="数量及单位" width="100" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="wztz" label="特征描述" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="btn-text-box">
          <div class="btn-text">
            <span>申请人/移交人：<input class="line"></span>
            <span>取件人：<input class="line"></span>
          </div>
        </el-row>
        <el-row class="btn-text-box">
          <div class="btn-text">
            <span>取件日期：<em class="line">{{wlpdxx.jjsj}}</em></span>
          </div>
        </el-row>
        <el-row>
          <div class="btn-box">
          <span slot="footer" class="dialog-footer">
            <el-button type="info" size="mini" v-show="jjylShow" @click="printHandle">预览/打印</el-button>
            <el-button type="info" size="mini" v-show="jjczShow" @click="sxqz">手写签字</el-button>
            <el-button type="primary" size="mini" v-show="jjczShow" @click="configWlpd">确认完成</el-button>
            <el-button type="primary" size="mini" v-show="jjylShow" @click="wjxz">下载</el-button>
            <el-button @click="pdjjDialog = false"  size="mini">取消</el-button>
          </span>
          </div>
        </el-row>
      </el-dialog>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            任务清单
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange" @expand-change="getWzmx">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" tooltip-effect="dark" style="width: 100%" border
                        size="mini" :header-cell-style="{background:'#e6e6e6'}">
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="100">
                  <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzsl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true" width="100"></el-table-column>
                <el-table-column prop="wztz" label="物证特征" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="jjsj" label="交接时间" :formatter="dateFormat" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="jjzt" label="交接状态" :formatter="formatMxjjzt" :show-overflow-tooltip="true" width="100"></el-table-column>
                <el-table-column label="操作" width="50" align="center">
                  <template slot-scope="scope">
                    <i   class="el-icon-printer" style="font-size: 20px;cursor: pointer" title="预览" @click="barcode(scope.row)"></i>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zrwdh" label="任务单号" min-width="170px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bgzx" label="保管中心" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bgqx" label="保管期限" :formatter="formatBgqx"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjrmc" label="交接人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rkyy" label="入库原因" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sltj" label="物证数量/退回数量" width="125px" :formatter="formatSl"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rwzt" label="任务状态" min-width="80px" :formatter="formatRwzt"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjzt" label="交接状态" min-width="80px" :formatter="formatCbjjzt"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="state" label="派单状态" width="80px" :show-overflow-tooltip="true" :formatter="formatState"></el-table-column>
          <el-table-column prop="created_time" label="创建时间" width="140px" :formatter="dateFormat"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sfwlps" label="物流配送" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="120" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.pdxx_jjzt =='0' && scope.row.state!='0' && scope.row.state!='1' && scope.row.state!='7'" class="el-icon-edit"
                 style="font-size: 20px;" title="物流派单交接" @click="pdjj(scope.row,'jj')"></i>
              <i   class="el-icon-view"
                  style="font-size: 20px;" title="任务流程跟踪" @click="rwgz(scope.row)"></i>
              <i  class="el-icon-close" v-if= "scope.row.state=='1'"
                  style="font-size: 20px;" title="派单撤销" @click="pdcx(scope.row)"></i>
              <i  class="el-icon-circle-close" v-if= "scope.row.state=='8'"
                  style="font-size: 20px;" title="派单强制撤销" @click="pdqzcx(scope.row)"></i>
              <i  class="el-icon-tickets" v-if="scope.row.pdxx_jjzt=='1'"
                  style="font-size: 20px;" title="交接文件预览" @click="pdjj(scope.row,'yl')"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="page" style="">
          <div class="page-content">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="条码预览" :visible.sync="tmDialog" width="40%"
               :append-to-body="true"
               :modal="true">
      <div ref="print" style="border-radius: 12px;border: 0px solid #000;">
        <div class="content" style="margin:20px 30px 10px 15px;border: 1px solid #000">
          <div style="text-align: center;">
            <img id="barcode" style="height: 60px;width: 210px">
          </div>
          <div style="margin-left:15px;padding-bottom: 18px;" class="myprint">
            <!-- <div style="width:450px;"> -->
            <p style="font-family: '黑体';font-size: 8px;font-weight: 800">物证名称：{{tempRow.wzmc}}</p>
            <p style="font-family: '黑体';font-size: 8px;font-weight: 800">类别数量：{{tempRow.wzlb}} {{tempRow.wzsl}}</p>
            <p style="font-family: '黑体';font-size: 8px;font-weight: 800">特征描述：{{tempRow.wztz}}</p>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: flex-end;align-items: center;margin-top: 20px;">
        <el-button type="info" size="mini" @click="doPrint()">打印</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="60%" :modal="false">
      <div slot="header" class="" style="">
        <span>存放位置树</span>
      </div>
      <div class="text item">
        <div class="wzcw_tree" style="height: 55vh;overflow-y: auto">
          <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
          <el-tree
            class="filter-tree"
            :data="treeData"
            :props="treeProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </div>
      </div>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>

<script>
import casePreview from '../../my-components/casePreview/casePreview'
import {timeFormat} from '@/utils/datetime'
import JsBarcode from 'jsbarcode'
import pdf from 'vue-pdf'
export default {
  name: 'entryRegistration',
  components: {
    casePreview,
    pdf
  },
  data () {
    return {
      yuming: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      viewVisible: false, // 弹框隐藏
      fileType: 'pdf', // 文件类型
      pdfsrc: '', // 文件地址
      tempRow: {},
      tmDialog: false,
      formInline: this.$route.params,
      options: [
        {value: 'xm', label: '录入人员'},
        {value: 'fz', label: '录入人员'},
        {value: 'sh', label: '移库'}
      ],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      centerDialogVisible: false,
      wzxx_id: '',
      multipleSelection: [],
      filterText: '',
      treeData: [],
      ywcbid: '',
      treeProps: {
        children: 'child',
        label: 'name'
      },
      dialogVisible: false,
      pdjjDialog: false,
      wzmxTableData: [],
      wlpdxx: {},
      txrylist: [],
      wzxxlist: [],
      jjczShow: true,
      jjylShow: false,
      showTxry:false

    }
  },
  created () {
    this.init()
    // this.pdfsrc = pdf.createLoadingTask(this.pdfsrc)
  },
  computed: {
    nameSize () {
      return this.$contants.pageSet.nameSize
    },
    accountSize () {
      return this.$contants.pageSet.accountSize
    },
    backgroundColor () {
      return this.$contants.pageSet.backgroundColor
    }
  },
  methods: {
    init () {
      this.formInline = JSON.parse(sessionStorage.getItem('ckrksqxx'))
      this.formInline.sqsj = timeFormat(JSON.parse(sessionStorage.getItem('ckrksqxx')).sqsj)
      this.formInline.zjzt = this.formatZbzt(JSON.parse(sessionStorage.getItem('ckrksqxx')).zjzt)
      this.findTable()
    },
    printHandle () {
      let param = {
        id:this.ywcbid
      };
      this.$api.rksq.exportWlpdWord(param).then((res) => {
        if (res.success == "true") {
          if (!/\.(pdf|PDF)$/.test(pdf)) {
            let pdfurl = res.data
            window.open(
              // 'https://view.officeapps.live.com/op/view.aspx?src=' + this.yuming + '/anli?id=' + row.id,
              // 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
              pdfurl
            )
            return false
          } else {
            this.$message({message:'文件格式出现异常', type: 'error'})
          }
        } else {
            this.$message({message: res.message, type: 'error'})
        }
      })
    },
    // 条形码打印
    doPrint () {
      this.$print(this.$refs.print)
    },
    barcode (row) {
      this.tempRow = row
      this.tmDialog = true
      this.$nextTick(() => {
        JsBarcode('#barcode', row.dwwzbm, {
          format: 'CODE128', // 选择要使用的条形码类型
          fontOptions:"bold",//使文字加粗体或变斜体
          fontSize: '18px',
          text: row.dwwzbm,
          marginTop:10,
          displayValue: true, // 是否在条形码下方显示文字
          textPosition: 'bottom' // 设置文本的垂直位置,
        })
      })
    },
    setDialogVal (val) {
      this.centerDialogVisible = val
    },
    caseThingName (wzxx_id) {
      this.wzxx_id = wzxx_id;
      this.centerDialogVisible = true
    },
    dateFormat (row, column, cellValue, index) {
      return timeFormat(cellValue)
    },
    // 左侧树
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    changePage (index) {
      // 分页点击事件
      this.currentPage = parseInt(index)
    },
    pdjj (row, type) {
      if (type === 'jj') {
        this.jjczShow = true
        this.jjylShow = false
      } else {
        this.jjczShow = false
        this.jjylShow = true
      }
       this.wlpdxx={}
       this.txrylist=[]
       this.wzxxlist=[]
      this.ywcbid = row.id
      var param = {
        id: row.id
      }
      this.$api.rksq.getWlpdInfo(param).then((res) => {
        this.$nextTick(() => {
          this.wlpdxx = res.body.wlpdxx
          this.pdjjDialog = true
        })
      })
      this.$api.rksq.getWlpdTxryxx(param).then((res) => {
        this.$nextTick(() => {
          if (Object.keys(res.body.default).length != 0) {
                        this.txrylist = res.body.default.dataset
                        this.showTxry = true
                      }else{
                          this.txrylist = []
                          this.showTxry = false
                      }
        })
      })
      this.$api.rksq.queryWlpdJjWzxx(param).then((res) => {
        this.$nextTick(() => {
          this.wzxxlist = res.body.default.dataset
        })
      })
    },
    sxqz () {
      this.$message({
        message: '该功能尚未上线...',
        type: 'warning'
      })
    },
    rwgz (row) {
      sessionStorage.removeItem('rwgzyl')
      sessionStorage.setItem('rwgzyl', JSON.stringify(row))
      this.$router.push({
        name: 'rwgzyl',
        params: {
          id: row.id,
          sfwlps: row.sfwlps
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    configWlpd () {
      this.$confirm('是否确认完成？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          ywcb_id: this.ywcbid
        }
        let that = this
        this.$api.rksq.wlpdHandPver(params).then((res) => {
          if (res.success === 'true') {
            // /*this.$message({message: '操作成功', type: 'success'})
            // this.pdjjDialog = false*/
            var param = {
              id: that.ywcbid
            }
            that.$api.rksq.exportWlpdWord(param).then((res) => {
              if (res.success === 'true') {
                // /*that.$message({message: '操作成功', type: 'success'})*/
                var downloadFileUrl = res.message
                var elemIF = document.createElement('iframe')
                elemIF.src = downloadFileUrl
                elemIF.style.display = 'none'
                document.body.appendChild(elemIF)
                that.pdjjDialog = false
              } else {
                that.$message({message: res.message, type: 'error'})
              }
            })
          } else {
            this.$message({message: '操作失败', type: 'error'})
          }
          this.findTable()
        })
      })
    },
    wjxz () {
      this.downLoadJjwj(this.ywcbid)
    },
    downLoadJjwj (id) {
      let that = this
      var param = {
        id: id
      }
      that.$api.rksq.exportWlpdWord(param).then((res) => {
        if (res.success === 'true') {
          // /*that.$message({message: '操作成功', type: 'success'})*/
          var downloadFileUrl = res.message
          var elemIF = document.createElement('iframe')
          elemIF.src = downloadFileUrl
          elemIF.style.display = 'none'
          document.body.appendChild(elemIF)
          that.pdjjDialog = false
        } else {
          that.$message({message: res.message, type: 'error'})
        }
      })
    },
    findTable () {
      var param = {
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        ywzb_id: this.formInline.id
      }
      this.$api.rksq.queryYwcb(param).then((res) => {
        this.total = Number(res.body.default.count)
        this.tableData = res.body.default.dataset
        var that = this
        this.tableData.forEach(function (c) {
          var param2 = {
            ywcb_id: c.id
          }
          that.$api.rksq.queryYwcbWzmx(param2).then((res) => {
            c.wzmxTableData = res.body.default.dataset
          })
        })
      })
    },
    formatCbjjzt (row, column, cellValue, index) {
      var returnValue = cellValue
      if (cellValue === '0') {
        returnValue = '未领取'
      } else if (cellValue === '1') {
        returnValue = '部分领取'
      } else if (cellValue === '2') {
        returnValue = '全部领取'
      }
      return returnValue
    },
    formatState (row, column, cellValue, index) {
      var returnValue = cellValue
      if (cellValue === '0') {
        returnValue = '待提交'
      } else if (cellValue === '1') {
        returnValue = '已提交'
      } else if (cellValue === '2') {
        returnValue = '已接单'
      } else if (cellValue === '3') {
        returnValue = '配载中'
      } else if (cellValue === '4') {
        returnValue = '已签收'
      } else if (cellValue === '5') {
        returnValue = '已回单'
      } else if (cellValue === '6') {
        returnValue = '撤销中'
      } else if (cellValue === '7') {
        returnValue = '已撤销'
      } else if (cellValue === '8') {
        returnValue = '撤销失败'
      }
      return returnValue
    },
    formatRwzt (row, column, cellValue, index) {
      var returnValue = cellValue
      if (cellValue === '0') {
        returnValue = '初始状态'
      } else if (cellValue === '1') {
        returnValue = '任务开始'
      } else if (cellValue === '2') {
        returnValue = '物流配送中'
      } else if (cellValue === '9') {
        returnValue = '已完成'
      }
      return returnValue
    },
    formatMxjjzt (row, column, cellValue, index) {
      var returnValue = cellValue
      if (cellValue === '0') {
        returnValue = '未交接'
      } else if (cellValue === '1') {
        returnValue = '已交接'
      } else if (cellValue === '2') {
        returnValue = '拒收'
      }
      return returnValue
    },
    formatBgqx (row, column, cellValue, index) {
      var returnValue = cellValue
      if (cellValue === '9999-12-31') {
        returnValue = '长期'
      }
      return returnValue
    },
    formatZbzt (value) {
      var returnValue = value
      if (value === '0') {
        returnValue = '待申请'
      } else if (value === '1') {
        returnValue = '已申请'
      } else if (value === '2') {
        returnValue = '处理中'
      } else if (value === '9') {
        returnValue = '已终结'
      }
      return returnValue
    },
    formatSl (row, column, cellValue, index) {
      return row.sl + '/' + row.backsl
    },
    getWzmx (row, expandedRows) {
      var param = {
        ywcb_id: row.id
      }
      this.$api.rksq.queryYwcbWzmx(param).then((res) => {
        this.wzmxTableData = res.body.default.dataset
      })
    },
    pdcx (row) {
      this.$confirm('确定是否撤销派单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          zrwdh: row.zrwdh
        }
        this.$api.rksq.cancelPd(params).then((res) => {
          if (res.success === 'true') {
            this.$message({message: '操作成功，正在执行撤销', type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
          this.findTable()
        })
      })
    },
    pdqzcx (row) {
      this.$confirm('确定是否强制撤销派单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          zrwdh: row.zrwdh
        }
        this.$api.rksq.qzCancelPd(params).then((res) => {
          if (res.success === 'true') {
            this.$message({message: '强制撤销成功', type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
          this.findTable()
        })
      })
    }
  }
}
</script>
