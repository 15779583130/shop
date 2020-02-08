<template>
  <div class="wrapper">
    <div class="page-title">申请信息</div>
    <div class="form-box">
      <div class="item">
        <label>档案编号</label>
        <span class="value">A3302263333633366333</span>
      </div>
      <div class="item">
        <label>案件名称</label>
        <span class="value">张*入室抢劫案</span>
      </div>
      <div class="item">
        <label>入库流水号</label>
        <span class="value">A3302263333633366333</span>
      </div>
      <div class="item">
        <label>谁请时间</label>
        <span class="value">2019-10-16 10:36:50</span>
      </div>
    </div>
    <div class="main">
      <el-row style="height: 100%;">
        <el-col :span="8" class="side">
          <div class="inner">
            <div class="title">未入库清单</div>
            <div class="search">
              <el-col :span="8">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                </el-checkbox>
              </el-col>
              <el-col :span="16" style="text-align: right">
                <el-input v-model="sInput" placeholder="请输入内容" class="input"></el-input>
              </el-col>
            </div>
            <div class="l-content">
              <el-checkbox-group v-model="checkList" v-for="item in list" :key="item.id" :label="item.id">
                <el-checkbox :label="item">
                  <div class="img"><img :scr="item.img"></div>
                  <div class="msg">
                    <span>{{item.name}}</span>
                    <span>{{item.address}}</span>
                    <span>{{item.type}}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="side">
          <div class="inner">
            <div class="c-content">
              <div class="title">已勾选<i>2</i>件物证</div>
              <el-form ref="form" :model="form" class="target-stage">
                <el-form-item label="目标仓库">
                  <el-select v-model="form.stage" placeholder="请选择仓库" style="width: 100%">
                    <el-option label="仓库一" value="仓库一"></el-option>
                    <el-option label="仓库二" value="仓库二"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="保管期限">
                  <el-col :span="17">
                    <el-radio-group v-model="radio2">
                      <el-radio :label="1">7天</el-radio>
                      <el-radio :label="2">30天</el-radio>
                      <el-radio :label="3">100天</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="7">
                    <el-input v-model="num" placeholder="" class="num"></el-input>
                    天
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <span>物流配送</span>
                  <el-switch
                    v-model="form.value3">
                  </el-switch>
                </el-form-item>
                <el-form-item label="入库原因">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="width: 100%; margin-top: 10px">生成待入库清单</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="side">
          <div class="inner">
            <div class="title">待入库清单
              <el-button type="warning" style="" class="all-submit">全部提交</el-button>
            </div>
            <div class="r-content">
              <div class="item">
                <div class="order-title">
                  <span>A411111111d222</span>
                  <span>2019-10-16 10:30:25</span>
                </div>
                <div class="stage-info">
                  <span class="address">集美公安局<i class="wuliu el-icon-location"></i> </span>
                  <div class="msg">
                    <span><i>交接人</i>来来来</span>
                    <span><i>保管期限</i>2019-10-17 12:00:00</span>
                    <span><i>物品数量</i>2件</span>
                  </div>
                  <div class="bottom-line">
                    <el-button class="submit">提交</el-button>
                    <div class="func-icon">
                      <i class="icon el-icon-delete"></i>
                      <i class="icon el-icon-back"></i>
                    </div>
                  </div>
                  <div class="goods-list">
                    <div class="g-item" v-for="item in list">
                      <div class="img"><img :scr="item.img"></div>
                      <div class="msg">
                        <div class="line">
                          <span>刀具一把 | 已提交</span>
                          <span>2019-10-17 12:00:00</span>
                        </div>
                        <div class="line">
                          <span><i>放置位置</i>一排1号</span>
                          <span><i>证物类别</i>刀具</span>
                        </div>
                        <div class="line">
                          <span><i>特征描述</i>黑色</span>
                          <div class="func-icon">
                            <i class="icon el-icon-delete"></i>
                            <i class="icon el-icon-back"></i>
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
  </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                num: '',
                sInput: '',
                checkAll: false,
                checkList: [],
                list: [
                    {
                        img: '',
                        name: '鼠标',
                        address: '集美公安局',
                        type: '电脑物品'
                    },
                    {
                        img: '',
                        name: '鼠标2',
                        address: '集美公安局',
                        type: '电脑物品'
                    },
                    {
                        img: '',
                        name: '鼠标3',
                        address: '集美公安局',
                        type: '电脑物品'
                    }
                ],
                isIndeterminate: false,
                options: [{
                    value: '选项1',
                    label: '仓库1'
                }, {
                    value: '选项2',
                    label: '仓库2'
                }],
                valueSelect: '',
                radio2: 1,
                form: {stage: '', radio2: '', value3: '', desc: ''},
            }
        },
        methods: {
            handleCheckAllChange() {

            }
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
                  height: 62px;
                  display: flex;
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
