<template>
  <div>
    <div class="bes-right ng-scope" ng-controller="releaseList">
      <div class="bes-r-cont">
        <!-- <h2 class="bes-r-cont-tit ng-hide" ng-show="2 == 1">进行中</h2> -->
        <div class="block" style="margin-top:10px;">
          <span class="demonstration" style="font-size:24px">选择时间</span>
          <el-date-picker v-model="value" type="datetimerange" start-placeholder="开始日期" format="yyyy-MM-dd-HH" value-format="yyyy-MM-dd-HH" @change="changse()" end-placeholder="结束日期" :default-time="['12:00:00']">
          </el-date-picker>
        </div>
        <ul class="bes-list yuyue-list">
          <li>
            <div class="yy-l">
              <p>序号：BD001</p>
              <p>时间段：06:00-08:00</p>
              <p>位置：1楼105号8人桌</p>
            </div>
            <div class="yy-mid">
              <p>姓名：李先生</p>
              <p>联系方式:13838931234</p>
              <p>备注：需要儿童座椅</p>
            </div>
            <div class="yy-r">
              <p>时间：11-30 09:30</p>
            </div>
          </li>
          <li>
            <div class="yy-l">
              <p>序号：BD001</p>
              <p>时间段：06:00-08:00</p>
              <p>位置：1楼105号8人桌</p>
            </div>
            <div class="yy-mid">
              <p>姓名：李先生</p>
              <p>联系方式:13838931234</p>
              <p>备注：需要儿童座椅</p>
            </div>
            <div class="yy-r">
              <p>时间：11-30 09:30</p>
            </div>
          </li>
          <li>
            <div class="yy-l">
              <p>序号：BD001</p>
              <p>时间段：06:00-08:00</p>
              <p>位置：1楼105号8人桌</p>
            </div>
            <div class="yy-mid">
              <p>姓名：李先生</p>
              <p>联系方式:13838931234</p>
              <p>备注：需要儿童座椅</p>
            </div>
            <div class="yy-r">
              <p>时间：11-30 09:30</p>
            </div>
          </li>
        </ul>
        {{count1}}
        <div class="page" @click="add()">
          <a href="###">上一页</a>
          <a href="###" class="on">1</a>
          <a href="###">2</a>
          <a href="###">3</a>
          <a href="###">4</a>
          <a href="###">5</a>
          <a href="###">6</a>
          <a href="###">7</a>
          <a href="###">8</a>
          <a href="###">9</a>
          <a href="###">下一页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: "",
      citys: "",
      value: ""
    }
  },
  methods: {
    changse() {
      alert(this.value)
    },
    add(){
      this.$store.commit('add')
    }
  },
  created() {
    console.log(this.$store)
   this.$store.commit('increment')
  },
  computed: {

    count1() {
      return this.$store.state.count
    }
  },

  // computed: mapState({
  //   // 箭头函数可使代码更简练
  //   count: state => state.count,

  //   countPlusLocalState(state) {
  //     return state.count +state.localCount
  //   }
  // })


}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.block {
  display: flex;
  justify-content: space-between;
}

</style>
