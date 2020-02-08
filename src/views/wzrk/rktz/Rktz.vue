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
            入库台账
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">

          <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" size="mini" placeholder="请输入案件编号"></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" size="mini" placeholder="请输入案件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="申请日期" clase="large">
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
                    <el-form-item label="入库流水号" prop="rklsh">
                      <el-input v-model="filters.rklsh" size="mini" placeholder="请输入入库流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人" prop="sqrxm">
                      <el-input v-model="filters.sqrxm" size="mini" placeholder="请输入申请人"></el-input>
                    </el-form-item>
                    <el-form-item label="入库日期">
                      <el-date-picker
                        size="mini"
                        v-model="filters.rksj1"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        size="mini"
                        v-model="filters.rksj2"
                        type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-row>
                  <el-row class="form-line">
                    <el-form-item label="嫌疑人" prop="xyr">
                      <el-input v-model="filters.xyr" size="mini" placeholder="请输入嫌疑人"></el-input>
                    </el-form-item>
                    <el-form-item label="申请部门" prop="sqr_dept_name">
                      <el-input v-model="filters.sqr_dept_name" size="mini" placeholder="请输入申请部门" @focus="chooseDept()"
                                :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="保管员" prop="bgyxm">
                      <el-input v-model="filters.bgyxm" size="mini" placeholder="请输入保管员"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row class="form-line">
                    <el-form-item label="物证编号" prop="wzbh">
                      <el-input v-model="filters.wzbh" size="mini" placeholder="请输入物证编号"></el-input>
                    </el-form-item>
                    <el-form-item label="物证名称" prop="wzmc">
                      <el-input v-model="filters.wzmc" size="mini" placeholder="请输入物证名称"></el-input>
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
        <el-button type="success" icon="el-icon-download" v-access id="rktzexp" size="mini" @click="expRktz">导出台账</el-button>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :span-method="objectSpanHeBing" :header-cell-style="{background:'#e6e6e6'}"
                    size="mini" border style="width: 100%"
                    highlight-current-row>
            <el-table-column prop="xh" label="序号" width="50px" align="center" :formatter="xhFormat">
            </el-table-column>
            <el-table-column prop="ajbh" label="案件编号"  min-width="200px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseAjxxName(scope.row)">{{ scope.row.ajmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sfsa" label="案件类型" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="creator_name" label="录入人员"  width="80px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="create_dept_name" label="录入部门" min-width="180px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="rks" label="入库数" width="60px" :formatter="rksFormat" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="lsh" label="入库流水号" min-width="120px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sqsj" label="申请时间"  min-width="150px" :formatter="dateFormat" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sqrxm" label="申请人" width="60px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sqbmmc" label="申请部门" min-width="180px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="ckmc" label="保管中心" min-width="180px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="bgy" label="保管员" width="60px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sqyy" label="入库原因" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wzrq" label="保管期限"  min-width="140px" :formatter="formatBgqx" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wzbh" label="物证编号" min-width="220px"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="wztz" label="物证特征" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="wzsl" label="数量及单位" min-width="100px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="cyr" label="持有人" width="60px"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="cfwz" label="存放位置" min-width="180px" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="rksj" label="入库时间" min-width="150px" :show-overflow-tooltip="true" :formatter="dateFormat">
            </el-table-column>
            <!--<el-table-column
            fixed="right"
            align="center"
            label="操作">
            <template slot-scope="scope">
            <i @click="caseThingName(scope.row)" class="el-icon-view" style="font-size: 20px"></i>
            </template>
            </el-table-column>-->
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
          show-checkbox
          :data="treeData1"
          :props="treeProps1"
          default-expand-all
          :expand-on-click-node="false"
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
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id=this.wzxx_id></case-preview>
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
          rklsh: '',
          sqrxm: '',
          xyy: '',
          sqr_dept_id: '',
          sqr_dept_name: '',
          rksj1: '',
          rksj2: '',
          bgyxm: '',
          wzbh: '',
          wzmc: ''
        },
        options: [],
        value: '',
        centerDialogVisible: false,
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
        spanData2: [],
        spanData3: [],
        xhData: [],
        rksData: [],
        ajMergeArr: [],
        ajMergeCountArr: [],
        wzxx_id: ''
      }
    },
    created() {
      if (sessionStorage.getItem('rktzSession')) {
        this.filters = JSON.parse(sessionStorage.getItem('rktzSession'))
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
      chooseDept() {
        var param = {};
        this.$api.bmwzc.gsrTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData1 = res.data
            this.babmDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 计算需要合并的单元格
      getSpanData(data) {
        // 存放计算好的合并单元格的规则
        this.spanData = []
        this.spanData2 = []
        this.spanData3 = []
        this.xhData = []
        this.rksData = []
        this.ajMergeArr = []
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
          } else {
            if (data[i].ajxx_id === data[i - 1].ajxx_id) {
              this.xhData.push(this.xhData[i - 1])
            } else {
              this.xhData.push(this.xhData[i - 1] + 1)
            }
          }
        }
        for (var i = 0; i < data.length; i++) {
          if (this.ajMergeArr.indexOf(data[i].ajxx_id) > -1) {
            var index = this.ajMergeArr.indexOf(data[i].ajxx_id);
            this.ajMergeCountArr[index] = this.ajMergeCountArr[index] + 1;

          } else {
            this.ajMergeArr.push(data[i].ajxx_id);
            this.ajMergeCountArr.push(1);
          }
        }
      },
      objectSpanHeBing({row, column, rowIndex, columnIndex}) {
        // 需要合并的列
        // [0, 1, 2].includes(columnIndex ), 表示合并前三列
        if (columnIndex >= 0 && columnIndex <= 6) {
          const _row = this.spanData[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex >= 7 && columnIndex <= 10) {
          const _row = this.spanData2[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex >= 11 && columnIndex <= 14) {
          const _row = this.spanData3[rowIndex]
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
      formatBgqx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '9999-12-31') {
          returnValue = '长期'
        } else if (cellValue == '' || cellValue == undefined) {
          returnValue = '-'
        }
        return returnValue;
      },
      getChooseDept() {
        var nodes = this.$refs.tree1.getCheckedNodes();
        var node_ids = nodes.map(obj => {
          return obj.id
        }).join(",");
        var names = nodes.map(obj => {
          return obj.name
        }).join(",");
        this.filters.sqr_dept_name = names;
        this.filters.sqr_dept_id = node_ids;
        this.babmDialog = false;
      },
      findTable() {
        let timeComp = timeCompare(this.filters.sqsj1, this.filters.sqsj2)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

       let timeComp2 = timeCompare(this.filters.rksj1, this.filters.rksj2)
              if (!timeComp2.status) {
                this.$message(timeComp2.msg)
                return false
              }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {};
        this.filters.sqsj1 = this.filters.sqsj1==null?'':this.filters.sqsj1
        this.filters.sqsjz = this.filters.sqsj2==null?'':this.filters.sqsj2
        this.filters.rksj1= this.filters.rksj1==null?'':this.filters.rksj1
        this.filters.rksj2= this.filters.rksj2==null?'':this.filters.rksj2
        Object.assign(parms, param, this.filters)
        this.$api.rktz.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.getSpanData(this.tableData)
        })
      },
      expRktz(){
        var parms = {};
        this.filters.sqsj1 = this.filters.sqsj1==null?'':this.filters.sqsj1
        this.filters.sqsjz = this.filters.sqsjz==null?'':this.filters.sqsjz
        this.filters.rksj1= this.filters.rksj1==null?'':this.filters.rksj1
        this.filters.rksj2= this.filters.rksj2==null?'':this.filters.rksj2
        Object.assign(parms, this.filters)
           
        this.$api.rktz.exportRktz(parms).then((res) => {
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
      reset() {
        var obj = {
          ajbh: '',
          ajmc: '',
          sqsj1: '',
          sqsj2: '',
          rklsh: '',
          sqrxm: '',
          xyy: '',
          sqr_dept_id: '',
          sqr_dept_name: '',
          rksj1: '',
          rksj2: '',
          bgyxm: '',
          wzbh: '',
          wzmc: ''
        }
        this.filters = obj;
      },
      init() {
        // 查询信息
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
          this.$api.rksq.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      caseAjxxName(row) {
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
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rktzSession')
          sessionStorage.setItem('rktzSession', JSON.stringify(this.filters))
          next()
      },

  }
</script>

<style scoped>

</style>
