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
            角色信息列表
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="创建部门">
                      <el-input v-model="filters.create_dept_name" placeholder="请输入创建部门" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-select v-model="filters.status" placeholder="请选择">
                        <el-option value="1" label="启用"></el-option>
                        <el-option value="0" label="禁用"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" v-access id="jsglQuery" size="mini" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-search" size="mini" @click="reset">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" v-access id="jsglSave" size="mini" @click="addRole()">新增</el-button>
      </el-col>
    </el-row>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="role_name" label="角色名称" width="160"></el-table-column>
          <el-table-column prop="role_order" label="排序号" :show-overflow-tooltip="true" width="80px"></el-table-column>
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" width="100px"></el-table-column>
          <el-table-column prop="created_time" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="create_dept_name" label="所属部门" :show-overflow-tooltip="true" min-width="100px"></el-table-column>
          <el-table-column prop="creator_name" label="创建者" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <i @click="fenPeiZiYuan(scope.row)" title="分配资源" v-access id="jsglResource" class="el-icon-setting" style="font-size: 20px"></i>
              <i class="el-icon-edit" @click="thisEdit(scope.row)" v-access id="jsglEdit" title="修改"
                 style="font-size: 20px; margin-left: 12px"></i>
              <i class="el-icon-delete" @click="handleDelete(scope.row)" v-access id="jsglDel" title="删除"
                 style="font-size: 20px; margin-left: 12px"></i>
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
    <pei-zhi :dialogVisible="dialogVisible" :roleId="roleId" @closrDialog="closeTheDia"></pei-zhi>
    <edit-role :displayNot="displayNot" :roleIdEdit="roleIdEdit" @getRoleDisplay="getRoleDisplay"></edit-role>
  </el-card>
</template>

<script>
  import {timeFormat} from "@/utils/datetime"
    import peiZhi from "./components/peiZhi";
    import editRole from "./components/editRole"
    export default {
        components: {peiZhi, editRole},
        name: 'entryTransferAccount',
        data() {
            return {
                tableData: [],
                roleIdEdit: '',
                roleId: '',
                displayNot: false,
                dialogVisible: false,
                disTzDaoChu: true,
                filters: {
                    create_dept_name: '',
                    status: '1',
                    role_name: ''
                },
                //分页信息
                currentPage: 1,
                total: 0,
                pageSize: 10,

            }
        },
        created() {
            this.findTable()
        },
        computed: {
            backgroundColor() {
                return this.$contants.pageSet.backgroundColor
            }
        },
        methods: {
            //跳转页数
            handleSizeChange(val) {
              this.pageSizea = val
              this.findTable();
            },
            handleCurrentChange(val) {
              this.currentPage = val;
              this.findTable();
            },
            closeTheDia (val) {
                this.dialogVisible = val
            },
            getRoleDisplay (val) {
                this.displayNot = val
                this.findTable()
            },
            handleDelete(row) {
                let self = this
                this.$confirm('确定要删除当前的记录吗？', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {
                    var params = {
                        id: row.id
                    };
                    this.$api.RoleManage.delRoleInfo(params).then((res) => {
                        if (res.content.success === 'true') {
                            self.$message({message: res.content.message, type: 'success'})
                            self.findTable()
                        }else{
                          self.$message({message: res.content.message, type: 'error'})
                        }
                    })
                })
            },
            findTable() {
                let self = this
                var param = {
                    pagenum: this.currentPage,
                    pagesize: this.pageSize,
                };
                var parms = {};
                Object.assign(parms, param, this.filters)
                this.$api.RoleManage.getRoleList(parms).then((res) => {
                    self.total = Number(res.content.listcount);
                    if (res.content.list.length >= 1) {
                        res.content.list.forEach(function (e, i) {
                            if (e.status === '1') {
                                e.status = '启用'
                            }
                            if (e.status === '2') {
                                e.status = '禁用'
                            }
                            if (e.created_time) {
                                e.created_time = timeFormat(e.created_time)
                            }
                        })
                    }
                    self.tableData = res.content.list
                })
            },
            fenPeiZiYuan (row) {
              this.roleId = row.id
              this.dialogVisible = true
            },
            addRole () {
              this.displayNot = true
            },
            thisEdit (row) {
                this.roleIdEdit = row.id
                this.displayNot = true
            },
            dateFormat(row, column, cellValue, index) {
                return cellValue = timeFormat(cellValue)
            },
            reset() {
                this.filters.create_dept_name = '';
                this.filters.status = '1';
            }
        },
        beforeRouteLeave(to, form, next) {
            sessionStorage.removeItem('rukudjtzSession')
            sessionStorage.setItem('rukudjtzSession', JSON.stringify(this.filters))
            next()
        }
    }
</script>
