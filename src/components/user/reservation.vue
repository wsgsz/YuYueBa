<template>
  <div class="reservation right_top">
    <div class="reservation_top_five reservation_b_10">
      <ul>
        <li :class="{on:act == 0}" @click="userResevation(userId, 0)">
          全部预约
        </li>
        <li :class="{on:act == 1}" @click="userResevation(userId, 1)">
          已预约
        </li>
        <li :class="{on:act == 2}" @click="userResevation(userId, 2)">
          进行中
        </li>
        <li :class="{on:act == 3}" @click="userResevation(userId, 3)">
          待评分
        </li>
        <li :class="{on:act == 4}" @click="userResevation(userId, 4)">
          已完成
        </li>
        <li :class="{on:act == 5}" @click="userResevation(userId, 5)">
          已取消
        </li>
      </ul>
    </div>
    <div class="reservation_b_10 reservation_center" v-for="(lisitem,index) in data">
      <h2>
     <img src="../../assets/img/new/My-reservation.png" alt="">
      {{lisitem.publishName}}
    </h2>
      <div class="reservation_center_con">
        <ul class="yy-list" style="">
          <li v-for="(orlList,oindex) in lisitem.orderDetailList">
            <img v-lazy="imgUrl + orlList.appointmentImgUrl" alt="" style="border:1px solid #eee" />
          <div class="right_li">
              <div class="iyy" style="  justify-content: flex-start">
              <p class="tit">{{orlList.appointmentTitle}}</p>
              <p class="tcont" style="margin:0px">预约号:{{orlList.timeNumber}}</p>
              <p class="tcont" style="margin:0px">预约时间：{{orlList.orderCreateTime}}</p>
            </div>
            <div class="yy-btn_heih">
              <div class="yy-btn_heih_jxz" v-if="orlList.orderType =='1'">已预约</div>
              <div class="yy-btn_heih_jxz" v-if="orlList.orderType =='2'">进行中</div>
              <div class="yy-btn_heih_jxz" v-if="orlList.orderType =='3'">待评价</div>
              <div class="yy-btn_heih_jxz" v-if="orlList.orderType =='4'">完成</div>
              <div class="yy-btn_heih_jxz" v-if="orlList.orderType =='5'">取消</div>
              <div style="width:100%;float:right">
               <div  v-if="orlList.orderType =='1'">
                  <div class="yy-btn_heih_left" @click="alertContact(lisitem)">
                  联系达人
                </div>
                   <div class="yy-btn_heih_right" @click="cancelAppointment(orlList.orderId,orlList.timeId,index,oindex)">
                  取消预约
                </div>
              </div>
               <div  v-if="orlList.orderType =='2'">
              
              </div>
              <div  v-if="orlList.orderType =='3'">
               <div class="yy-btn_heih_right" @click="assessAppointment(orlList.orderId,orlList.timeId,index,oindex,lisitem.publishId)" >
                  服务评分
                </div>
              </div>
              <div  v-if="orlList.orderType =='4'">
               <div class="yy-btn_heih_right" @click="score(orlList.score)" >
                  查看评分
                </div>
              </div>
              <div  v-if="orlList.orderType =='5'">
              <router-link :to="{ path:'/goods/tmake/'+orlList.appointmentId, query: { pid:lisitem.publishId,city:lisitem.address}}"  tag='div' class="yy-btn_heih_right"> 重新预约</router-link>
           <!--  <router-link v-if="data.status == 1" :to="{ path:'/goods/tmake/'+item.appointmentId, query: { pid:lisitem.publishId,city:orlList.address}}" class="yy-btn" tag="span"> -->
              </div>
              </div>
            </div>
          </div>
            <div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="kong" style="width:100%;margin:auto;text-align:center;font-size:18px;margin-top:350px;">
      你暂时还没有预约服务</div>
    <el-dialog title="联系方式" :visible.sync="dialogVisible" width="20%">
      <span v-for="items in contacts">
      <span v-if="items.contactType == 1" style="display:block;text-align:center">QQ：{{items.contactNum}}</span>
      <span v-if="items.contactType == 2" style="display:block;text-align:center">微信：{{items.contactNum}}</span>
      <span v-if="items.contactType == 3" style="display:block;text-align:center">手机：{{items.contactNum}}</span>
      <span v-if="items.contactType == 4" style="display:block;text-align:center">座机电话：{{items.contactNum}}</span>
      </span>
      <span v-if="contacts.length=='0'">暂无联系方式</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!-- pingjia -->
    <el-dialog title="提示" :visible.sync="dialograte" width="20%">
       <el-rate v-model="rate" style="text-align:center"></el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialograte = false">取 消</el-button>
    <el-button type="primary" @click="btn()">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogratedis" center width="20%">
       <el-rate v-model="rate" style="text-align:center" disabled></el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogratedis = false">取 消</el-button>
    <el-button type="primary" @click="dialogratedis = false">确 定</el-button>
  </span>
    </el-dialog>

    <!-- 查看评分 -->
