<template>
  <div class="popUpAddToCart" v-if="cartDialogData.name !== undefined && ifShowCart">
    <div class="popUpAddToCartBlock">
      <div class="popUpTitle">
        <h3>添加到购物车</h3>
        <span class="cancel" @click="toHideAddTocart">x</span>
      </div>
      <div class="popUpContent">
        <div class="leftSide">
          <div class="leftSideItem">
            <span class="grayWord">商品名称：</span>
            <span>{{cartDialogData.name}}</span>
          </div>
          <div class="leftSideItem">
            <span class="grayWord">原厂型号：</span>
            <span>{{cartDialogData.materiaCode}}</span>
          </div>
          <div class="leftSideItem">
            <span class="grayWord">品牌：</span>
            <span>{{cartDialogData.brandName}}</span>
          </div>
          <div class="leftSideItem">
            <span class="grayWord">封装规格：</span>
            <span>{{cartDialogData.spec}}</span>
          </div>
          <!-- <div class="leftSideItem">
            <span class="grayWord">现货库存：</span>
            <span>{{cartDialogData.stockNum}}{{cartDialogData.unitName}}</span>
          </div> -->
          <!-- <div class="leftSideItem">
            <span class="grayWord">最小预定量：</span>
            <span>{{cartDialogData.packageDesc}}{{cartDialogData.unitName}}</span>
          </div> -->
          <div class="leftSideItem">
            <span class="grayWord">最小包装量：</span>
            <!-- cartDialogData.projectDesc ?? -->
            <!-- <span>{{cartDialogData.packageDesc || cartDialogData.projectDesc}}{{cartDialogData.unitName}}</span> -->
            <span>{{cartDialogData.packageDesc}}{{cartDialogData.unitName}}</span>
          </div>
          <!-- <p>最小预定量：{{cartDialogData.packageDesc}}个</p> -->
        </div>
        <div class="rightSide">
          <!-- 一般灯区和led灯区的 -->
          <div class="rightSideTop" v-if="cartDialogData.goodsType != 2 ">
            <!-- text-decoration: line-through; 限时优惠里面原价的样式 -->
            <p class="pTitle">含增值税</p>
            <p>
              <span>1+ :</span>
              <span class="goldWord">￥{{cartDialogData.goodsPrice || cartDialogData.ledGoodsPrice}}</span>
            </p>
          </div>
          <!-- 限时优惠的 -->
          <div class="rightSideTop" v-else>
            <p class="pTitle">含增值税(2)</p>
            <p>
              <span class="goldWord" style="text-decoration:line-through">原价：￥{{cartDialogData.goodsPrice || cartDialogData.ledGoodsPrice}}</span>
            </p>
            <p>促销价：{{cartDialogData.discountPrice}}</p>
          </div>
          <div class="rightSideBottom">
            <div class="buyNum">
              <span pTitle style="color:gray">购买数量：</span>
              <el-input size="mini" style="width:80px;margin-bottom:5px;" readonly v-model.number="form.num"
                        disabled="disabled"/>&nbsp;&nbsp;x
              <span style="color:orangered;">￥{{cartDialogData.goodsType == 2 ? cartDialogData.discountPrice :cartDialogData.goodsPrice }}</span>
              =&nbsp;&nbsp;
              <span style="color:orangered;">{{totalPrice.toFixed(2)}} (总价)</span>
            </div>
            <div class="buyBox">
              <span style="color:gray">按整包装：</span>
              <el-input size="mini" style="width:80px;margin-bottom:5px" @input="setPrice" v-model.number="form.box"/>
              &nbsp;{{cartDialogData.packageName}}&nbsp;(1 {{cartDialogData.packageName}}有&nbsp;{{cartDialogData.packageDesc}}{{cartDialogData.unitName}})
            </div>
          </div>
          <div class="addToCart">
            <span class="addToCartBtn"
                  @click="onCartDialogSubmit(cartDialogData.goodsId,form.num,cartDialogData.goodsType)">加入购物车</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'cart',
        data() {
            return {
                ifShowCart: false,//是否显示购物车
                cartDialogData: {},//传入组件的商品数据
                form: {
                    num: 1,//将设置为最小包装量
                    box: 1,
                },
            }
        },
        mounted() {
            console.log(1)
            // this.form.num = this.cartDialogData.packageDesc
        },
        methods: {
            open(data) {
                //打开加购弹窗
                this.cartDialogData = data
                this.form.num = this.cartDialogData.packageDesc;
                this.ifShowCart = true
            },
            toHideAddTocart() {
                //隐藏加购弹窗
                this.ifShowCart = false;
                this.form.box = 1;
            },
            onCartDialogSubmit(id, num, goodsType) {
                let numReg = /^[1-9]\d*$/;
                if (!numReg.test(this.form.num)) {
                    this.$message.error("数量应为正整数");
                } else if (this.form.num < this.cartDialogData.packageDesc) {
                    this.$message.error("购买数量不能小于最小预定量");
                } else {
                    let that = this;
                    this.$http
                        .post("/pc/cart/addGoods2Cart", {
                            goodsId: id,
                            goodsNum: num,
                            goodsType: goodsType
                        })
                        .then(res => {
                            //判断是否登录了的（没有登录则导航到登录页面）
                            this.$http.judgeIfLogin(res, this);
                            if (res.data.data.code === 1) {
                                this.$message.success(res.data.data.msg);
                                this.ifShowCart = false;
                                this.form.box = 1;
                                // this.form = { num: 0, box: 0 };
                                this.$emit('fresh', '刷新消息')
                            } else {
                                this.$message(res.data.data.msg);
                                this.ifShowCart = false;
                                this.form.box = 1;
                            }
                        })
                        .catch(res => {
                        });
                }
            },
            setPrice() {
                //添加
                this.form.num = this.form.box * this.cartDialogData.packageDesc;
                // if(this.cartDialogData.goodsType == 2){
                //   this.totalPrice =
                //     (this.form.num *
                //       ((this.cartDialogData.discountPrice) *
                //         100)) /
                //     100;
                // }else{
                //   this.totalPrice =
                //     (this.form.num *
                //       ((this.cartDialogData.goodsPrice) *
                //         100)) /
                //     100;
                // }
            },
        },
        computed: {
            totalPrice() {
                if (this.cartDialogData.goodsType == 2) {
                    return (this.form.num * ((this.cartDialogData.discountPrice) * 100)) / 100;
                } else {
                    return (this.form.num * ((this.cartDialogData.goodsPrice) * 100)) / 100;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
  //购物车样式
  .popUpAddToCart {
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .popUpAddToCartBlock {
      min-width: 750px;
      max-width: 900px;
      min-height: 200px;
      border: 3px solid lightgray;
      box-sizing: border-box;

      .popUpTitle {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        border-bottom: 1px solid lightgray;
        background: rgb(240, 240, 240);
        box-sizing: border-box;

        .cancel {
          font-size: 20px;
          cursor: pointer;
        }
      }

      .popUpContent {
        flex: 1;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 20px 30px;
        background: white;
        box-sizing: border-box;

        .leftSide {
          display: flex;
          height: 100%;
          flex: 5;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: 25px;

          .leftSideItem {
            width: 100%;
            text-align: left;

            .grayWord {
              color: gray;
            }
          }
        }

        .rightSide {
          display: flex;
          height: 100%;
          flex: 5;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          border-left: 1px solid lightgray;
          box-sizing: border-box;

          .rightSideTop {
            line-height: 25px;

            .pTitle {
              margin-bottom: 10px;
            }

            p {
              .goldWord {
                color: orangered;
              }
            }
          }

          .rightSideBottom {
            input {
              width: 80px;
              height: 20px;
              border: 1px solid lightgray;
              margin-right: 5px;
            }

            span {
              margin-right: 5px;
            }

            .singlePrice {
              color: orangered;
            }

            .totalPrice {
              color: orangered;
            }
          }

          .addToCart {
            margin-top: 20px;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-end;

            .addToCartBtn {
              height: 35px;
              padding: 5px 10px;
              background: orangered;
              color: white;
              font-size: 14px;
              border-radius: 3px;
              display: flex;
              text-align: center;
              align-items: center;
              box-sizing: border-box;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
