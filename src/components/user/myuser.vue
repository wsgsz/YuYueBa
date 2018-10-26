<template>
  <div class="ng-scope right_top">
    <div class="bes-right">
      <div class="">
        <div class="collect_top">
          <span class="collect_top_span">
      个人资料
      <!-- {{user}} -->
    </span>
        </div>
        <ul class="bes-list user-list">
          <li>
            <h3 class="user-tit">头像</h3>
            <div class="user-cont">
              <img v-if="imageUrl" :src="imageUrl" alt="">
              <img v-if="!imageUrl" :src="imgUrl+user.userCompressimg">
            </div>
            <el-upload class="avatar-uploader" :action="baseUrl+'user/updateUserHeadImage'" name="userHeadImage" :show-file-list="false" :on-success="handleAvatarSuccess" :data="imgdata" style="float:right">
              <span class="change-btn" >修改</span>
            </el-upload>
          </li>
          <li>
            <h3 class="user-tit">昵称</h3>
            <div class="user-cont">
              <p class="ng-binding">{{user.userName}}</p>
            </div>
            <span class="change-btn" @click="opennicheng()">修改</span>
          </li>
          <!--    <li>
            <h3 class="user-tit">手机</h3>
            <div class="user-cont">
              <p class="ng-binding">{{user.userPhonenum}}</p>
            </div>
            <span class="change-btn" id="changePhone" @click="openphone()">修改</span>
          </li> -->
       <!--    <li>
            <h3 class="user-tit">登录密码</h3>
            <div class="user-cont">
              <p class="ng-binding">
                <input type="password" value="user.userPassword" readonly="">
              </p>
            </div>
            <span class="change-btn" @click="dialogpassword = true">修改</span>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- 头像 -->
    <!-- 密码修改 弹框 -->
    <!--   <el-dialog title="修改密码" :visible.sync="dialogpassword" width="30%">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogpassword = false">取 消</el-button>
        <el-button type="primary" @click="dialogpassword = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapState, mapMutations, mapActions } from 'vuex'
import qs from 'qs'
export default {
  data() {
    return {
      userId: "",
      baseUrl,
      imgUrl,
      imageUrl: "",
      imgdata: {},
      citys: "",
      dialogFormVisible: false,
      dialognc: false,
      dialogpassword: false,
      // 手机号码 修改
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
      formLabelWidth: '100px'
    }
  },
  methods: {
    ...mapMutations([
      'setuser'
    ]),
    // 昵称
    opennicheng() {
      const _this = this
      this.$prompt(_this.user.userName, '请输入新昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不可为空'
      }).then(({ value }) => {
        _this.$http.post(baseUrl + "/user/updateUserNiceName", qs.stringify({ userId: _this.userId, nickName: value })).then(function(res) {
          _this.user.userName = value
        })
        this.$message({
          type: 'success',
          message: '你的新昵称是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //手机
    opennicheng() {
      const _this = this
      this.$prompt(_this.user.userName, '请修改昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不可为空'
      }).then(({ value }) => {
        _this.$http.post(baseUrl + "/user/updateUserNiceName", qs.stringify({ userId: _this.userId, nickName: value })).then(function(res) {
          _this.user.userName = value
        })
        this.$message({
          type: 'success',
          message: '你的新昵称是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/*';
      const isLt2M = file.size / 1024 / 1024 < 2;


      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
      // return isJPG && isLt2M;
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),

  },
  created() {
    const _this = this
    _this.userId = localStorage.getItem("user_id")
    _this.imgdata = {
      userId: _this.userId
    }
    // _this.$fetch(baseUrl + 'user/userDetailInfo', _this.imgdata).then(function(res) {
    //   _this.user = res.data
    //   console.log(res.data)
    // })
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css"

</style>
