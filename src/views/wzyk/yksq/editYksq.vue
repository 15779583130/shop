<template>
  <div class="wrapper">
    <div class="page-title">申请信息</div>
    <div class="form-box">
      <div class="item">
        <label>案件编号</label>
        <span class="value">{{formInline.ajbh}}</span>
      </div>
      <div class="item">
        <label>案件名称</label>
        <el-tag @click="handlerByName()">{{formInline.ajmc}}</el-tag>
      </div>
      <div>
        <el-button type="success" size="small" @click="dialogUpLoadClick" plain>上传文件</el-button>
      </div>
     <!-- <div class="item">
        <label>入库流水号</label>
        <span class="value">{{formInline.lsh}}</span>
      </div>
      <div class="item">
        <label>申请时间</label>
        <span class="value">{{formInline.sqsj}}</span>
      </div>-->
    </div>
    <div class="main">
      <el-row style="height: 100%;">
        <el-col :span="8" class="side">
          <div class="inner">
            <div class="title">可移库清单</div>
            <div class="search">
              <el-col :span="24">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                             size="mini">全选
                </el-checkbox>
              </el-col>
            </div>
            <div class="l-content">
              <el-checkbox-group v-model="checkArr" v-for="item in checkList" :key="item.id">
                <el-checkbox :label="item.id" @change="chooseItem(item)" :key="item.id">
                  <div class="img"><img :src="item.imgurl || emptyImg"></div>
                  <div class="msg">
                    <span>{{item.wzmc}}</span>
                    <span>{{item.wzsl}}</span>
                    <span>{{item.ckjc}}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="side">
          <div class="inner">
            <div class="c-content">
              <div class="title">已勾选<i>{{checkSl}}</i>件物证</div>
              <el-form ref="form" :model="form" class="target-stage" :rules="dataFormRules">
                <el-form-item label="跨部门" prop="sfkbm">
                  <el-select v-model="form.sfkbm" placeholder="请选择"  size="mini" style="width: 100%">
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="可用保管中心" prop="kyck" v-if="form.sfkbm=='0'">
                  <el-select v-model="form.kyck" placeholder="请选择保管中心"  size="mini" style="width: 100%" @change="changeBgzx">
                    <el-option v-for="item in bgzxArry" :key="item.id" :label="item.ckjc" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="接收部门" prop="jsqbmmc" v-if="form.sfkbm=='1'">
                  <el-input v-model="form.jsqbmmc"
                            @focus="chooseDept()" :readonly="true" placeholder="请选择接收部门" size="mini"></el-input>
                </el-form-item>


                <el-form-item label="申请原因" prop="sqyy">
                  <el-input type="textarea" v-model="form.sqyy"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>物流配送</span>
                  <el-switch
                    v-model="form.sfwlps"
                    @change="changeWlps()"
                    :disabled="wlpsDisabled">
                  </el-switch>
                </el-form-item>
                <el-form-item label="押运级别" prop="yyfs" v-show="showYyjb">
                  <el-select v-model="form.yyfs" placeholder="请选择押运级别" style="width: 80%" size="mini">
                    <el-option v-for="item in yyfsOption" :key="item.id" :label="item.text"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="width: 100%; margin-top: 10px" @click="submitForm()"
                             :disabled="scrkqd">生成待移库清单
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
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
              <el-col :span="7">
                <el-form-item label="寄件人姓名" prop="jj_user_id" >
                  <el-select v-model="form.jj_user_id" placeholder="请选择寄件人" style="width: 80%" size="mini"
                             @change="changeJjr">
                    <el-option v-for="item in jjrArry" :key="item.id" :label="item.text" :value="item.id"></el-option>
                  </el-select>
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
            <el-button type="primary" size="mini" @click="saveWplsxx()">确认</el-button>
            <el-button @click="wlpsDialog = false" size="mini">取消</el-button>
          </span>
        </el-dialog>
        <el-col :span="9" class="side">
          <div class="inner">
            <div class="title">已选清单
              <el-button type="warning" style="" class="all-submit" @click="submitRksq()">全部提交</el-button>
            </div>
            <div class="r-content">
              <div class="item" v-for="ywcb in rkcbList" :key="ywcb.id">
                <div class="order-title">
                  <span>NO.{{ywcb.zrwdh}}</span>
                </div>
                <div class="stage-info">
                  <span class="address">{{ywcb.jsqr_dept_name||ywcb.ckjc}}<i v-if="ywcb.sfwlps=='1'" class="wuliu iconfont icon-wuliu"></i> </span>
                  <div class="msg">
                    <span><i>跨部门</i>{{ywcb.sfkbm=='1'?'是':'否'}}</span>
                    <span><i>任务状态</i>{{fromateRwzt(ywcb.rwzt)}}</span>
                    <span><i>物品数量</i>{{ywcb.wzsl}}件</span>
                  </div>
                  <div class="bottom-line">
                    <span></span>
                    <div class="func-icon">
                      <i class="icon el-icon-delete" @click="delDkcb(ywcb)"></i>
                      <i class="icon el-icon-s-unfold" @click="getRKwzmx(ywcb.ywcb_id)"></i>
                    </div>
                  </div>
                  <div class="goods-list" v-show="ywcb.show">
                    <div class="g-item" v-for="item in rkwzmxList" :key="item.id">
                      <div class="img"><img :src="item.imgurl || emptyImg"></div>
                      <div class="msg">
                        <div class="line">
                          <span class="one">{{item.wzmc}}（{{item.wzsl}}） | {{item.wzbh}}</span>
                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>存放位置</i>{{item.cfwz}}</span>

                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>物证类别</i>{{item.wzlb}}</span>
                        </div>
                        <div class="line">
                          <span style="text-align: left;"><i>特征描述</i>{{item.wztz}}</span>
                          <div class="func-icon">
                            <i class="icon el-icon-delete" @click="delDkcbWzmx(item.id)"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-dialog
          title="选择部门"
          :visible.sync="deptDialog"
          :append-to-body="true"
          :modal="true"
          width="40%">
          <div class="ck_tree" style="height: 55vh;overflow-y: auto">
            <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
            <el-tree
              class="filter-tree"
              node-key="id"
              :data="treeData"
              :props="treeProps"

              @node-click="selectData"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree">
            </el-tree>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deptDialog = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="chooseDeptName" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </div>
    <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad"></upload-file>
  </div>
