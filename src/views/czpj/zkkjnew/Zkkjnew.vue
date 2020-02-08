<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
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
            票据开具
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
              <el-form ref="form" :model="filters" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" placeholder="请输入案件编号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="开票日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.begin_time"
                          type="date"
                          placeholder="请输入日期起" size="mini" format="yyyy-MM-dd" style="width: 160px"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.end_time"
                          type="date"
                          placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" style="width: 160px">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="票据号码" prop="pjhm">
                      <el-input v-model="filters.pjhm" placeholder="请输入票据号码" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="是否作废" prop="zfzt">
                      <el-select v-model="filters.zfzt" placeholder="请选择">
                        <el-option value="0" label="未作废"></el-option>
                        <el-option value="1" label="已作废"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                      <el-select v-model="filters.state" placeholder="请选择">
                        <el-option value="0" label="待提交"></el-option>
                        <el-option value="1" label="已提交"></el-option>
                        <el-option value="2" label="已开票"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;"></el-col>
                  <el-form-item label="开票人" prop="kpr">
                    <el-input v-model="filters.kpr" placeholder="请输入开票人" size="mini" clearable
                              @keyup.enter.native="findTable">
                    </el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" id="zkkjAdd" size="mini" @click="addDysq()">预开票据</el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="viewPjkj">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lsh" label="开票流水号" :show-overflow-tooltip="true" min-width="130px"></el-table-column>
          <el-table-column prop="kprq" label="开票日期" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="100px"></el-table-column>
          <el-table-column prop="pjhm" label="票据号码" :show-overflow-tooltip="true" min-width="130px">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="yl(scope.row)">{{ scope.row.pjhm }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pjlxmc" label="票据名称" :show-overflow-tooltip="true" min-width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.pjlxmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dwmc" label="单位名称" :show-overflow-tooltip="true" min-width="200px"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="200px">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="jbr" label="经办人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="kpr" label="开票人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zfzt" label="是否作废" :formatter="ztFormat" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="state" label="状态" :show-overflow-tooltip="true" :formatter="stateFormat"></el-table-column>
          <el-table-column prop="created_time" label="创建时间" :formatter="dateFormat" :show-overflow-tooltip="true" min-width="200px"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="130px">
            <template slot-scope="scope">
              <!--<el-button  icon="el-icon-edit-outline" circle title="查看票据"></el-button>-->
              <i class="el-icon-finished" style="font-size: 20px;cursor: pointer" @click="editPj(scope.row)" v-if="scope.row.state==='0'" title="查看票据"></i>
              <i class="el-icon-view" style="font-size: 20px;cursor: pointer" @click="viewPjkj(scope.row)" v-if="scope.row.state != '2'" title="票据预览"></i>
              <i class="el-icon-view" style="font-size: 20px;cursor: pointer" @click="yl(scope.row)" v-if="scope.row.state === '2'" title="票据预览"></i>
              <i class="el-icon-delete" style="font-size: 20px;cursor: pointer" @click="deletePj(scope.row)" v-if="scope.row.state < 1" title="删除票据"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageinfo.pagenum"
              :page-sizes="[5,10,20,30,40,50]"
              :page-size="pageinfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageinfo.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="67%" :modal="false" style="padding: 0 5px">
      <div style="">
        <el-row>
          <el-col :span="24">
            <div>
              <el-form ref="ajxxForm" :inline="true" :model="ajxxForm">
                <el-form-item label="案件编号">
                  <el-input v-model="ajxxForm.ajbh" placeholder="请输入案件编号" size="mini" clearable
                            @keyup.enter.native="findAjxxTable">
                  </el-input>
                </el-form-item>
                <el-form-item label="案件名称">
                  <el-input v-model="ajxxForm.ajmc" placeholder="请输入案件名称" size="mini" clearable
                            @keyup.enter.native="findAjxxTable">
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="findAjxxTable">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable1" :data="ajxxTableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%;" size="mini">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(ajCurrentPage - 1) * ajPageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true" min-width="160px"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="120px"></el-table-column>
          <el-table-column prop="created_time" label="创建时间" :show-overflow-tooltip="true"
                           :formatter="dateFormat" width="145px"></el-table-column>
          <el-table-column prop="bary_name" label="录入人员" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sfsa" label="案件类型" :show-overflow-tooltip="true"
                           :formatter='formatAjlx'></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="chooseAjxx(scope.row)" icon="el-icon-check" circle size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination
              background
              @size-change="ajHandleSizeChange"
              @current-change="ajHandleCurrentChange"
              :current-page="ajCurrentPage"
              :page-sizes="[5, 10, 15, 20, 25]"
              :page-size="ajPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="ajTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
            <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="扣留(或冻结)财物收据"
      :visible.sync="dialogVisibleMssj"
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
          <div style="position: relative; top: 123px; left: 70px;" v-for="item in yllist" v-if="yllist.length > 2">
            <span style="display: inline-block;width:110px;line-height:14px">{{item.wzbh}}</span>
            <span style="display: inline-block;width:100px;line-height:14px">{{item.wzmc}}</span>
            <span style="display: inline-block;width:28px;">{{item.dw}}</span>
            <span style="display: inline-block;width:160px;">{{item.ggxh}}</span>
            <span style="display: inline-block;width:120px;">{{item.sl}}</span>
            <span style="display: inline-block;">{{item.je}}</span>
          </div>
          <div style="position: relative; top: 147px; left: 70px;" v-for="item in yllist" v-if="yllist.length <= 2">
            <span style="display: inline-block;width:110px;line-height:14px">{{item.wzbh}}</span>
            <span style="display: inline-block;width:100px;line-height:14px">{{item.wzmc}}</span>
            <span style="display: inline-block;width:28px;">{{item.dw}}</span>
            <span style="display: inline-block;width:160px;">{{item.ggxh}}</span>
            <span style="display: inline-block;width:120px;">{{item.sl}}</span>
            <span style="display: inline-block;">{{item.je}}</span>
          </div>
        </div>
        <div style="position: absolute; bottom: 86px;  left: 350px">
          <span>{{ylobj.jbr}}</span>
          <span style="position: relative; left: 124px">{{ylobj.bgyxm}}</span>
          <span style="position: relative;left:240px">{{ylobj.dsr}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  const urlImgPj = require("../../../images/005004001new.png")
  const urlImgSw = require("../../../images/005005001.png")
  export default {
    name: 'Pjkj',
    data() {
      return {
        ylobj:{},
        yllist:[
          {wzbm:'1',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'2',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'3',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'4',wzmc:'无',dw:'个',ggxh:'无',sl:'0'}
        ],
        //搜索条件
        filters: {
          ajbh: '',
          ajmc: '',
          begin_time: '',
          end_time: '',
          pjhm: '',
          zfzt: '',
          state:''
        },
        bgImg: {
          backgroundImage: "url(" + urlImgPj + ")"
        },
        bgImgSw: {
          backgroundImage: "url(" + urlImgSw + ")"
        },
        dialogVisiblePjkj: false,
        dialogVisibleMssj: false,
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:10
        },
        //table
        tableData: [],
        dialogVisible: false,
        //dialog数据
        ajxxForm: {
          ajbh: '',
          ajmc: ''
        },
        ajxxTableData: [],
        ajTotal: 0,
        ajCurrentPage: 1,
        ajPageSize: 5,
        more: false
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
        if (sessionStorage.getItem('zkkjSession')) {
          this.filters = JSON.parse(sessionStorage.getItem('zkkjSession'))
        }
        this.findTable();
      },
      yl(row){
        var param = {
          pjxx_id:row.id,
          pjbm:row.pjbm
        }
        this.$api.zkkj.showPjxx(param).then((res) => {
          if(row.pjbm){
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
      },
      handlerByNamePjhm () {
        this.dialogVisiblePjkj = true
      },
      handlerByNamePjmc () {
        this.dialogVisibleMssj = true
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize = val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      findTable() {

        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {};
        Object.assign(param, this.pageinfo, this.filters)
        this.$api.zkkj.queryTable(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      ajHandleSizeChange(val) {
        this.ajPageSize = val;
        this.findAjxxTable();
      },
      ajHandleCurrentChange(val) {
        this.ajCurrentPage = val;
        this.findAjxxTable();
      },
      findAjxxTable() {
        var param = {
          pagenum: this.ajCurrentPage,
          pagesize: this.ajPageSize,
          ajbh: this.ajxxForm.ajbh,
          ajmc: this.ajxxForm.ajmc,
          type: 'zkkp'
        };
        this.$api.rksq.queryAjxxTable(param).then((res) => {
          this.ajTotal = Number(res.body.default.count);
          this.ajxxTableData = res.body.default.dataset;
        })
      },
      addDysq() {
        this.ajxxForm.ajbh = '';
        this.ajxxForm.ajmc = '';
        this.dialogVisible = true;
        this.findAjxxTable();
      },
      chooseAjxx(row) {
        var params = {
          ajxx_id: row.id,
          opertype: 'add'
        }
        // this.$api.rksq.addRksqxxRwzb(params).then((res) => {
        //   this.$nextTick(() => {
        //     this.$router.push({
        //       name: 'zkkjkp',
        //       params: {
        //         id: row.id
        //       }
        //     })
        //   })
        // })
        this.$nextTick(() => {
          this.$router.push({
            name: 'zkkjkp',
            params: {
              id: row.id
            }
          })
        })
      },
      editPj(row){
        this.$nextTick(() => {
          this.$router.push({
            name: 'zkkjkp',
            params: {
              id: row.ajxx_id
            }
          })
        })
      },
      deletePj(row){
        let param = {
          id:row.id
        };
        this.$confirm('是否确定删除该票据记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.zkkj.deletePj(param).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTable()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa == '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa == '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      reset() {
        var obj = {
          ajbh: '',
          ajmc: '',
          begin_time: '',
          end_time: '',
          pjhm: '',
          zfzt: '',
          state:'',
        }
        this.filters = obj;
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      ztFormat(row, column, cellValue, index) {
        var value = '';
        if (cellValue == '0') {
          value = '未作废'
        } else if (cellValue == '1') {
          value = '已作废'
        }
        return value;
      },
      stateFormat(row,column,cellValue,index){
        var value = '';
        if (cellValue == '0') {
          value = '待提交'
        } else if (cellValue == '1') {
          value = '已提交'
        } else if (cellValue == '2') {
          value = '已开票'
        }
        return value;
      },
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      viewPjkj(row) {
        this.$router.push({
          name: 'zkkjview',
          params: {
            id: row.id
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
