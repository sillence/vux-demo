<template>
  <div id="app" style="height: 100%">
    <view-box ref="viewbox">
      <!--header slot-->
      <div class="vux-demo-header-box" slot="header">
        <x-header :left-options="leftOptions" :title="title"></x-header>
      </div>
      <router-view></router-view>
    </view-box>
  </div>
</template>
<script>
  import {ViewBox, XHeader} from 'vux'
  export default {
    name: 'app',
    components: {
      ViewBox,
      XHeader
    },
    computed: {
      route(){
        //this.$store.state.route要用到vuex
        return this.$store.state.route
      },
      leftOptions () {
        return {
          showBack: this.route.path !== '/main'
        }
      },
      title() {
        if (this.route.path === '/main') return '首页'
        if (this.route.path === '/author') return '作家'
      }
    }
  }
</script>
<style lang="less">
  @import 'styles/index.less';

  body {
    background-color: #fbf9fe;
  }
</style>
