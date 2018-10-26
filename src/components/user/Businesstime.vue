<template>
  <div class="timeMake">
    <div class="yu-res-cont" v-if="active==false">
      <div class="yu-res-nav" style="justify-content: space-between;">
        <dl class="res-nav-list">
          <dt class="res-l"></dt>
          <dd :class="{ on:activeindex == index}" v-for="(item,index) in timeDate" :key="index" 
          @click="activetime(index,item.timeDateAll)">
            <p>{{item.weekName}}</p>
            <p>{{item.timeDate}}</p>
          </dd>
          <dt class="res-r"></dt>
        </dl>
        <div class="img_right"></div>
      </div>
    </div>
    <div class="yu-res-cont" style="border-top:0px;" v-if="active==false">
      <ul class="content_ul">
        <li class="can"
		:class="{keyuyue:item.timeType == 1,
			yibeiyuyue:item.timeType == 2,
			jinxingzhong:item.timeType == 3,
			yiwancheng:item.timeType == 4,
			zantingyuyue:item.timeType == 5,
			daipingjia:item.timeType == 6,}"
         v-for="(item,index) in nowtime" @click="detailAppointment(item)">
          <div class="content_ul_top">
            <span> {{item.timeNumber}} {{item.timeStart}}</span>
            <span v-if="item.timeType == 1">暂无预约</span>
            <span v-if="item.timeType == 2">已被预约</span>
            <span v-if="item.timeType == 3">服务进行中</span>
            <span v-if="item.timeType == 4">服务已完成</span>
            <span v-if="item.timeType == 5">暂停预约</span>
            <span v-if="item.timeType == 6">待评价</span>
          </div>
          <img src="../../assets/img/new/keyuyue.png" v-if="item.timeType == 1" alt="">
          <img src="../../assets/img/new/yibeiyuyue.png" v-if="item.timeType == 2" alt="">
          <img src="../../assets/img/new/jinxingzhong.png" v-if="item.timeType == 3" alt="">
          <img src="../../assets/img/new/yiwancheng.png" v-if="item.timeType == 4" alt=""> 
          <img src="../../assets/img/new/zantingyuyue.png" v-if="item.timeType == 5" alt="">
          <img src="../../assets/img/new/daipingjia.png" v-if="item.timeType == 6" alt="">
          <div class="content_ul_top_span">查看性情</div>
        </li>
        <li style="border:0px" @click="add(cart.appointmentId)">

        	<img src="../../assets/img/new/icon_add.png" alt="" style="width:100%">
        </li>
      </ul>
    </div>
    <el-dialog
  title="添加时间段"
  :visible.sync="dialogVisible"
  width="20%" center>

<el-form label-width="80px">
  <el-form-item label="日期">
    <el-input v-model="timeDateAll" readonly style="margin-bottom:20px;"></el-input>
 	</el-form-item>
 	  <el-form-item label="服务时长">
 <el-input v-model="cart.timeDuration" readonly style="margin-bottom:20px;"></el-input>
</el-form-item>
 <el-form-item label="选择时间">
  <el-time-picker
    v-model="businessDateList"
    value-format="HH:mm:ss"
  	format="HH:mm:ss"
    placeholder="任意时间点" style="margin:auto;margin-bottom:20px;width:100%">
  </el-time-picker>
   <el-button @click="dialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="addtime(cart.appointmentId,businessDateList,cart.timeDuration)">立即创建</el-button>
  </el-form-item>
</el-form>
<!-- 	<el-date-picker
      v-model="businessDateList"
     value-format="yyyy-MM-dd"
     format="yyyy-MM-dd"
     type="date"
     @change="addtime(cart.appointmentId,$event)"
      placeholder="选择日期" style="margin:auto;margin-bottom:340px;">
    </el-date-picker> -->
</el-dialog>
    <!-- 步骤2 -->
 <div class="w1200px" v-if="active==true">
      <div class="yu-res-cont yu-res-cont2">
        <img v-lazy="imgUrl+cart.appointmentImgUrl" alt="">
        <div class="yu-res-cont2_div">
          <span class="title">{{cart.appointmentTitle}}</span>
          <span class="span">预约编号：{{thisact.timeNumber}}</span>
          <span class="span">订单编号：{{thisact.timeOrderNumber}}</span>
          <span class="span">服务时间：{{thisact.timeStart}}</span>
           <span class="span">备注：{{thisact.timeStart}}</span>
        </div>
      </div>
 <!--      <h2 style="margin-bottom:30px;margin-left:4px;">备注</h2>
      <textarea name="" :readonly="readonly" v-model="orderNote" id="" rows="10" placeholder="请填写备注信息。。。" class="text_area"></textarea> -->
      <div class="btn_div" >
        <button v-if="thisact.timeType == 1" @click="soldOutAppointment(thisact.timeId,$event)">暂停服务</button>
        <button v-if="thisact.timeType == 5"  @click="restartAppointment(thisact.timeId,$event)">开启服务</button>
          <button @click="reloads()">完成</button>
      </div>
    </div> 

  </div>
