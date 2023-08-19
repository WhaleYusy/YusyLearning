import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import axios from './http/';
import loginUtil from './utils/loginUtil'
import store from './store'

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/cart", // 购物车
      redirect: "/cart/index",
      component: () => import("@/views/cart/cart"),
      children: [
        {
          path: "index",
          name: "cart",
          component: () => import("@/views/cart/index"),
          meta: {
            isNeedAuth: true
          }
        },
        {
          path: "placeOrder",
          name: "placeOrder",
          component: () => import("@/views/cart/placeOrder"),
          meta: {
            isNeedAuth: true
          }
        },
        {
          path: "payType",
          name: "payType",
          component: () => import("@/views/cart/payType"),
          meta: {
            isNeedAuth: true
          }
        },
        {
          path: "unionPay",
          name: "unionPay",
          component: () => import("@/views/cart/unionPay"),
          meta: {
            isNeedAuth: true
          }
        }
      ]
    },
    {
      path: "/home",
      component: Home,
      redirect: "/home/index",
      children: [
        {
          path: 'damping',
          name: 'damping',
          component: () => import(/**webpackChunkName:mtDownload */ './page/damping.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/**webpackChunkName:mtDownload */ './page/about.vue')
        },
        {
          path: 'downLoad',
          name: 'mtDownload',
          component: () => import(/**webpackChunkName:mtDownload */ './page/meteriaDownLoad.vue')
        },
        //活动
        {
          path: "freeShipping",
          name: "freeShipping",
          component: () => import(/**webpackChunkName:freeShipping */ "./activity/freeShipping.vue"),
          meta: {
            isNeedAuth: true
          }
        },
        {
          path: "newsDetails", // 首页广告/新闻详情
          name: "newsDetails",
          component: () => import("./components/home/newsDetails.vue")
        },
        {
          path: "moreNews", // 首页更多广告/新闻
          name: "moreNews",
          component: () => import("./components/home/moreNews.vue")
        },
        {
          path: "freeGoods",
          name: "freeGoods",
          component: () => import(/**webpackChunkName:freeGoods */ "./activity/freeGoods.vue"),
        },
        {
          path: "hotGoods",
          name: "hotGoods",
          component: () => import(/**webpackChunkName:hotGoods */ "./activity/hotGoods.vue"),
        },
        {
          path: "idleMaterial",    // 闲料  idleMaterial
          name: "idleMaterial",
          component: () => import(/**webpackChunkName:idleMaterial */ "./activity/idleMaterial.vue"),
        },
        {
          path: "purchase",    // 求购
          name: "purchase",
          component: () => import(/**webpackChunkName:purchase */ "./activity/purchase.vue"),
        },
        {
          path: "issueIdleMaterial",    // 发布闲料
          name: "issueIdleMaterial",
          component: () => import(/**webpackChunkName:issueIdleMaterial */ "./views/pulish/issueIdleMaterial.vue"),
        },
        {
          path: "issuePurchase",    // 求购
          name: "issuePurchase",
          component: () => import(/**webpackChunkName:outLandDemo */ "./views/pulish/issuePurchase.vue"),
        },
        {
          // transatioanRecords
          path: "transatioanRecords",
          name: "transatioanRecords",
          component: () => import(/**webpackChunkName:transatioanRecords */ "./activity/transatioanRecords.vue"),
        },
        {
          path: "product",
          name: "product",
          component: () => import("./activity/product.vue"),
          meta: {
            isNeedAuth: false
          }
        },
        {
          path: "SchemeVerificationBoard",
          name: "SchemeVerificationBoard",
          component: () => import(/**webpackChunkName:SchemeVerificationBoard */ "./activity/SchemeVerificationBoard.vue"),
          meta: {
            isNeedAuth: true
          }
        },
        {
          path: "appPage",
          name: "appPage",
          component: () => import(/**webpackChunkName:appPage */ "./page/appPage.vue"),
          meta: {
            isNeedAuth: true
          }
        },
        ///选项卡
        {
          path: "index",
          component: () => import(/**webpackChunkName:HomeIndex */ "./components/home/index.vue"),
          meta: {
            showLeftList: true
          }
        },
        {
          path: "productContent",      // 目录
          component: () => import(/**webpackChunkName:productContent */ "./components/home/productContent.vue"),

        },
        // {
        //   path: "hotRecommon",
        //   component: () => import(/**webpackChunkName: hotRecommon*/ "./components/home/hotRecommon.vue")
        // },
        {
          path: "discount",
          component: () => import(/**webpackChunkName:freeIn */ "./components/home/discount.vue"), // 限时特惠
        },
        {
          path: "entry",
          component: () => import(/**webpackChunkName:freeIn */ "./components/home/entry.vue")
        },
        // {
        //   path: "certificate",       // 优惠券
        //   component: () =>import(/**webpackChunkName:certificate */ "./components/home/certificate.vue"),

        // },
        // {
        //   path: "outlandBuy",    // 行情指数
        //   component: () =>import(/**webpackChunkName:outlandBuy */ "./components/home/outlandBuy.vue")
        // },
        // {
        //   path: "codeMall",
        //   component: () =>import(/**webpackChunkName:codeMall */ "./components/home/codeMall.vue")
        // },
        // {
        //   path: "freeIn",
        //   component: () =>import(/**webpackChunkName:freeIn */ "./components/home/freeIn.vue")
        // },
        // {
        //   path: "follow",
        //   component: () =>import(/**webpackChunkName:freeIn */ "./components/home/follow/myFollow.vue") // 我的关注
        // },
        // {
        //   path: "Bom",
        //   component: () =>import(/**webpackChunkName:Bom */ "./components/home/Bom.vue")

        // },
        {
          path: "/xianliaoDetail",
          name: "goodDetail",       // 主页商品详情
          component: () => import(/**webpackChunkName:ReCommonDetail */ "./page/xianliaoDetail.vue")
        },
        {
          path: "/purchaseCommonDetail",
          name: "purchaseCommonDetail",       // 主页商品详情
          component: () => import(/**webpackChunkName:ReCommonDetail */ "./page/purchaseCommonDetail.vue")
        },
        {
          path: "/purchaseDetail",
          name: "purchaseDetail",       // 拼单商品详情
          component: () => import(/**webpackChunkName:ReCommonDetail */ "./page/purchaseDetail.vue")
        },
        {
          path: "/purchasemyDetail",
          name: "purchasemyDetail",       // 我的拼单商品详情
          component: () => import(/**webpackChunkName:ReCommonDetail */ "./page/purchasemyDetail.vue")
        },
        {
          path: "help", // 帮助中心
          // redirect: "/home/help/buyersMustRead",
          component: () =>
            import(/**webpackChunkName:help */ "./views/helpCenter/index.vue"),
          children: [
            {
              path: "deliveryInspection", // 售后服务 送货验货
              component: () =>
                import(
                /**webpackChunkName:deliveryInspection */ "./views/helpCenter/components/afterSalesService/deliveryInspection.vue"
                ),
              meta: {
                activeTitle: "送货验货",
                activeNum: 4
              }
            },
            {
              path: "outboundOrderWhen", // 售后服务 订单何时出库
              component: () =>
                import(
                  /**webpackChunkName:outboundOrderWhen */ "./views/helpCenter/components/afterSalesService/outboundOrderWhen.vue"
                ),
              meta: {
                activeTitle: "订单何时出库",
                activeNum: 4
              }
            },
            {
              path: "serviceComplaint", // 售后服务 服务投诉
              component: () =>
                import(
                  /**webpackChunkName:serviceComplaint */ "./views/helpCenter/components/afterSalesService/serviceComplaint.vue"
                ),
              meta: {
                activeTitle: "服务投诉",
                activeNum: 4
              }
            },
            {
              path: "orderingService", // 特色服务 订货服务
              component: () =>
                import(
                  /**webpackChunkName:orderingService */ "./views/helpCenter/components/characteristicService/orderingService.vue"
                ),
              meta: {
                activeTitle: "订货服务",
                activeNum: 3
              }
            },
            {
              path: "progressTracking", // 特色服务 进度跟踪
              component: () =>
                import(
                  /**webpackChunkName:progressTracking */ "./views/helpCenter/components/characteristicService/progressTracking.vue"
                ),
              meta: {
                activeTitle: "进度跟踪",
                activeNum: 3
              }
            },
            {
              path: "qualityGuarantee", // 特色服务 质量保证
              component: () =>
                import(
                  /**webpackChunkName:qualityGuarantee */ "./views/helpCenter/components/characteristicService/qualityGuarantee.vue"
                ),
              meta: {
                activeTitle: "质量保证",
                activeNum: 3
              }
            },
            {
              path: "expressTransportation", // 配送方式 快递运输
              component: () =>
                import(
                  /**webpackChunkName:expressTransportation */ "./views/helpCenter/components/modeDistribution/expressTransportation.vue"
                ),
              meta: {
                activeTitle: "快递运输",
                activeNum: 1
              }
            },
            {
              path: "sinceQuestion", // 配送方式 上门自提
              component: () =>
                import(
                  /**webpackChunkName:sinceQuestion */ "./views/helpCenter/components/modeDistribution/sinceQuestion.vue"
                ),
              meta: {
                activeTitle: "上门自提",
                activeNum: 1
              }
            },
            {
              path: "onlinePayment", // 支付方式 在线支付
              component: () =>
                import(
                  /**webpackChunkName:onlinePayment */ "./views/helpCenter/components/modePayment/onlinePayment.vue"
                ),
              meta: {
                activeTitle: "在线支付",
                activeNum: 2
              }
            },
            {
              path: "buyersMustRead", // 购物指南 顾客必读
              component: () =>
                import(
                  /**webpackChunkName:buyersMustRead */ "./views/helpCenter/components/shoppingGuide/buyersMustRead.vue"
                ),
              meta: {
                activeTitle: "顾客必读",
                activeNum: 0
              }
            },
            {
              path: "commoditySearch", // 购物指南 商品搜索
              component: () =>
                import(
                  /**webpackChunkName:commoditySearch */ "./views/helpCenter/components/shoppingGuide/commoditySearch.vue"
                ),
              meta: {
                activeTitle: "商品搜索",
                activeNum: 0
              }
            },
            {
              path: "gradeMembership", // 购物指南 会员等级
              component: () =>
                import(
                  /**webpackChunkName:gradeMembership */ "./views/helpCenter/components/shoppingGuide/gradeMembership.vue"
                ),
              meta: {
                activeTitle: "会员等级",
                activeNum: 0
              }
            },
            {
              path: "shoppingProcess", // 购物指南 购物流程
              component: () =>
                import(
                  /**webpackChunkName:shoppingProcess */ "./views/helpCenter/components/shoppingGuide/shoppingProcess.vue"
                ),
              meta: {
                activeTitle: "购物流程",
                activeNum: 0
              }
            },
            {
              path: "privacyProtection", // 特别说明 隐私保护政策
              component: () =>
                import(
                  /**webpackChunkName:privacyProtection */ "./views/helpCenter/components/specialVersion/privacyProtection.vue"
                ),
              meta: {
                activeTitle: "隐私保护政策",
                activeNum: 5
              }
            },
            {
              path: "sitedisclaimer", // 特别说明 网站免责声明
              component: () =>
                import(
                  /**webpackChunkName:sitedisclaimer */ "./views/helpCenter/components/specialVersion/sitedisclaimer.vue"
                ),
              meta: {
                activeTitle: "网站免责声明",
                activeNum: 5
              }
            },
            {
              path: "siteUse", // 特别说明 网站使用条款
              component: () =>
                import(
                  /**webpackChunkName:siteUse */ "./views/helpCenter/components/specialVersion/siteUse.vue"
                ),
              meta: {
                activeTitle: "网站使用条款",
                activeNum: 5
              }
            }
          ]
        },
        {
          path: "userCenter",
          redirect: "/home/userCenter/index",
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/memberCenter/index.vue"
            ),
          children: [
            {
              path: "index", // 账户中心 会员中心默认页
              component: () =>
                import(
                  /**webpackChunkName:changeLoginPassword */ "./views/memberCenter/userInfo.vue"
                ),
              meta: {
                isShowTitle: true,
                isNeedAuth: true
              }
            },
            {
              path: "accountBinding", // 账户中心 账号绑定
              component: () =>
                import(
                  /**webpackChunkName:accountBinding */ "./views/memberCenter/components/accountCenter/accountBinding.vue"
                ),
              meta: {
                activeName: "账号绑定",
                isNeedAuth: true
              }
            },
            {
              path: "editAccountInformation", // 账户中心 编辑账户信息
              component: () =>
                import(
                  /**webpackChunkName:editAccountInformation */ "./views/memberCenter/components/accountCenter/editAccountInformation.vue"
                ),
              meta: {
                activeName: "编辑个人账户资料",
                isNeedAuth: true
              }
            },
            {
              path: "manageReceivingAddress", // 账户中心 管理收货地址
              component: () =>
                import(
                  /**webpackChunkName:manageReceivingAddress */ "./views/memberCenter/components/accountCenter/manageReceivingAddress.vue"
                ),
              meta: {
                activeName: "管理收货地址",
                isShowTitle: true,
                isNeedAuth: true
              }
            },
            {
              path: "myCoupon", // 账户中心 我的优惠券
              component: () =>
                import(
                  /**webpackChunkName:myCoupon */ "./views/memberCenter/components/accountCenter/myCoupon.vue"
                ),
              meta: {
                activeName: "我的优惠券",
                isNeedAuth: true
              }
            },
            {
              path: "myIntegralDetails", // 账户中心 我的积分明细
              component: () =>
                import(
                  /**webpackChunkName:myIntegralDetails */ "./views/memberCenter/components/accountCenter/myIntegralDetails.vue"
                ),
              meta: {
                activeName: "我的积分明细",
                isIntegral: true,
                isNeedAuth: true
              }
            },
            // {
            //   path: "myMaterialCode", // 账户中心 我的物料编码
            //   component: () =>
            //     import(
            //       /**webpackChunkName:myMaterialCode */ "./views/memberCenter/components/accountCenter/myMaterialCode.vue"
            //     ),
            //   meta: {
            //     activeName: "我的物料编码",
            //     isNeedAuth: true
            //   }
            // },
            {
              path: "VATInvoiceInformation", // 账户中心 增值税开票资料
              component: () =>
                import(
                  /**webpackChunkName:VATInvoiceInformation */ "./views/memberCenter/components/accountCenter/VATInvoiceInformation.vue"
                ),
              meta: {
                activeName: "增值税开票资料",
                isNeedAuth: true
              }
            },
            {
              // beInvitedUser
              path: "beInvitedUser", // 账户中心 受邀用户
              component: () =>
                import(
                  /**webpackChunkName:VATInvoiceInformation */ "./views/memberCenter/components/accountCenter/beInvitedUser.vue"
                ),
              meta: {
                activeName: "受邀号码",
                isNeedAuth: true
              }
            },
            {
              path: "balanceAccountManagement", // 预付余额 预付余额账户管理
              component: () =>
                import(
                  /**webpackChunkName:balanceAccountManagement */ "./views/memberCenter/components/prepaidBalance/balanceAccountManagement.vue"
                ),
              meta: {
                activeName: "预付余额账户管理",
                isNeedAuth: true
              }
            },
            {
              path: "balanceOutRecord", // 预付余额 余额转出记录
              component: () =>
                import(
                  /**webpackChunkName:balanceOutRecord */ "./views/memberCenter/components/prepaidBalance/balanceOutRecord.vue"
                ),
              meta: {
                activeName: "余额转出记录",
                isNeedAuth: true
              }
            },
            {
              path: "rechargeRecord", // 预付余额 充值记录
              component: () =>
                import(
                  /**webpackChunkName:rechargeRecord */ "./views/memberCenter/components/prepaidBalance/rechargeRecord.vue"
                ),
              meta: {
                activeName: "充值记录",
                isNeedAuth: true
              }
            },
            {
              path: "reimbursementRefundRecords", // 预付余额 补/退款记录
              component: () =>
                import(
                  /**webpackChunkName:reimbursementRefundRecords */ "./views/memberCenter/components/prepaidBalance/reimbursementRefundRecords.vue"
                ),
              meta: {
                activeName: "补/退款记录",
                isNeedAuth: true
              }
            },
            {
              path: "afterAalesService", // 服务中心 售后服务
              component: () =>
                import(
                  /**webpackChunkName:afterAalesService */ "./views/memberCenter/components/serviceCenter/afterAalesService.vue"
                ),
              meta: {
                activeName: "查看退款记录",
                isNeedAuth: true
              }
            },
            {
              path: "billingApplicationRecord", // 服务中心 重新开票申请记录
              component: () =>
                import(
                  /**webpackChunkName:billingApplicationRecord */ "./views/memberCenter/components/serviceCenter/billingApplicationRecord.vue"
                ),
              meta: {
                activeName: "重新开票申请记录",
                isNeedAuth: true
              }
            },
            {
              path: "myCollection", // 服务中心 我的收藏
              component: () =>
                import(
                  /**webpackChunkName:myCollection */ "./views/memberCenter/components/serviceCenter/myCollection.vue"
                ),
              meta: {
                activeName: "我的收藏",
                isNeedAuth: true
              }
            },
            {
              path: "myspell", // 服务中心 我的收藏
              component: () =>
                import(
                  /**webpackChunkName:myCollection */ "./views/memberCenter/components/serviceCenter/myspell.vue"
                ),
              meta: {
                activeName: "我的拼单",
                isNeedAuth: true
              }
            },
            {
              path: "myrecord", // 服务中心 我的记录
              component: () =>
                import(
                  /**webpackChunkName:myCollection */ "./views/memberCenter/components/serviceCenter/myrecord.vue"
                ),
              meta: {
                activeName: "我的记录",
                isNeedAuth: true
              }
            },
            {
              path: "myrelease", // 服务中心 我的发布
              component: () =>
                import(
                  /**webpackChunkName:myCollection */ "./views/memberCenter/components/serviceCenter/myrelease.vue"
                ),
              meta: {
                activeName: "我的发布",
                isNeedAuth: true
              }
            },
            {
              path: "myComplaint", // 服务中心 我的投诉
              component: () =>
                import(
                  /**webpackChunkName:myComplaint */ "./views/memberCenter/components/serviceCenter/myComplaint.vue"
                ),
              meta: {
                activeName: "我的投诉",
                isNeedAuth: true
              }
            },
            {
              path: "SMSAndEmailSubscription", // 服务中心 短信/邮件订阅
              component: () =>
                import(
                  /**webpackChunkName:SMSAndEmailSubscription */ "./views/memberCenter/components/serviceCenter/SMSAndEmailSubscription.vue"
                ),
              meta: {
                activeName: "短信/邮件订阅",
                isNeedAuth: true
              }
            },
            {
              path: "systemMessages", // 服务中心 系统消息
              component: () =>
                import(
                  /**webpackChunkName:systemMessages */ "./views/memberCenter/components/serviceCenter/systemMessages.vue"
                ),
              meta: {
                activeName: "系统消息",
                isNeedAuth: true
              }
            },
            {
              path: "checkBillingProgress", // 服务中心 开票进度查询
              component: () =>
                import(
                  /**webpackChunkName:checkBillingProgress */ "./views/memberCenter/components/serviceCenter/checkBillingProgress.vue"
                ),
              meta: {
                activeName: "开票进度查询",
                isNeedAuth: true
              }
            },

            // {
            //   path: "BOMmanagement", // 交易管理 BOM管理
            //   component: () =>
            //     import(
            //       /**webpackChunkName:BOMmanagement */ "./views/memberCenter/components/transactionManagement/BOMmanagement.vue"
            //     ),
            //   meta: {
            //     activeName: "BOM管理",
            //     isNeedAuth:true
            //   }
            // },
            // {
            //   path: "electronicStatement", // 交易管理 电子对账单
            //   component: () =>
            //     import(
            //       /**webpackChunkName:electronicStatement */ "./views/memberCenter/components/transactionManagement/electronicStatement.vue"
            //     ),
            //   meta: {
            //     activeName: "电子对账单",
            //     isNeedAuth:true
            //   }
            // },
            {
              path: "orderManagement", // 交易管理 订单管理
              component: () =>
                import(
                  /**webpackChunkName:orderManagement */ "./views/memberCenter/components/transactionManagement/orderManagement.vue"
                ),
              meta: {
                activeName: "订单管理",
                isNeedAuth: true
              }
            },
            // {
            //   path: "paymentOrder", // 交易管理 代付订单
            //   component: () =>
            //     import(
            //       /**webpackChunkName:paymentOrder */ "./views/memberCenter/components/transactionManagement/paymentOrder.vue"
            //     ),
            //   meta: {
            //     activeName: "代付订单",
            //     isNeedAuth:true
            //   }
            // },
            {
              path: "purchaseHistory", // 交易管理 购买历史
              component: () =>
                import(
                  /**webpackChunkName:purchaseHistory */ "./views/memberCenter/components/transactionManagement/purchaseHistory.vue"
                ),
              meta: {
                activeName: "购买历史",
                isNeedAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      redirect: "/login/index",
      component: () =>
        import(/**webpackChunkName:userCenter */ "./views/login/login.vue"),
      children: [
        {
          path: "index", // 登录
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/login/components/login.vue"
            )
        },
        {
          path: "registerStepOne", // 注册1
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/login/components/registerStep1.vue"
            )
        },
        {
          path: "registerStepTwo", // 注册2
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/login/components/registerStep2.vue"
            )
        },
        {
          path: "registerStepThree", // 注册3
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/login/components/registerStep3.vue"
            )
        },
        {
          path: "backpwd", // 忘记密码
          component: () =>
            import(
              /**webpackChunkName:userCenter */ "./views/login/components/forgetPassword.vue"
            )
        },
        {
          path: "modifyPassword", // 修改密码
          component: () =>
            import(
              /**webpackChunkName:modifyPassword */ "./views/login/components/modifyPassword.vue"
            )
        },
        {
          path: "bindEmail", // 绑定邮箱
          component: () =>
            import(
              /**webpackChunkName:bindEmail */ "./views/login/components/bindEmail.vue"
            )
        },
        {
          path: "changePhone", // 修改手机号码
          component: () =>
            import(
              /**webpackChunkName:changePhone */ "./views/login/components/changePhone.vue"
            )
        }
      ]
    }
    ///活动
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
 console.log(window.location.href)
  //
  // if(window.location.href.indexOf('code')>=0){
  //     //微信登录的code
  //     //如果url中包含code,则保存到store中
  //     let code = window.location.href.split("?")[1]
  //     code = code.substring(5,code.indexOf('&'))
  //     axios.get("/api-user/app/pc/login/getUnionId", {code: code}).then((data) => {
  //       data = data.data
  //       if (data.resp_code == 0) {
  //         sessionStorage.setItem("userInfo", JSON.stringify(data.datas))
  //         //console.log("+++++++++++++++++++")
  //         axios.loginHttp(`/api-uac/oauth/openId/token`, {openId: data.datas.wxOpenId}, window.btoa('webApp:webApp')).then((resp) => {
  //           //console.log("+++++++++++++++++++"+resp.data.datas.access_token)
  //           sessionStorage.setItem('token', resp.data.datas.access_token);
  //           window.location.href = store.state.redirectUri;
  //         })
  //       }
  //     })
  // }
  if(!sessionStorage.getItem('token')){
    //orhi6wcsW_j2SdHorchylqdC1s74
    //o91emwnFItxva111Lvzpk59Pilnk
    axios.loginHttp(`/api-uac/oauth/openId/token`,{openId:"opz3Ms9DRS_aNYGYMjJNIYLY9kN8"},window.btoa('webApp:webApp')).then((resp)=>{
      //console.log("+++++++++++++++++++"+resp.data.datas.access_token)
      sessionStorage.setItem('token',resp.data.datas.access_token);
      window.location.href =store.state.redirectUri;
    })
  }

 if(!sessionStorage.getItem('userInfoAll')&&sessionStorage.getItem('token')){
   axios.get('api-user/app/user/myInfo',{}).then((res)=>{
     if(res.data.resp_code==0){
       sessionStorage.setItem('userInfoAll',JSON.stringify(res.data.datas))
     }
   })
 }

  if (to.meta.isNeedAuth) {
    if(sessionStorage.getItem('token')){
      next()
    }else {
      loginUtil.proLoginQrCode();
    }
  } else {
    next()
  }
})


export default router;
