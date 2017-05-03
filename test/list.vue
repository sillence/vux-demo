<template>
  <div style="height:100%;">

    <x-header slot="header"  :left-options="{showBack: false}"  >会议列表
      <a slot="right" v-on:click="show = true" > <icon type="search"></icon> </button>  </a>
    </x-header>

    <!-- 会议列表 -->
    <scroller v-model="scrollerStatus" height="-46"   lock-x scrollbar-y  ref="scroller" :bounce="isbounce" :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="selPullUp" >
      <div class="box2">
        <p  v-for="list, index in lists">
          <router-link :to="{ path: list.id } ">
        <p style="height:40px;">
          <span class="spanMeetTitle" v-html='(index+1) + " . " + list.name' ></span>
          <span class="spanMeetStatu" v-html='list.status'></span>
        </p>
        <p class="prevSuper">
          <form-preview  header-label=""  header-value="" :bodyItems="list" :footer-buttons="buttons1"></form-preview>
        </p>
        </router-link>
        <hr>
        </p>
      </div>
    </scroller>

    <!-- 导航 -->
    <Home></Home>

    <!-- 搜索 -->
    <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')"  height="93%">
      <div class="popup0">
        <group>
          <x-input v-model='meetName' placeholder="请输入“会议名称”搜索"></x-input>
          <div style="float:left;margin-top: -36px;"><icon type="search"></icon></div>
        </group>
        <!--
              <group>
                <checklist :max=1 title="会议审批状态"  required :options="commonList" v-model="checkStatus" @on-change="change"></checklist>
              </group> -->

        <group title="会议审批状态">
          <radio :options="commonList" v-model="checkStatus" @on-change="change"></radio>
        </group>

        <group title="会议类型">
          <selector placeholder="请选择会议类型" v-model="checkType" :options="meetType"></selector>
        </group>

        <group title="召开时间">
          <flexbox>
            <flexbox-item>
              <div class="flex-demo" style="background-color:white;color:black;height:45px">
                <datetime title='' placeholder="请选择" v-model="startTime" format="YYYY-MM-DD HH:mm"  @on-change="change" ></datetime>
              </div>
            </flexbox-item>
            至
            <flexbox-item>
              <div class="flex-demo" style="background-color:white;color:black;height:45px">
                <datetime title='' placeholder="请选择" v-model="stopTime" format="YYYY-MM-DD HH:mm"  @on-change="change" ></datetime>
              </div>
            </flexbox-item>
          </flexbox>
        </group>
        <br>
        <flexbox orient="vertical">
          <flexbox-item><div class="flex-demo" v-on:click="toSearch" >确定</div></flexbox-item>
          <flexbox-item><div class="flex-demo" v-on:click="show = false" style="background-color:white;color:black">取消</div></flexbox-item>
        </flexbox>

      </div>
    </popup>

    <toast v-model="showToast">已加载全部数据</toast>

    <loading v-model="isShowLoading" :text="textLoading"></loading>

    <alert v-model="isShowAlert" :title="AlertCongratulations" > {{ alertMessage }}</alert>
  </div>
</template>

