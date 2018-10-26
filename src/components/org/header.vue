<template>
  <div>
    <div class="top-wp">
      <div class="top">
        <div class="top-l" v-show="user_id" @mouseout="tog = false" v-on:mouseover="tog = true" style="position: relative;width:600px;">
          <span class="posi" @click="togtab">{{citychioce}} 目的地</span>
          <div class="top_btn" v-show="tog" style="z-index:8888">
            <ul class="top_btn_ullist">
              <li class="top_btn_lilist" v-for="(item,index) in citylist">
                <span @click='citychioces(item)' style="display:block">{{item.address}}</span>
                <div class="top_btn_ullist_div" @click="closecity_des(item.destinationId,index,item.address)"></div>
              </li>
              <li style="cursor: pointer;">
                <router-link to="/hadmap" style="text-align:center;display:block">添加目的地</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="top-r">
          <div class="liji"  v-if="user_id">
            <img v-lazy="imgUrl+user.userCompressimg" class="user_top_img" alt="">
            <p style="display:inline-block">{{user.userName}}</p>
          </div>
          <span @click="quit()" style="cursor:pointer" v-if="user_id">退出</span>
          <a href="###">商家中心</a>
          <a href="###">手机APP</a>
          <a href="###">官方微信</a>-
          <a href="###">网站导航</a>
        </div>
      </div>
    </div>
    <div class="hello">
      <div class="head-wp">
        <div class="head-cont clearfix">
          <h1 class="head-logo"><router-link to="/">预约吧</router-link></h1>
          <div class="classify_top" v-if="clasname">
            <div class="classify_top1 clearfix" @mouseover="ifclassify = false" @mouseout="ifclassify = true">
              <div class="classify_top2">{{clasname}}</div>
              <div class="classify_ul clearfix" v-if="!ifclassify">
                <ul class="clearfix">
                  <li @click="goodlist('全部','all')">全部</li>
                  <li v-for="item in classify" @click="goodlist(item.classifyName,item.classifyId)">
                    {{item.classifyName}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="head-search">
            <input type="text" v-model="searchd" placeholder="请输入搜索内容"  v-on:keyup.enter="tosearch()" />
            <button @click="tosearch()"></button>
          </div>
        </div>
        <div class="nav-wp clearfix" v-if="messagehide">
          <h3 class="all-fen">· 全部分类</h3>
          <div class="nav-lei">
            <ul class="nav-list">
              <li>
                <router-link :to="{path:'/goods/goodslist/all',query:{claname:'全部'}}"  tag="a"><span class="hd">全部</span><em></em></router-link>
              </li>
              <li v-for="rs in classify">
                <router-link :to="{path:'/goods/goodslist/'+rs.classifyId,query:{claname:rs.classifyName}}" tag="a" @click="linkClassify(rs.classifyId)"><span class="hd">{{rs.classifyName}}</span><em></em></router-link>
              </li>
            </ul>
          </div>
          <div class="nav-cont">
            <router-link to="/index">网站首页</router-link>
            <router-link to="/information">发布管理</router-link>
            <router-link to="/user">我的预约</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState, mapMutations } from 'vuex'
