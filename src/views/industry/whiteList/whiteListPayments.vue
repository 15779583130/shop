<style lang="less">
  @import '../../../styles/common.less';
</style>
<style lang="less">
</style>
<template>
  <el-card class="box-card">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1" >
      <template slot="title" style="font-weight: bold; text-indent: 1em">
        案件信息
      </template>
      <hr />
      <div>
        <el-row style="position: relative; top: 15px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">案件编号</span>
              <span>A3505837300002010031029</span>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">案件名称</span>
              <span>张某虎入室抢劫案</span>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">是否涉案</span>
              <span>是</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div>
        <el-row style="position: relative; top: 25px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">录入部门</span>
              <span>厦门市公安局集美分局杏林派出所</span>
            </div>
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple-light">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">录入人员</span>
              <span>陈警官</span>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">嫌疑人</span>
              <span>张一虎</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div>
        <el-row style="position: relative; top: 35px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">备注</span>
              <span>案件备注</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div style="height: 100px; margin-top: 8px">
        <el-row style="position: relative; top: 35px;">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999; float: left">文本图片</span>
              <el-tooltip class="item" style="position: relative; left: 10px" effect="light" content="提示：格式仅允许上传（JPG,JPEG,PNG）" placement="top">
                <el-button>已上传6张图片</el-button>
              </el-tooltip>
            </div>
          </div></el-col>
        </el-row>
        <el-row style="position: relative; top: 35px; left: 20px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div style="width: 500px; height: 120px; position: relative; left: 23px; top: 15px">
              <div style="height: 120px; float: left; width: 20px; margin-right: 10px"><i class="el-icon-arrow-left" style="position: relative; top: 45px; font-size: 20px"></i></div>
              <div style="width: 410px; overflow-y: hidden; overflow-x: auto; height: 130px;">
                <div style="width: 700px;">
                  <div class="demo-image__preview" style="position: relative;  float: left;">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      :preview-src-list="srcList">
                    </el-image>
                    <el-image
                      style="width: 100px; height: 100px; margin-left: 10px"
                      :src="url"
                      :preview-src-list="srcList1">
                    </el-image>
                    <el-image
                      style="width: 100px; height: 100px; margin-left: 10px"
                      :src="url"
                      :preview-src-list="srcList1">
                    </el-image>
                    <el-image
                      style="width: 100px; height: 100px; margin-left: 10px"
                      :src="url"
                      :preview-src-list="srcList1">
                    </el-image>
                    <el-image
                      style="width: 100px; height: 100px; margin-left: 10px"
                      :src="url"
                      :preview-src-list="srcList1">
                    </el-image>
                    <el-image
                      style="width: 100px; height: 100px; margin-left: 10px"
                      :src="url"
                      :preview-src-list="srcList1">
                    </el-image>
                    <div style="height: 55px"></div>
                  </div>
                </div>
              </div>
              <div style="height: 120px;width: 20px; float: right; position: relative; top: -85px; left: -30px"><i class="el-icon-arrow-right" style="position: relative; font-size: 20px"></i></div>
            </div>
          </div>
          </el-col>
        </el-row>
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse v-model="activeNames1">
    <el-collapse-item name="1" >
      <template slot="title" style="font-weight: bold; text-indent: 1em">
        承办信息
      </template>
      <hr />
      <div>
        <el-row style="position: relative; top: 15px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">接收时间</span>
              <span>2019-11-22 18:18:21</span>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">检察官</span>
              <span>陈检察官</span>
            </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">所属部门</span>
              <span>厦门市集美区人民检察院</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div>
        <el-row style="position: relative; top: 25px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">备注</span>
              <span>厦门市公安局集美分局杏林派出所</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div>
        <el-row style="position: relative; top: 35px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <div  style="position: relative; left: 10px">
              <span style="color: #999999">附件</span>
              <span>附件</span>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div style="height: 20px; margin-top: 8px">
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse v-model="activeNames2">
    <el-collapse-item name="1" >
      <template slot="title" style="font-weight: bold; text-indent: 1em">
        物证信息
      </template>
      <hr />
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <el-table :data="tableData" border :header-cell-style="{background:'#508dc3', color: '#fff'}" style="width: 100%;" highlight-current-row tooltip-effect="dark" size="mini">
              <el-table-column type="selection" width="50">
              </el-table-column>
              <el-table-column prop="date1" label="物证名称" width="this.widthLie">
                <template slot-scope="scope">
                  <span style="color:#5287d8" @click="handlerByName">{{ scope.row.date1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date2" label="证物状态" width="this.widthLie">
              </el-table-column>
              <el-table-column prop="date3" label="存放位置" width="this.widthLie">
              </el-table-column>
              <el-table-column prop="date4" label="保管期限" width="this.widthLie">
              </el-table-column>
              <el-table-column prop="date5" label="持有人" width="this.widthLie">
              </el-table-column>
              <el-table-column prop="date6" label="案件名称" width="this.widthLie">
              </el-table-column>
              <el-table-column prop="date7" label="录入部门" width="this.widthLie">
              </el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="180 * this.widthLie">
                <template slot-scope="scope">
                  <i @click="disPicDetail(scope.row)" class="el-icon-view" style="font-size: 20px"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div></el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
    <case-preview :display="this.centerDialogVisible" @closrDialog="closrDialog"></case-preview>
  </el-card>
</template>

<script>import casePreview from '../../my-components/casePreview/casePreview'
export default {
    components: {
      casePreview
    },
  data () {
    return {
        tableData: [
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'},
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'},
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'},
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'},
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'},
            {date1: '林某入室抢劫案', date2: '已入库', date3: '2019-11-22', date4: '林某人', date5: '何京生', date6: '3500219574', date7: '人事科'}
        ],
        urlImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        imgList: [
            {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574835831118&di=34f79631c7270a60a565e418df649292&imgtype=0&src=http%3A%2F%2Fimages.missyuan.com%2Fattachments%2Fday_080820%2F20080820_6a25d2ca9bdb0cd34bf6i9gKCGcEpXnO.jpg', state: '0'},
            {url: 'http://a.hiphotos.baidu.com/image/pic/item/9a504fc2d5628535bdaac29e9aef76c6a6ef63c2.jpg', state: '1'},
            {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574835883021&di=fa0a4c82774ebc27c8419b043679e7f0&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F543cec0b4e765.jpg', state: '0'},
            {url: 'http://f.hiphotos.baidu.com/image/pic/item/0e2442a7d933c8956c0e8eeadb1373f08202002a.jpg', state: '1'},
            {url: 'https://ac-r.static.booking.cn/images/hotel/max1024x768/890/89083962.jpg', state: '1'}
        ],
        activeNames: ['1'],
        activeNames1: ['1'],
        activeNames2: ['1'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
        ],
        srcList1: [
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        centerDialogVisible: false,
    }
  },
  methods: {
    init () {
      let self = this
      let avg = (document.body.clientWidth) / 1440
      // 查询信息
    },
      handlerByName () {
          this.centerDialogVisible = true
      },
      closrDialog (val) {
          this.centerDialogVisible = val
      },
      disPicDetail () {
        this.centerDialogVisible = true
      },
   changePassword (row) {
      this.$router.push({
        name: 'changeUserPassword',
        params: {
          username: row.username
        }
      })
    }
  },
  created () {
    this.init()
  },
  computed: {
    nameSize () {
      return this.$contants.pageSet.nameSize
    },
    accountSize () {
      return this.$contants.pageSet.accountSize
    }
  }
}
</script>
