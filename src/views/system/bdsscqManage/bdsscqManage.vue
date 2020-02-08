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
<style scoped>
  .card-header {
    color: #ffffff;
    background-color: #2780e3;
    border-color: #2780e3;
    padding: 10px 15px;
    font-size: 22px;
  }
  .padding-around {
    padding:15px;
  }
  .card {
    box-shadow: none;
    border: 1px solid transparent;
    border-radius: 0;
    border-color: #2780e3;
  }
  .checkbox-margin {
    margin-bottom: 5px;
    margin-right:80px;
  }
  .cron-label {
    font-weight: bold;
    font-family: "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
    font-size: 15px;
    line-height: 45px;
    padding: 10px;
  }
  .cron-btn {
    padding: 10px;
  }
</style>

<template>
  <div class="bmwzc">
    <el-row>
      <el-col :span="20" :offset="2" ref="right_content">
        <div class="grid-content bg-purple-light">
          <!--操作面板 -->
          <el-card class="box-card card" body-style="background: #fff;">
            <el-row>
              <el-col :span="24">
                <div class="clearfix card-header">
                  <span>生成器</span>
                </div>
              </el-col>
              <el-col :span="24">
                <el-tabs v-model="activeName" type="card" class="padding-around">
                  <el-tab-pane label="秒" name="first">
                   <el-form ref="formSecond" :model="formSecond" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formSecond.type" label="1" change="formatSecond" >每秒</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formSecond.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formSecond.start" :min="0" :max="59" :disabled="formSecond.type != '2'" ></el-input-number>秒&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formSecond.end" :min="0" :max="59" :disabled="formSecond.type != '2'" ></el-input-number>秒
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formSecond.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formSecond.interval" :min="0" :max="59" :disabled="formSecond.type != '3'" ></el-input-number>秒&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formSecond.times" :min="0" :max="59" :disabled="formSecond.type != '3'" ></el-input-number>秒&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formSecond.type" label="4">自定义
                         <el-checkbox-group v-model="formSecond.mulSelection" style="display: block;margin-top: 15px;">
                           <el-row v-for="i in 5" >
                             <el-checkbox :disabled="formSecond.type != '4'" v-if="(i-1)*12+j-1 < 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="'0'+((i-1)*12+j-1)" class="checkbox-margin"></el-checkbox>
                             <el-checkbox :disabled="formSecond.type != '4'" v-if="(i-1)*12+j-1 >= 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="(i-1)*12+j-1" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="分钟" name="second">
                   <el-form ref="formMinute" :model="formMinute" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMinute.type" label="1">每分</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMinute.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formMinute.start" :min="0" :max="59" :disabled="formMinute.type != '2'" ></el-input-number>分&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formMinute.end" :min="0" :max="59" :disabled="formMinute.type != '2'" ></el-input-number>分
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMinute.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formMinute.interval" :min="0" :max="59" :disabled="formMinute.type != '3'" ></el-input-number>分&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formMinute.times" :min="0" :max="59" :disabled="formMinute.type != '3'" ></el-input-number>分&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMinute.type" label="4">自定义
                         <el-checkbox-group v-model="formMinute.mulSelection" style="margin-top: 15px;">
                           <el-row v-for="i in 5" >
                             <el-checkbox :disabled="formMinute.type != '4'" v-if="(i-1)*12+j-1 < 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="'0'+((i-1)*12+j-1)" class="checkbox-margin"></el-checkbox>
                             <el-checkbox :disabled="formMinute.type != '4'" v-if="(i-1)*12+j-1 >= 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="(i-1)*12+j-1" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="小时" name="third">
                   <el-form ref="formHour" :model="formHour" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formHour.type" label="1">每时</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formHour.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formHour.start" :min="0" :max="23" :disabled="formHour.type != '2'" ></el-input-number>时&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formHour.end" :min="0" :max="23" :disabled="formHour.type != '2'" ></el-input-number>时
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formHour.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formHour.interval" :min="0" :max="23" :disabled="formHour.type != '3'" ></el-input-number>时&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formHour.times" :min="0" :max="23" :disabled="formHour.type != '3'" ></el-input-number>时&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formHour.type" label="4">自定义
                         <el-checkbox-group v-model="formHour.mulSelection" style="margin-top: 15px;">
                           <el-row v-for="i in 2" >
                             <el-checkbox :disabled="formHour.type != '4'" v-if="(i-1)*12+j-1 < 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="'0'+((i-1)*12+j-1)" class="checkbox-margin"></el-checkbox>
                             <el-checkbox :disabled="formHour.type != '4'" v-if="(i-1)*12+j-1 >= 10" v-for="j in 12"
                               :key="(i-1)*12+j-1" :label="(i-1)*12+j-1" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="日" name="fourth">
                   <el-form ref="formDay" :model="formDay" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="1">每日</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="5">不指定(指定周时，日 需设置为不指定)</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formDay.start" :min="1" :max="31" :disabled="formDay.type != '2'" ></el-input-number>日&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formDay.end" :min="1" :max="31" :disabled="formDay.type != '2'" ></el-input-number>日
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formDay.interval" :min="1" :max="31" :disabled="formDay.type != '3'" ></el-input-number>日&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formDay.times" :min="1" :max="31" :disabled="formDay.type != '3'" ></el-input-number>日&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="6">每月</el-radio>
                       离<el-input-number v-model="formDay.date" :min="1" :max="31" :disabled="formDay.type != '6'" ></el-input-number>日&nbsp;最近工作日
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="7">本月最后一天</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formDay.type" label="4">自定义
                         <el-checkbox-group v-model="formDay.mulSelection" style="margin-top: 15px;">
                           <el-row v-for="i in 3" >
                             <el-checkbox :disabled="formDay.type != '4'" v-if="(i-1)*12+j < 10" v-for="j in 12"
                               :key="(i-1)*12+j" :label="'0'+((i-1)*12+j)" class="checkbox-margin"></el-checkbox>
                             <el-checkbox :disabled="formDay.type != '4'" v-if="(i-1)*12+j >= 10 && ((i-1)*12+j) <= 31" v-for="j in 12"
                               :key="(i-1)*12+j" :label="(i-1)*12+j" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="月" name="six">
                   <el-form ref="formMonth" :model="formMonth" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMonth.type" label="1">每月</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMonth.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formMonth.start" :min="1" :max="31" :disabled="formMonth.type != '2'" ></el-input-number>月&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formMonth.end" :min="1" :max="31" :disabled="formMonth.type != '2'" ></el-input-number>月
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMonth.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formMonth.interval" :min="1" :max="31" :disabled="formMonth.type != '3'" ></el-input-number>月&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formMonth.times" :min="1" :max="31" :disabled="formMonth.type != '3'" ></el-input-number>月&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formMonth.type" label="4">自定义
                         <el-checkbox-group v-model="formMonth.mulSelection" style="margin-top: 15px;">
                           <el-row>
                             <el-checkbox :disabled="formMonth.type != '4'" v-for="i in 12"
                             :key="i" :label="i" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="季" name="eight">
                   <el-form ref="formQuater" :model="formQuater" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formQuater.type" label="5">不指定</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formQuater.type" label="4">自定义
                       <el-row style="margin-top: 15px;">
                         <el-col :span="8">
                          <el-checkbox :disabled="formQuater.type != '4'" v-model="formQuater.Selection1" :key="13" :label="13" class="checkbox-margin">每季度第一个月</el-checkbox>
                         </el-col>
                         <el-col :span="8">
                          <el-checkbox :disabled="formQuater.type != '4'" v-model="formQuater.Selection2" :key="14" :label="14" class="checkbox-margin">每季度第二个月</el-checkbox>
                         </el-col>
                         <el-col :span="8">
                           <el-checkbox :disabled="formQuater.type != '4'" v-model="formQuater.Selection3" :key="15" :label="15" class="checkbox-margin">每季度第三个月</el-checkbox>
                          </el-col>
                       </el-row>
                       <el-row>
                         <el-checkbox-group v-model="formQuater.mulSelection">
                             <el-checkbox :disabled="formQuater.type != '4'" v-for="i in 12"
                             :key="i" :label="i" class="checkbox-margin"></el-checkbox>
                         </el-checkbox-group>
                        </el-row>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="周" name="five">
                   <el-form ref="formWeek" :model="formWeek" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="1">每周</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="5">不指定(指定日时，周 需设置为不指定)</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formWeek.start" :min="1" :max="100" :disabled="formWeek.type != '2'" ></el-input-number>周&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formWeek.end" :min="1" :max="100" :disabled="formWeek.type != '2'" ></el-input-number>周
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="3">循环</el-radio>
                       从<el-input-number v-model="formWeek.interval" :min="1" :max="100" :disabled="formWeek.type != '3'" ></el-input-number>周&nbsp;开始&nbsp;&nbsp;&nbsp;&nbsp;
                       每<el-input-number v-model="formWeek.times" :min="1" :max="100" :disabled="formWeek.type != '3'" ></el-input-number>天&nbsp;执行一次&nbsp;&nbsp;&nbsp;&nbsp;
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="8">指定</el-radio>
                       第<el-input-number v-model="formWeek.from" :min="1" :max="100" :disabled="formWeek.type != '8'" ></el-input-number>周的&nbsp;&nbsp;&nbsp;&nbsp;
                       周<el-input-number v-model="formWeek.to" :min="1" :max="100" :disabled="formWeek.type != '8'" ></el-input-number>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="7">本月最后一个周</el-radio>
                       <el-input-number v-model="formWeek.lastdate" :min="1" :max="100" :disabled="formWeek.type != '7'" ></el-input-number>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formWeek.type" label="4">自定义
                         <el-checkbox-group v-model="formWeek.mulSelection" style="margin-top: 15px;">
                           <el-row >
                             <el-checkbox :disabled="formWeek.type != '4'" v-for="i in 7"
                             :key="i" :label="i" class="checkbox-margin"></el-checkbox>
                           </el-row>
                         </el-checkbox-group>
                       </el-radio>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-tab-pane label="年" name="seven">
                   <el-form ref="formYear" :model="formYear" label-width="0px">
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formYear.type" label="5">不指定</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formYear.type" label="1">每年</el-radio>
                     </el-row>
                     <el-row style="padding-bottom: 15px;">
                       <el-radio v-model="formYear.type" label="2">周期</el-radio>
                       从<el-input-number v-model="formYear.start" :disabled="formYear.type != '2'" ></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;
                       到<el-input-number v-model="formYear.end" :disabled="formYear.type != '2'" ></el-input-number>
                     </el-row>
                   </el-form>
                 </el-tab-pane>
                  <el-card class="box-card card" body-style="background: #fff;">
                    <el-row>
                      <el-col :span="24">
                        <div class="clearfix card-header">
                          <span>表单式结果</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="padding: 15px;">
                      <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                          <el-table
                            :data="tableData"
                            border
                            style="width: 100%;">
                            <el-table-column prop="second" label="秒" ></el-table-column>
                            <el-table-column prop="minute" label="分" ></el-table-column>
                            <el-table-column prop="hour" label="时" ></el-table-column>
                            <el-table-column prop="day" label="日" ></el-table-column>
                            <el-table-column prop="month" label="月" ></el-table-column>
                            <el-table-column prop="week" label="周" ></el-table-column>
                            <el-table-column prop="year" label="年" ></el-table-column>
                          </el-table>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="padding: 15px;background: #FFF;">
                      <el-col :span="24">
                        <el-row style="background: #f5f5f5;">
                          <el-col :span="4" class="cron-label"><span>Cron表达式：</span></el-col>
                          <el-col :span="12" style="padding: 10px;">
                            <el-input placeholder="请输入内容" v-model="cron_expression" clearable> </el-input>
                            <!-- 表达式解析例如：1-2 2/3 12,13 5W 1-2 1#3 2019-2020 -->
                          </el-col>
                          <el-col :span="4" class="cron-btn" ><el-button type="primary" @click="reverseExp()" >解析到生成器</el-button></el-col>
                        </el-row>
                     </el-col>
                    </el-row>
                  </el-card>
                </el-tabs>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>




  </div>
