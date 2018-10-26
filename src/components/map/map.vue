<template>
  <div>
    <header-t message=true></header-t>
    <div style="height:50px;"></div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="上传LOGO">
        <el-upload ref="upload" class="avatar-uploader" name="bannerImage" :action="baseUrl+'publish/publishUpload'" :show-file-list="false" :on-change="bannerChange" :data="forms" id="bannerImage" :on-success="handleAvatarSuccess" :auto-upload="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 活动名字 -->
      <el-form-item label="标题">
        <el-input v-model="forms.publishName"></el-input>
      </el-form-item>
      <!-- 分类 -->
      <el-form-item label="分类">
        <el-checkbox-group v-model="form.classifies">
          <el-checkbox :label="cla.classifyId" v-for="(cla , index) in classifys" :key="index" style="margin-left:0px;margin-right:14px;">{{cla.classifyName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 联系方式 -->
      <div class="lists">
        <el-form-item class="information" label="联系">
          <div style="margin-bottom:15px;height:50px;" v-for="(domain, index) in form.contacts" :key="index+'s'">
            <el-col :span="6">
              <el-select v-model="form.contacts[index].contactType" placeholder="请选择联系类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.contacts[index].contactNum" placeholder="请输入联系方式"></el-input>
            </el-col>
            <el-col class="" :span="4">
              <el-button @click.prevent="addressCon(form.contacts)">+</el-button>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <!-- 网址 -->
      <div class="lists">
        <el-form-item class="information" label="网址">
          <el-col :span="20" v-if="form.webs.length == 0">
            <el-button @click="hadweb()" style="width:100%;text-align:left">请选择网址</el-button>
          </el-col>
          <div style="margin-bottom:15px;height:50px;" v-for="(webs, index) in form.webs" :key="index">
            <el-col :span="20">
              <el-button v-model="webs.webUrl" @click="hadweb()" style="width:100%;text-align:left">{{webs.webTitle}} -{{webs.webUrl}}</el-button>
            </el-col>
            <el-col class="" :span="4">
              <el-button @click="addrWeb(index)">-</el-button>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <!-- 位置 -->
      <el-form-item label="位置">
        <el-radio-group v-model="forms.positionType">
          <el-radio-button label="3">隐藏位置</el-radio-button>
          <el-radio-button label="1">固定位置</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 固定位置 -->
      <el-form-item label="固定位置" v-show="forms.positionType== '1'">
        <el-input v-model="forms.address" readonly></el-input>
        <hadmap v-show="forms.positionType=='1'" @maps="imaps"></hadmap>
      </el-form-item>
      <el-form-item label="服务详情">
        <el-input type="textarea" v-model="forms.publishDetails"></el-input>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="添加图片">
        <el-upload ref="detailimg" class="reload_uplay" list-type="picture-card" multiple :action="baseUrl+'publish/updatePublishDetail'" name="newDetailImages" :data="getDetailimg" :on-change="detailimgChange" :on-success="handleDetailimgSuccess" :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 预约服务 -->
      <el-form-item class="information" label="添加预约">
        <el-col :span="20" v-if="form.appointments.length == 0">
          <el-button @click="hadappoint
()" style="width:100%;text-align:left">请选择预约服务</el-button>
        </el-col>
        <div v-for="(item , index) in form.appointments" :key="index" style="margin-bottom:15px;height:50px;">
          <el-col :span="19">
            <el-button @click="hadappoint()" style="width:100%;text-align:left">{{item.appointmentTitle}}</el-button>
          </el-col>
          <el-col class="" :span="4">
            <el-button @click="removeapponit(index)">-</el-button>
          </el-col>
        </div>
      </el-form-item>
      <!-- 文本编辑 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择 -->
    <el-dialog title="网站管理" ref="multipleTable" :visible.sync="dialogVisible" width="30%">
      <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
        <el-table-column prop="webTitle" label="网址名" width="280">
        </el-table-column>
        <el-table-column prop="webUrl" label="网址" width="240">
        </el-table-column>
        <el-table-column type="selection" fixed="right" label="操作" width="55">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="btnale()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="服务管理" ref="multipleTable" :visible.sync="diaapp" width="20%">
      <el-table :data="fuwu" @selection-change="fuwuChange" max-height="250" border style="width: 100%">
        <el-table-column prop="appointmentTitle" label="服务名" width="360">
        </el-table-column>
        <el-table-column type="selection" fixed="right" label="操作" width="55">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="diaapp = false">取 消</el-button>
    <el-button type="primary" @click="diaapp = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import inforUpload from '@/components/org/uploader/index'
import VueImgInputer from 'vue-img-inputer'
import hadmap from '@/components/map/map'
import headerT from '@/components/org/header'
import { baseUrl, imgUrl } from '@/api/env'
import qs from "qs"
import axios from 'axios'
export default {
  data() {
    return {
      baseUrl,
      classifys: "", //分类
      form: {
        userId: "", //id
        publishName: "",
        positionType: "1", //固定 1 
        classifies: [], //分类
        longitude: "",
        latitude: "",
        address: "",
        publishDetails: "", //详情
        contacts: [{
          contactNum: "",
          contactType: "" //联系方式的类型,1 qq,2 微信,3手机,4座机电话 （i对应上传联系人数组的下标）
        }], //联系方式
        webs: [], //官网
        webcams: [{
          webcamId: "",
          webcamName: "",
          webcamDevicesn: ""
        }], //摄像头
        appointments: [], //关联服无
      },
      forms: {
        userId: "", //id
        publishName: "",
        positionType: "1", //固定 1 
        longitude: "",
        latitude: "",
        address: "",
        publishDetails: ""//详情
  
      },
      imageUrl: "", //banner 预览图
      publishId: "",
      getDetailimg: { //修改详情
        publishId: "",
        oldDetailImageIds: "", //修改后还留下来的以前的图片id
        publishDetails: "", //详情文字
      },




      dialogVisible: false,
      diaapp: false,
      options: [{
        value: '1',
        label: 'QQ'
      }, {
        value: '2',
        label: '微信'
      }, {
        value: '3',
        label: '手机'
      }, {
        value: '4',
        label: '座机电话'
      }],
      value: '',
      tableData: [{
        userId: "",
        webId: "",
        webUrl: "",
        webTitle: ""
      }],
      multipleSelection: [],
      fuwu: [],
      getpublishsdata: "", //更改
    }
  },
  components: {
    inforUpload,
    VueImgInputer,
    hadmap,
    headerT
  },
  methods: {
    detailimgChange(e) {
      console.log(e)
    },
    //地图
    imaps(event) {
      console.log(event);
      this.form.latitude = event.latitude
      this.form.longitude = event.longitude
      this.form.address = event.address
      this.forms.latitude = event.latitude
      this.forms.longitude = event.longitude
      this.forms.address = event.address
    },
    addressCon(obj) {
      obj.push({
        contactNum: "",
        contactType: ""
      })
    },
    hadweb() {
      this.dialogVisible = true;
      const _this = this
      _this.$fetch(baseUrl + "web/queryAllWeb", { userId: localStorage.getItem('user_id') }).then(function(res) {
        _this.tableData = res.data
        console.log(_this.tableData)
      })
    },
    // 确定
    btnale(ob) {
      this.form.webs = this.multipleSelection
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    addrWeb(index) {
      this.form.webs.splice(index, 1)
    },
    hadappoint() {
      const _this = this
      _this.diaapp = true
      _this.$fetch(baseUrl + "appointment/queryAppointmentByUserId", { userId: localStorage.getItem('user_id') }).then(function(res) {
        _this.fuwu = res.data
      })
    },
    fuwuChange(val) {
      this.form.appointments = [];
      for (var i = val.length - 1; i >= 0; i--) {
        this.form.appointments.push({
          appointmentId: val[i].appointmentId,
          appointmentTitle: val[i].appointmentTitle
        })
      }
    },
    removeapponit(obj) {
      this.form.appointments.splice(obj, 1)
    },
    uploadChange(event) {
      if (event.target.files.length > 0) {
        this.files = event.target.files[0]; //提交的图片  
        this.getBase64(event.target, (url) => {
          console.log(url)
          this.form.bannerImage = 'data:image/png;base64,' + url; //显示的图片  
        });
      }
    },
    // 提交
    onSubmit() {

      this.$refs.upload.submit()
    },
    bannerChange(e, v) {
      const _this = this
      const formd = new FormData()
      console.log(e.raw)
      this.imageUrl = e.url
    },
    handleAvatarSuccess(res) {
      console.log(res)
      this.publishId = res.publishId
      this.getDetailimg.publishId = res.publishId
      this.getDetailimg.publishDetails = res.publishId
      this.$refs.detailimg.submit()
      console.log("1111111111111111111")
      this.getpublish(res.publishId, this.form)
      // this.$router.push('/')
    },
    handleDetailimgSuccess(res) {
      console.log(res)


    },

    //更改
    getpublish(id, getlist) {
      const _this = this
       this.getpublishsdata = {};
      this.form.classifies = this.form.classifies.toString();
      this.getpublishsdata.classifyIds = this.form.classifies;
      this
      this.getpublishsdata.publishId = id;
      this.getpublishsdata.publishName = this.form.publishName
      this.getpublishsdata.positionType = this.form.positionType
      this.getpublishsdata.longitude = this.form.longitude
      this.getpublishsdata.latitude = this.form.latitude
      this.getpublishsdata.address = this.form.address
      // this.getpublishsdata.contacts = this.form.contacts.toString()
      // this.getpublishsdata.webs = this.form.webs.toString()
      // this.getpublishsdata.webcams = this.form.webcams.toString()
      // this.getpublishsdata.appointments = this.form.appointments.toString()
      this.$post(baseUrl + 'publish/updatePublish', this.getpublishsdata).then(function(res) {
        console.log("更改")
        console.log(res)
      })
    },
    // 分类修改
    // getclassif(id, clas) {
    //   const _this = this
    //   console.log(clas.toString())
    //   const getclassift = clas.toString()
    //   this.$post(baseUrl + 'publish/updatePublishClassify', { publishId: id, classifyIds:getclassift}).then(function(res) {
    //     console.log("分类修改")
    //     console.log(res)
    //   })
    // },
    // 联系方式修改
    // getContact(id, Contacts) {
    //   this.$post(baseUrl + 'publish/updatePublishContact', { publishId: id, contacts: Contacts }).then(function(res) {
    //     console.log(" 联系方式修改")
    //     console.log(res)
    //   })
    // },
    //更新网站 
    // getwebs(id, webIds) {
    //   this.$post(baseUrl + 'publish/updatePublishWeb', { publishId: id, webIds: webIds }).then(function(res) {
    //     console.log(" 更新网站")
    //     console.log(res)
    //   })
    // },
    //更新预约
    //  getwebs(id, webIds) {
    //   this.$post(baseUrl + 'publish/updatePublishWeb', { publishId: id, webIds: webIds }).then(function(res) {
    //     console.log(" 更新网站")
    //     console.log(res)
    //   })
    // },
  },

  created() {
    const _this = this;
    _this.form.userId = localStorage.getItem('user_id')
    _this.forms.userId = localStorage.getItem('user_id')
    if (_this.$route.query.id != undefined) {
      _this.$post(baseUrl + "classify/queryAllClassify", { "publishId": _this.$route.query.id }).then(function(response) {
        _this.form = response.data
        console.log(_this.form.imageURL)
      })
    } else {
      console.log("填写")
    }
    _this.$fetch(baseUrl + "classify/queryAllClassify").then(function(res) {
      console.log(res)
      _this.classifys = res.data
    })
  }
}

</script>
<style scoped>
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}

.img-inputer--light {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  display: block;
  margin-bottom: 20px;
}

.edit_container {
  padding: 40px 0 40px 0;
}

.editer {
  width: 800px;
  height: 350px;
  margin: auto;
}

.el-col {
  padding-right: 20px;
  box-sizing: border-box;
}

.el-form {
  width: 800px;
  margin: auto;
}

.el-input__inner {
  border-radius: 0px;
}

.submit_btn {
  text-align: center;
}

.lists .information .dels {
  display: none;
}

.el-addmb {
  font-size: 70px;
  border: 1px solid #333;
}

.avatar-uploader {
  width: 40px;
  height: 40px;
  border: 1px solid;
  text-align: left;
}

.avatar-uploader img {
  width: 100%;
}

.avatar-uploader-icon {
  font-size: 40px;
  margin: auto;
}

.upload__input {
  opacity: 0;
  z-index: 1111;
  width: 80px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.div_inpou {
  background: #eee;
  width: 80px;
  position: relative;
  text-align: center;
  font-size: 30px;
  color: #333;
}

.div_inpou img {
  width: 80px;
  height: 40px;
}

#bannerImage {
  border: 2px dashed;
  width: 65px;
  height: 65px;
}

#bannerImage .avatar-uploader-icon {
  font-size: 65px;
}

.reload_uplay .el-upload {
  width: 65px;
  height: 65px;
  display: block
}

</style>
<template>
  <div id="app">
    <div class="amap-wrapper" @click="addMarker">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap class="amap-box" :vid="'amap-vue'" :plugin="plugin" :center="center" :zoom="zoom" :events="events">
        <el-amap-marker v-for="marker in markers" :key="marker.id" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
      </el-amap>
    </div>
    <el-dialog title="是否确认地址为" :visible.sync="dialogVisible" width="30%">
      <span> {{address_name}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="openBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "useruser",
  data() {
    const _this = this
    return {
      dialogVisible: false,
      zoom: 12,
      center: [113.657739, 34.748313],
      lng: '',
      lat: '',
      address: "",
      address_name: '',
      loaded: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(o) {
            const _this = this
            o.getCurrentPosition((status, result) => {
              // console.log("Geolocation")
              // console.log(result.position.lat)
              // console.log(result)
              if (result && result.addressComponent) {
              	// console.log(result.position)
                _this.lng = result.position.lng;
                _this.lat = result.position.lat;
                // console.log("1111");
                // console.log(result.position)
                _this.center = [_this.lng, _this.lat];
                _this.loaded = true;
                _this.$nextTick();
                _this.markers[0].position = [pois[0].lng, pois[0].lat]
                // console.log(status)
              }
            });
          },
          clicl(e) {
            // alert("1")
          }
        },
      }],
      markers: [{
        position: [121.5273285, 31.21515044],
        events: {
          click: () => {
            this.openAlert()
          },
          dragend: (e) => {
            // console.log('---event---: dragend')
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
              if (result && result.regeocode) {
                _this.address_name = result.regeocode.formattedAddress;
                _this.address =
                  result.regeocode.addressComponent.province +
                  result.regeocode.addressComponent.city +
                  result.regeocode.addressComponent.district +
                  result.regeocode.addressComponent.street
                // console.log(result)
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
    addMarker: function() {
      let lng = this.lng;
      let lat = this.lat;
      this.markers[0].position = [lng, lat]
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      // console.log(pois[0]);
      this.center = [pois[0].lng, pois[0].lat];
      this.markers[0].position = [pois[0].lng, pois[0].lat]
      this.address = pois[0].address
      this.address_name = pois[0].name
      this.openAlert()
    },
    inforevise() {
      // console.log("修改个人资料")
      this.dialogFormVisible = true
    },
    // 打开弹框
    openAlert() {
      this.dialogVisible = true
    },
    // 确定选择
    openBtn() {
      const _this = this
      _this.$emit("maps",{
        longitude: this.lng,
        latitude: this.lat,
        address: this.address,
        address_name: this.address_name,
        user_id: localStorage.getItem("user_id")
      })
      _this.dialogVisible = false
      // this.$http.post('destination/add.php', qs.stringify({
      //   longitude: this.lng,
      //   latitude: this.lat,
      //   address: this.address,
      //   address_name: this.address_name,
      //   user_id: localStorage.getItem("user_id")
      // })).then(function(res) {
      //   _this.dialogVisible = false
      //   _this.$notify({
      //     title: '成功',
      //     message: '您已添加成功',
      //     type: 'success'
      //   });
      // })
    }

  },
  created() {

  }
}

</script>
<style>
.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute !important;
}

</style>
