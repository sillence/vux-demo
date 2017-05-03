<template>
  <div class="weui_tab_bd">
    <swiper :show-dots="false" loop auto :list="demo06_list" :index="demo06_index"
            @on-index-change="demo06_onIndexChange"></swiper>
    <!-- <p>current index: {{demo06_index}}</p>-->
    <scroller v-show="isShow" v-model="scrollerStatus" height="-270" lock-x scrollbar-y ref="scroller"
              :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="selPullUp">
      <div class="box2">
        <div class="weui-panel weui-panel_access">
          <div v-for="list, index in lists" class="weui-panel__bd">
            <router-link :to="{name: 'news', params: {id: list.id}}" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" :src="list.pic" alt="">
              </div>
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title">{{list.title}}</h4>
                <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </scroller>
    <!--加载中-->
    <loading v-model="showloading" :text="textloading"></loading>
    <!--加载失败-->
    <div v-show="isError">加载失败</div>
  </div>

</template>
<script type="text/ecmascript-6">
  import {Swiper, Scroller, Loading, Panel} from 'vux'
  const baseList =
    [{
      url: 'javascript:',
      img: 'http://og1rlwcj8.bkt.clouddn.com/20141111234454_AwKCm.thumb.700_0.jpeg',
      title: '如何手制一份秋意的茶？'
    }, {
      url: 'javascript:',
      img: 'http://og1rlwcj8.bkt.clouddn.com/u=897623406,24655471&fm=21&gp=0.jpg',
      title: '茶包VS原叶茶'
    }, {
      url: 'javascript:',
      img: 'http://og1rlwcj8.bkt.clouddn.com/u=3737719926,1965507257&fm=21&gp=0.jpg',
      title: '播下茶籽，明春可发芽？'
    }]
  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `(可点击)${item.title}`
  }))
  export default {
    components: {
      Swiper,
      Scroller, Loading, Panel
    },
    data () {
      return {
        type: '1',
        PageIndex: 1,//页码从第一页开始
        PageSize: 5,//煤业显示的条数
        isShow: false,//是否显示scroller,第一次加载数据时只显示请上拉刷新数据
        showloading: false,
        textloading: '加载中',
        isError:false,
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
        },
        demo06_index: 0,
        demo06_list: urlList,
        type: '1',
        list: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          }
        }]
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
      demo06_onIndexChange (index) {
        this.demo06_index = index
      },
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
              this.showloading = false
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
          this.showloading = false
          this.isShow = false
          isShow.isError=true
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
  @import '../../styles/weui/widget/weui_cell/weui_access.less';
  @import '../../styles/weui/widget/weui_panel/weui_panel.less';

  .copyright {
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }

  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }

  .text-scroll p {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }

  .black {
    background-color: #000;
  }

  .title {
    line-height: 100px;
    text-align: center;
    color: #fff;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .vux-indicator.custom-bottom {
    bottom: 30px;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
  }

  .swiper-demo-img img {
    width: 100%;
  }
</style>
