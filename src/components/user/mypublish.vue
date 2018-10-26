<template>
  <div class="reservation right_top">
    <div class="reservation_top_five reservation_b_10">
      <ul>
        <li :class="{on:act == 0}" @click="statu(0)">
          全部
        </li>
        <li :class="{on:act == 1}" @click="statu(1)">
          显示中
        </li>
        <li :class="{on:act == 2}" @click="statu(2)">
          暂停服务
        </li>
     <!--    <li :class="{on:act == 3}" @click="statu(3)">
          已删除
        </li> -->
      </ul>
    </div>
    <div class="reservation_b_10 reservation_center">
      <!--    <h2>
     <img src="../../assets/img/new/My-reservation.png" alt="">
      河南预之优
    </h2> -->
      <div class="reservation_center_con">
        <ul class="yy-list" style="">
          <li v-for="(item,index) in data" :key="index">
            <router-link tag="a" :to="'/goods/goodsdetail/'+item.publishId">
              <img v-lazy="imgUrl + item.imageUrl" alt="" style="border:1px solid #eee;top:15px;" />
            </router-link>
                  <div class="right_li" style="margin-top:20px;">
            <div class="iyy" style="  justify-content: flex-start;width:100%">
              <router-link tag="a" :to="'/goods/goodsdetail/'+item.publishId">
                <div class="tit clearboth">
                  <div class="tit1">{{item.publishName}}</div>
                  <div class="tit2" v-if="item.status == 1">
                    显示中
                  </div>
                  <div class="tit2" v-if="item.status == 2">
                    已下架
                  </div>
                  <div class="tit2" v-if="item.status == 3">
                    删除
                  </div>
                </div>
              </router-link>
              <p class="tcont" style="margin:6px 0 0 0 ">发布于{{item.addTime}}</p>
              <div class="right_tcont" v-if="item.status == 1">
                <div class="right_diuv nth1" @click="delatepub(2,item.publishId,index)">
                  停止展示
                </div>
                <!--  <div class="right_diuv">
                  编辑
                </div> -->
                <div class="right_diuv" @click="delatepub(3,item.publishId,index)">
                  删除
                </div>
              </div>
              <div class="right_tcont" v-if="item.status == 2">
                <div class="right_diuv nth1" @click="delatepub(1,item.publishId,index)">
                  重新展示
                </div>
                <!--    <div class="right_diuv">
                  编辑
                </div> -->
                <div class="right_diuv" @click="delatepub(3,item.publishId,index)">
                  删除
                </div>
              </div>
              <div class="right_tcont" v-if="item.status == 3">
              </div>
            </div>
            </div>
          </li>
        </ul>
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
      act: "1",
      kong: false,
      data: ""
    }
  },
  methods: {
    delatepub(obj, pid, index) {
      const _this = this
      _this.$http.post(baseUrl + "publish/updatePublishStatus", qs.stringify({ publishId: pid, publishStatus: obj })).then(function(res) {
        if (res.status == "200") {
          if (obj == 1) {
            if (_this.act == 2) {
              _this.data.splice(index, 1)
            } else {
              _this.data[index].status = 1
            }
          } else if (obj == 2) {
            if (_this.act == 1) {
              _this.data.splice(index, 1)
            } else {
              _this.data[index].status = 2
            }
          } else if (obj == 3) {
            _this.data.splice(index, 1)
          } else {
            _this.data.splice(index, 1)
          }
        } else {
          alert(res.message)
        }
        console.log(res)
      })
    },
    statu(statud) {
      const _this = this
      const obj = {
        userId: localStorage.getItem('user_id'),
        statusId: statud
      }
      _this.act = statud
      this.$http.get(baseUrl + 'publish/getPublishOfManage?userId='+localStorage.getItem('user_id')+'&statusId'+statud).then(function(res) {
        _this.data = res.data.data
        if (res.data.length == 0) {
          _this.kong = true
        } else {
          _this.kong = false
        }
      })
    },
    del(ind, ite) {
      const _this = this
      _this.$http.post('https://www.baiduyuyue.com/baiduyuyue/publish/delete.php', qs.stringify({ publish_id: ite })).then(function(res) {

        if (res.data.status == 200) {
          _this.data.splice(ind, 1)
        } else {
          alert("删除失败")
        }
      })
    },
  },
  created() {
    this.statu(0)
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
@import "../../assets/css/detail.css";
.right_tcont {
  display: block;
  width: 100%;
  overflow: hidden;
  height: 40px;
}

.right_diuv {
  width: 90px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
  float: right;
  border: 1px solid #e5e5e5;
  margin-right: 20px;
}

.right_diuv:nth-child(1) {
  margin-right: 0px;
}

.iyy .tit {
  position: relative;
}

.iyy .tit1 {
  margin-right: 100px;
}

.iyy .tit2 {
  width: 100px;
  text-align: right;
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 18px;
  color: #046738
}
/*.reservation_center{
  height: 1168px;
  overflow: scroll;
}*/
</style>
