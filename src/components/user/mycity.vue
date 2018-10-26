<template>
  <div class="ng-scope right_top">
    <div class="bes-right">
      <div class="">
        <div class="collect_top">
          <span class="collect_top_span">
      我的地址
    </span>
          <div class="addcity_top" @click="addcity()">
            +
          </div>
        </div>
        <ul class="bes-list user-list">
          <li v-for="(item, index) in data" :key="index">
            <h3 class="user-tit">{{item.addressAlias}}</h3>
            <div class="user-cont">
              <p class="">{{item.addressName}}</p>
            </div>
            <span class="change-btn" @click="del(index,item.destinationId)">删除</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
export default {
  data() {
    return {
      data: "",
    }
  },
  methods: {
    del(index,obj){
      const _this = this
      _this.$http.get(baseUrl+"destination/deleteDestination?id="+obj).then(function(res){
        if(res.status == "200"){
          _this.data.splice(index,1)
        }
      })
    },
    addcity(){
      this.$router.push('/hadmap')
    }
  },
  created() {
    const _this = this
    _this.$http.get(baseUrl+'destination/queryAllDestination?userId='+localStorage.getItem('user_id')).then(function(res) {
      console.log(res.data)
      _this.data = res.data.data
    })
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.addcity {
  display: block;
  text-align: center;
  padding: 18px;
  cursor: pointer;
  border-top: 1px #e5e5e5 solid
}

.user-list li .user-tit {
  border-right: 0px;
}

.change-btn1 {
  margin-right: 20px;
}
.user-tit,.user-cont{
white-space:nowrap; 
text-overflow:ellipsis; 
-o-text-overflow:ellipsis; 
overflow: hidden; 
text-align: left !important;
}
</style>
