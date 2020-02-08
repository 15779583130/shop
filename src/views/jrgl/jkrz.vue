<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';

</style>
<template>
  <el-card class="box-card">
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
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row class="form-line">
                  <el-col :span="10">
                  <el-form-item label="创建日期">
                    <el-date-picker
                      v-model="filters.created_starttime"
                      type="date"
                      placeholder="请输入日期起"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMddHHmmss">
                    </el-date-picker>
                    <i class="text">-</i>
                    <el-date-picker
                      v-model="filters.created_endtime"
                      type="date"
                      placeholder="请输入日期止"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMddHHmmss">
                    </el-date-picker>
                  </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="请求平台" prop="qqpt" size="mini">
                      <el-select v-model="filters.qqpt" clearable  placeholder="请选择" style="width: 265px;">
                          <el-option
                            v-for="item in qqpts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                 </el-col>


                  <el-col :span="4" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" size="mini" icon="el-icon-search" @click="findTable('search')">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" @click="reset" size="mini">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">

                     <el-form-item label="业务类型" prop="ywlx" size="mini">
                       <el-col :span="5">
                       <el-select v-model="filters.ywlx" clearable  placeholder="请选择" style="width: 265px;">
                           <el-option
                             v-for="item in ywlxs"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                           </el-option>
                         </el-select>
                         </el-col>
                     </el-form-item>


                    <el-form-item label="来源平台" prop="lypt" size="mini">
                      <el-col :span="5">
                      <el-select v-model="filters.lypt" clearable  placeholder="请选择" style="width: 265px;">
                          <el-option
                            v-for="item in lypts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </el-col>
                    </el-form-item>

                 <el-form-item label="业务信息ID" prop="ywxx_id">
                   <el-input v-model="filters.ywxx_id"  placeholder="请输入业务信息ID" size="mini" style="width: 265px;"></el-input>
                 </el-form-item>
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
          <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" size="mini" border style="width: 100%"
                    highlight-current-row>
            <el-table-column label="序号" width="70" align="center">
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140" prop="created_time" :formatter="formatDate" label="创建时间" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="req_url" label="请求报文"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <i @click="viewqqbw(scope.row)" class="el-icon-view"
                   style="font-size: 20px;cursor: pointer" title="查看"></i>
              </template>
            </el-table-column>
            <el-table-column prop="xybw" label="响应报文"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <i @click="viewxybw(scope.row)" class="el-icon-view"
                   style="font-size: 20px;cursor: pointer" title="查看"></i>
              </template>
            </el-table-column>

            <el-table-column prop="lypt" label="来源平台" :formatter="formatlypt" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="qqpt" label="请求平台" :formatter="formatqqpt" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="qqsj" label="请求时间" :formatter="formatDate" width="140" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="xysj" label="响应时间" :formatter="formatDate" width="140" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="resp_result" label="响应结果"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="time_consuming" label="耗时(毫秒)"  :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="state" :formatter="formatstatus" label="状态"  :show-overflow-tooltip="true">
            </el-table-column>

          </el-table>
          <br/>
          <div class="page" style="">
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
          <el-dialog title="查看报文信息" :visible.sync="dialogTableVisible" width="55%"   :append-to-body="true">

           <!-- <xmp>{{bwxx}}</xmp> -->
            <xmp v-text="bwxx"></xmp>


          </el-dialog>
        </div>
      </el-col>
    </el-row>
<!--    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"
                  :wzxx_id="this.wzxx_id"></case-preview> -->
  </el-card>
