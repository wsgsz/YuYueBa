<template>
  <div>
    <div style="height:50px;"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上传logo">
        <el-upload ref="upload" class="avatar-uploader" name="bannerImage" :action="baseUrl+'appointment/appointmentUpload'" :show-file-list="false" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false"  :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.appointmentTitle"></el-input>
      </el-form-item>
      <el-form-item label="持续时间">
        <el-col :span="16" style="display:flex;justify-content: space-between;">
          <el-time-select placeholder="起始时间" v-model="form.timeStart" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="form.timeEnd" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime:form.timeStart
    }">
          </el-time-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker v-model="form.businessDateList" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="dates" placeholder="选择日期" :picker-options="pickerOptions1">
        </el-date-picker>
        <!--     <el-date-picker type="dates" v-model="form.businessDateList" placeholder="选择一个或多个日期">
        </el-date-picker> -->
      </el-form-item>
      <el-form-item label="持续时长">
        <el-input-number v-model="form.timeDuration" :min="1" :max="3600" label="持续时间长度"></el-input-number>
      </el-form-item>
      <el-form-item label="服务详情">
        <el-input type="textarea" v-model="form.appointmentDetail"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <!-- <infor-upload @ievent="ievent"></infor-upload> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import inforUpload from '@/components/org/uploader/index'
import { baseUrl, imgUrl } from '@/api/env'
import axios from 'axios'
export default {
  data() {
    return {
      baseUrl,
      imgUrl,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      imageUrl: "",
      form: {
        appointmentType: "1",
        appointmentTitle: "我的服务",
        appointmentDetail: "我的服务",
        userId: "1",
        timeStart: "09:00:00",
        timeEnd: "09:30:00", //结束
        timeDuration: "60",
        // bannerImage: '',
        // timeDuration: "",
        // detailImages: [],
        businessDateList: [],
      },
      imgData: {
        accept: 'image/*',
      },
      bannerImage: "",
    }
  },
  components: {
    // inforUpload
  },
  methods: {
    // banner  上传成功
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
   handleAvatarSuccess(res, file) {
        console.log(res)
      },
    // ievent(imgall) {
    //   console.log(imgall)
    //   this.form.detailImages = imgall
    // },
    // uploadChange(event) {
    //   if (event.target.files.length > 0) {
    //     this.files = event.target.files[0]; //提交的图片  
    //     this.getBase64(event.target, (url) => {
    //       console.log(url)
    //       this.bannerImage = 'data:image/png;base64,' + url //显示的图片  
    //     });
    //   }
    //   this.form.bannerImage = event.target.files[0]
    // },
    // getBase64: function(file, callback) {
    //   var maxWidth = 640;
    //   if (file.files && file.files[0]) {
    //     var thisFile = file.files[0];
    //     if (thisFile.size > 2019200) {
    //       // mualert.alertBox("图片不能超过800K");  
    //       alert("图片不能超过2M");
    //       return
    //     };
    //     var reader = new FileReader();
    //     reader.onload = function(event) {
    //       var imgUrl = event.target.result;
    //       var img = new Image();
    //       img.onload = function() {
    //         var canvasId = 'canvasBase64Imgid',
    //           canvas = document.getElementById(canvasId);
    //         if (canvas != null) { document.body.removeChild(canvas); }
    //         var canvas = document.createElement("canvas");
    //         canvas.innerHTML = 'New Canvas';
    //         canvas.setAttribute("id", canvasId);
    //         canvas.style.display = 'none';
    //         document.body.appendChild(canvas);
    //         canvas.width = this.width;
    //         canvas.height = this.height;
    //         var imageWidth = this.width,
    //           imageHeight = this.height;
    //         if (this.width > maxWidth) {
    //           imageWidth = maxWidth;
    //           imageHeight = this.height * maxWidth / this.width;
    //           canvas.width = imageWidth;
    //           canvas.height = imageHeight;
    //         }
    //         var context = canvas.getContext('2d');
    //         context.clearRect(0, 0, imageWidth, imageHeight);
    //         context.drawImage(this, 0, 0, imageWidth, imageHeight);
    //         var base64 = canvas.toDataURL('image/png', 1);
    //         var imgbase = base64.substr(22);
    //         callback(imgbase)
    //       }
    //       img.src = imgUrl;
    //     }
    //     reader.readAsDataURL(file.files[0]);
    //   }
    // },
    onSubmit() {

      this.$refs.upload.submit();


      // console.log('submit!');
      // console.log(this.form)

      // console.log(formData.get("bannerImage"))
      // axios.post(baseUrl + "appointment/appointmentUpload", formData, config)
      //   .then(response => {
      //     console.log(response)
      //   })

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

</style>
