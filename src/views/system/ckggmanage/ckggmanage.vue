<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
  @import '../../page-main';
  /deep/.el-input--mini .el-input__inner{
    width:100%
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
            查询
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
                    <el-form-item label="标题" prop="bt">
                      <el-input v-model="filters.bt" placeholder="请输入标题" size="mini" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="发布日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.beg_time"
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
                    <el-form-item label="类型" prop="tzlx">
                      <el-select v-model="filters.tzlx" placeholder="请选择">
                        <el-option value="0" label="通知"></el-option>
                        <el-option value="1" label="通告"></el-option>
                        <el-option value="2" label="通报"></el-option>
                        <el-option value="3" label="公告"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row class="form-line" v-show="more"> -->

                <!-- </el-row> -->
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="view">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fsr_dept" label="部门" :show-overflow-tooltip="true" min-width="150px">
          </el-table-column>
          <el-table-column prop="fsr_name" label="发送人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="fbsj" label="发布时间" :show-overflow-tooltip="true" :formatter="dateFormat" min-width="130px"></el-table-column>
          <el-table-column prop="bt" label="标题" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column prop="zt_text" label="状态" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column prop="tzlx_text" label="类型" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <i class="el-icon-setting" style="font-size: 20px;cursor: pointer" @click="showDept(scope.row)" title="查看部门"></i>
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

    <el-dialog :title="title" :visible.sync="babmDialog" width="70%"
               :close-on-click-modal="false"
               :close-on-press-escape="false" :modal="false" style="padding: 0 5px">
      <el-form :model="dataForm" status-icon :rules="dataFormRules" ref="dataForm" label-width="100px"
               class="demo-dataForm" size="mini">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="bt" style="width: 100%">
              <el-input v-model="dataForm.bt" placeholder="请输入标题" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <template >
            <el-col :span="8">
              <el-form-item label="发送部门"  style="width: 100%">
                <el-input v-model="dataForm.fsbm" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发送人" style="width: 100%">
                <el-input v-model="dataForm.fsr" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发送时间" style="width: 100%">
                <el-input v-model="dataForm.fbsj" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="通知类型" prop="tzlx" style="width: 100%" >
              <el-select v-model="dataForm.tzlx" style="width:100%" disabled="true">
                <el-option value="0" label="通知" ></el-option>
                <el-option value="1" label="通告"></el-option>
                <el-option value="2" label="通报" ></el-option>
                <el-option value="3" label="公告"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="公告时间">
              <el-col :span="10" style="display: flex;">
                <el-date-picker
                  v-model="dataForm.fbsj_start_time"
                  type="date"
                  placeholder="请输入日期起" size="mini" format="yyyy-MM-dd" style="width: 160px"
                  value-format="yyyy-MM-dd" :readonly="true">
                </el-date-picker>
              </el-col>
              <el-col :span="2" style="display: flex;">
                <i class="text">-</i>
              </el-col>
              <el-col :span="10" style="display: flex;">
                <el-date-picker
                  v-model="dataForm.fbsj_end_time"
                  type="date"
                  placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd" style="width: 160px" :readonly="true">
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="接收部门" prop="viewdeptnames" style="width: 100%" v-if="!isEdit">
              <el-input v-model="dataForm.viewdeptnames" placeholder="请选择部门" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="edit_container" style="height: 55vh;overflow-y: auto">
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @focus="onEditorFocus($event)"
              >
                <!--<p  v-html="content">{{content}}</p>-->
              </quill-editor>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="babmDialog = false" size="mini" >关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import {translation} from '@/utils/translation'
  export default {
    name: 'Pjkj',
    data() {
      return {
        title:'',
        isEdit:true,
        // btnshow:true,
        content: '',
        editorOption: { // 定义富文本编辑器显示
          modules:{
            toolbar:[
              ['bold','italic','underline','strike'], // 加粗、倾斜、下划线、删除线

              [{'header':1},{'header':2}], // 标题一、标题二
              [{'list':'ordered'},{'list':'bullet'}], // 列表

              [{'color':[]},{'background':[]}], // 字体颜色、背景颜色
            ]
          }
        },
        filterText:'',
        babmDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        picNum:'',
        isEditGs:'true',
        ylobj:{},
        yllist:[
          {wzbm:'1',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'2',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'3',wzmc:'无',dw:'个',ggxh:'无',sl:'0'},
          {wzbm:'4',wzmc:'无',dw:'个',ggxh:'无',sl:'0'}
        ],
        //搜索条件
        filters: {
          bt: '',
          zt: '',
          tzlx: '',
          beg_time: '',
          end_time: '',
        },
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:5
        },
        //table
        tableData: [],
        dialogVisible: false,
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
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        dataFormRules: {
          bt: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 20, message: '长度不得超过20字符'}
          ],
          tzlx: [
            {required: true, message: '这是必填字段',trigger:'click'},
          ]
        },
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
      onEditorFocus(event){
        if(!this.isEdit){
          event.enable(false)
        }else{
          event.enable(true)
        }
      },
      init() {
        if (sessionStorage.getItem('pjkjSession')) {
          this.filters = JSON.parse(sessionStorage.getItem('pjkjSession'))
        }
        this.findTable();
      },
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
      getChooseDept() {
        var nodes = this.$refs.tree1.getCheckedNodes();
        var node_ids = nodes.map(obj => {
          return obj.id
        }).join(",");
        var names = nodes.map(obj => {
          return obj.name
        }).join(",");
        this.dataForm.viewdeptnames = names;
        this.dataForm.viewdeptids = node_ids;
        this.babmDialog = false;
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
        var param = {
          bt:this.filters.bt,
          tzlx:this.filters.tzlx,
          beg_time:this.filters.beg_time,
          end_time:this.filters.end
        };
        Object.assign(param, this.pageinfo, this.filters)

        this.$api.ckggmanage.queryTable(param).then((res) => {

          this.pageinfo.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },

      reset() {
        var obj ={
          bt: '',
          zt: '',
          tzlx: '',
          beg_time: '',
          end_time: '',
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
        } else if (cellValue = '1') {
          value = '已作废'
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
      view(row){
        this.isEdit = false
        this.title="查看公告信息"
        var params = {
          id: row.id
        }
        this.$api.ckggmanage.getGg(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.data.body.default;
            this.dataForm.fbsj = timeFormat(this.dataForm.fbsj)
            this.dataForm.fsbm = res.data.body.data.fsrdept
            this.dataForm.fsr = res.data.body.data.fsr_name;
            this.dataForm.viewdeptnames = res.data.body.default.deptname;
            this.dataForm.viewdeptids = res.data.body.default.deptids;
            this.content = this.unescapeHTML(this.dataForm.ggnr);
            this.babmDialog = true
          })
        })
      },
      showDept(row){
        let that = this
        let param = {
          id: row.id
        }
        that.$api.ckggmanage.getGg(param).then((res) => {
          if (res.success == "true") {
          //  that.treeData = res.data
            that.babmDialog = true;
//            that.$api.ckggmanage.getDeptIds(param).then((res)=>{
//              let ids = res.data.body.default.deptids
//              that.$refs['tree1'].setCheckedKeys(ids.split(","));
//            })
            this.$nextTick(() => {
              debugger
              this.dataForm = res.data.body.default;
              this.dataForm.bt = res.data.body.default.bt
              this.content = this.unescapeHTML(this.dataForm.ggnr);
              this.dataForm.fbsj_start_time = res.data.body.default.fbsj_start_time
              this.dataForm.fbsj_end_time = res.data.body.default.fbsj_end_time
              this.dataForm.tzlx =res.data.body.default.tzlx
              this.dataForm.fsbm=res.data.body.data.fsrdept
              this.dataForm.fsr=res.data.body.data.fsr_name
              this.dataForm.fbsj=res.data.body.data.fbsj
            })

//            this.dataForm.bt = res.data.body.default.bt
//            this.content = this.unescapeHTML(this.dataForm.ggnr);
//            this.dataForm.fbsj_start_time = res.data.body.default.fbsj_start_time
//            this.dataForm.fbsj_end_time = res.data.body.default.fbsj_end_time
//            this.dataForm.tzlx =res.data.body.default.tzlx
//            this.dataForm.fsbm=res.data.body.data.fsrdept
//            this.dataForm.fsr=res.data.body.data.fsr_name
//            this.dataForm.fbsj=res.data.body.data.fbsj
          } else {
            that.$message({message: res.message, type: 'error'})
          }
        })

      }
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('pjkjSession')
      sessionStorage.setItem('pjkjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>
