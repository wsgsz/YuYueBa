<template>
  <div class="bes-right ng-scope" ng-controller="allBespokeCtrl">
<!--     <div class="bes-r-cont">
      <h2 class="bes-r-cont-tit">我的预约</h2>
      <ul class="bes-list">
        <li v-for="item in listCmputed(this.$route.params.type)">
          <img alt="">
          <div class="cont">
            <h3 class="bes-cont-cent-tit ng-binding">{{item.user_name}}</h3>
            <div class="bes-jindu">
              <el-rate v-model="value3" disabled>
              </el-rate>
            </div>
          </div>
          <div class="act">
            <span class="see" @click="cases()">查看预约</span>
            <em class="del"></em>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>此功能暂未开放</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog> -->
  </div>
</template>
<script>
import dialogAlert from '@/components/alert/alert'
export default {
  data() {
    return {
      user: "",
      citys: "",
      value3: 22,
      centerDialogVisible: false,
      list: '',
      type: ''
    }
  },
  components: {
    dialogAlert
  },
  methods: {
    cases() {
      this.centerDialogVisible = true
    },
    // 不限量预约
    listCmputed(type) {
      const _this = this;
      return _this.list.filter(function(item) {
      //         console.log(item)
      // console.log("111111111")
        if (type == 'all') {
          return item
        } else {
          return item.order_type == type
        }
      })
    }
  },
  computed: {

  },
  created() {
    const _this = this
    // _this.$post('order/myOrder.php',{
    //     user_id: localStorage.getItem("user_id"),
    //     longitude: localStorage.getItem("lng"),
    //     latitude: localStorage.getItem("lat")
    //   }).then(function(res) {
    //     // console.log(res.data.data)
    //     _this.list = res.data
    //   }),
    //   _this.type = _this.$route.params.type
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css"

</style>
