<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .rkdj_tree {
    overflow-y: auto;
    height: 60vh;
  }

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
  <div>
    <el-card class="box-card" style="background: #f7f7f7">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              入库登记
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
                    <el-col :span="19" style="display: flex;">
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
                      <el-form-item label="交接日期">
                        <el-col :span="10" style="display: flex;">
                          <el-date-picker
                            v-model="filters.jjrq1"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入起始日期" size="mini" style="width: 180px">
                          </el-date-picker>
                        </el-col>
                        <el-col :span="2" style="display: flex;">
                          <i class="text">-</i>
                        </el-col>
                        <el-col :span="10" style="display: flex;">
                          <el-date-picker
                            v-model="filters.jjrq2"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入截止日期" size="mini" style="width: 180px">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5" style="text-align: right;">
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
          <el-button type="primary" icon="el-icon-search" v-access id="rkdjSelectcfwz" size="mini" @click=batchSave>批量存放物证</el-button>
          <el-button type="primary" icon="el-icon-search" v-access id="rkdjPrint" size="mini" @click="batchPrint">批量条码打印</el-button>
        </el-col>
        <el-col :span="24">
          <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzmc" label="物证名称"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzbh" label="物证编号"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzsl" label="数量及单位" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzrq" label="保管期限" :show-overflow-tooltip="true"
                             :formatter="bgqxFormatter"></el-table-column>
            <el-table-column prop="sqyy" label="入库原因" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rksj" label="入库时间" :formatter="dateFormat"  width="140px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template slot-scope="scope">
                <i @click="qrxz(scope.row)" class="el-icon-tickets" v-access id="rkdjSaverk"
                   style="font-size: 20px;cursor: pointer" title="选择存放位置"></i>
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
    </el-card>
    <el-dialog
      title="选择存放位置"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      @close="cancel_check"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="true">
      <div class="rkdj_tree" style="height: 55vh;overflow-y: auto">
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="treeProps"
          default-expand-all
          @node-click="selectData"
          :expand-on-click-node="false"
          ref="tree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel_check" size="mini">取 消</el-button>
    <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="条码预览" :visible.sync="tmDialog" width="40%"
               :append-to-body="true"
               :modal="true">
      <div ref="print">
          <div v-if="printType==='batch'" v-for="item in multipleSelection" class="content_border">
            <div class="content" style="margin:20px 30px 10px 15px;border: 1px solid #000">
              <div style="text-align: center;">
                <img :id=" pre + item.id " style="width:210px;height: 60px"/>
              </div>
              <div style="margin-left:15px;padding-bottom: 20px;" class="myprint">
                <!-- <div style="width:450px;"> -->
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">物证名称：{{item.wzmc}}</p>
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">类别数量：{{item.wzlb}} {{item.wzsl}}</p>
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">特征描述：{{item.wztz}}</p>
              </div>
            </div>
          </div>
          <div v-if="printType==='single'" style="border: 0px solid #000;border-radius: 12px;margin-bottom:10px">
            <div class="content" style="margin:20px 30px 10px 15px;border: 1px solid #000">
              <div style="text-align: center;">
                <img :id=" pre + tempRow.id " style="height: 60px;width: 210px"/>
              </div>
              <div style="margin-left:15px;padding-bottom: 18px;" class="myprint">
                <!-- <div style="width:450px;"> -->
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">物证名称：{{tempRow.wzmc}}</p>
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">类别数量：{{tempRow.wzlb}} {{tempRow.wzsl}}</p>
                <p style="font-family: '黑体';font-size: 8px;font-weight: 800;">特征描述：{{tempRow.wztz}}</p>
              </div>
            </div>
          </div>
      </div>
      <div style="display: flex;justify-content: flex-end;align-items: center;margin-top: 20px;">
        <el-button type="info" size="mini" @click="doPrint()">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import JsBarcode from "jsbarcode";
  import pdf from 'vue-pdf'
  import casePreview from "../my-components/casePreview/casePreview";
  export default {
    name: 'entryRegistration',
    components: {
      casePreview,
      pdf
    },
    data() {
      return {
        pre:'preid',//一维码id前缀
        printType:'single',
        yuming: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
        viewVisible: false, // 弹框隐藏
        fileType: 'pdf', // 文件类型
        pdfsrc: '', // 文件地址
        tempRow: {},
        tmDialog: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        operation: true, // true:新增，false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        // 筛选条件
        filters: {
          wzmc: '',
          wzbh: '',
          jjrq1: '',
          jjrq2: ''
        },
        // 分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        delarr: [], // 存放删除的数据
        multipleSelection: [], // 多选的数据
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'cfwz'
        },
        selectNode: {}
      }
    },
    created() {
      if (sessionStorage.getItem('ruKudjSession')) {
        this.filters = JSON.parse(sessionStorage.getItem('ruKudjSession'))
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
      test(){
        debugger
        var tempUrl = 'http://59.61.83.130:18220/fileService/admin/2020/1/admin20200114163937730_json%E8%BD%ACxml%E7%99%BB%E5%BD%95.txt'
        // window.open(tempUrl);
        // var elemIF = document.createElement("iframe");
        // elemIF.src = tempUrl;
        // elemIF.style.display = "none";
        // document.body.appendChild(elemIF);
        // window.location.href=tempUrl

        let downloadFileUrl = tempUrl
        let elemIF = document.createElement("iframe");
        elemIF.src = downloadFileUrl;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      },
      printHandle (row) {
        if (!/\.(pdf|PDF)$/.test(pdf)) {
          window.open(
            // 'https://view.officeapps.live.com/op/view.aspx?src=' + this.yuming + '/anli?id=' + row.id,
            'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
          )
          return false
        } else {
          let url = this.yuming + '/anli?id=' + row.id
          this.viewVisible = true
          this.pdfsrc = url
        }
      },
      // 条形码打印
      doPrint () {
        this.$print(this.$refs.print)
      },
      barcode (row) {
        this.printType = 'single'
        this.tempRow = row
        this.tmDialog = true
        this.$nextTick(() => {
          JsBarcode('#'+this.pre+row.id, row.dwwzbm, {
            format: 'CODE128', // 选择要使用的条形码类型
            fontOptions:"bold",//使文字加粗体或变斜体
            fontSize: '18px',
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
      cancel_check(){
        let that = this
        this.multipleSelection.forEach(function (e,i) {
          that.$refs.multipleTable.toggleRowSelection(e);
          that.dialogVisible = false;
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
          if (hash[arr[i]]) {
            return true;
          }
          // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
          hash[arr[i]] = true;
        }
        return false;
      },
      isAllEqual(array) {
        if (array.length > 0) {
          return !array.some(function (value, index) {
            return value !== array[0];
          });
        } else {
          return true;
        }

      },
      batchSave() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请先选择未入库的物证信息',
            showClose: true,
            type: 'warning'
          })
          return false
        }
        var tempArr = this.multipleSelection.map(obj => {
          return obj.cfck_id
        })
        if(tempArr.length>1&&!this.isAllEqual(tempArr)){
          this.$message({
            message: '只能选择同个仓库的物证进行入库登记',
            showClose: true,
            type: 'warning'
          })
          return false;
        }
        var ids = this.multipleSelection.map(obj => {
          return obj.cfck_id
        }).join(",")
        var params = {
          // ckck_id: this.delarr.join(',')
          cfck_id: ids
        }
        this.$api.entryRegistration.queryTree(params).then((res) => {
          if (res.success == 'true') {
            this.treeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
        this.selectNode = {};
        this.dialogVisible = true
      },
      submitForm() {
        if (this.selectNode.id == '' || this.selectNode.id == undefined) {
          this.$message({message: '请选择一条记录', type: 'warning'})
          return false;
        }
        var arr = this.multipleSelection
        var ids = arr.map(obj => {
          return obj.id
        }).join(',')
        var wzxx_ids = arr.map(obj => {
          return obj.wzxx_id
        }).join(',')
        let that = this
        let tree = this.$refs.tree
        let fullName = []
        let tmp = this.selectNode;
        let length = tree.getNode(this.selectNode.id).level
        for (let i = 0; i < length; i++) {
          fullName.push(tmp.cfwz)
          if (tmp.pid) {
            tmp = that.getNodeData(tree, tmp)
          }
        }
        var pathName = fullName.reverse().join("/")
        var params = {
          wzmx_id: ids,
          path: pathName,
          cfck_id: this.selectNode.id,
          ids: wzxx_ids,
          id: this.selectNode.id
        }
        this.$api.entryRegistration.save(params).then((res) => {
          if (res.success == 'true') {
            this.findTable()
            this.$message({message: res.message, type: 'success'})
            this.dialogVisible = false
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      selectData(data) {
        this.selectNode = data
      },
      findTree() {
        var param = {}
        this.$api.entryRegistration.queryTree(param).then((res) => {
          if (res.success == 'true') {
            this.treeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      bgqxFormatter(row, column, value) {
        if (value == '9999-12-31') {
          value = '长期'
        } else if (value == '' || value == undefined) {
          value = '-'
        } else {
          value = timeFormat(value).substring(0, 10)
        }
        return value
      },
      qrxz(row) {
        this.$refs.multipleTable.toggleRowSelection(row)
        var params = {
          cfck_id: row.cfck_id
        }
        this.$api.entryRegistration.queryTree(params).then((res) => {
          if (res.success == 'true') {
            this.treeData = res.data
            this.selectNode = {};
            this.dialogVisible = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      handleClick() {
        this.$message({message: '该功能尚未上线...', type: 'warning'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.findTable()
      },
      // 跳转页数
      handleCurrentChange(val) {
        this.currentPage = val
        this.findTable()
      },
      handleDelete(row) {
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            cfck_id: row.id
          }
          this.$api.entryRegistration.singleDelete(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable()
          })
        })
      },
      findTable() {

        let timeComp = timeCompare(this.filters.jjrq1, this.filters.jjrq2)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }

        var parms = {}
        Object.assign(parms, param, this.filters)
        this.$api.entryRegistration.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count)
          // if (res.body.default.dataset) {
          //   this.tableData = res.body.default.dataset
          // }
          this.tableData = res.body.default.dataset||[]
        })
      },
      reset() {
        this.filters.wzmc = ''
        this.filters.wzbh = ''
        this.filters.jjrq1 = ''
        this.filters.jjrq2 = ''
      },
      getNodeData(tree, data) {
        return tree.getNode(data.id).parent.data
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      }
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('ruKudjSession')
      sessionStorage.setItem('ruKudjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>

