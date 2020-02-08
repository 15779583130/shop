<template>
  <el-card class="box-card">
    <div style="background:#F6F6F6;text-align: center;margin-bottom:5px">
      <el-button size="mini" type="warning" icon="el-icon-circle-close" @click="close">关闭</el-button>
    </div>
    <div class="wrapper">
      <div class="time-line">
        <div class="item complete">
          <div class="bar">
            <div class="icon first iconfont icon-jingcha pointer" @click="pdsqOpen">
              <!--<span class="type-icon"></span>-->
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">陈警官</i>发起移库申请单</span>
              </div>
            </div>
            <div class="icon iconfont icon-baoguanyuan pointer" @click="pdfkOpen">
              <span class="type-icon icon-danzi"></span>
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">李仓管</i>处理移库申请单</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item fail" style="z-index:10;">
          <div class="bar">
            <div class="icon iconfont icon-kuaidiyuan pointer" @click="wzjjOpen">
              <span class="type-icon iconfont icon-wuliu"></span>
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">取件员</i>张三</span>
                <span>身份证号：xxxxxxxxxxx</span>
                <span>身份核验：<i class="warn">不成功</i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" style="z-index:9;">
          <div class="bar">
            <div class="icon iconfont icon-jiaojie">
              <span class="type-icon iconfont icon-wuliu"></span>
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">物证交接完成</i></span>
                <span>出单号：00000124</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" style="z-index:8;">
          <div class="bar">
            <div class="icon iconfont icon-qianzi pointer" @click="pdhcOpen">
              <!--          <span class="type-icon"></span>-->
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">取件员</i>王xx 确认签字</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" style="z-index:7;">
          <div class="bar">
            <div class="icon iconfont icon-wuliu pointer" @click="wlxxOpen">
              <!--          <span class="type-icon"></span>-->
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">物流配送</i></span>
                <span>物流单号：WL11111111</span>
                <span>送货员：王XX</span>
                <span>车号：闽D132222</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" style="z-index:6;">
          <div class="bar">
            <div class="icon iconfont icon-qianshou">
              <span class="type-icon icon-shoujian"></span>
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">物证签收成功</i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" style="z-index:5;">
          <div class="bar">
            <div class="icon iconfont icon-cangku">
              <!--          <span class="type-icon"></span>-->
              <div class="text-box">
                <span>2019年10月9日 上午10:00</span>
                <span><i class="important">物证移入新库</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="派单申请" :visible.sync="dialogpdsq" width="60%" :append-to-body="true">
        <div class="dialog">
          <div class="title">申请信息</div>
          <div class="apply-info">
            <div class="item">
              <span><label>申请单号</label>GRW19120511000000008</span>
            </div>
            <div class="item">
              <span><label>单号类型</label>入库</span>
            </div>
            <div class="item">
              <span><label>押运级别</label>普通押运</span>
            </div>
            <div class="item">
              <span><label>预约时间</label>2019-12-12 12:10:10 至2019-12-12 13:10:10</span>
            </div>
          </div>
          <div class="address">
            <div class="line">
              <i class="icon">寄</i>
              <span>张三 | 13800000000 | 福建省厦门市思明区观音山</span>
            </div>
            <div class="line">
              <i class="icon receipt">收</i>
              <span>张三 | 13800000000 | 福建省厦门市思明区观音山</span>
            </div>
          </div>
          <div>
            <div class="title">物证信息</div>
            <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                      size="mini">
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="派单反馈" :visible.sync="dialogpdfk" width="60%" :append-to-body="true">
        <div class="dialog">
          <div class="title">反馈信息</div>
          <div class="apply-info">
            <div class="item">
              <span><label>申请单号</label>GRW19120511000000008</span>
            </div>
            <div class="item">
              <span><label>单号类型</label>入库</span>
            </div>
            <div class="item">
              <span><label>押运级别</label>普通押运</span>
            </div>
            <div class="item">
              <span><label>预约时间</label>2019-12-12 12:10:10 至2019-12-12 13:10:10</span>
            </div>
          </div>
          <div class="handover-info">
            <div class="title">交接人信息</div>
            <div class="line">
              <div class="pic"><img :src="emptyImg" alt=""></div>
              <div class="msg">
                <div class="name">张胜男</div>
                <div>
                  <span><i class="iconfont icon-shouji"></i>13865214561</span>
                  <span><i class="iconfont icon-shenfenzheng"></i>13865214561</span>
                </div>
              </div>
            </div>
            <div class="title">司机信息</div>
            <div class="line">
              <div class="pic"><img :src="emptyImg" alt=""></div>
              <div class="msg">
                <div class="name">张胜男</div>
                <div>
                  <span><i class="iconfont icon-shouji"></i>13865214561</span>
                  <span><i class="iconfont icon-shenfenzheng"></i>35062215245741</span>
                  <span><i class="iconfont icon-huaban"></i>C001</span>
                  <span><i class="iconfont icon-chepaihao"></i>闽D12345</span>
                </div>
              </div>
            </div>
            <div class="apply-info">
              <div class="item">
                <span><label>签收状态</label>未签收</span>
              </div>
              <div class="item">
                <span><label>签收人</label>李某某</span>
              </div>
              <div class="item">
                <span><label>签收时间</label>2019-12-12 12:10:10</span>
              </div>
            </div>
          </div>
          <div>
            <div class="title">信息列表</div>
            <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                      size="mini">
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="物证交接" :visible.sync="dialogwzjj" width="60%" :append-to-body="true">
        <div class="dialog">
          <div class="handover-info">
            <div class="title">交接信息</div>
            <div class="line">
              <div class="pic goods"><img :src="emptyImg" alt=""></div>
              <div class="apply-info">
                <div class="item">
                  <span><label>申请单号</label>GRW19120511000000008</span>
                </div>
                <div class="item">
                  <span><label>运单号</label>Y001</span>
                </div>
                <div class="item">
                  <span><label>物流状态</label>配载</span>
                </div>
                <div class="item">
                  <span><label>交接状态</label>已交接</span>
                </div>
                <div class="item">
                  <span><label>交接时间</label>2019-12-10 15:00:00</span>
                </div>
              </div>
            </div>
            <div class="title">交接人信息</div>
            <div class="line">
              <div class="pic"><img :src="emptyImg" alt=""></div>
              <div class="msg">
                <div class="name">张胜男</div>
                <div>
                  <span><i class="iconfont icon-shouji"></i>13865214561</span>
                  <span><i class="iconfont icon-shenfenzheng"></i>13865214561</span>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div class="title">交接清单</div>
            <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                      size="mini">
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="派单回传" :visible.sync="dialogpdhc" width="60%" :append-to-body="true">
        <div class="dialog">
          <div class="handover-info">
            <div class="title">交接信息</div>
            <div class="line">
              <div class="pic goods"><img :src="emptyImg" alt=""></div>
              <div class="apply-info">
                <div class="item">
                  <span><label>申请单号</label>GRW19120511000000008</span>
                </div>
                <div class="item">
                  <span><label>运单号</label>Y001</span>
                </div>
                <div class="item">
                  <span><label>物流状态</label>配载</span>
                </div>
                <div class="item">
                  <span><label>交接状态</label>已交接</span>
                </div>
                <div class="item">
                  <span><label>交接时间</label>2019-12-10 15:00:00</span>
                </div>
              </div>
            </div>
            <div class="title">交接人信息</div>
            <div class="line">
              <div class="pic"><img :src="emptyImg" alt=""></div>
              <div class="msg">
                <div class="name">张胜男</div>
                <div>
                  <span><i class="iconfont icon-shouji"></i>13865214561</span>
                  <span><i class="iconfont icon-shenfenzheng"></i>13865214561</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="title">回传物证清单</div>
            <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                      size="mini">
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="物流实时信息" :visible.sync="dialogwlxx" width="60%" :append-to-body="true">
        <div class="dialog">
          <div class="title">您的包裹正在路上</div>
          <div class="logistics-msg">
            <div class="line">
              <span class="date">2019-12-10 周一</span>
              <span>10:45:23</span>
              <span>包裹正在等待揽收</span>
            </div>
            <div class="line same-day">
              <span>10:45:23</span>
              <span>包裹正在等待揽收</span>
            </div>
            <div class="line">
              <span class="date">2019-12-10 周四</span>
              <span>10:11:23</span>
              <span>包裹正在等待揽收</span>
            </div>
            <div class="line same-day">
              <span>10:45:23</span>
              <span>包裹正在等待揽收</span>
            </div>
          </div>
          <div class="title">物流信息</div>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "rwgzyl",
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        emptyImg: require("@/images/no-img.png"),
        dialogpdsq: false,
        dialogpdfk: false,
        dialogwzjj: false,
        dialogpdhc: false,
        dialogwlxx: false,
      }
    },
    created() {

    },
    methods: {
      pdsqOpen() {
        let that = this
        that.dialogpdsq = true;
      },
      pdfkOpen() {
        let that = this
        that.dialogpdfk = true;
      },
      wzjjOpen() {
        let that = this
        that.dialogwzjj = true;
      },
      pdhcOpen() {
        let that = this
        that.dialogpdhc = true;
      },
      wlxxOpen() {
        let that = this
        that.dialogwlxx = true;
      },
      close() {
        this.$util.goBack(this)
      },
    },
  }
