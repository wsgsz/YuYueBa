<template>
  <div class="timeMake">
    <div class="w1200px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="/detail/+this.pid">商家详情</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-steps :active="active" finish-status="success" v-if="!kong||!readonly">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div class="yu-res-cont" v-if="active == 1" style="border-top:0px;">
      <swiper :options="swiperOption" class="swipers_tmake">
        <swiper-slide v-for="(slide,index) in timeDate" :key="index" :class="{on:timeDateindex==index}">
          <span @click="activetime(index)">  {{slide.timeDate}}</span>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
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
      <div v-if="kong" style="width:100%;margin:auto;text-align:center;font-size:18px;margin-top:140px;margin-bottom:160px;">
        <!-- <img src="../../assets/img/new/" alt=""> -->
        暂时还没有时间预约</div>
      <div>
      </div>
    </div>
    <!-- 步骤2 -->
    <div class="w1200px" v-if="active == 2">
      <div class="yu-res-cont yu-res-cont2">
        <img v-lazy="imgUrl+cart.appointmentImgUrl" alt="">
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
import { mapState, mapMutations } from 'vuex'
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
      timeDateindex: 0,
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
      pid: "",
      kong: false,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        history: true,
        slidesPerView: 8,
        slidesPerGroup: 1,
      },
    }
  },
  methods: {
    activetime(obj) {
      this.timeDateindex = obj
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
        publishId: this.$route.params.timeid,
        userId: localStorage.getItem("user_id"),
        appointmentId: this.$route.params.timeid,
        orderNote: this.orderNote,
        orderNumber: this.activefourtime.timeOrderNumber
      }
      this.$http.post(baseUrl + "order/makeAnAppointment", qs.stringify(obj)).then(function(res) {
        // console.log(res)
        // console.log(obj)
        if (res.data.status == "200") {
          _this.active = 3
        }
      })
    },
    // acttime(index){
    //   this.timeDateindex = index;

    // }
    //查看预约
    check() {
      this.active = 2,
        this.readonly = true
    }
  },
  created() {
    const _this = this
    this.city = this.$route.query.city;
    _this.pid = this.$route.params.timeid
    _this.$http.get(baseUrl + "time/queryAllTimeAfterNow?appointmentId="+_this.pid).then(function(res) {
      console.log(res.data)
      _this.timeDate = res.data.data;
      if (res.data.status == "200") {
        if (res.data.data.length == 0) {
          _this.kong = true
        } else {
          _this.kong = false
          _this.nowtime = _this.timeDate[0].times
        }
      } else {

      }

    })
    // 预约商品详情
    _this.$fetch(baseUrl + "appointment/getAppointmentDetail", { "appointmentId": _this.pid, "userId": localStorage.getItem('user_id') }).then(function(res) {
      console.log(res.data)
      _this.cart = res.data
    })
    // _this.$fetch(baseUrl + "publish/getPublishDetail", { "publishId": this.$route.query.pid, "userId": localStorage.getItem('user_id') }).then(function(res) {
    //   console.log(res)
    //   _this.publish_ = res.data
    // })

  }
}

</script>
<style scoped>
@import "../../assets/css/main.css";
.ul_div {
  zoom: 1;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  cursor: pointer;
}

.ul_time {
  overflow-x: scroll;
}

.ul_time li {
  padding: 0px 10px;
  overflow-x: scroll;
  float: left;
  width: 100px;
}

.swiper-container {
  margin-bottom: 30px;
}

.swiper-slide {
  text-align: center;
}

.swipers_tmake {
  line-height: 40px;
  height: 40px;
  font-size: 22px;
  cursor: pointer;
}

.on {
  color: #00b05d
}
.swiper-button-next,.swiper-button-prev{
  background-size: 18px;
}

</style>
