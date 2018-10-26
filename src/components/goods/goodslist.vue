<template>
  <div class="listet">
    <div class="yy-list-wp clearfix">
      <div class="yy-list-l" v-if="dataList.length!='0'">
        <div class="yyA_list_border">
          <div class="list_top_d">
            <!-- toubu  -->
            <ul class="list_topul">
              <li :class="{ on:Handovers == 2}" @click="Handover (2)">
                距离最近
              </li>
              <li :class="{ on:Handovers == 3}" @click="Handover (3)">
                关注最多
              </li>
              <li :class="{ on:Handovers == 4}" @click="Handover (4)">
               评分最高
              </li>
              <li :class="{ on:Handovers == 1}" @click="Handover (1)">
                最新发布
              </li>
            </ul>
            <img src="" alt="">
          </div>
          <div class="list_contetn" style="margin-bottom:70px;">
            <ul class="list_contetnt_ul">
              <router-link :to="{ path: '/goods/goodsdetail/'+item.publishId ,query: { dis:item.distance }}" v-for="item in dataList" :key="item.id" tag="li">
                <img v-lazy="imgUrl+item.imageUrl" class="kuo-img logo" alt="item.publishName">
                <div class="list_contetnt_lid">
                  <div class="list_contetnt_li_title">
                    <span class="list_contetnt_li_title_s1">
                    {{item.publishName}}
                  </span>
                    <span class="list_contetnt_li_title_s2">
                   {{item.addTime}}
                  </span>
                  </div>
                  <div class="list_contetnt_li_bottom">
                    <div class="list_contetnt_li_bot_span1" style="float:left"> 
                      <span class="span"><i class="iconfont icon-pingjia"></i>{{item.score}}</span>
                      <span class="span"><i class="iconfont icon-follow"></i>{{item.concernCount}}</span>
                      <span class="span"><i class="iconfont icon-julilujing"></i>{{item.distance}}m</span>
                    </div>
                    <div class="list_contetnt_li_goyuyue" style="float:right"> 
                      立即查看
                    </div>
                  </div>
                </div>
              </router-link>
            </ul>

          </div>
        </div>
        <el-pagination background :pager-count="pages" layout="prev, pager, next" :total="pages*10" @current-change="handleCurrentChange">
        </el-pagination>      
      </div>
       <div class="yy-list-l" v-if="dataList.length=='0'" style="text-align:center;padding-top:30px;">
         暂无信息
       </div>
      <div class="yy-list-r">
        <div class="cnxh">
          <h2>丨相关推荐</h2>
          <ul>
            <router-link :to="{ path: '/goods/goodsdetail/'+items.publishId, query: { dis:items.distance }}" v-for="items in linkright.slice(0,7)" :key="items.id" tag="li">
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
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      imgUrl,
      Handovers: 2,
      dataList: '',
      pages: "",
      linkright: ""
    }
  },
  computed: {
    ...mapState({
      lat: state => state.lat,
      lng: state => state.lng
    }),
    classid() {
      return this.$route.params.goodslistId
    },
    obtainlng() {
      return localStorage.getItem("lng")
    },
    obtainlat() {
      return localStorage.getItem("lat")
    },
  },
  methods: {
    ...mapMutations([
      'classifyvu', "settopclassify"
    ]),
    handleCurrentChange(e) {
      this.haveList(this.classid, this.Handovers, e)
    },
    haveList(classifyid, sort, page) {
      const _this = this;
      // const obj = {
      //   "longitude": this.lng,
      //   "latitude": this.lat,
      //   "page": page,
      //   "classify_id": classifyid,
      //   "sort": sort, //1:最新发布, 2:离我最近, 3:关注最多, 4:价格最低
      // };
      _this.$http.get(baseUrl + "publish/getHomePageList?longitude="+_this.lng+"&latitude="+this.lat+"&page="+page+"&classify_id="+classifyid+"&sort="+sort).then(function(response) {
        // console.log(response)
        _this.dataList = response.data.data
        _this.pages = response.data.pages
      });
    },
    // 切换各种
    Handover(oc) {
      this.haveList(this.classid, oc, 1);
      this.Handovers = oc
    },
  },
  created() {
    const _this = this
    _this.settopclassify(_this.classid)
    localStorage.setItem("topclassifys", _this.classid)
    this.haveList(_this.classid, '2', "1")
    // const obj = {
    //   "longitude": this.lng,
    //   "latitude": this.lat,
    //   "page": 1,
    //   "classify_id": 2,
    //   "sort": 3,
    // };
    _this.$http.get(baseUrl + "publish/getHomePageList?longitude="+this.lng+"&latitude="+this.lat+"&page=1&classify_id=2&sort=3").then(function(response) {
      _this.linkright = response.data.data
      console.log(response.data.data)
    });
  }
}

</script>
<style scoped>
@import "../../assets/css/detail.css";
@import '../../assets/css/list.css';
.list_topul{
  overflow: hidden;
  display: block
}
.list_topul li{
  float: left;
}
</style>
