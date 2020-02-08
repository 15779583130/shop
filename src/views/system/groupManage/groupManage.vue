/**
 * @author 董珊珊
 * @create date: 2019/12/25
 * @version:
 * @modify	 	2019/12/25	董珊珊		无		新建，工作组管理页面
 */

<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

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

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .group_tree {
    overflow-y: auto;
    height: calc(100vh - 170px);
  }

  /* 分页 */
  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  /* 操作按钮 */
  .table_btn {
    margin-top: 10px;
    /* margin-bottom: 5px;
    padding-right: 12px; */
    // float: right;
    width: auto;
  }

</style>


<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <!-- 组树 -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              组结构
            </div>
            <div class="text item">
              <div class="group_tree">
                <el-form :inline="true" class="demo-form-inline">
                  <el-row >
                    <el-col :span="24" class="table_btn" style="margin-bottom: 10px;">
                     <el-button type="primary" icon="el-icon-circle-plus" v-access id="gzzSave" size="mini" @click="addGroup">新增</el-button>
                     <el-button type="primary" icon="el-icon-edit" size="mini" v-access id="gzzEdit" @click="editGroup">修改</el-button>
                     <el-button type="primary" icon="el-icon-delete" size="mini" v-access id="gzzDel" @click="delGroup">删除</el-button>
                    </el-col>
                  </el-row>
                </el-form>

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
          <!-- 角色列表 -->
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    角色列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" v-access id="gzzsaveRole" size="mini" @click="addGroupRole">新增</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" v-access id="gzzdelRole" @click="delBatchRole">批量删除</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row @selection-change="selectData1" size="mini">
                      <el-table-column type="selection" align="center" width="50"></el-table-column>
                      <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="名称" prop="role_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="状态" prop="status" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in statusOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.status === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                          <i @click="delRole(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" v-access id="gzzDelRole" title="删除"></i>
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

          <!-- 用户列表-->
          <el-card class="box-card" style="margin-top:10px">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    用户列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters1" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="12" style="display: flex;">
                              <el-form-item :span="12" label="用户名">
                                <el-input v-model="filters1.user_name" placeholder="请输入用户名" size="mini"
                                          @keyup.enter.native="findTable1"></el-input>
                              </el-form-item>
                              <el-form-item :span="12" label="部门名称">
                                <el-input v-model="filters1.dept_name" placeholder="请输入部门名称" size="mini"
                                @focus="deptDialog = true;findDeptTree()"
                                @keyup.enter.native="findTable1" :readonly="true"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                              <el-form-item class="id-button">
                                <el-button type="primary" icon="el-icon-search" v-access id="gzzQuery" @click="findTable1()" size="mini">查询</el-button>
                                <el-button type="default"  icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
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
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" v-access id="gzzSaveUser" size="mini" @click="addGroupUser">新增</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" v-access id="gzzDelUser" @click="delBatchUser">批量删除</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData1" :header-cell-style="{background:'#e6e6e6'}"
                              border style="width: 100%" highlight-current-row @selection-change="selectData2" size="mini"  >
                      <el-table-column type="selection" align="center" width="50" ></el-table-column>
                      <el-table-column label="序号" align="center" width="50" >
                        <template slot-scope="scope">
                          <span>{{(currentPage1 - 1) * pageSize1 + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="登录账号" prop="login_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="用户名" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="部门名称" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                          <i @click="delUser(scope.row)" class="el-icon-delete"
                             style="font-size: 20px;cursor: pointer;color:#0066CC;" v-access id="gzzDelUser" title="删除"></i>
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

    <!-- 新增组角色-->
    <el-dialog
      :title="groupRoleTitle"
      :visible.sync="roleDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <!-- 可选角色列表 -->
      <el-card class="box-card" size="mini">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div
                style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                角色列表
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="text item">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-table :data="tableDataRole" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                          highlight-current-row @selection-change="selectDataRole" size="mini">
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">
                      <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="名称" prop="role_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="状态" prop="status" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <el-tag
                      effect="dark"
                      v-for="item in statusOptions"
                      :type='tagOptions[item.index].label'
                      v-show='scope.row.status === item.value'
                      disable-transitions>{{item.label}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
                <div class="page">
                  <div class="page-content">
                    <el-pagination
                      background
                      @size-change="handleSizeChangeRole"
                      @current-change="handleCurrentChangeRole"
                      :current-page="currentPageRole"
                      :page-sizes="[5, 10, 20, 50]"
                      :page-size="pageSizeRole"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalRole">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false; tableDataRole = null" size="mini">关闭</el-button>
        <el-button type="primary" @click="addGroupRoleSubmit()" size="mini">新增</el-button>
      </span>
    </el-dialog>

    <!-- 新增组用户-->
    <el-dialog
      :title="groupUserTitle"
      :visible.sync="userDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <!-- 可选用户列表 -->
      <el-card class="box-card" style="margin-top:10px">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div
                style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                用户列表
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="text item">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div
                  style="background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                  <div class="form-panel">
                    <el-form :inline="true" :model="filtersUser" class="demo-form-inline" size="mini">
                      <el-row class="form-line">
                        <el-col :span="12" style="display: flex;">
                          <el-form-item :span="12" label="用户名">
                            <el-input v-model="filtersUser.user_name" placeholder="请输入用户名" size="mini"
                                      @keyup.enter.native="querySelectUser"></el-input>
                          </el-form-item>
                          <el-form-item :span="12" label="部门名称">
                            <el-input v-model="filtersUser.dept_name" placeholder="请输入部门名称" size="mini"
                            @focus="deptDialog = true;findDeptTree()"
                            @keyup.enter.native="querySelectUser" :readonly="true"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12" style="text-align: right;">
                          <el-form-item class="id-button">
                            <el-button type="primary" icon="el-icon-search" @click="querySelectUser()" size="mini">查询</el-button>
                            <el-button type="default"  icon="el-icon-refresh-right" @click="resetFiltersUser()" size="mini">重置</el-button>
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
                <el-table :data="tableDataUser" :header-cell-style="{background:'#e6e6e6'}"
                          border style="width: 100%" highlight-current-row @selection-change="selectDataUser" size="mini" >
                  <el-table-column type="selection" align="center" width="50" ></el-table-column>
                  <el-table-column label="序号" align="center" width="50" >
                    <template slot-scope="scope">
                      <span>{{(currentPageUser - 1) * pageSizeUser + scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="登录账号" prop="login_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="用户名" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="部门名称" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
                <div class="page">
                  <div class="page-content">
                    <el-pagination
                      background
                      @size-change="handleSizeChangeUser"
                      @current-change="handleCurrentChangeUser"
                      :current-page="currentPageUser"
                      :page-sizes="[10, 20, 30, 40, 50]"
                      :page-size="pageSizeUser"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalUser">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialog = false;resetFiltersUser()" size="mini">关闭</el-button>
        <el-button type="primary" @click="addGroupUserSubmit()" size="mini">新增</el-button>
      </span>
    </el-dialog>

    <!-- 选择部门列表 -->
    <el-dialog
      title="选择部门列表"
      :visible.sync="deptDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-card class="box-card">
        <div
          style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
          <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
          部门树
        </div>
        <div class="text item">
          <div class="pid_menu_tree">
            <el-input placeholder="请输入过滤条件" v-model="filterTextDept" size="mini"></el-input>
            <el-tree
              class="filter-tree"
              node-key="id"
              :data="treeDataDept"
              :props="treePropsDept"
              default-expand-all
              @node-click="selectDept"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree">
            </el-tree>
          </div>
        </div>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false;resetFiltersUser()" size="mini">关闭</el-button>
        <el-button @click="resetFiltersUser()" size="mini">清空</el-button>
        <el-button type="primary" @click="selectDeptSubmit()" size="mini">确认</el-button>
      </span>
    </el-dialog>

    <!-- 新增、编辑组 -->
    <el-dialog
      :title="groupTitle"
      :visible.sync="groupDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-form ref="groupForm" :model="groupForm" label-width="80px"
      size="mini" :rules="groupRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="中文名称" prop="name_cn">
              <el-input v-model="groupForm.name_cn" @blur="getPysx" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="英文名称"prop="name_en">
              <el-input v-model="groupForm.name_en" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="状态"prop="status">
              <el-select v-model="groupForm.status" placeholder="请选择状态">
                <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="类型"prop="types">
              <el-input v-model="groupForm.types" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="首页路径"prop="sy_path">
              <el-input v-model="groupForm.sy_path" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="groupDialog = false;groupForm = {};" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitGroup()" size="mini">提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'
  import {vPinyin} from '@/utils/py/vue-py';

  export default {
    name: "group",
    components: {},
    data() {
      return {
        // 组结构
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        // 部门树
        filterTextDept: '',
        treeDataDept: [],
        treePropsDept: {
          children: 'children',
          label: 'name'
        },
        // 部门树选择数据
        selectTempData:{
          dept_id: '',
          dept_name: ''
        },
        // 角色列表，筛选条件
        filters: {
          group_id: null,
          power: '',
        },
        // 角色分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,
        // 角色表格数据
        tableData: [],
        // 用户列表，筛选条件
        filters1: {
          group_id: null,
          power: '',
          user_name: '',
          dept_id: ''
        },
        // 用户分页信息
        currentPage1: 1,
        total1: 0,
        pageSize1: 5,
        // 用户表格数据
        tableData1: [],
        // 角色列表，筛选条件
        filtersRole: {
          group_id: null,
          power: 'notHaving'
        },
        // 可选角色分页信息
        currentPageRole: 1,
        totalRole: 0,
        pageSizeRole: 5,
        // 可角色表格数据
        tableDataRole: [],
        // 角色列表，筛选条件
        filtersUser: {
          group_id: null,
          power: 'notHaving',
          user_name: '',
          dept_id: ''
        },
        // 可选用户分页信息
        currentPageUser: 1,
        totalUser: 0,
        pageSizeUser: 5,
        // 可用户表格数据
        tableDataUser: [],
        tagOptions:[{value:'0',label:'primary'},{value:'1',label:'success'},{value:'2',label:'info'},{value:'3',label:'danger'}],
        statusOptions:[{index:'3', value:'0',label:'停用'},{index:'0', value:'1',label:'启用'}],
        // 新增组角色对话框
        roleDialog: false,
        // 新增组用户对话框
        userDialog: false,
        // 选择部门对话框
        deptDialog: false,
        // 新增组对话框
        groupDialog: false,
        // 组对话框标题
        groupTitle: '组信息',
        // 角色对话框标题
        groupRoleTitle: '组角色信息',
        // 用户对话框标题
        groupUserTitle: '组用户信息',
        // 组信息表单
        groupForm:{
          create_dept_id: '',
          create_dept_name: '',
          created_time: '',
          creator_id: '',
          creator_name: '',
          id: '',
          last_modified_dept_id: '',
          last_modified_dept_name: '',
          last_modified_time: '',
          last_modifier_id: '',
          last_modifier_name: '',
          parent_id: '',
          name_cn: '',
          name_en: '',
          status: '1',
          types: '',
          sy_path: '',
          code: '',
          parent_code: '',
          valid_flag: '1',
        },
        // 组表单校验规则
        groupRules: {
          name_cn: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 100, message: '最多可输入100个字符'}
          ],
          name_en: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          status: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          types: [
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          sy_path: [
            {min: 0, max: 200, message: '最多可输入200个字符'}
          ]
        },
        // 可选角色列表多选的数据
        multipleSelection1: [],
        // 可选用户列表多选的数据
        multipleSelection2: [],
        // 可选角色列表多选的数据
        multipleSelectRole: [],
        // 可选用户列表多选的数据
        multipleSelectUser: []
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      // if (sessionStorage.getItem('groupSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('groupSession'))
      // }
      this.findTree();
      this.findTable();
      this.findTable1();
    },
    methods: {
      // 左侧树搜索，过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 查询菜单树
      findTree() {
        var param = {};
        this.$api.group.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.filters.group_id = ''
            this.filters1.group_id = ''
            this.filtersUser.group_id = ''
            this.filtersRole.group_id = ''
            this.groupForm = {}
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 查询部门树
      findDeptTree() {
        var param = {};
        this.$api.bmgl.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeDataDept = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 记录选中的树节点信息
      selectDept(data){
        this.selectTempData.dept_id = data.id
        this.selectTempData.dept_name = data.name
      },
      // 选择部门，提交
      selectDeptSubmit(){
        if(this.userDialog){
          this.filtersUser.dept_id = this.selectTempData.dept_id
          this.filtersUser.dept_name = this.selectTempData.dept_name
        }
        else {
          this.filters1.dept_id = this.selectTempData.dept_id
          this.filters1.dept_name = this.selectTempData.dept_name
        }
        this.deptDialog = false
        this.selectTempData = {}
      },
      // 查询角色列表
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.groupRole.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.filters1.menu_id = null
          this.multipleSelection1 = []
        })
      },
      // 查询用户列表
      findTable1() {
        var param = {
          pagenum: this.currentPage1,
          pagesize: this.pageSize1
        };
        var parms = {};
        Object.assign(parms, param, this.filters1)
        this.$api.groupUser.queryTable(parms).then((res) => {
          this.total1 = Number(res.body.default.count);
          this.tableData1 = res.body.default.dataset22;
          this.multipleSelection2 = []
        })
      },
      // 查询可选择的角色列表
      querySelectRole() {
        var param = {
          pagenum: this.currentPageRole,
          pagesize: this.pageSizeRole
        };
        var parms = {};
        Object.assign(parms, param, this.filters, this.filtersRole)
        this.$api.groupRole.querySelectRole(parms).then((res) => {
          this.totalRole = Number(res.body.default.count);
          this.tableDataRole = res.body.default.dataset;
          this.multipleSelectRole = []
        })
      },
      // 查询可选择的用户列表
      querySelectUser() {
        var param = {
          pagenum: this.currentPageUser,
          pagesize: this.pageSizeUser
        };
        var parms = {};
        Object.assign(parms, param, this.filters, this.filtersUser)
        this.$api.groupUser.querySelectUser(parms).then((res) => {
          this.totalUser = Number(res.body.default.count)
          this.tableDataUser = res.body.default.dataset22
          this.multipleSelectUser = []
        })
      },
      // 刷新菜单列表，菜单树单击事件触发
      refresh(data) {
        this.filters.group_id = data.id;
        this.filters1.group_id = data.id;
        this.filtersUser.group_id = data.id
        this.filtersRole.group_id = data.id
        this.findTable()
        this.findTable1()
      },
      // 改变角色列表分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      // 角色列表跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      // 改变用户列表分页大小
      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.findTable1();
      },
      // 用户列表跳转页数
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.findTable1();
      },
      // 改变可选角色列表分页大小
      handleSizeChangeRole(val) {
        this.pageSizeRole = val;
        this.querySelectRole();
      },
      // 可选角色列表跳转页数
      handleCurrentChangeRole(val) {
        this.currentPageRole = val;
        this.querySelectRole();
      },
      // 改变可选用户列表分页大小
      handleSizeChangeUser(val) {
        this.pageSizeUser = val
        this.querySelectUser()
      },
      // 可选用户列表跳转页数
      handleCurrentChangeUser(val) {
        this.currentPageUser = val;
        this.querySelectUser();
      },
      // 获取拼音缩写，组名称失焦事件
      getPysx(){
        let sx = vPinyin.chineseToPysx(this.groupForm.name_cn)
        if(sx === this.groupForm.name_en){
          return
        }
        else {
          this.groupForm.name_en = sx
        }
      },
      // 新增组
      addGroup(){
        this.groupTitle = '新增组信息'
        if (this.filters.group_id === null
        || this.filters.group_id === '') {
          this.$message({
            message: '请选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: '',
          parent_id: this.filters.group_id
        }
        this.$api.group.get(params).then((res) => {
          if (res.success == "true") {
            this.groupDialog = true
            this.groupForm.code = res.data.body.default.code
            this.groupForm.parent_code = res.data.body.default.parent_code
            this.groupForm.parent_id = this.filters.group_id
            this.groupForm.id = ''
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 修改组
      editGroup(){
        this.groupTitle = '修改组信息'
        if (this.filters.group_id === null
        || this.filters.group_id === '') {
          this.$message({
            message: '请选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.filters.group_id,
          parent_id: ''
        }
        this.$api.group.get(params).then((res) => {
          if (res.success == "true") {
            this.groupDialog = true
            this.groupForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除组
      delGroup(){
        if (this.filters.group_id === null
        || this.filters.group_id === '') {
          this.$message({
            message: '请选择要删除的组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些组信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: this.filters.group_id
          }
          this.$api.group.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTree()
              this.findTable()
              this.findTable1()
              this.singleSelection = null
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保存组，提交
      submitGroup(){
        this.$refs.groupForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.groupForm)
            if(this.groupForm.id === null
            || this.groupForm.id === ''){
              this.$api.group.save(params).then((res) => {
                if (res.success == "true") {
                  this.groupDialog = false
                  this.findTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.group.update(params).then((res) => {
                if (res.success == "true") {
                  this.groupDialog = false
                  this.findTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 新增组角色
      addGroupRole(){
        this.groupRoleTitle = '新增组角色信息'
        if (this.filtersRole.group_id === null
        || this.filtersRole.group_id === '') {
          this.$message({
            message: '请先选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.roleDialog = true;
        this.querySelectRole()
      },
      // 选择组角色
      selectData1(arr) {
        this.multipleSelection1 = arr;
      },
      // 选择可选组角色
      selectDataRole(arr){
        this.multipleSelectRole = arr;
      },
      // 保存组角色,提交
      addGroupRoleSubmit(){
        if (this.multipleSelectRole.length <= 0) {
          this.$message({
            message: '请先选择角色信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定向该组新增这些角色信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.multipleSelectRole.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.multipleSelectRole[i].id)
          }
          let params = {
            ids: delarr.join(","),
            group_id: this.filtersRole.group_id,
            saveordel: 'add'
          };
          this.$api.groupRole.saveordel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.roleDialog = false
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 删除组角色
      delRole(row){
        this.$confirm('是否确定删除该组角色信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            ids: row.id,
            group_id: this.filtersRole.group_id,
            saveordel: 'del'
          }
          this.$api.groupRole.saveOrDel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 批量删除组角色
      delBatchRole(){
        if (this.filtersRole.group_id === null
        || this.filtersRole.group_id === '') {
          this.$message({
            message: '请先选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        if (this.multipleSelection1.length <= 0) {
          this.$message({
            message: '请先选择要删除的角色信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定删除该组的这些角色信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.multipleSelection1.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.multipleSelection1[i].id)
          }
          let params = {
            ids: delarr.join(","),
            group_id: this.filtersRole.group_id,
            saveordel: 'del'
          };
          this.$api.groupRole.saveOrDel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 新增组用户
      addGroupUser(){
        this.groupUserTitle = '新增组用户信息'
        if (this.filtersUser.group_id === null
        || this.filtersUser.group_id === '') {
          this.$message({
            message: '请先选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.userDialog = true;
        this.querySelectUser()
      },
      // 选择组用户
      selectData2(arr) {
        this.multipleSelection2 = arr;
      },
      // 选择可选组用户
      selectDataUser(arr){
        this.multipleSelectUser = arr;
      },
      // 保存组用户,提交
      addGroupUserSubmit(){
        if (this.multipleSelectUser.length <= 0) {
          this.$message({
            message: '请先选择要新增的用户信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定向该组新增这些用户信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.multipleSelectUser.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.multipleSelectUser[i].id)
          }
          let params = {
            ids: delarr.join(","),
            group_id: this.filtersUser.group_id,
            saveordel: 'add'
          };
          this.$api.groupUser.saveOrDel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.userDialog = false
              this.findTable1()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 批量删除组用户
      delUser(row){
        this.$confirm('是否确定删除该组用户信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            ids: row.id,
            group_id: this.filtersUser.group_id,
            saveordel: 'del'
          }
          this.$api.groupUser.saveOrDel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable1()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 批量删除组用户
      delBatchUser(){
        if (this.filtersRole.group_id === null
        || this.filtersRole.group_id === '') {
          this.$message({
            message: '请先选择组',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        if (this.multipleSelection2.length <= 0) {
          this.$message({
            message: '请先选择用户信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定删除该组的这些用户信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.multipleSelection2.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.multipleSelection2[i].id)
          }
          let params = {
            ids: delarr.join(","),
            group_id: this.filtersUser.group_id,
            saveordel: 'del'
          };
          this.$api.groupUser.saveOrDel(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable1()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      reset() {
        this.filters1.user_name = ''
        this.filters1.dept_id = ''
        this.filters1.dept_name = ''
        this.selectTempData = {}
      },
      resetFiltersUser() {
        this.filtersUser.user_name = ''
        this.filtersUser.dept_id = ''
        this.filtersUser.dept_name = ''
        this.selectTempData = {}
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('groupSession')
        sessionStorage.setItem('groupSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
