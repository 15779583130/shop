<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
  @import '../../styles/iconfont/iconfont.css';
  .main-con {
    /deep/ .el-dialog__body {
      padding-top: 10px;
    }
  }

  .main-con {
    padding: 0 5px;
    .btn-text-box {
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
          em {
            font-style: normal;
          }
          line-height: 32px;
          padding: 30px;
        }
      }
    }
    .btn-box {
      float: right;
      margin-top: 20px;
    }
  }

  .desc {
    font-size: 12px;
    padding: 5px 5px 5px 15px;
    background: #FFFDEE;
    border: 1px solid #ff7d59;

    .title {
      font-weight: bold;
    }
  }

  h5 {
    line-height: 36px;
  }

  .table-box {
    border: 1px solid #ddd;
    border-bottom: 0;
    border-right: 0;

    td {
      height: 34px;
      text-align: center;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }

  /deep/ .el-form {
    width: 100%;
    height: 100%;
    position: relative;
    display: block !important;

    .large {
      .el-form-item__label {
        width: 82px !important;
      }

      .el-form-item__content {
        margin-left: 82px !important;
      }
    }
  }
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7; height: 82vh; position: relative;">

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            出库交接
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
              <el-form ref="form" :inline="true" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="12" style="display: flex;">
                    <el-form-item label="人员类型" prop="wzjjrylx">
                      <el-select v-model="formInline.wzjjrylx" placeholder="请选择" @change="changelx">
                        <el-option value="0" label="内部人员"></el-option>
                        <el-option value="1" label="物流人员"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="取件人">
                      <el-input v-model="formInline.jjrzjh" placeholder="请输入系统登录名/身份证件号码/工作证件号码" size="mini" clearable
                                style="width: 290px" @keyup.enter.native="validateUser" @change="recoveryStatus">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="text-align: right;" v-if="pass_status=='primary'">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="validateUser"
                                 v-if="pass_status=='primary'">身份认证
                      </el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;" v-if="pass_status=='success'">
                    <el-form-item label="" class="id-button">
                      <span v-if="pass_status=='success'" style="color: #66C33A" ><i class="el-icon-circle-check el-icon__right" ></i><span>{{dataForm.user_name}}已验证通过</span></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="text-align: right;" v-if="pass_status=='fail'">
                    <el-form-item label="" class="id-button">
                      <el-button type="danger" icon="el-icon-search" size="mini" @click="validateUser">认证失败<i class="el-icon-close el-icon--right"></i></el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            交接列表
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :span="24"
            style="position:absolute;top:130px;left:0;bottom:4px;right:-18px; box-shadow: 0 2px 5px rgba(0,0,0,.1)">
      <el-col :span="6" class="left-side"
              style="overflow: auto;height: 100%; border-right: 1px solid #ddd; padding-left:10px; min-width: 320px;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="batch"
                     size="mini">
          <span>批量处理</span>
        </el-checkbox>
        <span v-if="this.leftList.length>0" style="position: relative;left: 65px;font-size: 14px">您有{{leftList.length}}条任务单待处理</span>
        <div>
          <el-checkbox-group v-model="checkList" v-for="item in leftList" :key="item.id">
            <el-checkbox :label="item.id" :key="item.id" @change="queryWzmx($event,item)">
              <div class="list-box" style="cursor: pointer">
                <div class="top-line">No.{{item.zrwdh}} <span class="right">出库申请</span></div>
                <div class="top-line con-line"><span class="text">物证数量</span> <span style="margin-right: 5px">{{item.wzmx_num}}</span>
                  <span class="right">{{item.sqsj}}</span></div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="17" class="right-panel" style="height: 100%; overflow: auto;">
        <div class="top-line">
          <span style="font-size: 14px;margin: 5px;flex: 1" v-if="tableData.length>0">
            <span>物证总数:{{tableData.length}}</span> <span
            style="margin-left: 5px">已勾选物证数:{{multipleSelection.length}}</span>
            <!--<span>{{multipleSelection}}</span>-->
          </span>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="plqr(tableData)">批量确认</el-button>
          <el-button type="primary" icon="el-icon-search" v-access id="rkjjCkjjwc" size="mini" @click="qrjj">确认交接</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;"
                  :header-cell-style="{background:'#508dc3', color: '#fff'}" size="mini"
                  @select="changeFun"
                  :show-header="false">
          <el-table-column label="物证图片" :show-overflow-tooltip="true" width="300">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl||emptyImg" alt="" height="50" width="50" style="float:left">
              <span style="vertical-align: top;margin-left: 5px">NO.{{scope.row.wzbh}}</span>
              <br>
              <span style="margin-left: 5px">{{scope.row.wzmc}} ({{scope.row.sldw}})</span>
            </template>
          </el-table-column>
          <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzlb_lbmc" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wztz" label="物证特征" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjzt_text" label="交接状态" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="scope.row.jjzt !=2 && scope.row.ywlx!= 4" @click="back(scope.row)" type="text" size="mini">
                退回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br/>
      </el-col>
    </el-row>


    <el-dialog title="验证用户信息" :visible.sync="dialogVisible" width="50%" :append-to-body="true" :modal="true">
      <el-form :model="dataForm" label-width="80px" ref="dataForm" size="mini" label-position="right">
        <input type="hidden" v-model="dataForm.dept_id"/>
        <input type="hidden" v-model="dataForm.id"/>
        <el-row :gutter="50">
          <el-col :span="12" :offset="4">
            <el-form-item label="工号" prop="gh"v-if="dataForm.by06">
              <el-input v-model="dataForm.by06" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="dept_name" v-if="dataForm.dept_name">
              <el-input v-model="dataForm.dept_name" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="user_name">
              <el-input v-model="dataForm.user_name" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
            <el-form-item label="工作证件号" prop="by01" class="large" v-if="dataForm.by01">
              <el-input v-model="dataForm.by01" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="by02" class="large">
              <el-input v-model="dataForm.by02" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="dataForm.mobile" size="mini" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="tel" v-if="dataForm.tel">
              <el-input v-model="dataForm.tel" size="mini" clearable readonly='readonly'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--<el-form-item label="照片">-->
            <span>照片</span>
            <br>
              <img :src="'data:image/png;base64,'+ico" width="100px" height="100px">
            <el-button type="primary" size="mini" icon="iconfont icon-renlianshibie" style="width: 100px" @click="rlsb">人脸识别</el-button>
            <!--</el-form-item>-->
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="submit" size="mini">通过</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="出库交接清单"
      :visible.sync="qrjjDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <div style="width: 100%;" class="desc">
        <div class="title">说明</div>
        <div>
          <span>请认真核对出库交接清单，若存在问题请点击"重新选择",</span>
          <span>若确认无误请点击"确认完成"，导出交接单后打印签字，完成交接流程。</span>
        </div>
      </div>
      <div>
        <h5>交接人员信息</h5>
        <table border="0" width="100%" cellpadding="0" cellspacing="0" class="table-box">
          <tr>
            <td></td>
            <td>姓名</td>
            <td>联系方式</td>
          </tr>
          <tr>
            <td>仓管员</td>
            <td>{{jjrxx.cgy_name}}</td>
            <td>{{jjrxx.cgy_phone}}</td>
          </tr>
          <tr>
            <td>取件人</td>
            <td>{{jjrxx.jjr_name}}</td>
            <td>{{jjrxx.jjr_phone}}</td>
          </tr>
        </table>
        <h5>物证信息</h5>
        <el-table
          :data="tableData2"
          border
          style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true" v-if="formInline.wzjjrylx=='0'"></el-table-column>
          <el-table-column prop="dwwzbm" label="物证编号" :show-overflow-tooltip="true" v-if="formInline.wzjjrylx=='1'"></el-table-column>
          <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzlb_lbmc" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sldw" label="数量及单位" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wztz" label="物证特征" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-row class="btn-text-box" style="padding-right: 5px">
          <div class="btn-text">
            <span>仓管员：<input class="line"></span>
            <span>取件人：<input class="line"></span>
          </div>
        </el-row>
        <el-row class="btn-text-box">
          <div class="btn-text">
            <span>交接日期：<em class="line">{{jjrxx.jjsj || '暂无时间'}}</em></span>
          </div>
        </el-row>
      </div>
      <!-- 提示是否导出交接单 -->
      <el-dialog
        title="提示"
        :visible.sync="exportTipDialog"
        width="30%"
        append-to-body>
        <span>是否要导出出库交接文档?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="exportTipDialog = false;exportData = false;submitjj()">取 消</el-button>
          <el-button type="primary" @click="exportTipDialog = false; exportData = true; submitjj()">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
         <el-button type="info" size="mini" @click="printHandle()">预览/打印</el-button>
        <el-button @click="qrjjDialog = false" size="mini">重新选择</el-button>
        <el-button type="primary" @click="exportTipDialog = true; exportData = false" size="mini">确认完成</el-button>
      </span>
    </el-dialog>

  <!-- 退回对话框 -->
    <el-dialog
      title="退回说明"
      :visible.sync="msgDialog"
      :append-to-body="true"
      :modal="true"
      width="30%">
      <el-input type="textarea" v-model="backmsg"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="qrSubmit" size="mini">确 定</el-button>
      </span>
    </el-dialog>


  </el-card>
</template>

<script>
  import {timeFormat} from '@/utils/datetime'
  import pdf from "vue-pdf";

  export default {
    name: 'outgoingTransfer',
    inject: ['reload'],
    data() {
      return {
        pass_status: 'primary',
        emptyImg: require("@/images/no-img.png"),
        temp_row: {},
        qr_staus: false,
        multipleSelection: [],
        bacid: '',
        backmsg: '',
        msgDialog: false,
        dialogVisible: false,
        qrjjDialog: false,
        exportTipDialog: false,
        exportData: false,
        ico: '',
        formInline: {
          wzjjrylx: '0',
          jjrzjh: ''
        },
        options: [
          {value: '0', label: '内部人员'},
          {value: '1', label: '物流人员'}
        ],
        checkList: [],
        leftList: [],
        currentPage: 1,
        total: 0,
        pageSize: 5,
        checkAll: false,
        isIndeterminate: true,
        tableData: [],
        tableData2: [],
        // 新增编辑界面数据
        dataForm: {
          id: '',
          by06:'',//工号
          dept_name: '',
          dept_id: '',
          login_name: '',
          user_name: '',
          mobile: '',
          password: '',
          tel: '',
          addr: '',
          fax: '',
          by01: '',//工作证号
          by02: ''//身份证号
        },
        ywcb_id: '',
        jjrxx: {
          jjr_name: '仓管员名称',
          jjr_phone: '仓管员电话',
          cgy_name: '交接人名称',
          cgy_phone: '交接人电话',
          jjsj: ''
        },
      }
    },
    created() {
        if (sessionStorage.getItem('chukujjSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('chukujjSession'))
        }
    },
    computed: {
      nameSize() {
        return this.$contants.pageSet.nameSize
      },
      accountSize() {
        return this.$contants.pageSet.accountSize
      },
      backgroundColor() {
        return this.$contants.pageSet.backgroundColor
      }
    },
    methods: {
      checkSelectable(row) {
        return row.jjzt != '2'
      },
      //人脸识别
      rlsb(){
        this.$message({message: '该功能尚在开发', type: 'warning'})
      },
      qrjj() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择需要交接的物证',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        let that = this
        var params = {
          ywcb_ids:this.checkList.join(","),
          wzmxids: this.multipleSelection.filter(obj => obj.jjzt != '2').map(obj => {
            return obj.wzmx_id
          }).join(",")
        }

        this.$api.outgoingTransfer.validateWzs(params).then((res) => {
          if (res.success == "true") {
            this.queryJjrxx(params)
            this.queryWzxx(params)
            this.qrjjDialog = true;
          } else {
            // this.$message({message: res.message, type: 'error'})
            this.$message({message: res.message+'请先确认!', type: 'warning'})
            // this.$confirm(res.message+'是否继续？', '提示', {
            //   confirmButtonText: '确认',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
            //   this.queryJjrxx(params)
            //   this.queryWzxx(params)
            //   this.qrjjDialog = true;
            // })
          }
        })
      },
      plqr(rows) {
        var temp = this.tableData.filter(obj => obj.jjzt != '2').map(obj => {
          return obj.wzmx_id
        })
        if (temp.length <= 0) {
          this.$message({
            message: '未找到可以提交的物证信息',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        this.$confirm('确定进行批量确认？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection = [];
          this.$refs.multipleTable.clearSelection();
          rows.forEach(row => {
            if (row.jjzt != 2) {
              row.jjzt_text = '已确认'
              this.multipleSelection.push(row)
              this.$refs.multipleTable.toggleRowSelection(row);
            }
          });
          this.qr_staus = true;
        })
      },
      handleCheckAllChange() {
        if (this.checkAll) {
          // 全选时
          this.checkList = []
          if (this.leftList) {
            this.leftList.forEach(function (item) {
              this.checkList.push(item.id)
            }, this)
            this.checkAll = true
            this.isIndeterminate = false
            this.queryWzmx(null);
          }
        } else {
          this.checkList = []
          this.checkAll = false
          this.queryWzmx(null);
        }
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.leftList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.leftList.length;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
        this.searchList()
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      back(row) {
        this.backmsg = '';
        this.msgDialog = true;
        this.temp_row = row;
      },
      choose(row) {
        console.log(row);
      },
      changelx(val){
        this.pass_status = 'primary'
      },
      validateUser() {
        // if (this.formInline.wzjjrylx == '1') {
        //   this.$message({message: '物流人员类型尚在开发', type: 'warning'})
        //   return false
        // }
        if (this.formInline.jjrzjh == "".trim()) {
          this.$message({message: '请输入证件号码', type: 'warning'})
          return false
        }
        var params = {
          wzjjrylx: this.formInline.wzjjrylx,
          jjrzjh: this.formInline.jjrzjh
        };
        this.$api.outgoingTransfer.validateUser(params).then((res) => {
          if (res.success == "true") {
            this.dialogVisible = true
            this.$api.outgoingTransfer.getUserByZjh(params).then((res) => {
              var val = atob(res.body.default.s_content).replace(/&#43;/g, '+');
              this.ico = val;
              this.dataForm = res.body.default
            })
          } else {
            this.leftList = [];
            this.tableData = [];
            this.multipleSelection = [];
            this.$message({message: res.message, type: 'error'})
            this.pass_status = 'fail'
          }
        })
      },
      submit() {debugger
        if (this.multipleSelection.length>0) {
          this.$confirm('您有未确认交接的数据,是否重新选择？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.multipleSelection = []
            this.checkList = []
            this.leftList = []
            this.tableData = []
            this.qr_staus = false;
            this.queryRwd();
            this.dialogVisible = false
            this.pass_status = 'success'
          }).catch(() => {
            this.dialogVisible = false
            return false;
          });
        } else {
          this.multipleSelection = []
          this.checkList = []
          this.leftList = []
          this.tableData = []
          this.qr_staus = false
          this.queryRwd();
          this.dialogVisible = false
          this.pass_status = 'success'
        }
      },
      qrSubmit() {
        if (this.backmsg == '' || this.backmsg == null) {
          this.$message({message: '请填写退回说明', type: 'error'})
          return false;
        }
        var params = {
          bacid: this.temp_row.wzmx_id,
          backmsg: this.backmsg,
          crklx: '2',
          jj_type: 2
        }

        this.$api.outgoingTransfer.back(params).then((res) => {
          if (res.success == "true") {
            this.$message({message: res.message, type: 'success'})
            this.msgDialog = false;
            this.temp_row.jjzt = '2'
            this.temp_row.jjzt_text = '已退回'
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      queryRwd() {
        var params = {
          jjr_user_id: this.dataForm.id,
          ywcb_crklx: '2' // 出库
        };
        this.$api.outgoingTransfer.queryRwd(params).then((res) => {
          if (res.body.default.dataset) {
            res.body.default.dataset.forEach(function (item) {
              item.sqsj = timeFormat(item.sqsj)
            })
            this.leftList = res.body.default.dataset
          }
        })
      },
      changeFun(val,row) {
        let selected = val.length && val.indexOf(row) !== -1
        if(selected){
          row.jjzt_text = '已确认'
        }else (
          row.jjzt_text ='未交接'
        )
        this.multipleSelection = val
      },
      queryWzmx(event, item) {debugger
        var that = this;
        var params = {
          ywcb_id: this.checkList.join(",")
        };
        if (this.multipleSelection.length > 0) {
          this.$confirm('您有未确认交接的数据,是否重新选择？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            that.$api.outgoingTransfer.queryWzmx(params).then((res) => {
              if (Object.keys(res.body.default).length === 0) {
                that.tableData = []
              } else {
                that.tableData = res.body.default.dataset;
              }
              that.qr_staus = false
            })
            this.multipleSelection = [];
          }).catch(() => {
            if(event){
              that.checkList.splice(that.checkList.indexOf(item.id), 1)
            }else{
              that.checkList.push(item.id)
            }
            return false
          });
        } else {
          that.$api.outgoingTransfer.queryWzmx(params).then((res) => {
            if (Object.keys(res.body.default).length === 0) {
              this.tableData = []
            } else {
              this.tableData = res.body.default.dataset;
            }
            this.qr_staus = false;
          })
        }
      },
      queryJjrxx(params) {
        this.$api.outgoingTransfer.jjrxx(params).then((res) => {
          this.jjrxx = res.body.data;
        })
      },
      queryWzxx(params) {
        this.$api.outgoingTransfer.wzxx(params).then((res) => {
          this.tableData2 = res.body.default.dataset;
        })
      },
      recoveryStatus(val) {
        if (!val) {
          this.pass_status = 'primary'
        }
      },
      submitjj() {
        var ids = this.multipleSelection.filter(obj => obj.jjzt != '2').map(obj => {
          return obj.wzmx_id
        }).join(",")
        // var ids = this.multipleSelection.join(",");
        var params = {
          pickids: ids,
          ids: ids,
          crklx: '2',
          jj_type: '1'
        }

        this.$api.outgoingTransfer.submitjj(params).then((res) => {
          if (res.success == "true") {
            this.formInline.jjrzjh = '';
            this.leftList = [];
            this.multipleSelection = [];
            this.tableData = [];
            this.qr_staus = false;
            this.pass_status = 'primary'
            if(this.exportData == true){
              var param = {
                wzmxids: ids,
                wzjjrylx: this.formInline.wzjjrylx
              }
              this.exportWlpdWordCk(param)
              this.$message({message: res.message, type: 'success'})
            }
            else {
              this.qrjjDialog = false;
              this.$message({message: res.message, type: 'success'})
              this.reload();
            }
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      exportWlpdWordCk(params) {
        this.$api.outgoingTransfer.exportWlpdWordCk(params).then((res) => {
          if (res.success == "true") {
            this.qrjjDialog = false;

            var downloadFileUrl = res.message
            var elemIF = document.createElement("iframe");
            elemIF.src = downloadFileUrl;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
            this.reload();
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      printHandle () {
        var ids = this.multipleSelection.filter(obj => obj.jjzt != '2').map(obj => {
          return obj.wzmx_id
        }).join(",")
        var param = {
          wzmxids: ids,
          wzjjrylx: this.formInline.wzjjrylx
        }
        this.$api.outgoingTransfer.exportWlpdWordCk(param).then((res) => {
          debugger
          if (res.success == "true") {
            if (!/\.(pdf|PDF)$/.test(pdf)) {
              let pdfurl = res.message
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
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('chukujjSession')
      sessionStorage.setItem('chukujjSession', JSON.stringify(this.formInline))
      next()
    }
  }
</script>
