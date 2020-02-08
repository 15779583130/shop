<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  /deep/ .el-dialog__body {
    padding-top: 10px;
  }

  .main-con {
    padding: 0 5px;
    .btn-text-box{
      margin-top: 10px;
      .btn-text {
        float: right;
        span {
          .line {
            width: 100px;
            border: none;
            border-bottom: 1px solid #000;
            line-height: 20px;
          }
          em{
            font-style: normal;
          }
          line-height: 32px;
          padding: 30px;
        }
      }
    }
    .btn-box{
      float: right;
      margin-top: 20px;
    }
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
            调用申请信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; background: #fff; line-height: 31px">
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini">
                <el-row class="form-line">
                  <el-col :span="17" style="display: flex;">
                    <el-form-item label="案件编号">
                      <el-input v-model="formInline.ajbh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly" style="width:190px">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称">
                      <el-input v-model="formInline.ajmc" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="调用流水号">
                      <el-input v-model="formInline.lsh" size="mini" clearable
                                @keyup.enter.native="onSubmit" readonly="readonly">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请时间">
                      <el-input v-model="formInline.sqsj"  size="mini" clearable readonly="readonly" style="width:150px" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" class="id-button">
                      <el-button type="success"  size="mini" @click="dialogUpLoadClick()">查看文件</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            任务清单
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" size="mini" :header-cell-style="{background:'#e6e6e6'}"
                    border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" tooltip-effect="dark" style="width: 100%" size="mini" :header-cell-style="{background:'#e6e6e6'}"  @selection-change="handleSelectionChange" border>
                <el-table-column  type="selection" width="55" ></el-table-column>
                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzsl" label="数量及单位" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="jjzt" label="交接状态" :show-overflow-tooltip="true" :formatter="formatJjzt"></el-table-column>
                <el-table-column prop="jjsj" label="交接时间" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>

              </el-table>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zrwdh" label="任务单号" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ckmc" label="保管中心" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="wzrq" label="归还期限" width="100px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="jjrmc" label="交接人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sqyy" label="调用原因" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sl" label="物证数量/退回数量" width="130px"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="rwzt" label="任务状态" width="80px" :show-overflow-tooltip="true" :formatter="formatRwzt"></el-table-column>
          <el-table-column prop="sfwlps" label="物流配送" width="80px" :show-overflow-tooltip="true" :formatter="formatWlps"></el-table-column>
           <el-table-column prop="state" label="派单状态" width="80px" :show-overflow-tooltip="true" :formatter="formatState"></el-table-column>
          <el-table-column prop="wtr" label="委托人" width="80px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="crklx" label="业务类型" width="80px" :show-overflow-tooltip="true" :formatter="formatYwlx"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="120px">
            <template slot-scope="scope">
              <i  class="el-icon-edit" v-if= "scope.row.crklx=='2'&&scope.row.pdxx_jjzt=='0'&&scope.row.state!='0' && scope.row.state!='1' && scope.row.state!='2' && scope.row.state!='7'"
                 style="font-size: 20px;" title="物流派单交接" @click="pdjj(scope.row,'jj')"></i>
             <i  class="el-icon-edit" v-if= "scope.row.crklx=='1'&&scope.row.pdxx_jjzt=='0'&&scope.row.state!='0' && scope.row.state!='1' && scope.row.state!='7'"
                style="font-size: 20px;" title="物流派单交接" @click="pdjj(scope.row,'jj')"></i>

              <i  class="el-icon-close" v-if= "scope.row.state=='1'"
                     style="font-size: 20px;" title="派单撤销" @click="pdcx(scope.row)"></i>
              <i  class="el-icon-circle-close" v-if= "scope.row.state=='8'"
                     style="font-size: 20px;" title="派单强制撤销" @click="pdqzcx(scope.row)"></i>
              <i   class="el-icon-view"
                  style="font-size: 20px;" title="任务流程跟踪" @click="rwgz(scope.row)"></i>
              <i v-if="scope.row.rwzt=='3' && scope.row.crklx=='2'" class="iconfont icon-tuihui" style="font-size: 20px;" title="归还"
                 @click="ghClick(scope.row)"></i>
                 <i  class="el-icon-tickets" v-if= "scope.row.pdxx_jjzt=='1'"
                     style="font-size: 20px;" title="交接文件预览" @click="pdjj(scope.row,'yl')"></i>
            </template>
          </el-table-column>
        </el-table>
        <br/>
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
    <el-dialog title="选择案件信息" :visible.sync="dialogVisible" width="60%" :modal="false">
      <div slot="header" class="" style="">
        <span>存放位置树</span>
      </div>
      <div class="text item">
        <div class="wzcw_tree" style="height: 55vh;overflow-y: auto">
          <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
          <el-tree
            class="filter-tree"
            :data="treeData"
            :props="treeProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="归还申请"
      :visible.sync="wlpsDialog"
      :append-to-body="true"
      :modal="true"
      width="60%"
      style="">
      <el-form :model="form" ref="form" label-width="100px" :rules="wplsFormRules" size="mini"
               label-position="right">
       <el-row>
         <el-col :span="24">
           <el-form-item>
             <span>物流配送</span>
             <el-switch
               v-model="form.iswl" @change="changeWlps()">
             </el-switch>
              <span>&nbsp;&nbsp;已勾选<span style="color:red">{{selectWzs}}件</span>物证</span>
           </el-form-item>
          </el-col>

       </el-row>
        <el-row v-if="dialogTableVisible">
          <el-col :span="7">
            <el-form-item   label="押运级别" prop="yyfs" size="mini">
              <el-select v-model="form.yyfs" clearable placeholder="请选择" >
                  <el-option
                    v-for="item in yyjbs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item   label="委托人" prop="wtr_id" size="mini">
              <el-select v-model="form.wtr_id" clearable placeholder="请选择" >
                  <el-option
                    v-for="item in wtrs"
                    :key="item.value"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="寄件人姓名" prop="jj_user_name" >
              <el-input v-model="form.jj_user_name" size="mini" placeholder="请输入寄件人姓名" readonly="readonly" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="寄件电话" prop="jj_mobile">
              <el-input v-model="form.jj_mobile" size="mini" placeholder="请输入寄件电话" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="省/市/区县" prop="jjrssqx">
              <el-cascader
                v-model="form.jjrssqx"
                :options="ssxOptions"
                @change="handleChangeSsx"></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="寄件地址" prop="jj_addr">
              <el-input v-model="form.jj_addr" size="mini" placeholder="请输入寄件地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider ></el-divider>
          </el-col>
          <div v-if="!sfdsfck">
          <el-col :span="7">
            <el-form-item label="收件人姓名" prop="sj_user_id">
              <el-select v-model="form.sj_user_id" placeholder="请选择收件人" style="width: 80%" size="mini"
                         @change="changeSjr">
                <el-option v-for="item in sjrArry" :key="item.id" :label="item.text" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件电话" prop="sj_mobile">
              <el-input v-model="form.sj_mobile" size="mini" placeholder="请输入收件电话" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="省/市/区县" prop="sjrssqx">
              <el-cascader
                v-model="form.sjrssqx"
                :options="ssxOptions"
                @change="handleChangeSjrSsx"></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="24" >
            <el-form-item label="收件地址" prop="sj_cfck_dz">
              <el-input v-model="form.sj_cfck_dz" size="mini" placeholder="请输入收件地址" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
          </div>
          <el-col :span="24">
            <el-form-item label="预约取件时间">
              <el-col :span="7" style="display: flex;">
                <el-date-picker
                  v-model="form.yyqj_ks"
                  type="datetime"
                  placeholder="请输入开始时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <i class="text">-</i>
              </el-col>

              <el-col :span="7" style="display: flex;">
                <el-date-picker
                  v-model="form.yyqj_js"
                  type="datetime"
                  placeholder="请输入结束时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="saveWplsxx()">保存</el-button>
        <el-button @click="wlpsDialog = false" size="mini">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="diglogTitle"
      :visible.sync="pdjjDialog"
      :append-to-body="true"
      :modal="true"
      width="60%"
      class="main-con">
      <el-divider content-position="left">申请信息</el-divider>
      <el-form :model="wlpdxx" label-width="100px" size="mini" label-position="right">

        <el-row>
          <el-col :span="8">
            <el-form-item label="申请单号">
              <el-input v-model="wlpdxx.sqdh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请单位">
              <el-input v-model="wlpdxx.sq_sqdw" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input v-model="wlpdxx.sq_sqrxm" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="申请人电话">
            <el-input v-model="wlpdxx.sq_phone" size="mini" readonly="readonly"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间">
              <el-input v-model="wlpdxx.sq_sqsj" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-divider content-position="left" style="margin-top: 0px">派单反馈信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请单号">
              <el-input v-model="wlpdxx.sqdh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运单号">
              <el-input v-model="wlpdxx.ydh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="取件人">
              <el-input v-model="wlpdxx.jjrxm" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="取件人电话">
              <el-input v-model="wlpdxx.jjrlxdh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="取件人证件号">
              <el-input v-model="wlpdxx.jjrzjh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="8">
            <el-form-item label="车次号">
              <el-input v-model="wlpdxx.cch" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号">
              <el-input v-model="wlpdxx.cph" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="司机名称">
              <el-input v-model="wlpdxx.sjmc" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机电话">
              <el-input v-model="wlpdxx.sjdh" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机身份证号">
              <el-input v-model="wlpdxx.sjsfz" size="mini" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24" v-show="showTxry">
          <el-divider content-position="left">同行人员</el-divider>
          <el-table ref="multipleTable" :data="txrylist" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column prop="xh" label="序号" width="50"></el-table-column>
            <el-table-column prop="rylx_text" label="人员类型" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ryxm" label="人员名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rylxdh" label="人员联系电话" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="ryzjh" label="人员证件号" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-divider content-position="left">物证信息</el-divider>
          <el-table ref="multipleTable" :data="wzxxlist" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%" size="mini">
            <el-table-column prop="xh" label="序号" width="50" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="dwwzbm" label="物证编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wzlb" label="物证类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sldw" label="数量及单位" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="wztz" label="特征描述" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="btn-text-box">
        <div class="btn-text">
          <span>申请人/移交人：<input class="line"></span>
          <span>取件人：<input class="line"></span>
        </div>
      </el-row>
      <el-row class="btn-text-box">
        <div class="btn-text">
          <span>取件日期：<em class="line">{{wlpdxx.jjsj}}</em></span>
        </div>
      </el-row>
      <el-row>
        <div class="btn-box">
        <span slot="footer" class="dialog-footer">
           <el-button type="info" size="mini" v-show="jjylShow" @click="printHandle">预览/打印</el-button>
          <el-button type="info" size="mini" v-show="jjczShow" @click="sxqz">手写签字</el-button>
          <el-button type="primary" size="mini" v-show="jjczShow" @click="configWlpd">确认完成</el-button>
          <el-button type="primary" size="mini" v-show="jjylShow" @click="wjxz">下载</el-button>
          <el-button @click="pdjjDialog = false"  size="mini">取消</el-button>
        </span>
        </div>
      </el-row>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
    <upload-file @passData="getData" :yssqid="this.ywid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
  </el-card>
</template>
<script>
  import {timeFormat} from '@/utils/datetime'
  import casePreview from "../../my-components/casePreview/casePreview"
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile"
  import pdf from "vue-pdf";
  export default {
    name: 'entryRegistration',
    components: {
      casePreview,
      uploadFile
    },
    data() {
      return {
        ywid: '',
        isView:true,
        dialogUpLoad: false,
        getFileData: false,
        yyjbs:[{value:'1',label:'正常押运'},{value:'2',label:'高级押运'}],
        wtrs:[],
        formInline: {
          id: this.$route.params.id,
          ajbh: this.$route.params.ajbh,
          ajmc: this.$route.params.ajmc,
          lsh: this.$route.params.lsh,
          sqsj: timeFormat(this.$route.params.sqsj)
        },
        options: [
          {value: 'xm', label: '录入人员'},
          {value: 'fz', label: '物流人员'},
          {value: 'sh', label: '移库'}
        ],
        centerDialogVisible: false,
        wzxx_id:'',
        leftList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'child',
          label: 'name'
        },
        dialogVisible: false,
        wzmxTableData: [],
        form: {
          dycb_id: '',
          wzxx_ids: '',
          iswl: false,
          wtr_id: '',
          yyfs: '1',
          jj_user_name:'',
          jj_mobile:'',
          jjrssqx:[],
          sjrssqx:[],
          jjrsf: '福建省',
          jjrcs: '厦门市',
          jjrqx: '思明区',
          jj_addr: '',
          sj_user_name: '',
          sj_user_id:'',
          sj_mobile: '',
          sjrsf: '福建省',
          sjrcs: '厦门市',
          sjrqx: '思明区',
          sj_cfck_dz: '',
          yyqj_ks: '',
          yyqj_js: '',
          checkArrLen: 0

        },
        selectWzs:0,
        dialogTableVisible:false,
        wlpsDialog:false,
        wplsFormRules: {
          jj_user_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          jjrssqx:[{required: true, message: '这是必填字段', trigger: 'blur'}],
          sjrssqx:[ {required: true, message: '这是必填字段', trigger: 'blur'}],
          jj_mobile: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {validator: this.checkPhone, trigger: 'blur'}
          ],
          jjrsf: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          jjrcs: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          jjrqx: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          jj_addr: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 500, message: '最多可输入500个字符'}
          ],
          sj_user_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          sj_user_id:[ {required: true, message: '这是必填字段', trigger: 'blur'}],
          sj_mobile: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {validator: this.checkPhone, trigger: 'blur'}
          ],
          sjrsf: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          sjrcs: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          sjrqx: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          sj_cfck_dz: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 500, message: '最多可输入500个字符'}
          ],
          yyfs:[{required: true, message: '这是必填字段', trigger: 'blur'}]
        },
        sjrArry:[],
        ssxOptions: [{
          value: '福建省',
          label: '福建省',
          children: [{
            value: '厦门市',
            label: '厦门市',
            children: [{
              value: '思明区',
              label: '思明区'
            }, {
              value: '湖里区',
              label: '湖里区'
            }, {
              value: '集美区',
              label: '集美区'
            }, {
              value: '海沧区',
              label: '海沧区'
            },{
              value: '同安区',
              label: '同安区'
            },{
              value: '翔安区',
              label: '翔安区'
            }]
          }]
        }],
        pdjjDialog: false,
        wlpdxx: {},
        txrylist: [],
        wzxxlist: [],
        jjczShow: true,
        jjylShow: false,
        showTxry:true,
        ywcbid:'',
        crklx:'',
        diglogTitle:'取件交接清单'
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
      printHandle () {
        let param = {
          id:this.ywcbid
        };
        this.$api.dyghsq.exportWlpdWordGh(param).then((res) => {
          if (res.success == "true") {
            if (!/\.(pdf|PDF)$/.test(pdf)) {
              let pdfurl = res.data
              window.open(
                // 'https://view.officeapps.live.com/op/view.aspx?src=' + this.yuming + '/anli?id=' + row.id,
                // 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
                pdfurl
              )
              return false
            } else {
              this.$message({message:'文件格式出现异常', type: 'error'})
            }
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 设置手机号的验证规则
      checkPhone(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^1(3[0-9]|4[0-9]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/

          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的电话'))
          }
        }
      },
      init() {
        this.formInline = JSON.parse(sessionStorage.getItem('dysqck'))
        this.formInline.sqsj = timeFormat(this.formInline.sqsj)
        this.findTable();
      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },
      dialogUpLoadClick () {
        this.isView = true
        this.ywid = this.formInline.id
        this.dialogUpLoad = true
        this.getFileData = true
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      getWtr(){
        var param = {
        }
        this.$api.dyghsq.selectUserQd(param).then((res) => {
          this.wtrs=res.body.default.userlist
        })
      },
      sxqz () {
        this.$message({
          message: '该功能尚未上线...',
          type: 'warning'
        })
      },
      configWlpd () {
        this.$confirm('是否确认完成？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ywcb_id: this.ywcbid
          }
          let that = this
          this.$api.dyghsq.wlpdHandPver(params).then((res) => {
            if (res.success === 'true') {
              // /*this.$message({message: '操作成功', type: 'success'})
              // this.pdjjDialog = false*/
              var param = {
                id: that.ywcbid
              }
              if(that.crklx == '2'){
                that.$api.dyghsq.exportWlpdWordDy(param).then((res) => {
                  if (res.success === 'true') {
                    // /*that.$message({message: '操作成功', type: 'success'})*/
                    var downloadFileUrl = res.message
                    var elemIF = document.createElement('iframe')
                    elemIF.src = downloadFileUrl
                    elemIF.style.display = 'none'
                    document.body.appendChild(elemIF)
                    that.pdjjDialog = false
                  } else {
                    that.$message({message: res.message, type: 'error'})
                  }
                })
              }else{
                that.$api.dyghsq.exportWlpdWord(param).then((res) => {
                  if (res.success === 'true') {
                    // /*that.$message({message: '操作成功', type: 'success'})*/
                    var downloadFileUrl = res.message
                    var elemIF = document.createElement('iframe')
                    elemIF.src = downloadFileUrl
                    elemIF.style.display = 'none'
                    document.body.appendChild(elemIF)
                    that.pdjjDialog = false
                  } else {
                    that.$message({message: res.message, type: 'error'})
                  }
                })
              }

            } else {
              this.$message({message: '操作失败', type: 'error'})
            }
            this.findTable()
          })
        })
      },
      wjxz () {
        this.downLoadJjwj(this.ywcbid)
      },
      downLoadJjwj (id) {
        let that = this
        var param = {
          id: id
        }
        if(that.crklx=='2'){
          that.$api.dyghsq.exportWlpdWordDy(param).then((res) => {
            if (res.success === 'true') {
              // /*that.$message({message: '操作成功', type: 'success'})*/
              var downloadFileUrl = res.message
              var elemIF = document.createElement('iframe')
              elemIF.src = downloadFileUrl
              elemIF.style.display = 'none'
              document.body.appendChild(elemIF)
              that.pdjjDialog = false
            } else {
              that.$message({message: res.message, type: 'error'})
            }
          })
        }else{
          that.$api.dyghsq.exportWlpdWord(param).then((res) => {
            if (res.success === 'true') {
              // /*that.$message({message: '操作成功', type: 'success'})*/
              var downloadFileUrl = res.message
              var elemIF = document.createElement('iframe')
              elemIF.src = downloadFileUrl
              elemIF.style.display = 'none'
              document.body.appendChild(elemIF)
              that.pdjjDialog = false
            } else {
              that.$message({message: res.message, type: 'error'})
            }
          })
        }

      },
      rwgz(row) {
        sessionStorage.removeItem('rwgzyl')
        sessionStorage.setItem('rwgzyl', JSON.stringify(row))
        this.$router.push({
          name: 'rwgzyl',
          params: {
            id: row.id,
            sfwlps: row.sfwlps,
          }
        })
      },
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      ghClick(row){

        var selectWzxxs =  this.multipleSelection.filter(item=>item.ywcb_id.match(row.id))

        if(selectWzxxs.length<=0){
          this.$message({message: '请至少选择一条物证明细', type: 'error'})
          return false
        }
        this.selectWzs = selectWzxxs.length
        this.form.dycb_id = row.id
        this.form.wzxx_ids = selectWzxxs.map(obj => {
                        return obj.wzxx_id
                      }).join(",")
        this.getWtr()
        this.wlpsDialog=true

        var params = {ywcb_id: row.id}
        let that = this
        this.$api.dyghsq.getWljjGh(params).then((res) => {

          this.$nextTick(() => {
            this.form.jj_addr = res.body.rkrwcbdto.jj_addr
            this.form.sj_cfck_dz = res.body.rkrwcbdto.sj_cfck_dz
            this.form.jj_user_name = res.body.rkrwcbdto.jj_user_name
            this.form.jj_mobile = res.body.rkrwcbdto.jj_mobile
            this.form.jjrssqx = []
            this.form.sjrssqx = []
            if(res.body.rkrwcbdto.jjrsf!=undefined && res.body.rkrwcbdto.jjrsf!=null && res.body.rkrwcbdto.jjrsf!=''){
              this.form.jjrsf = res.body.rkrwcbdto.jjrsf
              this.form.jjrssqx.push(res.body.rkrwcbdto.jjrsf)
            }else{
              this.form.jjrsf = "福建省"
              this.form.jjrssqx.push("福建省")
            }
            if(res.body.rkrwcbdto.jjrcs!=undefined && res.body.rkrwcbdto.jjrcs!=null && res.body.rkrwcbdto.jjrcs!=''){
              this.form.jjrcs = res.body.rkrwcbdto.jjrcs
              this.form.jjrssqx.push(res.body.rkrwcbdto.jjrcs)
            }else{
              this.form.jjrcs = "厦门市"
              this.form.jjrssqx.push("厦门市")
            }
            if(res.body.rkrwcbdto.jjrqx!=undefined && res.body.rkrwcbdto.jjrqx!=null && res.body.rkrwcbdto.jjrqx!=''){
              this.form.jjrqx = res.body.rkrwcbdto.jjrqx
              this.form.jjrssqx.push(res.body.rkrwcbdto.jjrqx)
            }else{
              this.form.jjrqx = "思明区"
              this.form.jjrssqx.push("思明区")
            }

            if(res.body.rkrwcbdto.sjrsf!=undefined && res.body.rkrwcbdto.sjrsf!=null && res.body.rkrwcbdto.sjrsf!=''){
              this.form.sjrsf = res.body.rkrwcbdto.sjrsf
              this.form.sjrssqx.push(res.body.rkrwcbdto.sjrsf)
            }else{
              this.form.jjrsf = "福建省"
              this.form.sjrssqx.push("福建省")
            }
            if(res.body.rkrwcbdto.sjrcs!=undefined && res.body.rkrwcbdto.sjrcs!=null && res.body.rkrwcbdto.sjrcs!=''){
              this.form.sjrcs = res.body.rkrwcbdto.sjrcs
              this.form.sjrssqx.push(res.body.rkrwcbdto.sjrcs)
            }else{
              this.form.sjrcs = "厦门市"
              this.form.sjrssqx.push("厦门市")
            }
            if(res.body.rkrwcbdto.sjrqx!=undefined && res.body.rkrwcbdto.sjrqx!=null && res.body.rkrwcbdto.sjrqx!=''){
              this.form.sjrqx = res.body.rkrwcbdto.sjrqx
              this.form.sjrssqx.push(res.body.rkrwcbdto.sjrqx)
            }else{
              this.form.sjrqx = "思明区"
              this.form.sjrssqx.push("思明区")
            }



            that.$api.dyghsq.getWljjSjrListGh(params).then((res) => {

              that.$nextTick(() => {
                that.sjrArry = res.body.default.jjrlist
                if(that.sjrArry.length>=1){
                  that.form.sj_user_id = that.sjrArry[0].id
                  that.form.sj_user_name = that.sjrArry[0].text
                  that.form.sj_mobile = that.sjrArry[0].phone

                }
              })
            })
          })
        })
      },
      pdcx (row) {
        this.$confirm('确定是否撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          }
          if(row.crklx =='2'){
            this.$api.dyghsq.cancelPdDy(params).then((res) => {
              if (res.success === 'true') {
                this.$message({message: '操作成功，正在执行撤销', type: 'success'})
              } else {
                this.$message({message: res.message, type: 'error'})
              }
              this.findTable()
            })
          }else{
            this.$api.dyghsq.cancelPd(params).then((res) => {
              if (res.success === 'true') {
                this.$message({message: '操作成功，正在执行撤销', type: 'success'})
              } else {
                this.$message({message: res.message, type: 'error'})
              }
              this.findTable()
            })
          }

        })
      },
      pdqzcx (row) {
        this.$confirm('确定是否强制撤销派单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            zrwdh: row.zrwdh
          }

          if(row.crklx =='2'){
              this.$api.dyghsq.qzCancelPdDy(params).then((res) => {
                if (res.success === 'true') {
                  this.$message({message: '强制撤销成功', type: 'success'})
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
                this.findTable()
              })
          }else{
             this.$api.dyghsq.qzCancelPd(params).then((res) => {
               if (res.success === 'true') {
                 this.$message({message: '强制撤销成功', type: 'success'})
               } else {
                 this.$message({message: res.message, type: 'error'})
               }
               this.findTable()
             })
          }


        })
      },
      pdjj (row, type) {
        if (type === 'jj') {
          this.jjczShow = true
          this.jjylShow = false
        } else {
          this.jjczShow = false
          this.jjylShow = true
        }
         this.wlpdxx={}
         this.txrylist=[]
         this.wzxxlist=[]
        this.ywcbid = row.id
        this.crklx = row.crklx
        if(row.crklx=='1'){
          this.diglogTitle = '取件交接清单'
        }else{
          this.diglogTitle = '出库交接清单'
        }
        var param = {
          id: row.id
        }
        this.$api.dyghsq.getWlpdInfo(param).then((res) => {
          this.$nextTick(() => {

            this.wlpdxx = res.body.wlpdxx
            this.pdjjDialog = true
          })
        })
        this.$api.dyghsq.getWlpdTxryxx(param).then((res) => {
          this.$nextTick(() => {

            if (Object.keys(res.body.default).length != 0) {
                          this.txrylist = res.body.default.dataset
                          this.showTxry = true
                        }else{
                            this.txrylist = []
                            this.showTxry = false
                        }
          })
        })
        this.$api.dyghsq.queryWlpdJjWzxx(param).then((res) => {
          this.$nextTick(() => {
            this.wzxxlist = res.body.default.dataset
          })
        })
      },
      saveWplsxx() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.jjrssqx = ''
            this.form.sjrssqx = ''
            let params = Object.assign({}, this.form)
            debugger
            if (params.iswl) {
              params.iswl = '1'
            } else {
              params.iswl = '0'
            }
            this.$api.dyghsq.saveGhsqWzxx(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.findTable()
                this.wlpsDialog = false;
                this.form.jjrssqx = []
                this.form.sjrssqx=[]
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
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
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
        this.searchList()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ywzb_id: this.formInline.id
        };
        this.$api.dyghsq.queryYwcb(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
          var that = this
          this.tableData.forEach(function (c) {
            var param2 = {
              ywcb_id: c.id
            };
            that.$api.dyghsq.queryWzmx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })

      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.dyghsq.queryWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      formatJjzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '未交接'
        } else if (cellValue == '1') {
          returnValue = '已交接'
        } else if (cellValue == '2') {
          returnValue = '已退回'
        }
        return returnValue;
      },
      formatWlps(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '否'
        } else if (cellValue == '1') {
          returnValue = '是'
        }
        return returnValue;
      },
      formatYwlx(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '1') {
          returnValue = '归还'
        } else if (cellValue == '2') {
          returnValue = '调用'
        }
        return returnValue;
      },
      formatRwzt(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '0') {
          returnValue = '初始状态'
        } else if (cellValue == '1') {
          returnValue = '任务开始'
        }else if (cellValue == '2') {
          returnValue = '物流配送中'
        }else if (cellValue == '3') {
          returnValue = '调用完成'
        }else if (cellValue == '4') {
          returnValue = '归还中'
        }else if (cellValue == '5') {
          returnValue = '已归还'
        }else if (cellValue == '9') {
          returnValue = '已完成'
        }
        return returnValue;
      },
      formatState (row, column, cellValue, index) {
        var returnValue = cellValue
        if (cellValue === '0') {
          returnValue = '待提交'
        } else if (cellValue === '1') {
          returnValue = '已提交'
        } else if (cellValue === '2') {
          returnValue = '已接单'
        } else if (cellValue === '3') {
          returnValue = '配载中'
        } else if (cellValue === '4') {
          returnValue = '已签收'
        } else if (cellValue === '5') {
          returnValue = '已回单'
        } else if (cellValue === '6') {
          returnValue = '撤销中'
        } else if (cellValue === '7') {
          returnValue = '已撤销'
        } else if (cellValue === '8') {
          returnValue = '撤销失败'
        }
        return returnValue
      },
      changeWlps() {

        if(this.dialogTableVisible==false){
          this.dialogTableVisible=true
        }
        else if(this.dialogTableVisible==true){
          this.dialogTableVisible=false
        }

      }
    }
  }
</script>
