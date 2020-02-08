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
                  <el-col :span="24">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="单位名称" prop="unit_name" >
                      <el-input v-model="filters.unit_name"  size="mini" placeholder="请输入单位名称" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="单位编码" prop="unit_code" >
                      <el-input v-model="filters.unit_code"  size="mini" placeholder="请输入单位编码" clearable
                                @keyup.enter.native="findTable" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="授权方式" prop="auth_type">
                      <el-select v-model="filters.auth_type" >
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
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">

                  <el-col :span="24" style="display: flex;" >
                    <el-col :span="8">
                      <el-form-item label="AppKey" prop="appkey">
                        <el-input v-model="filters.appkey"  size="mini"  style="width:300px" clearable
                                  @keyup.enter.native="findTable" >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="AppId" prop="appid">
                        <el-input v-model="filters.appid"  size="mini" style="width:300px" clearable
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
                  tooltip-effect="dark" border style="width: 100%" size="mini"  >
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unit_name" label="单位名称" :show-overflow-tooltip="true" >
          </el-table-column>
          <el-table-column prop="appid" label="APPId" :show-overflow-tooltip="true" min-width="130px"></el-table-column>
          <el-table-column prop="appkey" label="APPKey" :show-overflow-tooltip="true"  min-width="170px"></el-table-column>
          <el-table-column prop="auth_type" label="授权方式" :show-overflow-tooltip="true" min-width="60px">
            <template slot-scope="scope">
              <el-button
                :type="colorjy(scope.row.auth_type)"
              >{{scope.row.auth_type}}</el-button >
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <!--<el-button  icon="el-icon-edit-outline" circle title="查看票据"></el-button>-->
              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" v-access id="ggModify" @click="edit(scope.row)" title="编辑"></i>
              <i class="el-icon-delete" style="font-size: 20px;cursor: pointer" v-access id="ggDel"  @click="del(scope.row)" title="删除"></i>
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
        filterText:'',
        babmDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        params: {},
        picNum:'',
        isEditGs:'true',
        ylobj:{},
        dwOptions:[
          {value: 'token ', label: 'token '},
          {value: 'ip', label: 'ip'},
          {value: 'mac', label: 'mac'},
        ],
        //搜索条件
        filters: {
          unit_name: '',
          unit_code: '',
          appkey: '',
          appid: '',
          auth_type: '',
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
        this.findTable();
      },
      colorjy(type) {
        if (type == 'token') {
          return 'primary';
        } else if (type == 'ip') {
          return 'danger';
        } else {
          return 'info';
        }
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
        var param = {};
        Object.assign(param, this.pageinfo, this.filters)
        this.$api.dsfjkpz.query(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.unitconfigscount);
          this.tableData = res.body.default.unitconfigs;
        })
      },
      add() {
        var param = {
          id: '',
        };

        this.$api.dsfjkpz.get(param).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('dsfjkpz')
            this.$router.push({
              name: 'dsfjkpzInfo',
              params: res.body.default
            })

          })
        })
      },
      reset() {
        var obj = {
          unit_name: '',
          unit_code: '',
          appkey: '',
          appid: '',
          auth_type: '',
        }
        this.filters = obj;
      },
      edit(row) {
        var param = {
          id: row.id,
        };

        this.$api.dsfjkpz.get(param).then((res) => {
          this.$nextTick(() => {
            if (Object.keys(res.body).length != 0) {
              sessionStorage.removeItem('dsfjkpz')
              sessionStorage.setItem('dsfjkpz', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'dsfjkpzInfo',
                params: res.body.default
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }
          })
        })


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
          this.$api.dsfjkpz.del(param).then((res) => {
            if (res.success == "true") {
              this.findTable()
              this.$message({message: res.message, type: 'success'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      getGGqx(id) {
        let param = {
          id: id
        }
        this.$api.ggmanage.getGgqx(param).then((res) => {
          if (res.success == "true") {


          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })

      },
      watch: {
        filterText(val) {
          this.$refs.tree1.filter(val);
        }
      }
    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('pjkjSession')
      sessionStorage.setItem('pjkjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>