</script>

<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
  @import "../../styles/iconfont/iconfont.css";

  .wrapper {
    background-color: #f5f5f5;
  }

  .time-line {
    display: flex;
    height: 590px;
    padding: 20px 120px;

    .item {
      /*width: 14.28%;*/
      width: 180px;
      display: flex;
      align-items: center;

      .bar {
        height: 10px;
        background: #e6e6e6;
        width: 100%;
        position: relative;
        z-index: 666;

        .icon {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          right: -30px;
          transform: translate(0, -50%);
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
          font-style: normal;

          &:before {
            font-size: 22px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #9c9c9c;
          }

          &.first {
            right: auto;
            left: -30px;

            &:after {
              top: auto;
              bottom: -54px;
            }

            .type-icon {
              top: 70px;
            }

            .text-box {
              top: auto;
              bottom: -110px;
            }
          }

          &:after {
            content: "";
            border-left: 1px solid #ddd;
            position: absolute;
            left: 50%;
            top: -54px;
            transform: translate(-50%, 0);
            height: 54px;
          }

          .type-icon {
            display: block;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #ebebeb;
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translate(-50%, 0);
            background: #fff;
            z-index: 23;
            text-align: center;
            line-height: 28px;

            &:before {
              font-size: 16px;
              color: #999;
            }
          }

          .text-box {
            position: absolute;
            bottom: 110px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 185px;
            min-height: 58px;
            border: 1px dashed #ebebeb;
            background: #fff;
            font-size: 12px;
            color: #696969;
            padding: 6px 5px 6px 7px;
            box-sizing: border-box;
            z-index: 24;
            line-height: 18px;

            span {
              display: block;
            }

            .important {
              color: #333;
              padding-right: 5px;
              font-weight: bold;
              font-style: normal;
            }
          }
        }

        .pointer {
          cursor: pointer;
        }
      }

      &.complete {
        .bar {
          background: #2570b3;

          .icon {
            &:before {
              color: #2570b3;
            }
          }
        }
      }

      /*失败*/

      &.fail {
        .bar {
          background: #e53c1b;

          .icon {
            &:before {
              color: #e53c1b;
            }

            .type-icon {
              background: #e53c1b;

              &:before {
                color: #fff;
              }
            }

            .text-box {
              border: 1px dashed #e53c1b;

              span {
                .warn {
                  font-style: normal;
                  color: #e53c1b;
                }
              }
            }
          }
        }
      }

      &:nth-child(2n) {
        .icon {
          &:before {
            /*color: #e53c1b;*/
          }

          &:after {
            top: auto;
            bottom: -54px;
          }

          .type-icon {
            top: 70px;
          }

          .text-box {
            top: 110px;
            bottom: auto;
          }
        }
      }
    }
  }

  /* 弹窗*/
  .dialog {
    padding: 0 10px;

    .title {
      height: 28px;
      font-size: 14px;
      font-weight: bold;
      line-height: 28px;
      border-bottom: 1px solid #ddd;
      padding: 0 10px;
    }

    .apply-info {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px dashed #eee;
      padding: 4px 0;
      margin: 0 10px;

      .item {
        width: 50%;
        font-size: 12px;
        line-height: 28px;

        label {
          color: #999;
          padding-right: 8px;
        }

        span {
          color: #333;
        }
      }
    }

    .address {
      padding: 10px 0;
      margin: 0 10px;

      .line {
        line-height: 24px;
        padding: 0 0 20px;
        font-size: 12px;
        position: relative;

        &:before {
          content: "";
          height: 100%;
          border-left: 1px solid #ddd;
          position: absolute;
          top: 0;
          left: 11px;
        }

        &:last-child {
          padding-bottom: 0;
        }

        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          font-size: 12px;
          background: #2e90e6;
          display: inline-block;
          margin-right: 5px;
          position: relative;
          z-index: 3;

          &.receipt {
            background: #f1af00;
          }
        }
      }
    }

    /*  交接信息*/

    .handover-info {
      .title {
        color: #999;
        border-bottom: 0;
      }

      .line {
        border-bottom: 1px dashed #eee;
        position: relative;
        display: flex;
        font-size: 12px;
        padding: 10px 0;
        margin: 0 10px;

        .pic {
          width: 48px;
          height: 48px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }

          &.goods {
            width: 80px;
            height: 80px;
            border-radius: 0;
            flex-basis: 80px;
          }
        }

        .msg {
          flex-grow: 1;
          padding: 0 0 0 10px;
          display: flex;
          align-content: center;
          flex-wrap: wrap;

          div {
            width: 100%;
            line-height: 24px;
          }

          .name {
            font-weight: bold;
          }

          span {
            padding-right: 18px;

            i {
              display: inline-block;
              padding-right: 3px;

              &:before {
                font-size: 16px;
              }
            }
          }
        }
      }

      .apply-info {
        margin: 0;
        padding: 0 10px;
        flex-grow: 1;
        border-bottom: 0;
        box-sizing: border-box;
      }
    }
  }

  /*  物流进度*/
  .logistics-msg {
    font-size: 12px;
    position: relative;
    margin: 5px 6px;

    &:before {
      content: "";
      border-left: 2px solid #ddd;
      position: absolute;
      height: 100%;
      left: 6px;
      top: 8px;
    }

    &:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      left: 0;
      bottom: -8px;
      background: #fff;
      z-index: 2;
    }

    .line {
      line-height: 30px;
      padding-left: 20px;
      position: relative;
      z-index: 5;

      &:before {
        content: "";
        width: 14px;
        height: 14px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }

      &:after {
        content: "";
        width: 6px;
        height: 6px;
        background: #ddd;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translate(0, -50%);
        z-index: 2;
      }

      span {
        padding-right: 10px;
      }

      .date {
        font-weight: bold;
        width: 118px;
        display: inline-block;
      }

      /*  同一天信息*/

      &.same-day {
        padding-left: 141px;
      }

      &:last-child {
        &:after {
          background: #f1af00;
        }
      }
    }
  }
</style>
