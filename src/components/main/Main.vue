<template>
  <div class="weui_header_bd">
    <div class="tab-wrapper" style="position: fixed;top: 46px;z-index: 1200;width: 100%">
      <tab>
        <tab-item :selected="path=='/main'" @on-item-click="onItemClick('main')">精选</tab-item>
        <tab-item :selected="path=='/author'" @on-item-click="onItemClick('author')">作者</tab-item>
        <tab-item :selected="path=='/all'" @on-item-click="onItemClick('all')">全部</tab-item>
      </tab>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  import NewsList from '../TabContent/newsList'
  import All from '../TabContent/allList'
  export default {
    components: {
      Tab,
      TabItem,
      NewsList,
      All
    },
    data () {
      return {}
    },
    methods: {
      onItemClick (index) {
        this.$router.push({path: index})
      },
      addTab () {
        if (this.list2.length < 5) {
          this.list2 = list().slice(0, this.list2.length + 1)
        }
      },
      removeTab () {
        if (this.list2.length > 1) {
          this.list2 = list().slice(0, this.list2.length - 1)
        }
      },
      next () {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev () {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    },
    computed: {
      route(){
        //this.$store.state.route要用到vuex
        return this.$store.state.route
      },
      path() {
        return this.route.path;
      }
    }

  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';


</style>
