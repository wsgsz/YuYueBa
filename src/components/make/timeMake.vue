<template>
  <div class="timeMake">

    <div class="w1200px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>商家详情</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div class="yu-res-cont" v-if="active == 1">
      <div class="yu-res-nav">
        <dl class="res-nav-list">
          <dt class="res-l"></dt>
          <dd :class="{ on:activeindex == index}" v-for="(item,index) in timeDate" :key="index" @click="activetime(index)">
            <p>{{item.weekName}}</p>
            <p>{{item.timeDate}}</p>
          </dd>
          <dt class="res-r"></dt>
        </dl>
        <div class="img_right"></div>
      </div>
    </div>
    <div class="yu-res-cont" v-if="active == 1" style="border-top:0px;">
      <ul class="content_ul">
        <li :class="{ no:item.timeType == 5,
          has1:item.timeType == 2,
          has2:item.timeType == 3,
          has3:item.timeType == 4,
          can:item.timeType ==1}" v-for="(item,index) in nowtime" @click="timelink(index,item.timeType,item.timeId)">
          <div class="content_ul_top">
            <span> {{item.timeNumber}} {{item.timeStart}}</span>
            <span v-if="item.timeType == 1">可被预约</span>
            <span v-if="item.timeType == 2">已被预约</span>
            <span v-if="item.timeType == 3">已被预约</span>
            <span v-if="item.timeType == 4">已被预约</span>
            <span v-if="item.timeType == 5">不可预约</span>
          </div>
          <img src="../../assets/img/new/img01.png" v-if="item.timeType == 1" alt="">
          <img src="../../assets/img/new/img02.png" v-if="item.timeType == 2" alt="">
          <img src="../../assets/img/new/img02.png" v-if="item.timeType == 3" alt="">
          <img src="../../assets/img/new/img02.png" v-if="item.timeType == 4" alt=""> <img src="../../assets/img/new/img03.png" v-if="item.timeType == 5" alt="">
          <div class="content_ul_top_span" v-if="item.timeType == 1">立即预约</div>
        </li>
      </ul>
    </div>
    <!-- 步骤2 -->
    <div class="w1200px" v-if="active == 2">
      <div class="yu-res-cont yu-res-cont2">
        <img :src="imgUrl+cart.appointmentImgUrl" alt="">
        <div class="yu-res-cont2_div">
          <span class="title">{{cart.appointmentTitle}}</span>
          <span class="span">预约编号：{{activefourtime.timeNumber}}</span>
          <span class="span">订单编号：{{activefourtime.timeOrderNumber}}</span>
          <span class="span">服务时间：{{activefourtime.timeStart}}</span>
          <span class="span">服务地点：{{city}}</span>
        </div>
      </div>
      <h2 style="margin-bottom:30px;margin-left:4px;">备注</h2>
      <textarea name="" :readonly="readonly" v-model="orderNote" id="" rows="10" placeholder="请填写备注信息。。。" class="text_area"></textarea>
      <div class="btn_div" v-if="!readonly">
        <button @click="immediately()">立即预约</button>
        <button>上一步</button>
      </div>
    </div>
    <div class="w1200px there_w1200px" v-if="active == 3">
      <div class="there_yop">
        <img src="../../assets/img/new/complete.png" alt=""> 恭喜你，已经成功预约服务！
      </div>
      <div class="there_title">
        温馨提示：预约成功后，请准时按照预约的时间，到达预约的地点，进行服务，如有特殊情况不能到达的，请提前联系商家，取消预约或更改时间进行服务！
      </div>
      <div class=" there_btn_div">
        <button @click="check()">查看预约</button>
        <router-link to="/index">
          <button>返回首页</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  name: 'timeMake',
  data() {
    return {
      imgUrl,
      active: 1,
      readonly: false,
      activeindex: 0,
      timeDate: '',
      nowtime: '',
      activefourtime: "",
      cart: "",
      orderNote: "",
      timeId: '',
      pid: ""
    }
  },
  computed: {
    // ...mapState({
    //   city: state => state.city,
    // })
  },
  methods: {
    activetime(obj) {
      this.activeindex = obj
      this.nowtime = this.timeDate[obj].times
    },
    timelink(ind, type, timeId) {
      if (type == 1) {
        this.activefourtime = this.nowtime[ind]
        this.timeId = timeId,
          this.active = 2
      }
    },
    // 立即预约
    immediately() {
      const _this = this
      const obj = {
        timeId: this.timeId,
        publishId: this.$route.params.pid,
        userId: localStorage.getItem("user_id"),
        appointmentId: this.$route.params.id,
        orderNote: this.orderNote,
        orderNumber: this.activefourtime.timeOrderNumber
      }
      this.$http.post(baseUrl + "order/makeAnAppointment", qs.stringify(obj)).then(function(res) {
        if (res.data.status == "200") {
          _this.active = 3
        }
      })
    },
    //查看预约
    check() {
      this.active = 2,
        this.readonly = true
    }
  },
  created() {
    const _this = this
    _this.pid = this.$route.params.pid
    _this.$http.get(baseUrl + "time/queryAllTimeAfterNow?appointmentId="+_this.$route.params.id).then(function(res) {
      _this.timeDate = res.data.data;
      console.log(res.data)
      _this.nowtime = _this.timeDate[0].times
    })
    // 预约商品详情
    _this.$http.get(baseUrl + "appointment/getAppointmentDetail?appointmentId="+_this.$route.params.id).then(function(res) { 
      _this.cart = res.data.data
    })
  }
}

</script>
<style scoped>
@import "../../assets/css/main.css";

</style>
