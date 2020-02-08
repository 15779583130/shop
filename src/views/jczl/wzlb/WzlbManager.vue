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
                         style="position: relative;left:155px;" @click="handleAdd">新增子级位置
              </el-button>
              <div class="wzcw_tree">
                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
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
                   条件查询
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
                        <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="24" style="display: flex;">
                              <el-form-item label="类别名称" prop="wzlbmc">
                                <el-input v-model="dataForm.wzlbmc2" placeholder="请输入类别名称" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="类别编码" prop="wzlbbm">
                                <el-input v-model="dataForm.wzlbbm2" placeholder="请输入类别编码" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                             <el-button type="primary" icon="el-icon-search" @click="findTableByP" size="mini">查询</el-button>
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
                            size="mini"
                            highlight-current-row :cell-style="{padding:'1px'}" @cell-dblclick="handleEdit">
                    <el-table-column label="序号" width="50px" align="center">
                      <template slot-scope="scope">
                        <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column label="序号" prop="id" :show-overflow-tooltip="true"></el-table-column> -->
                    <el-table-column label="类别名称" prop="wzlbmc" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="类别编号" prop="wzlbbm" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="助记码" prop="zjm" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="父级类别" prop="parentname" :show-overflow-tooltip="true"></el-table-column>
                   <el-table-column label="是否停用" prop="sfty" :show-overflow-tooltip="true">
           <template slot-scope="scope">
                   <el-button
                     :type="scope.row.sfty === '启用' ? 'success' : 'danger'" size="mini" title="请点击进行状态控制" @click="changeSfqy(scope.row)"
                      >{{scope.row.sfty}}</el-button >
                 </template>
                  </el-table-column>
                    <el-table-column label="级层" prop="jc" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="单位" prop="dw" :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column fixed="right" align="center" label="操作">
                      <template slot-scope="scope">
                        <i @click="handleEdit(scope.row)" class="el-icon-edit-outline"
                           style="font-size: 20px;cursor: pointer" title="编辑"></i>
                        <i @click="handleDelete(scope.row)" class="el-icon-delete"
                           style="font-size: 20px; margin-left: 12px;cursor: pointer" title="删除"></i>
                      </template>
                    </el-table-column>
                  </el-table>
<!--                  <div class="page">-->
<!--                    <div class="page-content">-->
<!--                      <el-pagination-->
<!--                        background-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :current-page="currentPage"-->
<!--                        :page-sizes="[10, 20, 30, 40, 50]"-->
<!--                        :page-size="pageSize"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="total">-->
<!--                      </el-pagination>-->
<!--                    </div>-->
<!--                  </div>-->
                </div>
              </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="operation?'新增物证类别信息':'修改物证类别信息'"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal="true">
      <div>
        <el-form :model="dataForm" :rules="dataFormRules" ref="dataForm" :label-position="right" label-width="120px">
          <input type="hidden" v-model="dataForm.id"/>
              <!-- 文件夹选择 -->
          <template v-if="ok3">
             <template v-if="ok1">
            <el-form-item label="上级物证类别" style="margin-bottom: 0px" prop="parentname" >
              <el-input v-model="dataForm.parentname" prop="mini" @focus="chooseCfwz" readonly
                        style="width: 100%" size="mini"
                        suffix-icon="el-icon-folder-opened" id="kzread"></el-input>
            </el-form-item>
          <!--  手输文本框 -->
             </template>
             <template v-if="ok2">
             <el-form-item label="上级物证类别" style="margin-bottom: 0px" prop="parentname" >
               <el-input v-model="dataForm.parentname" prop="mini" size="mini"
                         style="width: 100%"></el-input>
             </el-form-item>
              </template>
          </template>
          <el-form-item label="级层" prop="jc">
            <el-input v-model="dataForm.jc" prop="mini" style="width: 100%" readonly="readonly"
             size="mini"></el-input>
          </el-form-item>
          <el-form-item label="物证类别名称" prop="wzlbmc">
            <el-input v-model="dataForm.wzlbmc" size="mini" style="width: 100%"
                      onkeyup="this.value=this.value.replace(/[\u4e00-\u9fa5]/g,'')" ></el-input>
          </el-form-item>
          <el-form-item label="物证类别编码" prop="wzlbbm">
            <el-input v-model="dataForm.wzlbbm" size="mini" style="width: 100%" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="名称助记码" prop="zjm">
            <el-input v-model="dataForm.zjm" size="mini" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="px">
            <el-input v-model="dataForm.px" size="mini" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="dw">
            <el-input v-model="dataForm.dw" size="mini" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" >
            <el-input type="textarea" v-model="dataForm.remark" size="mini" style="width: 100%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="submitForm()" size="mini">提交</el-button>
        <el-button @click="close" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择物证分类"
      :visible.sync="deptDialog"
      width="30%"
      :append-to-body="true"
      :modal="true">
      <div class="dialog_tree">
         <el-input placeholder="请输入过滤条件" v-model="filterTextNET" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="treeProps"
          :default-expand-all="false"
          :filter-node-method="filterNodeNET"
          @node-click="selectData"
          ref="treeNET">
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
        ok1 : false,//文本选择器关闭
        ok2 :true,//手输打开
        ok3 :false,//不显示
