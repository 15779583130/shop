<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  .el-input{
    min-width: 200px !important;
  }
  .form-panel{
    margin-bottom: 5px !important;
  }
  .el-form-item__error{
    margin-top:10px !important;
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
        position: relative;
        left: -7px;
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
        /*position: absolute;*/
        /*top: 0px;*/
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

</style>
<template>
  <div>
    <div style="background:#F6F6F6;text-align: center;margin-bottom:5px">
      <!--      <span style="margin-right: 5px;color: #F95F78">当前剩余{{dataForm.kkcount}}张可开票据</span>-->
      <el-button size="mini" type="primary" icon="el-icon-circle-check" @click="kp">预开票据</el-button>
      <el-button size="mini" type="primary" icon="el-icon-delete" @click="deletePj">删除</el-button>
      <el-button size="mini" type="warning" icon="el-icon-circle-close" @click="close">关闭</el-button>
    </div>
    <el-card class="box-card" style="background: #f7f7f7">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              暂扣票据信息
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
              <div class="form-panel">
                <el-form ref="dataForm" :model="dataForm" size="mini" :rules="dataFormRules">
                  <el-row class="form-line">
                    <el-col :span="8">
                      <el-form-item label="案件编号">
                        <el-input v-model="dataForm.ajbh" size="mini"  readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="案件名称">
                        <el-input v-model="dataForm.ajmc" suffix-icon="el-icon-c-scale-to-original" size="mini"  readonly="readonly" @focus="openqa">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经办人">
                        <el-input v-model="dataForm.jbr" size="mini"  readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="开票流水号" prop="lsh">
                        <el-input v-model="dataForm.lsh" size="mini"  readonly="readonly">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="当事人" prop="dsr">
                        <el-input v-model="dataForm.dsr" size="mini"  >
                        </el-input>
                      </el-form-item>
                    </el-col>
<!--                    <el-col :span="8">-->
<!--                      <el-form-item label="处罚条款" prop="cftk">-->
<!--                        <el-input v-model="dataForm.cftk" size="mini">-->
<!--                        </el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
                        <el-col :span="8">
                          <el-form-item label="地址" prop="address">
                            <el-input v-model="dataForm.address" size="mini" >
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="备注" prop="bz">
                            <el-input v-model="dataForm.bz" size="mini" >
                            </el-input>
                          </el-form-item>
                        </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
        <!--        <el-col :span="24">-->
        <!--          <div class="grid-content bg-purple-dark">-->
        <!--            <div-->
        <!--              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">-->
        <!--              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>-->
        <!--              票据物证清单 <span style="margin-left:5px;font-weight: 400">已勾选<span style="font-weight: bold">{{multipleSelection.length}}</span>件物证</span>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </el-col>-->
        <!--        <el-col :span="24">-->
        <!--          <el-table  ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"-->
        <!--                    tooltip-effect="dark" border style="width: 100%" size="mini"  @selection-change="handleSelectionChange">-->
        <!--            <el-table-column type="selection" width="55"></el-table-column>-->
        <!--            <el-table-column label="序号" width="50px" align="center">-->
        <!--              <template slot-scope="scope">-->
        <!--                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>-->
        <!--              </template>-->
        <!--            </el-table-column>-->
        <!--            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">-->
        <!--              <template slot-scope="scope">-->
        <!--                <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.wzmc }}</span>-->
        <!--              </template>-->
        <!--            </el-table-column>-->
        <!--            <el-table-column prop="wzbh" label="物证编号"  :show-overflow-tooltip="true"></el-table-column>-->
        <!--            <el-table-column prop="wzsl" label="数量及单位" :show-overflow-tooltip="true"></el-table-column>-->
        <!--            <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true"></el-table-column>-->
        <!--            <el-table-column prop="ggxh" label="规格型号" :show-overflow-tooltip="true"></el-table-column>-->
        <!--            <el-table-column prop="remark" label="物证备注" :show-overflow-tooltip="true"></el-table-column>-->
        <!--          </el-table>-->
        <!--          &lt;!&ndash;<div class="page">&ndash;&gt;-->
        <!--            &lt;!&ndash;<div class="page-content">&ndash;&gt;-->
        <!--              &lt;!&ndash;<el-pagination&ndash;&gt;-->
        <!--                &lt;!&ndash;@size-change="handleSizeChange"&ndash;&gt;-->
        <!--                &lt;!&ndash;@current-change="handleCΩurrentChange"&ndash;&gt;-->
        <!--                &lt;!&ndash;:current-page="pageinfo.pagenum"&ndash;&gt;-->
        <!--                &lt;!&ndash;:page-sizes="[10, 20, 30, 40, 50]"&ndash;&gt;-->
        <!--                &lt;!&ndash;:page-size="pageinfo.pagesize"&ndash;&gt;-->
        <!--                &lt;!&ndash;layout="total, sizes, prev, pager, next, jumper"&ndash;&gt;-->
        <!--                &lt;!&ndash;:total="total">&ndash;&gt;-->
        <!--              &lt;!&ndash;</el-pagination>&ndash;&gt;-->
        <!--            &lt;!&ndash;</div>&ndash;&gt;-->
        <!--          &lt;!&ndash;</div>&ndash;&gt;-->
        <!--        </el-col>-->

        <!--        <div class="main">-->
        <!--          <el-row>-->
        <!--            <el-col :span="8" class="side">-->
        <!--              <div class="inner">-->
        <!--                <div class="title">未入库清单</div>-->
        <!--                <div class="search">-->
        <!--                  <el-col :span="24">-->
        <!--                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"-->
        <!--                                 size="mini">全选-->
        <!--                    </el-checkbox>-->
        <!--                  </el-col>-->
        <!--                </div>-->
        <!--                <div class="l-content">-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </div>-->

        <el-row style="height: 100%;clear: both">
          <el-col :span="9" class="side">
            <div class="inner">
              <div class="title">物证清单<span style="float: right;">共{{checkList.length}}条信息</span></div>
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
          <el-col :span="6" class="side">
            <div class="c-content">
              <div class="title">已勾选<i>{{checkSl}}</i>件物证</div>
              <el-button type="primary" style="width: 100%; margin-top: 10px" @click="createForm()"
                         :disabled="scrkqd">生成清单
              </el-button>
            </div>
          </el-col>
          <el-col :span="9" class="side">
            <div class="inner">
              <div class="title">物证清单</div>
              <div class="r-content">
                <div class="goods-list">
                  <div class="g-item" v-for="item in rightList" :key="item.id">
                    <div class="img"><img :src="item.imgurl || emptyImg" style="height: 54px;width: 54px"></div>
                    <div class="msg">
                      <div class="line">
                        <span class="one">{{item.wzmc}}（{{item.sldw}}） | {{item.wzbh}}</span>
                      </div>
                      <div class="line">
                        <!-- <span><i>存放位置</i></span> -->
                        <span class="one"><i>物证类别</i>{{item.wzlb}}</span>
                      </div>
                      <div class="line">
                        <span><i>物证备注</i>{{item.wzbz}}</span>
                        <div class="func-icon">
                          <i class="icon el-icon-delete" @click="deleteRightMx(item.id)" style="cursor: pointer"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    </el-card>
  </div>
