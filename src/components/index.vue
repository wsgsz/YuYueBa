<template>
  <div class="hello">
    <header-t messagehide=false></header-t>
    <div class="bunner-wp clearfix">
      <div class="bunner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
            <img :src="slide" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="kuo">
          <div class="kuo-top kuo-top1" v-show="!userId">
            <img src="img/yue.png" class="kuo-img">
            <p>Hi!你好</p>
            <router-link to="register">注册</router-link>
            <router-link to="login">登录</router-link>
          </div>
          <div class="kuo-top kuo-top2" v-show="userId">
            <img v-lazy="imgUrl+user.userCompressimg" class="kuo-img">
            <p class="kuo2-p">{{user.userName}}</p>
            <p class="kuo2-tel">{{user.userPhonenum}}</p>
          </div>
          <div class="kuo-bot">
            <img src="../assets/img/new/erweima.png" alt="" class="ewm">
            <p class="p1">预约吧APP手机版</p>
            <p class="p2"><a href="###">提前约</a> 不再等</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 附近推荐 -->
    <div class="tit-bar clearfix">
      <h3>附近推荐</h3>
          <!--    <div class="tit-nav">
      <a></a>
   <a href="javascript:;" :class="{on:jinDataiscur=='all'}" @click="changeFun('all',2,'all')">全部</a>
        <a v-for="(item,index) in classify.slice(0,7)" :class="{on:jinDataiscur==index}" :key="index" @click="changeFun(item.classifyId,'2',index)">{{item.classifyName}}</a> 
      </div>-->
          <router-link tag="div" to="/goods/goodslist/all?claname=全部" class="more">
        查看更多》》
      </router-link>
    </div>
    <ul class="groom-list clearfix">
      <li v-for="item in jinData.slice(0,6)">
        <router-link class="timg" tag="a" :to="'/goods/goodsdetail/'+item.publishId"><img v-lazy="imgUrl+item.imageUrl" alt="" /></router-link>
        <div class="groom-act clearfix">
          <p class="lp">{{item.publishName}}</p>
        </div>
        <div class="groom-btn clearfix">
          <p class="tip">
            <img src="../assets/img/new/icon01.png" alt=""> <span>{{item.concernCount}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../assets/img/new/icon02.png" alt=""><span>{{item.score}}</span>
          </p>
           <router-link class="rbtn" tag="span" :to="{ path: '/goods/goodsdetail/'+item.publishId ,query: { dis:item.distance }}" >立即预约</router-link>
         
        </div>
      </li>
    </ul>
    <!-- 限时优惠 -->
    <div class="tit-bar clearfix">
      <h3>猜你喜欢</h3>
      <!--    <div class="tit-nav">
     <a></a>
        <a href="javascript:;" :class="{on:newDataiscur=='all'}" @click="changeFun('all',1,'all')">全部</a>
        <a v-for="(item,index) in classify.slice(0,7)" :class="{on:newDataiscur==index}" :key="index" @click="changeFun(item.classifyId,'1',index)">{{item.classifyName}}</a>
      </div> -->
      <router-link tag="div" to="/goods/goodslist/all?claname=全部" class="more">
        查看更多》》
      </router-link>
    </div>
    <ul class="groom-list clearfix">
      <li v-for="(item,index) in newData.slice(0,6)">
        <router-link class="timg" tag='a' :to="'/goods/goodsdetail/'+item.publishId"><img v-lazy="imgUrl+item.imageUrl" alt="" /></router-link>
        <div class="groom-act clearfix">
          <p class="lp">{{item.publishName}}</p>
        </div>
        <div class="groom-btn clearfix">
          <p class="tip">
            <img src="../assets/img/new/icon01.png" alt=""> <span>{{item.concernCount}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../assets/img/new/icon02.png" alt=""><span>{{item.score}}</span>
          </p>
         <router-link class="rbtn" tag="span" :to="{ path: '/goods/goodsdetail/'+item.publishId ,query: { dis:item.distance }}" >立即预约</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import { baseUrl, imgUrl } from '@/api/env'
import headerT from '@/components/org/header'
export default {
  data() {
    return {
      imgUrl,
      userId: "",
     user:"",
      citys: "",
      jinDataiscur: 'all',
      newDataiscur: 'all',
      likeDataiscur: 'all',
      // 分类
      classify: [],
      // 附近推荐 列表
      jinData: [],
      // 最新
      newData: [],
      //猜你喜欢
      likeData: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: ["https://www.baiduyuyue.com/img/banner.png"]
    }
  },
  components: {
    headerT
  },
  created() {
// alert(returnCitySN.cip)
  


   this.classify = this.$store.state.classifylist.data
    const _this = this;
     _this.userId = localStorage.getItem('user_id');
   _this.$http.get(baseUrl+"user/userDetailInfo?userId="+_this.userId).then(function(res){
      _this.user = res.data.data
   })
    // const ip = returnCitySN['cip'];
    // 获取经纬度
    // 获取类名
    // _this.$fetch(baseUrl + "classify/queryAllClassify").then(function(response) {
    //   if (response.status == '200') {
    //     _this.classify = response.data.data;
    //   } else {
    //     alert(data.message);
    //   }
    // });

  },
  methods: {

    // 获取
    barter() {
      console.log("换一组 按钮")
    },
    changeFun(id, sort, index) {
      const _this = this;

      _this.$http.get(baseUrl + "publish/getHomePageList?longitude="+localStorage.getItem("lng")+'&latitude='+localStorage.getItem("lat")+'&page=1&classify_id='+id+"&sort="+sort).then(function(response) {
        if (sort == 2) {
          _this.jinData = response.data.data
          _this.jinDataiscur = index;
        } else if (sort == 1) {
          _this.newData = response.data.data
          _this.newDataiscur = index;
        } else if (sort == 3) {
          _this.likeData = response.data.data;
          _this.likeDataiscur = index;
        }
      });
    },
  },

  ready() {
    // this.changeFun(1, 1, 'all')
    // this.changeFun(1, 2, 'all')
  },
  mounted() {
    this.changeFun('all', 1, 'all')
    this.changeFun('all', 2, 'all')
  },
  computed: {
    ...mapState([
      'classifylist',
      // ...
    ]),
    ...mapState({
      user2: state => state.user,
    }),
  }
}

</script>
<style scoped>
.swiper-container {
  height: 450px;
}

.swiper-container img {
  width: 100%;
  height: 100%;
}

.more {
  width: 400px;
  float: right;
  height: 36px;
  line-height: 36px;
  text-align: right;
  border-bottom: 1px solid #046738;
  flex-grow: 1;
  cursor: pointer;
}

.bunner-1200 {
  width: 1200px;
  margin: auto;
  overflow: hidden;
  z-index: 11111
}

.bunner-wp {
  position: relative;
  width: 100%;
  z-index: 1
}

.bunner {
  width: 100%;
  position: absolute;
  left: 0px;
  /*display: none;*/
}

.swiper-container img {
  width: 100%;
}

.kuo {
  width: 200px;
  position: absolute;
  right: calc( 50% - 600px);
  top: 0px;
  z-index: 11;
}

</style>
