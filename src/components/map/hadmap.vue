<template>
  <div id="app">
    <header-t></header-t>
    <div class="apps">
    <h1 style="text-align:center;font-size:27px;color:#333;margin-bottom:20px;">请选择当前位置</h1>
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" style="margin-bottom:20px;width:1200px;"  ></el-amap-search-box>
      <div class="amap-wrapper" @click="addMarker">
        <el-amap class="amap-box" :vid="'amap-vue'" :plugin="plugin" :center="center" :zoom="zoom" :events="events">
          <el-amap-marker v-for="mas in markers" :key="mas.id" :position="mas.position" :events="mas.events" :visible="mas.visible" :draggable="mas.draggable"></el-amap-marker>
        </el-amap>
      </div>
      <el-dialog title="是否确认地址为" :visible.sync="dialogVisible" width="30%">
        <!--         <div> {{address}}</div> -->
        <div style="margin-top: 15px;display:flex">
          <div style="width:70px;line-height:40px;">
            地址为:
          </div>
          <el-input placeholder="请输入内容" v-model="address">
          </el-input>
        </div>
        <div class="demo-input-suffix" style="margin-top:20px;">别名为：
          <el-autocomplete class="inline-input" v-model="addressAlias" :fetch-suggestions="querySearch" placeholder="请输入别名" @select="handleSelect" style="border:0px !important"></el-autocomplete>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="openBtn">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import headerT from '@/components/org/header'
import qs from 'qs'
export default {
  components: {
    headerT
  },
  data() {
    const _this = this
    return {
      dialogVisible: false,
      zoom: 12,
      center: [113.657739, 34.748313],
      lng: '',
      lat: '',
      addressAlias: "家",
      restaurants: [],
      address: "",
      address_name: '',
      loaded: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                _this.lng = result.position.lng;
                _this.lat = result.position.lat;
                _this.center = [_this.lng, _this.lat];
                console.log(result)
                _this.address = result.formattedAddress
                _this.address_name = result.addressComponent.township+result.addressComponent.streetNumber
                _this.loaded = true;
                _this.$nextTick();

              }
            });
          },
          click: () => {
            this.openAlert()
         
          },
        }
      }],
      // plugin: [{
      //   pName: 'Geolocation',
      //   events: {
      //     init(o) {
      //       const _this = this
      //       o.getCurrentPosition((status, result) => {

      //         // if (result && result.addressComponent) {
      //         //   // _this.lng = result.position.lng;
      //         //   // _this.lat = result.position.lat;
      //         //   // _this.center = [_this.lng, _this.lat];
      //         //   // _this.loaded = true;
      //         //   // _this.$nextTick();
      //         //   // _this.markers[0].position = [pois[0].lng, pois[0].lat]
      //         // }
      //       });
      //     },

      //   },
      //   clicl() {
      //     alert("!")
      //   }
      // }],
      markers: [{
        position: [121.5273285, 31.21515044],
        events: {
          click: () => {
            this.openAlert()
          },
          dragend: (e) => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
          }
        },
        visible: true,
        draggable: false,
        template: '<span>1</span>',
      }],
      searchOption: {
        city: 'all',
        citylimit: false
      },
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          _this.lng = lng;
          _this.lat = lat;
          _this.markers[0].position = [lng, lat];
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              console.log()
              if (result && result.regeocode) {
                console.log(result)
                _this.address_name = result.regeocode.formattedAddress;
                _this.address =
                  result.regeocode.addressComponent.province +
                  result.regeocode.addressComponent.city +
                  result.regeocode.addressComponent.district +
                  result.regeocode.addressComponent.township +                
                  result.regeocode.addressComponent.street+
                  result.regeocode.addressComponent.streetNumber
                _this.openAlert()
                _this.$nextTick();
              }
            }
          });
        },
      },
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "家" },
        { "value": "公司" }
      ];
    },
    handleSelect(item) {
      console.log(item.value);
    },
    addMarker: function() {
      let lng = this.lng;
      let lat = this.lat;
      this.markers[0].position = [lng, lat]
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      console.log(pois[0]);
      this.center = [pois[0].lng, pois[0].lat];
      this.markers[0].position = [pois[0].lng, pois[0].lat]
      this.address = pois[0].address
      this.address_name = pois[0].name
      this.openAlert()
    },
    inforevise() {
      console.log("修改个人资料")
      this.dialogFormVisible = true
    },
    // 打开弹框
    openAlert() {
      this.dialogVisible = true
    },
    onSubmit() {
      console.log(this.addressAlias);
    },
    // 确定选择
    openBtn() {
      const _this = this
      this.$http.post(baseUrl + 'destination/addDestination', qs.stringify({
        addressAlias: this.addressAlias,
        longitude: this.lng,
        latitude: this.lat,
        address: this.address,
        addressName: this.address_name,
        userId: _this.user_id
      })).then(function(res) {
        console.log(res)
        if (res.data.status == 200) {
          _this.dialogVisible = false
          _this.$notify({
            title: '成功',
            message: '您已添加成功',
            type: 'success'
          });
          localStorage.setItem("citychioce", _this.address_name)
          localStorage.setItem("lng", _this.lng)
          localStorage.setItem("lat", _this.lat)
          setTimeout(() => { _this.$router.push({ name: "index" }) }, 1000);

        }
      })
    }

  },
  created() {},
  computed: {
    user_id() {
      return localStorage.getItem("user_id")
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}

</script>
<style>
.apps {

  width: 1200px;
  margin: auto;

  margin-top: 20px;
  margin-bottom: 50px;
}

.amap-wrapper {
  width: 1200px;
  height: 500px;
}

</style>
