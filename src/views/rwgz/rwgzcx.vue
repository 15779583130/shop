<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            任务跟踪查询
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="任务流水号" prop="ajbh">
                      <el-input v-model="filters.lsh" size="mini" placeholder="请输入任务流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="发起人" prop="ajmc">
                      <el-input v-model="filters.fqrxm" size="mini" placeholder="请输入发起人"></el-input>
                    </el-form-item>
                    <el-form-item label="发起日期" clase="large">
                      <el-date-picker
                        size="mini"
                        v-model="filters.begin_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.end_time"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right"  @click="reset" size="mini">重置
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-row class="form-line">
                    <el-form-item label="任务类型" prop="rklsh">
                      <el-select v-model="filters.rwlx" placeholder="请选择">
                        <el-option
                          v-for="item in rwlxOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="终结标志" prop="sqrxm">
                      <el-select v-model="filters.zjbz" placeholder="请选择">
                        <el-option
                          v-for="item in zjbzOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-row>

                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :span-method="objectSpanHeBing" :header-cell-style="{background:'#e6e6e6'}"
                    size="mini" border style="width: 100%"
                    highlight-current-row>
            <el-table-column prop="xh" label="序号" width="50px" align="center" :formatter="xhFormat">
            </el-table-column>
            <el-table-column prop="lsh" label="流水号" min-width="100px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="rwlx" label="任务类型" width="100px" :show-overflow-tooltip="true"
                             :formatter="formatRwlx">
            </el-table-column>
            <el-table-column prop="fqrxm" label="发起人" width="100px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="fqsj" label="发起时间" width="160px" :show-overflow-tooltip="true"
                             :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="zjbz" label="终结标志" width="100px" :show-overflow-tooltip="true"
                             :formatter="formatZjbz">
            </el-table-column>
            <el-table-column prop="zrwdh" label="任务单号" min-width="150px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="cbrwzt" label="任务状态" width="100px" :show-overflow-tooltip="true"
                             :formatter="formatCbrwzt">
            </el-table-column>

            <el-table-column
              fixed="right"
              align="center"
              label="操作" width="100px">
              <template slot-scope="scope">
                <i @click="detail(scope.row)" class="el-icon-view" style="font-size: 20px" title="任务跟踪预览"></i>
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
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import casePreview from "../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    data() {
      return {
        filterText1: '',
        treeData1: [],
        treeProps1: {
          children: 'children',
          label: 'name'
        },
        rwlxOptions: [
          {value: '1', label: '入库'},
          {value: '2', label: '调用'},
          {value: '3', label: '移库'},
          {value: '4', label: '处置权移送'},
          {value: '5', label: '处置权退回'},
          {value: '6', label: '处置'}
        ],
        zjbzOptions: [
          {value: '0', label: '未终结'},
          {value: '1', label: '已终结'}

        ],
        //筛选条件
        filters: {
          begin_time: '',
          end_time: '',
          rwlx: '',
          lsh: '',
          fqrxm: '',
          zjbz: ''

        },
        options: [],
        value: '',
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        gridData: [],
        tableData: [],
        name: '',
        orgCode: '',
        query: {
          parameters: {}
        },
        tableColumns: [],
        data1: [{}],
        ajxxTableData: [],
        ajTotal: 0,
        ajCurrentPage: 1,
        ajPageSize: 5,
        more: false,
        spanData: [],

        xhData: [],

        wzxx_id: ''
      }
    },
    created() {
        if (sessionStorage.getItem('rwgzcxSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('rwgzcxSession'))
        }
      this.init()
    },
    watch: {
      filterText1(val) {
        this.$refs.tree1.filter(val);
      },
    },
    methods: {
      filterNode1(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
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
            if (data[i].ywzb_id === data[i - 1].ywzb_id) {
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
            if (data[i].ywzb_id === data[i - 1].ywzb_id) {
              this.xhData.push(this.xhData[i - 1])
            } else {
              this.xhData.push(this.xhData[i - 1] + 1)
            }
          }
        }

      },
      objectSpanHeBing({row, column, rowIndex, columnIndex}) {
        // 需要合并的列
        // [0, 1, 2].includes(columnIndex ), 表示合并前三列
        if (columnIndex >= 0 && columnIndex <= 5) {
          const _row = this.spanData[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      xhFormat(row, column, cellValue, index) {
        return this.xhData[index]
      },
      rksFormat(row, column, cellValue, index) {
        if (this.ajMergeArr.indexOf(row.ajxx_id) > -1) {
          var index = this.ajMergeArr.indexOf(row.ajxx_id)
          return this.ajMergeCountArr[index]
        }
      },
      formatRwlx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '入库'
        } else if (cellValue == '2') {
          returnValue = '调用'
        } else if (cellValue == '3') {
          returnValue = '移库'
        } else if (cellValue == '4') {
          returnValue = '处置权移送'
        } else if (cellValue == '5') {
          returnValue = '处置权退回'
        } else if (cellValue == '6') {
          returnValue = '处置'
        }
        return returnValue;
      },
      formatCbrwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未完成'
        } else if (cellValue == '1') {
          returnValue = '已完成'
        }else if (cellValue == '2') {
          returnValue = '任务暂停'
        }
        return returnValue;
      }, formatZjbz(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未终结'
        } else if (cellValue == '1') {
          returnValue = '已终结'
        }
        return returnValue;
      },
      findTable() {


        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };

        this.filters.begin_time = this.filters.begin_time==null?'':this.filters.begin_time
         this.filters.end_time = this.filters.end_time==null?'':this.filters.end_time
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.rwgz.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.getSpanData(this.tableData)
        })
      },
      reset() {
        var obj = {
          beg_time: '',
          end_time: '',
          rwlx: '',
          lsh: '',
          fqrxm: '',
          zjbz: ''
        }
        this.filters = obj;
      },
      init() {
        // 查询信息
        this.findTable();
      },
      detail(row) {
        sessionStorage.removeItem('rwgzyl')
        sessionStorage.setItem('rwgzyl', JSON.stringify(row))
        this.$router.push({
          name: 'rwgzyl',
          params: {
            id: row.ywcb_id,
            sfwlps: row.sfwlps,
          }
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rwgzcxSession')
          sessionStorage.setItem('rwgzcxSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>

<style scoped>

</style>
