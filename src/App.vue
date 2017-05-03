<template>
  <div id="app" style="height: 100%">
    <!--header slot-->
    <div class="vux-demo-header-box" slot="header">
      <x-header :left-options="leftOptions" :title="title"></x-header>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  export default {
    name: 'app',
    components: {
      XHeader
    },
    computed: {
      route(){
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
        if (this.route.path === '/all') return '作家'
        const parts = this.route.path.split('/');
        if (/news/.test(this.route.path) && parts[2])  return '资讯'
      }
    }
  }
</script>
<style lang="less">
  @import './styles/index.less';
  @import './styles/weui/base/reset.less';
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .weui_header_bd {
    padding-top: 46px;
  }

  .weui_tab_bd {
    padding-top: 44px;
  }
</style>
