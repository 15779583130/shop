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
            查询条件
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
                  <el-col :span="20" style="display: flex;">

                    <el-form-item label="单位名称">
                      <el-input v-model="filters.unit_name"  size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>


                    <el-form-item label="发布日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.req_time_begin"
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
                          v-model="filters.req_time_end"
                          type="date"
                          placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" style="width: 160px">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="接口名称">
                      <el-input v-model="filters.api_name"  size="mini"   clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
          </el-col>
                  <el-col :span="4" style="text-align: right;">
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
        <el-col :span="8">
        <div class="ibox-title">
      <div class="ibox-title-text" style="padding-left: 0px">
        <h5>日志信息列表</h5>
      </div>
        </div>
        </el-col>
        <el-col :span="16">

        </el-col>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange" @cell-dblclick="viewTest">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
        <!--  <el-table-column label="单位名称" min-width="120px"> -->
            <!-- <template slot-scope="scope">{{ scope.row.request_url }}</template> -->
          <!-- </el-table-column> -->
           <el-table-column prop="unit_name" label="单位名称" :show-overflow-tooltip="true" min-width="120px"></el-table-column>
          <el-table-column prop="api_name" label="接口名称" :show-overflow-tooltip="true" min-width="80px"></el-table-column>
          <el-table-column prop="request_url" label="请求路径" :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column prop="req_person" label="调用者" :show-overflow-tooltip="true" width="70px">
            <!-- <template slot-scope="scope">
              <el-button
                :type="scope.row.enable_flag === '禁用' ? 'danger' : 'success'" size="mini" title="请点击进行状态控制" @click="changeSfqy(scope.row)"
              >{{scope.row.enable_flag}}</el-button >
            </template> -->
          </el-table-column>
          <el-table-column prop="cost_time" label="耗时(毫秒)" :show-overflow-tooltip="true" ></el-table-column>
            <el-table-column prop="req_time" label="调用时间" :show-overflow-tooltip="true" ></el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="100px">
            <template slot-scope="scope">
              <i class="el-icon-setting" style="font-size: 20px;cursor: pointer" @click="showLog(scope.row)" title="查看日记"></i>
            <!--  <i @click="handleDelete(scope.row)" class="el-icon-delete" style="font-size: 20px; margin-left: 12px;cursor: pointer"
                 title="删除" v-access id="yhglDel"></i> -->
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
   <!-- <el-dialog :title="title" :visible.sync="babmDialog" width="70%"
               :close-on-click-modal="false"
               :close-on-press-escape="false" :modal="false" style="padding: 0 5px">
      <el-form :model="dataForm" status-icon :rules="dataFormRules" ref="dataForm" label-width="100px"
               class="demo-dataForm" size="mini">
        <el-row>
         <el-col :span="24">
            <el-form-item label="请求报文" prop="qqbw" style="width: 100%">
              <el-input v-model="dataForm.qqbw"  :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <el-row>
         <el-col :span="24">
           <el-form-item label="响应报文" prop="xybw" style="width: 100%">
             <el-input v-model="dataForm.xybw"  :readonly="true"></el-input>
           </el-form-item>
         </el-col>
       </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="babmDialog = false" size="mini" >关闭</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="日志明细信息" :visible.sync="babmDialog" width="40%"   :append-to-body="true" >

     <!-- <xmp>{{bwxx}}</xmp> -->
     请求报文
      <xmp v-text="bwxx" style="background:#f5f5f5;overflow-x:auto; overflow-y:auto; height:55vh"></xmp>
      响应报文
       <xmp v-text="xqbw" style="background:#f5f5f5;overflow-x:auto; overflow-y:auto; height:55vh"></xmp>


    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    name: 'entryTransferAccount',
    data() {
      return {
        title:'test',
         babmDialog:false,
        disTzDaoChu: true,
        dataForm: {
          id: '',
          bt:'',
          ggnr:'',
          fbsj_start_time:'',
          fbsj_end_time:'',
          zt:'',
          tzlx:'',
          viewdeptids:'',
          viewdeptnames:'',
          fsbm:'',
          fsr:''
        },
        filters: {
          unit_name: '',
          api_name: '',
          req_time_begin: '',
          req_time_end:'',
        },
        dwOptions:[
          {value: '1', label: '是'},
          {value: '0', label: '否'},
        ],
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        checkAll: false,
        checkedBox: [],
        isIndeterminate: true,
        tableData: [],
        multipleSelection: [],
      }
    },
    created() {
        if (sessionStorage.getItem('rukudjtzSession')) {
            this.filters = JSON.parse(sessionStorage.getItem('rukudjtzSession'))
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
      handleClick() {
        this.$message({message: '该功能尚未上线...', type: 'warning'})
      },
      handleCheckAllChange(val) {
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.leftList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.leftList.length;
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      handleDelete(row) {
        this.$confirm('确定要删除当前的记录嘛？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: row.id
          };
          this.$api.entryRegistrationAcount.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      findTable() {
        let self = this
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {
          unit_name:this.filters.unit_name,
          req_time_begin:this.filters.req_time_begin,
          req_time_end:this.filters.req_time_end,
          api_name:this.filters.api_name
        };

        Object.assign(parms, param, this.filters)
        this.$api.jkdyrzcx.queryTable(parms).then((res) => {

          this.total = Number(res.body.default.logscount);
          this.tableData = res.body.default.logs;
          // this.tableData.forEach(function (c) {
          //   if(c.enable_flag=='1'){
          //     c.enable_flag='是'
          //   }else{
          //     c.enable_flag='否'
          //   }
          // })
        })
      },
      viewTest(row){
        debugger
        //this.isEdit = false
        this.title="日记明细信息"
        var params = {
          id: row.id
        }
        this.$api.jkdyrzcx.getGg(params).then((res) => {
          this.$nextTick(() => {
            debugger
            // this.dataForm = res.data.body.default;
            // this.dataForm.fbsj = timeFormat(this.dataForm.fbsj)
            // this.dataForm.fsbm = res.data.body.data.fsrdept
            // this.dataForm.fsr = res.data.body.data.fsr_name;
            // this.dataForm.viewdeptnames = res.data.body.default.deptname;
            // this.dataForm.viewdeptids = res.data.body.default.deptids;
            // this.content = this.unescapeHTML(this.dataForm.ggnr);
            // self.bwxx=self.formateXml(self.unescapeHTML(res.body.default.qqbw))
            //this.formateXml(this.unescapeHTML(res.body.default.req_content))
            //this.formateXml(this.unescapeHTML(res.data.body.default.resp_content))
           this.bwxx =this.formateXml(this.unescapeHTML(res.data.body.default.req_content))

           this.xqbw = this.formateXml(this.unescapeHTML(res.data.body.default.resp_content))
            this.babmDialog = true
          })
        })
      },
      unescapeHTML: function(a){
        a = "" + a;
         return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      },
      formateXml(xmlStr){
          this.text = xmlStr;
          //使用replace去空格
          this.text = '\n' + this.text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props){
              return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
          }).replace(/>\s*?</g,">\n<");
          //处理注释
          this.text = this.text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text){
              var ret = '<!--' + escape(this.text) + '-->';
              return ret;
          }).replace(/\r/g,'\n');
          return this.text
          //调整格式  以压栈方式递归调整缩进
          // var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
          // var nodeStack = [];
          // var output = this.text.replace(rgx,function($0,all,name,isBegin,isCloseFull1,isCloseFull2 ,isFull1,isFull2){
          //     var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
          //     var prefix = '';
          //     if(isBegin == '!'){//!开头
          //         prefix = setPrefix(nodeStack.length);
          //     }else {
          //         if(isBegin != '/'){///开头
          //             prefix = setPrefix(nodeStack.length);
          //             if(!isClosed){//非关闭标签
          //                 nodeStack.push(name);
          //             }
          //         }else{
          //             nodeStack.pop();//弹栈
          //             prefix = setPrefix(nodeStack.length);
          //         }
          //     }
          //     var ret =  '\n' + prefix + all;
          //     return ret;
          // });
          // var prefixSpace = -1;
          // var outputText = output.substring(1);
          // //还原注释内容
          // outputText = outputText.replace(/\n/g,'\r').replace(/(\s*)<!--(.+?)-->/g,function($0, prefix,  text){
          //     if(prefix.charAt(0) == '\r')
          //         prefix = prefix.substring(1);
          //     this.text = unescape(this.text).replace(/\r/g,'\n');
          //     var ret = '\n' + prefix + '<!--' + this.text.replace(/^\s*/mg, prefix ) + '-->';
          //     return ret;
          // });
          // outputText= outputText.replace(/\s+$/g,'').replace(/\r/g,'\r\n');
          // return outputText;

      },
      showLog(row){

          let that = this

          let param = {
            id: row.id
          }
          // this.btnshow = false
          that.$api.jkdyrzcx.getGg(param).then((res) => {
            debugger
            if (res.success == "true") {
              that.treeData = res.data
              this.bwxx =this.formateXml(this.unescapeHTML(res.data.body.default.req_content))
              this.xqbw=this.formateXml(this.unescapeHTML(res.data.body.default.resp_content))
              that.babmDialog = true;
              // that.$api.ckggmanage.getDeptIds(param).then((res)=>{
              //   let ids = res.data.body.default.deptids
              //   that.$refs['tree1'].setCheckedKeys(ids.split(","));
              // })
             // debugger
               //this.formateXml(this.unescapeHTML(res.data.body.default.resp_content))
          //   this.dataForm.qqbw =this.formateXml(this.unescapeHTML(res.data.body.default.req_content))

          //   this.dataForm.xybw = this.formateXml(this.unescapeHTML(res.data.body.default.resp_content))
               // this.content = res.data.body.default.ggnr
               //  this.dataForm.fbsj_start_time = res.data.body.default.fbsj_start_time
               //   this.dataForm.fbsj_end_time = res.data.body.default.fbsj_end_time
               //    this.dataForm.tzlx =res.data.body.default.tzlx
               //    this.dataForm.fsbm=res.data.body.data.fsrdept
               //    this.dataForm.fsr=res.data.body.data.fsr_name
               //    this.dataForm.fbsj=res.data.body.data.fbsj
            } else {
              that.$message({message: res.message, type: 'error'})
            }
          })

        }
      ,
      reset() {
        this.filters.unit_name = '';
        this.filters.api_name = '';
        this.filters.req_time_begin = '';
       this.filters.req_time_end = '';
      }
    },

      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rukudjtzSession')
          sessionStorage.setItem('rukudjtzSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
