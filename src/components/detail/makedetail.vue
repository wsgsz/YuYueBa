<template>
  <div id="makedetail">
   <header-t message=true></header-t>
    <div class="yy-list-wp clearfix">
      <div class="yy-list-wp clearfix">
        <ul class="yy-list">
          <li style="border-bottom: 1px solid #e3e3e3">
            <img :src="imgUrl+data.appointmentImgUrl" alt="" style="border:1px solid #eee" />
            <div class="iyy">
              <p class="tit" style="margin:auto;width:100%">{{data.appointmentTitle}}
              </p>
            </div>
            <router-link class="yy-btn" tag="span"  :to="{ path:'/goods/tmake/'+data.appointmentId, query: { pid:data.publishId,city:data.address}}">
             立即预约
            </router-link>
          </li>
        </ul>
        <h2 class="tit44">预约列表</h2>
        <div class="detail-wp">
          <span> {{data.appointmentDetail}}</span>
          <img :src="imgUrl+dimg.imageCompressUrl" alt="" v-for="dimg in data.imageDetailList">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerT from '@/components/org/header'
import { baseUrl ,imgUrl} from '@/api/env'
export default {
  data() {
    return {
      imgUrl,
      data: ''
    }
  },
    components: {
    headerT
  },
  methods: {},
  created() {
    const _this = this
    console.log(_this.$route.params.id)
    _this.$http.get(baseUrl+"appointment/getAppointmentDetail?appointmentId="+_this.$route.params.id ).then(function(res) {
      console.log(res.data.data)
      _this.data = res.data.data
    })
  }
}

</script>
<style>
@import "../../assets/css/detail.css";
.yy-list {
  width: 1200px;
  background: transparent;
  box-sizing: border-box;
}

.yy-list-wp {
  margin: auto;
}
.detail-wp{
  font-size: 16px;
  line-height: 19px;
}
.detail-wp img{
  margin-top: 15px;
}
</style>
