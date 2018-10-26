<template>
  <div>
    <div style="height:50px;"></div>
 <el-form>
        <el-form-item label="图片上传：" style="position: relative">
            <div>
              <el-upload
                ref="upload"
                action="https://upload-z2.qiniup.com"
                list-type="picture-card"
                :file-list="exitFileList"
                :auto-upload="false"
                :drag="true"
                :http-request="uploadQiniu"
                :on-change="onFilesAdded"
                :on-remove="onFilesRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog  size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
            <p style="position:absolute;bottom: -30px;">注：最多上传3张，图片格式为JPG,PNG，文件大小不超过10M</p>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateEquipFaultDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="saveEquipFault">确 定</el-button>
      </div>
    <!-- 选择 -->
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from "qs"
import axios from 'axios'
import moment from 'moment';
const axiosInstance = axios.create({});
export default {
  data() {
    return {
     exitFileList: [],
     newFileList: [],
     uploadToken:""
    }
  },
  methods: {
     uploadQiniu: function (request) {
       let _this = this;
       axios.get(baseUrl+'qiniu/getQiniuUploadToken').then(function(res){
        console.log(res.data.data)
        _this.uploadToken = res.data.data
        console.log(_this.uploadToken)
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
                      onUploadProgress: function(progressEvent) {
                          var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                          //console.log(percentCompleted)
                          //对应上传进度条
                          _this.progress = percentCompleted;
                      },
                  })
                .then(function(res) {
                   console.log('res',res)
                    // let { base_url, path } = res.data;
                    // //页面所用字段
                    // _this.previewAvatar = `${base_url}${path}?imageView2/1/w/154/h/154`;
                    // //传给后台不完整  
                    // _this.formData.avatar = `${path}`;

                })
                .catch(function(err) {
                    console.log('err', err);
                });
        // lrz(file, { width: 800, height: 800, quality: 0.7 }).then((rst) => {
        //   const config = {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //   };
        //   const keyName = `enteringExamine${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`;
        //   const formData = new FormData();
        //   formData.append('file', rst.file);
        //   formData.append('token', this.uptoken);
        //   formData.append('key', keyName);
        //   this.$http.post('https://upload-z2.qiniup.com', formData, config)
        //     .then((res) => {
        //       this.equipFaultForm.troublePicUrls.push(res.data.key);
        //       this.uploadedFileList.push(res.data.key);
        //       if (this.newFileList.length === this.uploadedFileList.length) {
        //         this.updateEquipFaultInfo();
        //       }
        //     }, (err) => {
        //       err.onError();
        //     });
        //   return rst;
        // }).catch((err) => {
        //   console.error(err);
        // }).always(() => {
        // });  
         })
      },
       onFilesAdded: function (file, fileList) {
        if (fileList.length > 3) {
          fileList.splice(fileList.indexOf(file), 1);
        }
        this.newFileList = fileList.filter(f => f.status === 'ready');
      },    
      onFilesRemove: function (file, fileList) {
        this.newFileList = fileList.filter(f => f.status === 'ready');
        this.equipFaultForm.troublePicUrls.splice(this.equipFaultForm.troublePicUrls.indexOf(file), 1);
      },
         saveEquipFault: function () {
        // this.equipFaultForm.orderID = this.currentOrder.orderID;
        // this.equipFaultForm.orderItemID = this.selectedRow.orderItemID;
        if (this.newFileList.length > 0) {
          this.$refs.upload.submit();
          return;
        }
        this.updateEquipFaultInfo();
      },    
      updateEquipFaultInfo: function () {
        // this.postJSON('/examine/updateequipfaultinfo', this.equipFaultForm, (data) => {
        //   if (data.errcode === 0) {
        //     this.uploadedFileList = [];
        //     this.updateEquipFaultDialog = false;
        //     this.getExamineOrderList();
        //     this.$message.success(data.errmsg);
        //     return;
        //   }
        //   this.$message.error(data.errmsg);
        // });
      },

  },
  created() {
  }

}

</script>
<style scoped>
</style>