</template>

<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat} from '../../../utils/datetime'
  export default {
    components: {
      casePreview
    },
    name: 'entryRegistration',
    data() {
      return {
        id:'',
        wzxx_id:'',
        centerDialogVisible: false,
        dataForm: this.$route.params,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        dialogVisible: false,
        wzmxTableData: [],
        dataFormRules: {
          dsr: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          bz:[
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          address:[
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ]

        },
        pageinfo:{
          pagenum:0,
          pagesize:10,
          total:0
        },
        tableData:[],
        multipleTable:[],
        isIndeterminate: false,
        checkAll: false,
        checkArr: [],
        checkList: [],
        rightList:[],
        checkArrList:[],
        checkSl: 0,
        emptyImg: require("../../../images/no-img.png"),
        scrkqd: false,
        rkcbList: [],
        rkwzmxList: [],
        rwcbCount: 0
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
        // var id = this.$route.params.id;
        var id = window.location.href.split('zkkjkp/')[1];
        this.id = id
        this.queryDataForm();
      },
      deleteRightMx(id){
        let param = {
          id:id,
          pjzb_id:this.dataForm.id,
        };
        this.$api.zkkj.delClmx(param).then((res) => {
          if (res.success == "true") {
            let param1 = {
              id: this.id,
              ajxx_id:this.dataForm.ajxx_id
            }
            this.$api.zkkj.querywzTable2(param1).then((res) => {
              // this.pageinfo.total = Number(res.body.default.count);
              this.tableData = res.body.default.dataset||[]
              this.checkList  = res.body.default.dataset||[]
            })
            this.$api.zkkj.querywzTable3(param).then((res) => {
              // this.pageinfo.total = Number(res.body.default.count);
              this.rightList = res.body.default.dataset||[]
            })
            this.checkSl = 0
            this.checkArr = []

          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      createForm(){
        if(this.checkArr.length<1){
          this.$message({message:'请先选择要开票的物证信息', type: 'warning'})
          return false
        }
        let param = {
          ids:this.checkArr.join(","),
          pjzb_id:this.dataForm.id,
        };
        this.$api.zkkj.saveOrUpdateClmx(param).then((res) => {
          if (res.success == "true") {
            let param1 = {
              ajxx_id: this.id
            }
            this.$api.zkkj.querywzTable2(param1).then((res) => {
              // this.pageinfo.total = Number(res.body.default.count);
              this.tableData = res.body.default.dataset||[]
              this.checkList  = res.body.default.dataset||[]
            })
            this.$api.zkkj.querywzTable3(param).then((res) => {
              // this.pageinfo.total = Number(res.body.default.count);
              this.rightList = res.body.default.dataset||[]
            })
            this.checkSl = 0
            this.checkArr = []

            // this.$message({message: res.message, type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
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
        // this.form.ids = this.checkArr.join(',')
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
            // this.form.ids = this.checkArr.join(',')
          }
        } else {
          this.checkList.forEach(function (item) {
            item.flag = false
          }, this)
          this.checkArr = []
          this.checkAll = false
          // this.form.ids = ''
        }
      },
      dateFormat(row, column, cellValue, index){
        return timeFormat(cellValue)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize =val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ywzb_id: this.dataForm.id
        };
        this.$api.rksq.queryYwcb(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset||[]
          var that=this
          this.tableData.forEach(function (c) {
            var param2 = {
              ywcb_id: c.id
            };
            that.$api.rksq.queryYwcbWzmx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      formatZbzt(value) {
        var returnValue = value;
        if (value == '0') {
          returnValue = '待申请'
        } else if (value == '1') {
          returnValue = '已申请'
        }else if (value == '2') {
          returnValue = '处理中'
        }else if (value == '9') {
          returnValue = '已终结'
        }
        return returnValue;
      },
      queryDataForm(){
        var param = {
          ajxx_id:this.id
        };
        this.$api.zkkj.queryDataForm(param).then((res) => {
          this.dataForm = res.body.default;
          this.$api.zkkj.querywzTable2(param).then((res) => {
            // this.pageinfo.total = Number(res.body.default.count);
            this.tableData = res.body.default.dataset||[]
            this.checkList  = res.body.default.dataset||[]
          })
          let param1 = {
            pjzb_id:res.body.default.id
          }
          this.$api.zkkj.querywzTable3(param1).then((res) => {
            // this.pageinfo.total = Number(res.body.default.count);
            this.rightList = res.body.default.dataset||[]
          })

        })
      },
      openqa() {
        if(this.dataForm.ajxx_id == undefined || this.dataForm.ajxx_id==''){
          this.$message({message: '找不到案件信息', type: 'warning'})
          return false;
        }
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id:this.dataForm.ajxx_id
          }
        })
      },
      close() {
        this.$util.goBack(this);
      },
      deletePj(){
        let param = {
          id:this.dataForm.id
        };
        this.$confirm('是否确定删除该票据记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.zkkj.deletePj(param).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.close();
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      kp(){
        let that = this
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('是否确认开具发票信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              // var ids =this.multipleSelection.map(obj => {
              //   return obj.id
              // }).join(",");

              let param = {
                id:this.dataForm.id
              };
              this.$api.zkkj.checkPj(param).then((res) => {
                if (res.success == "true") {
                  // this.$message({message: res.message, type: 'success'})
                  this.$confirm(res.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    var params = {};
                    Object.assign(params,this.dataForm)
                    this.$api.zkkj.submitPjzb(params).then((res) => {
                      if (res.success == "true") {
                        this.$message({message: res.message, type: 'success'})
                        this.close();
                      } else {
                        this.$message({message: res.message, type: 'error'})
                      }
                    })
                  })
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            })
          }
        })
      },
      handlerByName(row) {
        this.wzxx_id = row.id;
        this.centerDialogVisible = true
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      }
    }
  }
</script>
