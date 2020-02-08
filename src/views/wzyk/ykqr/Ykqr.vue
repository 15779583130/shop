<style lang="less" scoped>
  @import '../../../styles/common.less';
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
          <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            移库确认
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :model="formInline" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
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
                    <el-form-item label="申请日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.sqsjq" type="date" placeholder="请输入日期起" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.sqsjz" type="date" placeholder="请输入日期止" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;">
                    <el-form-item label="" class="id-button">
                      <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询</el-button>
                      <el-button type="default" icon="el-icon-refresh-right" size="mini" @click="reset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="form-line" v-show="more">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="嫌疑人">
                      <el-input v-model="formInline.xyr" placeholder="请输入嫌疑人" size="mini" clearable @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请人">
                      <el-input v-model="formInline.sqrxm" placeholder="请输入申请人" size="mini" clearable
                                @keyup.enter.native="onSubmit">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="接收日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.jsqrsjq" type="date" placeholder="请输入日期起" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker v-model="formInline.jsqrsjz" type="date" placeholder="请输入日期止" format="yyyy-MM-dd"
                                        value-format="yyyyMMdd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;"></el-col>
                  <el-form-item label="状态">
                    <el-select v-model="formInline.ykzt" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <el-dialog title="填写意见" :visible.sync="jsqrDialog" :append-to-body="true" :modal="true" width="30%" style="">
        <el-form :model="jsyjform" ref="jsyjform" :rules="jsyjRules" size="mini" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="cztitle" prop="jsczyj">
                <el-input type="textarea" v-model="jsyjform.jsczyj" size="mini" placeholder="请输入意见" :rows="6" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="保管中心" prop="kyck" class="large" v-if="this.jsyjform.type==='js'">
                <el-select v-model="jsyjform.kyck" placeholder="请选择保管中心" style="width: 100%" size="mini">
                  <el-option v-for="item in kyckArry" :key="item.id" :label="item.ckjc" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="jsqr()">提交</el-button>
          <el-button @click="jsqrDialog = false" size="mini">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="物流配送信息"
        :visible.sync="wlpsDialog"
        :append-to-body="true"
        :modal="true"
        width="60%"
        style="">
        <el-form :model="form" ref="wplsform" label-width="100px" :rules="wplsFormRules" size="mini"
                 label-position="right">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="cztitle" prop="jsczyj">
                <el-input type="textarea" v-model="form.jsczyj" style="width: 665px"></el-input>
              </el-form-item>
              <el-form-item label="保管中心" prop="kyck">
                <el-select v-model="form.kyck" placeholder="请选择保管中心" style="width: 665px" size="mini" @change="changeCk">
                  <el-option v-for="item in kyckArry" :key="item.id" :label="item.ckmc" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider ></el-divider>
            </el-col>
            <el-col :span="7">
              <el-form-item label="寄件人姓名" prop="jj_user_id">
                <el-select v-model="form.jj_user_id" placeholder="请选择收件人" style="width: 100%" size="mini"
                           @change="changeJjr">
                  <el-option v-for="item in jjrArry" :key="item.id" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="寄件电话" prop="jj_mobile">
                <el-input v-model="form.jj_mobile" size="mini" placeholder="请输入寄件电话" ></el-input>
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
              <el-form-item label="寄件地址" prop="jj_addr" style="width:765px">
                <el-input v-model="form.jj_addr" size="mini" placeholder="请输入寄件地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider ></el-divider>
            </el-col>
            <div v-if="!sfdsfck">
              <el-col :span="7">
                <el-form-item label="收件人姓名" prop="sj_user_id">
                  <el-select v-model="form.sj_user_id" placeholder="请选择收件人" style="width:100%" size="mini"
                             @change="changeSjr">
                    <el-option v-for="item in sjrArry" :key="item.id" :label="item.text" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收件电话" prop="sj_mobile">
                  <el-input v-model="form.sj_mobile" size="mini" placeholder="请输入收件电话" ></el-input>
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
                <el-form-item label="收件地址" prop="sj_cfck_dz"  style="width:765px">
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
            <el-button type="primary" size="mini" @click="jsqr()">确认</el-button>
            <el-button @click="wlpsDialog = false" size="mini">取消</el-button>
          </span>
      </el-dialog>
      <el-col :span="24">
        <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}" tooltip-effect="dark"
                  border style="width: 100%" size="mini" @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table ref="multipleTable" :data="scope.row.wzmxTableData" :header-cell-style="{background:'#e6e6e6'}"
                        tooltip-effect="dark" style="width: 100%" size="mini" border>

                <el-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="200px">
                    <template slot-scope="scope">
                    <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="wzsl" label="数量及单位" width="200px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzlb" label="物证类别" width="200px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="wzbh" label="物证编号" width="350px" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" min-width="200px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true" min-width="200px">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="handlerByName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="附件" :show-overflow-tooltip="true" min-width="50px" align="center">
            <template slot-scope="scope">
              <span class="el-icon el-icon-folder" @click="openFile(scope.row)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="zrwdh" label="任务单号" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
          <el-table-column prop="xyr" label="嫌疑人" :show-overflow-tooltip="true" width="80px"></el-table-column>
          <el-table-column prop="sqsj" label="申请时间" min-width="160px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="sqrxm" label="申请人" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
          <el-table-column prop="sqbmmc" label="申请部门" :show-overflow-tooltip="true" width="200px"></el-table-column>
          <el-table-column prop="jsqrsj" label="接收时间" min-width="160px" :show-overflow-tooltip="true" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="sfwlps" label="是否物流派送" min-width="160px" :show-overflow-tooltip="true" :formatter='formatWlps'></el-table-column>
          <el-table-column prop="ykzt" label="状态" width="80px" :formatter='formatykzt'></el-table-column>
          <el-table-column label="操作" width="100px" fixed="right" align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.ykzt=='1'" v-access id="ykqrQrsq" class="el-icon-finished" style="font-size: 20px;" title="接收" @click="jsClick(scope.row)"></i>
              <i v-if="scope.row.ykzt=='1'" v-access id="ykqrBack" class="iconfont icon-tuihui" title="退回" style="font-size: 20px;" @click="thClick(scope.row)"></i>
              <!--<i v-if="scope.row.ykzt=='1'" class="el-icon-edit-outline" style="font-size: 20px;" title="操作" @click="editClick(scope.row)"></i>-->
              <i v-if="scope.row.ykzt!='1'" v-access id="ykqrEye" class="el-icon-view" style="font-size: 20px;" title="查看" @click="editClick(scope.row)"></i>
            </template>
            <!--<template slot-scope="scope">-->
              <!--<i class="el-icon-finished" style="font-size: 20px;cursor: pointer" @click="jsClick(scope.row)" title="接收"></i>-->
              <!--<i class="iconfont icon-tuihui" style="font-size: 20px;cursor: pointer" @click="thClick(scope.row)" title="退回"></i>-->
              <!--<i class="el-icon-edit-outline" style="font-size: 20px;cursor: pointer" @click="editClick(scope.row)" title="操作"></i>-->
            <!--</template>-->
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="page-content">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                           :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <upload-file @passData="getData" :yssqid="this.qrid" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>

