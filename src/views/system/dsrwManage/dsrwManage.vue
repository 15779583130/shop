/**
 * @author 董珊珊
 * @create date: 2020/01/06
 * @version:
 * @modify	 	2020/01/06	董珊珊		无		新建，定时任务管理页面
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
  /* 分页 */
  .page {
    float: right;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>


<template>
  <div class="bmwzc">
    <el-row>
      <el-col :span="24" ref="right_content">
        <div class="grid-content bg-purple-light">
          <!-- 任务信息列表 -->
          <el-card class="box-card">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <div
                    style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
                    <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
                    任务信息列表
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="text item">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div
                      style="background: #eaf1f9; position:relative;min-height:56px; width: 100%;  border-bottom: 1px solid #cccccc; font-weight: bold; line-height: 31px">
                      <div class="form-panel">
                        <el-form :inline="true" :model="filters" class="demo-form-inline" size="mini" label-width="120px">
                          <el-row class="form-line">
                            <el-col :span="18" style="display: flex;">
                              <el-form-item label="任务名称">
                                <el-input v-model="filters.job_name" placeholder="请输入任务名称" size="mini" style="width:200px;"
                                  @keyup.enter.native="findTask()"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6" style="text-align: right;">
                              <el-form-item class="id-button">
                                <el-button type="primary" icon="el-icon-search" @click="findTask()" size="mini">查询</el-button>
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
                <el-col :span="24" class="table_btn">
                  <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addTask">新增</el-button>
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="pauseAllTask">全部暂停</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" @click="resumeAllTask">全部恢复</el-button>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-table :data="tableData4Task" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                              highlight-current-row size="mini">
                      <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                          <span>{{(currentPage4Task - 1) * pageSize4Task + scope.$index + 1}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="任务名称" prop="job_name" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="任务状态" prop="trigger_state" :show-overflow-tooltip="true" align="center">
                        <template slot-scope="scope">
                          <el-tag
                          effect="dark"
                          v-for="item in stateOptions"
                          :type='tagOptions[item.index].label'
                          v-show='scope.row.trigger_state === item.value'
                          disable-transitions>{{item.label}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column label="前一次执行时间" prop="prev_fire_time" :show-overflow-tooltip="true" align="center"></el-table-column>
                      <el-table-column label="下一次执行时间" prop="next_fire_time" :show-overflow-tooltip="true" align="center"></el-table-column>
                      <el-table-column label="任务所在组" prop="job_group" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="执行类" prop="job_class_name" :show-overflow-tooltip="true" width="300"></el-table-column>
                      <el-table-column label="任务描述" prop="description" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column label="cron表达式" prop="cron_expression" :show-overflow-tooltip="true"></el-table-column>
                      <el-table-column fixed="right" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                          <i @click="pauseTask(scope.row)" class="el-icon-video-pause"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="暂停"></i>
                          <i @click="resumeTask(scope.row)" class="el-icon-video-play"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="恢复"></i>
                          <i @click="editTask(scope.row)" class="el-icon-edit"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="修改"></i>
                          <i @click="delTask(scope.row)" class="el-icon-delete"
                             style="font-size: 20px; margin-left: 12px;cursor: pointer;color:#0066CC;" title="删除"></i>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <div class="page-content">
                        <el-pagination
                          background
                          @size-change="handleSizeChange4Task"
                          @current-change="handleCurrentChange4Task"
                          :current-page="currentPage4Task"
                          :page-sizes="[10, 20, 50, 100]"
                          :page-size="pageSize4Task"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total4Task">
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

    <!-- 新增定时任务-->
    <el-dialog
      :title="taskDialogTitle"
      :visible.sync="taskDialog"
      :append-to-body="true"
      :modal="true"
      width="50%"
      class="main-con">
      <el-form ref="taskForm" :model="taskForm" label-width="130px"
      size="mini" :rules="taskRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="定时任务名称" prop="job_name">
              <el-input placeholder="请输入定时任务名称" v-model="taskForm.job_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="任务分组" prop="job_group">
              <el-input placeholder="请输入任务分组"  v-model="taskForm.job_group" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="任务描述" prop="description">
              <el-input placeholder="请输入任务描述" v-model="taskForm.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="执行类" prop="job_class_name" width="400px">
              <el-select v-model="taskForm.job_class_name" placeholder="请选择执行类">
                <el-option v-for="item in jobclassOptions" :key="item.id" :value="item.id" :label="item.text" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="执行时间" prop="cron_expression">
              <el-input placeholder="请设置执行时间" v-model="taskForm.cron_expression">
                <el-popover
                  slot="append"
                  placement="top-end"
                  width="590"
                  offset="0"
                  @show="initCronSelect"
                  @hide="formatCron()"
                  v-model="visible" >
                  <el-row>
                    <el-tabs v-model="activeName">
                      <el-tab-pane label="秒" name="first">
                        <el-form ref="formSecond" :model="formSecond" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formSecond.type" label="1" >每秒 允许的通配符[, - * /]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formSecond.type" label="2">周期 从
                            <el-input v-model="formSecond.start" :disabled="formSecond.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formSecond.end" :disabled="formSecond.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>秒
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formSecond.type" label="3">从
                            <el-input v-model="formSecond.interval" :disabled="formSecond.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>秒开始，每
                            <el-input v-model="formSecond.times" :disabled="formSecond.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>秒执行一次
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formSecond.type" label="4">指定
                              <el-checkbox-group v-model="formSecond.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row v-for="i in 6" >
                                  <el-checkbox :disabled="formSecond.type != '4'" v-if="i == 1" v-for="j in 10"
                                    :key="(i-1)*10+j-1" :label="'0'+((i-1)*10+j-1)" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                    <el-checkbox :disabled="formSecond.type != '4'" v-if="i != 1" v-for="j in 10"
                                    :key="(i-1)*10+j-1" :label="(i-1)*10+j-1" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="分钟" name="second">
                        <el-form ref="formSecond" :model="formMinute" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMinute.type" label="1">每分钟 允许的通配符[, - * /]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMinute.type" label="2">周期 从
                            <el-input v-model="formMinute.start" :disabled="formMinute.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formMinute.end" :disabled="formMinute.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>分钟
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMinute.type" label="3">从
                            <el-input v-model="formMinute.interval" :disabled="formMinute.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>分钟开始，每
                            <el-input v-model="formMinute.times" :disabled="formMinute.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>分钟执行一次
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMinute.type" label="4">指定
                              <el-checkbox-group v-model="formMinute.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row v-for="i in 6" >
                                  <el-checkbox :disabled="formMinute.type != '4'" v-if="i == 1" v-for="j in 10"
                                  :key="(i-1)*10+j-1" :label="'0'+((i-1)*10+j-1)" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                  <el-checkbox :disabled="formMinute.type != '4'" v-if="i != 1" v-for="j in 10"
                                  :key="(i-1)*10+j-1" :label="(i-1)*10+j-1" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="小时" name="third">
                        <el-form ref="formHour" :model="formHour" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formHour.type" label="1">每小时 允许的通配符[, - * /]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formHour.type" label="2">周期 从
                            <el-input v-model="formHour.start" :disabled="formHour.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formHour.end" :disabled="formHour.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>小时
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formHour.type" label="3">从
                            <el-input v-model="formHour.interval" :disabled="formHour.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>小时开始，每
                            <el-input v-model="formHour.times" :disabled="formHour.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>小时执行一次
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formHour.type" label="4">指定
                              <el-checkbox-group v-model="formHour.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row v-for="i in 4" >
                                  <el-checkbox :disabled="formHour.type != '4'" v-if="((i-1)*6+j-1) < 10" v-for="j in 6"
                                  :key="(i-1)*6+j-1" :label="'0'+((i-1)*6+j-1)" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                  <el-checkbox :disabled="formHour.type != '4'"
                                  :key="(i-1)*6+j-1" v-if="((i-1)*6+j-1) >= 10" v-for="j in 6" :label="(i-1)*6+j-1" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="日" name="fourth">
                        <el-form ref="formDay" :model="formDay" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="1">每天 允许的通配符[, - * /]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="5">不指定</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="2">周期 从
                            <el-input v-model="formDay.start" :disabled="formDay.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formDay.end" :disabled="formDay.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>日
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="3">从
                            <el-input v-model="formDay.interval" :disabled="formDay.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>日开始，每
                            <el-input v-model="formDay.times" :disabled="formDay.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>天执行一次
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="6">每月
                            <el-input v-model="formDay.date" :disabled="formDay.type != '6'" maxlength="2" style="width:50px;text-align: center;" ></el-input>号最近的那个工作日
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="7" >本月最后一天</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formDay.type" label="4">指定
                              <el-checkbox-group v-model="formDay.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row v-for="i in 4" >
                                  <el-checkbox :disabled="formDay.type != '4'" v-if="((i-1)*10+j) < 10" v-for="j in 10"
                                  :key="(i-1)*10+j" :label="'0'+((i-1)*10+j)" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                  <el-checkbox :disabled="formDay.type != '4'" v-if="((i-1)*10+j) >= 10 && ((i-1)*10+j) <= 31" v-for="j in 10"
                                  :key="(i-1)*10+j"  :label="(i-1)*10+j" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                  <el-checkbox :disabled="formDay.type != '4'" v-if="((i-1)*10+1) > 31"
                                  key="31"  label="31" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="周" name="five">
                        <el-form ref="formWeek" :model="formWeek" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="1">每周 允许的通配符[, - * / L #]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="5">不指定</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="2">周期 从星期
                            <el-input v-model="formWeek.start" :disabled="formWeek.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formWeek.end" :disabled="formWeek.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="3">第
                            <el-input v-model="formWeek.interval" :disabled="formWeek.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>周的星期
                            <el-input v-model="formWeek.times" :disabled="formWeek.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="7">本月最后一个星期
                            <el-input v-model="formWeek.lastdate" :disabled="formWeek.type != '6'" maxlength="2" style="width:50px;text-align: center;" ></el-input>
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formWeek.type" label="4">指定
                              <el-checkbox-group v-model="formWeek.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row >
                                  <el-checkbox :disabled="formWeek.type != '4'" v-for="i in 7"
                                  :key="i" :label="i" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="月" name="six">
                        <el-form ref="formMonth" :model="formMonth" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMonth.type" label="1">每月 允许的通配符[, - * /]</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMonth.type" label="5">不指定</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMonth.type" label="2">周期 从
                            <el-input v-model="formMonth.start" :disabled="formMonth.type != '2'" placeholder="起" maxlength="2" style="width:50px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formMonth.end" :disabled="formMonth.type != '2'" placeholder="止" maxlength="2" style="width:50px;text-align: center;" ></el-input>月
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMonth.type" label="3">从
                            <el-input v-model="formMonth.interval" :disabled="formMonth.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>日开始,每
                            <el-input v-model="formMonth.times" :disabled="formMonth.type != '3'" maxlength="2" style="width:50px;text-align: center;" ></el-input>月执行一次
                            </el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formMonth.type" label="4">指定
                              <el-checkbox-group v-model="formMonth.mulSelection" style="display: block;margin-top: 5px;margin-left:15px;">
                                <el-row v-for="i in 2" >
                                  <el-checkbox :disabled="formMonth.type != '4'" v-if="((i-1)*6+j) < 10" v-for="j in 6"
                                  :key="(i-1)*6+j" :label="'0'+((i-1)*6+j)" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                  <el-checkbox :disabled="formMonth.type != '4'" v-if="((i-1)*6+j) >= 10 " v-for="j in 6"
                                  :key="(i-1)*6+j" :label="(i-1)*6+j" style="margin-bottom: 5px;margin-right:15px;"></el-checkbox>
                                </el-row>
                              </el-checkbox-group>
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="年" name="seven">
                        <el-form ref="formYear" :model="formYear" label-width="0px">
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formYear.type" label="5">不指定 允许的通配符[, - * /] 非必填</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formYear.type" label="1">每年</el-radio>
                          </el-row>
                          <el-row style="padding-bottom: 5px;">
                            <el-radio v-model="formYear.type" label="2">周期 从
                            <el-input v-model="formYear.start" :disabled="formYear.type != '2'" placeholder="起" maxlength="4" style="width:65px;text-align: center;" ></el-input>&nbsp;一
                            <el-input v-model="formYear.end" :disabled="formYear.type != '2'" placeholder="止" maxlength="4" style="width:65px;text-align: center;" ></el-input>年
                            </el-radio>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                    </el-tabs>

                  </el-row>

                  <el-button slot="reference" icon="el-icon-edit-outline"></el-button>
                </el-popover>

              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!isSave">
          <el-col :span="24" class="table_btn">
            <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addParam()">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="delParam()">删除</el-button>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-table :data="tableData4Param" :header-cell-style="{background:'#e6e6e6'}" border style="width: 100%"
                    @selection-change="selectData4Param"    highlight-current-row size="mini">
                <el-table-column type="selection" align="center" width="50" ></el-table-column>
                <el-table-column label="序号" align="center" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="参数名" prop="csm" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="参数值" prop="csz" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskDialog = false;" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitTask();" size="mini">提交</el-button>
      </span>
    </el-dialog>

    <!-- 新增参数-->
    <el-dialog
      :title="paramDialogTitle"
      :visible.sync="paramDialog"
      :append-to-body="true"
      :modal="true"
      width="30%"
      class="main-con">
      <el-form ref="paramForm" :model="paramForm" label-width="130px"
      size="mini" :rules="paramRules">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="参数名" prop="csm">
              <el-input placeholder="请输入参数名" v-model="paramForm.csm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="2">
            <el-form-item label="参数值" prop="csz">
              <el-input placeholder="请输入参数值"  v-model="paramForm.csz" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramDialog = false;" size="mini">关闭</el-button>
        <el-button type="primary" @click="submitParam();" size="mini">提交</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'
	import '@/utils/validate'

  export default {
    name: "dsrw",
    components: {},
    data() {
      return {
        // 代码表值
        tagOptions:[{value:'0',label:'primary'},{value:'1',label:'success'},{value:'2',label:'info'},{value:'3',label:'danger'},{value:'4',label:''}],
        stateOptions:[
        {index:'0', value:'PAUSED',label:'暂停'},
        {index:'1', value:'ACQUIRED',label:'正常执行'},
        {index:'4', value:'BLOCKED',label:'阻塞'},
        {index:'3', value:'ERROR',label:'执行错误'},
        {index:'2', value:'WAITING',label:'等待'}],
        // 执行类
        jobclassOptions: [],
        // 筛选条件
        filters: {},
        // 定时任务分页信息
        currentPage4Task: 1,
        total4Task: 0,
        pageSize4Task: 10,
        // 节点表格数据
        tableData4Task: [],
        // 定时任务对话框标题
        taskDialogTitle: '定时任务信息',
        // 定时任务对话框
        taskDialog: false,
        // 定时任务信息表单
        taskForm: {},
        // 定时任务表单校验规则
        taskRules: {
          job_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          job_group: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          description: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          job_class_name: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          cron_expression: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ]
        },
        // 新增保存标识符
        isSave: true,
        // 参数表格数据
        tableData4Param: [],
        // 参数对话框标题
        paramDialogTitle: '参数信息',
        // 参数对话框
        paramDialog: false,
        // 参数信息表单
        paramForm: {},
        // 参数表单校验规则
        paramRules: {
          csm: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ],
          csz: [
            {required: true, message: '这是必填字段', trigger: 'blur'},
            {min: 0, max: 250, message: '最多可输入250个字符'}
          ]
        },
        // cron表单式面板可视性
        visible: null,
        // cron表单式面板显示tab
        activeName: '',
        // cron表单式面板标签页表单
        formSecond:{ },
        formMinute:{ },
        formHour:{ },
        formDay:{ },
        formWeek:{ },
        formMonth:{ },
        formYear:{ },
        tableData:[{
          second: '* ',
          minute: '* ',
          hour: '* ',
          day: '* ',
          month: '* ',
          week: '? ',
          year: ''
        }]
      }
    },
    watch: {
      formSecond:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatSecond()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formMinute:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatMinute()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formHour:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatHour()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formDay:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatDay()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formMonth:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatMonth()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      'formQuater.Selection1':{
        handler(newValue, oldVal){
          let arr = [1,4,7,10]
          const that = this
          if(newValue){
             arr.forEach(function(item,index){
               that.formQuater.mulSelection.push(item)
             })
          }
          else {
            arr.forEach(function(item,index){
              let index2 = that.formQuater.mulSelection.indexOf(item)
              if (index2 > -1) {
                  that.formQuater.mulSelection.splice(index2, 1)
              }
            })
          }
          this.unique(this.formQuater.mulSelection)
        }
      },
      'formQuater.Selection2':{
        handler(newValue, oldVal){
          let arr = [2,5,8,11]
          const that = this
          if(newValue){
             arr.forEach(function(item,index){
               that.formQuater.mulSelection.push(item)
             })
          }
          else {
            arr.forEach(function(item,index){
              let index2 = that.formQuater.mulSelection.indexOf(item)
              if (index2 > -1) {
                  that.formQuater.mulSelection.splice(index2, 1)
              }
            })
          }
          this.unique(this.formQuater.mulSelection)
        }
      },
      'formQuater.Selection3':{
        handler(newValue, oldVal){
          let arr = [3,6,9,12]
          const that = this
          if(newValue){
             arr.forEach(function(item,index){
               that.formQuater.mulSelection.push(item)
             })
          }
          else {
            arr.forEach(function(item,index){
              let index2 = that.formQuater.mulSelection.indexOf(item)
              if (index2 > -1) {
                  that.formQuater.mulSelection.splice(index2, 1)
              }
            })
          }
          this.unique(this.formQuater.mulSelection)
        }
      },
      formQuater:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatQuater()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formWeek:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatWeek()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
      formYear:{//深度监听，可监听到对象、数组的变化
        handler(newValue, oldVal){
          this.formatYear()
          this.formatCron()
        },
        deep:true //true 深度监听
      },
    },
    mounted() {
      // if (sessionStorage.getItem('rwlcpzSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('rwlcpzSession'))
      // }
      this.getClazz()
      this.findTask()
    },
    methods: {
      // 初始化定时任务表单
      initTaskInfo(){
        this.taskForm = {
          id:'',
          cron_expression:'',
          description:'',
          job_class_name:'',
          job_group:'',
          job_name:''
        }
      },
      // 初始化cron表单式面板
      initCronSelect(){
        this.activeName = 'first'
        this.formSecond = {
          type: '',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formMinute = {
          type: '',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formHour = {
          type: '',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formDay = {
          type: '',
          start: '1',
          end: '2',
          interval: '1',
          times: '1',
          date: '1',
          lastdate:'1',
          mulSelection: []
        }
        this.formWeek = {
          type: '5',
          start: '1',
          end: '2',
          interval: '1',
          times: '1',
          lastdate:'1',
          mulSelection: []
        }
        this.formMonth = {
          type: '',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formYear = {
          type: '',
          start: '2019',
          end: '2020'
        }
      },
      // 表达式转义
      formatCron(){
        let cron = ''
        if(this.activeName == ''){
          cron = ''
        }
        else {
          cron  = this.tableData[0].second
          + this.tableData[0].minute
          + this.tableData[0].hour
          + this.tableData[0].day
          + this.tableData[0].month
          + this.tableData[0].week
          + this.tableData[0].year
        }
        this.taskForm.cron_expression = cron
      },
      // 查询定时任务列表
      findTask() {
        var param = {
          pagenum: this.currentPage4Task,
          pagesize: this.pageSize4Task
        }
        var parms = {}
        Object.assign(parms, param, this.filters)
        this.$api.dsrw.query(parms).then((res) => {
          this.total4Task = Number(res.body.default.listcount)
          this.tableData4Task = res.body.default.list
        })
      },
      // 重置查询
      reset() {
        this.filters.job_name = ''
      },
      // 改变定时任务列表分页大小
      handleSizeChange4Task(val) {
        this.pageSize4Task = val;
        this.findTask();
      },
      // 定时任务列表跳转页数
      handleCurrentChange4Task(val) {
        this.currentPage4Task = val;
        this.findTask();
      },
      // 获取定时任务执行类
      getClazz() {
        const that = this
        this.$api.dsrw.getClazz({}).then((res) => {
          if (res.success == "true") {
            that.jobclassOptions = res.data.body.default.default
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 新增定时任务
      addTask(){
        this.isSave = true
        this.taskDialogTitle = '新增定时任务'
        this.initTaskInfo()
        this.tableData4Param = []
        this.taskDialog = true
      },
      // 编辑定时任务
      editTask(row){
        this.isSave = false
        this.taskDialogTitle = '修改定时任务'
        let params = {
          job_name: row.job_name
        }
        this.$api.dsrw.get(params).then((res) => {
          if (res.success == "true") {
            this.taskDialog = true
            this.taskForm = res.data.body.default
            this.findParamm()
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        })
      },
      // 保持定时任务，提交
      submitTask(){
        this.$refs.taskForm.validate((valid) => {
          if (valid) {
            let csmarr = []
            let cszarr = []
            this.tableData4Param.forEach((item,index,arr)=>{
              csmarr.push(item.csm)
              cszarr.push(item.csz)
            })
            this.taskForm.csm = csmarr.join(",")
            this.taskForm.csz = cszarr.join(",")
            let params = Object.assign({}, this.taskForm)
            if( params.repeat_interval === ''){
              this.$delete(params,'repeat_interval')
            }
            if( params.times_triggered === ''){
              this.$delete(params,'times_triggered')
            }
            if(this.isSave){
              this.$api.dsrw.save(params).then((res) => {
                if (res.success == "true") {
                  this.taskDialog = false
                  this.findTask()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
            else  {
              this.$api.dsrw.update(params).then((res) => {
                if (res.success == "true") {
                  this.taskDialog = false
                  this.findTask()
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              })
            }
          }
        })
      },
      // 删除定时任务
      delTask(row) {
        this.$confirm('确定要删当前记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            job_name: row.job_name,
            job_group: row.job_group
          }
          this.$api.dsrw.del(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTask()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 暂停所有定时任务
      pauseAllTask(){
        this.$confirm('确定要暂停所有定时任务？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.dsrw.pauseAll().then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTask()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 恢复所有定时任务
      resumeAllTask(){
        this.$confirm('确定重启所有定时任务？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.dsrw.resumeAll().then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTask()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 暂停定时任务
      pauseTask(row){
        this.$confirm('确定暂停当前定时任务？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            job_name: row.job_name,
            job_group: row.job_group
          }
          this.$api.dsrw.pause(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTask()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 恢复定时任务
      resumeTask(row){
        this.$confirm('确定恢复当前定时任务？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            job_name: row.job_name,
            job_group: row.job_group
          }
          this.$api.dsrw.resume(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.findTask()
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        })
      },
      // 查询参数列表
      findParamm() {
        var param = {
          job_name: this.taskForm.job_name
        }
        var parms = {}
        Object.assign(parms, param, this.filters)
        const that = this
        this.$api.dsrw.queryCs(parms).then((res) => {
          if(res.body.default.listcount === '0'){
            that.tableData4Param = []
          }
          else {
            that.tableData4Param = res.body.default.list
          }
        })
      },
      // 新增参数
      addParam(){
        this.paramDialog = true
      },
      // 删除参数
      delParam(){
        this.mulSelection4Param.forEach((item,index,arr)=>{
            this.tableData4Param.splice(this.tableData4Param.indexOf(arr),1)
            //this.tableData4Param.$remove(arr)
        })
      },
      // 选择参数
      selectData4Param(arr) {
        this.mulSelection4Param = arr;
      },
      // 保持参数，提交
      submitParam(){
        const that = this
        this.$refs.paramForm.validate((valid) => {
          if (valid) {
            let item = {
              csm: this.paramForm.csm,
              csz: this.paramForm.csz
            }
            this.tableData4Param.push(item)
            this.uniqueParam(this.tableData4Param)
            this.paramForm = {}
            this.paramDialog = false
          }
        })
      },
      // 参数名数字去重
      uniqueParam(arr) {
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].csm === arr[j].csm){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
      },
      formatSecond(){
        let cron = ''
        switch (this.formSecond.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formSecond.start + '-' + this.formSecond.end + ' '
            break;
          case '3':
          cron += this.formSecond.interval + '/' + this.formSecond.times + ' '
            break;
          case '4':
          let tempstr = (',' + this.formSecond.mulSelection.join(',')).replace(new RegExp(',0','g'),',')
          cron += tempstr.substr(1, tempstr.length) + ' '
          if(this.formSecond.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].second = cron
        return cron
      },
      formatMinute(){
        let cron = ''
        switch (this.formMinute.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formMinute.start + '-' + this.formMinute.end + ' '
            break;
          case '3':
          cron += this.formMinute.interval + '/' + this.formMinute.times + ' '
            break;
          case '4':
          let tempstr = (',' + this.formMinute.mulSelection.join(',')).replace(new RegExp(',0','g'),',')
          cron += tempstr.substr(1, tempstr.length) + ' '
          if(this.formMinute.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].minute = cron
        return cron
      },
      formatHour(){
        let cron = ''
        switch (this.formHour.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formHour.start + '-' + this.formHour.end + ' '
            break;
          case '3':
          cron += this.formHour.interval + '/' + this.formHour.times + ' '
            break;
          case '4':
          let tempstr = (',' + this.formHour.mulSelection.join(',')).replace(new RegExp(',0','g'),',')
          cron += tempstr.substr(1, tempstr.length) + ' '
          if(this.formHour.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].hour = cron
        return cron
      },
      formatDay(){
        let cron = ''
        switch (this.formDay.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formDay.start + '-' + this.formDay.end + ' '
            break;
          case '3':
          cron += this.formDay.interval + '/' + this.formDay.times + ' '
            break;
          case '4':
          let tempstr = (',' + this.formDay.mulSelection.join(',')).replace(new RegExp(',0','g'),',')
          cron += tempstr.substr(1, tempstr.length) + ' '
          if(this.formDay.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          case '5':
          cron += '*' + ' '
            break;
          case '6':
          cron += this.formDay.date + 'W' + ' '
            break;
          case '7':
          cron += this.formDay.lastdate + 'L' + ' '
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].day = cron
        return cron
      },
      formatMonth(){
        let cron = ''
        switch (this.formMonth.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formMonth.start + '-' + this.formMonth.end + ' '
            break;
          case '3':
          cron += this.formMonth.interval + '/' + this.formMonth.times + ' '
            break;
          case '4':
          let tempstr = (',' + this.formMonth.mulSelection.join(',')).replace(new RegExp(',0','g'),',')
          cron += tempstr.substr(1, tempstr.length) + ' '
          if(this.formMonth.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          case '5':
          cron += '*' + ' '
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].month = cron
        return cron
      },
      formatQuater(){
        let cron = ''
        switch (this.formQuater.type){
          case '4':
          cron += this.formQuater.mulSelection.join(',') + ' '
          if(this.formQuater.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          case '5':
          cron += '*' + ' '
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].month = cron
        return cron
      },
      formatWeek(){
        let cron = ''
        switch (this.formWeek.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formWeek.start + '-' + this.formWeek.end + ' '
            break;
          case '3':
          cron += this.formWeek.interval + '/' + this.formWeek.times + ' '
            break;
          case '4':
          cron += this.formWeek.mulSelection.join(',') + ' '
          if(this.formWeek.mulSelection.join(',') === ' '){
            cron += '?' + ' '
          }
            break;
          case '5':
          cron += '?' + ' '
            break;
          case '7':
          cron += this.formWeek.lastdate + 'L' + ' '
            break;
          case '8':
          cron += this.formWeek.from + '#' + this.formWeek.to + ' '
            break;
          default:
          cron += '*' + ' '
            break;
        }
        this.tableData[0].week = cron
        return cron
      },
      formatYear(){
        let cron = ''
        switch (this.formYear.type){
          case '1':
          cron += '*' + ' '
            break;
          case '2':
          cron += this.formYear.start + '-' + this.formYear.end + ' '
            break;
          case '5':
          cron += ''
            break;
          default:
          cron += ''
            break;
        }
        this.tableData[0].year = cron
        return cron
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
        sessionStorage.removeItem('rwlcpzSession')
        sessionStorage.setItem('rwlcpzSession', JSON.stringify(this.filters))
        next()
    }
  }
</script>
