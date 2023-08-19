<template>
  <div class="cart">
    <!-- <div class="c-fixed" :class="isScroll ? 'f-scroll' : ''">
      <div class="c-logo">
        <div class="c-l-img">
          <img src="../../../img/lcsc_logo_new.png" @click="onToChoosePath('/')" />
        </div>
        <div class="c-search">
          <div class="mall_contain_nav_top_search" v-if="$route.path == '/cart/index'">
            <div class="mall_contain_nav_top_seach_input">
              <input type="text" placeholder="请输入搜索内容" />
              <span class="search fa fa-search"></span>
            </div>
          </div>
          <el-steps
            :active="$route.path == '/cart/placeOrder' ? 2 : 3"
            v-if="$route.path == '/cart/placeOrder' || $route.path == '/cart/payType' || $route.path == '/cart/unionPay'"
          >
            <el-step title="查看购物车"></el-step>
            <el-step title="填写核对订单信息"></el-step>
            <el-step title="提交订单付款"></el-step>
          </el-steps>
        </div>
      </div>
    </div>-->
    <div class="mall_top_nav">
      <div class="mall_top_nav_wrap">
        <div class="mall_top_nav_left" v-if="userInfo.code == -999" @click="onToChoosePath('/')">
          您好,
          <!-- <router-link to="/home/userCenter/">用户中心</router-link> -->
          <span>欢迎来到闲料网</span>
        </div>
        <div class="mall_top_nav_left" v-if="userInfo.code == 1">
          您好，
          <font
            title="查看详情"
            @click="$router.push('/home/userCenter/editAccountInformation')"
          >{{userInfo.msg.phone}}</font>
          <span>欢迎来到闲料网</span>
        </div>
        <div class="infos">
          <marquee
            direction="left"
            scrollamount="5"
            v-if="marqueeData != '' || marqueeData != null"
          >
            <font color="red">{{marqueeData}}</font>
          </marquee>
        </div>
        <div class="mall_top_nav_right">
          <div class="placeLogin" @click="onToChoosePath('/login')" v-if="!this.isAuth">请登录</div>
          <div
            class="registerFoFree"
            @click="onToChoosePath('/login/registerStepOne')"
            v-if="!isAuth"
          >免费注册
          </div>
          <div class="mall_vipcenter">
            <div
              class="mall_vipcenter_title"
              style="cursor: pointer;"
              @click="onToChoosePath('/home/userCenter/index')"
            >
              个人中心
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="mall_vipcenter_list">
              <div class="item" @click="onToChoosePath('/home/userCenter/orderManagement')">我的订单</div>
              <div class="item" @click="onToChoosePath('/home/userCenter/myCollection')">我的收藏</div>
              <div
                class="item"
                @click="onToChoosePath('/home/userCenter/manageReceivingAddress')"
              >收货地址
              </div>
              <!-- <dl>
                <dd>
                  <a href="#" @click="onToChoosePath('/home/userCenter/orderManagement')">我的订单</a>
                </dd>
                <dd>
                  <a href="#" @click="onToChoosePath('/home/userCenter/myCollection')">我的收藏</a>
                </dd>
                <dd>
                  <a href="#" @click="onToChoosePath('/home/userCenter/myComplaint')">售后投诉</a>
                  <span>|</span>
                  <a href="#" @click="onToChoosePath('/home/userCenter/myCoupon')">我的优惠券</a>
                </dd>
                <dd>
                  <a
                    href="#"
                    @click="onToChoosePath('/home/userCenter/balanceAccountManagement')"
                  >预付余额</a>
                  <span>|</span>
                  <a
                    href="#"
                    @click="onToChoosePath('/home/userCenter/manageReceivingAddress')"
                  >收货地址</a>
                </dd>
              </dl>-->
            </div>
          </div>
          <div class="mall_message">
            <!-- <div
              style="cursor: pointer;"
              @click="onToChoosePath('/home/userCenter/systemMessages')"
            >
              消息（
              <span style="color:red;">0</span>）
            </div>-->
          </div>
          <!-- <div v-if="isAuth">|</div>
          <div class="registerFoFree2" v-if="isAuth" :title="userInfo.nickName"
               @click="changePath('/home/userCenter/index')">{{userInfo.nickName}}
          </div> -->
          <div class="mall_contact">
            <div v-if="isAuth">|</div>
            <div class="mall_signOutBtn" style="cursor: pointer;" @click="logout" v-if="isAuth">退出</div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-logo">
      <div class="c-l-img">
        <img src="../../../img/youwei.jpg" @click="onToChoosePath('/')"/>
      </div>
      <!-- <div class="c-search">
        <div class="mall_contain_nav_top_search" v-if="$route.path == '/cart/index'">
          <div class="mall_contain_nav_top_seach_input">
            <input type="text" placeholder="请输入型号或产品相关信息" v-model="searchKeyWords" @keyup.enter="onChangePath"/>
            <span class="search fa fa-search" @click="onChangePath"></span>
          </div>
        </div>
        <el-steps
          :active="$route.path == '/cart/placeOrder' ? 2 : 3"
          v-if="$route.path == '/cart/placeOrder' || $route.path == '/cart/payType' || $route.path == '/cart/unionPay'"
        >
          <el-step title="查看购物车"></el-step>
          <el-step title="填写核对订单信息"></el-step>
          <el-step title="提交订单付款"></el-step>
        </el-steps>
      </div> -->
    </div>
    <div class="c-container">
      <router-view/>
    </div>

    <div class="c-footer">
      <div class="mall_special_tag">
        <div class="mall_special_tag_wrap">
          <div
            class="mall_special_tag_item"
            v-for="(item, index) in footerList"
            :key="index"
          >
            <div class="mall_special_tag_item_leftImg">
              <img :src="item.imgUrl" alt=""/>
            </div>
            <div class="mall_special_tag_item_right_text">
              <div class="mall_special_tag_item_right_text_title">
                {{ item.value }}
              </div>
              <!-- <div class="mall_special_tag_item_right_text_content">
                <p class="content_item">{{item.msg1}}</p>
                <p class="content_item">{{item.msg2}}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="shoppingDescWrap">
        <div class="shoppingDescContent">
          <template>
            <ul v-for="(item, index) in navList" :key="index">
              <li class="navTitle">{{ item.name }}</li>
              <li class="navImg"><img :src="item.url" alt=""/></li>
              <li
                class="navItem"
                v-for="(item1, index1) in item.children"
                :key="index1"
                @click.stop="$router.push({ path: item1.url })"
              >
                {{ item1.name }}
              </li>
            </ul>
          </template>
        </div>
      </div>
      <div class="mall_footer">
        <!-- <div class="gray_block_wrap">
          <div class="gray_block">
            <div class="mall_footer_title_group">
              <div
                class="mall_menberSite_title"
                :class="{'link':menberSite}"
                @click="onToChooseShow('menberSite')"
              >成员网站</div>
              <div
                class="mall_friendLink_title"
                :class="{'link':friendLink}"
                @click="onToChooseShow('friendLink')"
              >友情链接</div>
            </div>
            <div class="mall_menberSite" v-show="friendLink">
              <div class="mall_menberSite_menber">闲料网电子设计大赛</div>
              <div class="mall_menberSite_menber">闲料网社区</div>
              <div class="mall_menberSite_menber">闲料网EDA</div>
              <div class="mall_menberSite_menber">EasyEDA</div>
              <div class="mall_menberSite_menber">Glocal website LCSC</div>
            </div>
            <div class="mall_friendLink_links" v-show="menberSite">
              <ul v-for="(item,index) in 8" :key="index">
                <li>ic交易网</li>
                <li>电子工程网</li>
                <li>制造资源网</li>
                <li>中国包装网</li>
                <li>51电子网</li>
                <li>电源网</li>
              </ul>
            </div>
          </div>
        </div>-->
        <div class="mall_footer_nav">
          <ul>
            <li @click="toChoosePath('/home/index')">商城首页</li>
            <li>|</li>
            <li>闲料网商城</li>
            <li>|</li>
            <li>联系我们</li>
            <li>|</li>
            <li>友情链接</li>
            <li>|</li>
            <li>网站使用条款</li>
            <li>|</li>
            <li @click="collectSite">加入收藏</li>
          </ul>
        </div>
        <div class="mall_copyright">
          <p>&copy;2000-2017 xx 版权所有，并保留所有权利。ICP备案证书号：卢ICP备00000000号</p>
          <p>服务热线：400-000-0000</p>
        </div>
        <div class="collectFailInfo" v-if="isShowCollectSite">
          <!--isShowCollectSite-->
          <div class="collectFailInfoBlock">
            <div class="cTitle">
              <h3>失败提示</h3>
              <span class="cancel" @click="toHideInfo">x</span>
            </div>
            <div class="cContent">
              <div class="Leftlogo">
                <i class="fa fa-exclamation-circle"></i>
              </div>
              <div class="rightText">
                <p>收藏失败，您的浏览器不支持该方法收藏，请使用</p>
                <p class="CollectMethods">Ctrl+D</p>
                <p>收藏闲料网网站</p>
                <p class="ensureToCollect" @click="toEnsureCollect">确定</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cart",
        data() {
            return {
                marqueeData: "",
                index: "",
                num: 1,
                tableData: [1, 1, 11],
                formInline: {
                    user: "",
                    region: ""
                },
                isAuth: false,
                isScroll: false,
                friendLink: false,
                menberSite: true,
                navList: [
                  {
                      name: "新手入门",
                      url: require("../../../img/index_xsrm.png"),
                      children: [
                          {
                              name: "购物流程",
                              url: ""
                          },
                          {
                              name: "常见问题",
                              url: ""
                          },
                          {
                              name: "订单查询",
                              url: ""
                          }
                      ]
                  },
                  {
                      name: "配送方式",
                      url: require("../../../img/index_psfs.png"),
                      children: [
                          {
                              name: "配送范围及运费",
                              url: ""
                          },
                          {
                              name: "快递信息查询",
                              url: ""
                          }
                          // {
                          //     name: "验收政策",
                          //     url: ""
                          // }
                      ]
                  },
                  {
                      name: "支付方式",
                      url: require("../../../img/index_zffs.png"),
                      children: [
                          // {
                          //     name: "货到付款",
                          //     url: ""
                          // },
                          {
                              name: "在线支付",
                              url: ""
                          }
                      ]
                  },
                  {
                      name: "特色服务",
                      url: require("../../../img/index_tsfw.png"),
                      children: [
                          {
                              name: "订单服务",
                              url: ""
                          },
                          {
                              name: "质量保证",
                              url: ""
                          }
                      ]
                  }
                ],
                isShowCollectSite: false,
                footerList: [
                    {
                        label: "多",
                        value: "品类齐全 轻松购物",
                        imgUrl: require("../../../img/index_duo.png")
                        // msg1: "20万现货SKU",
                        // msg2: " 品类不断扩充"
                    },
                    {
                        label: "快",
                        value: "多仓直发 急速配送",
                        imgUrl: require("../../../img/index_kuai.png")
                        // msg1: "科技智能大仓储",
                        // msg2: " 4小时快速交货"
                    },
                    {
                        label: "好",
                        value: "正品行货 精致服务",
                        imgUrl: require("../../../img/index_hao.png")
                        // msg1: "仅从原厂和代理商进货",
                        // msg2: " 每一颗料均可原厂追溯"
                    },
                    {
                        label: "省",
                        value: "天天低价 畅选无忧",
                        imgUrl: require("../../../img/index_sheng.png")
                        // msg1: "明码标价节省时间成本",
                        // msg2: " 一站式采购正品元器件"
                    }
                ],
                searchKeyWords: "", // 搜索内容框内容
                userInfo: {}
            };
        },
        created() {
            // this.getTreeHelpMenu();
            // this.getHorseLantern();
            // this.getFindUserInfo();
        },
        mounted() {
            window.addEventListener("scroll", this.scrollToTop);
            this.isAuth = sessionStorage.getItem("token") ? true : false;
            if (sessionStorage.getItem("token")) {
                this.$http.get('api-user/app/user/myInfo', {}).then((res) => {
                    sessionStorage.setItem("userInfoAll", JSON.stringify(res.data.datas))
                    this.userInfo = JSON.parse(sessionStorage.getItem('userInfoAll')).member;
                })
            }
        },
        destroyed() {
            window.removeEventListener("scroll", this.scrollToTop);
        },
        methods: {
            // 获取用户信息
            getFindUserInfo() {
                this.$http.get("/pc/user/findUserInfo").then(res => {
                    this.userInfo = res.data.data;
                });
            },
            // 获取跑马灯信息
            getHorseLantern() {
                this.$http.get("/pc/horseLantern/getHorseLantern").then(res => {
                    this.marqueeData = res.data.data.horseLantern.content;
                });
            },
			changePath(path){
				this.$router.push({
				    path: path
				});
			},
            // 搜索跳转
            onChangePath() {
                // if (this.searchKeyWords == "") {
                //   this.$message.error("关键字不能为空");
                // }
                //  else {

                // }
                this.$router.push({
                    path: "/home/outLandDemo",
                    query: {
                        type: "normal",
                        keyWords: this.searchKeyWords,
                        time: new Date().getTime().toString().slice(10)
                    }
                });
            },

            // 获取树形菜单列表(footer-nav)
            getTreeHelpMenu() {
                this.$http.get("/pc/helpMenu/getTreeHelpMenu").then(res => {
                    this.navList = res.data.data.helpMenuData;
                });
            },

            // 监听滚动条
            scrollToTop() {
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                scrollTop >= 200 ? (this.isScroll = true) : (this.isScroll = false);
            },

            // 手机预览
            onGotoView() {
                window.open("http://192.168.0.153:8080");
            },

            // 页面跳转
            onToChoosePath(url) {
                this.$router.push(url);
            },

            // 底部导航切换内容
            onToChooseShow(word) {
                if (word === "friendLink") {
                    this.friendLink = true;
                    this.menberSite = false;
                } else if (word === "menberSite") {
                    this.friendLink = false;
                    this.menberSite = true;
                }
            },
            // 退出
            logout() {
              let actions = () => {
                  sessionStorage.removeItem("userInfo");
                  sessionStorage.removeItem("userInfoAll");
                  sessionStorage.removeItem("token");
                  this.$store.dispatch("setCartNumber", 0);
                  window.location.href = this.$store.state.redirectUri;
              };
              this.confirmMsg("退出", actions);
              //   sessionStorage.removeItem("userInfo");
              //   this.$store.dispatch("setCartNumber", 0);
              //   this.onToChoosePath("/login");
            },
            toEnsureCollect() {
                this.isShowCollectSite = false;
            },
            toHideInfo() {
                this.isShowCollectSite = false;
            },
            collectSite() {
                this.isShowCollectSite = true;
            },
        }
    };
