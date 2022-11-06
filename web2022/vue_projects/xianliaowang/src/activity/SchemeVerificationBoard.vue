<template>
  <div class="SchemeVerificationBoard">
    <h1>方案验证板</h1>
    <div class="SchemeVerificationBoardContent">
      <div class="SchemeVerificationBoardItem" v-for="(item,index) in 6" :key="index">
        <div class="leftImgBlock"><img src="https://alimg.szlcsc.com/upload/public/product/breviary/20180907/5463D872388C785523C6760A77DBF50A.jpg" alt /></div>
        <div class="centerBlock">
          <h3>基于LPC824的触摸控制器方案</h3>
          <div class="num">
            <span class="item"><span class="grayWord">库存：</span>80片</span>
            <span class="item"><span class="grayWord">单价：</span>0.00/片</span>
          </div>
          <div class="proDesc">使用MCU做为一个电阻式和电容式触摸控制器的方案</div>
          <div class="community">
            <i style="color:orange;font-size:12px;">图标</i>
            <p>进社区讨论：使用LPC824做电阻触摸屏驱动控制器等多种触摸驱动</p>
          </div>
        </div>
        <div class="wantBuyBtn">
          <span @click="toShowAddTocart">我要买</span>
        </div>
        <div class="video">
          <video src="movie.ogg" >
            您的浏览器不支持vedio标签
          </video>
          <p class="videoDesc">LPC824触摸功能演示</p>
        </div>
      </div>
    </div>
    <div class="dividePageBtn">
      <span class="totalNUm">共86条记录</span>
      <span class="prePage">上一页</span>
      <span class="divideItem" v-for="(item,index) in 10" :key="index">{{index}}</span>
      <span class="divideItem">...</span>
      <span class="nextPage">下一页</span>
    </div>
    <!--  -->
    <div class="popUpAddToCart"  v-if="ifShowAddToCart">
      <div class="popUpAddToCartBlock">
        <div class="popUpTitle">
          <h3>添加购物车</h3>
          <span class="cancel" @click="toHideAddTocart">x</span>
        </div>
        <div class="popUpContent" >
          <div class="leftSide">
            <div class="leftSideItem">
              <span class="grayWord">商品名称：</span>
              <span>LT8390功能验证板</span>
            </div>
            <div class="leftSideItem">
              <span class="grayWord">原厂型号：</span>
              <span>LT8390功能验证板</span>
            </div>
            <div class="leftSideItem">
              <span class="grayWord">品牌：</span>
              <span>LC(闲料网)</span>
            </div>
            <div class="leftSideItem">
              <span class="grayWord">封装规格：</span>
              <span>PCB空板</span>
            </div>
            <div class="leftSideItem">
              <span class="grayWord">现货库存：</span>
              <span>28个</span>
            </div>
          </div>
          <div class="rightSide">
            <div class="rightSideTop">
              <p class="pTitle">含增值税</p>
              <p><span>1+ : </span><span class="goldWord">￥5.24</span></p>
              <p><span>10+ : </span><span class="goldWord">￥4.16</span></p>
            </div>
            <div class="rightSideBottom">
              <div class="buyNum">
                <span>购买数量</span>
                <input type='number' />
                <span>x</span>
                <span class="singlePrice goldWord">￥5.24</span>
                <span> = </span>
                <span class="totalPrice goldWord">￥5.24</span>
              </div>
            </div>
            <div class="addToCart">
              <span class="addToCartBtn" @click="toHideAddTocart" >加入购物车</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return{
      ifShowAddToCart:false
    }
  },
  methods:{
    toHideAddTocart(){
      this.ifShowAddToCart = false;
    },
    toShowAddTocart(){
      this.ifShowAddToCart = true;
    }
  }
}
</script>
<style lang="scss" scoped> 
  .SchemeVerificationBoard{
    width:1200px;
    padding:20px 0;
    margin:0 auto;
    box-sizing: border-box;
    //加购弹窗
    .popUpAddToCart{
      z-index:3000;
      position: fixed;
      top:0;
      right:0;
      bottom:0;
      left:0;
      background:rgba(0,0,0,0.5);
      display:flex;
      justify-content: center;
      align-items: center;
      .popUpAddToCartBlock{
        width:668px;
        min-height:200px;
        border:3px solid lightgray;
        box-sizing: border-box;
        .popUpTitle{
          width:100%;
          height:30px;
          display:flex;
          justify-content: space-between;
          align-items: center;
          padding:5px 15px;
          border-bottom:1px solid lightgray;
          background:rgb(240,240,240);
          box-sizing: border-box;
          .cancel{
            font-size:20px;
            cursor: pointer;
          }
        }
        .popUpContent{
          flex:1;
          display:flex;
          width:100%;
          align-items: center;
          justify-content: space-between;
          padding:20px 30px;
          background:white;
          box-sizing: border-box;
          .leftSide{
            display:flex;
            height:100%;
            flex:3;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height:25px;
            .leftSideItem{
              width:100%;
              text-align:left;
              .grayWord{
                color:gray;
              }
            }
          }
          .rightSide{
            display:flex;
            height:100%;
            flex:5;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding:0 20px;
            border-left:1px solid lightgray;
            box-sizing: border-box;
            .rightSideTop{
              line-height:25px;
              .pTitle{
                margin-bottom:10px;
              }
              p{
                .goldWord{
                  color:orangered;
                }
              }
            }
            .rightSideBottom{
              input{
                width:80px;
                height:20px;
                border:1px solid lightgray;
                margin-right:5px;
              }
              span{
                margin-right:5px;
              }
              .singlePrice{
                color:orangered;
              }
              .totalPrice{
                color:orangered;
              }
            }
            .addToCart{
              margin-top:20px;
              width:100%;
              height:40px;
              display:flex;
              text-align:center;
              justify-content:left;
              .addToCartBtn{
                height:35px;
                padding:5px 10px;
                background:orangered;
                color:white;
                font-size:14px;
                border-radius:3px;
                display:flex;
                text-align:center;
                align-items: center;
                box-sizing: border-box;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    h1{
      font-size:20px;
      color:#444444;
      font-weight:normal;
      height:40px;
    }
    .SchemeVerificationBoardContent{
      width:100%;
      padding:10px 10px 30px 10px;
      display:flex;
      flex-direction: column;
      box-sizing: border-box;
      .SchemeVerificationBoardItem{
        display:flex;
        justify-content: space-between;
        padding:10px;
        align-items: center;
        margin-bottom:20px;
        border-bottom:1px solid rgb(240,240,240);
        box-sizing: border-box;
        .leftImgBlock{
          width:130px;
          height:130px;
          img{
            width:100%;
            height:100%;
          }
        }
        .centerBlock{
          width:550px;
          line-height:35px;
          h3:hover{
            color:#0094e7;
            cursor: pointer;
          }
          .num{
            .item{
              margin-right:20px;
            }
          }
          div{
            .grayWord{
              color:gray;
            }
          }
        }
        .community{
          display: flex;
          i{
            margin-right:20px;
          }
          p:hover{
            cursor: pointer;
            color:orange;
          }
        }
        .wantBuyBtn{
          font-size:14px;
          color:white;
          padding:15px 25px;
          background:orange;
          border-radius: 5px;
          box-sizing: border-box;
          visibility:hidden;
          cursor: pointer;
        }
        .video{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // border:1px solid red;
          video{
            width:200px;
            height:132px;
            margin-bottom:5px;
            background: url('https://static.szlcsc.com/list/resources/images/flash_bg.jpg') no-repeat;
            background-size: 100% 100%;
          }
          .videoDesc{
            color:#0094e7;
          }
        }
      }
      .SchemeVerificationBoardItem:hover{
        background:rgb(245,245,245);
        .wantBuyBtn{
          visibility:visible;
        }
      }

    }
    .dividePageBtn{
      width:100%;
      height:50px;
      line-height:50px;
      display:flex;
      align-items:center;
      justify-content: flex-end;
      text-align: right;
      padding:0 20px;
      box-sizing: border-box;
      .totalNUm{
        display: inline-block;
        width:105px;
        height:35px;
        padding:0 12px;
        box-sizing: border-box;
        line-height:35px;
        text-align:center;
        border:1px solid lightgray;
        margin-right:10px;
        cursor: pointer;
      }
      .totalNUm:hover{
        color:#0094e7;
        border:1px solid #0094e7;
      }
      .prePage,.nextPage{
        display: inline-block;
        width:62px;
        height:35px;
        border:1px solid red;
        padding:0 12px;
        line-height:35px;
        text-align:center;
        border:1px solid lightgray;
        box-sizing: border-box;
        cursor: pointer;
      }
      .prePage:hover,.nextPage:hover{
        color:#0094e7;
         border:1px solid #0094e7;
      }
      .divideItem{
        display: inline-block;
        width:34px;
        height:35px;
        border:1px solid red;
        padding:0 12px;
        line-height:35px;
        text-align:center;
        border:1px solid lightgray;
        box-sizing: border-box;
        cursor: pointer;
        margin-left:10px;
        margin-right:10px;
      }
      .divideItem:hover{
        color:#0094e7;
         border:1px solid #0094e7;
      }
    }
    /// totalNUm prePage nextPage
    //wantBuyBtn
  }
</style>
