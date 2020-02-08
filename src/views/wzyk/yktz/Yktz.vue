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
            移库台账
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
                    <el-form-item label="终结日期" clase="large">
                      <el-date-picker
                        size="mini"
                        v-model="filters.zjsj1"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.zjsj2"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
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
                    <el-form-item label="移库流水号" >
                      <el-input v-model="filters.lsh" size="mini" placeholder="请输入移库流水号"></el-input>
                    </el-form-item>

                    <el-form-item label="申请人" >
                      <el-input v-model="filters.sqrxm" size="mini" placeholder="请输入申请人"></el-input>
                    </el-form-item>

                    <el-form-item label="申请日期">
                      <el-date-picker
                        size="mini"
                        v-model="filters.sqsj1"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.sqsj2"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>


                  </el-row>
                  <el-row class="form-line">
                    <el-form-item label="嫌疑人" >
                      <el-input v-model="filters.xyr" size="mini" placeholder="请输入嫌疑人"></el-input>
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
        <el-button type="success" icon="el-icon-download" v-access id="yktzExport" @click="daoChuYsong" size="mini">导出台账</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData"  :span-method="objectSpanHeBing" :header-cell-style="{background:'#e6e6e6'}" size="mini" border style="width: 100%"
                    highlight-current-row>
            <el-table-column label="序号" width="50px" align="center" :formatter = "xhFormat">

            </el-table-column>
            <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true" min-width="200">
            </el-table-column>
            <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="120">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="xyr" label="嫌疑人" :show-overflow-tooltip="true" width="80">
            </el-table-column>
            <el-table-column prop="lsh" label="移库流水号"  :show-overflow-tooltip="true" min-width="120">
            </el-table-column>
            <el-table-column prop="sqrxm" label="申请人" :show-overflow-tooltip="true" width="80">
            </el-table-column>
            <el-table-column prop="sqbmmc" label="申请部门名称" :show-overflow-tooltip="true" min-width="120">
            </el-table-column>
            <el-table-column prop="sqsj" label="申请时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="150">
            </el-table-column>
            <el-table-column prop="zjsj" label="终结时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="150">
            </el-table-column>
            <el-table-column prop="zjzt" label="状态"  :show-overflow-tooltip="true" min-width="150" :formatter="formatZjzt">
            </el-table-column>
            <el-table-column prop="stqk" label="接收/退回" :show-overflow-tooltip="true" width="80">
            </el-table-column>
            <el-table-column prop="sfwlps" label="物流配送"  :show-overflow-tooltip="true" :formatter="formatSfwl">
            </el-table-column>
            <el-table-column prop="sfkbm" label="跨部门"  :show-overflow-tooltip="true" width="60" :formatter="formatSfwl">
            </el-table-column>
            <el-table-column prop="jsqr_name" label="接收操作人"  :show-overflow-tooltip="true" width="100">
            </el-table-column>
            <el-table-column prop="jsqr_dept_name" label="接收操作部门" min-width="100px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="jsqrsj" label="接收操作时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="150">
            </el-table-column>
           <!-- <el-table-column prop="wzbh" label="物证编号"  :show-overflow-tooltip="true">
            </el-table-column> -->
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wzsl" label="数量及单位"  :show-overflow-tooltip="true" width="100">
            </el-table-column>
            <el-table-column prop="cfwz" label="存放位置"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wzlb" label="物证类别"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="jjzt" label="交接状态" min-width="100px" :formatter="formatJjzt" :show-overflow-tooltip="true">
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
    <el-dialog
      title="选择部门"
      :visible.sync="babmDialog"
      :append-to-body="true"
      :modal="true"
      width="30%">
      <div class="dialog_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="filterText1" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          node-key="id"

          :data="treeData1"
          :props="treeProps1"
          :expand-on-click-node="false"
          @node-click="selectData"
          :filter-node-method="filterNode1"
          :check-strictly="true"
          ref="tree1">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="babmDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="getChooseDept" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>
