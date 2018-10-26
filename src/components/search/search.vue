<template>
  <div>
    <header-t message=true></header-t>
    <ul class="groom-list clearfix">
      <li v-for="item in searchList" v-if="searchList.length != 0" >
        <router-link class="timg" tag="a" :to="'/goods/goodsdetail/'+item.publishId">
        <img v-lazy="imgUrl+item.imageUrl" alt="" /></router-link>
        <div class="groom-act clearfix">
          <p class="lp">{{item.publishName}}</p>
        </div>
        <div class="groom-btn clearfix">
          <p class="tip">
            <img src="../../assets/img/new/icon01.png" alt=""> <span>{{item.distance}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../assets/img/new/icon02.png" alt=""><span>{{item.score}}</span>
          </p>
            <router-link class="rbtn" tag="span" :to="'/goods/goodsdetail/'+item.publishId">
    立即预约</router-link>
        
        </div>
      </li>
      <li v-else style="text-align:center;width:100%">
        暂无数据
      </li>
    </ul>
  </div>
</template>
<script>
import headerT from '@/components/org/header'
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  name: "search",
  data() {
    return {
      searchList:'',
      imgUrl
    }
  },

  components: {
    headerT
  },
    created() {
    this.delaty(this.$route.query.search)
  },
  methods: {
    delaty(publish_name) {
      const _this = this
      this.$http.get(baseUrl + 'publish/getHomePageList?longitude='+localStorage.getItem("lng")+'&latitude='+localStorage.getItem("lat")+'&classify_id=all&page=1&keyword='+publish_name+'&user_id='+localStorage.getItem('user_id')).then(function(res) {
        _this.searchList = res.data.data;
        console.log(_this.searchList)
      })
    },
    sends(data) {
      this.delaty(data)
    }
  },

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
