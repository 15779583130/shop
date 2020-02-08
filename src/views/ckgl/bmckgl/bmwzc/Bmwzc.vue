<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              部门
            </div>
            <div class="text item">
              <div class="bmwzc_tree">
                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
                <el-tree
                  class="filter-tree"
                  node-key="id"
                  :data="treeData"
                  :props="treeProps"
                  default-expand-all
                  @node-click="refresh"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  ref="tree">
                </el-tree>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    归属仓库
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="24" style="display: flex;">
                              <el-form-item label="仓库编码" prop="ckbm">
                                <el-input v-model="filters.ckbm" placeholder="请输入仓库编码" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="仓库名称" prop="ckmc">
                                <el-input v-model="filters.ckmc" placeholder="请输入仓库名称" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="创建日期">
                                <el-col :span="10" style="display: flex;">
                                  <el-date-picker
                                    v-model="filters.beg_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" size="mini" style="min-width:100px">
                                  </el-date-picker>
                                  <i class="text">-</i>
                                </el-col>
                                <el-col :span="10" style="display: flex;">
                                  <el-date-picker
                                    v-model="filters.end_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" size="mini" style="min-width:100px">
                                  </el-date-picker>
                                </el-col>
                              </el-form-item>
                            </el-col>
                            <el-col :span="24" style="text-align: right;">
                              <el-form-item label="">
                                <el-button type="primary" icon="el-icon-search" @click="findTable">查询</el-button>
                                <el-button type="default" icon="el-icon-refresh-right" @click="reset">重置</el-button>
                                <el-button type="success" icon="el-icon-circle-plus" id="bmwzcAdd" @click="addGsck">新增</el-button>
                                <el-button type="danger" icon="el-icon-delete" id="bmwzcDel" @click="delBatch">批量删除</el-button>
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
                              highlight-current-row @selection-change="selectData" size="mini"
                              @cell-dblclick="editGsck">
                      :cell-style="{padding:'1px'}">
                      <el-table-column type="selection"></el-table-column>
                      <el-table-column label="仓库编码" prop="ckbm" min-width="100px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="仓库名称" prop="ckmc" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="仓库地址" prop="ckdz" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="是否启用" prop="sfqy_label" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="限制类别" prop="sfxzlb_label" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属部门" prop="gs_dept_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属人" prop="gs_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属人电话" prop="lxdh" width="100px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="创建时间" prop="created_time" width="140px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" align="center" label="操作" >
                        <template slot-scope="scope">
                          <i @click="editGsck(scope.row)" class="el-icon-edit-outline" id="bmwzcModify"
                             style="font-size: 20px;cursor: pointer" title="编辑"></i>
                          <i @click="handleDelete(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer" title="删除" id="bmwzcDel"></i>
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
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:10px">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    可用仓库
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters1" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="24" style="display: flex;">
                              <el-form-item label="仓库编码" prop="ckbm">
                                <el-input v-model="filters1.ckbm" placeholder="请输入仓库编码" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="仓库名称" prop="ckmc">
                                <el-input v-model="filters1.ckmc" placeholder="请输入仓库名称" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="创建日期">
                                <el-col :span="10" style="display: flex;">
                                  <el-date-picker
                                    v-model="filters1.beg_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" size="mini" style="min-width:100px">
                                  </el-date-picker>
                                  <i class="text">-</i>
                                </el-col>
                                <el-col :span="10" style="display: flex;">
                                  <el-date-picker
                                    v-model="filters1.end_time"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" size="mini" style="min-width:100px">
                                  </el-date-picker>
                                </el-col>
                              </el-form-item>
                            </el-col>
                            <el-col :span="24" style="text-align: right;">
                              <el-form-item label="">
                                <el-button type="primary" icon="el-icon-search" @click="findTable1">查询</el-button>
                                <el-button type="default" icon="el-icon-refresh-right" @click="reset1">重置</el-button>
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
                    <el-table :data="tableData1" :header-cell-style="{background:'#e6e6e6'}" :cell-style="{padding:'1px'}"
                              border style="width: 100%" highlight-current-row size="mini" @cell-dblclick="editGsck2">
                      <el-table-column label="仓库编码" prop="ckbm" width="100px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="仓库名称" prop="ckmc" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="仓库地址" prop="ckdz" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="是否启用" prop="sfqy_label" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="限制类别" prop="sfxzlb_label" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属部门" prop="gs_dept_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属人" prop="gs_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="归属人电话" prop="lxdh" width="100px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="创建时间" prop="created_time" width="140px"
                                       :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="默认仓库" prop="dwmrck" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" align="center" label="操作">
                        <template slot-scope="scope">
                          <i @click="setDefault(scope.row)" class="el-icon-setting"
                             style="font-size: 20px;cursor: pointer" title="配置"></i>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange1"
                          @current-change="handleCurrentChange1"
                          :current-page="currentPage1"
                          :page-sizes="[10, 20, 30, 40, 50]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total1">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	   import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "Bmwzc",
    components: {},
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        //右侧
        //筛选条件
        filters: {
          ckbm: '',
          ckmc: '',
          beg_time: '',
          end_time: '',
          dept_id_ck: ''
        },
        filters1: {
          ckbm: '',
          ckmc: '',
          beg_time: '',
          end_time: '',
          dept_id_ck: ''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,
        currentPage1: 1,
        total1: 0,
        pageSize1: 5,
        //表格
        tableData: [],
        delarr: [],//存放删除的数据
        multipleSelection: [],//多选的数据
        tableData1: [],
        dept_name: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
        if (sessionStorage.getItem('bmwzcSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('bmwzcSession'))
        }
      this.findTree();
      this.findTable();
      this.findTable1();
    },
    methods: {
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTree() {
        var param = {};
        this.$api.bmwzc.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      refresh(data) {
        this.filters.dept_id_ck = data.id;
        this.filters1.dept_id_ck = data.id;
        this.dept_name = data.dept_name
        this.findTable()
        this.findTable1()
      },
      //右侧
      handleDelete(row) {
        this.$confirm('确定删除该位置及其子位置？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.bmwzc.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      findTable() {
        let timeComp = timeCompare(this.filters.beg_time, this.filters.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        this.filters.beg_time = this.filters.beg_time==null?'':this.filters.beg_time
         this.filters.end_time = this.filters.end_time==null?'':this.filters.end_time
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.bmwzc.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      findTable1() {
        let timeComp = timeCompare(this.filters1.beg_time, this.filters1.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage1,
          pagesize: this.pageSize1
        };
        this.filters1.beg_time = this.filters1.beg_time==null?'':this.filters1.beg_time
         this.filters1.end_time = this.filters1.end_time==null?'':this.filters1.end_time
        var parms = {};
        Object.assign(parms, param, this.filters1)
        this.$api.bmwzc.queryTable1(parms).then((res) => {
          this.total1 = Number(res.body.default.count);
          this.tableData1 = res.body.default.dataset;
        })
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
      handleDelete(row) {
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: row.id
          };
          this.$api.bmwzc.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      //改变分页大小
      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.findTable1();
      },
      //跳转页数
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.findTable1();
      },
      selectData(arr) {
        this.multipleSelection = arr;
      },
      addGsck() {
        if (this.filters.dept_id_ck === '') {
          this.$message({
            message: '请从左侧树中选择单位或选择子节点！',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        sessionStorage.removeItem('bcjkxx')
        sessionStorage.setItem('bjckxx', JSON.stringify({activeName: 'caseInfo', method: 'addBmWuZhengCang'}))
        this.$router.push({
          name: 'addBmwzc',
          params: {
            activeName: 'caseInfo',
            dept_id: this.filters1.dept_id_ck,
            dept_name: this.dept_name,
            method: 'addBmWuZhengCang',
            isEdit: 'true'
          }
        })
      },
      editGsck(row) {
        let params = {
          activeName: 'caseInfo',
          id: row.id,
          dept_name: this.dept_name,
          method: 'editBmWuZhengCang',
          isEdit: 'true'
        }
        sessionStorage.removeItem('bjckxx')
        sessionStorage.setItem('bjckxx', JSON.stringify(params))
        this.$router.push({
          name: 'addBmwzc',
          params: {
            activeName: 'caseInfo',
            id: row.id,
            dept_name: this.dept_name,
            method: 'editBmWuZhengCang',
            isEdit: 'true'
          }
        })
      },
      editGsck2(row) {
        this.$router.push({
          name: 'addBmwzc',
          params: {
            activeName: 'caseInfo',
            id: row.cfck_id,
            dept_name: this.dept_name,
            method: 'editBmWuZhengCang',
            isEdit: 'false'
          }
        })
      },
      //批量删除
      delBatch() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请先选择要删除的仓库信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些仓库信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delarr.push(this.multipleSelection[i].id)
          }
          var params = {
            ids: this.delarr.join(",")
          };
          this.$api.bmwzc.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      reset() {
        this.filters.ckbm = '';
        this.filters.ckmc = '';
        this.filters.beg_time = '';
        this.filters.end_time = '';
      },
      reset1() {
        this.filters1.ckbm = '';
        this.filters1.ckmc = '';
        this.filters1.beg_time = '';
        this.filters1.end_time = '';
      },
      setDefault(row) {
        this.$confirm('是否设置该仓库为默认仓库？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.bmwzc.setDefault(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable1();
          })
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('bmwzcSession')
          sessionStorage.setItem('bmwzcSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
<style lang="less" scoped>
  @import '../../../../styles/common.less';
  @import '../../../page-main';

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card__header {
    padding: 5px 20px !important;
    background-color: #2470B2;

    span {
      color: #ffffff;
      font-weight: bold;
      font-size: 12px;
    }
  }

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .bmwzc_tree {
    overflow-y: auto;
    height: 100vh;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
