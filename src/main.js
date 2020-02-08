import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import 'es6-promise/auto'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import router from './router/index'
import {appRouter} from './router/router'
import store from './store'
import i18n from './i18n'
import authBtn from '@/sync-core/authority/auth-btn.js'
import Util from './libs/util'
import {http} from './libs/axios'
import Cookies from 'js-cookie'
import moment from 'vue-moment'
import './icons'
import api from './http'
import JsEncrypt from 'jsencrypt'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Print from './plugin/print'

Vue.use(Print)
Vue.use(VueQuillEditor)
Vue.use(iView)
Vue.use(elementUI)
Vue.use(Vuex)
Vue.use(moment)
Vue.use(api)
/* 固定常量 */
Vue.prototype.$jsEncrypt = JsEncrypt
// Vue.prototype.$contants = constants
Vue.prototype.authBtn = authBtn
Vue.prototype.$axios = http
Vue.prototype.$util = Util
Vue.prototype.$cookies = Cookies

/* 全局注册权限检查指令 */
Vue.directive('access', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    if (el.id) {
      let id = el.id
      let access = authBtn.resourceAccessMap[id]
      let accessList = sessionStorage.getItem('accessList')
      if (accessList && accessList.indexOf(access) !== -1) {
        el.style.display = 'display'
        // el.remove()
      } else {
        if (access) {
          // el.style.display = 'none'
          el.remove()
        } else {
          el.style.display = 'display'
        }
      }
    }
  }
})

/* table 实现滚动懒加载 2019/01/02 董珊珊 */
Vue.directive('loadmore', {
  bind:function(el, binding) {
    var p = 0;
    var t = 0;
    var down = true;
    var selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      //判断是否向下滚动
      p = this.scrollTop;
      // if ( t < p){down=true}else{down=false}
      if(t < p){
        down = true;
      }else{
        down = false;
      }
      t = p;
      //判断是否到底
      const sign = 10;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign && down) {
        binding.value()
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  i18n,
  render: h => h(App),
  data: {
    currentPageName: ''

  },
  mounted () {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    // this.$store.commit('updateMenulist')
  },
  created () {
    let tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
