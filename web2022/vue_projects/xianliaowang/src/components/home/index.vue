<template>
  <div class="indexbig">
<!--    <div class="mall_home_indedx">
      <div class="mall_home_indedx_rightContent">
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
      </div>
    </div> -->

<!-- 免费-->
    <div class="goods-list">
      <div class="tip" >
        <span>免费送</span>
	    <a class="span2" @click="changePath('/home/freeGoods')">查看更多&gt;&gt;</a>
      </div>
      <div class="list">
        <div class="right-content2" :class="data1.length <= 0 ? 'is-no-more' : ''">
          <div class="r-grid">
            <div class="r-item r-item-height" v-for="(v,k) in data1" :key="k" @click="onGotoSearch1(v)">
              <div class="r-wap" @click="freeTo">
                <div class="img">
                  <img :src="v.mainImage" alt v-if="v.mainImage != ''" />
                  <img src="../../../img/logo.png" alt v-if="v.detailImages == '' && v.detailImages == ''" />
                </div>
				  <p class="list-box-p">{{v.materialsName}}
				  </p>
				  <p class="list-box-name">{{v.description}}</p>
					<p class="pItem">
						<span class="nowPrice">￥0</span>
						<span class="nowPrice-tips">起</span>
						<!-- <div class="baopin">立即抢购</div> -->
					</p>
              </div>
            </div>
          </div>
          <div class="no-more" v-if="data1.length <= 0">暂无数据</div>
        </div>
      </div>
    </div>

	<!-- 免费-->
	<div class="goods-list">
	  <div class="tip2" >
	    <span class="span1">爆品商品</span>
	    <a class="span2" @click="changePath('/home/HotGoods')">查看更多&gt;&gt;</a>
	  </div>
	  <div class="list">
	    <div class="left-img"  >
	      <img src="../../falseData/img/index_adv2.png" alt />
	    </div>
	    <div class="right-content" :class="data2.length <= 0 ? 'is-no-more' : ''">
	      <div class="r-grid">
	        <div class="r-item r-item-height" v-for="(v,k) in data2" :key="k" @click="onGotoSearch2(v)">
	          <div class="r-wap">
	            <div class="img">
	              <img :src="v.mainImage" alt v-if="v.mainImage != ''" />
	              <img src="../../../img/logo.png" alt v-else />
	            </div>
				<p>
					<span class="nowPrice">￥{{v.price.toFixed(3)}}元 / </span><span class="codeCharge">{{(v.price * 10).toFixed(2)}}积分换购</span>
				</p>
	            <div class="list-box-name">{{v.materialsName}}</div>
	          </div>
	        </div>
	      </div>
	      <div class="no-more" v-if="data2.length <= 0">暂无数据</div>
	    </div>
	  </div>
	</div>

	<!-- 免费-->
	<div class="goods-list">
	  <div class="tip2">
	    <span class="span1">拼单</span>
	    <a class="span2" @click="changePath('/home/purchase')">查看更多&gt;&gt;</a>
	  </div>
	  <div class="list">
	    <div class="right-content2" :class="data3.length <= 0 ? 'is-no-more' : ''">
	      <div class="r-grid">
	        <div class="r-item r-item-height" v-for="(v,k) in data3" :key="k" @click="onGotoSearch3(v)">
	          <div class="r-wap">
	            <!-- <div class="img"><img :src="v.mainImage" alt /></div> -->
	            <p class="mesgItem list-box-names" >
	                <span class="pStatus" :class="v.isEnd == 0 ? 'ing' : '' ">{{v.isEnd == 0 ? '进行中' : '已结束'}}</span>拼单:{{v.materialsName}}</p>
	            <p class="mesgItem">
				  <span class="mesgItemTitle">日期：</span>
				  <span class="mesgItemContent" v-if="v.endDay === -1" >{{v.createdTime | timeFormat('yyyy-mm-dd')}} 至 长期</span>
				  <span class="mesgItemContent" v-else >{{v.createdTime | timeFormat('yyyy-mm-dd')}} 至 {{v.publishDate | timeChange(v.endDay)}}</span>
	            </p>
	            <p class="mesgItem ">
				  <span class="mesgItemTitle">品牌：</span>
				  <span class="mesgItemContent" v-html="v.field1" ></span>
	            </p>
	            <p class="mesgItem ">
	                <span class="mesgItemTitle">数量：</span>
	                <span class="mesgItemContent">{{v.quantity}}</span>
	            </p>
	          </div>
	        </div>
	      </div>
	      <div class="no-more" v-if="data3.length <= 0">暂无数据</div>
	    </div>
	  </div>
	</div>

    <!-- 免费-->
    <div class="goods-list">
	  <div class="tip2">
	    <span class="span1">闲料</span>
	    <a class="span2" @click="changePath('/home/idleMaterial')">查看更多&gt;&gt;</a>
	  </div>
      <div class="list" style="height:700px;">
        <div class="left-img"  >
          <img src="../../falseData/img/index_adv2.png" alt />
        </div>
        <div class="right-content" :class="data4.length <= 0 ? 'is-no-more' : ''">
          <div class="r-grid">
            <div class="r-item r-item-height" style="height:330px;" v-for="(v,k) in data4" :key="k" @click="onGotoSearch4(v)">
              <div class="r-wap">
				  <div class="img"><img :src="v.mainImage" alt /></div>
					<div class="text">
					<span class="tag">{{v.inStock === 0 ? '有货' : '无货'}}</span>
					<span >{{v.materialsName}}</span>
					</div>
					<div  class="pStatus" :class="v.isEnd == 0 ? 'ing' : '' ">{{v.isEnd == 0 ? '进行中' : '已结束'}}</div>
					<div class="text">
						  <span>年份：</span>
						  <span>{{v.materialsYear | timeFormat('yyyy-mm-dd') }}</span>
					  </div>
					<div class="text">
						  <span>品牌：</span>
						  <span>{{v.materialsBrand}}</span>
					  </div>
					<div class="text">
						  <span>数量：</span>
						  <span>{{v.quantity}}</span>
					  </div>
					<div class="text">
					  <span style="font-weight: bold;color:red">￥{{v.currentPrice.toFixed(3)}}</span>
					  <!--            <span class="list-box-oldPrice"  >￥{{v.origPrice}}</span>-->
					</div>
              </div>
            </div>
          </div>
          <div class="no-more" v-if="data4.length <= 0">暂无数据</div>
        </div>
      </div>
    </div>

    <!-- ad img-->
    <!-- <div class="ad-img ad-margin">
      <img src="../../falseData/img/home-line-adv1.png" alt />
    </div> -->
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
      data1: [],
      data2: [],
      data3: [],
      data4: [],

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
      pageRequest1:{
        pageNum:1,
        pageSize:4,
		isFree:0
      },
      pageRequest2:{
        pageNum:1,
        pageSize:6,
		isFree:1
      },
      pageRequest3:{
        pageNum:1,
        pageSize:4,
      },
      pageRequest4:{
        pageNum:1,
        pageSize:6,
      },
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
    this.getAdvers();
   	this.getData();
  },
  mounted() {
    // this.getAdvers();
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
  },
  methods: {
	  changePath(path){
		  this.$router.push({
			  path: path
		  });
	  },
	  getData(){
		  this.$http.post(`/api-user/app/goods/conditions`,this.pageRequest1).then((res)=>{
		    if(res.data.resp_code === 0){
		      this.data1 = this.data1.concat(res.data.datas.rows);
		    }else{
		      this.$toast(res.data.resp_msg)
		    }
		  }).catch(()=>{

		  })

		  this.$http.post(`/api-user/app/goods/conditions`,this.pageRequest2).then((res)=>{
		    if(res.data.resp_code === 0){
		      this.data2 = this.data2.concat(res.data.datas.rows);
		    }else{
		      this.$toast(res.data.resp_msg)
		    }
		  }).catch(()=>{

		  })

		  this.$http.post(`/api-user/app/mdcbuyingmaterials/buyingConditions`,this.pageRequest3).then((res)=>{
		    if(res.data.resp_code === 0){
		      this.data3 = this.data3.concat(res.data.datas.rows);
		    }else{
		      this.$toast(res.data.resp_msg)
		    }
		  }).catch(()=>{

		  })

		  this.$http.post(`/api-user/app/mdcidlematerials/idleConditions`,this.pageRequest4).then((res)=>{
		    if(res.data.resp_code === 0){
		      this.data4 = this.data4.concat(res.data.datas.rows);
		      this.total = res.data.datas.totalElements
		    }else{
		      this.$toast(res.data.resp_msg)
		    }
		  }).catch(()=>{

		  })
	  },
	  onGotoSearch1:function(v){
      this.$router.push({
          path: "/xianliaoDetail",
          query: {
             id: v.id,
              type: "3"
              }
        });

	  },
	  onGotoSearch2:function(v){
		  this.$router.push({
          path: "/xianliaoDetail",
          query: {
             id: v.id,
              type: "4"
              }
        });
	  },
	  onGotoSearch3:function(v){
		  this.$router.push({
        path: "/purchaseDetail",
        query: {
          id: v.id,
          type: 2
        }
      });
	  },
	  onGotoSearch4:function(v){
		  this.$router.push({
        path: "/purchaseCommonDetail",
        query: {
          id: v.id,
          type: 1
        }
      });
	  },
	  freeTo:function(v){
		  console.log(v)
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


    // 获取首页轮播广告
    getAdvers() {
      this.$http.post(`api-user/app/adv/getApiAdvList`,{}).then((res)=>{
      	this.swiperList = res.data.datas;
      	this.$nextTick(() => {
      		this.initSwiper1();
      	});
      })
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
    },
	timeChange(time, endFate){
		let newTime = new Date(time).getTime()
		let timeTrap = newTime + (60*60*24*1000*endFate);
		let date = new Date(timeTrap)
		let y = date.getFullYear()
		let m = date.getMonth() + 1
		let d = date.getDate()
		let h = date.getHours()
		let min = date.getMinutes()
		let s = date.getSeconds()
		return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
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
.tip2{
	height: 30px;
	line-height: 30px;
	margin:20px 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid #999;
	.span1{
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 2px;
	}
	.span2{
		padding-right: 20px;
		color: red;
		cursor: pointer;
	}
	.span2:hover{
		color: #0094e7;
		transition: all .3s ease;
	}
}
.tip{
  text-align: center;
  width:1200px;
  height:2px;
  background:#cccccc;
  position: relative;
  margin:50px 0;
  span{
    position: absolute;
    left:calc(50% - 50px);
    top:-10px;
    background:white;
    font-size: 20px;
    display: inline-block;
    width: 100px;
    height: 30px;
	letter-spacing: 2px;
	font-weight: 600;
  }
  .span2{
	  position:absolute;
	  right: 0;
    top:-24px;
    background:white;
    display: inline-block;
    width: 100px;
    height: 20px;
    line-height: 20px;
		color: red;
		cursor: pointer;
  }
	.span2:hover{
		color: #0094e7;
		transition: all .3s ease;
	}
}
.mall_home_indedx {
  margin: 0 auto;
  width: 1200px;
  min-height: 400px;
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
          background: url("../../falseData/img/light_before.png");
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
        // border-top: 1px solid #09f;
		.r-item:hover{
			border:1px solid #0094E7;
			padding: 6px 10px;
		}
        .r-item {
          width: 270px;
          height: 280px;
		  margin: 0 10px 20px 10px;
		  border:1px solid #eee;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          overflow: hidden;
		  padding: 10px;
          transition: all 0.3s ease;
          img {
            margin: auto;
            width: 120px;
            height: 70px;
            // padding-top: 10px;
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
          .r-wap {
            width: 100%;
            height: 100%;
            // padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
            p{
				font-size: 16px;
				line-height: 20px;
				font-weight: 600;
			  padding: 10px;
			  overflow:hidden;
			  text-overflow:ellipsis;
			  white-space:nowrap;
			}
			.text{
				margin: 5px 0;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size: 14px;
			}
			.pStatus{
				height: 18px;
				line-height: 16px;
				font-size: 12px;
				border: 1px solid gray;
				padding: 1px 3px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border-radius: 20px;
				margin: 5px 0;
				width: 60px;
				text-align: center;
			}
			.ing{
			  //进行中
			  color:red !important;
			  border-color:red !important;
			}
			.nowPrice{
				color:red;
			}
			  .codeCharge{
				  font-size: 14px;
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
			  display:-webkit-box;
			  -webkit-box-orient:vertical;
			  -webkit-line-clamp:2;
			  line-height: 19px;
			  height: 38px;
			   font-weight: normal;
				padding: 0 10px;
			}
            .img {
              display: flex;
              img {
                width: 100%;
                height: 180px;
                margin: auto;
                transition: all 0.5s ease;
              }
            }
          }
        }
      }
    }
    .right-content2 {
      margin-left: 10px;
      flex: 1;
      box-sizing: border-box;
      min-height: 320px;
      max-height: 320px;
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
        // border-top: 1px solid #09f;
		.r-item:hover {
			border: 1px solid #0094E7;
			padding: 0 6px;
		}
        .r-item {
          width: 270px;
          height: 310px;
		  margin: 0 10px;
		  border: 1px solid #eee;
		  padding: 0 10px;
		  // padding-bottom: 20px;
		  // border-radius: 10px;
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
            // padding-top: 10px;
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
          .r-wap {
            width: 100%;
            height: 100%;
            // padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
			position: relative;
			.mesgItem{
			  font-size: 13px;
			  overflow:hidden;
			  text-overflow:ellipsis;
			  white-space:nowrap;/*不换行*/
			  line-height: 19px;
			  font-weight: normal;
			  padding: 5px 0;
			  .pStatus{
				  height: 15px;
				  line-height: 15px;
				  font-size: 13px;
				  border: 1px solid grey;
				  padding: 1px 4px;
				  -webkit-box-sizing: border-box;
				  box-sizing: border-box;
				  border-radius: 19px;
				  margin-right: 10px;
			  }
			  .ing{
				  color: red!important;
				  border-color: red!important;
			  }
			}
			.list-box-names{
					font-size: 14px;
					font-weight: bold;
			      line-height: 23px;
				}
            p{
				font-size: 16px;
				line-height: 20px;
				font-weight: 600;
			  overflow:hidden;
			  text-overflow:ellipsis;
			  white-space:nowrap;
			}
			.list-box-p{
				padding: 10px;
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
            .img {
              display: flex;
              img {
                width: 100%;
                height: 180px;
                margin: auto;
                transition: all 0.5s ease;
              }
            }
          }
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
</style>
