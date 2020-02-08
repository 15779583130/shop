<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  .btn-text {
    float: right;

    span {
      .line {
        text-decoration: underline;
        font-style: normal;
      }

      line-height: 28px;
      padding: 30px;
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
            移送申请信息
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
                      <el-input v-model="formInline.ajxxbh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajxx_name" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="移送流水号">
                      <el-input v-model="formInline.lsh" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width: 190px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="申请时间">
                      <el-input v-model="formInline.sqsj" size="mini" clearable readonly="readonly"
                                :formatter="dateFormat" style="width: 190px">
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
            已选清单
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange" @expand-change="getWzmx">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" :header-cell-style="{background:'#e6e6e6'}"
                        tooltip-effect="dark" style="width: 100%" size="mini" border>

                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" width="200px":show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzsl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" width="100px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="yszt" label="移送状态" width="100px" :show-overflow-tooltip="true"
                                 :formatter='formatRwzt'></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ysbh" label="任务单号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jsqr_dept_name" label="接收部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="yssm" label="移送原因" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="yszt" label="任务状态" :formatter="formatRwzt" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <div class="page">
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
    <el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="60%" :modal="false">
      <div slot="header" class="" style="">
        <span>存放位置树</span>
      </div>
      <div class="text item">
        <div class="wzcw_tree" style="height: 55vh;overflow-y: auto">
          <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
          <el-tree
            class="filter-tree"
            :data="treeData"
            :props="treeProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </div>
      </div>
    </el-dialog>
    <upload-file @passData="getData" :yssqid="this.ywid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
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
          {value: 'xm', label: '办案人员'},
          {value: 'fz', label: '物流人员'},
          {value: 'sh', label: '移库'}
        ],
        leftList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
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
        centerDialogVisible: false,
        wzxx_id:'',
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
        this.formInline = JSON.parse(sessionStorage.getItem('ckyssq'))
        this.formInline.sqsj = timeFormat(JSON.parse(sessionStorage.getItem('ckyssq')).sqsj)
        this.formInline.zjzt = this.formatZbzt(JSON.parse(sessionStorage.getItem('ckyssq')).zjzt)
        this.findTable();
      },
      dialogUpLoadClick () {
        this.isView = true
        this.ywid = this.formInline.id
        this.dialogUpLoad = true
        this.getFileData = true
      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },

      dateFormat(row, column, cellValue, index) {
        return timeFormat(cellValue)
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
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
      handleClick(row) {
        console.log(row);
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      pdjj(row) {
        this.ywcbid = row.id
        var param = {
          id: row.id
        };
        this.$api.rksq.getWlpdInfo(param).then((res) => {
          this.$nextTick(() => {
            this.wlpdxx = res.body.wlpdxx;
            this.pdjjDialog = true
          })
        })
        this.$api.rksq.getWlpdTxryxx(param).then((res) => {
          this.$nextTick(() => {
            this.txrylist = res.body.default.dataset
          })
        })
        this.$api.rksq.queryWlpdJjWzxx(param).then((res) => {
          this.$nextTick(() => {
            this.wzxxlist = res.body.default.dataset
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      findTable() {
        var param = {
          pagesize: this.pageSize,
          pagenum: this.currentPage,
          id: this.formInline.id,
          ajxx_id: this.formInline.ajxx_id
        };
        this.$api.yssq.queryYxYsxxcb(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function (c) {
            var param2 = {
              ysxxcb_id: c.id
            };
            that.$api.yssq.queryYxYswz(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      formatCbjjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未领取'
        } else if (cellValue == '1') {
          returnValue = '部分领取'
        } else if (cellValue == '2') {
          returnValue = '全部领取'
        }
        return returnValue;
      },
      formatRwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '待移送'
        } else if (cellValue == '1') {
          returnValue = '待接收'
        } else if (cellValue == '2') {
          returnValue = '确认接收'
        } else if (cellValue == '3') {
          returnValue = '退回'
        } else if (cellValue == '4') {
          returnValue = '部分退回'
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
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
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
      }
    }
  }
</script>
