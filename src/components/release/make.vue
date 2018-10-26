<template>
  <div class="bes-right">
    <div class="bes-r-cont">
      <h2 class="bes-r-cont-tit">全部</h2>
      <ul class="bes-list fa-list block">
        <li v-for="(item,index) in list" :key="index">
          <img :src="item.imageURL" alt="" />
          <div class="cont">
            <h3 class="bes-cont-cent-tit">{{item.publish_name}}</h3>
          </div>
          <p class="ji-zz" v-show="item.status == 1">进行中</p>
          <p class="ji-zz" v-show="item.status == 0">已结束</p>
          <div class="acmt">
            <div>
              <span class="act-edit-btn" @click="compile(item.publish_id)">编辑</span>
              <span class="act-detail-btn" @click="makedetail(item.publish_id)">查看详情</span>
              <span class="act-shear-btn">分享</span>
              <span class="act-del-btn" @click="makedel(index,item.publish_id)">删除</span>
              <span class="act-start-btn" @click="maketog(index,item.publish_id ,item.status)">开启/停用</span>
            </div>
            <div class="share-alert">
              <em class="up"></em>
              <p>微信扫描二维码，分享预约到朋友圈呼朋唤友前来看，生活更快更简单！</p>
              <div><img src="img/ewm.png" alt="" /></div>
            </div>
          </div>
        </li>
      </ul>
 <!--      <el-pagination background layout="prev, pager, next" :total="2" :page-size="1">
      </el-pagination> -->
    </div>
 <!--    <el-dialog title="个人资料" :visible.sync="dialogfabu">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="个人昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogfabu = false">取 消</el-button>
        <el-button type="primary" @click="dialogfabu = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import qs from "qs"
export default {
  data() {
    return {
      user: "",
      citys: "",
      item: "",
      lat: "",
      lng: "",
      user_id: "",
      list: '',
      dialogfabu: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },

  created() {
    const _this = this;
    _this.$post("utils/location.php", { ip: returnCitySN['cip'] }).then(function(response) {
      _this.lat = response.data.result.location.lat;
      _this.lng = response.data.result.location.lng;
      _this.user_id = localStorage.getItem('user_id');
      _this.hqfb();
    });
  },
  methods: {
    // 获取列表
    hqfb() {
      const _this = this;
      _this.$post("publish/myPublish.php", {
        user_id: _this.user_id,
        page: 1
      }).then(function(response) {
        _this.list = response.data
        console.log(_this.list)
      })
    },
    // 开启停用
    maketog(idnex, id, stats) {
      stats == 0 ? stats = 1 : stats = 0;
      const _this = this;
      _this.$post("publish/updateStatus.php", {
        publish_id: id,
        status: stats
      }).then(function(response) {
        _this.list[idnex].status = stats
      }, function(err) {})
    },
    // 删除
    makedel(idnex, id) {
      const _this = this
      _this.$post('publish/delete.php', {
        publish_id: id
      }).then(function(res) {
        _this.list.splice(idnex, 1)
        console.log(res)
      })
    },
    // 编辑
    compile(obj) {
      this.$router.push({ path: '/information?id=' + obj, query: { plan: obj } })
      // this.$router.push('/information')
      // this.dialogfabu = true
    },
    //查看详情
    makedetail(obj) {
      this.$router.push({ path: '/detail/' + obj })

    }
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css"

</style>
