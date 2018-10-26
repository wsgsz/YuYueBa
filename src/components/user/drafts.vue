<template>
  <div class="reservation right_top">
    <div class="collect_top">
      <span class="collect_top_span">
      草稿箱
    </span>
    </div>
    <div class="reservation_b_10 reservation_center">
      <div class="reservation_center_con">
        <ul class="yy-list" style="">
          <li v-for="(item,index) in data" :key="index">
            <img v-lazy="imgUrl + item.imageUrl" alt="" style="border:1px solid #eee;top:15px;" />
              <div class="right_li" style="margin-top:20px;">
            <div class="iyy" style="  justify-content: flex-start">
              <div class="tit">
                <div class="tit1">{{item.publishName}}</div>
              </div>
              <p class="tcont" style="margin:6px 0 0 0 ">发布于{{item.addTime}}</p>
              <div class="right_tcont" style="position:absolute;top:55px;">
                <div class="right_diuv nth1" @click="senddra(item.publishId,index)">
                  发布
                </div>
                <!-- <div class="right_diuv">
                  编辑
                </div> -->
                <div class="right_diuv" @click="deldra(item.publishId,index)">
                  删除
                </div>
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
      kong: "",
      data: ""
    }
  },
  methods: {
    senddra(obj, index) {
      const _this = this
      _this.$http.post(baseUrl + 'publish/updatePublishStatus', qs.stringify({
        publishId: obj,
        publishStatus: 1
      })).then(function(res) {
        if (res.data.status == 200) {
          alert("发布成功")
          _this.data.splice(index, 1)

        } else {
          alert('删除失败')
        }
      })
    },
    deldra(id, index) {

      const _this = this
      this.$http.post(baseUrl+'deletePublishOfDrafts', qs.stringify({
        publishId: id
      })).then(function(res) {
        if (res.data.status == 200) {
          _this.data.splice(index, 1)
          alert("删除成功")
        } else {
          alert('删除失败')
        }
      })

    }
  },
  created() {
    const _this = this
    this.$http.get(baseUrl + 'publish/getPublishOfManage?userId='+localStorage.getItem('user_id')+'&statusId='+4).then(function(res) {
      _this.data = res.data.data
      console.log(res.data)
      if (res.data.length == 0) {
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

</style>
