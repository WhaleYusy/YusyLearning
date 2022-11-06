<template>
  <div class="indexbig">
    <div class="mall_home_indedx">
      <!-- <div class="mall_home_indedx_rightContent">
        <div class="mall_home_indedx_rightContent_swiper_blocks">
          <div class="swiper">
            <div class="swiper-container" id="target-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
                  <a :href="item.jumpUrl">
                    <img :src="item.advImg" />
                  </a>
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="tip" >
        <span>免费送</span>
      </div>
      <ul class="list-box" >
        <li v-for="(v,k) in dataList" @click="toProInfo(v)" :key="k" :style=" ((k+1) % 4 == 0) ? 'margin-right:0' : ''" >
          <img :src="v.mainImage" alt />
          <p class="list-box-p" v-html="v.materialsName">
          </p>
         <div class="list-box-name">{{v.description}}</div>
			<p class="pItem">
				<span class="nowPrice">￥0</span>
				<span class="nowPrice-tips">起</span>
				<!-- <div class="baopin">立即抢购</div> -->
			</p>
        </li>
      </ul>
	  <div class="nomore" v-if="dataList.length <= 0">暂无数据</div>
    </div>
	<!-- 分页 -->
	<div class="dividePageBar">
	  <el-pagination
	    background
	    @current-change="handleCurrentChange"
	    :current-page="currentPage"
	    :page-size="12"
	    layout="total, prev, pager, next, jumper"
	    :total="total"
	  ></el-pagination>
	</div>
  </div>
