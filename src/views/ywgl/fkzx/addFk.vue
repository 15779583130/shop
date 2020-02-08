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
  .jinggao {height: 76px; width: 99%; background: #fffdee; border: 1px solid #edd28b; margin: 0 auto;
    .jg-title {margin-left: 10px; margin-top: 10px}
    img {position: relative; top: 2px}
    span {font-weight: bold; line-height: 20px}
    .fakui-content { position: relative; left: 18px}
  }
  .jinggao2{height: 76px; width: 99%;border: 1px solid #edd28b; margin: 0 auto;
    .jg-title {margin-left: 10px; margin-top: 10px}
    img {position: relative; top: 2px}
    span {font-weight: bold; line-height: 20px}
    .fakui-content { position: relative; left: 18px}
  }
  .mypre{
    color: #909399;
  }
  .mycontent{
    /*background: pink;*/
    p{
      color:black;
    }
  }
  .hffk-detail {width: 99%; margin: 0 auto; margin-top: 10px; background: #fff;border: 1px solid #dddddd; padding-bottom: 20px;
    .hffk-titel {width: 100%; line-height: 30px; border-bottom: 1px solid #dddddd; text-indent: 1em;font-weight: bold;}
    .fkbt-title {width: 100%; margin-top: 5px;
      p{color: #9f9f9f; line-height: 20px; width: 95%; margin: 0 auto;margin-top: 8px}
      .tzsx {color: #000; margin-top: 0}
      .fkbt-img{width: 125px; height: 90px; margin: 10px 0 10px 10px}
    }
  }
  .hfnr-content {width: 80%; margin: 0 auto; margin-top: 20px}
  .danweiName {width: 98%; background: #f5f5f5; line-height: 40px; margin: 0 auto; margin-top: 10px; border:1px solid #ebebeb; }
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            新增反馈
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 10px">
      <el-col :span="24">
        <div class="jinggao">
          <div class="jg-title">
            <img src="../../../images/jinggao.jpg">
            <span>感谢您的反馈，你的反馈对我们非常重要，能够帮助我们改善系统！</span>
            <div class="fakui-content">
              <p>
              Q:如何编写好的反馈信息
              </p>
              <p>
              A:标题简介，体现重点，反馈内容加以补充说明，每个反馈发送一条意见，尽量上传截图和附件!
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 10px">
        <div class="jinggao2" style="background:#F2F6FC;height:40px">
          <div class="jg-title">
<!--            <img src="../../../images/jinggao.jpg">-->
<!--            <span>感谢您的反馈，你的反馈对我们非常重要，能够帮助我们改善系统！</span>-->
            <div class="fakui-content mycontent">
              <p>
                <span class="mypre">反馈单位</span> {{formInline.fk_dept_name}} <span style="margin-right:100px"></span>
                <span class="mypre">反馈人员</span> {{formInline.fk_name}} <span style="margin-right: 100px"></span>
                <span class="mypre">联系方式</span> {{formInline.fk_phone}}
              </p>
<!--              <p>-->
<!--                反馈人员 {{formInline.fk_name}}-->
<!--              </p>-->
<!--              <p>-->
<!--                联系方式 {{formInline.fk_phone}}-->
<!--              </p>-->
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 10px">
      <el-col :span="24">
        <div class="hffk-detail">
<!--          <div class="danweiName">-->
<!--            <el-row style="margin-left: 10px">-->
<!--              <el-col :span="8">反馈单位 {{formInline.fk_dept_name}}</el-col>-->
<!--              <el-col :span="8">反馈人员 {{formInline.fk_name}}</el-col>-->
<!--              <el-col :span="8">联系方式 {{formInline.fk_phone}}</el-col>-->
<!--            </el-row>-->
<!--          </div>-->
          <div class="hfnr-content">
            <el-row>
              <el-col :span="19">
                <el-form ref="form" :model="formInline" label-width="115px" size="mini" :rules = "dataFormRules">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="反馈类型" prop="fklx">
                        <el-radio v-model="formInline.fklx" label="1">报告问题</el-radio>
                        <el-radio v-model="formInline.fklx" label="2">功能建议</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="反馈标题" prop="fkbt">
                        <el-input v-model="formInline.fkbt" style="width:100%"
                                  placeholder="反馈标题"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="反馈内容" prop="fknr">
                        <el-input v-model="formInline.fknr" style="width:100%"
                                  placeholder="反馈内容"  type="textarea"
                                  :rows="4"
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
                          accept=".jpg,.png,.gif">
                          <i slot="default" class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="附件">
                         <el-button type="success" size="small" @click="dialogUpLoadClick" plain>上传文件</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div style="float: left; position: relative; bottom: 0; left: 115px">
                        <el-button type="primary" size="mini"  @click="saveFkxx()">
                          提交反馈
                        </el-button>
                       <!-- <el-button size="mini" @click="saveWzxx('1')">
                          暂存
                        </el-button> -->
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
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
    <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad"></upload-file>
  </el-card>

</template>
<script>
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";

    export default {
      name: 'fkxxbj',
       components: {uploadFile},

        data() {
            return {
                fkxqImg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3437217665,1564280326&fm=26&gp=0.jpg',
                filters: {wzbhormc: ''},
                radio: '1',
                formInline:{},
                dataFormRules: {
                  fklx: [{required: true, message: '这是必填字段', trigger: 'blur'}],
                  fkbt: [{required: true, message: '这是必填字段', trigger: 'blur'},
                          {min:0,max:200,message:'最多可输入200个字符'}],
                  fknr: [{min:0,max:1000,message:'最多可输入1000个字符'}]

                },

                dialogImageUrl: '',
                picDialog:false,
                imgListAnJian: [], // 案件图片列表
                //imgList: [],
                yssqid: '',
                getFileData: false,
                dialogUpLoad: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {

              this.formInline = JSON.parse(sessionStorage.getItem('fkzxbj'))
              this.getAnJianPic()

            },
            saveFkxx(){
             this.$refs.form.validate((valid) => {
               if (valid) {
                 this.$confirm('确定是否提交反馈？', '提示', {
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
        handlePictureCardPreview (file) {
          this.dialogImageUrl = file.url;
          this.picDialog = true;
        },
        getBeforeUploadAnJian (file) {  // 上传案件图片
          let self = this
          if (this.formInline.id) {
            this.imgInfo = {}
            this.baseImgList = []
            this.imgInfo.ywid = this.formInline.id+"fktp"

            this.imgInfo.filename = file.name
            this.imgInfo.filesize = file.size
            this.getBase64(file.raw).then(res => {
              self.imgInfo.filebase64 = res
              self.baseImgList.push(self.imgInfo)
              self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
                if (res.content.data[0].success === 'true'){
                  //self.imgList = []
                  self.$api.upDataPic.getPicWuzheng({ywid: self.formInline.id+'fktp'}).then(res => {
                    
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
        getAnJianPic () {
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
              debugger
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
        dialogUpLoadClick () {
          this.yssqid = this.formInline.id+'fkfj'
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
