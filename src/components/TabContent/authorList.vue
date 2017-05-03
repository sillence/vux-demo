<template>
  <div>
    <scroller v-show="isShow" v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="selPullUp">
      <div class="box2">
        <div class="weui-panel weui-panel_access">
          <div class="weui-panel__hd">图文组合列表</div>
          <div v-for="list, index in lists" class="weui-panel__bd">
            <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" :src="list.pic" alt="">
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{list.title}}</h4>
                <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </scroller>
    <loading v-model="showloading" :text="textloading"></loading>

  </div>
</template>
<script>
  import {Scroller, Loading,Panel} from 'vux'
  export default {
    components: {Scroller, Loading,Panel},
    data () {
      return {
        type: '1',
        PageIndex: 1,//页码从第一页开始
        PageSize: 5,//煤业显示的条数
        isShow: false,//是否显示scroller,第一次加载数据时只显示请上拉刷新数据
        showloading: false,
        textloading: '加载中',
        showUp: true,
        isbounce: false,
        lists: [],
        upobj: {
          content: '请上拉刷新数据',
          pullUpHeight: 60,
          height: 40,
          autoRefresh: false,
          downContent: '请上拉刷新数据',
          upContent: '请上拉刷新数据',
          loadingContent: '加载中...',
          clsPrefix: 'xs-plugin-pullup-'
        },
        isShowLoading: false,
        textLoading: '加载中',
        scrollerStatus: {
          pullupStatus: 'default'
        }
      }
    },
    mounted () {
      //第一次加载
      this.getNewsList(true)
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      //第一次加载的时候容易为空true
      getNewsList (isEmpty) {
        this.showloading = true
        this.$http.get('http://ons.me/tools/dropload/json.php?page=' + this.PageIndex + '&size=' + this.PageSize).then(response => {
          // sucess callback
          var data = response.data;
          if (isEmpty) {
            this.lists = []
            this.show = false
          } else {
            //isEmpty为false时，也就是向上滚动刷新selPullUp ()方法被被调用的时候
            if (data && data.length === 0) {
              this.showToast = true
              this.isShowLoading = false
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
          }
          for (var i = 0; i < data.length; i++) {
            this.lists.push(data[i]);
          }
          this.isShow = true;
          this.showloading = false
          if (!isEmpty) {
            this.scrollerStatus.pullupStatus = 'default'
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          }
        }, response => {
          // error callback
          this.isShow = false
        })
      },
      selPullUp () {
        this.PageIndex++
        this.getNewsList(false)
      }
    },
    activated () {
      this.$refs.scroller.reset()
    }
  }
</script>
<style lang="less">
  @import '../../styles/weui/widget/weui_cell/weui_cell_global.less';
  @import '../../styles/weui/widget/weui_cell/weui_access.less';
  @import '../../styles/weui/widget/weui_panel/weui_panel.less';
</style>



