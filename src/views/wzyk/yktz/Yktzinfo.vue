<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <el-col :span="24" ref="right_content">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <div class="text item">
              <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini">
                <el-col :span="8">
                  <el-form-item label="案件编号" label-width="90px" prop="ajbh">
                    <el-input v-model="dataForm.ajbh" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="案件名称" label-width="90px" prop="ajmc">
                    <el-input v-model="dataForm.ajmc" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="移库流水号" label-width="90px" prop="lsh">
                    <el-input v-model="dataForm.lsh" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="申请时间" label-width="90px" prop="sqsj">
                    <el-input v-model="dataForm.sqsj" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="*附件" label-width="90px" prop="fj">
                    <el-link>
                      预览
                      <i class="el-icon-view el-icon--right"></i>
                    </el-link>
                    <el-link icon="el-icon-download">下载</el-link>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>已选清单</span>
            </div>
            <div class="text item">
              <template>
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#e6e6e6'}"
                  border
                  style="width: 100%"
                  highlight-current-row
                   size="mini"
                  @selection-change="selectData"
                  @expand-change="findSubtable"
                  :cell-style="{padding:'1px'}"
                >
                  <el-table-column type="expand">
                    <template>
                      <el-table :data="subtableData" stripe style="width: 100%"   size="mini"
                      :header-cell-style="{background:'#e6e6e6'}"
                      border
                      highlight-current-row
                      :cell-style="{padding:'1px'}"
                      >
                        <el-table-column prop="wzxx_id" label="物证信息id" v-if="false"></el-table-column>
                        <el-table-column prop="wzmc" label="物证名称">
                          <template slot-scope="scope">
                            <span style="color:#5287d8" @click="caseThingName">{{ scope.row.wzmc }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="wzsl" label="数量及单位"></el-table-column>
                        <el-table-column prop="jjzt" label="交接状态"></el-table-column>
                        <el-table-column prop="wzlb" label="物证类别"></el-table-column>
                        <el-table-column prop="cfwz" label="存放位置"></el-table-column>
                        <el-table-column prop="wzbh" label="物证编号"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column label="序号" type="index" width="50" align="center">
                    <template slot-scope="scope">
                      <span v-text="getIndex(scope.$index)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="存放仓库" prop="ckjc"></el-table-column>
                  <el-table-column label="业务从表id" prop="ywcb_id" v-if="false"></el-table-column>
                  <el-table-column label="业务主表id" prop="ywzb_id" v-if="false"></el-table-column>
                  <el-table-column label="是否跨部门移库" prop="sfkbm"></el-table-column>
                  <el-table-column label="接收部门" prop="jsqr_dept_name" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="任务状态" prop="rwzt" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="交接状态" prop="jjzt"></el-table-column>
                  <el-table-column label="物流配送" prop="sfwlps" width="160px"></el-table-column>
                  <el-table-column label="移库原因" prop="sqyy" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column label="任务单号" prop="zrwdh" :show-overflow-tooltip="true"></el-table-column>
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
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-card>
          <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"></case-preview>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import casePreview from "../../my-components/casePreview/casePreview";
export default {
  name: "Yksq",
  components: {
    casePreview
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      filterText: "",
      treeData: [],
      treeProps: {
        children: "child",
        label: "name"
      },
      //筛选条件
      filters: {
        ajbh: "",
        ajmc: "",
        sqsj1: "",
        sqsj2: "",
        sqr_name: "",
        zjzt: "",
        xyr: ""
      },
      dataForm: {
        ajbh: "",
        ajmc: "",
        lsh: "",
        sqsj: "",
        fj: "",
        ajxx_id: "",
        id: ""
      },
      //分页信息
      currentPage: 1,
      total: 0,
      pageSize: 5,

      currentPage1: 1,
      total1: 0,
      pageSize1: 5,

      //表格
      tableData: [],
      subtableData: [],
      delarr: [], //存放删除的数据
      multipleSelection: [], //多选的数据
      tableData1: [],
      //按钮上的展示文字
      showOrHideText: "更多",
      buttonBoolean: false,
      //图标，可根据自己的需求匹配
      icon: "el-icon-caret-bottom",
      centerDialogVisible: false
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    setDialogVal(val) {
      this.centerDialogVisible = val;
    },
    caseThingName() {
      this.centerDialogVisible = true;
    },
    statusFormat: function(row) {
      let statuText = "未知";
      let zjzt = row.zjzt;
      if (zjzt == "1") {
        statuText = "待申请";
      } else if (zjzt == "2") {
        statuText = "已申请";
      } else if (zjzt == "3") {
        statuText = "处理中";
      } else if (zjzt == "9") {
        statuText = "已终结";
      }
      return statuText;
    },
    //隐藏和展示的控制方法
    showOrHide: function() {
      if (this.buttonBoolean) {
        this.icon = "el-icon-caret-bottom";
        this.showOrHideText = "更多";
        $("#showOrHide").hide();
        this.buttonBoolean = !this.buttonBoolean;
      } else {
        $("#showOrHide").show();
        this.icon = "el-icon-caret-top";
        this.showOrHideText = "收起";
        this.buttonBoolean = !this.buttonBoolean;
      }
    },
    addData(row) {
      this.$router.push({
        name: "addYksq"
      });
    },
    viewClick(row) {
      this.$router.push({
        name: "Yksqinfo"
      });
    },
    //获取表格序号
    getIndex($index) {
      //表格序号
      return (this.currentPage - 1) * this.pageSize + $index + 1;
    },
    refresh(data) {
      this.filters.dept_id = data.id;
      this.filters1.dept_id = data.id;
      this.findTable();
      // this.filter()
      // this.id=data.id;
      // this.parentname=data.cfwz;
      // this.findTable();
    },
    //右侧
    handleDelete(row) {
      this.$confirm("确定删除该位置及其子位置？", "提示", {}).then(() => {});
    },
    findFormData() {
      // let ywzb_id = this.$route.params.ywzb_id;
      let ywzb_id = window.location.href.split('Yktzinfo/')[1];
      let parms = {
        ywzb_id: ywzb_id
      };
      this.$api.yktz.queryDetail(parms).then(res => {
        this.dataForm = res.body.default;
        this.findTable();
      });
    },
    findTable() {
      var param = {
        pagenum: this.currentPage,
        pagesize: this.pageSize
      };
      var parms = {
        ajxx_id: this.dataForm.ajxx_id,
        id: this.dataForm.id
      };
      Object.assign(parms, param, this.filters);
      this.$api.yktz.querySubDetail(parms).then(res => {
        this.total = Number(res.body.default.count);
        this.tableData = res.body.default.dataset;
      });
    },
    findSubtable(row) {
      var param = {
        pagenum: this.currentPage,
        pagesize: this.pageSize
      };
      var parms = {
        ywcb_id: row.ywcb_id
      };
      Object.assign(parms, param, this.filters);
      this.$api.yktz.querySubTale(parms).then(res => {
        this.total = Number(res.body.default.count);
        this.subtableData = res.body.default.dataset;
      });
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
    handleDelete(row) {
      this.$confirm("确定要删除当前的记录吗？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        var params = {
          ids: row.id
        };
        this.$api.bmwzc.handleDelete(params).then(res => {
          if (res.success == "true") {
            this.$message({ message: res.message, type: "success" });
          } else {
            this.$message({ message: res.message, type: "error" });
          }
          this.findTable();
        });
      });
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
    selectData(arr) {
      this.multipleSelection = arr;
      // this.delarr=arr;
    },

    //批量删除
    delBatch() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: "请先选择要删除的仓库信息",
          showClose: true,
          type: "warning"
        });
        return false;
      }
      this.$confirm("是否确定移出这些仓库信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
          this.delarr.push(this.multipleSelection[i].id);
        }
        var params = {
          ids: this.delarr.join(",")
        };
        this.$api.bmwzc.handleDelete(params).then(res => {
          if (res.success == "true") {
            this.$message({ message: res.message, type: "success" });
          } else {
            this.$message({ message: res.message, type: "error" });
          }
          this.findTable();
        });
      });
    },
    reset() {
      (this.filters.ajbh = ""),
        (this.filters.ajmc = ""),
        (this.filters.sqsj1 = ""),
        (this.filters.sqsj2 = ""),
        (this.filters.sqr_name = ""),
        (this.filters.zjzt = ""),
        (this.filters.xyr = "");
    },
    reset1() {
      this.filters1.ckbm = "";
      this.filters1.ckmc = "";
      this.filters1.beg_time = "";
      this.filters1.end_time = "";
    },
    setDefault(row) {
      this.$confirm("是否设置该仓库为默认仓库？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var params = {
          id: row.id
        };
        this.$api.bmwzc.setDefault(params).then(res => {
          if (res.success == "true") {
            this.$message({ message: res.message, type: "success" });
          } else {
            this.$message({ message: res.message, type: "error" });
          }
          this.findTable1();
        });
      });
    }
  },
  computed: {
    widthLie() {
      return document.body.clientWidth / 1440;
    }
  },
  mounted() {
    this.findFormData();
    // let right_height=  this.$refs.right_content.$el.offsetHeight;  //100
    // alert(right_height);
  }
};
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
  clear: both;
}

.el-card__header {
  padding: 5px 20px !important;
  background-color: #2470b2;
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
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 35px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 35px;
}
</style>
