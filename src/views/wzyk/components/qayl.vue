<style lang="less" scoped>
  /deep/.el-icon-circle-close {
    color: #fff;
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

  .el-carousel__item.el-carousel__item--card.is-in-stage {
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .saveCk {
    position: relative;
    left: 15px;
    top: 10px;
    border-bottom: 1px solid #e6e6e6;
    line-height: 28px;
  }

  .falvWs {
    position: relative;
    left: 48px;
    top: -17px
  }

  .picListSearch {
    height: 42px;
    width: 95%;
    margin: 0 auto;
    background: #eeeeee;
    position: relative;
    top: 10px
  }

  .picListPaiXu {
    width: 200px;
    float: left;
    position: relative;
    top: 8px;
    left: 10px
  }

  .creatTime {
    width: 80px;

    background: #2570b3;
    color: #fff;

    text-align: center;
  }

  .searchRight {
    width: 60%;
    float: right
  }

  .wuNum {
    color: #9a9a9a;
    line-height: 45px;
    float: right
  }

  .picListSearchInp {
    position: relative;
    left: 10px;
    float: right;
    margin-right: 10px;
    padding: 8px 0;
  }

  .divPicList {
    width: 95%;
    margin: 0 auto;
    clear: both;
    position: relative;
    left: -5px;
  }

  .picListImg {
    width: 100%;
    position: relative;
    img:hover {
      box-shadow: 3px 0px 3px rgba(0,0,0,0.9)/*blur值为15px*/
    }
  }

  .yirukuIcon {
    background: url("../../../images/yiruku.png");
    width: 54px;
    height: 54px;
    z-index: 99;
    position: absolute;
    display: block
  }

  .weirukuIcon {
    background: url("../../../images/weiruku.png");
    width: 54px;
    height: 54px;
    z-index: 99;
    position: absolute;
    display: block
  }

  .linshichukuIcon{
    background: url("../../../images/linshichuku.png");
    width: 54px;
    height: 54px;
    z-index: 99;
    position: absolute;
    display: block
  }

  .yongjiuchukuIcon{
    background: url("../../../images/yongjiuchuku.png");
    width: 54px;
    height: 54px;
    z-index: 99;
    position: absolute;
    display: block
  }

  .wuxurukuIcon{
    background: url("../../../images/wuxuruku.png");
    width: 54px;
    height: 54px;
    z-index: 99;
    position: absolute;
    display: block
  }

  /*.infoliImg {width: 100%; height: 28px; filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5; position: absolute; z-index: 100; bottom: 0; background: black;}
  .picnongyong {width: 100%; height: 28px; position: relative; z-index: 101; display: block; top: -50px; color: #fff; line-height: 13px; text-indent: 1em;clear: both}*/
  .bianNo {
    color: #858585;
  }

  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
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
            全案预览
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 9px">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-tabs type="border-card">
            <el-tab-pane label="全案预览(图片)">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="caseInfo">
                      <div class="caseInfoTitle">案件信息</div>
                      <div class="caseInfoText">
                        <div style="margin: 13px;">
                          <span style="color: #999999;">案件编号</span>
                          <span>{{caseInfo.ajbh}}</span>
                        </div>
                        <div style="margin: 13px">
                          <span style="color: #999999;">案件名称</span>
                          <span>{{caseInfo.ajmc}}</span>
                        </div>
                        <div style="margin: 13px">
                          <span style="color: #999999;">录入部门</span>
                          <span>{{caseInfo.ba_dept_name}}</span>
                        </div>
                        <div style="margin: 13px">
                          <span style="color: #999999;">录入人员</span>
                          <span>{{caseInfo.bary_name}}</span>
                        </div>
                        <div style="margin: 13px">
                          <span style="color: #999999;">案件类型</span>
                          <span>{{caseInfo.sfsa == '1'?'刑事案件':'行政案件'}}</span>
                        </div>
                        <div style="margin: 13px">
                          <span style="color: #999999;">法律文书</span>
                          <span v-if="fileList.length==0"> 无</span>
                          <div class="falvWs">
                            <template v-for="(item,index) in  fileList" v-if="fileList.length>0">
                              <div style="position: relative; left: 5px; margin-bottom: 10px">
                                <span><i class="el-icon-picture" style="font-size: 20px"></i> {{item.file_title}}</span>
                                <span style="display: block; position: relative; top: 2px; left: 50px; color: #2b85e4;"><em @click="yulanPic(item.file_path)">预览</em> | <em @click="downLoadPic(item.file_path)">下载</em></span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light" style="margin-left: 15px">
                    <div class="caseInfo">
                      <div class="caseInfoTitle">图片列表</div>
                      <el-row>
                        <el-col :span="24">
                          <div class="grid-content bg-purple-dark">
                            <div class="picListSearch">
                              <div class="picListPaiXu">
                                <el-row style="width: 160px">
                                  <el-col :span="12"><div class="grid-content bg-purple">
                                    <div :class="creatTimeClassTime" style="line-height: 25px" @click="timeCreat">创建时间<i :class="arrowTime"></i></div>
                                  </div></el-col>
                                  <el-col :span="12"><div class="grid-content bg-purple-light">
                                    <div :class="creatTimeClassMoRen" @click="moRenPai" style="line-height: 25px; text-align: center">默认排序</div>
                                  </div></el-col>
                                </el-row>
                              </div>
                              <div class="searchRight">
                                <div class="picListSearchInp">
                                  <el-form ref="form" :inline="true" :model="filters" label-width="75px" size="mini">
                                    <el-form-item label="">
                                      <el-input v-model="filters.wzbhormc" style="width: 150px"
                                          placeholder="名称/编号" clearable  @keyup.enter.native="getWzxxPicList"></el-input>
                                    </el-form-item>
                                    <el-form-item label="">
                                      <!--<el-select v-model="filters.lb" placeholder="请选择" style="width: 150px">-->
                                        <!--<el-option value="0" label="交通工具"></el-option>-->
                                        <!--<el-option value="1" label="其他"></el-option>-->
                                        <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                                        <!--&lt;!&ndash;v-for="item in options"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:key="item.value"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:value="item.value">&ndash;&gt;-->
                                        <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
                                      <!--</el-select>-->
                                      <el-input v-model="filters.wzlb" style="width: 150px" placeholder="物证类别" clearable  @keyup.enter.native="getWzxxPicList"></el-input>
                                    </el-form-item>
                                  </el-form>
                                </div>
                                <div class="wuNum">共 <b style="font-size: 20px">{{pageinfo.total}}</b> 件物证</div>
                              </div>
                            </div>
                            <div class="divPicList">
                              <el-row>
                                <template v-for="(item, index) in wzxxPicList"  v-if="wzxxPicList.length>0">
                                  <el-col :span="8" style="margin-top: 10px">
                                    <div class="grid-content bg-purple">
                                      <el-card class="box-card" style="margin-left: 10px; position: relative;">
                                        <div class="picListImg" @click="handlerByName(item.id)" style="cursor: pointer">
                                          <div class="yirukuIcon" v-if="item.state=='已入库'"></div>
                                          <div class="weirukuIcon" v-if="item.state=='未入库'"></div>
                                          <div class="linshichukuIcon" v-if="item.state=='临时出库'"></div>
                                          <div class="yongjiuchukuIcon" v-if="item.state=='永久出库'"></div>
                                          <div class="wuxurukuIcon" v-if="item.state=='无需入库'"></div>
                                          <img :src="item.imgurl||emptyImg" style=" width: 100%; height: 20vh" @click="handlerByName">
                                          <div class="infoliImg"
                                               style="filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5; width: 100%; height: 28px; background: black; z-index: 999; position: absolute; bottom: 41px; "></div>
                                          <div
                                            style="z-index: 1000; color: #fff; position: absolute; bottom: 44px; width: 100%; text-indent: 0.5em">
                                            <el-row>
                                              <el-col :span="24">
                                                <div class="grid-content bg-purple">
                                                  {{item.wzmc}}（{{item.wzsl}}{{item.wzdw}}）
                                                </div>
                                              </el-col>
<!--                                              <el-col :span="12">-->
<!--                                                <div class="grid-content bg-purple-light">-->
<!--                                                  持有人：{{item.xyr}}-->
<!--                                                </div>-->
<!--                                              </el-col>-->
                                            </el-row>
                                          </div>
                                          <div class="bianNo">
                                            <p style="min-width: 222px; word-wrap: break-word">编号：{{item.wzbh}}</p>
                                            <p>物证类别：{{item.wzlb}}</p>
                                          </div>
                                        </div>
                                      </el-card>
                                    </div>
                                  </el-col>
                                </template>
                              </el-row>
                              <el-row>
                                <div class="page">
                                  <div class="page-content">
                                    <el-pagination
                                      background
                                      @size-change="handleSizeChange1"
                                      @current-change="handleCurrentChange1"
                                      :current-page="pageinfo.pagenum"
                                      :page-sizes="[6,9,12]"
                                      :page-size="pageinfo.pagesize"
                                      layout="total, sizes, prev, pager, next, jumper"
                                      :total="pageinfo.total">
                                    </el-pagination>
                                  </div>
                                </div>
                              </el-row>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="全案预览(列表)">
              <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                  <template slot="title" style="font-weight: bold; text-indent: 1em">
                    案件信息
                  </template>
                  <hr/>
                  <div>
                    <el-row style="position: relative; top: 15px">
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">案件编号</span>
                            <span>{{caseInfo.ajbh}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">案件名称</span>
                            <span>{{caseInfo.ajmc}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">案件类型</span>
                            <span>{{caseInfo.sfsa == '1'?'刑事案件':'行政案件'}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row style="position: relative; top: 25px">
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">录入部门</span>
                            <span>{{caseInfo.ba_dept_name}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">录入人员</span>
                            <span>{{caseInfo.bary_name}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">嫌疑人</span>
                            <span>{{caseInfo.xyr==''?'无':caseInfo.xyr}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row style="position: relative; top: 35px">
                      <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999">备注</span>
                            <span>{{caseInfo.remark==''?'无':caseInfo.remark}}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div style="height: 100px; margin-top: 8px">
                    <el-row style="position: relative; top: 35px;">
                      <el-col :span="18">
                        <div class="grid-content bg-purple">
                          <div style="position: relative; left: 10px">
                            <span style="color: #999999; float: left">文书图片</span>
                            <div class="demo-image__preview" style="position: relative; float: left;">
                              <template v-for="(item,index) in fileList">
                                <el-image
                                  style="width: 100px; height: 100px;margin-left: 10px"
                                  :src="item.file_path||emptyImg"
                                  :preview-src-list="fileList1">
                                </el-image>
                              </template>
                              <div style="height: 55px"></div>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <el-collapse v-model="activeNames1">
                <el-collapse-item name="1">
                  <template slot="title" style="font-weight: bold; text-indent: 1em">
                    承办信息
                  </template>
                  <template v-for="item in cbdjxx">
                    <hr/>
                    <div>
                      <el-row style="position: relative; top: 15px">
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                            <div style="position: relative; left: 10px">
                              <span style="color: #999999">接收时间</span>
                              <span>{{item.jssj}}</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple-light">
                            <div style="position: relative; left: 10px">
                              <span style="color: #999999">检察官</span>
                              <span>{{item.cbrxm}}</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                            <div style="position: relative; left: 10px">
                              <span style="color: #999999">所属部门</span>
                              <span>{{item.cbbmmc}}</span>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div>
                      <el-row style="position: relative; top: 25px">
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                            <div style="position: relative; left: 10px">
                              <span style="color: #999999">备注</span>
                              <span>{{item.remark}}</span>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
<!--                    <div>-->
<!--                      <el-row style="position: relative; top: 35px">-->
<!--                        <el-col :span="8">-->
<!--                          <div class="grid-content bg-purple">-->
<!--                            <div style="position: relative; left: 10px">-->
<!--                              <span style="color: #999999">附件</span>-->
<!--                              <span>附件</span>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </el-col>-->
<!--                      </el-row>-->
<!--                    </div>-->
                    <div style="height: 10px;">
                    </div>
                  </template>
                </el-collapse-item>
              </el-collapse>
              <el-collapse v-model="activeNames2">
                <el-collapse-item name="1">
                  <template slot="title" style="font-weight: bold; text-indent: 1em">
                    物证信息
                  </template>
                  <hr/>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-card class="box-card">
                          <el-table :data="wzxxList" border :header-cell-style="{background:'#508dc3', color: '#fff'}"
                                    style="width: 100%;" highlight-current-row tooltip-effect="dark" size="mini">

                            <el-table-column type="index" label="序号" width="50">
                            </el-table-column>
                            <el-table-column prop="wzmc" label="物证名称" :show-overflow-tooltip="true">
                              <template slot-scope="scope">
                                <span style="color:#5287d8"
                                      @click="handlerByName(scope.row.id)">{{ scope.row.wzmc }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="state" label="物证状态" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="cfwz" label="存放位置" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="bgqx" label="保管(出库)期限" min-width="100px"
                                             :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="cyr_name" label="持有人" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="ajmc" label="案件名称" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column prop="ba_dept_name" label="录入部门" :show-overflow-tooltip="true">
                            </el-table-column>
                          </el-table>
                          <div class="page">
                            <div class="page-content">
                              <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5,10,15,20]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                              </el-pagination>
                            </div>
                          </div>
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="图片预览"
      :modal-append-to-body='false'
      :visible.sync="picYuLanDis"
      width="60%"
      height="70%"
      :before-close="handleClose">
      <img :src="picYulanPath" width="95%">
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
    <case-preview :display="this.centerDialogVisible" @closrDialog="setDialogVal"
                  :wzxx_id="this.wzxx_id"></case-preview>
  </el-card>
</template>
<script>
  import casePreview from "../../my-components/casePreview/casePreview"
  import {timeFormat} from '@/utils/datetime'

  export default {
    components: {
      casePreview
    },
    data() {
      return {
        picYuLanDis: false,
        picYulanPath: '',
        filters: {
          wzbhormc:'',
          timepx: '',
          wzlb: '',
        },
        arrowTime: 'el-icon-bottom',
        creatTimeClassTime: 'creatTime',
        creatTimeClassMoRen: '',
        wzxx_id: '',
        id: window.location.href.split('organizationDetail/')[1],
        caseInfo: {
          last_modified_dept_id: '',
          ajbh: '',
          ba_dw_id: '',
          fy_ajbh: '',
          jcy_ajbh: '',
          afdd: '',
          create_dept_id: '',
          last_modified_dept_name: '',
          remark: '',
          valid_flag: '',
          last_modifier_id: '',
          xyr: '',
          ba_dept_id: '',
          sjly: '',
          ajmc: '',
          ba_dept_name: '',
          bary_id: '',
          sfsa: '',
          jcy_ajmc: '',
          bary_name: '',
          id: '',
          created_time: '',
          lxdh: '',
          last_modified_time: '',
          create_dept_name: '',
          fy_ajmc: '',
          creator_id: '',
          creator_name: '',
          ba_dw_name: ''
        },
        cbdjxx: [],
        wzxxList: [],
        wzxxPicList:[],
        pageinfo:{
          pagenum:1,
          pagesize:6,
          total:0
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,
        activities: [],
        tableData: [],
        emptyImg:require("@/images/no-img.png"),
        imgList: [
          {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574835831118&di=34f79631c7270a60a565e418df649292&imgtype=0&src=http%3A%2F%2Fimages.missyuan.com%2Fattachments%2Fday_080820%2F20080820_6a25d2ca9bdb0cd34bf6i9gKCGcEpXnO.jpg',
            state: '0'
          },
          {url: 'http://a.hiphotos.baidu.com/image/pic/item/9a504fc2d5628535bdaac29e9aef76c6a6ef63c2.jpg', state: '1'},
          {
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574835883021&di=fa0a4c82774ebc27c8419b043679e7f0&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F543cec0b4e765.jpg',
            state: '0'
          },
          {url: 'http://f.hiphotos.baidu.com/image/pic/item/0e2442a7d933c8956c0e8eeadb1373f08202002a.jpg', state: '1'},
          {url: 'https://ac-r.static.booking.cn/images/hotel/max1024x768/890/89083962.jpg', state: '1'},
          {url: '', state: '1'},
        ],
        activeNames: ['1'],
        activeNames1: ['1'],
        activeNames2: ['1'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        srcList1: [
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        urlList:[
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        fileList:[],
        fileList1:[],
        centerDialogVisible: false,
        getImgBigNew: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getOrganizationDetail()
        this.getAjxx();
        // this.getWztp();
        this.getCbdjxx();
        this.getWzxxList();
        this.getWzxxPicList()
        this.getFileList();
      },
      getFileList(){
        let self = this
        var parmas = {
          ywid: this.id,
        };
        this.$api.common.getFileList(parmas).then((res) => {
          self.fileList = res.body.default.filelist||[]
          if(self.fileList[0]){
            self.fileList1[0] = res.body.default.filelist[0].file_path
          }
        })
      },
      handleClose () {
        this.picYuLanDis = false
        this.picYulanPath = ''
      },
      yulanPic (path) {
        this.picYuLanDis = true
        this.picYulanPath = path
      },
      timeCreat () {
        this.filters.timepx = '0'
        this.creatTimeClassTime = 'creatTime'
        this.creatTimeClassMoRen = ''
        this.arrowTime = 'el-icon-bottom'
        this.getWzxxPicList()
      },
      moRenPai () {
        this.filters.timepx = '1'
        this.creatTimeClassTime = ''
        this.creatTimeClassMoRen = 'creatTime'
        this.arrowTime = 'el-icon-top'
        this.getWzxxPicList()
      },
      getImg(val) {
        this.getImgBigNew = val

      },
      setDialogVal(val) {
        this.centerDialogVisible = val
      },
      handlerByName(getWzid) {
        this.wzxx_id = getWzid;
        this.centerDialogVisible = true
      },
      getOrganizationDetail() {
      },
      downLoadPic (url) {
        // let a = document.createElement('a')
        window.open(url, "_blank")
        // a.download = "file.jpg"
        // document.body.appendChild(a)
        // a.click()
      },
      goBack() {
        this.$util.goBack(this)
      },
      //改变分页大小
      handleSizeChange(val) {
        this.pageSize = val;
        this.getWzxxList();
      },
      //跳转页数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getWzxxList();
      },
      //改变分页大小
      handleSizeChange1(val) {
        this.pageinfo.pagesize = val;
        this.getWzxxPicList();
      },
      //跳转页数
      handleCurrentChange1(val) {
        this.pageinfo.pagenum = val;
        this.getWzxxPicList();
      },
      getAjxx() {
        var parmas = {
          id: this.id
        };
        this.$api.common.getAjxx(parmas).then((res) => {
          if(res.body.default){
            this.caseInfo = res.body.default;
          }
        })
      },
      getCbdjxx() {
        var parmas = {
          id: this.id
        };
        this.$api.common.getCbdjxx(parmas).then((res) => {
          if (res.body.default.cbdjlist && res.body.default.cbdjlist.length >= 1) {
            res.body.default.cbdjlist.forEach(function (e, i) {
              e.jssj = timeFormat(e.jssj)
            })
          }
          this.cbdjxx = res.body.default.cbdjlist
        })
      },
      getWzxxList() {
        var parmas = {
          id: this.id,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        };
        this.$api.common.getAjwzxx(parmas).then((res) => {
          if (+res.body.default.count > 0 && res.body.default.dataset.length >= 1) {
            this.total = Number(res.body.default.count);
            res.body.default.dataset.forEach(function (e, i) {
              if (e.state === '0') {
                e.state = '无需入库'
              }
              if (e.state === '1') {
                e.state = '未入库'
              }
              if (e.state === '2') {
                e.state = '已入库'
              }
              if (e.state === '3') {
                e.state = '临时出库'
              }
              if (e.state === '4') {
                e.state = '永久出库'
              }
            })
            this.wzxxList = res.body.default.dataset;
          }
        })
      },
      getWzxxPicList() {
        var params = {
          id: this.id,
        };
        Object.assign(params, this.pageinfo, this.filters)
        this.$api.common.getAjwzPicxx(params).then((res) => {
          if (+res.body.default.count > 0 && res.body.default.dataset.length >= 1) {
            this.total = Number(res.body.default.count);
            res.body.default.dataset.forEach(function (e, i) {
              if (e.state === '0') {
                e.state = '无需入库'
              }
              if (e.state === '1') {
                e.state = '未入库'
              }
              if (e.state === '2') {
                e.state = '已入库'
              }
              if (e.state === '3') {
                e.state = '临时出库'
              }
              if (e.state === '4') {
                e.state = '永久出库'
              }
            })
            this.pageinfo.total = Number(res.body.default.count)
            this.wzxxPicList = res.body.default.dataset;
          }

        })

      },
      getWztp() {
        var parmas = {
          id: this.id,
        };
        this.$api.common.getWztp(parmas).then((res) => {
        })
      },
    }
  }
</script>
