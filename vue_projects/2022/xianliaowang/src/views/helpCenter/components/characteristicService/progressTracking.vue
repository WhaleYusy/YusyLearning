<template>
  <div class="progressTracking_box">
    <p class="child_cont" style="margin:40px 0;">进度跟踪，包括2方面的内容：</p>
    <h2 class="progressTracking_title">1、商城订单处理进度 2、快递送货进度</h2>
    <p class="child_cont">以上2个都可以在商城网页上快速查询。</p>
    <h2 class="progressTracking_title">1、商城订单处理进度</h2>
    <p class="child_cont">订单的处理进度，包括审单、提交仓库取货、仓库扫描出货、打印送货单、打印快递单、发货等。</p>
    <p class="child_cont">在商城，都是实时展现的。</p>
    <p class="child_cont">您可以在会员中心，我的订单中，点击查看进度。</p>
    <img src="../../../../assets/progressTracking1.jpg" alt class="progressTracking_img">
    <h2 class="progressTracking_title">2、快递送货进度</h2>
    <p class="child_cont">订单出库后，我们交付与我们合作的几个快递公司进行寄送。</p>
    <p class="child_cont">闲料网与几大快递公司（顺丰、港中能达、联昊通、EMS）都有数据接口对接，您可以直接在商城就查看到。</p>
    <p class="child_cont">真实的快递进度情况。如下图：</p>
    <img src="../../../../assets/progressTracking2.jpg" alt class="progressTracking_img">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.progressTracking_box{
  text-align: center;
}
.progressTracking_title{  
  font-size: 15px;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 40px;
}
.progressTracking_title_o{
  color: #666666;
  font-size: 14px;
  margin-top: 30px;
}
.child_cont{
  width: 100%;
  text-align: left;  
  font-size: 13px;
  line-height: 1.75;
  margin: 5px 0;
}
</style>

