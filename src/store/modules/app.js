import {otherRouter, appRouter} from '../../router/router'
import Util from '../../libs/util'
import authMenu from '@/sync-core/authority/auth-menu.js'
import Cookies from 'js-cookie'
import Vue from 'vue'
const app = {
  state: {
    user_name: '',
    role_type: '', // 用户角色
    showUrl: false, // 是否显示跳转对账页面的对话框
    dictionaries: [],
    token: '',
    cachePage: [],
    lang: '',
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ], // 面包屑数组
    menuList: [],
    accessList: [],
    routers: [
      otherRouter,
      ...appRouter
    ],
    tagsList: [...otherRouter.children],
    messageCount: 0,
    dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  mutations: {
    getUserName (state, val) {
      state.user_name = val
    },
    setroleType (state, val) {
      state.role_type = val
    },
    setTagsList (state, list) {
      state.tagsList.push(...list)
    },
    setToken (state, token) {
      state.token = token
    },
    revertMenuList (state) {

      let menuList = sessionStorage.getItem('menuList')
      if (menuList) {
        state.menuList = JSON.parse(menuList)
      }
    },
    revertAccessList (state) {
      let accessList = sessionStorage.getItem('accessList')
      if (accessList) {
        state.accessList = JSON.parse(accessList)
      }
    },
    updateMenuList (state, accessList) {
      if (accessList !== undefined && accessList.length > 0) {
        let menuList = []
        authMenu.menuList.forEach(item => {
          if (item.access !== undefined) {
            if (accessList.indexOf(item.access) !== -1) {
              let len = menuList.push(item)
              let childrenArr = item.children.filter(child => {
                if (!child.access) {
                  return true
                }
                if (accessList.indexOf(child.access) !== -1) {
                  return true
                } else {
                  return false
                }
              })
              menuList[len - 1].children = childrenArr
            }
          } else {
            let len = menuList.push(item)
            let childrenArr = item.children.filter(child => {
              if (!child.access) {
                return true
              }
              if (accessList.indexOf(child.access) !== -1) {
                return true
              } else {
                return false
              }
            })
            menuList[len - 1].children = childrenArr
          }
        })
        state.menuList = menuList
        sessionStorage.removeItem('menuList')
        sessionStorage.setItem('menuList', JSON.stringify(menuList))
        state.accessList = accessList
        sessionStorage.removeItem('accessList')
        sessionStorage.setItem('accessList', JSON.stringify(accessList))
      } else {
        sessionStorage.removeItem('menuList')
        sessionStorage.removeItem('accessList')
      }
    },
    updateMenulist1 (state, accessList) {
      let accessCode = parseInt(Cookies.get('access'))
      let menuList = []
      authMenu.menuList.forEach((item, index) => {
        if (item.access !== undefined) {
          if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
              menuList.push(item)
            } else {
              let len = menuList.push(item)
              let childrenArr = []
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) {
                    return child
                  }
                } else {
                  return child
                }
              })
              menuList[len - 1].children = childrenArr
            }
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item)
          } else {
            let len = menuList.push(item)
            let childrenArr = []
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (Util.showThisRoute(child.access, accessCode)) {
                  return child
                }
              } else {
                return child
              }
            })
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1)
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
              handledItem.children = childrenArr
              menuList.splice(len - 1, 1, handledItem)
            }
          }
        }
      })
      state.menuList = menuList
    },
    changeMenuTheme (state, theme) {
      state.menuTheme = theme
    },
    changeMainTheme (state, mainTheme) {
      state.themeColor = mainTheme
    },
    addOpenSubmenu (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },
    closePage (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    initCachepage (state) {
      if (sessionStorage.cachePage) {
        state.cachePage = JSON.parse(sessionStorage.cachePage)
      }
    },
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    clearAllTags (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    setOpenedList (state) {
      state.pageOpenedList = sessionStorage.pageOpenedList ? JSON.parse(sessionStorage.pageOpenedList) : [otherRouter.children[0]]
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name
    },
    setAvator (state, path) {
      sessionStorage.avatorImgPath = path
    },
    switchLang (state, lang) {
      state.lang = lang
      Vue.config.lang = lang
    },
    clearOpenedSubmenu (state) {

      state.openedSubmenuArr.length = 0
    },
    setMessageCount (state, count) {
      state.messageCount = count
    },
    setDictionaries (state, dictionaries) {
      state.dictionaries = dictionaries
    },
    increateTag (state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name)
        sessionStorage.cachePage = JSON.stringify(state.cachePage)
      }
      state.pageOpenedList.push(tagObj)
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    logout (state) {
      Cookies.remove('user')
      Cookies.remove('password')
      Cookies.remove('access')
      // 恢复默认样式
      let themeLink = document.querySelector('link[name="theme"]')
      themeLink.setAttribute('href', '')
      // 清空打开的页面等数据，但是保存主题数据
      let theme = ''
      if (sessionStorage.theme) {
        theme = sessionStorage.theme
      }
      sessionStorage.clear()
      if (theme) {
        sessionStorage.theme = theme
      }
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
    },
    changeShowUrl (state, val) {
      state.showUrl = val
    }
  }
}

export default app
