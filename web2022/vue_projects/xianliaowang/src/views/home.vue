<template>
  <div class="mall_home">
    <!-- <div class="c-fixed" :class="isScroll ? 'f-scroll' : ''">
      <div class="c-logo">
        <div class="c-l-img">
          <img src="../../img/lcsc_logo_new.png" @click="toChoosePath('/')" />
        </div>
        <div class="c-search">
          <div class="mall_contain_nav_top_search">
            <div class="mall_contain_nav_top_seach_input">
              <input type="text" placeholder="请输入搜索内容" />
              <span class="search fa fa-search"></span>
            </div>
          </div>
        </div>
      </div>
    </div>-->

    <!-- 首页广告 -->
    <!-- <div class="mall-ad-title" v-if="isShowAdImg">
      <img src="../falseData/img/1.jpg" alt />
      <div class="ad-close" title="关闭" @click="isShowAdImg = false">X</div>
    </div>
    <div class="ad-fixed" v-if="isShowAd">
      <div class="ad-btn" @click="isShowAd = false"></div>
      <img src="../falseData/img/2.gif" alt />
    </div>-->
    <div class="mall_top_nav">
      <div class="mall_top_nav_wrap">
        <!-- <div class="mall_top_nav_left" v-if="userInfo.code == -999">
          您好,
          <span>欢迎来到闲料网</span>
        </div>
        <div class="mall_top_nav_left" v-if="userInfo.code == 1">
          您好，
          <font
            title="查看详情"
            @click="$router.push('/home/userCenter/editAccountInformation')"
          >{{ userInfo.msg.phone }}</font
          >
          <span>欢迎来到闲料网</span>
        </div> -->
        <div class="infos">
          <marquee
            direction="left"
            scrollamount="5"
            v-if="marqueeData != '' || marqueeData != null"
          >
            <font color="red">{{ marqueeData }}</font>
          </marquee>
        </div>
        <div class="mall_top_nav_right">
          <!-- <div class="placeLogin" @click="toLogin" v-if="!isAuth">请登录</div> -->
          <!--          <div class="registerFoFree" @click="toRegister" v-if="!isAuth">免费注册</div>-->
          <div class="recommendCode" v-if="!isAuth">
