<template>
  <div id="orders">
    <tab :line-width=2 active-color='#191919' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item"
                :key="index">{{item}}
      </tab-item>
    </tab>
    <swiper v-model="index" height="100%" :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <div class="tab-swiper vux-center options">
          <scroller lock-x height="-10" @on-scroll-bottom="selPullUp" ref="scroller" @on-pullup-loading="selPullUp"
                    :scroll-bottom-offst="200">
            <div class="box2">
              <p v-for="i in bottomCount">placeholder {{i}}</p>
              <load-more tip="loading"></load-more>
            </div>
          </scroller>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>


<script>
  import {
    Tab, TabItem, Swiper, SwiperItem, Scroller, Divider, Spinner, LoadMore, Loading,
    Alert, Toast
  } from 'vux'
  const list = () => ['全部订单', '未发货', '已发货']
  export default {
    components: {
      Tab,
      TabItem,
      Scroller,
      Divider,
      Spinner,
      LoadMore,
      Swiper,
      SwiperItem,
      Loading,
      Alert,
      Toast
    },
    data () {
      return {
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        list2: list(),
        demo2: '美食',
        index: 0,
        scrollerStatus: {
          pullupStatus: 'default'
        },
        PageIndex: 0
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    activated () {
      this.$refs.scroller.reset()
    },
    methods: {
      selPullUp () {
        console.log('上拉刷新数据')
        this.PageIndex++
        this.onScrollBottom()
      },
      onScrollBottom () {
        if (this.onFetching) {
          this.scrollerStatus.pullupStatus = 'default'
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.bottomCount += 10
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      }
    }
  }
</script>

<style lang='less'>
  .vux-slider {
    height: 500px;
  }

  .options {

  .option {
    background: #fff;
    padding: 2% 4%;
    margin-top: 1%;

  .row {
    font-size: 13px;
  }

  .col-40 {
    text-align: right;
  }

  img {
    height: 4.85rem;
    width: 4.85rem;
  }

  .weui-cell {
    padding: 10px 2%;
    margin: 2% auto;
  }

  .weui-cell:before {
    left: 0;
    color: #ccc;
  }

  .weui-cell:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .option-footer {
    text-align: right;
    font-size: 16px;

  .price {
    color: #df261d;
  }

  }
  .vux-label {
    font-size: 13px;
    padding: 0 4%;
    height: 4.85rem;
  }

  }
  }
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }

  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }

  .box1-item:first-child {
    margin-left: 0;
  }

  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>