</template>

<script>
  import {timeFormat} from '@/utils/datetime'
  import uploadFile from "../../my-components/upLoadFile/uploadFile";

  export default {
    name: 'test',
      components: {uploadFile},
      comments: {uploadFile},
    data() {
      return {
        yssqid: this.$route.params.id,
        getFileData: false,
        dialogUpLoad: false,
        num: '',
        sInput: '',
        checkAll: false,
        loading: false,
        scrkqd: false,
        checkList: [],
        showYyjb: false,
        checkArr: [],
        sfdsfck:false,
        rkcbList: [],
        rkwzmxList: [],
        rwcbCount: 0,
        wlpsDialog: false,
        wlpsDisabled: false,
        formInline: this.$route.params,
        bgzxArry: [],
        sjrArry:[],
        jjrArry:[],
        checkCfck:[],
        filterText:'',
        deptDialog:false,
        selectNode:{},
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        cklx:'',
        ssxValue:'',
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
        dataFormRules: {
          jsqbmmc: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          sfkbm: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          sqyy: [{required: true, message: '这是必填字段', trigger: 'blur'},{min: 0, max: 500, message: '最多可输入500个字符'}],
          kyck:[{required: true, message: '这是必填字段', trigger: 'blur'}],
           yyfs:[{required: true, message: '这是必填字段', trigger: 'blur'}]

        },
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
          jj_user_id:[{required: true, message: '这是必填字段', trigger: 'blur'}],
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
        ischeck: false,
        isIndeterminate: false,
        checkSl: 0,
        yyfsOption: [
          {
            id: '1',
            text: '正常押运'
          }, {
            id: '2',
            text: '高级押运'
          }
        ],
        valueSelect: '',
        radio2: 999,
        jjck_id:'',

        form: {
          ywzb_id: this.$route.params.id,
          wzxx_id: '',
          jsqbm_id:'',
          jsqbmmc:'',
          sfwlps: false,
          sqyy: '',
          sfkbm:'0',
          kyck:'',
          yyfs: '9',
          jj_user_id:'',
          jj_user_name: '',
          jj_mobile: '',
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
          checkArrLen: 0,
          jjrssqx:[],
          sjrssqx:[]


        },
        emptyImg: require("../../../images/no-img.png"),
      }
    },
    created() {
      this.init()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
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
      chooseDept() {
        this.filterText = ''
        var param = {
          selectall:true
        }
        this.$api.yssq.getDeptTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })

      },
      selectCfck() {
        var param = {}
        this.$api.yksq.selectCfck(param).then((res) => {
          this.bgzxArry = res.body.default.list
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      selectData(data) {
        this.selectNode = data;
      },
      handleCheckAllChange() {
        this.checkSl = 0
        if (this.checkAll) {
          // 全选时
          this.checkArr = []
          if (this.checkList) {
            this.checkList.forEach(function (item) {
              this.checkArr.push(item.id)
              this.checkSl = this.checkSl + 1
            }, this)
            this.checkAll = true
            this.isIndeterminate = false
            this.form.wzxx_id = this.checkArr.join(',')
          }
        } else {
          this.checkList.forEach(function (item) {
            item.flag = false
          }, this)
          this.checkArr = []
          this.checkAll = false
          this.form.wzxx_id = ''
        }
      },
      init() {
        this.formInline = JSON.parse(sessionStorage.getItem('editYksqxx'))
        this.formInline.sqsj = timeFormat(this.formInline.sqsj)
        this.getWrkqd()
        this.getDdyqd()
        this.selectCfck()
      },
      handlerByName() {
        this.$router.push({
          name: 'organizationDetail',
          params: {
            id: this.formInline.ajxx_id
          }
        })
      },
      getWrkqd() {
        var param = {
          ajxx_id: this.formInline.ajxx_id,
          id: this.formInline.id
        }
        this.checkList = []
        this.$api.yksq.queryBxqd(param).then((res) => {
          this.checkList = res.body.default.dataset
        })
      },
      changeBgzx(selVal) {
        let obj = {}
        obj = this.bgzxArry.find(
          item => {
            if (selVal == item.id) {
              return item //筛选出对应数据
            }
          }
        )
        if (obj.cklx == '1') {
          this.form.sfwlps = true;
          this.showYyjb = true;
          this.wlpsDisabled = true;
          this.form.yyfs = '1'
          //this.form.yyfs = '1'
          this.sfdsfck = true
        } else {
          this.form.sfwlps = false;
          this.showYyjb = false;
          this.wlpsDisabled = false
          this.form.yyfs = '9'
          this.sfdsfck = false
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
      chooseItem(item) {
        if (this.checkArr.indexOf(item.id) != -1) {
          this.checkSl = this.checkSl + 1
        } else {
          this.checkSl = this.checkSl - 1
        }
        if (this.checkArr.length == 0) {
          this.isIndeterminate = false
          this.checkAll = false
        } else if (this.checkArr.length < this.checkList.length) {
          this.isIndeterminate = true
        } else if (this.checkArr.lengthQ != 0 && this.checkArr.length == this.checkList.length) {
          this.isIndeterminate = false
          this.checkAll = true
        }
        this.form.wzxx_id = this.checkArr.join(',')
      },
      submitForm() {
        if (this.checkArr.length == 0) {
          this.$message({message: '请选择物证！', type: 'error'})
          return false
        }

      this.$refs.form.validate((valid) => {
            if (valid) {
        this.jjck_id = this.checkList.filter(item=>item.id.match(this.checkArr[0]))[0].cfck_id;
        this.cklx  = this.checkList.filter(item=>item.id.match(this.checkArr[0]))[0].cklx;
          var isflag= false
           try{

          this.checkArr.forEach(function (item1) {
                if(this.checkList.filter(item=>item.id.match(item1))[0].cklx != this.cklx){
                 this.$message({message: '存于保管中心的物证跟单位不能为同一批，请单独选择', type: 'error'})
                 isflag = true
                 throw new Error("EndIterative");
                }
               if(this.form.sfkbm=='0'){

               if(this.checkList.filter(item=>item.id.match(item1))[0].cklx == '1' && this.sfdsfck){
                this.$message({message: '物证已存于保管中心，无需移库', type: 'error'})
                isflag = true
                throw new Error("EndIterative");
               }

                if(this.checkList.filter(item=>item.id.match(item1))[0].cfck_id == this.form.kyck){
                 this.$message({message: '【'+this.checkList.filter(item=>item.id.match(item1))[0].wzmc+'】选择的保管中心与当前保管中心重复', type: 'error'})
                 isflag = true
                 throw new Error("EndIterative");
                }

                if((this.checkList.filter(item=>item.id.match(item1))[0].cfck_id != this.jjck_id ) && this.form.sfwlps ){
                  this.$message({message: '物流派送的时候，不允许选择多个不同的保管中心，请重新选择', type: 'error'})
                  isflag = true
                  throw new Error("EndIterative");
                }

                }
                if(this.form.sfkbm=='1'){
                  if(this.checkList.filter(item=>item.id.match(item1))[0].cklx == '1'){
                   this.$message({message: '物证存在于保管中心，请走处置权移送流程', type: 'error'})
                   isflag = true
                   throw new Error("EndIterative");
                  }
                }


              }, this)



           }catch(e){
             if(e.message!="EndIterative") throw e;
           }

             if(isflag){
               return false
             }



        if(this.form.sfwlps && this.form.sfkbm=='0'){
          //this.wlpsDialog = true;

              var params = {
                jjck_id: this.jjck_id,
                kyck:this.form.kyck
              }
              let that = this
              this.$api.yksq.getWljj(params).then((res) => {

                this.$nextTick(() => {
                  //this.form.jj_user_name = res.body.rkrwcbdto.jj_user_name
                  //this.form.jj_mobile = res.body.rkrwcbdto.jj_mobile
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
                  this.wlpsDialog = true;


                  that.$api.yksq.getWljjJjrList(params).then((res) => {
                                that.$nextTick(() => {
                                  that.jjrArry = res.body.default.jjrlist
                                  if(that.jjrArry.length>=1){
                                    that.form.jj_user_id = that.jjrArry[0].id
                                    that.form.jj_user_name = that.jjrArry[0].text
                                    that.form.jj_mobile = that.jjrArry[0].phone

                                  }
                                })
                              })

                  that.$api.yksq.getWljjSjrList(params).then((res) => {
                    that.$nextTick(() => {
                      that.sjrArry = res.body.default.sjrlist
                      if(that.sjrArry.length>=1){
                        that.form.sj_user_id = that.sjrArry[0].id
                        that.form.sj_user_name = that.sjrArry[0].text
                        that.form.sj_mobile = that.sjrArry[0].phone

                      }
                    })
                  })
                })
              })

        }else{

                  this.scrkqd = true

                   if(this.form.sfkbm=='1'){
                     this.form.kyck = ''
                   }else{
                     this.form.jsqbm_id = ''
                     this.form.jsqbmmc = ''
                   }
                  let params = Object.assign({}, this.form)
                  if (params.sfwlps) {
                    params.sfwlps = '1'
                  } else {
                    params.sfwlps = '0'
                  }

                  this.$api.yksq.saveWzxxBxqd(params).then((res) => {
                    if (res.success == 'true') {
                      this.$message({message: res.message, type: 'success'})
                      this.getWrkqd()
                      this.getDdyqd()
                      this.checkSl = 0
                      this.checkArr = [];
                      this.isIndeterminate = false;
                      this.checkAll = false;
                      this.scrkqd = false
                    } else {
                      this.$message({message: res.message, type: 'error'})
                    }
                  })

        }
       }
                })
      },
      chooseDeptName() {
        // this.dataForm.gs_id = row.id;
        // this.dataForm.gs_name = row.user_name;
        this.form.jsqbmmc = this.selectNode.name;
        this.form.jsqbm_id = this.selectNode.id;
        this.deptDialog = false;
      },
      saveWplsxx() {
        this.$refs.wplsform.validate((valid) => {
          if (valid) {
            this.form.jjrssqx = ''
            this.form.sjrssqx = ''
            let params = Object.assign({}, this.form)
            if (params.sfwlps) {
              params.sfwlps = '1'
            } else {
              params.sfwlps = '0'
            }

            this.$api.yksq.saveWzxxBxqd(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.getWrkqd()
                this.getDdyqd()
                this.checkSl = 0
                this.checkArr = [];
                this.isIndeterminate = false;
                this.checkAll = false;
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
      fromateRwzt(value){
        if(value=='0'){
          return '待申请'
        }else if(value=='1'){
          return '已提交'
        }else if(value=='2'){
          return '处理中'
        }else if(value=='9'){
          return '已完结'
        }else{
          return value
        }
      },
      getDdyqd() {
        var param = {
          id: this.formInline.id,
          ajxx_id: this.formInline.ajxx_id
        }
        this.$api.yksq.queryYxYwcb(param).then((res) => {
          //debugger
          this.rwcbCount = Number(res.body.default.count)
          this.rkcbList = res.body.default.dataset
          if (res.body.default.list) {
            this.rkcbList.forEach(function (c) {
              c.show = false
            })
            console.log(this.rwcbCount)
          }
        })

      },
      submitRksq() {

        if (this.rwcbCount == 0) {
          this.$message({message: '不存在待移库物证信息，无法提交申请！', type: 'error'})
          return false
        }
        this.$confirm('确定是否提交该移库申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = Object.assign({}, this.formInline)
          this.$api.yksq.saveInfo(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.$util.goBack(this)
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })

      },
      delDkcb(ywcb) {
        this.$confirm('确定删除该待移库清单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ywcb_id: ywcb.ywcb_id,
            sfkbm:ywcb.sfkbm
          }
          this.$api.yksq.delywcb(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.getWrkqd()
              this.getDdyqd()
              this.checkArr = [];
              this.isIndeterminate = false;
              this.checkAll = false;
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      getRKwzmx(id) {
        var param = {
          ywcb_id: id
        }
        this.$api.yksq.queryYxYswz(param).then((res) => {
          this.rkwzmxList = res.body.default.dataset
          if (this.rkcbList.length != 0) {
            this.rkcbList.forEach(function (c) {
              if (c.ywcb_id == id) {
                if (!c.show) {
                  c.show = true
                } else {
                  c.show = false
                }
              } else {
                c.show = false
              }
            })
          }
        })
      },
      getSubDays: function (days) {
        var $nowTime = new Date()
        $nowTime.setTime($nowTime.getTime() + 24 * 60 * 60 * 1000 * days)
        var $newMonth = $nowTime.getMonth() + 1
        if ($newMonth < 10) {
          $newMonth = '0' + $newMonth
        }
        var $newDay = $nowTime.getDate()
        if ($newDay < 10) {
          $newDay = '0' + $newDay
        }
        return $nowTime.getFullYear() + '-' + $newMonth + '-' + $newDay
      },
      changeHandler(value) {
        this.form.bgqx = this.getSubDays(value)
        if (value == 999) {
          this.form.bgqx = '9999-12-31'
        }
      },
      delDkcbWzmx(id) {
        this.$confirm('确定删除该物证？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            wzmx_id: id,
          }
          debugger
          this.$api.yksq.delwzxx(params).then((res) => {
            if (res.success == 'true') {
              this.$message({message: res.message, type: 'success'})
              this.getWrkqd()
              this.getDdyqd()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      changeWlps() {

        if (this.form.sfwlps) {
          this.showYyjb = true;
          this.form.yyfs = '1'
        } else {
          this.showYyjb = false;
          this.form.yyfs = '9'
          this.form.jjrssqx = ""
          this.form.sjrssqx = ""
        }
      },
      dialogUpLoadClick () {
        debugger
        this.dialogUpLoad = true
        this.getFileData = true
      },
      handleChangeSsx(value){
         this.form.jjrsf = value[0]
        this.form.jjrcs =  value[1]
        this.form.jjrqx =  value[2]
      },
      handleChangeSjrSsx(value){
        this.form.sjrsf = value[0]
        this.form.sjrcs =  value[1]
        this.form.sjrqx =  value[2]
      },
      getData (val) {
          this.dialogUpLoad = val
          this.getFileData = val
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

  /deep/ .el-dialog__body {
    padding-top: 10px;
  }
  /deep/.el-select .el-input {
      width: 100%;
  }

  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #f4f4f4;
    font-size: 14px;
    min-height: calc(100%);
    padding: 10px;
    box-sizing: border-box;
  }

  .page-title {
    height: 30px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 12px;
    font-weight: bold;
    line-height: 30px;
    padding: 0 10px;
    background: #fff;
  }

  .form-box {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px;
    background: #fff;
    margin-bottom: 10px;

    .item {
      width: 33.3%;
      line-height: 32px;
      display: inline-block;

      label {
        color: #8d8585;
      }

      .value {
        color: #333;
        display: inline-block;
      }
    }
  }

  .main {
    position: absolute;
    top: 135px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .side {
    height: 100%;
    padding-right: 10px;

    &:last-child {
      padding-right: 0;
    }

    &:nth-child(2) {
      .inner {
        background: none;
      }
    }

    .inner {
      background: #fff;
      height: 100%;
      position: relative;

      .title {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        font-weight: bold;
        padding: 0 10px;
        border-bottom: 1px solid #f2f2f2;
      }

      .search {
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 10px;

        .input {
          width: 80%;
          height: 30px;

          /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
          }
        }
      }

      .l-content {
        position: absolute;
        top: 72px;
        left: 0;
        bottom: 0;
        overflow: auto;
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;

        /deep/ .el-checkbox {
          display: block;
          margin-right: 0;
          position: relative;
          margin-bottom: 5px;

          .el-checkbox__input {
            left: 8px;
            top: 18px;
            position: relative;
          }
        }

        /deep/ .is-checked {
          background: #f5f5f5;
          border-left: 2px solid #3675cb;

          .is-checked {
            border-left: 0;
          }
        }

        .img {
          width: 54px;
          height: 54px;
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translate(0, -50%);
          //background: #ccc;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .msg {
          padding: 0 0 0 65px;
          height: 62px;
          display: flex;
          align-content: center;
          flex-wrap: wrap;

          span {
            width: 100%;
            display: block;
            font-size: 12px;
            color: #666;
          }
        }
      }

      .c-content {
        position: absolute;
        top: 28px;
        left: 0;
        bottom: 28px;
        width: 100%;
        border: 1px dashed #ddd;
        background: rgb(252, 252, 252);
        box-sizing: border-box;
        padding: 0 10px;

        .title {
          border-bottom: 1px dashed #ccc;
          height: 40px;
          line-height: 40px;
          color: #8a8a8a;

          i {
            font-size: 16px;
            padding: 4px;
            color: #333;
          }
        }

        .target-stage {
          span {
            display: block;
            color: #8d8585;
            line-height: 30px;
          }

          /deep/ .el-form-item {
            margin-bottom: 5px;
          }

          /deep/ .el-form-item__label {
            display: block;
            color: #8d8585;
            width: 100%;
            text-align: left;
            line-height: 28px;
          }

          /deep/ .el-radio {
            margin-right: 10px;
          }

          /deep/ .el-radio__label {
            padding-left: 3px;
          }

          .num {
            width: 50px;
            margin-right: 8px;

            /deep/ .el-input__inner {
              height: 30px;
            }
          }
        }
      }

      .all-submit {
        position: absolute;
        top: 1px;
        right: 10px;
        width: 80px;
        margin-top: 0;
        height: 26px;
        padding: 0;
      }

      .r-content {
        position: absolute;
        top: 30px;
        left: 0;
        bottom: 0;
        overflow: auto;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 8px 0;

        .item {
          border: 1px solid #f2f2f2;
          padding-bottom: 5px;
          margin-bottom: 6px;

          .order-title {
            height: 30px;
            background: #9f9f9f;
            color: #fff;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            padding: 0 5px;
          }

          .stage-info {
            padding: 0 10px;

            .address {
              display: block;
              font-size: 14px;
              line-height: 30px;
              font-weight: bold;

              .wuliu {
                width: 20px;
                height: 20px;
                margin-left: 10px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .msg {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              padding-bottom: 10px;

              i {
                padding-right: 5px;
                color: #bebebe;
              }
            }

            .bottom-line {
              border-top: 1px solid #f2f2f2;
              height: 36px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .submit {
                width: 60px;
                height: 26px;
                padding: 0;
                font-size: 12px;
              }

              .func-icon {
                .icon {
                  width: 18px;
                  height: 18px;
                  display: inline-block;
                  text-align: center;
                  font-size: 14px;
                  line-height: 18px;
                  color: #333;
                  padding: 0;
                  margin-left: 5px;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }

            /*  物品列表*/

            .goods-list {
              .g-item {
                position: relative;
                border: 1px solid #f2f2f2;
                margin-bottom: 5px;

                .img {
                  width: 54px;
                  height: 54px;
                  position: absolute;
                  top: 50%;
                  left: 5px;
                  transform: translate(0, -50%);
                  //background: #ccc;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                .msg {
                  padding: 0 5px 0 65px;
                  height: 78px;
                  display: block;
                  align-content: center;
                  flex-wrap: wrap;

                  .line {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    line-height: 19px;

                    span {
                      &:last-child {
                        text-align: right;
                      }
                      &.one{
                        text-align: left;
                      }
                    }
                  }

                  span {
                    width: 100%;
                    display: block;
                    font-size: 12px;
                    color: #666;

                    i {
                      color: #bebebe;
                      padding-right: 5px;
                    }
                  }

                  .func-icon {
                    display: flex;

                    .icon {
                      width: 18px;
                      height: 18px;
                      display: inline-block;
                      text-align: center;
                      font-size: 14px;
                      line-height: 18px;
                      color: #333;
                      padding: 0;
                      margin-left: 5px;

                      img {
                        width: 100%;
                        height: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
