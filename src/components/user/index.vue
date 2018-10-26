<template>
  <div>
    <header-t message=true></header-t>
    <div class="bes-cont clearfix" style="display:flex">
      <div class="bes-left">
        <div class="bes-left_top">
          <img v-lazy="imgUrl+user.userCompressimg" alt="">
          <span class="bes-left_title">{{user.userName}} </span>
        </div>
        <ul>
          <li>
            <dl>
              <dt>个人信息</dt>
              <dd>
                <router-link to="/user/reservation">
                  <img src="../../assets/img/new/My-reservation.png" alt="">
                  <span>我的预约</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/collect">
                  <img src="../../assets/img/new/Collection.png" alt="">
                  <span>我的收藏</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/myuser">
                  <img src="../../assets/img/new/data.png" alt="">
                  <span>个人资料</span><em></em></router-link>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>商家中心</dt>
               <dd>
                <router-link to="/user/Business">
                  <img src="../../assets/img/new/Order.png" alt="">
                  <span>商家中心</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/orderGoods">
                  <img src="../../assets/img/new/Order.png" alt="">
                  <span>订单查一查</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/mypublish">
                  <img src="../../assets/img/new/Release.png" alt="">
                  <span>我的发布</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/drafts">
                  <img src="../../assets/img/new/drafts.png" alt="">
                  <span>草稿箱</span><em></em></router-link>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>发布中心</dt>
              <dd>
                <router-link to="/user/mycity">
                  <img src="../../assets/img/new/address.png" alt="">
                  <span>我的地址</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/mywebcams">
                  <img src="../../assets/img/new/service.png" alt="">
                  <span>我的摄像头</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/myweb">
                  <img src="../../assets/img/new/Website.png" alt="">
                  <span>我的官网</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/user/reservation_service">
                  <img src="../../assets/img/new/service.png" alt="">
                  <span>预约服务</span><em></em></router-link>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <router-view style="width:100%"></router-view>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState, mapMutations, mapActions } from 'vuex'
import headerT from '@/components/org/header'
export default {
  data() {
    return {
      imgUrl,
      value: "",
    }
  },

  components: {
    headerT
  },
  methods: {
    ...mapMutations([
      'setuser'
    ])
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),

  },
  created() {
    const _this = this
    _this.$http.get(baseUrl + 'user/userDetailInfo?userId='+localStorage.getItem("user_id")).then(function(res) {
      _this.setuser(res.data.data)
    })
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.router-link-active {
  background-color: #1fc19a;
  color: #fff;
}

.bes-left_title {
  margin-top: 10px;
}

.active {
  color: #046738
}

</style>