</template>
<script>
  import casePreview from "../my-components/casePreview/casePreview"
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    components: {
      casePreview
    },
    data() {
      return {
        dialogTableVisible: false,
        qqpts:[{value:'1',label:'财政罚没'},{value:'2',label:'第三方物流'},{value:'3',label:'短信平台'},],
        ywlxs:[{value:'0',label:'入库'},{value:'1',label:'出库'},{value:'2',label:'移库'},
        {value:'3',label:'调用'},{value:'4',label:'归还'},{value:'5',label:'罚没物资推送'},],
        lypts:[{value:'G',label:'	公安'},{value:'J',label:'检察院'},{value:'F',label:'法院'},],
        bwxx:'',
        text :'',
        filters: {
          qqpt:'',
          ywlx:'',
          lypt:'',
          ywxx_id:'',
          created_starttime:'',
          created_endtime:''
        },

        sfczdwrAry: [
          {value: '1', label: '是'},
          {value: '0', label: '否'}
        ],
        value: '',
        centerDialogVisible: false,
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        gridData: [],
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
        name: '',
        orgCode: '',
        query: {
          parameters: {}
        },
        tableColumns: [],
        more: false,
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
      }
    },
    created() {
      this.findTable();
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
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      formatstatus(row, column) {
        var ztFormat = '';
        if (row.state == '0') {
          ztFormat = '未请求'
        } else if (row.state == '1') {
          ztFormat = '已请求'
        }
        else if (row.state == '2') {
          ztFormat = '已响应'
        }
        else if (row.state == '4') {
          ztFormat = '已处理'
        }
        return ztFormat;
      },
      findTable(val) {
        if(val=='search'){
          this.currentPage='1'
        }
        let timeComp = timeCompare(this.filters.created_starttime, this.filters.created_endttime)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.jkrzcx.queryTable(parms).then((res) => {
          console.log(res.body.default.list)
          this.total = Number(res.body.default.listcount);
          this.tableData = res.body.default.list;
        })
      },
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
      },
      formatqqpt(row, column){
        var qqptFormat =row.qqpt;
        for(var i=0;i<this.qqpts.length;i++){
        if(row.qqpt==this.qqpts[i].value){
          qqptFormat=this.qqpts[i].label
        }
        }
        return qqptFormat;
      },
      formatlypt(row, column){
        var lyptFormat =row.lypt;
        for(var i=0;i<this.lypts.length;i++){
        if(row.lypt==this.lypts[i].value){
          lyptFormat=this.lypts[i].label
        }
        }
        return lyptFormat;
      },
      viewqqbw(row){
        let self = this
        var parms={
          id:row.id,
          type:'0'
        };
        self.$api.jkrzcx.get(parms).then((res) => {
          self.$nextTick(() => {

            self.dialogTableVisible = true
            // self.bwxx=self.unescapeHTML(res.body.default.qqbw)
            // self.bwxx=self.formateXml(self.unescapeHTML(res.body.default.qqbw))
            self.bwxx=self.formateXml(self.unescapeHTML(res.body.default.qqbw))
            if(res.body.default.qqbw==''){
              self.bwxx='无请求报文'
            }
// console.log(self.unescapeHTML(res.body.default.qqbw))
          })
          // console.log(self.unescapeHTML(res.body.default.qqbw))
        })

      },
      viewxybw(row){
         let self = this
        var parms={
          id:row.id,
          type:'0'
        };
        self.$api.jkrzcx.get(parms).then((res) => {
          self.$nextTick(() => {
            self.dialogTableVisible = true
            self.bwxx=self.formateXml(self.unescapeHTML(res.body.default.xybw))
            console.log("ree"+res.body.default.xybw)
            if(res.body.default.xybw===''||self.bwxx==undefined){
              self.bwxx='无响应报文'
            }
          })
          console.log(res.body.default)
        })

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

          // formatXml(xml) {
          //     var formatted = '';
          //     var reg = /(>)(<)(\/*)/g;
          //     xml = xml.replace(reg, '$1\r\n$2$3');
          //     var pad = 0;
          //     $.each(xml.split('\r\n'), function (index, node) {
          //         var indent = 0;
          //         if (node.match(/.+<\/\w[^>]*>$/)) {
          //             indent = 0;
          //         } else if (node.match(/^<\/\w/)) {
          //             if (pad != 0) {
          //                 pad -= 1;
          //             }
          //         } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          //             indent = 1;
          //         } else {
          //             indent = 0;
          //         }

          //         var padding = '';
          //         for (var i = 0; i < pad; i++) {
          //             padding += '  ';
          //         }

          //         formatted += padding + node + '\r\n';
          //         pad += indent;
          //     });
          //     return formatted;
          // },








      checkDetail(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.id
          }
        })
      },
      reset() {

        this.filters.qqpt = '';
        this.filters.ywlx = '';
        this.filters.lypt = '';
        this.filters.ywxx_id = '';
        this.filters.created_starttime = '';
        this.filters.created_endtime = ''
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.id
          }
        })
      },
      caseThingName() {
        this.centerDialogVisible = true
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1
      },
      clearBtn() {
        this.name = ''
        this.orgCode = ''
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
      chooseDept() {
        this.checkDeptId = [];
        this.checkDeptName = [];
        var param = {
          valid_flag: '1'
        }
        this.$api.bmwzc.gsrTree(param).then((res) => {
          if (res.success === "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      chooseDeptName() {
        this.filters.ba_dept_id = this.checkDeptId.join(',')
        this.filters.ba_dept_name = this.checkDeptName.join(',')
        this.deptDialog = false;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('ajcxSession')
          sessionStorage.setItem('ajcxSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
