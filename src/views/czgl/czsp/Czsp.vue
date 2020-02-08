<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
  @import '../../page-main';

  .mydialog .el-input {
    min-width:180px !important;
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
            处置审批
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <!--上方搜索条件-->
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="dataForm" :model="filters" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" placeholder="请输入案件编号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.sqrqq"
                          type="date"
                          placeholder="请输入日期起" size="mini" format="yyyy-MM-dd" style="width: 160px"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.sqrqz"
                          type="date"
                          placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" style="width: 160px">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="申请人" prop="sqrxm">
                      <el-input v-model="filters.sqrxm" placeholder="请输入申请人" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请部门" prop="sqbmmc">
                      <el-input v-model="filters.sqbmmc" placeholder="请输入申请部门" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置流水号" prop="lsh">
                      <el-input v-model="filters.lsh" placeholder="请输入处置流水号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;"></el-col>
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="状态" prop="zjzt">
                      <el-select v-model="filters.zjzt" placeholder="请选择">
                        <el-option value="1" label="待审批"></el-option>
                        <el-option value="2" label="审核通过"></el-option>
                        <el-option value="3" label="审核驳回"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="完成状态" prop="zjztf">
                      <el-select v-model="filters.zjztf" placeholder="请选择">
                        <el-option value="0" label="未完成"></el-option>
                        <el-option value="1" label="已完成"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <!--table-->
      <el-col :span="24">
        <el-table ref="shmultipleTable" :data="shtableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true" min-width="200px"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" min-width="150px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lsh" label="处置流水号" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" :show-overflow-tooltip="true" min-width="150px" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="sqrxm" label="申请人" :show-overflow-tooltip="true" min-width="100px"></el-table-column>
          <el-table-column prop="sqbmmc" label="申请部门" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
          <el-table-column prop="zjzt" label="审核状态" :show-overflow-tooltip="true"  width="100px" :formatter="shztFormat"></el-table-column>
          <el-table-column prop="zjztf" label="完成状态" :show-overflow-tooltip="true" :formatter="wcztFormat" width="100px"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100px">
            <template slot-scope="scope">
              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" @click="edit(scope.row)" v-if="scope.row.zjzt=='1'" title="编辑"></i>
              <i class="el-icon-view" style="font-size: 20px;cursor: pointer" @click="show(scope.row)" v-if="scope.row.zjzt!='1'" title="查看"></i>
              <i class="el-icon-reading" style="font-size: 20px;cursor: pointer" @click="showLc(scope.row)" title="处置流程"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageinfo.pagenum"
              :page-sizes="[5,10,20,30,40,50]"
              :page-size="pageinfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageinfo.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :append-to-body="true"
        :modal="true"
        width="70%">
        <el-card class="box-card mydialog" style="background: #f7f7f7">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div
                  style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                  <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                  处置申请信息
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
                    <el-form ref="form" :model="dataForm" size="mini" :rules="dataFormRules">
                      <el-row class="form-line">
                        <el-col :span="8">
                          <el-form-item label="案件编号">
                            <el-input v-model="dataForm.ajbh" size="mini" :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="案件名称">
                            <el-input v-model="dataForm.ajmc" suffix-icon="el-icon-c-scale-to-original"
                                     :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="处置流水号">
                            <el-input v-model="dataForm.lsh"
                                     :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="申请时间">
                            <el-input v-model="dataForm.sqsj" size="mini":readonly="!isEdit" :formatter="dateFormat">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="申请部门">
                            <el-input v-model="dataForm.sqbmmc" size="mini":readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="申请人">
                            <el-input v-model="dataForm.sqrxm" size="mini":readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="审核人">
                            <el-input v-model="dataForm.czr_name" size="mini" :readonly="true">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="审核意见" prop="czyj">
                            <el-input v-model="dataForm.czyj"  size="mini"
                                     :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="审核时间" v-if="dataForm.zjzt=='1'&&dataForm.czsj">
                            <el-input v-model="dataForm.czsj"  size="mini"
                                      :readonly="!isEdit">
                            </el-input>
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
                  <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                  物证处置清单
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
                      <el-table-column type="index" label="序号" width="50"></el-table-column>
                      <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="100">
                        <template slot-scope="scope">
                          <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="wzsl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true" width="100"></el-table-column>
                      <el-table-column prop="jjzt" label="交接状态" :formatter="jjztFormat" :show-overflow-tooltip="true" width="100"></el-table-column>
                      <el-table-column prop="jjsj" label="交接时间" :formatter="dateFormat" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="zrwdh" label="处置单号" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
                <el-table-column prop="ckmc" label="保管中心"  :show-overflow-tooltip="true" min-width="200px"></el-table-column>
                <el-table-column prop="sl" label="物证/退回数量" :show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="wzrq" label="预处理日期" :show-overflow-tooltip="true" :formatter="dateFormat" width="130px"></el-table-column>
                <el-table-column prop="sfwlps" label="物流配送" :show-overflow-tooltip="true" :formatter="wlpsFormat"></el-table-column>
                <el-table-column prop="sqyy" label="处置原因" :show-overflow-tooltip="true" :formatter="czyyFormat" width="100px"></el-table-column>
                <el-table-column prop="jjrmc" label="交接人" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wtr" label="委托人" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary"  size="mini" @click="submitSp(true)" v-if="isEdit">审核通过</el-button>
              <el-button  size="mini" @click="submitSp(false)" v-if="isEdit">审核不通过</el-button>
              <el-button  size="mini" @click="dialog = false" v-if="isEdit">关闭</el-button>
              <el-button type="primary" @click="dialog=false" size="mini" v-if="!isEdit">关闭</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="lcDialogTitle"
        :visible.sync="lcDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :append-to-body="true"
        :modal="true"
        width="50%">
        <div style="">
          <el-table ref="lcmultipleTable" :data="lctableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span>{{(lcpageinfo.pagenum - 1) * lcpageinfo.pagesize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="czjd" label="操作节点" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="czr_name" label="操作用户" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="created_time" label="操作时间" :show-overflow-tooltip="true"  :formatter="dateFormat"></el-table-column>
            <el-table-column prop="czdz" label="操作结果" :show-overflow-tooltip="true":formatter="jgFormat"></el-table-column>
            <el-table-column prop="czyj" label="操作意见" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="lcDialog=false" size="mini">关闭</el-button>
        </span>
      </el-dialog>
      <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    </el-row>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import casePreview from "../../my-components/casePreview/casePreview"
  export default {
    name: 'Czsp',
    components: {
      casePreview
    },
    data() {
      return {
        centerDialogVisible:false,
        wzxx_id:'',
        //搜索条件
        filters: {
          ajbh: '',
          ajmc: '',
          sqrqq: '',
          sqrqz: '',
          sqrxm: '',
          sqbmmc:'',
          lsh: '',
          zjzt:'',
          zjztf:''
        },
        userName:JSON.parse(sessionStorage.getItem('sessionInfo')).user_name,
        userId:JSON.parse(sessionStorage.getItem('sessionInfo')).user_id,
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:10
        },
        lcpageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:10
        },
        //table
        wzmxTableData: [],
        tableData: [],
        shtableData: [],
        lctableData: [],
        multipleSelection: [],
        dialogVisible: false,
        more: false,
        //dialog
        isEdit:true,
        dialog:false,
        dialogTitle:'查看处置信息',
        lcDialog:false,
        lcDialogTitle:'处置流程日志',
        dataForm: {
          id: '',
          ajbh:'',
          ajmc:'',
          lsh:'',
          sqsj:'',
          sqbmmc:'',
          sqrxm:'',
          czr_name:'',
          czyj:'',
          czsj:'',
          ajxx_id:''
        },
        dataFormRules: {
          czyj: [
            {required: true, message: '这是必填字段'},
          ]
        },
      }
    },
    created() {
      this.init()
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
      init() {
        if (sessionStorage.getItem('czsp')) {
          this.filters = JSON.parse(sessionStorage.getItem('czsp'))
        }
        this.findTable();
      },
      submitSp(status){
        this.$refs.form.validate((valid)=>{
          if(valid){
            let param = {
              czr_id:this.userId,
              ywzb_id:this.dataForm.id,
              yes:status,
              czyj:this.dataForm.czyj,
              czr_name:this.userName
            };
            this.$api.czsp.submitSp(param).then((res) => {
              if (res.success == "true") {
                this.dialog = false
                this.findTable()
                this.$message({message: res.message, type: 'success'})
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      Schange (e) {
        this.$forceUpdate()
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize = val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      findTable() {

        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {
          czsp:'1',
        };
        Object.assign(param, this.pageinfo, this.filters)
        this.$api.czsp.queryTable(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.count);
          this.shtableData = res.body.default.dataset;
        })
      },
      findqdTable(id){
        let param = {
          ywzb_id: id
        };
        this.$api.czsp.queryYwcb(param).then((res) => {
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function (c) {
            var param2 = {
              ywcb_id: c.id
            };
            that.$api.czsp.queryYwcbWzmx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.rksq.queryYwcbWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      reset() {
        var obj={
          ajbh: '',
          ajmc: '',
          sqrqq: '',
          sqrqz: '',
          sqrxm: '',
          sqbmmc:'',
          lsh: '',
          zjzt:'',
          zjztf:''
        }
        this.filters = obj;
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      shztFormat(row, column, cellValue, index) {
        switch (cellValue) {
          case '0':
            return '待提交'
          case '1':
            return '待审核'
          case '2':
            return '审核通过'
          case '3':
            return '审核驳回'
        }
      },
      jjztFormat(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未交接'
        } else if (cellValue == '1') {
          returnValue = '已交接'
        } else if (cellValue == '2') {
          returnValue = '已退回'
        }
        return returnValue;
      },
      wlpsFormat(row, column, cellValue, index) {
        switch (cellValue) {
          case '0':
            return '否'
          case '1':
            return '是'
        }
      },
      czyyFormat(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '01') {
          returnValue = '移交公物仓'
        } else if (cellValue == '02') {
          returnValue = '上缴专管部门'
        }else if (cellValue == '03') {
          returnValue = '自行处置'
        }
        return returnValue;
      },
      jgFormat(row, column, cellValue, index) {
        switch (cellValue) {
          case '0':
            return '提交审核'
          case '1':
            return '审核通过'
          case '2':
            return '审核驳回'
        }
      },
      wcztFormat(row, column, cellValue, index) {
        var value = '';
        if (cellValue == '0') {
          value = '未完成'
        } else if (cellValue = '2') {
          value = '已完成 '
        }
        return value;
      },
      edit(row){
        //重置表单数据
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.isEdit = true;
        var param = {
          czdj_id:row.id,
          is_edit:true
        }
        this.findqdTable(row.id)
        this.$api.czsp.getInfo(param).then((res) => {
          this.dataForm = res.body.default
          this.dataForm.sqsj = timeFormat(res.body.default.sqsj)
          this.dataForm.czr_name = res.body.default.czr_name||this.userName
          this.dataForm.czsj = timeFormat(res.body.default.czsj)
          this.dialog = true
        })
      },
      show(row){
        //重置表单数据
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.isEdit = false;
        var param = {
          czdj_id:row.id,
          is_edit:false
        }
        this.findqdTable(row.id)
        this.$api.czsp.getInfo(param).then((res) => {
          this.dataForm = res.body.default
          this.dataForm.sqsj = timeFormat(res.body.default.sqsj)
          this.dataForm.czr_name = res.body.default.czr_name
          this.dataForm.czyj = res.body.default.czyj
          this.dataForm.czsj = timeFormat(res.body.default.czsj)
          this.dialog = true
        })
      },
      showLc(row){
        let param = {
          ywzb_id:row.id
        };
        this.$api.czsp.queryLcTable(param).then((res) => {
          this.lcpageinfo.total = Number(res.body.default.count);
          this.lctableData = res.body.default.dataset;
          this.lcDialog = true
        })
      },
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('czsp')
      sessionStorage.setItem('czsp', JSON.stringify(this.filters))
      next()
    }
  }
</script>