<!--     <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->

  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState, mapMutations } from 'vuex'
import qs from 'qs'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogratedis:false,
      dialograte: false,
      rate:null, //评分
      contacts: "", //联系方式
      data: "",
      imgUrl,
      act: 0,
      userId: "",
      kong: false,
    }
  },
  computed: {},
  methods: {
    ...mapMutations([
      'message'
    ]),
    userResevation(userid, type) {
      console.log(type)
      const _this = this
      _this.act = type
      this.$http.get(baseUrl + 'order/getUserAllOrder?userId='+userid+'&orderType='+type).then(function(res) {
        _this.data = res.data.data
        console.log(res.data.data)
        console.log("12")
        if (res.data.data.length == 0) {
          _this.kong = true
        } else {
          _this.kong = false
        }
      })
    },
    // 联系方式
    alertContact(obj) {
      this.dialogVisible = true
      this.contacts = obj.contacts
      console.log(this.contact)
    },
    // 取消预约
    cancelAppointment(orderId, timeID, Pindex, oindex) {
      const _this = this
      _this.$http.post(baseUrl + "order/cancelAnAppointment", qs.stringify({ orderId: orderId, timeId: timeID })).then(function(res) {
        console.log(Pindex, oindex)
        _this.data[Pindex].orderDetailList.splice(oindex, 1)
      })
    },
    // 评价
    assessAppointment(orderId, timeID, Pindex, oindex) {
      const _this = this
      _this.dialograte = true
     _this.orderId = orderId
     _this.timeID = timeID
     _this.Pindex = Pindex
     _this.oindex= oindex
      // _this.$post(baseUrl + "order/evaluateAnAppointment", { orderId: orderId, timeId: timeID }).then(function(res) {
      //   console.log(res)
      //   console.log(Pindex, oindex)
      //   _this.data[Pindex].orderDetailList.splice(oindex, 1)
      // })
      _this.data[Pindex].orderDetailList.splice(oindex, 1)
    },
   Rescheduling(timeId,pid,appointmentId,orderNote,orderNumber){

      const _this = this
      // const formss = {
      //   timeId:timeId,
      //   publishId:pid,
      //   userId:localStorage.getItem("user_id"),
      //   appointmentId:appointmentId,
      //   orderNote:orderNote,
      //   orderNumber
      // }
      // _this.$http.post(baseUrl+'order/makeAnAppointment',qs.stringify(formss)).then(function(res){
      //  if(res.data.status=="200"){

      //   }
      // })
   },
    score(obc){
      this.dialogratedis=true;
      this.rate = obc
    },
    btn(){
      const _this = this
      _this.dialograte = true;
      console.log(_this.rate)
       _this.$http.post(baseUrl + "order/evaluateAnAppointment", qs.stringify({orderId: _this.orderId, timeId: _this.timeID,score:_this.rate})).then(function(res) {
        // console.log(res)
        if(res.data.status == "200"){
           _this.data[_this.Pindex].orderDetailList.splice(_this.oindex, 1)
            _this.dialograte = false
         }else{

         }
        // console.log(Pindex, oindex)
       
      })
    }
  },

  created() {
    this.userId = localStorage.getItem('user_id');
    console.log(this.userId)
    this.message(false)
    this.userResevation(this.userId, 0)
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
@import "../../assets/css/detail.css";

</style>
