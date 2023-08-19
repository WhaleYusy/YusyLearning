<template>
  <div class="commoditySearch_box">
    <h2 class="commoditySearch_title">如何搜索商品？</h2>
    <p class="child_cont">闲料网有10万种现货元器件。因为命名方式的不同，可能会给您搜索比较麻烦。</p>
    <p class="child_cont">闲料网提供两种搜索方式：1、全局搜索 2、在子目录下搜索。</p>
    <h2 class="commoditySearch_title">全局搜索</h2>
    <p class="child_cont">如下图，在网页顶部的这个输入框，你可以输入你需要的器件信息。输入的内容，最好是关键词。</p>
    <p class="child_cont">如果我要寻找阻值为10K，封装为0603的贴片电阻，那么，可以输入：0603 10K 贴片电阻 关键词中间用空格。</p>
    <p class="child_cont">搜索结果如下：</p>
    <img src="../../../../assets/commoditySearch/commoditySearch1.jpg" alt class="commoditySearch_img">
    <h2 class="commoditySearch_title">子目录下搜索</h2>
    <p class="child_cont">选择某个元器件目录。如选择电阻这个目录，在这个目录下，搜索10K 0603的电阻。</p>
    <img src="../../../../assets/commoditySearch/commoditySearch2.jpg" alt class="commoditySearch_img">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.commoditySearch_box{
  text-align: center;
}
.commoditySearch_title{  
  font-size: 15px;
  text-align: left;
  margin-bottom: 15px;
  margin-top: 40px;
}
.commoditySearch_title_o{
  color: #666666;
  font-size: 14px;
  margin-top: 30px;
}
.child_cont{
  width: 100%;
  text-align: left;  
  font-size: 13px;
  line-height: 1.75;
  margin: 15px 0;
}
</style>

