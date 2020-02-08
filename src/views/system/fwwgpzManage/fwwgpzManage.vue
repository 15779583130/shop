<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
  @import '../../page-main';

  /deep/ .el-input--mini .el-input__inner {
    width: 100%
  }
</style>
<style src="jsoneditor/dist/jsoneditor.min.css"></style>
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            Gateway路由配置

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

                    <el-form-item label="路由配置ID" prop="route_id">
                      <el-input v-model="filters.route_id" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="URI" prop="uri">
                      <el-input v-model="filters.uri" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
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
        <el-button type="primary" icon="el-icon-plus" v-access id="ggAdd" size="mini" @click="add(1)">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" v-access id="ggdel" @click="delAll()" size="mini">批量删除
        </el-button>
        <el-button type="primary" icon="el-icon-plus" v-access id="ggshuaxin" size="mini" @click="shuaxin()">刷新路由
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini" @cell-dblclick="view"
                  @selection-change="selectData">
          <el-table-column label="序号" width="100" align="center">
            <el-table-column type="selection"></el-table-column>
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="route_id" label="路由器配置ID" :show-overflow-tooltip="true" min-width="150px">
          </el-table-column>
          <el-table-column prop="predicates" label="断言" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="filters" label="过滤器" :show-overflow-tooltip="true" :formatter="dateFormat"
                           min-width="130px"></el-table-column>
          <el-table-column prop="uri" label="URI路径" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="filter_order" label="排序" :show-overflow-tooltip="true"></el-table-column>

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
               @close='closeDialog'
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :append-to-body="true"
               :modal="true"
    >
      <div id="editor_holder" style="height: 400px;"></div>
      <el-button type="primary" @click="submitForm(tjjj)" size="mini">提交</el-button>
      <!--<el-button type="primary" @click="submitForm(2)" size="mini">修改</el-button>-->
      <el-button @click="babmDialog = false" size="mini">关闭</el-button>
      <!-- <span slot="footer" class="dialog-footer" style="margin-top: 10px">
         <el-button type="primary" @click="submitForm()" size="mini">提交</el-button>
         <el-button @click="babmDialog = false" size="mini">关闭</el-button>
       </span> -->
    </el-dialog>


    <upload-file @passData="getData" :yssqid="this.ggid" :getFileData="this.getFileData" :display="this.dialogUpLoad"
                 :isView="this.isView"></upload-file>
  </div>
</template>

