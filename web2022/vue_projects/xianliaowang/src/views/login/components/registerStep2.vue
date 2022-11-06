<template>
  <div class="register_Step_One_box">
    <p class="title">
      <span>用户注册 <i class="fa fa-pencil" aria-hidden="true"></i></span>
      <span><router-link to="/login/login">已有账号?<span style="color:red" >去登录 > > ></span></router-link></span>
    </p>
    <div class="register_Step_One_form">
      <!-- 注册第二步 -->
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-form-item >     
            <p class="tips">如咨询过服务人员，请填写的服务代号(您将得到服务人员专享服务)</p>
          </el-form-item>
          <el-form-item >     
            <div class="item-form"> 
              <el-radio v-model="radio" label="1">服务专员</el-radio> 
              <el-input v-model="val" v-if="radio == 1" class="el-input"></el-input>
            </div>
            <p style="margin-left:25px;color:red;" v-if="radio == 1" >注：请输入服务人员编号，有专门服务人员为您服务</p>
            <el-radio v-model="radio" label="2">我确实不清楚以上选项，直接注册</el-radio>
          </el-form-item>
          <el-form-item >          
            <el-button class="next_btn" @click="nextStep">下一步</el-button>
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
        formLabelAlign:{},
        radio:'1',
        val:''
      };
    },

    methods: {
      nextStep(){
        this.$router.push('/login/registerStepThree')
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
    margin: 30px auto ;
    .tips{
      font-size: 15px;
    }
    .item-form{
      display: flex;
      align-items: center;
      .el-input{
        width: 200px;
      }
    }
    .next_btn{
      width: 200px;
      background: #FC6E06;
      color: #ffffff;
    }
  }
}
</style>


