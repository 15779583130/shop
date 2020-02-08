<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            承办登记
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold;line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel" style=" padding-bottom: 5px;">
              <el-form ref="form" :inline="true" :model="formInline" size="mini">
                <div class="form-line">
                  <el-row class="form-line">
                    <el-col :span="19" style="display: flex;">
                      <el-form-item label="本单位案号" class="large">
                        <el-input v-model="formInline.bdwah" placeholder="请输入本单位案号" size="mini" clearable
                                  @keyup.enter.native="onSubmit">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="案件编号">
                        <el-input v-model="formInline.ajbh" placeholder="请输入案件编号" size="mini" clearable
                                  @keyup.enter.native="onSubmit">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="案件名称">
                        <el-input v-model="formInline.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                  @keyup.enter.native="onSubmit">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5" style="text-align: right;">
                      <el-form-item label="" style="justify-content: flex-end;">
                        <el-button type="primary" icon="el-icon-search" @click="findTable()" size="mini">查询</el-button>
                        <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="form-line" v-show="more">
                    <el-form-item label="承办人" class="large">
                      <el-input v-model="formInline.cbrxm" placeholder="请输入承办人" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="承办备注">
                      <el-input v-model="formInline.remark" placeholder="请输入承办备注" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="接收日期">
                      <el-date-picker
                        v-model="formInline.jsqrsjq"
                        type="date"
                        format="yyyy-MM-dd" value-format="yyyyMMdd"
                        placeholder="请输入日期起" size="mini">
                      </el-date-picker>
                      <i class="text">-</i>
                      <el-date-picker
                        v-model="formInline.jsqrsjz"
                        type="date"
                        format="yyyy-MM-dd" value-format="yyyyMMdd"
                        placeholder="请输入日期止" size="mini">
                      </el-date-picker>
                    </el-form-item>
                    <el-col :span="12">
                      <el-form-item label="是否设置承办人" class="large">
                        <el-select v-model="formInline.sfszcbr" placeholder="请选择" size="mini">
                          <el-option v-for="item in sfszcbrAry" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" :header-cell-style="{background:'#e6e6e6'}" border highlight-current-row
                  size="mini"  @cell-dblclick="handleClick">
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" width="200" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="jssj" label="接收时间" width="150" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="lsh" label="承办流水号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bdwah" label="本单位案号" width="200" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="bdwam" label="本单位案名"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="cbrxm" label="承办人" width="80" show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="remark" label="承办备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="50px" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" v-access id="cbdjEdit" icon="el-icon-edit" title="确认" circle  size="mini"></el-button>
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  const cityOptions = [];
  export default {
    name: 'whtf',
    data() {
      return {
        formInline: {
          ajbh: '',
          ajmc: '',
          bdwah: '',
          jsqrsjq: '',
          jsqrsjz: '',
          cbrxm: '',
          sfszcbr: '0',
          remark:'',
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        sfszcbrAry: [
          {value: '1', label: '是'},
          {value: '0', label: '否'}
        ],
        checkList: ['选中且禁用', '复选框 A'],
        leftList: [],
        checkAll: false,
        checkedBox: [],
        isIndeterminate: true,
        tableData: [],
        multipleSelection: [],
        more: false
      }
    },
    created() {
      this.init();
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
      dateFormat (row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      handleClick(row) {
        var params = {
          id: row.id
        }
        this.$api.cbdj.get(params).then((res) => {
          this.$nextTick(() => {

            if (Object.keys(res.body).length != 0) {
              sessionStorage.removeItem('cbdjbj')
              sessionStorage.setItem('cbdjbj', JSON.stringify(res.body.default))
              this.$router.push({
                name: 'addChannel',
                params: res.body.default
              })
            } else {
              this.$message({message: '后台数据异常，请联系管理员！', type: 'warning'})
            }

            /* this.$router.push({
              name: 'addChannel',
              params: {
                id: res.body.default.id,
                ajxx_id: res.body.default.ajxx_id,
                bdwah: res.body.default.bdwah,
                ajmc: res.body.default.ajmc,
                jssj: res.body.default.jssj,
                cbrxm: res.body.default.cbrxm,
                remark: res.body.default.remark,
                cbr_id: res.body.default.cbr_id,
                bdwam: res.body.default.bdwam
              }
            }) */
          })
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
      findTable() {
		  let timeComp = timeCompare(this.formInline.jsqrsjq, this.formInline.jsqrsjz)
		         if (!timeComp.status) {
		           this.$message(timeComp.msg)
		           return false
		         }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          bdwah: this.formInline.bdwah,
          ajbh: this.formInline.ajbh,
          ajmc: this.formInline.ajmc,
          jsqrsjq: this.formInline.jsqrsjq,
          jsqrsjz: this.formInline.jsqrsjz,
          cbrxm: this.formInline.cbrxm,
          sfszcbr: this.formInline.sfszcbr,
          remark:this.formInline.remark
        };
        this.$api.cbdj.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })

      },
      reset() {
        this.formInline.ajbh = '';
        this.formInline.ajmc = '';
        this.formInline.bdwah = '';
        this.formInline.jsqrsjq = '';
        this.formInline.jsqrsjz = '';
        this.formInline.cbrxm = '';
        this.formInline.sfszcbr = '0';
        this.formInline.remark = '';
      }
    }
  }
</script>
