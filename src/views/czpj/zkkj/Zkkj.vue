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
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" size="mini" placeholder="请输入案件编号"></el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" size="mini" placeholder="请输入案件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开票日期" clase="large">
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
                  <el-form-item label="票据号码" prop="pjhm">
                    <el-input v-model="filters.pjhm" size="mini" placeholder="请输入案件编号"></el-input>
                  </el-form-item>

                    <el-form-item label="作废状态" prop="zfzt">
                      <el-select v-model="filters.zfzt" placeholder="请选择">
                        <el-option value="0" label="未作废"></el-option>
                        <el-option value="1" label="已作废"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="开票状态" prop="kpzt">
                    <el-select v-model="filters.kpzt" placeholder="请选择">
                      <el-option value="0" label="未开票"></el-option>
                      <el-option value="1" label="已开票"></el-option>
                      <el-option value="2" label="部分未开票"></el-option>
                    </el-select>
                  </el-form-item>


                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-printer" size="mini" @click="pjpj" >打印票据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :span-method="objectSpanHeBing" :header-cell-style="{background:'#e6e6e6'}"
                    size="mini" border style="width: 100%"
                    highlight-current-row  @selection-change="handleSelectionChange">>
           <el-table-column  type="selection" width="55" :selectable="checkSelectable">
                        </el-table-column>
            <el-table-column label="序号" width="50px" align="center" :formatter="xhFormat">

            </el-table-column>
            <el-table-column prop="ajbh" label="案件编号" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ajmc" label="案件名称" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="xyr" label="当事人" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ba_dept_name" label="办案部门" width="160px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="create_dept_name" label="录入部门" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sl" label="未开物证/总物证" min-width="150px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="cbrwzt" label="是否开票" width="100px" :show-overflow-tooltip="true" :formatter="formatSfkp"></el-table-column>
            <el-table-column prop="ykzksl" label="开票数量" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="pjbm" label="票据编码" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="pjhm" label="票据号码" width="100px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="zfzt" label="作废状态" width="100px" :show-overflow-tooltip="true" :formatter="formatZfzt"></el-table-column>
            <el-table-column prop="dysj" label="开票时间" width="150px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>

            <el-table-column
              fixed="right"
              align="center"
              label="操作" width="100px">
              <template slot-scope="scope" v-if="scope.row.wkwzsl == 0 && scope.row.ykzksl > 0">
                <i class="el-icon-view" @click="yl(scope.row)" style="font-size: 20px" title="预览"></i>
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
    <el-dialog
      title="扣留(或冻结)财物收据"
      :visible.sync="dialogVisiblePjkj"
      :append-to-body="true"
      width="790px"
      height="433px">
      <div :style="bgImg" style="height: 433px; color: #000">
        <div style="float: right; position: relative; top: 30px; right: 50px; line-height: 18px">
          <p>票据编码：{{ylobj.pjbm}}</p>
          <p>机打票号：{{ylobj.jdph}}</p>
          <p style="color: red; font-width: blod; font-size: 1.5rem; text-indent: 2em">{{ylobj.pjhm}}</p>
          <p>数字指纹：{{ylobj.szzw}}</p>
        </div>
        <div style="color: red; position: relative; top: 43px; left: 368px">
          <span>{{ylobj.nf}}</span>
          <span style="position: relative; left: 45px">{{ylobj.hm}}</span>
        </div>
        <div style="position: relative; top: 33px; left: 72px">
          <span>电子票号：{{ylobj.dzph}}</span>
          <span style="position: absolute; top: 30px; left: 92px">{{ylobj.dwbm}}</span>
          <span style="position: absolute; top: 30px; left: 192px">{{ylobj.year}}</span>
          <span style="position: absolute; top: 30px; left: 245px">{{ylobj.month}}</span>
          <span style="position: absolute; top: 30px; left: 292px">{{ylobj.day}}</span>
        </div>
        <div style="position: relative; top: 70px; left: 300px">
          <p>{{ylobj.dsr}}</p>
          <p style="position: relative; top: 10px;">{{ylobj.address}}</p>
          <p style="position: relative;top: 12px;">{{ylobj.ay}}</p>
        </div>
        <div style="line-height:20px">
          <div style="position: relative; top: 147px; left: 70px;" v-for="item in yllist">
            <span style="display: inline-block;width:110px;line-height:14px">{{item.wzbh}}</span>
            <span style="display: inline-block;width:100px;line-height:14px">{{item.wzmc}}</span>
            <span style="display: inline-block;width:28px;">{{item.dw}}</span>
            <span style="display: inline-block;width:120px;">{{item.ggxh}}</span>
            <span style="display: inline-block;width:120px;">{{item.sl}}</span>
            <span style="display: inline-block;">{{item.je}}</span>
          </div>
        </div>
        <div style="position: absolute; bottom: 86px;  left: 350px">
          <span>{{ylobj.jbr}}</span>
          <span style="position: relative; left: 124px">{{ylobj.bgyxm}}</span>
          <span style="position: relative;left: 195px">{{ylobj.dsr}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </el-card>
</template>
<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'
  const urlImgPj = require("../../../images/005004001.png")
  const urlImgSw = require("../../../images/005005001.png")
  export default {
    data() {
      return {
        ylobj:{},
        yllist:[
          {wzbm:'1',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'2',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'3',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'4',wzmc:'无',dw:'个',ggxh:'无',sl:'0'}
          ],
        dialogVisiblePjkj: false,
        dialogVisibleMssj: false,
        bgImg: {
          backgroundImage: "url(" + urlImgPj + ")"
        },
        bgImgSw: {
          backgroundImage: "url(" + urlImgSw + ")"
        },
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
          ajbh:'',
          ajmc:'',
          begin_time: '',
          end_time: '',
          pjhm:'',
          zfzt:'',
          kpzt:'',
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

        wzxx_id: '',
        multipleSelection:[]
      }
    },
    created() {
        if (sessionStorage.getItem('zkkjSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('zkkjSession'))
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
            if (data[i].id === data[i - 1].id) {
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
            if (data[i].id === data[i - 1].id) {
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
        if (columnIndex >= 0 && columnIndex <= 9) {
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
      handleSelectionChange(val) {

              this.multipleSelection = val;
               var ids = this.multipleSelection.map(obj => {
                        return obj.id
                      }).join(",")



            },

            pjpj() {
              if (this.multipleSelection.length <= 0) {
                this.$message({message: '请先选择要开具的票据', type: 'warning'})
                return false;
              }

              let that = this
              var params = {
                ids: this.multipleSelection.map(obj => {
                        return obj.id
                      }).join(",")
              }
              this.$api.zkkj.checkPj(params).then((res) => {
                if (res.success == "true") {
                  this.$confirm(res.message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      that.$api.zkkj.submitZkpj(params).then((res) => {
                                      if (res.success == "true") {
                                        that.findTable()
                                      } else {
                                        that.$message({message: res.message, type: 'error'})
                                      }
                                    })
                  })
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })


            },
      formatCbrwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未完成'
        } else if (cellValue == '1') {
          returnValue = '已完成'
        }
        return returnValue;
      }, formatZfzt(row, column, cellValue, index){
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未作废'
        } else if (cellValue == '1') {
          returnValue = '已作废'
        }
        return returnValue;
      },

      formatZjbz(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未终结'
        } else if (cellValue == '1') {
          returnValue = '已终结'
        }
        return returnValue;
      },
      formatSfkp(row, column, cellValue, index) {

        var returnValue = cellValue;
        if (row.wkwzsl > 0 && row.ykzksl > 0){
        	    returnValue= "部分未开";
        	} else if(row.wkwzsl >= 0 && row.ykzksl == 0){
        	    returnValue =  "未开";
        	}else if (row.wkwzsl == 0 && row.ykzksl  > 0) {
        	    returnValue= "已开";
        	}else {
        	    returnValue= "";
        	}
        return returnValue;
      },
      checkSelectable(row){
      if (row.wkwzsl == 0 && row.ykzksl  > 0) {
        	   return false
        	}else{
            return true
          }
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
        this.$api.zkkj.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          this.getSpanData(this.tableData)
        })
      },
      reset() {
        var obj = {
          ajbh:'',
          ajmc:'',
          begin_time: '',
          end_time: '',
          pjhm:'',
          zfzt:'',
          kpzt:''
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
      },
      yl(row){
        var param = {
          pjxx_id:row.pjxx_id,
          pjbm:row.pjbm
        }
        this.$api.zkkj.showPjxx(param).then((res) => {
          debugger;
          if(row.pjbm==='005004001'){
            this.ylobj = res.body.pjxx;
            this.ylobj.year = res.body.pjxx.kprq.substring(0,4)
            this.ylobj.month = res.body.pjxx.kprq.substring(4,6)
            this.ylobj.day = res.body.pjxx.kprq.substring(6,8)
            this.yllist = res.body.default.wzxxlist;
            this.dialogVisiblePjkj = true
          }else if(row.pjbm==='005005001'){
            this.ylobj = res.body.pjxx;
            this.ylobj.year = res.body.pjxx.kprq.substring(0,4)
            this.ylobj.month = res.body.pjxx.kprq.substring(4,6)
            this.ylobj.day = res.body.pjxx.kprq.substring(6,8)
            this.yllist = res.body.default.wzxxlist;
            this.dialogVisibleMssj = true;
          }else{
            this.$message({message: '暂未开票', type: 'warning'})
          }
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('zkkjSession')
          sessionStorage.setItem('zkkjSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>

<style scoped>

</style>
