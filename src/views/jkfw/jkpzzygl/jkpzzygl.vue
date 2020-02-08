<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
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
            接口配置资源管理
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

                    <el-form-item label="请求路径">
                      <el-input v-model="filters.request_url"  size="mini" placeholder="请输入请求路径"  clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>


                    <el-form-item label="接口名称">
                      <el-input v-model="filters.api_name"  size="mini" placeholder="请输入接口名称"  clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>


                      <el-form-item label="是否启用">
                        <el-select v-model="filters.enable_flag" placeholder="请选择">
                          <el-option
                            v-for="item in dwOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
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
        <h5>接口资源配置信息列表</h5>
      </div>
        </div>
        </el-col>
        <el-col :span="16">
          <el-button type="success" style="float:right;margin-right: 15px" icon="el-icon-plus" v-access id="yjclpzAdd" size="mini" @click="addClpz()">新增</el-button>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"
                  @selection-change="handleSelectionChange">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="请求路径" min-width="120px">
            <template slot-scope="scope">{{ scope.row.request_url }}</template>
          </el-table-column>
          <el-table-column prop="api_name" label="接口名称" :show-overflow-tooltip="true" min-width="80px"></el-table-column>
          <el-table-column prop="limit_time" label="超时阈值" :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column prop="enable_flag" label="是否启用" :show-overflow-tooltip="true" width="70px">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.enable_flag === '否' ? 'danger' : 'success'" size="mini" title="请点击进行状态控制" >{{scope.row.enable_flag}}</el-button >
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="100px">
            <template slot-scope="scope">
              <i @click="editGsck(scope.row)" class="el-icon-edit-outline" style="font-size: 20px;cursor: pointer"
                 title="编辑" v-access id="yhglEdit"></i>
              <i @click="handleDelete(scope.row)" class="el-icon-delete" style="font-size: 20px; margin-left: 12px;cursor: pointer"
                 title="删除" v-access id="yhglDel"></i>
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
      :title="dialogtitle"
      :visible.sync="editDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :modal="true"
      width="50%"
      style="">
      <el-form :model="pzinfo"  label-width="180px" :rules="pzinfoRules" size="mini" label-position="right" style="height: 300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="请求路径" prop="request_url">
              <el-input v-model="pzinfo.request_url" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接口名称" prop="api_name">
              <el-input v-model="pzinfo.api_name" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="超时阀值（毫秒）" prop="limit_time">
              <el-input v-model="pzinfo.limit_time" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否可用" prop="enable_flag">
              <el-select v-model="pzinfo.enable_flag" placeholder="请选择">
                <el-option
                  v-for="item in dwOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="limit_time">
              <!-- <el-input v-model="pzxxForm.qxts" size="mini" placeholder="请输入期限天数" :readonly="readonly" clearable ></el-input> -->
              <el-input v-model="pzinfo.limit_time" size="mini"  :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>


        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
               <el-button type="primary" size="mini"  v-show="isView"  @click="saveClpz">保存</el-button>
               <el-button type="primary" size="mini"  v-show="isViewII"  @click="update">修改</el-button>
                <el-button @click="closedialog" size="mini">关闭</el-button>

              </span>
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
        disTzDaoChu: true,
        filters: {
          request_url: '',
          api_name: '',
          enable_flag: '',
        },
        pzinfo: {
          id: '',
          request_url: '',
          api_name: '',
          enable_flag: '',
          limit_time: '',
          remark: '',
        },
        dwOptions:[
          {value: '1', label: '是'},
          {value: '0', label: '否'},
        ],
        pzinfoRules: {
          request_url: [{
              required: true,
              trigger: 'blur',
              message: '请输入请求路径',
              max: 20
            }],
          api_name: [{
              required: true,
              trigger: 'blur',
              message: '请输入接口名称',
              max: 20
            }],
          enable_flag: [{
              required: true,
              trigger: 'blur',
              message: '请选择启用类型',
              max: 20
            }]
        },
        editDialog:false,
        dialogtitle: '接口资源信息',
        readonly : false,
        isView: false,
        isViewII: false,
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        checkAll: false,
        checkedBox: [],
        isIndeterminate: true,
        tableData: [],
        multipleSelection: []
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
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.jkfw.del(params).then((res) => {
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
        var parms = {};
        Object.assign(parms, param, this.filters)
        this.$api.jkfw.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.apiscount);
          this.tableData = res.body.default.apis;
          this.tableData.forEach(function (c) {
            if(c.enable_flag=='1'){
              c.enable_flag='是'
            }else{
              c.enable_flag='否'
            }
          })
        })
      },
      dctzLoad () {

        var parms = {};
        Object.assign(parms, this.filters)
        this.$api.entryRegistrationAcount.exportRkdjtz(parms).then((res) => {
          if (res.success == "true") {
            debugger

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
      reset() {
        this.filters.request_url = '';
        this.filters.api_name = '';
        this.filters.enable_flag = '';
      },
      addClpz(){
        this.isView = true,
        this.editDialog = true,
        this.readonly = false
      },
      saveClpz(){
        let params = Object.assign({}, this.pzinfo)
        this.$api.jkfw.save(params).then((res) => {
          if (res.success == 'true') {
            this.$message({message: res.message, type: 'success'})
            this.editDialog = false
            this.findTable()

          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      editGsck(row){
        this.readonly = false
        this.isViewII = true;
        var params = {id:row.id}
        this.pzinfo.id = row.id

        this.$api.jkfw.get(params).then((res) => {
            this.pzinfo = res.body.default;
            this.editDialog = true;
        })
      },
      closedialog(){
        this.isView= false;
        this.isViewII = false;
          this.editDialog = false
      },
      update(){
        this.$api.jkfw.update(this.pzinfo).then((res) => {
          if (res.success == "true") {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.isViewII = false;
            this.editDialog = false;
            this.findTable();
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('rukudjtzSession')
          sessionStorage.setItem('rukudjtzSession', JSON.stringify(this.filters))
          next()
      }
  }
</script>
