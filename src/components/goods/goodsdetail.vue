<template>
  <div>
    <div class="detail" style="width:1200px;margin:auto">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods/goodslist/1'}" style="font-weight:100">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{data.publishName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="lun-wp clearfix">
        <div class="lun-l-wp">
          <div class="lun-l clearfix">
            <img v-lazy="imgUrl+data.imageUrl" alt="">
          </div>
        </div>
        <div class="lun-r-wp">
          <div class="lun-r-tit" style="width:100%">
            <div class="lun-r-tcent lun-r-tcent_pos" style="width:100%">
              <h2>{{data.publishName}}</h2>
              <div class="lun-r-tcent_pos_div">
                <div class="lun-r-tcent_pos_div_share">
                  <i class="iconfont icon-fenxiang"></i>
                </div>
                <div class="lun-r-tcent_pos_div_col" v-if="!this.data.haveCollection" @click="addCollection(data.publishId)">
                  <i class="iconfont icon-shoucang"></i> 收藏
                </div>
                <div class="lun-r-tcent_pos_div_col" v-if="this.data.haveCollection" @click="removeCollection(data.publishId)">
                  <i class="iconfont icon-collection-b"></i> 取消收藏
                </div>
              </div>
            </div>
          </div>
          <div class="lun-r-tit flexs">
            <div class="lun-r-tcent" style="margin:auto;padding-top:25px;box-sizing:border-box">
              <el-rate v-model="data.score" disabled show-score text-color="#ff9900" score-template="{value}">
              </el-rate>
            </div>
            <!-- 未收藏 -->
            <div class="lun-r-tcent lun-r-tright" style="" v-if="!this.data.haveConcern" @click="addConcern()">
              <img src="../../assets/img/new/guanzhu.png" alt="" style="width:20px;">
            </div>
            <!-- 已收藏 -->
            <div class="lun-r-tcent lun-r-tright" style="" v-if="this.data.haveConcern" @click="removeConcern()">
              <img src="../../assets/img/new/yiguanzhu.png" alt="" style="width:20px;">
            </div>
          </div>
          <div class="lun-r-tit flexs" v-if="data.contacts.length!=0">
            <div class="lun-r-tcent" style="margin:auto">
              联系方式：{{data.contacts[0].contactNum}}
            </div>
            <div class="lun-r-tcent lun-r-tright" @click="ctShow = !ctShow"> 更多联系方式
              <img src="../../assets/img/new/Dropdown arrow.png" alt="">
            </div>
            <div class="lun-r-butn" v-show="ctShow">
              <ul>
                <li v-for="ct in data.contacts">
                  <span v-if="ct.contactType == 1">qq</span>
                  <span v-if="ct.contactType == 2">微信</span>
                  <span v-if="ct.contactType == 3">手机</span>
                  <span v-if="ct.contactType == 4">座机电话</span> {{ct.contactNum}}
                </li>
              </ul>
            </div>
          </div>
          <div class="lun-r-tit flexs" v-if="data.webs.length != 0">
            <div class="lun-r-tcent" style="margin:auto">
              官网：{{data.webs[0].webUrl}}
            </div>
            <div class="lun-r-tcent lun-r-tright" @click="webShow = !webShow"> 更多官网
              <img src="../../assets/img/new/Dropdown arrow.png" alt="">
            </div>
            <div class="lun-r-butn" v-show="webShow">
              <ul>
                <li v-for="web in data.webs">{{web.webTitle}}:{{web.webUrl}}</li>
              </ul>
            </div>
          </div>
          <div class="lun-r-tit flexs">
            <div class="lun-r-tcent" style="margin:auto">
              地址：{{data.address}}
            </div>
            <div class="lun-r-tcent lun-r-tright" style="">
              <!-- <i class="iconfont icon-julilujing"></i> -->
              &nbsp;&nbsp;&nbsp;{{distan}}米
            </div>
          </div>
        </div>
      </div>
      <h2 class="tit44">预约列表</h2>
      <div class="yy-list-wp clearfix">
        <div class="yy-list-l">
          <ul class="yy-list">
            <li v-for="item in data.appointments">
              <router-link :to="'/makedetail/'+item.appointmentId">
                <img v-lazy="imgUrl + item.appointmentImgUrl" class="kuo-img" alt="" style="border:1px solid #eee" @click="window.location.reload()" /></router-link>
              <router-link :to="'/makedetail/'+item.appointmentId" class="iyy" tag="div">
                <p class="tit">{{item.appointmentTitle}}</p>
                <p class="tcont">{{item.appointmentDetail}}</p>
              </router-link>
              <router-link v-if="data.status == 1" :to="{ path:'/goods/tmake/'+item.appointmentId, query: { pid:data.publishId,city:data.address}}" class="yy-btn" tag="span">
                立即预约</router-link>
              <div class="status3" v-if="data.status != 1">
                立即预约
              </div>
            </li>
          </ul>
          <h2 class="tit44">预约详情</h2>
          <div class="detail-wp">
            <div>{{data.publishDetails}}</div>
            <div class="div_img_imageurl" style="margin-top:20px;">
              <img :src="imgUrl+imgs.imageUrl" v-for="imgs in data.imageDetailList" class="img_imageurl" alt=""></div>
          </div>
        </div>
        <div class="yy-list-r">
          <div class="fj">
            <map-sc :lng="data.longitude" :lat="data.latitude"></map-sc>
          </div>
          <div class="cnxh">
            <h2>猜你喜欢</h2>
            <ul>
              <router-link :to="{ path: '/goods/goodsdetail/'+items.publishId, query: { dis:items.distance }}" v-for="items in linkright.slice(0,3)" :key="items.id" tag="li" @click="rload(items.publishId,items.distance)">
                <a>
                  <img v-lazy="imgUrl+items.imageUrl" class="kuo-img logo" alt="item.publishName">
                <span class="tit">{{items.publishName}}</span>
                 <div class="list_contetnt_li_bot_span1 rightflex" >
                    <span class="span" style="border-right:0px;"><i class="iconfont icon-pingjia"></i>{{items.score}}</span>
                    <span class="span"><i class="iconfont icon-follow"></i>{{items.status}}</span>
                  </div></a>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mapSc from '@/components/map/mapss'
