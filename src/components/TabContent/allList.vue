<template>
</template><!--
<template>
  <div>

    <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>

  </div>
</template>

<script>
  import { Swiper } from 'vux'
  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行'
  }]

  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ]
  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `(可点击)${item.title}`
  }))

  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }))

  const only2List = baseList.slice(0, 2)

  export default {
    components: {
      Swiper

    },

    methods: {

      demo06_onIndexChange (index) {
        this.demo06_index = index
      },

    },
    data () {
      return {
        demo06_list: urlList,
      }
    }
  }
</script>


-->
