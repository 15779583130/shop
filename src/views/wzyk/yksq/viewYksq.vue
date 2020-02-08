<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  /deep/ .el-dialog__body {
    padding-top: 0px;
  }

  .main-con {
    padding: 0 5px;
    .btn-text-box{
      margin-top: 10px;
      .btn-text {
        float: right;
        span {
          .line {
            width: 100px;
            border: none;
            border-bottom: 1px solid #000;
            line-height: 20px;
          }
          em{
            font-style: normal;
          }
          line-height: 32px;
          padding: 30px;
        }
      }
    }
    .btn-box{
      float: right;
      margin-top: 20px;
    }
  }
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            移库申请信息
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
              <el-form ref="form" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="6">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="移库流水号">
                      <el-input v-model="formInline.lsh" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请时间">
                      <el-input v-model="formInline.sqsj" size="mini" clearable readonly="readonly"
                                style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item label="" class="id-button">
                      <el-button type="success"  size="mini" @click="dialogUpLoadClick()">查看文件</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            任务清单
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange" @expand-change="getWzmx" >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#e6e6e6'}" border
                        size="mini">
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzsl" label="数量及单位" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="jjzt" label="交接状态" :formatter="formatMxjjzt"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="jjsj" label="交接时间" :formatter="dateFormat"
                                 :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zrwdh" label="任务单号" min-width="170px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ckjc" label="保管中心" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sfkbm" label="是否跨部门移库"  :formatter="formatSfkbm" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jsqr_dept_name" label="接收部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqyy" label="移库原因" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rwzt" label="任务状态" min-width="80px" :formatter="formatRwzt"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjzt" label="交接状态" min-width="80px" :formatter="formatCbjjzt"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="state" label="派单状态" width="80px" :show-overflow-tooltip="true" :formatter="formatState"></el-table-column>
          <el-table-column prop="sfwlps" label="是否物流配送" :show-overflow-tooltip="true" :formatter="formatSfkbm"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="120px">
            <template slot-scope="scope">
              <i  class="el-icon-close" v-if= "scope.row.state=='1'"
                  style="font-size: 20px;" title="派单撤销" @click="pdcx(scope.row)"></i>
              <i  class="el-icon-circle-close" v-if= "scope.row.state=='8'"
                  style="font-size: 20px;" title="派单强制撤销" @click="pdqzcx(scope.row)"></i>
              <i   class="el-icon-view"
                  style="font-size: 20px;" title="任务流程跟踪" @click="rwgz(scope.row)"></i>
              
            </template>
          </el-table-column>
        </el-table>
        <div class="page" style="">
          <div class="page-content">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    <upload-file @passData="getData" :yssqid="this.ywid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
  </el-card>
</template>

