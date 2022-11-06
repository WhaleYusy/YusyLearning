<template>
  <div class="login_box">
    <div class="login_box_top">
      <!-- <img src="../../assets/loginImg/name.gif" alt="" /> -->
      <img src="../../../img/youwei.jpg" @click="$router.push('/home/index')" alt="闲料网网站" />
      <router-link to="/">闲料网网站</router-link>
    </div>
    <div class="login_box_middle">
      <router-view />
    </div>
    <div class="login_box_bottom">
      <p>闲料网服务QQ：2853505357 / 服务热线：0755-27808512</p>
      <p>
        <a href="http://www.beian.miit.gov.cn" target="_bank" >粤ICP备18032083号</a>
      </p>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.login_box {
  width: 100%;
  .login_box_top {
    width: 100%;
    height: 100px;
    max-width: 1050px;
    background: white;
    margin: 0 auto;
    // padding: 45px 0 30px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 180px;
      height: 60px;
      cursor: pointer;
    }
    a {
      font-size: 16px;
      color: #6c6c6c;
      padding-top: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      &:hover {
        color: red;
        text-decoration: none;
      }
    }
  }
  .login_box_middle {
    width: 100%;
    background: #c7e6f5;
    padding: 20px;
    box-sizing: border-box;
  }
  .login_box_bottom {
    width: 100%;
    max-width: 1000px;
    text-align: center;
    margin: 20px auto;
    font-size: 15px;
    p {
      margin-top: 10px;
      a {
        color: #333333;
      }
      a:hover{
        color: #0094e7;
      }
    }
  }
}
</style>

