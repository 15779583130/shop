/<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              部门结构
            </div>
            <div class="text item">
              <div class="bm_tree">
                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
                <el-tree
                  class="filter-tree"
                  node-key="id"
                  :data="treeData"
                  :props="treeProps"
                  default-expand-all
                  @node-click="refresh"
                  @current-change="TreeCurrentChange"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  ref="tree">
                </el-tree>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    部门管理
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="18" style="display: flex;">
                              <el-form-item label="部门名称" prop="ckbm">
                                <el-input v-model="filters.dept_name" placeholder="请输入部门名称" size="mini"
                                          @keyup.enter.native="findTable"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6" style="text-align: right;">
                              <el-form-item label="" >
                                <el-button type="primary" icon="el-icon-search" v-access id="bmglQuery" @click="findTable">查询</el-button>
                                <el-button type="default" icon="el-icon-refresh-right" @click="reset">重置</el-button>
                               <!-- <el-button type="success" icon="el-icon-circle-plus" v-access id="bmglSave" @click="addGsck">新增</el-button> -->
                              </el-form-item>
                            </el-col>

                          </el-row>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" >
                    <el-button type="primary" icon="el-icon-plus" v-access size="mini" id="bmglSave" @click="addGsck">新增</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row @selection-change="selectData" size="mini"
                              @cell-dblclick="editGsck">
                      :cell-style="{padding:'1px'}">
                     <!-- <el-table-column type="selection"></el-table-column> -->
                      <el-table-column label="序号" width="50" align="center">
                        <template slot-scope="scope">
                          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="节点编码" prop="parent_code" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="部门编号" prop="bmbh" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="部门名称" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="状态" prop="status" :formatter="formatstatus" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" align="center" label="操作" >
                        <template slot-scope="scope">
                          <i @click="editGsck(scope.row)" class="el-icon-edit-outline"
                             style="font-size: 20px;cursor: pointer" v-access id="bmglEdit" title="编辑"></i>
                          <i @click="handleDelete(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer" v-access id="bmglDel" title="删除"></i>
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
                          :page-sizes="[10, 20, 30, 40, 50]"
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
  </div>
</template>

<script>
	   import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "bmManage",
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
          children: 'children',
          label: 'name'
        },
        //右侧
        //筛选条件
        filters: {
          dept_name:'',
          dept_id_ck: '',
          dept_code:''
        },
        // filters1: {
        //   ckbm: '',
        //   ckmc: '',
        //   beg_time: '',
        //   end_time: '',
        //   dept_id_ck: ''
        // },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,

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
      this.findTree();
      this.findTable();
      //this.findTable1();
    },
    methods: {
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTree() {
        var param = {};
        this.$api.bmgl.queryTree(param).then((res) => {

          if (res.success == "true") {
            this.treeData = res.data
            console.log(res.data)
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      TreeCurrentChange(data){
        this.filters.dept_code=data.code
        // var msg = JSON.stringify(data);
        // console.log("!~!~!"+msg)
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        // this.filters.beg_time = this.filters.beg_time==null?'':this.filters.beg_time
        //  this.filters.end_time = this.filters.end_time==null?'':this.filters.end_time
        var parms = {
        };
        Object.assign(parms, param, this.filters)
        this.$api.bmgl.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
           var msg = JSON.stringify(res.body.default.dataset);
          console.log("~~~~~"+msg)
        })
      },
      refresh(data) {
        this.filters.dept_id_ck = data.id;
        this.dept_name = data.dept_name
        this.findTable()
        //this.findTable1()
      },
      //右侧
      handleDelete(row) {
        this.$confirm('确定删除该部门及其子节点？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          var params = {
            id: row.id
          };
          this.$api.bmgl.handleDelete(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTree()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
            this.findTable();
          })
        })
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        var parms = {
        };
        Object.assign(parms, param, this.filters)
        this.$api.bmgl.queryTable(parms).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      formatstatus(row, column) {
        var ztFormat = '';
        if (row.status == '0') {
          ztFormat = '禁用'
        } else if (row.status == '1') {
          ztFormat = '启用'
        }
        return ztFormat;
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

      selectData(arr) {
        this.multipleSelection = arr;
      },
      addGsck() {
        if (this.filters.dept_id_ck === '') {
          this.$message({
            message: '请从左侧树中选择单位或选择子节点！',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        sessionStorage.removeItem('bmtj')
        sessionStorage.setItem('bmtj', JSON.stringify({id: this.filters.dept_id_ck,type:'addBmxx',method: 'addBmxx',}))
        console.log("pre:"+this.filters.dept_id_ck)
        this.$router.push({
          name: 'addBm',
          params: {
            activeName: 'caseInfo'
          }
        })
      },
      editGsck(row) {
        let params = {
          activeName: 'caseInfo',
          id: row.id,
          dept_name: this.dept_name,
          method: 'editBmxx',
          isEdit: 'true',
          type:'editBmxx'
        }
        sessionStorage.removeItem('bmtj')
        sessionStorage.setItem('bmtj', JSON.stringify(params))

        this.$router.push({
          name: 'editBm',
          params: {
            activeName: 'caseInfo',
            id: row.id,
            dept_name: this.dept_name,
            // method: 'editBmWuZhengCang',
            isEdit: 'true'
          }
        })
      },

      //批量删除
      // delBatch() {
      //   if (this.multipleSelection.length <= 0) {
      //     this.$message({
      //       message: '请先选择要删除的仓库信息',
      //       showClose: true,
      //       type: 'warning',
      //     });
      //     return false;
      //   }
      //   this.$confirm('是否确定移出这些仓库信息？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     const length = this.multipleSelection.length;
      //     for (let i = 0; i < length; i++) {
      //       this.delarr.push(this.multipleSelection[i].id)
      //     }
      //     var params = {
      //       ids: this.delarr.join(",")
      //     };
      //     this.$api.bmwzc.handleDelete(params).then((res) => {
      //       if (res.success == "true") {
      //         this.$message({message: res.message, type: 'success'})
      //       } else {
      //         this.$message({message: res.message, type: 'error'})
      //       }
      //       this.findTable();
      //     })
      //   })
      // },
      reset() {
        this.filters.dept_name = '';
      },
      // setDefault(row) {
      //   this.$confirm('是否设置该仓库为默认仓库？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     var params = {
      //       id: row.id
      //     };
      //     this.$api.bmwzc.setDefault(params).then((res) => {
      //       if (res.success == "true") {
      //         this.$message({message: res.message, type: 'success'})
      //       } else {
      //         this.$message({message: res.message, type: 'error'})
      //       }
      //      // this.findTable1();
      //     })
      //   })
      // }
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

  .bm_tree {
    overflow-y: auto;
    height: 100vh;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
