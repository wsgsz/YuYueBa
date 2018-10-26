<template>
  <div id="app">
  <!--   <topheader></topheader>
    <headertop :messagehide='messagehide'></headertop> -->
   
      <router-view></router-view>
   
    <div class="foter">
      <div class="footer-nav clearfix">
        <ul>
          <li>
            <dl>
              <dt>预约导航</dt>
              <dd><a href="###">附近推荐</a></dd>
              <dd><a href="###">限时优惠</a></dd>
              <dd><a href="###">猜你喜欢</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>用户帮助</dt>
              <dd><a href="###">我的预约</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>手机预约</dt>
              <dd><a href="###">微信公众号</a></dd>
              <dd><a href="###">下载APP</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>商务合作</dt>
              <dd><a href="###">友情链接</a></dd>
              <dd><a href="###">市场合作</a></dd>
            </dl>
          </li>
        </ul>
        <div class="footer-info">
          <p class="tit">0371-58686815</p>
          <p class="time">周一到周日 9:00-22:00</p>
          <p class="tips">客服电话 免长途费</p>
        </div>
      </div>
      <p class="footer-boot">版权所有：预约吧</p>
    </div>
  </div>
</template>
<script>

import { baseUrl, imgUrl } from '@/api/env'
export default {
  data() {
    return {
      activeDate:""
    }
  },
  created() {
  },
}

</script>
<style>
@import "assets/css/public.css";
@import "assets/css/reset.css";
@import 'assets/css/index.css';
@import 'assets/css/font/iconfont.css';
@import 'element-ui/lib/theme-chalk/index.css';
</style>
