/
<template>
  <div class="right_top">
    <div class="bes-right">
      <div class="">
        <div class="collect_top">
          <span class="collect_top_span">
      我的预约
    </span>
          <router-link tag="div" to="/user/reservation_add" class="addcity_top" @click="addcity()">
            +
          </router-link>
        </div>
        <ul class="bes-list user-list" v-for="(item,index) in data" :key="index">
          <router-link tag="li" :to="{ path:'/information' ,query: { pid:item.publishId }}" v-for="(items, index) in item.appointments" :key="index">
            <img class="img_add" :src="imgUrl+items.appointmentImgUrl" alt="">
            <div class="user-cont">
              <p class="">{{items.appointmentTitle}}</p>
            </div>
            <span class="change-btn change-btn1" @click="revise(index)">修改</span>
            <span class="change-btn" @click="del(index,items.appointmentId)">删除</span>
          </router-link>
        </ul>
        <div v-if="kong" style="width:100%;margin:auto;text-align:center;font-size:18px;margin-top:350px;">
          你暂时还没有预约服务</div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
      imgUrl,
      data: "",
      dialogFormVisible: false,
      dialogadd: false,
      // 手机号码 修改
      form: {},
      kong: false,
      formLabelWidth: '100px',
      add: {
        userId: ""
      }
    }
  },
  methods: {
    revise(id) {
      this.dialogFormVisible = true;
      this.form = this.data[id]
    },
    btn() {
      const _this = this
      _this.$http.post(baseUrl + 'web/updateWeb', qs.stringify(this.form)).then(function(res) {
        if (res.data.status == 200) {
          _this.dialogFormVisible = false;
        }
      })
    },
    del(ind, ite) {
      const _this = this
      _this.$http.get(baseUrl + 'appointment/deleteAppointment?appointmentId='+ite).then(function(res) {
        if (res.data.status == 200) {
          // _this.data.splice(ind, 1)
        }
      })
    },
    addcity() {
      this.dialogadd = true
      // this.add.userId = localStorage.getItem('user_id')
      // this.add.webTitle = ""
      // this.add.webUrl = ""
    },
    addbtn() {
      const _this = this
      _this.$http.post(baseUrl + 'web/addWeb', qs.stringify(this.add)).then(function(res) {
        if (res.data.status == 200) {
          _this.dialogadd = false
          _this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
        }
      })
    }
  },
  created() {
    const _this = this
    _this.$http.get(baseUrl + "appointment/queryAppointmentByUserId?userId="+localStorage.getItem("user_id")+'&type=0').then(function(res) {
      _this.data = res.data.data
      if (res.data.data.length == '0') {
        _this.kong = true
      } else {
        _this.kong = false
      }
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

.img_add {
  width: 65px;
  height: 65px;
}

</style>
