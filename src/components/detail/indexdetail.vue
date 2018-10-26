<template>
  <div>

    <div class="detail" style="width:1200px;margin:auto">
      <!-- 详情内容 -->
      <!--   <div class="mianbao" style="line-height:40px;display:inline">
        <a href="/">首页</a>&nbsp;>&nbsp;<a href="/">附近推荐</a>&nbsp;>&nbsp;<a href="###">{{data.publishName}}</a>
      </div> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/listet/1'}">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{data.publishName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="lun-wp clearfix">
        <div class="lun-l-wp">
          <div class="lun-l clearfix">
            <img :src="data.imageUrl" alt="">
          </div>
        </div>
        <div class="lun-r-wp">
          <div class="lun-r-tit">
            <div class="lun-r-tcent lun-r-tcent_pos">
              <h2>{{data.publishName}}</h2>
              <div class="lun-r-tcent_pos_div">
                <div class="lun-r-tcent_pos_div_share">
                  <i class="iconfont icon-fenxiang"></i>
                </div>
                <div class="lun-r-tcent_pos_div_col" v-if="this.collection" @click="colectionChange(data.publishId)">
                  <i class="iconfont icon-shoucang"></i> 收藏
                </div>
                <div class="lun-r-tcent_pos_div_col" v-if="!this.collection" @click="colectionChange(data.publishId)">
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
            <div class="lun-r-tcent lun-r-tright" style="">
              <img src="../../assets/img/new/icon01.png" alt=""> {{data.status}}
            </div>
          </div>
          <div class="lun-r-tit flexs">
            <div class="lun-r-tcent" style="margin:auto">
              联系方式：{{data.contacts[0].contactNum}}
            </div>
            <div class="lun-r-tcent lun-r-tright" @click="ctShow = !ctShow"> 更多联系方式
              <img src="../../assets/img/new/Dropdown arrow.png" alt="">
            </div>
            <div class="lun-r-butn" v-show="ctShow">
              <ul>
                <li v-for="ct in data.contacts">
                  <span v-if="ct.contactType == 1">电话</span>
                  <span v-if="ct.contactType == 2">微信</span>
                  <span v-if="ct.contactType == 3">电话</span>
                  <span v-if="ct.contactType == 4">微信</span> {{ct.contactNum}}
                </li>
              </ul>
            </div>
          </div>
          <div class="lun-r-tit flexs">
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
              <i class="iconfont icon-julilujing"></i>{{data.distance}}米
            </div>
          </div>
          <div class="lun-tips">
            <p>地址： <a href="" target="_blank">{{data.address}}</a><em></em></p>
          </div>
        </div>
      </div>
      <h2 class="tit44">预约列表</h2>
      <div class="yy-list-wp clearfix">
        <div class="yy-list-l">
          <ul class="yy-list">
            <li v-for="item in data.appointments">
              <img :src=" imgUrl + item.appointmentImgUrl" alt="" style="border:1px solid #eee" @click="linkmake(item.appointmentId)" />
              <div class="iyy">
                <p class="tit">{{item.appointmentTitle}}</p>
                <p class="tcont">{{item.appointmentDetail}}</p>
              </div>
              <span class="yy-btn" @click="detailtimeMake(item.appointmentId,data.publishId)">立即预约</span>
            </li>
          </ul>
          <h2 class="tit44">预约列表</h2>
          <div class="detail-wp" v-html="data.publishDetails"></div>
        </div>
        <div class="yy-list-r">
          <div class="fj">
            <map-sc :lng="data.longitude" :lat="data.latitude"></map-sc>
          </div>
          <div class="cnxh">
            <h2>猜你喜欢</h2>
            <ul>
              <li>
                <a href="###">
                <img src="img/banu.png" alt=""/>
                <span class="tit">百年老妈火锅（玉凤路店）</span>
                <span class="address">曼哈顿广场</span>
                <span class="jiage">¥ <em>58.26</em></span>
              </a>
              </li>
              <li>
                <a href="###">
                <img src="img/banu.png" alt=""/>
                <span class="tit">百年老妈火锅（玉凤路店）</span>
                <span class="address">曼哈顿广场</span>
                <span class="jiage">¥ <em>58.26</em></span>
              </a>
              </li>
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
export default {
  name: 'indexdetail',
  data() {
    return {
      // baseUrl:this.baseUrl,
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
      }
    }
  },
  computed: {
    ...mapState({
      city: state => state.city,
    })
  },
  components: { imgZoom, mapSc },
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),

    linkmake(id) {
      this.$router.push({ name: 'makedetail', params: { id: id } })
    },
    detailtimeMake(obj, pid) {
      this.$router.push({ name: 'timeMake', params: { id: obj, pid: pid } })
    },
    colectionChange(pid) {
      const _this = this;
      if (_this.collection == null) {
        _this.$http.post('https://www.baiduyuyue.com/baiduyuyue/collecting/add.php', { user_id: localStorage.getItem("user_id"), publish_id: pid }).then(function(res) {
          _this.collection = res.data.collecting_id
        })
      } else {
        _this.$post("https://www.baiduyuyue.com/baiduyuyue/collecting/delete.php", { collecting_id: _this.collection }).then(function(res) {
          _this.collection = null
        })
      }
    }
  },
  created() {
    const _this = this;
    if (_this.$route.params.id == 'undefined') {} else {
      _this.$fetch(baseUrl + "publish/getPublishDetail", { "publishId": _this.$route.params.id }).then(function(response) {
        console.log(response.data)
        _this.data = response.data
        _this.msg = response.data.status
        _this.increment(_this.data.address)
      });
      _this.$post('https://www.baiduyuyue.com/baiduyuyue/collecting/queryResult.php', {
        user_id: localStorage.getItem("user_id"),
        publish_id: _this.$route.params.id
      }).then(function(res) {
        _this.collection = res.data[0].collecting_id
        // console.log(res.data[0].collecting_id)
      })
    }
  }
}

</script>
<style scoped>
@import "../../assets/css/detail.css";
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
.detail-wp>img { display:block !important;margin:33px auto !important;max-width:640px !important; }

</style>
