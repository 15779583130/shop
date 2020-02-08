<style lang="less" scoped>
  @import '../../../styles/deep-ele.less';
  @import '../../../styles/common.less';
  @import '../../page-main';
  /deep/.el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none
  }
  /deep/.el-upload--picture-card {
    width: 80px; height: 80px;line-height: 80px;
  }
  /deep/.el-upload--picture-card i {
    position: relative;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 80px; height: 80px; float: left;
  }
  /deep/ .view .el-upload--picture-card {
    display: none;
  }
  /deep/ .view .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{
    display: none;
  }

</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            物流人员
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="工号" prop="gh">
                      <el-input v-model="filters.gh" size="mini" placeholder="请输入人员工号" clearable=""></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="xm">
                      <el-input v-model="filters.xm" size="mini" placeholder="请输入人员姓名" clearable=""></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" clase="large">
                      <el-date-picker
                        size="mini"
                        v-model="filters.beg_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期" clearable="">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.end_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期" clearable="">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset()" size="mini">重置
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-row class="form-line">
                    <el-form-item label="手机号">
                      <el-input v-model="filters.dh" size="mini" placeholder="请输入手机号" clearable=""></el-input>
                    </el-form-item>
                    <el-form-item label="身份证">
                      <el-input v-model="filters.sfzh" size="mini" placeholder="请输入身份证号" clearable=""></el-input>
                    </el-form-item>
                    <el-form-item label="职责类型" prop="zz">
                      <el-select v-model="filters.zz" placeholder="请选择" style="width:100%">
                        <el-option value="0" label="司机"></el-option>
                        <el-option value="1" label="物流人员"></el-option>
                        <el-option value="2" label="仓管员"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-finished" size="mini" @click="plsh">批量审核</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="未审核" name="wsh"></el-tab-pane>
          <el-tab-pane label="已审核" name="ysh"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-checkbox-group v-for="(item,index) in tableData" v-model="checkList" :key="item.id">

        <el-col :span="8">
          <div class="personnel" @dblclick="viewRyxx(item.id)">
            <div class="flag" v-if="item.sfsh=='1'">已审核</div>
            <div class="flag2" v-if="item.sfsh=='0'">未审核</div>
            <div class="msg">
              <div class="line">
                <div class="pic" @click="viewRyxx(item.id)">
                  <img :src="item.imgurl||emptyImg" alt="">
                </div>
                <div class="right-info">
                  <span class="name">{{item.xm}}</span>
                  <span>创建时间：{{item.created_time}}</span>
                </div>
              </div>
              <div class="line">
                <span style="width:40%"><i class="iconfont icon-shouji"></i>{{item.dh}}</span>
                <span style="width:60%"><i class="iconfont icon-shenfenzheng"></i>{{item.sfzh}}</span>
              </div>
              <div class="line">
                <span style="width: 47%">工号：{{item.gh}}</span>
                <span style="width: 50%">职责：{{item.zz}}</span>
                <span class="block">备注：{{item.remark||'无'}}</span>
              </div>
              <div class="line" v-if="item.sfsh=='1'">
                <span>审核人员：{{item.shrxm}}</span>
                <span style="display:inline-block;padding-left: 38px;">审核时间：{{item.shsj}}</span>
              </div>
            </div>
            <div class="bottom" @click.stop>
              <span v-if="item.sfsh=='0'">
                <el-checkbox style="color: #fff; width: 15px; overflow: hidden" :key="item.id"
                             :label="item.id"></el-checkbox>
