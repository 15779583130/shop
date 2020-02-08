<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
  .footer-border {
    padding: 0;
    border: none;
  }
</style>
<template>
  <el-card class="box-card">
    <el-form :model="form" :rules="dataFormRules" ref="form">
      <el-row>
        <el-col :span="10">
          <!--<h4 style="display:inline">承办信息</h4>-->
          <el-tag>承办信息</el-tag>

        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="本单位案号" label-width="100px" prop="bdwah">
              <el-input v-model="form.bdwah" style="width: 70%; word-wrap: break-word"
                        placeholder="请填写本单位案号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本单位案名" label-width="100px" prop="bdwam">
              <el-input v-model="form.bdwam" style="width: 70%; word-wrap: break-word"
                        placeholder="请填写本单位案名"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="案件编号" label-width="100px">
              <el-input v-model="form.ajbh" style="width: 70%; word-wrap: break-word" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案件名称" label-width="100px">
              <el-input v-model="form.ajmc" style="width: 70%; word-wrap: break-word" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="接收时间" label-width="100px">
              <el-input v-model="jssj" style="width: 70%; word-wrap: break-word" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择承办人" label-width="100px" prop="cbrxm">
              <el-input v-model="form.cbrxm" placeholder="请选择承办人" style="width: 70%; word-wrap: break-word"
                        @focus="chooseCbr()" clearable suffix-icon="el-icon-c-scale-to-original"></el-input>
            </el-form-item>
          </el-col>

        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="承办备注" label-width="100px">
              <el-input type="textarea" v-model="form.remark" style="width: 70%; word-wrap: break-word"></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" icon="el-icon-check" @click="submitForm()" size="mini">提交</el-button>
            <el-button type="ghost" @click="goBack()" icon="el-icon-close" style="margin-left: 20px" size="mini">关闭</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-dialog title="选择承办人"
               :visible.sync="dialogVisible"
               width="70%"
               :append-to-body="true"
               :modal="true">
      <div style="height: 200px">
        <el-form>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div>
                    <el-form ref="form" :inline="true" :model="userfrom" size="mini">
                      <div class="form-panel">
                      <el-row class="form-line">
                        <el-col :span="19" style="display: flex;">
                      <el-form-item label="用户名">
                        <el-input v-model="userfrom.username" placeholder="请输入用户名" size="mini" clearable
                                  @keyup.enter.native="onSubmit">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="部门名称">
                        <el-input v-model="userfrom.deptname" placeholder="请输入部门名称" size="mini" clearable
                                  @keyup.enter.native="onSubmit">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      </el-form-item>
                        </el-col>
                      </el-row>
                      </div>
                    </el-form>
                  </div>
                </div>
            </el-col>
            <el-col :span="24">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                       :cell-style="{padding:'1.5px'}">
                <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope">
                    <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="user_name" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="dept_name" label="部门名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100" fixed="right" align="center">
                  <template slot-scope="scope">
                    <el-button @click="chooseUser(scope.row)" icon="el-icon-check" circle size="mini"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page">
                <div class="page-content">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10, 20, 30, 40, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
            <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>

  </el-card>

</template>

<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat} from '@/utils/datetime'
  export default {
    name: "Cbdjedit",
    data() {
      return {
        form: this.$route.params,
        dialogVisible: false,
        userfrom: {
          username: '',
          deptname: ''
        },
        jssj:'',
        tableData: [],
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,
        dataFormRules: {
          bdwah: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            { min: 0, max: 50, message: '最多可输入50个字符' }
          ],
          bdwam: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            { min: 0, max: 100, message: '最多可输入100个字符' }
          ],
          cbr_id: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          cbrxm: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      this.init()
      // this.pdfsrc = pdf.createLoadingTask(this.pdfsrc)
    },
    methods: {
      init () {
        this.form = JSON.parse(sessionStorage.getItem('cbdjbj'))
        this.jssj = timeFormat(this.form.jssj)
      },
      goBack() {
        this.$util.goBack(this);
      },
      chooseCbr() {
        //console.log('111');
        this.dialogVisible = true;
        this.findTable()
      },
      chooseUser(row) {
        this.form.cbr_id = row.id;
        this.form.cbrxm = row.user_name;
        this.dialogVisible = false;
      },
      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      findTable() {

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          user_name: this.userfrom.username,
          dept_name: this.userfrom.deptname

        };

        this.$api.cbdj.queryUser(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })

      },
      submitForm() {
        if (!this.form.bdwah) {
          this.$message({message: '请输入本单位案号', type: 'error'});
          return false
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.form)
            this.$api.cbdj.saveOrupdate(params).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                //this.dialogVisible = false;
                this.$refs['form'].resetFields();
                this.goBack();
              } else {
                this.$message({message: res.message, type: 'error'})
              }
              this.findTable();
            })
          }
        })

      }
    }

  }
</script>
