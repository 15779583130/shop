<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';

  .content_border{
    border: 1px solid #ffffff;
    border-radius: 12px;
    margin-bottom:40px
  }
  .content_border:last-child{
    margin-bottom:0px
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
            入库登记台账
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="物证名称">
                      <el-input v-model="filters.wzmc" placeholder="请输入物证名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="物证编号">
                      <el-input v-model="filters.wzbh" placeholder="请输入物证编号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="入库日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.rkrq1"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请输入日期起" size="mini">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.rkrq2"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请输入日期止" size="mini">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-search" size="mini" @click="reset">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="success" icon="el-icon-download"  size="mini" @click="dctzLoad">导出台账</el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange">
<!--          <el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="物证名称" width="120">
            <template slot-scope="scope">{{ scope.row.wzmc }}</template>
          </el-table-column>
          <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true" min-width="140px"></el-table-column>
          <el-table-column prop="wzsl" label="数量及单位" :show-overflow-tooltip="true" width="100px"></el-table-column>
          <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bgqx" label="保管期限" :show-overflow-tooltip="true" :formatter="bgqxFormatter" width="100px"></el-table-column>
          <el-table-column prop="rkyy" label="入库原因" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rksj" label="入库时间" :show-overflow-tooltip="true"   :formatter="dateFormat" min-width="120px"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <i @click="barcode(scope.row)" class="el-icon-printer"
                 style="font-size: 20px;cursor: pointer" title="打印"></i>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div class="page">
          <div class="page-content">
            <el-pagination
              background
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
    <el-dialog title="条码预览" :visible.sync="tmDialog" width="40%"
               :append-to-body="true"
               :modal="true">
      <div ref="print">
        <div v-if="printType==='batch'" v-for="item in multipleSelection" class="content_border">
          <div class="content" style="margin:20px 25px 10px 23px;border: 1px solid #000">
            <div style="text-align: center;">
              <img :id=" pre + item.id " style="width:210px;height: 60px"/>
            </div>
            <div style="margin-left:15px;padding-bottom: 20px;" class="myprint">
              <!-- <div style="width:450px;"> -->
              <p style="font-size: 8px;font-weight: 500">物证名称：{{item.wzmc}}</p>
              <p style="font-size: 8px;font-weight: 500">类别数量：{{item.wzlb}} {{item.wzsl}}</p>
              <p style="font-size: 8px;font-weight: 500">特征描述：{{item.wztz}}</p>
            </div>
          </div>
        </div>
        <div v-if="printType==='single'" style="border: 0px solid #000;border-radius: 12px;margin-bottom:10px">
          <div class="content" style="margin:20px 25px 10px 23px;border: 1px solid #000">
            <div style="text-align: center;">
              <img :id=" pre + tempRow.id " style="height: 60px;width: 210px"/>
            </div>
            <div style="margin-left:15px;padding-bottom: 18px;" class="myprint">
              <!-- <div style="width:450px;"> -->
              <p style="font-size: 8px;font-weight: 500">物证名称：{{tempRow.wzmc}}</p>
              <p style="font-size: 8px;font-weight: 500">类别数量：{{tempRow.wzlb}} {{tempRow.wzsl}}</p>
              <p style="font-size: 8px;font-weight: 500">特征描述：{{tempRow.wztz}}</p>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: flex-end;align-items: center;margin-top: 20px;">
        <el-button type="info" size="mini" @click="doPrint()">打印</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import JsBarcode from "jsbarcode";
  export default {
    name: 'entryTransferAccount',
    data() {
      return {
        pre:'preid',//一维码id前缀
        printType:'single',
        tempRow: {},
        tmDialog: false,
        disTzDaoChu: true,
        filters: {
          wzmc: '',
          wzbh: '',
          rkrq1: '',
          rkrq2: ''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        checkAll: false,
        checkedBox: [],
        isIndeterminate: true,
        tableData: [],
        multipleSelection: []
      }
    },
    created() {
        if (sessionStorage.getItem('rukudjtzSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('rukudjtzSession'))
        }
      this.findTable()
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
      doPrint () {
        this.$print(this.$refs.print)
      },
      barcode (row) {
        this.printType = 'single'
        this.tempRow = row
        debugger
        this.tmDialog = true
        this.$nextTick(() => {
          JsBarcode('#'+this.pre+row.id, row.dwwzbm, {
            format: 'CODE128', // 选择要使用的条形码类型
            fontOptions:"bold",//使文字加粗体或变斜体
            fontSize: '20px',
            text: row.dwwzbm,
            marginTop:10,
            displayValue: true, // 是否在条形码下方显示文字
            textPosition: 'bottom' // 设置文本的垂直位置,
          })
        })
      },
      batchPrint(){
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请先选择未入库的物证信息',
            showClose: true,
            type: 'warning'
          })
          return false
        }
        this.printType = 'batch'
        this.tmDialog = true
        this.$nextTick(() => {
          this.multipleSelection.forEach(item=>{
            JsBarcode('#'+this.pre+item.id, item.dwwzbm, {
              format: 'CODE128', // 选择要使用的条形码类型
              fontOptions:"bold",//使文字加粗体或变斜体
              fontSize: '18px',
              text: item.dwwzbm,
              marginTop:10,
              displayValue: true, // 是否在条形码下方显示文字
              textPosition: 'bottom' // 设置文本的垂直位置,
            })
          })
        })
      },
      handleClick() {
        this.$message({message: '该功能尚未上线...', type: 'warning'})
      },
      handleCheckAllChange(val) {
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.leftList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.leftList.length;
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      handleDelete(row) {
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: row.id
          };
          this.$api.entryRegistrationAcount.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      findTable() {

        let timeComp = timeCompare(this.filters.rkrq1, this.filters.rkrq2)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        let self = this
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.entryRegistrationAcount.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          if (res.body.default.dataset.length >= 1) {
            self.disTzDaoChu = false
            res.body.default.dataset.forEach(function (e, i) {
              e.rksj = timeFormat(e.rksj)
            })
          }
          this.tableData = res.body.default.dataset;
        })
      },
      dctzLoad () {

        var parms = {};
        Object.assign(parms, this.filters)
        this.$api.entryRegistrationAcount.exportRkdjtz(parms).then((res) => {
          if (res.success == "true") {
            debugger

            var downloadFileUrl =res.data
            var elemIF = document.createElement("iframe");
            elemIF.src = downloadFileUrl;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
          } else {
            this.$message({message: res.message, type: 'error'})
          }

        })

      },
      bgqxFormatter(row, column, value) {
        if (value === '9999-12-31') {
          value = '长期'
        } else if (value === '' || value == undefined) {
          value = '-'
        } else {
          value = timeFormat(value).substring(0, 10)
        }
        return value
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      reset() {
        this.filters.wzmc = '';
        this.filters.wzbh = '';
        this.filters.rkrq1 = '';
        this.filters.rkrq2 = '';
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rukudjtzSession')
          sessionStorage.setItem('rukudjtzSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
