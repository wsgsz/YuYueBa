<template>
  <div class="ng-scope right_top">
    <div class="bes-right">
      <div class="">
        <div class="collect_top">
          <span class="collect_top_span">
      我的摄像头
    
    </span>
          <div class="addcity_top" @click="addcity()">
            +
          </div>
        </div>
        <ul class="bes-list user-list">
          <li v-for="(item, index) in data" :key="index">
            <h3 class="user-tit">{{item.webcamName}}</h3>
            <div class="user-cont" style="width:100px;">
              <p class="">{{item.webcamDevicesn}}</p>
            </div>
            <span class="change-btn change-btn1" @click="revise(index)">修改</span>
            <span class="change-btn" @click="del(index,item.webcamId)">删除</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 修改 弹框 -->
    <el-dialog title="添加摄像头" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="webcamName" :rules="[{ required: true, message: '设备名称不能为空'}]">
          <el-input v-model="form.webcamName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序列号" :label-width="formLabelWidth" prop="webcamDevicesn" :rules="[{ required: true, message: '设备序列号不能为空'}]">
          <el-input v-model="form.webcamDevicesn" auto-complete="off"></el-input>
        </el-form-item>
           <el-form-item label="密码" :label-width="formLabelWidth" prop="webcamPassword" :rules="[{ required: true, message: '摄像头设置密码不能为空'}]">
          <el-input v-model="form.webcamPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qxtianjia()">取 消</el-button>
        <el-button type="primary" @click="tianjiabtn('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加 弹框 -->
    <el-dialog title="摄像头添加" width="30%" :visible.sync="dialogadd" ref="add">
      <el-form :model="add" ref="add">
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="webcamName" :rules="[{ required: true, message: '设备名称不能为空'}]">
          <el-input v-model="add.webcamName" auto-complete="off" placeholder="输入设备名称，如：会议摄像头"></el-input>
        </el-form-item>
        <el-form-item label="序列号" :label-width="formLabelWidth" prop="webcamDevicesn" :rules="[{ required: true, message: '设备序列号不能为空'}]">
          <el-input v-model="add.webcamDevicesn" auto-complete="off" placeholder="输入设备序列号，如：a1"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="webcamPassword" :rules="[{ required: true, message: '摄像头设置密码不能为空'}]">
          <el-input v-model="add.webcamPassword" auto-complete="off" placeholder="请为摄像头设置密码,如：20182018"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogadd = false">取 消</el-button>
        <el-button type="primary" @click="addtianjiabtn('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import qs from 'qs'
export default {
  data() {
    return {
      data: "",
      dialogFormVisible: false,
      dialogadd: false,
      // 手机号码 修改
      form: {},
      add: {
        userId: "",
        webcamName: "",
        webcamDevicesn: "",
        webcamPassword: ""
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    // 修改
    revise(id) {
      this.dialogFormVisible = true;
      this.form = this.data[id]
    },
    // 修改
    tianjiabtn(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$http.post(baseUrl + 'webcam/updateWebcam', qs.stringify(this.form)).then(function(res) {
            if (res.data.status == 200) {
              _this.dialogFormVisible = false;
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消添加
    qxtianjia() {
      const _this = this
      _this.$http.get(baseUrl + "webcam/queryAllWebcam?userId="+localStorage.getItem('user_id')).then(function(res) {
        _this.data = res.data.data
        _this.dialogFormVisible = false;
      })

    },
    del(ind, ite) {
      const _this = this
      _this.$http.get(baseUrl + 'webcam/deleteWebcam?id='+ite).then(function(res) {
        if (res.data.status == 200) {
          _this.data.splice(ind, 1)
        }
      })
    },
    addcity() {
      this.dialogadd = true
      this.add.userId = localStorage.getItem('user_id')
      this.add.webcamName = ""
      this.add.webcamDevicesn = ""
      this.add.webcamPassword = ''
    },
    addtianjiabtn(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$http.post(baseUrl + 'webcam/addWebcam',qs.stringify(this.add)).then(function(res) {
            if (res.data.status == 200) {
              _this.data.push(_this.add)
              _this.dialogadd = false
              _this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              _this.data.push(_this.add)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    const _this = this
    _this.$http.get(baseUrl + "webcam/queryAllWebcam?userId="+localStorage.getItem('user_id') ).then(function(res) {
      _this.data = res.data.data
    })
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css";
.addcity {
  display: block;
  text-align: center;
  padding: 18px;
  cursor: pointer;
  border-top: 1px #e5e5e5 solid
}

.user-list li .user-tit {
  border-right: 0px;
}

.change-btn1 {
  margin-right: 20px;
}

.user-tit {
  width: 448px !important;
  text-decoration: none;
  text-align: left !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 0px;
}

</style>