</template>
<script>

import { mapState } from 'vuex'
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  name: 'timeMake',
  data() {
    return {
      imgUrl,
      activeindex: 0,
      timeDate: '',
      nowtime: '',
      activefourtime: "",
      cart: "",
      orderNote: "",
      timeId: '',
      pid: "",
      active:false,
      thisact:"",
      businessDateList:'',
      dialogVisible:false,
      timeDateAll:""
    }
  },
  computed: {
    // ...mapState({
    //   city: state => state.city,
    // })
  },
  methods: {
  	detailAppointment(e){
  		this.active = true
  		this.thisact = e
  		console.log(e)
  	},
    activetime(obj,timeDateAll) {
      this.activeindex = obj
      this.timeDateAll = timeDateAll
      this.nowtime = this.timeDate[obj].times
      console.log(obj)
    },
    // 下架服务
    soldOutAppointment(appointId,event){
    	const _this = this 
    	_this.$http.post(baseUrl+"time/updateTimeStatus",qs.stringify({
    		timeId:appointId,
    		timeStatus:"5"
    	})).then(function(res){
    	_this.thisact.timeType = 5
    	})
    },
    restartAppointment(appointId,event){
    	const _this = this 
    	_this.$http.post(baseUrl+"time/updateTimeStatus",qs.stringify({
    		timeId:appointId,
    		timeStatus:"1"
    	})).then(function(res){
    		_this.thisact.timeType = 1
    	})
    },
    add(appointId){
    	this.dialogVisible = true
    },
    addtime(appointId,event,timeDuration){
      alert(event)
    	const _this = this
    	_this.$http.post(baseUrl+'time/createTime',qs.stringify({
    		timeDate:_this.timeDateAll,
    		appointmentId:appointId,
    		timeStart:event,
    		timeDuration:timeDuration
    	})).then(function(res){
    		if(res.data.status == 200){
			  	_this.$message({
	          message: '恭喜你,添加成功',
	          type: 'success'
	        });
	        setTimeout(_this.test, 1000);
				_this.dialogVisible = false
		}else{
			_this.$message({
	          message: '添加失败了',
	          type: 'error'
	        });
		_this.dialogVisible = false
		}
  
    	})
    	},
    	test(){
			window.location.reload()
    	},
    	reloads(){
    		window.location.reload()
    	}
  },
  created() {
    const _this = this
    _this.pid = this.$route.params.appointId
    _this.$http.get(baseUrl + "time/queryAllTimeAfterNow?appointmentId="+ _this.pid).then(function(res) {
    	console.log(res.data.data);
    	_this.timeDateAll = res.data.data[0].timeDateAll
      _this.timeDate = res.data.data;
      console.log(res.data.data)
      _this.nowtime = _this.timeDate[0].times
    })
      _this.$http.get(baseUrl + "appointment/getAppointmentDetail?appointmentId="+_this.pid).then(function(res) { 
      _this.cart = res.data.data
    })
  }
}
</script>
<style scoped>
@import "../../assets/css/main.css";
/*已被预约*/
.yibeiyuyue .content_ul_top{
	background: #c55054 !important;
	margin-bottom: 40px;
}
.yibeiyuyue .content_ul_top_span{
	color:  #c55054 !important;
    border: 1px solid  #c55054 !important
}
/*已完成*/
.yiwancheng .content_ul_top{
	background: #f29c9f !important;
	margin-bottom: 40px;
}
.yiwancheng .content_ul_top_span{
	color:  #f29c9f !important;
    border: 1px solid  #f29c9f !important
}
/* 进行中*/
.jinxingzhong .content_ul_top{
	background: #70bb2b !important;
	margin-bottom: 40px;
}
.jinxingzhong .content_ul_top_span{
	color:  #70bb2b !important;
    border: 1px solid  #70bb2b !important
}
/* 可预约*/
.keyuyue .content_ul_top{
	background: #f5c55d !important;
	margin-bottom: 40px;
}
.keyuyue .content_ul_top_span{
	color:  #f5c55d !important;
    border: 1px solid  #f5c55d !important
}
/* 暂停预约*/
.zantingyuyue .content_ul_top{
	background: #999999 !important;
	margin-bottom: 40px;
}
.zantingyuyue .content_ul_top_span{
	color:  #999999 !important;
    border: 1px solid  #999999 !important
}
/* 带评价*/
.daipingjia .content_ul_top{
	background: #71c69c !important;
	margin-bottom: 40px;
}
.daipingjia .content_ul_top_span{
	color:  #71c69c !important;
    border: 1px solid  #71c69c !important
}
</style>
