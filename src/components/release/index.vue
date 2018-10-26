<template>
  <div id="release">

    <div class="bes-cont clearfix">
      <div class="bes-left">
        <h2>发布管理</h2>
        <ul>
          <li>
            <dl>
              <dt>发布管理</dt>
              <dd>
                <router-link to="/release/make/1"><span>进行中</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/release/make/2"><span>已结束</span><em></em></router-link>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>预约列表</dt>
              <dd>
                <router-link to="/release/yuyue/1"><span>进行中</span><em></em></router-link>
              </dd>
              <dd>
                <router-link to="/release/yuyue/2"><span>已完成</span><em></em></router-link>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>

import qs from "qs"
export default {
  data() {
    return {
      user: "",
      citys: "",
      name: "",
      type: '',

    }
  },

  methods: {

  },
  mounted() {
    console.log(this.$route)
    this.$post("user/login.php", { user_phoneNum: this.text, user_password: this.password }).then(function(response) {
      console.log(response.data)
      if (response.data.message == '成功') {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_phoneNum', response.data.user_phoneNum);
        localStorage.setItem('user_name', response.data.user_name);
        localStorage.setItem('user_img', response.data.user_headImg);
        _this.$router.push({ path: '/' });
      } else {
        alert(data.message);
      }
    });

  },
  created() {}
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.router-link-active {
  background-color: #1fc19a;
  color: #fff;
}

</style>