import imgZoom from 'vue2.0-zoom'
import { baseUrl, imgUrl } from '@/api/env'
import { mapMutations, mapState } from 'vuex'
import qs from 'qs'
export default {
  data() {
    return {
      imgUrl,
      ctShow: false,
      webShow: false,
      collection: '',
      configs: {
        width: 650,
        height: 350,
        maskWidth: 100,
        maskHeight: 100,
        maskColor: 'red',
        maskOpacity: 0.7
      },
      msg: '',
      text: '',
      password: '',
      data: "",
      swiperOption: {
        slidesPerView: 8,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.fwy-r',
          prevEl: '.fwy-l',
        }
      },
      distan: "",
      linkright: ""
    }
  },
  computed: {
    ...mapState({
      lat: state => state.lat,
      lng: state => state.lng
    })
  },
  components: { imgZoom, mapSc },
  methods: {
    linkmake(id) {
      this.$router.push({ name: 'makedetail', params: { id: id } })
    },
    detailtimeMake(obj, pid) {
      this.$router.push({ name: 'timeMake', params: { id: obj, pid: pid } })
    },
    removeCollection() {
      const _this = this
      _this.$http.post(baseUrl + "publish/cancelPublishCollect",qs.stringify({ publishId: this.data.publishId, userId: localStorage.getItem("user_id") }) ).then(function(res) {
        if (res.data.status == "200") {
          _this.data.haveCollection = 0
        }
      })
    },
    addCollection() {
      const _this = this
      _this.$http.post(baseUrl + "publish/addPublishCollect", qs.stringify({ 'publishId': this.data.publishId, 'userId': localStorage.getItem("user_id") })).then(function(res) {
        if (res.data.status == "200") {
          _this.data.haveCollection = 1
        }
      })
    },
    removeConcern() {
      const _this = this
      _this.$http.post(baseUrl + "publish/cancelPublishConcern", qs.stringify({ 'publishId': this.data.publishId, 'userId': localStorage.getItem("user_id") })).then(function(res) {

        if (res.data.status == "200") {
          _this.data.haveConcern = 0
        }
      })
    },
    addConcern() {
      const _this = this
      _this.$http.post(baseUrl + "publish/addPublishConcern ", qs.stringify({ 'publishId': this.data.publishId, 'userId': localStorage.getItem("user_id") })).then(function(res) {

        if (res.data.status == "200") {
          _this.data.haveConcern = 1
        }
      })
    },
    rload(id, dis) {
      const _this = this
      _this.distan = dis
      _this.$http.get(baseUrl + "publish/getPublishDetail?publishId="+id+'&user_id='+localStorage.getItem('user_id')).then(function(response) {
        _this.data = response.data.data
        _this.msg = response.data.status
      });
    }
  },
  created() {

    const _this = this;
    _this.rload(_this.$route.params.id, _this.$route.query.dis);
    // const obj = {
    //   "longitude": this.lng,
    //   "latitude": this.lat,
    //   "page": 1,
    //   "classify_id": 1,
    //   "sort": 3, //1:最新发布, 2:离我最近, 3:关注最多, 4:价格最低
    // };
    _this.$http.get(baseUrl + "publish/getHomePageList?longitude="+_this.lng+'&latitude='+_this.lat+'&page=1&classify_id=1&sort=3').then(function(response) {
      _this.linkright = response.data.data

    });
    // _this.$post('https://www.baiduyuyue.com/baiduyuyue/collecting/queryResult.php', {
    //   user_id: localStorage.getItem("user_id"),
    //   publish_id: _this.$route.params.id
    // }).then(function(res) {
    //   _this.collection = res.data.data[0].collecting_id
    // })

  }
}

</script>
<style scoped>
@import "../../assets/css/detail.css";
@import '../../assets/css/list.css';
.lun-r-tright {
  cursor: pointer;
}

.el-breadcrumb {
  margin: 20px 0;
}

.lun-r-wp {
  margin-top: -30px;
}

.lun-r-tcent_pos {
  position: relative;
}

.lun-r-tcent_pos_div {
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 110px;
}

.lun-r-tcent_pos_div_col {
  width: 56px;
  background: #046738;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 25px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  height: 65px;
}

.lun-r-tcent_pos_div_col i {
  margin-top: 10px;
  line-height: 25px;
}

.lun-r-tcent_pos_div_share i {
  font-size: 20px;
}

.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 500 !important;
}

.detail-wp>img {
  display: block !important;
  margin: 33px auto !important;
  max-width: 640px !important;
}

.div_img_imageurl {
  zoom: 1;
  overflow: hidden;
}
.div_img_imageurl img{
  width: 100% !important;
  margin-bottom: 20px;
}
.img_imageurl {
  width: 210px;
  display: block;
  margin-right: 20px;
}

.div_img_imageurl>.img_imageurl:nth-child(4n) {
  margin-right: 0px;
}

.status3 {
  background: #e3e3e3;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 120px;
}
.detail-wp{
  font-size: 16px;
  line-height: 19px;
  text-indent: 1.5em
}
</style>
