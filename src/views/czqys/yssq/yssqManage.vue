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
            移送申请
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
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
                        <el-date-picker
                          v-model="formInline.sqsj1"
                          type="date"
                          placeholder="请输入日期起"

                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="formInline.sqsj2"
                          type="date"
                          placeholder="请输入日期止"

                          value-format="yyyy-MM-dd">
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

                  <el-form-item label="移送流水号">
                    <el-input v-model="formInline.rklsh" placeholder="请输入移送流水号" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="嫌疑人">
                    <el-input v-model="formInline.xyr" placeholder="请输入嫌疑人" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-select v-model="formInline.state" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" v-access id="yssqAdd" size="mini" @click="addDysq()">新增</el-button>
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
          <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="xyr" label="嫌疑人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="lsh" label="移送流水号" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqr_name" label="申请人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqr_dept_name" label="申请部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" width="150px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="yszt" label="状态" width="80px" :formatter="formatYszt"></el-table-column>
          <el-table-column label="操作" width="120px" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.yszt=='0'" class="el-icon-edit" style="font-size: 20px;"
                 @click="editClick(scope.row)" v-access id="yssqEdit" title="编辑"></i>
              <i v-if="scope.row.yszt=='0'" class="el-icon-delete" style="font-size: 20px;"
                 @click="delYssq(scope.row)" v-access id="yssqDel" title="删除"></i>
              <i v-if="scope.row.yszt!='0'" class="el-icon-view"
                 style="font-size: 20px;" @click="viewClick(scope.row)" v-access id="yssqEye" title="查看"></i>
            </template>
          </el-table-column>
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
    <el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="60%" :modal="false" style="padding: 0 5px">
      <div style="">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form ref="ajxxForm" :inline="true" :model="ajxxForm">
                <el-form-item label="案件编号">
                  <el-input v-model="ajxxForm.ajbh" placeholder="请输入案件编号" size="mini" clearable
                            @keyup.enter.native="onSubmit">
                  </el-input>
                </el-form-item>
                <el-form-item label="案件名称">
                  <el-input v-model="ajxxForm.ajmc" placeholder="请输入案件名称" size="mini" clearable
                            @keyup.enter.native="onSubmit">
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="findAjxxTable()">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" :data="ajxxTableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%;" size="mini"
                  @selection-change="handleSelectionChange">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(ajCurrentPage - 1) * ajPageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
         <el-table-column prop="ajbh" label="案件编号" min-width="120px" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="created_time" label="创建时间" width="150px" :formatter="dateFormat"
                          :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="bary_name" label="录入人员" width="70px" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="sfsa" label="案件类型" width="70px" :formatter="formatAjlx"
                          :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="chooseAjxx(scope.row)" icon="el-icon-check" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination
              background
              @size-change="ajHandleSizeChange"
              @current-change="ajHandleCurrentChange"
              :current-page="ajCurrentPage"
              :page-sizes="[5, 10, 15, 20, 25]"
              :page-size="ajPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="ajTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
          <el-button type="primary" @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '../../../utils/datetime'

  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          ajbh: '',
          ajmc: '',
          sqsj1: '',
          sqsj2: '',
          sqrxm: '',
          rklsh: '',
          state: '',
          xyr: ''
        },
        dialogVisible: false,
        options: [
          {value: '0', label: '待申请'},
          {value: '1', label: '待接收'},
          {value: '5', label: '部分接收'},
          {value: '4', label: '部分退回'},
          {value: '2', label: '已接收'},
          {value: '3', label: '已退回'}
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
        more: false
      }
    },
    created() {
        if (sessionStorage.getItem('ysosqSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('ysosqSession'))
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
      handleClick(row) {
        console.log(row);
        this.$router.push({path: '/productManage/editProduct', query: {setid: 123456}});
      },
      viewClick(row) {
        var params = {
          yssq_id: row.id
        }
        this.$api.yssq.editYssqxx(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('ckyssq')
            sessionStorage.setItem('ckyssq', JSON.stringify(res.body.default))
            this.$router.push({
              name: 'viewYssq',
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
        let timeComp = timeCompare(this.formInline.sqsj1, this.formInline.sqsj2)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ajbh: this.formInline.ajbh,
          ajmc: this.formInline.ajmc,
          sqsjq: this.formInline.sqsj1==null?'':this.formInline.sqsj1,
          sqsjz: this.formInline.sqsj2==null?'':this.formInline.sqsj2,
          sqr_name: this.formInline.sqrxm,
          lsh: this.formInline.rklsh,
          yszt: this.formInline.state,
          xyr: this.formInline.xyr
        };
        this.$api.yssq.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      ajHandleSizeChange(val) {
        this.ajPageSize = val;
        this.findAjxxTable();
      },
      ajHandleCurrentChange(val) {
        this.ajCurrentPage = val;
        this.findAjxxTable();
      },
      findAjxxTable() {
        var param = {
          pagenum: this.ajCurrentPage,
          pagesize: this.ajPageSize,
          ajbh: this.ajxxForm.ajbh,
          ajmc: this.ajxxForm.ajmc,
          type: 'ys'
        };
        this.$api.rksq.queryAjxxTable(param).then((res) => {
          this.ajTotal = Number(res.body.default.count);
          this.ajxxTableData = res.body.default.dataset;
        })
      },
      addDysq() {
        this.dialogVisible = true;
        this.findAjxxTable();
      },
      delYssq(row) {
        this.$confirm('确定删除该移送申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.yssq.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})

            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      chooseAjxx(row) {
          debugger
        var params = {
          ajxx_id: row.id
        }
        this.$api.yssq.addYssqxx(params).then((res) => {
          this.$nextTick(() => {
            if(Object.keys(res.body).length !== 0){
              sessionStorage.removeItem('bjyssq')
              sessionStorage.setItem('bjyssq', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'edit',
                params: res.body.default
              })
            }else{
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }

          })
        })
      },
      editClick(row) {
        sessionStorage.removeItem('ywidUpload')
        sessionStorage.setItem('ywidUpload', row.id)
        var params = {
          yssq_id: row.id
        }
        this.$api.yssq.editYssqxx(params).then((res) => {
          this.$nextTick(() => {
            if(Object.keys(res.body).length !== 0) {
              sessionStorage.removeItem('bjyssq')
              sessionStorage.setItem('bjyssq', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'edit',
                params: res.body.default
              })
            }else{
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      }, formatYszt(row, column) {
        var zjztFormat = '';
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
          zjztFormat = '部分接收'
        }
        return zjztFormat;
      },
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa == '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa == '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      reset() {
        this.formInline.ajbh = '';
        this.formInline.ajmc = '';
        this.formInline.sqsj1 = '';
        this.formInline.sqsj2 = '';
        this.formInline.sqrxm = '';
        this.formInline.rklsh = '';
        this.formInline.state = '';
        this.formInline.xyr = '';
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
          sessionStorage.removeItem('ysosqSession')
          sessionStorage.setItem('ysosqSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
