/**
 * @author 董珊珊
 * @create date: 2019/12/25
 * @version:
 * @modify	 	2019/12/25	董珊珊		无		新建，菜单管理页面
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

  .menu_tree {
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
  <div class="menu">
    <el-row :gutter="10">
      <!-- 菜单树 -->
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              系统菜单
            </div>
            <div class="text item">
              <div class="menu_tree">
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

      <!-- 菜单列表 -->
      <el-col :span="14" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    菜单列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-plus" v-access id="cdglAdd" size="mini" @click="addMenu()">新增</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%;"
                              highlight-current-row size="mini"
                              @row-click="refresh1"
                              @row-dblclick="editMenu">
                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="拼音缩写" prop="menu_pysx" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="菜单名称" prop="menu_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="请求路径" prop="menu_url" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="排序号" prop="menu_order" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="菜单图标" prop="menu_image" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="打开方式" prop="menu_target" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in targetOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.menu_target === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="上级菜单" prop="menu_parent_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="展开状态" prop="menu_status" width="140px" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in statusOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.menu_status === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" align="center" label="操作" >
                        <template slot-scope="scope">
                          <i @click="editMenu(scope.row)" class="el-icon-edit"
                          style="font-size: 20px;cursor: pointer;color:#0066CC;" v-access id="cdglEdit" title="编辑"></i>
                          <i @click="delMenu(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" v-access id="cdglDel" title="删除"></i>
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
        </div>
      </el-col>

      <!-- 功能列表 -->
      <el-col :span="6" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    功能管理
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" v-access id="cdglSaveFunc" size="mini" @click="addFunc()">新增</el-button>
                  <el-button type="primary" icon="el-icon-edit" v-access id="cdglEditFunc" size="mini" @click="editFunc()">修改</el-button>
                  <el-button type="primary" icon="el-icon-delete" v-access id="cdglDelFunc" size="mini" @click="delFunc()">删除</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData1" :header-cell-style="{background:'#e6e6e6'}" :cell-style="{padding:'1px'}"
                              border style="width: 100%" highlight-current-row size="mini"
                              @current-change="singleSelect"
                              @row-dblclick="dbclickFunc">
                      <!-- <el-table-column type="selection"></el-table-column> -->
                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{(currentPage1 - 1) * pageSize1 + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="中文名称" prop="name_cn" :show-overflow-tooltip="true" width="120"></el-table-column>
                      <el-table-column label="英文名称" prop="name_en" :show-overflow-tooltip="true" width="120"></el-table-column>
                      <el-table-column label="菜单权限配置" prop="menu_id" :show-overflow-tooltip="true" width="350" >
                        <template slot-scope="scope">{{scope.row.menu_id + ':' + scope.row.name_en}} </template>
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

    <!-- 新增、编辑菜单 -->
    <el-dialog
      :title="menuTitle"
      :visible.sync="menuDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="menuForm" :model="menuForm" label-width="80px"
      size="mini" :rules="menuRules">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="菜单编号" prop="menu_code" >
              <el-input v-model="menuForm.menu_code" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="菜单名称" prop="menu_name">
              <el-input v-model="menuForm.menu_name"
              @blur="getPysx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="拼音缩写" prop="menu_pysx">
              <el-input v-model="menuForm.menu_pysx" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="上级菜单" prop="menu_parent_name">
              <el-input v-model="menuForm.menu_parent_name"
              @focus="pidDialog = true" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="路径模式" prop="contextrelative">
              <el-select v-model="menuForm.contextrelative" placeholder="请选择路径模式" width="100%" >
                <el-option v-for="item in pathOptions" :key="item.value" :value="item.value" :label="item.label" width="100%" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="请求路径" prop="menu_url">
              <el-input v-model="menuForm.menu_url" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="节点初始" prop="menu_status">
              <el-select v-model="menuForm.menu_status" placeholder="请选择节点初始">
                <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11"  :offset="1">
            <el-form-item label="菜单图标" prop="menu_image">
              <el-input v-model="menuForm.menu_image" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="排序号" prop="menu_order">
              <el-input-number v-model="menuForm.menu_order" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="打开方式" prop="menu_target">
              <el-select v-model="menuForm.menu_target" placeholder="请选择打开方式">
                <el-option v-for="item in targetOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="是否可视" prop="menu_visible">
              <el-radio-group v-model="menuForm.menu_visible" size="medium">
                <el-radio-button label="1" >是</el-radio-button>
                <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="menuForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitMenu()" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增、编辑功能 -->
    <el-dialog
      :title="funcTitle"
      :visible.sync="funcDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-form ref="funcForm" :model="funcForm" label-width="80px"
      size="mini" :rules="funcRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="中文名称" prop="name_cn">
              <el-input v-model="funcForm.name_cn" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="英文名称"prop="name_en">
              <el-input v-model="funcForm.name_en" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="状态"prop="status">
              <el-select v-model="funcForm.status" placeholder="请选择状态">
                <el-option v-for="item in funcstatusOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排序" prop="func_order">
              <el-input-number v-model="funcForm.func_order" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="funcForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="funcDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitFunc()" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 选择菜单列表 -->
    <el-dialog
      title="选择菜单列表"
      :visible.sync="pidDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-card class="box-card">
        <div
          style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
          <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
          菜单树
        </div>
        <div class="text item">
          <div class="pid_menu_tree">
            <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
            <el-tree
              class="filter-tree"
              node-key="id"
              :data="treeData"
              :props="treeProps"
              default-expand-all
              @node-click="selectPid"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree">
            </el-tree>
          </div>
        </div>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="pidDialog = false" size="mini">关闭</el-button>
        <el-button @click="clearPid()" size="mini">清空</el-button>
        <el-button type="primary" @click="selectPidSubmit()" size="mini">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'
  import {vPinyin} from '@/utils/py/vue-py';

  export default {
    name: "menuManage",
    components: {},
    data() {
      return {
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        // 菜单列表，筛选条件
        filters: {
          menu_code: '',
          menu_parent_code: ''
        },
        // 菜单列表，分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        // 菜单表格数据
        tableData: [],
        // 功能列表，筛选条件
        filters1: {
          menu_id: null
        },
        // 功能列表，分页信息
        currentPage1: 1,
        total1: 0,
        pageSize1: 10,
        // 功能表格数据
        tableData1: [],
        filtersTemp: {
          menu_name: ''
        },
        tagOptions:[{value:'0',label:'primary'},{value:'1',label:'success'},{value:'2',label:'info'},{value:'3',label:'danger'}],
        targetOptions:[{index:'0',value:'0',label:'iframe'},{index:'3',value:'1',label:'window'},{index:'3',value:'2',label:'div'}],
        statusOptions:[{index:'0',value:'open',label:'展开'},{index:'3',value:'closed',label:'收缩'}],
        pathOptions:[{value:'0',label:'相对'},{value:'1',label:'绝对'}],
        funcstatusOptions:[{value:'0',label:'停用'},{value:'1',label:'启用'}],
        // 菜单信息对话框
        menuDialog: false,
		// 菜单信息对话框标题
		menuTitle: '菜单信息',
        // 菜单信息表单
        menuForm:{
          contextrelative: '0',
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
          menu_code: '999',
          menu_image: '默认图标',
          menu_name: '',
          menu_onclick: '',
          menu_order: '1',
          menu_parent_code: '',
          menu_parent_name: '',
          menu_pysx: '',
          menu_status: 'open',
          menu_target: 'iframe',
          menu_tooltip: '',
          menu_url: '',
          menu_visible: '1',
          remark: '',
          valid_flag: '1',
        },
        // 菜单表单校验规则
        menuRules: {
          menu_code: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          menu_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 100, message: '最多可输入100个字符'}
          ],
          menu_pysx: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          contextrelative: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          menu_status: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          menu_image: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 128, message: '最多可输入128个字符'}
          ],
          menu_order: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ],
          menu_target: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          menu_visible: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          remark: [
            {min: 0, max: 1000, message: '最多可输入1000个字符'}
          ]
        },
        // 功能信息对话框
        funcDialog: false,
		// 功能信息对话框标题
		funcTitle: '菜单信息',
        // 功能信息表单
        funcForm:{
          create_dept_id: '',
          create_dept_name: '',
          created_time: '',
          creator_id: '',
          creator_name: '',
          func_order: '1',
          id: '',
          last_modified_dept_id: '',
          last_modified_dept_name: '',
          last_modified_time: '',
          last_modifier_id: '',
          last_modifier_name: '',
          menu_id: '',
          name_cn: '',
          name_en: '',
          remark: '',
          status: '1',
          valid_flag: '1',
        },
        // 功能表单校验规则
        funcRules: {
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
          func_order: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ],
          remark: [
            {min: 0, max: 100, message: '最多可输入100个字符'}
          ]
        },
        // 选择父级菜单
        pidDialog: false,
        // 菜单信息上级菜单选中信息
        selectData:{
          menu_parent_code: '',
          menu_parent_name: ''
        },
        // 功能列表单选的数据
        singleSelection:null
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created() {
      // if (sessionStorage.getItem('menuSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('menuSession'))
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
        this.$api.menu.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 查询菜单列表
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.menu.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.menuscount);
          this.tableData = res.body.default.menus;
          this.filters1.menu_id = null
          this.findTable1()
        })
      },
      // 查询功能列表
      findTable1() {
        var param = {
          pagenum: this.currentPage1,
          pagesize: this.pageSize1
        };
        var parms = {};
        Object.assign(parms, param, this.filters1)
        this.$api.func.queryTable(parms).then((res) => {
          this.total1 = Number(res.body.default.funcscount);
          this.tableData1 = res.body.default.funcs;
        })
      },
      // 记录选中的树节点信息
      selectPid(data){
        this.selectData.menu_parent_code = data.id
        this.selectData.menu_parent_name = data.name
      },
      // 刷新菜单列表，菜单树单击事件触发
      refresh(data) {
        this.filters.menu_code = data.id
        this.filters.menu_parent_code = data.pid
        this.filtersTemp.menu_name = data.name
        this.findTable()
      },
      // 刷新功能列表，菜单列表单击事件触发
      refresh1(data) {
        this.filters1.menu_id = data.id
        this.findTable1()
      },
      // 改变菜单列表分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      // 菜单列表跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      // 改变功能列表分页大小
      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.findTable1();
      },
      // 功能列表跳转页数
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.findTable1();
      },
      // 选择上级菜单，提交
      selectPidSubmit(){
        this.menuForm.menu_parent_code = this.selectData.menu_parent_code
        this.menuForm.menu_parent_name = this.selectData.menu_parent_name
        this.pidDialog = false
      },
      // 选择上级菜单，清空
      clearPid(){
        this.menuForm.menu_parent_code = ''
        this.menuForm.menu_parent_name = ''
        this.pidDialog = false
      },
      // 获取拼音缩写，菜单名称失焦事件
      getPysx(){
        let sx = vPinyin.chineseToPysx(this.menuForm.menu_name)
        if(sx === this.menuForm.menu_pysx){
          return
        }
        else {
          this.menuForm.menu_pysx = sx
        }
      },
      // 新增菜单
      addMenu() {
		this.menuTitle = '新增菜单信息'
        let params = {
          id: '',
          menu_code: this.filters.menu_code,
          menu_name: this.filtersTemp.menu_name
        }
        this.$api.menu.get(params).then((res) => {
          if (res.success == "true") {
            this.menuDialog = true
            this.menuForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑菜单
      editMenu(row) {
		this.menuTitle = '修改菜单信息'
        let params = {
          id: row.id,
          menu_code: row.menu_code,
          menu_name: row.menu_name
        }
        this.$api.menu.get(params).then((res) => {
          if (res.success == "true") {
            this.menuDialog = true
            this.menuForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除菜单
      delMenu(row) {
        this.$confirm('确定删除该菜单及其子菜单？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          };
          this.$api.menu.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTree()
            this.findTable();
          })
        })
      },
      // 保存菜单，提交
      submitMenu(){
        this.$refs.menuForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.menuForm)
            if(this.menuForm.id === ''){
              this.$api.menu.save(params).then((res) => {
                if (res.success == "true") {
                  this.menuDialog = false
                  this.menuForm = {}
                  this.findTree()
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.menu.update(params).then((res) => {
                if (res.success == "true") {
                  this.menuDialog = false
                  this.menuForm = {}
                  this.findTree()
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 新增功能
      addFunc(){
		this.funcTitle = '新增功能信息'
        if (this.filters1.menu_id === null
        || this.filters1.menu_id === '') {
          this.$message({
            message: '请先选择菜单',
            showClose: true,
            type: 'warning',
          });
          return false;
        }

        let params = {
          id: '',
          menu_id: this.filters1.menu_id
        }
        this.$api.func.get(params).then((res) => {
          if (res.success == "true") {
            this.funcDialog = true
            this.funcForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑功能
      editFunc() {
		this.funcTitle = '新增功能信息'
        if (this.singleSelection === null) {
          this.$message({
            message: '请先选择要修改的功能信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.singleSelection.id,
          menu_id: this.filters1.menu_id
        }
        this.$api.func.get(params).then((res) => {
          if (res.success == "true") {
            this.funcDialog = true
            this.funcForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑功能，双击功能列表事件
      dbclickFunc(row) {
        let params = {
          id: row.id,
          menu_id: this.filters1.menu_id
        }
        this.$api.func.get(params).then((res) => {
          if (res.success == "true") {
            this.funcDialog = true
            this.funcForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除功能
      delFunc() {
        if (this.singleSelection === null ) {
          this.$message({
            message: '请先选择要删除的功能信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些功能信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: this.singleSelection.id
          }
          this.$api.func.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable1()
              this.singleSelection = null
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保存功能，提交
      submitFunc(){
        this.$refs.funcForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.funcForm)
            if(this.funcForm.id === ''){
              this.$api.func.save(params).then((res) => {
                if (res.success == "true") {
                  this.funcDialog = false
                  this.findTable1()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.func.update(params).then((res) => {
                if (res.success == "true") {
                  this.funcDialog = false
                  this.findTable1()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 功能列表单选事件
      singleSelect(val){
        this.singleSelection = val
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('menuSession')
        sessionStorage.setItem('menuSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
