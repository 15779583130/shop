/**
 * @author 董珊珊
 * @create date: 2019/12/30
 * @version:
 * @modify	 	2019/12/30	董珊珊		无		新建，流程配置管理页面
 */

<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .el-tree {
    min-width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .flow_tree {
    overflow-y: auto;
    height: calc(100vh - 170px);
  }

  /* 分页 */
  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  /* 操作按钮 */
  .table_btn {
    margin-top: 10px;
    /* margin-bottom: 5px;
    padding-right: 12px; */
    // float: right;
    width: auto;
  }
</style>


<template>
  <div class="bmwzc">
    <el-row :gutter="10">
      <!-- 流程树 -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div
              style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
              <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
              业务流程
            </div>
            <div class="text item">
              <div class="flow_tree">
                <el-form :inline="true" class="demo-form-inline">
                  <el-row >
                    <el-col :span="24" class="table_btn" style="margin-bottom: 10px;">
                      <el-row :gutter="2" style="margin-bottom: 10px;">
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addBiztype">新增业务类型</el-button>
                        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addType">新增流程类型</el-button>
                        <el-button v-if="filters.type == 'flowtype'" type="primary" icon="el-icon-document-copy" size="mini" @click="copyFlow">复制流程</el-button>
                      </el-row>
                      <el-row :gutter="2">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFlow">修改</el-button>
                        <el-button type="primary" icon="el-icon-delete" size="mini" @click="delFlow">删除</el-button>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-form>

                <el-input placeholder="请输入过滤条件" v-model="filterText" size="mini"></el-input>
                <el-tree
                  class="filter-tree"
                  node-key="id"
                  :data="treeData"
                  :props="treeProps"
                  default-expand-all
                  @node-click="refresh"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  ref="tree">
                </el-tree>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col v-if="filters.type == 'flowtype'" :span="18" ref="right_content">
        <div class="grid-content bg-purple-light">
          <!-- 节点配置列表 -->
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    节点配置列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addFlowNode">新增</el-button>
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFlowNode">修改</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" @click="delBatchFlowNode">批量删除</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData4Node" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row @selection-change="selectData4Node" size="mini">
                      <el-table-column type="selection" align="center" width="50"></el-table-column>
                      <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                          <span>{{(currentPage4Node - 1) * pageSize4Node + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="节点名称" prop="nodename" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="节点类型" prop="nodetype" :formatter="formatsNodeType" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="部门群" prop="usergroupname" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="用户群" prop="deptgroupname" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="例外用户群" prop="excpusergroupname" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="表单地址" prop="formpath" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                          <i @click="delFlowNode(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="删除"></i>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange4Node"
                          @current-change="handleCurrentChange4Node"
                          :current-page="currentPage4Node"
                          :page-sizes="[5, 10, 20, 50]"
                          :page-size="pageSize4Node"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total4Node">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <!-- 路由配置列表-->
          <el-card class="box-card" style="margin-top:10px">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    路由配置列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addFlowRoute">新增</el-button>
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFlowRoute">修改</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" @click="delBatchFlowRoute">批量删除</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableDataRoute" :header-cell-style="{background:'#e6e6e6'}"
                              border style="width: 100%" highlight-current-row @selection-change="selectData4Route" size="mini"  >
                      <el-table-column type="selection" align="center" width="50" ></el-table-column>
                      <el-table-column label="序号" align="center" width="50" >
                        <template slot-scope="scope">
                          <span>{{(currentPage4Route - 1) * pageSize4Route + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发送节点" prop="sendnodename" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="接收节点" prop="receivenodename" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="是否须同部门" prop="isneedsamedept" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in sfOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.isneedsamedept === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="表达式" prop="expression" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange4Route"
                          @current-change="handleCurrentChange4Route"
                          :current-page="currentPage4Route"
                          :page-sizes="[5, 10, 20, 50]"
                          :page-size="pageSize4Route"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total4Route">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- 新增业务类型-->
    <el-dialog
      :title="bizTypeTitle"
      :visible.sync="bizTypeDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="bizTypeForm" :model="bizTypeForm" label-width="80px"
      size="mini" :rules="bizTypeRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="组编码" prop="bizno">
              <el-input v-model="bizTypeForm.bizno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="中文名称"prop="biztypename">
              <el-input v-model="bizTypeForm.biztypename" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排列顺序" prop="orderno">
              <el-input-number v-model="bizTypeForm.orderno" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="bizTypeDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitBizType()" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增流程类型-->
    <el-dialog
      :title="typeTitle"
      :visible.sync="typeDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="typeForm" :model="typeForm" label-width="100px"
      size="mini" :rules="typeRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="业务类型" prop="biztypename">
              <el-input v-model="typeForm.biztypename" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="流程类型名称"prop="flowtypename">
              <el-input v-model="typeForm.flowtypename" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排列顺序" prop="orderno">
              <el-input-number v-model="typeForm.orderno" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="是否激活"prop="status">
              <el-select v-model="typeForm.status" placeholder="请选择是否激活">
                <el-option v-for="item in sfOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="typeDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitType()" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增流程节点-->
    <el-dialog
      :title="flowNodeTitle"
      :visible.sync="flowNodeDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="flowNodeForm" :model="flowNodeForm" label-width="130px"
      size="mini" :rules="flowNodeRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="节点名称" prop="nodename">
              <el-input v-model="flowNodeForm.nodename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="节点类型" prop="nodetype">
              <el-select v-model="flowNodeForm.nodetype" placeholder="请选择节点类型">
                <el-option v-for="item in nodetypeOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="参与人控制类型" prop="actortype">
              <el-select v-model="flowNodeForm.actortype" @change="changeFlowNode" placeholder="请选择参与人控制类型">
                <el-option v-for="item in actortypeOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="flowNodeForm.actortype == '2'" :span="20" :offset="2">
            <el-form-item label="部门群" prop="deptgroupname">
              <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请选择内容"
              :readonly="true" @focus="deptDialog = true;findDeptTree()"
              v-model="flowNodeForm.deptgroupname"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flowNodeForm.actortype == '1'" :span="20" :offset="2">
            <el-form-item label="用户群" prop="usergroupname">
               <el-input type="textarea"
               :autosize="{ minRows: 2, maxRows: 4}"
               placeholder="请输入内容"
               :readonly="true" @focus="userDialog = true;findDeptTree();findSelectableUser()"
               v-model="flowNodeForm.usergroupname" ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="flowNodeForm.actortype == '2'" :span="20" :offset="2">
            <el-form-item label="例外用户群" prop="excpusergroupname">
               <el-input type="textarea"
               :autosize="{ minRows: 2, maxRows: 4}"
               placeholder="请输入内容"
               :readonly="true" @focus="userDialog = true;findDeptTree();findSelectableUser()"
               v-model="flowNodeForm.excpusergroupname" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="表单地址" prop="formpath">
              <el-input v-model="flowNodeForm.formpath" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="排列号" prop="orderno">
              <el-input-number v-model="flowNodeForm.orderno" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flowNodeDialog = false;resetSectableUser();" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitFlowNode();" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增流程路由-->
    <el-dialog
      :title="flowRouteTitle"
      :visible.sync="flowRouteDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <el-form ref="flowRouteForm" :model="flowRouteForm" label-width="130px"
      size="mini" :rules="flowRouteRules">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-form-item label="发送节点" prop="sendnodeid" >
              <el-select v-model="flowRouteForm.sendnodeid" @change="changeSendNode" placeholder="请选择发送节点">
                <el-option v-for="item in sendNodeOptions" :key="item.id" :value="item.id" :label="item.text" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-form-item label="接收节点" prop="receivenodeid" >
              <el-select v-model="flowRouteForm.receivenodeid" @change="changeReceiveNode" placeholder="请选择接收节点">
                <el-option v-for="item in receiveNodeOptions" :key="item.id" :value="item.id" :label="item.text" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-form-item label="是否须同部门" prop="isneedsamedept">
              <el-select v-model="flowRouteForm.isneedsamedept" placeholder="请选择是否须同部门">
                <el-option v-for="item in sfOptions" :key="item.value" :value="item.value" :label="item.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-form-item label="表单式" prop="expression">
              <el-input  v-model="flowRouteForm.expression"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-form-item label="排列号" prop="orderno">
              <el-input-number v-model="flowRouteForm.orderno" controls-position="right" :step="1" :min="1" :precision="0" ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flowRouteDialog = false" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitFlowRoute();" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 选择部门群 -->
    <el-dialog
      title="选择部门"
      :visible.sync="deptDialog"
      :append-to-body="true"
      :modal="true"
      width="35%"
      class="main-con">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            部门结构
          </div>
          <div class="text item">
            <div class="flow_tree">
              <el-input placeholder="请输入过滤条件" v-model="filterTextDept" size="mini"></el-input>
              <el-tree
                ref="dept_tree"
                class="filter-tree"
                node-key="id"
                :data="treeDataDept"
                :props="treePropsDept"
                default-expand-all
                show-checkbox
                :expand-on-click-node="false"
                :filter-node-method="filterNode">
              </el-tree>
            </div>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deptDialog = false" size="mini">关闭</el-button>
        <el-button @click="deptDialog = false;resetSelectDept()" size="mini">清空</el-button>
        <el-button type="primary" @click="submitSelectDept()" size="mini">确认</el-button>
      </span>
    </el-dialog>

    <!-- 选择用户群 -->
    <el-dialog
      title="选择用户"
      :visible.sync="userDialog"
      :append-to-body="true"
      :modal="true"
      width="70%"
      class="main-con">
      <el-row :gutter="10" style="background: #f5f5f5;padding: 5px 5px;">
        <el-col :span="6">
          <div class="grid-content bg-purple" >
            <el-card class="box-card">
              <div
                style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                分组查询
              </div>
              <div class="text flow_tree" style="height: 550px;">
                  <el-input placeholder="请输入过滤条件" v-model="filterTextDept" size="mini"></el-input>
                  <el-tree
                    ref="dept_tree2"
                    class="filter-tree"
                    node-key="id"
                    :data="treeDataDept"
                    :props="treePropsDept"
                    @node-click="refreshSectableUser"
                    default-expand-all
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode">
                  </el-tree>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-card class="box-card">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div style="background: #fff;position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filtersUser" class="demo-form-inline" size="mini">
                          <el-row class="form-line">
                            <el-col :span="24" style="display: flex;">
                              <el-form-item :span="24" label="用户名">
                                <el-input class="input-with-select" v-model="filtersUser.user_name" placeholder="请输入用户名" size="mini"
                                @keyup.enter.native="resetSectableUser2();findSelectableUser()" style="width:250px;">
                                  <el-button slot="append" icon="el-icon-search" @click="resetSectableUser2();findSelectableUser()"></el-button>
                                </el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="text item">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <el-table ref="tableData4SectableUser" :data="tableData4SectableUser" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%;"
                      max-height="521" v-loadmore="findSelectableUser"  highlight-current-row @selection-change="selectData4SectableUser" size="mini">
                        <el-table-column type="selection" align="center" width="50"></el-table-column>
                        <el-table-column label="序号" align="center" width="50">
                          <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="部门" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                      </el-table>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="2" style="line-height: 50px;">
          <el-row style="text-align: center;padding-top: 200px;">
            <el-button type="primary" icon="el-icon-arrow-right" @click="appendUser()" ></el-button>
          </el-row>
          <el-row style="text-align: center;padding-bottom: 250px;">
            <el-button type="primary" icon="el-icon-arrow-left" @click="removeUser()" ></el-button>
          </el-row>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-card class="box-card">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                      <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                      人员列表
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="text item">
                <el-row>
                  <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table ref="tableData4SectedUser" :data="tableData4SectedUser" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%;"
                    max-height="550" highlight-current-row @selection-change="selectData4SectedUser" size="mini">
                      <el-table-column type="selection" align="center" width="50"></el-table-column>
                      <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                          <span>{{scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="姓名" prop="user_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="部门" prop="dept_name" :show-overflow-tooltip="true"></el-table-column>
                    </el-table>
                  </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialog = false;resetSectableUser()" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitSelectUser()" size="mini">选择</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    name: "flow",
    components: {},
    data() {
      return {
        // 代码表值
        tagOptions:[{value:'0',label:'primary'},{value:'1',label:'success'},{value:'2',label:'info'},{value:'3',label:'danger'}],
        sfOptions:[{index:'3', value:'0',label:'否'},{index:'0', value:'1',label:'是'}],
        nodetypeOptions:[{value:'1',label:'起始节点'},{value:'2',label:'中间节点'},{value:'3',label:'结束节点'}],
        actortypeOptions:[{value:'1',label:'指定用户'},{value:'2',label:'指定部门'}],
        // 发送、接收节点码值，动态获取
        sendNodeOptions: [],
        receiveNodeOptions: [],
        // 流程节点、流程路由列表筛选条件
        filters: {
          type: '',
          id:''
        },
        // 用户群：可选用户列表，筛选条件
        filtersUser: {
          dept_id: ''
        },
        // 业务、流程树结构
        filterText: '',
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        // 选择部门群对话框
        deptDialog: false,
        // 部门树
        filterTextDept: '',
        treeDataDept: [],
        treePropsDept: {
          children: 'children',
          label: 'name'
        },
        // 节点分页信息
        currentPage4Node: 1,
        total4Node: 0,
        pageSize4Node: 5,
        // 节点表格数据
        tableData4Node: [],
        // 节点列表多选的数据
        mulSelection4Node: [],

        // 路由分页信息
        currentPage4Route: 1,
        total4Route: 0,
        pageSize4Route: 5,
        // 路由表格数据
        tableDataRoute: [],
        // 路由列表多选的数据
        mulSelection4Route: [],

        // 可选用户分页信息
        currentPage4SectableUser: 1,
        pageSize4SectableUser: 20,
        // 可选用户表格数据
        tableData4SectableUser: [],
        // 可选用户列表多选的数据
        mult4SectableUser: [],

        // 已选用户表格数据
        tableData4SectedUser: [],
        // 已选用户列表多选的数据
        mult4SectedUser: [],

        // 业务类型对话框标题
        bizTypeTitle: '业务类型信息',
        // 业务类型对话框
        bizTypeDialog: false,
        // 业务类型信息表单
        bizTypeForm: {},
        // 业务类型表单校验规则
        bizTypeRules: {
          bizno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          biztypename: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          orderno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ]
        },

        // 流程类型对话框标题
        typeTitle: '流程类型信息',
        // 流程类型对话框
        typeDialog: false,
        // 流程类型信息表单
        typeForm: {},
        // 流程类型表单校验规则
        typeRules: {
          bizno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 50, message: '最多可输入50个字符'}
          ],
          biztypename: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          orderno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ]
        },

        // 流程节点对话框标题
        flowNodeTitle: '流程节点信息',
        // 流程节点对话框
        flowNodeDialog: false,
        // 流程节点信息表单
        flowNodeForm: {},
        // 流程节点表单校验规则
        flowNodeRules: {
          nodename: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          nodetype: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          actortype: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          usergroupname: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 2000, message: '最多可输入2000个字符'}
          ],
          excpusergroupname: [
            {min: 0, max: 2000, message: '最多可输入2000个字符'}
          ],
          deptgroupname: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          formpath: [
            {min: 0, max: 125, message: '最多可输入125个字符'}
          ],
          orderno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ]
        },

        // 流程路由对话框标题
        flowRouteTitle: '流程路由信息',
        // 新增流程路由对话框
        flowRouteDialog: false,
        // 流程路由信息表单
        flowRouteForm: {},
        // 流程路由表单校验规则
        flowRouteRules: {
          sendnodeid: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          receivenodeid: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          isneedsamedept: [
            {required: true, message: '这是必填字段', trigger: 'blur'}
          ],
          expression: [
            {min: 0, max: 200, message: '最多可输入200个字符'}
          ],
          orderno: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {type: 'integer', message: '请输入数字类型', trigger: 'change'}
          ]
        },
        // 新增用户对话框
        userDialog: false,
        // 特殊输入项名称
        userrangeLabel: '用户群',

      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      filterTextDept(val) {
        this.$refs.dept_tree.filter(val)
      }
    },
    mounted() {
      // if (sessionStorage.getItem('flowSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('flowSession'))
      // }
      this.findFlowTree();
      this.findNode();
      this.findRoute();
    },
    methods: {
      // 初始化业务类型表单
      initBizType(){
        this.bizTypeForm = {
          bizno:'',
          biztypename:'',
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          id:'',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          orderno:'',
          valid_flag: '1'
        }
      },
      // 初始化流程类型表单
      initType(){
        this.typeForm = {
          biztypeid:'',
          biztypename:'',
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          flowtypename:'',
          id:'',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          orderno: '1',
          status: '0',
          valid_flag: '1'
        }
      },
      // 初始化流程节点表单
      initFlowNode(){
        this.flowNodeForm = {
          actortype: '1',
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          deptgroupid:'',
          deptgroupname:'',
          excpusergroupid:'',
          excpusergroupname:'',
          flowtypeid:'',
          formpath:'',
          id:'',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          nodename:'',
          nodetype: '1',
          orderno:  '1',
          usergroupid:'',
          usergroupname:'',
          valid_flag: '1'
        }
        this.changeFlowNode(this.flowNodeForm.actortype)
      },
      // 初始化流程路由表单
      initFlowRoute(){
        this.flowRouteForm = {
          create_dept_id:'',
          create_dept_name:'',
          created_time:'',
          creator_id:'',
          creator_name:'',
          expression:'',
          flowtypeid:'',
          id:'',
          isneedsamedept: '1',
          last_modified_dept_id:'',
          last_modified_dept_name:'',
          last_modified_time:'',
          last_modifier_id:'',
          last_modifier_name:'',
          orderno: '1',
          receivenodeid:'',
          receivenodename:'',
          sendnodeid:'',
          sendnodename:'',
          valid_flag: '1'
        }
      },
      // 树搜索，过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 查询流程树
      findFlowTree() {
        this.$api.flow.queryTree({}).then((res) => {
          if (res.success == "true") {
            this.treeData = res.data
            this.filters.type = ''
            this.filters.id = ''
            this.filters.name = ''
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 重置树节点
      resetFlowTreeFilter() {
        this.filters.type = ''
        this.filters.id = ''
        this.filters.name = ''
      },
      // 刷新菜单列表，菜单树单击事件触发
      refresh(data) {
        this.filters.type = data.type
        this.filters.id = data.id
        this.filters.name = data.name
        this.reset4Node()
        this.findNode()
        this.reset4Route()
        this.findRoute()
      },
      // 查询部门树
      findDeptTree() {
        if(this.treeDataDept.length == 0){
          var param = {};
          this.$api.bmgl.queryTree(param).then((res) => {
            if (res.success == "true") {
              this.treeDataDept = res.data
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      },
      // 清楚部门群
      resetSelectDept(){
        this.flowNodeForm.deptgroupid = ''
        this.flowNodeForm.deptgroupname = ''
        this.$refs.dept_tree.setCheckedNodes([])
      },
      // 选择部门，提交
      submitSelectDept(){
        let arr = this.$refs.dept_tree.getCheckedNodes()
        let deptgroupidarr = []
        let deptgroupnamearr = []
        const length = arr.length;
        for (let i = 0; i < length; i++) {
          deptgroupidarr.push(arr[i].id)
          deptgroupnamearr.push(arr[i].name)
        }
        this.flowNodeForm.deptgroupid = deptgroupidarr.join(",")
        this.flowNodeForm.deptgroupname = deptgroupnamearr.join(",")
        this.deptDialog = false
      },

      // 查询角色列表
      findNode() {
        var param = {
          pagenum: this.currentPage4Node,
          pagesize: this.pageSize4Node,
          flowtypeid: this.filters.id
        }

        var parms = {};
        Object.assign(parms, param)
        this.$api.flowNode.queryTable(parms).then((res) => {
          this.total4Node = Number(res.body.default.count);
          this.tableData4Node = res.body.default.dataset;
          this.mulSelection4Node = []
        })
      },
      // 选择流程节点
      reset4Node(arr) {
        this.currentPage4Node = 1
        this.total4Node = 0
        this.mulSelection4Node = []
        this.tableData4Node = []
      },
      // 选择流程节点
      selectData4Node(arr) {
        this.mulSelection4Node = arr;
      },
      // 改变流程节点列表分页大小
      handleSizeChange4Node(val) {
        this.pageSize4Node = val;
        this.findNode();
      },
      // 流程节点列表跳转页数
      handleCurrentChange4Node(val) {
        this.currentPage4Node = val;
        this.findNode();
      },

      // 查询流程路由列表
      findRoute() {
        var param = {
          pagenum: this.currentPage4Route,
          pagesize: this.pageSize4Route,
          flowtypeid: this.filters.id
        };
        var parms = {};
        Object.assign(parms, param)
        this.$api.flowRoute.queryTable(parms).then((res) => {
          this.total4Route = Number(res.body.default.count);
          this.tableDataRoute = res.body.default.dataset;
          this.mulSelection4Route = []
        })
      },
      // 选择流程路由
      reset4Route(arr) {
        this.currentPage4Route = 1
        this.total4Route = 0
        this.mulSelection4Route = []
        this.tableData4Route = []
      },
      // 选择流程路由
      selectData4Route(arr) {
        this.mulSelection4Route = arr;
      },
      // 改变流程路由列表分页大小
      handleSizeChange4Route(val) {
        this.pageSize4Route = val;
        this.findRoute();
      },
      // 流程路由列表跳转页数
      handleCurrentChange4Route(val) {
        this.currentPage4Route = val;
        this.findRoute();
      },

      // 查询可选用户列表
      findSelectableUser(){
        var param = {
          pagenum: this.currentPage4SectableUser,
          pagesize: this.pageSize4SectableUser
        }
        var parms = {};
        Object.assign(parms, param, this.filtersUser)
        const that = this
        this.$api.user.queryTable(parms).then((res) => {
          res.body.default.dataset.forEach(function (item, index) {
              that.tableData4SectableUser.push(item)
          })
          this.currentPage4SectableUser ++
        })
      },
      // 选择可选用户
      selectData4SectableUser(arr) {
        this.mult4SectableUser = arr;
      },

      // 查询用户列表
      findSelectedUser() {
        var param = {
          id: this.flowNodeForm.id
        };
        var parms = {};
        Object.assign(parms, param)
        this.$api.flowNode.queryTable(parms).then((res) => {
          this.total4Route = Number(res.body.default.count);
          this.tableData4SectedUser = res.body.default.dataset
        })
      },
      // 选择可选用户
      selectData4SectedUser(arr) {
        this.mult4SectedUser = arr;
      },

      // 新增业务类型
      addBiztype(){
        this.$api.flowBizType.getMaxBiznoOrderno({}).then((res) => {
          if (res.success == "true") {
            this.bizTypeTitle = '新增业务类型'
            this.initBizType()
            this.bizTypeForm.bizno = String(Number(res.data.body.default.maxbizno) + 1)
            this.bizTypeForm.orderno = String(Number(res.data.body.default.maxorderno) + 1)
            this.bizTypeDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 新增流程类型
      addType(){
        if (this.filters.type != 'biztype') {
          this.$message({
            message: '请选择流程类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          biztypeid: this.filters.id
        }
        this.$api.flowType.getOrderno(params).then((res) => {
          if (res.success == "true") {
            this.typeTitle = '新增流程类型'
            this.initType()
            this.typeForm.biztypeid = this.filters.id
            this.typeForm.biztypename = this.filters.name
            this.typeForm.orderno = String(Number(res.data.body.default.maxorderno) + 1)
            this.typeDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 拷贝业务、流程类型
      copyFlow(){
        if (this.filters.id === '') {
          this.$message({
            message: '请选择流程类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.filters.id
        }

        this.$api.flow.copyFlow(params).then((res) => {
          if (res.success == "true") {
            this.resetFlowTreeFilter()
            this.findFlowTree()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 修改业务、流程类型
      editFlow(){
        if (this.filters.type === null
        || this.filters.type === '') {
          this.$message({
            message: '请选择业务或流程信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.filters.id
        }
        if(this.filters.type == 'biztype') {
          this.bizTypeTitle = '修改业务类型信息'
          this.$api.flowBizType.get(params).then((res) => {
            if (res.success == "true") {
              this.bizTypeDialog = true
              this.bizTypeForm = res.data.body.default
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
        else if(this.filters.type == 'flowtype'){
          this.typeTitle = '修改流程类型信息'
          this.$api.flowType.get(params).then((res) => {
            if (res.success == "true") {
              this.typeDialog = true
              this.typeForm = res.data.body.default
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      },
      // 删除业务、流程类型
      delFlow(){
        if (this.filters.type === null
        || this.filters.type === '') {
          this.$message({
            message: '请选择要删除的业务或流程信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.filters.id
        }
        if(this.filters.type == 'biztype') {
          this.bizTypeTitle = '修改业务类型信息'
          this.$api.flowBizType.del(params).then((res) => {
            if (res.success == "true") {
              this.resetFlowTreeFilter()
              this.findFlowTree()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
        else if(this.filters.type == 'flowtype'){
          this.bizTypeTitle = '修改流程类型信息'
          this.$api.flowType.del(params).then((res) => {
            if (res.success == "true") {
              this.resetFlowTreeFilter()
              this.findFlowTree()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      },
      // 提交业务类型
      submitBizType() {
        this.$refs.bizTypeForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.bizTypeForm)
            if(this.bizTypeForm.id === null
            || this.bizTypeForm.id === ''){
              this.$api.flowBizType.save(params).then((res) => {
                if (res.success == "true") {
                  this.bizTypeDialog = false
                  this.resetFlowTreeFilter()
                  this.findFlowTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.flowBizType.update(params).then((res) => {
                if (res.success == "true") {
                  this.bizTypeDialog = false
                  this.resetFlowTreeFilter()
                  this.findFlowTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 提交流程类型
      submitType() {
        this.$refs.typeForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.typeForm)
            if(this.typeForm.id === null
            || this.typeForm.id === ''){
              this.$api.flowType.save(params).then((res) => {
                if (res.success == "true") {
                  this.typeDialog = false
                  this.resetFlowTreeFilter()
                  this.findFlowTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.flowType.update(params).then((res) => {
                if (res.success == "true") {
                  this.typeDialog = false
                  this.resetFlowTreeFilter()
                  this.findFlowTree()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 新增流程节点
      addFlowNode(){
        this.flowNodeTitle = '新增流程节点信息'
        if (this.filters.id === null
        || this.filters.id === '') {
          this.$message({
            message: '请先选择节点类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          flowtypeid: this.filters.id
        }
        this.$api.flowNode.getOrderno(params).then((res) => {
          if (res.success == "true") {
            this.initFlowNode()
            this.flowNodeForm.flowtypeid = this.filters.id
            this.flowNodeForm.orderno = String(Number(res.data.body.default.maxorderno) + 1)
            this.flowNodeDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑流程节点
      editFlowNode(){
        if (this.mulSelection4Node.length <= 0) {
          this.$message({
            message: '请先选择流程节点信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        if (this.mulSelection4Node.length > 1) {
          this.$message({
            message: '请先选择一条流程节点信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.mulSelection4Node[0].id
        }
        this.$api.flowNode.get(params).then((res) => {
          if (res.success == "true") {
            this.flowNodeDialog = true
            this.flowNodeForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除流程节点
      delFlowNode(row) {
        this.$confirm('是否确定删除该流程节点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id,
          }
          this.$api.flowNode.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findNode()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 批量删除流程节点
      delBatchFlowNode() {
        if (this.mulSelection4Node.length <= 0) {
          this.$message({
            message: '请先选择要删除的流程节点',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定删除该组的这些流程节点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.mulSelection4Node.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.mulSelection4Node[i].id)
          }
          let params = {
            id: delarr.join(",")
          };
          this.$api.flowNode.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findNode()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 节点类型变更事件
      changeFlowNode(val){
        if(val === '1'){
          this.userrangeLabel = '用户群'
          this.flowNodeForm.deptgroupid = ''
          this.flowNodeForm.deptgroupname = ''
          this.flowNodeForm.excpusergroupid = ''
          this.flowNodeForm.excpusergroupname = ''
          this.tableData4SectedUser = []
        }
        else if (val === '2'){
          this.userrangeLabel = '例外用户群'
          this.flowNodeForm.usergroupid = ''
          this.flowNodeForm.usergroupname = ''
          this.tableData4SectedUser = []
        }
      },
      // 添加用户群
      appendUser(){
        const that = this
        this.mult4SectableUser.forEach(function(item,index){
          that.tableData4SectedUser.push(item)
        })
        this.unique(this.tableData4SectedUser)
        this.mult4SectableUser = []
        this.$refs.tableData4SectableUser.clearSelection()
      },
      // 移除用户群
      removeUser(){
        const that = this
        this.mult4SectedUser.forEach(function(item,index){
          let index2 = that.tableData4SectedUser.indexOf(item)
          if (index2 > -1) {
              that.tableData4SectedUser.splice(index2, 1)
          }
        })
        this.mult4SectedUser = []
        this.$refs.tableData4SectedUser.clearSelection()
      },
      // 刷新可选用户列表
      refreshSectableUser(data){
        this.filtersUser.dept_id = data.id
        this.currentPage4SectableUser = 1
        this.tableData4SectableUser = []
        this.mult4SectableUser = []
        this.mult4SectedUser = []
        this.findSelectableUser()
      },
      // 初始化可选用户列表
      resetSectableUser(){
        this.filtersUser = {}
        this.currentPage4SectableUser = 1
        this.tableData4SectableUser = []
        this.mult4SectableUser = []
        this.tableData4SectedUser = []
        this.mult4SectedUser = []
      },
      // 初始化可选用户列表
      resetSectableUser2(){
        this.currentPage4SectableUser = 1
        this.tableData4SectableUser = []
        this.mult4SectableUser = []
      },
      // 选择部门，提交
      submitSelectUser(){
        let arr = this.tableData4SectedUser
        let userdeptnamearr = []
        let userrangeidarr = []
        let userrangearr = []
        const length = arr.length;
        for (let i = 0; i < length; i++) {
          userdeptnamearr.push(arr[i].dept_name)
          userrangeidarr.push(arr[i].id)
          userrangearr.push(arr[i].user_name)
        }
        if(this.flowNodeForm.actortype === '1'){
          this.flowNodeForm.usergroupid = userrangeidarr.join(",")
          this.flowNodeForm.usergroupname = userrangearr.join(",")
        }
        else {
          this.flowNodeForm.excpusergroupid = userrangeidarr.join(",")
          this.flowNodeForm.excpusergroupname = userrangearr.join(",")
        }
        this.flowNodeForm.userrange = userrangearr.join(",")
        this.userDialog = false
      },
      // 保持流程节点，提交
      submitFlowNode(){
        this.$refs.flowNodeForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.flowNodeForm)
            if(this.flowNodeForm.id === null
            || this.flowNodeForm.id === ''){
              this.$api.flowNode.save(params).then((res) => {
                if (res.success == "true") {
                  this.flowNodeDialog = false
                  this.findNode()
                  this.resetSectableUser()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.flowNode.update(params).then((res) => {
                if (res.success == "true") {
                  this.flowNodeDialog = false
                  this.findNode()
                  this.resetSectableUser()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 发送节点变更
      changeSendNode(val){
        let obj = {};debugger
        obj = this.sendNodeOptions.find((item)=>{//这里的userList就是上面遍历的数据源
            if(item.id === val) {
              this.flowRouteForm.sendnodename = item.text
              return
            }
        });
      },
      // 接收节点变更
      changeReceiveNode(val){
        let obj = {};debugger
        obj = this.receiveNodeOptions.find((item)=>{//这里的userList就是上面遍历的数据源
            if(item.id === val) {
              this.flowRouteForm.receivenodename = item.text
              return
            }
        });
      },
      // 新增流程路由
      addFlowRoute(){
        this.flowRouteTitle = '新增流程路由信息'
        if (this.filters.id === null
        || this.filters.id === '') {
          this.$message({
            message: '请先选择节点类型',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          flowtypeid: this.filters.id
        }
        const that = this
        this.$api.flowRoute.getOrderno(params).then((res) => {
          if (res.success == "true") {
            let params = {
              flowtypeid: that.filters.id
            }
            this.$api.flowNode.query4code(params).then((res) => {
              that.sendNodeOptions = res.body.default.dataset
            })
            let params1 = {
              flowtypeid: that.filters.id,
              nodetype: '2,3'
            }
            this.$api.flowNode.query4code(params1).then((res) => {
              that.receiveNodeOptions = res.body.default.dataset
            })

            this.initFlowRoute()
            this.flowRouteForm.flowtypeid = this.filters.id
            this.flowRouteForm.orderno = String(Number(res.data.body.default.maxorderno) + 1)
            this.flowRouteDialog = true
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 编辑流程路由
      editFlowRoute(){
        if (this.mulSelection4Route.length <= 0) {
          this.$message({
            message: '请先选择流程路由信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        if (this.mulSelection4Route.length > 1) {
          this.$message({
            message: '请先选择一条流程路由信息',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        let params = {
          id: this.mulSelection4Route[0].id
        }
        const that = this
        this.$api.flowRoute.get(params).then((res) => {
          if (res.success == "true") {
            let params = {
              flowtypeid: that.filters.id
            }
            this.$api.flowNode.query4code(params).then((res) => {
              that.sendNodeOptions = res.body.default.dataset
            })
            let params1 = {
              flowtypeid: that.filters.id,
              nodetype: '2,3'
            }
            this.$api.flowNode.query4code(params1).then((res) => {
              that.receiveNodeOptions = res.body.default.dataset
            })
            this.flowRouteDialog = true
            this.flowRouteForm = res.data.body.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 删除流程路由
      delFlowRoute(){
        this.$confirm('是否确定删除该流程路由？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id,
          }
          this.$api.flowRoute.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findRoute()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 批量删除流程路由
      delBatchFlowRoute(){
        if (this.mulSelection4Route.length <= 0) {
          this.$message({
            message: '请先选择要删除的流程路由',
            showClose: true,
            type: 'warning',
          });
          return false;
        }
        this.$confirm('是否确定删除该组的这些流程路由？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delarr = []
          const length = this.mulSelection4Route.length;
          for (let i = 0; i < length; i++) {
            delarr.push(this.mulSelection4Route[i].id)
          }
          let params = {
            id: delarr.join(",")
          };
          this.$api.flowRoute.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findRoute()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 保持流程路由，提交
      submitFlowRoute(){
        this.$refs.flowRouteForm.validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.flowRouteForm)
            if(this.flowRouteForm.id === null
            || this.flowRouteForm.id === ''){
              this.$api.flowRoute.save(params).then((res) => {
                if (res.success == "true") {
                  this.flowRouteDialog = false
                  this.findRoute()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else {
              this.$api.flowRoute.update(params).then((res) => {
                if (res.success == "true") {
                  this.flowRouteDialog = false
                  this.findRoute()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 节点类型转码
      formatsNodeType(row, column) {
        let name = '';
        if (row.nodetype == '1') {
          name = '开始节点'
        }
        else if (row.nodetype == '2') {
          name = '中间节点'
        }
        else if (row.nodetype == '3') {
          name = '结束节点'
        }
        return name
      },
      // 数字去重
      unique (arr) {
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
      }
    },
    beforeRouteLeave(to, form, next) {
        sessionStorage.removeItem('flowSession')
        sessionStorage.setItem('flowSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
