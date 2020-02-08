<template>
  <div class="wrapper">
    <div class="page-title">移送申请信息</div>
    <div class="form-box">
      <div class="item">
        <label>案件编号</label>
        <span class="value">{{formInline.ajxxbh}}</span>
      </div>
      <div class="item">
        <label>案件名称</label>
        <!--<span class="value">{{formInline.ajmc}}</span>-->
        <el-tag @click="handlerByName()">{{formInline.ajxx_name}}</el-tag>
      </div>
      <div>
        <el-button type="success" size="small" @click="dialogUpLoadClick" plain>上传文件</el-button>
      </div>
    </div>
    <div class="main">
      <el-row style="height: 100%;">
        <el-col :span="8" class="side">
          <div class="inner">
            <div class="title">可移送清单</div>
            <div class="search">
              <el-col :span="24">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                             size="mini">全选
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
                    <span>{{item.wzlb}}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
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
        <el-col :span="7" class="side" >
          <div class="inner">
            <div class="c-content">
              <div class="title">已勾选<i>{{checkSl}}</i>件物证</div>
              <el-form ref="form" :model="form" class="target-stage" :rules="dataFormRules" >
                <!--<el-form-item label="目标仓库">
                  <el-select v-model="form.stage" placeholder="请选择仓库" style="width: 100%">
                    <el-option label="仓库一" value="仓库一"></el-option>
                    <el-option label="仓库二" value="仓库二"></el-option>
                  </el-select>
                </el-form-item>-->

                <el-form-item label="移送部门" prop="jsqr_dept_name">
                  <el-input v-model="form.jsqr_dept_name"  style="width: 100%"
                            @focus="chooseDept()" :readonly="true" placeholder="请选择移送部门"></el-input>
                </el-form-item>
                <el-form-item label="移送原因" prop="yssm">
                  <el-input type="textarea" v-model="form.yssm"></el-input>
                </el-form-item>
                <el-form-item label="" >
                  <el-button type="primary" style="width: 100%; margin-top: 10px" @click="submitForm()" :disabled="scrkqd"
                             >生成清单
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>

        <el-col :span="9" class="side">
          <div class="inner">
            <div class="title">已选清单
              <el-button type="warning" style="" class="all-submit" @click="submitRksq()">全部提交</el-button>
            </div>
            <div class="r-content">
              <div class="item" v-for="ywcb in rkcbList" :key="ywcb.id">
                <div class="order-title">
                  <span>NO.{{ywcb.ysbh}}</span>
                  <span></span>
                </div>
                <div class="stage-info">
                  <span class="address">{{ywcb.jsqr_dept_name}}<i class="wuliu el-icon-location"></i> </span>
                  <div class="msg">
                    <span><i>移送状态</i>{{ywcb.yszt}}</span>
                    <!--<span><i>保管期限</i>{{ywcb.bgqx}}</span>
                    <span><i>物品数量</i>{{ywcb.sl}}件</span>-->
                  </div>
                  <div class="bottom-line">
                    <span></span>
                    <!--<el-button class="submit">提交</el-button>-->
                    <div class="func-icon">
                      <i class="icon el-icon-delete" @click="delDkcb(ywcb.ysxxcb_id)"></i>
                      <i class="icon el-icon-s-unfold" @click="getRKwzmx(ywcb.ysxxcb_id)"></i>
                    </div>
                  </div>
                  <div class="goods-list" v-show="ywcb.show">
                    <div class="g-item" v-for="item in rkwzmxList" :key="item.id">
                      <div class="img"><img :src="item.imgurl || emptyImg"></div>
                      <div class="msg">
                        <div class="line one">
                          <span>{{item.wzmc}}（{{item.wzsl}}） | {{item.wzbh}}</span>
                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>物证类别</i>{{item.wzlb}}</span>
                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>存放位置</i>{{item.cfwz}}</span>
                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>特征描述</i>{{item.wztz}}</span>
                          <div class="func-icon">
                            <i class="icon el-icon-delete" @click="delDkcbWzmx(item.id)"
                            ></i>
                            <!-- <i class="icon el-icon-back"></i>-->
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

