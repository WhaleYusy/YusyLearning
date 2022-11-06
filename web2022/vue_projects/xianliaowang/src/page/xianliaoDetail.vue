<template>
  <div class="ReCommonDetailWrap">
    <div class="ReCommonDetail">
      <div class="locationDetail">
        <!-- <a class="toA" @click="toIndex">首页</a>&gt;
        <a>商品详情</a>-->
      </div>
      <div class="left-img">
        <img :src="mainImage" alt class="top"/>
        <i class="el-icon-zoom-in zoomin" @click="openMain"></i>
        <!--
        <div v-for="pageData in detailImages" :key="pageData.detailImages">
          <div class="contract-item">
            <img :src="pageData.detailImages" />
          </div>
        </div>-->

        <div class="bottom">
          <div v-for="(item, i) in pageData.detailImages" :key="i">
            <img :src="item" alt :class="(i == active) ? 'img active' : 'img'" @click="chooseImg(i)"/>
          </div>
          <!-- <img src="../falseData/img/home-advertising1.png" alt class="img" />
          <img src="../falseData/img/home-advertising1.png" alt class="img imga" />
          <img src="../falseData/img/home-advertising1.png" alt class="img imga" />-->
        </div>

        <!-- <img v-for:src="pageData.detailImages" alt=""> -->
      </div>
      <div class="rightDataBlock">
        <div class="name">{{ pageData.materialsName }}</div>
        <div class="block">
          <span class="span">价格</span>
          <template v-if="this.searchType == 4">
          <span class="price">￥{{ Number(pageData.price).toFixed(3) }}</span>
          </template>
          <template v-else>
          <span class="price">￥0</span>
          </template>
        </div>
        <div class="block">
          <span class="span">品牌</span>
          <span class="price2">{{ pageData.materialsBrand }}</span>
        </div>
        <!-- <div class="block">
          <span class="span">型号</span>
          <span class="price2">{{ pageData.materialsName }}</span>
        </div> -->
        <div class="block">
          <span class="span">销量</span>
          <span class="price2">{{ pageData.saleCount }}</span>
        </div>
        <div class="block">
          <span class="span">库存</span>
          <span class="price2">{{ pageData.stock }}</span>
        </div>
        <div class="block">
          <span class="span">地址</span>
          <span v-if="pageData.isFree === 0"
                class="price2">{{ pageData.deliveryAddress }} | 免费送{{pageData.freeNum}}件</span>
          <span v-else class="price2">{{ pageData.deliveryAddress }}</span>
        </div>

        <!--        <div class="block">-->
        <!--          <span class="span">产品规格</span>-->
        <!--          <span style="margin-left: 70px;" class="Specifications">{{-->
        <!--            pageData.materialsSpec-->
        <!--          }}</span>-->
        <!--        </div>-->
        <!--        <div class="block">-->
        <!--          <span class="span">产品参数</span>-->
        <!--          <span style="margin-left: 70px;" class="Specifications">{{-->
        <!--            pageData.materialsParam-->
        <!--          }}</span>-->
        <!--        </div>-->
        <!--        <div class="block">-->
        <!--          <span class="span sort">颜色分类</span>-->
        <!--          <span style="margin-left: 35px;">-->
        <!--            <img-->
        <!--              src="../falseData/img/home-advertising1.png"-->
        <!--              style="width: 50px;-->
        <!--  height: 50px;"-->
        <!--              alt-->
        <!--            />-->
        <!--          </span>-->
        <!--          <span>-->
        <!--            <img-->
        <!--              src="../falseData/img/home-advertising1.png"-->
        <!--              style="width: 50px;-->
        <!--  height: 50px;"-->
        <!--              alt-->
        <!--            />-->
        <!--          </span>-->
        <!--        </div>-->
        <div class="block">
          <span class="span">数量</span>
          <span style="margin-left: 100px;">
            <el-input-number
              v-model="goodCount"
              @change="handleChange"
              :min="this.pageData.field2!=null?Number(pageData.field2):1"
              :step="this.pageData.field2!=null?Number(pageData.field2):1"
              :step-strictly="true"
              label="描述文字"
            ></el-input-number>
          </span>
        </div>
        <!-- <div class="block">
          <span class="span">库存</span>
          <span style="margin-left: 100px;" v-if="pageData.stock<=0">库存不足</span>
          <span v-else style="margin-left: 100px;" class="text">{{
            pageData.stock
          }}</span>
        </div>
        <div class="block">
          <span class="span">浏览量</span>
          <span style="margin-left: 85px;" class="text">{{
            pageData.views | filterNum
          }}</span>
        </div>
        <div class="block">
          <span class="span">已售</span>
          <span style="margin-left: 100px;" class="text">{{
            pageData.saleCount | filterNum
          }}</span>
        </div> -->

        <div class="button">
          <span class="span"></span>
          <span style="margin-left: 135px;">
            <button class="button1" @click="buyNow">立即购买</button>
          </span>
          <span>
            <button class="button2" @click="sureAddtoCart">加入购物车</button>
          </span>
        </div>
        <div class="shoucangzhifu">
          <div class="shoucangfenxiang">
            <span style="font-size: 20px;color: #FF0000;cursor:pointer;">
              <i
                class="el-icon-star-on"
                v-if="pageData.isCollect"
                @click="collectGoods"
              ></i>
              <i class="el-icon-star-off" v-else @click="collectGoods"></i>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="shoucang">收藏商品</span>
            <!--            <div class="fenxiang">分享到</div>-->
          </div>

          <!-- <div class="zhifu">
            <el-select v-model="value" clearable placeholder="支付方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>-->
        </div>
        <div class="fenxiang">分享到：
          <a title="QQ空间" class="fx1" @click="shareToQZone"></a>
          <a title="微博" class="fx2" @click="shareToWeibo"></a>
          <a title="人人网" class="fx3" @click="shareToRenren"></a>
          <!-- <a class="fx4"></a> -->
          <a title="微信" class="fx5" @click="shareToWechat"></a>
          <div id="qrcode" v-show="wechatQrcode"></div>
        </div>
        <div class="foot">
          检测到您当前处于非安全网络环境，部分商品信息可能不准确，请在交易支付页面再次确认商品价格信息。
        </div>
      </div>

      <!-- 商品，pdf -->
      <!--      <div class="proIntroduceAndPdf" style="margin-top: 20px;">-->
      <!--        <div class="proIntroduceAndPdfTitle">-->
      <!--          <div class="leftTabs">-->
      <!--            <div class="tabItem proIntroduce">商品详情</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div style="margin-top: 20px;">-->
      <!--        <div class="dataJsonDetail" :v-html="pageData.dataJson"></div>-->
      <!--      </div>-->
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="700px"
      height="500px"
      center>
      <img :src="mainImage" alt class="top" width="640px" height="480px"/>
    </el-dialog>
  </div>
