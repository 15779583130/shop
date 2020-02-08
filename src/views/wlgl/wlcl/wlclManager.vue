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
            车辆信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
           <!-- <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>-->
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="车牌号" prop="cph">
                      <el-input v-model="filters.cph" size="mini" placeholder="请输入车牌号" ></el-input>
                    </el-form-item>
                    <el-form-item label="车辆类型" prop="cllx">
                      <el-input v-model="filters.cllx" size="mini" placeholder="请输入车辆类型"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" clase="large">
                      <el-date-picker
                        size="mini"
                        v-model="filters.beg_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.end_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset" size="mini">重置
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row class="form-line" v-show="more">
                  <el-row class="form-line">
                    <el-form-item label="审核状态" >
                      <el-select v-model="filters.sfsh" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>
                </el-row>-->
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addClxx">新增</el-button>
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
      <el-checkbox-group  v-for="wlcl in tableData" :key="wlcl.id" v-model="checkList">
        <el-col :span="8">
          <div class="personnel" @dblclick="viewClxx(wlcl.id)">
            <div v-if="wlcl.sfsh=='0'" class="flag2">未审核</div>
            <div v-if="wlcl.sfsh=='1'" class="flag">已审核</div>
            <div class="msg">
              <div class="line">
                <div class="pic" @click="viewClxx(wlcl.id)"><img :src="wlcl.imgurl||emptyImg" alt=""> </div>
                <div class="right-info">
                  <span class="name">{{wlcl.cllx}}</span>
                </div>
              </div>
<!--              <div class="line">-->
<!--                <span class="name">{{wlcl.cllx}}</span>-->
<!--                <span>创建时间：{{wlcl.created_time}}</span>-->
<!--              </div>-->
              <div class="line">
                <span style="width: 120px;"><i class="iconfont icon-wuliu"></i>{{wlcl.cph}}</span>
                <span style="display:inline-block;padding-left: 38px; line-height: 24px;">创建时间：{{wlcl.created_time}}</span>
              </div>
              <div class="line" v-if="wlcl.sfsh=='1'">
                <span>审核人员：{{wlcl.shrxm}}</span>
                <span style="display:inline-block;padding-left: 38px;">审核时间：{{wlcl.shsj}}</span>
              </div>

            </div>
            <div class="bottom">
                <span v-if="wlcl.sfsh=='0'">
                  <el-checkbox  style="color: #fff; width: 15px; overflow: hidden" :key="wlcl.id" :label="wlcl.id"></el-checkbox>
                  <!--                <el-checkbox v-if="wlcl.sfsh=='1'" disabled="disabled"></el-checkbox>-->
                </span>
              <span v-if="wlcl.sfsh=='0'" class="el-icon-check" @click="shClxx(wlcl.id)" title="审核"></span>
              <span  class="el-icon-view" @click="viewClxx(wlcl.id)" title="查看"></span>
              <span v-if="wlcl.sfsh=='0'" class="el-icon-edit" @click="editClxx(wlcl.id)" title="编辑"></span>
              <span class="el-icon-delete" @click="delClxx(wlcl.id)" title="删除"></span>
            </div>
          </div>
        </el-col>
      </el-checkbox-group>
    </el-row>