import qs from 'qs'
export default {
  props: ['messagehide'],
  data() {
    return {
      searchd: "",
      // 分类
      classify: [],
      imgUrl,
      tog: false,
      citylist: "",
      user: "",
      citychioce: "",
      goodslist: "",
      tagClas: false,
      ifclassify: true,
      clasname: ""
    }
  },
  created() {
    const _this = this;
    _this.searchd = this.$route.query.search
    _this.goodslist = localStorage.getItem("goods_list")
    // _this.citychioce = localStorage.getItem('citychioce')
    // console.log(_this.citychioce)
    console.log(localStorage.getItem('citychioce'))
      if(localStorage.getItem('citychioce') == undefined){
           _this.$http.get("https://restapi.amap.com/v3/ip?key=8a30263b1197cb8cd1ff64a8628da9c1&ip=" + returnCitySN.cip).then(function(res) {
            localStorage.setItem('citychioce',res.data.province+res.data.city)
            _this.citychioce = res.data.province+res.data.city
            localStorage.setItem("lng",  res.data.rectangle.split(';')[1].split(',')[0])
            localStorage.setItem("lat",res.data.rectangle.split(';')[1].split(',')[1])
      })
    }else{
       _this.citychioce =  localStorage.getItem('citychioce')
    }
    // 获取类名
     _this.$http.get(baseUrl + "classify/queryAllClassify").then(function(response) {
      if (response.data.status == '200') {
        _this.classify = response.data.data;
        _this.classifyvu(response.data.data)
      } else {
        // alert(data.message);
      }
    });
    _this.$http.get(baseUrl + "destination/queryAllDestination?userId="+localStorage.getItem('user_id')).then(function(res) {
      _this.citylist = res.data.data
    })
    _this.$http.get(baseUrl + "user/userDetailInfo?userId="+localStorage.getItem('user_id')).then(function(res) {
      _this.user = res.data.data
      // console.log(res)
    })
    // 猜你喜欢
  },
  methods: {
    goodlist(obj, index) {
      localStorage.setItem("topclassifys", obj)
      this.$router.push({ path: "/goods/goodslist/" + index, query: { claname: obj } })
      window.location.reload()
    },
    togtab() {
      this.tog = !this.tog
    },
    ...mapMutations([
      'classifyvu'
    ]),
    // 获取
    barter() {
      console.log("换一组 按钮")
    },
    changeFun(id, sort, index) {
      const _this = this;
    },
    tosearch() {
      const _this = this
      // this.$store.commit('setsearch', _this.searchd)
      // _this.searchd = _this.$store.state.search;
      // _this.$router.push('/search/' + _this.searchd)
      this.$router.push({ path: "/search/", query: { search: this.searchd } })
      window.location.reload()
    },
    // 删除
    closecity_des(obj, index, addres) {
      if (addres == this.citychioce) {
        alert('已选位置不可删除')
        return false
      } else {
        const _this = this
        _this.$http.get(baseUrl + 'destination/deleteDestination?id='+obj ).then(function(res) {

          _this.citylist.splice(index, 1)
        })
      }


    },
    citychioces(obj) {
      this.citychioce = obj.address
      this.tog = true
      localStorage.setItem("citychioce", obj.address)
      localStorage.setItem("lng", obj.longitude)
      localStorage.setItem("lat", obj.latitude)
      window.location.reload()
    },
    // 退出账户
    quit() {
      localStorage.removeItem('user_id');
      localStorage.removeItem('citychioce');
      localStorage.removeItem('lng');
      localStorage.removeItem('lat');
      this.$router.push({ path: "/login"})
        window.location.reload()
    },

  },
  computed: {
    user_id() {
      return localStorage.getItem('user_id');
    }
  },
  mounted() {
    this.clasname = this.$route.query.claname
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

.nav-cont .router-link-active {
  color: #1fc19a;
}

.nav-lei {
  z-index: 2
}

.head-cont {
  padding-bottom: 30px;
  position: relative;
}

.classify_top {
  line-height: 43px;
  float: left;
  margin-left: 12px;
  font-size: 16px;
  position: relative;
  z-index: 111;
  width: 200px;
  height: 38px;
}

.classify_top2 {
  line-height: 21px;
  float: left;
  margin-left: 12px;
  font-size: 16px;
  margin: auto;
  margin-top: 10px;
  margin-left: 8px;
  border: 1px solid #eee;
  padding: 2px 6px;
  border-radius: 2px;
  cursor: pointer;
  z-index: 1111
}

.classify_ul {
  width: 380px;
  padding: 5px 10px 0 10px;
  background: #fff;
  z-index: 11;
  position: absolute;
  top: 35px;
  left: 8px;
  border: 1px solid #eee;
}

.classify_ul li {
  float: left;
  margin: 0px 10px;
  cursor: pointer
}

.user_top_img {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  vertical-align: middle;
}

.liji {
  line-height: 40px;
}

</style>