<!--            -->
<!--            <div class="rcode-img">-->
<!--              <div id="qrcode"></div>-->
<!--            </div>-->
            <div class="placeLogin" @click="toLogin" v-if="!isAuth">二维码登录</div>
          </div>
          <div class="mall_vipcenter">
            <div
              class="mall_vipcenter_title"
              @click="toUserInfo"
              style="cursor: pointer;"
            >
              个人中心
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="mall_vipcenter_list">
              <div
                class="item"
                @click="toChoosePath('/home/userCenter/orderManagement')"
              >
                我的订单
              </div>
              <div
                class="item"
                @click="toChoosePath('/home/userCenter/myCollection')"
              >
                我的收藏
              </div>
              <div
                class="item"
                @click="toChoosePath('/home/userCenter/manageReceivingAddress')"
              >
                收货地址
              </div>
              <!-- <div
                class="item"
                @click="toChoosePath('/home/userCenter/myrecord')"
              >
                我的记录
              </div> -->
              <!-- <dl>
                <dd>
                  <a href="#" @click="toChoosePath('/home/userCenter/orderManagement')">我的订单</a>
                </dd>
                <dd>
                  <a href="#" @click="toChoosePath('/home/userCenter/myCollection')">我的收藏</a>
                </dd>
                <dd>
                  <a href="#" @click="toChoosePath('/home/userCenter/myComplaint')">售后投诉</a>
                  <span>|</span>
                  <a href="#" @click="toChoosePath('/home/userCenter/myCoupon')">我的优惠券</a>
                </dd>
                <dd>
                  <a
                    href="#"
                    @click="toChoosePath('/home/userCenter/balanceAccountManagement')"
                  >预付余额</a>
                  <span>|</span>
                  <a href="#" @click="toChoosePath('/home/userCenter/manageReceivingAddress')">收货地址</a>
                </dd>
              </dl>-->
            </div>
          </div>
          <div v-if="isAuth">|</div>
          <el-badge :value="cartNum" class="item" style="margin-right: 20px;">
            <div class="registerFoFree" @click="changePath('/cart')">购物车</div>
          </el-badge>
          <div v-if="isAuth">|</div>
          <div class="registerFoFree2" v-if="isAuth" :title="userInfo.nickName"
               @click="changePath('/home/userCenter/index')">{{userInfo.nickName}}
          </div>
          <div v-if="isAuth">|</div>
          <!-- <div class="mall_message">
            <div style="cursor: pointer;" @click="toChoosePath('/home/userCenter/systemMessages')">
              消息（
              <span style="color:red;">0</span>）
            </div>
          </div>-->
          <!-- <div class="mall_toapp" style="cursor: pointer;">
            <i class="fa fa-mobile-phone"></i>
            <div class="mall_toapp_title" @click="toChoosePath('/home/appPage')" >手机版</div>
            <div class="mall_toapp_title" @click="onGoto">手机版</div>
          </div>-->
          <!-- <a href="https://www.sz-jlc.com/#'" style="color:#2c3e50">
            <div class="mall_pcbBookSystem" style="cursor: pointer;" >PCB/钢网下单系统</div>
          </a>-->
          <!-- <a href="https://lcsc.com/" style="color:#2c3e50" >
            <div class="mall_globalWebsite" style="cursor: pointer;" >Global Website</div>
          </a>-->
          <div class="mall_contact">
            <!-- <div class="mall_contactNum" ><i class="fa fa-phone"></i><div class="mall_contactNum_num" >0755-000-0000</div></div> -->
            <!-- <span>|</span> -->
            <div
              class="mall_signOutBtn"
              style="cursor: pointer;"
              @click="toLogOut"
              v-if="isAuth"
            >
              退出
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mall_contain_nav">
      <div class="mall_contain_nav_wrap">
        <div class="mall_contain_nav_top">
          <div class="mall_contain_nav_top_logo">
            <img
              src="../../img/youwei.jpg"
              @click="changePath('/home/index')"
            />
          </div>
          <div class="mall_contain_nav_top_search">
            <div class="mall_contain_nav_top_seach_input">
              <input
                type="text"
                placeholder="请输入关键词"
                v-model="searchKeyWords"
                @keyup.enter="onChangePath"
              />
              <span class="search fa fa-search" @click="onChangePath"></span>
            </div>
            <div class="mall_contain_nav_top_seach_list">
              <!-- <span
                class="gold_text"
                @click="onSearchHistory(v)"
                v-for="(v, k) in searchHistory"
                :key="k"
              >{{ v.value }}</span
              > -->
              <span>卖呆料上闲料网，找样品上闲料网</span>
            </div>
          </div>
          <div class="mall_contain_nav_top_seach_push">
            <!-- <img src="../../img/callPhone.jpg" alt /> -->
            <el-button
              size="medium"
              @click="changePath('/home/issueIdleMaterial')"
              plain
            >发布闲料
            </el-button
            >
            <!-- <el-button
              size="medium"
              @click="changePath('/home/issuePurchase')"
              plain
            >发布求购
            </el-button
            > -->
          </div>
          <!-- <div
            class="mall_contain_nav_top_shopcart"
            @click="changePath('/cart')"
          >
            <i class="fa fa-shopping-cart"></i>
            <span class="badge" v-if="cartNum">{{ cartNum }}</span>
          </div> -->
          <!--<i>图标</i>-->
        </div>
        <!-- //index  productContent  certificate outlandBuy codeMall freeIn Bom -->
        <!-- 作为公共部分部分的leftList -->
        <!-- <div class="overfHidden">
          <div class="mall_home_indedx_leftList" v-show="$store.state.isShowLeftList" ref="leftList" @mouseover="showLeftList" @mouseout="hideLeftList" style="display:none;">
            <ul>
              <li @click="changePath('/home/follow')">
                <i class="fa fa-cog"></i>
                <span>我的关注</span>
              </li>
              <li v-for="(item,index) in leftListData" :key="index" style="cursor:pointer" class="liHover" @mouseover="showLiChildrenHoverd(index)" @mouseout="hideLiChildrenHoverd(index)">
                <i class="fa fa-chevron-right"></i>
                <span>{{item.text}}</span>
                <div class="li_colList liChildrenHoverd" v-if="item.hasChildren" :style="liColListStyle">
                  :style="liColListStyle"
                  <div class="li_colList_title">{{item.text}}</div>
                  <div class="li_colList_content">
                    <dl>
                      <dd>
                        <a @click="toChoosePath('/home/outLandDemo',item1.id)" v-for="(item1,index1) in item.children" :key="index1">{{item1.text}}</a>
                        <span class="seperate">|</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
      <div class="mall_contain_nav_bottom">
        <div class="mall_contain_nav_bottom_rowlist">
          <ul>
            <li
              @click="changePath('/home/index')"
              :class="{ linkFont: $route.path === '/home/index' }"
            >
              首页
            </li>
            <li
              @click="changePath('/home/idleMaterial')"
              :class="{ linkFont: $route.path === '/home/idleMaterial' }"
            >
              闲料
            </li>
            <li
              @click="changePath('/home/purchase')"
              :class="{ linkFont: $route.path === '/home/purchase' }"
            >
              拼单
            </li>
            <li
              @click="changePath('/home/freeGoods')"
              :class="{ linkFont: $route.path === '/home/freeGoods' }"
            >
              免费送
            </li>
            <li
              @click="changePath('/home/HotGoods')"
              :class="{ linkFont: $route.path === '/home/HotGoods' }"
            >
              爆品商品
            </li>
            <!-- <li @click="changePath('/home/discount')" :class="{linkFont:$route.fullPath === '/home/discount' }">限时优惠</li> -->
            <!-- <li @click="changePath('/home/damping')" :class="{linkFont:($route.fullPath === '/home/damping' ) }">涂层电阻</li>
            <li @click="changePath('/home/entry')" :class="{linkFont:$route.fullPath === '/home/entry' }">免费入驻</li>
            <li @click="changePath('/home/downLoad')" :class="{linkFont:$route.fullPath === '/home/downLoad' }">资料下载</li> -->
            <!-- <li @click="changePath('/home/about')" :class="{linkFont:$route.fullPath === '/home/about' }">关于闲料</li> -->
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="arrow_nav_box" style="background:#fff">
      <div class="arrow_nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>-->
    <router-view/>
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
              @click="toChooseShow('menberSite')"
            >成员网站</div>
            <div
              class="mall_friendLink_title"
              :class="{'link':friendLink}"
              @click="toChooseShow('friendLink')"
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
          <!-- <li @click="toChoosePath('/home/index')">商城首页</li>
          <li>|</li>
          <li>
            <router-link to="/home/about" style="color:white;">关于闲料网
            </router-link>
          </li>
          <li>|</li>
          <li @click="toChoosePath('/home/help/siteUse')">网站使用条款</li>
          <li>|</li>
          <li @click="collectSite">加入收藏</li> -->
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
    <div class="sideNavBar">
      <div class="colBtn" @click="toColSideBar">
        <span v-if="currentTaggle === 0">收起</span>
        <span v-else>展开</span>
      </div>
      <div class="colContent" ref="colContent" style="display:block;">
        <div class="contactItem qq">
          <div class="qqResult">QQ咨询</div>
          <div class="service" v-if="qqServer.length > 0">
            <div class="qq-title">在线客服</div>
            <div
              class="label"
              v-for="(v, k) in qqServer"
              :key="k"
              @click="onQQCustomers(v)"
            >
              <i
                style="font-size:12px;padding-right: 5px;"
                class="fa fa-qq"
              ></i>
              客服{{ k + 1 }}：
              <!-- <span>{{ v.qqNumer }}</span> -->
              <span>361511131</span>
            </div>
            <div class="hr"></div>
            <div class="qq-time">服务时间</div>
            <div>周一至周六：9:00-18:30</div>
          </div>
        </div>
        <div class="contactItem wechat">
          <div class="wcCode">
            <span>服务热线</span>
            <p>
              <i
                style="font-size:12px;padding-right: 5px;"
                class="fa fa-phone"
              ></i
              >0755-33372591
            </p>
            <div class="hr"></div>
            <span>投诉电话</span>
            <p>彭先生：13691810094</p>
            <div class="hr"></div>
            <span>微信客服</span>
            <img src="../assets/loginImg/wxkf.jpg" alt/>

          </div>
        </div>
        <div class="contactItem kefu">
          <div class="kefuBlock">
            <p>在线客服</p>
            <div class="phone">
              <i
                style="font-size:12px;padding-right: 5px;"
                class="fa fa-phone"
              ></i>
              0755-33372591
            </div>
            <div class="hr"></div>
            <p>服务时间</p>
            <div class="timeItem">周一至周六：9:00-18:30</div>
            <div class="hr"></div>
            <p>投诉建议</p>
            <div class="contaPeo">
              <div class="rightText">
                <p>彭先生：13691810094</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="contactItem certificate"> -->
        <!--<a-->
        <!--href="https://shop44140h5g46y69.1688.com/?spm=a2615work.11851524.0.0.R66qwn"-->
        <!--&gt;-->
        <!-- <img src="../../img/1688.png" alt class="alibaba" /> -->
        <!--</a>-->
        <!-- <div class="showCert">优惠券</div> -->
        <!-- </div> -->
        <!-- <div class="contactItem test">
          <div class="awardQuA">有奖问答</div>
        </div> -->
        <!-- <div class="contactItem code">
          <div class="code22">
            <img src="../../img/code22.png" alt />
          </div>
        </div> -->
      </div>
      <div class="toTop" @click="toTop"></div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      height="400px"
      :before-close="handleClose">
      <iframe width="360px" border="0" frameborder="no" marginwidth="0" marginheight="0" height="400px"
              :src="qrCodeUrl"></iframe>

    </el-dialog>
  </div>
