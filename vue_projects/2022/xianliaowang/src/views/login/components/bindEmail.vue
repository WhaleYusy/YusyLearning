<template>
  <div class="register_Step_One_box">
    <p class="title">
      <span>绑定邮箱 <i class="fa fa-envelope" aria-hidden="true"></i></span>
    </p>
    <div class="register_Step_One_form">
      <!-- 注册第一步 -->
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <el-form-item label="输入您的邮箱：">
          <el-input v-model="formLabelAlign.name" placeholder="填写11位长度手机号" class="el_inp" ></el-input>
        </el-form-item>
        <el-form-item label="输入图片校验码：">
          <div class="item_flex">
            <el-input v-model="formLabelAlign.region" placeholder="填写图片校验码" class="el_inp"></el-input>
            <img src="../../../assets/loginImg/image.jpg" class="code_img" />
          </div>
        </el-form-item>
        <el-form-item label="输入邮箱验证码：">
          <div class="item_flex">
            <el-input v-model="formLabelAlign.type" placeholder="填写手机收到的验证码"  class="el_inp"></el-input>
            <el-button style="border:1px solid #EA8A01;color:#EA8A01">发送验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item >          
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
        formLabelAlign:{}
      };
    },

    methods: {
      nextStep(){
       
      }
    }
  }
</script>

<style lang="scss" scoped>
.register_Step_One_box{
  width: 100%;
  min-height: 530px;
  max-width: 1000px;
  margin: 20px auto;
  border-radius: 5px;  
  background: #F8F8F8;
  .title{
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #EFEFEF;
    color: #6F6F6F;
    span:nth-of-type(2){
      font-size: 15px;
      font-weight: bold;
      a{
        color: #6F6F6F;
        &:hover{
          text-decoration: none;
        }
      }        
    }
  }
  .register_Step_One_form{
    width: 60%;
    margin: 50px auto 30px;
    .el_inp{
      width: 300px;
      margin-right: 5px;
    }
    .service{
      margin-left: -30px;
      &:hover{
        text-decoration: none;
      }
    }
    .next_btn{
      width: 200px;
      background: #FC6E06;
      color: #ffffff;
    }
  }
}
.item_flex{
  display: flex;
  .code_img{
    width: 63px;
    height: 40px;
  }
}
</style>

