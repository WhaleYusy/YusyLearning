<template>
  <div class="appPage">
    <div class="appPageBanner">
      <div class="conditionDesc">
        <div class="conditionDescItem">
          <h1>商品选购物</h1>
          <p>明码标价，海量现货一站式购齐</p>
        </div>
        <div class="conditionDescItem">
          <h1>便捷支付</h1>
          <p>支持微信/支付宝/预付余额支付等</p>
        </div>
        <div class="conditionDescItem">
          <h1>闪电发货</h1>
          <p>正品现货库存，4小时闪电发货</p>
        </div>
        <div class="conditionDescItem">
          <h1>进度跟踪</h1>
          <p>随时随地了解您的订单处理进度</p>
        </div>
      </div>
    </div>
    <div class="downLoadBtn">
      <div class="andriodBtn">
        <i class="color:white;font-size:12px">图标</i>
        <span>Andriod版下载</span>
      </div>
      <div class="iosBtn">
        <i class="color:white;font-size:12px">图标</i>
        <span>ios版下载</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.appPage {
  width: 100%;
  height: 710px;
  background: url("../falseData/img/7.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .conditionDesc {
    width: 100%;
    height: 88px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .conditionDescItem {
      width: 220px;
      height: 46px;
      display: flex;
      flex-direction: column;
      line-height: 25px;
      border-left: 3px solid white;
      padding-left: 6px;
      box-sizing: border-box;
      color: white;
      h1 {
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
    }
  }
  .downLoadBtn {
    position: absolute;
    right: 200px;
    top: 30%;
    display: flex;
    .andriodBtn {
      width: 246px;
      height: 58px;
      border-radius: 35px;
      color: white;
      background: orangered;
      font-size: 20px;
      text-align: center;
      line-height: 58px;
      margin-right: 20px;
    }
    .iosBtn {
      width: 246px;
      height: 58px;
      border-radius: 35px;
      color: white;
      border: 2px solid white;
      font-size: 20px;
      text-align: center;
      line-height: 58px;
    }
  }
}
</style>