<script>import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
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
          loading:false,
          scrkqd:false,
        checkList: [],
        showYyjb:false,
        checkArr: [],
        rkcbList: [],
        rkwzmxList: [],
        rwcbCount: 0,
        wlpsDialog:false,
        wlpsDisabled:false,
        filterText:'',
        deptDialog:false,
        selectNode:{},
        dept_id:'',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        formInline: this.$route.params,
        bgzxArry: [],
        dataFormRules: {
          jsqr_dept_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
            yssm:[{min:0,max:500,message:'最多可输入500个字符'},
              {required: true, message: '这是必填字段', trigger: 'blur'}]

        },
        ischeck: false,
        isIndeterminate: false,
        checkSl: 0,
        yyfsOption: [{
          id: '1',
          text: '正常押运'
        }, {
          id: '2',
          text: '高级押运'
        }],
        valueSelect: '',
        radio2: 999,
        form: {
          ysxx_id: this.$route.params.id,
          wzxx_id: '',
          yssm: '',
          jsqr_dept_id:'',
          jsqr_dept_name:''
        },
        emptyImg: require("../../../images/no-img.png")
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      getData (val) {
          this.dialogUpLoad = val
          this.getFileData = val
      },
      formateYszt(value){

        var returnValue = '';
        if(value=='0'){
          returnValue='待移送';
        }else if(value=='1'){
          returnValue='待接收';
        }else if(value=='2'){
          returnValue='已接收';
        }else if(value=='3'){
          returnValue='退回';
        }else if(value=='4'){
          returnValue='部分退回';
        }
        return returnValue;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 设置手机号的验证规则
      checkPhone(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的电话'))
          }
        }
      },
      handleCheckAllChange() {
        this.checkSl = 0
        if (this.checkAll) {
          // 全选时
          this.checkArr = []
          if(this.checkList){
            this.checkList.forEach(function (item) {
              this.checkArr.push(item.id)
              this.checkSl = this.checkSl + 1
              item.flag = true
            }, this)
            this.checkAll = true
            this.isIndeterminate = false
            this.form.wzxx_id = this.checkArr.join(',')
          }
        } else {
          this.checkList.forEach(function (item) {
            item.flag = false
          }, this)
          this.checkArr = []
          this.checkAll = false
          this.form.wzxx_id = ''
        }
      },
      init() {
        this.formInline = JSON.parse(sessionStorage.getItem('bjyssq'))
        this.dept_id = JSON.parse(sessionStorage.getItem('sessionInfo')).dept_id

        this.getWrkqd()
        this.getDdyqd()
        this.selectCfck()
      },
        dialogUpLoadClick () {
          this.dialogUpLoad = true
          this.getFileData = true
        },
        handlerByName() {
            this.$router.push({
                name: 'organizationDetail',
                params: {
                    id:this.formInline.ajxx_id
                }
            })
        },
      getWrkqd() {
        // console.log(row.id)
        var param = {
          ajxx_id: this.formInline.ajxx_id,
          id: this.formInline.id
        }
        this.$api.yssq.queryWzxxBxqd(param).then((res) => {
          this.checkList = res.body.default.dataset
        })
      },
      changeBgzx(selVal){
        let obj = {}
        obj = this.bgzxArry.find(
          item=>{
            if(selVal == item.id){
              return item //筛选出对应数据
            }
          }
        )
        if(obj.cklx=='1'){
          this.form.iswl = true;
          this.showYyjb=true;
          this.wlpsDisabled = true;
          this.form.yyfs = ''
        }else{
          this.form.iswl = false;
          this.showYyjb=false;
          this.wlpsDisabled = false
          this.form.yyfs = '9'
        }
      },
      chooseDeptName() {
        // this.dataForm.gs_id = row.id;
        // this.dataForm.gs_name = row.user_name;
        if( this.selectNode.id == this.dept_id){
          this.$message({message: '不能选择自己部门为接收部门，请选择其他', type: 'error'})
          return false
        }
        this.form.jsqr_dept_name = this.selectNode.name;
        this.form.jsqr_dept_id = this.selectNode.id;
        this.deptDialog = false;
      },
      chooseItem(item) {
        if(this.checkArr.indexOf(item.id) != -1){
          this.checkSl = this.checkSl + 1
        }else{
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
        this.form.wzxx_id = this.checkArr.join(',')
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
            this.$api.yssq.saveWzxxBxqd(params).then((res) => {

              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                // this.dialogVisible = false;
                this.getWrkqd()
                this.getDdyqd()
                this.checkSl = 0
                this.checkList=[];
                this.checkArr=[];
                this.isIndeterminate =false;
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
        // console.log(row.id)
        let that = this
        var param = {
          ajxx_id: this.formInline.ajxx_id,
          id:this.formInline.id
        }
        this.$api.yssq.queryYxYsxxcb(param).then((res) => {
          this.rwcbCount = Number(res.body.default.count)
          this.rkcbList = res.body.default.dataset

          if (res.body.default.dataset) {
            this.rkcbList.forEach(function (c) {
              c.show = false
              c.yszt = that.formateYszt(c.yszt)
            })
          }
          //console.log(this.rkcbList)
        })
      },
      submitRksq() {
        if (this.rwcbCount == 0) {
          this.$message({message: '不存在待移送物证信息，无法提交申请！', type: 'error'})
          return false
        }
        let params = Object.assign({}, this.formInline)
        this.$api.yssq.saveInfo(params).then((res) => {
          if (res.success == 'true') {
            this.$message({message: res.message, type: 'success'})
            this.$util.goBack(this)
            // this.dialogVisible = false;
            // this.getWrkqd();
            // this.getDdyqd();
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      delDkcb(id) {
        this.$confirm('确定删除该已选清单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ysxxcb_id: id

          }
          this.$api.yssq.delyscb(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.getWrkqd()
              this.getDdyqd()
                this.checkArr=[];
                this.isIndeterminate =false;
                this.checkAll = false;
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      getRKwzmx(id) {
        // console.log(row.id)
        var param = {
          ysxxcb_id: id
        }
        this.$api.yssq.queryYxYswz(param).then((res) => {
          // this.rwcbCount = Number(res.body.default.count);
          this.rkwzmxList = res.body.default.dataset
          // console.log(this.rkwzmxList)
          if (this.rkcbList.length != 0) {
            this.rkcbList.forEach(function (c) {
              if (c.id == id) {
                  if(!c.show ){
                      c.show = true
                  }else{
                      c.show = false
                  }
              } else {
                c.show = false
              }
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
        //console.log(this.getSubDays(value))
        this.form.bgqx = this.getSubDays(value)
        if (value == 999) {
          this.form.bgqx = '9999-12-31'
        }
      },
      delDkcbWzmx(id) {
        this.$confirm('确定删除该物证？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            yswz_id: id

          }
          this.$api.yssq.delyswz(params).then((res) => {
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
      selectCfck() {
        var param = {}
        this.$api.rksq.selectCfck(param).then((res) => {
          // this.rwcbCount = Number(res.body.default.count);
          // this.rkwzmxList = res.body.default.dataset;
          //console.log(res.body.default.list)
          this.bgzxArry = res.body.default.list
        })
      },
      changeWlps() {
       // this.$message({message: '第三方物流尚未上线...', type: 'warning'})
       // this.form.iswl = false
        if(this.form.iswl){
          this.showYyjb=true;
          this.form.yyfs=''
        }else{
          this.showYyjb=false;
          this.form.yyfs='9'
        }


      },
      chooseDept() {
        this.filterText = ''
        var param = {
          selectall:true
        }
        this.$api.yssq.getDeptTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })

      },
      selectData(data) {
        this.selectNode = data;
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style lang="less" scoped>
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
        color: #bebebe;
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
          background: #ccc;

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
            color: #bebebe;
            line-height: 30px;
          }

          /deep/ .el-form-item {
            margin-bottom: 5px;
          }

          /deep/ .el-form-item__label {
            display: block;
            color: #bebebe;
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
            background: #ddd;
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
                  background: #ccc;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                .msg {
                  padding: 0 5px 0 65px;
                  height: 78px;
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