<!--                <el-checkbox v-if="item.sfsh=='1'" disabled></el-checkbox>-->
              </span>
              <span class="el-icon-check" @click="sh(item.id)" v-if="item.sfsh=='0'"></span>
              <span  class="el-icon-view" @click="viewRyxx(item.id)" title="查看"></span>
              <span class="el-icon-edit"  v-if="item.sfsh=='0'" @click="editRyxx(item.id)"></span>
              <span class="el-icon-delete" @click="handleDelete(item.id)"></span>
            </div>
          </div>
        </el-col>

      </el-checkbox-group>
    </el-row>
    <div class="page">
      <div class="page-content">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageinfo.pagenum"
          :page-sizes="[9,18,27,36]"
          :page-size="pageinfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageinfo.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="editDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :modal="true"
      width="50%">
      <el-form :model="dataForm" ref="dataForm" label-width="180px" :rules="dataRules" size="mini"
               label-position="right" style="height:300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工号" prop="gh">
              <el-input v-model="dataForm.gh" size="mini" placeholder="请输入人员工号" :readonly="readonly"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="姓名" prop="xm">
              <el-input v-model="dataForm.xm" size="mini" placeholder="请输入人员姓名" :readonly="readonly"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号" prop="dh">
              <el-input v-model="dataForm.dh" size="mini" placeholder="请输入人员手机号" :readonly="readonly"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证号" prop="sfzh">
              <el-input v-model="dataForm.sfzh" size="mini" placeholder="请输入人员身份证号" :readonly="readonly"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="职责类型" prop="zz" v-if="picshow">
              <el-select v-model="dataForm.zz" placeholder="请选择">
                <el-option value="0" label="司机"></el-option>
                <el-option value="1" label="物流人员"></el-option>
                <el-option value="2" label="仓管员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职责类型" prop="zz" v-if="!picshow">
              <el-select v-model="dataForm.zz" placeholder="请选择" :disabled="true">
                <el-option value="0" label="司机"></el-option>
                <el-option value="1" label="物流人员"></el-option>
                <el-option value="2" label="仓管员"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="人员照片" prop="pass" style="position: relative;">
              <el-upload
                ref="fileListAnJian"
                action="#"
                :on-change="getBeforeUploadAnJian"
                :before-remove="handleRemoveAnJian"
                :on-preview="handlePictureCardPreview"
                :file-list="imgListAnJian"
                list-type="picture-card"
                :auto-upload="false"
                accept=".jpg,.png,.gif"
               :class="{view:!picshow}">
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
               <el-button type="primary" size="mini" @click="saveRyxx" v-if="picshow">保存</el-button>
                <el-button @click="editDialog = false" size="mini">关闭</el-button>
              </span>
    </el-dialog>
    <el-dialog :visible.sync="picDialog" title="图片预览"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal-append-to-body='false'
               :modal="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </el-card>
</template>

