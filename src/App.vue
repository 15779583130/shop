
<template>
  <keep-alive>
    <!--<router-view/>-->
  <router-view v-if="isRouterAlive"></router-view>
  </keep-alive>
  <!--<keep-alive>-->
    <!--<router-view></router-view>-->
  <!--</keep-alive>-->

</template>

<script>
    import {downLoadFile} from '@/utils/downLoadFile'
  // import {appRouter} from './router/router'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../src/styles/deep-ele.less';
</style>