<style type="text/css">
  .weui-form-preview__value{
    font-size: 1.1em !important;
    color: black;
  }
  .spanMeetTitle{
    float: left;
    border-radius: 13px;
    padding:10px 6px;
    font-size: 15px;
    font-weight: bold;
    margin-left: 3px;
    color: black;
  }
  .spanMeetStatu{
    float: right;
    background-color: green;
    border-radius: 10px;
    padding:6px 5px;
    color: white;
    font-size: 13px;
    margin-top: 5px;
  }
  .flex-demo{
    height: 30px;padding-top: 5px;
  }
  .selected{
    color: blue !important;
    background-color: transparent;
  }
  .popup0 {
    padding-bottom:15px;
    height:200px;
  }
  .popup1 {
    width:100%;
    height:100%;
  }
  .popup2 {
    padding-bottom:15px;
    height:400px;
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
    display:inline-block;
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

<script>
  import { XHeader, Group, FormPreview, Tabbar, TabbarItem, Scroller, Icon, Popup, XSwitch, Toast, XInput, Checklist, Datetime, Flexbox, FlexboxItem, Selector, Loading, Alert, Radio } from 'vux'
  import Home from './Home'

  export default {
    components: {
      XHeader,
      Home,
      Group,
      FormPreview,
      Tabbar,
      TabbarItem,
      Scroller,
      Icon,
      Popup,
      XSwitch,
      Toast,
      XInput,
      Checklist,
      Datetime,
      Flexbox,
      FlexboxItem,
      Selector,
      Loading,
      Alert,
      Radio
    },
    data () {
      return {
        type: '1',
        PageIndex: 0,
        show: false,
        showToast: false,
        showloading: false,
        showUp: true,
        isbounce: false,
        isShowAlert: false,
        AlertCongratulations: '条件有误',
        textloading: '加载中',
        alertMessage: '‘召开时间’ 不能大于 ‘结束时间’',
        value: '',
        meetName: '',
        startTime: '',
        stopTime: '',
        meetType: [],
        commonList: [{key: '20', value: '审批中'}, {key: '50', value: '审批通过'}, {key: '', value: '全部'}],
        checkStatus: '',
        checkType: '',
        commonList2: [],
        results: [],
        lists: [[]],
        buttons1: [{
          style: 'primary',
          text: '查看更多',
          link: '/Message'
        }],
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
      console.log(this.scrollerStatus.pullupStatus)
      this.getMeetList(true)
      this.getMeetType()
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      log (str) {
        console.log(str)
      },
      getMeetList (isEmpty) {
        var APPROVE_STATUS = this.checkStatus
        var MEETING_TYPE = this.checkType
        this.isShowLoading = true
        this.$http.post(global.httpsUrl + '/Meet/GetMeetList', {'HumanId': global.userid, 'KEY': this.meetName, 'APPROVE_STATUS': APPROVE_STATUS, 'MEETING_TYPE': MEETING_TYPE, 'START_DATE': this.startTime, 'STOP_DATE': this.stopTime, 'PageIndex': this.PageIndex, 'PageSize': '2'}).then(response => {
          // sucess callback
          console.log('111')
          var data = response.body.Data
          if (isEmpty) {
            this.lists = []
            this.show = false
          } else {
            if (data && data.length === 0) {
              this.showToast = true
              this.isShowLoading = false
              this.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
              return
            }
          }
          for (var i = 0; i < data.length; i++) {
            if (data[i].APPROVE_STATUS < 20) {
              break
            }
            var personName = data[i].PERSION1_NAME
            if (personName && personName.length > 0) {
              personName = personName.substring(0, personName.indexOf('&gt;'))
            }
            var meetlist = []
            var obj = {
              label: '地点',
              value: data[i].ADDRESS
            }
            meetlist.push(obj)
            obj = {
              label: '主持人',
              value: personName
            }
            meetlist.push(obj)
            obj = {
              label: '召开时间',
              value: global.formatDate.methods.toSet(data[i].ACT_START_TIME, 'yyyy-MM-dd HH:mm')
            }
            meetlist.push(obj)
            obj = {
              label: '会议类型',
              value: data[i].MEETING_TYPE_NAME
            }
            meetlist.push(obj)
            meetlist.id = 'FromMeet/' + data[i].MEETING_MINUTES_GUID + '/123'
            meetlist.name = data[i].MEETING_NAME
            var vstatus = '审批中'
            if (data[i].APPROVE_STATUS === 50) {
              vstatus = '审批通过'
            }
            meetlist.status = vstatus
            this.lists.push(meetlist)
          }
          this.isShowLoading = false
          if (!isEmpty) {
            this.scrollerStatus.pullupStatus = 'default'
            // this.$refs.scroller.reset()
            console.log(this.scrollerStatus.pullupStatus)
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            })
          }
        }, response => {
          // error callback
          this.show = false
        })
      },
      showSearch () {
        this.show = true
      },
      change (val) {
        console.log('change', val)
        console.log(this.startTime)
      },
      change2 (val) {
        console.log('change', val)
      },
      resultClick () {
      },
      getResult () {
      },
      toSearch () {
        console.log(2222)
        if (this.startTime && this.stopTime && this.startTime > this.stopTime) {
          this.isShowAlert = true
        } else {
          this.PageIndex = 0
          this.getMeetList(true)
        }
      },
      selPullUp () {
        console.log('上拉刷新数据')
        this.PageIndex++
        this.getMeetList(false)
      },
      getMeetType () {
        this.$http.post(global.httpsUrl + '/Meet/GetMeetType').then(response => {
          // sucess callback
          var data = response.body.Data
          for (var i = data.length - 1; i >= 0; i--) {
            var obj = {
              key: data[i].TYPE_GUID,
              value: data[i].TYPE_NAME
            }
            this.meetType.push(obj)
          }
        }, response => {
          // error callback
        })
      }
    },
    activated () {
      this.$refs.scroller.reset()
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    border-radius: 4px;
    background-clip: padding-box;
  }
</style>
