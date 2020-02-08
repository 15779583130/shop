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
  .hffk-detail {width: 98%; margin: 0 auto; background: #fff;border: 1px solid #dddddd; padding-bottom: 20px;
    .hffk-titel {width: 100%; line-height: 30px; border-bottom: 1px solid #dddddd; text-indent: 1em;font-weight: bold;}
    .fkbt-title {width: 100%; margin-top: 5px;
      p{color: #9f9f9f; line-height: 20px; width: 95%; margin: 0 auto;margin-top: 8px}
      .tzsx {color: #000; margin-top: 0}
      .fkbt-img{width: 125px; height: 90px; margin: 10px 0 10px 10px}
    }
  }
  .hfnr-content {width: 90%; margin: 0 auto; margin-top: 10px}
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            回复反馈
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 10px">
      <el-col :span="10">
        <div class="hffk-detail">
          <div class="hffk-titel">详情</div>
          <div class="fkbt-title">
            <p>反馈标题</p>
            <p class="tzsx">{{formInline.fkbt}}</p>
            <p>反馈内容</p>
            <p class="tzsx">{{formInline.fknr}}</p>
            <p>缩略图</p>
            <!-- <img :src="fkxqImg" class="fkbt-img"> -->
            <el-upload
              style="position: relative; left: 10px; display: inline-block"
              ref="fileListAnJian"
              action="#"
              :on-preview="handlePictureCardPreview"
              :file-list="imgListFktp"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg,.png,.gif"
              :class="{view:hideUpload}">
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <div style="position:relative; left: 10px">
             <p style="position: relative; left: -10px; top: -5px">附件</p>
            <el-button type="success" size="small" @click="dialogUpLoadClick('1')" plain>查看文件</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="hffk-detail">
          <div class="hffk-titel">回复</div>
          <div class="hfnr-content">
            <el-row>
              <el-col :span="24">
                <el-form ref="form" :model="formInline" label-width="115px" size="mini" :rules = "dataFormRules">
                  <el-row>
                    <el-col :span="24" v-if="formInline.sfhf=='1'">
                      <el-form-item label="回复时间" >
                        <el-input v-model="formInline.hfsj" style="width:100%" :readonly="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                  <el-form-item label="回复内容" prop="hfnr">
                    <el-input v-model="formInline.hfnr" style="width:100%"
                              placeholder="请填写回复内容"  type="textarea"
                              :rows="4" :readonly="formInline.sfhf=='1'"
                             ></el-input>
                  </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                  <el-form-item label="缩略图">
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
                      :class="{view:formInline.sfhf=='1'}">
                      <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="附件">
                         <el-button type="success" size="small" @click="dialogUpLoadClick('2')" plain>{{fjbt}}</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="float: right; position: relative; bottom: 0">
                  <el-button type="primary" size="mini"  @click="saveHfxx()" v-if="formInline.sfhf!='1'">
                    回复
                  </el-button>
                  <el-button type="primary" size="mini" @click="goBack">
                    返回
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="picDialog" title="图片预览"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal-append-to-body='false'
               :modal="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
     <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
  </el-card>

</template>
<script>
import {timeFormat,timeCompare} from '@/utils/datetime'
import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
  export default {
      name: 'fkxxhf',
       components: {uploadFile},
    data() {
      return {
        fkxqImg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3437217665,1564280326&fm=26&gp=0.jpg',
          formInline:{},
          hideUpload:true,
          imgListAnJian: [],
          dialogImageUrl: '',
          picDialog:false,
          imgListFktp:[],
          dataFormRules: {
            hfnr: [{required: true, message: '这是必填字段', trigger: 'blur'},
                  {min:0,max:1000,message:'最多可输入1000个字符'}]
          },
          hideUploadhf:false,
          yssqid: '',
          getFileData: false,
          dialogUpLoad: false,
          isView:false,
          fjbt:'上传文件'
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
         this.formInline = JSON.parse(sessionStorage.getItem('fkzxhf'))
         this.formInline.hfsj = timeFormat(this.formInline.hfsj)
         if(this.formInline.sfhf =='1'){
           this.fjbt = '查看文件'
         }else{
           this.fjbt = '上传文件'

         }
         this.getFkPic()
         this.getHfxxPic()

      },
      getFkPic () {
        let self = this
        var params = {
          ywid: this.formInline.id+'fktp'
        }

        this.$api.upDataPic.getPicWuzheng(params).then(res => {

          if (res.content === undefined) {
            self.picNum = '没有上传图片'
          } else {
            if (res.content.length >= 1) {
              self.picNum = '已上传' + res.content.length + '张图片'
              self.imgListFktp = res.content
              self.imgListFktp.forEach(function (e, i) {
                e.url = e.file_path
              })

            }
          }

        })
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.picDialog = true;
      },
      getBeforeUploadAnJian (file) {  // 上传案件图片
        let self = this
        if (this.formInline.id) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.formInline.id+"hftp"

          this.imgInfo.filename = file.name
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)
            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                //self.imgList = []
                self.$api.upDataPic.getPicWuzheng({ywid: self.formInline.id+'hftp'}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                    self.picNum = '已上传' + res.content.length + '张图片'

                    self.$message({
                      message: '添加图片成功！',
                      type: 'success'
                    });

                      self.imgListAnJian = res.content
                    self.imgListAnJian.forEach(function (e, i) {
                      e.url = e.file_path
                    })
                  }
                }).catch(function (err) {
                })

              }
            })
          });
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
      getHfxxPic () {
        let self = this
        var params = {
          ywid: this.formInline.id+'hftp'
        }

        this.$api.upDataPic.getPicWuzheng(params).then(res => {


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


      },
      saveHfxx(){
           this.$refs.form.validate((valid) => {
             if (valid) {
               this.$confirm('确定是否提交回复？', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 let params = Object.assign({}, this.formInline)
                 this.$api.fkzx.saveInfo(params).then((res) => {
                   if (res.success == 'true') {
                     this.$message({message: res.message, type: 'success'})
                     this.$util.goBack(this)
                   } else {
                     this.$message({message: res.message, type: 'error'})
                   }
                 })
               })

             }
             })
      },
      goBack(){
        this.$util.goBack(this)
      },
      dialogUpLoadClick (value) {
        if(value=='1'){
          this.yssqid = this.formInline.id+'fkfj'
          this.isView = true
        }else{
          this.yssqid = this.formInline.id+'hffj'
          if(this.formInline.sfhf =='1'){
            this.isView = true
          }else{
            this.isView = false
          }

        }

        this.dialogUpLoad = true
        this.getFileData = true
      },
      getData (val) {
          this.dialogUpLoad = val
          this.getFileData = val
      }
    }
  }
</script>
