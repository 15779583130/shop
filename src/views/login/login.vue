<style lang="less" scoped>
  @import 'login';
</style>

<template>
  <div class="wrapper">
    <div class="logo"></div>
    <div class="content">
      <div class="login-box">
        <div class="face"></div>
        <div class="login-logo">
          <div class="l-logo">
            <img :src=imgUrlLogin style=" width: 60px; height: 60px;"/>
          </div>
          <span>账号登录</span>
        </div>
        <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="ruleInline"
                 @keydown.enter.native="handleSubmit('loginForm')">
          <div class="line">
            <i class="icon user"></i>
            <input v-model="loginForm.username" name="" type="text" placeholder="请输入账号" />
          </div>
          <div class="line">
            <i class="icon lock"></i>
            <input type="password" v-model="loginForm.password" placeholder="请输入密码" onpaste="return false"
                   oncontextmenu="return false" oncopy="return false" oncut="return false"/>
          </div>
<!--          <div class="line">-->
<!--            <i class="icon key"></i>-->
<!--            <input name="" type="text" placeholder="请输入验证码" style="width: 135px" />-->
<!--            <span class="yzm"><img src="../../images/login/yzm.jpg"></span>-->
<!--          </div>-->
          <div class="line">
            <button type="button" class="login-btn" @click="handleSubmit('loginForm')">登录</button>
          </div>
<!--          <div class="line">-->
<!--            <el-checkbox v-model="checked">记住密码</el-checkbox>-->
<!--          </div>-->
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
    import {downLoadFile} from '@/utils/downLoadFile'
    import http from '../../framework/http'
    import Cookies from 'js-cookie'
    import envelope from '../../framework/Envelope'
    export default {
        data() {
            return {
              imgUrlLogin: window.g.imgUrlLogin,
                passWordNew: '',
                loginForm: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur', max: 20, type: 'string'},
                        {max: 20, message: '最大长度20'}
                    ],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                        {max: 20, message: '最大长度20'}
                    ]
                },
                checked: true
            }
        },
        methods: {
            open(browserName){
                this.$alert(browserName, '浏览器提示', {
                    confirmButtonText: '下载',
                    callback: action => {
                        downLoadFile(window.g.ApiUrlLoad + '/fileService/xzzq/soft.zip')
                    }
                });
            },
            handleSubmit(name) {
              let self = this
              sessionStorage.removeItem('paswordLock')
              sessionStorage.setItem('paswordLock', self.loginForm.password)
                self.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                         let envelopeNew = new envelope()
                         self.passWordNew = envelopeNew.SimpleEncrypt(self.loginForm.password)
                         let params = {
                             loginname: self.loginForm.username,
                             password: self.passWordNew
                         }
                         self.$api.login.loginFun(params).then((res) => {
                            //  let envelopObj = envelopeUtil.doResponse(res.data);
                             if (res.message === '登录成功') {
                                 self.$message({
                                     message: res.message,
                                     type: 'success'
                                 })
                               sessionStorage.removeItem('fileSize')
                               sessionStorage.removeItem('session_id')
                               sessionStorage.removeItem('user_name')
                               sessionStorage.removeItem('role_type')
                               sessionStorage.removeItem('sessionInfo')
                               sessionStorage.setItem('fileSize', 100)
                               sessionStorage.setItem('session_id', res.content.body.default.session_id)
                               sessionStorage.setItem('user_name', res.content.body.sessioninfo.user_name)
                               sessionStorage.setItem('role_type', res.content.body.default.role_type)
                               sessionStorage.setItem('sessionInfo', JSON.stringify(res.content.body.sessioninfo))
                                 http.setSession(res.content.body.sessioninfo)
                                 self.$router.push({
                                   name: 'home_index'
                                 })
                                 let menuListSync = []
                                 if(res.content.body.default.menulist.length >= 1) {
                                     res.content.body.default.menulist.forEach(function (e, i) {
                                         menuListSync.push(e.url)
                                     })
                                   self.$store.commit('updateMenuList', menuListSync)
                                 }
                             } else {
                                 self.$message.error(res.message)
                             }
                         })
                    }
                })
            },
            getPermission() {
                let self = this
                this.$axios.get(this.$contants.restful.userPermission).then(function (response) {
                    self.$store.commit('updateMenuList', response.data)
                })
                    .catch(function (error) {
                        console.log(error)
                    })
                this.$axios.get('/dictionaries').then(function (response) {
                    Cookies.set('channelDictions', response.data.channel)
                    self.$store.commit('setDictionaries', response.data.channel)
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        },
        mounted () {

            // if (mb === 'Opera') {
            //     this.open('您当前使用的浏览器是Opera，推荐使用谷歌浏览器,点击下载！')
            // }
            // if (mb === 'Safari') {
            //     this.open('您当前使用的浏览器是Safari，推荐使用谷歌浏览器,点击下载！')
            // }
        },
        created() {
            }
    }
</script>

<style>

</style>