</template>
<script>
    import QRCode from "qrcodejs2";
    import compareBoard from "../components/compareBoard/compareBoard";
    import successTips from "../components/wedTips/success";
    import failTips from "../components/wedTips/fail";
    import Swiper from "swiper";
    import "swiper/dist/css/swiper.css";

    export default {
        data() {
            return {
                goodCount: null,
                pageData: {},
                swiperList: [], //轮播图
                searchType: null,
                goodsId: null,
                pulishInfo: {},
                userId: "",
                option: {},
                mainImage: "",
                active: 0,
                centerDialogVisible: false,
                wechatQrcode:false
            };
        },
        components: {
            compareBoard,
            successTips,
            failTips,
            Swiper
        },
        mounted() {

            this.goodsId = this.$route.query.id;
            this.searchType = this.$route.query.type;
            this.getGoodsInfo();
            this.option.url = window.location.href;
            this.option.title = document.title;//设置文档标题等价于HTML的标签
            this.option.desc = "闲料网";
            this.option.summary = "闲料网";
            console.log(this.option)
        },
        methods: {
            openMain: function () {
                this.centerDialogVisible = true;
            },
            chooseImg: function (index) {
                if (this.active == index) {
                    return;
                }
                this.active = index;
                this.mainImage = this.pageData.detailImages[index];
            },
            openShareUrl: function (url) {
                var a = document.createElement("a");
                a.href = url;
                a.target = "_blank";
                a.click();
            },
            shareToWeibo: function () {
                var url = "http://service.weibo.com/share/share.php" +
                    "?url=" + encodeURIComponent(this.option.url) +
                    "&title=" + encodeURIComponent(this.option.title + "。" + this.option.desc) +
                    "&pic=" + encodeURIComponent(this.option.pics) +
                    "&appkey=" + encodeURIComponent(this.option.appkey);
                this.openShareUrl(url);
            },
            shareToQZone: function () {
                var url = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey" +
                    "?url=" + encodeURIComponent(this.option.url) +
                    "&title=" + encodeURIComponent(this.option.title) +
                    "&summary=" + encodeURIComponent(this.option.desc) +
                    "&desc=" + encodeURIComponent(this.option.summary) +
                    "&site=" + encodeURIComponent('https://www.microanswer.cn') +
                    "&pics=" + encodeURIComponent(this.option.pics);
                this.openShareUrl(url);
            },
            shareToWechat: function () {
              if(this.wechatQrcode){
                document.getElementById("qrcode").innerHTML = "";
                this.wechatQrcode = false;
              }else{
                let type = this.searchType == 3 ? 0 : 1;
                let qUrl = "http://wap.xlwfw.com/freeProductPage?id="+this.goodsId+"&type="+type;
                let qrcode = new QRCode('qrcode',{
                  width: 124,
                  height: 124,
                  text: qUrl
                })
                this.wechatQrcode = true;
              }
            },
            shareToRenren: function () {
                var url = 'http://widget.renren.com/dialog/share' +
                    '?resourceUrl=' + encodeURIComponent(this.option.url) +
                    '&srcUrl=' + encodeURIComponent('https://www.microanswer.cn') +
                    "&title=" + encodeURIComponent(this.option.title) +
                    "&description=" + encodeURIComponent(this.option.desc) +
                    "&pic=" + encodeURIComponent(this.option.pics);
                this.openShareUrl(url);
            },
            buyNow() {
                if (!sessionStorage.getItem("token")) {
                    this.$loginUtil.proLoginQrCode()
                    return;
                }
                if (this.pageData.stock <= 0) {
                    this.$message({
                        message: "库存数量不足",
                        type: "warning"
                    })
                    return
                }
                if(this.pageData.stock<this.goodCount){
                    this.$message({
                        message: "库存数量不足",
                        type: "warning"
                    })
                    return
                }
                let num=this.goodCount;
                if(this.pageData.isFree === 0){
                    num = (this.goodCount - this.pageData.freeNum) > 0 ? (this.goodCount - this.pageData.freeNum) : 0;
                }

                let transferData = {
                    cartIds: '',
                    goods: [{mdcMaterialsVo: this.pageData, quantity: this.goodCount}],
                    nums: this.goodCount + '',
                    prices: this.pageData.price,
                    types: '',
                    totalPay: this.pageData.price * num
                };
                localStorage.setItem("transferData", JSON.stringify(transferData))
                //console.log(transferData);
                this.$router.push({
                    path: "/cart/placeOrder"
                });
            },
            sureAddtoCart() {
                if (!sessionStorage.getItem("token")) {
                    this.$loginUtil.proLoginQrCode()
                    return;
                }
                // if (this.pageData.stock < this.goodCount) {
                //   this.$message({
                //     message: "库存数量不足",
                //     type: "warning"
                //   });
                //   return;
                // }
                if (this.pageData.stock <= 0) {
                    this.$message({
                        message: "库存数量不足",
                        type: "warning"
                    })
                    return
                }
                if(this.pageData.stock<this.goodCount){
                    this.$message({
                        message: "库存数量不足",
                        type: "warning"
                    })
                    return
                }
                let params = {
                    goodsId: this.pageData.id,
                    quantity: this.goodCount
                };
                this.$http.post("api-user/app/cart", params).then(res => {
                    this.$message({
                        message: res.data.resp_msg,
                        type: "success"
                    });
                    this.$store.dispatch("getCartNum")

                });
            },
            getGoodsInfo() {
                let url = "";
                console.log(this.searchType)
                if (this.searchType == 3) {
                    url = "app/goods/getFreeCollectDetailInfo";
                } else if (this.searchType == 4) {
                    url = "app/goods/getHotCollectDetailInfo";
                }
                if(sessionStorage.getItem('token')){
                    this.userId = this.$loginUtil.getUserInfoAll().member.userId;
                }else {
                    this.userId=""
                }

                this.$http
                    .get(`/api-user/${url}`, {
                        id: this.goodsId,
                        collectUserId: this.userId
                    })
                    .then(res => {
                        // console.log(res.data.datas);
                        this.pageData = res.data.datas;
                        this.pageData.detailImages = this.pageData.detailImages.split(",");
                        this.goodCount = this.pageData.field2!=null?Number(this.pageData.field2):1;
                        console.log("++++++++++++"+this.goodCount)
                        this.mainImage = this.pageData.mainImage;
                        this.$nextTick(() => {
                            this.initSwiper1();
                        });
                        //this.getPushInfoUserInfo();
                    });
            },
            // 收藏
            collectGoods() {
                if (!sessionStorage.getItem("token")) {
                  this.$loginUtil.proLoginQrCode()
                  return;
                }
                let type = this.$route.query.type
                if (this.pageData.isCollect) {
                    // 取消收藏
                    this.$http
                        .get(`api-user/app/collection/removeCollect`, {
                            type: type,
                            goodsId: this.pageData.id,
                            userId: this.userId
                        })
                        .then(res => {
                            if (res.data.resp_code === 0) {
                                //this.getGoodsInfo();
                                this.pageData.isCollect = false;
                                this.$message({
                                    message: "取消收藏成功",
                                    type: "success"
                                });
                            }
                        });
                } else {
                    this.$http
                        .post("api-user/app/collection", {
                            type: type,
                            goodsId: this.pageData.id
                        })
                        .then(res => {
                            if (res.data.resp_code === 0) {
                                //this.getGoodsInfo();
                                this.pageData.isCollect = true;
                                this.$message({
                                    message: "收藏成功",
                                    type: "success"
                                });
                            }
                        });
                }
            },
            //加减商品数量
            handleChange(value) {
                console.log(value);
                this.goodCount = value;
            },
            initSwiper1() {
                var swiper = new Swiper("#target-swiper", {
                    spaceBetween: 0,
                    centeredSlides: true,
                    //3.4.2写法
                    autoplay: 4000,
                    ///4.5.0 写法
                    // autoplay:{
                    //   delay:4000
                    // },
                    loop: true,
                    noSwiping: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    prevButton: ".swiper-button-prev",
                    nextButton: ".swiper-button-next",
                    // navigation: {
                    //   nextEl: ".swiper-button-next",
                    //   prevEl: ".swiper-button-prev"
                    // },
                    observer: true
                });
            },
            toIndex() {
                this.$router.push({path: "/home/index"});
            },
            toPurchase() {
                this.$router.push({path: "/home/purchase"});
            }
        }
    };
