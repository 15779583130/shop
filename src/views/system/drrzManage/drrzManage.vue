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
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            登录日志查询管理
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
              <el-form ref="form" :model="formInline" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="用户名">
                      <el-input v-model="formInline.user_name" placeholder="请输入用户名" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="用户id">
                      <el-input v-model="formInline.user_id" placeholder="请输入用户id" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="起始时间">
                      <el-col :span="10" style="display: flex;">
                        <!--<el-date-picker-->
                          <!--v-model="formInline.sqsj1"-->
                          <!--type="date"-->
                          <!--placeholder="请输入日期起"-->
                          <!--format="yyyy-MM-dd"-->
                          <!--value-format="yyyyMMdd">-->
                        <!--</el-date-picker>-->
                        <el-date-picker
                          v-model="formInline.created_starttime"
                          type="datetime"
                          placeholder="选择起始时间起"
                          value-format="yyyy-MM-dd hh:mm:ss"
                        >
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="formInline.created_endtime"
                          type="datetime"
                          placeholder="选择起始时间止"
                          value-format="yyyy-MM-dd hh:mm:ss"
                        >
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
              </el-form>
            </div>
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
          <el-table-column prop="user_name" label="用户名" width="100px" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="user_id" label="用户id" width="200px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="created_time" label="记录时间" width="170px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="ip_addr" label="客户端IP" min-width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="browser_type" label="客户端浏览器" min-width="50px"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="operation_type" label="操作类型" min-width="60px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="operation_result" label="操作结果" width="80px"   :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="session_id" label="会话id" width="200px"   :show-overflow-tooltip="true"></el-table-column>
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
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          user_name: '',
          user_id: '',
          created_starttime: '',
          created_endtime: '',
        },
        dialogVisible: false,
        options: [
          {value: '0', label: '待申请'},
          {value: '1', label: '已申请'},
          {value: '2', label: '处理中'},
          {value: '9', label: '已终结'}
        ],
        leftList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],
        ajxxForm: {
          ajbh: '',
          ajmc: ''
        },
        ajxxTableData: [],
        ajTotal: 0,
        ajCurrentPage: 1,
        ajPageSize: 5,
      }
    },
    created() {
      if (sessionStorage.getItem('rksqSession')) {
        this.formInline = JSON.parse(sessionStorage.getItem('rksqSession'))
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

        let timeComp = timeCompare(this.formInline.created_starttime, this.formInline.created_endtime)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          user_name: this.formInline.user_name  == null ? '' : this.formInline.user_name,
          user_id: this.formInline.user_id == null ? '' : this.formInline.user_id,
          created_starttime: this.formInline.created_starttime == null ? '' : this.formInline.created_starttime,
          created_endtime: this.formInline.created_endtime == null ? '' : this.formInline.created_endtime,
        };
        this.$api.drrzgl.query(param).then((res) => {
          this.total = Number(res.body.default.listcount);
          this.tableData = res.body.default.list;
          this.tableData.forEach(function (c) {
            if (c.operation_type == '1') {
              c.operation_type = '登入'
            } else if (c.operation_type == '2') {
              c.operation_type = '登出'
            } else if (c.operation_type == '3') {
              c.operation_type = '锁定'
            } else if (c.operation_type == '4') {
              c.operation_type = '解锁'
            } else if (c.operation_type == '5') {
              c.operation_type = '会话过期'
            } else if (c.operation_type == '6') {
              c.operation_type = '异常'
            }else if (c.operation_type == '7') {
              c.operation_type = '会话移除'
            }
          })
        })
      },
      chooseAjxx(row) {
        var params = {
          ajxx_id: row.id,
          opertype: 'add'
        }
        this.$api.rksq.addRksqxxRwzb(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              sessionStorage.removeItem('bjrksqxx')
              sessionStorage.setItem('bjrksqxx', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'editOrganization',
                params: res.body.default
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      },
      reset() {
        this.formInline.user_name = '';
        this.formInline.user_id = '';
        this.formInline.created_starttime = '';
        this.formInline.created_endtime = '';
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
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rksqSession')
          sessionStorage.setItem('rksqSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
