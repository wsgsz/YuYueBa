import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login/login'
import detail from '@/components/detail/indexdetail'
import makedetail from '@/components/detail/makedetail'

import upload from '@/components/issue/upload'

import goods from '@/components/goods/index' //商品
import goodslist from '@/components/goods/goodslist' //列表
import goodsdetail from '@/components/goods/goodsdetail'
import tmake from '@/components/goods/tmake'
// 个人中心
import user from '@/components/user/index'
import myuser from '@/components/user/myuser' //个人资料
import collect from '@/components/user/collect' //我的收藏
import reservation from '@/components/user/reservation' //我的预约
import reservation_detail from '@/components/user/reservation_detail' // 我的预约详情
import orderGoods from '@/components/user/orderGoods' //我的订单
import orderGoods_detail from '@/components/user/orderGoods_detail' //我的订单 详情
import mypublish from '@/components/user/mypublish' //我的发布
import drafts from '@/components/user/drafts' //草稿箱
import mycity from '@/components/user/mycity' //我的地址
import mywebcams from '@/components/user/mywebcams' //我的订单 我的摄像头
import myweb from '@/components/user/myweb' //我的网站
import reservation_service from '@/components/user/reservation_service' //预约服务
import reservation_add from '@/components/user/reservation_add' //
import Business from '@/components/user/Business'
import Businesstime from '@/components/user/Businesstime'
import orderDetailList from '@/components/user/orderDetailList'

import publishupload from '@/components/issue/publishupload'
// 发布管理
import release from '@/components/release/index'
import makes from '@/components/release/make'
import yuyue from '@/components/release/yuyue'
// 发布
import information from '@/components/issue/information'
import search from '@/components/search/search'
import hadmap from '@/components/map/hadmap'
// 列表
import searchto from '@/components/search/search'
// import headertop from '@/components/org/headertop'

import listet from '@/components/listet/listet'
import mapss from '@/components/map/mapss'
import timeMake from '@/components/make/timeMake'
Vue.use(Router)

export default new Router({
  /**
   * @desc 路由配置
   */
  mode: 'history' // 这样设置后，就可以去掉url中丑丑的“#”啦
  routes: [{
      path: '/',
      meta: { auth: true },
      name: 'index',
      component: index,
    },
    {
      path: '/upload', //上传测试
      name: 'upload',
      component: upload
    },
    {
      path: '/detail/:id',
      name: 'detail',

      component: detail
    }, {
      path: '/makedetail/:id',
      name: 'makedetail',

      component: makedetail
    },

    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login1',
      name: 'login1',
      component: login
    },
    {
      path: '/release',
      name: 'release',

      component: release,
      redirect: "/release/make/1",
      children: [{
          path: 'make/:type',
          name: "make",

          component: makes
        },
        {
          path: 'yuyue/:types',
          name: 'yuyue',

          component: yuyue
        }
      ]
    },

    {
      path: "/information",
      name: "information",
      component: information
    }, {
      path: "/publishupload",
      name: '上传测试',
      component: publishupload
    }, {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/hadmap',
      name: "hadmap",

      component: hadmap
    },
    {
      path: '/searchto',
      name: "searchto",
      component: searchto
    },
    {
      path: '/listet/:id',
      name: "listet",
      component: listet
    },
    {
      path: '/timeMake/:id',
      name: "timeMake",
      component: timeMake
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: 'user/reservation',
      children: [{
          path: 'reservation',
          name: '我的预约',
          component: reservation
        }, {
          path: 'reservation_detail',
          name: '预约详情',
          component: reservation_detail
        }, {
          path: 'orderGoods',
          name: '我的订单',
          component: orderGoods
        }, {
          path: 'orderGoods_detail',
          name: '我的订单详情',
          component: orderGoods_detail
        }, {
          path: 'mypublish',
          name: '我的发布',
          component: mypublish
        }, {
          path: 'drafts',
          name: '草稿箱',
          component: drafts
        }, {
          path: 'collect',
          name: 'collect',

          component: collect
        }, {
          path: 'myuser',
          name: 'myuser',

          component: myuser
        },
        {
          path: "mycity",
          name: "我的地址",
          component: mycity
        },
        {
          path: "myweb",
          name: "我的网站",
          component: myweb
        },
        {
          path: "mywebcams",
          name: "我的摄像头",
          component: mywebcams
        },
        {
          path: "reservation_service",
          name: "预约服务",
          component: reservation_service
        },
        {
          path: "reservation_add",
          name: "添加服务",
          component: reservation_add
        },
        {
          path: 'make/:type',
          name: "makess",
          component: makes
        },
        {
          path: 'yuyue/:type',
          name: 'yuyueee',
          component: yuyue
        }, {
          path: 'Business',
          name: '商家中心',
          component: Business
        }, {
          path: "Businesstime/:appointId",
          name: "商家详情",
          component: Businesstime
        }, {
          path: 'orderDetailList/:listId',
          name: "商家中心详情",
          component: orderDetailList
        }
      ]
    },
    {
      path: '/goods',
      name: 'goods',

      component: goods,
      children: [{
          path: 'goodslist/:goodslistId',
          name: '列表s',
          component: goodslist
        },
        {
          path: 'goodsdetail/:id',
          name: '列表详情',
          component: goodsdetail
        },
        {
          path: 'tmake/:timeid',
          name: '时间',
          component: tmake
        }
      ]
    }
  ]
})