<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "test",
    data() {
      return {
        dialogImageUrl: '',
        picDialog:false,
        checkList: [],
        leftList: [],
        emptyImg: require("@/images/no-img.png"),
        //搜索条件
        filters: {
          beg_time: '',
          end_time: '',
          gh: '',
          xm: '',
          sfzh: '',
          dh: '',
          zz: '',
          sfsh: '0',
        },
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize: 9
        },
        tableData: [],
        dataForm: {
          id: '',
          gh: '',
          xm: '',
          dh: '',
          sfzh: '',
          zz: '',
          remark: '',
          photo_id:''
        },
        dataRules: {
          gh: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          xm: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          dh: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {validator:this.checkPhone, trigger: 'blur'}
          ],
          sfzh: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {validator: this.checkIdCard,trigger: 'blur'}
            ],
          zz: [{required: true, message: '这是必填字段', trigger: 'blur'}],
        },
        editDialog: false,
        more: false,
        srcList: [],
        imgListAnJian: [], // 案件图片列表
        srcListAnJian: [], // 案件大图显示
        imgList: [],
        dialogTitle: '新增人员',
        readonly: false,
        delIcon: true,
        activeName: 'wsh',
        picshow: true
      }

    },
    created() {
      this.init()
    },
    computed: {
      nameSize() {
        return this.$contants.pageSet.nameSize
      },
      accountSize() {
        return this.$contants.pageSet.accountSize
      },
      backgroundColor() {
        return this.$contants.pageSet.backgroundColor
      }
    },
    methods: {
      init() {
        this.findTable();
      },
      // 设置手机号的验证规则
      checkPhone(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^1(3[0-9]|4[0-9]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的电话'))
          }
        }
      },
      checkIdCard(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的身份证号码'))
          }
        }
      },
      sh(id) {
        this.$confirm('是否确认审核通过该物流人员信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var tempArr = [];
          tempArr.push(id);
          var params = {
            ids: tempArr.join(",")
          }
          this.$api.wlry.adopt(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      plsh() {
        if (this.checkList.length <= 0) {
          this.$message({message: '请先选择要审核通过的物流人员', type: 'warning'})
          return false;
        }
        this.$confirm('是否确认审核通过该物流人员信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: this.checkList.join(",")
          }
          this.$api.wlry.adopt(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.checkList = []
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      handleDelete(id) {
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var tempArr = [];
          tempArr.push(id);
          var params = {
            ids: tempArr.join(",")
          }
          this.$api.wlry.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      findTable() {

        let timeComp = timeCompare(this.filters.beg_time, this.filters.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {};
        this.filters.beg_time = this.filters.beg_time==null?'':this.filters.beg_time
        this.filters.end_time = this.filters.end_time==null?'':this.filters.end_time
        Object.assign(param, this.pageinfo, this.filters)
        debugger
        this.$api.wlry.queryTable(param).then((res) => {
          if (+res.body.default.count > 0 && res.body.default.dataset.length >= 1) {
            this.pageinfo.total = Number(res.body.default.count);
            res.body.default.dataset.forEach(function (e, i) {
              if (e.zz === '0') {
                e.zz = '司机'
              }
              if (e.zz === '1') {
                e.zz = '物流人员'
              }
              if (e.zz === '2') {
                e.zz = '仓库管理人员'
              }
              e.created_time = timeFormat(e.created_time)
              e.shsj = timeFormat(e.shsj)


            })
            this.tableData = res.body.default.dataset;
          } else {
            this.pageinfo.total = 0;
            this.tableData = []
          }

        })
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize = val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      reset() {
        var obj = {
          beg_time: '',
          end_time: '',
          gh: '',
          xm: '',
          sfzh: '',
          dh: '',
          zz: '',
          sfsh: '0',
        }
        this.filters = obj;
      },

      handleClick(tab, event) {
        if (tab.name == 'ysh') {
          this.filters.sfsh = '1';
          this.findTable();
        } else if (tab.name == 'wsh') {
          this.filters.sfsh = '0';
          this.findTable();
        }
      },
      add() {
        //重置表单数据
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].resetFields();
        }
        this.readonly = false
        this.dialogTitle = '新增人员'
        this.picshow = true;
        this.editDialog = true
        this.resetData();
        this.dataForm.id = commonServie.getuuid();
        this.dataForm.photo_id = this.dataForm.id
        this.srcList = [],
          this.imgListAnJian = [],
          this.srcListAnJian = [],
          this.imgList = []
      },
      resetData(){
       var obj = {
          id: '',
            gh: '',
            xm: '',
            dh: '',
            sfzh: '',
            zz: '',
            remark: '',
        }
        this.dataForm = obj;
      },
      delRyxx(id) {
        this.$confirm('确定删除该人员信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: id
          };
          this.$api.wlry.del(params).then((res) => {
            if (res.success === 'true') {
              this.$message({message: res.message, type: 'success'})
              this.editDialog = false
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      saveRyxx() {
        //
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.dataForm)
            this.$api.wlry.saveOrupdate(params).then((res) => {
              if (res.success === 'true') {
                this.$message({message: res.message, type: 'success'})
                this.editDialog = false
                this.findTable()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      viewRyxx(id) {
        //清空校验结果
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].clearValidate();
        }
        this.picshow = false;
        var params = {id: id}
        this.dataForm.id = id;
        this.$api.wlry.getInfo(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.data.body.default;
            // this.getPicList(id)
            this.getAnJianPic()
            this.editDialog = true;
            this.dialogTitle = '查看人员'
            this.readonly = true
          })
        })
      },
      editRyxx(id) {
        //清空校验结果
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].clearValidate();
        }
        this.readonly = false
        this.dataForm.id = id
        this.picshow = true
        var params = {id: id}
        this.$api.wlry.getInfo(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.data.body.default;
            // this.getPicList(id)
            this.getAnJianPic();
            this.editDialog = true;
            this.dialogTitle = '编辑人员'
          })
        })
      },

      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.picDialog = true;
      },
      getBeforeUploadAnJian (file) {  // 上传案件图片
        let self = this
        if (this.dataForm.photo_id) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.dataForm.photo_id

          this.imgInfo.filename = file.name
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)
            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                self.imgList = []
                self.$api.upDataPic.getPicWuzheng({ywid: self.dataForm.photo_id}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                    self.picNum = '已上传' + res.content.length + '张图片'

                    self.$message({
                      message: '添加图片成功！',
                      type: 'success'
                    });
                      if (res.content.length >= 1) {
                          for (let i = 0; i < res.content.length; i++) {
                              self.$refs.fileListAnJian.uploadFiles[i].id = res.content[i].id
                              self.imgListAnJian[i] = {
                                  id: res.content[i].id,
                                  url: res.content[i].file_path
                              }
                          }
                      }
                  }
                }).catch(function (err) {
                  // self.$message.error('图片加载失败！');
                })

                //
                // self.$api.upDataPic.getPicWuzheng(window.location.href.split('editIndustry/')[1].split('/')[1]).then(res => {
                //   res.content.forEach(function (e, i) {
                //     self.imgList.push('data:image/png;base64,' + e.file_content)
                //   })
                // })
              }
            })
          });
        } else {
          self.$refs.fileListWuZheng.uploadFiles = []
          this.$message.error('请先选择左边栏的物证！');
          return false
        }
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
      },
      getAnJianPic () {
        let self = this
        var params = {
          ywid: this.dataForm.photo_id
        }
        this.$api.upDataPic.getPicWuzheng(params).then(res => {
          self.srcList = []
          if (res.content === undefined) {

          } else {
                  self.picNum = '已上传' + res.content.length + '张图片'
                      res.content.forEach(function (e, i) {
                          e.url = e.file_path
                      })
                      self.imgListAnJian = res.content


          }

        })
      },
      handleRemoveAnJian (file, fileList) {
          let fileRemove = file
        let self = this
          return this.$confirm('是否确定删除该图片 ?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(function (file, fileList) {
              self.$api.upDataPic.delPicWuzheng({id: fileRemove.id}).then(function (res) {
                  if (res.content === 'default') {
                      self.$message({
                          message: '删除图片成功！',
                          type: 'success'
                      });
                      self.getAnJianPic()
                  }
              })
          }).catch(function (e) {
              throw(e)
              stop()
              return false
          });

      }, // 删除案件图片
      getPicList(wuZhengId) {
        let self = this
        self.imgList = []
        this.$api.upDataPic.getPicWuzheng({ywid: wuZhengId}).then(res => {
          if (res.trueOrFalse === 'false') {
            // loading.close()
            // self.$message.error('图片加载失败！');
          } else {
            self.srcList = []
            if (res.content === undefined) {
              self.picNum = '没有上传图片'
              self.picNumWuZheng = '没有上传图片'
            } else {
              self.picNum = '已上传' + res.content.length + '张图片'
              self.picNumWuZheng = '已上传' + res.content.length + '张图片'
              res.content.forEach(function (e, i) {
                self.srcList.push(e.file_path)
                self.imgList.push(e.file_path)
                // self.imgList.push('data:image/png;base64,' + e.file_content)
              })
            }

            // loading.close()


          }
        }).catch(function () {
          // self.$message.error('图片加载失败！');
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/iconfont/iconfont.css";

  .el-checkbox .el-checkbox__label {
    display: none !important;
  }

  /*  人员审核*/
  .personnel {
    /*width: 300px;*/
    /*height: 230px;*/
    border: 1px solid #ddd;
    background: #fff;
    font-size: 12px;
    color: #858585;
    position: relative;
    margin-bottom: 10px;
    /*角标*/

    .flag {
      position: absolute;
      top: 0;
      right: 0;
      width: 58px;
      height: 28px;
      border-bottom-left-radius: 14px;
      background: #68c43b;
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      /* 未审核*/

      .wrong {
        background: #db4342;
      }
    }

    .flag2 {
      position: absolute;
      top: 0;
      right: 0;
      width: 58px;
      height: 28px;
      border-bottom-left-radius: 14px;
      background: #db4342;
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      /* 未审核*/

      .wrong {
        background: #db4342;
      }
    }

    .msg {
      padding: 10px 18px 0;

      .line {
        position: relative;
        display: flex;
        padding: 5px 0;
        flex-wrap: wrap;
        border-bottom: 1px solid #eee;

        &:first-child {
          border-bottom: 0;
          padding: 5px 0;
        }

        &:last-child {
          border-bottom: 0;
        }

        .pic {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          border: 1px solid #ddd;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;

          img {
            width: 100%;
            height: 100%;
          }
        }

        span {
          /*width: 50%;*/
          display: block;

          i {
            display: inline-block;
            padding-right: 4px;

            &:before {
              font-size: 14px;
            }
          }

          &.block {
            width: 100%;
            padding: 5px 0 0;
          }
        }

        .right-info {
          margin-left: 60px;

          span {
            width: 100%;
            line-height: 22px;

            &.name {
              font-weight: bold;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }

    .bottom {
      height: 28px;
      background: #fafafa;
      display: flex;
      justify-content: center;
      border-top: 1px solid #eee;

      span {
        width: 33.3%;
        position: relative;
        display: block;
        text-align: center;
        line-height: 28px;

        &:after {
          content: "";
          border-left: 1px solid #e8e8e8;
          height: 16px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0, -50%);
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  /deep/.el-tabs__nav-scroll{
    background-color: #fff;
    padding: 0 20px;
  }
</style>
