<template>
  <div class="wzcw">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              存放位置树
            </div>
            <div class="text item">
              <el-button type="primary" icon="el-icon-plus" size="mini"
                         style="position: relative;left:155px;" id="wzcwAdd" @click="handleAdd">新增子级位置
              </el-button>
              <div class="wzcw_tree">
                <el-input placeholder="请输入位置名称" v-model="filterText" size="mini"></el-input>
                <el-tree
                  class="filter-tree"
                  :data="treeData"
                  :props="treeProps"
                  :default-expand-all="false"
                  :filter-node-method="filterNode"
                  @node-click="refresh"
                  ref="tree">
                </el-tree>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row style="margin-bottom: 10px;">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    位置列表（双击编辑）
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                            size="mini"
                            highlight-current-row :cell-style="{padding:'1px'}" @cell-dblclick="handleEdit">
                    <el-table-column label="序号" width="50px" align="center">
                      <template slot-scope="scope">
                        <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="存放位置名称" prop="cfwz" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="上级位置名称" prop="parentname" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="存放位置顺序" prop="plsx" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column fixed="right" align="center" label="操作">
                      <template slot-scope="scope">
                        <i @click="handleEdit(scope.row)" class="el-icon-edit-outline"
                           style="font-size: 20px;cursor: pointer" title="编辑"></i>
                        <i @click="handleDelete(scope.row)" class="el-icon-delete"
                           style="font-size: 20px; margin-left: 12px;cursor: pointer" title="删除"></i>
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
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="operation?'新增位置信息':'修改位置信息'"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal="true">
      <div>
        <el-form :model="dataForm" :rules="dataFormRules" ref="dataForm" label-position="right">
          <input type="hidden" v-model="dataForm.id"/>
          <el-form-item label="上级位置名称" style="margin-bottom: 0px" prop="parentname">
            <el-input v-model="dataForm.parentname" prop="mini" @focus="chooseCfwz" readonly="readonly"
                      style="width: 60%"
                      suffix-icon="el-icon-folder-opened"></el-input>
          </el-form-item>
          <el-form-item label="存放位置名称" prop="cfwz">
            <el-input v-model="dataForm.cfwz" size="mini" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item label="存放位置顺序" prop="plsx">
            <el-input v-model="dataForm.plsx" size="mini" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" style="padding-left: 65px;">
            <el-input type="textarea" v-model="dataForm.remark" size="mini" style="width: 73%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="submitForm()" size="mini">提交</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择存放位置"
      :visible.sync="deptDialog"
      width="30%"
      :append-to-body="true"
      :modal="true">
      <div class="dialog_tree">
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="treeProps"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :append-to-body="true"
          :modal="false"
          :modal-append-body="false"
          @node-click="selectData"
          :expand-on-click-node="false"
          ref="tree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deptDialog = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="getDeptInfo" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import commonServie from '@/framework/CommonService'

  export default {
    name: "Wzcw",
    data() {
      return {
        selectNode: {},
        deptDialog: false,
        value: [],
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'cfwz',
          value: 'id'
        },
        parentname: '',
        id: '',
        //右侧
        //表格
        tableData: [],
        operation: true,//true:新增，false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        // 新增编辑界面数据
        dataForm: {
          id: '',
          parent_id: '',
          parentname: '',
          cfwz: '',
          plsx: '',
          remark: ''
        },
        dataFormRules: {
          parentname: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          cfwz: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          plsx: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
        },
        treeShow: false,
        newTreeData: null
      }
    },
    mounted() {
      this.findTree();
      this.findTable();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      selectData(data) {
        this.selectNode = data
      },
      getDeptInfo() {
        this.dataForm.parent_id = this.selectNode.id;
        this.dataForm.parentname = this.selectNode.cfwz;
        this.deptDialog = false;
      },
      chooseCfwz() {
        this.deptDialog = true;
      },
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.cfwz.indexOf(value) !== -1;
      },
      findTree() {
        var param = {};
        this.$api.wzcw.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.newTreeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      refresh(data) {
        this.id = data.id;
        this.parentname = data.cfwz;
        this.findTable();
      },
      //右侧
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
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          id: this.id
        };
        this.$api.wzcw.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      handleAdd(data) {
        this.value = []
        if (this.id == '') {
          this.$message({
            message: '请从左侧树中选择一个节点！',
            showClose: true,
            type: 'warning'
          });
        } else {
          //重置表单数据
          if (this.$refs['dataForm'] !== undefined) {
            this.$refs['dataForm'].resetFields();
          }
          var params = {
            id: this.id
          }
          this.value = this.id
          this.$api.wzcw.getMaxOrder(params).then((res) => {
            this.dataForm.plsx = res.body.default.maxorder;
          })
          this.dataForm.parentname = this.parentname
          this.dataForm.id = commonServie.getuuid();
          this.dataForm.parent_id = this.id
          this.dialogVisible = true
          this.operation = true
        }
      },
      handleEdit(row) {
        this.dialogVisible = true;
        this.operation = false;
        //清空校验结果
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].clearValidate();
        }
        var params = {
          id: row.id
        }
        this.value = row.parent_id
        this.$api.wzcw.get(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.body.default;
          })
        })
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
          this.$api.wzcw.singleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
            this.findTree();
          })
        })
      },
      submitForm() {
        let that = this
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.dataForm)
            this.$api.wzcw.saveOrupdate(params).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                this.dialogVisible = false;
                this.$refs['dataForm'].resetFields();
              } else {
                this.$message({message: res.message, type: 'error'})
              }
              this.findTable();
              this.findTree();
            })
          }
          that.treeShow = false
          this.value = []
        })
      },
      close() {
        let that = this
        that.dialogVisible = false;
        that.treeShow = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../styles/deep-ele.less';
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

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .wzcw_tree {
    overflow-y: auto;
    height: 65vh;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .el-form-item__error {
    position: relative !important;
  }

</style>