</script>

<style lang="scss" scoped>
  .cart {
    margin-bottom: 20px;

    .c-fixed {
      position: fixed;
      background: white;
      width: 100%;
      z-index: 500;
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      top: -150px;
      left: 0;
      transition: all 0.5s ease;
    }

    .f-scroll {
      top: 0;
      transition: all 0.5s ease;
    }

    .mall_top_nav {
      width: 100%;
      height: 40px;
      font-size: 14px;
      background: #efeeee;
      box-sizing: border-box;

      .mall_top_nav_wrap {
        margin: 0 auto;
        display: flex;
        width: 1200px;
        padding: 0 10px;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .mall_top_nav_left {
          white-space: nowrap;

          font {
            cursor: pointer;
            padding-right: 5px;

            &:hover {
              color: #09f;
              text-decoration: underline;
            }
          }
        }

        .infos {
          flex: 1;
          padding: 2px 10px 0;
        }

        .mall_top_nav_right {
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          div {
            margin-right: 10px;
          }
          .placeLogin {
            color: #0094e7;
            cursor: pointer;
          }

          .registerFoFree {
            cursor: pointer;
            padding: 2px 0;
          }
          .registerFoFree2 {
            padding: 2px 0;
            cursor: pointer;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .mall_vipcenter {
            position: relative;
            height: 40px;
            padding: 0 10px;
            box-sizing: border-box;

            .mall_vipcenter_title {
              cursor: pointer;
              line-height: 40px;
            }

            .mall_vipcenter_list {
              display: none;
              position: absolute;
              top: 40px;
              border: 1px solid #e8e8e8;
              z-index: 1;
              background: white;
              width: 91px;
              left: 0;

              .item {
                text-align: center;
                line-height: 30px;

                &:hover {
                  color: #09f;
                  cursor: pointer;
                }
              }

              dl {
                width: 100%;
                height: 100%;
                // height:100%;
                background: white;
                display: flex;
                flex-direction: column;
                box-sizing: content-box;
                justify-content: center;
                align-items: center;

                dd {
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 5px;
                  line-height: 25px;

                  a {
                    color: rgb(30, 30, 30);
                  }

                  a:hover {
                    color: #0098e4 !important;
                  }
                }
              }

              &:hover {
                border-top: 1px solid #f8f2f2;
              }
            }
          }

          .mall_vipcenter:hover {
            background: white;

            .mall_vipcenter_list {
              height: 90px;
              display: block;
            }
          }

          .mall_toapp {
            display: flex;
            align-items: center;
          }

          .mall_contact {
            display: flex;
            align-items: center;

            .mall_contactNum {
              display: flex;
              align-items: center;

              .mall_contactNum_num {
                margin-left: 10px;
                margin-right: 10px;
                color: #0094e7;
              }
            }

            .mall_signOutBtn {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .c-logo {
      width: 1200px;
      margin: auto;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .c-l-img {
        flex: 1;

        img {
          width: 180px;
          height: 60px;
          cursor: pointer;
        }
      }

      .c-search {
        flex-basis: 500px;
        box-sizing: border-box;

        .mall_contain_nav_top_search {
          width: 500px;
          margin-top: 5px;
          min-height: 40px;
          max-height: 65px;

          .mall_contain_nav_top_seach_input {
            width: 100%;
            height: 40px;
            display: flex;
            border: 2px solid #0094e7;
            box-sizing: border-box;

            input {
              flex: 9;
              height: 100%;
              padding: 0 10px;
              border: none;
              box-sizing: border-box;
            }

            span {
              flex: 1;
              display: inline-block;
              height: 100%;
              line-height: 40px;
              text-align: center;
              color: white;
              font-size: 20px;
              background: #0094e7;
              box-sizing: border-box;
              cursor: pointer;
            }
          }

          .mall_contain_nav_top_seach_list {
            height: 25px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            span {
              cursor: pointer;
            }

            .gold_text {
              color: orange;
            }

            .gray_text {
              color: gray;
            }
          }
        }
      }
    }

    .c-logo /deep/ .el-step__title {
      font-size: 12px;
    }

    .c-container {
      width: 1200px;
      margin: auto;
    }

    .c-footer {
      /////多快好省
      .mall_special_tag {
        min-width: 1200px;
        max-width: 1920px;
        box-sizing: border-box;
        // background: lightgray;
        margin-bottom: 0;

        .mall_special_tag_wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 1200px;
          margin: 0 auto;

          .mall_special_tag_item {
            flex: 1;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;

            .mall_special_tag_item_leftLogo {
              width: 80px;
              height: 80px;
              font-size: 26px;
              text-align: center;
              line-height: 80px;
              border-radius: 100%;
              color: white;
              background: #0094e7;
              margin-right: 20px;
            }
            .mall_special_tag_item_leftImg {
              width: 44px;
              height: 44px;
              margin-right: 10px;
            }
            .mall_special_tag_item_leftImg img {
              width: 100%;
              height: 100%;
            }
            .mall_special_tag_item_right_text {
              height: 60px;
            line-height: 60px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .mall_special_tag_item_right_text_title {
                font-size: 16px;
              }

              .mall_special_tag_item_right_text_content {
                line-height: 20px;
                color: gray;
              }
            }
          }
        }
      }

      // 底部导航
      .shoppingDescWrap {
        min-width: 1200px;
        max-width: 1920px;
        padding: 50px 20px 20px 20px;
        box-sizing: border-box;
        background: lightgray;
        margin: 0 auto;

        .shoppingDescContent {
          width: 1000px;
          margin: 0 auto;
          min-height: 150px;
          font-size: 13px;
          display: flex;
          justify-content: space-between;

          ul {
            line-height: 30px;
            padding: 0 20px;
            box-sizing: border-box;
            position: relative;
            .navTitle {
              font-weight: bold;
              font-size: 16px;
              cursor: default !important;
              color: #2c3e50 !important;
            }
            .navImg {
              position: absolute;
              top: -10px;
              left: -40px;
              width: 50px;
              height: 50px;
            }
            li {
              cursor: pointer;
              &:hover {
                color: #09f;

              }
            }
          }
        }
      }

      //根据导航切换的内容主题
      .mall_footer {
        min-width: 1200px;
        max-width: 1920px;
        margin: 0 auto;
        margin-bottom: 50px;
        .gray_block_wrap {
          padding: 20px 0;
          width: 100%;
          background: lightgray;

          .gray_block {
            width: 70%;
            margin: 0 auto;
            width: 1200px;

            .link {
              border-bottom: 3px solid #0094e7;
              color: #0094e7;
            }

            .mall_footer_title_group {
              display: flex;
              box-sizing: border-box;
              font-size: 16px;

              div {
                cursor: pointer;
              }

              .mall_menberSite_title {
                margin-right: 30px;
                padding-bottom: 5px;
                box-sizing: border-box;
                cursor: pointer;
              }
            }

            .mall_menberSite {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height: 80px;
              box-sizing: border-box;

              .mall_menberSite_title {
                font-size: 12px;
              }

              .mall_menberSite_menber {
                font-size: 14px;
                padding: 0 20px;
                color: rgba(0, 0, 0, 0.7);
                box-sizing: border-box;
                cursor: pointer;
              }
            }

            .mall_friendLink_links {
              display: flex;
              justify-content: space-between;
              color: rgba(0, 0, 0, 0.7);

              ul {
                width: 100px;
                height: 180px;
                font-size: 14px;
                display: flex;
                flex-direction: column;

                li {
                  line-height: 30px;
                  cursor: pointer;
                }
              }
            }
          }
        }

        .mall_footer_nav {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: gray;
          color: white;
          display: flex;
          text-align: center;
          justify-content: center;
          box-sizing: border-box;
          font-size: 14px;

          ul {
            width: 1200px;
            display: flex;
            text-align: center;
            justify-content: center;

            li {
              margin-right: 20px;
              transition: all 0.5s ease;
            }
            li:hover {
              color: blue;
            }
            li:nth-of-type(2n + 1) {
              cursor: pointer;
            }
          }
        }

        .mall_copyright {
          display: flex;
          flex-direction: column;
          // width: 1200px;
          margin: 0 auto;
          line-height: 25px;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          background: gray;
          color: #fff;

          .entrance {
            span {
              margin-left: 10px;
              color: rgb(100, 100, 100);
              cursor: pointer;
            }

            // span:hover {
            //   color: #0094e7;
            // }
          }

          .beian {
            display: flex;

            div {
              margin-right: 00px;
              cursor: pointer;
            }

            a:hover {
              color: #0094e7 !important;
            }
          }

          // .copyRightOwn:hover {
          //   color: #0094e7;
          // }
          .logo {
            width: 40px;
            height: 50px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  /deep/ .el-step__head {
    width: 200px !important;
  }

  /deep/ .el-step__line {
    width: 167px !important;
  }
</style>