</template>

<script>
	import {timeFormat,timeCompare} from '@/utils/datetime'
	import '@/utils/validate'

  export default {
    name: "bdsscq",
    components: {},
    data() {
      return {
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
        formQuater:{ },
        formYear:{ },
        tableData:[{
          second: '* ',
          minute: '* ',
          hour: '* ',
          day: '* ',
          month: '* ',
          week: '? ',
          year: ''
        }],
        cron_expression: ''
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
      activeName (newValue, oldVal){
        if(newValue === 'six'){
          this.formatMonth()
          this.formatCron()
        }
        else if(newValue === 'eight'){
          this.formatQuater()
          this.formatCron()
        }
      }
    },
    mounted() {
      // if (sessionStorage.getItem('rwlcpzSession')) {
      //     this.filters = JSON.parse(sessionStorage.getItem('rwlcpzSession'))
      // }
      this.initCronSelect()
      this.formatCron()
    },
    methods: {
      // 初始化cron表单式面板
      initCronSelect(){
        this.activeName = 'first'
        this.formSecond = {
          type: '1',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formMinute = {
          type: '1',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formHour = {
          type: '1',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formDay = {
          type: '1',
          start: '1',
          end: '2',
          interval: '1',
          times: '1',
          date: '1',
          lastdate: '1',
          mulSelection: []
        }
        this.formWeek = {
          type: '5',
          start: '1',
          end: '2',
          interval: '1',
          times: '1',
          lastdate:'1',
          from: '1',
          to: '1',
          mulSelection: []
        }
        this.formMonth = {
          type: '1',
          start: '1',
          end: '2',
          interval: '0',
          times: '1',
          mulSelection: []
        }
        this.formQuater= {
          type: '5',
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
        this.cron_expression = cron
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
      },
      //解析cron表达式到生成器的函数
      reverseExp() {
          //获取参数中表达式的值
          if (this.cron_expression) {
              var regs = this.cron_expression.split(' ');
              this.expObj(regs[0], "second");
              this.expObj(regs[1], "minute");
              this.expObj(regs[2], "hour");
              this.expObj(regs[3], "day");
              this.expObj(regs[4], "month");
              this.expObj(regs[5],"week");

              if (regs.length > 6) {
                  this.tableData[0].year = regs[6]
                  this.expObj(regs[6],"year");
              }
          }
      },
      //解析时分秒月
      expObj(val,type){
          // 表达式结果框赋值到列表
          this.tableData[0][type] = val
          // 确认表单
          let formName = ''
          switch (type){
            case 'second':
              formName = 'formSecond'
              break;
            case 'minute':
              formName = 'formMinute'
              break;
            case 'hour':
              formName = 'formHour'
              break;
            case 'day':
              formName = 'formDay'
              break;
            case 'month':
              formName = 'formMonth'
              break;
            case 'week':
              formName = 'formWeek'
              break;
            case 'year':
              formName = 'formYear'
              break;
            default:
              break;
          }
          // 解析表单值
          let formValue = this[formName]
          let ary = null
          if (val == "*") {
              this[formName].type = '1'
          } else if (val.split('-').length > 1) {
              ary = val.split('-');
              this[formName].type  = '2'
              this[formName].start = ary[0]
              this[formName].end = ary[1]
          } else if (val.split('/').length > 1) {
              ary = val.split('/');
              this[formName].type  = '3'
              this[formName].interval = ary[0]
              this[formName].times = ary[1]
          } else if (val.split('#').length > 1) {
              ary = val.split('#');
              this[formName].type  = '8'
              this[formName].from = ary[0]
              this[formName].to = ary[1]
          } else if (val.split('W').length > 1) {
              ary = val.split('W');
              this[formName].type  = '6'
              this[formName].date = ary[0]
          } else if (val.split('L').length > 1) {
              ary = val.split('L');
              this[formName].type  = '7'
              this[formName].lastdate = ary[0]
          } else {
              if (val != "?") {
                this[formName].type  = '4'
                ary = val.split(",");
                let arr = []
                for (var i = 0; i < ary.length; i++) {
                    arr.push(Number(ary[i]))
                }
                this[formName].mulSelection = arr
              }
              else {
                this[formName].type  = '5'
              }
          }
      }


    }
  }
</script>
