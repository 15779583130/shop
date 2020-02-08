<template>
  <div class="bmwzc">
    <el-row>
      <el-col :span="24" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <div class="text item">
              <el-form :model="dataForm" status-icon :rules="dataFormRules" ref="dataForm" label-width="100px"
                       class="demo-dataForm" size="mini">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="dataForm.ajbh" style="width: 100%" readonly="readonly"  ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="dataForm.ajmc" style="width: 100%" readonly="readonly" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="任务单号" prop="ajmc">
                      <el-input v-model="dataForm.ysbh" style="width: 100%" readonly="readonly"  ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="申请部门" prop="sqr_dept_name">
                      <el-input v-model="dataForm.sqr_dept_name" style="width: 100%" readonly="readonly"  ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请人" prop="sqr_name">
                      <el-input v-model="dataForm.sqr_name" style="width: 100%" readonly="readonly" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请时间" prop="sqsj">
                      <el-input v-model="dataForm.sqsj" style="width: 100%" readonly="readonly"  ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="接收部门" prop="jsqr_dept_name">
                      <el-input v-model="dataForm.jsqr_dept_name" style="width: 100%" readonly="readonly" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="嫌疑人" prop="xyr">
                      <el-input v-model="dataForm.xyr" style="width: 100%" readonly="readonly" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="移送说明" prop="yssm">
                      <el-input readonly="readonly"
                        type="textarea"
                        :rows="2"
                        style="width: 100%"
                        v-model="dataForm.yssm">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="接收意见" prop="jsczyj">
                      <el-input
                        type="textarea"
                        :rows="2"
                        style="width: 100%"
                        v-model="dataForm.jsczyj"
                        readonly="readonly" >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="附件"  prop="fj">
                      <template v-for="(item,index) in  fileList" v-if="fileList.length>0">
                        <div style="position: relative; left: 5px; margin-bottom: 10px">
                          <span><i  style="font-size: 20px"></i> {{item.file_title}} <el-link icon="el-icon-download" @click="downLoadPic(item.file_path)">下载</el-link></span>
                        </div>
                      </template>
                    </el-form-item>

                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>已退回清单</span>
            </div>
            <div class="text item">
              <template>
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#e6e6e6'}"
                  border
                  style="width: 100%"
                  highlight-current-row
                   size="mini"
                  @expand-change="findTable"
                  :cell-style="{padding:'1px'}"
                >
                  <el-table-column label="序号" type="index" width="50" align="center">
                    <template slot-scope="scope">
                      <span v-text="getIndex(scope.$index)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="物证名称" prop="wzmc"></el-table-column>
                  <el-table-column label="数量及单位" prop="wzxx_sl" ></el-table-column>
                  <el-table-column label="物证编号" prop="wzbh" ></el-table-column>
                  <el-table-column label="存放位置" prop="cfwz"></el-table-column>
                </el-table>
              </template>
              <div class="page" style="float: right">
                <div class="page-content">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-card>
          <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"></case-preview>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import casePreview from '../../my-components/casePreview/casePreview'
import {timeFormat} from '@/utils/datetime'

export default {
  name: 'Czqthtz',
  components: {
    casePreview
  },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      filterText: '',
      treeData: [],
      treeProps: {
        children: 'child',
        label: 'name'
      },
      dataForm: {
        id: '',
        ajbh: '',
        ajmc: '',
        ajxx_id: '',
        ysbh: '',
        sqr_dept_name: '',
        sqr_name: '',
        sqsj: '',
        jsqr_dept_name: '',
        xyr: '',
        yssm: '',
        jsczyj: '',
        ysxxcb_id: ''
      },
      // 分页信息
      currentPage: 1,
      total: 0,
      pageSize: 5,

      // 表格
      tableData: [],
      buttonBoolean: false,
      fileList: [],
      // 图标，可根据自己的需求匹配
      icon: 'el-icon-caret-bottom',
      centerDialogVisible: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    setDialogVal (val) {
      this.centerDialogVisible = val
    },
    caseThingName () {
      this.centerDialogVisible = true
    },
    // 获取表格序号
    getIndex ($index) {
      // 表格序号
      return (this.currentPage - 1) * this.pageSize + $index + 1
    },
    findFormData () {
      let ysxxcb_id, ajxx_id
      if (sessionStorage.getItem('czqthtz')) {
        ysxxcb_id = JSON.parse(sessionStorage.getItem('czqthtz')).ysxxcb_id
        ajxx_id = JSON.parse(sessionStorage.getItem('czqthtz')).ajxx_id
      }
      let parms = {
        ysxxcb_id: ysxxcb_id,
        ajxx_id: ajxx_id
      }
      this.$api.czqthtz.queryDetail(parms).then(res => {
        this.dataForm = res.body.default
        this.dataForm.sqsj = timeFormat(res.body.default.sqsj)
        this.findTable()
        this.getFileList()
      })
    },
    dateFormat (row, column, cellValue, index) {
      return timeFormat(cellValue)
    },
    findTable () {
      var param = {
        pagenum: this.currentPage,
        pagesize: this.pageSize
      }
      var parms = {
        ysxxcb_id: JSON.parse(sessionStorage.getItem('czqthtz')).ysxxcb_id

      }
      Object.assign(parms, param, this.filters)
      this.$api.czqthtz.queryWzxx(parms).then(res => {
        this.total = Number(res.body.default.count)
        this.tableData = res.body.default.dataset
      })
    },
    getFileList () {
      let self = this
      var parmas = {
        ywid: JSON.parse(sessionStorage.getItem('czqthtz')).ysxx_id
      }
      this.$api.common.getFileList(parmas).then((res) => {
        self.fileList = res.body.default.filelist || []
      })
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

    // 改变分页大小
    handleSizeChange1 (val) {
      this.pageSize1 = val
      this.findTable1()
    },
    // 跳转页数
    handleCurrentChange1 (val) {
      this.currentPage1 = val
    },
    downLoadPic (url) {
      window.open(url, '_blank')
    }

  },
  computed: {
    widthLie () {
      return document.body.clientWidth / 1440
    }
  },
  mounted () {
    this.findFormData()
  }
}
</script>

<style lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-card__header {
  padding: 5px 20px !important;
  background-color: #2470b2;
  span {
    color: #ffffff;
    font-weight: bold;
    font-size: 12px;
  }
}

.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block;
}

.bmwzc_tree {
  overflow-y: auto;
  height: 117vh;
}

.page {
  float: right;
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 35px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 35px;
}
</style>
