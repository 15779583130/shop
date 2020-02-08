<template>
  <div class="wrapper">
    <div class="page-title">申请信息</div>
    <div class="form-box">
      <div class="item">
        <label>案件编号</label>
        <span class="value">{{ formInline.ajbh }}</span>
      </div>
      <div class="item">
        <label>案件名称</label>
        <el-tag @click="handlerByName()">{{ formInline.ajmc }}</el-tag>
      </div>
      <div><el-button type="success" size="small" @click="dialogUpLoadClick" plain>上传文件</el-button></div>
    </div>
    <div class="main">
      <el-row style="height: 100%;">
        <el-col :span="8" class="side">
          <div class="inner">
            <div class="title">在库清单</div>
            <div class="search">
              <el-col :span="24"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" size="mini">全选</el-checkbox></el-col>
            </div>
            <div class="l-content">
              <el-checkbox-group v-model="checkArr" v-for="item in checkList" :key="item.id">
                <el-checkbox :label="item.id" @change="chooseItem(item)" :key="item.id">
                  <div class="img"><img :src="item.imgurl || emptyImg" /></div>
                  <div class="msg">
                    <span>{{ item.wzmc }}</span>
                    <span>{{ item.wzsl }}</span>
                    <span>{{ item.ckmc }}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
        <el-col :span="7" class="side">
          <div class="inner">
            <div class="c-content">
              <div class="title">
                已勾选
                <i>{{ checkSl }}</i>
                件物证
              </div>
              <el-form ref="form" :model="form" class="target-stage" :rules="dataFormRules">
                <el-form-item prop="czsj" label="预处理日期">
                  <el-date-picker
                    v-model="form.czsj"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    format="yyyy-MM-dd"
                    value-format="yyyyMMdd"
                    style="width: 70%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <span>物流配送</span>
                  <el-switch v-model="form.iswl" @change="changeWlps()"></el-switch>
                </el-form-item>

                <el-form-item v-if="dialogTableVisible" label="押运级别" prop="yyfs" size="mini">
                  <el-select v-model="form.yyfs" placeholder="请选择" style="width: 70%">
                    <el-option v-for="item in yyjbs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="dialogTableVisible" label="委托人" prop="wtr" size="mini">
                  <el-select v-model="form.wtr_id" clearable placeholder="请选择" style="width: 70%">
                    <el-option v-for="item in wtrs" :key="item.value" :label="item.text" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="处置原因" prop="czyy">
                  <el-select v-model="form.czyy" placeholder="请选择" style="width: 70%" size="mini">
                    <el-option v-for="item in czyyOptions" :key="item.value" :label="item.text" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=""><el-button type="primary" style="width: 100%; margin-top: 10px" @click="submitForm()" :disabled="scrkqd">生成清单</el-button></el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="side">
          <div class="inner">
            <div class="title">
              任务清单
              <el-button type="warning" style="" class="all-submit" @click="submitRksq()">全部提交</el-button>
            </div>
            <div class="r-content">
              <div class="item" v-for="ywcb in dycbList" :key="ywcb.id">
                <div class="order-title">
                  <span>{{ ywcb.zrwdh }}</span>
                </div>
                <div class="stage-info">
                  <span class="address">
                    {{ ywcb.ckmc }}
                    <i v-if="ywcb.sfwlps == '1'" class="wuliu iconfont icon-wuliu"></i>
                  </span>
                  <div class="msg">
                    <span>
                      <i>处置原因</i>
                      {{ fromateCzyy(ywcb.sqyy) }}
                    </span>
                    <span>
                      <i>保管期限</i>
                      {{ ywcb.wzrq }}
                    </span>
                    <span>
                      <i>物品数量</i>
                      {{ ywcb.wzsl }}件
                    </span>
                  </div>
                  <div class="bottom-line">
                    <!-- <el-button class="submit">提交</el-button> -->
                    <div class="func-icon" style="position: absolute;right: 20px;">
                      <i class="icon el-icon-delete" @click="delDkcb(ywcb.id)"></i>
                      <i class="icon el-icon-s-unfold" @click="getRKwzmx(ywcb.id)"></i>
                    </div>
                  </div>
                  <div class="goods-list" v-show="ywcb.show">
                    <div class="g-item" v-for="item in dywzmxList" :key="item.id">
                      <div class="img"><img :src="item.imgurl || emptyImg" /></div>
                      <div class="msg">
                        <div class="line">
                          <span class="one">{{ item.wzmc }}（{{ item.wzsl }}） | {{ item.wzbh }}</span>
                        </div>
                        <!-- <div class="line">
                          <span style="text-align: left;"><i>放置位置</i>{{item.cfwz}}</span>

                        </div> -->
                        <div class="line">
                          <span style="text-align: left;">
                            <i>物证类别</i>
                            {{ item.wzlb }}
                          </span>
                        </div>

                        <div class="line">
                          <span>
                            <i>特征描述</i>
                            {{ item.wztz }}
                          </span>
                          <div class="func-icon"><i class="icon el-icon-delete" @click="delDkcbWzmx(item.id)"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="物流配送信息" :visible.sync="wlpsDialog" :append-to-body="true" :modal="true" width="60%">
        <el-form :model="form" ref="wplsform" label-width="100px" :rules="wplsFormRules" size="mini" label-position="right">
          <el-row>
            <div v-if="!sfdsfck">
              <el-col :span="7">
                <el-form-item label="寄件人姓名" prop="jj_user_name">
                  <el-input v-model="form.jj_user_name" size="mini" placeholder="请输入寄件人姓名" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="寄件电话" prop="jj_mobile"><el-input v-model="form.jj_mobile" size="mini" placeholder="请输入寄件电话" clearable></el-input></el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="省/市/区县" prop="jjrssqx"><el-cascader v-model="form.jjrssqx" :options="ssxOptions" @change="handleChangeSsx"></el-cascader></el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="寄件地址" prop="jj_addr"><el-input v-model="form.jj_addr" size="mini" placeholder="请输入寄件地址" clearable></el-input></el-form-item>
              </el-col>
              <el-col :span="24"><el-divider></el-divider></el-col>
            </div>
            <div>
              <el-col :span="7">
                <el-form-item label="收件人姓名" prop="sj_user_id">
                  <el-select v-model="form.sj_user_id" placeholder="请选择收件人" style="width: 80%" size="mini" @change="changeSjr">
                    <el-option v-for="item in sjrArry" :key="item.id" :label="item.text" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收件电话" prop="sj_mobile"><el-input v-model="form.sj_mobile" size="mini" placeholder="请输入收件电话" clearable></el-input></el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="省/市/区县" prop="sjrssqx"><el-cascader v-model="form.sjrssqx" :options="ssxOptions" @change="handleChangeSjrSsx"></el-cascader></el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收件地址" prop="sj_cfck_dz"><el-input v-model="form.sj_cfck_dz" size="mini" placeholder="请输入收件地址"></el-input></el-form-item>
              </el-col>
              <el-col :span="24"><el-divider></el-divider></el-col>
            </div>
            <el-col :span="24">
              <el-form-item label="预约取件时间">
                <el-col :span="7" style="display: flex;">
                  <el-date-picker
                    v-model="form.yyqj_ks"
                    type="datetime"
                    placeholder="请输入开始时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                  <i class="text">-</i>
                </el-col>
                <el-col :span="7" style="display: flex;">
                  <el-date-picker
                    v-model="form.yyqj_js"
                    type="datetime"
                    placeholder="请输入结束时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
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
    </div>
    <upload-file @passData="getData" :yssqid="this.yssqid" :getFileData="this.getFileData" :display="this.dialogUpLoad"></upload-file>
  </div>
