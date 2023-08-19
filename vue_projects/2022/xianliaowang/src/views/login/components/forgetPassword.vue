<template>
  <div class="register_Step_One_box">    
    <p class="title">
      <span>找回密码 <i class="fa fa-pencil" aria-hidden="true"></i></span>
      <span class="float"><router-link to="/login/index">已有账号?<span style="color:red" >去登录 > > ></span></router-link></span>
    </p>
    <!-- 步骤条 -->
    <el-steps :active="step" finish-status="success" simple style="margin-top: 30px" >
      <!-- <el-step title="1选择找回方式" icon="el-icon-edit"></el-step> -->
      <el-step style="width:80%;" title="1 验证用户身份" icon="el-icon-upload"></el-step>
      <el-step title="2 设置密码" icon="el-icon-picture"></el-step>
    </el-steps>
    <!-- 第一步 -->
    <!-- <div class="register_Step_One_form" v-if="step == 3" >
      <div class="register_Step_first">
        <ul>
          <li>
            <img src="../../../assets/loginImg/select_by.png" alt="" @click="findType('phone')">
            <p>使用手机找回客编及密码</p>
          </li>
          <li>
            <img src="../../../assets/loginImg/select_by1.png" alt="" @click="findType('mail')">
            <p>使用邮箱找回客编及密码</p>
          </li>
        </ul>
      </div>
      <el-button class="next_btn next_btn1" @click="nextStep">下一步</el-button>
    </div> -->
    <!-- 第二步 -->
    <div class="register_Step_One_form" v-if="step == 1" >
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <el-form-item label="填写您的手机号码：">
          <el-input v-model="formLabelAlign.phone"  class="el_inp" ></el-input>
        </el-form-item>
        <el-form-item label="输入图片校验码：">
          <div class="item_flex">
            <el-input v-model="formLabelAlign.imgCode"  class="el_inp"></el-input>
            <img :src="'data:image/jpeg;base64,'+codeImg" class="code_img" @click="getCodeImg" />
          </div>
        </el-form-item>
        <el-form-item label="输入手机验证码：">
          <div class="item_flex">
            <el-input v-model="formLabelAlign.phoneCode"   class="el_inp"></el-input>
            <el-button style="border:1px solid #EA8A01;color:#EA8A01" @click="countDown" v-if="num == 0 || num == 60" >发送验证码</el-button>
            <el-button style="border:1px solid #EA8A01;color:#EA8A01" v-else >倒计时 {{num}} s</el-button>
          </div>
        </el-form-item>
        <el-form-item >   
          <el-button class="next_btn" @click="nextStep">下一步</el-button>
          <!-- <span v-if="isPhone" style="margin-left:10px;color:#007FD0;cursor: pointer;" @click="changeType('phone')">使用邮箱找回密码</span> -->
          <!-- <span v-else style="margin-left:10px;color:#007FD0;cursor: pointer;" @click="changeType('mail')">使用手机号找回密码</span> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 第三步 -->
    <div class="register_Step_One_form" v-if="step == 2">
      <el-form label-position="right" label-width="180px" :model="formLabelAlign">
        <!-- <el-form-item label="客服编号：" >
          <span style="color:#007FD0;font-size:15px;font-weight: bold;">168168</span>
        </el-form-item> -->
        <el-form-item label="输入新密码：">
          <el-input type="password" v-model="formLabelAlign.password" placeholder="字母与数字组合至少6位"  class="el_inp" ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：">
          <el-input type="password"  v-model="formLabelAlign.confrimPswd" placeholder="字母与数字组合至少6位" class="el_inp" ></el-input>
        </el-form-item>
        <el-form-item >          
          <el-button class="next_btn" @click="handleSubmit" >完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom_title">
      <p class="bottom_title_tip">
        <i class="fa fa-exclamation-circle"></i> 如以上方式都不可行的情况下，请选择以下方式
      </p>
      <div>
        <p>1、加我公司的企业 <span style="color:#1196DB">产品运营部：0755-27808512</span></p>
        <p>2、提供相关的查询资料 如：贵方的公司名，联系地址，联系信息</p>
        <p>3、我司工作人员核实了相关信息，如果系统上存在信息，则我司会与系统上记录人进行联系。
     如果联系后，对方同意，则把你的客户编号及初始化后的密码发到您的手机上，如果对方不同意，则只有重新注册。
     如果无法核实到或者联系不到注册的联系人，则只有重新注册客户资料</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: 1,
        formLabelAlign:{
          phone:'',
          imgCode:'',
          phoneCode:'',
          password:'',
          confrimPswd:''
        },
        step:1,
        isPhone:true,
        num:60,
        codeImg:''
      };
    },
    mounted(){
      this.getCodeImg();
    },
    methods: {
      // 下一步
      nextStep(){
        if(this.formLabelAlign.phone == ''){
          this.$message('请输入手机号码')
          return
        }
        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.formLabelAlign.phone)){
          this.$message(`手机号格式不正确`);
          return
        }
        if(this.formLabelAlign.imgCode == ''){
          this.$message('请输入图片验证码')
          return
        }
        if(this.formLabelAlign.phoneCode == ''){
          this.$message('请输入手机验证码')
          return
        }
        this.$http.post(`/pc/sms/findPswdByPhone`,this.formLabelAlign).then((res)=>{
          if(res.data.data.code == 1){         
            this.step = 2;
          }else{
            this.getCodeImg();
            this.$message.error(res.data.data.msg);
          }
        }).catch((err)=>{
           //console.log(err)
          this.$message({message:'',type:'danger'});
        })
      },
      // 获取验证码+倒计时
      countDown(){
        if(this.formLabelAlign.phone == ''){
          this.$message('请输入手机号码')
          return
        }
        clearInterval(this.timer);
        this.$http.post(`/pc/sms/sendSms/${this.formLabelAlign.phone}`).then((res)=>{
           //console.log(res)
          if(res.data.data.code == 1){
            this.$message({message: res.data.data.msg,type: 'success'});
            let that = this;
            this.num = 60;
            this.timer = setInterval(function(){
              if(that.num > 0){
                that.num -= 1
              }else{
                clearInterval(that.timer);
              }
            },1000)
          }else{
            this.$message.error(res.data.data.msg);
          }
        }).catch((err)=>{
           //console.log(err)
        })
      },
      // 获取图片验证码
      getCodeImg(){
        this.$http.get(`/pc/sms/getCodeImg?${new Date().getTime()}`).then((res)=>{
            this.codeImg = res.data.data.base64
          //  //console.log(res)
        })
      },
      // 完成提交
      handleSubmit(){
        if(this.formLabelAlign.password == ''){
          this.$message('请输入新密码')
          return
        }
        if(!/(?=.{4,18})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i.test(this.formLabelAlign.password)){
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
        this.formLabelAlign.password = this.$md5(this.formLabelAlign.password);
        this.formLabelAlign.confrimPswd = this.$md5(this.formLabelAlign.confrimPswd);
        this.$http.post('/pc/user/updateUserPswd',this.formLabelAlign).then((res)=>{
          if(res.data.data.code == 1){
            this.$message({message:res.data.data.msg,type:'success'});    
            this.$router.push('/login/index');        
          }else{
            this.$message.error(res.data.data.msg);
          }

        }).catch((err)=>{

        })

      }
      // findType(val){
      //   this.step += 1;
      //   if(val == 'phone'){
      //     this.isPhone = true;
      //   }else{
      //     this.isPhone = false;
      //   }
      // },
      // changeType(val){
      //   if(val == 'phone'){
      //     this.isPhone = false;
      //   }else{
      //     this.isPhone = true;
      //   }
      // },
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
    .float{
      float: right;
    }
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
    .register_Step_first{
      display: flex;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          p{
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .service{
      margin-left: -30px;
      &:hover{
        text-decoration: none;
      }
    }
    .next_btn{
      width: 150px;
      background: #FC6E06;
      color: #ffffff;
    }
    .next_btn1{
      margin-left: 200px;
      margin-top: 50px;
    }
  }
  .bottom_title{
    width: 100%;
    height: 130px;
    p{
      font-size: 12px;
      margin-top: 3px;
      line-height: 15px;
    }
    .bottom_title_tip{
      width: 90%;
      margin: 0 auto;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      font-size: 12px;
      color: red;
      border-bottom: 1px dashed #DADADA;
    }
    div{
      padding: 10px 80px;
      box-sizing: border-box;
    }
  }
}
.item_flex{
  display: flex;
  .code_img{
    width: 110px;
    height: 40px;
  }
}
/deep/ .el-steps--simple{
  //ie10样式乱掉
  width:84% !important;
  height: 30px !important;
}
// .el-steps /deep/ .is-simple{
//   //ie10样式乱掉
//   width:80%;
// }
</style>


