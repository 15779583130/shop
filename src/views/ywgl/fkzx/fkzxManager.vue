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
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :inline="true" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="反馈日期">
                        <el-date-picker
                          v-model="formInline.fksjq"
                          type="date"
                          placeholder="请输入日期起"
                          format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                        <i class="text">-</i>
                        <el-date-picker
                          v-model="formInline.fksjz"
                          type="date"
                          placeholder="请输入日期止"
                          format="yyyy-MM-dd"
                          value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="反馈标题">
                      <el-input v-model="formInline.fkbt" placeholder="请输入反馈标题" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="反馈类型">
                      <el-select v-model="formInline.fklx" placeholder="请选择">
                        <el-option
                          v-for="item in fklxOptions"
                          :key="item.value"
                          :label="item.label"
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

                  <el-form-item label="是否回复">
                    <el-select v-model="formInline.sfhf" placeholder="请选择">
                      <el-option
                        v-for="item in sfhfOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus"  size="mini" @click="addFkxx()">新增反馈</el-button>

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
          <el-table-column prop="fksj" label="反馈时间" width="150px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="fkbt" label="反馈标题"  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="fknr" label="反馈内容" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="fklx" label="反馈类型" width="100px" :show-overflow-tooltip="true" :formatter="fklxFormater"></el-table-column>
          <el-table-column prop="sfhf" label="是否回复" width="100px" :show-overflow-tooltip="true" :formatter= "sfhfFormat"></el-table-column>
          <el-table-column label="操作" width="150px" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.sfhf=='0'"  class="el-icon-edit" style="font-size: 20px;" title="编辑"
                 @click="editClick(scope.row)"></i>

              <i v-if=" scope.row.sfhf=='1'" class="el-icon-view" title="查看"
                 style="font-size: 20px;" @click="viewClick(scope.row)"></i>

              <i  v-if=" scope.row.sfhf=='0'" class="el-icon-chat-dot-square" title="回复"
                 style="font-size: 20px;" @click="fkhfClick(scope.row)"></i>

             <i v-if="scope.row.sfhf=='0'" class="el-icon-delete" style="font-size: 20px;" title="删除"
                @click="delDysq(scope.row)" v-access id="czdjel"></i>
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



  </el-card>
</template>
<script>
import {timeFormat,timeCompare} from '@/utils/datetime'
  export default {
    name: 'entryRegistration',
    data() {
      return {
        formInline: {
          fkbt: '',
          fklx: '',
          fksjq: '',
          fksjz: '',
          sfhf: ''

        },
        user_id:'',
        dialogVisible: false,
        fklxOptions: [
          {value: '1', label: '问题'},
          {value: '2', label: '建议'}


        ],
        sfhfOptions: [
          {value: '0', label: '未回复'},
          {value: '1', label: '已回复'}

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

        czlcDialogVisible:false,
        czlcTableData:[],
        czlcCurrentPage:1,
        czlcPageSize:5,
        czlcTotal:0,
        ywzb_id:'',
        fkxxForm:[]



      }
    },
    created() {
        if (sessionStorage.getItem('czdjSession')) {
            this.formInline = JSON.parse(sessionStorage.getItem('czdjSession'))
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
      viewClick(row) {
       var params = {
            id: row.id
          }

       this.$api.fkzx.editInfo(params).then((res) => {
         this.$nextTick(() => {
           this.fkxxForm = res.body.default
           this.fkxxForm.editflag = '2'
           sessionStorage.removeItem('fkzxhf')
           sessionStorage.setItem('fkzxhf',  JSON.stringify(this.fkxxForm))
           this.$router.push({
             name: 'fkck',
             params: this.fkxxForm
           })
         })
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

        let timeComp = timeCompare(this.formInline.fksjq, this.formInline.fksjz)
               if (!timeComp.status) {
                 this.$message(timeComp.msg)
                 return false
               }

        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };


        this.formInline.fksjq = this.formInline.fksjq==null?'':this.formInline.fksjq
         this.formInline.fksjz = this.formInline.fksjz==null?'':this.formInline.fksjz
        var parms = {};
        Object.assign(parms, param, this.formInline)
        debugger
        this.$api.fkzx.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      addFkxx() {
        var params = {
        }
        this.fkxxForm = {}
        this.$api.fkzx.getbean(params).then((res) => {
          this.$nextTick(() => {

            this.fkxxForm = res.body.default

            this.fkxxForm.editflag = '0'
            sessionStorage.removeItem('fkzxbj')
            sessionStorage.setItem('fkzxbj',  JSON.stringify(this.fkxxForm))
            this.$router.push({
              name: 'addfk',
              params: this.fkxxForm
            })
          })
        })

        this.$router.push({
          name: 'addfk',
          params: {}
        })
      },
      delDysq(row) {
        this.$confirm('确定删除该反馈？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.fkzx.del(params).then((res) => {
            if (res.success === 'true') {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      editClick(row) {
        var params = {
          id: row.id
        }

     this.$api.fkzx.editInfo(params).then((res) => {
       this.$nextTick(() => {
         this.fkxxForm = res.body.default
         this.fkxxForm.editflag = '1'
         sessionStorage.removeItem('fkzxbj')
         sessionStorage.setItem('fkzxbj',  JSON.stringify(this.fkxxForm))
         this.$router.push({
           name: 'addfk',
           params: this.fkxxForm
         })
       })
     })
      },
      fkhfClick(row){
        var params = {
             id: row.id
           }

        this.$api.fkzx.editInfo(params).then((res) => {
          this.$nextTick(() => {
            this.fkxxForm = res.body.default
            this.fkxxForm.editflag = '2'
            sessionStorage.removeItem('fkzxhf')
            sessionStorage.setItem('fkzxhf',  JSON.stringify(this.fkxxForm))
            this.$router.push({
              name: 'fkhf',
              params: this.fkxxForm
            })
          })
        })
      },
      fklxFormater(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '问题'
        } else if (cellValue == '2') {
          returnValue = '建议'
        }
        return returnValue;
      },
      sfhfFormat(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未回复'
        } else if (cellValue == '1') {
          returnValue = '已回复'
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
          fkbt: '',
          fklx: '',
          fksjq: '',
          fksjz: '',
          sfhf: ''
        }

      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      }
    },
      beforeRouteLeave(to, form, next) {
          sessionStorage.removeItem('czdjSession')
          sessionStorage.setItem('czdjSession', JSON.stringify(this.formInline))
          next()
      }
  }
</script>
