<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
  /deep/.el-textarea__inner {width:102%}
  /deep/.el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none
  }
  /deep/.el-upload--picture-card {
    width: 80px; height: 80px;
  }
  /deep/.el-upload--picture-card i {
    position: relative; top: -28px;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 80px; height: 80px; float: left;
  }

  .divCaseInfo {
    width: 90%;
    margin: 0 auto
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .caseInfo {
    border: 1px solid #dddddd;
    clear: both;
    background: #f7f7f9;
    height: 66vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .caseInfoTitle {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #dddddd;
    font-weight: bold;
    background: #f7f7f9;
    text-indent: 1em;
    line-height: 30px;
  }

  .caseInfoTextAll {
    background: #f7f7f9
  }

  .wzxx_tree {
    overflow-y: auto;
    height: 46vh;
  }

  .customWidth {
    width: 80%;
    height: 500px;
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
            新增案件物证信息
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 10px">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-tabs type="border-card" v-model="activeName" :before-leave="handleClick">
            <el-tab-pane label="案件信息" name="caseInfo">
              <div class="divCaseInfo">
                <el-form :model="ajxxForm" :label-position="right" label-width="80px" status-icon :rules="rules" ref="ajxxForm"
                         class="demo-wzxxForm" size="mini">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="案件编号"  prop="ajbh">
                        <el-input v-model="ajxxForm.ajbh" :readonly="false" placeholder="请输入案件编号"
                                  size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="案件名称" prop="ajmc">
                        <el-input v-model="ajxxForm.ajmc" placeholder="请输入案件名称"
                                  size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="录入部门"  prop="ba_dept_name">
                        <el-input v-model="ajxxForm.ba_dept_name" :readonly="true"
                                  size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="录入人员" prop="bary_name">
                        <el-input v-model="ajxxForm.bary_name" :readonly="true"
                                  size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="联系电话" prop="lxdh">
                        <el-input v-model="ajxxForm.lxdh"  placeholder="请输入联系电话"
                                  size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="嫌疑人" prop="xyr">
                        <el-input v-model="ajxxForm.xyr"  placeholder="请输入嫌疑人" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="案件类型" prop="sfsa" size="mini">
                        <el-radio-group v-model="ajxxForm.sfsa" size="mini">
                          <el-radio-button label="1">刑事案件</el-radio-button>
                          <el-radio-button label="0">行政案件</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="备注信息" prop="remark">
                        <el-input
                          style="width: 98%"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入备注"
                          v-model="ajxxForm.remark"
                          size="mini">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="文书图片" label-width="80" prop="wstp" style="position: relative; left: 13px">
                          <el-tooltip class="item" effect="light" v-model="ajxxForm.wstp" content="提示：格式仅允许上传（JPG,JPEG,PNG）" placement="right">
                          <el-button>{{picNum}}</el-button>
                        </el-tooltip>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label=""  label-width="80" prop="pass" style="position: relative; left: 82px">
                        <el-upload
                          ref="fileListAnJian"
                          action="#"
                          :on-change="getBeforeUploadAnJian"
                          :before-remove="handleRemoveAnJian"
                          :on-preview="handlePictureCardPreview"
                          :file-list="imgListAnJian"
                          list-type="picture-card"
                          :auto-upload="false"
                          accept=".jpg,.png,.gif,.jpeg">
                          <i slot="default" class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
<!--                <el-row style="position: relative; left: 16px">-->
<!--                  <el-col :span="8">-->
<!--                    <div class="grid-content bg-purple">-->
<!--                      <div style="width: 500px; height: 120px; position: relative; left: 23px;">-->
<!--                        <div style="height: 120px; float: left; width: 20px; margin-right: 10px">-->
<!--&lt;!&ndash;                          <i class="el-icon-arrow-left" style="position: relative; top: 45px; font-size: 20px"></i>&ndash;&gt;-->
<!--                        </div>-->
<!--                        <div style="width: 410px; overflow-y: hidden; overflow-x: auto; height: 130px;">-->
<!--                          <div style="width: 700px;">-->
<!--                            <div class="demo-image__preview" style="position: relative;  float: left;">-->
<!--                              <div v-for="(item, index) of imgListAnJian" style="width: 100px; height: 100px; float: left; margin-left: 10px;position: relative;">-->
<!--                                <span v-show="delIcon" style="font-size: 20px; color: red; display: inline-block; height: 30px; width: 30px; z-index: 999; position: relative; left: 85px"  @click="handleRemoveAnJian(item.id)"><i class="el-icon-error"></i></span>-->
<!--                                <el-image-->
<!--                                  style="width: 100px; height: 100px; position: relative; top: -20px"-->
<!--                                  :key="item.id"-->
<!--                                  :src="item.file_path"-->
<!--                                  :preview-src-list="srcList">-->
<!--                                </el-image>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div-->
<!--                          style="height: 120px;width: 20px; float: right; position: relative; top: -85px; left: -30px">-->
<!--&lt;!&ndash;                          <i class="el-icon-arrow-right" style="position: relative; font-size: 20px"></i>&ndash;&gt;-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </el-col>-->
<!--                </el-row>-->
                <div style="float: right; position: relative; top: -10px; right: 12px">
                  <el-button type="primary" size="mini" icon="el-icon-check" @click="saveAjxx('1')">保存并编辑物证</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-check" @click="saveAjxx('0')">保存</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-close" @click="close">关闭</el-button>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="物证信息" name="thingInfo" >
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="caseInfo">
                      <div class="caseInfoTitle">物证列表({{numWuZheng}}个物证)</div>
                      <div class="caseInfoText">
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              <div style="float: right; position: relative; top: 10px; right: 12px">
                                <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteWzxx()">删除
                                </el-button>
                                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addWzxx()">新增
                                </el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              <div style="width: 95%; margin: 0 auto; position: relative; top: 20px">
                                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                              <el-card class="box-card" style="width: 95%; margin: 0 auto; position: relative; top: 30px">
                                <el-tree
                                  class="filter-tree"
                                  :data="treeData"
                                  :props="treeProps"
                                  :default-expand-all="false"
                                  :filter-node-method="filterNode"
                                  @node-click="refresh"
                                  ref="tree">
                                </el-tree>
                              </el-card>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                  <el-dialog
                    title="选择物证类别"
                    :visible.sync="wzlbDialog"
                    :append-to-body="true"
                    :modal="true"
                    width="30%">
                    <div class="ck_tree">
                      <el-input placeholder="请输入过滤条件" v-model="wzlbFilterText" size="mini"></el-input>
                      <el-tree
                        class="filter-tree"
                        node-key="id"
                        :data="wzlbTreeData"
                        :props="wzlbTreeProps"
                        @node-click="selectData"
                        :expand-on-click-node="false"
                        :filter-node-method="wzlbFilterNode"
                        @dblclick="chooseWllb"
                        ref="wzlbtree">
                      </el-tree>
                    </div>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="wzlbDialog = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="chooseWllb()">确 定</el-button>
              </span>
                  </el-dialog>
                  <el-dialog
                    title="个性化信息"
                    :visible.sync="gxhxxDialog"
                    :append-to-body="true"
                    :modal="true"
                    width="70%"
                    style="">
                    <el-form :model="gxhxxForm" ref="gxhxxForm" label-width="180px" :rules="gxhxxRules" size="mini" label-position="right">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="号牌种类" prop="cph">
                            <el-input v-model="gxhxxForm.cph" size="mini" placeholder="请输入号牌种类" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="车辆类型" prop="clx">
                            <el-input v-model="gxhxxForm.clx" size="mini" placeholder="请输入车辆类型" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="车辆颜色" prop="cys">
                            <el-input v-model="gxhxxForm.cys" size="mini" placeholder="请输入车辆颜色" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="车主姓名" prop="czxm">
                            <el-input v-model="gxhxxForm.czxm" size="mini" placeholder="请输入车主姓名" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="车主证件号" prop="czzjh">
                            <el-input v-model="gxhxxForm.czzjh" size="mini" placeholder="请输入车主证件号" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="车主地址" prop="czdz">
                            <el-input v-model="gxhxxForm.czdz" size="mini" placeholder="请输入车主地址" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="车主联系电话" prop="czdh">
                            <el-input v-model="gxhxxForm.czdh" size="mini" placeholder="请输入车主联系电话" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="保险情况" prop="bxqk">
                            <el-input v-model="gxhxxForm.bxqk" size="mini" placeholder="请输入保险情况" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="被盗抢保险" prop="bdqbx">
                            <el-input v-model="gxhxxForm.bdqbx" size="mini" placeholder="请输入被盗抢保险" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="品牌型号" prop="ppxh">
                            <el-input v-model="gxhxxForm.ppxh" size="mini" placeholder="请输入品牌型号" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="车架号" prop="cbdm">
                            <el-input v-model="gxhxxForm.cbdm" size="mini" placeholder="请输入车架号" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="牌照号码" prop="pzhm">
                            <el-input v-model="gxhxxForm.pzhm" size="mini" placeholder="请输入牌照号码" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="行驶里程" prop="xslc">
                            <el-input v-model="gxhxxForm.xslc" size="mini" placeholder="请输入行驶里程" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="重要装备" prop="zyzb">
                            <el-input v-model="gxhxxForm.zyzb" size="mini" placeholder="请输入重要装备" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="车辆状况" prop="clzk">
                            <el-input v-model="gxhxxForm.clzk" size="mini" placeholder="请输入车辆状况" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="机动车发动机号" prop="fdjh">
                            <el-input v-model="gxhxxForm.fdjh" size="mini" placeholder="请输入机动车发动机号"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="购置时间" >
                            <el-date-picker type="date" v-model="gxhxxForm.cdjsj" style="width: 100%" size="mini"
                                            placeholder="请输入购置时间" format="yyyy-MM-dd" value-format="yyyyMMdd"
                                            clearable></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="文物等级描述" prop="wwdjms">
                            <el-input v-model="gxhxxForm.wwdjms" size="mini" placeholder="请输入文物等级描述"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="文物准许市场流通标识" prop="sjxk">
                            <el-input v-model="gxhxxForm.sjxk" size="mini" placeholder="请输入文物准许市场流通标识"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="文物准许出境标识" prop="cjbz">
                            <el-input v-model="gxhxxForm.cjbz" size="mini" placeholder="请输入文物准许出境标识"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="物品价值（人民币元）" prop="wpjz">
                            <el-input v-model="gxhxxForm.wpjz" size="mini" placeholder="请输入物品价值（人民币元）"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="物品真伪标识" prop="wpzwbz">
                            <el-input v-model="gxhxxForm.wpzwbz" size="mini" placeholder="请输入物品真伪标识"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="货币种类代码" prop="hbzldm">
                            <el-input v-model="gxhxxForm.hbzldm" size="mini" placeholder="请输入货币种类代码"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="货币面值" prop="hbmz">
                            <el-input v-model="gxhxxForm.hbmz" size="mini" placeholder="请输入货币面值" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="计量单位" prop="jldw">
                            <el-input v-model="gxhxxForm.jldw" size="mini" placeholder="请输入计量单位" clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="物品数量" prop="wpsl">
                            <el-input v-model="gxhxxForm.wpsl" size="mini" placeholder="请输入物品数量" clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="货币价值(人民币)" prop="hbjzrmb">
                            <el-input v-model="gxhxxForm.hbjzrmb" size="mini" placeholder="请输入货币价值(人民币)"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="货币真伪标识" prop="hbzwbs">
                            <el-input v-model="gxhxxForm.hbzwbs" size="mini" placeholder="请输入货币真伪标识"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="备注" prop="bz">
                            <el-input type="textarea" v-model="gxhxxForm.bz" size="mini" placeholder="请输入备注"
                                      clearable></el-input>
                          </el-form-item>
                        </el-col>

                      </el-row>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="gxhxxDialog = false" size="mini">关闭</el-button>
                <el-button type="primary" size="mini" @click="saveGxgxx()">保存</el-button>
              </span>
                  </el-dialog>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light" style="margin-left: 15px">
                    <div class="caseInfo">
                      <div class="caseInfoTitle">物证信息</div>
                      <div style="float: right; position: relative; top: 2px; right: 10px;z-index: 3">
                        <el-button type="primary" size="mini"  @click="openGxgxx()">个性化物证信息
                        </el-button>
                      </div>
                      <el-row>
                        <el-col :span="24">
                          <div class="grid-content bg-purple-dark"
                               style="width: 90%; margin: 0 auto; position: relative; top: 10px">
                            <el-form :model="wzxxForm" status-icon :rules="wzxxRules" ref="wzxxForm" label-width="100px"
                                     class="demo-wzxxForm" size="mini">
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label="物证编码" label-width="80" prop="wzbh">
                                    <el-input v-model="wzxxForm.wzbh" style="width: 70%"
                                              placeholder="请输入物证编码" size="mini" :readonly="false"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="物证类别" label-width="80" prop="wzlbbm">
                                    <!--<el-select v-model="wzxxForm.wzlb_id" placeholder="请选择物证类别"  style="width: 70%">
                                      <el-option
                                        v-for="item in wuzhengType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>-->
                                    <el-input v-model="wzxxForm.wzlb" placeholder="请选择物证类别" clearable
                                              @keyup.enter.native="onSubmit" @focus="chooseWzlb()" style="width: 70%" size="mini">
                                    </el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label="物证名称" label-width="80" prop="wzmc">
                                    <el-input v-model="wzxxForm.wzmc" style="width: 70%"
                                              placeholder="请输入物证名称" size="mini" clearable></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="物证数量" label-width="80" prop="wzsl">
                                    <el-input v-model="wzxxForm.wzsl" style="width: 70%"
                                              placeholder="请输入物证数量" size="mini" clearable></el-input>
                                    <!--<el-input-number v-model="wzxxForm.wzsl"  :min="0"  placeholder="请填写物证数量"></el-input-number>-->
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label="物证单位" label-width="80" prop="wzdw">
                                    <el-input v-model="wzxxForm.wzdw" style="width: 70%"
                                              placeholder="请输入物证单位" size="mini" clearable></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="入库状态" label-width="80" prop="state">
                                    <el-select v-model="wzxxForm.state" placeholder="请选择入库状态" style="width: 70%" :disabled="rkzdisabled">
                                      <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="8">
                                  <el-form-item label="是否涉案" label-width="80" prop="sfsa">
                                    <el-radio-group v-model="wzxxForm.sfsa" size="mini">
                                      <el-radio-button label="1">是</el-radio-button>
                                      <el-radio-button label="2">否</el-radio-button>
                                    </el-radio-group>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12" class="large">
                                  <el-form-item label="持有人" label-width="80" prop="xyr" style="position: relative; left: 22px">
                                    <el-input v-model="wzxxForm.xyr" style="width: 70%" placeholder="请输入持有人" size="mini" v></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="规格型号" label-width="80" prop="ggxh">
                                    <el-input v-model="wzxxForm.ggxh" style="width: 70%"
                                              placeholder="请输入规格型号" size="mini" clearable></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <el-form-item label="特征描述" label-width="80" prop="wztz">
                                    <el-input
                                      type="textarea"
                                      :rows="2"
                                      style="width: 83.5%"
                                      placeholder="请输入特征描述"
                                      v-model="wzxxForm.wztz" clearable>
                                    </el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <el-form-item label="备注信息" label-width="80" prop="remark" style="position: relative; left: 10px">
                                    <el-input
                                      type="textarea"
                                      :rows="2"
                                      style="width: 83.5%"
                                      placeholder="请输入备注"
                                      v-model="wzxxForm.remark" clearable>
                                    </el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <el-form-item label="物证照片"  prop="wzzp" style="position: relative; left: -22px">
                                    <el-tooltip class="item" effect="light" v-model="wzxxForm.wzzp" content="提示：格式仅允许上传（JPG,JPEG,PNG）" placement="right">
                                      <el-button>{{picNumWuZheng}}</el-button>
                                    </el-tooltip>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="24">
                                  <el-form-item label=""  label-width="80" prop="pass" style="position: relative; left: 80px">
                                    <el-upload
                                      ref="fileListWuZheng"
                                      action="#"
                                      :on-change="getBeforeUploadWuZheng"
                                      list-type="picture-card"
                                      :on-preview="handlePictureCardPreview"
                                      :before-remove="handleRemoveWuZheng"
                                      :file-list="imgListWuZheng"
                                      :auto-upload="false"
                                      accept=".jpg,.png,.gif">
                                      <i slot="default" class="el-icon-plus"></i>
                                    </el-upload>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
<!--                            <el-row style="position: relative; left: 16px">-->
<!--                              <el-col :span="8">-->
<!--                                <div class="grid-content bg-purple">-->
<!--                                  <div style="width: 500px; height: 120px; position: relative; left: 23px;">-->
<!--                                    <div style="height: 120px; float: left; width: 20px; margin-right: 10px">-->
<!--                                      &lt;!&ndash;                          <i class="el-icon-arrow-left" style="position: relative; top: 45px; font-size: 20px"></i>&ndash;&gt;-->
<!--                                    </div>-->
<!--                                    <div style="width: 410px; overflow-y: hidden; overflow-x: auto; height: 130px;">-->
<!--                                      <div style="width: 700px;">-->
<!--                                        <div class="demo-image__preview" style="position: relative;  float: left;">-->
<!--                                          <div v-for="(item, index) of imgListWuZheng" style="width: 100px; height: 100px; float: left; margin-left: 10px;position: relative;">-->
<!--                                            <span v-show="delIcon" style="font-size: 20px; color: red; display: inline-block; height: 30px; width: 30px; z-index: 999; position: relative; left: 85px"  @click="handleRemoveWuZheng(item.id)"><i class="el-icon-error"></i></span>-->
<!--                                            <el-image-->
<!--                                              style="width: 100px; height: 100px; position: relative; top: -20px"-->
<!--                                              :key="item.id"-->
<!--                                              :src="item.file_path"-->
<!--                                              :preview-src-list="srcListWuZheng">-->
<!--                                            </el-image>-->
<!--                                          </div>-->
<!--                                        </div>-->
<!--                                      </div>-->
<!--                                    </div>-->
<!--&lt;!&ndash;                                    <div style="height: 120px;width: 20px; float: right; position: relative; top: -85px; left: -30px">&ndash;&gt;-->
<!--&lt;!&ndash;                                      &lt;!&ndash;                          <i class="el-icon-arrow-right" style="position: relative; font-size: 20px"></i>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                                    </div>&ndash;&gt;-->
<!--                                  </div>-->
<!--                                </div>-->
<!--                              </el-col>-->
<!--                            </el-row>-->
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-row :span="24">
                          <div style="float: right; position: relative; top: -5px; right: 70px">
                            <el-button type="primary" size="mini" icon="el-icon-plus" @click="saveWzxx('0')">保存并新增</el-button>
                            <el-button type="primary" size="mini" icon="el-icon-check" @click="saveWzxx('1')">保存</el-button>
                            <el-button type="primary" size="mini" icon="el-icon-close" @click="close()">关闭</el-button>
                          </div>
                        </el-row>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body='false' title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>
<script>import {translation} from '@/utils/translation'
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        numWuZheng: 0,
        imgListWuZheng: [],
        srcListWuZheng: [],
        delIcon: true, // 是否显示删除按钮
        disPlayPic: false,
        picNum: '没有上传图片',
        picNumWuZheng: '没有上传图片',
        anJianId: '',
        wzId: '',
        imgInfo: {},
        imgCount: '',
        baseImgList: [],
        loading: true,
        value1: '',
        options: [{
          value: '1',
          label: '待入库'
        }, {
          value: '0',
          label: '无需入库'
        },
        ],
        value: '',
        rkzdisabled:false,
        wzxxForm: {},
        ajxxForm: {},
        gxhxxForm: {},
        treeData: [],
        selectNode: [],
        selectWzxxId: '',
        treeProps: {
          children: 'child',
          label: 'wzmc',
          value: 'id'
        },
        isAjsave:true,
        filterText: '',
        activeName: 'caseInfo',
        pass: '',
        radio2: '1',
        radio1: '1',
        gxhxxDialog: false,
        rules: {
          ajmc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min:0,max:100,message:'最多可输入100个字符'}
          ],

          sfsa: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          ajbh: [{required: true, message: '这是必填字段', trigger: 'blur'},
           {validator:this.checkSpace, trigger: 'blur'}],
          ba_dept_name: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          bary_name: [{required: true, message: '这是必填字段', trigger: 'blur'}],
           /* wstp: [{required: true, message: '这是必填字段', trigger: 'blur'}],*/
          xyr: [

            {min:0,max:50,message:'最多可输入50个字符'}
          ],
          lxdh: [


            {validator:this.checkPhone, trigger: 'blur'}

          ],
          remark: [

            {min:0,max:1000,message:'最多可输入1000个字符'}
          ]
        },
        wzxxRules: {
          wzbh: [{required: true, message: '这是必填字段', trigger: 'blur'},
          {validator:this.checkSpace, trigger: 'blur'}],
         /*   wzzp: [{required: true, message: '这是必填字段', trigger: 'blur'}],*/
          wzmc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min:0,max:100,message:'最多可输入100个字符'}
          ],

          wzlbbm: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          wzdw: [{required: true, message: '这是必填字段', trigger: 'blur'},
            {min:0,max:10,message:'最多可输入10个字符'}],
          wzsl: [{required: true, message: '这是必填字段', trigger: 'blur'},
            {validator:this.checkFloat, trigger: 'blur'}

          ],
          state: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          sfsa: [{required: true, message: '这是必填字段', trigger: 'blur'}],
          wztz: [{required: true, message: '这是必填字段', trigger: 'blur'},
            {min:0,max:200,message:'最多可输入200个字符'}],
          xyr:[{min:0,max:50,message:'最多可输入50个字符'}],
          ggxh:[{required: true, message: '这是必填字段', trigger: 'blur'},
          {min:0,max:50,message:'最多可输入50个字符'}],
          remark: [

            {min:0,max:1000,message:'最多可输入1000个字符'}
          ]
        },
        gxhxxRules:{
          cph:[{min:0,max:64,message:'最多可输入64个字符'}],
          clx:[{min:0,max:32,message:'最多可输入32个字符'}],
          cys:[{min:0,max:32,message:'最多可输入32个字符'}],
          czxm:[{min:0,max:32,message:'最多可输入32个字符'}],
          czzjh:[{min:0,max:64,message:'最多可输入64个字符'}],
          czdz:[{min:0,max:256,message:'最多可输入256个字符'}],
          czdh:[{validator:this.checkPhone, trigger: 'blur'}],
          bxqk:[{min:0,max:512,message:'最多可输入512个字符'}],
          bdqbx:[{min:0,max:256,message:'最多可输入256个字符'}],
          ppxh:[{min:0,max:256,message:'最多可输入256个字符'}],
          cbdm:[{min:0,max:256,message:'最多可输入256个字符'}],
          pzhm:[{min:0,max:256,message:'最多可输入256个字符'}],
          xslc:[{min:0,max:256,message:'最多可输入256个字符'}],
          zyzb:[{min:0,max:256,message:'最多可输入256个字符'}],
          clzk:[{min:0,max:256,message:'最多可输入256个字符'}],
          fdjh:[{min:0,max:128,message:'最多可输入128个字符'}],
          wwdjms:[{min:0,max:256,message:'最多可输入256个字符'}],
          sjxk:[{min:0,max:256,message:'最多可输入256个字符'}],
          cjbz:[{min:0,max:256,message:'最多可输入256个字符'}],
          wpjz:[{min:0,max:128,message:'最多可输入128个字符'}],
          wpzwbz:[{min:0,max:128,message:'最多可输入128个字符'}],
          hbzldm:[{min:0,max:256,message:'最多可输入256个字符'}],
          hbmz:[{min:0,max:128,message:'最多可输入128个字符'}],
          jldw:[{min:0,max:128,message:'最多可输入128个字符'}],
          wpsl:[{min:0,max:128,message:'最多可输入128个字符'},
            {validator:this.checkInt, trigger: 'blur'}],
          hbjzrmb:[{min:0,max:14,message:'最多可输入14个字符'},
            {validator:this.checkFloat, trigger: 'blur'}],
          hbzwbs:[{min:0,max:128,message:'最多可输入128个字符'}],
          bz:[{min:0,max:500,message:'最多可输入500个字符'}]

        },
        textarea: '',
        fileList: [],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [], // 物证大图显示
        imgListAnJian: [], // 案件图片列表
        srcListAnJian: [], // 案件大图显示
        urlImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imgList: [

        ],
        wzlbDialog: false,
        wzlbTreeData: [],
        wzlbTreeProps: {
          children: 'children',
          label: 'showname'
        },
        wzlbFilterText: '',
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      wzlbFilterText(val) {
        this.$refs.wzlbtree.filter(val);
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
      }
    },
    methods: {
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
      //校验空格
      checkSpace(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^[^ ]+$/

          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('不允许输入空格'))
          }
        }
      },
      handleClick(activeName, oldActiveName) {

       if(oldActiveName=='caseInfo'){

        if (this.isAjsave) {
    this.$message.error('不可跳转到物证信息页面，请先保存案件信息！');
          return false
        }
       }

      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemoveAnJian (file, fileList) {
          let fileRemove = file
          let self = this
          return this.$confirm('是否确定删除该图片 ?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(function (file, fileList) {
              self.$api.upDataPic.delPicWuzheng({id: fileRemove.id}).then(function (res) {
                  if (res.content === 'default') {
                      self.$message({
                          message: '删除图片成功！',
                          type: 'success'
                      });
                      self.getAnJianPic(self.anJianId)
                  }
              })
          }).catch(function (e) {
              throw(e)
              stop()
              return false
          });
      }, // 删除案件图片
      handleRemoveWuZheng (file) { // 删除图片
          let self = this
          let fileRemove = file
          return this.$confirm('是否确定删除该图片 ?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(function (file, fileList) {
              self.$api.upDataPic.delPicWuzheng({id: fileRemove.id}).then(function (res) {
                  if (self.imgListWuZheng.length >= 2) {
                      self.picNumWuZheng = '已上传' + (self.imgListWuZheng.length - 1) + '张图片'
                  } else {
                      self.picNumWuZheng = '没有上传图片'
                  }
                  if (res.content === 'default') {
                      self.$message({
                          message: '删除图片成功！',
                          type: 'success'
                      });
                  }
                  self.getPicList(self.wzId)
                  // self.getWuZhengPic(self.wzId)
              })
          }).catch(function (e) {
              throw(e)
              stop()
              return false
          });




      },
      // 设置数字或小数验证规则
      checkFloat(rule, value, callback)  {
        if (!value) {
          callback()
        }else if(value == 0){
          return callback(new Error('请输入大于0的整数或小数'))
        } else {
          const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入整数或小数'))
          }
        }
      },
      // 设置整数验证规则
      checkInt(rule, value, callback)  {
        if (!value) {
          callback()
        } else {
          const reg = /^[0-9]*[1-9][0-9]*$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入整数'))
          }
        }
      },
      getPicList(wuZhengId) {
        let self = this
        this.$api.upDataPic.getPicWuzheng({ywid: wuZhengId}).then(res => {
          if (res.trueOrFalse === 'false') {
          } else {
              if (res.content === undefined) {
                self.picNumWuZheng = '没有上传图片'
              } else {
                  self.picNumWuZheng = '已上传' + res.content.length + '张图片'
                  self.imgListWuZheng = res.content
                  for (let i = 0; i < res.content.length; i++) {
                      self.imgListWuZheng[i].url = res.content[i].file_path
                  }
              }
          }
        }).catch(function () {
          // self.$message.error('图片加载失败！');
        })
      },
      init() {
        let self = this
        var params = {}
        this.$api.wzdj.getInitAjxxNewBh(params).then((res) => {
          self.$nextTick(() => {
            self.anJianId = res.body.default.id
            self.ajxxForm = res.body.default
            // self.getPicList(res.body.default.id)
            //self.addWzxx()
          })
        })
      },
      // getPicList (ywid) {
      //   var params = {
      //     ywid: ywid
      //   }
      //   let self = this
      //   this.$api.upDataPic.getPicWuzheng(params).then(res => {
      //     if (res.content.length >= 1) {
      //       self.picNum = '已上传' + res.content.length + '张图片'
      //       self.srcListAnJian = res.content
      //       res.content.forEach(function (e, i) {
      //         // self.srcListAnJian.push(e.file_path)
      //         self.srcList.push(e.file_path)
      //       })
      //     }
      //   })
      // },
      getBeforeUploadAnJian (file) {  // 上传案件图片
        let self = this
        let excelfileExtend = '.jpg,.png,.gif,.jpeg' // 设置文件格式
        let fileExtend = file.name
          .substring(file.name.lastIndexOf('.'))
          .toLowerCase()
        if (excelfileExtend.indexOf(fileExtend) <= -1) {
          this.$message.error('只能上传.jpg,.png,.gif,.jpeg格式')
          return false
        }
        if (this.anJianId) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.anJianId
          this.imgInfo.filename = translation(file.name)
            debugger
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)
            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                self.imgList = []
                self.$api.upDataPic.getPicWuzheng({ywid: self.anJianId}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                    self.$message({
                      message: '添加图片成功！',
                      type: 'success'
                    });
                      if (res.content.length >= 1) {
                          self.picNum = '已上传' + res.content.length + '张图片'
                          for (let i = 0; i < res.content.length; i++) {
                              self.$refs.fileListAnJian.uploadFiles[i].id = res.content[i].id
                              self.imgListAnJian[i] = {
                                  id: res.content[i].id,
                                  url: res.content[i].file_path
                              }
                          }
                      }
                  }
                }).catch(function (err) {
                })
              }
            })
          });
        } else {
          self.$refs.fileListWuZheng.uploadFiles = []
          this.$message.error('请先选择左边栏的物证！');
          return false
        }
      },
      getBeforeUploadWuZheng (file) {  // 上传物证
        let self = this
        let excelfileExtend = '.jpg,.png,.gif,.jpeg' // 设置文件格式
        let fileExtend = file.name
          .substring(file.name.lastIndexOf('.'))
          .toLowerCase()
        if (excelfileExtend.indexOf(fileExtend) <= -1) {
          this.$message.error('只能上传.jpg,.png,.gif,.jpeg格式')
          return false
        }
        if (this.wzId) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.wzId
          this.imgInfo.filename = file.name
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)
            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                self.$api.upDataPic.getPicWuzheng({ywid: self.wzId}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                      if (res.content.length >= 1) {
                          self.picNumWuZheng = '已上传' + res.content.length + '张图片'
                          self.$message({
                              message: '添加图片成功！',
                              type: 'success'
                          });
                          for (let i = 0; i < res.content.length; i++) {
                              self.$refs.fileListWuZheng.uploadFiles[i].id = res.content[i].id
                              self.imgListWuZheng[i] = {
                                  id: res.content[i].id,
                                  url: res.content[i].file_path
                              }
                          }
                      }
                  }
                }).catch(function (err) {
                  // self.$message.error('图片加载失败！');
                })

                //
                // self.$api.upDataPic.getPicWuzheng(window.location.href.split('editIndustry/')[1].split('/')[1]).then(res => {
                //   res.content.forEach(function (e, i) {
                //     self.imgList.push('data:image/png;base64,' + e.file_content)
                //   })
                // })
              }
            })
          });
        } else {
          self.$refs.fileListWuZheng.uploadFiles = []
          this.$message.error('请先保存案件信息！');
          return false
        }
      },
      getBase64 (file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = '';
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      getWuZhengPic (id) {
        let self = this
        var params = {
          ywid: id
        }

        this.$api.upDataPic.getPicWuzheng(params).then(res => {
          if (res.content === undefined) {
            self.picNumWuZheng = '没有上传图片'
          } else {
              if (res.content.length >= 1) {
                  for (let i = 0; i < res.content.length; i++) {
                      self.imgListWuZheng[i].url = res.content[i].file_path
                  }
                  self.picNum = '已上传' + res.content.length + '张图片'
              }
          }

        })
      },
      getAnJianPic (anJianId) {
        let self = this
        var params = {
          ywid: anJianId
        }
        this.$api.upDataPic.getPicWuzheng(params).then(res => {
          if (res.content === undefined) {
            self.picNum = '没有上传图片'
          } else {
            if (res.content.length >= 1) {
              self.picNum = '已上传' + res.content.length + '张图片'
              self.imgListAnJian.forEach(function (e, i) {
                e.url = e.file_path
              })
            }
          }

        })
      },
      chooseWllb() {
        if(this.selectNode.jc !='3'){
          this.$message.error('请选择第二级物证类别');
          return false;
        }
        this.wzxxForm.wzlb = this.selectNode.name
        this.wzxxForm.wzlbbm = this.selectNode.code
        this.wzlbDialog = false;
      },
      goBack() {
        this.$util.goBack(this)
      },
      saveAjxx(type) {
        this.$refs.ajxxForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.ajxxForm)
            this.$api.wzdj.saveOrupdate(params).then((res) => {
              if (res.success == 'true') {
                this.isAjsave = false
                this.$message({message: res.message, type: 'success'})
                var paramsaj = {
                  id: this.ajxxForm.id
                }
                this.$api.wzdj.get(paramsaj).then((res) => {
                  this.$nextTick(() => {
                    //this.dataForm = res.body.default;
                    //console.log(res.body.default)
                    this.ajxxForm = res.body.default;
                    this.findTree();
                    this.addWzxx()


                  })
                })
                if (type === '1') {
                  this.activeName = 'thingInfo';
                }
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      saveWzxx(type) {
        let self = this
        this.$refs.wzxxForm.validate((valid) => {
          if (valid) {
            if (self.wzxxForm.ajxx_id) {
              let params = Object.assign({}, self.wzxxForm)
              this.$api.wzdj.saveOrUpdateWz(params).then((res) => {
                if (res.success === 'true') {
                  this.$message({message: res.message, type: 'success'})
                  this.findTree();
                  if (type === '1') {
                    this.getWzxx(this.wzxxForm.id)
                  } else {
                    this.imgListWuZheng = []
                    this.srcListWuZheng = []
                    this.addWzxx();
                  }
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            } else {
              self.$message.error('请先保存案件信息！')
            }
            }

        })
      },
      //左侧树
      filterNode(value, data) {
        if (!value) return true;
        return data.wzmc.indexOf(value) !== -1;
      },
      wzlbFilterNode(value, data) {
        if (!value) return true;
        return data.showname.indexOf(value) !== -1;
      },
      refresh(data) {
        this.wzId = data.id
        this.selectWzxxId = data.id;
        this.getWzxx(data.id)
        this.getPicList(data.id)
      },
      findTree() {
        this.treeData = [];
        var param = {id: this.ajxxForm.id};
        this.$api.wzdj.creteWzxxTree(param).then((res) => {
          if (res.success === "true") {
            this.numWuZheng = res.data.length
            this.treeData = res.data
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      getWzxx(id) {
        var params = {
          id: id
        }
        let that = this;
        this.$api.wzdj.getWzxxByid(params).then((res) => {
          this.$nextTick(() => {
            this.wzxxForm = res.body.default;
            var state = res.body.default.state;
            if(state!='0' && state!='1'){
              this.wzxxForm.state = that.formateRkzt(state)
              this.rkzdisabled = true;
            }else{
              this.rkzdisabled = false;
            }
          })
        })
      },
      selectData(data) {
        this.selectNode = data;
      },
      formateRkzt(value){
        if(value=='2'){
          return '已入库'
        }else if(value=='3'){
          return '临时出库'
        }else if(value=='4'){
          return '永久出库'
        }else{
          return value
        }
      },
      addWzxx() {
        let self = this
          self.imgListWuZheng.length = 0
          self.picNumWuZheng = '没有上传图片'
        self.$refs.fileListWuZheng.uploadFiles.length = 0
        var params = {
          ajxx_id: this.ajxxForm.id,
          ajbh: this.ajxxForm.ajbh
        }
        this.$api.wzdj.getInitWzxx(params).then((res) => {
          this.$nextTick(() => {
              self.wzId = res.body.default.id
              self.wzxxForm = res.body.default;
              self.wzxxForm.wzsl = res.body.default.wzsl=='0'?'':res.body.default.wzsl
              self.rkzdisabled = false;
          })
        })
      },
      deleteWzxx() {
        if (this.selectWzxxId == '') {
          this.$message({
            message: '请从左侧树中选择一个节点！',
            showClose: true,
            type: 'warning'
          });
        } else {
          this.$confirm('确定删除该物证信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = {
              id: this.selectWzxxId
            };
            this.$api.wzdj.wzTreedel(params).then((res) => {
              if (res.success === "true") {
                this.$message({message: res.message, type: 'success'})
                this.findTree();
                this.addWzxx();
                this.selectWzxxId = '';
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          })
        }
      },
      close() {
        this.$util.goBack(this)
      },
      chooseWzlb() {
        var param = {
          valid_flag: '1'
        }
        this.$api.wzdj.wzfltreetable(param).then((res) => {
          if (res.success === "true") {
            this.wzlbTreeData = res.data
            this.wzlbDialog = true;
            this.wzlbFilterText='';
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      openGxgxx() {
        var params = {
          wzxx_id: this.wzxxForm.id
        }
        this.$api.wzdj.getWzgxhInfo(params).then((res) => {
          this.$nextTick(() => {
            this.gxhxxForm = res.body.default;
            this.gxhxxDialog = true;
          })
        })
      },
      saveGxgxx() {
        this.$refs.gxhxxForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.gxhxxForm)
            this.$api.wzdj.submitWzgxh(params).then((res) => {
              if (res.success == 'true') {
                this.$message({message: res.message, type: 'success'})
                this.gxhxxDialog = false
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }})
      }
    }
  }
</script>
