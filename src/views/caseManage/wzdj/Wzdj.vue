<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            物证登记
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
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" size="mini" placeholder="请输入案件编号"></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" size="mini" placeholder="请输入案件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" class="large date-box-fix">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_time_begin"
                          type="date"
                          placeholder="请选择日期起" size="mini" format="yyyy-MM-dd" style="width: 270px"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_time_end"
                          type="date"
                          placeholder="请选择日期止" size="mini" format="yyyy-MM-dd" style="width: 270px"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item class="id-button">
                      <el-button type="primary" icon="el-icon-search" @click="findTable('search')" size="mini">查询</el-button>
                      <el-button type="default"  icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="物证编号">
                      <el-input v-model="filters.wzbh" placeholder="请输物证编号" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="物证名称">
                      <el-input v-model="filters.wzmc" placeholder="请输入物证名称" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="录入部门">
                      <el-input v-model="filters.dept_name" placeholder="请选择录入" size="mini" clearable
                                @keyup.enter.native="onSubmit" @focus="chooseDept()">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="录入人员">
                      <el-input v-model="filters.bary_name" placeholder="请输入录入人员" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="物证持有人">
                      <el-input v-model="filters.xyr" placeholder="请输入物证持有人" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件类型">
                      <el-select v-model="filters.sfsa" placeholder="请选择案件类型">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" v-access id="anglwzdjXz" size="mini" @click="addData()">新增</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="选择部门"
      :visible.sync="deptDialog"
      :append-to-body="true"
      :modal="true"
      width="30%">
      <div class="ck_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
        <el-tree
          ref="tree"
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="treeProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
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
          <grid-table
            :table-data="tableData"
            :table-label="tableLabel"
            :table-option="tableOption"
            @caseNameDetial="caseNameDetial"
            @caseEdit="caseEdit"
            @thisEdit="thisEdit"
            @handleDelete="handleDelete"
          ></grid-table>
<!--          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row-->
<!--                    size="mini">-->
<!--            <el-table-column label="序号" width="50" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">-->
<!--              <template slot-scope="scope">-->
<!--                <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="bary_name" label="录入人员" width="80px" :show-overflow-tooltip="true">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="sfsa" label="案件类型" width="80px" :formatter='formatAjlx' :show-overflow-tooltip="true">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="created_time" label="创建时间" :formatter="formatDate" :show-overflow-tooltip="true">-->
<!--            </el-table-column>-->
<!--            <el-table-column fixed="right" align="center" label="操作" width="150px">-->
<!--              <template slot-scope="scope">-->
<!--                <i @click="caseEdit(scope.row)" v-access id="ajbjEdit" title="案件编辑" class="el-icon-edit-outline" style="font-size: 20px"></i>-->
<!--                <i class="el-icon-edit" @click="thisEdit(scope.row)" v-access id="wzbjEdit" title="物证编辑"-->
<!--                   style="font-size: 20px; margin-left: 12px"></i>-->
<!--                <i class="el-icon-delete" @click="handleDelete(scope.row)" v-access id="wzbjDel" title="删除"-->
<!--                   style="font-size: 20px; margin-left: 12px"></i>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
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
  </el-card>
