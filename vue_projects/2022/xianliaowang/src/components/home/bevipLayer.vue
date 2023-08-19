<template>
  <!--  v-if="showBeVipLayer" -->
  <div class="vipLayer">
    <!--      <i class="iconfont iconcha cha" @click="closeLayer"></i>-->
    <div class="vipContent">
      <!--        <van-divider :style="{ color: 'black', borderColor: '#E5D7BD', padding: '0 0.4rem',fontSize:'0.5rem'}">-->
      <!--          开通会员-->
      <!--        </van-divider>-->
      <p class="blockTitle">选择类型</p>
      <div class="blockContent" style="justify-content: flex-start;">
        <div class="blockItem" v-for="(item,index) in vipTypes" :key="index"
             :class="`${item.class} ${level == item.level ? 'linked' : ''}`"
             @click="chooseLevel(item.level,item.money)">
          <i class="iconfont iconhuiyuanjiangjin "></i>
          <span class="vipLevel">{{item.name}}</span>
          <span class="vipMoney">需要{{item.money}}元才能达到</span>
        </div>
      </div>
      <p class="blockTitle">选择月份</p>
      <div class="blockContent">
        <div class="monthItem" v-for="(item,index) in months" :key="index"
             :class="`${item.month == month ? 'linked' : '' }`" @click="chooseMonth(item.month)">
          <span class="vipTerm">{{item.name}}</span>
        </div>
      </div>
      <p class="shouldPay">应付<span class="payMoneyNum">{{payMoneyNum}}{{payType == 1 ? '积分':'元'}}</span></p>
      <!--         <p class="blockTitle">选择支付方式</p>-->
      <!--         <div class="payContent">-->
      <!--           <div class="payItem">-->
      <!--             <i class="iconfont iconjifen blue"></i>-->
      <!--             <span class="payTypeName">积分支付</span>-->
      <!--             <input type="radio" name="payType1" @change="choosePaytype(1)"/>-->
      <!--           </div>-->
      <!--           <div class="payItem ">-->
      <!--             <i class="iconfont iconweixinzhifu green"></i>-->
      <!--             <span class="payTypeName">微信支付</span>-->
      <!--             <input type="radio" name="payType1" @change="choosePaytype(2)" checked/>-->
      <!--           </div>-->
      <!--         </div>-->
      <div class="btn-box">
        <button class="payNow" @click="payNow">马上支付</button>
        <button class="payNow payNowCancel " @click="closeLayer">取消</button>
      </div>
    </div>
    <el-dialog
      title="微信扫码支付"
      :visible.sync="dialogVisible"
      width="200"
      :before-close="handleClose"
      append-to-body
    >
      <div
        class="p-code"
        v-loading="codeLoading"
        element-loading-background="rgba(255, 255, 255, 1)"
        element-loading-text="生成中..."
      >
        <div id="createBox">
          <div class="c-title" v-if="maxtime > 0">
            二维码将在
            <span style="color: orange;">{{msgTxt}}</span> 后失效，请及时付款！
          </div>
          <div class="c-title" v-else>
            二维码
            <span style="color: orange;">已失效</span>，请点击弹窗右上角按钮关闭页面重新请求(或点击页面空白部分关闭当前窗口)！
          </div>
          <!--二维码生成处 -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel" size="small">取消支付</el-button>
        <el-button
          type="primary"
          @click="onPaySuccess(payTypes)"
          size="small"
        >完 成</el-button>
        <!--        <el-button-->
        <!--          type="primary"-->
        <!--          @click="onPaySuccess(payTypes)"-->
        <!--          size="small"-->
        <!--          v-if="payTypes == 1"-->
        <!--        >去支付</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import QRCode from "qrcodejs2";

    export default {
        props: {
            showBeVipLayer: {
                default: false
            }
        },
        data() {
            return {
                msgTxt: '',
                codeLoading: false,
                maxtime: '',
                dialogVisible: false,
                codePara: {},
                showEnterPswd: false,
                vipTypes: [
                    {name: '黄金会员', money: '0', level: 3, class: 'gold'},
                    {name: '普通会员', money: '0', level: 1, class: 'gray'},
                ],
                months: [
                    {name: '一个月', month: 1},
                    {name: '三个月', month: 3},
                    {name: '十二个月', month: 12},
                ],
                level: 3,
                month: 1,
                money: 39.9,
                code: 399,
                payType: 2,//微信支付
                VipPriceInfo: {},//充值会员的价格信息
            }
        },
        computed: {
            payMoneyNum() {
                if (this.VipPriceInfo.gold1 == undefined) {

                } else {

                    console.log(this.VipPriceInfo)
                    if (this.payType == 1) {
                        //积分支付
                        if (this.month == 1) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold1.baseValue * 10
                            } else {
                                return this.VipPriceInfo.normal1.baseValue * 10
                            }
                        } else if (this.month == 3) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold3.baseValue * 10
                            } else {
                                return this.VipPriceInfo.normal3.baseValue * 10
                            }
                        } else if (this.month == 12) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold12.baseValue * 10
                            } else {
                                return this.VipPriceInfo.normal12.baseValue * 10
                            }
                        }
                        // return (this.money * this.month*10).toFixed(1)
                        // return this.VipPriceInfo
                    } else {
                        //微信支付
                        // return (this.money * this.month).toFixed(1)
                        if (this.month == 1) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold1.baseValue
                            } else {
                                return this.VipPriceInfo.normal1.baseValue
                            }
                        } else if (this.month == 3) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold3.baseValue
                            } else {
                                return this.VipPriceInfo.normal3.baseValue
                            }
                        } else if (this.month == 12) {
                            if (this.level == 3) {
                                return this.VipPriceInfo.gold12.baseValue
                            } else {
                                return this.VipPriceInfo.normal12.baseValue
                            }
                        }
                    }
                }
            },
        },

        mounted() {
            this.getVipPriceInfo()
        },
        methods: {
            countDown() {
                let minutes, seconds;
                this.maxtime = 2 * 60;
                this.timer = setInterval(() => {
                    if (this.maxtime >= 0) {
                        minutes = Math.floor(this.maxtime / 60);
                        seconds = Math.floor(this.maxtime % 60);
                        this.msgTxt = ` ${minutes} 分 ${seconds} 秒`;
                        --this.maxtime;
                    } else {
                        clearInterval(this.timer);
                    }
                }, 1000);
            },

            wxQrcode(data) {
                this.countDown();
                this.codeLoading = true;
                this.$http
                    .post("api-user/app/pc/wxPay/mwebPay", data)
                    .then(res => {
                        if (res.data.data.code == 0) {
                            this.$message.error(res.data.data.msg);
                        } else {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    let ele = document.getElementById("createBox");
                                    console.log(ele)
                                    let div = document.createElement("div");
                                    div.setAttribute("id", "qrcode");
                                    ele.appendChild(div);
                                    let qrcode = new QRCode("qrcode");
                                    console.log(res)
                                    qrcode.makeCode(res.data.data.codeUrl);
                                    setTimeout(() => {
                                        this.codeLoading = false;
                                    }, 300);
                                }, 500);
                            });
                        }
                    });
            },
            onCancel() {
                this.dialogVisible = false;
                this.removeEle();
                this.$confirm("此操作将放弃支付, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.closeLayer()
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消操作"
                        });
                    });
            },
            handleClose() {
                this.dialogVisible = false;
                this.removeEle();
                this.maxtime = 2 * 60;
                clearInterval(this.timer);
            },
            removeEle() {
                // if (document.querySelector("#qrcode")) {
                //   document.querySelector("#qrcode").remove();
                // }
                let parent = document.getElementById('createBox');
                var lastChild = parent.lastElementChild ? parent.lastElementChild : parent.lastChild;
                console.log(lastChild.id)
                console.log(lastChild.className)
                if(lastChild.id == 'qrcode'){
                    parent.removeChild(lastChild)
                }
            },
            // 确认支付
            onPaySuccess(type) {
                this.dialogVisible = false;
                window.location.href=window.location.href
            },
            getVipPriceInfo() {
                this.$http.get("/api-user/app/user/getMemberPurchaseInfo").then((res) => {
                    console.log(res)
                    this.VipPriceInfo = res.data.datas
                    console.log(this.vipTypes)
                    this.vipTypes[0].money = this.VipPriceInfo.gold1.baseValue
                    this.vipTypes[1].money = this.VipPriceInfo.normal1.baseValue
                }).catch((err) => {
                    console.log(err)
                })
            },
            choosePaytype(type) {
                console.log(type)
                this.payType = type
            },
            closeLayer() {
                this.$emit("close")
                // this.showBeVipLayer = false
            },
            chooseLevel(level, money) {
                //1 是普通3是黄金
                console.log(money)
                this.level = level
                this.money = money
            },
            chooseMonth(month) {
                this.month = month
            },
            payNow() {
                //  支付
                this.dialogVisible = true
                let params = {
                    type: '',
                    amount: Number(this.payMoneyNum),
                    // totalAmount:0.01,
                }
                if (this.level == 1) {
                    if (this.month == 1) {
                        params.type = 1
                    } else if (this.month == 3) {
                        params.type = 2
                    } else if (this.month == 12) {
                        params.type = 3
                    }
                } else if (this.level == 3) {
                    if (this.month == 1) {
                        params.type = 4
                    } else if (this.month == 3) {
                        params.type = 5
                    } else if (this.month == 12) {
                        params.type = 6
                    }
                }
                console.log(this.month)
                console.log(params)
                //要换接口

                this.wxQrcode(params)
            },
        }
    }
