<template>
  <div class="ReCommonDetailWrap">
    <div class="ReCommonDetail">
      <div class="locationDetail">
        <!-- <a class="toA" @click="toIndex">首页</a>&gt;<a class="toA" @click="toPurchase">求购</a>&gt;<a>求购详情</a> -->
      </div>
      <div class="proDetailData">
        <div class="swiper">
          <div class="swiper-container" id="target-swiper">
            <!-- id="target-swiper"-->
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in this.swiperList"
                :key="index"
              >
                <img :src="item.advImg || item"/>
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next" style="height:30px"></div>
            <div class="swiper-button-prev" style="height:30px"></div>
          </div>
        </div>
      </div>
      <!-- 商品，pdf -->
      <div class="proIntroduceAndPdf" style="margin-top: 20px;">
        <div class="proIntroduceAndPdfTitle">
          <div class="leftTabs">
            <div class="tabItem proIntroduce">商品介绍</div>
          </div>
        </div>
        <div class="purchaseCommonDetailContent">
          <div class="pcdc-1">
            <span>{{ pageData.materialsName }}</span>
            <!-- <span @click="collectGoods"> -->
          </div>
          <!-- <div class="pcdc-3">地址：{{ pageData.deliveryAddress }}</div> -->
          <div class="pcdc-3">
            品牌：{{pageData.field1}}
          </div>
          <!-- <div class="pcdc-3">
            发布日期：{{ pageData.publishDate | timeFormat('yyyy-mm-dd') }}
          </div>
          <div class="pcdc-3">
            结束日期：{{(parseInt(pageData.publishDate)+pageData.endDay*86400000)|timeFormat('yyyy-mm-dd') }}
          </div>
          <div class="pcdc-3">
            交货日期：{{ pageData.deliveryTime | timeFormat('yyyy-mm-dd') }}
          </div> -->
          <div class="pcdc-3">
            类别：{{ pageData.materialsCategoryName}}
          </div>
          <div class="pcdc-3">
            规格：{{ pageData.materialsSpec}}
          </div>
          <div class="pcdc-3">数量：{{ pageData.quantity }}</div>
          <div class="pcdc-3">
            还剩可拼单数：{{pageData.surplusNum}}
          </div>
          <!-- <div class="pcdc-3">地址：{{pageData.deliveryAddress}}</div> -->
          <div class="pcdc-3">
            <span>收藏：</span>
            <span style="  font-size: 20px;  color: #FF0000">

              <i
                class="el-icon-star-on"
                v-if="pageData.isCollect"
                @click="collectGoods"
              ></i>
              <i class="el-icon-star-off" v-else @click="collectGoods"></i>
            </span>
          </div>
          <div class="pcdc-3">分享到：
            <a title="QQ空间" class="fx1" @click="shareToQZone"></a>
            <a title="微博" class="fx2" @click="shareToWeibo"></a>
            <a title="人人网" class="fx3" @click="shareToRenren"></a>
            <!-- <a class="fx4"></a> -->
            <a title="微信" class="fx5" @click="shareToWechat"></a>
            <div id="qrcode" v-show="wechatQrcode"></div>
          </div>
        </div>
        <!-- <div class="purchaseCommonDetailLinkman">
          <div class="pcdl-1">
            <img
              class="pcdl-11"
              v-if="pulishInfo.avatar"
              :src="pulishInfo.avatar"
            />
            <img class="pcdl-11" v-else src="../../img/morentouxiang.png"/>
            <img
              class="pcdl-12"
              v-if="pulishInfo.level == 1"
              src="../../img/baseVip.png"
              alt
            />
            <img
              class="pcdl-12"
              v-if="pulishInfo.level == 2"
              src="../../img/vip.png"
              alt
            />
          </div>
          <div class="pcdl-2">
            <div class="pcdl-21">
              {{ pulishInfo.nickName }}
            </div>
            <div class="pcdl-22">
              <div class="pcdl-221">联系方式：</div>
              <span class="contanctMsg" v-if="pulishInfo.mobileNo">{{
                pulishInfo.mobileNo
              }}</span>
              <div class="pcdl-222" @click="getContact" v-else>
                点击获取联系方式
              </div>
            </div>
            <div class="pcdl-23">
              黄金会员可以直接获取联系方式哦！
            </div>
          </div>
        </div> -->


        <el-dialog
          class="tanchuang"
          :visible.sync="dialogVisible"
          width="300px"
          height="350px"
        >
          <div class="showGetContentTitle">{{ "闲料网" }}</div>
          <div class="middleContent">
            <h4 class="needPay">
              需要支付{{
              userInfoAll.level == 1
              ? subPoint.VIP
              : userInfoAll.level == 2
              ? subPoint.GOLD_VIP
              : subPoint.NO_VIP
              }}积分
            </h4>
            <p class="codeMsg" style="color:gray">
              剩余积分:{{ point.pointSum }}积分
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="ensurePay">确 定</el-button>
            </span>
        </el-dialog>
      </div>
      <div class="purchaseCommonDetailLinkman">
        <span class="LinkmanTitle">拼单详情:</span><span class="LinkmanDescription">{{pageData.description}}</span>
      </div>
      <div class="purchaseCommonDetailButton" v-if="canSpell" @click="startSpell">开始拼单</div>
      <div class="purchaseCommonDetailButton" v-else >拼单已结束</div>
      <!--会员弹窗 -->
      <el-dialog title="拼单详情" :visible.sync="vipVisible" width="35%" :before-close="handleClose">
        <div class="vipwrapper">
          <div class="vipContent">
            <div class="vipItem">
              <span class="vipItemTitle">型号：</span>
              <span class="vipItemContent">{{pageData.materialsName}}</span>
            </div>
            <div class="vipItem">
              <span class="vipItemTitle">品牌：</span>
              <span class="vipItemContent">{{pageData.field1}}</span>
            </div>
            <div class="vipItem">
              <span class="vipItemTitle">单价：</span>
              <span class="vipItemContent">{{pageData.price}}元/件</span>
            </div>
            <div class="vipItem">
              <span class="vipItemTitle">拼单总数：</span>
              <span class="vipItemContent">{{pageData.quantity}}</span>
            </div>
            <div class="vipItem">
              <span class="vipItemTitle">最小拼单数量：</span>
              <span class="vipItemContent">{{pageData.minNum}}</span>
            </div>
            <div class="vipItem">
              <span class="vipItemTitle">拼单数量：</span>
              <span class="vipItemContent"><el-input-number
                v-model="buyNum"
                @change="handleBuyNumChange"
                :min="pageData.minNum"
                :step="pageData.minNum"
                size="mini"
                label="拼单数量"
              ></el-input-number></span>
            </div>
          </div>
          <div class="vipElse">(备注:预付{{percentInfo.perpayPercnet}}%定金{{percentInfo.platformPercent}}%的平台服务费)</div>
          <div class="vipBottom">
            <div class="bootomtitle">倒计时</div>
            <div class="bootomremain">
              <span>剩余</span><template><downtime :endTime="(parseInt(pageData.publishDate)+pageData.endDay*86400000)"  :startTime="new Date().getTime()" class="downtime"/></template><span>结束</span>
            </div>
            <div class="bootomred">
              还剩可拼单数:<span>{{pageData.surplusNum}}</span>
            </div>

          </div>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" class="bottombtn" v-if="canSpell" @click="startSpellSure">开始拼单</el-button>
          <el-button type="primary" class="bottombtn" v-else disabled>拼单已结束</el-button>
        </div>
      </el-dialog>
      <!--非会员弹窗 -->
      <el-dialog title="提示" :visible.sync="novipVisible" width="20%" center>
        <span>你还不是会员现在无法拼单</span>
        <span>请成为会员后进行拼单</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="turnVip">立即成为</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import QRCode from "qrcodejs2";
    import compareBoard from "../components/compareBoard/compareBoard";
    import successTips from "../components/wedTips/success";
    import failTips from "../components/wedTips/fail";
    import Swiper from "swiper";
    import "swiper/dist/css/swiper.css";
    import downtime from '../page/downtime'
    // import Toast from '../../../采销易/miniprogram_npm/vant-weapp/toast/toast';
    export default {
        data() {
            return {
                buyNum:1,
                novipVisible:false,
                dialogVisible: false,
                pageData: {},
                swiperList: [], //轮播图
                searchType: null,
                goodsId: null,
                pulishInfo: {},
                userId: "",
                option: {},
                userInfoAll: {},
                wechatQrcode: false,
                userInfo: {},
                // vipShow:true,
                vipVisible: false,
                novipDialogVisible: false,
                percentInfo:{
                    perpayPercnet:0,
                    platformPercent:0
                },
            };
        },
        components: {
            compareBoard,
            successTips,
            failTips,
            Swiper,
            downtime
        },
        computed: {
            point() {
                return this.$store.state.point;
            },
            subPoint() {
                return this.$store.state.subPoint;
            },
            canSpell(){
                let f=(parseInt(this.pageData.publishDate)+this.pageData.endDay*86400000)>new Date().getTime()
                return f
            }
        },
        mounted() {
            this.goodsId = this.$route.query.id;
            this.searchType = this.$route.query.type; // 1闲料 2求购
            this.option.url = window.location.href;
            this.option.title = document.title;//设置文档标题等价于HTML的标签
            this.option.desc = "闲料网";
            this.option.summary = "闲料网";
            console.log(this.option)

            if (sessionStorage.getItem("token")) {
                // this.$store.dispatch("requestPointHttp");
                // this.$store.dispatch("requestSubPointHttp", this.searchType);
                // this.$store.dispatch("requestUserInfoHttp");
                // this.subPoint=this.$store.state.subPoint
                // this.point=this.$store.state.point
                // console.log(this.point)
            }
            this.userInfoAll = this.$loginUtil.getUserInfoAll();
            this.getGoodsInfo();
            this.getAdvers();
            this.getPercent();
        },
        methods: {
            handleClose(){
              this.vipVisible=false
            },
            turnVip(){
                this.$router.push({
                    path: "../home/userCenter/index"
                })
            },
            handleBuyNumChange(value){
                this.buyNum = value;
            },
            startSpellSure(){

                if (this.pageData.surplusNum <= 0) {
                    this.$message({
                        message: "剩余拼单数量不足",
                        type: "warning"
                    })
                    return
                }
                if(this.pageData.surplusNum<this.buyNum){
                    this.$message({
                        message: "剩余拼单数量不足",
                        type: "warning"
                    })
                    return
                }
                if(this.pageData.minNum>this.buyNum){
                    this.$message({
                        message: "拼单数量不能少于最小拼单数量",
                        type: "warning"
                    })
                    return
                }
                if(this.buyNum%this.pageData.minNum!=0){
                    this.$message({
                        message: "拼单数量必须是最小拼单数量的倍数",
                        type: "warning"
                    })
                    return
                }
                let transferData = {
                    cartIds: '',
                    goods: [{mdcMaterialsVo: this.pageData, quantity: this.buyNum}],
                    nums: this.buyNum + '',
                    prices: this.pageData.price,
                    percentInfo:this.percentInfo,
                    types: '',
                    totalPay: this.pageData.price * this.buyNum
                };
                localStorage.setItem("transferData", JSON.stringify(transferData))
                //console.log(transferData);
                this.$router.push({
                    path: "/cart/placeOrder"
                })
            },
            getPercent(){
                this.$http.get(`api-user/app/baseData/getPerpayPercent`).then((res) => {
                    this.percentInfo= res.data.datas
                })
            },
            startSpell() {//开始拼单
                if (!sessionStorage.getItem("token")) {
                    this.$loginUtil.proLoginQrCode()
                    return;
                }
                if (this.userInfoAll.member.level == 0) {
                    this.novipVisible = true;
                } else {
                    this.vipVisible = true;
                }
            },
            getAdvers() {
                this.$http.post(`api-user/app/adv/getApiAdvList`, {positionCode: '1101'}).then((res) => {
                    this.swiperList = res.data.datas;
                    this.$nextTick(() => {
                        this.initSwiper1();
                    });
                })
            },
            getContact() {
                if (!sessionStorage.getItem("token")) {
                    this.$loginUtil.proLoginQrCode();
                } else {
                    if (this.pageData.isEnd == 1) {
                        this.$confirm("您来迟一步，该需求已过期。", "需求过期提示", {
                            confirmButtonText: "返回首页",
                            cancelButtonText: "关闭",
                            type: "warning"
                        })
                            .then(() => {
                                this.$router.push({path: "/home/index"});
                            })
                            .catch(() => {
                            });
                        return;
                    }
                    if (this.userInfoAll.member.level >= 2) {
                        this.ensurePay();
                    } else {
                        this.dialogVisible = true;
                    }
                }
            },
            ensurePay() {
                let params = {
                    resId: this.pageData.id,
                    type: this.$route.query.type,
                    publishUserId: this.pageData.userId
                };
                this.$http.get(`api-user/app/user/readphone`, params).then(res => {
                    console.log(res);
                    if (res.data.resp_code == 0) {
                        this.dialogVisible = false;
                        this.pulishInfo.mobileNo = res.data.resp_msg;
                        this.$message({
                            message: "获取成功",
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.data.resp_msg,
                            type: "warning"
                        });
                    }
                });
            },
            getGoodsInfo() {
                let url = "";
                console.log(this.searchType)
                if (this.searchType == 1) {
                    url = "app/mdcidlematerials/getCollectDetailInfo";
                } else if (this.searchType == 2) {
                    url = "app/mdcbuyingmaterials/getCollectDetailInfo";
                }
                if (sessionStorage.getItem('token')) {
                    this.userId = this.$loginUtil.getUserInfoAll().member.userId;
                } else {
                    this.userId = ""
                }
                this.$http
                    .get(`/api-user/${url}`, {
                        id: this.goodsId,
                        collectUserId: this.userId
                    })
                    .then(res => {
                        // console.log(res.data.datas)
                        this.pageData = res.data.datas;
                        this.buyNum=this.pageData.minNum
                        // if (this.searchType == 1) {
                        //     if (this.pageData.detailImages == "" || this.pageData.detailImages == null) {
                        //         let newList = [];
                        //         newList.push(this.pageData.mainImage);
                        //         this.pageData.detailImages = newList;
                        //     } else {
                        //         this.pageData.detailImages = this.pageData.detailImages.split(",");
                        //     }
                        // }
                        this.$nextTick(() => {
                            this.initSwiper1();
                        });
                        //this.getPushInfoUserInfo()

                    });
            },
            getPushInfoUserInfo() {
                let params = {
                    userId: this.pageData.userId
                };
                this.$http.get(`api-user/app/user/publishBaseInfo`, params).then(res => {
                    this.pulishInfo = res.data.datas;
                    if (sessionStorage.getItem("token")) {
                        this.getUserPhone();
                    }
                });
            },
            getUserPhone() {
                let params = {
                    userId: this.pageData.userId,
                    resId: this.pageData.id,
                    type: this.$route.query.type
                };
                this.$http.get(`api-user/app/user/userPhone`, params).then(res => {
                    if (res.data.resp_code == 0) {
                        this.pulishInfo.mobileNo = res.data.resp_msg;
                    }
                });
            },
            openShareUrl: function (url) {
                var a = document.createElement("a");
                a.href = url;
                a.target = "_blank";
                a.click();
            },
            shareToQZone: function () {
                console.log()
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
                if (this.wechatQrcode) {
                    document.getElementById("qrcode").innerHTML = "";
                    this.wechatQrcode = false;
                } else {
                    let qUrl = "http://wap.xlwfw.com/productPage?id=" + this.goodsId + "&type=" + this.searchType;
                    let qrcode = new QRCode('qrcode', {
                        width: 124,
                        height: 124,
                        text: qUrl
                    })
                    this.wechatQrcode = true;
                }
            },
            shareToWeibo: function () {
                var url = "http://service.weibo.com/share/share.php" +
                    "?url=" + encodeURIComponent(this.option.url) +
                    "&title=" + encodeURIComponent(this.option.title + "。" + this.option.desc) +
                    "&pic=" + encodeURIComponent(this.option.pics) +
                    "&appkey=" + encodeURIComponent(this.option.appkey);
                this.openShareUrl(url);
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
            // 收藏
            collectGoods() {
                if (!sessionStorage.getItem("token")) {
                    this.$loginUtil.proLoginQrCode()
                    return;
                }
                // if (!localStorage.getItem("token")) {
                //   Toast("您尚未登录，请先登录");
                //   return;
                // }
                console.log(222);
                let type = this.$route.query.type;
                if (this.pageData.isCollect) {
                    console.log(333);
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
  //动态类
  .border {
    border: 1px solid #0094e7;
  }

  .dialog-footer {
    text-align: center;
    margin-top: 40px;

    .bottombtn {
      width: 240px;
    }
  }

  .novip {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-top: -100px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .vipwrapper {
    position: relative;
    // width: 280px;
    // height: 400px;
    // background: #fff;
    // border-radius: 5px;
    .vipTitle {
      text-align: center;
      margin: 10px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .vipItem {
      font-size: 15px;
      text-align: left;
      padding: 10px 0;
      margin: 0 30px;
    }

    .vipElse {
      font-size: 15px;
      color: #279bf3;
      margin: 0 30px;
    }

    .vipBottom {
      margin-top: 30px;
      text-align: center;
      font-size: 15px;

      div {
        margin: 10px 0;
      }

      .bootomtitle {
        font-size: 18px;
        font-weight: bold;
      }

      .bootomremain {
        display: flex;
        padding: 10px 0;
        justify-content: center;
        span {
          font-weight: bold;
        }
        .downtime{
        margin-top: 2px;
        margin-left: 5px;
        margin-right: 5px;
        }
      }

      .bootomred {
        color: red;
      }
    }

    .w-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      // border-radius: 40px;
      font-size: 18px;
      color: white;
      background: linear-gradient(to right, #0FB3FB, #289CF3, #398CEE);
    }

    .w-cha {
      position: absolute;
      // bottom: -50px;
      left: 270px;
      right: 0;
      top: -40px;
      margin: auto;
      width: 30px;
      height: 30px;
      // background: url("../../img/novipcha.png") no-repeat;
      background-size: 100% 100%;
    }

  }

  .ReCommonDetailWrap {
    background: rgb(240, 240, 240);
    padding-bottom: 40px;
    box-sizing: border-box;

    .ReCommonDetail {
      width: 1200px;
      margin: 0 auto;

      .locationDetail {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        letter-spacing: 2px;
        // padding: 20px 0;

        a {
          margin: 0 10px;
        }

        .toA:hover {
          color: #0094e7;
          cursor: pointer;
        }
      }

      .el-dialog__body {
        padding: 0px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
      }

      .showGetContentTitle {
        font-size: 20px;
        text-align: center;
        border-bottom: 1px solid #D8D8D8;
        padding-bottom: 10px;
        font-weight: bold;
        color: black;
      }

      .middleContent {
        padding: 5px;
        box-sizing: border-box;
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .needPay {
          font-size: 16px;
        }

        .codeMsg {
          font-size: 14px;
        }
      }

      .contanctMsg {
        color: red;
        font-size: 14px;
        height: 19.66px;
        line-height: 22px;
      }

      .proDetailData {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 200px;

        .swiper {
          width: 100%;
          margin-right: 20px;
          height: 458px;
          position: relative;

          .swiper-container {
            width: 100%;
            height: 100%;
            background: none;
            margin: 0;
          }

          .swiper-wrapper {
            width: 100%;
            height: 100%;
          }

          .swiper-slide {
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 18px;
            background: #fff;
            /* Center slide text vertically */
          }

          .swiper-slide img {
            width: 1200px;
            height: 100%;
          }
        }
      }

      .purchaseCommonDetailLinkman {
        padding: 20px 20px;
        // display: flex;
        border: 1px dashed #606266;
        width: 1160px;
        margin-top: 25px;
        font-size: 14px;

        .LinkmanTitle {
          font-weight: bold;
        }
        .LinkmanDescription{
           word-break:break-all;
        }
      }

      .purchaseCommonDetailButton {
        width: 160px;
        height: 40px;
        border: 1px solid #0094e7;
        line-height: 40px;
        text-align: center;
        margin-top: 40px;
        background: #0094e7;
        color: #fff;
      }

      .proIntroduceAndPdf {
        width: 1200px;
        margin: 0 auto;
        background: white;

        .purchaseCommonDetailContent {
          //   border-bottom: 2px solid #999;
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
            position: relative;

            a {
              width: 16px;
              height: 16px;
              margin: 0 8px;
              cursor: pointer;
              display: inline-block;
            }

            #qrcode {
              position: absolute;
              left: 300px;
              top: -120px;
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
          }
        }

        .proIntroduceAndPdfTitle {
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
          // align-items: center;
          border: 1px dashed #606266;
          width: 1200px;

          .pcdl-1 {
            display: flex;
            flex-direction: column;

            .pcdl-11 {
              width: 80px;
              height: 80px;
            }

            .pcdl-12 {
              margin: 5px 0;
            }
          }

          .pcdl-2 {
            padding: 0 10px;

            .pcdl-21 {
              height: 24px;
              font-size: 16px;
              line-height: 24px;
              display: flex;
              align-items: center;

              img {
                margin: 0 10px;
              }
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
