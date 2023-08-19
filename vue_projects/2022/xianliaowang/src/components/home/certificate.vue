<template>
  <div class="mall_home_certificate">
    <div class="mall_home_certificate_wrap">
      <img src="../../../img/getCer.jpg" alt /> 
    </div>
    <div class="mall_home_certificate_kinds">
      <div class="mall_home_certificate_kinds_title">
        <!-- <img src="https://static.szlcsc.com/activity/resources/images/area01.png" alt /> -->
        <h2>类目专区</h2>
        <!-- <img src="https://static.szlcsc.com/activity/resources/images/area01.png" alt /> -->
      </div>
      <div class="mall_home_certificate_kinds_content">
        <div class="certificate_item" v-for="(item,index) in 11" :key="index">
          <div class="certificate_item_left">
            <div class="certificate_item_left_title">15元星通时频品牌优惠券</div>
            <div class="certificate_item_left_bottom">
              <span class="showNum">
                <span class="smallD">￥</span>
                <span class="bigNum">15</span>
              </span>
              <span class="showView">
                <span class="noLimit">不限金额</span>
                <span class="hasget">已领 2008</span>
              </span>
            </div>
          </div>
          <div class="certificate_item_right">
            <span>立即</span>
            <span>领取</span>
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
<style lang="scss" scoped>
.mall_home_certificate{
  width:100%;
  background:rgb(240,240,240);
  // padding:20px 0;
  box-sizing: border-box;
  .mall_home_certificate_wrap{
    width:100%;
    background:white;
    height:322px;
    margin:0 auto;
    // background:url('https://static.szlcsc.com/activity/resources/images/allCouponsBanner_03_01.jpg') no-repeat;
    background-size: 100% 100%;
    // img{
    //   width:100%;
    //   height:322px;
    // }
  }
  .mall_home_certificate_kinds{
    background:rgb(240,240,240);
    .mall_home_certificate_kinds_title{
      display:flex;
      justify-content: center;
      align-items: center;
      padding:10px 0;
      // border-bottom:1px solid rgb(50,50,50);
      background:white;
      img{
        width:50px;
        height:25px;
      }
      h2{
        line-height:25px;
        margin-left:10px;
        margin-right:10px;
        padding-bottom:5px;
        border-bottom:5px solid black;
      }
    }
    .mall_home_certificate_kinds_content{
      width:1200px;
      margin:0 auto;
      display:flex;
      flex-wrap:wrap;
      padding:20px;
      background: white;
      box-sizing: border-box;
      .certificate_item{
        width:340px;
        height:117px;
        border:1px solid #0094e7;
        border-right:none;
        border-radius:5px;
        margin-left:30px;
        margin-bottom:20px;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        display:flex;
        justify-content: space-between;
        .certificate_item_left{
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          padding:15px;
          box-sizing:border-box;
          .certificate_item_left_title{
            font-size:16px;
            font-weight:bold;
          }
          .certificate_item_left_bottom{
            width:190px;
            display: flex;
            align-items: center;
            .showNum{
              margin-right:20px;
            }
            .smallD{
              color:#0094e7;
              font-size:18px;
            }
            .bigNum{
              color:#0094e7;
              font-size:55px;
              font-weight:bold;
            }
            .showView{
              width:60px;
              height:50px;
              display:flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .noLimit{
                width:100%;
                height:20px;
                background-image:url('../../../img/smallCer.png');
                background-repeat:no-repeat;
                background-size: 100% 100%;
                font-size:12px;
                color:#0094e7;
                line-height:20px;
                text-align:center;
              }
            }
          }
        }
        .certificate_item_right{
          width:115px;
          height:100%;
          color:white;
          font-size:22px;
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height:30px;
          border-top-right-radius:3px;
          border-bottom-right-radius:3px;
          background:url('../../../img/bigCerBg.png') no-repeat;
          background-size: 100% 100%;
        }
        // .
      }
    }
  }
}
</style>
