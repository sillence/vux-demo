<template>
  <div style="height: 100%">
    <!--<loading :show="isLoading" position="absolute" text="加载中"></loading>-->
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
  import {Tab, TabItem, Tabbar, TabbarItem, Loading, ViewBox, XHeader} from 'vux'
  const list = () => ['精选', '争鸣', '作者']
  export default {
    components: {
      Tab,
      TabItem,
      Loading,
      ViewBox,
      XHeader
    },
    data () {
      return {
        routerTransition: {
          forward: 'slideRL',
          back: 'slideLR'
        },
        list2: list(),
        index: 0
      }
    },
    computed: {
      route(){
        //this.$store.state.route要用到vuex
        return this.$store.state.route
      },
      leftOptions () {
        return {
          showBack: this.route.path !== '/'
        }
      },
      title() {
        if (this.route.path === '/') return '首页'
        if (this.route.path === '/news') return '咨询'
      }
    }
  }
</script>
<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: #fbf9fe;
  }

  /* v-r-transition, default is {forward: 'forward', back: 'back'}*/
  .forward-enter, .forward-leave {
    transform: translate3d(-100%, 0, 0);
  }

  .back-enter, .back-leave {
    transform: translate3d(100%, 0, 0);
  }

  .demo-icon-22 {
    font-family: 'vux-demo';
    font-size: 22px;
    color: #888;
  }

  .weui_tabbar.vux-demo-tabbar {
    backdrop-filter: blur(10px);
    background-color: none;
    background: rgba(247, 247, 250, 0.5);
  }

  .vux-demo-tabbar .weui_bar_item_on .demo-icon-22 {
    color: #F70968;
  }

  .vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
    color: #35495e;
  }

  .vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
  }

  .demo-icon-22:before {
    content: attr(icon);
  }

  .vux-demo-tabbar-component {
    background-color: #F70968;
    color: #fff;
    border-radius: 7px;
    padding: 0 4px;
    line-height: 14px;
  }

  .weui_tabbar_icon + .weui_tabbar_label {
    margin-top: 0 !important;
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  .weui_tab_bd {
    padding-top: 46px;
  }

  /**
  * vue-router transition
  */
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }

  .vux-pop-out-enter,
  .vux-pop-out-leave,
  .vux-pop-in-enter,
  .vux-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }

  .vux-pop-out-enter {
    animation-name: popInLeft;
  }

  .vux-pop-out-leave {
    animation-name: popOutRight;
  }

  .vux-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }

  .vux-pop-in-leave {
    animation-name: popOutLeft;
  }

  .vux-swiper {
    height: 100%;
  }

  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
