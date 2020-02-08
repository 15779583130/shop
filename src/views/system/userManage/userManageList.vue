<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              部门结构
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
                    用户列表
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
                              <el-form-item label="用户名称" prop="user_name">
                                <el-input v-model="filters.user_name" placeholder="请输入用户名称" size="mini"
                                  @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                              <el-form-item label="登录帐号" prop="login_name">
                                <el-input v-model="filters.login_name" placeholder="请输入登录帐号" size="mini"
                                  @keyup.enter.native="findTable"></el-input>
                              </el-form-item>

                            </el-col>
                            <el-col :span="9" style="text-align: right;">
                              <el-form-item label="" class="id-button">
                                <el-button type="primary" icon="el-icon-search" v-access id="yhglQuery" @click="findTable">查询</el-button>
                                <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                                <el-button type="primary" icon="el-icon-plus" v-access id="yhglSave" @click="addUser">新增</el-button>
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
                                <el-table-column label="登录账号" prop="login_name" min-width="100px"
                                  :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="用户名" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="部门" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="手机" prop="mobile" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="电话" prop="tel" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>

                                <el-table-column fixed="right" align="center" label="操作">
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

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="55%" :modal="false" style="padding: 0 5px">
      <div>
        <el-row>
          <el-col :span="24">
            <div>
              <el-form :inline="true" :model="userInfo" :rules="userRules" ref="userInfo" label-width="100px">
                <el-row>
                  <el-col :span="20">
                    <h4>基本信息</h4>
                  </el-col>
                </el-row>
                <br>
                <hr>
                <br>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="用户图片"  >
                      <el-upload ref="uploadImg" class="avatar-uploader" action="#" list-type="picture-card"
                        :show-file-list="false"  :on-change="before"  :on-success="ww" :auto-upload ="false" >
                        <!--<template v-if="userInfo.s_content">-->
                          <!--<img ref="imgUpload" class="avatar" src="">-->
                          <img v-show="this.isImag" ref="imgUpload" class="avatar" :src="userInfo.s_content">
                        <!--</template>-->
                        <!--<i v-if="!this.userInfo.s_content" class="el-icon-plus avatar-uploader-icon" ></i>-->
                      </el-upload>
                      <div style="color: #F56C6C;font-family: 微软雅黑;font-size: 12px;height: 20px" v-show="this.jiaoyan">请上传图片</div>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel"  >
                        <el-input v-model="userInfo.tel" size="mini" ref="userInfo.tel">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="手机" prop="mobile" style="margin-bottom: 5px;margin-top: 10px;">
                        <el-input v-model="userInfo.mobile" size="mini" >
                        </el-input>
                      </el-form-item>
                      <el-form-item label="工作证件号码" prop="by01" style="margin-bottom: 5px;margin-top: 10px;">
                        <el-input v-model="userInfo.by01" size="mini">
                        </el-input>
                      </el-form-item>
                    <el-form-item label="邮箱" prop="email" style="margin-bottom: 5px;margin-top: 10px;">
                      <el-input v-model="userInfo.email" size="mini"></el-input>
                    </el-form-item>

                  </el-col>
                  <el-col :span="10" >
                    <el-form-item label="部门" prop="dept_name" >
                      <el-input v-model="userInfo.dept_name"
                                @focus="chooseDept()" :readonly="true" placeholder="请选择归属部门" size="mini"></el-input>
                    </el-form-item>


                    <el-form-item label="用户名" prop="user_name" style="margin-bottom: 5px;margin-top: 8px;">
                      <el-input v-model="userInfo.user_name" size="mini">
                      </el-input>
                    </el-form-item>


                    <el-form-item label="登录帐号" prop="login_name" style="margin-bottom: 5px;margin-top: 10px;" >
                      <el-input v-model="userInfo.login_name" size="mini">
                      </el-input>
                    </el-form-item>


                    <el-form-item label="身份证号码" prop="by02" style="margin-bottom: 5px;margin-top: 10px;">
                      <el-input v-model="userInfo.by02" size="mini" >
                      </el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password" style="margin-bottom: 5px;margin-top: 10px;">
                      <el-input v-model="userInfo.password" size="mini" type="password">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="addr" style="margin-bottom: 5px;margin-top: 10px;">
                      <el-input v-model="userInfo.addr" size="mini"></el-input>

                    </el-form-item>
                    <el-form-item label="传真" prop="fax" style="margin-bottom: 5px;margin-top: 10px;">
                      <el-input v-model="userInfo.fax" size="mini"></el-input>
                    </el-form-item>


                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
        <el-button @click="save" size="mini" class="el-button el-button--warning">保存</el-button>
        <el-button @click="closedialog" size="mini">关闭</el-button>

      </span>
    </el-dialog>
    <el-dialog
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
    </el-dialog>
  </div>
