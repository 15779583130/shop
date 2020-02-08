<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  .el-input {
    min-width: 200px !important;
  }
</style>
<template>
  <div>
    <div style="background:#F6F6F6;text-align: center;margin-bottom:5px">
      <el-button size="mini" type="warning" icon="el-icon-circle-close" @click="close">关闭</el-button>
    </div>
    <el-card class="box-card" style="background: #f7f7f7">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              暂扣票据信息
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
                <el-form ref="form" :model="dataForm" size="mini">
                  <el-row class="form-line">
                    <el-col :span="8">
                      <el-form-item label="票据号码" v-if="dataForm.pjhm">
                        <el-input v-model="dataForm.pjhm" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="票据注册号" v-if="dataForm.pjzch">
                        <el-input v-model="dataForm.pjzch"
                                  readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="票据名称" v-if="dataForm.pjlxmc">
                        <el-input v-model="dataForm.pjlxmc"
                                  readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="机打票号" v-if="dataForm.pjhm">
                        <el-input v-model="dataForm.jdph" size="mini" readonly="readonly" :formatter="dateFormat">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="电子票号" v-if="dataForm.pjhm">
                        <el-input v-model="dataForm.dzph" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="作废状态" v-if="dataForm.pjhm">
                        <el-input v-model="dataForm.zfzt=='0'?'未作废':'已作废'" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="案件编号">
                        <el-input v-model="dataForm.ajbh" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="案件名称">
                        <el-input v-model="dataForm.ajmc" suffix-icon="el-icon-c-scale-to-original" size="mini"
                                  readonly="readonly" @focus="openqa">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经办人">
                        <el-input v-model="dataForm.jbr" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="当事人">
                        <el-input v-model="dataForm.dsr" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
<!--                    <el-col :span="8">-->
<!--                      <el-form-item label="处罚条款">-->
<!--                        <el-input v-model="dataForm.cftk" size="mini" readonly="readonly">-->
<!--                        </el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
                    <el-col :span="8">
                      <el-form-item label="地址">
                        <el-input v-model="dataForm.address" size="mini" readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
<!--                    <el-form-item label="备注">-->
<!--                      <el-input v-model="dataForm.bz" size="mini" readonly="readonly">-->
<!--                      </el-input>-->
<!--                    </el-form-item>-->
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
              票据物证清单
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.wzmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sldw" label="数量及单位" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ggxh" label="规格型号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="fdjh" label="发动机号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="cph" label="车牌号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzbz" label="物证备注" :show-overflow-tooltip="true"></el-table-column>
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
      </el-row>
      <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"
                    :wzxx_id="this.wzxx_id"></case-preview>
    </el-card>
  </div>
</template>

<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat} from '@/utils/datetime'

  export default {
    components: {
      casePreview
    },
    name: 'entryRegistration',
    data() {
      return {
        id: '',
        wzxx_id: '',
        centerDialogVisible: false,
        dataForm: this.$route.params,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'child',
          label: 'name'
        },
        dialogVisible: false,
        wzmxTableData: [],
        pageinfo: {
          pagenum: 0,
          pagesize:5,
          total: 0
        },
        tableData: []
      }
    },
    created() {
      // var id = this.$route.params.id;
      var id = window.location.href.split('zkkjview/')[1];
      this.id = id;
      this.queryDataForm();
      this.queryTable();
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
      dateFormat(row, column, cellValue, index) {
        return timeFormat(cellValue)
      },
      handlerByName() {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: this.dataForm.ajxx_id
          }
        })
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize = val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      queryDataForm() {
        var param = {
          pjzb_id: this.id
        };
        this.$api.zkkj.queryDataForm(param).then((res) => {
          this.dataForm = res.body.default;
        })
      },
      queryTable() {
        var param = {
          pjzb_id: this.id
        };
        this.$api.zkkj.querywzTable(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      openqa() {
        if (this.dataForm.ajxx_id == undefined || this.dataForm.ajxx_id == '') {
          this.$message({message: '找不到案件信息', type: 'warning'})
          return false;
        }
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: this.dataForm.ajxx_id
          }
        })
      },
      close() {
        this.$util.goBack(this);
      },
      handlerByName(row) {
        this.wzxx_id = row.wzxx_id;
        this.centerDialogVisible = true
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
    }
  }
</script>
