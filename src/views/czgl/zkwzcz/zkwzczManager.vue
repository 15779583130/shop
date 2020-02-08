<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            查询条件
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
              <el-form ref="form" :inline="true" :model="formInline" size="mini">
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
                        <el-date-picker
                          v-model="formInline.sqrqq"
                          type="date"
                          placeholder="请输入日期起"
                          format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                        <i class="text">-</i>
                        <el-date-picker
                          v-model="formInline.sqrqz"
                          type="date"
                          placeholder="请输入日期止"
                          format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button" style="">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                 <!-- <el-form-item label="申 请 人">
                    <el-input v-model="formInline.sqrxm" placeholder="请输入申请人" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item> -->
                  <el-form-item label="处置流水号">
                    <el-input v-model="formInline.lsh" placeholder="请输入处置流水号" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="审核状态">
                    <el-select v-model="formInline.zjzt" placeholder="请选择">
                      <el-option
                        v-for="item in zjztOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="完成状态">
                    <el-select v-model="formInline.zjztf" placeholder="请选择">
                      <el-option
                        v-for="item in zjztfOptions"
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
        <el-button type="primary" icon="el-icon-plus" v-access id="czdjAdd" size="mini" @click="addDysq()">暂扣处置申请</el-button>

      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange">
         <!-- <el-table-column type="selection" width="30"></el-table-column> -->
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" width="200px" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lsh" label="处置流水号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqrxm" label="申请人" width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqbmmc" label="申请部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" width="150px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="zjzt" label="审核状态" width="80px" :formatter="formatZjzt" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zjztf" label="完成状态" width="80px" :formatter="formatZjztf" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="150px" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.zjzt=='0' && scope.row.sqr_id == user_id" v-access id="czdjModify" class="el-icon-edit" style="font-size: 20px;" title="编辑"
                 @click="editClick(scope.row)"></i>

            <i v-if="scope.row.zjzt=='0' && scope.row.sqr_id == user_id " class="el-icon-circle-check" style="font-size: 20px;" title="提交"
                @click="submitClick(scope.row)"></i>

              <i v-if=" scope.row.zjzt!='0'" class="el-icon-view" title="查看"
                 style="font-size: 20px;" @click="viewClick(scope.row)"></i>

              <i  v-if=" scope.row.zjzt!='0'" class="el-icon-reading" title="处置流程"
                 style="font-size: 20px;" @click="czlcClick(scope.row)"></i>

             <i v-if="scope.row.zjzt=='0' || scope.row.zjzt=='1'" class="el-icon-delete" style="font-size: 20px;" title="删除"
                @click="delDysq(scope.row)" v-access id="czdjel"></i>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div class="page">
          <div class="page-content">
            <el-pagination
              background
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
<el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="70%" :modal="false" style="padding: 0px 5px">
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
                  @selection-change="handleSelectionChange" >
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(ajCurrentPage - 1) * ajPageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" width="200px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="created_time" label="创建时间" width="150px" :formatter="dateFormat"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bary_name" label="录入人员" width="70px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sfsa" label="案件类型" width="70px" :formatter="formatAjlx"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="60" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="chooseAjxx(scope.row)" icon="el-icon-check" circle size="mini" title="选择"></el-button>
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
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="处置流程日志" :visible.sync="czlcDialogVisible" width="60%" :modal="false" style="padding: 0px 5px">
          <div style="">
            <el-table ref="multipleTable" :data="czlcTableData" :header-cell-style="{background:'#e6e6e6'}"
                      tooltip-effect="dark" border style="width: 100%;" size="mini">
              <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  <span>{{(czlcCurrentPage - 1) * czlcPageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="czjd" label="操作节点"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="czr_name" label="操作用户"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="created_time" label="操作时间" width="150px" :formatter="dateFormat"
                               :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="czdz" label="操作结果"  :show-overflow-tooltip="true" :formatter="czdzFormat"></el-table-column>
              <el-table-column prop="czyj" label="操作意见" :show-overflow-tooltip="true"></el-table-column>

            </el-table>
            <div class="page">
              <div class="page-content">
                <el-pagination
                  background
                  @size-change="czlcHandleSizeChange"
                  @current-change="czlcHandleCurrentChange"
                  :current-page="czlcCurrentPage"
                  :page-sizes="[5, 10, 15, 20, 25]"
                  :page-size="czlcPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="czlcTotal">
                </el-pagination>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="czlcDialogVisible = false" size="mini">关闭</el-button>
          </span>
        </el-dialog>

  </el-card>
</template>
<script>
import {timeFormat,timeCompare} from '@/utils/datetime'
  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          ajbh: '',
          ajmc: '',
          sqrqq: '',
          sqrqz: '',
          lsh: '',
          zjzt: '',
          zjztf: ''
        },
        user_id:'',
        dialogVisible: false,
        zjztOptions: [
          {value: '0', label: '待提交'},
          {value: '1', label: '待审核'},
          {value: '2', label: '已审核'},
          {value: '3', label: '已登记'},
          {value: '4', label: '被驳回'}

        ],
        zjztfOptions: [
          {value: '0', label: '未完成'},
          {value: '1', label: '已完成'}

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
        more: false,

        czlcDialogVisible:false,
        czlcTableData:[],
        czlcCurrentPage:1,
        czlcPageSize:5,
        czlcTotal:0,
        ywzb_id:''



      }
    },
    created() {
        if (sessionStorage.getItem('czdjSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('czdjSession'))
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
        this.user_id = JSON.parse(sessionStorage.getItem('sessionInfo')).user_id
        console.log(this.user_id)
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
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      viewClick(row) {
        var params = {
          czdj_id: row.id
        }
        this.$api.zkwzcz.getCzdjAndAjxxById(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('zkwzdjck')
            sessionStorage.setItem('zkwzdjck',  JSON.stringify(res.body.default))
            this.$router.push({
              name: 'zkwzczView',
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

        let timeComp = timeCompare(this.formInline.sqrqq, this.formInline.sqrqz)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };


        this.formInline.sqrqq = this.formInline.sqrqq==null?'':this.formInline.sqrqq
         this.formInline.sqrqz = this.formInline.sqrqz==null?'':this.formInline.sqrqz
        var parms = {};
        Object.assign(parms, param, this.formInline)

        this.$api.zkwzcz.queryTable(parms).then((res) => {
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
          type: 'zkcz'
        };

        this.$api.dyghsq.queryAjxxTable(param).then((res) => {
          this.ajTotal = Number(res.body.default.count);
          this.ajxxTableData = res.body.default.dataset;
        })
      },

      czlcHandleSizeChange(val){
        this.czlcPageSize = val
        this.findCzlcTable()

      },
      czlcHandleCurrentChange(val) {
        this.czlcCurrentPage = val;
        this.findCzlcTable();
      },
      findCzlcTable() {

        var param = {
          pagenum: this.czlcCurrentPage,
          pagesize: this.czlcPageSize,
          ywzb_id:this.ywzb_id
        };
        this.czlcTotal = 0
        this.czlcTableData = []
        this.$api.zkwzcz.queryCzlc(param).then((res) => {
           if(Object.keys(res.body).length != 0){
             this.czlcTotal = Number(res.body.default.count);
             this.czlcTableData = res.body.default.dataset;
           }else{
             this.czlcTotal = 0
             this.czlcTableData = []
           }

        })
      },
      czlcClick(row){

        this.ywzb_id = row.id
        this.findCzlcTable()
        this.czlcDialogVisible = true
      },
      addDysq() {
        this.dialogVisible = true;
        this.findAjxxTable();
      },
      delDysq(row) {
        this.$confirm('确定删除该处置申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.zkwzcz.del(params).then((res) => {
            if (res.success === "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      submitClick(row){
        this.$confirm('确定是否提交该处置申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ywzb_id: row.id
          };
          this.$api.zkwzcz.submitCzsqForManager(params).then((res) => {
            if (res.success === "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      chooseAjxx(row) {
        var params = {
          ajxx_id: row.id
        }
        this.$api.zkwzcz.getCzdjAndAjxxById(params).then((res) => {
          this.$nextTick(() => {
            // console.log(res.body.default)
            sessionStorage.removeItem('zkwzczsqbj')
            sessionStorage.setItem('zkwzczsqbj',  JSON.stringify(res.body.default))
            this.$router.push({
              name: 'zkwzczEdit',
              params: res.body.default
            })
          })
        })
      },
      editClick(row) {
        var params = {
          czdj_id: row.id
        }
        this.$api.zkwzcz.getCzdjAndAjxxById(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('zkwzczsqbj')
            sessionStorage.setItem('zkwzczsqbj',  JSON.stringify(res.body.default))
            this.$router.push({
              name: 'zkwzczEdit',
              params: res.body.default
            })
          })
        })
      },
      formatZjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '待提交'
        } else if (cellValue == '1') {
          returnValue = '待审核'
        } else if (cellValue == '3') {
          returnValue = '已登记'
        } else if (cellValue == '2') {
          returnValue = '已审核'
        } else if (cellValue == '4') {
          returnValue = '被驳回'
        }
        return returnValue;
      },
      formatZjztf(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未完成'
        } else if (cellValue == '1') {
          returnValue = '已完成'
        }
        return returnValue;
      },
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa === '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa === '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      czdzFormat(row, column, cellValue, index){
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '提交审核'
        } else if (cellValue == '1') {
          returnValue = '审核通过'
        }else if (cellValue == '2') {
          returnValue = '审核驳回'
        }
        return returnValue;
      },
      reset() {
        this.formInline={
          ajbh: '',
          ajmc: '',
          sqrqq: '',
          sqrqz: '',
          lsh: '',
          zjzt: '',
          zjztf: ''
        }

      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('czdjSession')
          sessionStorage.setItem('czdjSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
