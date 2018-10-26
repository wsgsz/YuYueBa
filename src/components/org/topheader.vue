<template>
  <div class="top-wp">
    <div class="top" style="position: relative;">
      <div class="top-l" v-show="user_id" style="">
        <span class="posi" @click="togtab">{{citychioce}} 目的地</span>
      </div>
      <div class="top-r">
        <div class="liji" style="display:flex">
          <img :src="imgUrl+citylist.userCompressimg" class="user_top_img" alt="">
          <p>{{citylist.userName}}</p>
        </div>
        <a href="###">商家中心</a>
        <a href="###">手机APP</a>
        <a href="###">官方微信</a>
        <a href="###">网站导航</a>
      </div>
      <div class="top_btn" v-show="!tog">
        <ul class="top_btn_ullist">
          <li class="top_btn_lilist" v-for="(item,index) in citylist">
            <span @click='citychioces(item.address_name)'>{{item.address_name}}</span>
            <div class="top_btn_ullist_div" @click="closecity_des(item.destination_id,index)"></div>
          </li>
          <li style="cursor: pointer;">
            <router-link to="/hadmap">+++++++++++++++++</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState,mapMutations } from 'vuex'
export default {
  data() {
    return {
      imgUrl,
      tog: true,
      citylist: "",
      citychioce: "" // 确认目的地
    }
  },
  created() {
    const _this = this
    // if (localStorage.getItem('citychioce') == null) {
    //   _this.$router.push('/hadmap')
    // }
    _this.$post(baseUrl+"destination/addDestination", { user_id: this.user_id }).then(function(res) {
      _this.inneruser(res.data)
      _this.citylist = res.data
    })
  },
  methods: {
       ...mapMutations([
      'inneruser',
    ]),
    togtab() {
      this.tog = !this.tog
    },
    // 删除
    closecity_des(obj, index) {
      const _this = this
      _this.$post(baseUrl+'destination/deleteDestination', { id: obj }).then(function(res) {
        _this.citylist.splice(index, 1)
      })
    },
    citychioces(obj) {
      this.citychioce = obj
      this.tog = !this.tog
      localStorage.setItem("citychioce", obj)
    },
    // 添加
    add_city() {

    },
    // 退出账户
    quit() {
      localStorage.removeItem('user_id');
      localStorage.removeItem('citychioce');
      window.location.reload()
    }
  },
  computed: {
  ...mapState({
      goodslist: state => state.goodslist,
    }),
    user_id() {
      return localStorage.getItem('user_id');
    }
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.top-l {
  justify-content: space-between;
}

.liji {
  cursor: pointer;
}

.liji p {
  display: inline;
  line-height: 30px;
}

.posi {
  cursor: pointer;
}

.user_top_img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

</style>
