<template>
  <div class="ng-scope right_top">
    <div class="bes-right">
      <div class="">
        <div class="collect_top">
          <span class="collect_top_span">
      我的网站
    
    </span>
          <div class="addcity_top" @click="addcity()">
            +
          </div>
        </div>
        <ul class="bes-list user-list">
          <li v-for="(item, index) in data" :key="index">
            <h3 class="user-tit">{{item.webTitle}}</h3>
            <div class="user-cont">
              <p class="">{{item.webUrl}}</p>
            </div>
            <span class="change-btn change-btn1" @click="revise(index)">修改</span>
            <span class="change-btn" @click="del(index,item.webId)">删除</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机修改 弹框 -->
    <el-dialog title="网站" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.webTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input v-model="form.webUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 手机添加 弹框 -->
    <el-dialog title="网站添加" width="30%" :visible.sync="dialogadd">
      <el-form :model="add">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="add.webTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input v-model="add.webUrl" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogadd = false">取 消</el-button>
        <el-button type="primary" @click="addbtn()">确 定</el-button>
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
        webTitle: "",
        webUrl: ""
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    revise(id) {
      this.dialogFormVisible = true;
      this.form = this.data[id]
    },
    btn() {
      const _this = this
      _this.$http.post(baseUrl + 'web/updateWeb', qs.stringify(this.form)).then(function(res) {
        if (res.data.status == 200) {
          _this.dialogFormVisible = false;
        }
      })
    },
    del(ind, ite) {
      const _this = this
      _this.$http.get(baseUrl + 'web/deleteWeb?id='+ite).then(function(res) {
        if (res.data.status == 200) {
          _this.data.splice(ind, 1)
        }
      })
    },
    addcity() {
      this.dialogadd = true
      this.add.userId = localStorage.getItem('user_id')
      this.add.webTitle = ""
      this.add.webUrl = ""
    },
    addbtn() {
      const _this = this
      _this.$http.post(baseUrl + 'web/addWeb', qs.stringify(this.add)).then(function(res) {
        if (res.status == 200) {
          _this.dialogadd = false
   
          _this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
            _this.data.push(_this.add)
        }
      })
    }
  },
  created() {
    const _this = this
    _this.$http.get(baseUrl + "web/queryAllWeb?userId="+localStorage.getItem('user_id')).then(function(res) {
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
.user-tit{
  width:148px !important;
  text-align: left !important;
}
</style>
