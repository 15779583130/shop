<style lang="less">
  @import "./main.less";
  @import '../styles/iconfont/iconfont.css';
  .main-con {
    /deep/ .el-dialog__body {
      padding-top: 10px;
    }
  }
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div slot="top" class="logo-con" style="height: 60px; width: 100%; background: #2470b2; line-height: 50px; color: white; font-size: 22px; text-align: left; text-indent: 0.5em">
      <img :src=imgUrlHome>
      <span style="position: relative; top: -15px">厦门市跨部门涉案财物智能化管理平台</span>
      <div class="menu_topList">
<!--        <i class="el-icon-warning-outline margin-left-10"></i>-->
<!--        <i class="el-icon-picture-outline margin-left-10"></i>-->
<!--        <i class="el-icon-setting margin-left-10"></i>-->
<!--        <div style="height: 30px; width: 30px; background: #9f9f9f"></div>-->
        <div style=" float: left;  z-index: 99999;position: relative; left: 20px; top:8px">
          <img src="../images/home_people.png" style="width: 30px; height: 30px">
        </div>
        <el-dropdown trigger="click" style="position:relative; top: -3px">
      <span class="el-dropdown-link" style="color: #fff">{{user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown" style="width: 120px; margin-top: -5px">
            <el-dropdown-item><full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen></el-dropdown-item>
            <el-dropdown-item><lock-screen></lock-screen></el-dropdown-item>
            <el-dropdown-item ><span @click="changePwd">修改密码</span></el-dropdown-item>
            <el-dropdown-item ><span @click="openComfir">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
<!--        <ul>-->
<!--          <li><full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen></li>-->
<!--          <li><lock-screen></lock-screen></li>-->
<!--          <li><i class="iconfont icon-tuichu" style="font-size: 20px; position: relative; left: 9px" @click="openComfir"></i></li>-->
<!--        </ul>-->
<!--        <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->

<!--        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown" style="position: relative; left: -10px;">-->
<!--          <a href="javascript:void(0)">-->
<!--            <span class="main-user-name">{{ userName }}</span>-->
<!--            <i class="el-icon-setting margin-left-10" style="color: #fff"></i>-->
<!--          </a>-->
<!--          <DropdownMenu slot="list" style="height: 110px; overflow: hidden">-->
<!--            &lt;!&ndash;<DropdownItem name="ownSpace">个人中心</DropdownItem>&ndash;&gt;-->
<!--            <DropdownItem name="" ><i class="el-icon-close" style="font-size: 25px; position: relative; left: -4px"></i><span style="position: relative; left: -5px; top: -5px" @click="loginout">退出登录</span></DropdownItem>-->
<!--            <DropdownItem name=""><full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen><span style="position: relative; top: -18px; left: 20px">全屏</span></DropdownItem>-->
<!--            <DropdownItem name="" style="position: relative; top: -15px"><lock-screen v-model="isLockChange"></lock-screen><span style="position: relative; top: -16px; left: 20px">锁屏</span></DropdownItem>-->
<!--          </DropdownMenu>-->
<!--        </Dropdown>-->
      </div>
    </div>
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflowX:'hidden',overflowY: shrink ? 'visible' : 'auto'}">
      <div @click="toggleClick" style="z-index: 99999999; display: block; background: #f1b000; height: 32px; width: 12px; position: relative; top: 45%" :style="{'left': widthBl}"><i :class="this.menuleft_arrow" style="color: #fff; position: relative; top: 8px"></i></div>
      <!--<scroll-bar ref="scrollBar" style="background: #2e3442;">-->
        <shrinkable-menu
          style="margin-top: -25px"
          :shrink="shrink"
          @on-change="handleSubmenuChange"
          :theme="menuTheme"
          :before-push="beforePush"
          :open-names="openedSubmenuArr"
          :menu-list="menuList"
        >
        </shrinkable-menu>
<!--      <el-scrollbar wrap-class="scrollbar-wrapper">-->
<!--        <el-menu-->
<!--          :default-active="activeMenu"-->
<!--          :collapse="isCollapse"-->
<!--          :background-color="variables.menuBg"-->
<!--          :text-color="variables.menuText"-->
<!--          :unique-opened="false"-->
<!--          :active-text-color="variables.menuActiveText"-->
<!--          :collapse-transition="false"-->
<!--          mode="vertical"-->
<!--        >-->
<!--          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />-->
<!--        </el-menu>-->
<!--      </el-scrollbar>-->
<!--      <span style="position:fixed;bottom:30px;left: 20px;color:rgba(255,255,255,.4)">{{bottomLeftTag}}</span>-->
      <!--</scroll-bar>-->
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
<!--      <div class="main-header">-->
<!--        <div class="navicon-con">-->
<!--          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">-->
<!--            <Icon type="navicon" size="32"></Icon>-->
<!--          </Button>-->
<!--        </div>-->
<!--        <div class="header-middle-con">-->
<!--          <div class="main-breadcrumb">-->
<!--            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="header-avator-con">-->
<!--          <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->
<!--          <lock-screen></lock-screen>-->
          <!--<message-tip v-model="mesCount"></message-tip>-->
          <!--<theme-switch></theme-switch>-->
<!--          <div class="user-dropdown-menu-con">-->
<!--            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">-->
<!--              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">-->
<!--                <a href="javascript:void(0)">-->
<!--                  <span class="main-user-name">{{ userName }}</span>-->
<!--                  <Icon type="arrow-down-b"></Icon>-->
<!--                </a>-->
<!--                <DropdownMenu slot="list">-->
<!--                  &lt;!&ndash;<DropdownItem name="ownSpace">个人中心</DropdownItem>&ndash;&gt;-->
<!--                  <DropdownItem name="loginout">退出登录</DropdownItem>-->
<!--                </DropdownMenu>-->
<!--              </Dropdown>-->
<!--              <Avatar :src="avatorPath" style="margin-left: 10px;"/>-->
<!--            </Row>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="tags-con" style="position: relative; top: 0px; border-bottom: 1px solid #ccc9c9">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <!--<keep-alive>-->
          <!--<router-view></router-view>-->
        <!--</keep-alive>-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
        </keep-alive>
        <!--<keep-alive>-->
          <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
        <!--</keep-alive>-->
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="dataForm" :rules="dataFormRules" label-width="80px" ref="dataForm" size="mini" label-position="right">
        <el-row :gutter="50">
          <el-col :span="24" >
            <el-form-item label="登录账号" prop="login_name">
              <el-input v-model="dataForm.login_name" size="mini" readonly="readonly" clearable ></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldpwd">
              <el-input type="password" v-model="dataForm.oldpwd" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="dataForm.password" size="mini" clearable ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
    <el-button type="primary" @click="submit" size="mini">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue'
import tagsPageOpened from './main-components/tags-page-opened.vue'
import breadcrumbNav from './main-components/breadcrumb-nav.vue'
import fullScreen from './main-components/fullscreen.vue'
import lockScreen from './main-components/lockscreen/lockscreen.vue'
import messageTip from './main-components/message-tip.vue'
import themeSwitch from './main-components/theme-switch/theme-switch.vue'
import Cookies from 'js-cookie'
import util from '../libs/util.js'
import scrollBar from '../views/my-components/scroll-bar/vue-scroller-bars'
import envelope from '../framework/Envelope'
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    themeSwitch,
    scrollBar
  },
  data () {
    return {
      imgUrlHome: window.g.imgUrlHome,
      dialogVisible: false,
      user_name: '',
      menuleft_arrow: 'el-icon-caret-left',
      widthBl: '95%',
      avatorPath: 'static/default-avatar.svg',
      shrink: false,
      userName: '',
      isFullScreen: false,
      isLock: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      dataForm: {
        login_name: JSON.parse(sessionStorage.getItem('sessionInfo')).login_name,
        oldpwd: '',
        password: ''
      },
      dataFormRules: {
        login_name: [
          {required: true, message: '这是必填字段', trigger: 'blur'}
        ],
        oldpwd: [
          {required: true, message: '这是必填字段', trigger: 'blur'},
          {min: 0, max: 200, message: '长度不得超过200字符'}
        ],
        password: [
          {required: true, message: '这是必填字段', trigger: 'blur'}
        ],
      },
      // openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    }
  },
  computed: {
    // bottomLeftTag () {
    //   if (this.shrink) {
    //     return ''
    //   } else {
    //     return '涉案财物智能化管理平台'
    //   }
    // },
    menuList () {
      if (this.$store.state.app.menuList.length === 0) {
        this.$store.commit('revertMenuList')
      }
      if (this.$store.state.app.accessList.length === 0) {
        this.$store.commit('revertAccessList')
      }
      return this.$store.state.app.menuList
    },
    pageTagsList () {
      let lengthOpenList = this.$store.state.app.pageOpenedList.length
      if (this.$store.state.app.pageOpenedList[lengthOpenList - 1].argu.method === 'editBmWuZhengCang') {
        this.$store.state.app.pageOpenedList[lengthOpenList - 1].title = '编辑仓库信息'
      }
      if (this.$store.state.app.pageOpenedList[lengthOpenList - 1].argu.method === 'addBmWuZhengCang') {
        this.$store.state.app.pageOpenedList[lengthOpenList - 1].title = '新增仓库信息'
      }
        return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    currentPath () {
      return this.$store.state.app.currentPath // 当前面包屑数组
    },
    // avatorPath () {
    //   return sessionStorage.avatorImgPath
    // },
    cachePage () {
      return this.$store.state.app.cachePage
    },
    lang () {
      return this.$store.state.app.lang
    },
    menuTheme () {
      return this.$store.state.app.menuTheme
    },
    mesCount () {
      return this.$store.state.app.messageCount
    }
  },
  methods: {
    init () {
      let pathArr = util.setCurrentPath(this, this.$route.name)
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.userName = Cookies.get('user')
      let messageCount = 3
      this.messageCount = messageCount.toString()
      this.checkTag(this.$route.name)
      this.$store.commit('setMessageCount', 3)
    },
      openComfir() {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
             this.loginout()
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消退出'
              });
          });
      },
    changePwd(){
      //重置表单数据
      if (this.$refs['dataForm'] !== undefined) {
        this.$refs['dataForm'].resetFields();
      }
      this.dataForm.oldpwd = '';
      this.dataForm.password = '';
      this.dialogVisible = true
    },
    loginout () {
        let self = this
        const loading = this.$loading({
            lock: true,
            text: '正在退出登录...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)'
        });
        let t1 = setInterval(function () {
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload()
          sessionStorage.removeItem('session_id')
          sessionStorage.removeItem('user_name')
          sessionStorage.removeItem('role_type')
          sessionStorage.removeItem('sessionInfo')
          self.$store.commit('clearOpenedSubmenu')
            self.$store.commit('logout', this)
            self.$store.commit('updateMenuList', [])
            self.$store.commit('clearOpenedSubmenu', [])
            loading.close()
            window.clearTimeout(t1)
            self.$router.push({
                name: 'login'
            })
        },1000)
        sessionStorage.clear()   //清除所有session值
        window.location.reload()
    },
    toggleClick () {
      this.shrink = !this.shrink
      if (this.shrink === true) {
          this.widthBl = '80%'
          this.menuleft_arrow = 'el-icon-caret-right'
      }
      if (this.shrink === false) {
          this.widthBl = '95%'
          this.menuleft_arrow = 'el-icon-caret-left'
      }
    },
    handleClickUserDropdown (name) {
      if (name === 'ownSpace') {
      } else if (name === 'loginout') {
        // 退出登录
        this.$store.commit('logout', this)
        this.$store.commit('clearOpenedSubmenu')
        this.$router.push({
          name: 'login'
        })
      }
    },
    checkTag (name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true
        }
      })
      if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
      }
    },
    handleSubmenuChange (val) {
    },
    beforePush (name) {
      return true
    },
    fullscreenChange (isFullScreen) {
      this.isFullScreen = isFullScreen
    },
    isLockChange (isLock) {
        this.isLock = isLock
    },
    scrollBarResize () {
      if (this.$refs.scrollBar) {
        this.$refs.scrollBar.resize()
      }
    },
    submit(){
      let self = this
      self.$refs['dataForm'].validate((valid)=>{
        if(valid){
          let envelopeNew = new envelope()
          var params ={
            userid:JSON.parse(sessionStorage.getItem('sessionInfo')).user_id,
            password:envelopeNew.SimpleEncrypt(self.dataForm.oldpwd),
            npassword:envelopeNew.SimpleEncrypt(self.dataForm.password),
          }
          self.$api.common.changePwd(params).then((res) => {
            if (res.success == "true") {
              this.$message({message: res.message, type: 'success'})
              this.dialogVisible = false;
              this.$router.push({name: 'login'})
            } else {
              this.$message({message: res.message, type: 'error'})
            }
          })
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.commit('setCurrentPageName', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.checkTag(to.name)
      sessionStorage.currentPageName = to.name
    },
    lang () {
      util.setCurrentPath(this, this.$route.name) // 在切换语言时用于刷新面包屑
    },
    openedSubmenuArr () {
      setTimeout(() => {
        this.scrollBarResize()
      }, 300)
    }
  },
  activated () {
    this.user_name = sessionStorage.getItem('user_name')
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.scrollBarResize)
  },
  created () {
    // 显示打开的页面的列表
    this.user_name = sessionStorage.getItem('user_name')
    this.$store.commit('setOpenedList')
  },
  dispatch () {
    window.removeEventListener('resize', this.scrollBarResize)
  }
}
</script>
