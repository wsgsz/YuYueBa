<template>
  <div class="hello">
    <div class="head-wp">
      <div class="head-cont clearfix">
        <h1 class="head-logo"><a href="/index">百度预约</a></h1>
        <div class="classify_top">
          {{goodslist}}
        </div>
        <div class="head-search">
          <input type="text" v-model="searchd" placeholder="messagehide" />
          <button @click="tosearch()"></button>
        </div>
      </div>
      <div class="nav-wp clearfix" v-if="messagehide">
        <h3 class="all-fen">· 全部分类</h3>
        <div class="nav-lei">
          <ul class="nav-list">
            <li v-for="rs in classify">
              <router-link :to="'/goods/goodslist/'+rs.classify_id" tag="a" @click="linkClassify(rs.classify_id)"><span class="hd">{{rs.classify_name}}</span><em></em></router-link>
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
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['messagehide', 'searchd'],
  data() {
    return {
      // 分类
      classify: [],
    }
  },
  created() {
    const _this = this;
    // 获取类名
    _this.$post(baseUrl+"classify/queryAllClassify").then(function(response) {
      if (response.message == '成功') {
        _this.classify = response.data;
      } else {
        alert(data.message);
      }
      // console.log(_this.$route.fullPath)
      if (_this.$route.fullPath=="/") {
        _this.message(true)
      } else {
        _this.message(false)
      }
    });
  },
  methods: {

    ...mapMutations([
      'message'
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
      _this.$router.push('/search/' + _this.searchd)
      if (_this.$route.name == 'search') {
        _this.$emit('listsearch', _this.searchd)
      }
    },

  },
  ready() {},
  computed: {
    ...mapState({
      goodslist: state => state.goodslist,
    })
  },
  mounted() {}
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
}

</style>
