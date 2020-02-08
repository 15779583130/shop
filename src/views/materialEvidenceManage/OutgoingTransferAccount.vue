<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            出库交接台账
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
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="任务名称">
                      <el-select v-model="filters.ywzbywlx" placeholder="请选择" size="mini">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="物件名称">
                      <el-input v-model="filters.wzmc" placeholder="请输入物件名称" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请日期">
                      <el-col :span="10" style="display: flex;">
                      <el-date-picker
                        v-model="filters.beg_time"
                        type="date"
                        placeholder="请输入日期起" size="mini" value-format="yyyy-MM-dd">
                      </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                      <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                      <el-date-picker
                        v-model="filters.end_time"
                        type="date"
                        placeholder="请输入日期止" size="mini" value-format="yyyy-MM-dd">
                      </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
                      <el-button type="success" icon="el-icon-circle-plus" size="mini" @click="expRktz">导出台账</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" :span-method="objectSpanHeBing" :header-cell-style="{background:'#e6e6e6'}"
                  size="mini" border style="width: 100%"
                  highlight-current-row>
          <el-table-column label="序号" width="50" :formatter="xhFormat">

          </el-table-column>
          <el-table-column prop="ywzbywlx" label="任务名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqr_user_name_text" label="申请人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjr_user_text" label="交接人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" min-width="160px" :show-overflow-tooltip="true"  :formatter="dateFormat"></el-table-column>
          <el-table-column prop="jjsj" label="交接时间" min-width="160px" :show-overflow-tooltip="true"  :formatter="dateFormat"></el-table-column>
          <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzlb_lbmc" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="dwsl" label="数量及单位" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jjzt_text" label="交接状态" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <br/>
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
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: 'outgoingTransferAccount',
    data() {
      return {
        //筛选条件
        filters: {
         ywcb_crklx:'',
         ywzbywlx:'',
         wzmc:'',
         beg_time:'',
         end_time:''
        },
        //筛选条件
        filters2: {
          ywcb_crklx:'',
          ywzbywlx:'',
          wzmc:'',
          beg_time:'',
          end_time:''
        },
        options: [
          {value: '2', label: '调用'},
          {value: '3', label: '处置出库'},
          {value: '4', label: '移库'}
        ],
        checkList: ['选中且禁用', '复选框 A'],
        leftList: [],
        value1: new Date(),
        value2: new Date(),
        total: 0,
        currentPage: 1,
        pageSize: 10,
        checkAll: false,
        checkedBox: [],
        isIndeterminate: true,
        tableData: [],
        multipleSelection: [],
        spanData: [],
        spanData2: [],
        spanData3: [],
        xhData: [],
        rksData: [],
        ajMergeArr: [],
        ajMergeCountArr: [],
      }
    },
    created() {
        if (sessionStorage.getItem('chukujjtzSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('chukujjtzSession'))
        }
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
       this.findTable()
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
      handleClick(row) {
        console.log(row);
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      handleSizeChange(val) {
      this.pageSize = val
      this.findTable()
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val
        this.findTable()
      },
      findTable(){
         let that = this
        let timeComp = timeCompare( this.filters.beg_time, this.filters.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
                 pagenum: this.currentPage,
                 pagesize: this.pageSize,
                 wzmc: this.filters.wzmc,
                 beg_time: this.filters.beg_time,
                 end_time: this.filters.end_time,
                 ywzbywlx: this.filters.ywzbywlx
               }

        var parms = {}

        Object.assign(parms, param, this.filters)
        this.$api.entryTransferAccount.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count)

          this.tableData = res.body.default.dataset

          that.getSpanData(this.tableData)

          this.filters2 = this.filters;
        })

      },
      xhFormat(row, column, cellValue, index) {
        return this.xhData[index]
      },
      reset() {
        this.filters.wzmc = ''
        this.filters.beg_time = ''
        this.filters.end_time = ''
        this.filters.ywzbywlx = ''
      },
      expRktz(){
        var parms = {};
        this.filters2.beg_time = this.filters2.beg_time==null?'':this.filters2.beg_time
        this.filters2.end_time = this.filters2.end_time==null?'':this.filters2.end_time
          debugger
        Object.assign(parms, this.filters2)
          debugger
        this.$api.outgoingTransferAccount.exportExcelck(parms).then((res) => {
            debugger
          if (res.success === "true") {
            var downloadFileUrl = res.data
            var elemIF = document.createElement("iframe");
            elemIF.src = downloadFileUrl;
            elemIF.style.display = "none";
            debugger
            document.body.appendChild(elemIF);
          } else {
            this.$message({message: res.message, type: 'error'})
          }

        })

      },
      objectSpanHeBing({row, column, rowIndex, columnIndex}) {

        // 需要合并的列
        // [0, 1, 2].includes(columnIndex ), 表示合并前三列
        if (columnIndex >= 0 && columnIndex <= 4) {
          const _row = this.spanData[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }

      },
      // 计算需要合并的单元格
      getSpanData(data) {
          // 存放计算好的合并单元格的规则
          this.spanData = []

          this.xhData = []


          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.spanData.push(1)
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
              if (data[i].zrwdh === data[i - 1].zrwdh) {
                this.spanData[this.pos] += 1
                this.spanData.push(0)

              } else {
                this.spanData.push(1)
                this.pos = i
              }
            }
          }

          for (var i = 0; i < data.length; i++) {
            if (i === 0) {
              this.xhData.push(1)
            } else {
              if (data[i].zrwdh === data[i - 1].zrwdh) {
                this.xhData.push(this.xhData[i - 1])
              } else {
                this.xhData.push(this.xhData[i - 1] + 1)
              }
            }
          }

      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      }

    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('chukujjtzSession')
          sessionStorage.setItem('chukujjtzSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
