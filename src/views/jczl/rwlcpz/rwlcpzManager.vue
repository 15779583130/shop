/**
 * @author 董珊珊
 * @create date: 2019/01/03
 * @version:
 * @modify	 	2019/01/03	董珊珊		无		新建，任务流程配置管理页面
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

  .flow_tree {
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
      <!-- 流程节点树树 -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              流程节点树
            </div>
            <div class="text item">
              <div class="flow_tree">
                <el-form :inline="true" class="demo-form-inline">
                  <el-row >
                    <el-col :span="24" class="table_btn">
                      <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addFlowNode()">新增节点</el-button>
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
          <!-- 节点配置列表 -->
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    节点列表
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
                        <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini" label-width="120px">
                          <el-row class="form-line">
                            <el-col :span="18" style="display: flex;">
                              <el-form-item label="流程节点名称">
                                <el-input v-model="filters.lcmc" placeholder="请输入流程节点名称" size="mini" style="width:200px;"
                                  @keyup.enter.native="findNode()"></el-input>
                              </el-form-item>
                              <el-form-item label="流程节点编码">
                                <el-input v-model="filters.jdbm" placeholder="请输入流程节点编码" size="mini" style="width:200px;"
                                 @keyup.enter.native="findNode()"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6" style="text-align: right;">
                              <el-form-item class="id-button">
                                <el-button type="primary" icon="el-icon-search" @click="findNode()" size="mini">查询</el-button>
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
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData4Node" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row size="mini">
                      <el-table-column type="selection" align="center" width="50"></el-table-column>
                      <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                          <span>{{(currentPage4Node - 1) * pageSize4Node + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="流程节点名称" prop="jdmc" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="流程节点编码" prop="lcbm" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="节点顺序" prop="jdsx" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="流程说明" prop="lcsm" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="父级节点" prop="parentname" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="级层" prop="jc" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="图标编号" prop="tbh" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="备注" prop="bz" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                          <i @click="editFlowNode(scope.row)" class="el-icon-edit"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="修改"></i>
                          <i @click="delFlowNode(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="删除"></i>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange4Node"
                          @current-change="handleCurrentChange4Node"
                          :current-page="currentPage4Node"
                          :page-sizes="[5, 10, 20, 50]"
                          :page-size="pageSize4Node"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total4Node">
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

    <!-- 新增流程节点-->
    <el-dialog
      :title="flowNodeTitle"
      :visible.sync="flowNodeDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="flowNodeForm" :model="flowNodeForm" label-width="130px"
      size="mini" :rules="flowNodeRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="上级流程节点" prop="parentname">
              <el-input placeholder="请选择上级流程节点"
              :readonly="true" @focus="pidDialog = true"
              v-model="flowNodeForm.parentname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="层级" prop="jc">
              <el-input v-model="flowNodeForm.jc"
               ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="流程节点名称" prop="jdmc">
              <el-input placeholder="请输入流程节点名称" v-model="flowNodeForm.jdmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="流程节点编码" prop="lcbm">
              <el-input placeholder="请输入流程节点编码(限制数字、英文、下划线)" v-model="flowNodeForm.lcbm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="节点顺序" prop="jdsx">
              <el-input placeholder="请输入节点顺序（限制数字）第3级层必填" v-model="flowNodeForm.jdsx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="流程说明" prop="lcsm">
              <el-input placeholder="请输入流程说明" v-model="flowNodeForm.lcsm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排列" prop="px">
              <el-input-number placeholder="请输入排序号（限制数字）从左边树选择节点将自动填充" v-model="flowNodeForm.px"
              controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="图标编号" prop="tbh">
              <el-input placeholder="请输入图标编号" v-model="flowNodeForm.tbh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="备注" prop="bz">
               <el-input type="textarea"
               :autosize="{ minRows: 2, maxRows: 4}"
               v-model="flowNodeForm.bz" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flowNodeDialog = false;" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitFlowNode();" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 选择流程节点 -->
    <el-dialog
      title="选择流程节点"
      :visible.sync="pidDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            流程节点
          </div>
          <div class="text item">
            <div class="flow_tree">
              <el-input placeholder="请输入过滤条件" v-model="filterText4Pid" size="mini"></el-input>
              <el-tree
                ref="dept_tree"
                class="filter-tree"
                node-key="id"
                :data="treeData"
                :props="treeProps"
                @node-click="selectPid"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode">
              </el-tree>
            </div>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pidDialog = false" size="mini">关闭</el-button>
        <el-button @click="pidDialog = false;resetSelectPid()" size="mini">清空</el-button>
        <el-button type="primary" @click="submitSelectPid()" size="mini">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'
	import '@/utils/validate'

  export default {
    name: "flow",
    components: {},
    data() {
      return {
        // 筛选条件
        filters: {
          id:'',
          lcbm: '',
          jdmc: '',
          lcmc: '',
          jdbm: ''
        },
        // 业务、流程树结构
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        // 选择部门群对话框
        pidDialog: false,
        // 部门树
        filterText4Pid: '',
        // 选择流程节点树数据
        selectDataPid: {},

        // 节点分页信息
        currentPage4Node: 1,
        total4Node: 0,
        pageSize4Node: 5,
        // 节点表格数据
        tableData4Node: [],

        // 流程节点对话框标题
        flowNodeTitle: '流程节点信息',
        // 流程节点对话框
        flowNodeDialog: false,
        // 流程节点信息表单
        flowNodeForm: {},
        // 流程节点表单校验规则
        flowNodeRules: {
          parentname: [
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          jc: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          jdmc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          lcbm: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 10, message: '最多可输入10个字符'},
            {pattern: /^[_a-zA-Z0-9]+$/,  message: '请输入数字、英文、下划线', trigger: 'blur'}
          ],
          jdsx: [
            // {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 2, message: '最多可输入2个字符'},
            {pattern: /^[0-9]+$/,  message: '请输入数字', trigger: 'blur'}
          ],
          lcsm: [
            {min: 0, max: 25, message: '最多可输入25个字符'}
          ],
          px: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ],
          tbh: [
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          bz: [
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ]
        }

      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      filterText4Pid(val) {
        this.$refs.dept_tree.filter(val)
      }
    },
    mounted() {
      // if (sessionStorage.getItem('rwlcpzSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('rwlcpzSession'))
      // }
      this.findTree();
      this.findNode();
    },
    methods: {
      // 初始化流程节点表单
      initFlowNode(){
        this.flowNodeForm = {
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          id: '',
          jc: '1',
          jdmc:'',
          jdsx: '',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          lcbm:'',
          parentname:'',
          px: '1',
          tbh:'',
          valid_flag: '1'
        }
      },
      // 树搜索，过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 查询流程树
      findTree() {
        this.$api.rwlcpz.queryTree({}).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.resetFilter()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 重置树节点
      resetFilter() {
        this.filters.id = ''
        this.filters.lcbm = ''
        this.filters.jdmc = ''
        this.filters.lcmc = ''
        this.filters.jcbm = ''
      },
      // 刷新流程节点列表，流程节点树单击事件触发
      refresh(data) {
        this.filters.id = data.id
        this.filters.name = data.name
        this.filters.jc = data.jc
        this.currentPage4Node = 1
        this.total4Node = 0
        this.tableData4Node = []
        this.findNode()
      },
      // 清楚部门群
      selectPid(data){
        this.selectDataPid.parentname = data.name
        this.selectDataPid.pid = data.id
        this.selectDataPid.jc = data.jc
      },
      // 清楚部门群
      resetSelectPid(){
        let params = {
          jc: '1'
        }
        this.$api.rwlcpz.getMaxOrder(params).then((res) => {
          if (res.success == "true") {
            this.selectDataPid.parentname = ''
            this.selectDataPid.pid = ''
            this.selectDataPid.jc = ''
            this.flowNodeForm.parentname = ''
            this.flowNodeForm.pid = ''
            this.flowNodeForm.jc = '1'
            this.flowNodeForm.px = res.data.body.default.maxorder
            this.flowNodeDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 选择部门，提交
      submitSelectPid(){
        let params = {
          jc: this.selectDataPid.jc
        }
        this.$api.rwlcpz.getMaxOrder(params).then((res) => {debugger
          if (res.success == "true") {
            this.flowNodeForm.parentname = this.selectDataPid.parentname
            this.flowNodeForm.pid = this.selectDataPid.pid
            this.flowNodeForm.jc = String(Number(this.selectDataPid.jc) + 1)
            this.flowNodeForm.px = res.data.body.default.maxorder
            this.selectDataPid.parentname = ''
            this.selectDataPid.pid = ''
            this.selectDataPid.jc = ''
            this.pidDialog = false
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })

      },

      // 查询流程节点列表
      findNode() {
        var param = {
          pagenum: this.currentPage4Node,
          pagesize: this.pageSize4Node
        }
        this.filters.jdmc = this.filters.lcmc
        this.filters.lcbm = this.filters.jdbm
        var parms = {}
        Object.assign(parms, param, this.filters)
        if(this.filters.id === ''){
          this.$api.rwlcpz.queryByBean(parms).then((res) => {
            this.total4Node = Number(res.body.default.count)
            this.tableData4Node = res.body.default.dataset
          })
        }
        else {
          this.$api.rwlcpz.query(parms).then((res) => {
            this.total4Node = Number(res.body.default.count)
            this.tableData4Node = res.body.default.dataset
          })
        }
      },
      // 重置查询
      reset() {
        this.filters.lcmc = ''
        this.filters.jdbm = ''
      },
      // 改变流程节点列表分页大小
      handleSizeChange4Node(val) {
        this.pageSize4Node = val;
        this.findNode();
      },
      // 流程节点列表跳转页数
      handleCurrentChange4Node(val) {
        this.currentPage4Node = val;
        this.findNode();
      },

      // 新增流程节点
      addFlowNode(){
        this.flowNodeTitle = '新增流程节点'
        let params = { }
        if(this.filters.id === null || this.filters.id == ''){
          params.jc = '1'
        }
        else {
           params.id = this.filters.id
        }
        this.$api.rwlcpz.getMaxOrder(params).then((res) => {
          if (res.success == "true") {
            this.initFlowNode()
            if(this.filters.id === null || this.filters.id == ''){
              this.flowNodeForm.jc  = '1'
            }
            else {
              if(Number(this.filters.jc) >= 2){
                this.flowNodeRules.jdsx =   [
                  {required: true, message: '这是必填字段', trigger: 'blur'},
                  {min: 0, max: 2, message: '最多可输入2个字符'},
                  {pattern: /^[0-9]+$/,  message: '请输入数字', trigger: 'blur'}
                ]
              }
              else {
                this.flowNodeRules.jdsx =   [
                  {min: 0, max: 2, message: '最多可输入2个字符'},
                  {pattern: /^[0-9]+$/,  message: '请输入数字', trigger: 'blur'}
                ]
              }
              this.flowNodeForm.jc  = String(Number(this.filters.jc) + 1)
            }

            this.flowNodeForm.parentname = this.filters.name
            this.flowNodeForm.pid = this.filters.id
            this.flowNodeForm.px = res.data.body.default.maxorder
            this.flowNodeDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑流程节点
      editFlowNode(row){
        let params = {
          id: row.id
        }
        this.$api.rwlcpz.getBeanByid(params).then((res) => {
          if (res.success == "true") {
            this.flowNodeDialog = true
            this.flowNodeForm = res.data.body.default
            this.findTree()
            this.findNode()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除流程节点
      delFlowNode(row) {
        this.$confirm('是否确定删除该流程节点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id,
          }
          this.$api.rwlcpz.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTree()
              this.findNode()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保持流程节点，提交
      submitFlowNode(){
        this.$refs.flowNodeForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.flowNodeForm)
            const that = this
            this.$api.rwlcpz.saveOrupdate(params).then((res) => {
              if (res.success == "true") {
                this.flowNodeDialog = false
                this.findTree()
                this.findNode()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('rwlcpzSession')
        sessionStorage.setItem('rwlcpzSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
