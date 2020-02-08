<template>
  <div class="wrapper">
    <div class="page-title">申请信息</div>
    <div class="form-box">
      <div class="item">
        <label>案件编号</label>
        <span class="value">{{formInline.ajbh}}</span>
      </div>
      <div class="item">
        <label>案件名称</label>
        <el-tag @click="handlerByName()">{{formInline.ajmc}}</el-tag>
      </div>
      <div>
        <el-button type="success" size="small" @click="dialogUpLoadClick" plain>上传文件</el-button>
      </div>

    </div>
    <div class="main">
      <el-row style="height: 100%;">
        <el-col :span="8" class="side">
          <div class="inner">
            <div class="title">在库清单</div>
            <div class="search">
              <el-col :span="24">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" size="mini">全选
                </el-checkbox>
              </el-col>
            </div>
            <div class="l-content">
              <el-checkbox-group v-model="checkArr" v-for="item in checkList" :key="item.id">
                <el-checkbox :label="item.id" @change="chooseItem(item)" :key="item.id">
                  <div class="img"><img :src="item.imgurl || emptyImg"></div>
                  <div class="msg">
                    <span>{{item.wzmc}}</span>
                    <span>{{item.wzsl}}</span>
                    <span>{{item.ckmc}}</span>

                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="side">
          <div class="inner">
            <div class="c-content">
              <div class="title">已勾选<i>{{checkSl}}</i>件物证</div>
              <el-form ref="form" :model="form" class="target-stage" :rules="dataFormRules">

                <el-form-item prop="czsj" label="预处理日期">
                  <el-date-picker
                    v-model="form.czsj"
                    type="date"
                    placeholder="选择日期" size="mini"
                    format="yyyy-MM-dd"
                    value-format="yyyyMMdd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <span>物流配送</span>
                  <el-switch
                    v-model="form.iswl" @change="changeWlps()">
                  </el-switch>
                </el-form-item>
                <el-form-item label="处置原因" prop="czyy">


                  <el-select v-model="form.czyy" placeholder="请选择" style="width: 80%" size="mini">
                    <el-option v-for="item in czyyOptions" :key="item.value" :label="item.text"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="width: 100%; margin-top: 10px" @click="submitForm()" :disabled="scrkqd">生成清单
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="side">
          <div class="inner">
            <div class="title">任务清单
              <el-button type="warning" style="" class="all-submit" @click="submitRksq()">全部提交</el-button>
            </div>
            <div class="r-content">
              <div class="item" v-for="ywcb in dycbList" :key="ywcb.id">
                <div class="order-title">
                  <span>{{ywcb.zrwdh}}</span>

                </div>
                <div class="stage-info">
                  <span class="address">{{ywcb.ckmc}}<i v-if="ywcb.iswl=='1'" class="wuliu iconfont icon-wuliu" ></i> </span>
                  <div class="msg">
                    <span><i>处置原因</i>{{fromateCzyy(ywcb.sqyy)}}</span>
                    <span><i>预处理日期</i>{{ywcb.wzrq}}</span>
                    <span><i>物品数量</i>{{ywcb.wzsl}}件</span>
                  </div>
                  <div class="bottom-line">
                    <!-- <el-button class="submit">提交</el-button> -->
                    <div class="func-icon" style="position: absolute;right: 20px;">
                      <i class="icon el-icon-delete" @click="delDkcb(ywcb.id)"></i>
                      <i class="icon el-icon-s-unfold" @click="getRKwzmx(ywcb.id)"></i>
                    </div>
                  </div>
                  <div class="goods-list" v-show="ywcb.show">
                    <div class="g-item" v-for="item in dywzmxList" :key="item.id">
                      <div class="img"><img :src="item.imgurl || emptyImg"></div>
                      <div class="msg">
                        <div class="line">

                           <span class="one">{{item.wzmc}}（{{item.wzsl}}） | {{item.wzbh}}</span>
                        </div>
                       <!-- <div class="line">
                          <span style="text-align: left;"><i>放置位置</i>{{item.cfwz}}</span>

                        </div> -->
                        <div class="line">
                           <span style="text-align: left;"><i>物证类别</i>{{item.wzlb}}</span>
                         </div>

                        <div class="line">
                          <span><i>特征描述</i>{{item.wztz}}</span>
                          <div class="func-icon">
                            <i class="icon el-icon-delete" @click="delDkcbWzmx(item.id)"
                            ></i>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad"></upload-file>
  </div>
