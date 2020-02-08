<style lang="less" scoped>
  /*@import '../../../styles/deep-ele.less';*/
  /deep/.el-dialog--center{
    padding: 0px;
  }
  /deep/.el-dialog__body {
    padding: 0px;
  }
  /deep/.el-dialog__header {
    background-color: #2470B2;
    padding: 5px 10px 5px;
  }
  /deep/
  .el-dialog {
    .el-dialog__title {
      color: #fff;
      font-size: 14px;
    }
    .el-dialog__header {
      background-color: #2470B2;
      padding: 5px 10px 5px;

      .el-dialog__title {
        color: #fff;
        font-size: 14px;
      }

      .el-dialog__headerbtn {
        top: 6px;
        .el-dialog__close {
          color: #fff
        }
      }
    }
  }
  .saveCk {
    position: relative;
    text-indent: 1em;
    top: 10px;
    border-bottom: 1px solid #e6e6e6;
    line-height: 28px;
  }
</style>
<template>
  <el-dialog
    title="物证信息预览"
    :visible.sync="centerDialogVisible"
    :append-to-body="true"
    @close="closeDia"
    width="60%"
    center
    sytle="position: fixed;left: 50%;top: 50%;transform: translate(-50%, -50%);">
    <div style="line-height: 40px; border-bottom: 1px solid #e6e6e6; width: 100%">
      <el-row style="text-indent: 2em">
        <el-col :span="8">
          <div class="grid-content bg-purple" style="position: relative; left: -15px">
            <span>物证信息：</span><span style="font-weight: bold">{{wzInfo.wzmc}}({{wzInfo.wzsl}}{{wzInfo.wzdw}})</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light" style="position: relative; left: -15px">
            <span>编号：</span><span style="font-weight: bold">{{wzInfo.wzbh}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="display: flex">
            <span>当前状态：</span>
            <div v-if="state==1" style="height: 8px; width: 8px; background: red; border-radius:8px; position: relative; top: 16px"></div>
            <div v-if="state==2" style="height: 8px; width: 8px; background: green; border-radius:8px; position: relative; top: 16px"></div>
            <span style="position: relative; left: -25px; font-weight: bold">{{wzInfo.state}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <div style="height: 260px; width: 100%; position: relative; top: 15px;">
            <div style="width: 416px; height: 260px; margin: 0 auto;overflow: hidden;">
              <img :src="this.getImgBigNew" style="width: 100%; height: 260px;">
            </div>
          </div>
          <div>
            <el-carousel :interval="4000" type="card" height="100px" style="width: 97%; position: relative; top: 30px; margin: 0 auto" @change="getNewImg">
              <el-carousel-item style="margin: 0 auto" v-for="item in imgList" :key="item.file_path">
                <img style="width: 130px; height: 90px; border: 1px solid #b0b0b0; position: relative;left: 48px" :src="item.file_path||emptyImg" width="100%" height="100%" @click="getImg(item.file_path)">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light" style="overflow-x:hidden;overflow-y:auto; height: 410px;border-left: 1px solid #e6e6e6;">
          <div class="saveCk">
            <p><span style="">保管中心：</span> {{wzInfo.cfck_id}}</p>
            <p><span style="display: inline-block; width: 100px">持有人：</span> <span style="position: relative; left: -31px">{{wzInfo.xyr==''?'无':wzInfo.xyr}}</span></p>
            <p><span style="">物证类别：</span> {{wzInfo.wzlb==''?'无':wzInfo.wzlb}}</p>
            <p><span style="">特征描述：</span> {{wzInfo.wztz==''?'无':wzInfo.wztz}}</p>
            <p><span style="">备注信息：</span> {{wzInfo.remark==''?'无':wzInfo.remark}}</p>
          </div>
          <div class="block" style="position: relative; top: 30px; left: 15px; height: 230px">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in wzlcList"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.otherinfo">
                {{activity.item}} <span style="font-weight: bold">{{activity.datetime}}</span>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
    </el-row>
<!--    <div style="height:10px; background: #2570b3; width: 700px; position: relative; left: -25px; top: 5px"></div>-->
  </el-dialog>
</template>

<script>import {timeFormat} from '@/utils/datetime'
  export default {
    name: "casePreview",
    props: ["display","wzxx_id","num"],
    data() {
      return {
        emptyImg:require("@/images/no-img.png"),
        wzInfo:{
          cfck_id: '',
          wzlb:'',
          wztz:'',
          remark:'',
          wzmc:'',
          bh:'',
          state:''
        },
        state: '',
        wzlcList:[],
        tableData: [],
        imgList: [],
        activeNames: ['1'],
        activeNames1: ['1'],
        activeNames2: ['1'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        ],
        getImgBigNew: '',
        fileList:[]
      }
    },
    watch:{
      wzxx_id(newValue, oldValue) {
        //进行相应操作...
        this.initInfo();
        this.initPicList();
        return newValue;
      },
      num(newValue,oldValue){
        return newValue;
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {

      },
      initPicList(){
        var parmas = {
          ywid: this.wzxx_id,
        };
        this.$api.common.getFileList(parmas).then((res) => {
          debugger
          this.imgList = res.body.default.filelist;
          this.getImgBigNew = this.imgList[0].file_path
          // alert(this.fileList.length)
        })
      },
      getNewImg(val) {
        this.getImgBigNew = this.imgList[val].file_path
      },
      closeDia() {
        this.$emit('closrDialog', false)
      },
      initInfo(){
        let self = this
        var params= {
          wzxx_id:this.wzxx_id
        };
        if(typeof params.wzxx_id === 'string'){
          this.$api.common.getWzlc(params).then((res) => {
            if (res.body.default.state === '0') {
              res.body.default.state = '无需入库'
            }
            if (res.body.default.state === '1') {
              res.body.default.state = '未入库'
              self.state = '1'
            }
            if (res.body.default.state === '2') {
              res.body.default.state = '已入库'
              self.state = '2'
            }
            if (res.body.default.state === '3') {
              res.body.default.state = '临时出库'
            }
            if (res.body.default.state === '4') {
              res.body.default.state = '永久出库'
            }
              self.wzInfo = res.body.default;
              if (res.body.default.list.length >= 1) {
                  res.body.default.list.forEach(function (e, i) {
                      e.datetime = timeFormat(e.datetime)
                      e.color = '#0bbd87'
                      e.icon = 'el-icon-circle-check'
                  })
                  res.body.default.list[res.body.default.list.length - 1].icon = ''
              }
              self.wzlcList = res.body.default.list
          })
        }
      }
    },
    computed: {
      centerDialogVisible: function () {
        return this.display
      },
    }
  }
</script>

<style scoped>

</style>