</template>
<script>
  import {timeFormat, timeCompare} from '@/utils/datetime'
  import gridTable from '@/views/my-components/grid/gridTable'
  export default {
    components: {
      gridTable
    },
    data() {
      return {
        tableLabel: [
          {label: '序号', prop: 'xuHao', width: '50px'},
          {label: '案件编号', prop: 'ajbh'},
          {label: '案件名称', prop: 'ajmc', click: 'caseNameDetial'},
          {label: '录入部门', prop: 'ba_dept_name'},
          {label: '录入人员', prop: 'bary_name', width: '120px'},
          {label: '案件类型', prop: 'sfsa', width: '120px',
            render: (row) => {
              if (row.sfsa === '0') {
                return '行政案件'
              }
              if (row.sfsa === '1') {
                return '刑事案件'
              }
            }
          },
          {label: '创建时间', prop: 'created_time',
            render: (row) => {
              return timeFormat(row.created_time)
            }
          },
        ],
        tableOption: {
          label: '操作',
          width: '150px',
          options: [
            { label: '案件编辑', type: 'primary', idBtn: 'ajbjEdit', icon: 'el-icon-edit-outline', methods: 'caseEdit' },
            { label: '物证编辑', type: 'primary', idBtn: 'wzbjEdit', icon: 'el-icon-edit', methods: 'thisEdit' },
            { label: '删除', type: 'primary', idBtn: 'wzbjDel', icon: 'el-icon-delete', methods: 'handleDelete' },
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        //筛选条件
        filters: {
          ajbh: '',
          ajmc: '',
          created_time_begin: '',
          created_time_end: '',
          wzbh: '',
          wzmc: '',
          bary_name: '',
          xyr: '',
          sfsa: '',
          dept_id: '',
          dept_name: ''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
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
        options: [
          {value: '1', label: '刑事案件'},
          {value: '0', label: '行政案件'}
        ],
        more: false
      }
    },
    created() {
      if (sessionStorage.getItem('wzdjSession')) {
        this.filters = JSON.parse(sessionStorage.getItem('wzdjSession'))
      }
      this.init()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      init() {
        // 查询信息
        this.findTable()
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
      chooseDeptName() {
        this.filters.dept_id = this.checkDeptId.join(',')
        this.filters.dept_name = this.checkDeptName.join(',')
        this.deptDialog = false;

      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTable(val) {
        let self = this
        if (val === 'search') {
          this.filters.isSearch = true
        }

       let timeComp = timeCompare(this.filters.created_time_begin, this.filters.created_time_end)
       if (!timeComp.status) {
         this.$message(timeComp.msg)
         return false
       }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ajbh: this.filters.ajbh,
          ajmc: this.filters.ajmc,
          created_time_begin: this.filters.created_time_begin==null?'':this.filters.created_time_begin,
          created_time_end: this.filters.created_time_end==null?'':this.filters.created_time_end,
          wzbh: this.filters.wzbh,
          wzmc: this.filters.wzmc,
          bary_name: this.filters.bary_name,
          xyr: this.filters.xyr,
          sfsa: this.filters.sfsa,
          ba_dept_id: this.filters.dept_id
        };
        this.$api.wzdj.queryTable(param).then((res) => {
          self.total = Number(res.body.default.count);
          self.tableData = res.body.default.dataset;
          self.tableData.forEach(function (e, i) {
            e.xuHao = i + 1
          })
        })
      },
      reset() {
        this.filters = {
          ajbh: '',
          ajmc: '',
          created_time_begin: '',
          created_time_end: '',
          wzbh: '',
          wzmc: '',
          bary_name: '',
          xyr: '',
          sfsa: '',
          dept_id: '',
          dept_name: '',
          isSearch: false
        }
      },
      addData() {
        sessionStorage.removeItem('editCaseInfo')
        sessionStorage.setItem('editCaseInfo', JSON.stringify({activeName: 'caseInfo'}))
        this.$router.push({
          name: 'addIndustry',
          params: {
            activeName: 'caseInfo',
            id: '',
            type: 'add'
          }
        })
      },
      caseEdit(row) { // 编辑案件信息
        sessionStorage.removeItem('editCaseInfo')
        sessionStorage.setItem('editCaseInfo', JSON.stringify({activeName: 'caseInfo',anJianId: row.id}))
        this.$router.push({
          name: 'editIndustry',
          params: {
            activeName: 'caseInfo',
            id: row.id,
            type: 'edit'
          }
        })
      },
      thisEdit(row) {
        sessionStorage.removeItem('editCaseInfo')
        sessionStorage.setItem('editCaseInfo', JSON.stringify({activeName: 'thingInfo',anJianId: row.id}))
        this.$router.push({
          name: 'editIndustry',
          params: {
            activeName: 'thingInfo',
            anJianId: row.id,
            type: 'edit'
          }
        })
      },
      handleDelete(row) {
        this.$confirm('确定删除该案件信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.wzdj.delAj(params).then((res) => {
            if (res.success === "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      caseNameDetial(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.id
          }
        })
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1

      },
      createBtn() {
        this.$router.push({
          name: 'addOrganization'
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
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
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
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
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('wzdjSession')
      sessionStorage.setItem('wzdjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>

<style scoped>

</style>
