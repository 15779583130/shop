/**
 * @author 董珊珊
 * @create date: 2019/12/30
 * @version:
 * @modify	 	2019/12/30	董珊珊		无		新建，代码表管理页面
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

  .codetype_tree {
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
              码表类型
            </div>
            <div class="text item">
              <div class="codetype_tree">
                <el-form :inline="true" class="demo-form-inline">
                  <el-row >
                    <el-col :span="24" class="table_btn" style="margin-bottom: 10px;">
                     <el-button type="primary" icon="el-icon-circle-plus" v-access id="dmbglAddtheme" size="mini" @click="addCodeType">新增</el-button>
                     <el-button type="primary" icon="el-icon-edit" size="mini" v-access id="dmbglSavetheme" @click="editCodeType">修改</el-button>
                     <el-button type="primary" icon="el-icon-delete" size="mini" v-access id="dmbglDeltheme" @click="delCodeType">删除</el-button>
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
          <!-- 码表类型列表 -->
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    码表类型列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" v-access id="dmbglSave" size="mini" @click="addCodeInfo">新增</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row size="mini">
                      <el-table-column label="序号" align="center" width="50px">
                        <template slot-scope="scope">
                          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="代码类型" prop="type_code" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="代码描述" prop="code_desc" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="代码值" prop="code_value" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="排序状态" prop="code_order" :show-overflow-tooltip="true" align="center"></el-table-column>
                      <el-table-column label="编辑模式" prop="edit_type" :show-overflow-tooltip="true" align="center" width="150px">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in edittypeOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.edit_type === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="启用状态" prop="status" :show-overflow-tooltip="true" align="center" width="150px">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in statusOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.status === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true" width="200px"></el-table-column>
                      <el-table-column label="操作" align="center" width="120px">
                        <template slot-scope="scope" align="center">
                          <i @click="editCodeInfo(scope.row)" class="el-icon-edit"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" v-access id="dmbglEdit" title="修改"></i>
                          <i @click="delCodeInfo(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" v-access id="dmbglDel" title="删除"></i>
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
    </el-row>

    <!-- 新增、编辑代码类型 -->
    <el-dialog
      :title="codeTypeTitle"
      :visible.sync="codeTypeDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-form ref="codeTypeForm" :model="codeTypeForm" label-width="100px"
      size="mini" :rules="codeTypeRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="类型编码" prop="type_code">
              <el-input v-model="codeTypeForm.type_code" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="类型名称" prop="type_name">
              <el-input v-model="codeTypeForm.type_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="父节点名称" prop="type_name2">
              <el-input v-model="codeTypeForm.type_name2" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="codeTypeForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="codeTypeDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitCodeType()" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增代码-->
    <el-dialog
      :title="codeInfoTitle"
      :visible.sync="codeInfoDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="codeInfoForm" :model="codeInfoForm" label-width="80px"
      size="mini" :rules="codeInfoRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="代码类型" prop="type_code">
              <el-input v-model="codeInfoForm.type_code" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="代码描述" prop="code_desc">
              <el-input v-model="codeInfoForm.code_desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="代码值"prop="code_value">
              <el-input v-model="codeInfoForm.code_value" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排列顺序" prop="code_order">
              <el-input-number v-model="codeInfoForm.code_order" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="编辑模式"prop="edit_type">
              <el-select v-model="codeInfoForm.edit_type" placeholder="请选择编辑模式">
                <el-option v-for="item in edittypeOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="启用状态"prop="status">
              <el-select v-model="codeInfoForm.status" placeholder="请选择启用状态">
                <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="备注"prop="remark">
              <el-input v-model="codeInfoForm.remark" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="codeInfoDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitCodeInfo()" size="mini">提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "code",
    components: {},
    data() {
      return {
        // 代码类型结构
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        // 代码列表，筛选条件
        filters: {
          codetypeid: ''
        },
        // 角色分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        // 角色表格数据
        tableData: [],
        tagOptions:[{value:'0',label:'primary'},{value:'1',label:'success'},{value:'2',label:'info'},{value:'3',label:'danger'}],
        statusOptions:[{index:'3', value:'0',label:'停用'},{index:'0', value:'1',label:'启用'}],
        edittypeOptions:[{index:'3', value:'0',label:'只读'},{index:'0', value:'1',label:'可编辑'}],
        // 代码类型对话框标题
        codeTypeTitle: '代码类型信息',
        // 新增代码类型对话框标题
        codeTypeDialog: false,
        // 代码信息对话框标题
        codeInfoTitle: '代码信息',
        // 新增代码对话框
        codeInfoDialog: false,
        // 代码类型信息表单
        codeTypeForm:{ },
        // 代码类型表单校验规则
        codeTypeRules: {
          type_code: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          type_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '最多可输入200个字符'}
          ],
          parent_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '最多可输入200个字符'}
          ],
          remark: [
            {min: 0, max: 200, message: '最多可输入200个字符'}
          ]
        },
        // 代码类型信息表单
        codeInfoForm:{},
        // 代码类型表单校验规则
        codeInfoRules: {
          type_code: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          code_desc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          code_value: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 125, message: '最多可输入125个字符'}
          ],
          code_order: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ],
          edit_type: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          remark: [
            {min: 0, max: 125, message: '最多可输入125个字符'}
          ]
        }
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
    },
    methods: {
      // 初始化代码类型表单
      initCodeTypeForm(){
        this.codeTypeForm = {
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
          remark: '',
          type_code: '',
          type_name: '',
          type_name2: '',
          valid_flag: '1'
        };
      },
      // 初始化代码表单
      initCodeInfoForm(){
        this.codeInfoForm = {
          code_desc:'',
          code_order: '1',
          code_value:'',
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          edit_type:'',
          id:'',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          remark:'',
          status: '1',
          type_code: 'child1',
          valid_flag:''
        };
      },
      // 左侧树搜索，过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 查询菜单树
      findTree() {
        var param = {};
        this.$api.codeType.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.filters.codetypeid = ''
            this.codeTypeForm = {}
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 查询代码列表
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.codeInfo.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      // 刷新菜单列表，菜单树单击事件触发
      refresh(data) {
        this.filters.codetypeid = data.id;
        this.findTable()
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
      // 新增代码类型
      addCodeType(){
        this.codeTypeTitle = '新增代码类型'
        if (this.filters.codetypeid === null
        || this.filters.codetypeid === '') {
          this.initCodeTypeForm()
          this.codeTypeDialog = true
        }
        else {
          let params = {
            id: this.filters.codetypeid
          }
          this.$api.codeType.get(params).then((res) => {
            if (res.success == "true") {
              this.initCodeTypeForm()
              this.codeTypeDialog = true
              this.codeTypeForm.type_name2 = res.data.body.default.type_name
              this.codeTypeForm.parent_id = res.data.body.default.id
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      },
      // 修改代码类型
      editCodeType(){
        this.codeTypeTitle = '修改代码类型'
        if (this.filters.codetypeid === null
        || this.filters.codetypeid === '') {
          this.$message({
            message: '请选择代码类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.filters.codetypeid
        }
        this.$api.codeType.get(params).then((res) => {
          if (res.success == "true") {
            this.codeTypeDialog = true
            this.codeTypeForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除代码类型
      delCodeType(){
        if (this.filters.codetypeid === null
        || this.filters.codetypeid === '') {
          this.$message({
            message: '请选择要删除的代码类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定删除该代码类型？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: this.filters.codetypeid
          }
          this.$api.codeType.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTree()
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保存组，提交
      submitCodeType(){
        this.$refs.codeTypeForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.codeTypeForm)
            if(this.codeTypeForm.id === null
            || this.codeTypeForm.id === ''){
              this.$api.codeType.save(params).then((res) => {
                if (res.success == "true") {
                  this.codeTypeDialog = false
                  this.findTree()
                  this.findTable()
                  this.initCodeTypeForm()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.codeType.update(params).then((res) => {
                if (res.success == "true") {
                  this.codeTypeDialog = false
                  this.findTree()
                  this.findTable()
                  this.initCodeTypeForm()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 新增代码
      addCodeInfo(){
        this.codeInfoTitle = '新增代码信息'
        if (this.filters.codetypeid === null
        || this.filters.codetypeid === '') {
          this.$message({
            message: '请先选择代码类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }

        let params = {
          codetypeid: this.filters.codetypeid
        }
        this.$api.codeInfo.get(params).then((res) => {
          if (res.success == "true") {
            this.initCodeInfoForm()
            this.codeInfoDialog = true
            this.codeInfoForm.type_code = res.data.body.default.type_code
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 修改代码
      editCodeInfo(row){
        this.codeInfoTitle = '修改代码信息'
        if (row.id === null
        || row.id  === '') {
          this.$message({
            message: '请选择代码',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: row.id
        }
        this.$api.codeInfo.get(params).then((res) => {
          if (res.success == "true") {
            this.codeInfoDialog = true
            this.codeInfoForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除代码
      delCodeInfo(row){
        this.$confirm('是否确定删除该代码信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }
          this.$api.codeInfo.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保存代码,提交
      submitCodeInfo(){
        this.$refs.codeInfoForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.codeInfoForm)
            if(this.codeInfoForm.id === null
            || this.codeInfoForm.id === ''){
              this.$api.codeInfo.save(params).then((res) => {
                if (res.success == "true") {
                  this.codeInfoDialog = false
                  this.findTable()
                  this.initCodeInfoForm()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.codeInfo.update(params).then((res) => {
                if (res.success == "true") {
                  this.codeInfoDialog = false
                  this.findTable()
                  this.initCodeInfoForm()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('codeSession')
        sessionStorage.setItem('codeSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
