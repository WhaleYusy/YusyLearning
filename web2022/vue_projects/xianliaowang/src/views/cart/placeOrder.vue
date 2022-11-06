<template>
  <div class="place-order">
    <!--    <div class="p-alert">-->
    <!--      <p class="p">-->
    <!--        <i class="el-icon-alarm-clock"></i> 订单发货提醒：-->
    <!--      </p>-->
    <!--      <div-->
    <!--        class="p-msg"-->
    <!--      >闲料网4小时闪电发货来啦！！！商品种类小于50款的现货订单：周一至周六8:00-17:00付款，4小时内发货；周日17:00前付款，当天发货；其他时间段付款的订单，当天或第二天12:00前发货。实际发货以快递收货时间为准，另绑定订单发货时间有延时，代购和订货订单以商城工作人员通知时间为准，请做好相应安排并尽量及时支付，谢谢！</div>-->
    <!--    </div>-->
    <div class="p-content">
      <div class="c-title">
        <p class="left">填写并核对订单信息</p>
        <p class="right" @click="onToChoosePath('/cart')">
          返回购物车
          <i class="el-icon-arrow-right"></i>
        </p>
      </div>
      <div class="p-info-warp">
        <!-- 收货人信息 -->
        <div class="p-box">
          <div class="title-box">
            <p class="t-left">收货人信息</p>
            <!-- <p class="t-right" @click="onAddContacts('add')">新增</p> -->
            <p class="t-right" @click="changeAddr">修改地址</p>
          </div>
          <div class="p-container">
            <div class="p-contacts" v-if="phoneData!== null && phoneData.consignee !== undefined ">
              <div class="p-title">
                <div class="p-left">{{phoneData.consignee}}</div>
                <!-- <div class="p-right">默认地址</div> -->
              </div>
              <div class="p-address">
                <p>
                  {{phoneData.area}} {{phoneData.detailArea}}
                </p>
                <p>{{phoneData.telephone}}</p>
              </div>
            </div>
            <div
              class="no-data"
              style="cursor:pointer"
              v-else
              @click="$router.push({path:'/home/userCenter/manageReceivingAddress#',query:{
              type:'chooseAddr'
            }})"
            >设置默认地址
            </div>
          </div>
        </div>

        <div class="p-box">
          <!-- 商品信息 -->
          <div class="p-box">
            <div class="title-box">
              <p class="t-left">商品信息</p>
            </div>
          </div>
          <div class="p-container">
            <el-table
              :data="transferData.goods"
              tooltip-effect="dark"
              style="width: 100%"
            >
              >

                <el-table-column v-if="!this.transferData.percentInfo" label="商品图片" width="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.mdcMaterialsVo.mainImage" style="width: 150px;height: 150px" alt
                         v-if="scope.row.mdcMaterialsVo.mainImage"/>
                    <img src="../../../img/logo.png" style="width: 150px;height: 150px" alt v-else/>
                  </template>
                </el-table-column>
                <el-table-column v-if="!this.transferData.percentInfo" label="商品名称">
                  <template slot-scope="scope">
                    <p>{{scope.row.mdcMaterialsVo.materialsName}}<span style="color:green;margin-left: 5px"
                                                                       v-if="scope.row.mdcMaterialsVo.isFree == 0">(免费送 {{scope.row.mdcMaterialsVo.freeNum}} 件)</span>
                    </p>
                  </template>
                </el-table-column>


                <el-table-column v-if="this.transferData.percentInfo" label="型号">
                  <template slot-scope="scope">
                    <p>{{scope.row.mdcMaterialsVo.materialsName}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column v-if="this.transferData.percentInfo" label="品牌">
                  <template slot-scope="scope">
                    <p>{{scope.row.mdcMaterialsVo.field1}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column v-if="this.transferData.percentInfo" label="类别">
                  <template slot-scope="scope">
                    <p>{{scope.row.mdcMaterialsVo.materialsCategoryName}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column v-if="this.transferData.percentInfo" label="规格">
                  <template slot-scope="scope">
                    <p>{{scope.row.mdcMaterialsVo.materialsSpec}}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column v-if="this.transferData.percentInfo" label="交货日期">
                  <template slot-scope="scope">
                    <p>{{ scope.row.mdcMaterialsVo.deliveryTime | timeFormat('yyyy-mm-dd') }}
                    </p>
                  </template>
                </el-table-column>

              <el-table-column label="数量" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.quantity}}</span>
                </template>
              </el-table-column>
              <el-table-column label="金额" width="160">
                <template slot-scope="scope">
                  <p style="color: #ff7800">￥{{scope.row.mdcMaterialsVo.price}}</p>
                </template>
              </el-table-column>
              <el-table-column label="总计"  width="160">
                <template slot-scope="scope">
                  <p style="color: #ff7800">￥{{scope.row.mdcMaterialsVo.price*((scope.row.quantity-scope.row.mdcMaterialsVo.freeNum>0)?(scope.row.quantity-scope.row.mdcMaterialsVo.freeNum):0)}}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="p-submit">
          <div class="s-box">
            <div class="s-start-box">
              共
              <span class="s-color">{{num}}</span> 件商品，商品总金额：
            </div>
            <div class="s-end-box">￥{{totalPay}}</div>
          </div>
          <div class="s-box" v-if="this.transferData.percentInfo">
            <div class="s-start-box">预付金额：</div>
            <div class="s-end-box">￥{{perpay}}</div>
          </div>
          <div class="s-box" v-if="!this.transferData.percentInfo">
            <div class="s-start-box">运费：</div>
            <div class="s-end-box">￥{{postFee}}</div>
          </div>
          <div class="s-box" >
            <div class="s-start-box">应付总额：</div>
            <div class="s-end-box font-we">￥{{totalPay_}}</div>
          </div>
          <!--          <div v-if="goodsInfo.discount < 10">-->
          <!--            <div class="s-box">-->
          <!--              <div class="s-start-box">会员折扣：</div>-->
          <!--              <div class="s-end-box font-we">{{goodsInfo.discount}}折</div>-->
          <!--            </div>-->
          <!--            <div class="s-box">-->
          <!--              <div class="s-start-box">实付总额：</div>-->
          <!--              <div class="s-end-box font-we">￥{{goodsInfo.discountTotalAmount.toFixed(2)}}</div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!-- <div class="s-right">
            <el-checkbox v-model="checked">
              同意闲料网《网站使用条款》
              <span @click.stop="onToChoosePath('/')">《网站使用条款》</span>
            </el-checkbox>
          </div>-->
          <el-button type="primary" size="small" @click="onSubmitOrder">提交订单</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "placeOrder",
        data() {
            return {
                phoneData: {},
                dialogVisible1: false,
                checked: true,
                transferData: [],
                isActive: 0,
                invoice: 1,
                formInline: {
                    type: "",
                    user: "",
                    region: ""
                },
                isEdit: "",
                num: 0, //商品种数
                postFee: 0,
                freePostage:2000,
                sendBackData: {},
                goodsInfo: {},
                areaList: [],
                totalPay:0,
                orderOptions: [],
                transferData:{
                    percentInfo:{
                        perpayPercnet:0,
                        platformPercent:0
                    }
                }
            };
        },
        created() {

        },
        mounted() {
            this.transferData = JSON.parse(localStorage.getItem("transferData"))
            this.getOrderDetail()

        },
        computed:{
            perpay(){
                if(this.transferData.percentInfo){
                    return (this.totalPay*(parseInt(this.transferData.percentInfo.perpayPercnet)+parseInt(this.transferData.percentInfo.platformPercent))/100).toFixed(2)
                }
                return 0
            },
            totalPay_(){
                if(this.transferData.percentInfo){
                    return (parseFloat(this.totalPay)+parseFloat(this.totalPay*this.transferData.percentInfo.platformPercent/100)).toFixed(2)
                }else if(this.transferData.isFree==1) {
                    return (parseFloat(this.totalPay)+parseFloat(this.postFee)).toFixed(2)
                }
                else {
                    return (parseFloat(this.totalPay)+parseFloat(this.postFee)).toFixed(2)
                }
            }
        },
        methods: {
            changeAddr() {
                //点击选择地址
                this.$router.push({
                    path: "/home/userCenter/manageReceivingAddress#",
                    query: {type: "choose", transferData: this.$route.query.transferData}
                });
            },
            getOrderDetail() {
                //获取默认收货地址
                this.getDefaultAddress();
                let numList = this.transferData.nums.split(",")
                numList.forEach((item) => {
                    this.num += parseInt(item)
                })
                this.totalPay=this.transferData.totalPay
            },
            getFreePostPage(){
                this.$http.get('/api-user/app/baseData/getFreePostageMeney').then((res) => {
                    // 此处获取返回值邮费
                    if (res.data.resp_code === 0) {
                        if(res.data.datas&&res.data.datas!=0){
                            this.freePostage = parseInt(res.data.datas);
                            this.toCalculatePostage(this.phoneData.code, this.num)
                        }
                    }
                });
            },

            toCalculatePostage(code, buyNum) {
                let freeNum=0;
                let freeMoney=0;
                this.transferData.goods.forEach((item)=>{
                    if(item.mdcMaterialsVo.isFree==1){
                        freeMoney=parseFloat(freeMoney)+parseFloat(item.mdcMaterialsVo.price*item.quantity)
                        freeNum=parseInt(freeNum)+parseInt(item.quantity)
                    }
                });
                if(freeMoney>=this.freePostage){
                    //免费送购买金额超过指定数量免邮
                    buyNum=buyNum-freeNum
                }
                if (code && buyNum) {
                    let params = {
                        areaCode: code,
                        num: buyNum
                    };
                    this.$http.get('/api-user/app/order/calculatePostage', params).then((res) => {
                        // 此处获取返回值邮费

                        if (res.data.resp_code === 0) {
                            this.postFee= parseFloat(res.data.datas).toFixed(2);
                        } else {
                            // 默认10元邮费
                            this.postFee= 10;
                        }
                    });
                }
            },
            getDefaultAddress() {
                this.$http.get('/api-user/app/mdcShippingAddr/getDefaultShipAddr').then((res) => {
                    if (res.data.datas) {
                        this.phoneData = res.data.datas;
                        if(!this.transferData.percentInfo){
                            this.getFreePostPage()
                        }

                    }
                })
            },
            changeDateTime(val) {
                // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
                let date = new Date(val);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                let lastTime = Y + M + D + h + m + s;
                return lastTime;
            },
            // 页面跳转
            onToChoosePath(url) {
                this.$router.push(url);
            },

            // 保存地址
            // 提交订单
            onSubmitOrder() {

                if (this.phoneData === null || this.phoneData.consignee === undefined) {
                    this.$notify({
                        title: "警告",
                        message: "请先设置地址",
                        type: "warning"
                    });
                }else {
                    let goods=[]
                    this.transferData.goods.forEach((item)=>{
                        let temp=item.mdcMaterialsVo
                        //delete(temp['materialsCategoryName'])
                        delete(temp['deliveryTempName'])
                        delete(temp['creatorTemp'])
                        delete(temp['lastOperatorTemp'])
                        delete(temp['priceFrom'])
                        delete(temp['createdTimeFrom'])
                        delete(temp['createdTimeTo'])
                        delete(temp['creator'])
                        delete(temp['creatorId'])
                        delete(temp['priceTo'])
                        delete(temp['isCollect'])
                        delete(temp['buyNum'])
                        if(Array.isArray(temp.detailImages)){
                            temp.detailImages= temp.detailImages.join(',');
                        }
                        // if(this.transferData.percentInfo){
                        //     temp.deliveryTime=this.changeDateTime(temp.deliveryTime)
                        // }
                        temp.quantity=item.quantity
                        goods.push(temp)
                    })
                    let obj = {
                        goodsJson:JSON.stringify(goods),
                        totalAmount:this.totalPay_,  // 邮费加商品费用
                        totalPoint:(this.totalPay_*10).toFixed(0),
                        postageAmount: this.postFee,       // 邮费
                        returnPoint:0,         // 爆品返还积分
                        carIds:this.transferData.cartIds,
                        addressId:this.phoneData.id,
                        totalNum:this.num
                    }
                    if(this.transferData.percentInfo){
                        obj.isBuy=1
                        obj.perPay=parseFloat(this.perpay) +parseFloat(this.postFee)
                    }else {
                        obj.isBuy=0
                    }
                    this.$http.post('/api-user/app/order/createOrder',obj).then((res)=>{
                        console.log(res)
                        let that = this
                        let dataSource = res.data.datas.orderInfo
                        if(res.data.resp_code == 0){
                            if(this.$refs.integralPay.checked){
                                console.log("调用积分支付")
                                // let paramsData = {
                                //     orderId:dataSource.id,
                                //     payType:1,
                                //     totalAmount:dataSource.totalPrice,
                                //     totalPoint:dataSource.totalPrice * 10
                                // }
                                this.paramsData = {
                                    orderId:dataSource.id,
                                    payType:1,
                                    totalAmount: dataSource.totalPrice,
                                    totalPoint: dataSource.totalPrice * 10
                                }
                                console.log(this.paramsData)
                                this.$http.get('/api-user/app/order/isSetPaySecurity').then((res)=>{
                                    if(res.data.datas){
                                        this.showPay = false
                                        this.showEnterPswd = true
                                    }else{
                                        //无支付密码，去设置
                                        this.showPay = false
                                        this.showEnterPswd = false
                                        this.$dialog.confirm({
                                            title: '提示',
                                            message: '是否前往往设置支付密码？'
                                        }).then(() => {
                                            // on confirm
                                            console.log("确认")
                                            that.$router.push('/setPassword')
                                        }).catch(() => {
                                            // on cancel
                                        });
                                    }
                                })

                            }else{
                                console.log("调用微信支付")
                                let paramsData = {
                                    orderId:dataSource.id,
                                    payType:2,
                                    totalAmount:dataSource.totalPrice,
                                    totalPoint:dataSource.totalPrice * 10
                                }
                                // let paramsData = {
                                //     orderId:dataSource.id,
                                //     payType:2,
                                //     totalAmount:0.01,
                                //     totalPoint:1
                                // }
                                let that = this;
                                this.$http.post('/api-user/app/order/orderPay',paramsData).then((res)=>{
                                    console.log(res)
                                    if(res.data.datas.code == 1){
                                        let data = res.data.datas.map
                                        wx.config({
                                            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                            appId: data.appId, // 必填，公众号的唯一标识
                                            timestamp: data.timeStamp, // 必填，生成签名的时间戳
                                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                                            signature: data.paySign, // 必填，签名
                                            jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
                                        });

                                        /**
                                         * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
                                         * config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
                                         * 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
                                         * 则可以直接调用，不需要放在ready函数中。
                                         */
                                        // debugger
                                        wx.ready(() => {
                                            wx.checkJsApi({
                                                jsApiList: ["chooseWXPay"],
                                                success(res) {
                                                    if (res.checkResult.chooseWXPay) {
                                                        wx.chooseWXPay({
                                                            appId: data.appId,
                                                            timestamp: data.timeStamp, // 支付签名时间戳
                                                            nonceStr: data.nonceStr, // 支付签名随机串，不长于32 位
                                                            package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                                            signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                                            paySign: data.paySign, // 支付签名
                                                            orderNo: data.orderNo, // 订单编号
                                                            success(res) {
                                                                console.log(res);
                                                                //支付成功
                                                                // Toast(`支付成功`);
                                                                //支付成功之后跳转到支付成功页面
                                                                // that.$router.push({path:'/mall/payDetail',query:{bi:this.bi,payType:this.chooseid,orderPrice:0.01,orderNo:''}});
                                                                that.$router.push({path:'/orderList',query:{active:0}});
                                                            },
                                                            cancel(res) {
                                                                //支付取消
                                                                // Toast(`您已取消支付`);
                                                                // alert("取消支付")
                                                                that.$router.push({path:'/orderList',query:{active:1}});
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        });
                                        wx.error(err => {
                                            this.$toast("支付出错")
                                            console.log(`出错了${err}`);
                                        });
                                    }else{
                                        this.$toast("网络异常")
                                    }
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }
                        }else {
                            this.$toast(res.data.resp_msg);
                        }
                        this.disabled = false;
                    }).catch((err)=>{
                        this.$router.push({path: "/home/userCenter/orderManagement"});
                    })


                    //console.log("下订单");
                    // let data = {};
                    // this.$http
                    //     .post("/pc/goodsOrder/createdGoodsOrder", data)
                    //     .then(res => {
                    //         if (res.data.data.code === 1) {
                    //             this.$message.success(res.data.data.msg);
                    //             this.requestCartNum();
                    //             this.$router.push({path: "/home/userCenter/orderManagement"});
                    //         } else {
                    //             this.$message(res.data.data.msg);
                    //         }
                    //     })
                    //     .catch(res => {
                    //     });
                    //console.log(data);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
  .place-order {
    .p-alert {
      border: 1px solid #f3d4b8;
      border-radius: 3px;
      background: #fdf2e8;
      padding: 15px;
      font-size: 14px;

      .p {
        color: #f78000;
      }

      .p-msg {
        color: #666666;
        line-height: 25px;
        text-indent: 2em;
        margin-top: 10px;
      }
    }

    .p-content {
      margin: 20px 0;

      .p-form {
        display: flex;

        .p-checkbox {
          padding-left: 20px;
          position: relative;

          .p-popover {
            position: absolute;
            right: 0;
          }
        }
      }

      .c-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          font-size: 16px;
        }

        .right {
          color: #f78000;
          cursor: pointer;
        }
      }

      .p-info-warp {
        border: 1px solid #e8e8e8;
        margin-top: 15px;

        .p-box {
          .title-box {
            height: 40px;
            background: #f2f2f2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;

            .t-left {
              font-weight: bold;
              font-size: 14px;

              .t-msg {
                color: red;
                font-size: 12px;
                font-weight: normal;
              }

              .t-msg1 {
                color: gray;
                font-size: 12px;
                font-weight: normal;
              }
            }

            .t-right {
              color: #09f;
              cursor: pointer;
            }
          }

          .p-container {
            background: white;
            padding: 15px;
            border-bottom: 1px solid #e8e8e8;

            .p-msgs {
              padding: 0 20px;

              .span {
                color: #f78000;
              }
            }

            .p-call {
              line-height: 30px;

              .p-span {
                padding-left: 20px;
              }
            }

            .p-contacts {
              display: inline-block;
              border: 2px dashed #cccccc;
              padding: 10px;
              width: 25%;
              margin: 10px;
              position: relative;

              .p-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e8e8e8;
                padding-bottom: 10px;

                .p-right {
                  display: block;
                  color: gray;
                  background: #eeeeee;
                  border-radius: 20px;
                  padding: 5px;
                  cursor: pointer;
                }
              }

              .p-address {
                padding-top: 10px;

                p {
                  line-height: 30px;
                }
              }

              .p-btn {
                color: gray;
                padding-top: 10px;

                span {
                  cursor: pointer;
                }

                .p-b-span {
                  padding-right: 15px;
                }

                .del {
                  &:hover {
                    color: #09f;
                  }
                }
              }

              .sjx {
                position: absolute;
                right: -2px;
                bottom: -2px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 0 30px 30px;
                border-color: transparent transparent #007bff transparent;

                i {
                  position: absolute;
                  top: 15px;
                  right: 3px;
                  color: white;
                }
              }
            }

            .no-data {
              text-align: center;
              padding: 15px 0;
              color: gray;
            }

            .p-is-active {
              border: 2px dashed #09f;
            }

            .invoice {
              display: flex;
              margin-top: 10px;

              .p-invoice {
                height: 40px;
                text-align: center;
                line-height: 40px;
                padding: 0 30px;
                border: 1px solid #e8e8e8;
                margin-right: 20px;
                position: relative;

                .msg {
                  position: absolute;
                  top: -15px;
                  right: -1px;
                  background: red;
                  color: white;
                  height: 20px;
                  line-height: 20px;
                  border-radius: 3px;
                  padding: 0 5px;
                }
              }

              .invoice-active {
                border: 1px solid #09f;
                color: #09f;
              }
            }

            .p-from-item {
              margin-top: 30px;

              .span {
                padding-left: 20px;
              }

              .demo-ruleForm {
                width: 500px;
              }
            }

            .hr {
              border-bottom: 1px solid #e8e8e8;
            }

            .invoice-three {
              margin: 20px 0;
              color: red;
            }
          }
        }

        .p-submit {
          padding: 15px;
          text-align: right;
          font-size: 14px;

          .s-box {
            text-align: right;
            line-height: 30px;
            display: flex;
            justify-content: flex-end;

            .s-color {
              color: #f78000;
            }

            .s-end-box {
              flex-basis: 150px;
            }

            .font-we {
              font-weight: bold;
              color: #f78000;
              font-size: 16px;
            }
          }

          .s-right {
            margin: 10px 0;
          }
        }
      }

      .p-textarea {
        text-align: right;
        margin-top: 15px;

        span {
          color: #f78000;
        }
      }
    }
  }
</style>


