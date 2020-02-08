<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }

</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            接收确认
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" placeholder="请输入案件编号" size="mini" clearable
                        @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" placeholder="请输入案件名称" size="mini" clearable
                        @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.sqsjq" type="date" placeholder="请输入日期起" format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.sqsjz" type="date" placeholder="请输入日期止" format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
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
                    <el-form-item label="嫌疑人">
                      <el-input v-model="formInline.xyr" placeholder="请输入嫌疑人" size="mini" clearable @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请人">
                      <el-input v-model="formInline.sqr_name" placeholder="请输入申请人" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="接收日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.jsqrsjq" type="date" placeholder="请输入日期起" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.jsqrsjz" type="date" placeholder="请输入日期止" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;"></el-col>
                  <el-form-item label="状态">
                    <el-select v-model="formInline.yszt" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-dialog title="填写意见" :visible.sync="jsqrDialog" :append-to-body="true" :modal="true" width="30%" style="">
        <el-form :model="jsyjform" ref="jsyjform" :rules="jsyjRules" size="mini" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item label="接收意见" prop="jsczyj" v-if="jsyjform.type === 'js'">
                <el-input type="textarea" v-model="jsyjform.jsczyj" size="mini" placeholder="请输入接收意见" :rows="6" clearable></el-input>
              </el-form-item>
              <el-form-item label="退回意见" prop="jsczyj" v-if="jsyjform.type === 'th'">
                <el-input type="textarea" v-model="jsyjform.jsczyj" size="mini" placeholder="请输入退回意见" :rows="6" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="jsqr()">提交</el-button>
          <el-button @click="jsqrDialog = false" size="mini">取消</el-button>
        </span>
      </el-dialog>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}" tooltip-effect="dark"
          border style="width: 100%" size="mini" @selection-change="handleSelectionChange" @expand-change="getWzmx">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" :header-cell-style="{background:'#e6e6e6'}"
                tooltip-effect="dark" style="width: 100%" size="mini" border>

                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzxx_sl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" width="120px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" min-width="200px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="200px">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ysbh" label="任务单号" :show-overflow-tooltip="true" min-width="150px"></el-table-column>
          <el-table-column prop="xyr" label="嫌疑人" :show-overflow-tooltip="true" width="80px"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" min-width="160px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="sqr_name" label="申请人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqr_dept_name" label="申请部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jsqrsj" label="接收时间" min-width="160px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="yszt" label="状态" width="80px" :formatter='formatYszt'></el-table-column>
          <el-table-column label="操作" width="100px" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.yszt=='1'" class="el-icon-finished" v-access id="jsqrQrsq" style="font-size: 20px;" title="接收" @click="jsClick(scope.row)"></i>
              <i v-if="scope.row.yszt=='1'" class="el-icon-edit-outline" style="font-size: 20px;" title="操作" @click="editClick(scope.row)"></i>
              <i v-if="scope.row.yszt=='1'" class="iconfont icon-tuihui" v-access id="jsqrBack" title="退回" style="font-size: 20px;" @click="thClick(scope.row)"></i>
              <i v-if="scope.row.yszt!='1'" class="el-icon-view" style="font-size: 20px;" v-access id="jsqrEye" title="查看" @click="editClick(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>