</template>

<script>
  import {
    timeFormat,
    timeCompare
  } from '@/utils/datetime'
  export default {
    name: "Bmwzc",
    components: {},
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        userInfo: {
          id: '',
          user_name: '',
          login_name: '',
          dept_id: '',
          password: '',
          tel: '',
          addr: '',
          remark: '',
          fax: '',
          email: '',
          mobile: '',
          dept_name: '',
          by01: '',
          by02: '',
          valid_flag: '1',
          tx: '',
          s_content: '',
          file: '',
        },
        picNum: '',
        imageUrl: '', //头像地址
        labelposition: 'left',
        isEditGs: 'false',
        deptDialog: false,
        jiaoyan: false,
        treeData: [],
        selectNode: {},
        isImag: false,
        userRules: {
          user_name: [{
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
          },
            {max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }],
          login_name: [
            {
            required: true,
            trigger: 'blur',
            message: '请输入登录名',
            },
            {max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }
          ],
          password: [{
            required: true,
            trigger: 'blur',
            message: '请输入密码',
          },
            {max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }
          ],
          dept_name: [{
            required: true,
            trigger: 'blur',
            message: '请输入部门名',
          },
            {max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }],
          mobile: [{validator:this.isMobile, trigger: 'blur'}],
          email: [{validator:this.isEmail,trigger: 'blur'}],
          by02: [{
            required: true,
            trigger: 'blur',
            message: '请输入身份证号码',
          },
            {validator:this.checkSfzh, trigger: 'blur'}],
          // s_content:[{
          //   required: true,
          //   trigger: 'change',
          //   message: '请上传头像',
          // }],
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
          user_name: '',
          login_name: '',
          id: '',
          name: '',
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
        name: '',
        dialogVisible: false,
        id: '',
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
       isMobile (rule, value, callback) {
        let isMobile = value;
        if (value!=''&&value!=null&&!/^1[0-9]{10}$/.test(isMobile)){
          callback(new Error('手机格式不正确'));
        }
         callback();
      },
      //验证邮箱
      isEmail(rule, value, callback){
        let isEmail = value;
        if (value!=''&&value!=null&&!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(isEmail)){
          callback(new Error('邮箱格式不正确'));
        }
        callback();
      },
      findTree() {
        var param = {};
        this.$api.user.queryTree(param).then((res) => {
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
        this.filters.login_name = '',
          this.filters.user_name = '',
          this.id = data.id,
          this.name = data.name,
          this.findTable2()
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
      save() {
        this.$refs.userInfo.validate((valid) => {
          //todo     头像无法处理，暂用判断s_content强制取消校验
          // if(this.userInfo.s_content) {
          //   this.$refs['userInfo'].clearValidate('s_content');
          // }
          if (!this.userInfo.s_content){
            this.jiaoyan = true;
          }
          if (valid&&this.userInfo.s_content) {
            this.userInfo.dept_id = this.id;
            this.userInfo.dept_name = this.name;
            this.userInfo.tx = this.userInfo.s_content;
            var param = this.userInfo;
            if (!this.userInfo.id) {
              this.$api.user.save(param).then((res) => {
                if (res.success == "true") {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.dialogVisible = false;
                  var data = {
                    id: this.id,
                    name: this.name,
                  }
                  this.refresh(data);

                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              })
            } else {
              this.$api.user.update(this.userInfo).then((res) => {
                if (res.success == "true") {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.dialogVisible = false;
                  var data = {
                    id: this.id,
                    name: this.name,
                  }
                  this.refresh(data);
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              })
            }
          }else {

          }
        })
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          dept_id: this.id,
        };
        var parms = {};

        Object.assign(parms, param, this.filters)

        this.$api.user.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      findTable2() {            //刷新结点查询
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          dept_id: this.id,
        };
        var parms = {};

        Object.assign(parms, param, this.filters)

        this.$api.user.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
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
      addUser() {
        if (this.id === '') {
          this.$message({
            message: '请从左侧树中选择单位或选择子节点！',
            showClose: true,
            type: 'warning'
          });
          return false;
        }

        this.isEditGs = 'false';
        this.userInfo = {};
        this.userInfo.dept_id = this.id
        this.userInfo.dept_name = this.name
        this.dialogVisible = true;
      },
      editGsck(row) {

      this.isEditGs = 'true';
        var parms = {
          id: row.id
        };
        this.$api.user.get(parms).then((res) => {
          this.userInfo = res.body.default;
        })
        this.userInfo.dept_name = this.name
        this.userInfo.dept_id = this.id;
        this.userInfo.tx = this.userInfo.s_content;
        this.isImag = true;
        this.dialogVisible = true;
       this.$refs.imgUpload.src = this.userInfo.s_content


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
        this.filters.user_name = '';
        this.filters.login_name = '';
      },
      reset1() {
        this.filters1.ckbm = '';
        this.filters1.ckmc = '';
        this.filters1.beg_time = '';
        this.filters1.end_time = '';
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
      ww (response, file, fileList) {

      },
      before(file) {
      let self = this
        const isJPG = file.raw.type === 'image/jpeg';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }

        this.getBase64(file.raw).then(res => {
          self.userInfo.tx = res
          self.userInfo.s_content = res
          self.isImag = true
          this.$refs.imgUpload.src = self.userInfo.s_content
          if (self.userInfo.s_content){
            this.jiaoyan = false;
          }
          // self.userInfo.s_content = self.userInfo.s_content
          // debugger
          // self.$refs['userInfo'].validateField('s_content')
          //todo     头像无法处理，暂用判断s_content强制取消校验
          // if(self.userInfo.s_content) {
          //   self.$refs['userInfo'].clearValidate('s_content');
          // }
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
          this.$api.user.handleDelete(params).then((res) => {
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
        this.dialogVisible = false
        this.isImag = false;
        this.$refs.imgUpload.src = ''

      },
      selectData(data) {
        this.selectNode = data;
      },
      checkSfzh(rule, value, callback) {
        //   if (!value) {
        //     callback()
        //   } else {
        //     const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        //
        //     if (reg.test(value)) {
        //       callback()
        //     } else {
        //       return callback(new Error('请输入正确的身份证号码'))
        //     }
        //   }
        // }
        let idCard = value;
        // 15位和18位身份证号码的正则表达式
        let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        // 如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
          if (idCard.length === 18) {
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
            let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            let idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
            for (let i = 0; i < 17; i++) {
              idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            let idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
            let idCardLast = idCard.substring(17); // 得到最后一位身份证号码
            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod === 2) {
              if (idCardLast === 'X' || idCardLast === 'x') {
                callback();
              } else {
                return callback(new Error('请输入正确的身份证号码'));
              }
            } else {
              // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if (Number(idCardLast ) === idCardY[idCardMod]) {
                callback();
              } else {
                return callback(new Error('请输入正确的身份证号码'));
              }
            }
          }
        } else {
          return callback(new Error('请输入正确的身份证号码'));
        }
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
  @import '../../page-main';

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