<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat, timeCompare} from '@/utils/datetime'
  import {translation} from '@/utils/translation'
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";

  import JSONEditor from "jsoneditor";

  export default {
    name: 'ggmanage',
    components: {
      uploadFile
    },
    data() {
      return {
        tjjj:true,
        editor: '',
        ok1: true,
        ok2: false,
        ggid: '',
        isView: false,
        dialogUpLoad: false,
        getFileData: false,
        operation: true,
        title: '',
        isEdit: true,
        btnshow: true,
        content: '',
        api_id: '',
        unit_id: '',
        editorOption: { // 定义富文本编辑器显示
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗、倾斜、下划线、删除线

              [{'header': 1}, {'header': 2}], // 标题一、标题二
              [{'list': 'ordered'}, {'list': 'bullet'}], // 列表

              [{'color': []}, {'background': []}], // 字体颜色、背景颜色
            ]
          }
        },
        filterText: '',
        babmDialog: false,
        babmDialogdw: false,
        babmDialogjk: false,
        treeData: [],
        multipleSelection: [],//多选的数据
        treeProps: {
          children: 'children',
          label: 'name'
        },
        json : {
          "route_id": "",
          "uri": "",
          "predicates": [],
          "filters": [],
          "order": ""
        },
        picNum: '',
        isEditGs: 'true',
        ylobj: {},
        yllist: [
          {wzbm: '1', wzmc: '无', dw: '个', ggxh: '无', sl: '0'},
          {wzbm: '2', wzmc: '无', dw: '个', ggxh: '无', sl: '0'},
          {wzbm: '3', wzmc: '无', dw: '个', ggxh: '无', sl: '0'},
          {wzbm: '4', wzmc: '无', dw: '个', ggxh: '无', sl: '0'}
        ],
        //搜索条件
        filters: {
          route_id: '',
          uri: '',
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
          pagesize: 5
        },
        pageinfo2: {
          pagenum: 1,
          total: 0,
          pagesize: 5
        },
        pageinfo3: {
          pagenum: 1,
          total: 0,
          pagesize: 5
        },
        //table
        tableData: [],
        tableDatadw: [],
        tableDatajk: [],
        dialogVisible: false,
        dataForm: {
          id: '',
          unit_name: '',
          api_name: '',
          enable_flag: '',
          viewdeptids: '',
          viewdeptnames: '',

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
        escapeMap: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': '&quot;',
          "'": '&#39;'
        },
        unescapeMap: {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          '&quot;': '"',
          "&#39;": "'"
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
      view(row) {

        var params = {
          id: row.id
        }
        //  this.value = row.parent_id
        // this.value = row.pid

        this.$api.fwwgpzManage.getGg(params).then((res) => {
          this.$nextTick(() => {
            this.json.id = res.data.body.default.id;
            this.json.route_id = res.data.body.default.route_id;
            this.json.predicates = res.data.body.default.predicates;
            this.json.filters = res.data.body.default.filters;
            this.json.uri = res.data.body.default.uri;
            this.json.order = res.data.body.default.filter_order;
//            this.json.commonArgs = res.data.body.default.commonArgs;
            this.add(2);
          })
        })
      },
      init() {
        if (sessionStorage.getItem('pjkjSession')) {
          this.filters = JSON.parse(sessionStorage.getItem('pjkjSession'))
        }
        this.findTable();
      },
      onEditorFocus(event) {
        if (!this.isEdit) {
          event.enable(false)
        } else {
          event.enable(true)
        }
      },
      choosedwmc() {
        this.findDw();
        this.babmDialogdw = true;
      },
      choosejkmc() {
        this.findjk();
        this.babmDialogjk = true;
      },
      dialogUpLoadClick() {
        if (this.isEdit) {
          this.isView = false
        } else {
          this.isView = true
        }
        this.ggid = this.dataForm.id
        this.dialogUpLoad = true
        this.getFileData = true
      },
      getData(val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },
      escapeHTML(string) {
        var that = this;
        return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
          return that.escapeMap[s] || s;
        });
      },
      unescapeHTML: function (a) {
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
      getFsr() {
        var param = {
          id: commonServie.getuuid()
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
        this.$api.fwwgpzManage.queryTable(param).then((res) => {

          this.pageinfo.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;

        })
      },
      findDw() {
//        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
//        if (!timeComp.status) {
//          this.$message(timeComp.msg)
//          return false
//        }
//        var param = {};
//        Object.assign(param, this.pageinfo2, this.filters2)
//        this.$api.dwjksqpz.querydw(param).then((res) => {
//          this.pageinfo2.total = Number(res.body.default.unitconfigscount);
//          this.tableDatadw = res.body.default.unitconfigs;
//        })
      },
      findjk() {
//        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
//        if (!timeComp.status) {
//          this.$message(timeComp.msg)
//          return false
//        }
//        var param = {};
//        Object.assign(param, this.pageinfo3, this.filters3)
//        this.$api.dwjksqpz.queryjk(param).then((res) => {
//          this.pageinfo3.total = Number(res.body.default.apiscount);
//          this.tableDatajk = res.body.default.apis;
//        })
      },
      delAll() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请先选择要删除的路由信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些路由信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          var params = {
            ids: this.multipleSelection.map(obj => {
              return obj.id
            }).join(",")
          };
          this.$api.fwwgpzManage.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      shuaxin() {
        //let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
//        if (!timeComp.status) {
//          this.$message(timeComp.msg)
//          return false
//        }
        var param = {};
        //Object.assign(param, this.pageinfo, this.filters)
        debugger
        this.$api.fwwgpzManage.shuaxin(param).then((res) => {
          debugger
          if (res.success == "true") {
            this.$message({message: res.message, type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
//          this.pageinfo.total = Number(res.body.default.count);
//          this.tableData = res.body.default.dataset;

        })

      },
      add(pd) {
        debugger
        if(pd=='1'){
          this.tjjj=true;
        }else {
          this.tjjj=false;
        }
        this.babmDialog = true;
        this.$nextTick(()=>{
          this.test(pd)
        })
      },
      test(pd) {
        var schema = {
          "title": "路由配置",
          "type": "object",
          "properties": {
            "route_id": {
              "description": "为该配置指定id.",
              "type": "string"
            },
            "uri": {
              "description": "指定gateway转发的地址",
              "type": "string"
            },
            "order": {
              "type": "string"
            },
            "predicates": {
              "type": "array",
              "items": {
                "$ref": "predicate"
              }
            },
            "filters": {
              "type": "array",
              "items": {
                "$ref": "filter"
              }
            }/*,
      			"default-filters":{

      			}*/
          },
          "required": ["route_id", "uri", "order"]
        };

        var predicate = {
          "title": "参数定义",
          "type": "object",
          "required": ["name", "args"],
          "properties": {
            "name": {
              "description": "规则名如Path",
              "enum": ["After", "Before", "Between", "Cookie", "Header", "Host", "Method", "Path", "Query", "RemoteAddr"]
            },
            "args": {
              "title": "规则定义",
              "type": "object",
              "required": [],
              "properties": {}
            }
          }
        };

        var filter = {
          "title": "参数定义",
          "type": "object",
          "required": ["name", "args"],
          "properties": {
            "name": {
              "description": "规则名如Path",
              "enum": ["AddRequestHeader", "AddRequestParameter", "AddResponseHeader", "Hystrix", "PrefixPath"
                , "PreserveHostHeader", "RequestRateLimiter", "RedirectTo", "RemoveRequestHeader", "RemoveResponseHeader"
                , "RewritePath", "RewriteResponseHeader", "SaveSession", "SetPath", "SetResponseHeader", "SetStatus"
                , "StripPrefix", "Retry", "RequestSize"
              ]
            },
            "args": {
              "title": "规则定义",
              "type": "object",
              "required": [],
              "properties": {}
            }
          }
        };


        var options = {
          schema: schema,
          /*ajv: Ajv({ allErrors: false, verbose: true }),*/
          mode: 'tree',
          modes: ['code', 'text', 'tree'],
          schemaRefs: {"predicate": predicate, 'filter': filter},
          templates: [
            {
              text: 'predicate',
              title: 'Insert a predicate Node',
              className: 'jsoneditor-type-object',
              field: 'PredicateTemplate',
              value: {
                'name': '',
                'args': {'': ''}
              }
            },
            {
              text: 'filter',
              title: 'Insert a filter Node',
              className: 'jsoneditor-type-object',
              field: 'PredicateTemplate',
              value: {
                'name': '',
                'args': {}
              }
            }
          ]
        };

//        let json = {
//          "route_id": "",
//          "uri": "",
//          "predicates": [],
//          "filters": [],
//          "order": ""
//        };
        debugger
        let json = {
          "route_id": "",
          "uri": "",
          "predicates": [],
          "filters": [],
          "order": ""
        };
        if (pd =='2'){
          debugger;
          json.uri = this.json.uri;
          json.route_id = this.json.route_id;
          json.order = this.json.order;
          let s=this.unescapeHTML(JSON.stringify(this.json.predicates)).replace(/^(\s|")+|(\s|")+$/g, '')
          //  json.predicates = eval(this.unescapeHTML(JSON.stringify(this.json.predicates)));
          json.predicates = JSON.parse(s);
          json.filters = eval(this.unescapeHTML(JSON.stringify(this.json.filters)));

        }


//        if (json.route_id!=""){
//
//        }
        console.log(window.document.getElementById('editor_holder'))
        let element = window.document.getElementById('editor_holder')
        element.innerHTML = ''
        //let config = {mode:'text',indentation:2,search:true}
        //config['schema'] = schema
        //console.log(config)
        this.editor = new JSONEditor(element, options, json)

        console.log(this.editor)
      },
      qddw(data) {

      },
      qdjk(data) {

      },
      submitForm(xg) {

        let json = this.editor.get();
        let err = this.editor.validateSchema.errors;
//        if (err !== null && err.length > 0) {
//          console.log("invalid");
//          layer.open({
//            title: '提示',
//            content: err[0].dataPath + ' ' + err[0].keyword + ' ' + err[0].message
//          });
//          return;
//        }
        debugger
        var param = {
          id: "",
          json: this.escapeHTML(JSON.stringify(json))
        }
        if (xg==false){
          param = {
            id: this.json.id,
            json: this.escapeHTML(JSON.stringify(json))
          }
        }

        this.$api.fwwgpzManage.saveOrupdate(param).then((res) => {
          debugger
          if (res.success == "true") {
            this.$message({message: res.message, type: 'success'})
            this.babmDialog = false;
            // this.$refs['dataForm'].resetFields();
          } else {
            this.$message({message: res.message, type: 'error'})
          }
          this.findTable();
        })

        // let that = this
//        this.$refs.dataForm.validate((valid) => {
//          debugger;
//          if (valid) {
//            var param = {
//              api_id: this.api_id,
//              unit_id: this.unit_id,
//            }
//            let params = Object.assign(param, this.dataForm)
//
//
//          }
//          this.value = []
//        })
      },
      closeDialog() {
      },
      selectData(arr) {

        this.multipleSelection = arr;
      },
      reset() {
        var obj = {
          unit_name: '',
          api_name: '',
          enable_flag: '',
          // beg_time: '',
          // end_time: '',
        }
        this.filters = obj;
      },
      reset2() {
//        var obj = {
//          unit_name: '',
//        }
//        this.filters2 = obj;
      },
      reset3() {
//        var obj = {
//          api_name: '',
//        }
//        this.filters3 = obj;
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      edit(row) {
//        this.babmDialog = true;
//        this.operation = false;
//        // this.title="修改接口授权配置信息"
//        // this.isEdit = true
//        var params = {
//          id: row.id
//        }
//        this.$api.dwjksqpz.getGg(params).then((res) => {
//          this.$nextTick(() => {
//            debugger;
//            this.dataForm = res.data.body.default;
//          })
//        })
      },
      del(row) {
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
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      showDept(row) {
//        let that = this
//        let param = {
//          gg_id: row.id
//        }
//        this.btnshow = false
//        that.$api.ggmanage.deptTree(param).then((res) => {
//          if (res.success == "true") {
//            that.treeData = res.data
//            that.babmDialog = true;
//            that.$api.ggmanage.getDeptIds(param).then((res) => {
//              let ids = res.data.body.default.deptids
//              that.$refs['tree1'].setCheckedKeys(ids.split(","));
//            })
//          } else {
//            that.$message({message: res.message, type: 'error'})
//          }
//        })
//      }
      },
      mounted() {
        //debugger
        // let schema = {
        //   "title": "Person",
        //   "type": "object",
        //   "properties": {
        //     "name": {
        //       "type": "string",
        //       "description": "First and Last name",
        //       "minLength": 4,
        //       "default": "Jeremy Dorn"
        //     },
        //     "age": {
        //       "type": "integer",
        //       "default": 25,
        //       "minimum": 18,
        //       "maximum": 99
        //     },
        //     "favorite_color": {
        //       "type": "string",
        //       "format": "color",
        //       "title": "favorite color",
        //       "default": "#ffa500"
        //     }
        //   }
        // }

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
    }}

</script>
