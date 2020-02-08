<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="24" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>查询条件</span>
            </div>
            <div class="text item">
              <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini">
                <el-form-item label="案件编号" label-width="70px" prop="ajbh">
                  <el-input v-model="filters.ajbh" placeholder="请输入案件编号" size="mini" clearable
                            @keyup.enter.native="findTable"></el-input>
                </el-form-item>
                <el-form-item label="案件名称" label-width="70px" prop="ajmc">
                  <el-input v-model="filters.ajmc" placeholder="请输入案件名称" size="mini" clearable
                            @keyup.enter.native="findTable"></el-input>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-search" @click="findTable">查询</el-button>
                  <el-button type="default"  icon="el-icon-refresh" @click="reset">重置</el-button>
                </el-form-item>
              </el-form>
              <template>
                <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                          highlight-current-row @selection-change="selectData"   size="mini"
                          :cell-style="{padding:'1px'}">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column label="序号" type="index" width="50" align="center">
                      <template slot-scope="scope">
                        <span v-text="getIndex(scope.$index)"> </span>
                      </template>
                  </el-table-column>
                  <el-table-column label="案件信息id" prop="id" v-if="false"></el-table-column>
                  <el-table-column label="案件编号" prop="ajbh" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="案件名称" prop="ajmc" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="创建时间" :formatter="dateFormat" prop="created_time" width="160px"></el-table-column>
                  <el-table-column label="录入人员" prop="bary_name"></el-table-column>
                  <el-table-column label="录入部门" prop="ba_dept_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="案件类型" :formatter="ajlxFormat" prop="sfsa" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column
                    fixed="right"
                    align="center"
                    label="操作">
                    <template slot-scope="scope" fixed="right" align="center">
                      <i @click="handleYksq(scope.row)" class="el-icon-check"
                         style="font-size: 20px;cursor: pointer"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <div class="page" style="float: right">
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
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "addYksq",
    components: {},
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'child',
          label: 'name'
        },
        //右侧
        //筛选条件
        filters: {
          ajbh: '',
          type: 'yk',
          ajmc: ''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,

        currentPage1: 1,
        total1: 0,
        pageSize1: 5,

        //表格
        tableData:[],
        delarr:[],//存放删除的数据
        multipleSelection: [],//多选的数据
        tableData1:[],
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {

      ajlxFormat: function(row){
       let ajlxText ="未知";
       if(row.sfsa=='0'){
          ajlxText='刑事案件';
       }
       return ajlxText;
    },
      dateFormat: function(row, column) {
      let date = row.created_time;
      let year = date.substring(0, 4);
      let month = date.substring(4, 6);
      let mydate = date.substring(6, 8);
      let hours = date.substring(8, 10);
      let minutes = date.substring(10, 12);
      let seconds = date.substring(12, 14);
      let time = `${year}-${month}-${mydate} ${hours}:${minutes}:${seconds}`;
      return time;
    },
      //获取表格序号
      getIndex($index) {
        //表格序号
        return (this.currentPage - 1) * this.pageSize + $index + 1
      },
      refresh(data){
        this.findTable()
      },
      //右侧
      handleDelete(row) {
        this.$confirm('确定删除该位置及其子位置？', '提示', {}).then(() => {

        })
      },
      //添加移库信息
      handleYksq(row){
        let id = row.id;
        let parms={
          ajxx_id:id
        };
        this.$api.yksq.addYksq(parms).then((res) => {
          if (res.header.default.success == "true") {
              this.$message({message: res.header.default.message, type: 'success'})
            } else{
              this.$message({message: res.header.default.message, type: 'error'})
            }
            this.findTable();
        })
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
        };
        var parms={};
        Object.assign(parms,param, this.filters)
        this.$api.yksq.queryAjxxTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      handleDelete(row){
        this.$confirm('确定要删除当前的记录吗？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params={
            ids:row.id
          };
          this.$api.bmwzc.handleDelete(params).then((res)=>{
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },

      //改变分页大小
      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.findTable1();
      },
      //跳转页数
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.findTable1();
      },
      selectData(arr){
        this.multipleSelection = arr;
        // this.delarr=arr;
      },

      //批量删除
      delBatch(){
        if(this.multipleSelection.length<=0){
          this.$message({
            message:'请先选择要删除的仓库信息',
            showClose: true,
            type:'warning',
          });
          return false;
        }
        this.$confirm('是否确定移出这些仓库信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delarr.push(this.multipleSelection[i].id)
          }
          var params={
            ids:this.delarr.join(",")
          };
          this.$api.bmwzc.handleDelete(params).then((res)=>{
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      reset(){
        this.filters.ajbh='';
        this.filters.ajmc='';
      },
      setDefault(row){
        this.$confirm('是否设置该仓库为默认仓库？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params={
            id:row.id
          };
          this.$api.bmwzc.setDefault(params).then((res)=>{
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable1();
          })
        })
      }

    },
    computed: {
      widthLie() {
        return (document.body.clientWidth) / 1440
      }
    },
    mounted() {
      this.findTable();
    }
  }
</script>

<style lang="less">
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
    font-size: 14px;
    display: inline-block;
  }

  .bmwzc_tree {
    overflow-y: auto;
    height: 117vh;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

</style>