</template>

<script>
import uploadFile from '@/views/my-components/upLoadFile/uploadFile';
import { timeFormat } from '@/utils/datetime';
export default {
  name: 'test',
  components: { uploadFile },
  data() {
    return {
      yssqid: this.$route.params.id,
      getFileData: false,
      dialogUpLoad: false,
      dialogTableVisible: false,
      num: '',
      sInput: '',
      checkAll: false,
      rwcbCount: 0,
      sfdsfck: false,
      checkList: [],
      checkArr: [],
      dycbList: [],
      dywzmxList: [],
      sjrArry: [],
      wlpsDialog: false,
      wtrs: [],
      formInline: this.$route.params,
      ssxOptions: [
        {
          value: '福建省',
          label: '福建省',
          children: [
            {
              value: '厦门市',
              label: '厦门市',
              children: [
                {
                  value: '思明区',
                  label: '思明区'
                },
                {
                  value: '湖里区',
                  label: '湖里区'
                },
                {
                  value: '集美区',
                  label: '集美区'
                },
                {
                  value: '海沧区',
                  label: '海沧区'
                },
                {
                  value: '同安区',
                  label: '同安区'
                },
                {
                  value: '翔安区',
                  label: '翔安区'
                }
              ]
            }
          ]
        }
      ],
      yyjbs: [{ value: '1', label: '正常押运' }, { value: '2', label: '高级押运' }],
      dataFormRules: {
        czsj: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        czyy: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        yyfs: [{ required: true, message: '这是必填字段', trigger: 'blur' }]
      },
      wplsFormRules: {
        jj_user_name: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { min: 0, max: 50, message: '最多可输入50个字符' }],
        jjrssqx: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        sjrssqx: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        jj_mobile: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { validator: this.checkPhone, trigger: 'blur' }],
        jjrsf: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        jjrcs: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        jjrqx: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        jj_addr: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { min: 0, max: 500, message: '最多可输入500个字符' }],
        sj_user_name: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { min: 0, max: 50, message: '最多可输入50个字符' }],
        sj_user_id: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        sj_mobile: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { validator: this.checkPhone, trigger: 'blur' }],
        sjrsf: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        sjrcs: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        sjrqx: [{ required: true, message: '这是必填字段', trigger: 'blur' }],
        sj_cfck_dz: [{ required: true, message: '这是必填字段', trigger: 'blur' }, { min: 0, max: 500, message: '最多可输入500个字符' }]
      },
      list: [],
      ischeck: false,
      isIndeterminate: false,
      checkSl: 0,
      valueSelect: '',
      radio2: 0,
      form: {
        ywzbid: this.$route.params.id,
        ids: '',
        iswl: false,
        czyy: '',
        czsj: '',
        wtr_id: '',
        yyfs: '',
        jj_user_name: '',
        jj_mobile: '',
        jjrssqx: [],
        sjrssqx: [],
        jjrsf: '福建省',
        jjrcs: '厦门市',
        jjrqx: '思明区',
        jj_addr: '',
        sj_user_name: '',
        sj_user_id: '',
        sj_mobile: '',
        sjrsf: '福建省',
        sjrcs: '厦门市',
        sjrqx: '思明区',
        sj_cfck_dz: '',
        jjck_id: ''
      },
      scrkqd: false,
      czyyOptions: [{ value: '01', text: '移交公物仓' }, { value: '02', text: '上缴专管部门' }, { value: '03', text: '自行处置' }],
      emptyImg: require('../../../images/no-img.png')
    };
  },
  created() {
    this.formInline = JSON.parse(sessionStorage.getItem('czdjbj'));
    this.form.ywzbid = this.formInline.id;
    this.init();
  },
  methods: {
    getData(val) {
      this.dialogUpLoad = val;
      this.getFileData = val;
    },
    handleCheckAllChange() {
      this.checkSl = 0;
      if (this.checkAll) {
        // 全选时
        this.checkArr = [];
        if (this.checkList) {
          this.checkList.forEach(function(item) {
            this.checkArr.push(item.id);
            this.checkSl = this.checkSl + 1;
          }, this);
          this.checkAll = true;
          this.isIndeterminate = false;
          this.form.ids = this.checkArr.join(',');
        }
      } else {
        this.checkList.forEach(function(item) {
          item.flag = false;
        }, this);
        this.checkArr = [];
        this.checkAll = false;
        this.form.ids = '';
      }
    },
    init() {
      this.getWrkqd();
      this.getDdyqd();
      this.getWtr();
    },
    getWtr() {
      var param = {};
      this.$api.dyghsq.selectUserQd(param).then(res => {
        this.wtrs = res.body.default.userlist;
      });
    },
    getWrkqd() {
      let that = this;
      var param = {
        ajxx_id: this.formInline.ajxx_id
      };

      this.$api.czdj.queryWzxxForBxqd(param).then(res => {
        if (Object.keys(res.body).length != 0) {
          that.checkList = res.body.default.dataset;
        } else {
          this.checkList = [];
        }
      });
    },
    dialogUpLoadClick() {
      this.dialogUpLoad = true;
      this.getFileData = true;
    },
    chooseItem(item) {
      if (this.checkArr.indexOf(item.id) != -1) {
        this.checkSl = this.checkSl + 1;
      } else {
        this.checkSl = this.checkSl - 1;
      }
      if (this.checkArr.length == 0) {
        this.isIndeterminate = false;
        this.checkAll = false;
      } else if (this.checkArr.length < this.checkList.length) {
        this.isIndeterminate = true;
      } else if (this.checkArr.lengthQ != 0 && this.checkArr.length == this.checkList.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      }
      this.form.ids = this.checkArr.join(',');
    },
    submitForm() {
      if (this.checkArr.length == 0) {
        this.$message({ message: '请选择物证！', type: 'error' });
        return false;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.jjck_id = this.checkList.filter(item => item.id.match(this.checkArr[0]))[0].cfck_id;
          var cklx = this.checkList.filter(item => item.id.match(this.checkArr[0]))[0].cklx;
          if (cklx == '1') {
            this.sfdsfck = true;
          } else {
            this.sfdsfck = false;
          }
          var isflag = false;

          try {
            this.checkArr.forEach(function(item1) {
              if (this.checkList.filter(item => item.id.match(item1))[0].cfck_id != this.form.jjck_id) {
                this.$message({ message: '请选择同一保管中心的物证', type: 'error' });
                isflag = true;
                throw new Error('EndIterative');
              }
            }, this);
          } catch (e) {
            if (e.message != 'EndIterative') throw e;
          }

          if (isflag) {
            return false;
          }

          if (!this.form.iswl) {
            this.scrkqd = true;
            let params = Object.assign({}, this.form);
            if (params.iswl) {
              params.iswl = '1';
            } else {
              params.iswl = '0';
            }
            this.$api.czdj.saveOrUpdateYwcb(params).then(res => {
              if (res.success == 'true') {
                this.$message({ message: res.message, type: 'success' });
                this.getWrkqd();
                this.getDdyqd();
                this.checkSl = 0;
                this.checkArr = [];
                this.isIndeterminate = false;
                this.checkAll = false;
                this.scrkqd = false;
              } else {
                this.$message({ message: res.message, type: 'error' });
              }
            });
          } else {
            var params = {
              cfck_id: this.form.jjck_id
            };
            let that = this;
            this.$api.czdj.getWljj(params).then(res => {
              //console.log(res.body.czrwcbdto)
              this.$nextTick(() => {
                this.form.jj_addr = res.body.czrwcbdto.jj_addr;
                this.form.sj_cfck_dz = res.body.czrwcbdto.sj_cfck_dz;
                this.form.jjrssqx = [];
                this.form.sjrssqx = [];
                if (res.body.czrwcbdto.jjrsf != undefined && res.body.czrwcbdto.jjrsf != null && res.body.czrwcbdto.jjrsf != '') {
                  this.form.jjrsf = res.body.czrwcbdto.jjrsf;
                  this.form.jjrssqx.push(res.body.czrwcbdto.jjrsf);
                } else {
                  this.form.jjrsf = '福建省';
                  this.form.jjrssqx.push('福建省');
                }
                if (res.body.czrwcbdto.jjrcs != undefined && res.body.czrwcbdto.jjrcs != null && res.body.czrwcbdto.jjrcs != '') {
                  this.form.jjrcs = res.body.czrwcbdto.jjrcs;
                  this.form.jjrssqx.push(res.body.czrwcbdto.jjrcs);
                } else {
                  this.form.jjrcs = '厦门市';
                  this.form.jjrssqx.push('厦门市');
                }
                if (res.body.czrwcbdto.jjrqx != undefined && res.body.czrwcbdto.jjrqx != null && res.body.czrwcbdto.jjrqx != '') {
                  this.form.jjrqx = res.body.czrwcbdto.jjrqx;
                  this.form.jjrssqx.push(res.body.czrwcbdto.jjrqx);
                } else {
                  this.form.jjrqx = '思明区';
                  this.form.jjrssqx.push('思明区');
                }

                if (res.body.czrwcbdto.sjrsf != undefined && res.body.czrwcbdto.sjrsf != null && res.body.czrwcbdto.sjrsf != '') {
                  this.form.sjrsf = res.body.czrwcbdto.sjrsf;
                  this.form.sjrssqx.push(res.body.czrwcbdto.sjrsf);
                } else {
                  this.form.jjrsf = '福建省';
                  this.form.sjrssqx.push('福建省');
                }
                if (res.body.czrwcbdto.sjrcs != undefined && res.body.czrwcbdto.sjrcs != null && res.body.czrwcbdto.sjrcs != '') {
                  this.form.sjrcs = res.body.czrwcbdto.sjrcs;
                  this.form.sjrssqx.push(res.body.czrwcbdto.sjrcs);
                } else {
                  this.form.sjrcs = '厦门市';
                  this.form.sjrssqx.push('厦门市');
                }
                if (res.body.czrwcbdto.sjrqx != undefined && res.body.czrwcbdto.sjrqx != null && res.body.czrwcbdto.sjrqx != '') {
                  this.form.sjrqx = res.body.czrwcbdto.sjrqx;
                  this.form.sjrssqx.push(res.body.czrwcbdto.sjrqx);
                } else {
                  this.form.sjrqx = '思明区';
                  this.form.sjrssqx.push('思明区');
                }
                this.wlpsDialog = true;

                that.$api.czdj.getWljjSjrList(params).then(res => {
                  console.log(res.body.default.jjrlist);
                  that.$nextTick(() => {
                    this.form.jj_user_name = res.body.default.jjrlist[0].text;
                    this.form.jj_mobile = res.body.default.jjrlist[0].phone;
                  });
                });
                var param = {
                  wtr_id: this.form.wtr_id
                };
                that.$api.czdj.getWljjUserList(param).then(res => {
                  console.log(res.body.default.sjrlist);
                  that.$nextTick(() => {
                    that.sjrArry = res.body.default.sjrlist;
                    if (that.sjrArry.length >= 1) {
                      that.form.sj_user_id = that.sjrArry[0].id;
                      that.form.sj_user_name = that.sjrArry[0].text;
                      that.form.sj_mobile = that.sjrArry[0].phone;
                    }
                  });
                });
              });
            });
          }
        }
      });
    },
    saveWplsxx() {
      this.$refs.wplsform.validate(valid => {
        if (valid) {
          this.form.jjrssqx = '';
          this.form.sjrssqx = '';
          let params = Object.assign({}, this.form);
          if (params.iswl) {
            params.iswl = '1';
          } else {
            params.iswl = '0';
          }
          this.$api.czdj.saveOrUpdateYwcb(params).then(res => {
            if (res.success == 'true') {
              this.$message({ message: res.message, type: 'success' });
              this.getWrkqd();
              this.getDdyqd();
              this.checkSl = 0;
              this.checkArr = [];
              this.isIndeterminate = false;
              this.checkAll = false;
              this.wlpsDialog = false;
              this.form.jjrssqx = [];
              this.form.sjrssqx = [];
              //this.scrkqd = false
            } else {
              this.$message({ message: res.message, type: 'error' });
            }
          });
        }
      });
    },
    getDdyqd() {
      var param = {
        ywzb_id: this.formInline.id
      };
      this.$api.czdj.queryYwcbForBxqd(param).then(res => {
        this.rwcbCount = Number(res.body.default.count);
        this.dycbList = res.body.default.dataset;
        if (res.body.default.dataset) {
          this.dycbList.forEach(function(c) {
            c.show = false;
            c.wzrq = timeFormat(c.wzrq);
          });
        }
      });
    },
    getSubDays: function(days) {
      var $nowTime = new Date();
      $nowTime.setTime($nowTime.getTime() + 24 * 60 * 60 * 1000 * days);
      var $newMonth = $nowTime.getMonth() + 1;
      if ($newMonth < 10) {
        $newMonth = '0' + $newMonth;
      }
      var $newDay = $nowTime.getDate();
      if ($newDay < 10) {
        $newDay = '0' + $newDay;
      }
      return $nowTime.getFullYear() + '-' + $newMonth + '-' + $newDay;
    },
    changeHandler(value) {
      this.form.ghqx = this.getSubDays(value);
    },
    submitRksq() {
      if (this.rwcbCount == 0) {
        this.$message({ message: '不存在待处置物证信息，无法提交申请！', type: 'error' });
        return false;
      }

      let params = Object.assign({}, this.formInline);
      this.$api.czdj.submitCzdj(params).then(res => {
        if (res.success == 'true') {
          this.$message({ message: res.message, type: 'success' });
          this.$util.goBack(this);
        } else {
          this.$message({ message: res.message, type: 'error' });
        }
      });
    },
    changeSjr(selVal) {
      let obj = {};
      obj = this.sjrArry.find(item => {
        if (selVal == item.id) {
          return item; //筛选出对应数据
        }
      });
      this.form.sj_user_name = obj.text;
      this.form.sj_mobile = obj.phone;
    },
    handleChangeSsx(value) {
      this.form.jjrsf = value[0];
      this.form.jjrcs = value[1];
      this.form.jjrqx = value[2];
    },
    handleChangeSjrSsx(value) {
      this.form.sjrsf = value[0];
      this.form.sjrcs = value[1];
      this.form.sjrqx = value[2];
    },
    delDkcb(id) {
      this.$confirm('确定删除该待处置清单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: id
        };
        this.$api.czdj.delDycb(params).then(res => {
          if (res.success == 'true') {
            this.$message({ message: res.message, type: 'success' });
            this.getWrkqd();
            this.getDdyqd();
          } else {
            this.$message({ message: res.message, type: 'error' });
          }
        });
      });
    },
    fromateCzyy(value) {
      if (value == '01') {
        return '移交公物仓';
      } else if (value == '02') {
        return '上缴专管部门';
      } else if (value == '03') {
        return '自行处置';
      } else {
        return value;
      }
    },
    getRKwzmx(id) {
      var param = {
        ywcb_id: id
      };
      this.$api.czdj.queryWzmx(param).then(res => {
        this.dywzmxList = res.body.default.dataset;
        if (this.dycbList.length != 0) {
          this.dycbList.forEach(function(c) {
            if (c.id == id) {
              if (!c.show) {
                c.show = true;
              } else {
                c.show = false;
              }
            } else {
              c.show = false;
            }
          });
        }
      });
    },
    delDkcbWzmx(id) {
      this.$confirm('确定删除该物证？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: id,
          rk_id: this.formInline.id
        };
        this.$api.czdj.delWzmx(params).then(res => {
          if (res.success == 'true') {
            this.$message({ message: res.message, type: 'success' });
            this.getWrkqd();
            this.getDdyqd();
          } else {
            this.$message({ message: res.message, type: 'error' });
          }
        });
      });
    },
    changeWlps() {
      if (this.form.iswl) {
        this.dialogTableVisible = true;
        this.form.yyfs = '1';
      } else {
        this.dialogTableVisible = false;
        this.form.yyfs = '';
        this.form.wtr_id = '';
      }
    },
    handlerByName() {
      this.$router.push({
        name: 'organizationDetail',
        params: {
          id: this.formInline.ajxx_id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../styles/common.less';
@import '../../page-main';

/deep/ .el-dialog__body {
  padding-top: 10px;
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
                height: 62px;
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
                    &.one {
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
