<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .dialog_tree {
    overflow-y: auto;
    height: 60vh;
  }
</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            物证综合查询
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="物证编号" prop="ajbh">
                      <el-input v-model="filters.wzbh" size="mini" placeholder="请输入物证编号"></el-input>
                    </el-form-item>
                    <el-form-item label="物证名称" prop="ajmc">
                      <el-input v-model="filters.wzmc" size="mini" placeholder="请输入物证名称"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" class="large date-box-fix">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_time_begin"
                          type="date"
                          placeholder="请输入日期起" size="mini" format="yyyy-MM-dd" style="width: 270px"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_time_end"
                          type="date"
                          placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" style="width: 270px">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" @click="findTable" size="mini">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
                      <el-button type="success" icon="el-icon-download" v-access id="wzzhcxdcexcel" @click="noHandle" size="mini">导出Excel</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" size="mini" placeholder="请输入案件编号"></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" size="mini" placeholder="请输入案件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="录入部门" prop="ba_dept_name">
                      <el-input v-model="filters.ba_dept_name" size="mini" @focus="chooseDept()" placeholder="请选择录入部门"
                                :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="物证持有人" prop="xyr">
                      <el-input v-model="filters.xyr" size="mini" placeholder="请输入物证持有人"></el-input>
                    </el-form-item>
                    <el-form-item label="录入人员" prop="bary_name">
                      <el-input v-model="filters.bary_name" size="mini" placeholder="请输入录入人员"></el-input>
                    </el-form-item>
                    <el-form-item label="案件类型" prop="sfsa">
                      <el-select v-model="filters.sfsa" placeholder="请选择">
                        <el-option value="0" label="行政案件"></el-option>
                        <el-option value="1" label="刑事案件"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="存放位置" prop="cfwz">
                      <el-input v-model="filters.cfwz" size="mini" placeholder="请选择存放位置" :readonly="true"
                                @focus="chooseCfwz"></el-input>
                    </el-form-item>
                    <el-form-item label="入库状态" prop="state">
                      <el-select v-model="filters.state" placeholder="请选择">
                        <el-option value="0" label="无需入库"></el-option>
                        <el-option value="1" label="未入库"></el-option>
                        <el-option value="2" label="已入库"></el-option>
                        <el-option value="3" label="临时出库"></el-option>
                        <el-option value="4" label="永久出库"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="最终处置方式" prop="zzczfs" class="large">
                      <el-select v-model="filters.zzczfs" placeholder="请选择">
                        <el-option value="01" label="移交公物仓"></el-option>
                        <el-option value="02" label="上缴专管部门"></el-option>
                        <el-option value="03" label="自行处置"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="保管(出库)期限" class="large">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.bgqx_begin"
                          type="date" value-format="yyyy-MM-dd"
                          placeholder="选择日期" size="mini">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.bgqx_end"
                          type="date" value-format="yyyy-MM-dd"
                          placeholder="选择日期" size="mini">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                    highlight-current-row size="mini">
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseThingName(scope.row)">{{ scope.row.wzmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="入库状态" :formatter="rkztFormatter" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="bgqx" label="保管(出库)期限" min-width="110px" :formatter="bgqxFormatter"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="xyr" label="持有人" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="ajmc" label="案件名称" min-width="120px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ba_dept_name" label="录入部门"  min-width="220px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="bary_name" label="录入人员" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sfsa" label="案件类型" :formatter="ajlxFormatter" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="zzczfs" label="最终处置方式" min-width="100px" :show-overflow-tooltip="true" :formatter="czfsFormatter">
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间" min-width="200px" :formatter="dateFormatter" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <i @click="checkLog(scope.row)" v-access id="wzrz" class="el-icon-notebook-2" style="font-size: 20px" title="日志"></i>
              </template>
            </el-table-column>
          </el-table>
          <br/>
          <div class="page" style="">
            <div class="page-content">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,15,20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="查询操作物证日志" :visible.sync="dialogTableVisible" width="70%" :append-to-body="true">
      <el-row>
        <el-col :span="24">
          <div class="form-panel">
            <el-form ref="form" :inline="true" :model="filters1" size="mini">
              <el-row class="form-line">
                <el-col :span="18" style="display: flex;">
                  <el-col :span="12" style="display: flex;">
                    <el-form-item label="操作日期" class="large">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          size="mini"
                          style="width: 200px"
                          v-model="filters1.created_time_begin"
                          type="date" value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          size="mini"
                          style="width: 200px"
                          v-model="filters1.created_time_end"
                          type="date" value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-form-item label="事项类型" prop="logtype">
                    <el-select v-model="filters1.logtype" placeholder="请选择" size="mini">
                      <el-option value="0" label="物证登记"></el-option>
                      <el-option value="1" label="入库申请"></el-option>
                      <el-option value="2" label="调用申请"></el-option>
                      <el-option value="3" label="归还申请"></el-option>
                      <el-option value="4" label="处置申请"></el-option>
                      <el-option value="5" label="移库申请"></el-option>
                      <el-option value="6" label="入库交接"></el-option>
                      <el-option value="7" label="出库交接"></el-option>
                      <el-option value="8" label="处置审核"></el-option>
                      <el-option value="9" label="入库登记"></el-option>
                      <el-option value="10" label="期限调整"></el-option>
                      <el-option value="11" label="位置调整"></el-option>
                      <el-option value="12" label="最终处置登记"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="display: flex;">
                  <el-form-item label="">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable2">查询</el-button>
                    <el-button type="default" @click="reset2" size="mini">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData1" :header-cell-style="{background:'#e6e6e6'}" size="mini">
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage1 - 1) * pageSize1 + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column property="item" label="事项类型"></el-table-column>
            <el-table-column property="operatorName" label="经办人"></el-table-column>
            <el-table-column property="otherInfo" label="记录信息"></el-table-column>
            <el-table-column property="datetime" label="操作时间" :formatter="dateFormatter"
                             show-overflow-tooltip></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="page" style="">
            <div class="page-content">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[5,10,15,20]"
                :page-size="pageSize1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="选择存放位置"
      :visible.sync="deptDialog"
      width="30%"
      :append-to-body="true"
      :modal="true">
      <div class="dialog_tree" style="height: 55vh;overflow-y: auto">
        <el-tree
          class="filter-tree"
          node-key="id"
          show-checkbox
          :check-strictly="true"
          :data="treeData"
          :props="treeProps"
          default-expand-all
          :expand-on-click-node="false"
          ref="tree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false">取 消</el-button>
        <el-button type="primary" @click="getDeptInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择部门"
      :visible.sync="babmDialog"
      :append-to-body="true"
      :modal="true"
      width="40%">
      <div class="dialog_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="filterText1" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          show-checkbox
          :data="treeData1"
          :props="treeProps1"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode1"
          :check-strictly="true"
          ref="tree1">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="babmDialog = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="getChooseDept" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"
                  :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>
