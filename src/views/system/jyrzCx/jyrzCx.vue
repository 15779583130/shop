<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
           交易日志数据列表
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
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="操作人姓名" prop="oper_name">
                      <el-input v-model="filters.oper_name" size="mini" placeholder="请输入操作人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="请求类名" prop="req_class_name">
                      <el-input v-model="filters.req_class_name" size="mini" placeholder="请输入操作类名"></el-input>
                    </el-form-item>
                    <el-form-item label="创建日期" class="large date-box-fix">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_starttime"
                          type="date"
                          placeholder="请选择日期起" size="mini" format="yyyy-MM-dd" style="width: 270px"
                          value-format="yyyyMMdd" @change="changeRqq">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.created_endtime"
                          type="date"
                          placeholder="请选择日期止" size="mini" format="yyyy-MM-dd" style="width: 270px"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="text-align: right;">
                    <el-form-item class="id-button">
                      <el-button type="primary" icon="el-icon-search" @click="findTable('search')" size="mini">查询</el-button>
                      <el-button type="default"  icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="响应类名">
                       <el-input v-model="filters.resp_class_name" size="mini" placeholder="请输入响应类名"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方法名">
                        <el-input v-model="filters.method_name" size="mini" placeholder="请输入请求方法名"></el-input>
                    </el-form-item>
                    <el-form-item label="交易日志id">
                        <el-input v-model="filters.transid" size="mini" placeholder="请输入交易日志id"></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                    size="mini">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="oper_name" label="操作人姓名" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="created_time" label="记录时间" :formatter="formatDate" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="elapsed_time" label="消耗时间" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="reqclass" label="请求类" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="respclass" label="响应类"   :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="operation_request_caoz" label="请求报文"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i @click="viewqqbw(scope.row)" class="el-icon-view"
                 style="font-size: 20px;cursor: pointer" title="查看"></i>
            </template>
            </el-table-column>
            <el-table-column prop="operation_response_caoz" label="返回报文"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i @click="viewfhbw(scope.row)" class="el-icon-view"
                 style="font-size: 20px;cursor: pointer" title="查看"></i>
            </template>
            </el-table-column>
            <el-table-column prop="method" label="服务方法"  :show-overflow-tooltip="true">
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
          <el-dialog title="查看报文信息" :visible.sync="dialogTableVisible" width="35%"   :append-to-body="true">

           <!-- <xmp>{{bwxx}}</xmp> -->
            <xmp v-text="bwxx"></xmp>


          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    data() {
      return {
        dialogTableVisible: false,
        bwxx:'',
        dialogImageUrl: '',
        dialogVisible: false,
        //筛选条件
        filters: {
          created_starttime:'',
          created_endtime:'',
          oper_name:'',
          req_class_name:'',
          resp_class_name:'',
          transid:'',
          method_name:''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        deptDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        filterText: '',
        checkDeptId: [],
        checkDeptName: [],
        escapeMap :{
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': '&quot;',
          "'": '&#39;'
        },
        unescapeMap :{
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          '&quot;': '"',
          "&#39;":  "'"
        },
        more: false
      }
    },
    created() {

      this.init()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      escapeHTML(string) {
        var that = this;
        return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
          return that.escapeMap[s] || s;
        });
      },
      unescapeHTML: function(a){
        a = "" + a;
         return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      init() {
        // 查询信息
        this.findTable()
      },
      handleCheckChange(data, checked) {
        if (checked) {
          this.checkDeptId.push(data.id)
          this.checkDeptName.push(data.name)
        } else {
          this.checkDeptId.splice(this.checkDeptId.indexOf(data.id), 1)
          this.checkDeptName.splice(this.checkDeptName.indexOf(data.name), 1)
        }
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTable(val) {
        if(val=='search'){
          this.currentPage='1'
        }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        Object.assign(param, this.filters)
        this.$api.jyrzcx.queryTable(param).then((res) => {
          this.total = Number(res.body.default.listcount);
          this.tableData = res.body.default.list;
        })
      },
      viewfhbw(row){
        sessionStorage.removeItem('fhbw')
        sessionStorage.setItem('fhbw', JSON.stringify({id:row.id,type:'fh'}))
        this.$router.push({
          name: 'fhbw',
          params: {
            activeName: 'caseInfo'
          }
        })
        // let self = this
                // var parms={
                //   id:row.id
                // };
                // this.$api.jyrzcx.get(parms).then((res) => {
                //   this.$nextTick(() => {
                //   this.dialogTableVisible = true
                //     console.log(res.body.default.respcontent)
                //     this.bwxx=this.formateXml(this.unescapeHTML(res.body.default.respcontent))
                //   })
                // })

      },
      viewqqbw(row){
        sessionStorage.removeItem('fhbw')
        sessionStorage.setItem('fhbw', JSON.stringify({id:row.id,type:'qq'}))
        this.$router.push({
          name: 'fhbw',
          params: {
            activeName: 'caseInfo'
          }
        })
        // let self = this
        //         var parms={
        //           id:row.id
        //         };
        //         self.$api.jyrzcx.get(parms).then((res) => {
        //           self.$nextTick(() => {
        //             self.dialogTableVisible = true
        //             self.bwxx=self.formateXml(self.unescapeHTML(res.body.default.reqcontent))
        //           })

        //         })

      },
      reset() {
        this.filters = {
          created_starttime:'',
          created_endtime:'',
          oper_name:'',
          req_class_name:'',
          resp_class_name:'',
          transid:'',
          method_name:''
        }
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
      },
      //计算头函数 用来缩进
       setPrefix(prefixIndex) {
          var result = '';
          var span = '    ';//缩进长度
          var output = [];
          for(var i = 0 ; i < prefixIndex; ++i){
              output.push(span);
          }
          result = output.join('');
          return result;
      },

      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1

      },
      createBtn() {
        this.$router.push({
          name: 'addOrganization'
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
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa === '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa === '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
      },

    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('wzdjSession')
      sessionStorage.setItem('wzdjSession', JSON.stringify(this.filters))
      next()
    },
  }
</script>

<style scoped>

</style>
