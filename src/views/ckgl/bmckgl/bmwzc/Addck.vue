<template>
  <el-card class="box-card" style="background: #f7f7f7">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            {{titleAdd}}
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="position: relative; top: 10px">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="仓库信息" name="caseInfo">
              <div class="divCaseInfo">
                <el-form :model="dataForm" status-icon :rules="dataFormRules" ref="dataForm" label-width="100px"
                         class="demo-dataForm" size="mini">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="仓库编码" prop="ckbm">
                        <el-input v-model="dataForm.ckbm" style="width: 100%" :readonly="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库名称" prop="ckmc">
                        <el-input v-model="dataForm.ckmc" style="width: 100%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库简称" prop="ckjc">
                        <el-input v-model="dataForm.ckjc" style="width: 100%" placeholder="请输入仓库简称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="入库限制" prop="sfxzlb">
                        <el-select v-model="dataForm.sfxzlb" style="width:100%">
                          <el-option value="0" label="不限制"></el-option>
                          <el-option value="1" label="限制"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库类别" prop="lb_name">
                        <input type="hidden" v-model="dataForm.lb_id">
                        <el-input v-model="dataForm.lb_name" style="width: 100%" v-if="dataForm.sfxzlb=='1'"
                                  :readonly="true" @focus="getCklb" placeholder="请选择仓库类别"></el-input>
                        <el-input v-model="dataForm.lb_name" style="width: 100%" :disabled="true"
                                  v-if="dataForm.sfxzlb=='0'"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库类型" prop="cklx">
                        <el-select v-model="dataForm.cklx" style="width:100%">
                          <el-option value="0" label="单位自有"></el-option>
                          <el-option value="1" label="第三方库"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="可用范围" prop="kyfw">
                        <el-select v-model="dataForm.kyfw" style="width:100%">
                          <el-option value="1" label="全市"></el-option>
                          <el-option value="2" label="全区"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库面积" prop="ckmj">
                        <el-input v-model="dataForm.ckmj" style="width: 100%" placeholder="请输入仓库面积(m2)"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库层数" prop="ckcs">
                        <el-input v-model="dataForm.ckcs" style="width: 100%" placeholder="请输入仓库层数"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="经度" prop="jd">
                        <el-input v-model="dataForm.jd" style="width: 100%" placeholder="请输入经度"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="纬度" prop="wd">
                        <el-input v-model="dataForm.wd" style="width: 100%" placeholder="请输入纬度"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="创建时间" prop="created_time">
                        <el-input v-model="dataForm.created_time" style="width: 100%" :readonly="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="仓库地址" prop="ckdz" style="width: 100%">
                        <el-input v-model="dataForm.ckdz" placeholder="请输入仓库地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="归属部门" prop="gs_dept_name">
                        <el-input v-model="dataForm.gs_dept_name" v-if="isEditGs == 'true'" style="width: 100%"
                                  @focus="chooseDept()" :readonly="true" placeholder="请选择归属部门"></el-input>
                        <el-input v-model="dataForm.gs_dept_name" v-if="isEditGs == 'false'" style="width: 100%"
                                  :readonly="true" placeholder="请选择归属部门"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="仓库负责人" prop="gs_name">
                        <el-input v-model="dataForm.gs_name" placeholder="请选择负责人" :readonly="true" style="width: 100%"
                                  @focus="chooseGs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="联系电话" prop="lxdh">
                        <el-input v-model="dataForm.lxdh" style="width: 100%" placeholder="请输入联系电话"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="备注" prop="remark">
                        <el-input
                          type="textarea"
                          :rows="2"
                          style="width: 100%"
                          placeholder="请输入备注"
                          v-model="dataForm.remark">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="仓库图片" prop="pass">
                        <el-tooltip class="item" effect="light" content="提示：格式仅允许上传（JPG,JPEG,PNG）" placement="top">
                          <el-button>{{picNum}}</el-button>
                        </el-tooltip>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label=""  label-width="80" prop="pass" style="position: relative; left: 100px">
                        <el-upload
                          ref="fileListWuZheng"
                          action="#"
                          :on-change="getBeforeUploadAnJian"
                          :before-remove="handleRemoveAnJian"
                          :on-preview="handlePictureCardPreview"
                          :file-list="imgListAnJian"
                          list-type="picture-card"
                          :auto-upload="false"
                          accept=".jpg,.png,.gif">
                          <i slot="default" class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div style="float: right; position: relative; top: -10px; right: 12px">
                  <el-button type="warning" size="mini" icon="el-icon-document-checked" @click="saveAndLink"
                             v-show="isEdit == 'true'">保存并编辑权限
                  </el-button>
                  <el-button type="warning" size="mini" icon="el-icon-document-checked" @click="save"
                             v-show="isEdit =='true'">保存
                  </el-button>
                  <el-button type="warning" size="mini" @click="close">关闭</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="仓库权限" name="thingInfo">
              <el-card class="box-card">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <div
                        style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                        <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                        仓库可用单位
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <div class="text item">
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <div
                          style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                          <div class="form-panel">
                            <el-form :inline="true" :model="filters1" class="demo-form-inline" size="mini" @submit.native.prevent>
                              <el-row class="form-line">
                                <el-col :span="6" style="display: flex;">
                                  <el-form-item label="部门名称" prop="dept_name">
                                    <el-input v-model="filters1.dept_name" placeholder="请输入部门名称" size="mini"
                                              @keyup.enter.native="findTable1"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="16" style="text-align: right;">
                                  <el-form-item label="">
                                    <el-button type="primary" icon="el-icon-search" @click="findTable1">查询</el-button>
                                    <el-button type="default" icon="el-icon-refresh" @click="reset1">重置</el-button>
                                    <el-button type="success" icon="el-icon-circle-plus" @click="qxChooseDept">请选择部门</el-button>
                                    <el-button type="danger" icon="el-icon-delete" @click="delBatch1">批量删除</el-button>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-table :data="tableData1" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                                  size="mini"
                                  highlight-current-row @selection-change="changeFun1"
                                  :cell-style="{padding:'1px'}">
                          <el-table-column type="selection"></el-table-column>
                          <el-table-column label="序号">
                            <template slot-scope="scope">
                              <span>{{(currentPage1 - 1) * pageSize1 + scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="可用单位" prop="ky_dw_name" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column label="可用部门" prop="ky_dept_name" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column
                            fixed="right"
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                              <i @click="delete1(scope.row)" class="el-icon-delete"
                                 style="font-size: 20px; margin-left: 12px;cursor: pointer"></i>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="page">
                          <div class="page-content">
                            <el-pagination
                              background
                              @size-change="handleSizeChange1"
                              @current-change="handleCurrentChange1"
                              :current-page="currentPage1"
                              :page-sizes="[5,10, 20, 30]"
                              :page-size="pageSize1"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="total1">
                            </el-pagination>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <el-card class="box-card">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <div
                        style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                        <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                        仓库管理员
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <div class="text item">
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <div
                          style="margin-bottom:10px; background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                          <div class="form-panel">
                            <el-form :inline="true" :model="filters2" class="demo-form-inline" size="mini" @submit.native.prevent>
                              <el-row class="form-line">
                                <el-col :span="6" style="display: flex;">
                                  <el-form-item label="管理员名称" prop="user_name">
                                    <el-input v-model="filters2.user_name" placeholder="请输入管理员名称" size="mini" clearable
                                              @keyup.enter.native="findTable2"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="16" style="text-align: right;">
                                  <el-form-item label="">
                                    <el-button type="primary" icon="el-icon-search" @click="findTable2">查询</el-button>
                                    <el-button type="default"  icon="el-icon-refresh" @click="reset2">重置</el-button>
                                    <el-button type="success" icon="el-icon-circle-plus" @click="qxChooseUser">请选择管理员</el-button>
                                    <el-button type="danger" icon="el-icon-delete" @click="delBatch2">批量删除</el-button>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-table :data="tableData2" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                                  size="mini"
                                  highlight-current-row @selection-change="changeFun2"
                                  :cell-style="{padding:'1px'}">
                          <el-table-column type="selection"></el-table-column>
                          <el-table-column label="序号">
                            <template slot-scope="scope">
                              <span>{{(currentPage2 - 1) * pageSize2 + scope.$index + 1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="用户" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column label="手机号" prop="mobile" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column label="电话" prop="tel" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column fixed="right" align="center" label="操作">
                            <template slot-scope="scope">
                              <i @click="delete2(scope.row)" class="el-icon-delete"
                                 style="font-size: 20px; margin-left: 12px;cursor: pointer"></i>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="page">
                          <div class="page-content">
                            <el-pagination
                              background
                              @size-change="handleSizeChange2"
                              @current-change="handleCurrentChange2"
                              :current-page="currentPage2"
                              :page-sizes="[10, 20, 30, 40, 50]"
                              :page-size="pageSize2"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="total2">
                            </el-pagination>
                          </div>

                        </div>
                        <div style="float: right; position: relative;clear: both; top:10px; right: 12px;margin-bottom: 10px">
                          <el-button type="warning" size="mini" icon="el-icon-document-checked" @click="save2"
                                     v-show="isEdit == 'true'">保存
                          </el-button>
                          <el-button type="warning" size="mini" @click="close">关闭</el-button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="选择用户" :visible.sync="dialogVisible" width="60%" :append-to-body="true" :modal="true">
      <div style="height: 200px">
        <el-form>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div>
                  <div class="form-panel">
                    <el-row>
                      <el-form ref="form" :inline="true" :model="userfrom" size="mini">
                        <el-col :span="10">
                          <el-form-item label="用户名">
                            <el-input v-model="userfrom.username" placeholder="请输入用户名" size="mini" clearable
                                      @keyup.enter.native="findTable">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="部门名称">
                            <el-input v-model="userfrom.deptname" placeholder="请输入部门名称" size="mini" clearable
                                      @keyup.enter.native="findTable">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item label="">
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable()">查询
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                        :cell-style="{padding:'1.5px'}">
                <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope">
                    <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="user_name" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="dept_name" label="部门名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100" fixed="right" align="center">
                  <template slot-scope="scope">
                    <el-button @click="chooseUser(scope.row)" icon="el-icon-check" circle size="mini"></el-button>
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
                    :page-sizes="[5,10, 20, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
        <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
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
          default-expand-all
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
    <el-dialog
      title="选择部门"
      :visible.sync="treeDialog"
      :append-to-body="true"
      :modal="true"
      width="40%">
      <div class="ck_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="filterText1" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          show-checkbox
          :data="treeData1"
          :props="treeProps1"
          default-expand-all
          @node-click="selectData1"
          :expand-on-click-node="false"
          :filter-node-method="filterNode1"
          ref="tree1">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="treeDialog = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="qrTreeChoose" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="选择用户" :visible.sync="userDialog" width="60%" :append-to-body="true" :modal="true">
      <div style="height: 200px">
        <el-form>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div>
                  <div class="form-panel">
                    <el-form ref="form" :inline="true" :model="filters3" size="mini">
                      <el-row>
                        <el-col :span="24">
                          <el-col :span="10">
                            <el-form-item label="用户名">
                              <el-input v-model="filters3.user_name" placeholder="请输入用户名" size="mini" clearable
                                        @keyup.enter.native="findTable3">
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item label="部门名称">
                              <el-input v-model="filters3.dept_name" placeholder="请输入部门名称" size="mini" clearable
                                        @keyup.enter.native="findTable3">
                              </el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item label="">
                              <el-button type="primary" icon="el-icon-search" size="mini" @click="findTable3">查询
                              </el-button>
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
              <el-table ref="multipleTable3" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                        @selection-change="changeFun3" :cell-style="{padding:'1.5px'}">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="50px" align="center">
                  <template slot-scope="scope">
                    <span>{{(currentPage3 - 1) * pageSize3 + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="user_name" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="dept_name" label="部门名称" show-overflow-tooltip></el-table-column>
              </el-table>
              <div class="page">
                <div class="page-content">
                  <el-pagination
                    background
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page="currentPage3"
                    :page-sizes="[5,10, 20, 30, 40, 50]"
                    :page-size="pageSize3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total3">
                  </el-pagination>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
        <el-button @click="qrUserDialog" size="mini" type="primary">确认</el-button>
        <el-button @click="userDialog = false" size="mini">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择物证类别"
      :visible.sync="wzlbDialog"
      :append-to-body="true"
      :modal="true"
      width="30%">
      <div class="ck_tree" style="height: 55vh;overflow-y: auto">
        <el-input placeholder="请输入过滤条件" v-model="wzlbFilterText" size="mini"></el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="wzlbTreeData"
          :props="wzlbTreeProps"
          show-checkbox
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
    <el-dialog :visible.sync="picDialog" :modal-append-to-body='false' title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>
<script>
  import commonServie from '@/framework/CommonService'
  import {timeFormat} from '@/utils/datetime'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        picDialog:false,
        picNum: '没有上传图片',
        titleAdd: '新增仓库信息',
        isEditGs: 'true',
        isEdit: this.$route.params.isEdit,
        fzgl_flag: true,
        ids: [],
        ids2: [],
        ids3: [],
        filters1: {
          dept_name: '',
        },
        filters2: {
          user_name: '',
        },
        filters3: {
          user_name: '',
          dept_name: ''
        },
        dept_id: this.$route.params.dept_id,
        activeName: JSON.parse(sessionStorage.getItem('bjckxx')).activeName,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [],
        imgListAnJian: [], // 案件图片列表
        srcListAnJian: [], // 案件大图显示
        srcList1: [
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        urlImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imgList: [],
        dataForm: {
          id: '',
          ckbm: '',
          ckmc: '',
          ckjc: '',
          sfxzlb: '0',
          lb_id: '',
          lb_name: '',
          cklx: '0',
          kyfw: '',
          ckmj: '',
          ckcs: '',
          jd: '',
          wd: '',
          created_time: this.getTime(),
          ckdz: '',
          gs_dept_name: '',
          gs_dept_id: '',
          gs_id: '',
          gs_name: '',
          lxdh: '',
          remark: '',
          sfqy: '1'
        },
        dataFormRules: {
          ckbm: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          ckmc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          ckjc: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 100, message: '长度不得超过100字符'}
          ],
          sfxzlb: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          cklx: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          created_time: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
          ],
          ckdz: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          gs_dept_name: [
            {required: true, message: '这是必填字段'},
          ],
          gs_name: [
            {required: true, message: '这是必填字段'},
          ],
          lxdh: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 20, message: '长度不得超过20字符'}
          ],
          jd: [
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          wd: [
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
          ckcs: [
            {min: 0, max: 200, message: '长度不得超过100字符'}
          ],
          ckmj: [
            {min: 0, max: 100, message: '长度不得超过100字符'}
          ],
          remark: [
            {min: 0, max: 200, message: '长度不得超过200字符'}
          ],
        },
        userfrom: {
          username: '',
          deptname: ''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 5,

        currentPage1: 1,
        total1: 0,
        pageSize1: 5,

        currentPage2: 1,
        total2: 0,
        pageSize2: 5,

        currentPage3: 1,
        total3: 0,
        pageSize3: 5,

        tableData: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],
        dialogVisible: false,
        deptDialog: false,
        userDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        selectNode: {},
        selectNode1: {},
        selectNode2: {},
        filterText: '',
        //仓库权限
        filterText1: '',
        treeData1: [],
        treeProps1: {
          children: 'children',
          label: 'name'
        },
        treeDialog: false,
        multipleSelection1: [],//多选的数据
        multipleSelection2: [],//多选的数据
        multipleSelection3: [],//多选的数据
        dept_id: '',
        wzlbDialog: false,
        wzlbTreeData: [],
        wzlbTreeProps: {
          children: 'children',
          label: 'showname'
        },
        wzlbFilterText: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      filterText1(val) {
        this.$refs.tree1.filter(val);
      }
    },
    created() {
      this.init()
      this.getDataNew()
    },
    mounted() {
      // this.getDataNew()
    },
    activated() {
      this.getDataNew()
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
      init() {

        if (this.$route.params.method === 'editBmWuZhengCang') {
          this.titleAdd = '编辑仓库信息'
        }
      },
      getDataNew() {
        if (JSON.parse(sessionStorage.getItem('bjckxx')).method === 'addBmWuZhengCang') {
          //新增
          this.dataForm.id = commonServie.getuuid();
          this.dataForm.gs_dept_id = this.$route.params.dept_id;
          this.dataForm.sfqy = '1';
          this.dept_id = this.$route.params.dept_id;
          this.queryCkbm();
          this.ids.push(this.$route.params.dept_id);
          this.ids2.push(this.$route.params.dept_id);
          this.ids3.push(this.$route.params.dept_id)
          this.findTable1();
          this.findTable2()
        } else if (JSON.parse(sessionStorage.getItem('bjckxx')).method === 'editBmWuZhengCang') {
          //编辑
          var param = {
            id: JSON.parse(sessionStorage.getItem('bjckxx')).id
          };
          this.dataForm.id = param.id;
          this.getAnJianPic()
          this.$api.bmwzc.get(param).then((res) => {
            this.dataForm = res.body.default
            this.dataForm.gs_dept_name = res.body.gsdept.dept_name;
            this.dataForm.gs_name = res.body.gsuser.user_name;
            this.dataForm.created_time = timeFormat(res.body.default.created_time);
            this.dataForm.sfqy = '1';
            this.dataForm.lb_name = res.body.default.lb_id_text;
            this.dataForm.lb_id = res.body.default.lb_id;
            this.dept_id = res.body.gsdept.id;
            //To do
            this.$api.bmwzc.getDeptIdsById(param).then((res) => {
              this.ids = res.body.default.dept.split(",")
              // this.ids.push(this.dept_id);
              this.findTable1();
            })
            this.$api.bmwzc.getCkglyById(param).then((res) => {
              this.ids3 = res.body.default.ckgly.split(",")
              this.findTable2()
            })
          })
        }
      },
      saveAndLink() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            var param = this.dataForm;
            this.$api.bmwzc.save(param).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                // this.close()
                this.activeName = 'thingInfo'
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      wzlbFilterNode(value, data) {
        if (!value) return true;
        return data.showname.indexOf(value) !== -1;
      },
      save() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            var param = this.dataForm;
            this.$api.bmwzc.save(param).then((res) => {
              if (res.success == "true") {
                this.$message({message: res.message, type: 'success'})
                this.close()
              } else {
                this.$message({message: res.message, type: 'error'})
              }
            })
          }
        })
      },
      save2() {
        //不存在，将dept_id传入ids
        if(this.ids.join(",")==="".trim()){
          this.ids = [];
        }
        if(this.ids.join(",").indexOf(this.dept_id) === -1){
          this.ids.push(this.dept_id)
        }
        var param = {

          id: this.dataForm.id,
          ckgly: this.ids3.join(","),
          dept: this.ids.join(",")
        };
        this.$api.bmwzc.savePowerInfo(param).then((res) => {
          if (res.success == "true") {
            if(this.tableData2.length==0){
              this.isEditGs = 'true';
            }
            this.$message({message: res.message, type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      close() {
        this.$util.goBack(this);
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
      //改变分页大小
      handleSizeChange2(val) {
        this.pageSize2 = val;
        this.findTable2();
      },
      //跳转页数
      handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.findTable2();
      },
      //改变分页大小
      handleSizeChange3(val) {
        this.pageSize3 = val;
        this.findTable3();
      },
      //跳转页数
      handleCurrentChange3(val) {
        this.currentPage3 = val;
        this.findTable3();
      },
      qrUserDialog() {
        if (this.multipleSelection3.length <= 0) {
          this.$message({
            message: '请选择一条记录！',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        var chooseIds = this.multipleSelection3.map(obj => {
          return obj.id
        })
        // let union = a.concat(b.filter(v => !a.includes(v)))
        this.ids3 = this.ids3.concat(chooseIds)
        this.userDialog = false;
        this.findTable2();
      },
      chooseDept() {
        var param = {
          id: this.dept_id,
          valid_flag: '1'
        }
        this.$api.bmwzc.gsrTree(param).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.deptDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      chooseDeptName() {
        var param = {
          id: this.dataForm.id,
          gs_dept_id: this.selectNode.id
        }
        this.$api.bmwzc.validateCkGlyNum(param).then((res) => {
          if (res.success == "true") {
            this.dataForm.gs_dept_name = this.selectNode.name;
            this.dataForm.gs_dept_id = this.selectNode.id;
            this.dept_id = this.selectNode.id;
            this.deptDialog = false;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      chooseGs() {
        this.dialogVisible = true;
        this.findTable()
      },
      chooseUser(row) {
        this.dataForm.gs_id = row.id;
        this.dataForm.gs_name = row.user_name;
        var param = {
          id: row.id
        }
        this.$api.bmwzc.getUserPhone(param).then((res) => {
          this.dataForm.lxdh = res.body.default.phone;
        })
        this.dialogVisible = false;
      },
      selectData(data) {
        this.selectNode = data;
      },
      selectData1(data) {
        this.selectNode1 = data;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTable() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          dept_id: this.dept_id
        };
        this.$api.bmwzc.queryFzr(param).then((res) => {
          this.total = Number(res.body.default.count);
          this.tableData = res.body.default.dataset;
        })
      },
      reset1() {
        this.filters1.dept_name = '';
      },
      reset2() {
        this.filters2.user_name = '';
      },
      findTable1() {
        var param = {
          pagenum: this.currentPage1,
          pagesize: this.pageSize1,
          ky_dept_name: this.filters1.dept_name,
          ids: this.ids.join(",")
        };
        this.$api.bmwzc.queryUnitTable(param).then((res) => {
          this.total1 = Number(res.body.default.count);
          this.tableData1 = res.body.default.dataset;
        })
      },
      findTable2() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          user_name: this.filters2.user_name,
          ckgly: this.ids3.join(",")
        };
        this.$api.bmwzc.queryCkglyTable(param).then((res) => {
          this.total2 = Number(res.body.default.count);
          this.tableData2 = res.body.default.dataset||[];
          if (this.tableData2.length > 0) {
            this.isEditGs = 'false';
          }
        })
      },
      findTable3() {
        var param = {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          user_name: this.filters3.user_name,
          dept_name: this.filters3.dept_name,
          dept_id: this.dept_id,
          exportids: this.ids3.join(",")
        };
        this.$api.bmwzc.queryUserDialog(param).then((res) => {
          this.total3 = Number(res.body.default.count);
          this.tableData3 = res.body.default.dataset;
        })
      },
      qxChooseDept() {
        var param = {}
        var that = this;
        this.$api.bmwzc.qxChooseDept(param).then((res) => {
          if (res.success == "true") {
            this.treeData1 = res.data
            this.$nextTick(() => {
              that.ids.forEach(item => {
                that.$refs.tree1.setChecked(item, true, false);
              })
            })
            this.treeDialog = true;
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      qxChooseUser() {
        this.findTable3();
        this.userDialog = true;
      },
      qrTreeChoose() {
        this.ids = this.$refs.tree1.getCheckedKeys();
        if (this.ids.length < 1) {
          this.$message({message: '请至少选择一条记录！', type: 'warning'})
          return false;
        }
        this.treeDialog = false;
        this.findTable1();
      },
      setCheckedKeys() {
        this.$refs['tree1'].setCheckedKeys(this.ids);
      },
      getTime: function () {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
      },
      //复选框状态改变
      changeFun1(val) {
        this.multipleSelection1 = val;
      },
      changeFun2(val) {
        this.multipleSelection2 = val;
      },
      changeFun3(val) {
        this.multipleSelection3 = val;
      },
      delete1(row) {
        this.$confirm('确定要删除该单位吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ids = this.ids.filter(item => item != row.id);
          this.findTable1()
        })
      },
      delete2(row) {
        this.$confirm('是否确认移除该仓库管理员？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ids3 = this.ids3.filter(item => item != row.id);
          this.findTable2()
        })
      },
      chooseWllb() {
        var nodes = this.$refs.wzlbtree.getCheckedNodes();
        var ids = nodes.map(obj => {
          return obj.id
        }).join(",");
        var names = nodes.map(obj => {
          return obj.name
        }).join(",");
        this.dataForm.lb_id = ids;
        this.dataForm.lb_name = names;
        this.wzlbDialog = false;
      },
      delBatch1() {
        if (this.multipleSelection1.length <= 0) {
          this.$message({
            message: '请先选择要删除的可用单位',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        this.$confirm('是否确定移出这些仓库信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deleteArr = this.multipleSelection1.map(obj => {
            return obj.id
          })
          this.ids = this.ids.filter(item => !deleteArr.includes(item));
          this.findTable1()
        })
      },
      delBatch2() {
        if (this.multipleSelection2.length <= 0) {
          this.$message({
            message: '请先选择要删除的仓库管理员',
            showClose: true,
            type: 'warning'
          });
          return false;
        }
        this.$confirm('是否确认移除这些仓库管理员？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deleteArr = this.multipleSelection2.map(obj => {
            return obj.id
          })
          this.ids3 = this.ids3.filter(item => !deleteArr.includes(item));
          this.findTable2()
        })

      },
      getCklb() {
        var param = {
          valid_flag: '1'
        }
        this.$api.bmwzc.wzfltreetable(param).then((res) => {
          if (res.success == "true") {
            this.wzlbTreeData = res.data
            this.$nextTick(() => {
              this.$refs.wzlbtree.setCheckedKeys(this.dataForm.lb_id.split(','));
            })
            this.wzlbDialog = true;
            this.wzlbFilterText = '';
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      goBack() {
        this.$util.goBack(this)
      },
      queryCkbm() {
        this.dataForm.ckmc = this.$route.params.dept_name + '保管中心';
        this.dataForm.gs_dept_name = this.$route.params.dept_name;
        var param = {};
        this.$api.bmwzc.queryCkbm(param).then((res) => {
          this.dataForm.ckbm = res.body.default.ckbm;
        })
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.picDialog = true;
      },
      getBeforeUploadAnJian (file) {  // 上传案件图片
        let self = this
        if (this.dataForm.id) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.dataForm.id

          this.imgInfo.filename = file.name
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)
            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                self.imgList = []
                self.$api.upDataPic.getPicWuzheng({ywid: self.dataForm.id}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                    self.picNum = '已上传' + res.content.length + '张图片'
                    self.$message({
                      message: '添加图片成功！',
                      type: 'success'
                    });
                      if (res.content.length >= 1) {
                          self.picNum = '已上传' + res.content.length + '张图片'
                          for (let i = 0; i < res.content.length; i++) {
                              self.$refs.fileListWuZheng.uploadFiles[i].id = res.content[i].id
                              self.imgListAnJian[i] = {
                                  id: res.content[i].id,
                                  url: res.content[i].file_path
                              }
                          }
                      }
                      // res.content.forEach(function (e, i) {
                      //     e.url = e.file_path
                      // })
                      //     self.imgListAnJian = res.content
                      //
                      // for (let i = 0; i < res.content.length; i++) {
                      //     self.imgListAnJian[i] = {
                      //         id: res.content[i].id,
                      //         url: res.content[i].file_path
                      //     }
                      // }

                  /*  self.srcList = []
                    self.srcListAnJian = []
                    self.imgListAnJian = res.content
                    self.imgListAnJian.forEach(function (e, i) {
                      e.url = e.file_path
                    }) */

                    // for (let i = 0; i < res.content.length; i++) {
                    //   self.$refs.imgListAnJian.uploadFiles[i].id = res.content[i].id
                    //   self.imgListAnJian[i] = {
                    //     id: res.content[i].id,
                    //     url: res.content[i].file_path
                    //   }
                    // }
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
          this.$message.error('请先选择左边栏的物证！');
          return false
        }
      },
      getBeforeUploadWuZheng (file) {  // 上传物证
        let self = this

        if (this.dataForm.id) {
          this.imgInfo = {}
          this.baseImgList = []
          this.imgInfo.ywid = this.dataForm.id

          this.imgInfo.filename = file.name
          this.imgInfo.filesize = file.size
          this.getBase64(file.raw).then(res => {
            self.imgInfo.filebase64 = res
            self.baseImgList.push(self.imgInfo)

            self.$api.upDataPic.upDataPic(self.imgInfo).then(res => {
              if (res.content.data[0].success === 'true'){
                self.$api.upDataPic.getPicWuzheng({ywid: self.dataForm.id}).then(res => {
                  if (res.trueOrFalse === 'false') {
                    // self.$message.error('图片加载失败！');
                  } else {
                    self.picNumWuZheng = '已上传' + res.content.length + '张图片'
                    self.$refs.fileListWuZheng.uploadFiles = []
                    self.$message({
                      message: '添加图片成功！',
                      type: 'success'
                    });

                    self.imgListWuZheng = res.content
                    self.imgListWuZheng.forEach(function (e, i) {
                      e.url = e.file_path
                    })
                  }
                }).catch(function (err) {
                  // self.$message.error('图片加载失败！');
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
              self.imgListWuZheng = res.content
              self.imgListWuZheng.forEach(function (e, i) {
                e.url = e.file_path
              })
            }
          }

        })
      },
        getAnJianPic: function () {
            let self = this
            var params = {
                ywid: this.dataForm.id
            }

            this.$api.upDataPic.getPicWuzheng(params).then(res => {
                if (res.content === undefined) {
                    self.picNum = '没有上传图片'
                } else {
                    if (res.content.length >= 1) {
                        self.picNum = '已上传' + res.content.length + '张图片'
                        res.content.forEach(function (e, i) {
                            e.url = e.file_path
                        })
                        self.imgListAnJian = res.content
                    }
                }
            })
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
                      self.getAnJianPic()
                  }
              })
          }).catch(function (e) {
              throw(e)
              stop()
              return false
          });

      }, // 删除案件图片
      getPicList(wuZhengId) {
        let self = this
        self.imgList = []
        this.$api.upDataPic.getPicWuzheng({ywid: wuZhengId}).then(res => {
          if (res.trueOrFalse === 'false') {
            // loading.close()
            // self.$message.error('图片加载失败！');
          } else {
            self.srcList = []
            if (res.content === undefined) {
              self.picNum = '没有上传图片'
              self.picNumWuZheng = '没有上传图片'
            } else {
              self.picNum = '已上传' + res.content.length + '张图片'
              self.picNumWuZheng = '已上传' + res.content.length + '张图片'
              res.content.forEach(function (e, i) {
                self.srcList.push(e.file_path)
                self.imgList.push(e.file_path)
                // self.imgList.push('data:image/png;base64,' + e.file_content)
              })
            }

            // loading.close()


          }
        }).catch(function () {
          // self.$message.error('图片加载失败！');
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../styles/common.less';
  @import '../../../page-main';
  /deep/.el-input--mini .el-input__inner{
    width:100%
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

  /deep/ .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none
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
</style>