<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {
    timeFormat,
    timeCompare
  } from '../../../utils/datetime'

  export default {
    name: 'entryRegistration',
    components: {
      casePreview
    },
    data() {
      return {
        formInline: {
          ajbh: '',
          ajmc: '',
          sqsjq: '',
          sqsjz: '',
          sqr_name: '',
          xyr: '',
          yszt: '1',
          jsqrsjq: '',
          jsqrsjz: ''
        },
        jsqrDialog: false,
        jsyjform: {
          jsczyj: '',
          yscbids: '',
          type: ''
        },
        jsyjRules: {
          jsczyj: [{
              min: 0,
              max: 500,
              message: '最多可输入500个字符'
            },
            {
              required: true,
              message: '这是必填字段',
              trigger: 'blur'
            }
          ]
        },
        dialogVisible: false,
        options: [{
            value: '1',
            label: '待接收'
          },
          {
            value: '2',
            label: '已接收'
          },
          {
            value: '3',
            label: '已退回'
          }
        ],
        leftList: [],
        value1: new Date(),
        value2: new Date(),
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],
        more: false,
        centerDialogVisible: false,
        wzxx_id: ''
      }
    },
    created() {
        if (sessionStorage.getItem('jsqrSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('jsqrSession'))
        }
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
        this.findTable();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editClick(row) {
        var params = {
          ysxxcb_id: row.ysxxcb_id
        }
        this.$api.ysjsqr.infoEdit(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('bjysjsqr')
            sessionStorage.setItem('bjysjsqr', JSON.stringify(res.body.default))
            this.$router.push({
              name: 'jsqrEdit',
              params: res.body.default
            })
          })
        })
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      findTable() {
        let timeComp = timeCompare(this.formInline.sqsjq, this.formInline.sqsjz)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }

        let timeComp1 = timeCompare(this.formInline.jsqrsjq, this.formInline.jsqrsjz)
        if (!timeComp1.status) {
          this.$message(timeComp1.msg)
          return false
        }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ajbh: this.formInline.ajbh,
          ajmc: this.formInline.ajmc,
          sqsjq: this.formInline.sqsjq == null ? '' : this.formInline.sqsjq,
          sqsjz: this.formInline.sqsjz == null ? '' : this.formInline.sqsjz,
          sqr_name: this.formInline.sqr_name,
          xyr: this.formInline.xyr,
          yszt: this.formInline.yszt,
          jsqrsjq: this.formInline.jsqrsjq == null ? '' : this.formInline.jsqrsjq,
          jsqrsjz: this.formInline.jsqrsjz == null ? '' : this.formInline.jsqrsjz
        };
        this.$api.ysjsqr.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function(c) {
            var param2 = {
              ysxxcb_id: c.ysxxcb_id
            };
            that.$api.ysjsqr.querywzxx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      formatYszt(row, column) {
        var zjztFormat = row.yszt;
        if (row.yszt == '0') {
          zjztFormat = '待申请'
        } else if (row.yszt == '1') {
          zjztFormat = '待接收'
        } else if (row.yszt == '2') {
          zjztFormat = '已接收'
        } else if (row.yszt == '3') {
          zjztFormat = '已退回'
        } else if (row.yszt == '4') {
          zjztFormat = '部分退回'
        } else if (row.yszt == '5') {
          zjztFormat = '部分接受'
        }
        return zjztFormat;
      },
      reset() {
        this.formInline.ajbh = '';
        this.formInline.ajmc = '';
        this.formInline.sqsjq = '';
        this.formInline.sqsjz = '';
        this.formInline.sqr_name = '';
        this.formInline.xyr = '';
        this.formInline.yszt = '1';
        this.formInline.jsqrsjq = '';
        this.formInline.jsqrsjz = '';
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      handlerByName(row) {
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
      jsClick(row) {
        this.jsqrDialog = true;
        this.jsyjform.jsczyj = '';
        this.jsyjform.yscbids = row.ysxxcb_id
        this.jsyjform.type = 'js'
      },
      thClick(row) {
        this.jsqrDialog = true;
        this.jsyjform.jsczyj = '';
        this.jsyjform.yscbids = row.ysxxcb_id
        this.jsyjform.type = 'th'
      },
      jsqr() {
        this.$refs.jsyjform.validate((valid) => {
          if (valid) {
            var params = {
              yscbids: this.jsyjform.yscbids,
              jsczyj: this.jsyjform.jsczyj
            }
            if (this.jsyjform.type == 'js') {
              this.$api.ysjsqr.jieshouYsxxcb(params).then((res) => {
                if (res.success == 'true') {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.jsqrDialog = false;
                  this.findTable()
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              })
            } else {
              this.$api.ysjsqr.tuihuiYsxxcb(params).then((res) => {
                if (res.success == 'true') {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.jsqrDialog = false;
                  this.findTable()
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              })
            }
          }
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('jsqrSession')
          sessionStorage.setItem('jsqrSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
