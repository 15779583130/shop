<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            处置权退回台账
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" size="mini" placeholder="请输入案件编号" ></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" size="mini" placeholder="请输入案件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="接收日期" clase="large">
                      <el-date-picker
                        size="mini"
                        v-model="filters.jsqrsjq"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="请选择起始日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.jsqrsjz"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="请选择结束日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset" size="mini">重置
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-row class="form-line">
                    <el-form-item label="嫌疑人" >
                      <el-input v-model="filters.xyr" size="mini" placeholder="请输入嫌疑人"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人" >
                      <el-input v-model="filters.sqr_name" size="mini" placeholder="请输入申请人"></el-input>
                    </el-form-item>
                    <el-form-item label="申请日期">
                      <el-date-picker
                        size="mini"
                        v-model="filters.sqsjq"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="请选择起始日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.sqsjz"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="请选择结束日期">
                      </el-date-picker>
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
        <el-button type="success" icon="el-icon-download" @click="daoChuTzhang" size="mini">导出台账</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange" @expand-change="getWzxx">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzxxTableData" tooltip-effect="dark" style="width: 100%" border
                        size="mini" :header-cell-style="{background:'#e6e6e6'}">
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="100">
                </el-table-column>
                <el-table-column prop="wzxx_sl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzbh" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true" min-width="180">
          </el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="120">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="xyr" label="嫌疑人" :show-overflow-tooltip="true" width="80">
          </el-table-column>
          <el-table-column prop="ysbh" label="任务单号"  :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column prop="sqsj" label="申请时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="150">
          </el-table-column>
          <el-table-column prop="jsqrsj" label="接收时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="150">
          </el-table-column>
          <el-table-column prop="sqr_name" label="申请人" :show-overflow-tooltip="true" width="80">
          </el-table-column>
          <el-table-column prop="sqr_dept_name" label="申请部门" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column prop="yszt" label="状态" min-width="100px" :formatter="formatYszt" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" width="120px" fixed="right" align="center">
            <template slot-scope="scope">
              <i class="el-icon-view"
                 style="font-size: 20px;" @click="viewClick(scope.row)" title="查看"></i>
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
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" ></case-preview>
  </el-card>
</template>
<script>
import casePreview from '../../my-components/casePreview/casePreview'
import {timeFormat, timeCompare} from '@/utils/datetime'

export default {
  components: {
    casePreview
  },
  data () {
    return {
      treeProps1: {
        children: 'children',
        label: 'name'
      },
      // 筛选条件
      filters: {
        ajbh: '',
        ajmc: '',
        sqsjq: '',
        sqsjz: '',
        sqr_name: '',
        xyr: '',
        jsqrsjq: '',
        jsqrsjz: '',
        ysxxcb_id: '',
        ajxx_id: ''
      },
      treeType: '',
      selectNode: {},
      options: [],
      value: '',
      centerDialogVisible: false,
      // 分页信息
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      multipleSelection: [],
      wzxxTableData: [],
      name: '',
      orgCode: '',
      query: {
        parameters: {}
      },
      tableColumns: [],
      more: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    daoChuTzhang () {
      var parms = {}
      if (this.filters.sqsjq == null) {
        this.filters.sqsjq = ''
      }
      if (this.filters.sqsjz == null) {
        this.filters.sqsjz = ''
      }
      if (this.filters.jsqrsjq == null) {
        this.filters.jsqrsjq = ''
      }
      if (this.filters.jsqrsjz == null) {
        this.filters.jsqrsjz = ''
      }
      Object.assign(parms, this.filters)

      this.$api.czqthtz.exportCzqthtz(parms).then((res) => {
        if (res.success === 'true') {
          var downloadFileUrl = res.data
          var elemIF = document.createElement('iframe')
          elemIF.src = downloadFileUrl
          elemIF.style.display = 'none'
          document.body.appendChild(elemIF)
        } else {
          this.$message({message: res.message, type: 'error'})
        }
      })
    },
    formatYszt (row, column, cellValue, index) {
      var zjztFormat = cellValue
      if (cellValue === '0') {
        zjztFormat = '待移送'
      } else if (cellValue === '1') {
        zjztFormat = '待接收'
      } else if (cellValue === '2') {
        zjztFormat = '已接收'
      } else if (cellValue === '3') {
        zjztFormat = '已退回'
      } else if (cellValue === '4') {
        zjztFormat = '部分退回'
      } else if (cellValue === '5') {
        zjztFormat = '部分接收'
      }
      return zjztFormat
    },

    setDialogVal (val) {
      this.centerDialogVisible = val
    },
    // 改变分页大小
    handleSizeChange (val) {
      this.pageSize = val
      this.findTable()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.findTable()
    },
    viewClick (row) {
      var params = {
        ysxxcb_id: row.ysxxcb_id,
        ajxx_id: row.ajxx_id,
        ysxx_id: row.ysxx_id
      }
      this.$nextTick(() => {
        sessionStorage.removeItem('czqthtz')
        sessionStorage.setItem('czqthtz', JSON.stringify(params))
        this.$router.push({
          name: 'viewCzqthtz'
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getWzxx (row) {
      var param = {
        ysxxcb_id: row.ysxxcb_id
      }
      this.$api.czqthtz.queryWzxx(param).then((res) => {
        this.wzxxTableData = res.body.default.dataset
      })
    },
    dateFormat (row, column, cellValue, index) {
      return timeFormat(cellValue)
    },
    findTable () {
      let timeComp = timeCompare(this.filters.sqsjq, this.filters.sqsjz)
      if (!timeComp.status) {
        this.$message(timeComp.msg)
        return false
      }
      let timeComp2 = timeCompare(this.filters.jsqrsjq, this.filters.jsqrsjz)
      if (!timeComp2.status) {
        this.$message(timeComp2.msg)
        return false
      }
      var param = {
        pagenum: this.currentPage,
        pagesize: this.pageSize
      }
      var parms = {}
      if (this.filters.sqsjq == null) {
        this.filters.sqsjq = ''
      }
      if (this.filters.sqsjz == null) {
        this.filters.sqsjz = ''
      }
      if (this.filters.jsqrsjq == null) {
        this.filters.jsqrsjq = ''
      }
      if (this.filters.jsqrsjz == null) {
        this.filters.jsqrsjz = ''
      }
      Object.assign(parms, param, this.filters)
      this.$api.czqthtz.queryTable(parms).then((res) => {
        this.total = Number(res.body.default.count)
        this.tableData = res.body.default.dataset
        var that = this
        this.tableData.forEach(function (c) {
          var param2 = {
            ysxxcb_id: c.ysxxcb_id
          }
          that.$api.czqthtz.queryWzxx(param2).then((res) => {
            c.wzxxTableData = res.body.default.dataset
          })
        })
      })
    },
    reset () {
      var obj = {
        ajbh: '',
        ajmc: '',
        sqsjq: '',
        sqsjz: '',
        sqr_name: '',
        xyr: '',
        jsqrsjq: '',
        jsqrsjz: ''
      }
      this.filters = obj
    },
    init () {
      // 查询信息
      this.findTable()
    },
    caseName (row) {
      this.$router.push({
        name: 'organizationDetail',
        params: {
          id: row.ajxx_id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