<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat} from '@/utils/datetime'
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile"
  export default {
    name: 'entryRegistration',
    components: {
      casePreview,
      uploadFile
    },
    data() {
      return {
        ywid: '',
        isView:true,
        dialogUpLoad: false,
        getFileData: false,
        formInline: this.$route.params,
        options: [
          {value: 'xm', label: '录入人员'},
          {value: 'fz', label: '录入人员'},
          {value: 'sh', label: '移库'}
        ],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        centerDialogVisible: false,
        wzxx_id:'',
        multipleSelection: [],
        filterText: '',
        treeData: [],
        ywcbid: '',
        treeProps: {
          children: 'child',
          label: 'name'
        },
        dialogVisible: false,
        pdjjDialog: false,
        wzmxTableData: [],
        wlpdxx: {},
        txrylist: [],
        wzxxlist: [],
        jjczShow:true,
        jjylShow:false

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
        this.formInline = JSON.parse(sessionStorage.getItem('ckyssqxx'))
        this.formInline.sqsj = timeFormat(JSON.parse(sessionStorage.getItem('ckyssqxx')).sqsj)
        this.formInline.zjzt = this.formatZbzt(JSON.parse(sessionStorage.getItem('ckyssqxx')).zjzt)
        this.findTable();
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      dateFormat(row, column, cellValue, index) {
        return timeFormat(cellValue)
      },
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      rwgz(row) {
        sessionStorage.removeItem('rwgzyl')
        sessionStorage.setItem('rwgzyl', JSON.stringify(row))
        this.$router.push({
          name: 'rwgzyl',
          params: {
            id: row.id,
            sfwlps: row.sfwlps,
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      wjxz(){
        this.downLoadJjwj(this.ywcbid)

      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },
      dialogUpLoadClick () {
        this.isView = true
        this.ywid = this.formInline.id
        this.dialogUpLoad = true
        this.getFileData = true
      },
      downLoadJjwj(id){
        let that = this
        var param = {
          id: id
        };
        that.$api.rksq.exportWlpdWord(param).then((res) => {
          if (res.success == "true") {
            /*that.$message({message: '操作成功', type: 'success'})*/
            var downloadFileUrl = res.message
            var elemIF = document.createElement("iframe");
            elemIF.src = downloadFileUrl;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
            that.pdjjDialog = false

          } else {
            that.$message({message: res.message, type: 'error'})
          }

        })
      },
      /* rwgz(row) {
        sessionStorage.removeItem('rwgzyl')
        sessionStorage.setItem('rwgzyl', JSON.stringify(row))
        this.$router.push({
          name: 'rwgzyl',
          params: {
            id: row.id,
            sfwlps: row.sfwlps,
          }
        })
      }, */
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          id: this.formInline.id,
          ajxx_id:this.formInline.ajxx_id
        };
        this.$api.yksq.queryYxYwcb(param).then((res) => {

          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function (c) {
            var param2 = {
              ywcb_id: c.ywcb_id
            };
            that.$api.yksq.queryYxYswz(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      pdcx (row) {
        this.$confirm('确定是否撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          }
          this.$api.rksq.cancelPd(params).then((res) => {
            if (res.success === 'true') {
              this.$message({message: '操作成功，正在执行撤销', type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable()
          })
        })
      },
      pdqzcx (row) {
        this.$confirm('确定是否强制撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          }
          this.$api.rksq.qzCancelPd(params).then((res) => {
            if (res.success === 'true') {
              this.$message({message: '强制撤销成功', type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable()
          })
        })
      },
      formatState (row, column, cellValue, index) {
        var returnValue = cellValue
        if (cellValue === '0') {
          returnValue = '待提交'
        } else if (cellValue === '1') {
          returnValue = '已提交'
        } else if (cellValue === '2') {
          returnValue = '已接单'
        } else if (cellValue === '3') {
          returnValue = '配载中'
        } else if (cellValue === '4') {
          returnValue = '已签收'
        } else if (cellValue === '5') {
          returnValue = '已回单'
        } else if (cellValue === '6') {
          returnValue = '撤销中'
        } else if (cellValue === '7') {
          returnValue = '已撤销'
        } else if (cellValue === '8') {
          returnValue = '撤销失败'
        }
        return returnValue
      },
      formatCbjjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未领取'
        } else if (cellValue == '1') {
          returnValue = '部分交接'
        } else if (cellValue == '2') {
          returnValue = '全部交接'
        }else if (cellValue == '3') {
          returnValue = '出库交接完成'
        }else if (cellValue == '4') {
          returnValue = '入库交接完成'
        }
        return returnValue;
      },
      formatSfkbm(row, column, cellValue, index){
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '否'
        } else if (cellValue == '1') {
          returnValue = '是'
        }
        return returnValue;
      },
      formatRwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '待申请'
        } else if (cellValue == '1') {
          returnValue = '已申请'
        } else if (cellValue == '2') {
          returnValue = '物流配送中'
        } else if (cellValue == '9') {
          returnValue = '已完成'
        }
        return returnValue;
      },
      formatMxjjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未交接'
        } else if (cellValue == '1') {
          returnValue = '已交接'
        } else if (cellValue == '2') {
          returnValue = '拒收'
        }
        return returnValue;
      },
      formatBgqx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '9999-12-31') {
          returnValue = '长期'
        }
        return returnValue;
      },
      formatZbzt(value) {
        var returnValue = value;
        if (value == '0') {
          returnValue = '待申请'
        } else if (value == '1') {
          returnValue = '已申请'
        } else if (value == '2') {
          returnValue = '处理中'
        } else if (value == '9') {
          returnValue = '已终结'
        }
        return returnValue;
      },
      formatSl(row, column, cellValue, index) {
        return row.sl + '/' + row.backsl
      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.rksq.queryYwcbWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      pdcx(row){
        this.$confirm('确定是否撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          };
          this.$api.rksq.cancelPd(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: '操作成功，正在执行撤销', type: 'success'})

            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      pdqzcx(row){
        this.$confirm('确定是否强制撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          };
          this.$api.rksq.qzCancelPd(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: '强制撤销成功', type: 'success'})

            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      }
    }
  }
</script>