</script>
<style lang="scss" scoped>
  .fenxiang {
    margin-top: 50px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .fenxiang a {
    width: 16px;
    height: 16px;
    margin: 0 8px;
    cursor: pointer;
  }
  .fenxiang #qrcode{
    position: absolute;
    left: 300px;
    top: -60px;
    z-index: 999;
  }
  .fx1 {
    background: url("../../img/shareLogo.png") no-repeat 0 -234px;
  }

  .fx2 {
    background: url("../../img/shareLogo.png") no-repeat 0 -270px;
  }

  .fx3 {
    background: url("../../img/shareLogo.png") no-repeat 0 -252px;
  }

  .fx4 {
    background: url("../../img/shareLogo.png") no-repeat 0 -198px;
  }

  .fx5 {
    background: url("../../img/wx.png") no-repeat 0 0;
  }

  //动态类
  .border {
    border: 1px solid #0094e7;
  }

  .ReCommonDetailWrap {
    padding-bottom: 40px;
    box-sizing: border-box;

    .ReCommonDetail {
      width: 1200px;
      margin: 0 auto;

      .locationDetail {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        letter-spacing: 2px;
        padding: 20px 0;

        a {
          margin: 0 10px;
        }

        .toA:hover {
          color: #0094e7;
          cursor: pointer;
        }
      }

      .left-img {
        float: left;
        width: 50%;
        position: relative;

        .zoomin {
          font-size: 30px;
          position: absolute;
          right: 0;
          top: 590px;
          cursor: pointer;
        }

        .top {
          width: 100%;
          height: 620px;
          border: 1px solid #eee;
        }

        .bottom {
          background: rgb(240, 240, 240);
          border: 0;
          margin: 0;
          width: 100%;
          margin-top: 30px;
          box-sizing: border-box;

          .img {
            display: block;
            width: 100px;
            float: left;
            height: 100px;
            margin: 10px;
            border: 1px solid #eee;
            box-sizing: border-box;
            cursor: pointer;
          }

          .active, .img:hover {
            border: 1px solid #0094e7;
          }

          .imga {
            margin-left: 2%;
          }
        }
      }

      .dataJsonDetail {
        width: 100%;
        overflow-x: auto;
        box-sizing: border-box;
        padding-bottom: 10px;

        & /deep/ p,
        & /deep/ img {
          width: 100% !important;
        }
      }

      .rightDataBlock {
        float: right;
        display: block;
        width: 48%;

        .name {
          font-size: 30px;
          font-weight: bold;
        }

        .block {
          margin: 30px 0;

          .span {
            width: 100px;
            font-size: 16px;
            color: #999;
          }

          .text {
            font-size: 15px;
            border: 1px solid #0094e7;
            background-color: white;
            display: inline-block;
            width: 178px;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }

          .Specifications {
            display: inline-block;
            padding: 0px 10px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #0094e7;
            color: #0094e7;
            background-color: white;
            font-size: 14px;
            border-radius: 3px;
            text-align: center;
            line-height: 40px;
            font-size: 15px;
            cursor: pointer;
          }

          .price {
            margin-left: 100px;
            font-size: 20px;
            color: red;
          }

          .price2 {
            margin-left: 100px;
            font-size: 16px;
          }

          .place {
            margin-left: 100px;
          }

          .sort {
            display: inline-block;
            height: 50px;
            line-height: 50px;
          }
        }

        .button {
          .button1 {
            width: 200px;
            height: 60px;
            border: 2px solid #0094e7;
            color: #0094e7;
            background-color: white;
            font-size: 20px;
            font-weight: bold;
            border-radius: 3px;
            text-align: center;
            line-height: 40px;

            cursor: pointer;
          }

          .button2 {
            width: 200px;
            height: 60px;
            border: 2px solid #0094e7;
            background: #0094e7;
            color: white;
            font-size: 20px;
            font-weight: bold;
            border-radius: 3px;
            text-align: center;
            line-height: 40px;

            cursor: pointer;
          }
        }

        .shoucangzhifu {
          .shoucangfenxiang {
            display: inline-block;
            width: 50%;

            .shoucang {
              font-size: 15px;
              padding-top: 60px;
              display: inherit;
            }

            .fenxiang {
              font-size: 15px;
              padding-top: 20px;
            }
          }

          .zhifu {
            display: inline-block;
            width: 40%;
            float: right;
            padding-top: 50px;
          }
        }

        .foot {
          font-size: 16px;
          padding-top: 90px;
        }
      }

      .proIntroduceAndPdf {
        width: 1200px;
        margin: 0 auto;
        //   background: white;
        .purchaseCommonDetailContent {
          border-bottom: 2px solid #999;
          padding: 20px;

          .pcdc-1 {
            font-size: 16px;
            font-weight: bold;
            line-height: 40px;
            letter-spacing: 1px;
          }

          .pcdc-2 {
            font-size: 16px;
            background: rgb(240, 240, 240);
            line-height: 40px;
            overflow: hidden; /*超出的部分隐藏起来。*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出文本以省略号显示 */
          }

          .pcdc-3 {
            font-size: 14px;
            line-height: 30px;
          }
        }

        .proIntroduceAndPdfTitle {
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 45px;
          border-bottom: 3px solid #0094e7;

          .leftTabs {
            height: 100%;
            display: flex;
            font-size: 16px;
            color: #0094e7;
            text-align: center;
            line-height: 45px;

            div {
              height: 100%;
              width: 120px;
              border-right: 1px solid rgb(230, 230, 230);
            }
          }
        }

        .purchaseCommonDetailLinkman {
          padding: 20px;
          display: flex;
          align-items: center;

          .pcdl-1 {
            .pcdl-11 {
              width: 80px;
              height: 80px;
            }
          }

          .pcdl-2 {
            padding: 0 10px;

            .pcdl-21 {
              height: 24px;
              font-size: 16px;
              line-height: 24px;
            }

            .pcdl-22 {
              display: flex;
              font-size: 16px;
              line-height: 24px;

              .pcdl-222 {
                width: 150px;
                color: red;
                border: 1px solid red;
                border-radius: 24px;
                text-align: center;
              }

              .pcdl-222:hover {
                cursor: pointer;
              }
            }

            .pcdl-23 {
              font-size: 14px;
              color: #999;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
</style>
