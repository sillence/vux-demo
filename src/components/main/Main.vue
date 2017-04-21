<template>
  <div class="main-content">
    <tab>
      <tab-item selected @on-item-click="onItemClick('main')">精选</tab-item>
      <tab-item @on-item-click="onItemClick('author')">作者</tab-item>
      <tab-item @on-item-click="onItemClick(3)">全部</tab-item>
    </tab>
    <router-view></router-view>
  </div>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  import NewsList from '../TabContent/newsList'
  export default {
    components: {
      Tab,
      TabItem,
      NewsList
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
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';


</style>
