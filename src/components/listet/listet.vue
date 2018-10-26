<template>
  <div class="listet">
 
    <div class="yy-list-wp clearfix">
      <div class="yy-list-l">
       <div class="yyA_list_border">
            
        <div class="list_top_d">
          <!-- toubu  -->
          <ul class="list_topul">
            <li :class="{ on:Handovers == 2}" @click="Handover (2)">
              距离优先
            </li>
            <li :class="{ on:Handovers == 3}" @click="Handover (3)">
              关注最多
            </li>
            <li :class="{ on:Handovers == 4}" @click="Handover (4)">
              价格最低
            </li>
            <li :class="{ on:Handovers == 1}" @click="Handover (1)">
              最新发布
            </li>
          </ul>
          <img src="" alt="">
        </div>
        <div class="list_contetn" style="margin-bottom:70px;">
          <ul class="list_contetnt_ul">
            <router-link :to="/detail/+item.publishId" v-for="item in dataList" :key="item.id" tag="li">
              <img :src="item.imageUrl" alt="item.publishName" class="logo">
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
                  <div class="list_contetnt_li_bot_span1">
                    <span class="span"><i class="iconfont icon-pingjia"></i>{{item.score}}</span>
                    <span class="span"><i class="iconfont icon-follow"></i>{{item.concernCount}}</span>
                    <span class="span"><i class="iconfont icon-julilujing"></i>{{item.distance}}米</span>
                  </div>
                  <div class="list_contetnt_li_goyuyue" @click="detaillink(item.publishId,)">
                    立即查看
                  </div>
                </div>
              </div>
            </router-link>
          </ul>
          </div>
        </div>
        <el-pagination background :pager-count="pages" layout="prev, pager, next" :total="pages*10"  @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <div class="yy-list-r">
        <div class="cnxh">
          <h2>丨相关推荐</h2>
          <ul>
            <li>
              <a href="###">
                <img src="img/banu.png" alt=""/>
                <span class="tit">百年老妈火锅（玉凤路店）</span>
                 <div class="list_contetnt_li_bot_span1 rightflex" >
                    <span class="span" style="border-right:0px;"><i class="iconfont icon-pingjia"></i>ss</span>
                    <span class="span"><i class="iconfont icon-follow"></i>sss</span>
                
                  </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  name: 'listet',
  data() {
    return {
      Handovers: 2,
      dataList: '',
      pages: "",
      classid:""
    }
  },

  computed: {},
  methods: {
    handleCurrentChange(e){
      this.haveList(this.$route.params.id,this.Handovers,e)
    },
    haveList(classifyid,sort,page) {
      const _this = this;
   
      _this.$http.get(baseUrl + "publish/getHomePageList?longitude="+localStorage.getItem("lng")+'&latitude='+localStorage.getItem("lat")+'&page='+page+'&classify_id='+classifyid+'&sort='+sort).then(function(response) {
        _this.dataList = response.data.data
        _this.pages = response.data.pages
      });
    },
    // 切换各种
    Handover(oc) {
      const classid = this.$route.params.id;
      this.haveList(classid, oc,1);
      this.Handovers = oc
    },
    detaillink(obj) {
      this.$router.push({ to:'/detail', params: { id: obj } })
    },
  },
  created() {
    const _this = this

    const classid = _this.$route.params.id
    this.haveList(classid, '2',"1")
  }
}

</script>
<style scoped>
@import "../../assets/css/detail.css";
@import '../../assets/css/list.css';
.rightflex {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
}

.rightflex span {
  text-align: left !important;
}

.rightflex span i {
  font-size: 22px;
}

</style>
