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
            预警策略配置
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
          <!--  <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span> -->
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="策略名称">
                      <el-input v-model="formInline.clmc" placeholder="请输入策略名称" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="策略类型">
                      <el-select v-model="formInline.cllx" placeholder="请选择" >
                        <el-option
                          v-for="item in cllxOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="归属单位">
                      <el-select v-model="formInline.dw" placeholder="请选择">
                        <el-option
                          v-for="item in dwOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
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
        <el-button type="primary" icon="el-icon-plus" v-access id="yjclpzAdd" size="mini" @click="addClpz()">新增</el-button>
       <!-- <el-button type="success" icon="el-icon-download" size="mini">导出申请</el-button> -->
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
          <el-table-column prop="clmc" label="策略名称"  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="cllx" label="策略类型" width="120px" :show-overflow-tooltip="true" :formatter="formatCllx"></el-table-column>
          <el-table-column prop="qxts" label="期限天数" width="120px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="dw" label="归属单位" width="120px" :show-overflow-tooltip="true" :formatter="formatDw"></el-table-column>
          <el-table-column prop="yjnr" label="预警内容"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sfqy" label="状态" width="100px"
                           :show-overflow-tooltip="true" >
                           <template slot-scope="scope">
                                   <el-button
                                     :type="scope.row.sfqy === '禁用' ? 'danger' : 'success'" size="mini" title="请点击进行状态控制" @click="changeSfqy(scope.row)"
                                      >{{scope.row.sfqy}}</el-button >
                                 </template>
           </el-table-column>
          <el-table-column
          label="操作" width="120px" fixed="right" align="center">
            <template slot-scope="scope">
              <i  class="el-icon-edit" style="font-size: 20px;" title="编辑" v-access id="yjclpzModify"
                 @click="editClick(scope.row)"></i>
              <i  class="el-icon-view"
                 style="font-size: 20px;" @click="viewClick(scope.row)" title="查看"></i>
              <i  class="el-icon-delete" style="font-size: 20px;" v-access id="yjclpzDel"
                 @click="delYjcl(scope.row)" title="删除"></i>
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
      :title="dialogTitle"
      :visible.sync="editDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      :modal="true"
      width="50%"
      style="">
      <el-form :model="pzxxForm" ref="pzxxForm" label-width="180px" :rules="pzxxRules" size="mini" label-position="right" style="height: 300px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="策略名称" prop="clmc">
              <el-input v-model="pzxxForm.clmc" size="mini" placeholder="请输入策略名称" :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="策略类型" prop="cllx">
              <el-select v-model="pzxxForm.cllx" placeholder="请选择" :disabled="readonly" size="mini">
                <el-option
                  v-for="item in cllxOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="期限天数" prop="qxts">
              <!-- <el-input v-model="pzxxForm.qxts" size="mini" placeholder="请输入期限天数" :readonly="readonly" clearable ></el-input> -->
              <el-input-number v-model="pzxxForm.qxts"  :min="1" size="mini" :readonly="readonly"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="归属单位" prop="dw">
              <el-select v-model="pzxxForm.dw" placeholder="请选择" :disabled="readonly" size="mini">
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
            <el-form-item label="预警内容" prop="yjnr">
              <el-input v-model="pzxxForm.yjnr" type="textarea" :rows="2" size="mini" placeholder="请输入预警内容" :readonly="readonly" clearable ></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
               <el-button type="primary" size="mini"  v-show="isView" @click="saveClpz">保存</el-button>
                <el-button @click="editDialog = false" size="mini">关闭</el-button>

              </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import commonServie from '@/framework/CommonService'

  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          clmc:'',
          cllx:'',
          dw:''
        },
        dialogVisible: false,
        cllxOptions:[
          {value: '1', label: '入库'},
          {value: '2', label: '调用'},
          {value: '3', label: '处置'},
          {value: '4', label: '移库'}
        ],
        dwOptions:[
          {value: '1', label: '公安局'},
          {value: '2', label: '法院'},
          {value: '3', label: '检察院'}

        ],
        leftList: [],
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
        more: false,
        dialogTitle:'新增配置',
        editDialog:false,
        pzxxForm:{
          clmc:'',
          cllx:'',
          qxts:'',
          dw:'',
          yjnr:'',
          id:''
        },
        pzxxRules:{
                clmc: [{required: true, message: '这是必填字段', trigger: 'blur'},
                {min: 0, max: 50, message: '最多可输入50个字符'}],
                cllx:[{required: true, message: '这是必填字段', trigger: 'blur'}],
                qxts:[{required: true, message: '这是必填字段', trigger: 'blur'}],
                dw:[{required: true, message: '这是必填字段', trigger: 'blur'}],
                yjnr:[{required: true, message: '这是必填字段', trigger: 'blur'},
                {min: 0, max: 500, message: '最多可输入500个字符'}]
        },
        readonly:false,
        isView:true

      }
    },
    created() {
      if (sessionStorage.getItem('yjclpzSession')) {
        this.formInline = JSON.parse(sessionStorage.getItem('yjclpzSession'))
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
      viewClick(row) {
       this.readonly = true
       this.isView = false

        var params = {id:row.id}
        this.pzxxForm.id = row.id

        this.$api.yjclpz.getInfo(params).then((res) => {
          this.$nextTick(() => {
            this.pzxxForm = res.body.default;
            this.editDialog = true;
            this.dialogTitle = '查看预警策略配置'
            this.getAnJianPic()
          })
        })
      },
      saveClpz(){
        this.$refs.pzxxForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.pzxxForm)
            this.$api.yjclpz.saveOrupdate(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.editDialog = false
                this.findTable()

              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
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

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize

        };

         var parms = {};

         Object.assign(parms, param, this.formInline)

        this.$api.yjclpz.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;

          this.tableData.forEach(function (c) {
            if(c.sfqy=='1'){
              c.sfqy='启用'
            }else{
               c.sfqy='禁用'
            }
          })
        })
      },
      ajHandleSizeChange(val) {
        this.ajPageSize = val;
        this.findAjxxTable();
      },
      ajHandleCurrentChange(val) {
        this.ajCurrentPage = val;
        this.findAjxxTable();
      },
      addClpz() {
        this.readonly = false
        this.editDialog = true
        this.isView = true
        this.pzxxForm ={
          clmc:'',
          cllx:'',
          qxts:'',
          dw:'',
          yjnr:'',
          id:commonServie.getuuid(),
        }
      },
      delYjcl(row) {
        this.$confirm('确定删除该预警策略配置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: row.id
          };
          this.$api.yjclpz.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})

            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      changeSfqy(row){
        var tsnr = ''
        var status = '';
        if(row.sfqy=='启用'){
            status = '0';
            tsnr = '确定是否停用该策略配置？'
        }else{
          status = '1';
          tsnr = '确定是否启用用该策略配置？'
        }
        this.$confirm(tsnr, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id,
            status:status

          };
          this.$api.yjclpz.changeStatus(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})

            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })


      },
      editClick(row) {
       this.readonly = false
       this.isView = true

        var params = {id:row.id}
        this.pzxxForm.id = row.id

        this.$api.yjclpz.getInfo(params).then((res) => {
          this.$nextTick(() => {
            this.pzxxForm = res.body.default;
            this.editDialog = true;
            this.dialogTitle = '编辑预警策略配置'
            this.getAnJianPic()
          })
        })
      },
      formatQyzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '停用'
        } else if (returnValue == '1') {
          returnValue = '启用'
        }
        return returnValue;
      },
      formatCllx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '入库'
        } else if (returnValue == '2') {
          returnValue = '调用'
        }else if (returnValue == '3') {
          returnValue = '处置'
        }else if (returnValue == '4') {
          returnValue = '移库'
        }
        return returnValue;
      },
      formatDw(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '公安局'
        } else if (returnValue == '2') {
          returnValue = '法院'
        }else if (returnValue == '3') {
          returnValue = '检察院'
        }
        return returnValue;
      },
      reset() {
         this.formInline.clmc=''
         this.formInline.cllx=''
         this.formInline.dw=''
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
          sessionStorage.removeItem('yjclpzSession')
          sessionStorage.setItem('yjclpzSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
