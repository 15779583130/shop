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
            处置权退回
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
                      <el-button type="primary" size="mini" v-access id="czqthSearch" icon="el-icon-search" @click="findTable">查询</el-button>
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
        <el-button type="primary" v-access id="czqthBack" icon="iconfont icon-tuihui" @click="plth" size="mini">批量退回选中数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-dialog title="填写意见" :visible.sync="thyjDialog" :append-to-body="true" :modal="true" width="30%" style="">
        <el-form :model="thyjform" ref="thyjform" :rules="thyjRules" size="mini" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item label="意见" prop="thyj">
                <el-input type="textarea" v-model="thyjform.thyj" size="mini" placeholder="请输入意见" :rows="6" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="tj()">提交</el-button>
          <el-button @click="thyjDialog = false" size="mini">取消</el-button>
        </span>
      </el-dialog>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                   @expand-change="getWzxx">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable2" :data="scope.row.wzxxTableData" tooltip-effect="dark" style="width: 100%" border
                        size="mini" :header-cell-style="{background:'#e6e6e6'}"
                        @select="handleSelect" @select-all="((val)=>{handleSelectAll(val, scope.row.wzxxTableData)})">
                <el-table-column  type="selection" width="55" >
                </el-table-column>
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="100">
                </el-table-column>
                <el-table-column prop="wzxx_sl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" width="120px"  align="center">
                  <template slot-scope="scope">
                    <i class="iconfont icon-tuihui" v-access id="czqthBack"
                       style="font-size: 20px;" @click="thClick(scope.row)" title="退回"></i>
                  </template>
                </el-table-column>
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
      thyjform: {
        thyj: '',
        yswzids: ''
      },
      thyjRules: {
        thyj: [
          {min: 0, max: 500, message: '最多可输入500个字符'},
          {required: true, message: '这是必填字段', trigger: 'blur'}
        ]
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
      thyjDialog: false,
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
    handleSelect (val, row) {
      let selection = this.multipleSelection
      let selected = val.length && val.indexOf(row) !== -1
      if (selected) {
        this.multipleSelection.push(row.id)
      } else {
        for (let i = 0; i < selection.length; i++) {
          if (row.id === selection[i]) {
            this.multipleSelection.splice(i, 1)
          }
        }
      }
    },
    handleSelectAll (val, data) {
      let selection = this.multipleSelection
      if (val.length > 0) {
        if (selection.length === 0) {
          for (let i = 0; i < val.length; i++) {
            this.multipleSelection.push(val[i].id)
          }
        } else {
          for (let i = 0; i < val.length; i++) {
            let flag = true
            for (let j = 0; j < selection.length; j++) {
              if (val[i].id === selection[j]) {
                flag = false
              }
            }
            if (flag === true) {
              this.multipleSelection.push(val[i].id)
            }
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < selection.length; j++) {
            if (data[i].id === selection[j]) {
              this.multipleSelection.splice(j, 1)
            }
          }
        }
      }
    },
    getWzxx (row) {
      var param = {
        ysxxcb_id: row.ysxxcb_id
      }
      this.$api.czqth.queryWzxx(param).then((res) => {
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
      this.$api.czqth.queryTable(parms).then((res) => {
        this.total = Number(res.body.default.count)
        this.tableData = res.body.default.dataset
        var that = this
        this.tableData.forEach(function (c) {
          var param2 = {
            ysxxcb_id: c.ysxxcb_id
          }
          that.$api.czqth.queryWzxx(param2).then((res) => {
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
    },
    thClick (row) {
      // 重置表单数据
      if (this.$refs['thyjform'] !== undefined) {
        this.$refs['thyjform'].resetFields()
      }
      this.thyjDialog = true
      this.thyjform.yswzids = row.id
    },
    tj () {
      this.$refs.thyjform.validate((valid) => {
        if (valid) {
          var params = {
            yswzids: this.thyjform.yswzids,
            thyj: this.thyjform.thyj
          }
          this.$api.czqth.tjth(params).then((res) => {
            if (res.success === 'true') {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.thyjDialog = false
              this.findTable()
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        }
      })
    },
    plth () {
      if (this.multipleSelection.length <= 0) {
        this.$message({message: '请先选择要退回的数据', type: 'warning'})
        return false
      }
      if (this.$refs['thyjform'] !== undefined) {
        this.$refs['thyjform'].resetFields()
      }
      var yswzids = this.multipleSelection.join(',')
      this.thyjDialog = true
      this.thyjform.yswzids = yswzids
    }
  }
}
</script>

<style scoped>

</style>