<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    components: {
      casePreview
    },
    data() {
      return {
        wzxx_id: '',
        filterText1: '',
        babmDialog: false,
        deptDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'cfwz'
        },
        treeData1: [],
        treeProps1: {
          children: 'children',
          label: 'name'
        },
        //筛选条件
        filters: {
          created_time_begin: '',
          created_time_end: '',
          wzbh: '',
          wzmc: '',
          ajbh: '',
          ajmc: '',
          xyr: '',
          bary_name: '',
          cfwz: '',
          cfwz_id: '',
          ba_dept_name: "",
          ba_dept_id: '',
          bgqx_begin: '',
          bgqx_end: '',
          state: '',
          zzczfs: ''
        },
        filters1: {
          created_time_begin: '',
          created_time_end: '',
          logtype: ''
        },
        wzid: '',
        options: [],
        value: '',
        centerDialogVisible: false,
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        currentPage1: 1,
        total1: 0,
        pageSize1: 5,
        gridData: [],
        tableData: [],
        tableData1: [],
        name: '',
        orgCode: '',
        query: {
          parameters: {}
        },
        tableColumns: [],
        data1: [{}],
        dialogTableVisible: false,
        ajxxTableData: [],
        more: false
      }
    },
    created() {
      if (this.$route.params.state) {
        this.filters.state = this.$route.params.state
      }
        if (sessionStorage.getItem('wzzhcxSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('wzzhcxSession'))
        }
      this.findTable();
    },
    watch: {
      filterText1(val) {
        this.$refs.tree1.filter(val);
      },
    },
    methods: {
      rkztFormatter(row, column, value) {
        switch (value) {
          case '0':
            return '无需入库'
          case '1':
            return '未入库'
          case '2':
            return '已入库'
          case '3':
            return '临时出库'
          case '4':
            return '永久出库'
        }
      },
      ajlxFormatter(row, column, value) {
        switch (value) {
          case '0':
            return '行政案件'
          case '1':
            return '刑事案件'
        }
      },
      dateFormatter(row, column, value) {
        return timeFormat(value)
      },
      handleDelete(row) {
        this.$confirm('确定删除该位置及其子位置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.rksq.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      bgqxFormatter(row, column, value) {
        if (value == '99991231') {
          value = '长期'
        } else if (value == '' || value == undefined) {
          value = '-'
        } else {
          value = timeFormat(value).substring(0, 10)
        }
        return value
      },
      czfsFormatter(row,column,cellValue,value){
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
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      getDeptInfo() {
        var nodes = this.$refs.tree.getCheckedNodes();
        var node_ids = nodes.map(obj => {
          return obj.id
        }).join(",");
        var names = nodes.map(obj => {
          return obj.cfwz
        }).join(",");
        this.filters.cfwz = names;
        this.filters.cfwz_id = node_ids;
        this.deptDialog = false;
      },
      chooseCfwz() {
        var params = {
          cfck_id: ''
        };
        this.$api.common.queryCfwz2(params).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      findTable() {

        let timeComp = timeCompare(this.filters.created_time_begin, this.filters.created_time_end)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

      let timeComp2 = timeCompare(this.filters.bgqx_begin, this.filters.bgqx_end)
             if (!timeComp2.status) {
               this.$message(timeComp2.msg)
               return false
             }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {};
        this.filters.created_time_begin=this.filters.created_time_begin==null?'':this.filters.created_time_begin
        this.filters.created_time_end=this.filters.created_time_end==null?'':this.filters.created_time_end
        this.filters.bgqx_begin=this.filters.bgqx_begin==null?'':this.filters.bgqx_begin
        this.filters.bgqx_end=this.filters.bgqx_end==null?'':this.filters.bgqx_end
        Object.assign(parms, param, this.filters)
        this.$api.wzzh.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      findTable2() {
        var param = {
          wzid: this.wzid,
          pagenum: this.currentPage1,
          pagesize: this.pageSize1,
        };
        var parms = {};

        Object.assign(parms, param, this.filters1)
        this.$api.wzzh.queryTable2(parms).then((res) => {
          this.total1 = Number(res.body.default.count);
          this.tableData1 = res.body.default.dataset;
        })
      },
      noHandle() {
        var parms = {};
        // this.filters.sqsj1 = this.filters.sqsj1==null?'':this.filters.sqsj1
        // this.filters.sqsjz = this.filters.sqsjz==null?'':this.filters.sqsjz
        // this.filters.rksj1= this.filters.rksj1==null?'':this.filters.rksj1
        // this.filters.rksj2= this.filters.rksj2==null?'':this.filters.rksj2
        Object.assign(parms, this.filters)

        this.$api.wzzh.exportExcl(parms).then((res) => {

          if (res.success == "true") {

            var downloadFileUrl =res.data
            var elemIF = document.createElement("iframe");
            elemIF.src = downloadFileUrl;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
          } else {
            this.$message({message: res.message, type: 'error'})
          }

        })
      },
      checkLog(row) {
        this.wzid = row.id;
        var that = this;
        const promise = new Promise(function (resolve, reject) {
          that.reset2()
          resolve();
        })
        promise.then(function () {
          that.findTable2()
          that.dialogTableVisible = true
        })
      },
      reset() {
        var obj = {
          created_time_begin: '',
          created_time_end: '',
          wzbh: '',
          wzmc: '',
          ajbh: '',
          ajmc: '',
          xyr: '',
          bary_name: '',
          cfwz: '',
          cfwz_id: '',
          ba_dept_name: "",
          ba_dept_id: '',
          bgqx_begin: '',
          bgqx_end: '',
          state: '',
          zzczfs: ''
        }
        this.filters = obj;
      },
      reset2() {
        var obj = {
          created_time_begin: '',
          created_time_end: '',
          logtype: ''
        }
        this.filters1 = obj
      },
      handleDelete(row) {
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: row.id
          };
          this.$api.rksq.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      chooseDept() {
        var param = {};
        this.$api.bmwzc.gsrTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData1 = res.data
            this.babmDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      getChooseDept() {
        var nodes = this.$refs.tree1.getCheckedNodes();
        var node_ids = nodes.map(obj => {
          return obj.id
        }).join(",");
        var names = nodes.map(obj => {
          return obj.name
        }).join(",");
        this.filters.ba_dept_name = names;
        this.filters.ba_dept_id = node_ids;
        this.babmDialog = false;
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      caseThingName(row) {
        this.wzxx_id = row.id;
        this.centerDialogVisible = true
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.findTable2();
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.findTable2();
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('wzzhcxSession')
        sessionStorage.setItem('wzzhcxSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
