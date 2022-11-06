<template>
  <div class="user_center_box">
    <div class="user_center_cont">
      <div class="user_center_cont_left">
        <h2>会员中心</h2>
        <div v-for="(t,i) in navList" :key="i">
          <p class="list_title">{{t.pTitle}}</p>
          <ul>
            <li v-for="(te,ind) in t.children" :key="ind">
                <router-link :to="te.toUrl" active-class="user_center_active"  v-if="!(te.toUrl==='/home/userCenter/myrelease'&&!$loginUtil.checkVip())">{{te.name}}</router-link>
<!--                 <p  :class="active === ind ? 'user_center_active' : ''" @click="changePath(te.toUrl,ind)">{{te.name}}</p>-->
            </li>
          </ul>
        </div>
      </div>
      <div class="user_center_cont_right">
        <div class="integral_box" v-if="$route.meta.isIntegral">
          <span>
            我的积分：
            <span style="color:red">0</span>
          </span>
          <router-link to="/home/codeMall">前往积分商城 > ></router-link>
        </div>
        <div class="router_title" v-if="!$route.meta.isShowTitle">
          <span class="router_title_name">{{$route.meta.activeName}}</span>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                active:'',
                navList: [
                    {
                        pTitle: "账户中心",
                        children: [
                            {
                                name: "账户信息",
                                toUrl: "/home/userCenter/index"
                            },
                            {
                                name: "编辑账户信息",
                                toUrl: "/home/userCenter/editAccountInformation"
                            },
                            {
                                name: "管理收货地址",
                                toUrl: "/home/userCenter/manageReceivingAddress"
                            },
                            // { name: "更改登录密码", toUrl: "/login/modifyPassword" },
                            // {
                            //   name: "增值税开票资料",
                            //   toUrl: "/home/userCenter/VATInvoiceInformation"
                            // },
                            // {
                            //   name: "受邀用户",
                            //   toUrl: "/home/userCenter/beInvitedUser"
                            // }
                            // { name: "我的优惠券", toUrl: "/home/userCenter/myCoupon" },
                            // {
                            //   name: "我的积分明细",
                            //   toUrl: "/home/userCenter/myIntegralDetails"
                            // },
                            // { name: "我的物料编码", toUrl: "/home/userCenter/myMaterialCode" },
                            // { name: "账号绑定", toUrl: "/home/userCenter/accountBinding" }
                        ]
                    },
                    {
                        pTitle: "交易管理",
                        children: [
                            {name: "订单管理", toUrl: "/home/userCenter/orderManagement"}
                            // { name: "代付订单", toUrl: "/home/userCenter/paymentOrder" },
                            // { name: "BOM管理", toUrl: "/home/userCenter/BOMmanagement" },
                            // { name: "购买历史", toUrl: "/home/userCenter/purchaseHistory" }
                            // {
                            //   name: "电子对账单",
                            //   toUrl: "/home/userCenter/electronicStatement"
                            // }
                        ]
                    },
                    {
                        pTitle: "服务中心",
                        children: [
                            // { name: "系统消息", toUrl: "/home/userCenter/systemMessages" },

                            {name: "我的收藏", toUrl: "/home/userCenter/myCollection"},
                            {name: "我的记录", toUrl: "/home/userCenter/myrecord"},
                            {name: "我的拼单", toUrl: "/home/userCenter/myspell" },
                            {name: "我的发布", toUrl: "/home/userCenter/myrelease"},
                            // {name: "我的拼单", toUrl: ""},
                            // {
                            //   name: "开票进度查询",
                            //   toUrl: "/home/userCenter/checkBillingProgress"
                            // },
                            // {
                            //   name: "重新开票申请记录",
                            //   toUrl: "/home/userCenter/billingApplicationRecord"
                            // }
                            // { name: "售后服务", toUrl: "/home/userCenter/afterAalesService" },
                            // {
                            //   name: "短信/邮件订阅",
                            //   toUrl: "/home/userCenter/SMSAndEmailSubscription"
                            // }
                        ]
                    }
                    // {
                    //   pTitle: "预付余额",
                    //   children: [
                    //     {
                    //       name: "预付余额账户管理",
                    //       toUrl: "/home/userCenter/balanceAccountManagement"
                    //     },
                    //     { name: "充值记录", toUrl: "/home/userCenter/rechargeRecord" },
                    //     {
                    //       name: "余额转出记录",
                    //       toUrl: "/home/userCenter/balanceOutRecord"
                    //     },
                    //     {
                    //       name: "补/退款记录",
                    //       toUrl: "/home/userCenter/reimbursementRefundRecords"
                    //     }
                    //   ]
                    // }
                ]
            };
        },
        methods:{
            changePath(url,index){
                this.active = index
                this.$router.puah({path:url})
            }
        },
    };
</script>

<style lang="scss" scoped>
  .user_center_box {
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;

    .user_center_cont {
      width: 1200px;
      margin: 0 auto;
      display: flex;

      .user_center_cont_left {
        width: 220px;
        padding: 20px 0 10px;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;

        h2 {
          border-bottom: 1px dashed #e5e5e5;
          height: 25px;
          padding-left: 20px;
          box-sizing: border-box;
        }

        .list_title {
          font-weight: bold;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          padding-left: 20px;
          box-sizing: border-box;
        }

        ul {
          width: 100%;

          li {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;

            a {
              color: #444444;
              display: block;
              width: 100%;
              height: 100%;
              padding-left: 30px;
              box-sizing: border-box;

              &:hover {
                color: #0093e6;
              }
            }
          }
        }
      }

      .user_center_cont_right {
        width: 960px;
        margin-left: 20px;

        .integral_box {
          width: 958px;
          height: 35px;
          background: #fdf3e9;
          border: 1px solid #f3d5ba;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 16px;

          a {
            color: #0093e6;
          }
        }

        .router_title {
          width: 100%;
          height: 46px;
          background: #efeeee;
          display: flex;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          justify-content: space-between;

          .router_title_name {
            font-size: 15px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .user_center_active {
    color: #0093e6 !important;
    background: #e1f4ff;
  }
</style>