//        this.$router.push({path: '/productManage/editProduct', query: {setid: 123456}});

        selectNode: {},
        deptDialog: false,
        value: [],
        filterText: '',
        filterTextNET: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name',
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
          pid: '',
          parentname: '',
          jc:'',
          wzlbmc:'',
          wzlbmb: '',
            wzlbbm:'',
          zjm:'',
          px: '',
          dw:'',
          remark: '',
          wzlbmc2:'',
          wzlbbm2:'',

        },
        dataFormRules: {
          // parentname: [
          //   {required: true, message: '这是必填字段'}
          // ],
          jc: [
            {required: true, message: '这是必填字段'},
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          wzlbmc: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          wzlbbm: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          zjm: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          px: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
        },
        treeShow: false,
        newTreeData: null
      }
    },
    mounted() {
      this.findTree();
      this.findTableALL();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      filterTextNET(val) {
        this.$refs.treeNET.filter(val);
      }
    },
    methods: {
      DataLength (fdata){

      },
      selectData(data) {

        this.selectNode = data

      },
      //点击确定以后做的事情
      getDeptInfo() {

        this.dataForm.pid = this.selectNode.id;
       //  this.dataForm.parent_id = this.selectNode.id;
        this.dataForm.parentname = this.selectNode.name;
        //自己加的
        this.dataForm.jc = this.selectNode.jc;
        this.deptDialog = false;

      },
      chooseCfwz() {

        if(this.operation){
          this.deptDialog = false;
        }else{
          this.deptDialog = true;
        }

      },

      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //左侧树内部过滤
      filterNodeNET(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTree() {
        var param = {};
        this.$api.wzlb.queryTree(param).then((res) => {

          if (res.success == "true") {
            this.treeData = res.data
            this.newTreeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      refresh(data) {
        debugger
        this.ok1  = true;//文件选择器打开
        this.ok2 =false ;//手输关闭
        this.ok3=true;//显示
        this.id = data.id;
        //this.wzlbmc = data.parentname;
         //this.parentname = data.wzlbmc;
          this.parentname = data.name;
          this.jc = data.jc;
         //this.name = data.parentname;

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
          id: this.id,
         wzlbbm:this.dataForm.wzlbbm2,
          wzlbmc:this.dataForm.wzlbmc2
        };
        this.$api.wzlb.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.tableData.forEach(function (c) {

            if(c.sfty=='1'){
              c.sfty='禁用'
            }else{
               c.sfty='启用'
            }
          })
        })
      },
      findTableByP(){

        if (this.id !="") {
          this.findTable();
        } else{
          this.findTableALL();
        }
      },
      findTableALL() {

        var param = {

          pagenum: this.currentPage,
          pagesize: this.pageSize,
         // id: this.id,
          id: '',
          wzlbbm:this.dataForm.wzlbbm2,
           wzlbmc:this.dataForm.wzlbmc2

        };

        this.$api.wzlb.queryTableALL(param).then((res) => {

          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.tableData.forEach(function (c) {


            if(c.sfty=='1'){
              c.sfty='禁用'
            }else{
               c.sfty='启用'
            }
          })
        })
      },

      handleAdd(data) {

          this.value = []
          if (this.id == '') {
            // this.$message({
            //   message: '请从左侧树中选择一个节点！',
            //   showClose: true,
            //   type: 'warning'
            // });
             this.deptDialog = false;
            //重置表单数据
               if (this.$refs['dataForm'] !== undefined) {
                 this.$refs['dataForm'].resetFields();
               }
               var params = {
                 id: this.id
               }

               this.value = this.id
              this.$api.wzlb.getMaxOrder(params).then((res) => {
                //这里需要再看看
                this.dataForm.plsx = res.body.default.maxorder;
              })
              this.dataForm.parentname = this.parentname
               this.dataForm.jc = '1';
            //  this.dataForm.jc=this.jc;
             // this.dataForm.id = commonServie.getuuid();
               this.dataForm.id =""
              this.dataForm.pid = this.id
              this.dialogVisible = true
              this.operation = true
          } else {
            //重置表单数据
            if (this.$refs['dataForm'] !== undefined) {
              this.$refs['dataForm'].resetFields();
            }
            var params = {
              id: this.id
            }
            this.value = this.id
           this.$api.wzlb.getMaxOrder(params).then((res) => {
             //这里需要再看看
             this.dataForm.plsx = res.body.default.maxorder;
           })
           this.dataForm.parentname = this.parentname
            this.dataForm.jc = (parseInt(this.jc)+1)+"";
         //  this.dataForm.jc=this.jc;
          // this.dataForm.id = commonServie.getuuid();
            this.dataForm.id =""
           this.dataForm.pid = this.id
           this.dialogVisible = true
           this.operation = true
}
      },
      handleEdit(row) {
        this.ok1 =true;//文件夹打开
        this.ok2 =false;//手输关闭
        this.ok3=true;//显示
        this.dialogVisible = true;
        this.operation = false;
        //清空校验结果
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].clearValidate();
        }
        var params = {
          id: row.id
        }
      //  this.value = row.parent_id
      this.value = row.pid
        this.$api.wzlb.get(params).then((res) => {
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
          this.$api.wzlb.singleDelete(params).then((res) => {
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
            debugger
        let that = this
        this.$refs.dataForm.validate((valid) => {

          if (valid) {
            let params = Object.assign({}, this.dataForm)
            this.$api.wzlb.saveOrupdate(params).then((res) => {

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
    changeSfqy(row){
      var tsnr = ''
      var status = '';
      if(row.sfty=='禁用'){
          status = '0';
          tsnr = '确定是否启用该策略配置？'
      }else{
        status = '1';
        tsnr = '确定是否禁用该策略配置？'
      }
      this.$confirm(tsnr, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: row.id,
          status:status

        };
        this.$api.wzlb.updateZt(params).then((res) => {

          if (res.success == "true") {
            this.$message({message: res.message, type: 'success'})

          } else {
            this.$message({message: res.message, type: 'error'})
          }
          this.findTableALL();
        })
      })


    },
      close() {
        let that = this
        that.dialogVisible = false;
        that.treeShow = false;
        that.ok3=false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/deep-ele.less';
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
