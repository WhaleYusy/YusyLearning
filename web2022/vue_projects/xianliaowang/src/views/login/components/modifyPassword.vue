<template>
  <div class="modify_password_box">
    <p class="title">
      <span>
        修改密码
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </span>
    </p>
    <div class="modify_password_form">
      <!-- 注册第三步 -->
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <!-- <el-form-item label="客户编号：">
            <p class="custmer_no">521168A</p>
        </el-form-item>-->
        <el-form-item label="输入原密码：">
          <el-input v-model="formLabelAlign.oldPswd" placeholder="请输入原密码" class="el_inp" type="password"></el-input>
        </el-form-item>
        <el-form-item label="输入新密码：	">
          <el-input v-model="formLabelAlign.password" placeholder="密码以6-18位的数字与字母组合,可以包含数学字符" class="el_inp" type="password" ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：	">
          <el-input v-model="formLabelAlign.confrimPswd" placeholder="密码以6-18位的数字与字母组合,可以包含数学字符" class="el_inp" type="password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="next_btn" @click="nextStep">完&nbsp;&nbsp;&nbsp;&nbsp;成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: 1,
      formLabelAlign: {
      },
      radio: "1",
      val: ""
    };
  },

  methods: {
    nextStep() {
        if(this.formLabelAlign.oldPswd == ''){
          this.$message('请输入旧密码')
          return
        }
        if(this.formLabelAlign.password == ''){
          this.$message('请输入新密码')
          return
        }
        if(!/(?=.{4,18})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i.test(this.formLabelAlign.password)
        || !/(?=.{4,18})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i.test(this.formLabelAlign.confrimPswd)
        ){
          this.$message('密码以6-18位的数字与字母组合,可以包含数学字符');
          return
        }
        if(this.formLabelAlign.confrimPswd == ''){
          this.$message('请输入确认密码')
          return
        }
        if(this.formLabelAlign.confrimPswd !== this.formLabelAlign.password){
          this.$message('两次输入密码不相等')
          return
        }
        this.formLabelAlign.oldPswd = this.$md5(this.formLabelAlign.oldPswd)
        this.formLabelAlign.password = this.$md5(this.formLabelAlign.password)
        this.formLabelAlign.confrimPswd = this.$md5(this.formLabelAlign.confrimPswd)
        this.$http.post('/pc/user/updateUserPswdByOldPswd',this.formLabelAlign).then(res=>{
          if(res.data.data.code == 1){
            this.$message(res.data.data.msg + '请重新登录')
            sessionStorage.removeItem('userInfo');
            this.$router.replace("/login/index")
          }else{
            this.$message(res.data.data.msg)
          }
        }).catch(res=>{ console.log(res) })
    }
  }
};
</script>

<style lang="scss" scoped>
.modify_password_box {
  width: 100%;
  min-height: 500px;
  max-width: 1000px;
  margin: 20px auto;
  border-radius: 5px;
  background: #f8f8f8;
  .title {
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 22px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #efefef;
    color: #6f6f6f;
    span:nth-of-type(2) {
      font-size: 15px;
      font-weight: bold;
      a {
        color: #6f6f6f;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
  .modify_password_form {
    width: 60%;
    margin: 30px auto;
    .tips {
      font-size: 15px;
    }
    .el-input {
      width: 250px;
    }
    .next_btn {
      width: 200px;
      height: 45px;
      background: #fc6e06;
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
    }
    .custmer_no {
      font-weight: bold;
      color: #007fd0;
      font-size: 16px;
    }
  }
}
</style>


