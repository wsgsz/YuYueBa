<template>
  <div class="collect right_top">
    <div class="collect_top">
      <span class="collect_top_span">
      我的收藏
    </span>
    </div>
    <ul class="list_contetnt_ul">
      <li v-for="(list,index) in collectu" :key='index'>
        <router-link :to="'/goods/goodsdetail/'+list.publishId" tag="a">
          <img v-lazy="imgUrl + list.imageUrl" alt="item.publishName" class="logo">
        </router-link>
        <div class="list_contetnt_lid">
          <router-link :to="'/goods/goodsdetail/'+list.publishId" tag="a" style="width:100%;">
            <div class="list_contetnt_li_title">
              <span class="list_contetnt_li_title_s1">
                    {{list.publishName}}
                  </span>
              <span class="list_contetnt_li_title_s2">
                   {{list.addTime}}
                  </span>
            </div>
          </router-link>
          <div class="list_contetnt_li_bottom">
            <div class="list_contetnt_li_bot_span1">
              <span class="span"><i class="iconfont icon-pingjia"></i>{{list.score}}</span>
              <span class="span"><i class="iconfont icon-follow"></i>{{list.concernCount}}</span>
              <span class="span"><i class="iconfont icon-julilujing"></i>{{list.distance}}m</span>
            </div>
            <div class="list_contetnt_li_goyuyue" @click="detaillink(list.publishId,index)">
              删除
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="kong" style="width:100%;margin:auto;text-align:center;font-size:18px;margin-top:350px;">
      <!-- <img src="../../assets/img/new/" alt=""> -->
      你暂时还没有收藏</div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
      collectu: "",
      imgUrl,
      kong: false,
    }
  },
  methods: {
    detaillink(pid,index) {
      const _this = this
      _this.$http.post(baseUrl + "publish/cancelPublishCollect",  qs.stringify({
        'userId': localStorage.getItem('user_id'),
        'publishId': pid
      })).then(function(res) {
        _this.collectu.splice(index,1)
      })
    }
  },
  created() {
    const _this = this
    this.$http.get(baseUrl + "publish/getPublishOfCollect?userId="+localStorage.getItem('user_id')+'&longitude='+localStorage.getItem('lng')+"&latitude="+localStorage.getItem('lat')+'&statusId=0' ).then(function(res) {
      _this.collectu = res.data.data
      if (_this.collectu.length == 0) {
        _this.kong = true
      } else {
        _this.kong = false
      }
    })
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
@import '../../assets/css/list.css';
.list_contetnt_li_goyuyue {
  background: transparent;
  color: #333;
  border: 1px solid #999999;
}

</style>
