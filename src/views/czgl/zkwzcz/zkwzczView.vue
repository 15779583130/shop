<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            处置申请信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; background: #fff; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width:190px">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置流水号">
                      <el-input v-model="formInline.lsh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请时间">
                      <el-input v-model="formInline.sqsj"  size="mini" clearable readonly="readonly" style="width:150px" >
                      </el-input>
                    </el-form-item>
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
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" size="mini" :header-cell-style="{background:'#e6e6e6'}"
                  @selection-change="handleSelectionChange"  border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" tooltip-effect="dark" style="width: 100%" size="mini" :header-cell-style="{background:'#e6e6e6'}" border>
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
                <el-table-column prop="jjzt" label="交接状态" :show-overflow-tooltip="true" :formatter="formatJjzt"></el-table-column>
                <el-table-column prop="jjsj" label="交接时间" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zrwdh" label="处置单号" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ckmc" label="保管中心" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzrq" label="预处理日期" width="100px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="sqyy" label="处置原因" :show-overflow-tooltip="true" :formatter="formatDyyy"></el-table-column>
          <el-table-column prop="sfwlps" label="物流配送" width="80px" :formatter="formatWlps" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sl" label="物证/退回数量" width="130px"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rwzt" label="任务状态" width="80px" :show-overflow-tooltip="true" :formatter="formatRwzt"></el-table-column>
          <el-table-column prop="jjrmc" label="交接人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wtr" label="委托人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="crklx" label="业务类型" width="80px" :show-overflow-tooltip="true" :formatter="formatRwlx"></el-table-column>
        </el-table>
        <br/>
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
        formInline: {
          id: this.$route.params.id,
          ajbh: this.$route.params.ajbh,
          ajmc: this.$route.params.ajmc,
          lsh: this.$route.params.lsh,
          sqsj: timeFormat(this.$route.params.sqsj)
        },
        options: [
          {value: 'xm', label: '录入人员'},
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
        treeProps: {
          children: 'child',
          label: 'name'
        },
        dialogVisible: false,
        wzmxTableData: [],
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
        this.formInline = JSON.parse(sessionStorage.getItem('zkwzdjck'))
        this.formInline.sqsj = timeFormat(this.formInline.sqsj)
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
        this.searchList()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ywzb_id: this.formInline.id
        };
        this.$api.zkwzcz.queryYwcbForBxqd(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function (c) {
            var param2 = {
              ywcb_id: c.id
            };
            that.$api.zkwzcz.queryWzmx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })

      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.zkwzcz.queryWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      formatJjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未交接'
        } else if (cellValue == '1') {
          returnValue = '已交接'
        } else if (cellValue == '2') {
          returnValue = '已退回'
        }
        return returnValue;
      },
      formatWlps(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '否'
        } else if (cellValue == '1') {
          returnValue = '是'
        }
        return returnValue;
      },
      formatRwlx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '2') {
          returnValue = '处置出库'
        }
        return returnValue;
      },
      formatDyyy(row, column, cellValue, index){
        var returnValue = cellValue;
        // if (cellValue == '1') {
        //   returnValue = '拍卖'
        // } else if (cellValue == '2') {
        //   returnValue = '没收'
        // }else if (cellValue == '3') {
        //   returnValue = '销毁'
        // }else if (cellValue == '4') {
        //   returnValue = '发还'
        // }else if (cellValue == '5') {
        //   returnValue = '封存'
        // }else if (cellValue == '6') {
        //   returnValue = '移送'
        // }else if (cellValue == '99') {
        //   returnValue = '其他'
        // }
        if (cellValue == '1') {
          returnValue = '返还当事人'
        } else if (cellValue == '2') {
          returnValue = '转罚没物资'
        }else if (cellValue == '3') {
          returnValue = '移交其他单位'
        }else if (cellValue == '4') {
          returnValue = '移交外地单位'
        }else if (cellValue == '5') {
          returnValue = '自行处置'
        }
        return returnValue;
      },
      formatYwlx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '归还'
        } else if (cellValue == '2') {
          returnValue = '调用'
        }
        return returnValue;
      },
      formatRwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '初始状态'
        } else if (cellValue == '1') {
          returnValue = '任务开始'
        }else if (cellValue == '2') {
          returnValue = '物流配送中'
        }else if (cellValue == '3') {
          returnValue = '调用完成'
        }else if (cellValue == '4') {
          returnValue = '归还中'
        }else if (cellValue == '5') {
          returnValue = '已归还'
        }else if (cellValue == '9') {
          returnValue = '已完成'
        }
        return returnValue;
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      }
    }
  }
</script>
