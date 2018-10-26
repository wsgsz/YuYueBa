<template>
  <div class="login">
    <div class="wrap" ng-app="myApp">
      <div class="load-ad">&nbsp;</div>
      <div class="load-box">
        <h3 style="margin-bottom:20px;"><span>账号登录</span> 
        </h3>

  <el-form   :model="ruleForm" ref="dynamicValidateForm"  class="demo-ruleForm">
  <el-form-item  prop="userPhonenum" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
    <el-input type="text" v-model="ruleForm.userPhonenum" auto-complete="off"></el-input>
  </el-form-item>
   <el-form-item  prop="userPassword"  :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
    <el-input type="password" v-model="ruleForm.userPassword"  v-on:keyup.enter="submitForm('dynamicValidateForm')" auto-complete="off"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')" style="width:100%">提交</el-button>
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>

    <!--   <button class="load-submit" @click="greet('ruleForms')" style="margin-top:0px;">登录</button> -->
        </el-form>

<!-- 
       <input type="text" class="print load-name" v-model="username"  placeholder="手机号" />
        <input type="password" class="print load-password" v-model="password" placeholder="密码" /> -->
    
        <div class="noreg-tip">还没有账号？<a @click="dialogVisible = true">免费注册</a></div>
      </div>
    </div>
    <div class="" style="clear:both;margin-bottom:50px"></div>
<el-dialog
  title="请下载APP注册账号"
  :visible.sync="dialogVisible"
  width="20%"
center>
  <span>
     <img src="../../assets/img/new/erweima.png" alt="" style="width:120px;margin:auto;display:block">
  </span>

</el-dialog>

  </div>
</template>
<script>
// import { required, minLength, between } from 'vuelidate/lib/validators'
// import { mapState } from 'vuex'
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
        ruleForm: {
          userPhonenum: '',
          userPassword: '',
        },
      dialogVisible:false,
      msg: 'Welcome to Your Vue.js App',
      text: '',
      password: '',
      username:''
    }
  },

  methods: {
     submitForm(formName) {
      const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
       _this.$http.post(baseUrl + "user/userLogin",qs.stringify(_this.ruleForm)).then(function(response) {
        if (response.data.status == '200') {
          localStorage.setItem('user_id', response.data.data.userId);
          _this.$router.push('/')
        } else {
          alert('账号或密码错误');
          // window.location.reload()
        }
      });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
  created() {
    // console.log("11111111111")
  }
}

</script>
<style scoped>
@import "../../assets/css/main.css";

</style>