<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    components: {
      casePreview
    },
    data() {
      return {
        filterText1: '',
        babmDialog: false,
        treeData1: [],
        treeProps1: {
          children: 'children',
          label: 'name'
        },
        //筛选条件
        filters: {
          ajbh: '',
          ajmc: '',
          sqsj1: '',
          sqsj2: '',
          sqrxm: '',
          xyr: '',
          zjsj1: '',
          zjsj2: '',
          lsh: ''

        },
        treeType:'',
        selectNode:{},
        options: [],
        value: '',
        centerDialogVisible: false,
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        gridData: [],
        tableData: [],
        wzxx_id:'',
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
        spanData2:[],
        spanData3:[],
        xhData:[],
        rksData:[],
        ajMergeArr:[],
        ajMergeCountArr:[],
      }
    },
    created() {
        if (sessionStorage.getItem('ystzSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('ystzSession'))
        }
      this.init()
    },
    watch: {
      filterText1(val) {
        this.$refs.tree1.filter(val);
      },
    },
    methods: {
      daoChuYsong () {

        var parms = {};
        if(this.filters.sqsj1==null){
          this.filters.sqsj1=''
        }
         if(this.filters.sqsj2==null){
           this.filters.sqsj2=''
         }
         if(this.filters.zjsj1==null){
           this.filters.zjsj1=''
         }
         if(this.filters.zjsj2==null){
           this.filters.zjsj2=''
         }
        Object.assign(parms, this.filters)

        this.$api.yktz.exportYktz(parms).then((res) => {
          if (res.success == "true") {

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
      formatJjzt(row, column,cellValue, index) {
        var zjztFormat = cellValue;
        if (cellValue === '0') {
          zjztFormat = '未交接'
        } else if (cellValue === '1') {
          zjztFormat = '已交接'
        }else if (cellValue === '2') {
          zjztFormat = '已退回'
        }

        return zjztFormat;
      },
      formatZjzt(row, column,cellValue, index){
        var zjztFormat = cellValue;
        if (cellValue === '9') {
          zjztFormat = '已完结'
        }

        return zjztFormat;
      },

      formatSfwl(row, column,cellValue, index) {
        var zjztFormat = cellValue;
        if (cellValue === '0') {
          zjztFormat = '否'
        } else if (cellValue === '1') {
          zjztFormat = '是'
        }

        return zjztFormat;
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
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
      chooseDept(type) {
        this.filterText1=''
        this.treeType = type;
        var param = {
          selectall:true
        }
        this.$api.yssq.getDeptTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData1 = res.data
            this.babmDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      formatBgqx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '9999-12-31') {
          returnValue = '长期'
        } else if (cellValue == '' || cellValue == undefined) {
          returnValue = '-'
        }
        return returnValue;
      },
      xhFormat(row, column, cellValue, index){
        return this.xhData[index]
      },
      getChooseDept() {
        if(this.treeType=='1'){
          this.filters.sqr_dept_id = this.selectNode.id;
          this.filters.sqr_dept_name = this.selectNode.name;
        }else{
          this.filters.jsqr_dept_id = this.selectNode.id;
          this.filters.jsqr_dept_name = this.selectNode.name;
        }


        this.babmDialog = false;
      },
      findTable() {
        let timeComp = timeCompare(this.filters.sqsj1, this.filters.sqsj2)
                if (!timeComp.status) {
                  this.$message(timeComp.msg)
                  return false
                }
        let timeComp2 = timeCompare(this.filters.zjsj1, this.filters.zjsj2)
               if (!timeComp2.status) {
                 this.$message(timeComp2.msg)
                 return false
               }
         var param = {
           pagenum: this.currentPage,
           pagesize: this.pageSize,
         };
         var parms = {};
        if(this.filters.sqsj1==null){
          this.filters.sqsj1=''
        }
         if(this.filters.sqsj2==null){
           this.filters.sqsj2=''
         }
         if(this.filters.zjsj1==null){
           this.filters.zjsj1=''
         }
         if(this.filters.zjsj2==null){
           this.filters.zjsj2=''
         }
         Object.assign(parms, param, this.filters)
         this.$api.yktz.queryTable(parms).then((res) => {
           this.total = Number(res.body.default.count);
           this.tableData = res.body.default.dataset;
           this.getSpanData(this.tableData)
         })
      },
      reset() {
        var obj = {
          ajbh: '',
          ajmc: '',
          sqsj1: '',
          sqsj2: '',
          sqrxm: '',
          xyr: '',
          zjsj1: '',
          zjsj2: '',
          lsh: ''
        }
        this.filters = obj;
      },
      selectData(data) {
        this.selectNode = data;
      },
      init() {
        // 查询信息
        this.findTable();
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      caseThingName(wzxx_id) {

        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      // 计算需要合并的单元格
      getSpanData(data) {
        // 存放计算好的合并单元格的规则
        this.spanData = []
        this.spanData2=[]
        this.spanData3=[]
        this.xhData=[]
        this.rksData=[]

        this.ajMergeArr = [];
        this.ajMergeCountArr = []

        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanData.push(1)
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].ajxx_id === data[i - 1].ajxx_id) {
              this.spanData[this.pos] += 1
              this.spanData.push(0)

            } else {
              this.spanData.push(1)
              this.pos = i
            }
          }
        }
        //console.log(this.spanData)

        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanData2.push(1)
            this.pos2 = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].zb_id === data[i - 1].zb_id) {
              this.spanData2[this.pos2] += 1
              this.spanData2.push(0)

            } else {
              this.spanData2.push(1)
              this.pos2 = i
            }
          }
        }

        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanData3.push(1)
            this.pos3 = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].cb_id === data[i - 1].cb_id) {
              this.spanData3[this.pos3] += 1
              this.spanData3.push(0)

            } else {
              this.spanData3.push(1)
              this.pos3 = i
            }
          }
        }
        for (var i = 0; i < data.length; i++) {

          if (i === 0) {
            this.xhData.push(1)

          }else{
            if (data[i].ajxx_id === data[i - 1].ajxx_id) {
              this.xhData.push(this.xhData[i-1])
            }else{
              this.xhData.push(this.xhData[i-1]+1)
            }
          }
        }

        for (var i = 0; i < data.length; i++) {

          if(this.ajMergeArr.indexOf(data[i].ajxx_id)>-1){
            var index = this.ajMergeArr.indexOf(data[i].ajxx_id);
            this.ajMergeCountArr[index] = this.ajMergeCountArr[index]+1;

          }else{
            this.ajMergeArr.push(data[i].ajxx_id);
            this.ajMergeCountArr.push(1);
          }
        }
        console.log(this.ajMergeArr)
        console.log(this.ajMergeCountArr)

      },
      objectSpanHeBing ({ row, column, rowIndex, columnIndex }) {
        // 需要合并的列
        // [0, 1, 2].includes(columnIndex ), 表示合并前三列
        if (columnIndex >=0 && columnIndex <=3) {

          const _row = this.spanData[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex >=4 && columnIndex <=10) {
          const _row = this.spanData2[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }

        if (columnIndex >=11 && columnIndex <=15) {
          const _row = this.spanData3[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('ystzSession')
          sessionStorage.setItem('ystzSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>

<style scoped>

</style>
