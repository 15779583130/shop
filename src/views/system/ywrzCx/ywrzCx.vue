<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
         <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              查询条件
            </div>
           <div class="text item">
              <div class="ywrz_tree">
                <el-form ref="form" :inline="true" :model="filters" size="mini">
                <el-row>
                  <el-col >
               <el-form-item label="操作时间  " >
                  <el-date-picker style="width:125px;"
                    v-model="filters.start"
                    type="date"
                    placeholder="开始时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyyMMddHHmmss">
                  </el-date-picker>
                  <i class="text">-</i>
                  <el-date-picker style="width:125px;"
                    v-model="filters.end"
                    type="date"
                    placeholder="结束时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyyMMddHHmmss">
                  </el-date-picker>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="业务名称" prop="menu" size="mini">
                    <el-select v-model="filters.menu" multiple placeholder="请选择" style="width: 265px;">
                        <el-option
                          v-for="item in menus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="操作类型" prop="method" size="mini">
                    <el-select v-model="filters.method" multiple placeholder="请选择" style="width: 265px;">
                        <el-option
                          v-for="item in methods"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="操作用户" prop="user_name">
                    <el-input v-model="filters.user_name"  placeholder="请输入操作用户" size="mini" style="width: 265px;"></el-input>
                  </el-form-item>
                </el-row>
                <el-row  >
                  <el-form-item label="" align="middle">
                    <el-button type="primary" icon="el-icon-search" @click="findTable('search')">查询</el-button>
                    <el-button type="default" icon="el-icon-refresh-right" @click="reset">重置</el-button>
                  </el-form-item>
                </el-row>
                 </el-form>
             </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    结果列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">

              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row @selection-change="selectData" size="mini"
                              @cell-dblclick="viewywrz">
                      :cell-style="{padding:'1px'}">
                     <!-- <el-table-column type="selection"></el-table-column> -->
                      <el-table-column label="序号" width="70" align="center">
                        <template slot-scope="scope">
                          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="业务模块" prop="model" :formatter="formatmodel" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="操作类型" prop="method" :formatter="formatmethod" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="操作用户" prop="creator_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="用户所属单位" prop="create_dept_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="操作时间" prop="created_time" :formatter="formatDate" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" align="center" label="操作" >
                        <template slot-scope="scope">
                          <i @click="viewywrz(scope.row)" class="el-icon-view"
                             style="font-size: 20px;cursor: pointer" title="查看"></i>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="currentPage"
                          :page-sizes="[15, 30, 50, 70, 100]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

        </div>
      </el-col>

    </el-row>
    <el-dialog title="查看业务日志信息" :visible.sync="dialogTableVisible" width="35%"   :append-to-body="true">
      <el-form>
      <el-row>
        <el-col>
          <el-form-item label="操作人:" :label-position="right" label-width="150px" prop="creator_name">
            <el-input v-model="filters2.creator_name" style="width: 80%; float: left;" :readonly="true" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
         <el-col>
          <el-form-item label="用户所属单位:" :label-position="right" label-width="150px" prop="create_dept_name">
            <el-input v-model="filters2.create_dept_name" style="width: 80%; float: left;" :readonly="true" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="操作时间:"  :label-position="right" label-width="150px" prop="created_time" :formatter="formatDate">
            <el-input v-model="filters2.created_time"  style="width: 80%; float: left;" :readonly="true" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="操作内容" :label-position="right" label-width="150px" prop="remark">
            <el-input
              type="textarea"
              :rows="8"
              :readonly="true"
              v-model="filters2.remark"
              size="mini" style="width: 80%; float: left;">
            </el-input>
          </el-form-item>

        </el-col>
      </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
	   import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "ywrzCx",
    components: {},
    data() {
      return {
        dialogTableVisible: false,
        transid:'',
        methods:[
          {value: '1',label: '新增'},{value: '2',label: '修改'},{value: '3',label: '删除'},{value: '4',label: '查询'},
          {value: '5',label: '导出'},{value: '6',label: '提交申请'},{value: '7',label: '登记'},{value: '8',label: '物证交接'},
          {value: '9',label: '查看案件详情'},{value: '10',label: '查看物证详情'},{value: '11',label: '物证期限调整'},{value: '12',label: '物证位置调整'},
          {value: '14',label: '查看审核日志'},{value: '15',label: '审核通过'},{value: '16',label: '审核驳回'}
        ],
        menus:[
          {value: 'wzdj',label: '物证登记'},{value: 'wzzh',label: '物证综合'},{value: 'ajcx',label: '案件查询'},{value: 'rksq',label: '入库申请'},
          {value: 'rktz',label: '入库台账'},{value: 'dyghsq',label: '调用归还申请'},{value: 'dyghtz',label: '调用归还台账'},{value: 'yksq',label: '移库申请'},
          {value: 'yktz',label: '移库台账'},{value: 'yssq',label: '移送申请'},{value: 'ysqr',label: '接收确认'},{value: 'ystz',label: '移送台账'},
          {value: 'czqth',label: '处置权退回'},{value: 'czqthtz',label: '处置权退回台账'},{value: 'cbdj',label: '承办登记'},{value: 'wzbs',label: '物证报损'},
          {value: 'rkjj',label: '入库交接'},{value: 'rkjjtz',label: '入库交接台账'},{value: 'ckjj',label: '出库交接'},{value: 'ckjjtz',label: '出库交接台账	'},
          {value: 'rkdj',label: '入库登记'},{value: 'rkdjtz',label: '入库登记台账'},{value: 'czdj',label: '处置登记'},{value: 'czsp',label: '处置审批'},
          {value: 'czwzgl',label: '处置物证管理'},{value: 'zzczdj',label: '最终处置登记	'},{value: 'cztz',label: '处置台账'},{value: 'bmwzc',label: '部门物证仓'},
          {value: 'wzcw',label: '物证仓位'},{value: 'yjcl',label: '预警策略'},{value: 'shrz',label: '处置审核日志'},{value: 'lcjd',label: '任务流程配置'},
          {value: 'wzgxh',label: '物证个性化'},{value: 'yksq',label: '移库申请'},{value: 'ykqr',label: '移库确认'},{value: 'yktz',label: '移库台账'},
          {value: 'bfth',label: '处置权退回'},{value: 'sbfthtz	',label: '处置权退回台账	'},{value: 'wzfls',label: '物证类别'}
        ],
        formInline: {
          user: '',
          region: ''
        },
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },

        filters: {
          start:'',
          end: '',
          menu:'',
          method:'',
          user_name:'',
        },
        filters2: {
         creator_name:'',
         create_dept_name:'',
         created_time:'',
         remark:''
        },

        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 15,

        //表格
        tableData: [],
        delarr: [],//存放删除的数据
        multipleSelection: [],//多选的数据
        tableData1: [],
        dept_name: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {

    },
    methods: {
      findTable(val) {
        if(val=='search'){
          this.currentPage='1'
        }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };

        var parms = {
        };
        Object.assign(parms, param, this.filters)
        parms.method =  parms.method.join(',')
        parms.menu =  parms.menu.join(',')
        console.log(parms.start)
        if(parms.start=='null'||parms.start==''||parms.start==undefined){
          console.log("@#@#@$$$")
          parms.start=''
        }
        if(parms.end=='null'||parms.end==''||parms.end==undefined){
          parms.end=''
        }
        this.$api.ywrzcx.queryTable(parms).then((res) => {
         if(Object.keys(res.body).length != 0){
           this.total = Number(res.body.default.count);
           this.tableData = res.body.default.dataset;
         }else{
           this.total = 0
           this.tableData = []
         }

        })
      },
      formatmodel(row, column){
        var modelFormat =row.model;
        for(var i=0;i<this.menus.length;i++){
        if(row.model==this.menus[i].value){
          modelFormat=this.menus[i].label
        }
        }
        return modelFormat;
      },
      formatmethod(row, column){
        var methodFormat =row.method;
        for(var i=0;i<this.methods.length;i++){
        if(row.method==this.methods[i].value){
          methodFormat=this.methods[i].label
        }
        }
        return methodFormat;
      },
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
      },


      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableData = []
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableData = []
        this.findTable();
      },

      selectData(arr) {
        this.multipleSelection = arr;
      },

      viewywrz(row) {
        console.log("idis    "+row.transid)
        this.transid = row.transid;
        let self = this

          var parms={
            transid:self.transid
          };
          self.$api.ywrzcx.queryTable(parms).then((res) => {
            self.$nextTick(() => {
              self.dialogTableVisible = true
              self.filters2= res.body.default.dataset[0]
              self.filters2.created_time=timeFormat(self.filters2.created_time)

            })
          })
          console.log(self.filters2)

      },

      reset() {
        this.filters.start='',
        this.filters.end='',
        this.filters.menu='',
       this.filters.method='',
        this.filters.user_name=''
      },

    }
  }
</script>
<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card__header {
    padding: 5px 20px !important;
    background-color: #2470B2;

    span {
      color: #ffffff;
      font-weight: bold;
      font-size: 12px;
    }
  }

  .el-tree {
    min-width: 100%;
    font-size: 5px;
    display: inline-block;
  }

  .ywrz_tree {
    overflow-y: auto;
    height: 100vh;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

</style>
