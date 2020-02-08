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
              <el-form ref="form" :model="filters" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">

                    <el-form-item label="单位名称" prop="unit_name">
                      <el-input v-model="filters.unit_name"  size="mini" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="接口名称" prop="api_name">
                      <el-input v-model="filters.api_name"  size="mini" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" prop="enable_flag">
                      <el-select v-model="filters.enable_flag" >
                        <el-option value="0" label="是"></el-option>
                        <el-option value="1" label="否"></el-option>
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

              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" v-access id="ggAdd" size="mini" @click="add()">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" v-access id="ggdel" @click="delAll()" size="mini">批量删除</el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="view"
                  @selection-change="selectData">
          <el-table-column label="序号" width="50" align="center">
            <el-table-column type="selection"></el-table-column>
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unit_name" label="单位名称" :show-overflow-tooltip="true" min-width="150px">
          </el-table-column>
          <el-table-column prop="api_name" label="接口名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="limit_request" label="请求阀值" :show-overflow-tooltip="true" :formatter="dateFormat" min-width="130px"></el-table-column>
          <el-table-column prop="limit_concurrency_request" label="并发阀值" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="enable_flag" label="是否启用" :show-overflow-tooltip="true">
            <template slot-scope="scope">
             <el-button
             :type="scope.row.enable_flag === '禁用' ? 'danger' : 'success'" size="mini" title="请点击进行状态控制" @click="changeSfqy(scope.row)"
              >{{scope.row.enable_flag}}</el-button >
                  </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <!--<el-button  icon="el-icon-edit-outline" circle title="查看票据"></el-button>-->
              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" v-access id="ggModify" @click="edit(scope.row)" title="编辑"></i>
              <i class="el-icon-delete" style="font-size: 20px;cursor: pointer" v-access id="ggDel"  @click="del (scope.row)" title="删除"></i>
         <!--     <i class="iconfont icon-tuihui" style="font-size: 20px;cursor: pointer" v-access id="ggBack"  @click="reback(scope.row)" title="撤回"></i>
              <i class="el-icon-setting" style="font-size: 20px;cursor: pointer" @click="showDept(scope.row)" title="查看部门"></i> -->
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
    <el-dialog :title="operation?'新增接口授权配置信息':'修改接口授权配置信息'"
               :visible.sync="babmDialog"
               width="30%"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal="true">
      <div>
        <el-form :model="dataForm" :rules="dataFormRules" ref="dataForm" label-position="right">
          <input type="hidden" v-model="dataForm.id"/>
              <!-- 文件夹选择 -->
              对外接口授权配置信息
             <template v-if="ok1">
            <el-form-item label="单位名称" style="margin-bottom: 0px" prop="unit_name" >
              <el-input v-model="dataForm.unit_name" prop="mini" @focus="choosedwmc"
                        style="width: 60%" size="mini"
                        suffix-icon="el-icon-folder-opened" id="kzread"></el-input>
            </el-form-item>
          <!--  手输文本框 -->
            </template>
         <el-form-item label="接口名称" style="margin-bottom: 0px" prop="api_name" >
           <el-input v-model="dataForm.api_name" prop="mini" @focus="choosejkmc"
                     style="width: 60%" size="mini"
                     suffix-icon="el-icon-folder-opened" id="kzread"></el-input>
         </el-form-item>
          <el-form-item label="请求阀值(天)" prop="limit_request">
            <el-input v-model="dataForm.limit_request" size="mini" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item label="并发阀值" prop="limit_concurrency_request">
            <el-input v-model="dataForm.limit_concurrency_request" size="mini" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="enable_flag" >
            <el-select v-model="dataForm.enable_flag" size="mini" style="width: 60%">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark" >
            <el-input type="textarea" v-model="dataForm.remark" size="mini" style="width: 60%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="submitForm()" size="mini">提交</el-button>
        <el-button @click="babmDialog = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择接口单位配置"
      :visible.sync="babmDialogdw"
      :append-to-body="true"
      :modal="true"
      width="40%">
      接口单位配置列表
      <el-form ref="form" :model="filters2" size="mini" :inline="true">
        <el-row class="form-line">
          <el-col :span="19" style="display: flex;">
            <el-form-item label="单位名称" prop="unit_name">
              <el-input v-model="filters2.unit_name"  size="mini" clearable
                        @keyup.enter.native="findDw" >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="text-align: right;">
            <el-form-item label="" class="id-button">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="findDw()">查询</el-button>
              <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset2()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <el-table ref="multipleTable" :data="tableDatadw" :header-cell-style="{background:'#e6e6e6'}"
                tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="view"
               >
        <el-table-column label="序号" width="50" align="center">

          <template slot-scope="scope">
            <span>{{(pageinfo2.pagenum - 1) * pageinfo2.pagesize + scope.$index + 1}}</span>
          </template>

        </el-table-column>
        <el-table-column prop="unit_code" label="单位编码" :show-overflow-tooltip="true" min-width="150px">
        </el-table-column>
        <el-table-column prop="unit_name" label="单位名称" :show-overflow-tooltip="true"></el-table-column>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
           <template slot-scope="scope">
             <!-- <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" v-access id="ggModify" @click="qddw(scope.row)" title="确定"></i> -->
             <el-button type="primary" @click="qddw(scope.row)" size="mini" >提交</el-button>
           </template>
         </el-table-column>
      </el-table>
     <div class="page">
        <div class="page-content">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="pageinfo2.pagenum"
            :page-sizes="[5,10,20,30,40,50]"
            :page-size="pageinfo2.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageinfo2.total">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="babmDialogdw = false" size="mini" >关闭</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="选择接口资源"
        :visible.sync="babmDialogjk"
        :append-to-body="true"
        :modal="true"
        width="40%">
        接口资源列表
        <el-form ref="form" :model="filters3" size="mini" :inline="true">
          <el-row class="form-line">
            <el-col :span="19" style="display: flex;">
              <el-form-item label="接口名称" prop="api_name">
                <el-input v-model="filters3.api_name"  size="mini" clearable
                          @keyup.enter.native="findjk" >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="text-align: right;">
              <el-form-item label="" class="id-button">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="findjk()">查询</el-button>
                <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset3()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <el-table ref="multipleTable" :data="tableDatajk" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="view">
          <el-table-column label="序号" width="50" align="center">

            <template slot-scope="scope">
              <span>{{(pageinfo3.pagenum - 1) * pageinfo3.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="api_name" label="接口名称" :show-overflow-tooltip="true" min-width="150px">
          </el-table-column>
          <el-table-column prop="request_url" label="请求路径" :show-overflow-tooltip="true"></el-table-column>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
             <template slot-scope="scope">
               <!-- <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" v-access id="ggModify" @click="qdjk(scope.row)" title="确定"></i> -->
                <el-button type="primary" @click="qdjk(scope.row)" size="mini" >提交</el-button>
             </template>
           </el-table-column>
        </el-table>
       <div class="page">
          <div class="page-content">
            <el-pagination
              @size-change="handleSizeChange3"
              @current-change="handleCurrentChange3"
              :current-page="pageinfo3.pagenum"
              :page-sizes="[5,10,20,30,40,50]"
              :page-size="pageinfo3.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageinfo3.total">
            </el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="babmDialogjk = false" size="mini" >关闭</el-button>
    </span>
      </el-dialog>
    <upload-file @passData="getData" :yssqid="this.ggid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
  </el-card>
</template>

<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import {translation} from '@/utils/translation'
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
  export default {
    name: 'ggmanage',
    components: {
      uploadFile
    },
    data() {
      return {
        ok1:true,
        ok2:false,
        ggid: '',
        isView:false,
        dialogUpLoad: false,
        getFileData: false,
        operation:true,
        title:'',
        isEdit:true,
        btnshow:true,
        content: '',
        api_id:'',
        unit_id:'',
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
        babmDialogdw:false,
        babmDialogjk:false,
        treeData: [],
        multipleSelection:[],//多选的数据
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
          unit_name: '',
          api_name: '',
          enable_flag: '',

        },
        filters2: {
          unit_name: '',
       //   api_name: '',
       //   enable_flag: '',

        },
        filters3: {
         // unit_name: '',
          api_name: '',
        //  enable_flag: '',

        },
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:5
        },
        pageinfo2: {
          pagenum: 1,
          total: 0,
          pagesize:5
        },
        pageinfo3: {
          pagenum: 1,
          total: 0,
          pagesize:5
        },
        //table
        tableData: [],
        tableDatadw: [],
        tableDatajk: [],
        dialogVisible: false,
        dataForm: {
          id: '',
          unit_name:'',
          api_name:'',
         enable_flag:'',
          viewdeptids:'',
          viewdeptnames:'',

        },
        dataFormRules: {
          unit_name: [
            {required: true, message: '这是必填字段'}
          ],
          api_name: [
            {required: true, message: '这是必填字段'}

          ],
          enable_flag: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          limit_request: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],

        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
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
      init() {
        if (sessionStorage.getItem('pjkjSession')) {
          this.filters = JSON.parse(sessionStorage.getItem('pjkjSession'))
        }
        this.findTable();
      },
      onEditorFocus(event){
        if(!this.isEdit){
          event.enable(false)
        }else{
          event.enable(true)
        }
      },
      choosedwmc() {
        this.findDw();
          this.babmDialogdw = true;
      },
      choosejkmc(){
        this.findjk();
        this.babmDialogjk = true;
      },
      dialogUpLoadClick () {
        if(this.isEdit){
          this.isView = false
        }else{
          this.isView = true
        }
        this.ggid = this.dataForm.id
        this.dialogUpLoad = true
        this.getFileData = true
      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
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
      getFsr(){
        var param={
          id:commonServie.getuuid()
        }
        this.$api.ggmanage.queryFsr(param).then((res) => {
          this.dataForm.fsbm = res.body.data.fsrdept
          this.dataForm.fsr = res.body.data.fsr_name
          this.dataForm.fbsj = res.body.data.fbsj
          // this.dataForm.fbsj = '2019-12-21'
        })
      },
      handleSizeChange(val) {
        this.pageinfo.pagesize = val
        this.findTable();
      },
      handleCurrentChange(val) {
        this.pageinfo.pagenum = val;
        this.findTable();
      },
      handleSizeChange2(val) {
        this.pageinfo2.pagesize = val
        this.findDw();
      },
      handleCurrentChange2(val) {
        this.pageinfo2.pagenum = val;
       this.findDw();
      },
      handleSizeChange3(val) {
        this.pageinfo3.pagesize = val
        this.findjk();
      },
      handleCurrentChange3(val) {
        this.pageinfo3.pagenum = val;
         this.findjk();
      },
      findTable() {

        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {};
        Object.assign(param, this.pageinfo, this.filters)

        this.$api.dwjksqpz.queryTable(param).then((res) => {

          this.pageinfo.total = Number(res.body.default.configscount);
          this.tableData = res.body.default.configs;
          this.tableData.forEach(function (c) {

            if(c.enable_flag=='0'){
              c.enable_flag='启用'
            }else{
               c.enable_flag='禁用'
            }
          })
        })
      },
      findDw(){

        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {};
        Object.assign(param, this.pageinfo2, this.filters2)

        this.$api.dwjksqpz.querydw(param).then((res) => {

          this.pageinfo2.total = Number(res.body.default.unitconfigscount);
          this.tableDatadw = res.body.default.unitconfigs;
        })
      },
      findjk(){
        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {};
        Object.assign(param, this.pageinfo3, this.filters3)

        this.$api.dwjksqpz.queryjk(param).then((res) => {
debugger
          this.pageinfo3.total = Number(res.body.default.apiscount);
          this.tableDatajk = res.body.default.apis;
        })
      },
      delAll(){
        debugger
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请先选择要删除的接口信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些接口信息？', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // debugger
          // const length = this.multipleSelection.length;
          // for (let i = 0; i < length; i++) {
          //   this.delarr.push(this.multipleSelection[i].id)
          // }
          debugger;
          // var params = {
          //   ids: this.multipleSelection.join(",")
          // };

          var params = {

            id : this.multipleSelection.map(obj => {
                     return obj.id
                   }).join(",")
          };


          this.$api.dwjksqpz.del(params).then((res) => {

            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      add() {
        // this.title="新增公告信息"
        // this.isEdit = true
        //重置表单数据
        if (this.$refs['dataForm'] !== undefined) {
          this.$refs['dataForm'].resetFields();
        }
        var obj ={
          id: '',
          unit_name:'',
           api_name:'',
          enable_flag:'',
          viewdeptids:'',
          viewdeptnames:'',

        }
        this.dataForm = obj;
        this.content = '';

        this.dataForm.id = commonServie.getuuid();
        this.babmDialog = true;
          debugger
        // this.findAjxxTable();
      },
      qddw(data){
        debugger
        this.dataForm.unit_name=data.unit_name;
        this.babmDialogdw=false;
         this.unit_id=data.id;
      },
      qdjk(data){
        debugger
        this.dataForm.api_name=data.api_name;
        this.babmDialogjk=false;
         this.api_id=data.id;
      },
      submitForm(){
        let that = this
        this.$refs.dataForm.validate((valid) => {
          debugger;
          if (valid) {
            var  param ={
              api_id:this.api_id,
              unit_id:this.unit_id,
            }
            let params = Object.assign(param, this.dataForm)

            this.$api.dwjksqpz.saveOrupdate(params).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                this.babmDialog = false;
                this.$refs['dataForm'].resetFields();
              } else {
                this.$message({message: res.message, type: 'error'})
              }
              this.findTable();
            })
          }
          this.value = []
        })
      },
     selectData(arr) {

       this.multipleSelection = arr;
     },
      reset() {
        var obj ={
          unit_name: '',
          api_name: '',
          enable_flag: '',
          // beg_time: '',
          // end_time: '',
        }
        this.filters = obj;
      },
      reset2() {
        var obj ={
          unit_name: '',
          // api_name: '',
          // enable_flag: '',
          // beg_time: '',
          // end_time: '',
        }
        this.filters2 = obj;
      },
      reset3() {
        var obj ={
          // unit_name: '',
          api_name: '',
          // enable_flag: '',
          // beg_time: '',
          // end_time: '',
        }
        this.filters3 = obj;
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      edit(row){
        this.babmDialog = true;
        this.operation = false;
        // this.title="修改接口授权配置信息"
        // this.isEdit = true
        var params = {
          id: row.id
        }
        this.$api.dwjksqpz.getGg(params).then((res) => {
          this.$nextTick(() => {
            debugger;
            this.dataForm = res.data.body.default;
          })
        })
      },
      del(row){
        this.$confirm('确定要删除当前的记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            id: row.id
          }

          this.$api.dwjksqpz.del(param).then((res) => {
            if (res.success == "true") {
              this.findTable()
              this.$message({message: res.message, type: 'success'})
            }else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      showDept(row){
        let that = this
        let param = {
          gg_id: row.id
        }
        this.btnshow = false
        that.$api.ggmanage.deptTree(param).then((res) => {
          if (res.success == "true") {
            that.treeData = res.data
            that.babmDialog = true;
            that.$api.ggmanage.getDeptIds(param).then((res)=>{
              let ids = res.data.body.default.deptids
              that.$refs['tree1'].setCheckedKeys(ids.split(","));
            })
          } else {
            that.$message({message: res.message, type: 'error'})
          }
        })
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree1.filter(val);
      }
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('pjkjSession')
      sessionStorage.setItem('pjkjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>
