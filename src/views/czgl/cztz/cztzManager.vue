<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
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
            查询条件
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
              <el-form ref="form" :inline="true" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="物证名称">
                      <el-input v-model="formInline.wzmc" placeholder="请输入物证名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置方式">
                      <el-select v-model="formInline.czfs" placeholder="请选择">
                        <el-option
                          v-for="item in czfsOptions"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button" style="">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">

                  <el-form-item label="物证编号">
                    <el-input v-model="formInline.wzbh" placeholder="请输入物证编号" size="mini" clearable
                              @keyup.enter.native="findTable">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="案件编号">
                    <el-input v-model="formInline.ajbh" placeholder="请输入案件编号" size="mini" clearable
                              @keyup.enter.native="findTable">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="申请人">
                    <el-input v-model="formInline.sqrxm" placeholder="请输入申请人" size="mini" clearable
                              @keyup.enter.native="findTable">
                    </el-input>
                  </el-form-item>

                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-form-item label="处置日期">
                      <el-date-picker
                        v-model="formInline.czsjq"
                        type="date"
                        placeholder="请输入日期起"
                        format="yyyy-MM-dd"
                        value-format="yyyyMMdd">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        v-model="formInline.czsjz"
                        type="date"
                        placeholder="请输入日期止"
                        format="yyyy-MM-dd"
                        value-format="yyyyMMdd">
                      </el-date-picker>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="success" icon="el-icon-download" v-access id="rktzexp" size="mini" @click="expRktz">导出台账</el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange">
         <!-- <el-table-column type="selection" width="30"></el-table-column> -->
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wzmc" label="物证名称"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="caseThingName(scope.row.id)">{{ scope.row.wzmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sqrxm" label="申请人" width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqrxm" label="处置人" width="100px" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="zzczfs" label="处置方式" width="80px" :formatter="formatCzfs" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zzczqk" label="最终处置情况" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zzczsj" label="处置时间" width="160px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column label="操作" width="150px" fixed="right" align="center">
            <template slot-scope="scope">


              <i  class="el-icon-view" title="查看"
                 style="font-size: 20px;" @click="viewClick(scope.row)"></i>


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
    <el-dialog
      title="处置详情"
      :visible.sync="czxqDialog"

      :modal="false"
      width="50%"
      >
      <!-- <el-divider content-position="left">申请信息</el-divider> -->
      <el-form :model="czxxForm" label-width="100px" size="mini" label-position="right">

        <el-row>
          <el-col :span="12">
            <el-form-item label="案件编号">
              <el-input v-model="czxxForm.ajbh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案件名称">
              <el-input v-model="czxxForm.ajmc" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物证名称">
              <el-input v-model="czxxForm.wzmc" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="数量">
            <el-input v-model="czxxForm.wzsl" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="特征描述">
              <el-input v-model="czxxForm.wztz" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="单位">
            <el-input v-model="czxxForm.wzdw" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="处置方式">
              <!-- <el-input v-model="czxxForm.zzczfs" size="mini" readonly="readonly"></el-input> -->
              <el-select v-model="czxxForm.zzczfs" size="mini" :disabled="true" width="100%">
                <el-option
                  v-for="item in czfsOptions"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="申请人">
            <el-input v-model="czxxForm.sqrxm" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请时间">
              <el-input v-model="czxxForm.sqsj" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="审核人">
            <el-input v-model="czxxForm.czr_name" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核时间">
              <el-input v-model="czxxForm.created_time" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="处置登记人">
            <el-input v-model="czxxForm.zzczdjr" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="最终处置情况" >
              <el-input type="textarea" v-model="czxxForm.zzczqk" size="mini"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="说明附件" >
              <el-button type="success" size="small" @click="dialogUpLoadClick" plain>查看文件</el-button>

            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="czxqDialog = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
  </el-card>

</template>
<script>
   import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'
  export default {
    name: 'entryRegistration',
    components: {
      casePreview,
      uploadFile
    },
    data() {
      return {
        yssqid: '',
        getFileData: false,
        dialogUpLoad: false,
        formInline: {
          sqrxm: '',
          czsjq: '',
          czsjz: '',
          sqrqz: '',
          ajbh: '',
          ajmc: '',
          czfs: '',
          wzmc:'',
          wzbh:''
        },
        user_id:'',
        dialogVisible: false,
        czfsOptions:[
          {value: '01', text: '移交公物仓'},
          {value: '02', text: '上缴专管部门'},
          {value: '03', text: '自行处置'},
        ],
        leftList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],

        more: false,
        centerDialogVisible: false,
        wzxx_id:'',
        czxqDialog:false,
        czxxForm:{},
        isView:true
      }
    },
    created() {
        if (sessionStorage.getItem('cztzSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('cztzSession'))
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
      getData (val) {
          this.dialogUpLoad = val
          this.getFileData = val
      },
      init() {
        this.findTable();
        this.user_id = JSON.parse(sessionStorage.getItem('sessionInfo')).user_id
        console.log(this.user_id)
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
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      viewClick(row) {
        var params = {
          id: row.id
        }
        this.$api.cztz.getCzxxByWzxxId(params).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
                 this.czxxForm = res.body.default
                 this.czxxForm.sqsj = timeFormat(this.czxxForm.sqsj)
                 this.czxxForm.created_time = timeFormat(this.czxxForm.created_time)
                 this.czxqDialog = true
                 this.yssqid = this.czxxForm.ywzb_id
            }else{
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
               this.czxqDialog = false
            }
          })
        })
      },
      dialogUpLoadClick () {
        this.dialogUpLoad = true
        this.getFileData = true
      },
      expRktz(){
        var parms = {};
        this.formInline.czsjq = this.formInline.czsjq==null?'':this.formInline.czsjq
         this.formInline.czsjz = this.formInline.czsjz==null?'':this.formInline.czsjz

        Object.assign(parms, this.formInline)

        this.$api.cztz.exportExcel(parms).then((res) => {
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

        let timeComp = timeCompare(this.formInline.czsjq, this.formInline.czsjz)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };


        this.formInline.czsjq = this.formInline.czsjq==null?'':this.formInline.czsjq
         this.formInline.czsjz = this.formInline.czsjz==null?'':this.formInline.czsjz
        var parms = {};
        Object.assign(parms, param, this.formInline)

        this.$api.cztz.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },

     formatCzfs(row, column, cellValue, index){
       var returnValue = cellValue;
       if (cellValue == '01') {
         returnValue = '移交公物仓'
       } else if (cellValue == '02') {
         returnValue = '上缴专管部门'
       }else if (cellValue == '03') {
         returnValue = '自行处置'
       }
       return returnValue;

     },
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa === '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa === '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      czdzFormat(row, column, cellValue, index){
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '提交审核'
        } else if (cellValue == '1') {
          returnValue = '审核通过'
        }else if (cellValue == '2') {
          returnValue = '审核驳回'
        }
        return returnValue;
      },
      reset() {
        this.formInline={
          sqrxm: '',
          czsjq: '',
          czsjz: '',
          sqrqz: '',
          ajbh: '',
          ajmc: '',
          czfs: '',
          wzmc:'',
          wzbh:''
        }

      },
      caseThingName(wzxx_id) {
        debugger
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('cztzSession')
          sessionStorage.setItem('cztzSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