</script>

<style scoped lang="scss">
  .vipLayer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    .p-code {
      display: flex;
      flex-direction: column;
      min-height: 300px;
      max-height: 300px;

      img {
        width: 50%;
        margin: auto;
      }

      p {
        text-align: center;
        padding: 15px 0;
      }


    }


    .cha {
      font-size: 40px;
      color: white;
      margin-bottom: 15px;
    }

    .vipContent {
      width: 500px;
      /*height:79vh;*/
      background: white;
      border-radius: 8px;
      padding: 20px 15px;
      box-sizing: border-box;

      .blockTitle {
        font-size: 14px;
        color: gray;
        margin: 5px 0;
      }

      .shouldPay {
        font-size: 14px;
        margin: 10px 0 15px;

        .payMoneyNum {
          font-size: 20px;
          color: red;
          margin-left: 5px;

        }
      }

      .gold {
        background: linear-gradient(to right, #C7A976, #E9D8B3);
        box-sizing: border-box;
      }

      .gray {
        background: linear-gradient(to right, #A8A6B8, #9D9AAA);
        box-sizing: border-box;
      }

      .blockContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin: 10px 0;

        .monthItem {
          width: 145px;
          text-align: center;
          border-radius: 8px;
          border: 1px solid lightgray;
          background: white;
          color: black !important;
          font-weight: bold;
          height: 55px;
          line-height: 55px;
          box-sizing: border-box;
        }

        .blockItem {
          width: 145px;
          display: flex;
          flex-direction: column;
          /*justify-content: flex-start;*/
          align-items: center;
          padding: 8px;
          box-sizing: border-box;
          color: white;
          border-radius: 8px;
          margin-right: 20px;

          .iconhuiyuanjiangjin {
            font-size: 30px;
            margin-bottom: 8px;
          }

          .vipLevel {
            margin: 8px 0;
            margin-top: -2px;
          }
        }
      }

      .linked {
        border: 1px solid rgb(235, 87, 87) !important;
      }

      .payContent {
        margin-top: 10px;




        .payItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 35px;
          font-size: 16px;

          .iconfont {
            font-size: 24px;
          }

          .blue {
            color: #26B9EF;
          }

          .green {
            color: #6BCC03;
          }

          .payTypeName {
            flex: 1;
            margin: 0 8px;
          }

          // input[type='radio']{
          //   width:20px;
          //   height:20px;
          //   -webkit-appearance:none;
          //   outline:none;
          //   border:1px solid gray;
          //   border-radius:50%;
          //   // background:
          // }
          // input[type='radio']:checked{
          //   border:1px solid red;
          //   background:url('../../img/radioBg.png') 100% 100% no-repeat;
          //   background-position: center;
          // }
        }

      }



      .btn-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .payNow {
        width: 49%;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        color: white;
        border-radius: 25px;
        border: none;
        background: linear-gradient(to right, #04B7FB, #378CEF);
		cursor: pointer;
      }

      .payNowCancel {
        background: linear-gradient(to right, #eee, #ccc);
		cursor: pointer;
      }
    }
  }
  #createBox {
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .c-title {
      margin: auto;
      padding-bottom: 30px;
    }
  }
</style>
