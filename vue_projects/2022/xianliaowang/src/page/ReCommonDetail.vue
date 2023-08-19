<template>
  <div class="ReCommonDetailWrap">
    <div class="ReCommonDetail">
      <div class="locationDetail"></div>
      <div class="proDetailData">
        <div class="leftImgBlock">
          <div class="topBigimg" v-if="smallImgList !== null && smallImgList.length>0">
            <img v-if="proDetailData.isRecommend == 1" src="../falseData/img/bk_icon.png" class="hotRecommTag" alt />
            <img :src="smallImgList[chooseSmallIndex].url" alt class="bigImgG" />
            <i class="el-icon-search topBigimgIcon" @click="viewBigImg(smallImgList[chooseSmallIndex].url)"></i>
            <!-- <div
              class="scaleInfo"
              title="点击查看大图"
              @click="onView(smallImgList[chooseSmallIndex].url)"
            >
              <i class="el-icon-zoom-in"></i>
            </div>-->
          </div>
          <div class="topBigimg" v-else>
            <img :src="proDetailData.goodsMain || proDetailData.brandImage " alt class="bigImgG" v-if="proDetailData.goodsMain || proDetailData.brandImage" />
            <img src="../../img/logo.png" alt class="bigImgG" v-else />
          </div>
          <div class="chooseSmallImg" v-if="smallImgList !== null && smallImgList.length>0">
            <div class="topList">
              <div class="toLeft" @click="choosePreSmallImg">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="smallImgItem" v-for="(item,index) in smallImgList" :key="index" :class="chooseSmallIndex == index ? 'is-click' : ''">
                <img alt :src="item.url" @click="clickSmallImg(index)" />
              </div>
              <div class="toRight" @click="chooseNextSmallImg">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="bottomInfo">
              <p>温馨提醒：图片仅供参考，商品以实物为准</p>
            </div>
          </div>
          <!-- <div class="operateGroup">
            <span>
              <i style="font-size:14px;color: #FF7900;" class="el-icon-star-off"></i>收藏
            </span>
            <span>
              <i style="font-size:14px;color: #FF7900;" class="el-icon-crop"></i>对比
            </span>
          </div>-->
        </div>
        <div class="centerMsgBlock">
          <div class="title">
            <h2>{{proDetailData.name}}</h2>
            <span v-if="proDetailData.brandType === '2'" class="tag">国际品牌</span>
            <span v-if="proDetailData.brandType === '1'" class="tag">国内品牌</span>
          </div>
          <div class="activeContent">
            <!-- <div class="activeItem" >
              <span class="wholeSite">全站</span>
              <span class="activies">活动</span>
              <p>
                全场9.9包邮！下单再送京东E卡！了解详情
                <i class="el-icon-d-arrow-right"></i>
              </p>
            </div>-->
            <div class="attrBox">
              <ul class="attrBoxUl">
                <li class="attrBoxUlLi">
                  <span class="pTitle">品&nbsp;&nbsp;牌：</span>
                  {{proDetailData.brandName}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">供应商代码：</span>
                  {{proDetailData.supplierCode}}
                </li>
                <!-- <li class="attrBoxUlLi">
                  <span class="pTitle">公司料号：</span>
                  {{proDetailData.selfMateriaCode}}
                </li> -->
                <li class="attrBoxUlLi">
                  <span class="pTitle">分&nbsp;&nbsp;类：</span>
                  {{proDetailData.className}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">原厂型号：</span>
                  {{proDetailData.materiaCode}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">年&nbsp;&nbsp;份：</span>
                  {{proDetailData.productYear}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">最小包装量：</span>
                  {{proDetailData.packageDesc}}{{proDetailData.unitName}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">描述：</span>
                  {{proDetailData.spec}}
                </li>
                <li class="attrBoxUlLi">
                  <span class="pTitle">近期更新时间：</span>
                  {{proDetailData.updateTime}}
                </li>
                <li class="attrBoxUlLi remarkOverflow" >
                  <span class="pTitle">备注：</span>
                  {{proDetailData.remarks}}
                </li>
                <!-- updateTime -->
                <!-- <li class="attrBoxUlLi" style="color:#ff7900">最小预定量：{{proDetailData.miniOrderQuantity}}{{proDetailData.unitName}}</li> -->
              </ul>
            </div>
            <div class="containDue">
              <p class="pTitle">含增值税</p>
              <p>
                <span class="goldPrice" style="color:#ff7900">￥{{proDetailData.ledGoodsPrice || proDetailData.goodsPrice}} / {{proDetailData.unitName}}</span>
              </p>
            </div>
            <div class="rightSide">
              <!-- <div class="rightSideTop">
                <p class="pTitle">含增值税</p>
                <p><span>1+ : </span><span class="goldWord">￥{{proDetailData.ledGoodsPrice || proDetailData.goodsPrice}}</span></p>
              </div>-->
              <div class="rightSideBottom">
                <div class="buyNumTip">
                  <span>
                    <span class="pTitle">现货库存：</span>
                    {{proDetailData.stockNum == null || proDetailData.stockNum == undefined || proDetailData.stockNum == "" ? 0 : proDetailData.stockNum}}{{proDetailData.stockNum == null || proDetailData.stockNum == undefined || proDetailData.stockNum == "" ? '' :proDetailData.unitName}}
                  </span>
                  <span>
                    <span class="pTitle">近期销量：</span>
                    {{proDetailData.purchaseNum}}
                  </span>
                  <span style="cursor: pointer;" @click="getQQCustomers">
                    订货更优惠
                    <i class="el-icon-question" style="color:#ff7900"></i>
                  </span>
                </div>
                <div class="buyNum">
                  <span class="pTitleGray pTitle">购买数量：</span>
                  <el-input v-model.number="form.num" size="mini" disabled="disabled" readonly class="inp"></el-input>&nbsp;&nbsp;x
                  <span style="color:#ff7900">￥{{proDetailData.ledGoodsPrice || proDetailData.goodsPrice}}</span> =
                  <span style="color:#ff7900">￥{{totalPrice.toFixed(2)}}&nbsp;&nbsp;(总价)</span>
                  <!-- <p class="totalPriceNum">商品价格合计：<span style="color:red"></span></p> -->
                  <!-- <span>x</span>
                  <span class="singlePrice goldWord">￥5.24</span>
                  <span> = </span>
                  <span class="totalPrice goldWord">￥5.24</span>-->
                </div>
                <div class="buyBox">
                  <span class="pTitleGray" style="color:gray">按整包装：</span>
                  <el-input size="mini" style="width:80px;margin-bottom:5px" @input="imputedPrice" v-model.number="form.box" />
                  &nbsp;{{proDetailData.packageName}}&nbsp;(1 {{proDetailData.packageName}}有&nbsp;{{proDetailData.packageDesc}}{{proDetailData.unitName}})
                </div>
              </div>
              <div class="addToCart">
                <button class="addToCartBtn" @click="onCartDialogSubmit(proDetailData.goodsId,form.num,proDetailData.goodsType)">加入购物车</button>
              </div>
            </div>
            <!-- <div class="addToCart">
              <el-button type="warning" @click="addToCart">加入购物车</el-button>
            </div>-->
          </div>
        </div>
        <div class="rightDataBlock">
          <div class="proLogo">
            <img :src="proDetailData.brandImage" alt v-if="proDetailData.brandImage" />
            <img src="../../img/logo.png" alt v-else />
          </div>
          <div class="dataItem">
            <span class="grayWord">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
            <h3 class="title goto" @click="$router.push('/home/outLandDemo')">{{proDetailData.brandName}}</h3>
          </div>
          <div class="dataItem">
            <span class="grayWord">厂家型号：</span>
            <span class="contents" :title="proDetailData.materiaCode">{{proDetailData.materiaCode}}</span>
          </div>
          <div class="dataItem">
            <span class="grayWord">商家编号：</span>
            <span class="contents" :title="proDetailData.materiaCode">{{proDetailData.materiaCode}}</span>
          </div>
          <div class="dataItem">
            <span class="grayWord">封装规格：</span>
            <span class="contents" :title="proDetailData.spec">{{proDetailData.spec}}</span>
          </div>
          <div class="dataItem">
            <span class="grayWord">数据手册：</span>
            <span class="contents">
              <i @click="showDataBook" style="font-size:14px;color:gray;cursor:pointer" class="el-icon-folder-opened dataBook"></i>
              <!-- 下载文件 -->
            </span>
          </div>
          <!-- 
          <div class="dataItem">
            <span class="grayWord">商品毛重：</span>
            <span class="content">0.000216 KG</span>
          </div>-->
        </div>
      </div>
      <!-- <div class="likeMateil">
        <div class="likeMateilTitle">
          <span class="blockName">近似物料</span>
          <span class="info">选择时候请仔细核对商品参数信息</span>
          <span class="compare">一键对比</span>
        </div>
        <div class="likeMateilContent" ref="likeMateilContent" style="height:240px;overflow:hidden">
          <div class="search_content_item" v-for="(item,index) in 1" :key="index">
            <div class="search_content_item_leftImg" @click.stop="toProInfo">
              <img
                src="https://static.szlcsc.com/list/resources/images/bk_icon.png"
                alt
                class="leftTopTagImg"
              />
              <img src="../../img/proImg.jpg" alt />
              <div class="btngroup">
                <span @click.stop="toShowComparePanel">对比</span>
                <span @click.stop="toEnshrine">收藏</span>
              </div>
            </div>
            <div class="search_content_item_proMsg">
              <div class="search_content_item_proMsg_title">ST(意法半导体)/STM8S003F3P6TR 编带</div>
              <div class="search_content_item_data">
                <div class="search_content_item_data_item">
                  <span>商品编号:</span>c52717
                </div>
                <div class="search_content_item_data_item">
                  <span>品牌:</span>ST(意法半导体)
                </div>
                <div class="search_content_item_data_item">
                  <span>封装规格:</span>TSSOP-20
                </div>
                <div class="search_content_item_data_item">
                  <span>型号:</span>STM8S003F3P6TR
                </div>
                <div class="search_content_item_data_item">
                  <span>描述: STM8 Series 8-bit 8 KB Flash 1 KB RAM 16 MHz Microcontroll</span>c52717
                </div>
              </div>
              <div class="search_content_item_other">
                <span>
                  <i
                    style="color:gray;font-size:12px;padding-right: 3px;color: #09F;"
                    class="el-icon-notebook-1"
                  ></i>数据手册
                </span>
                <span>
                  <i
                    style="color:gray;font-size:12px;padding-right: 3px;color: #09F;"
                    class="el-icon-shopping-cart-full"
                  ></i>近似物料
                </span>
              </div>
              <div class="internationBrand">国际品牌</div>
            </div>
            <div class="search_content_item_due">
              <div class="search_content_item_due_title">含增值税</div>
              <div class="search_content_item_due_item">
                1+:
                <span class="goldWord">￥2.12</span>
              </div>
              <div class="search_content_item_due_item">
                10+:
                <span class="goldWord">￥1.53</span>
              </div>
              <div class="search_content_item_due_item">
                30+:
                <span class="goldWord">￥1.42</span>
              </div>
              <div class="search_content_item_due_item">
                100+:
                <span class="goldWord">￥1.32</span>
              </div>
              <div class="search_content_item_due_item">
                500+:
                <span class="goldWord">￥1.25</span>
              </div>
              <div class="search_content_item_due_item">
                1000+:
                <span class="goldWord">￥1.24</span>
              </div>
              <div class="search_content_item_due_item">
                2000+:
                <span class="goldWord quotePrice">报价</span>
              </div>
            </div>
            <div class="search_content_item_stock">
              <div class="search_content_item_stock_item">
                1圆盘由
                <span class="goldWord">2500</span>片
              </div>
              <div class="search_content_item_stock_item">
                近期预售：
                <span class="goldWord">113圆盘多</span>片
              </div>
              <div class="search_content_item_stock_item">
                库存：
                <span class="goldWord">35598</span>片
              </div>
              <div class="buyBtn">我要买</div>
            </div>
          </div>
          <div class="toColOrUnCol" @click="toChooseCol">
            <span v-if="isCol">收起</span>
            <span v-else>展开</span>
          </div>
        </div>
      </div>-->
      <!-- 商品，pdf -->
      <div class="proIntroduceAndPdf" style="margin-top: 20px;">
        <div class="proIntroduceAndPdfTitle">
          <div class="leftTabs">
            <div class="tabItem proIntroduce">商品介绍</div>
            <!-- <div class="tabItem dataPdf">数据手册Pdf</div> -->
          </div>
          <!-- <div class="rightBlock checkFault">
            <i style="color:#FF7900;font-size:14px;" class="el-icon-warning"></i>
            <span>如果您发现商品信息不准确</span>
            <span class="checkF">欢迎纠错</span>
          </div>-->
        </div>
        <div class="proIntroduceAndPdfContent">
          <div class="bigTitle">商品介绍</div>
          <div class="reCommonDetailHtml" v-html="proDetailData.detail"></div>
          <div class="content" v-if="proDetailData.detail === '' || proDetailData.detail === null || proDetailData.detail === undefined ">
            <!-- <div
              class="proDesc"
            >STM8 Series 8-bit 8 KB Flash 1 KB RAM 16 MHz Microcontroller - TSSOP-20</div>-->
            <div class="findResult">
              <span>
                找到的类似商品:
                <span class="findNum goldWord">{{likeNessNum}}</span> 种
              </span>
              <!-- <span class="viewPros">查看类似商品</span> -->
            </div>
            <div class="ChooseParameter">
              <div class="ChooseParameterItem Citle">
                <div class="attribute">属性</div>
                <div class="parameterValue">参数值</div>
                <div class="isChoose"></div>
              </div>
              <div class="ChooseParameterItem" v-for="(item,index) in 1" :key="index">
                <div class="attribute">商品分类</div>
                <div class="parameterValue">{{proDetailData.className}}</div>
                <div class="isChoose">
                  <input type="checkbox" name="chooseParams" :checked="index == 0" :disabled="index == 0" />
                </div>
              </div>
            </div>
            <div class="checkBtn" @click="toSearchLikeNessProduct(proDetailData.brandId)">
              <div>查看类似商品</div>
            </div>
            <!-- <div class="proParamsDesc">
              <p class="proParamsDescItem">核心处理器：STM8</p>
              <p class="proParamsDescItem">核心尺寸：8-位</p>
              <p class="proParamsDescItem">速度：16MHz</p>
              <p class="proParamsDescItem">连接性：I2C，IrDA，LIN，SPI，UART/USART</p>
              <p class="proParamsDescItem">外设：欠压检测/复位，POR，PWM，WDT</p>
              <p class="proParamsDescItem">I/O 数：16</p>
              <p class="proParamsDescItem">程序存储容量：8KB（8K x 8）</p>
              <p class="proParamsDescItem">程序存储器类型：闪存</p>
              <p class="proParamsDescItem">EEPROM 容量：128 x 8</p>
              <p class="proParamsDescItem">RAM 容量：1K x 8</p>
              <p class="proParamsDescItem">电压 - 电源（Vcc/Vdd）：2.95 V ~ 5.5 V</p>
              <p class="proParamsDescItem">数据转换器：A/D 5x10b</p>
              <p class="proParamsDescItem">振荡器类型：内部</p>
              <p class="proParamsDescItem">工作温度：-40°C ~ 85°C（TA）</p>
              <p class="proParamsDescItem">封装/外壳：20-TSSOP（0.173"，4.40mm 宽）</p>
              <p class="proParamsDescItem">供应商器件封装：20-TSSOP</p>
            </div>-->
          </div>
          <!-- //数据手册PDF -->
          <!-- <div class="bigTitle">数据手册PDF</div>
          <div class="downLoad">
            <a
              href="https://atta.szlcsc.com/upload/public/pdf/source/20170914/C52717_1505374129400969196.pdf%3FExpires%3D4070880000%26OSSAccessKeyId%3DLTAIJDIkh7KmGS1H%26Signature%3DWUvd2romQseGd5BK%252FuFj2jVza5g%253D%26response-content-disposition%3Dattachment%253Bfilename%253DC52717_STM8S003F3P6TR%2525E7%2525BC%252596%2525E5%2525B8%2525A6_2017-09-14.PDF"
            >STM8S003F3P6TR数据手册PDF下载</a>
          </div>
          <div class="showPdf">
            <img :src="imgList[imgIndex]" alt />
            <div class="toPrePage" @click="toPrePage">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="toNextPage" @click="toNextPage">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <!-- 对比栏组件 -->
    <compareBoard ref="compareBoard" />
    <!--点击收藏的时候显示对应内容 -- 需要使用的时候调用 $refs.successTip 的方法-->
    <successTips :tipsCont="tipContent" ref="successTip" />
    <!-- 点击收藏失败 需要使用的时候调用 $refs.failTips 的方法 -->
    <failTips :tipsCont="tipContent" ref="failTips" />

    <el-dialog :visible.sync="dialogVisible" width="600px">
      <img :src="bigUrl" alt="商品大图" class="dialogImg" />
    </el-dialog>
  </div>
</template>
<script>
import compareBoard from "../components/compareBoard/compareBoard";
import successTips from "../components/wedTips/success";
import failTips from "../components/wedTips/fail";
export default {
  data() {
    return {
      tipContent: "", //提示框的消息
      isShowComparePanel: false, //是否是显示对比栏面板
      //对比栏目的数据
      compareList: [
        {
          imgUrl:
            "https://alimg.szlcsc.com/upload/public/product/breviary/20180907/95FB1CD9BE134A4A8C7C1A762C758F18.jpg",
          title: "10uF(106) ±20% 16V 编带",
          model: "CL10A106MO8NQNC",
          containDueList: [
            "1+:￥2.12",
            "10+:￥1.53",
            "30+:￥1.42",
            "100+:￥1.32",
            "500+:￥1.25",
            "1000+:￥1.24"
          ]
        }
      ],
      ifShowShrineToast: false, //一开始隐藏
      ifShowShrineToastF: false,
      isCol: true, //折叠item
      imgList: [
        require("../falseData/img/15.png"),
        require("../falseData/img/16.png"),
        require("../falseData/img/17.png"),
        require("../falseData/img/18.png"),
        require("../falseData/img/19.png")
      ],
      imgIndex: 0,
      //小图数组
      smallImgList: [
        // require("../falseData/img/12.jpg"),
        // require("../falseData/img/13.jpg"),
        // require("../falseData/img/14.jpg")
      ],
      chooseSmallIndex: 0,
      form: {
        num: 1,
        box: 1,
        year: 2
      },
      formBuy: {
        num: 1,
        box: 0
      },
      proDetailData: {},
      cartDialogVisible: false,
      dialogVisible: false,
      cartLayer: false,
      bigUrl: "",
      totalPrice: 0,
      likeNessNum: 0 //类似商品的数量
    };
  },
  components: {
    compareBoard,
    successTips,
    failTips
  },
  mounted() {
    this.getDetailData();
    this.getProNum(); //查看类似商品的数量 ，用brandId作为查询条件
  },
  methods: {
    showDataBook() {
      console.log(1);
      this.tipContent = "数据手册暂无数据，敬请期待~";
      this.$refs.failTips.openFileToast();
    },
    toSearchLikeNessProduct(brandId) {
      if (this.$route.query.type == "normal") {
        this.$router.push({
          path: "/home/outLandDemo",
          query: { type: "normal", brandId: brandId }
        });
      } else {
        this.$router.push({
          path: "/home/outLandDemo",
          query: { brandId: brandId }
        });
      }
    },
    getProNum() {
      let data = {
        pageSize: 10,
        pageNum: 1,
        brandId: this.proDetailData.brandId
      };
      if (this.$route.query.type == "normal") {
        data.goodsType = 0;
      } else {
        data.goodsType = 1;
      }
      this.$http
        .post("/pc/ordinaryGoods/findOrdinaryGoodsPage", data)
        .then(res => {
          this.likeNessNum = res.data.data.count;
        })
        .catch(res => {
          console.log(res);
        });
    },
    toHideAddTocart() {
      this.cartLayer = false;
    },
    // QQ咨询
    getQQCustomers() {
      this.$http.get("/pc/customer/getCustomers").then(res => {
        this.qqServer = res.data.data.customers[0];
        window.location.href = `tencent://message/?uin=${this.qqServer.qqNumer}`;
      });
    },
    // 点击查看大图
    onView(url) {
      window.open(url);
    },
    viewBigImg(url) {
      this.bigUrl = url;
      this.dialogVisible = true;
    },
    // 计算总金额
    imputedPrice() {
      this.form.num = this.form.box * this.proDetailData.packageDesc;
      let num =
        (this.form.num *
          ((this.proDetailData.ledGoodsPrice || this.proDetailData.goodsPrice) *
            100)) /
        100;
      this.totalPrice = num;
    },
    // 查询商品信息
    getDetailData() {
      ///写参数要检查，漏词
      // if(this.$route.query.type == 'normal'){
      this.$http
        .post(
          "/pc/ordinaryGoods/findOrdinaryGoodsDetail/" + this.$route.query.item
        )
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          // console.log(res);
          console.log(res.data.data);
          this.proDetailData = res.data.data;
          this.form.num = this.proDetailData.packageDesc;
          this.totalPrice =
            (this.form.num *
              ((this.proDetailData.ledGoodsPrice ||
                this.proDetailData.goodsPrice) *
                100)) /
            100;
          this.smallImgList = JSON.parse(res.data.data.slideShow);
          console.log(this.smallImgList);
        })
        .catch(res => { });
      // }else{
      //   this.$http
      //   .post("/pc/ledGoods/findLedGoodsDetail/" + this.$route.query.item)
      //   .then(res => {
      //     //判断是否登录了的（没有登录则导航到登录页面）
      //     this.$http.judgeIfLogin(res, this);
      //     // console.log(res);
      //     this.proDetailData = res.data.data;
      //     this.form.num = this.proDetailData.packageDesc;
      //     this.totalPrice = (this.form.num * ((this.proDetailData.ledGoodsPrice || this.proDetailData.goodsPrice)*100))/100;
      //     this.smallImgList = JSON.parse(res.data.data.slideShow);
      //   })
      //   .catch(res => {});
      // }
    },
    // 获取商品详情
    getDetailDataLed() { },
    addToCart() {
      this.cartLayer = true;
      this.cartDialogVisible = true;
    },

    // 弹窗加入购物车按钮
    onCartDialogSubmit(id, num, goodsType) {
      let numReg = /^[1-9]\d*$/;
      if (!numReg.test(this.form.num)) {
        this.$message.error("数量应为正整数");
      } else if (this.form.num < this.proDetailData.packageDesc) {
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
              this.cartDialogVisible = false;
              this.cartLayer = false;
              // this.form = { num: 0, box: 0 };
              this.requestCartNum();
            } else {
              this.$message(res.data.data.msg);
              this.cartDialogVisible = false;
              this.cartLayer = false;
            }
          })
          .catch(res => { });
      }
    },

    // // 按整包装
    onBoxChange(e) {
      //console.log(Number(e));
      if (e < 0) {
        this.$message("数量不能为负数");
      }
    },

    clickSmallImg(index) {
      this.chooseSmallIndex = index;
    },
    choosePreSmallImg() {
      if (
        this.chooseSmallIndex > 0 &&
        this.chooseSmallIndex <= this.smallImgList.length - 1
      ) {
        this.chooseSmallIndex--;
      }
    },
    chooseNextSmallImg() {
      if (
        this.chooseSmallIndex >= 0 &&
        this.chooseSmallIndex < this.smallImgList.length - 1
      ) {
        this.chooseSmallIndex++;
      }
    },

    // 上一张
    toPrePage() {
      if (this.imgIndex <= 0) {
        this.imgIndex = this.imgList.length - 1;
      } else {
        this.imgIndex--;
      }
    },

    // 下一张
    toNextPage() {
      if (this.imgIndex >= this.imgList.length - 1) {
        this.imgIndex = 0;
      } else {
        this.imgIndex++;
      }
    },

    toChooseCol() {
      //console.log(1);
      //console.log(this.$refs.likeMateilContent.style.height);
      //console.log(this.$refs.likeMateilContent.style);
      //console.log(this.$refs.likeMateilContent);
      if (this.$refs.likeMateilContent.style.height == "240px") {
        //console.log("进入");
        this.$refs.likeMateilContent.style.height = "auto";
        this.isCol = !this.isCol;
      } else {
        //console.log("进入2");
        this.$refs.likeMateilContent.style.height = "240px";
        this.isCol = !this.isCol;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//动态类
.border {
  border: 1px solid #0094e7;
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
    }
    .proDetailData {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      background: white;
      .leftImgBlock {
        //300 300
        display: flex;
        flex-direction: column;
        .topBigimg {
          width: 300px;
          height: 300px;
          position: relative;
          .topBigimgIcon {
            position: absolute;
            right: 3px;
            bottom: 3px;
            font-size: 20px;
          }
          .bigImgG {
            width: 100%;
            height: 100%;
          }
          .hotRecommTag {
            position: absolute;
            top: 0;
            left: 0;
          }
          .scaleInfo {
            width: 34px;
            height: 34px;
            background: white;
            position: absolute;
            right: 0;
            bottom: 0;
            color: gray;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
            font-size: 25px;
          }
        }
        .chooseSmallImg {
          width: 100%;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .topList {
            margin-top: 10px;
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .toLeft,
            .toRight {
              font-size: 24px;
              font-weight: bold;
              color: lightgray;
              cursor: pointer;
            }
            .toLeft:hover,
            .toRight:hover {
              color: #0094e7;
            }
            .smallImgItem {
              width: 47px;
              height: 47px;
              border: 1px solid transparent;
              box-sizing: border-box;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .is-click {
              border: 1px solid #09f;
            }
          }
          .bottomInfo {
            color: gray;
          }
        }
        .operateGroup {
          margin-top: 10px;
          span {
            margin-right: 10px;
          }
          i {
            margin-right: 5px;
          }
        }
      }
      .centerMsgBlock {
        width: 585px;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        .title {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          h2 {
            margin-right: 20px;
          }
          .tag {
            padding: 5px 10px;
            border: 1px solid #0094e7;
            color: #0094e7;
            box-sizing: border-box;
          }
        }
        .activeContent {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: rgb(30, 30, 30);
          .pTitle {
            color: gray;
          }
          .attrBox {
            width: 100%;
            // height: 80px;
            .attrBoxUl {
              width: 100%;
              // height: 100%;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              .pTitle {
                color: gray;
              }
              .attrBoxUlLi {
                width: 50%;
                height: 25px;
                line-height: 25px;
              }
              .remarkOverflow{
                //备注溢出隐藏
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // word-break: break-all;
              }
            }
          }
          .activeItem {
            display: flex;
            align-items: center;
            height: 30px;
            .wholeSite,
            .activies {
              padding: 3px 6px;
              height: 20px;
              box-sizing: border-box;
              font-size: 12px;
              text-align: center;
              border-radius: 5px;
              cursor: pointer;
            }
            .wholeSite {
              background: orangered;
              color: white;
              margin-right: 2px;
            }
            //background: orangered;
            .activies {
              border: 1px solid orangered;
              color: orangered;
            }
            p {
              margin-left: 5px;
              cursor: pointer;
            }
            p:hover {
              color: #0094e7;
            }
          }
          .containDue {
            background: #f8f8f8;
            padding: 20px;
            padding-right: 50%;
            box-sizing: border-box;
            line-height: 20px;
            text-align: right;
            margin: 10px 0;
            .pTitle {
              margin-right: 20px;
              margin-bottom: 10px;
            }
            p {
              .goldPrice {
                color: orangered;
              }
              .quotePrice {
                color: #0094e7;
                cursor: pointer;
              }
            }
          }
          .rightSide {
            height: 40px;
            // display:flex;
            // flex:5;
            // flex-direction: column;
            // justify-content: center;
            // align-items: center;
            // padding:0 20px;
            // border-left:1px solid lightgray;
            // box-sizing: border-box;
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
              padding-top: 10px;
              box-sizing: border-box;
              font-size: 14px;
              .buyNumTip {
                margin-bottom: 10px;
                span {
                  margin-right: 20px;
                }
              }
              .inp {
                width: 80px;
                height: 20px;
                margin-bottom: 10px;
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
            .totalPriceNum {
              margin-top: 10px;
              font-size: 13px;
            }
            .addToCart {
              margin-top: 20px;
              width: 100%;
              height: 40px;
              display: flex;
              justify-content: flex-start;
              .addToCartBtn {
                width: 120px;
                height: 40px;
                background: #ff7900;
                color: white;
                font-size: 14px;
                border-radius: 3px;
                text-align: center;
                line-height: 40px;
                font-size: 15px;
                border: none;
                cursor: pointer;
              }
            }
          }
          .showProNum {
            display: flex;
            flex-direction: column;
            line-height: 35px;
            border-bottom: 1px solid rgb(240, 240, 240);
            .showOne {
              display: flex;
              .showitem {
                margin-right: 10px;
                .grayWord {
                  color: gray;
                }
              }
            }
            .showTwo {
              .grayWord {
                color: gray;
              }
              input {
                width: 80px;
                height: 20px;
                margin-right: 5px;
                border: 1px solid lightgray;
              }
              .singlePrice {
                color: orangered;
                font-size: 16px;
              }
              .totalPrice {
                color: orangered;
                font-size: 16px;
                .info {
                  color: orange;
                  font-size: 14px;
                }
              }
            }
            .showThree {
              margin-bottom: 10px;
              .grayWord {
                color: gray;
              }
              input {
                width: 80px;
                height: 20px;
                border: 1px solid lightgray;
                margin-right: 5px;
              }
            }
          }
          .addToCart {
            margin-top: 20px;
          }
        }
      }
      .rightDataBlock {
        display: flex;
        height: 260px;
        flex-direction: column;
        padding: 15px;
        box-sizing: border-box;
        border: 1px dashed #e8e8e8;
        font-size: 14px;
        width: 227px;
        .proLogo {
          width: 195px;
          height: 70px;
          margin-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
            border: 1px solid #e8e8e8;
            border-radius: 1px;
          }
        }
        .dataItem {
          display: flex;
          line-height: 25px;
          .contents {
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 114px;
          }
          .dataBook:hover {
            color: #0094e7 !important;
          }
          .grayWord {
            color: gray;
            width: 80px;
          }
          .goto {
            cursor: pointer;
            &:hover {
              color: #09f;
            }
          }
        }
      }
    }
    .likeMateil {
      width: 1200px;
      min-height: 100px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      ///
      box-sizing: border-box;
      position: relative;
      .likeMateilTitle {
        width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .blockName {
          font-size: 16px;
        }
        .compare {
          color: #0094e7;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .likeMateilContent {
        height: 240px;
        overflow: hidden;
        margin-top: 20px;
        .search_content_item {
          width: 100%;
          min-height: 100px;
          padding: 10px;
          border-bottom: 1px solid lightgray;
          display: flex;
          justify-content: space-between;
          line-height: 25px;
          margin-top: 10px;
          margin-bottom: 10px;
          box-sizing: border-box;
          // box-shadow: 5px 5px 5px transparent;
          .search_content_item_leftImg {
            width: 96px;
            height: 96px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .leftTopTagImg {
              width: 45px;
              height: 39px;
              position: absolute;
            }
            .btngroup {
              display: flex;
              justify-content: space-between;
              span {
                flex: 1;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border: 1px solid lightgray;
                color: gray;
                cursor: pointer;
              }
              span:hover {
                z-index: 200;
                color: orange;
                border: 1px solid orange;
              }
              span:nth-last-of-type(1) {
                // border-left:none;
                margin-left: -1px;
              }
            }
          }
          .search_content_item_proMsg {
            width: 350px;
            flex-wrap: wrap;
            margin-right: 200px;
            .search_content_item_proMsg_title {
              font-size: 14px;
              color: #0094e7;
            }
            .search_content_item_data {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              .search_content_item_data_item {
                width: 150px;
              }
              .search_content_item_data_item:nth-last-of-type(1) {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .search_content_item_other {
              color: #0094e7;
              span {
                margin-right: 15px;
              }
            }
            .internationBrand {
              width: 80px;
              padding: 5px;
              border: 1px solid #0094e7;
              color: #0094e7;
              text-align: center;
              box-sizing: border-box;
              margin-top: 10px;
            }
            .internationBrand:hover {
              color: white;
              background: #0094e7;
            }
          }
          .search_content_item_due {
            .search_content_item_due_item {
              .goldWord {
                color: orangered;
              }
              .quotePrice {
                color: #0094e7;
              }
            }
          }
          .search_content_item_stock {
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .search_content_item_stock_item {
              .goldWord {
                color: orangered;
              }
            }
            .buyBtn {
              width: 100px;
              height: 40px;
              background: orangered;
              color: white;
              text-align: center;
              font-size: 14px;
              line-height: 40px;
              border-radius: 2px;
              margin-top: 30px;
              cursor: pointer;
            }
          }
        }
        .search_content_item:hover {
          border-bottom: 1px solid transparent;
          box-shadow: 0 0 3px lightgray;
        }
        .toColOrUnCol {
          position: absolute;
          right: 20px;
          bottom: 0;
          cursor: pointer;
          float: right;
          width: 40px;
          height: 20px;
          background: lightgray;
          color: white;
          line-height: 20px;
          text-align: center;
        }
      }
    }
    .proIntroduceAndPdf {
      width: 1200px;
      margin: 0 auto;
      background: white;
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
        .rightBlock {
          i {
            margin-right: 5px;
          }
          margin-right: 20px;
          font-size: 14px;
          .checkF {
            color: #0094e7;
            text-decoration: underline;
            margin-left: 5px;
          }
        }
      }
      .proIntroduceAndPdfContent {
        padding-bottom: 20px;
        box-sizing: border-box;
        .bigTitle {
          width: 100%;
          height: 40px;
          margin: 30px 0 20px 0;
          text-align: center;
          line-height: 40px;
          color: white;
          background: url("../../img/dataBookBg.jpg");
          font-size: 14px;
          background-size: 100% 100%;
        }
        .content {
          padding: 0 20px;
          box-sizing: border-box;
          .proDesc {
            height: 40px;
            line-height: 40px;
          }
          .findResult {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            background: #fdf2e9;
            padding: 0 20px;
            box-sizing: border-box;
            .viewPros {
              margin-left: 10px;
              font-weight: bold;
              color: #0094e7;
            }
            span {
              width: 100px;
              .goldWord {
                color: orangered;
                font-weight: bold;
              }
            }
          }
          .ChooseParameter {
            margin-top: 20px;
            // padding:0 20px;
            border: 1px solid lightgray;
            box-sizing: border-box;
            width: 100%;
            .Citle {
              font-size: 14px;
              font-weight: bold;
              background: rgb(245, 245, 245);
            }
            .ChooseParameterItem {
              ///6 6 1
              width: 100%;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: 30px;
              border-bottom: 1px solid lightgray;
              box-sizing: border-box;
              .attribute {
                height: 100%;
                flex: 6;
                text-align: center;
                border-right: 1px solid lightgray;
              }
              .parameterValue {
                height: 100%;
                flex: 6;
                text-align: center;
                border-right: 1px solid lightgray;
              }
              .isChoose {
                flex: 1;
                text-align: center;
              }
            }
          }
          .checkBtn {
            width: 100%;
            height: 30px;
            margin: 20px 0;
            font-size: 14px;
            // text-align: right;
            display: flex;
            justify-content: flex-end;
            // border:1px solid red;
            div {
              cursor: pointer;
              width: 105px;
              height: 32px;
              background: #0094e7;
              color: white;
              line-height: 32px;
              text-align: center;
              border-radius: 5px;
            }
          }
          .proParamsDesc {
            display: flex;
            flex-direction: column;
            line-height: 20px;
          }
        }
        .downLoad {
          width: 100%;
          text-align: center;
          a {
            color: #0094e7;
            text-decoration: underline;
            font-size: 14px;
          }
        }
        .showPdf {
          margin: 10px auto;
          width: 800px;
          height: 1035px;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          background: #f5f5f5;
          img {
            width: 100%;
            height: 100%;
            border: 1px solid pink;
          }
          .toPrePage,
          .toNextPage {
            width: 30px;
            height: 45px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            position: absolute;
            font-size: 24px;
            line-height: 45px;
            text-align: center;
            cursor: pointer;
          }
          .toPrePage {
            top: 50%;
            left: 0;
          }
          .toNextPage {
            top: 50%;
            right: 0;
          }
        }
      }
    }
  }
  ///////弹出窗的样式
}
.reCommonDetailHtml {
  padding: 20px;
}
.reCommonDetailHtml /deep/ p,
.reCommonDetailHtml /deep/ span {
  line-height: 35px;
  font-size: 15px;
}
.reCommonDetailHtml /deep/ img {
  width: 50%;
  margin: 20px auto;
  display: block;
}
.reCommonDetailHtml /deep/ h1,
.reCommonDetailHtml /deep/ h2,
.reCommonDetailHtml /deep/ h3,
.reCommonDetailHtml /deep/ h4,
.reCommonDetailHtml /deep/ h5,
.reCommonDetailHtml /deep/ h6 {
  line-height: 35px;
}
/deep/.el-dialog__body {
  padding: 20px !important;
}
/deep/.el-dialog__header {
  padding: 0 !important;
}
.dialogImg {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  max-height: 600px;
}
</style>
