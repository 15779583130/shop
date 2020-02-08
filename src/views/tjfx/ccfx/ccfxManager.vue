<template>
  <!--为echarts准备一个具备大小的容器dom-->
 <div>
   <div> <el-date-picker
         v-model="search_year"
         type="year"
         placeholder="请选择查询年份"
         size="mini"
         format="yyyy"
         value-format="yyyy"
         @change="changeYear">
       </el-date-picker></div>
  <div style="display: flex;height: 500px;align-items: center;">

    <div id="main" style="width:50%;height: 500px;"></div>
    <div id="main2" style="width:50%;height: 500px;"></div>

  </div>
  </div>

</template>
<script>
  import echarts from 'echarts'
  import macarons from '../../../utils/macarons.json'
    export default {
        name: '',
        data () {
            return {
                //charts: '',
                lineCharts:'',
                opinion:[],
                opinionData:[],
                lbfxData:[],
                ayfxData:[],
                counts:[],
                search_year:''
            }
        },
        methods:{
          changeYear(){
            this.drawPie('main')
            this.drawLine('main2')
          },
            drawPie(id){
              let obj = macarons
              echarts.registerTheme('macarons',obj)
               this.charts = echarts.init(document.getElementById(id),'macarons')

               var param = {search_year:this.search_year};
               let that = this
               this.$api.ccfx.queryWzsBySqWzlb(param).then((res) => {

                  if (res.body.default.wzslist) {
                    this.lbfxData = res.body.default.wzslist;
                    this.opinion = []
                    this.opinionData = []
                     this.lbfxData.forEach(function (c) {

                     that.opinion.push(c.sq_wzlb)
                     that.opinionData.push({value:c.wzs, name:c.sq_wzlb})

                     })


                  }else{
                    this.opinion = []
                    this.opinionData = []
                  }

                  this.charts.setOption({
                       title : {
                               text: '按物证类别统计', //饼图的标题
                               x:'center',
                               textStyle: {
                                 color: '#5CACEE'
                               }
                           },
                           tooltip : {
                               trigger: 'item',
                               formatter: "{a} <br/>{b} : {c} ({d}%)"
                           },
                           legend: {
                             orient : 'vertical',
                               x : '5px',
                               y :'10px',
                               data:this.opinion //每一块饼图表示的意义
                           },
                           toolbox: {
                               show : true,
                               orient : 'vertical',
                               y : 'center',
                               feature : {
                                   saveAsImage: {show: true}
                               }
                           },
                           calculable : true,
                           series : [
                               {
                                 name:'按物证类别统计',
                                   type:'pie',//饼状图
                                   radius : '45%',
                                   center: ['60%', 225],
                                   data:this.opinionData//饼图的数据
                               }
                           ]
                  })


               })


            },
            drawLine(id){

              let obj = macarons
              echarts.registerTheme('macarons',obj)

               this.lineCharts = echarts.init(document.getElementById(id))

               var param = {

               };
               let that = this
               var param = {search_year:this.search_year};
               this.$api.ccfx.queryWzsBySqMonth(param).then((res) => {

                  if (res.body.default.wzslist) {
                    this.counts = []
                     this.ayfxData = []
                    this.ayfxData = res.body.default.wzslist;

                     this.ayfxData.forEach(function (c) {

                     that.counts.push(c.wzs)

                     })

                     this.lineCharts.setOption({
                     			title: {
                     			    text: '按月统计',
                              left: 'center',
                              align: 'right',
                     			    textStyle: {
                     			      color: '#5CACEE'
                     			    },

                     			    padding: [5, 0, 5, 100]  // 位置
                     			},
                     		    tooltip : {
                     		        trigger: 'axis'
                     		    },
                     		    grid: {  //设置图标距离
                     		          top: "40",
                     		          left: "30",
                     		          right: "10",
                     		          bottom: "20",
                                  width:'95%'

                     		        },
                     		    legend: {
                     		        data:['物证数'],
                                 left: 10
                     		    },
                     		    toolbox: {
                     		        show : true,
                     		        feature : {
                     		            magicType : {show: true, type: ['line', 'bar']},
                     		        }
                     		    },
                     		    calculable : true,
                     		    xAxis : [
                     		        {
                     		            type : 'category',
                     		            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                     		            splitLine:{
                     	                    show:false
                     	                }
                     		        }
                     		    ],
                     		    yAxis : [
                     		        {
                     		            type : 'value',
                     		            splitLine:{
                     	                    show:false
                     	                }
                     		        }
                     		    ],
                     		    series : [
                     		        {
                     		            name:'物证数',
                     		            type:'line',
                     		            data:this.counts,

                     		            itemStyle:{
                                             normal:{
                                                 color:'#4876FF'
                                             }
                                         },

                     		        }
                     		    ]
                     })
                  }



               })


            }
        },
      //调用
        mounted(){
             this.drawPie('main')
             this.drawLine('main2')
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