</template>
<script>
import vueSeamless from "vue-seamless-scroll";
// import Swiper from './首页轮播/swiper.vue';
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
// import SwiperOne from './首页轮播/swiperItem1.vue';
// import SwiperTwo from './首页轮播/swiperItem1.vue';
// import SwiperThree from './首页轮播/swiperItem1.vue';
import {
  setHomeData1,
  setHomeData2,
  setHomeData3,
  setHomeData4,
  transactionRecordMock
} from "@/falseData/json";
export default {
  components: {
    vueSeamless
  },
  data() {
    return {
      swiperList:[],//轮播图
      dataList:[],
      pageRequest:{
        pageNum:1,
        pageSize:12,
        keywords:'',
		isFree:0
      },
      // 品牌推荐
      data1: [],
      children1: [],
      active1: 0,

      // 新闻/公告
      newList: [],
      newActive: 1,
      brandParam: {
        pageNum: 1,
        pageSize: 12
      },
      brandList: [],
      total: 0,
      transactionRecord: {},
      recommonBrandList: [], ////品牌推荐列表
      brandType: 1,
      totalOrderNum: 0,
      linkData: [],
      linkDataTotal: 0,
	  currentPage:0
    };
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 320,
        waitTime: 1000,
        limitMoveNum: 8
      };
    }
  },
  created() {
    // 新闻/公告
    // if (sessionStorage.getItem("newActive")) {
    //   this.newActive = Number.parseInt(sessionStorage.getItem("newActive"));
    //   this.getNews(this.newActive);
    // } else {
    //   this.getNews(1);
    // }
  },
  mounted() {
    // window.addEventListener('scroll',this.matchBottom,false);
    this.getAdvers();
	this.getData();
    // this.initSwiper2();
    // this.initSwiper3();
    // this.initSwiper4();
    // this.getHomeData1();
    // this.getHomeData2();
    // this.getHomeData3();
    // this.getHomeData4();
    // this.getBrandListByPage();
    // this.getTransactionRecord();
    // this.getBrandList();
    // this.getTransationList()
    // this.getLinkData(1)
	this.pageRequest.keywords = this.$route.query.keyWords;
  },
	destroyed(){
		// window.removeEventListener('scroll',this.matchBottom,false)
	},
  methods: {
		handleCurrentChange(val) {
			this.pageRequest.pageNum = val;
			this.getData();
		},
		getData(loadMore){
		  if(loadMore){
			  console.log(loadMore)
			this.pageRequest.pageNum += 1
		  }
			this.pageRequest.keywords = this.$route.query.keyWords;
			this.$http.post(`/api-user/app/goods/conditions`,this.pageRequest).then((res)=>{
			  if(res.data.resp_code === 0){
			    this.dataList = res.data.datas.rows;
			    this.total = res.data.datas.totalElements
			  }else{
			    this.$toast(res.data.resp_msg)
			  }
			}).catch(()=>{

			})
		},
		matchBottom(){
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			//变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			//变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
			if(scrollTop+windowHeight+500>=scrollHeight){
				//写后台加载数据的函数
				// console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
				if(this.total != this.dataList.length){
					this.getData(true);
				}
			}
		},
    // 获取友情链接列表数据
    getLinkData(pageNum) {
      this.$http.post('/pc/link/getLinks', { pageNum: pageNum, pageSize: 10 }).then(res => {
        // 列表数据
        this.linkData = res.data.data.linksData.records
        // 轮播页数
        this.linkDataTotal = Math.ceil(res.data.data.linksData.total / 10) === 0 ? 1 : Math.ceil(res.data.data.linksData.total / 10)
        // 友情链接 div 盒子高度
        this.$nextTick(() => { this.$refs.mallHomeLink.style.height = `${638 - localStorage.getItem('navLength') * 40}px` })
      })
    },

    // 轮播图改变
    onCarouselChange(index) {
      this.getLinkData(Number.parseInt(index + 1))
    },

    // 友情链接打开
    onOpenLinks(url) {
      window.open(url)
    },

    getTransationList() {
      this.$http.post('/pc/goodsOrder/getOrdersOnMonth', { pageSize: 10, pageNum: 1 }).then(res => {
        this.totalOrderNum = res.data.data.orders.total
      }).catch(res => { })
    },
    choosePath(path) {
      //跳转路由
      this.$router.push({ path: path })
    },
    //由品牌推荐渠道对应的列表
    toProList(id) {
      this.$router.push({
        path: "/home/outLandDemo",
        query: {
          type: "normal",
          brandId: id
        }
      });
    },
    //获取品牌推荐的列表
    getBrandList() {
      this.$http
        .get(`/pc/brand/findAllBrandList/${this.brandType}`)
        .then(res => {
          this.recommonBrandList = res.data.data.slice(0, 20);
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 成交记录
    getTransactionRecord() {
      transactionRecordMock(res => {
        let { orderList } = res.data.data;
        for (let i = 0; i < orderList.length; i++) {
          orderList[i]["times"] = this.getTime(orderList[i].payTime);
          orderList[i]["telPhone"] = orderList[i].phone.replace(
            /^(\d{3})\d{4}(\d+)/,
            "$1****$2"
          );
        }
        this.transactionRecord = res.data.data;
      });
    },


    // 获取商品品牌
    getBrandListByPage() {
      this.$http
        .post("/pc/brand/getBrandListByPage", { ...this.brandParam })
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          this.total = res.data.data.total;
          this.brandList = res.data.data.rows;
        });
    },

    // 点击品牌跳转到一般搜索页
    onGotoSearch(data) {
      this.$router.push({
        path: "/ReCommonDetail",
        query: { type: "normal", item: data.goodsId }
      });
    },

    // 获取首页轮播广告
    getAdvers() {
      this.$http.post(`api-user/app/adv/getApiAdvList`,{positionCode:'1300'}).then((res)=>{
      	this.swiperList = res.data.datas;
      	this.$nextTick(() => {
      		this.initSwiper1();
      	});
      })
    },

    // 获取公告/新闻列表
    getNews(type) {
      this.$http
        .post(`/pc/news/getNews`, {
          type,
          limit: 6
        })
        .then(res => {
          this.newList = res.data.data.newsData;
        });
    },

    // 品牌推荐
    getHomeData1() {
      setHomeData1(res => {
        this.data1 = res;
        this.children1 = res.brandNavList[0].children;
      });
    },

    // 电阻/电容/电感
    getHomeData2() {
      // 假数据模拟
      // setHomeData2(res => {
      //   this.data2 = res;
      //   this.children2 = res.brandNavList[0].children;
      // });

      this.$http.get("/pc/goodsClass/findGoodsTowClassList").then(res => {
        this.data2["brandNavList"] = res.data.data;
        this.goods(res.data.data[0].id);
      });
    },

    // 电阻/电容/电感商品
    goods(id) {
      this.$http
        .post(`/pc/ordinaryGoods/findOrdinaryGoodsPage`, {
          classId: id,
          pageSize: 8,
          pageNum: 1,
          goodsType: 1
        })
        .then(res => {
          // console.log(res);
          this.children2 = res.data.data.list;
        });
    },

    // 分立器件
    getHomeData3() {
      setHomeData3(res => {
        this.data3 = res;
        this.children3 = res.brandNavList[0].children;
      });
    },

    // 逻辑芯片
    getHomeData4() {
      setHomeData4(res => {
        this.data4 = res;
        this.children4 = res.brandNavList[0].children;
      });
    },

    // 页面跳转
    GoToPage(url) {
      this.$router.push(url);
    },

    // 新闻/公告切换
    displayWitch(index) {
      this.getNews(index);
      this.newActive = index;
      sessionStorage.setItem("newActive", index);
    },

    // 轮播图
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

    // 品牌推荐点击
    changeTab(index) {
      this.children1 = [];
      this.children1 = this.data1.brandNavList[index].children;
      this.active1 = Number.parseInt(index);
      this.brandType = this.active1 + 1;
      this.getBrandList();
    },

    // 电阻/电容/电感点击
    changeTTab(id, index) {
      // this.children2 = [];
      // this.children2 = this.data2.brandNavList[index].children;
      this.goods(id);
      this.active2 = Number.parseInt(index);
    },

    // 分立器件点击
    changeTTTab(index) {
      this.children3 = [];
      this.children3 = this.data3.brandNavList[index].children;
      this.active3 = Number.parseInt(index);
    },

    // 逻辑芯片点击
    changeTTTTab(index) {
      this.children4 = [];
      this.children4 = this.data4.brandNavList[index].children;
      this.active4 = Number.parseInt(index);
    },

    // 时间格式
    getTime(val) {
      let nowTime = new Date(val);
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1 > 9 ? nowTime.getMonth() + 1 : "0" + (nowTime.getMonth() + 1);
      let day = nowTime.getDate() > 9 ? nowTime.getDate() : "0" + nowTime.getDate();
      let hour = nowTime.getHours() > 9 ? nowTime.getHours() : "0" + nowTime.getHours();
      let minute = nowTime.getMinutes() > 9 ? nowTime.getMinutes() : "0" + nowTime.getMinutes();
      let second = nowTime.getSeconds() > 9 ? nowTime.getSeconds() : "0" + nowTime.getSeconds();
      let nowDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
      return nowDate;
    },
        // 爆款推荐迁移
    toProInfo(item) {
      // if (this.$route.query.type == "normal") {
        // debugger
        this.$router.push({
          path: "/xianliaoDetail",
          query: { id: item.id, type: "3" }
        });
      // } else {
      //   this.$router.push({
      //     path: "/ReCommonDetail",
      //     query: { item: item.goodsId }
      //   });
      // }
    }
  },
  watch:{
  	  $route: {
  	  	handler(newVal, oldVla) {
          this.pageRequest.pageNum = 1;
  	  		this.getData();
  	  	},
  	  	deep: true
  	  }
  },
  filters: {
    isPayType(type) {
      let txt = "";
      switch (Number.parseInt(type)) {
        case 0:
          txt = "微信";
          break;
        case 1:
          txt = "支付宝";
          break;
        case 2:
          txt = "银联";
      }
      return txt;
    }
  }
  // components: {
  //   Swiper,
  //   SwiperOne,
  //   SwiperThree,
  //   SwiperTwo
  // }
};
</script>
<style lang="scss" scoped>
.nomore {
  padding-top: 150px;
  text-align: center;
  box-sizing: border-box;
}
.dividePageBar {
      padding: 0 10px;
      text-align: center;
      box-sizing: border-box;
    }
