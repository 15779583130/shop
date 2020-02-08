<style lang="less" scoped>
  @import '../../../styles/common.less';
  @import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div
            style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
           报文信息
          </div>
        </div>
      </el-col>
    </el-row>
<el-row>
<el-scrollbar >
  <xmp v-text="bwxx"></xmp>
</el-scrollbar>
</el-row>

  </el-card>
</template>
<script>
  import {timeFormat,timeCompare} from '@/utils/datetime'

  export default {
    data() {
      return {
        bwxx:'',
        type:'',
        dialogImageUrl: '',
        dialogVisible: false,
        bw:'',
        //筛选条件
        filters: {
          message:'',
          success:'',
          transid:'',
          parentid:'',
          count:''
        },
        //分页信息
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableData: [],
        deptDialog: false,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        filterText: '',
        checkDeptId: [],
        checkDeptName: [],
        more: false,
        escapeMap :{
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': '&quot;',
          "'": '&#39;'
        },
        unescapeMap :{
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          '&quot;': '"',
          "&#39;":  "'"
        },
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
      escapeHTML(string) {
        var that = this;
        return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
          return that.escapeMap[s] || s;
        });
      },
      unescapeHTML: function(a){
        a = "" + a;
         return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      init() {
        // 查询信息
        this.findTable()
      },
      handleCheckChange(data, checked) {
        if (checked) {
          this.checkDeptId.push(data.id)
          this.checkDeptName.push(data.name)
        } else {
          this.checkDeptId.splice(this.checkDeptId.indexOf(data.id), 1)
          this.checkDeptName.splice(this.checkDeptName.indexOf(data.name), 1)
        }
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      findTable(val) {

        this.type=JSON.parse(sessionStorage.getItem('fhbw')).type
        var param = {
          id:JSON.parse(sessionStorage.getItem('fhbw')).id
        };
        this.$api.jyrzcx.get(param).then((res) => {

          if(this.type=='fh'){
          this.bwxx= this.formateXml(this.unescapeHTML(res.body.default.respcontent))
        }
        else if(this.type=='qq'){
           this.bwxx= this.formateXml(this.unescapeHTML(res.body.default.reqcontent))
        }
        })
      },


      formateXml(xmlStr){
          this.text = xmlStr;
          //使用replace去空格
          this.text = '\n' + this.text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props){
              return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
          }).replace(/>\s*?</g,">\n<");
          //处理注释
          this.text = this.text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text){
              var ret = '<!--' + escape(this.text) + '-->';
              return ret;
          }).replace(/\r/g,'\n');
          return this.text
      },
      //计算头函数 用来缩进
       setPrefix(prefixIndex) {
          var result = '';
          var span = '    ';//缩进长度
          var output = [];
          for(var i = 0 ; i < prefixIndex; ++i){
              output.push(span);
          }
          result = output.join('');
          return result;
      },
      changePage(index) {
        // 分页点击事件
        this.currentPage = parseInt(index)
      },
      searchBtn() {
        this.currentPage = 1

      },
      createBtn() {
        this.$router.push({
          name: 'addOrganization'
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.findTable();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.findTable();
      },
      formatAjlx(row, column) {
        var ajlxFormat = '';
        if (row.sfsa === '0') {
          ajlxFormat = '行政案件'
        } else if (row.sfsa === '1') {
          ajlxFormat = '刑事案件'
        }
        return ajlxFormat;
      },
      formatDate(row, column, cellValue, index) {
        return timeFormat(cellValue);
      },

    },
    beforeRouteLeave(to, form, next) {
      sessionStorage.removeItem('wzdjSession')
      sessionStorage.setItem('wzdjSession', JSON.stringify(this.filters))
      next()
    }
  }
</script>

<style scoped>

</style>
