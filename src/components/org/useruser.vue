<template>
  <div>
    <div class="bes-nav clearfix">
      <span>{{user_info.user_name}}</span><span>手机已绑定</span><span>{{user_info.user_phoneNum}}</span><em @click="inforevise()">修改</em>
      <router-link to="/information" class="fabu">发布信息</router-link>
    </div>
    <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="个人昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择活动区域">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="girl"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "useruser",
  data() {
    return {
      user_info: '',
      form: {
        name: '',
        sex: '',
        type: [],
        resource: '',
        desc: ''
      },
      dialogFormVisible: false
    }
  },
  methods: {
    inforevise() {
      console.log("修改个人资料")
      this.dialogFormVisible = true
    },
    onSubmit() {
      console.log('submit!');

    }
  },
  created() {
    const _this = this
    _this.$post("user/query.php", { "user_id": localStorage.getItem("user_id") }).then(function(response) {
      _this.user_info = response.data[0]
    });
  }
}

</script>
<style scoped>
@import "../../assets/css/my-bespoke.css"

</style>
