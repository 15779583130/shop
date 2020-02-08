<template>
  <div>
      <!--
          close-on-click-modal => (是否可以通过点击 modal 关闭 Dialog)
          close-on-press-escape => (是否可以通过按下 ESC 关闭 Dialog)
          append-to-body => (Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true)
          visible.sync => (是否显示 Dialog，支持 .sync 修饰符)
          before-close => (关闭前的回调，会暂停 Dialog 的关闭)
       -->
       <!--
           action => (必选参数，上传的地址)
           multiple => (是否支持多选文件) (boolean)
           auto-upload => (是否在选取文件后立即进行上传)
           on-change => (文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用)    (function(file, fileList))
           before-remove => (删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。)   (function(file, fileList))
           on-preview => (点击文件列表中已上传的文件时的钩子)   (function(file))
           before-upload => (上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。)     (function(file))
           file-list => (上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}])    (array)
        -->
    <el-dialog
      title="文件列表"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :visible.sync="dialogUpLoad"
      style="width: 70%; margin: 0 auto"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="false"
        :multiple="false"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="handleChange"
        :before-remove="handleDel"
        :on-preview="handlePreview"
        :class="{view:isView}"
         accept=".doc, .docx, .pdf, .xls,.xlsx">
        <el-button size="small" type="primary" v-if="!isView" >点击上传</el-button>
<!--        <div style="height: 240px; overflow-y: auto; position: relative; top: -10px">-->
      </el-upload>
      <div  v-if="!isView" style="margin: 15px 0px">只能上传doc/docx/pdf/xls/xlsx文件</div>
      <div style="min-height: 250px" @click.stop="cancelMp">
        <el-row v-for="(item, index) of fileList" style="width: 98%; line-height: 35px; margin: 0 auto; border-bottom: 1px #9f9f9f dashed">
          <el-col :span="12" style="display: inline-block;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;text-align: left"><i class="el-icon-paperclip"></i>{{item.file_title}}</el-col>
          <el-col :span="12">
            <span class="file_item_btn"  id="fileDwonLoadHome" @click.stop="downLoadFile(item.file_path, item.file_title)" ><span class="el-icon-download"></span>&nbsp;下载</span>
            <span class="file_item_btn"  v-if="!isView" id="fileDelHome" @click.stop="delFile(item)"><span class="el-icon-delete"></span>&nbsp;删除</span>
            <span class="file_item_btn"  id="fileDwonLoadHome" @click.stop="viewFile(item.file_path)"><span class="el-icon-view"></span>&nbsp;预览</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {downLoadFile} from "../../../utils/downLoadFile";

export default {
  name: 'UpLoadFile',
  props: ['display', 'yssqid', 'getFileData', 'isView'],
  data () {
    return {
      fileInfo: {},
      fileList: []
    }
  },
  methods: {
    init () {
    },
    delFile(item){
      let self = this
      return this.$confirm('是否确定删除该文件 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function (file, fileList) {
        self.$api.upDataPic.delPicWuzheng({id: item.id}).then(function (res) {
          if (res.content === 'default') {
            self.$message({
              message: '删除文件成功！',
              type: 'success'
            });
            self.getFileList()
          }
        })
      }).catch(function (e) {
        throw(e)
        stop()
        return false
      });
    },
    downLoadFile (url, fileName) {
      let downloadFileUrl = url
      let elemIF = document.createElement("iframe");
      elemIF.src = downloadFileUrl;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    },
    viewFile(url){
      window.open(
        // 'https://view.officeapps.live.com/op/view.aspx?src=' + this.yuming + '/anli?id=' + row.id,
        url
      )
    },
    cancelMp(){
      //do nothing,取消冒泡
    },
    handleClose () {
      this.$emit('passData', false)
    },
    handleChange (file) {
      let fileSize = sessionStorage.getItem('fileSize')
      if (file.size <= fileSize * 1024 *1024) {
        this.beforeAvatarUpload(file)
        let self = this
        this.fileInfo.ywid = this.yssqid
        this.fileInfo.filename = file.name
        this.fileInfo.filesize = file.size
        this.getBase64(file.raw).then(res => {
          self.fileInfo.filebase64 = res
          self.$api.upDataPic.upDataPic(self.fileInfo).then(res => {
            self.getFileList()
          })
        })
      } else {
        this.$message.error('上传的文件不能超过' + fileSize + 'M')
      }
    },
    handleDel (file, fileList) {
      if (this.isView) {
        this.$message.error('无法删除！')
        return false
      } else {
        let fileRemove = file
        let self = this
        return this.$confirm('是否确定删除该文件 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function (file, fileList) {
          self.$api.upDataPic.delPicWuzheng({id: fileRemove.id}).then(function (res) {
            if (res.content === 'default') {
              self.$message({
                message: '删除文件成功！',
                type: 'success'
              })
            }
          })
        }).catch(function (e) {
          throw (e)
          stop()
          return false
        })
      }
    },
    getFileList () {
      if (this.getFileData) {
        let self = this
        this.$api.upDataPic.getPicWuzheng({ywid: this.yssqid}).then(res => {
          self.fileList = res.content || []
          self.fileList.forEach(function (e, i) {
            self.fileList[i].name = e.file_title
          })
        })
      }
    },
    getBase64 (file) { // 转成base64
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    // 上传前的配置
    beforeAvatarUpload (file) {
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过2M!')
      // }
      let excelfileExtend = '.doc, .docx, .pdf, .xls,.xlsx' // 设置文件格式
      let fileExtend = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase()
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message.error('只能上传.doc, .docx, .pdf, .xls,.xlsx格式')
        return
      }
    },
    handlePreview (file) {
      let downloadFileUrl = file.file_path
      let elemIF = document.createElement('iframe')
      elemIF.src = downloadFileUrl
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)

      // var a = document.createElement('a')
      // var event = new MouseEvent('click')
      // a.download = '下载图片名称'
      // a.href = file.file_path
      // a.dispatchEvent(event)
    }
  },
  watch: {
    getFileData (newVal, oldVal) {
      this.getFileList()
    }
  },
  created () {
    this.init()
  },
  computed: {
    yssqId: function () {
      return this.yssqId
    },
    dialogUpLoad: function () {
      return this.display
    }
  }
}
</script>

<style scoped>
  /deep/ .el-dialog__body{
    padding: 0px 20px 20px 20px;
  }
  /deep/ .el-upload{
    display: inline-block;
    width: 50px;
    text-align: left;
    cursor: auto;
    outline: 0;
  }

 .view .el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{
    display: none;
  }
  .file_item_btn{
    /*width: 30px;*/
    float: right;
    color: #2b85e4;
    margin-right: 15px;
    cursor: pointer;
  }
</style>