<div class="page">
      <div class="page-content">
        <el-pagination
          @size-change="HandleSizeChange"
          @current-change="HandleCurrentChange"
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
      width="50%"
      style="">
      <el-form :model="clxxForm" ref="clxxForm" label-width="180px" :rules="clxxRules" size="mini" label-position="right" style="height: 300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="车牌号" prop="cph">
              <el-input v-model="clxxForm.cph" size="mini" placeholder="请输入车牌号" :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆类型" prop="cllx">
              <el-input v-model="clxxForm.cllx" size="mini" placeholder="请输入车辆类型" :readonly="readonly" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆照片" prop="clzp" >
              <el-upload
                ref="fileListAnJian"
                action="#"
                :on-change="getBeforeUploadAnJian"
                :on-remove="handleRemoveAnJian"
                :on-preview="handlePictureCardPreview"
                :file-list="imgListAnJian"
                list-type="picture-card"
                :auto-upload="false"
                accept=".jpg,.png,.gif"
                :class="{view:hideUpload}">
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>


          </el-col>

          <!--<el-col :span="8">-->
            <!--<div class="grid-content bg-purple">-->
              <!--<div style="width: 500px; height: 120px; position: relative; left: 23px;">-->
                <!--<div style="height: 120px; float: left; width: 20px; margin-right: 10px">-->
                  <!--&lt;!&ndash;                          <i class="el-icon-arrow-left" style="position: relative; top: 45px; font-size: 20px"></i>&ndash;&gt;-->
                <!--</div>-->
                <!--<div style="width: 410px; overflow-y: hidden; overflow-x: auto; height: 130px;">-->
                  <!--<div style="width: 700px;">-->


                    <!--<div class="demo-image__preview" style="position: relative;  float: left;">-->
                      <!--<div v-for="(item, index) of imgListAnJian" style="width: 100px; height: 100px; float: left; margin-left: 10px;position: relative;">-->
                        <!--<span v-show="delIcon" style="font-size: 20px; color: red; display: inline-block; height: 30px; width: 30px; z-index: 999; position: relative; left: 85px"  @click="handleRemoveAnJian(item.id)"><i class="el-icon-error"></i></span>-->
                        <!--<el-image-->
                          <!--style="width: 100px; height: 100px; position: relative; top: -20px"-->
                          <!--:key="item.id"-->
                          <!--:src="item.file_path"-->
                          <!--:preview-src-list="srcListAnJian">-->
                        <!--</el-image>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div style="height: 120px;width: 20px; float: right; position: relative; top: -85px; left: -30px">-->
                  <!--&lt;!&ndash;                          <i class="el-icon-arrow-right" style="position: relative; font-size: 20px"></i>&ndash;&gt;-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-col>-->

        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
               <el-button type="primary" size="mini"  v-show="delIcon" @click="saveClxx">保存</el-button>
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
              tableData: [],
              emptyImg: require("../../../images/no-img.png"),
              filters:{
                beg_time:'',
                end_time:'',
                cph:'',
                cllx:'',
                sfsh:''

              },
              editDialog:false,
              clxxForm:{
                  cph:'',
                  cllx:'',
                  id:'',
                  clzp_id:'',
              },
              hideUpload:false,
              showUpload:false,
              clxxRules:{
                cph: [{required: true, message: '这是必填字段', trigger: 'blur'}],
                cllx:[{required: true, message: '这是必填字段', trigger: 'blur'}],
                clzp:[{required: false, message: '这是必填字段', trigger: 'blur'}]
              },

              more: false,
              activeName: 'wsh',
              options: [
                {value: '0', label: '未审核'},
                {value: '1', label: '已审核'}
              ],
              tableData:[],
              //分页信息
              currentPage: 1,
              total: 0,
              pageSize: 9,
              srcList: [],
              imgListAnJian: [], // 案件图片列表
              srcListAnJian: [], // 案件大图显示
              imgList: [],
              dialogTitle:'新增车辆',
              readonly:false,
              delIcon:true,
              //分页信息
              pageinfo: {
                pagenum: 1,
                total: 0,
                pagesize: 9
              }
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
        init () {
          this.filters.sfsh='0'
          this.findTable()
        },
        handleClick(tab, event) {

          this.findTable()
        },
        findTable() {

          let timeComp = timeCompare(this.filters.beg_time, this.filters.end_time)
                 if (!timeComp.status) {
                   this.$message(timeComp.msg)
                   return false
                 }

          if(this.activeName=='wsh'){
            this.filters.sfsh='0'
          }else{
            this.filters.sfsh='1'
          }


          this.filters.beg_time = this.filters.beg_time==null?'':this.filters.beg_time
          this.filters.end_time = this.filters.end_time==null?'':this.filters.end_time
          var parms = {};
          Object.assign(parms, this.pageinfo, this.filters)
          this.$api.wlcl.queryTable(parms).then((res) => {
            if (+res.body.default.count > 0 && res.body.default.dataset.length >= 1) {
              this.pageinfo.total = Number(res.body.default.count);
              res.body.default.dataset.forEach(function (e, i) {
                e.created_time = timeFormat(e.created_time)
                e.shsj = timeFormat(e.shsj)
              })
              this.tableData = res.body.default.dataset;


            }else{
                this.tableData=[]
                this.pageinfo.total=0
            }
          })
        },
        HandleSizeChange(val) {
          this.pageinfo.pagesize = val
          this.findTable();
        },
        HandleCurrentChange(val) {
          this.pageinfo.pagenum = val;
          this.findTable();
        },
        reset(){
          this.filters.beg_time = ''
          this.filters.beg_time=''
            this.filters.end_time=''
            this.filters.cph=''
            this.filters.cllx=''


        },
        addClxx(){
          this.hideUpload = false
          this.delIcon = true
          this.readonly = false
          this.editDialog = true
          this.clxxForm ={
            cph:'',
            cllx:'',
            id:commonServie.getuuid(),
          }
          this.clxxForm.clzp_id = this.clxxForm.id
          this.srcList=[],
            this.imgListAnJian=[],
            this.srcListAnJian=[],
            this.imgList= []
        },
        saveClxx(){
          //
          this.$refs.clxxForm.validate((valid) => {
            if (valid) {
              let params = Object.assign({}, this.clxxForm)
              this.$api.wlcl.saveOrupdate(params).then((res) => {
                if (res.success == 'true') {
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
        viewClxx(id){
          this.delIcon = false
          this.hideUpload = true
          this.clxxForm.id = id
          var params = {id:id}
          this.$api.wlcl.getInfo(params).then((res) => {
            this.$nextTick(() => {
              this.clxxForm = res.body.default;
             this.editDialog = true;
              this.dialogTitle = '查看车辆'
              this.readonly = true
              this.getAnJianPic()
            })
          })
        },
        editClxx(id){
          this.readonly = false
           this.hideUpload = false
          this.delIcon = true
          var params = {id:id}
          this.clxxForm.id = id
          this.$api.wlcl.getInfo(params).then((res) => {
            this.$nextTick(() => {
              this.clxxForm = res.body.default;
              this.editDialog = true;
              this.dialogTitle = '编辑车辆'
              this.getAnJianPic()
            })
          })
        },
        delClxx(id){
          this.$confirm('确定删除该车辆信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = {
              ids: id
            };
            this.$api.wlcl.del(params).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                this.editDialog = false
                this.findTable()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          })
        },
        shClxx(id){
          this.$confirm('是否确认审核通过该物流车辆信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = {
              ids: id
            };
            this.$api.wlcl.adopt(params).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                this.editDialog = false
                this.findTable()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          })
        },
        plsh() {
          if (this.checkList.length <= 0) {
            this.$message({message: '请先选择要审核的物流车辆', type: 'warning'})
            return false;
          }
          this.$confirm('是否确认审核通过该物流车辆信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = {
              ids: this.checkList.join(",")
            }
            this.$api.wlcl.adopt(params).then((res) => {
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

        handlePictureCardPreview (file) {
          this.dialogImageUrl = file.url;
          this.picDialog = true;
        },
        getBeforeUploadAnJian (file) {  // 上传案件图片
          let self = this
          if (this.clxxForm.clzp_id) {
            this.imgInfo = {}
            this.baseImgList = []
            this.imgInfo.ywid = this.clxxForm.clzp_id

            this.imgInfo.filename = file.name
            this.imgInfo.filesize = file.size
            this.getBase64(file.raw).then(res => {
              self.imgInfo.filebase64 = res
              self.baseImgList.push(self.imgInfo)
              self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
                if (res.content.data[0].success === 'true'){
                  self.imgList = []
                  self.$api.upDataPic.getPicWuzheng({ywid: self.clxxForm.clzp_id}).then(res => {
                    if (res.trueOrFalse === 'false') {
                      // self.$message.error('图片加载失败！');
                    } else {
                      self.picNum = '已上传' + res.content.length + '张图片'

                      self.$message({
                        message: '添加图片成功！',
                        type: 'success'
                      });
                      self.srcList = []
                      // self.srcListAnJian = []
                        self.imgListAnJian = res.content
                      self.imgListAnJian.forEach(function (e, i) {
                        e.url = e.file_path
                      })
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
            ywid: this.clxxForm.clzp_id
          }

          this.$api.upDataPic.getPicWuzheng(params).then(res => {

            self.srcList = []
            if (res.content === undefined) {
              self.picNum = '没有上传图片'
            } else {
              if (res.content.length >= 1) {
                self.picNum = '已上传' + res.content.length + '张图片'
                self.imgListAnJian = res.content
                self.imgListAnJian.forEach(function (e, i) {
                  e.url = e.file_path
                })

              }
            }

          })
        },
        handleRemoveAnJian (file) {
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

<style  lang="less" scoped>
  @import "../../../styles/iconfont/iconfont.css";
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
        padding: 3px 0;
        flex-wrap: wrap;
        border-bottom: 1px solid #eee;
        align-items: center;
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
          min-height: 44px;
          span {
            width: 100%;
            line-height: 22px;

            &.name {
              font-weight: bold;
              font-size: 18px;
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