</template>

<script>
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
   import {timeFormat} from '@/utils/datetime'
  export default {
    name: 'test',
     components: {uploadFile},
    data() {
      return {
        yssqid: this.$route.params.id,
        getFileData: false,
        dialogUpLoad: false,
        num: '',
        sInput: '',
        checkAll: false,
        rwcbCount: 0,
        checkList: [],
        checkArr: [],
        dycbList: [],
        dywzmxList: [],
        formInline: this.$route.params,
        dataFormRules: {
          czsj: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          czyy:[{required: true, message: '这是必填字段', trigger: 'blur'}]
        },
        list: [],
        ischeck: false,
        isIndeterminate: false,
        checkSl: 0,
        valueSelect: '',
        radio2: 0,
        form: {
          ywzbid: this.$route.params.id,
          ids: '',
          iswl: false,
          czyy: '',
          czsj: '',
          wtr_id: '',
          yyfs: ''

        },
        scrkqd: false,
        czyyOptions:[
          {value: '1', text: '返还当事人'},
          {value: '2', text: '转罚没物资'},
          {value: '3', text: '移交其他单位'},
          {value: '4', text: '移交外地单位'},
          {value: '5', text: '自行处置'}
        ],
        emptyImg: require("../../../images/no-img.png")


      }
    },
    created() {
      this.formInline = JSON.parse(sessionStorage.getItem('zkwzczsqbj'))
      this.init()
    },
    methods: {
      getData (val) {
          this.dialogUpLoad = val
          this.getFileData = val
      },
      handleCheckAllChange() {
       this.checkSl = 0
       if (this.checkAll) {
         // 全选时
         this.checkArr = []
         if (this.checkList) {
           this.checkList.forEach(function (item) {
             this.checkArr.push(item.id)
             this.checkSl = this.checkSl + 1
           }, this)
           this.checkAll = true
           this.isIndeterminate = false
           this.form.ids = this.checkArr.join(',')
         }
       } else {
         this.checkList.forEach(function (item) {
           item.flag = false
         }, this)
         this.checkArr = []
         this.checkAll = false
         this.form.ids = ''
       }
      },
      init() {
        this.getWrkqd()
        this.getDdyqd()
      },
      getWrkqd() {
        let that = this
        var param = {
          ajxx_id: this.formInline.ajxx_id
        }

        this.$api.zkwzcz.queryWzxxForBxqd(param).then((res) => {
          if(Object.keys(res.body).length != 0){
            that.checkList = res.body.default.dataset
          }else{
            this.checkList = []
          }
        })
      },
      dialogUpLoadClick () {
        this.dialogUpLoad = true
        this.getFileData = true
      },
      chooseItem(item) {
       if (this.checkArr.indexOf(item.id) != -1) {
         this.checkSl = this.checkSl + 1
       } else {
         this.checkSl = this.checkSl - 1
       }
       if (this.checkArr.length == 0) {
         this.isIndeterminate = false
         this.checkAll = false
       } else if (this.checkArr.length < this.checkList.length) {
         this.isIndeterminate = true
       } else if (this.checkArr.lengthQ != 0 && this.checkArr.length == this.checkList.length) {
         this.isIndeterminate = false
         this.checkAll = true
       }
       this.form.ids = this.checkArr.join(',')
      },
      submitForm() {
        if (this.checkArr.length == 0) {
          this.$message({message: '请选择物证！', type: 'error'})
          return false
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.scrkqd = true
            let params = Object.assign({}, this.form)
            if (params.iswl) {
              params.iswl = '1'
            } else {
              params.iswl = '0'
            }
            this.$api.zkwzcz.saveOrUpdateYwcb(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.getWrkqd()
                this.getDdyqd()
                this.checkSl = 0
                this.checkArr = [];
                this.isIndeterminate = false;
                this.checkAll = false;
                this.scrkqd = false
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      getDdyqd() {
        var param = {
          ywzb_id: this.formInline.id
        }
        this.$api.zkwzcz.queryYwcbForBxqd(param).then((res) => {
          this.rwcbCount = Number(res.body.default.count)
          this.dycbList = res.body.default.dataset
          if (res.body.default.dataset) {
            this.dycbList.forEach(function (c) {
              c.show = false
              c.wzrq = timeFormat(c.wzrq)
            })
          }
        })
      },
      getSubDays: function (days) {
        var $nowTime = new Date()
        $nowTime.setTime($nowTime.getTime() + 24 * 60 * 60 * 1000 * days)
        var $newMonth = $nowTime.getMonth() + 1
        if ($newMonth < 10) {
          $newMonth = '0' + $newMonth
        }
        var $newDay = $nowTime.getDate()
        if ($newDay < 10) {
          $newDay = '0' + $newDay
        }
        return $nowTime.getFullYear() + '-' + $newMonth + '-' + $newDay
      },
      changeHandler(value) {
        this.form.ghqx = this.getSubDays(value)
      },
      submitRksq() {
        if (this.rwcbCount == 0) {
          this.$message({message: '不存在待处置物证信息，无法提交申请！', type: 'error'})
          return false
        }

        let params = Object.assign({}, this.formInline)
        this.$api.zkwzcz.submitCzdj(params).then((res) => {
          if (res.success == 'true') {
            this.$message({message: res.message, type: 'success'})
            this.$util.goBack(this)
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      delDkcb(id) {
        this.$confirm('确定删除该待处置清单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: id
          }
          this.$api.zkwzcz.delDycb(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.getWrkqd()
              this.getDdyqd()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      fromateCzyy(value){

      if (value == '1') {
        return '返还当事人'
      } else if (value == '2') {
        return '转罚没物资'
      }else if (value == '3') {
        return '移交其他单位'
      }else if (value == '4') {
        return '移交外地单位'
      }else if (value == '5') {
        return '自行处置'
      }else{
        return value
      }

      },
      getRKwzmx(id) {
        var param = {
          ywcb_id: id
        }
        this.$api.zkwzcz.queryWzmx(param).then((res) => {
          this.dywzmxList = res.body.default.dataset
          if (this.dycbList.length != 0) {
            this.dycbList.forEach(function (c) {
              if (c.id == id) {
                if (!c.show) {
                  c.show = true
                } else {
                  c.show = false
                }
              } else {
                c.show = false
              }
            })
          }
        })
      },
      delDkcbWzmx(id) {
        this.$confirm('确定删除该物证？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: id,
            rk_id: this.formInline.id
          }
          this.$api.zkwzcz.delWzmx(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.getWrkqd()
              this.getDdyqd()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      changeWlps() {
        this.$message({message: '第三方物流尚未上线...', type: 'warning'})
        this.form.iswl = false
      },
      handlerByName() {
      this.$router.push({
        name: 'organizationDetail',
        params: {
          id: this.formInline.ajxx_id
        }
      })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  /deep/ .el-dialog__body {
    padding-top: 10px;
  }


  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #f4f4f4;
    font-size: 14px;
    min-height: calc(100%);
    padding: 10px;
    box-sizing: border-box;
  }

  .page-title {
    height: 30px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 12px;
    font-weight: bold;
    line-height: 30px;
    padding: 0 10px;
    background: #fff;
  }

  .form-box {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px;
    background: #fff;
    margin-bottom: 10px;

    .item {
      width: 33.3%;
      line-height: 32px;
      display: inline-block;

      label {
        color: #8d8585;
      }

      .value {
        color: #333;
        display: inline-block;
      }
    }
  }

  .main {
    position: absolute;
    top: 135px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .side {
    height: 100%;
    padding-right: 10px;

    &:last-child {
      padding-right: 0;
    }

    &:nth-child(2) {
      .inner {
        background: none;
      }
    }

    .inner {
      background: #fff;
      height: 100%;
      position: relative;

      .title {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        font-weight: bold;
        padding: 0 10px;
        border-bottom: 1px solid #f2f2f2;
      }

      .search {
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 10px;

        .input {
          width: 80%;
          height: 30px;

          /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
          }
        }
      }

      .l-content {
        position: absolute;
        top: 72px;
        left: 0;
        bottom: 0;
        overflow: auto;
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        /deep/ .el-checkbox {
          display: block;
          margin-right: 0;
          position: relative;
          margin-bottom: 5px;

          .el-checkbox__input {
            left: 8px;
            top: 18px;
            position: relative;
          }
        }

        /deep/ .is-checked {
          background: #f5f5f5;
          border-left: 2px solid #3675cb;

          .is-checked {
            border-left: 0;
          }
        }

        .img {
          width: 54px;
          height: 54px;
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translate(0, -50%);
          //background: #ccc;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .msg {
          padding: 0 0 0 65px;
          height: 62px;
          display: flex;
          align-content: center;
          flex-wrap: wrap;

          span {
            width: 100%;
            display: block;
            font-size: 12px;
            color: #666;
          }
        }
      }

      .c-content {
        position: absolute;
        top: 28px;
        left: 0;
        bottom: 28px;
        width: 100%;
        border: 1px dashed #ddd;
        background: rgb(252, 252, 252);
        box-sizing: border-box;
        padding: 0 10px;

        .title {
          border-bottom: 1px dashed #ccc;
          height: 40px;
          line-height: 40px;
          color: #8a8a8a;

          i {
            font-size: 16px;
            padding: 4px;
            color: #333;
          }
        }

        .target-stage {
          span {
            display: block;
            color: #8d8585;
            line-height: 30px;
          }

          /deep/ .el-form-item {
            margin-bottom: 5px;
          }

          /deep/ .el-form-item__label {
            display: block;
            color: #8d8585;
            width: 100%;
            text-align: left;
            line-height: 28px;
          }

          /deep/ .el-radio {
            margin-right: 10px;
          }

          /deep/ .el-radio__label {
            padding-left: 3px;
          }

          .num {
            width: 50px;
            margin-right: 8px;

            /deep/ .el-input__inner {
              height: 30px;
            }
          }
        }
      }

      .all-submit {
        position: absolute;
        top: 1px;
        right: 10px;
        width: 80px;
        margin-top: 0;
        height: 26px;
        padding: 0;
      }

      .r-content {
        position: absolute;
        top: 30px;
        left: 0;
        bottom: 0;
        overflow: auto;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 8px 0;

        .item {
          border: 1px solid #f2f2f2;
          padding-bottom: 5px;
          margin-bottom: 6px;

          .order-title {
            height: 30px;
            background: #9f9f9f;
            color: #fff;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            padding: 0 5px;
          }

          .stage-info {
            padding: 0 10px;

            .address {
              display: block;
              font-size: 14px;
              line-height: 30px;
              font-weight: bold;

              .wuliu {
                width: 20px;
                height: 20px;
                margin-left: 10px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .msg {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              padding-bottom: 10px;

              i {
                padding-right: 5px;
                color: #bebebe;
              }
            }

            .bottom-line {
              border-top: 1px solid #f2f2f2;
              height: 36px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .submit {
                width: 60px;
                height: 26px;
                padding: 0;
                font-size: 12px;
              }

              .func-icon {
                .icon {
                  width: 18px;
                  height: 18px;
                  display: inline-block;
                  text-align: center;
                  font-size: 14px;
                  line-height: 18px;
                  color: #333;
                  padding: 0;
                  margin-left: 5px;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }

            /*  物品列表*/

            .goods-list {
              .g-item {
                position: relative;
                border: 1px solid #f2f2f2;
                margin-bottom: 5px;

                .img {
                  width: 54px;
                  height: 54px;
                  position: absolute;
                  top: 50%;
                  left: 5px;
                  transform: translate(0, -50%);
                  //background: #ccc;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                .msg {
                  padding: 0 5px 0 65px;
                  height: 62px;
                  display: block;
                  align-content: center;
                  flex-wrap: wrap;

                  .line {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    line-height: 19px;

                    span {
                      &:last-child {
                        text-align: right;
                      }
                      &.one{
                        text-align: left;
                      }
                    }
                  }

                  span {
                    width: 100%;
                    display: block;
                    font-size: 12px;
                    color: #666;

                    i {
                      color: #bebebe;
                      padding-right: 5px;
                    }
                  }

                  .func-icon {
                    display: flex;

                    .icon {
                      width: 18px;
                      height: 18px;
                      display: inline-block;
                      text-align: center;
                      font-size: 14px;
                      line-height: 18px;
                      color: #333;
                      padding: 0;
                      margin-left: 5px;

                      img {
                        width: 100%;
                        height: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
