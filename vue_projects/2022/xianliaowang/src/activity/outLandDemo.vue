<template>
  <div class="outLandDemo">
    <!-- Breadcrumb 面包屑 -->
    <!-- <div class="o-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品目录</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumbText}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="outLandDemoContent">
      <div class="leftColList">
        <div class="leftColListItem" v-for="(val, key) in leftTreeList" :key="key">
          <div class="leftColListTitle">
            <span class="titleItem" @click="judgeHasChild(val,key)">{{val.title}}</span>
            <span v-if="val.children">
              <span class="colBtn" @click="onCurrentClick(val, key)">
                <i :class="val.hasShow ? 'el-icon-minus' : 'el-icon-plus'"></i>
              </span>
            </span>
          </div>
          <div class="leftColListContent" ref="leftNav">
            <div class="contentItem" v-for="(v, k) in val.children" :key="k" @click="onChildrenClick(v)">{{v.title}}</div>
          </div>
        </div>
      </div>
      <div class="rightProductData">
        <!-- 按照多条件搜索: start -->
        <div class="chooseConditioAndSearch" style="display:flex;">
          <div class="btn">
            <el-button :icon="!isToggle ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" size="mini" @click="isToggle = !isToggle" style="position:absolute !important;
              top:5px !important ;
              left:5px !important;color:red !important"></el-button>
          </div>
          <div class="main-flex">
            <div class="top-box">
              <div class="box">
                <div class="label">品牌</div>
                <div class="tree">
                  <!-- <div class="input">
                    <input type="text" placeholder="请输入内容" />
                    <i class="el-icon-search"></i>
                  </div>-->
                  <div class="top-list" :class="isToggle ? 'is-toggle' : ''" style="min-width:100px;">
                    <p v-for="(v,k) in searchTreeArr" :key="k" :class="screenList.indexOf(v.name)!== -1 ? 'is-click' : ''" @click="onTreeClick(v, k)">{{v.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-flex">
            <div class="top-box top-box22">
              <div class="box">
                <div class="label">分类</div>
                <div class="tree">
                  <!-- <div class="input">
                    <input type="text" placeholder="请输入内容" />
                    <i class="el-icon-search"></i>
                  </div>-->
                  <div class="top-list" :class="isToggle ? 'is-toggle' : ''" style="min-width:100px;">
                    <p v-for="(v,k) in searchTreeArr1" :key="k" :class="screenList1.indexOf(v.name)!== -1 ? 'is-click' : ''" @click="onTreeClick1(v, k)">{{v.name}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-box">
              <div class="left">
                <!-- 显示的品牌搜索词语 -->
                <div class="search-list" style="min-width:50px;">
                  <div v-for="(v,k) in screenList" :key="k" class="s-flex">
                    <div class="s-item">{{v}}</div>
                    <i class="close el-icon-error" @click="delCurrentData(k, v.treeIndex, v.treeChildrenIndex)"></i>
                  </div>
                </div>
                <!-- 显示的分类筛选词语 -->
                <div class="search-list" style="min-width:50px">
                  <div v-for="(v,k) in screenList1" :key="k" class="s-flex">
                    <div class="s-item">{{v}}</div>
                    <i class="close el-icon-error" @click="delCurrentData1(k, v.treeIndex, v.treeChildrenIndex)"></i>
                  </div>
                </div>
                <el-button type="primary" size="small" plain @click="onReset" style="margin-left:10px;">清除筛选</el-button>
                <!-- <el-button type="warning" size="small" @click="searchByBrandId">应用筛选</el-button> -->
                <div class="result" v-if="brandId!== '' || parentClassId !== ''">
                  <!-- v-if="sureSeachByBrand" -->
                  筛选结果：
                  <span>{{listTotalNum}}</span>
                </div>
              </div>
              <!-- <div class="error">
                使用过程中，如果您发现不对或不合理，
                <span class="color">欢迎纠错</span>
              </div>-->
            </div>
          </div>
        </div>
        <!-- 按照多条件搜索: end -->

        <div class="msg">
          <p>
            闲料网所售商品，均为原厂或代理商正规渠道进货，
            <span class="color1">保证原装正品！</span>
          </p>
          <p>
            所有已上架商品，如有现货，
            <span class="color2">最快4小时即能发货。</span>
          </p>
          <p>
            如商城商品库存不足，
            <span class="color2">您可以批量订货。</span>
          </p>
        </div>

        <!-- 列表中的搜索 -->
        <div class="mall_home_hotRecommon">
          <div class="mall_home_search_wrap">
            <div class="mall_home_search_content">
              <div class="search_bar">
                <div class="search_bar_top">
                  <div class="search_choose">
                    <div class="zonghe" style="width:125px;" @click="search">综合</div>
                    <div class="kucun">
                      库存
                      <span>
                        <i class="fa fa-caret-up" @click.stop="seachByInventory(1)"></i>
                        <i class="fa fa-caret-down" @click.stop="seachByInventory(0)"></i>
                      </span>
                    </div>
                    <div class="jiage">
                      价格
                      <span>
                        <i class="fa fa-caret-up" @click.stop="searchByPrice(1)"></i>
                        <i class="fa fa-caret-down" @click.stop="searchByPrice(0)"></i>
                      </span>
                    </div>
                    <div class="xiaoliang">
                      销量
                      <span>
                        <i class="fa fa-caret-up" @click.stop="searchBySaleCount(1)"></i>
                        <i class="fa fa-caret-down" @click.stop="searchBySaleCount(0)"></i>
                      </span>
                    </div>
                  </div>
                  <div class="search_btn">
                    <div class="search_page">
                      <span style="color:#00945e">{{Math.ceil(listTotalNum/pageSize) > 0 ? pageNum : 0}}</span>
                      /{{Math.ceil(listTotalNum/pageSize)}}
                    </div>
                    <div class="left_btn" @click="toPrePage">
                      <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="right_btn" @click="toNextPage">
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </div>
                <div class="search_bar_bottom">
                  <div class="search_bar_bottom_left">
                    <input type="text" placeholder="请输入关键字" v-model="searchKeyWords" @blur="checkKeyWords" />
                    <span>价格筛选（小批量）：</span>
                    <input type="number" v-model="minPrice" @blur="checkMinPrice" />-
                    <input type="number" v-model="maxPrice" @blur="checkMaxPrice" />
                    <input type="button" value="在结果中搜索" class="serchBtn" @click="searchByOtherCondition" />
                    <input type="button" value="重置" class="serchBtn" @click="reset" />
                  </div>
                  <div class="search_bar_bottom_right">
                    <span>符合条件商品:{{listTotalNum}}</span>
                  </div>
                </div>
              </div>
              <div class="search_content">
                <div class="search_content_item" v-for="(v,k) in collectionList" :key="k">
                  <div class="search_content_item_leftImg" @click.stop="toProInfo(v)">
                    <img src="../falseData/img/bk_icon.png" alt class="leftTopTagImg" v-if="v.isRecommend == 1" />
                    <img :src="v.goodsMain || v.brandImage || defaultImg" alt :title="v.name" v-if="v.goodsMain || v.brandImage || defaultImg" @mouseover="showBigImg(k)" @mouseout="hideBigImg" />
                    <!-- <img :src="defaultImg" alt v-else @mouseover="showBigImg"/> -->
                    <!-- 鼠标移动到图片上的时候，显示大图 -->
                    <div class="bigImg" v-if="ifShowBigImg && currentBigImg == k ">
                      <img :src="v.goodsMain || v.brandImage || defaultImg" @mouseenter="showBigImg(k)" @mouseout="hideBigImg" />
                    </div>
                    <div class="btngroup">
                      <button @click.stop="toShowComparePanel(v)">对比</button>
                      <button @click.stop="toEnshrine(v)">{{v.isCollect ? '已收藏' : '收藏'}}</button>
                    </div>
                  </div>

                  <!-- 中间内容主盒子 -->
                  <div class="search_content_item_proMsg">
                    <div class="search_content_item_proMsg_title" @click.stop="toProInfo(v)" :title="v.goodTitle">{{v.materiaCode}}</div>
                    <div>
                      <span style="color: #999999;">描述:</span>
                      <span style="word-break: break-all;">{{v.spec}}</span>
                    </div>
                    <div class="loadBottomContent">
                      <div class="loadLeft">
                        <div class="search_content_item_data">
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">品牌:</span>
                            <span class="itemContent brandItem" @click="getListByBrandName(v.brandName)">{{v.brandName}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">所属分类:</span>
                            <span class="itemContent">{{v.className}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">商品名称:</span>
                            <span class="itemContent">{{v.name}}</span>
                          </div>
                        </div>
                        <div class="search_content_item_other">
                          <span @click="showDataBook" style="cursor:pointer">
                            <i style="font-size:12px;padding-right: 3px;" class="el-icon-notebook-1"></i>数据手册
                          </span>
                        </div>
                      </div>
                      <div class="loadCenter">
                        <div class="search_content_item_data">
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">含增值税:</span>
                            <span class="itemContent">￥{{v.goodsPrice || v.ledGoodsPrice}} / {{v.unitName}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">最小包装量:</span>
                            <!-- v.projectDesc ?? -->
                            <span class="itemContent">{{v.packageDesc}}{{v.unitName}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">年份:</span>
                            <span class="itemContent">{{v.productYear}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">现有库存:</span>
                            <span class="itemContent">{{v.stockNum}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="loadRight">
                        <div class="search_content_item_data">
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">供应商代码:</span>
                            <span class="itemContent">{{v.supplierCode || '-'}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">近期更新时间:</span>
                            <span class="itemContent">{{v.updateTime || '-'}}</span>
                          </div>
                          <div class="search_content_item_data_item">
                            <span class="itemTitle">备注:</span>
                            <span class="itemContent">{{v.remarks || '-'}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 操作 -->
                  <div class="search_content_item_stock">
                    <div class="buyBtn">
                      <el-button type="info" size="small" @click="getQQCustomers">无库存订货</el-button>
                      <el-button type="warning" size="small" @click="onPurchase(v)">我要购买</el-button>
                      <el-button type="primary" @click="onPhoneView(v)" size="small">手机预览</el-button>
                    </div>
                  </div>
                </div>
                <div class="showNoMore" v-if="showNoMore && collectionList.length == 0">没有找到匹配的商品~</div>
                <div class="dividePageBar">
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="listTotalNum"></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <!-- 手机预览弹窗 -->
          <el-dialog title="商品预览" :visible.sync="dialogVisible" width="600px" top="20px">
            <div class="o-dialog">
              <img src="../../img/iphone2.png" alt />
              <div class="o-iframe">
                <div class="qzd">
                  <div class="nav-title">商品详情</div>
                  <div class="content">
                    <div class="swipers">
                      <img :src="goodsInfo.goodsMain || goodsInfo.brandImage" v-if="goodsInfo.goodsMain || goodsInfo.brandImage">
                      <img src="../../img/logo.png" alt v-else />
                    </div>
                    <!-- <div class="g-msg">
                      <div class="g-item" v-for="(v,k) in msgList" :key="k">
                        <div class="g-btn">
                          <span>{{v.title}}</span>
                        </div>
                        <div class="g-txt">
                          <div>{{v.msg}}</div>
                        </div>
                      </div>
                    </div>-->
                    <div class="g-goods-details">
                      <div class="d-title">{{goodsInfo.name}}</div>
                      <div class="g-info">
                        <span class="g-label">品牌：</span>
                        <span class="g-name">{{goodsInfo.brandName}}</span>
                      </div>
                      <div class="g-info">
                        <span class="g-label">型号：</span>
                        <span class="g-name">{{goodsInfo.materiaCode}}</span>
                      </div>
                      <div class="g-info">
                        <span class="g-label">编号：</span>
                        <span class="g-name">{{goodsInfo.materiaCode}}</span>
                      </div>
                      <div class="g-info">
                        <span class="g-label">规格：</span>
                        <span class="g-name">{{goodsInfo.spec}}</span>
                      </div>
                      <div class="g-info">
                        <span class="g-label">库存：</span>
                        <span class="g-name">{{goodsInfo.stockNum}}{{goodsInfo.unitName}}</span>
                      </div>
                      <!-- <div class="g-info">
                        <span class="g-label">数据手册：</span>
                        <span class="g-name g-name-color">查看文件</span>
                      </div>-->
                    </div>
                    <div class="g-price">
                      <div class="price-title">销售单价</div>
                      <div class="price-money">￥{{goodsInfo.goodsPrice}} / {{goodsInfo.unitName}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
          <failTips :tipsCont="tipContent" ref="failTip" />
          <!--点击收藏的时候显示对应内容-->
          <!-- 收藏成功组件 -->
          <successTips :tipsCont="tipContent" ref="successTip" />
          <!-- 待替换的购物车 -->
          <!-- 组件 -->
          <cart @fresh="requestCartNum" ref="cart" />
          <!-- 对比栏组件 -->
          <compareBoard ref="compareBoard" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  setFalseCollectionList,
  setFalseColleLeftNavList,
  searchTreeData
} from "@/falseData/json";
//对比栏组件
import failTips from '../components/wedTips/fail'
import successTips from '../components/wedTips/success'
import compareBoard from '../components/compareBoard/compareBoard'
import cart from '../components/cart/cart.vue'
export default {
  data() {
    return {
      tipContent: '',//提示组件的文本内容
      isToggle: false,
      searchTreeArr: [],
      searchTreeArr1: [], //分类的一级列表
      screenList: [], // 品牌表的筛选数据
      screenList1: [], //分类表的
      screenIndex: 0,
      cartDialogVisible: false,
      dialogVisible: false,
      isShowComparePanel: false, //是否是显示对比栏面板
      selDataArr: [],
      selCompareArr: [], //对比栏目的数据
      ids: [], //存储对比栏的id
      defaultImg: require("../../img/logo.png"), //备用的默认图片
      ifShowShrineToast: false, //一开始隐藏
      ifShowShrineToastF: false,
      BrandList: [],
      isToShow: false,
      cartLayer: false, //是否显示购物车
      /**
       * 收藏假数据模拟(2019.07.17)
       */
      collectionList: [],
      collectionArr: [],
      navList: [],
      breadcrumbText: "海外现货样品",
      cartList: [],
      form: {
        num: 1,
        box: 1
      },
      cartDialogData: {},
      stock: null,
      msgList: [
        {
          title: "活动",
          msg:
            "全场9.9包邮！下单再送京东E卡！全场9.9包邮！下单再送京东E卡！了解详情>>>"
        },
        {
          title: "送券",
          msg: "参与问卷调查，获赠15元无门槛优惠券，点击立即参与>>>"
        }
      ],
      goodsInfo: {},
      pageSize: 10,
      pageNum: 1,
      listTotalNum: 0, //查询出来的总数
      searchKeyWords: "",
      minPrice: "",
      maxPrice: "",
      leftTreeList: [],
      searchByBrand: [],
      brandId: "", //选择的品牌的id
      parentClassId: "", //选择的分类id
      sureSeachByBrand: false, //确认应用筛选才显示筛选结果
      searchByBrandCount: 0, //筛选的结果
      showNoMore: false, //是否显示没有数据的字样
      totalPrice: 0, // 计算后的总价
      ifShowBigImg: false,//是否显示大图
      currentBigImg: '',
      timer: null
    };
  },
  components: {
    // 封装的购物车
    cart, compareBoard, successTips, failTips
  },
  created() {
    // this.getFalseCollectionList();
    // this.getFalseColleLeftNavList();
    this.getSearchTreeData();
    this.getCatogoryTreeData();
  },
  mounted() {
    if (this.$route.query.brandId !== undefined) {
      this.brandId = this.$route.query.brandId
    }
    console.log("????我在哪儿");
    this.setExpandFirst();
    let data = {
      pageNum: this.pageNum,
      pageSize: this.pageSize
    };
    console.log(this.$route.query.keyWords); //.split('_')[0]
    if (this.$route.query.keyWords || this.$route.query.brandId) {
      this.homeSearch();
    }
    if (this.$route.query.type == "normal") {
      //一般情况
      //当是由品牌跳转过来的时候
      if (this.$route.query.brandId !== undefined) {
        data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          brandId: this.$route.query.brandId,
          goodsType: 0
        };
        this.getListNomal(data);
      } else if (this.$route.query.classId !== undefined) {
        data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          classId: this.$route.query.classId,
          goodsType: 0
        };
        this.getListNomal(data);
      } else if (this.$route.query.keyWords !== undefined) {
        data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyWords: this.$route.query.keyWords,
          goodsType: 0
        };
        this.getListNomal(data)
      } else {
        this.getListNomal(data);
      }
    } else {
      this.getList(data);
    }
    this.searchLeftTreeList();
    //  //console.log(this.form.num);
  },
  computed: {
    totalNum() {
      //console.log(this.cartDialogData.unitCount);
      return this.form.num * this.cartDialogData.unitCount;
    }
  },
  methods: {
    // QQ咨询
    getQQCustomers() {
      this.$http.get("/pc/customer/getCustomers").then(res => {
        window.location.href = `tencent://message/?uin=${res.data.data.customers[0].qqNumer}`
      });
    },
    showDataBook() {
      this.tipContent = '数据手册暂无数据,敬请期待~'
      this.$refs.failTip.openFileToast()
    },
    reset() {
      this.searchKeyWords = ''
      this.minPrice = ''
      this.maxPrice = ''
      let data = { pageNum: 1, pageSize: this.pageSize }
      if (this.$route.query.type == 'normal') {
        this.getListNomal(data)
      } else {
        this.getList(data)
      }
    },
    toShowComparePanel(data) {
      this.$refs.compareBoard.openAndAdd(data)
    },
    showBigImg(index) {
      clearTimeout(this.timer)
      this.ifShowBigImg = true
      this.currentBigImg = index
      console.log(index)
      console.log("目前的index：" + this.currentBigImg)
    },
    hideBigImg() {
      this.timer = setTimeout(() => {
        //延迟消失
        this.ifShowBigImg = false
      }, 200)
    },
    getListByBrandName(brandName) {
      //点击商品列表的品牌
      if (this.$route.query.type == "normal") {
        let data = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          keyWords: brandName
        };
        this.getListNomal(data, true);
      } else {
        let data = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          keyWords: brandName
        };
        this.getList(data, true);
      }
    },
    //改变分页数目
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      let data = { pageNum: this.pageNum, pageSize: this.pageSize };
      if (this.brandId !== '' || this.parentClassId !== '') {
        console.log("是否进入这里")
        data.brandId = this.brandId
        data.parentClassId = this.parentClassId
      }
      if (this.$route.query.type == "normal") {
        this.getListNomal(data);
      } else {
        this.getList(data);
      }
    },
    //前往第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      let data = { pageNum: this.pageNum, pageSize: this.pageSize };
      if (this.brandId !== '' || this.parentClassId !== '') {
        console.log("是否进入这里")
        data.brandId = this.brandId
        data.parentClassId = this.parentClassId
      }
      if (this.$route.query.type == "normal") {
        this.getListNomal(data);
      } else {
        this.getList();
      }
    },
    // 首页顶部搜索栏跳转搜索及本页面中继续点击首页搜索栏搜索
    homeSearch() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // keyWords: this.$route.query.keyWords,
        keyWords: this.$route.query.keyWords, //.split('_')[0]
        brandId: this.$route.query.brandId,
        classId: this.$route.query.classId
      };
      //标记
      if (this.$route.query.type == "normal") {
        // debugger
        this.getListNomal(data, true);
      } else {
        this.getList(data, true);
      }
    },

    searchLeftTreeList() {
      this.$http
        .get("/pc/goodsClass/findGoodsClassTree")
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          //console.log(res.data.data.rows.children);
          this.leftTreeList = res.data.data.rows.children;
        })
        .catch(res => { });
    },
    search() {
      //点击综合的时候。查一下列表，
      if (this.$route.query.type === "normal") {
        let data = { pageSize: this.pageSize, pageNum: 1 };
        this.getListNomal(data);
      } else {
        let data = { pageSize: this.pageSize, pageNum: 1 };
        this.getList(data);
      }
    },
    seachByInventory(num) {
      //按照库存
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        inventoryOrder: num
      };
      if (this.$route.query.type == "normal") {
        this.getListNomal(data, true);
      } else {
        this.getList(data, true);
      }
    },
    searchByPrice(num) {
      //按照价格
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        priceOrder: num
      };
      if (this.$route.query.type == "normal") {
        this.getListNomal(data, true);
      } else {
        this.getList(data, true);
      }
    },
    searchBySaleCount(num) {
      //按照销量
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        saleOrder: num
      };
      if (this.$route.query.type == "normal") {
        this.getListNomal(data, true);
      } else {
        this.getList(data, true);
      }
    },
    searchByOtherCondition() {
      // if(this.searchKeyWords == '' && this.minPrice == '' && this.maxPrice == ''){
      //   this.$message.error('请输入查询条件')
      // }else
      if (Number(this.minPrice) < 0) {
        this.$message.error("价格需大于零");
        return;
      }
      if (Number(this.maxPrice) < 0) {
        this.$message.error("价格需大于零");
        return;
      }
      if (Number(this.maxPrice) < Number(this.minPrice)) {
        this.$message.error("价格右区间不能小于左区间");
        return;
      }
      if (this.keyWords !== "" && this.minPrice == "" && this.maxPrice == "") {
        let data = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          keyWords: this.searchKeyWords
        };
        if (this.$route.query.type == "normal") {
          this.getListNomal(data, true);
        } else {
          this.getList(data, true);
        }
      } else {
        // let flag = this.checkMinPrice() && this.checkMaxPrice();
        // if (flag) {
        let data = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          keyWords: this.searchKeyWords
        };
        if (this.$route.query.type == "normal") {
          this.getListNomal(data, true);
        } else {
          this.getList(data, true);
        }
        // }
      }
    },
    checkKeyWords() {
      // if (this.searchKeyWords.trim() === "") {
      //   this.$message.error("关键字不能为空");
      //   return false;
      // } else {
      //   return true;
      // }
    },
    checkMinPrice(e) {
      //console.log("检查小");
      // if (this.minPrice < 0) {
      //   this.$message.error("价格需大于零");
      //   return false;
      // } else {
      //   //console.log("可以啦");
      //   return true;
      // }
      // else if (this.minPrice === "") {
      //   this.$message.error("价格不能为空");
      //   return false;
      // }
    },
    checkMaxPrice(e) {
      // if (this.maxPrice < 0) {
      //   this.$message.error("价格需大于零");
      //   return false;
      // } else if (this.maxPrice < this.minPrice) {
      //   this.$message.error("价格右区间不能小于左区间");
      //   return false;
      // } else {
      //   //console.log("可以啦");
      //   return true;
      // }
      //  else if (this.maxPrice === "") {
      //   this.$message.error("价格不能为空");
      //   return false;
      // }
    },
    toPrePage() {
      //console.log("上");
      if (this.pageNum > 1) {
        //console.log("可以区前一页");
        this.pageNum--;
        let data = { pageNum: this.pageNum, pageSize: this.pageSize };
        if (this.brandId !== '' || this.parentClassId !== '') {
          console.log("是否进入这里")
          data.brandId = this.brandId
          data.parentClassId = this.parentClassId
        }
        console.log("此时的data")
        console.log(data)
        if (this.$route.query.type == "normal") {
          this.getListNomal(data, true);
        } else {
          this.getList(data, true);
        }
      } else {
        //console.log("没有更多啦");
      }
    },
    //当启用了筛选条件时，在没有筛选清除的时候，都要传参数
    toNextPage() {
      if (this.pageNum < Math.ceil(this.listTotalNum / this.pageSize)) {
        //console.log("可以区前一页");
        this.pageNum++;
        let data = { pageNum: this.pageNum, pageSize: this.pageSize };
        if (this.brandId !== '' || this.parentClassId !== '') {
          console.log("是否进入这里")
          data.brandId = this.brandId
          data.parentClassId = this.parentClassId
        }
        if (this.$route.query.type == "normal") {
          this.getListNomal(data);
        } else {
          this.getList(data);
        }
      } else {
        //console.log("没有更多啦");
      }
    },
    //一般查询
    getListNomal(data, needShowText, specForBrandSearch) {
      console.log(1);
      console.log(data);
      //我是normal
      data.goodsType = 0;
      this.$http
        .post("/pc/ordinaryGoods/findOrdinaryGoodsPage", data)
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          // console.log(res);
          //console.log(res.data.data.list);
          this.listTotalNum = res.data.data.count;
          this.collectionList = res.data.data.list;
          if (this.collectionList.length === 0) {
            this.showNoMore = true;
          } else {
            this.showNoMore = false;
          }
          if (needShowText) {
            //是否需要提示文字
            if (this.collectionList.length === 0) {
              // debugger
              this.showNoMore = true;
              // this.$message("没有找到匹配的商品");
              // this.searchKeyWords = "";
              // this.minPrice = "";
              // this.maxPrice = "";
              // this.screenList = [];
            } else {
              // this.$message.success("搜索成功");
              // this.screenList = [];
            }
          }
          if (specForBrandSearch) {
            //只在品牌搜索的时候使用
            this.sureSeachByBrand = true;
            this.searchByBrandCount = this.collectionList.length;
          }
        })
        .catch(() => { });
    },
    //led灯区
    getList(data, needShowText, specForBrandSearch) {
      data.goodsType = 1;
      this.$http
        .post("/pc/ordinaryGoods/findOrdinaryGoodsPage", data)
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          // console.log(res);
          //console.log(res.data.data.list);
          this.listTotalNum = res.data.data.count;
          this.collectionList = res.data.data.list;
          if (needShowText) {
            //是否需要提示文字
            if (this.collectionList.length === 0) {
              this.showNoMore = true;
              // this.$message("没有找到匹配的商品");
              this.searchKeyWords = "";
              this.minPrice = "";
              this.maxPrice = "";
              // this.screenList = [];
            } else {
              // this.$message.success("搜索成功");
              // this.screenList = [];
            }
          }
          if (specForBrandSearch) {
            //只在品牌搜索的时候使用
            this.sureSeachByBrand = true;
            this.searchByBrandCount = this.collectionList.length;
          }
        })
        .catch(() => { });
    },
    // 删除当前点击筛选的数据
    delCurrentData(k, treeIndex, treeChildrenIndex) {
      this.brandId = ''
      this.screenList.splice(k, 1);
      this.searchByBrandId()
    },
    delCurrentData1(k, treeIndex, treeChildrenIndex) {
      this.parentClassId = ''
      this.screenList1.splice(k, 1);
      this.searchByBrandId()
    },

    // 清空筛选
    onReset() {
      this.screenList = [];
      this.screenList1 = [];
      this.brandId = ''
      this.parentClassId = ''
      if (this.$route.query.type === "normal") {
        let data = { pageSize: this.pageSize, pageNum: 1 };
        this.getListNomal(data);
      } else {
        let data = { pageSize: this.pageSize, pageNum: 1 };
        this.getList(data);
      }
    },
    // 点击树节点统一查询
    searchByBrandId() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        brandId: this.brandId,
        parentClassId: this.parentClassId
      };
      if (this.$route.query.type == "normal") {
        this.getListNomal(data, true, true);
      } else {
        this.getList(data, true, true);
      }
    },
    // 树节点点击
    onTreeClick(v) {
      this.sureSeachByBrand = false;
      this.searchByBrandCount = 0;
      //console.log(v.id);
      this.screenList = [];
      this.brandId = v.id;
      this.screenList.push(v.name);
      this.searchByBrandId();
    },
    //分类的树节点点击
    onTreeClick1(v) {
      this.sureSeachByBrand = false;
      this.searchByBrandCount = 0;
      //console.log(v.id);
      this.screenList1 = [];
      this.parentClassId = v.id;
      this.screenList1.push(v.name);
      this.searchByBrandId();
    },
    // 获取搜索列表 tree
    getSearchTreeData() {
      this.$http
        .get("/pc/brand/findAllBrandList")
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          // this.$http.judgeIfLogin(res, this);
          this.searchTreeArr = res.data.data;
        })
        .catch(res => { });
      // searchTreeData(res => {
      //   this.searchTreeArr = res;
      // });
    },
    getCatogoryTreeData() {
      this.$http
        .get("/pc/goodsClass/findFirstClassList")
        .then(res => {
          console.log(res);
          this.searchTreeArr1 = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 手机预览
    onPhoneView(data) {
      this.dialogVisible = true;
      this.goodsInfo = data;
      console.log(data)
    },
    // 收藏点击
    toEnshrine(data) {
      if (data.isCollect) {
        return;
      } else {
        let senddata = {};
        if (this.$route.query.type == "normal") {
          senddata = { goodsId: data.goodsId, goodsType: 0 };
        } else {
          senddata = { goodsId: data.goodsId, goodsType: 1 };
        }
        this.$http
          .post("/pc/collect/collectGoods2User", senddata)
          .then(res => {
            //console.log(res);
            //判断是否登录了的（没有登录则导航到登录页面）
            this.$http.judgeIfLogin(res, this);
            if (res.data.data.code === 1) {
              this.tipContent = '收藏成功'
              this.$refs.successTip.openToast();//弹出成功提示
              let data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                keyWords: this.searchKeyWords
              };
              if (this.$route.query.type == "normal") {
                this.getListNomal(data);
              } else {
                this.getList(data);
              }
            } else {
              this.$message(res.data.data.msg);
            }
          })
          .catch(res => { });
      }
    },
    // 购买点击
    onPurchase(data, ind) {
      //传参数给购物车组件
      this.$refs.cart.open(data);
    },
    judgeHasChild(val, key) {
      //当没有子元素的时候，点击则发请求
      //console.log(val);
      if (val.hasChildren) {
        //console.log("还有子目录");
        this.onCurrentClick(val, key);
        return;
      }
    },
    // 当前左侧导航点击
    onCurrentClick(data, index) {
      this.leftTreeList[index].hasShow = !this.leftTreeList[index].hasShow;
      if (this.leftTreeList[index].hasShow) {
        this.$refs.leftNav[index].style.cssText = `height: ${this.leftTreeList[
          index
        ].children.length *
          35}px;transition: all 0.5s ease;border-top: 1px solid #e8e8e8;`;
      } else {
        this.$refs.leftNav[
          index
        ].style.cssText = `height: 0px;transition: all 0.5s ease;border-top: 1px solid transparent;`;
      }
    },

    // 默认展开第一个
    //不明标记
    setExpandFirst() {
      // this.$nextTick(() => {
      //   this.$refs.leftNav[0].style.cssText = `height: ${this.navList[0]
      //     .children.length *
      //     35}px;transition: all 0.5s ease;border-top: 1px solid #e8e8e8;`;
      // });
    },

    // 子导航点击
    onChildrenClick(data) {
      this.breadcrumbText = data.label;
      if (data.hasChildren) {
        //console.log("还有子目录");
        return;
      } else {
        let aData = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          classId: data.id
        };
        if (this.$route.query.type == "normal") {
          this.getListNomal(aData, true);
        } else {
          this.getList(aData, true);
        }
      }
    },

    toClear() {
      this.BrandList = [];
    },
    deleteCondition(index) {
      let ind = this.BrandList.indexOf(index);
      this.BrandList.splice(ind, 1);
    },
    sureChoose() {
      this.isToShow = false;
    },
    cancelChoose() {
      this.isToShow = false;
    },
    toShow() {
      this.isToShow = true;
    },
    pushBrandList(index) {
      if (this.BrandList.indexOf(index) !== -1) {
        let ind = this.BrandList.indexOf(index);
        this.BrandList.splice(ind, 1); //有就删除
      } else if (this.BrandList.indexOf(index) == -1) {
        this.BrandList.push(index);
      }
    },
    // 爆款推荐迁移
    toProInfo(item) {
      // if (this.$route.query.type == "normal") {
        this.$router.push({
          path: "/ReCommonDetail",
          query: { item: item.goodsId, type: "normal" }
        });
      // } else {
      //   this.$router.push({
      //     path: "/ReCommonDetail",
      //     query: { item: item.goodsId }
      //   });
      // }
    },
  },
  watch: {
    $route: {
      handler(newVal, oldVla) {
        this.showNoMore = false;
        this.homeSearch();
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.outLandDemo {
  width: 1200px;
  margin: 20px auto 20px;
  height: auto;
  .o-breadcrumb {
    padding: 15px 0;
  }
  .outLandDemoContent {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .leftColList {
      width: 220px;
      min-height: 200px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      .leftColListItem {
        width: 100%;
        min-height: 40px;
        border: 1px solid #e8e8e8;
        margin-bottom: 5px;
        box-sizing: border-box;
        .leftColListTitle {
          display: flex;
          height: 40px;
          justify-content: space-between;
          align-items: center;
          padding: 7px;
          box-sizing: border-box;
          .titleItem:hover {
            color: #0094e7;
            cursor: pointer;
          }
          .colBtn {
            cursor: pointer;
            i {
              font-weight: bold;
            }
          }
          // span:nth-last-of-type(1) {
          //   font-size: 13px;
          //   color: gray;
          // }
        }
        .leftColListContent {
          box-sizing: border-box;
          height: 0px;
          overflow: hidden;
          transition: all 0.5s ease;
          .contentItem {
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 7px;
            box-sizing: border-box;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              color: #0094e7;
            }
          }
        }
      }
    }
    .rightProductData {
      width: 950px;
      box-sizing: border-box;

      /*按照多条件搜索: start*/
      .chooseConditioAndSearch {
        width: 100%;
        border: 1px solid #e8e8e8;
        padding: 10px;
        box-sizing: border-box;
        background: #fcfcfc;
        overflow: hidden;
        min-height: 120px;
        position: relative;
        .btn {
          position: absolute;
          top: 5px; //与list平齐
        }
        .main-flex {
          //最小高度
          min-height: 120px;
          display: flex;
          flex-direction: column;
          margin-left: 55px;
          .top-box {
            // flex: 1;
            overflow: auto;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            width: 200px;
            // border:1px solid red;
            .box {
              display: inline-block;
              margin-right: 15px;
              .label {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
                display: inline-block;
              }
              .tree {
                border: 1px solid #e8e8e8;
                display: flex;
                flex-direction: column;
                font-size: 14px;
                .input {
                  display: flex;
                  height: 30px;
                  input {
                    flex: 1;
                    border: transparent;
                    outline: none;
                    padding: 0 5px;
                  }
                  i {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 10px;
                    flex-basis: 50px;
                    background: white;
                    cursor: pointer;
                  }
                }
                //查询树的子容器
                .top-list {
                  border-top: 1px solid #e8e8e8;
                  overflow: auto;
                  padding: 5px;
                  max-height: 170px;
                  box-sizing: border-box;
                  transition: all 0.3s ease;
                  p {
                    //筛选条件的行高
                    line-height: 25px;
                    cursor: pointer;
                    &:hover {
                      color: #09f;
                    }
                  }
                  .is-click {
                    color: #09f;
                  }
                }
                .is-toggle {
                  max-height: 360px;
                  // height:360px;
                  transition: all 0.3s ease;
                }
              }
            }
          }
          .top-box22:first-of-type {
            width: 600px;
            // border:1px solid green;
          }
          .search-list {
            margin: 15px 0;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            .s-flex {
              padding: 5px;
              position: relative;
              .s-item {
                //防止换行，整体变高
                // height:24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #e8e8e8;
                padding: 5px 15px;
              }
              .close {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 16px;
                z-index: 9999999;
              }
              &:hover {
                .s-item {
                  border: 1px solid #09f;
                  cursor: default;
                }
                .close {
                  color: #09f;
                  cursor: pointer;
                }
              }
            }
          }
          .bottom-box {
            flex-basis: 40px;
            display: flex;
            align-items: center;
            .left {
              flex: 1;
              display: flex;
              align-items: center;
              .result {
                padding-left: 15px;
                span {
                  font-size: 14px;
                  color: orange;
                  font-weight: bold;
                }
              }
            }
            .error {
              display: flex;
              justify-content: flex-end;
              .color {
                color: #09f;
                cursor: pointer;
              }
            }
          }
        }
      }
      /*按照多条件搜索: end*/

      .msg {
        font-size: 14px;
        line-height: 20px;
        padding: 10px 0;
        .color1 {
          color: red;
        }
        .color2 {
          color: #09f;
        }
      }

      .mall_home_hotRecommon {
        width: 100%;
        //对比弹出栏目
        .showNoMore {
          text-align: center;
          font-size: 20px;
          margin: 100px 0;
        }
        .mall_home_search_wrap {
          width: 100%;
          .mall_home_search_content {
            width: 100%;
            margin: 0 auto;
            .search_bar {
              width: 100%;
              background: rgb(240, 240, 240);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .search_bar_top {
                width: 100%;
                height: 45px;
                line-height: 45px;
                display: flex;
                justify-content: space-between;
                border: 1px solid #e8e8ee;
                .search_choose {
                  display: flex;
                  div {
                    text-align: center;
                    width: 70px;
                    border-right: 1px solid rgb(220, 220, 220);
                  }
                  div:hover {
                    background: #0094e7;
                    cursor: pointer;
                    color: white;
                  }
                  .kucun,
                  .jiage,
                  .xiaoliang {
                    position: relative;
                    span {
                      position: absolute;
                      top: 10px;
                      right: 10px;
                      display: none;
                      flex-direction: column;
                    }
                  }
                  .kucun:hover span,
                  .jiage:hover span,
                  .xiaoliang:hover span {
                    display: flex;
                  }
                }
                .search_btn {
                  height: 100%;
                  display: flex;
                  box-sizing: border-box;
                  div {
                    width: 50px;
                    height: 100%;
                    text-align: center;
                  }
                  .left_btn,
                  .right_btn {
                    border-left: 1px solid rgb(220, 220, 220);
                  }
                  .left_btn:hover,
                  .right_btn:hover {
                    background: white;
                    cursor: pointer;
                  }
                }
              }
              .search_bar_bottom {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgb(248, 248, 248);
                padding: 0 10px;
                box-sizing: border-box;
                .search_bar_bottom_left {
                  input {
                    height: 25px;
                    margin-right: 5px;
                    text-align: center;
                    border-radius: 3px;
                    border: 1px solid lightgray;
                  }
                  .serchBtn {
                    background: gray;
                    color: white;
                    border: none;
                    font-size: 12px;
                    padding: 2px;
                    outline: none;
                    padding: 3px 7px;
                    margin-left: 10px;
                    margin-right: 10px;
                    box-sizing: border-box;
                  }
                  .serchBtn:hover {
                    background: #0094e7;
                    color: white;
                  }
                }
                .search_bar_bottom_right {
                  color: red;
                }
              }
            }
            .search_content {
              background: white;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              width: 100%;
              .search_content_item {
                width: 948px;
                min-height: 100px;
                padding: 10px;
                border-bottom: 1px solid #e8e8e8;
                display: flex;
                justify-content: space-between;
                line-height: 25px;
                margin-top: 10px;
                box-sizing: border-box;
                border-radius: 3px;
                transition: all 0.3s ease;
                .search_content_item_leftImg {
                  width: 96px;
                  height: 114px;
                  position: relative;
                  margin-right: 15px;
                  cursor: pointer;
                  .bigImg {
                    //大图样式
                    position: absolute;
                    left: 105px;
                    top: -50px;
                    // border:1px solid #e8e8e8;
                    border-radius: 2px;
                    img {
                      width: 350px;
                      height: 350px;
                    }
                  }
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
                    button {
                      display: inline-block;
                      // width:50px;
                      // padding:8px 10px;
                      flex: 1;
                      height: 20px;
                      // line-height: 20px;
                      align-items: center;
                      text-align: center;
                      border: 1px solid lightgray;
                      color: gray;
                      cursor: pointer;
                      background: white;
                    }
                    button:hover {
                      z-index: 9999999;
                      color: orange;
                      border: 1px solid orange;
                    }
                    button:nth-last-of-type(1) {
                      margin-left: -1px;
                    }
                  }
                }
                .search_content_item_proMsg {
                  width: 730px;
                  display: flex;
                  flex-direction: column;
                  font-size: 14px;
                  overflow: hidden;
                  .search_content_item_proMsg_title {
                    font-size: 15px;
                    color: #0094e7;
                    cursor: pointer;
                  }
                  //新增的类名
                  .loadBottomContent {
                    display: flex;
                    //下面类的下一级类，相同，抽取出来
                    .search_content_item_data_item {
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      .tag {
                        padding: 5px 10px;
                        border: 1px solid #0094e7;
                        color: #0094e7;
                        box-sizing: border-box;
                      }
                      .itemTitle {
                        color: #999999;
                      }
                      .brandItem:hover {
                        color: #0094e7;
                        cursor: pointer;
                      }
                    }
                    .loadLeft {
                      width: 33.33%;
                      // border: 1px solid red;
                      padding-right: 10px;
                      box-sizing: border-box;
                    }
                    .loadCenter {
                      width: 33.33%;
                      // border: 1px solid red;
                      padding-right: 10px;
                      box-sizing: border-box;
                    }
                    .loadRight {
                      width: 33.33%;
                      // border: 1px solid red;
                      padding-right: 10px;
                      box-sizing: border-box;
                    }
                  }
                  .search_content_item_other {
                    color: #0094e7;
                    span {
                      margin-right: 15px;
                    }
                  }
                  .internationBrand {
                    display: inline-block;
                    padding: 0 5px;
                    border: 1px solid #0094e7;
                    color: #0094e7;
                    text-align: center;
                    box-sizing: border-box;
                    margin-top: 10px;
                  }
                  .i-bg {
                    color: orangered;
                    border: 1px solid orangered;
                  }
                }
                .search_content_item_due {
                  font-size: 14px;
                  flex-basis: 130px;
                  padding-left: 20px;
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
                  width: 90px;
                  font-size: 14px;
                  display: flex;
                  .buyBtn {
                    margin: auto;
                    .el-button {
                      margin-left: 0px;
                      width: 90px;
                    }
                    &:last-of-type .el-button {
                      margin-top: 10px;
                    }
                  }
                }
              }
              .search_content_item:hover {
                border-bottom: 1px solid transparent;
                box-shadow: 0 0 3px 5px rgb(246, 246, 246);
                transition: all 0.3s ease;
              }
              .dividePageBar {
                padding-top: 10px;
                text-align: right;
                box-sizing: border-box;
              }
            }
          }
        }
      }
      .less {
        height: 100px;
        overflow: hidden;
      }
      .more {
        height: auto;
      }
    }
  }
}
.mall_home_hotRecommon /deep/ .el-dialog__wrapper .el-dialog__body {
  width: 600px;
  height: 662px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
}
.cart-dialog /deep/ .el-dialog__wrapper .el-dialog__body {
  height: 400px;
}
.mall_home_hotRecommon /deep/ .el-dialog__wrapper .el-dialog__body .o-dialog {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
.mall_home_hotRecommon /deep/ .el-dialog__wrapper img {
  width: 60%;
  height: 100%;
  margin: auto;
}
.mall_home_hotRecommon /deep/ .el-dialog__wrapper .o-iframe {
  position: absolute;
  width: 312px;
  height: 496px;
  top: 81px;
  left: 143px;
  overflow: hidden;
  box-sizing: border-box;
  .qzd {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    .nav-title {
      height: 46px;
      background: white;
      line-height: 46px;
      text-align: center;
    }
    .content {
      flex: 1;
      overflow: auto;
      .swipers {
        height: 200px;
        width: 100%;
        box-sizing: border-box;
        img {
          height: 200px;
          width: 100%;
        }
      }
      .g-msg {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        overflow: hidden;
        background: -webkit-linear-gradient(left, #ffdec2, #ffe9d4);
        position: relative;
        .g-item {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          padding: 15px 0;
          .g-btn {
            flex: 1;
            color: white;
            box-sizing: border-box;
            margin-left: 10px;
            font-size: 12px;
            span {
              border-radius: 30px;
              padding: 5px;
              background: #ff7800;
            }
          }
          .g-txt {
            flex-basis: 84%;
            color: #2b2e33;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            div {
              width: 92%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              padding: 0 10px;
            }
          }
        }
      }
      .g-goods-details {
        padding: 20px 10px;
        background: #ffffff;
        box-sizing: border-box;
        .d-title {
          color: #09f;
          margin-bottom: 10px;
        }
        .g-info {
          line-height: 20px;
          .g-label {
            color: #999;
          }
          .g-name {
            color: #444;
          }
          .g-name-color {
            color: #ff7800;
          }
        }
      }
      .g-price {
        padding: 20px 10px;
        background: #ffffff;
        box-sizing: border-box;
        margin: 8px 0;
        display: flex;
        align-items: center;
        .price-money {
          height: 100%;
          color: #ff7800;
        }
        .price-title {
          color: #444;
          // padding-bottom: 10px;
          display: flex;
          align-items: center;
          margin-right: 20px;
        }
        .price-warp {
          padding: 0 15px;
          line-height: 30px;
          display: flex;
          align-items: center;
          .price-label {
            color: #666;
            flex-basis: 70px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 5px;
          }
        }
      }
    }
  }
}
</style>
