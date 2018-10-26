<template>
  <div class="collect right_top">
    <div class="collect_top">
      <span class="collect_top_span">
      商家中心
    </span>
    </div>
    <ul class="bes-list user-list">
            <li>
            <h3 class="user-tit">服务开关</h3>
            <div class="user-cont">
              <p>请谨慎操作，关闭后，所有服务都将暂停，你不会接受任何订单</p>
            </div>
            <span class="change-btn" style="border:0px;">
            	<el-switch
				  style="display: block"
				  v-model="soldAll"
				  active-value="1"
				  inactive-value="2"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				   @change="soldAllsd($event)">
				</el-switch>
            </span>
          </li>
          <li>
            <h3 class="user-tit">服务管理</h3>
            <div class="user-cont">
              <p>关闭后对应的服务将不在接受预定，请谨慎操作</p>
            </div>
          </li>
         </ul>
  <div class="reservation_b_10 reservation_center"  v-for="(item ,inde) in Business" :key="inde">
      <h2>
     <img src="../../assets/img/new/My-reservation.png" alt="">
     {{ item.publishName}}
    </h2>
       <ul class="list_contetnt_ul">
      <li v-for="(listitem,index) in item.appointments">
        <router-link :to="'/user/Businesstime/'+listitem.appointmentId" tag="a">
          <img :src="imgUrl + listitem.appointmentImgUrl" :alt="listitem.publishName" class="logo">
        </router-link>
        <div class="list_contetnt_lid">
            <div class="list_contetnt_li_title">
              <span class="list_contetnt_li_title_s1">
                   {{ listitem.appointmentTitle}}
                  </span>   
               <router-link :to="'/user/Businesstime/'+listitem.appointmentId" class="list_contetnt_li_goyuyue" >
              查看详情
            </router-link>
          <!--      <div class="list_contetnt_li_goyuyue" @click="detaillink(listitem.publishId,index)">编辑</div> -->
            <div class="list_contetnt_li_goyuyue" @click="detaillink(listitem.appointmentId,inde,index)">
              删除
            </div>
            <div v-if="listitem.appointmentStatus==1" @click="handleChanges(inde,listitem.appointmentId,index)" style="text-align:center;width:60px;" class="el-switch  is-checked"  aria-checked="true">
     <span class="el-switch__core" style="width: 40px; border-color: rgb(19, 206, 102); background-color: rgb(19, 206, 102);"></span>
            </div>
              <div  v-if="listitem.appointmentStatus==2" @click="handleChange(inde,listitem.appointmentId,index)" class="el-switch" style="text-align:center;width:60px;">
            	<span class="el-switch__core" style="width: 40px; border-color: rgb(255, 73, 73); background-color: rgb(255, 73, 73);"></span>
            </div>
           <!--  <el-switch
				  style="width:50px;align-items:baseline"
				  v-model="listitem.appointmentStatus"
				  active-value="1"
				  inactive-value="2"
				  active-color="#13ce66"
				  inactive-color="#ff4949" @change="handleChange($event,listitem.appointmentId,index)">
			</el-switch> -->
            </div>
       
        </div>
      </li>
    </ul>
    </div>
        <div v-if="kong" style="width:100%;margin:auto;text-align:center;font-size:18px;margin-top:350px;">
      你暂时还没有预约服务</div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
      Business: "",
      imgUrl,
      kong: false,
      soldAll:true
    }
  },
  methods: {
  	// 状态改变
  handleChange(event,appointId,index) {
  	   const _this = this
  	   // kaiqi
      	     this.$http.get(baseUrl+'appointment/restartAppointment?appointmentId='+appointId).then(function(res){
      	     		_this.Business[event].appointments[index].appointmentStatus = '1'
       	// console.log(res.data)
       })

      },
      handleChanges(event,appointId,index){
      	   	 const _this = this
      	   	 // guanbi
       _this.$http.get(baseUrl+'appointment/soldOutAppointment?appointmentId='+appointId).then(function(res){
       	_this.Business[event].appointments[index].appointmentStatus = '2'
       	// console.log(res.data)
       })
   },
      detaillink(appointId,index,index2){
      	const _this =this
      	_this.Business[index].appointments.splice(index2,1)
      	_this.$http.get(baseUrl+'appointment/deleteAppointment?appointmentId='+appointId).then(function(res){
      	})
      },
      // 全部服务 下架上架
      soldAllsd(event){
      	const _this =this
      	if(event=='2'){
	this.$http.get(baseUrl+"appointment/soldOutAllAppointment?userId="+localStorage.getItem("user_id")).then(function(res){
			for (var i = _this.Business.length - 1; i >= 0; i--) {
				for (var j = _this.Business[i].appointments.length - 1;j >= 0; j--) {
					console.log(_this.Business[i].appointments[j].appointmentStatus)
					_this.Business[i].appointments[j].appointmentStatus = '2'
				}
			}
      		})
      	}else{
      		this.$http.get(baseUrl+"appointment/restartAllAppointment?userId="+localStorage.getItem("user_id")).then(function(res){
			for (var i = _this.Business.length - 1; i >= 0; i--) {
				for (var j = _this.Business[i].appointments.length - 1;j >= 0; j--) {
					_this.Business[i].appointments[j].appointmentStatus = '1'
				}
			}
      		})
      	}
      }
  },

  created() {
    const _this = this
    this.$http.get(baseUrl + "publish/getPublishAndAppointmentOfManage?userId="+localStorage.getItem('user_id')).then(function(res) {
    	console.log(res.data.data)
      _this.Business = res.data.data
      if (_this.Business.length == 0) {
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
@import '../../assets/css/list.css';
.list_contetnt_li_goyuyue {
  background: transparent;
  color: #333;
  border: 1px solid #999999;
  margin-right: 15px;
  line-height: 30px;
  height: 30px;
}


</style>
