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
           基本信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :model="unitconfigmxs" size="mini" :inline="true" :rules="dataFormRules" >
                <el-row class="form-line">
                  <el-col :span="24">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="单位名称" prop="unit_name" >
                      <el-input v-model="unitconfigmxs.unit_name"  size="mini" placeholder="请输入单位名称" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="单位编码" prop="unit_code" >
                      <el-input v-model="unitconfigmxs.unit_code"  size="mini"  placeholder="请输入单位编码" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="授权方式" prop="auth_type" >
                      <el-select v-model="unitconfigmxs.auth_type" >
                        <el-option
                          v-for="item in dwOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="unit_code">
                      <el-input v-model="unitconfigmxs.remark"  size="mini" placeholder="请输入单位编码" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="warning" icon="el-icon-search" size="mini" @click="save()">保存</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="close()">关闭</el-button>
                    </el-form-item>
                  </el-col>
                  </el-col>
                </el-row>
                <el-row class="form-line" >

                  <el-col :span="24" style="display: flex;" >
                    <el-col :span="8">
                    <el-form-item label="AppKey" prop="appkey" style="margin-top: 10px;">
                      <el-input v-model="unitconfigmxs.appkey"  size="mini"  style="width:300px" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    </el-col>
                      <el-col :span="8">
                    <el-form-item label="AppId" prop="appid" style="margin-top: 10px;">
                      <el-input v-model="unitconfigmxs.appid"  size="mini" style="width:300px" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                      </el-col>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" v-access id="ggAdd" size="mini" @click="add()">新增</el-button>

      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="view">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="detail_address" label="单位部门地址" :show-overflow-tooltip="true" min-width="130px">
          </el-table-column>
          <el-table-column prop="hardware_address" label="IP/MAC地址" :show-overflow-tooltip="true" min-width="130px"></el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"  min-width="130px"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" v-access id="ggModify" @click="edit(scope.row)" title="编辑"></i>
              <i class="el-icon-delete" style="font-size: 20px;cursor: pointer" v-access id="ggDel"  @click="del (scope.row)" title="删除"></i>
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
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%"
               :close-on-click-modal="false"
               :close-on-press-escape="false" :modal="false" style="padding: 0 5px">
      <el-form :model="dataForm" status-icon :rules="dataFormRules" ref="dataForm" label-width="130px"
               class="demo-dataForm" size="mini">
        <el-row>
          <el-col :span="18">
            <el-form-item label="单位部门地址" prop="detail_address" style="width: 100%">
              <el-input v-model="dataForm.detail_address" placeholder="请输入单位部门地址" ></el-input>
            </el-form-item>
            <el-form-item label="IP/MAC地址" prop="hardware_address" style="width: 100%">
              <el-input v-model="dataForm.hardware_address" placeholder="请输入IP/MAC地址" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" style="width: 100%">
              <el-input v-model="dataForm.remark" placeholder="请输入备注" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer" >

            <el-button type="warning" @click="saveOrupdate()" size="mini" >提交</el-button>

            <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
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
        ggid: '',
        isView:false,
        dialogUpLoad: false,
        getFileData: false,
        title:'',
        isEdit:true,
        btnshow:true,
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
        dwOptions:[
          {value: 'token ', label: 'token '},
          {value: 'ip', label: 'ip'},
          {value: 'mac', label: 'mac'},
        ],
        //搜索条件
        unitconfigmxs: {
          id: '',
          unit_name: '',
          unit_code: '',
          appkey: '',
          appid: '',
          auth_type: '',
          remark: '',
        },
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
        dataForm: {
          id: '',
          hardware_address:'',
          detail_address:'',
          remark:'',
          unit_id:'',
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        dataFormRules: {
          unit_name: [
            {required: true, message: '这是必填字段',trigger: 'blur'}
          ],
          unit_code: [
            {required: true, message: '这是必填字段',trigger: 'blur'},
          ],
          appkey: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          appid: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          auth_type: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          detail_address: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          hardware_address: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
        },
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
        if (sessionStorage.getItem('dsfjkpz')) {
          this.unitconfigmxs = JSON.parse(sessionStorage.getItem('dsfjkpz'))
        }
        this.guid();
        this.findTable();
      },
      colorjy(type) {
        if (type == 'token' ) {
          return 'primary';
        }else if(type == 'ip'){
          return 'danger';
        }else {
          return 'info';
        }
      },
      onEditorFocus(event){
        if(!this.isEdit){
          event.enable(false)
        }else{
          event.enable(true)
        }
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
      saveOrupdate(){
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if (this.dataForm.id) {
              this.$api.dsfjkpz.updateMx(this.dataForm).then((res) => {
                if (res.success == 'true') {
                  this.$message({message: res.message, type: 'success'})
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            } else {
              this.$api.dsfjkpz.saveMx(this.dataForm).then((res) => {
                if (res.success == 'true') {
                  this.$message({message: res.message, type: 'success'})
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      save() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.unitconfigmxs.id) {
              this.$api.dsfjkpz.save(this.unitconfigmxs).then((res) => {
                if (res.success == 'true') {
                  this.$message({message: res.message, type: 'success'})
                  this.unitconfigmxs.id = res.data.body.default.id;
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            } else {
              this.$api.dsfjkpz.update(this.unitconfigmxs).then((res) => {
                if (res.success == 'true') {
                  this.$message({message: res.message, type: 'success'})
                  this.unitconfigmxs.id = res.data.body.default.id;
                  this.findTable()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
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
      findTable() {
        var param = {
          unitconfig_id: this.unitconfigmxs.id ,
        };
        this.$api.dsfjkpz.queryMx(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.unitconfigmxscount);
          this.tableData = res.body.default.unitconfigmxs;
        })
      },
      add() {
        if(!this.unitconfigmxs.id){
          this.$message({message: "请新增流程配置", type: 'error'})
        }else{
          this.title = "新增授权方式";
          this.dataForm = {};
          this.dataForm.unit_id = this.unitconfigmxs.id;
          this.dialogVisible = true;
        }
      },
      reset() {
        var obj ={
          unit_name: '',
          unit_code: '',
          appkey: '',
          appid: '',
          auth_type: '',
        }
        this.filters = obj;
      },
      close() {
        this.$util.goBack(this);
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
        this.$api.ggmanage.getGg(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.data.body.default;
            this.dataForm.fbsj = timeFormat(this.dataForm.fbsj)
            this.dataForm.fsbm = res.data.body.data.fsrdept
            this.dataForm.fsr = res.data.body.data.fsr_name;
            this.dataForm.viewdeptnames = res.data.body.default.deptname;
            this.dataForm.viewdeptids = res.data.body.default.deptids;
            this.content = this.unescapeHTML(this.dataForm.ggnr);
            this.dialogVisible = true
          })
        })
      },
      edit(row){
        this.title="编辑授权信息"
        var params = {
          id: row.id
        }
        this.$api.dsfjkpz.getMx(params).then((res) => {
          this.$nextTick(() => {
            this.dataForm = res.body.default;
            this.dialogVisible = true
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
          this.$api.dsfjkpz.delMx(param).then((res) => {
            if (res.success == "true") {
                  this.findTable()
                  this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      getGGqx(id){
        let param ={
          id:id
        }
        this.$api.ggmanage.getGgqx(param).then((res) => {
          if (res.success == "true") {


          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
      guid() {         //获取appkey\appid
        if(!this.unitconfigmxs.appid){
          this.unitconfigmxs.appid = this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4();
        }
        if(!this.unitconfigmxs.appkey){
          this.unitconfigmxs.appkey = this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4();
        }
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
