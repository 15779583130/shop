<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../../styles/deep-ele.less';
  @import '../../page-main';
  .myitem .el-form-item__label{
    width: 100px !important;
    margin-left: -30px !important;
  }
  .mydialog .el-input {
    min-width:180px !important;
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
            最终处置登记
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <!--上方搜索条件-->
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
            <span :class="[ 'hide', {'open': more }]" @click="more = !more"></span>
            <div class="form-panel">
              <el-form ref="form" :model="filters" size="mini" :inline="true">
                <el-row class="form-line">
                  <el-col :span="19" style="display: flex;">
                    <el-form-item label="案件编号" prop="ajbh">
                      <el-input v-model="filters.ajbh" placeholder="请输入案件编号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="案件名称" prop="ajmc">
                      <el-input v-model="filters.ajmc" placeholder="请输入案件名称" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置日期">
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.czsjq"
                          type="date"
                          placeholder="请输入日期起" size="mini" format="yyyy-MM-dd" style="width: 160px"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" style="display: flex;">
                        <i class="text">-</i>
                      </el-col>
                      <el-col :span="10" style="display: flex;">
                        <el-date-picker
                          v-model="filters.czsjz"
                          type="date"
                          placeholder="请输入日期止" size="mini" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" style="width: 160px">
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
                    <el-form-item label="申请人" prop="sqrxm">
                      <el-input v-model="filters.sqrxm" placeholder="请输入申请人" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置单号" prop="rwdh">
                      <el-input v-model="filters.rwdh" placeholder="请输入处置单号" size="mini" clearable
                                @keyup.enter.native="findTable">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="处置状态" prop="czzt">
                      <el-select v-model="filters.czzt" placeholder="请选择">
                        <el-option value="1" label="待处置"></el-option>
                        <el-option value="2" label="已处置"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" style="text-align: right;"></el-col>
<!--                  <el-form-item label="登记状态" prop="fmshzt">-->
<!--                      <el-select v-model="filters.fmshzt" placeholder="请选择">-->
<!--                        <el-option value="0" label="待提交"></el-option>-->
<!--                        <el-option value="1" label="已提交"></el-option>-->
<!--                        <el-option value="2" label="已登记"></el-option>-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
                  <el-form-item label="当前状态" prop="czjd">
                    <el-select v-model="filters.czjd" placeholder="请选择">
                      <el-option value="0" label="提交财政"></el-option>
                      <el-option value="1" label="经办审核"></el-option>
                      <el-option value="2" label="科长审核"></el-option>
                      <el-option value="3" label="分管领导审核"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="财政审核" prop="fmshzt">
                    <el-select v-model="filters.fmshzt" placeholder="请选择">
                      <el-option value="1" label="审核通过"></el-option>
                      <el-option value="2" label="审核驳回"></el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
      <!--table-->
      <el-col :span="24">
        <el-table ref="multipleTable" :data="djtableData" :header-cell-style="{background:'#e6e6e6'}"
                  tooltip-effect="dark" border style="width: 100%" size="mini"  @cell-dblclick="show">
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(pageinfo.pagenum - 1) * pageinfo.pagesize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ajbh" label="案件编号" :show-overflow-tooltip="true" min-width="200px"></el-table-column>
          <el-table-column prop="ajmc" label="案件名称" min-width="150px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span style="color:#5287d8" @click="caseName(scope.row)">{{ scope.row.ajmc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lsh" label="处置流水号" :show-overflow-tooltip="true" min-width="120px"></el-table-column>
          <el-table-column prop="zrwdh" label="处置单号" :show-overflow-tooltip="true" min-width="180px"></el-table-column>
          <el-table-column prop="sqyy" label="处理方式" :show-overflow-tooltip="true" :formatter="czyyFormat" width="100px"></el-table-column>
          <el-table-column prop="sqrxm" label="申请人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="shrxm" label="单位审核人" :show-overflow-tooltip="true" min-width="100px"></el-table-column>
          <el-table-column prop="czzt" label="处置状态" :show-overflow-tooltip="true" :formatter="ztFormat" width="100px"></el-table-column>
          <el-table-column prop="czjd" label="当前状态" :show-overflow-tooltip="true" width="100px" :formatter="czjdFormat"></el-table-column>
          <el-table-column prop="fmshzt" label="财政审核" :show-overflow-tooltip="true" width="100px" :formatter="czshFormat"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100px">
            <template slot-scope="scope">
              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" id="zzczdjModify" v-if="((scope.row.fmshzt === '' || (scope.row.fmshzt ==='2'&&scope.row.czjd==='1'))&&scope.row.sqr_id===userId)" @click="edit(scope.row)" title="登记"></i>
<!--              <i class="el-icon-edit" style="font-size: 20px;cursor: pointer" id="zzczdjModify" v-if="scope.row.czzt==='1'&&scope.row.sqr_id===userId" @click="edit(scope.row)" title="登记"></i>-->
              <i class="el-icon-view" style="font-size: 20px;cursor: pointer" @click="show(scope.row)" title="详情"></i>
              <i class="el-icon-reading" title="处置流程" style="font-size: 20px;" @click="czlcClick(scope.row)"></i>
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
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :append-to-body="true"
        :modal="true"
        width="70%">
        <el-card class="box-card mydialog" style="background: #f7f7f7">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div
                  style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                  <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                  处置申请信息
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div
                  style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                  <div class="form-panel">
                    <el-form ref="form" :model="dataForm" label-width="110px" label-position="right" :inline="true" size="mini" :rules="dataFormRules">
                      <el-row class="form-line">
                        <el-col :span="8">
                          <el-form-item label="案件编号">
                            <el-input v-model="dataForm.ajbh" size="mini" :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="案件名称">
                            <el-input v-model="dataForm.ajmc" suffix-icon="el-icon-c-scale-to-original"
                                      :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="处置单号">
                            <el-input v-model="dataForm.zrwdh"
                                      :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row class="form-line">
                        <el-col :span="8">
                          <el-form-item label="处置人">
                            <el-input v-model="dataForm.sqrxm" size="mini":readonly="!isEdit" :formatter="dateFormat">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="处理方式">
                            <!--<el-input v-model="dataForm.sqyy" size="mini":readonly="!isEdit">-->
                            <!--</el-input>-->
                            <el-select v-model="dataForm.sqyy" placeholder="请选择" size="mini":disabled="true">
                              <el-option value="01" label="移交公物仓"></el-option>
                              <el-option value="02" label="上缴专管部门"></el-option>
                              <el-option value="03" label="自行处置"></el-option>

                              <!--<el-option value="1" label="拍卖"></el-option>-->
                              <!--<el-option value="2" label="没收"></el-option>-->
                              <!--<el-option value="3" label="销毁"></el-option>-->
                              <!--<el-option value="4" label="发还"></el-option>-->
                              <!--<el-option value="5" label="封存"></el-option>-->
                              <!--<el-option value="6" label="移送"></el-option>-->
                              <!--<el-option value="99" label="其他"></el-option>-->
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="最终登记人">
                            <el-input v-model="dataForm.zzczdjr" size="mini":readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row class="form-line">
                        <el-col :span="8">
                          <el-form-item label="预处理日期">
                            <el-input v-model="dataForm.wzrq" size="mini" :readonly="true">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="最终登记部门" prop="czyj" class="myitem" >
                            <el-input v-model="dataForm.sqbmmc"  size="mini"
                                      :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="最终处置时间" prop="zzczsj" class="myitem" v-if="dataForm.zzczsj">
                            <el-input v-model="dataForm.zzczsj"  size="mini"
                                      :readonly="!isEdit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row class="form-line" style="height: 65px">
                        <el-col :span="24">
                          <el-form-item label="最终处置情况" prop="zzczqk" style="position: relative; top: -10px;">
                            <el-input type="textarea" v-model="dataForm.zzczqk" size="mini" style="width: 480px;resize:none;" resize="none" :readonly="!isEdit" @focus="mychange"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <template v-for="(item,index) in fileTypeList">
                            <el-form-item :label="item.code_desc" label-width="200px" style="height: 40px;text-align: left;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;">
                              <el-button type="success" size="small" @click="dialogUpLoadClick(item.code_value)" plain v-if="isEdit">上传文件</el-button>
                              <el-button type="success" size="small" @click="dialogUpLoadClick(item.code_value)" plain v-if="!isEdit">查看文件</el-button>
                            </el-form-item>
                          </template>
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
                  物证处置清单
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <el-table ref="multipleTable" :data="tableData" :header-cell-style="{background:'#e6e6e6'}"
                        tooltip-effect="dark" border style="width: 100%" size="mini">
                      <el-table-column type="index" label="序号" width="50"></el-table-column>
                      <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true" width="100">
                        <template slot-scope="scope">
                          <span style="color:#5287d8" @click="caseThingName(scope.row.wzxx_id)">{{ scope.row.wzmc }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="wzsl" label="数量及单位" width="100px" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column prop="wzlb" label="物证类别" :show-overflow-tooltip="true" width="100"></el-table-column>
                      <el-table-column prop="jjzt" label="交接状态" :formatter="jjztFormat" :show-overflow-tooltip="true" width="100"></el-table-column>
                      <el-table-column prop="jjsj" label="交接时间" :formatter="dateFormat" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary"  size="mini" @click="submitSp(true)" v-if="isEdit">保存</el-button>
              <el-button  size="mini" @click="dialog = false" v-if="isEdit">关闭</el-button>
              <el-button type="primary" @click="dialog=false" size="mini" v-if="!isEdit">关闭</el-button>
        </span>
      </el-dialog>
      <upload-file @passData="getData" :yssqid="this.zzdjdz" :getFileData="this.getFileData" :display="this.dialogUpLoad" :isView="this.isView"></upload-file>
      <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal" :wzxx_id="this.wzxx_id"></case-preview>
      <el-dialog title="财政审核日志" :visible.sync="czlcDialogVisible" width="60%" :modal="false" style="padding: 0px 5px">
        <div style="">
          <el-table ref="multipleTable" :data="czlcTableData" :header-cell-style="{background:'#e6e6e6'}"
                    tooltip-effect="dark" border style="width: 100%;" size="mini">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span>{{(czlcCurrentPage - 1) * czlcPageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="czjd" label="操作节点"  :show-overflow-tooltip="true" :formatter="czjdFormat"></el-table-column>
            <el-table-column prop="shzt" label="操作状态"  :show-overflow-tooltip="true" :formatter="czshFormat"></el-table-column>
            <el-table-column prop="shry" label="操作用户"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="created_time" label="操作时间" width="150px" :formatter="dateFormat"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="shjg" label="操作结果"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="shyj" label="操作意见" :show-overflow-tooltip="true"></el-table-column>

          </el-table>
          <div class="page">
            <div class="page-content">
              <el-pagination
                background
                @size-change="czlcHandleSizeChange"
                @current-change="czlcHandleCurrentChange"
                :current-page="czlcCurrentPage"
                :page-sizes="[5, 10, 15, 20, 25]"
                :page-size="czlcPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="czlcTotal">
              </el-pagination>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="czlcDialogVisible = false" size="mini">关闭</el-button>
          </span>
      </el-dialog>
    </el-row>
  </el-card>
</template>

<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'
  import casePreview from "../../my-components/casePreview/casePreview"
  import uploadFile from "@/views/my-components/upLoadFile/uploadFile";
  export default {
    name: 'Zzczdj',
    components: {
      casePreview,
      uploadFile
    },
    data() {
      return {
        fileTypeList:[],
        CZFS_FILE_01:[
          {code_value:'01',code_desc:'相关的法律文书'},
          {code_value:'02',code_desc:'实物罚没专用收据'},
          {code_value:'03',code_desc:'无主物认定手续资料'},
          {code_value:'04',code_desc:'质量技术监督部门的检验或鉴定证书'},
          {code_value:'05',code_desc:'交通运输设备无抵押证明'},
          {code_value:'06',code_desc:'质检局特检院的注销证明材料'},
          {code_value:'07',code_desc:'罚没建筑物提交资料'},
          {code_value:'08',code_desc:'实物照片'},
          {code_value:'21',code_desc:'其他提交资料'},
          {code_value:'24',code_desc:'移交清单'},
        ],
        CZFS_FILE_02:[
          {code_value:'09',code_desc:'专管部门接收清单'},
          {code_value:'10',code_desc:'相关法律文书'},
          {code_value:'11',code_desc:'实物罚没专用收据'},
          {code_value:'12',code_desc:'实物照片'},
          {code_value:'22',code_desc:'其他提交资料'},
        ],
        CZFS_FILE_03:[
          {code_value:'13',code_desc:'处置清单'},
          {code_value:'14',code_desc:'销毁记录（含现场照片）'},
          {code_value:'15',code_desc:'相关法律文书'},
          {code_value:'16',code_desc:'实物照片'},
          {code_value:'17',code_desc:'实物罚没专用收据'},
          {code_value:'18',code_desc:'质量技术监督部门的检验或鉴定证书'},
          {code_value:'19',code_desc:'缴款凭证'},
          {code_value:'20',code_desc:'实物照片'},
          {code_value:'23',code_desc:'其他提交资料'},
        ],
        zzdjdz: '',
        isView:false,
        dialogUpLoad: false,
        getFileData: false,
        centerDialogVisible:false,
        wzxx_id:'',
        //搜索条件
        filters: {
          ajbh: '',
          ajmc: '',
          czsjq: '',
          czsjz: '',
          sqrxm: '',
          rwdh: '',
          czzt:'',
          czjd:'',
          fmshzt:''
        },
        //表格
        //分页信息
        pageinfo: {
          pagenum: 1,
          total: 0,
          pagesize:10
        },
        //table
        wzmxTableData: [],
        tableData: [],
        djtableData: [],
        dialogVisible: false,
        more: false,
        userId:JSON.parse(sessionStorage.getItem('sessionInfo')).user_id,
        //dialog
        isEdit:true,
        dialog:false,
        dialogTitle:'最终登记',
        dataForm: {
          id: '',
          ajbh:'',
          ajmc:'',
          zrwdh:'',
          sqrxm:'',
          sqyy:'',
          zzczdjr:'',
          wzrq:'',
          zzczdjbm:'',
          zzczsj:'',
          zzczqk:''
        },
        czlcDialogVisible:false,
        czlcTableData:[],
        czlcCurrentPage:1,
        czlcPageSize:5,
        czlcTotal:0,
        ywzb_id:'',
        dataFormRules: {
          zzczqk: [
            {required: true, message: '这是必填字段',trigger:'blur'},
          ]
        }
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
        if (sessionStorage.getItem('zzczdjSession')) {
          this.filters = JSON.parse(sessionStorage.getItem('zzczdjSession'))
        }
        this.findTable();
      },
      czlcHandleSizeChange(val){
        this.czlcPageSize = val
        this.findCzlcTable()

      },
      czlcHandleCurrentChange(val) {
        this.czlcCurrentPage = val;
        this.findCzlcTable();
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
      czlcClick(row){
        debugger
        this.ywzb_id = row.zrwdh
        this.findCzlcTable()
        this.czlcDialogVisible = true
      },
      findCzlcTable() {

        var param = {
          pagenum: this.czlcCurrentPage,
          pagesize: this.czlcPageSize,
          czdh:this.ywzb_id
        };
        this.czlcTotal = 0
        this.czlcTableData = []
        this.$api.zzczdj.queryFmshrz(param).then((res) => {
          if(Object.keys(res.body).length != 0){
            this.czlcTotal = Number(res.body.default.count);
            this.czlcTableData = res.body.default.dataset;
            debugger
          }else{
            this.czlcTotal = 0
            this.czlcTableData = []
          }

        })
      },
      mychange(){
        this.$refs['form'].clearValidate();
      },
      dialogUpLoadClick (value) {
        // if(value=='1'){
        //   // this.yssqid = this.formInline.id+'fkfj'
        //   this.yssqid = 'testaaa'
        // }else{
        //   // this.yssqid = this.formInline.id+'hffj'
        //   this.yssqid = 'bbb'
        // }
        debugger
        if(this.isEdit){
          this.isView = false
        }else{
          this.isView = true
        }
        this.zzdjdz = this.dataForm.id+''+value
        this.dialogUpLoad = true
        this.getFileData = true
      },
      getData (val) {
        this.dialogUpLoad = val
        this.getFileData = val
      },
      jjztFormat(row, column, cellValue, index) {
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
      submitSp(status){
        this.$refs.form.validate((valid)=>{
          if(valid){
            let param = {
              ywcb_id:this.dataForm.id,
              zzczqk:this.dataForm.zzczqk,
            }
            this.$api.zzczdj.submitSp(param).then((res) => {
              if (res.success == "true") {
                this.dialog = false
                this.findTable()
                this.$message({message: res.message, type: 'success'})
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      caseThingName(wzxx_id) {
        this.wzxx_id = wzxx_id;
        this.centerDialogVisible = true
      },
      getWzmx(row, expandedRows) {
        var param = {
          ywcb_id: row.id
        };
        this.$api.rksq.queryYwcbWzmx(param).then((res) => {
          this.wzmxTableData = res.body.default.dataset;
        })
      },
      wlpsFormat(row, column, cellValue, index) {
        switch (cellValue) {
          case '0':
            return '否'
          case '1':
            return '是'
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      czyyFormat(row, column, cellValue, index) {
        var returnValue = cellValue;
        if (cellValue == '01') {
          returnValue = '移交公物仓'
        } else if (cellValue == '02') {
          returnValue = '上缴专管部门'
        }else if (cellValue == '03') {
          returnValue = '自行处置'
        }
        return returnValue;
      },
      caseName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
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
        debugger;
        let timeComp = timeCompare(this.filters.begin_time, this.filters.end_time)
        if (!timeComp.status) {
          this.$message(timeComp.msg)
          return false
        }
        var param = {};
        Object.assign(param, this.pageinfo, this.filters)
        this.$api.zzczdj.queryTable(param).then((res) => {
          this.pageinfo.total = Number(res.body.default.count);
          this.djtableData = res.body.default.dataset;
          debugger;
        })
      },
      reset() {
        var obj={
          ajbh: '',
          ajmc: '',
          czsjq: '',
          czsjz: '',
          sqrxm: '',
          rwdh: '',
          czzt:'',
          czjd:'',
          fmshzt:''
        }
        this.filters = obj;
      },
      dateFormat(row, column, cellValue, index) {
        return cellValue = timeFormat(cellValue)
      },
      ztFormat(row, column, cellValue, index) {
        var value = '';
        if (cellValue == '1') {
          value = '待处置'
        } else if (cellValue == '2') {
          value = '已处置'
        }
        return value;
      },
      czjdFormat(row, column, cellValue, index){
        var value = '';
        if (cellValue == '0') {
          value = '提交财政'
        } else if (cellValue == '1') {
          value = '经办审核'
        }else if (cellValue == '2') {
          value = '科长审核'
        }else if(cellValue == '3'){
          value = '分管领导审核'
        }else {
          value = '单位已审核'
        }
        return value;
      },
      czshFormat(row,column,cellValue,index){
        var value = '';
        if (cellValue == '1') {
          value = '审核通过'
        }else if (cellValue == '2') {
          value = '审核驳回'
        }
        return value;
      },
      djshFormat(row, column, cellValue, index) {
        var value = '';
        if (cellValue == 0) {
          value = '待提交'
        } else if (cellValue == '1') {
          value = '已提交'
        }else if (cellValue == '2') {
          value = '已登记'
        }
        return value;
      },


      show(row){
        //重置表单数据
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
          this.$refs['form'].clearValidate();
        }
        // this.dat
        // let obj ={required: true, message: '这是必填字段',trigger:'blur'}
        // this.dataFormRules.zzczqk = obj
        this.fileTypeList = []
        this.isEdit = false;
        var param = {
          ywcb_id:row.id,
          is_edit:this.isEdit
        }
        this.findqdTable(row.id)
        this.$api.zzczdj.getInfo(param).then((res) => {
          this.dataForm = res.body.default
          this.dataForm.wzrq = timeFormat(res.body.default.wzrq)
          this.dataForm.zzczsj = timeFormat(res.body.default.zzczsj)
          // this.dataForm.czr_name = res.body.default.czr_name
          // this.dataForm.czyj = res.body.default.czyj
          // this.dataForm.czsj = timeFormat(res.body.default.czsj)
          if(this.dataForm.sqyy === '01'){
            this.fileTypeList = this.CZFS_FILE_01
          }else if(this.dataForm.sqyy === '02'){
            this.fileTypeList = this.CZFS_FILE_02
          }else if(this.dataForm.sqyy === '03'){
            this.fileTypeList = this.CZFS_FILE_03
          }
          this.dialog = true
        })
      },
      edit(row){
        //重置表单数据
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
          this.$refs['form'].clearValidate();
        }
        // this.$refs['form'].clearValidate();
        // let obj ={required:true, message: '这是必填字段'}
        // this.dataFormRules.zzczqk = obj
        this.fileTypeList = []
        this.isEdit = true;
        var param = {
          ywcb_id:row.id
        }
        this.findqdTable(row.id)
        this.$api.zzczdj.getInfo(param).then((res) => {
          this.dataForm = res.body.default
          this.dataForm.wzrq = timeFormat(res.body.default.wzrq)
          this.dataForm.czr_name = res.body.default.czr_name
          // this.dataForm.czyj = res.body.default.czyj
          // this.dataForm.czsj = timeFormat(res.body.default.czsj)
          if(this.dataForm.sqyy === '01'){
            this.fileTypeList = this.CZFS_FILE_01
          }else if(this.dataForm.sqyy === '02'){
            this.fileTypeList = this.CZFS_FILE_02
          }else if(this.dataForm.sqyy === '03'){
            this.fileTypeList = this.CZFS_FILE_03
          }
          this.dialog = true
        })
      },
      handlerByName(row) {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: row.ajxx_id
          }
        })
      },
      viewPjkj(row) {
        this.$router.push({
          name: 'pjkjview',
          params: {
            id: row.id
          }
        })
      },
      findqdTable(id){
        let param = {
          pagenum:'1',
          pagesize:'5',
          ywcb_id: id
        };
        this.$api.zzczdj.queryMx(param).then((res) => {
          this.tableData = res.body.default.dataset;
        })
      },

    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('zzczdj')
      sessionStorage.setItem('zzczdj', JSON.stringify(this.filters))
      next()
    }
  }
</script>
