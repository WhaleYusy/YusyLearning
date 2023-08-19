<template>
  <div class="mall_home_outLandBuy">
    <div class="mall_home_outLandBuy_banner">
      <img src="../../../img/outLand.jpg" alt />
    </div>
    <div class="mall_home_outLandBuy_dkhs_wrap">
      <div class="mall_home_outLandBuy_dkhs">
        <div class="mall_home_outLandBuy_dkhs_item">
          <div class="colorLogo" style="background:#0094e7">多</div>
          <div class="textDesc">
            <p>得捷 贸泽 2000W+型号</p>
            <p>全球物料一站式采购</p>
          </div>
        </div>
       <div class="mall_home_outLandBuy_dkhs_item">
          <div class="colorLogo" style="background:red" >快</div>
          <div class="textDesc">
            <p>得捷 贸泽 2000W+型号</p>
            <p>全球物料一站式采购</p>
          </div>
        </div>
        <div class="mall_home_outLandBuy_dkhs_item">
          <div class="colorLogo" style="background:orange">好</div>
          <div class="textDesc">
            <p>得捷 贸泽 2000W+型号</p>
            <p>全球物料一站式采购</p>
          </div>
        </div>
        <div class="mall_home_outLandBuy_dkhs_item">
          <div class="colorLogo" style="background:lightgreen" >省</div>
          <div class="textDesc">
            <p>得捷 贸泽 2000W+型号</p>
            <p>全球物料一站式采购</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mall_home_outLandBuy_hotMetail_wrap">
      <div class="mall_home_outLandBuy_hotMetail_content">
        <div class="mall_home_outLandBuy_title">
          <h1>热门物料</h1>
          <span class="checkAll">查看全部></span>
        </div>
        <div class="mall_home_outLandBuy_content" >
          <div class="mall_home_outLandBuy_content_item" v-for="(item,index) in 8" :key="index" >
            <div class="mall_home_outLandBuy_content_item_leftImg"><img src="../../../img/outLand.jpg" alt /></div>
            <div class="mall_home_outLandBuy_content_item_rightText">
              <div class="productCode">GRM0335C1E100FA01D</div>
              <div class="productBrand"><span class="grayWord">品牌:</span>Murata Electronics</div>
              <div class="productPrice">￥0.047602</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang='scss' scoped>
.mall_home_outLandBuy{
  width:100%;
  .mall_home_outLandBuy_banner{
    width:100%;
    height:440px;
    img{
      width:100%;
      height:100%;
    }
  }
  .mall_home_outLandBuy_dkhs_wrap{
    width:100%;
    min-height:200px;
    background: lightgray;
    padding:20px 0;
    box-sizing: border-box;
    .mall_home_outLandBuy_dkhs{
      width:1200px;
      margin:0 auto;
      display:flex;
      justify-content: space-between;
      align-items: center;
      .mall_home_outLandBuy_dkhs_item{
        width:280px;
        height:265px;
        background:white;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .colorLogo{
          width:110px;
          height:110px;
          border-radius: 50%;
          text-align:center;
          line-height:110px;
          color:white;
          font-size:36px;
        }
        .textDesc{
          font-size:16px;
          line-height:25px;
          text-align:center;
          color:#444444;
        }
      }
    }
  }
  .mall_home_outLandBuy_hotMetail_wrap{
    width:100%;
    min-height:200px;
    background:lightgray;
    // margin-bottom:20px;
    // margin-top:20px;
    padding:20px;
    box-sizing: border-box;
    .mall_home_outLandBuy_hotMetail_content{
      width:1200px;
      height:300px;
      margin:0 auto;
      padding:20px;
      background:white;
      box-sizing: border-box;
      .mall_home_outLandBuy_title{
        width:100%;
        display:flex;
        justify-content: space-between;
        .checkAll{
          cursor: pointer;
        }
      }
      .mall_home_outLandBuy_content{
        width:100%;
        margin-top:20px;
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
        align-items: center;
        .mall_home_outLandBuy_content_item{
          width:270px;
          height:97px;
          border:1px solid rgb(230,230,230);
          display:flex;
          margin-bottom:20px;
          .mall_home_outLandBuy_content_item_leftImg{
            width:78px;
            height:78px;
            img{
              width:100%;
              height:100%;
            }
          }
          .mall_home_outLandBuy_content_item_rightText{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left:10px;
            //  productCode productBrand productPrice
            .productCode{

            }
            .productCode:hover{
              color:#0094e7;
            }
            .productBrand{
              .grayWord{
                color:gray;
              }
            }
            .productPrice{
              font-size:14px;
              font-weight:bold;
              color:orange;
            }
          }
        }
      }
    }
  }
  // . mall_home_outLandBuy_dkhs_wrap  mall_home_outLandBuy_dkhs  mall_home_outLandBuy_dkhs_item
}
</style>
