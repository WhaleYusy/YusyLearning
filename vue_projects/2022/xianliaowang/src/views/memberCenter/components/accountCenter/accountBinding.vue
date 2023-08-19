<template>
  <div class="accountBinding_box">
    <div class="accountBinding_left">
      <p>您可以选择绑定微信账号，绑定后，您可以通过微信扫码快速登录商城网站。</p>
      <button @click="showCode">立即绑定</button>
    </div>
    <div class="accountBinding_right">
      <img src="../../../../assets/binding1.png" alt="">
      <img src="../../../../assets/binding2.png" alt="">
      <img src="../../../../assets/binding3.png" alt="">
    </div>
    <el-dialog title="请用微信扫一扫" :visible.sync="dialogVisible" align="center" width="300px">
      <img src="" alt="假装是个二维码">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialogVisible:false
    }
  },
  methods:{
    showCode(){
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.accountBinding_box{
  width: 958px;
  height: 270px;
  border: 1px solid #E5E5E5;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  .accountBinding_left{
    width: 60%;
    height: 100%;
    border-right: 1px solid #E5E5E5;
    p{
      color: #444444;
      font-weight: 600;
      font-size: 14px;
      margin-top: 100px;
    }
    button{
      width: 106px;
      height: 33px;
      border: none;
      outline: none;
      font-size: 15px;
      background: #FF7800;
      color: white;
      border-radius: 3px;
      margin-top: 35px;
    }
  }
  .accountBinding_right{
    width: 40%;
    height: 100%;
    padding-left: 90px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img{      
      margin-right: 10px;
    }
  }
}
</style>

