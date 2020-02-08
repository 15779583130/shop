<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  .btn-text {
    float: right;

    span {
      .line {
        text-decoration: underline;
        font-style: normal;
      }

      line-height: 28px;
      padding: 30px;
    }
  }

</style>
<template>
  <div>
    <div style="background:#F6F6F6;text-align: center;margin-bottom:5px">
      <el-button size="mini" type="primary" icon="el-icon-circle-check" @click="qrjs" :disabled="efitdisable">确认接收
      </el-button>
      <el-button size="mini" type="primary" icon="el-icon-circle-check" @click="thjs" :disabled="efitdisable">退回
      </el-button>
      <el-button size="mini" type="warning" icon="el-icon-circle-close" @click="close">关闭</el-button>
    </div>
    <el-card class="box-card" style="background: #f7f7f7">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              基本信息
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:202px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
              <div class="form-panel">
                <el-form ref="form" :model="formInline" size="mini" :rules="dataFormRules">
                  <el-row class="form-line">
                    <el-col :span="8">
                      <el-form-item label="案件编号" class="large">
                        <el-input v-model="formInline.ajbh" size="mini" clearable
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="案件名称">
                        <el-input v-model="formInline.ajmc" clearable
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="任务单号">
                        <el-input v-model="formInline.zrwdh" clearable
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请部门" class="large">
                        <el-input v-model="formInline.sqbmmc" clearable
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请人">
                        <el-input v-model="formInline.sqrxm" clearable
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请时间">
                        <el-input v-model="formInline.sqsj" size="mini" clearable readonly="readonly"
                                  :formatter="dateFormat" style="width: 200px">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="移送说明" class="large" style="margin-bottom: 30px;">
                        <el-input v-model="formInline.sqyy" clearable type="textarea"
                                  @keyup.enter.native="onSubmit" readonly="readonly" style="width: 600px;">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="选择仓库" prop="kyck" class="large" style="margin-left: -12px">
                        <el-select v-model="formInline.kyck" placeholder="请选择仓库" style="width: 80%" size="mini" :disabled="yjreadonly">
                          <el-option v-for="item in kyckArry" :key="item.id" :label="item.text" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">



                      <el-form-item label="接收操作意见" prop="jsczyj" class="large" style="margin-bottom: 30px;">

                        <el-input v-model="formInline.jsczyj" clearable type="textarea"
                                  @keyup.enter.native="onSubmit" style="width: 600px;"  :readonly="yjreadonly">
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
              处置权移送物证清单
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini"
                    @selection-change="handleSelectionChange">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzsl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzlb" label="物证类别" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
          <div class="page">
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
      <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    </el-card>
  </div>
</template>

<script>
  import {timeFormat} from '@/utils/datetime'
  import casePreview from "../../my-components/casePreview/casePreview"

  export default {
    name: 'entryRegistration',
    components: {
      casePreview
    },
    data() {
      return {
        kyckArry: [],
        formInline: this.$route.params,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        efitdisable: false,
        yjreadonly: false,
        jsqrDialog: true,
        centerDialogVisible:false,
        wzxx_id:'',
        dataFormRules: {
          jsczyj: [
            {min: 0, max: 500, message: '最多可输入500个字符'},
            {required: true, message: '这是必填字段', trigger: 'blur'}],
          kyck:[
            {required: true, message: '这是必填字段'}
          ]
        },
        multipleSelection: []
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
        this.selectCfck()
        this.formInline = JSON.parse(sessionStorage.getItem('wzykjsqr'))
        this.formInline.sqsj = timeFormat(this.$route.params.sqsj)
        if(this.formInline.ckid){
          this.formInline.kyck = this.$route.params.ckid
        }
        if (this.formInline.ykzt != '1') {
          this.efitdisable = true;
          this.yjreadonly = true;
        }
        this.findTable();
      },
      changeKyck(val){
        this.formInline.kyck=val
        this.$forceUpdate()
      },
      selectCfck() {
        var param = {}
        this.$api.rksq.selectCfck(param).then((res) => {
          this.kyckArry = res.body.default.list
          // this.formInline.kyck = res.body.default.list[0].id
        })
      },
      close() {
        this.$util.goBack(this)
      },
      dateFormat(row, column, cellValue, index) {
        return timeFormat(cellValue)
      },
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
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
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      findTable() {
        var param = {
          pagesize: this.pageSize,
          pagenum: this.currentPage,
          ywcb_id: this.formInline.ywcb_id
        };
        this.$api.ykqr.querywzxxDetail(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      formatYszt(row, column) {
        var zjztFormat = row.ykzt;
        if (row.ykzt == '0') {
          zjztFormat = '待移送'
        } else if (row.ykzt == '1') {
          zjztFormat = '待接收'
        } else if (row.ykzt == '2') {
          zjztFormat = '已接收'
        } else if (row.ykzt == '3') {
          zjztFormat = '已退回'
        } else if (row.ykzt == '4') {
          zjztFormat = '部分退回'
        }
        return zjztFormat;
      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.rksq.queryYwcbWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      qrjs() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = {
              ywcbids: this.formInline.ywcb_id,
              jsczyj: this.formInline.jsczyj,
              kyck: this.formInline.kyck
            }
            this.$api.ykqr.jieshouYsxxcb(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.$util.goBack(this)
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      thjs() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            var params = {
              ywcbids: this.formInline.ywcb_id,
              jsczyj: this.formInline.jsczyj
            }
            this.$api.ykqr.tuihuiYsxxcb(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.$util.goBack(this)
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      }
    }
  }
</script>
