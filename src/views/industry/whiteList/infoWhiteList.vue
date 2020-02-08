<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            案件查询
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" placeholder="请输入案件编号" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" placeholder="请输入案件称" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="是否存在本部门待处置物证" label-width="160px" prop="ajmc">
                      <el-select v-model="filters.sfczdw" placeholder="请选择" size="mini">
                        <el-option v-for="item in sfczdwrAry" :key="item.value" :label="item.label" :value="item.value">

                        </el-option>

                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-form-item label="录入部门" prop="ajmc">
                    <el-input v-model="filters.ba_dept_name" placeholder="请选择" size="mini" @focus="chooseDept()"
                              clearable></el-input>
                  </el-form-item>
                  <el-form-item label="创建日期">
                    <el-date-picker
                      v-model="filters.created_time_begin"
                      type="date"
                      placeholder="请输入日期起"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                    <i class="text">-</i>
                    <el-date-picker
                      v-model="filters.created_time_end"
                      type="date"
                      placeholder="请输入日期止"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="选择部门"
      :visible.sync="deptDialog"
      :append-to-body="true"
      :modal="true"
      width="40%">
      <div class="ck_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="treeProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="tree"
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="chooseDeptName" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" size="mini" border style="width: 100%"
                    highlight-current-row>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间" :formatter="formatDate" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <i @click="checkDetail(scope.row)" class="el-icon-view" style="font-size: 20px" title="全案预览"></i>
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
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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
        //筛选条件
        filters: {
          ajbh: '',
          ajmc: '',
          created_time_begin: '',
          created_time_end: '',
          rklsh: '',
          sfczdw: '',
          ba_dept_id: '',
          ba_dept_name: ''
        },
        sfczdwrAry: [
          {value: '1', label: '是'},
          {value: '2', label: '否'}
        ],
        value: '',
        centerDialogVisible: false,
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        gridData: [],
        tableData: [],
        deptDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        filterText: '',
        checkDeptId: [],
        checkDeptName: [],
        name: '',
        orgCode: '',
        query: {
          parameters: {}
        },
        tableColumns: [],
        more: false
      }
    },
    created() {
        if (sessionStorage.getItem('ajcxSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('ajcxSession'))
        }
      this.findTable();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      setDialogVal(val) {
        this.centerDialogVisible = val
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
        let timeComp = timeCompare(this.filters.created_time_begin, this.filters.created_time_end)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {};
        if (this.filters.ba_dept_name == '') {
          this.filters.ba_dept_id = '';
        }
        this.filters.created_time_begin=this.filters.created_time_begin==null?'':this.filters.created_time_begin
        this.filters.created_time_end=this.filters.created_time_end==null?'':this.filters.created_time_end
        Object.assign(parms, param, this.filters)
        this.$api.ajcx.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
      },
      checkDetail(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.id
          }
        })
      },
      reset() {
      this.filters = {
        ajbh: '',
        ajmc: '',
        created_time_begin: '',
        created_time_end: '',
        rklsh: '',
        sfczdw: '',
        ba_dept_id: '',
        ba_dept_name: ''
      }
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.id
          }
        })
      },
      caseThingName() {
        this.centerDialogVisible = true
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1
      },
      clearBtn() {
        this.name = ''
        this.orgCode = ''
      },
      handleCheckChange(data, checked) {
        if (checked) {
          this.checkDeptId.push(data.id)
          this.checkDeptName.push(data.name)
        } else {
          this.checkDeptId.splice(this.checkDeptId.indexOf(data.id), 1)
          this.checkDeptName.splice(this.checkDeptName.indexOf(data.name), 1)
        }
      },
      chooseDept() {
        this.checkDeptId = [];
        this.checkDeptName = [];
        var param = {
          valid_flag: '1'
        }
        this.$api.bmwzc.gsrTree(param).then((res) => {
          if (res.success === "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      chooseDeptName() {
        this.filters.ba_dept_id = this.checkDeptId.join(',')
        this.filters.ba_dept_name = this.checkDeptName.join(',')
        this.deptDialog = false;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('ajcxSession')
          sessionStorage.setItem('ajcxSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
