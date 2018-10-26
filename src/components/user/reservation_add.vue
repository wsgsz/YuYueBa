<template>
  <div>
    <div style="height:50px;"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上传logo">
        
           <el-upload
            ref="upload"
            action="https://upload-z2.qiniup.com"
            class="avatar-uploader"
            v-model="bannerImage"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="bannerChange"
            :http-request="uploadQiniu">
            <i class="el-icon-plus"  v-if="!bannerImage" style="font-size:40px;"></i>
             <img v-if="bannerImage" :src="bannerImage.url" class="avatar">
          </el-upload>
 
      </el-form-item>
      <el-form-item label="标题" prop="appointmentTitle" :rules="[{ required: true, message: '标题不能为空'},{ min:1, max: 26, message: '长度在 1 到 26个字符', trigger: 'blur' }]">
        <el-input v-model="form.appointmentTitle"></el-input>
      </el-form-item>
      <el-form-item label="持续时间" prop="timeStart" :rules="[{ required: true, message: '持续时间不能为空'}]">
        <el-col :span="16" style="display:flex;justify-content: space-between;">
          <el-time-picker value-format='HH:mm:ss' v-model="form.timeStart" :picker-options="{
      selectableRange: '0:00:00 - 23:30:00'
    }">
          </el-time-picker>
          <el-time-picker placeholder="结束时间" value-format='HH:mm:ss' v-model="form.timeEnd" :picker-options="{
      selectableRange: '0:00:00 - 23:30:00'
    }">
          </el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间" prop="businessDateList" :rules="[{ required: true, message: '活动时间不能为空'}]">
        <el-date-picker v-model="form.businessDateList" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="dates" placeholder="选择日期" :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="持续时长" prop="timeDuration" :rules="[{ required: true, message: '持续时间长度不能为空'}]">
        <el-input-number v-model="form.timeDuration" :min="1" :max="3600" label="持续时间长度"></el-input-number>
      </el-form-item>
      <el-form-item label="服务详情" prop="appointmentDetail" :rules="[{ required: true, message: '服务详情不能为空'},{ min:0, max: 500, message: '长度不能超过500字', trigger: 'blur' }]">
        <el-input type="textarea" v-model="form.appointmentDetail"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
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

      <!--   <el-upload ref="detailimg" multiple :limit="9" list-type="picture-card" :on-change="detailChange" :action="baseUrl+'appointment/updateAppointment'" name="detailImages" :on-remove="removeChange" :data="getDetailimg" :on-success="handleDetailimgSuccess" :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload> -->


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form',1)">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import inforUpload from '@/components/org/uploader/index'
import { baseUrl, imgUrl } from '@/api/env'
import moment from 'moment'
import qs from "qs"
import axios from 'axios'
const axiosInstance = axios.create({})
export default {
  data() {
    return {
      baseUrl,
      imgUrl,
      bannerImage:"",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      imageUrl: "",
      form: {
        imageBannerList: [],
        appointmentType: "1",
        appointmentTitle: "",
        appointmentDetail: "",
        userId: "",
        timeStart: "",
        timeEnd: "", //结束
        timeDuration: "",
        businessDateList: '',
        imageDetailList:[]
      },
      param:"",
      getDetailimg: {
        appointmentId: "",
      },
    }
  },
  components: {
    // inforUpload
  },
    mounted() {
    const _this = this
    axios.get(baseUrl+'qiniu/getQiniuUploadToken').then(function(res){
       _this.uploadToken = res.data.data
    })
  },
  methods: {
     bannerChange(file, fileList) {
      this.bannerImage = file
      console.log(file)
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
        url: 'http://upload-z1.qiniup.com',
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
        url: 'http://upload-z1.qiniup.com',
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


    // banner  上传成功
    // handleAvatarSuccess(res) {
    //   this.appointmentId = res.data.appointmentId
    //   console.log(res)
    //   this.$refs.detailimg.submit();
    // },
    // detailChange(e, v) {
    //   this.form.detailImages = v
    //   console.log(this.form.detailImages)
    // },
    // removeChange(e, v) {
    //   // this.form.detailImages =v
    // },
    // 详情上传成功 上传成功
    // handleDetailimgSuccess(res) {
    //   console.log(res)
    //   this.$router.push('/user/reservation_service')
    // },
    // onSubmit(ruleForm) {
      // console.log(this.form)
      // this.param = new FormData();
      // this.param.append("bannerImage", this.form.bannerImage.raw)
      // this.param.append("appointmentTitle", this.form.appointmentTitle)
      // this.param.append("appointmentType", this.form.appointmentType)
      // this.param.append('timeStart', this.form.timeStart)
      // this.param.append('timeEnd', this.form.timeEnd)
      // this.param.append('businessDateList', this.form.businessDateList)
      // this.param.append("timeDuration", this.form.timeDuration)
      // this.param.append('userId', localStorage.getItem('user_id'))
      // for (var i = this.form.detailImages.length - 1; i >= 0; i--) {
      //   this.param.append('detailImages[' + i + ']', this.form.detailImages[i].raw)
      // }
      // this.$http({
      //     method: 'POST',
      //     url: baseUrl + 'appointment/',
      //     data: this.param,
      //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;multipart/form-data;boundary=AaB03x' },
      //     cache: false,
      //   })
      //   .then(function(res) {
      //     console.log(res.data)
      //   })
      //   .catch(function(err) {
      //     console.log('err', err);
      //   });
      // // this.$put(baseUrl + 'appointment/appointmentUpload',this.param).then(function(res){
      // //   console.log(res)
      // // })
    // }

      onSubmit(obc,index) {
      const _this =this
      // this.form.status = index
      this.$refs[obc].validate((valid) => {
      const _this = this
        if (valid) {
        this.$refs.upload.submit();
        this.$refs.imageDetailList.submit();

         this.$alert('是否确认提交', '提交确认', {
          confirmButtonText: '确定',
          callback: action => {
            _this.subm(obc)
          }
        });
        // setTimeout(this.subm(),5000)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    subm(obc){
      const _this = this
      axiosInstance({
        method: 'POST',
        url:baseUrl+"appointment/appointmentUploadQiniuPC",
        data:this.form,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      })
      .then(function(res) {
         _this.$message({
          message: '恭喜你，上传成功',
          type: 'success'
        });
           // _this.$refs[obc].resetFields(); 
         setTimeout(_this.locations,5000)
         console.log('res',res)
      })
      .catch(function(err) {
          console.log('err', err);
      });
    },
    locations(){
      this.$router.push('/user/reservation_add')
    }
  },
  created() {
    this.form.userId = localStorage.getItem("user_id")
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

.lists .information:nth-child(1) .dels {
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
#bannerImage{
  width: 40px;
  height: 40px;
  font-size: 40px;
}

</style>
