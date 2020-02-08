<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              全局参数树
            </div>
            <div class="text item">
              <div class="bmwzc_tree">
                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
                <el-tree class="filter-tree" node-key="id" :data="treeData" :props="treeProps" default-expand-all
                         @node-click="refresh" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree">
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
                  <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    全局参数列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="15" style="display: flex;">
                              <el-form-item label="键名" prop="user_name">
                                <el-input v-model="filters.param_key" placeholder="请输入键名" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="键值" prop="login_name">
                                <el-input v-model="filters.param_value" placeholder="请输入键值" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>

                            </el-col>
                            <el-col :span="9" style="text-align: right;">
                              <el-form-item label="" class="id-button">
                                <el-button type="primary" icon="el-icon-search" v-access id="yhglQuery" @click="findTable">查询</el-button>
                                <el-button type="default" icon="el-icon-refresh-right" @click="reset">重置</el-button>
                                <el-button type="success" icon="el-icon-circle-plus" v-access id="yhglSave" @click="addnew">新增</el-button>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                        <el-row class="bmwzc">
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                                        highlight-current-row @selection-change="selectData" size="mini" @cell-dblclick="editGsck">

                                <el-table-column label="序号" width="50">
                                  <template slot-scope="scope">
                                    <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                                  </template>
                                </el-table-column>
                                <!-- <el-input type="hidden" prop="id"></el-input> -->
                                <el-table-column label="参数键名" prop="param_key"
                                                 :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="参数键值" prop="param_value"  min-width="100px" :show-overflow-tooltip="true" ></el-table-column>
                                <el-table-column label="状态" prop="status" :show-overflow-tooltip="true" width="80px">
                                  <template slot-scope="scope">
                                    <el-button
                                      :type="scope.row.status === '禁用' ? 'danger' : 'success'" size="mini" title="请点击进行状态控制" >{{scope.row.status}}</el-button >
                                  </template>
                                </el-table-column>
                                <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column fixed="right" align="center" label="操作" width="100px">
                                  <template slot-scope="scope">
                                    <i @click="editGsck(scope.row)" class="el-icon-edit-outline" style="font-size: 20px;cursor: pointer"
                                       title="编辑" v-access id="yhglEdit"></i>
                                    <i @click="handleDelete(scope.row)" class="el-icon-delete" style="font-size: 20px; margin-left: 12px;cursor: pointer"
                                       title="删除" v-access id="yhglDel"></i>
                                  </template>
                                </el-table-column>
                              </el-table>
                              <div class="page">
                                <div class="page-content">
                                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                 :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
                                                 layout="total, sizes, prev, pager, next, jumper" :total="total">
                                  </el-pagination>
                                </div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>

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

    <el-dialog
      :title="dialogtitle"
      :visible.sync="editDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :modal="true"
      width="50%"
      style="">
      <el-form :model="paramsInfo"  label-width="180px" :rules="paramsRules" size="mini" label-position="right" style="height: 300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="参数键名" prop="param_key">
              <el-input v-model="paramsInfo.param_key" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参数键值" prop="param_value">
              <el-input v-model="paramsInfo.param_value" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-select v-model="paramsInfo.status" placeholder="请选择">
                <el-option
                  v-for="item in dwOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="排序" prop="param_order">
              <!-- <el-input v-model="pzxxForm.qxts" size="mini" placeholder="请输入期限天数" :readonly="readonly" clearable ></el-input> -->
              <el-input-number v-model="paramsInfo.param_order"  :min="1" size="mini" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <!-- <el-input v-model="pzxxForm.qxts" size="mini" placeholder="请输入期限天数" :readonly="readonly" clearable ></el-input> -->
              <el-input v-model="paramsInfo.remark" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>


        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
               <el-button type="primary" size="mini"  v-show="isView"  @click="save">保存</el-button>
               <el-button type="primary" size="mini"  v-show="!isView"  @click="update">修改</el-button>
                <el-button @click="closedialog" size="mini">关闭</el-button>

              </span>
    </el-dialog>
    <!--<el-dialog
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
          @node-click="selectData"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="chooseDeptName" size="mini">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
  import {
    timeFormat,
    timeCompare
  } from '@/utils/datetime'

  import commonServie from '@/framework/CommonService'
  export default {
    name: "qjcsManage",
    components: {},
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        dwOptions:[
          {value: '1', label: '启用'},
          {value: '0', label: '禁止'},
        ],
        paramsInfo: {
          id: '',
          parent_id: '',
          param_key: '',
          param_code: '',

          param_value: '',
          param_order: '',

          status: '',
          is_export_web: '',
          remark: '',
        },
        readonly:false,
        picNum: '',
        imageUrl: '', //头像地址
        labelposition: 'left',
        isEditGs: 'false',
        deptDialog: false,
        treeData: [],
        selectNode: {},
        isImag: false,
        paramsRules: {
          param_key: [{
            required: true,
            trigger: 'blur',
            message: '请输入键名',
            max: 20
          }],
          param_value: [{
            required: true,
            trigger: 'blur',
            message: '请输入键值',
            max: 20
          }],
          status: [{
            required: true,
            trigger: 'blur',
            message: '请选择状态',
            max: 20
          }],
          param_order: [{
            required: true,
            trigger: 'blur',
            message: '请输入排序',
            max: 20
          }]
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
          param_key: '',
          param_value: '',
        },
        filters1: {
          user_name: '',
          login_name: '',
          id: '',
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        currentPage1: 1,
        total1: 0,
        pageSize1: 5,
        //表格
        tableData: [],
        delarr: [], //存放删除的数据
        multipleSelection: [], //多选的数据
        tableData1: [],
        xhData: [],
        param_key: '',
        dialogVisible: false,
        editDialog: false,
        id: '',
        name: '',
        dialogtitle: '',
        isView: false,
        isViewII: false,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      if (sessionStorage.getItem('userManageSession')) {
        this.filters = JSON.parse(sessionStorage.getItem('userManageSession'))
      }
      this.findTree();
      // this.findTable();
      // this.findTable1();
    },
    methods: {
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTree() {
        var param = {};
        this.$api.qjcsgl.queryTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      },
      refresh(data) {
          this.filters.param_key = '',
          this.filters.param_value = '',
          this.id = data.id,
            this.name = data.name,
          this.findTable2()
      },
      save() {
        let params = Object.assign({}, this.paramsInfo)
        this.$api.qjcsgl.save(params).then((res) => {
          if (res.success == 'true') {
            this.$message({message: res.message, type: 'success'})
            this.editDialog = false
            this.findTable()
            this.findTree();
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          id: this.id,
        };
        var parms = {};

        Object.assign(parms, param, this.filters)

        this.$api.qjcsgl.query(parms).then((res) => {
          this.total = Number(res.body.default.paramscount);
          this.tableData = res.body.default.params;
          this.tableData.forEach(function (c) {
            if(c.status=='1'){
              c.status='启用'
            }else{
              c.status='禁用'
            }
          })
        })
      },
      findTable2() {            //刷新结点查询
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          id: this.id,
        };
        var parms = {};
        Object.assign(parms, param, this.filters)

        this.$api.qjcsgl.query(parms).then((res) => {
          this.total = Number(res.body.default.paramscount);
          this.tableData = res.body.default.params;
          this.tableData.forEach(function (c) {
            if(c.status=='1'){
              c.status='启用'
            }else{
              c.status='禁用'
            }
          })
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
              this.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
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
      addnew() {
        var param = {
          id: this.id,
          parent_id: '',
          param_key: this.name,
        };
        var parms = {};
                this.paramsInfo ={}
                this.paramsInfo.param_order = 1;
        Object.assign(parms, param)
        this.$api.qjcsgl.get(parms).then((res) => {
          this.paramsInfo.param_code = res.body.default.param_code;
        })
        this.paramsInfo.parent_id = this.id,
        this.isView = true,
        this.dialogtitle = '新增全局参数',
        this.editDialog = true;
      },
      editGsck(row) {

        this.isView = false;
        var parms = {
          id: row.id,
          parent_id: row.parent_id,
          param_key: row.param_key,
        };
        this.$api.qjcsgl.get(parms).then((res) => {
          this.paramsInfo = res.body.default;
        })
        this.paramsInfo.parent_id = this.id;
        this.dialogtitle = '修改全局参数',
        this.editDialog = true;

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
              this.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
            this.findTable();
          })
        })
      },
      reset() {
        this.filters.param_key = '';
        this.filters.param_value = '';
      },
      xhFormat(row, column, cellValue, index) {
        return this.xhData[index]
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
              this.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
            this.findTable1();
          })
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.getBase64(file.row).then(res => {
          this.userInfo.tx = res
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.picDialog = true;
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = '';
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      handleDelete(row) {
        this.$confirm('确定删除该位置及其子位置？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.qjcsgl.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
            this.findTable();
            this.findTree();
          })
        })
      },
      chooseDept(){
        var param = {}
        this.$api.user.usertreetablebymanager(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      chooseDeptName() {
        this.userInfo.dept_name = this.selectNode.name;
        this.userInfo.dept_id = this.selectNode.id;
        this.deptDialog = false;
      },
      closedialog(){
        this.editDialog = false;
        /*this.isView = false;
        this.isViewII = false;*/
      },
      selectData(data) {
        this.selectNode = data;
      },
      update(){
//        let jsondata = encodeURI(JSON.stringify(this.paramsInfo.remark))
//        let jsondataBtoa = window.btoa(jsondata)
//        this.paramsInfo.remark = jsondataBtoa;
        this.$api.qjcsgl.update(this.paramsInfo).then((res) => {
          if (res.success == "true") {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.editDialog = false;
            this.findTree();
            this.findTable();
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      },
      getBase64 (file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = '';
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      }

    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('userManageSession')
      sessionStorage.setItem('userManageSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
  @import '../../page-main';
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }

  /deep/.el-upload--picture-card {
    width: 80px; height: 80px;
  }
  /deep/.el-upload--picture-card i {
    position: relative; top: -28px;
  }
  .avatar{
    width: 100%;
    height: 100%;
  }
  /* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>