.mall_home_indedx {
  margin: 0 auto;
  width: 1200px;
  min-height: 500px;
  // display: flex;
  // justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  .mall_home_link {
    position: absolute;
    border: 1px solid #e8e8e8;
    left: 0;
    bottom: 0;
    width: 220px;
    z-index: 10;
    box-sizing: border-box;
    background: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .top {
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .bottom {
      height: 90%;
      .pagination {
        bottom: 0 !important;
      }
      /deep/ .el-carousel__container {
        height: 100% !important;
      }
      .links {
        // font-size: 14px;
        line-height: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }


  .mall_home_indedx_rightContent {
    // margin-left: 230px;
    margin-top: 5px;
    // margin-right:10px;
    width: 100%;
    min-height: 200px;
    .mall_home_indedx_rightContent_swiper_blocks {
      display: flex;
      justify-content: space-between;
      .swiper {
        width: 100%;
        // margin-right: 20px;
        height: 500px;
        position: relative;
        .swiper-container {
          width: 100%;
          height: 100%;
          background: none;
          margin: 0;
			.swiper-button-next{
				  height:300px;
				  width: 100px;
				  margin-top: -150px;
			}
			.swiper-button-prev{
				  height:300px;
				  width: 100px;
				  margin-top: -150px;
			}
			.swiper-button-next:hover{
				  background-color: rgba(0,0,0,0.3);
			}
			.swiper-button-prev:hover{
				  background-color: rgba(0,0,0,0.3);
			}
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
          width: 100%;
          height: 100%;
        }
      }
      .blocks {
        width: 27%;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        .block_item {
          box-sizing: border-box;
          height: 245px;
          // height: 458px;
          // min-width:300px;
          border: 1px solid #e8e8e8;
          .bocast_news_title {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 16px;
            padding-bottom: 5px;
            box-sizing: border-box;
            position: relative;
            span {
              margin-left: 20px;
              padding-bottom: 5px;
              cursor: pointer;
              &:hover {
                color: #0094e7;
                cursor: pointer;
              }
            }
            .more {
              position: absolute;
              right: 15px;
              top: 5px;
              font-size: 12px;
              color: gray;
              cursor: pointer;
              &:hover {
                color: #09f;
                i {
                  color: #09f;
                }
              }
            }
          }
          .bocast_content {
            padding: 0 10px;
            box-sizing: border-box;
            .bocast_content_item {
              display: flex;
              align-items: center;
              height: 30px;
              transition: all 0.3s ease;
              i {
                font-size: 14px;
                color: lightgray;
                padding-right: 5px;
                transition: all 0.3s ease;
              }
              p {
                //兼容ie
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              &:hover {
                transition: all 0.3s ease;
                color: #09f;
                cursor: pointer;
                i {
                  transition: all 0.3s ease;
                  color: #09f;
                }
              }
            }
          }
          .link {
            border-bottom: 2px solid #0094e7;
            color: #0094e7;
          }
          .bocast_news_title span:hover {
            color: #0094e7;
          }
        }
        .block_item1 {
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          flex-wrap: wrap;
          .block_item1_entrance_item {
            width: 49.5%;
            height: 99.5px;
            // background:pink;
            // color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid lightgray;
            box-sizing: border-box;
            cursor: pointer;
            .block_item1_entrance_item_icon {
              margin-bottom: 5px;
              .iconfont {
                font-size: 24px;
              }
            }
            .block_item1_entrance_item_title {
              margin-bottom: 10px;
              font-size: 14px;
              display: flex;
              i {
                margin-left: 10px;
                font-size: 16px;
              }
            }
            .block_item1_entrance_item_content {
              font-size: 12px;
              .content {
                color: gray;
              }
            }
          }
        }
      }
    }

    // 图片列表
    .img-list {
      width: 100%;
      margin: 10px 0;
      height: 170px;
      box-sizing: border-box;
      display: flex;
      .f-item {
        flex: 1;
        // width: 25%;
        float: left;
        margin-right: 10px;
        height: 170px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 170px;
        }
        &::after {
          content: "";
          position: absolute;
          left: -300px;
          top: 0;
          width: 100%;
          height: 200px;
          // background: url("../../falseData/img/light_before.png");
          z-index: 11;
          background-size: 100% 100%;
          box-sizing: border-box;
        }
        &:last-of-type {
          margin-right: 0px;
        }
        &:hover::after {
          left: 300px;
          transition: all 1s ease;
        }
      }
    }

    //标记
    .mall_home_indedx_rightContent_bottom_blocks {
      width: 100%;
      margin-top: 10px;
      min-height: 100px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .mall_home_indedx_rightContent_bottom_blocks_item {
        width: 49%;
        height: 200px;
        margin-bottom: 15px;
        border: 1px solid lightgray;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
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
          width: 100%;
          height: 100%;
        }
        .el-carousel__item {
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          .toptitle {
            display: flex;
            justify-content: space-between;
            height: 30px;
            align-items: center;
            .title {
              font-size: 14px;
              color: #0094e7;
              font-weight: bold;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
            }
            .more {
              color: gray;
            }
            .more:hover {
              color: #0094e7;
              cursor: pointer;
            }
          }
          .bottomContent {
            height: 200px;
            display: flex;
            align-items: center;
            .leftImg {
              margin-right: 20px;
              img {
                width: 144px;
                height: 96px;
              }
            }
            .rightBlock {
              display: flex;
              height: 60%;
              line-height: 18px;
              flex-direction: column;
              justify-content: space-between;
              .rightBlockTitle {
                font-weight: bold;
              }
              // .rightBlockText {
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
              // }
            }
          }
        }
      }
    }
  }
}
.goods-list {
  width: 1200px;
  min-width: 1200px;
  margin: 0 auto 20px;
  //新增
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    height: 40px;
    .g-title {
      width: 300px;
      font-size: 20px;
      color: #333;
      font-weight: bold;
    }
    .g-nav {
      height: 40px;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
      cursor: pointer;
      color: red;
      .nav-info {
        display: flex;
        height: 40px;
        box-sizing: border-box;
        align-items: center;
        .arrow {
          height: 25px;
          line-height: 25px;
          padding: 0 15px;
          border: 1px solid #e8e8e8;
          box-sizing: border-box;
          cursor: pointer;
          font-weight: bold;
          &:last-of-type {
            border-left: 1px solid transparent;
          }
          &:hover {
            color: #09f;
          }
        }
        .is-arrow {
          color: #cccccc;
          cursor: not-allowed;
          &:hover {
            color: #cccccc;
          }
        }
      }
      .g-bg {
        display: flex;
        border: 1px solid #e8e8e8;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        // position: absolute;
        box-sizing: border-box;
        .g-item {
          height: 41px;
          line-height: 40px;
          padding: 0 15px;
          cursor: pointer;
          border: 1px solid transparent;
          border-top: 1px solid #e8e8e8;
        }
        .i-active {
          border: 1px solid #09f;
          border-bottom: 1px solid transparent;
          background: white;
          color: #09f;
        }
      }
    }
  }
  .box {
    flex: 1;
    height: 360px;
    .c-box {
      height: 360px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background: pink;
      box-shadow: 0 2px 12px 0 rgab(0, 0, 0, 0.2);
      .c-title {
        flex-basis: 40px;
        background: #e3f1fe;
        display: flex;
        font-size: 14px;
        font-weight: bold;
        .t-item {
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
        .w-item1 {
          flex-basis: 15%;
        }
        .w-item2 {
          flex: 1;
        }
        .w-item3 {
          flex-basis: 15%;
        }
        .w-item4 {
          flex-basis: 15%;
        }
        .w-item5 {
          flex-basis: 15%;
        }
        .w-item6 {
          flex-basis: 15%;
        }
      }
      .c-content {
        flex: 1;
        overflow: hidden;
        background: white;
        border: 1px solid #e8e8e8;
        border-top: 1px solid transparent;
        //固定高度，在ie会失去高度
        height: 360px;
        .c-warp {
          display: flex;
          .w-item {
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: default;
          }
          .w-item1 {
            flex-basis: 15%;
          }
          .w-item2 {
            flex: 1;
          }
          .w-item3 {
            flex-basis: 15%;
          }
          .w-item4 {
            flex-basis: 15%;
          }
          .w-item5 {
            flex-basis: 15%;
          }
          .w-item6 {
            flex-basis: 15%;
          }
        }
      }
    }
  }
  .right-box {
    padding-right: 10px;
  }
  .list {
    box-sizing: border-box;
    display: flex;
    .left-img {
      width: 300px;
      height: 600px;
      img {
        width: 100%;
      }
    }
    .right-content {
      margin-left: 10px;
      flex: 1;
      box-sizing: border-box;
      min-height: 600px;
      max-height: 600px;
      // border-top: 1px solid #e8e8e8;
      .no-more {
        padding-top: 200px;
        text-align: center;
        box-sizing: border-box;
      }
      .r-grid {
        display: flex;
        flex-wrap: wrap;
        // display: grid;
        // grid-template-columns: repeat(4, 1fr);
        box-sizing: border-box;
        border-top: 1px solid #09f;
        .r-item {
          width: 222.5px;
          height: 120px;
          border: 1px solid #e8e8e8;
          border-top: 1px solid transparent;
          border-right: 1px solid transparent;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          img {
            margin: auto;
            width: 120px;
            height: 70px;
            padding-top: 10px;
          }
          .h-title {
            width: 100%;
            background: rgba(0, 153, 255, 0.9);
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: white;
            position: absolute;
            left: 0;
            bottom: -30px;
            transition: all 0.3s ease;
          }
          &:hover {
            border: 1px solid rgba(0, 153, 255, 0.9) !important;
            transition: all 0.3s ease;
            .h-title {
              bottom: 0;
              transition: all 0.3s ease;
            }
            .img {
              img {
                transform: scale(1.2);
                transition: all 0.5s ease;
              }
            }
          }
          &:nth-of-type(4n) {
            border-right: 1px solid #e8e8e8;
          }

          .r-wap {
            width: 100%;
            height: 180px;
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
            .price {
              color: #ff7300;
            }
            .r-name {
              padding: 5px 0;
            }
            .img {
              display: flex;
              img {
                width: 50%;
                height: 100px;
                margin: auto;
                transition: all 0.5s ease;
              }
            }
          }
          &:last-of-type {
            border-right: 1px solid #e8e8e8;
          }
          // &:nth-of-type(1),
          // &:nth-of-type(2),
          // &:nth-of-type(3),
          // &:nth-of-type(4) {
          //   border-top: 1px solid #e8e8e8;
          // }
        }
        .r-item-height {
          height: 180px;
        }
      }
    }
    .is-no-more {
      border-top: 1px solid #09f;
      border: 1px solid #e8e8e8 !important;
    }
  }
}
.ad-img {
  width: 1200px;
  height: 100px;
  margin: 10px auto;
}
.ad-margin {
  margin-bottom: 20px;
}
.tip{
  text-align: center;
  width:1200px;
  height:2px;
  background:#cccccc;
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
  letter-spacing: 2px;    
  font-weight: 600;
  span{
    position: absolute;
    left:calc(50% - 50px);
    top:-10px;
    background:white;
    font-size: 20px;
    display: inline-block;
    width: 100px;
    height: 30px;
  }
}
.list-box{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  li:hover{
	border: 1px solid #0094E7;
	padding: 10px 5px;
	}
  li{
    width: 288px;
    height: 365px;
    margin-right: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 0px 3px #eeeeee;
	border: 1px solid #eee;
	cursor: pointer;
	padding: 10px;
    transition: all 0.3s ease;
	box-sizing: border-box;
	position: relative;
    img{
      width: 100%;
      height: 225px;
    }
    p{
		font-size: 16px;
		line-height: 20px;
		font-weight: 600;
      padding: 5px 10px;
      overflow:hidden;
      text-overflow:ellipsis;
	  white-space:nowrap;
    }
	.pItem{
		height: 40px;
		line-height: 40px;
		// background: red;
		color: red;
		font-size: 22px;
		text-align: left;
		margin-right: 25px;
		.nowPrice-tips{
			font-size: 16px;
			color: #333;
		}
	}
	.baopin{
		position: absolute;
		right: 0;
		bottom: 5px;
		width: 32px;
		height: 32px;
		padding: 14px;
		border-radius: 50%;
		background: yellow;
		color: red;
		font-size: 16px;
	}
	.tag{
	    display: inline-block;
	    min-width: 36px;
	    height: 20px;
	    line-height: 22px;
	    font-size: 12px;
	    background: red;
	    border-radius: 10px;
	    color: #fff;
	    margin-right: 10px;
	    text-align: center;
	    padding: 0;
	}
    .list-box-price{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
    }
    .list-box-oldPrice{
      font-size: 13px;
      color: #666;
      text-decoration: line-through;
    }
    .list-box-name{
      font-size: 13px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      height: 18px;
      line-height: 18px;
      padding-bottom:20px;
      font-weight: normal;
      padding-left: 10px;
    }
  }
}
</style>