<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
  import {
    timeFormat,
    timeCompare
  } from '../../../utils/datetime'

  export default {
    name: 'entryRegistration',
    components: {
      casePreview,
      uploadFile
    },
    data() {
      return {
        qrid:'',
        isView:true,
        dialogUpLoad: false,
        getFileData: false,
        cztitle:'接收意见',
        cztype:'js',
        isWl:'0',
        sfdsfck:false,
        kyckArry: [],
        sjrArry:[],
        deptid:JSON.parse(sessionStorage.getItem('sessionInfo')).dept_id,
        form: {
          id:'',
          kyck:'',
          jsczyj:'',//意见
          yscbids:'',
          ids: '',
          rkyy: '',
          bgqx: '99991231',
          bgzx: '',
          yyfs: '9',
          jj_dept_name:'',
          jj_addr:'',
          jj_user_id: '',
          jj_user_name: '',
          jj_mobile: '',
          jjrsf: '福建省',
          jjrcs: '厦门市',
          jjrqx: '思明区',
          sj_user_name: '',
          sj_user_id:'',
          sj_mobile: '',
          sjrsf: '福建省',
          sjrcs: '厦门市',
          sjrqx: '思明区',
          sj_cfck_dz: '',
          sssjj_cfck_name:'',
          yyqj_ks: '',
          yyqj_js: '',
          checkArrLen: 0,
          jjrssqx:[],
          sjrssqx:[]
        },
        sjrArry:[],
        jjrArry:[],
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
        wplsFormRules: {
          kyck:[
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          jsczyj:[
            {min: 0, max: 500, message: '最多可输入500个字符'},
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          jj_user_id:[
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
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
          ]
        },
        formInline: {
          ajbh: '',
          ajmc: '',
          sqsjq: '',
          sqsjz: '',
          sqrxm: '',
          xyr: '',
          ykzt: '1',
          jsqrsjq: '',
          jsqrsjz: ''
        },
        jsqrDialog: false,
        jsyjform: {
          jsczyj: '',
          yscbids: '',
          type: '',
          kyck:'',
        },
        jsyjRules: {
          jsczyj: [
            {min: 0, max: 500, message: '最多可输入500个字符',trigger:'blur'},
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          kyck:[ {required: true, message: '这是必填字段', trigger: 'blur'}]
        },
        dialogVisible: false,
        options: [{
          value: '1',
          label: '待确认'
        },
          {
            value: '2',
            label: '已接收'
          },
          {
            value: '3',
            label: '已退回'
          }
        ],
        leftList: [],
        value1: new Date(),
        value2: new Date(),
        total: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        multipleSelection: [],
        more: false,
        centerDialogVisible: false,
        wzxx_id: '',
        wlpsDialog: false,
        wlpsDisabled: false,
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
        this.selectCfck();
        this.findTable();
      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },
      // 设置手机号的验证规则
      checkPhone(rule, value, callback) {
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
      changeCk(val){
        let that = this;
        let param = {
          sjck_id:val
        };
        this.form.kyck =val
        this.form.sj_user_id =''
        this.form.sj_mobile =''
        this.$api.ykqr.getWljjSjrList(param).then((res) => {
          this.sjrArry = res.body.default.sjrlist
          this.$nextTick(() => {
            this.sjrArry = res.body.default.sjrlist||[]
            if(this.sjrArry.length>=1){
              this.form.sj_user_id = this.sjrArry[0].id
              this.form.sj_user_name = this.sjrArry[0].text
              this.form.sj_mobile = this.sjrArry[0].phone
            }
          })
        })
        this.$api.ykqr.getSjWljj(param).then((res) => {
          this.$nextTick(() => {
            this.form.sj_cfck_dz = res.body.sjdata.sj_cfck_dz
            this.form.sjrssqx = []
            if(res.body.sjdata.sjrsf!=undefined && res.body.sjdata.sjrsf!=null && res.body.sjdata.sjrsf!=''){
              this.form.sjrsf = res.body.sjdata.sjrsf
              this.form.sjrssqx.push(res.body.sjdata.sjrsf)
            }else{
              this.form.sjrsf = "福建省"
              this.form.sjrssqx.push("福建省")
            }
            if(res.body.sjdata.sjrcs!=undefined && res.body.sjdata.sjrcs!=null && res.body.sjdata.sjrcs!=''){
              this.form.sjrcs = res.body.sjdata.sjrcs
              this.form.sjrssqx.push(res.body.sjdata.sjrcs)
            }else{
              this.form.sjrcs = "厦门市"
              this.form.sjrssqx.push("厦门市")
            }
            if(res.body.sjdata.sjrqx!=undefined && res.body.sjdata.sjrqx!=null && res.body.sjdata.sjrqx!=''){
              this.form.sjrqx = res.body.sjdata.sjrqx
              this.form.sjrssqx.push(res.body.sjdata.sjrqx)
            }else{
              this.form.sjrqx = "思明区"
              this.form.sjrssqx.push("思明区")
            }
            this.wlpsDialog = true;
          })
        })
      },
      handleChangeSsx(value){
        this.form.jjrsf = value[0]
        this.form.jjrcs =  value[1]
        this.form.jjrqx =  value[2]
      },
      selectCfck() {
        var param = {
          ky_dept_id : this.deptid
        }
        this.$api.ykqr.selectCfck(param).then((res) => {
          this.kyckArry = res.body.default.list
        })
      },
      handleChangeSjrSsx(value){
        this.form.sjrsf = value[0]
        this.form.sjrcs =  value[1]
        this.form.sjrqx =  value[2]
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
      editClick(row) {
        var params = {
          ywcb_id: row.ywcb_id
        }
       this.$api.ykqr.infoEdit(params).then((res) => {
          this.$nextTick(() => {
            sessionStorage.removeItem('wzykjsqr')
            sessionStorage.setItem('wzykjsqr', JSON.stringify(res.body.default))
            this.$router.push({
              name: 'jsqrDetail',
              params: res.body.default
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
        let timeComp = timeCompare(this.formInline.sqsjq, this.formInline.sqsjz)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }

        let timeComp1 = timeCompare(this.formInline.jsqrsjq, this.formInline.jsqrsjz)
        if (!timeComp1.status) {
          this.$message(timeComp1.msg)
          return false
        }
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          ajbh: this.formInline.ajbh,
          ajmc: this.formInline.ajmc,
          sqsjq: this.formInline.sqsjq == null ? '' : this.formInline.sqsjq,
          sqsjz: this.formInline.sqsjz == null ? '' : this.formInline.sqsjz,
          sqrxm: this.formInline.sqrxm,
          xyr: this.formInline.xyr,
          ykzt: this.formInline.ykzt,
          jsqrsjq: this.formInline.jsqrsjq == null ? '' : this.formInline.jsqrsjq,
          jsqrsjz: this.formInline.jsqrsjz == null ? '' : this.formInline.jsqrsjz
        };
       this.$api.ykqr.queryTable(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset||[];
          var that = this
          this.tableData.forEach(function(c) {
            var param2 = {
              ywcb_id: c.ywcb_id
            };
            that.$api.ykqr.querywzxx(param2).then((res) => {
              c.wzmxTableData = res.body.default.dataset
            })
          })
        })
      },
      formatykzt(row, column,cellValue,index) {
        var value = '';
        if (cellValue == '1') {
          value = '待确认'
        } else if (cellValue == '2') {
          value = '已接收'
        }else if(cellValue == '3'){
          value = '已退回'
        }
        return value;
      },
      formatWlps(row, column,cellValue,index) {
        var value = '';
        if (cellValue == '1') {
          value = '是'
        } else if (cellValue == '0') {
          value = '否'
        }
        return value;
      },
      reset() {
        this.formInline.ajbh = '';
        this.formInline.ajmc = '';
        this.formInline.sqsjq = '';
        this.formInline.sqsjz = '';
        this.formInline.sqrxm = '';
        this.formInline.xyr = '';
        this.formInline.ykzt = '1';
        this.formInline.jsqrsjq = '';
        this.formInline.jsqrsjz = '';
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
      },
      openFile(row){
        this.qrid = row.ywzb_id
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
      jsClick(row) {
        let obj={
          id:'',
            kyck:'',
            jsczyj:'',//意见
            yscbids:'',
            ids: '',
            rkyy: '',
            bgqx: '99991231',
            bgzx: '',
            yyfs: '9',
            jj_dept_name:'',
            jj_addr:'',
            jj_user_id: '',
            jj_user_name: '',
            jj_mobile: '',
            jjrsf: '福建省',
            jjrcs: '厦门市',
            jjrqx: '思明区',
            sj_user_name: '',
            sj_user_id:'',
            sj_mobile: '',
            sjrsf: '福建省',
            sjrcs: '厦门市',
            sjrqx: '思明区',
            sj_cfck_dz: '',
            sssjj_cfck_name:'',
            yyqj_ks: '',
            yyqj_js: '',
            checkArrLen: 0,
            jjrssqx:[],
            sjrssqx:[]
        }
        this.form = obj
        //重置表单数据
        this.jsyjform.kyck = '';
        this.form.kyck = '';
        if (this.$refs['jsyjform'] !== undefined) {
          this.$refs['jsyjform'].resetFields();
          this.$refs['jsyjform'].clearValidate();
        }
        if (this.$refs['wplsform'] !== undefined) {
          this.$refs['wplsform'].resetFields();
          this.$refs['wplsform'].clearValidate();
        }
        this.cztitle = '接收意见'
        this.cztype = 'js'
        if(row.sfwlps==='1'){
          this.iswl='1'
          this.form.yscbids =  row.ywcb_id
          this.jsyjform.type = 'js'
          this.sjrArry =[];
          let param = {
            jjck_id:row.jjck_id
          };
          let that = this
          this.$api.ykqr.getWljj(param).then((res)=>{
            this.form.jj_addr = res.body.rkrwcbdto.jj_addr
            this.form.sj_cfck_dz = res.body.rkrwcbdto.sj_cfck_dz
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
          })
          this.$api.ykqr.getWljjJjrList(param).then((res) => {
            this.$nextTick(()=>{
              this.jjrArry = res.body.default.jjrlist||[]
              if(this.jjrArry.length>=1){
                this.form.jj_user_id = this.jjrArry[0].id
                this.form.jj_user_name = this.jjrArry[0].text
                this.form.jj_mobile = this.jjrArry[0].phone
              }
            })
          })
          this.wlpsDialog = true;
        }else if(row.sfwlps==='0'){
          this.iswl='0'
          this.jsyjform.jsczyj = '';
          this.jsyjform.yscbids = row.ywcb_id
          this.jsyjform.type = 'js'
          this.jsqrDialog = true;
        }
      },
      changeSjr(selVal) {
        let obj = {}
        obj = this.sjrArry.find(
          item => {
            if (selVal == item.id) {
              return item //筛选出对应数据
            }
          }
        )
        this.form.sj_user_name = obj.text
        this.form.sj_mobile = obj.phone
      },
      changeJjr(selVal){
        let obj = {}
        obj = this.jjrArry.find(
          item => {
            if (selVal == item.id) {
              return item //筛选出对应数据
            }
          }
        )
        this.form.jj_user_name = obj.text
        this.form.jj_mobile = obj.phone
      },
      thClick(row) {
        //重置表单数据
        if (this.$refs['jsyjform'] !== undefined) {
          this.$refs['jsyjform'].resetFields();
          this.$refs['jsyjform'].clearValidate();
        }
        this.cztype = 'th'
        this.cztitle = '退回意见'
        this.jsqrDialog = true;
        this.jsyjform.jsczyj = '';
        this.jsyjform.yscbids = row.ywcb_id
        this.jsyjform.type = 'th'
      },
      jsqr() {
        if(this.cztype=='js'){
          if(this.iswl==='0'){
            this.$refs.jsyjform.validate((valid) => {
              if (valid) {
                var params = {
                  ywcbids: this.jsyjform.yscbids,
                  jsczyj: this.jsyjform.jsczyj,
                  kyck:this.jsyjform.kyck
                }
                if (this.jsyjform.type == 'js') {
                  this.$api.ykqr.jieshouYsxxcb(params).then((res) => {
                    if (res.success == 'true') {
                      this.$message({
                        message: res.message,
                        type: 'success'
                      })
                      this.jsqrDialog = false;
                      this.findTable()
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'error'
                      })
                    }
                  })
                } else {
                  this.$api.ykqr.tuihuiYsxxcb(params).then((res) => {
                    if (res.success == 'true') {
                      this.$message({
                        message: res.message,
                        type: 'success'
                      })
                      this.jsqrDialog = false;
                      this.findTable()
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'error'
                      })
                    }
                  })
                }
              }
            })
          }else if(this.iswl==='1'){
            this.$refs.wplsform.validate((valid) => {
              if (valid) {
                var param = {
                  ywcbids: this.form.yscbids,
                  jsczyj: this.form.jsczyj,
                  kyck:this.form.kyck
                }
                let params = {};
                delete this.form.sjrssqx
                delete this.form.jjrssqx
                Object.assign(params, param, this.form)
                if (this.cztype == 'js') {
                  this.$api.ykqr.jieshouYsxxcb(params).then((res) => {
                    if (res.success == 'true') {
                      this.$message({
                        message: res.message,
                        type: 'success'
                      })
                      this.wlpsDialog =  false;
                      this.jsqrDialog = false;
                      this.findTable()
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'error'
                      })
                    }
                  })
                } else if(this.cztype=='th'){
                  this.$api.ykqr.tuihuiYsxxcb(param).then((res) => {
                    if (res.success == 'true') {
                      this.$message({
                        message: res.message,
                        type: 'success'
                      })
                      this.wlpsDialog =  false;
                      this.jsqrDialog = false;
                      this.findTable()
                    } else {
                      this.$message({
                        message: res.message,
                        type: 'error'
                      })
                    }
                  })
                }
              }
            })
          }
        }else if(this.cztype=='th'){
          var param = {
            ywcbids: this.jsyjform.yscbids,
            jsczyj: this.jsyjform.jsczyj,
            kyck:this.jsyjform.kyck
          }
          this.$refs.jsyjform.validate((valid) => {
            if(valid){
              this.$api.ykqr.tuihuiYsxxcb(param).then((res) => {
                if (res.success == 'true') {
                  this.$message({
                    message: res.message,
                    type: 'success'
                  })
                  this.wlpsDialog =  false;
                  this.jsqrDialog = false;
                  this.findTable()
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              })
            }
          })
        }
      }
    }
  }
</script>
