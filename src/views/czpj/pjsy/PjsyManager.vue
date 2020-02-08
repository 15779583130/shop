<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  @import '../../../../src/styles/deep-ele.less';
  /deep/ .el-dialog__body {
    padding-top: 10px;
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
            票据使用
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
              <el-form ref="form" :model="formInline" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" placeholder="请输入案件编号" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="开票日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="formInline.beg_time"
                          type="date"
                          placeholder="请输入日期起"

                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="formInline.end_time"
                          type="date"
                          placeholder="请输入日期止"

                          value-format="yyyy-MM-dd">
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

                  <el-form-item label="票据号码">
                    <el-input v-model="formInline.pjhm" placeholder="请输入票据号码" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item>
                 <el-form-item label="作废状态">
                   <el-select v-model="formInline.zfzt" placeholder="请选择">
                     <el-option
                       v-for="item in zfOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                 </el-form-item>
                 <el-form-item label="开票人">
                   <el-input v-model="formInline.jbr" placeholder="请输入开票人" size="mini" clearable
                             @keyup.enter.native="onSubmit">
                   </el-input>
                 </el-form-item>
                </el-row>
                <el-row class="form-line" v-show="more">

                  <el-form-item label="机打票号">
                    <el-input v-model="formInline.jdph" placeholder="请输入机打票号" size="mini" clearable
                              @keyup.enter.native="onSubmit">
                    </el-input>
                  </el-form-item>
                <el-form-item label="票据名称">
                  <el-input v-model="formInline.pjmc" placeholder="请输入票据名称" size="mini" clearable
                            @keyup.enter.native="onSubmit">
                  </el-input>
                </el-form-item>
                 <el-form-item label="部门名称">
                   <el-input v-model="formInline.dwmc" placeholder="请输入部门名称" size="mini" clearable
                             @keyup.enter.native="onSubmit">
                   </el-input>
                 </el-form-item>
                </el-row>
                <el-row class="form-line" v-show="more">


                 <el-form-item label="票据类型">
                   <el-select v-model="formInline.pjlx" placeholder="请选择">
                     <el-option
                       v-for="item in pjlxOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                 </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange">

          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" width="200px" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="ajmc" label="案件名称" width="200px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="kprq" label="开票日期"  width="100px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="jbr" label="开票人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="pjmc" label="票据名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="pjzch" label="票据注册号" width="150px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="pjbm" label="票据编码" width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="pjhm" label="票据号码" width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="dzph" label="电子票号" width="140px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jdph" label="机打票号" width="140px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="dwmc" label="部门名称"  width="150px":show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zfzt" label="作废状态" width="80px" :show-overflow-tooltip="true" :formatter="formatZfzt"></el-table-column>


         <!-- <el-table-column prop="szzw" label="数字指纹"  :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column prop="zfrq" label="作废日期"  :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>


          <el-table-column prop="state" label="开票状态" width="80px" ></el-table-column>
          <el-table-column prop="zfrxm" label="作废人" width="80px" :show-overflow-tooltip="true"></el-table-column>



          <el-table-column prop="dwbm" label="单位编码" :show-overflow-tooltip="true"></el-table-column>

          <el-table-column prop="bmsr" label="被没收人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="state" label="票据状态" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bz" label="备注" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column label="操作" width="60px" fixed="right" align="center">
            <template slot-scope="scope">
              <i  class="el-icon-view" style="font-size: 20px;"
                 @click="yl(scope.row)"  title="票据预览"></i>

            </template>
          </el-table-column>
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
 <el-dialog
      title="实物没收收据"
      :visible.sync="dialogVisibleMssj"
      :append-to-body="true"
      width="865px"
      height="422px">
      <div :style="bgImgSw" style="height: 433px; color: #000">
        <div style="float: right; position: relative; top: 25px; right: 38px; line-height: 18px">
          <p>票据编码：{{ylobj.pjbm}}</p>
          <p>机打票号：{{ylobj.jdph}}</p>
          <p>数字指纹：{{ylobj.szzw}}</p>
          <p style="color: red; font-width: blod; font-size: 1.5rem; text-indent: 2em">{{ylobj.pjhm}}</p>
        </div>
        <div style="color: red; position: relative; top: 57px; left: 395px">
          <span>{{ylobj.nf}}</span>
          <span style="position: relative; left: 55px">{{ylobj.hm}}</span>
        </div>
        <div style="position: relative; top: 45px; left: 72px">
          <span>电子票号：{{ylobj.dzph}}</span>
          <span style="position: relative; top: 18px; right: 100px">{{ylobj.dwbm}}</span>
          <span style="position: relative; top: 15px; left: 0">{{ylobj.year}}</span>
          <span style="position: relative; top: 15px; left: 42px">{{ylobj.month}}</span>
          <span style="position: relative; top: 15px; left: 80px">{{ylobj.day}}</span>
        </div>
        <div style="position: relative; top: 73px; left: 160px">
          <span>{{ylobj.bmsr}}</span>
          <span style="position: absolute; left: 208px">{{ylobj.address||''}}</span>
          <span style="position: absolute;left: 418px;">{{ylobj.ajbh||''}}</span>
        </div>
        <div style="position: relative; top: 93px; left: 160px">
<!--          <p>{{ylobj.ay}}</p>-->
          <p>{{ylobj.ajmc}}</p>
          <p style="position: relative; top: 20px">{{ylobj.cftk}}</p>
        </div>

        <div style="line-height:26px">
          <div style="position: relative; top: 145px; left: 75px" v-for="item in yllist">
            <span style="display: inline-block;width: 115px">{{item.wzmc}}</span>
            <span style="display: inline-block;width: 45px">{{item.dw}}</span>
            <span style="display: inline-block;width: 123px">{{item.ggxh}}</span>
            <span style="display: inline-block;">{{item.sl}}</span>
          </div>
        </div>

        <div style="position: absolute;bottom: 81px;right: 332px;">
          <span>{{ylobj.jbr}}</span>
          <span style="position: relative;left: 174px;">{{ylobj.jbr}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>

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
            <span style="position: relative;left: 195px">{{ylobj.dsr}}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    </span>
      </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '../../../utils/datetime'
  const urlImgPj = require("../../../images/005004001new.png")
  const urlImgSw = require("../../../images/005005001.png")
  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          ajbh: '',
          ajmc: '',
          beg_time: '',
          end_time: '',
          pjhm: '',
          zfzt: '',
          jbr: '',
          jdph: '',
          pjmc:'',
          dwmc:'',
          zfzt:'',
          pjlx:''
        },
        ylobj:{},
        bgImg: {
          backgroundImage: "url(" + urlImgPj + ")"
        },
        bgImgSw: {
            backgroundImage: "url(" + urlImgSw + ")"
        },
        dialogVisible: false,
        dialogVisiblePjkj:false,
        options: [
          {value: '0', label: '待申请'},
          {value: '1', label: '待接收'},
          {value: '5', label: '部分接收'},
          {value: '4', label: '部分退回'},
          {value: '2', label: '已接收'},
          {value: '3', label: '已退回'}
        ],
        zfOptions:[
          {value: '0', label: '未作废'},
          {value: '1', label: '已作废'},
         ],
        pjlxOptions:[
          {value: '005005001', label: '罚没票据'},
          {value: '005004001', label: '暂扣票据'},
        ],
        leftList: [],
        dialogVisibleMssj:false,

        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],
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
        if (sessionStorage.getItem('ysosqSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('ysosqSession'))
        }
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
        this.findTable();
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
        this.$router.push({path: '/productManage/editProduct', query: {setid: 123456}});
      },
      viewClick(row) {
        var params = {
          yssq_id: row.id
        }
        this.$api.yssq.editYssqxx(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('ckyssq')
            sessionStorage.setItem('ckyssq', JSON.stringify(res.body.default))
            this.$router.push({
              name: 'viewYssq',
              params: res.body.default
            })
          })
        })
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
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
        let timeComp = timeCompare(this.formInline.beg_time, this.formInline.end_time)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };


        this.formInline.beg_time = this.formInline.beg_time==null?'':this.formInline.beg_time
         this.formInline.end_time = this.formInline.end_time==null?'':this.formInline.end_time
        var parms = {};
        Object.assign(parms, param, this.formInline)

        this.$api.pjsy.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      editClick(row) {
        sessionStorage.removeItem('ywidUpload')
        sessionStorage.setItem('ywidUpload', row.id)
        var params = {
          yssq_id: row.id
        }
        this.$api.yssq.editYssqxx(params).then((res) => {
          this.$nextTick(() => {
            if(Object.keys(res.body).length !== 0) {
              sessionStorage.removeItem('bjyssq')
              sessionStorage.setItem('bjyssq', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'edit',
                params: res.body.default
              })
            }else{
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })
      }, formatZfzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未作废'
        } else if (cellValue == '1') {
          returnValue = '已作废'
        }
        return returnValue;
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
       this.formInline ={
         ajbh: '',
         ajmc: '',
         beg_time: '',
         end_time: '',
         pjhm: '',
         zfzt: '',
         jbr: '',
         jdph: '',
         pjmc:'',
         dwmc:'',
         zfzt:'',
         pjlx:''
       }
      },
      yl(row){
          var param = {
            pjxx_id:row.id,
            pjbm:row.pjbm
          }
          this.$api.zkkj.showPjxx(param).then((res) => {
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
        },

      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('ysosqSession')
          sessionStorage.setItem('ysosqSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
