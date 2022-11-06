<template>
  <div class="register_Step_One_box">
    <p class="title">
      <span>用户注册 <i class="fa fa-pencil" aria-hidden="true"></i></span>
      <span><router-link to="/login/login">已有账号?<span style="color:red" >去登录 > > ></span></router-link></span>
    </p>
    <div class="register_Step_One_form">
      <!-- 注册第三步 -->
        <el-form label-position="right" label-width="180px" :model="formLabelAlign">
          <el-form-item label="输入密码：">
          <el-input type="password" v-model="formLabelAlign.password" placeholder="密码以6-18位的数字与字母组合,可以包含数学字符" class="el_inp" ></el-input>
        </el-form-item>
        <el-form-item label="输入确认密码：">
          <el-input type="password" v-model="formLabelAlign.confrimPswd" placeholder="密码以6-18位的数字与字母组合,可以包含数学字符" class="el_inp" ></el-input>
        </el-form-item>
          <el-form-item >          
            <el-button class="next_btn" @click="nextStep">完成</el-button>
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
        formLabelAlign:{
          password:'',
          confrimPswd:''
        },
        radio:'1',
        val:''
      };
    },
    mounted(){
      
    },
    methods: {
      nextStep(val){
        if(this.formLabelAlign.password == ''){
          this.$message('请输入密码');
          return
        }
        if(!/(?=.{4,18})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i.test(this.formLabelAlign.password)){
          this.$message('密码以6-18位的数字与字母组合,可以包含数学字符');
          return
        }
        if(this.formLabelAlign.confrimPswd == ''){
          this.$message('请输入确认密码');
          return
        }
        if(this.formLabelAlign.confrimPswd !== this.formLabelAlign.password){
          this.$message('两次密码输入不一致');
          return
        }
        this.formLabelAlign.password = this.$md5(this.formLabelAlign.password);
        this.formLabelAlign.confrimPswd = this.$md5(this.formLabelAlign.confrimPswd);
        this.formLabelAlign.phone = this.$route.query.phone;
        this.formLabelAlign.qqNum = this.$route.query.qq;
        this.$http.post('/pc/user/register',this.formLabelAlign).then((res)=>{
          if(res.data.data.code == 1){
             //console.log(res)
            this.$message({message:res.data.data.msg,type:'success'});
            this.$router.push('/login/index');
          }else{
            this.$message.error(res.data.data.msg);
          }
        }).catch(err=>{
           //console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.register_Step_One_box{
  width: 100%;
  min-height: 370px;
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
    width: 70%;
    margin: 65px auto 0 ;
    .tips{
      font-size: 15px;
    }
    .el-input{
      width: 350px;
    }
    .next_btn{
      width: 200px;
      background: #FC6E06;
      color: #ffffff;
    }
  }
}
</style>


