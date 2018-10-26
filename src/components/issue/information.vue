<template>
  <div>
    <header-t message=true></header-t>
    <div style="height:50px;"></div>
    <el-form ref="form" :model="form" label-width="120px" style="width:800px;margin:auto">
      <!-- logo -->
      <el-form-item label="上传LOGO">
           <el-upload
            ref="upload"
            action="https://upload-z2.qiniup.com"
            class="avatar-uploader"
            v-model="bannerImage"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="bannerChange"
            :http-request="uploadQiniu">
            <i class="el-icon-plus"  v-if="!bannerImage"></i>
             <img v-if="bannerImage" :src="bannerImage.url" class="avatar">
          </el-upload>
       
      </el-form-item>
      <!-- 标题 -->
      <!-- :rules="[{ required: true, message: '标题不能为空'},,{ min:1, max: 26, message: '长度在 1 到 26个字符', trigger: 'blur' }]" -->
      <el-form-item label="标题" prop="publishName" >
        <el-input v-model="form.publishName"></el-input>
      </el-form-item>
      <!-- 分类 -->
      <!-- :rules="[ { type: 'array', required: true, message: '请至少选择一个分类', trigger: 'change' }]" -->
      <el-form-item label="分类" prop="classifies" >
        <el-checkbox-group v-model="actclassifies">
          <el-checkbox :label="cla.classifyId" v-for="(cla , index) in classifys" :key="index" style="margin-left:0px;margin-right:14px;">{{cla.classifyName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 联系方式 -->
      <div class="lists">
        <el-form-item class="information" label="联系">
          <div style="margin-bottom:15px;height:50px;">
            <el-col :span="4">
              <el-input placeholder="qq" readonly value="qq"></el-input>
            </el-col>
            <el-col :span="20">
              <el-input v-model="form.contacts[0].contactNum" placeholder="请输入联系方式"></el-input>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item class="information" label="联系">
          <div style="margin-bottom:15px;height:50px;">
            <el-col :span="4">
              <el-input readonly value="微信" placeholder="微信"></el-input>
            </el-col>
            <el-col :span="20">
              <el-input v-model="form.contacts[1].contactNum" placeholder="请输入联系方式"></el-input>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item class="information" label="联系">
          <div style="margin-bottom:15px;height:50px;">
            <el-col :span="4">
              <el-input value="手机" readonly placeholder="手机"></el-input>
            </el-col>
            <el-col :span="20">
              <el-input v-model="form.contacts[2].contactNum" placeholder="请输入联系方式"></el-input>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item class="information" label="联系">
          <div style="margin-bottom:15px;height:50px;">
            <el-col :span="4">
              <el-input value="座机" readonly placeholder="座机"></el-input>
            </el-col>
            <el-col :span="20">
              <el-input v-model="form.contacts[3].contactNum" placeholder="请输入联系方式"></el-input>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <!-- 网址 -->
      <div class="lists">
        <el-form-item class="information" label="添加网址">
          <el-col :span="24" v-if="form.webs.length == 0">
            <el-button @click="hadwebs()" style="width:100%;text-align:left">请选择网址</el-button>
          </el-col>
          <div style="margin-bottom:15px;height:50px;" v-for="(webs, index) in form.webs" :key="index">
            <el-col :span="20">
              <el-button v-model="webs.webUrl" @click="hadwebs()" style="width:100%;text-align:left">{{webs.webTitle}} -{{webs.webUrl}}</el-button>
            </el-col>
            <el-col class="" :span="4">
              <el-button @click="addrWebs(index)">-</el-button>
            </el-col>
          </div>
        </el-form-item>
      </div>
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
    <el-button @click="webRemove()">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 网址end -->
      <!-- 摄像头管理 -->
      <div class="lists">
        <el-form-item class="information" label="添加摄像头">
          <el-col :span="24" v-if="form.webcams.length == 0">
            <el-button @click="hadwebcams()" style="width:100%;text-align:left">添加摄像头</el-button>
          </el-col>
          <div style="margin-bottom:15px;height:50px;" v-for="(webcams, index) in form.webcams" :key="index">
            <el-col :span="20">
              <el-button v-model="webcams.webcamName" @click="hadwebcams()" style="width:100%;text-align:left">{{webcams.webcamDevicesn}} </el-button>
            </el-col>
            <el-col class="" :span="4">
              <el-button @click="addrWebcams(index)">-</el-button>
            </el-col>
          </div>
        </el-form-item>
      </div>
      <el-dialog title="摄像头管理" ref="multipleTable" :visible.sync="diaowebcams" width="30%">
        <el-table :data="tablewebscames" @selection-change="diaowebcamsChange" border style="width: 100%">
          <el-table-column prop="webcamName" label="设备名" width="280">
          </el-table-column>
          <el-table-column prop="webcamDevicesn" label="设备编号" width="240">
          </el-table-column>
          <el-table-column type="selection" fixed="right" label="操作" width="55">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="webcamesremove()">取 消</el-button>
    <el-button type="primary" @click="webcamsbtn()">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 摄像头end3........................ -->
      <!-- 预约管理 -->
      <el-form-item class="information" label="添加预约">
        <el-col :span="24" v-if="form.appointments.length == 0">
          <el-button @click="hadappoint
()" style="width:100%;text-align:left">请选择预约服务</el-button>
        </el-col>
        <div v-for="(item , index) in form.appointments" :key="index" style="margin-bottom:15px;height:50px;">
          <el-col :span="20">
            <el-button @click="hadappoint()" style="width:100%;text-align:left">{{item.appointmentTitle}}</el-button>
          </el-col>
          <el-col class="" :span="4">
            <el-button @click="removeapponit(index)">-</el-button>
          </el-col>
        </div>
      </el-form-item>
      <el-dialog title="服务管理" ref="multipleTable" :visible.sync="diaapp" width="20%">
        <el-table :data="appointments" @selection-change="fuwuChange" max-height="250" border style="width: 100%">
          <el-table-column prop="appointmentTitle" label="服务名" width="360">
          </el-table-column>
          <el-table-column type="selection" fixed="right" label="操作" width="55">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="fuwuremove">取 消</el-button>
    <el-button type="primary" @click="diaapp = false">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 预约管理 end -->
      <!-- 位置 -->
      <el-form-item label="位置">
        <el-radio-group v-model="form.positionType">
          <el-radio-button label="3">隐藏位置</el-radio-button>
          <el-radio-button label="1">固定位置</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="固定位置" v-show="form.positionType== '1'">
        <el-input v-model="form.address" readonly></el-input>
        <hadmap v-show="form.positionType=='1'" @maps="imaps"></hadmap>
      </el-form-item>
      <!-- 位置 end -->
      <!-- 详情  -->
      <el-form-item label="服务详情">
        <el-input type="textarea" v-model="form.publishDetails"></el-input>
      </el-form-item>
      <el-form-item label="添加图片">
      <!--   <el-upload ref="imageDetailList" :limit="9" class="reload_uplay" list-type="picture-card" multiple :action="baseUrl+'publish/updatePublishDetail'" :before-upload="imageDetailListupload" :on-change="detailchange" :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload> -->
        <el-upload
        ref="imageDetailList"
        :limit="9"
        action="https://upload-z2.qiniup.com"
        list-type="picture-card"
        :auto-upload="false"
        :drag="true"
        :http-request="uploadDetailQiniu"
        :on-change="onFilesAdded"
        :on-remove="onFilesRemove" style="width:100%;height:100%">
        <i class="el-icon-plus"></i>
        </el-upload>

      </el-form-item>
      <!-- 详情 end -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form',1)">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择 -->
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import hadmap from '@/components/map/map'
import headerT from '@/components/org/header'
import moment from 'moment'
import qs from "qs"
import axios from 'axios'
const axiosInstance = axios.create({})
export default {
  data() {
    return {
      baseUrl,
      imgUrl,
      uploadToken:"",
      banner: "", //banner  预览
      classifys: "", //分类列表
      actclassifies:[],
      tableData: [{
        userId: "",
        webId: "",
        webUrl: "",
        webTitle: ""
      }], //网址
      dialogVisible: false, //网址显示隐藏
      diaowebcams: false, // 摄像头 显示隐藏
      tablewebscames: [{
        webcamId: "",
        webcamDevicesn: "",
        webcamName: "",
      }], //摄像头列表
      appointments: [], //预约服务 
      diaapp: false,
      bannerImage:"",
      form: {
      
        userId:"",
        imageBannerList:[],
        publishDetails:"",
        publishName: "",
        classifies: [],
        contacts: [{
          contactNum: "",
          contactType: "1" //联系方式的类型,1 qq,2 微信,3手机,4座机电话 （i对应上传联系人数组的下标）
        }, {
          contactNum: "",
          contactType: "2" //联系方式的类型,1 qq,2 微信,3手机,4座机电话 （i对应上传联系人数组的下标）
        }, {
          contactNum: "",
          contactType: "3" //联系方式的类型,1 qq,2 微信,3手机,4座机电话 （i对应上传联系人数组的下标）
        }, {
          contactNum: "",
          contactType: "4" //联系方式的类型,1 qq,2 微信,3手机,4座机电话 （i对应上传联系人数组的下标）
        }, ], //联系方式
        webs: [], // 网址
        webcams: [], // 摄像头
        appointments: [], //预约服务
        positionType: "1", //固定 1 
        longitude: "",
        latitude: "",
        address: "",
        imageDetailList: [],
        status:'',
      },
      param: "",
      newFileList:""
    }
  },
  components: {
    hadmap,
    headerT
  },
  created() {
    this.classifies()
  },
  mounted() {
    const _this = this
    this.classify = this.$store.state.classifylist.data
    this.form.userId = localStorage.getItem("user_id")
    // token
    axios.get(baseUrl+'qiniu/getQiniuUploadToken').then(function(res){
       _this.uploadToken = res.data.data
    })
  },
  methods: {
    //banner改变
    bannerChange(file, fileList) {
      this.bannerImage = file
      console.log(file)
    },
    // 分类
    classifies() {
      const _this = this
      this.$http({
          method: 'get',
          url: baseUrl + "classify/queryAllClassify",
          data: this.param,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;multipart/form-data;charset=UTF-8' },
        })
        .then(function(res) {
          // console.log(res)
          _this.classifys = res.data.data
        })
        .catch(function(err) {
          console.log('err', err);
        });
    },

    // 网址
    hadwebs() {
      this.dialogVisible = true;
      const _this = this
      this.$http({
          method: 'get',
          url: baseUrl + "web/queryAllWeb?userId=" + localStorage.getItem('user_id'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        })
        .then(function(res) {
          // console.log(res)
          _this.tableData = res.data.data
        })
        .catch(function(err) {
          console.log('err', err);
        });
    },
    addrWebs(index) {
      this.form.webs.splice(index, 1)
    },
    handleSelectionChange(val) {
      // console.log(val)
      this.form.webs = val;
    },
    webRemove() {
      this.form.webs = '',
        this.dialogVisible = false;
    },
    // 摄像头 
    hadwebcams() {
      this.diaowebcams = true;
      const _this = this
      this.$http({
          method: 'get',
          url: baseUrl + "webcam/queryAllWebcam?userId=" + localStorage.getItem('user_id'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        })
        .then(function(res) {
          // console.log(res)
          _this.tablewebscames = res.data.data
        })
        .catch(function(err) {
          console.log('err', err);
        });
    },
    addrWebcams(index) {
      this.form.webcams.splice(index, 1)
    },
    webcamsbtn() {
      this.diaowebcams = false;
    },
    diaowebcamsChange(e) {
      const _this = this
      _this.form.webcams = []
      for (var i = e.length - 1; i >= 0; i--) {
        _this.form.webcams.push(e[i])
      }
    },
    webcamesremove() {
      this.form.webcams = ''
      this.diaowebcams = false;
    },
    // 预约管理
    hadappoint() {
      const _this = this
      _this.diaapp = true
      this.$http({
          method: 'get',
          url: baseUrl + "appointment/queryAppointmentByUserId?userId=" + localStorage.getItem('user_id'),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        })
        .then(function(res) {
          _this.appointments = res.data.data
        })
        .catch(function(err) {
          console.log('err', err);
        });
    },
    removeapponit(obj) {
      this.form.appointments.splice(obj, 1)
    },
    fuwuremove() {
      this.diaapp = false
      this.form.appointments = []
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
    //  位置
    imaps(event) {
      this.form.latitude = event.latitude
      this.form.longitude = event.longitude
      this.form.address = event.address
    },
    // banner  图片
    imageDetailListChange(e) {
      // console.log(e)
    },
    imageDetailListupload() {
      return false
    },
    //banner改变
    // detailchange(file, fileList) {
    //   this.form.imageDetailList = fileList
    //   console.log(this.form.imageDetailList)
    // },

    handleimageDetailListSuccess() {},
    onSubmit(obc,index) {
      const _this =this
      this.form.status = index
      this.$refs[obc].validate((valid) => {
      const _this = this
        if (valid) {
        this.$refs.upload.submit();
        this.$refs.imageDetailList.submit();
        for (var i = _this.actclassifies.length - 1; i >= 0; i--) {
          _this.form.classifies.push({
            classifyId:_this.actclassifies[i]
          })
        }
         this.$alert('是否确认提交', '提交确认', {
          confirmButtonText: '确定',
          callback: action => {
            _this.subm()
          }
        });
        // setTimeout(this.subm(),5000)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    subm(){
      const _this = this
      axiosInstance({
        method: 'POST',
        url:baseUrl+"publish/publishUploadQiniuPC",
        data:this.form,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      })
      .then(function(res) {
         _this.$message({
          message: '恭喜你，上传成功',
          type: 'success'
        });
        setTimeout(_this.locations,5000)
         console.log('res',res)
      })
      .catch(function(err) {
          console.log('err', err);
      });

        // this.postJSON(baseUrl+"publish/publishUploadQiniu",this.form, (data) => {
        //   console.log(data)
        //   // if (data.errcode === 0) {
        //   //   this.uploadedFileList = [];
        //   //   this.updateEquipFaultDialog = false;
        //   //   this.getExamineOrderList();
        //   //   this.$message.success(data.errmsg);
        //   //   return;
        //   // }
        //   // this.$message.error(data.errmsg);
        // });
      },
         locations(){
      this.$router.push('/information')
    },
    uploadQiniu: function (request) {
      let _this = this;
      const file = request.file;
      const keyName = `yuyueba${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`;
      console.log(request.file)
      var data = new FormData();
      data.append('token',_this.uploadToken);
      data.append('file',file);
      data.append('key', keyName);
      axiosInstance({
        method: 'POST',
        url: 'https://upload-z1.qiniup.com',
        data: data,
      })
      .then(function(res) {
        _this.form.imageBannerList.push({
          imageUrl:res.data.key
        })
         console.log('res',res)
      })
      .catch(function(err) {
          console.log('err', err);
      });
    },
    // 详情图片上传   。，     
     uploadDetailQiniu: function (request) {
      let _this = this;
      const file = request.file;
      const keyName = `yuyueba${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`;
      console.log(request.file)
      var data = new FormData();
      data.append('token',_this.uploadToken);
      data.append('file',file);
      data.append('key', keyName);
      axiosInstance({
        method: 'POST',
        url: 'https://upload-z1.qiniup.com',
        data: data,
      })
      .then(function(res) {
        _this.form.imageDetailList.push({
          imageUrl:res.data.key
        })
         console.log('res',res)
      })
      .catch(function(err) {
          console.log('err', err);
      });
    },
    onFilesAdded: function (file, fileList) {
      if (fileList.length > 3) {
        fileList.splice(fileList.indexOf(file), 1);
      }
      this.newFileList = fileList.filter(f => f.status === 'ready');
    },    
    onFilesRemove: function (file, fileList) {
      this.newFileList = fileList.filter(f => f.status === 'ready');
      this.form.imageDetailList.splice(this.form.imageDetailList.indexOf(file), 1);
    },                  
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
.avatar{
  width: 40px;
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
#app{
  overflow: hidden;
}
.el-upload-dragger{
  width: 100% !important;
  height: 100% !important;
}
.el-icon-plus{
  font-size: 40px;
}
</style>