</template>

<script>
    import "../assets/iconfont.css";
    import QRCode from "qrcodejs2";

    export default {
        data() {
            return {
                currentTaggle: 0,
                isScroll: false,
                index: "",
                isShowAdImg: true,
                isShowAd: true,
                friendLink: false,
                menberSite: true,
                catoPath: "",
                timer: null,
                navList: [
                    {
                        name: "新手入门",
                        url: require("../../img/index_xsrm.png"),
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
                        url: require("../../img/index_psfs.png"),
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
                        url: require("../../img/index_zffs.png"),
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
                        url: require("../../img/index_tsfw.png"),
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
                    // {
                    //     name: "商家支持",
                    //     url: require("../../img/index_sjzc.png"),
                    //     children: [
                    //         {
                    //             name: "商家入驻",
                    //             url: ""
                    //         },
                    //         {
                    //             name: "商家规则",
                    //             url: ""
                    //         },
                    //         {
                    //             name: "商家常见问题",
                    //             url: ""
                    //         }
                    //     ]
                    // }
                ],
                isShowCollectSite: false,
                footerList: [
                    {
                        label: "多",
                        value: "品类齐全 轻松购物",
                        imgUrl: require("../../img/index_duo.png")
                        // msg1: "20万现货SKU",
                        // msg2: " 品类不断扩充"
                    },
                    {
                        label: "快",
                        value: "多仓直发 急速配送",
                        imgUrl: require("../../img/index_kuai.png")
                        // msg1: "科技智能大仓储",
                        // msg2: " 4小时快速交货"
                    },
                    {
                        label: "好",
                        value: "正品行货 精致服务",
                        imgUrl: require("../../img/index_hao.png")
                        // msg1: "仅从原厂和代理商进货",
                        // msg2: " 每一颗料均可原厂追溯"
                    },
                    {
                        label: "省",
                        value: "天天低价 畅选无忧",
                        imgUrl: require("../../img/index_sheng.png")
                        // msg1: "明码标价节省时间成本",
                        // msg2: " 一站式采购正品元器件"
                    }
                ],
                isAuth: false,
                leftListData: [],
                marqueeData: "",
                searchKeyWords: "", // 搜索内容框内容
                qqServer: [
                    {
                        // value: "361511131",
                        // type: 0
                    }
                ],
                userInfo: {},
                showList: false,
                liColListStyle: "top:20px;left:220px",
                searchHistory: [
                    {
                        value: "0603",
                        type: 0
                    },
                    {
                        value: "10R",
                        type: 0
                    },
                    {
                        value: "4K7",
                        type: 0
                    },
                    {
                        value: "推荐返利",
                        type: 0
                    },
                    {
                        value: "CR0402FF3320G",
                        type: 0
                    },
                    {
                        value: "RTT06224JTP",
                        type: 0
                    },
                    {
                        value: "RC0603JR-073R6L",
                        type: 0
                    },
                    {
                        value: "2835",
                        type: 0
                    }
                    // {
                    //   value: "无库存商品价格仅供参考",
                    //   type: 1
                    // }
                ],
                cartnumber: 0,
            };
        },
        watch: {
            $route(from, to) {
                if (to.path == from.path) {
                    this.searchKeyWords = this.searchKeyWords
                } else {
                    this.searchKeyWords = "";
                }
            }
        },
        created() {
            this.isAuth = sessionStorage.getItem("token") ? true : false;
            // this.getTreeHelpMenu();
            // this.getHorseLantern();
            this.marqueeData = '您好，欢迎来到闲料网！';	//临时一条跑马灯
            // this.getQQCustomers();
            // this.getFindUserInfo();
        },
        computed: {
            dialogVisible() {
                return this.$store.state.dialogVisible
            },
            qrCodeUrl() {
                return this.$store.state.qrCodeUrl
            },
            cartNum() {
                return this.$store.state.CARTNUMBER;
            }
        },
        mounted() {
            if (sessionStorage.getItem("token")) {
                this.$http.get('api-user/app/user/myInfo', {}).then((res) => {
                    sessionStorage.setItem("userInfoAll", JSON.stringify(res.data.datas))
                    this.userInfo = JSON.parse(sessionStorage.getItem('userInfoAll')).member;
                })
            }
            //从缓存拿数据 获取userInfo信息 2019.12.10
            // console.log(JSON.parse(sessionStorage.getItem('userInfoAll')))
            // if (sessionStorage.getItem('userInfoAll')) {
            //     this.userInfo = JSON.parse(sessionStorage.getItem('userInfoAll')).member;
            // }
            //请求左侧的菜单数据
            // this.$http
            //   .get("/pc/goodsClass/findGoodsClassTree")
            //   .then(res => {
            //     // console.log(res.data.data.rows.children)
            //     // console.log("首页列表")
            //     this.leftListData = res.data.data.rows.children;
            //     localStorage.setItem('navLength', res.data.data.rows.children.length)
            //   })
            //   .catch(res => { });
            // if (this.$route.meta.showLeftList === true) {
            //   // this.$refs.leftList.style.display = 'block';
            //   // this.isShowLeftList = true;
            //   this.$store.commit("SET_IS_SHOW_LEFTLIST", true);
            //   this.catoPath = "/home/index";
            //   this.$store.commit("SET_IS_IN_HOME", true);
            // } else {
            //   // this.isShowLeftList = false;
            //   this.$store.commit("SET_IS_SHOW_LEFTLIST", false);
            //   this.catoPath = "";
            //   this.$store.commit("SET_IS_IN_HOME", false);
            // }
            // window.addEventListener("scroll", this.scrollToTop);
            // 购物车假数据模拟
            // if (localStorage.getItem("cartList")) {
            //   return (this.$store.state.CARTNUMBER = JSON.parse(
            //     localStorage.getItem("cartList")
            //   ).length);
            // }
            //this.getCartNum();
            this.$store.dispatch("getCartNum")
        },
        destroyed() {
            window.removeEventListener("scroll", this.scrollToTop);
        },
        methods: {
            // getCartNum() {
            //     this.$http.get("api-user/app/cart", {
            //         pageNum: 1,
            //         pageSize: 1
            //     }).then(res => {
            //         let cartnumber;
            //         if (res.data.count > 99) {
            //             cartnumber = "99+";
            //         } else {
            //             cartnumber = res.data.count;
            //         }
            //
            //     })
            //         .catch(res => {
            //         });
            // },
            handleClose(done) {
                this.$store.commit('SET_dialogVisible', false)
            },
            // 推荐二维码
            qrcode(url) {
                let qrcode = new QRCode("qrcode", {
                    width: 140,
                    height: 140,
                    text: url,
                    render: "canvas"
                });
            },

            // 搜索历史推荐?
            onSearchHistory(data) {
                if (data.type === 0) {
                    this.searchKeyWords = data.value;
                    this.onChangePath();
                }
            },

            showLiChildrenHoverd(index) {
                // 全部商品分类div
                let vpnode = document.getElementsByClassName(
                    "mall_contain_nav_bottom"
                )[0];
                //左侧树形菜单的滚动高度
                let computScrollTop = document.getElementsByClassName(
                    "mall_home_indedx_leftList"
                )[0];
                //页面的滚动高度
                let bodyScrollTop = document.documentElement.scrollTop;
                let vnode = document.getElementsByClassName("liHover")[index];
                // this.showList = true
                // console.log("left:" + vpnode.offsetLeft);
                this.liColListStyle = `top:${160 +
                vnode.offsetTop -
                computScrollTop.scrollTop -
                bodyScrollTop}px;left:${220 + vpnode.offsetLeft}px`;
            },
            hideLiChildrenHoverd(index) {
                // console.log(index);
                // setTimeout(()=>{
                //   this.showList = false
                // },500)
            },
            // 获取用户信息
            getFindUserInfo() {
                this.$http.get("/pc/user/findUserInfo").then(res => {
                    this.userInfo = res.data.data;
                    if (res.data.data.code != -999) {
                        // pc
                        // this.qrcode(
                        //   `http://demo.qzdcloud.com/login/registerStepOne?uid=${res.data.data.msg.id}`
                        // );
                        // webApp
                        this.qrcode(
                            `http://wap.qzdcloud.com/register?uid=${res.data.data.msg.id}`
                        );
                    } else {
                        this.qrcode(`http://wap.qzdcloud.com/register?uid=""`);
                    }
                });
            },

            // QQ咨询
            getQQCustomers() {
                this.$http.get("/pc/customer/getCustomers").then(res => {
                    this.qqServer = res.data.data.customers;
                });
            },

            // QQ咨询点击
            onQQCustomers(data) {
                // console.log(data);
                window.location.href = `tencent://message/?uin=${data.qqNumer}`;
            },

            // 搜索跳转
            onChangePath() {
                if (this.$route.path.indexOf('home/purchase') > -1) {
                    this.$router.push({
                        path: "/home/purchase",
                        query: {
                            keyWords: this.searchKeyWords,
                            time: new Date().getTime()
                        }
                    });
                } else if (this.$route.path.indexOf('home/freeGoods') > -1) {
                    this.$router.push({
                        path: "/home/freeGoods",
                        query: {
                            keyWords: this.searchKeyWords,
                            time: new Date().getTime()
                        }
                    });
                } else if (this.$route.path.indexOf('home/HotGoods') > -1) {
                    this.$router.push({
                        path: "/home/HotGoods",
                        query: {
                            keyWords: this.searchKeyWords,
                            time: new Date().getTime()
                        }
                    });
                } else {	// 除了上面三大模块，其他直接搜索闲料
                    this.$router.push({
                        path: "/home/idleMaterial",
                        query: {
                            keyWords: this.searchKeyWords,
                            time: new Date().getTime()
                        }
                    });
                }
            },

            // 获取跑马灯信息
            getHorseLantern() {
                this.$http.get("/pc/horseLantern/getHorseLantern").then(res => {
                    this.marqueeData = res.data.data.horseLantern.content;
                });
            },

            // 获取树形菜单列表(footer-nav)
            getTreeHelpMenu() {
                this.$http.get("/pc/helpMenu/getTreeHelpMenu").then(res => {
                    this.navList = res.data.data.helpMenuData;
                });
            },

            onGoto() {
                // window.location.href = 'http://192.168.0.153:8080/'
                window.open("http://192.168.0.153:8080/");
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
            toLogOut() {
                let actions = () => {
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.removeItem("userInfoAll");
                    sessionStorage.removeItem("token");
                    this.$store.dispatch("setCartNumber", 0);
                    window.location.href = this.$store.state.redirectUri;
                };
                this.confirmMsg("退出", actions);
            },
            toTop() {
                if (document.documentElement) {
                    document.documentElement.scrollTop = 0;
                } else if (document.body) {
                    document.body.scrollTop = 0;
                }
            },
            toColSideBar() {
                let target = this.$refs.colContent.style.display;
                if (target === "block") {
                    this.currentTaggle = 1;
                    this.$refs.colContent.style.display = "none";
                    // this.$store.commit('SET_IS_SHOW_LEFTLIST',false);
                } else {
                    this.currentTaggle = 0;
                    this.$refs.colContent.style.display = "block";
                    // this.$store.commit('SET_IS_SHOW_LEFTLIST',true);
                }
            },
            toChoosePath(path, id) {
                this.catoPath = path;
                let isInHome = this.catoPath === "/home/index" ? true : false;
                this.$store.commit("SET_IS_IN_HOME", isInHome);
                console.log(id);
                if (id === undefined) {
                    this.$router.push({
                        path: path,
                        query: {
                            time: new Date().getTime(),
                            // type: "normal"
                        }
                    });
                } else {
                    this.$router.push({
                        path: path,
                        query: {
                            time: new Date().getTime(),
                            classId: id,
                            type: "normal"
                        }
                    });
                }

                // this.$refs.leftList.style.display = 'none';
                this.$store.commit("SET_IS_SHOW_LEFTLIST", false);
            },
            showLeftList() {
                // this.$refs.leftList.style.display = 'block'
                this.$store.commit("SET_IS_SHOW_LEFTLIST", true);
                clearTimeout(this.timer);
            },
            hideLeftList() {
                let that = this;
                this.timer = setTimeout(function () {
                    if (that.catoPath == "/home/index" && that.$store.state.isInHome) {
                        clearTimeout(that.timer);
                    } else {
                        // that.$refs.leftList.style.display = 'none'
                        that.$store.commit("SET_IS_SHOW_LEFTLIST", false);
                    }
                }, 100);
            },
            // 去登陆
            toLogin() {
                this.$loginUtil.proLoginQrCode()
                //this.$router.push({ path: "/login/index" });
            },
            // 去注册
            toRegister() {
                this.$router.push({path: "/login/registerStepOne"});
            },
            // 去会员中心
            toUserInfo() {
                this.catoPath = "/home/userCenter/index";
                this.$router.push({path: "userCenter"});
                // this.$refs.leftList.style.display = 'none';
                this.$store.commit("SET_IS_SHOW_LEFTLIST", false);
                this.$store.commit("SET_IS_IN_HOME", false);
            },
            changePath(path, type, keyWords) {
                if (path == '/home/issueIdleMaterial' || path == '/home/issuePurchase') {
                    if (!this.$loginUtil.checkVip()) {
                      this.$message({
                          message: '会员才可以进行发布，请先升级为会员',
                          type: 'warning'
                      });
                      return;
                    }else if(this.$loginUtil.checkAdmin()){
                      this.$message({
                          message: '管理员不可以发布需求',
                          type: 'warning'
                      });
                      return;
                    }
                }
                if (this.$route.path.indexOf(path) > -1) {
                    return;
                }
                // console.log(this.$route)
                // console.log("changePath")
                // console.log(path)
                // console.log(type)
                // console.log(keyWords)
                // this.catoPath = path;
                // let isInHome = this.catoPath === "/home/index" ? true : false;
                // this.$store.commit("SET_IS_IN_HOME", isInHome);
                // if (this.catoPath === "/home/index") {
                //     // this.$refs.leftList.style.display = 'block';
                //     this.$store.commit("SET_IS_SHOW_LEFTLIST", true);
                // } else {
                //     // this.$refs.leftList.style.display = 'none';
                //     this.$store.commit("SET_IS_SHOW_LEFTLIST", false);
                // }
                this.$router.push({
                    path: path,
                    query: {keyWords: keyWords}
                });
            },
            toChooseShow(word) {
                if (word === "friendLink") {
                    this.friendLink = true;
                    this.menberSite = false;
                } else if (word === "menberSite") {
                    this.friendLink = false;
                    this.menberSite = true;
                }
            },

            // 监听滚动条
            scrollToTop() {
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                scrollTop >= 200 ? (this.isScroll = true) : (this.isScroll = false);
            }
        }
    };
</script>
<style lang="scss" scoped>
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }

  ::-moz-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }

  // html{
  //   -ms-overflow-style:none;
  //   /*火狐下隐藏滚动条*/
  //   overflow:-moz-scrollbars-none;
  // }
  .mall_home {
    .c-fixed {
      position: fixed;
      background: white;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      top: -150px;
      left: 0;
      transition: all 0.5s ease;
      z-index: 10;

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
    }

    .f-scroll {
      top: 0;
      transition: all 0.5s ease;
    }

    .mall-ad-title {
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

      img {
        width: 100%;
        height: 70px;
      }

      .ad-close {
        position: absolute;
        right: 50px;
        top: 10px;
        color: gray;
      }

      &:hover {
        .ad-close {
          color: white;
        }
      }
    }

    .ad-fixed {
      position: fixed;
      z-index: 500;
      right: 100px;
      top: 180px;
      cursor: pointer;

      .ad-btn {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        z-index: 1;
      }
    }

    // sideNavBar
    .sideNavBar {
      position: fixed;
      right: 10px;
      //右侧的sideBar 距离底部相对位置
      bottom: 25%;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      border: 1px solid #e8e8ee;
      z-index: 9999;

      .colContent {
        display: block;
        // overflow: hidden;
      }

      .contactItem {
        width: 55px;
        height: 50px;
        cursor: pointer;
        border-top: 1px solid rgb(240, 240, 240);
      }

      // .contactItem:hover{
      //   background:lightblue;
      // }
      .colBtn {
        width: 55px;
        height: 37px;
        cursor: pointer;
        background: white;
        color: lightgray;
        font-size: 16px;
        line-height: 37px;
        text-align: center;
      }

      // .colBtn:hover{
      //   background:lightblue;
      // }
      .toTop {
        width: 55px;
        height: 37px;
        cursor: pointer;
      }

      // .toTop:hover{
      //   background:lightblue;
      // }
      .qq {
        background-image: url("../../img/qq.png");
        position: relative;

        .qqResult {
          width: 100%;
          height: 100%;
          background: red;
          color: white;
          font-size: 14px;
          text-align: center;
          padding: 10px;
          box-sizing: border-box;
          display: none;
        }

        .service {
          display: none;
          position: absolute;
          right: 55px;
          background: #09f;
          padding: 15px;
          top: 0;
          font-size: 14px;
          box-sizing: border-box;
          width: 188px;
          min-height: 51px;
          color: white;

          .qq-title {
            margin-bottom: 10px;
          }

          .label {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;

            &:hover {
              span {
                text-decoration: underline;
              }
            }

            &:last-of-type {
              margin-bottom: 0;
            }
          }

          .hr {
            border-bottom: 1px solid #e8e8e8;
          }

          .qq-time {
            margin: 10px 0;
          }
        }
      }

      .qq:hover {
        .qqResult,
        .service {
          display: block;
        }
      }

      .wechat {
        background-image: url("../../img/wc.png");
        position: relative;

        .wcCode {
          position: absolute;
          top: 0;
          right: 55px;
          display: none;
          width: 188px;
          height: auto;
          background: #09f;
          padding: 15px;
          box-sizing: border-box;
          color: white;

          .hr {
            border-bottom: 1px solid #e8e8e8;
            margin: 10px 0;
          }

          span {
            display: inline-block;
            margin-bottom: 10px;
          }

          img {
            display: block;
            width: 94%;
            margin: 0 auto;
          }
        }
      }

      .wechat:hover {
        .wcCode {
          display: block;
        }
      }

      .kefu {
        background-image: url("../../img/kefu.png");
        position: relative;

        .kefuBlock {
          z-index: 4000;
          position: absolute;
          right: 55px;
          width: 188px;
          padding: 15px;
          box-sizing: border-box;
          background: #09f;
          line-height: 20px;
          font-weight: normal;
          display: none;
          color: white;

          .timeItem {
            display: flex;
            align-items: center;
          }

          .hr {
            border-bottom: 1px solid #e8e8e8;
            margin: 10px 0;
          }
        }

        .contaPeo {
          display: flex;

          .leftLogo {
            border: 1px solid red;
            width: 25px;
            height: 40px;
            // border: 1px solid red;
            margin-right: 10px;
            display: none;

            i {
              font-size: 40px !important;
            }
          }
        }
      }

      .kefu:hover {
        .kefuBlock {
          display: block;
        }
      }

      .certificate {
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .showCert {
          width: 100%;
          height: 100%;
          background: orangered;
          color: white;
          font-size: 14px;
          line-height: 50px;
          text-align: center;
          display: none;
        }

        .alibaba {
          width: 80%;
          height: 80%;
        }
      }

      .certificate:hover {
        // .showCert {
        //   display: block;
        // }
      }

      .test {
        background-image: url("../../img/test.png");

        .awardQuA {
          width: 100%;
          height: 100%;
          background: lightblue;
          font-size: 14px;
          padding: 10px;
          color: white;
          box-sizing: border-box;
          text-align: center;
          display: none;
        }
      }

      .test:hover {
        .awardQuA {
          display: block;
        }
      }

      .code {
        background-image: url("../../img/code.png");
        position: relative;

        .code22 {
          position: absolute;
          right: 60px;
          top: -70px;
          display: none;
        }
      }

      .code:hover {
        .code22 {
          display: block;
        }
      }

      .toTop {
        background: url("../../img/totop.png") no-repeat;
        background-size: 100% 100%;
      }

      // kefu certificate  test code
    }

    //收藏失败提示
    .collectFailInfo {
      z-index: 3000;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;

      .collectFailInfoBlock {
        width: 445px;
        height: 220px;
        border: 3px solid lightgray;
        box-sizing: border-box;

        .cTitle {
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid lightgray;
          background: rgb(240, 240, 240);
          padding: 5px 15px;
          box-sizing: border-box;

          .cancel {
            font-size: 20px;
            cursor: pointer;
          }
        }

        .cContent {
          display: flex;
          width: 100%;
          height: 184px;
          justify-content: center;
          align-content: center;
          background: white;
          padding: 25px 15px;
          box-sizing: border-box;

          .Leftlogo {
            width: 70px;
            height: 70px;
            text-align: center;
            line-height: 70px;
            margin-right: 30px;

            i {
              font-size: 80px;
              color: red;
            }
          }

          .rightText {
            display: flex;
            width: 200px;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
            font-size: 14px;
            line-height: 20px;
            text-align: left;
            box-sizing: border-box;

            .CollectMethods {
              font-size: 20px;
              color: #0094e7;
            }

            .ensureToCollect {
              width: 70px;
              height: 28px;
              text-align: center;
              line-height: 28px;
              background: #0094e7;
              color: white;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }

    //顶部导航栏
    box-sizing: border-box;
    // background:url("../../img/7af40ad162d9f2d3526602c2a7ec8a136327cca3.png");
    .mall_top_nav {
      min-width: 1200px;
      max-width: 1920px;
      height: 40px;
      font-size: 14px;
      background: #efeeee;
      box-sizing: border-box;
      margin: 0 auto;

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

          marquee {
            padding: 2px 0;
          }
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

          .recommendCode {
            height: 40px;
            line-height: 40px;
            margin-right: 0;
            position: relative;
            padding: 0 10px;
            border: 1px solid transparent;
            color: red;

            .rcode-img {
              visibility: hidden;
              position: absolute;
              z-index: 1;
              width: 140px;
              height: 140px;
              padding: 15px;
              background: white;
              left: -1px;
              display: flex;

              .r-msg {
                margin: auto;
                font-size: 12px;

                span {
                  color: #09f;

                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }

            &:hover {
              border-left: 1px solid #e8e8e8;
              border-right: 1px solid #e8e8e8;
              background: white;
              cursor: pointer;

              .rcode-img {
                visibility: visible;
                border: 1px solid #e8e8e8;
                border-top: 1px solid transparent;
              }
            }
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
              width: 100px;
              left: 0;
              z-index: 99999;

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
              // height: 90px;
              display: block;
              z-index: 9999;
            }

            // dl{
            //   height:auto;
            //   border-top:none;
            //   transition: height 0.5s;
            // }
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

    //带搜索框架的导航部分
    .mall_contain_nav {
      min-width: 1200px;
      max-width: 1920px;
      padding-top: 10px;
      margin: 0 auto;
      // border-bottom: 2px solid #0094e7;
      .mall_contain_nav_wrap {
        display: flex;
        flex-direction: column;
        width: 1200px;
        margin: 0 auto;
        // padding:0 10px;
        box-sizing: border-box;
      }

      .mall_contain_nav_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 20px 0;

        .mall_contain_nav_top_logo {
          width: 180px;
          height: 60px;
          // margin: 30px 20px;
          img {
            width: 100%;
            height: 60px;
            cursor: pointer;
          }
        }

        .mall_contain_nav_top_search {
          width: 600px;
          // flex: 1;
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
              font-size: 14px;
              // width:90%;
              flex: 9;
              // height: 100%;
              // height:36px;
              height: 35px;
              padding: 0 10px;
              border: none;
              box-sizing: border-box;
            }

            span {
              flex: 1;
              display: inline-block;
              display: flex;
              // width:10%;
              // height: 100%;
              height: 37px;
              justify-content: center;
              align-items: center;
              // line-height: 40px;
              // text-align: center;
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
            align-items: center;
            padding: 10px;

            span {
              // cursor: pointer;
            }

            .gold_text:nth-of-type(1) {
              color: orange;
            }

            .gold_text:nth-of-type(2) {
              color: orange;
            }

            .gold_text:nth-of-type(3) {
              color: orange;
            }

            .gold_text:nth-of-type(4) {
              color: orange;
            }

            .gray_text {
              color: gray;
            }
          }
        }

        .mall_contain_nav_top_seach_push {
          height: 60px;

          button {
            color: #0094E7;
            border: 2px solid #0094e7;
          }
        }

        .mall_contain_nav_top_shopcart {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          // backgr
          margin-right: 10px;
          position: relative;
          cursor: pointer;

          .fa-shopping-cart {
            font-size: 40px;
            color: #0094e7;
            line-height: 50px;
          }

          .badge {
            padding: 0 5px;
            line-height: 20px;
            border-radius: 10px;
            background: red;
            color: white;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
          }
        }
      }

      .mall_contain_nav_bottom {
        width: 1200px;
        margin: 0 auto;
        // padding:0 15%;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        background-color: #0094e7;
        color: #fff;
        // border:1px solid red;
        .mall_contain_nav_bottom_collist {
          display: flex;
          width: 220px;
          height: 40px;
          display: flex;
          align-items: center;
          // align-items: center;
          background: #0094e7;
          color: white;
          padding: 5px 10px;
          border-radius: 3px 3px 0 0;
          font-size: 14px;
          cursor: pointer;
          box-sizing: border-box;

          i {
            margin-right: 5px;
          }
        }

        .mall_contain_nav_bottom_rowlist {
          // align-items: center;
          width: 900px;
          height: 100%;
          margin: 0 auto;
          font-weight: bold;
          // border:1px solid red;
          ul {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 16px;

            li {
              cursor: pointer;
              letter-spacing: 2px;
            }

            li:hover {
              color: yellow;
            }

            .linkFont {
              color: yellow;
            }
          }
        }

        // 将出现滚动条
        .overfHidden {
          position: absolute;
          top: 40px;
          //添加样式
          left: 0;
          width: 220px;
          // width:238px;
          font-size: 14px;
          background: #0fa0ec;
          // min-height: 630px;
          max-height: 680px;
          // overflow: scroll;
          // overflow:-moz-scrollbars-none;
          box-sizing: border-box;
          z-index: 9;
          overflow: hidden;

          .mall_home_indedx_leftList {
            // position: absolute;
            // top: 40px;
            min-width: 237px;
            font-size: 14px;
            background: #0fa0ec;
            // min-height: 630px;
            max-height: 650px;
            overflow: scroll;
            // overflow:-moz-scrollbars-none;
            box-sizing: border-box;
            z-index: 9;

            ul {
              z-index: 9;
              width: 100%;
              background: bgb(0, 0, 255);

              li {
                width: 100%;
                height: 40px;
                text-align: left;
                padding: 5px 10px;
                box-sizing: border-box;
                color: white;
                display: flex;
                align-items: center;
                position: relative;

                span {
                  margin-left: 10px;
                }

                .li_colList {
                  width: 600px;
                  min-height: 100px;
                  position: fixed;
                  // top: 0;
                  padding: 10px;
                  border: 1px solid lightgray;
                  border-left: none;
                  background: white;
                  display: none;
                  box-sizing: border-box;
                  z-index: 2000;

                  .li_colList_title {
                    height: 40px;
                    line-height: 40px;
                    padding: 0 10px;
                    border-bottom: 1px solid #0094e7;
                    box-sizing: border-box;
                  }

                  .li_colList_content {
                    padding: 10px 0;
                    line-height: 20px;
                    font-family: "Microsoft YaHei", "微软雅黑", Arail;
                    font-size: 12px;
                    // .seperate {
                    //   color: red;
                    // }
                    a {
                      padding: 0 8px;
                      color: #666666;
                      cursor: pointer;

                      &:hover {
                        color: #09f;
                      }
                    }
                  }
                }
              }

              li:hover {
                background: white;
                color: #0094e7;

                .li_colList {
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .arrow_nav_box {
      width: 100%;
      padding-top: 10px;
      box-sizing: border-box;

      .arrow_nav {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
    }

    /////多快好省
    .mall_special_tag {
      min-width: 1200px;
      max-width: 1920px;
      box-sizing: border-box;
      /* background: lightgray; */
      margin: 0 auto;

      .mall_special_tag_wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        // margin-left: 180px;
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

    ///加入
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
        // margin-left: 180px;
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

      //  >mall_menberSite_title mall_friendLink_title mall_friendLink_links
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
              // border:1px solid green;
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
          align-items: center;

          div {
            margin-right: 0px;
            cursor: pointer;
          }

          .beianCode:hover {
            color: #0094e7 !important;
          }
        }

        // .copyRightOwn{
        //   padding-top: 5px;
        //   box-sizing: border-box;
        // }
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

    // mall_menberSite  mall_footer_nav  mall_copyright
  }
</style>
