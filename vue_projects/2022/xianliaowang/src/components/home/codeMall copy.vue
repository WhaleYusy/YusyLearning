<template>
  <div class="mall_home_certificate">
    <div class="yourLocation">您当前所在的位置：力创商城 &gt;<span class="locationNow">积分商城</span></div>
    <!-- 如果登录了，就先显示这个 -->
    <div class="showCode">
      <div class="leftSide"><span>Hi,525650A</span>|<span>您的积分：<span class="redCode">0</span></span></div>
      <div class="rightSide">查看积分详情&gt;&gt;</div>
    </div>
    <div class="ExchangeCoupons">
      <h2>兑换优惠券</h2>
      <div class="ExchangeCouponsContent">
        <div class="ExchangeCouponsContentItem" v-for="(item,index) in 8" :key="index">
          <div class="topImgBox">
            <img src="../../../img/wumenkan.png" class="nolimitTag" alt />
            <div class="leftNumBlock"><span>￥</span><span class="bigNum">10</span></div>
            <div class="rightTextBlock">优惠券</div>
          </div>
          <div class="cuponsTitle">闲料网10元优惠券</div>
          <!-- 被hover的时候显示按钮 -->
          <div class="codeChange">
            <div class="hoverHide">
              <span>2,000积分</span>
              <span><span class="changeNum" >1497</span>人兑换</span>
            </div>
            <div class="changeRightNow" ref="changeRightNow">立即兑换</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ExchangeECard">
      <h2>兑换优惠券</h2>
      <div class="ExchangeECardContent">
        <div class="ExchangeECardContentItem" v-for="(item,index) in 4" :key="index">
          <div class="topImgBox"></div>
          <div class="cuponsTitle">闲料网10元优惠券</div>
          <!-- 被hover的时候显示按钮 -->
          <div class="codeChange">
            <div class="hoverHide">
              <span>2,000积分</span>
              <span><span class="changeNum" >1497</span>人兑换</span>
            </div>
            <div class="changeRightNow" ref="changeRightNow">立即兑换</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ExchangeRule">
      <h2>积分规则</h2>
      <div class="ExchangeRuleContent">
        <p>1、积分专属闲料网，仅限闲料网内使用；目前积分仅可兑换闲料网积分商品；</p>
        <p>2、积分可以累积，有效期至少1年，即从获得开始至1年后的年底，逾期自动作废（如积分获得时间为2018年8月10日，则过期时间为2019年12月31日）；</p>
        <p>3、客户通过在商城购买元器件可获得积分，积分获取基准系数1，不同的会员等级积分系数不同，积分值 = 订单金额 * 积分系数；以订单金额100元为例：</p>
        <img src="../../../img/1561543558(1).png" alt style="width:527px;height:280px;"/>
        <p>注：积分商城正式上线后购物产生的积分才能参与兑换，在此之前购物产生的积分已更名为“成长值”，可助你达到更高的会员等级（<span class="checkLeval">点此查看我的会员等级</span>）；等级越高，积分系数越高，积分累计越快。</p>
        <p>4、用户订单交易完成（即订单状态为“已发货”），积分账户才获得相应的积分；</p>
        <p>5、用户使用积分兑换积分商品时，优先消耗旧积分（如用户账户中有2笔积分记录，去年5月份的积分3,000和今年5月份积分10,000。此次用户消耗积分5,000，则优先消耗去年的3,000，并在今年10,000积分中消耗2,000积分）；</p>
        <p>6、积分不可兑现和转让；</p>
        <p>7、法律允许范围内，未尽事宜和最终解释权归闲料网所有。</p>
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
  background:lightgray;
  min-height: 500px;
  .yourLocation{
    width:1200px;
    height:40px;
    line-height:40px;
    margin:0 auto;
    font-size:14px;
    .locationNow{
      cursor: pointer;
      color:#0094e7;
    }
  }
  .showCode{
    width:1200px;
    height:40px;
    line-height:40px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    padding:0 15px;
    margin-bottom:20px;
    box-sizing: border-box;
    font-size:14px;
    background:white;
    .leftSide{
      width:200px;
      display:flex;
      justify-content: space-around;
      .redCode{
        color:red;
      }
    }
    .rightSide{
      color:#0094e7;
      cursor: pointer;
    }
  }
  .ExchangeCoupons{
    width:1200px;
    min-height:200px;
    margin:0 auto;
    padding:20px;
    box-sizing: border-box;
    background:white;
    .ExchangeCouponsContent{
      margin-top:20px;
      display:flex;
      flex-wrap:wrap;
      justify-content: space-around;
      .ExchangeCouponsContentItem{
        width:264px;
        height:216px;
        margin-bottom:20px;
        padding:10px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background:rgb(240,240,240);
        .topImgBox{
          width:244px;
          height:116px;
          display:flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background:url('../../../img/CERBG.png') no-repeat 100% 100%;
          .nolimitTag{
            position:absolute;
            left:-5px;
            top:0;
          }
          color:white;
          .leftNumBlock{
            width:85px;
            height:90px;
            margin-top:30px;
            display:flex;
            align-self: flex-start;
            justify-content: center;
            align-items:flex-start;
            // align-self:flex-end;
            font-size:25px;
            margin-right:10px;
            .bigNum{
              font-size:60px;
              font-weight:bold;
            }
          }
          .rightTextBlock{
            margin-top:30px;
            font-size:14px;
          }
        }
        .cuponsTitle{
          font-size:14px;
          color:#444444;
        }
        .codeChange{
          width:100%;
          height:50px;
          font-size:14px;
          .hoverHide{
            width:100%;
            height:100%;
            display:flex;
            align-items: center;
            justify-content: space-between;
            .changeNum{
              color:orangered;
            }
          }
          .changeRightNow{
            display:none;
            width:100%;
            height:50px;
            background:#ff7800;
            color:white;
            text-align: center;
            border-radius:3px;
            line-height:50px;
          }
        }
        // .codeChange:hover{
        //   .hoverHide{
        //     display:none;
        //   }
        //   .changeRightNow{
        //     display:block;
        //   }
        // }
      }
      .ExchangeCouponsContentItem:hover{
        .codeChange{
          .hoverHide{
            display:none;
          }
          .changeRightNow{
            display:block;
          }
        }
      }
    }
  }
  .ExchangeECard{
    width:1200px;
    min-height:200px;
    margin:0 auto;
    padding:20px;
    box-sizing: border-box;
    background:white;
    margin-top:20px;
    .ExchangeECardContent{
      margin-top:20px;
      display:flex;
      flex-wrap:wrap;
      justify-content: space-around;
      .ExchangeECardContentItem{
        width:264px;
        height:236px;
        margin-bottom:20px;
        padding:10px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        background:rgb(240,240,240);
        .topImgBox{
          width:244px;
          height:136px;
          display:flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border-top-left-radius:8px;
          border-top-right-radius:8px;
          background:url('../../../img/CardBg.png') no-repeat 100% 100%;
          .nolimitTag{
            position:absolute;
            left:-5px;
            top:0;
          }
          color:white;
          .leftNumBlock{
            width:85px;
            height:90px;
            margin-top:30px;
            display:flex;
            align-self: flex-start;
            justify-content: center;
            align-items:flex-start;
            // align-self:flex-end;
            font-size:25px;
            margin-right:10px;
            .bigNum{
              font-size:60px;
              font-weight:bold;
            }
          }
          .rightTextBlock{
            margin-top:30px;
            font-size:14px;
          }
        }
        .cuponsTitle{
          font-size:14px;
          color:#444444;
        }
        .codeChange{
          width:100%;
          height:50px;
          font-size:14px;
          .hoverHide{
            width:100%;
            height:100%;
            display:flex;
            align-items: center;
            justify-content: space-between;
            .changeNum{
              color:orangered;
            }
          }
          .changeRightNow{
            display:none;
            width:100%;
            height:50px;
            background:#ff7800;
            color:white;
            text-align: center;
            border-radius:3px;
            line-height:50px;
          }
        }
        // .codeChange:hover{
        //   .hoverHide{
        //     display:none;
        //   }
        //   .changeRightNow{
        //     display:block;
        //   }
        // }
      }
      .ExchangeECardContentItem:hover{
        .codeChange{
          .hoverHide{
            display:none;
          }
          .changeRightNow{
            display:block;
          }
        }
      }
    }
  }
  .ExchangeRule{
    width:1200px;
    min-height:200px;
    margin:0 auto;
    padding:20px;
    box-sizing: border-box;
    background:white;
    margin-top:20px;
    .ExchangeRuleContent{
      margin-top:20px;
      display:flex;
      flex-direction: column;
      line-height:25px;
      font-size:14px;
      .checkLeval{
        color:#0094e7;
      }
      .checkLeval:hover{
        text-decoration:underline;
      }
      // justify-content: space-around;
    }
  }  
}
</style>
