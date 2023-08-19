<template>
  <div class="indexbig">
    <div class="mall_home_indedx">
      <!-- leftList -->
      <div class="mall_home_indedx_rightContent">
        <div class="mall_home_indedx_rightContent_swiper_blocks">
          <div class="swiper">
            <div class="swiper-container" id="target-swiper">
              <!-- id="target-swiper"-->
              <div class="swiper-wrapper">

                  <!-- <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
                      <img :src="item.imgUrl"  />
                  </div> -->
                  <div class="swiper-slide" >
                      <img src="../../../img/sb1.jpg" alt />
                  </div>
                  <div class="swiper-slide" >
                      <img src="../../../img/sb2.jpg" alt />
                  </div>
                  <div class="swiper-slide" >
                      <img src="../../../img/sb3.jpg" alt />
                  </div>
                  <div class="swiper-slide" >
                      <img src="../../../img/sb4.jpg" alt />
                  </div>
                  <!-- @click="goToUrl(item.toUrl)" -->
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
              <!-- Add Arrows
              -->
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="blocks">
            <div class="block_item">
              <div class="bocast_news_title">
                <span @click="displayWitch('bocast')" ref="bocast" :class="{'link':bocast}">公告</span>
                <span  @click="displayWitch('news')" ref="news" :class="{'link':news}">新闻</span>
                <i class="more">更多&gt;</i>
              </div>
              <div class="bocast_content " v-show="bocast">
                <div class="bocast_content_item"><i class="fa fa-play"></i><p>2019年1季度被动元器件行情郭台铭卸任，鸿海的芯片故事刚</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p>2019年1季度被动元器件行情郭台铭卸任，鸿海的芯片故事刚</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p>2019年1季度被动元器件行情郭台铭卸任，鸿海的芯片故事刚</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p>2019年1季度被动元器件行情郭台铭卸任，鸿海的芯片故事刚</p></div>
              </div>
              <div class="news_content " v-show="news">
                <div class="bocast_content_item"><i class="fa fa-play"></i><p> 元器件电商，“平凡之路”还是“配角上位”？【模拟电路】差动放大器</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p> 元器件电商，“平凡之路”还是“配角上位”？【模拟电路】差动放大器</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p> 元器件电商，“平凡之路”还是“配角上位”？【模拟电路】差动放大器</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p> 元器件电商，“平凡之路”还是“配角上位”？【模拟电路】差动放大器</p></div>
                <div class="bocast_content_item"><i class="fa fa-play"></i><p> 元器件电商，“平凡之路”还是“配角上位”？【模拟电路】差动放大器</p></div>
              </div>
            </div>
            <div class="block_item1">
              <div class="block_item1_entrance_item" style="background:orange">
                <div class="block_item1_entrance_item_title">
                  <div class="title">积分商城</div>
                  <i class="fa fa-list-alt"></i>
                </div>
                <div class="block_item1_entrance_item_content">
                  <div class="content">兑换京东E卡等</div>
                </div>
              </div>
              <div class="block_item1_entrance_item" style="background:#0094e7">
                <div class="block_item1_entrance_item_title">
                  <div class="title">积分商城</div>
                  <i class="fa fa-list-alt"></i>
                </div>
                <div class="block_item1_entrance_item_content">
                  <div class="content">兑换京东E卡等</div>
                </div>
              </div>
              <div class="block_item1_entrance_item" style="background:purple">
                <div class="block_item1_entrance_item_title">
                  <div class="title">积分商城</div>
                  <i class="fa fa-list-alt"></i>
                </div>
                <div class="block_item1_entrance_item_content">
                  <div class="content">兑换京东E卡等</div>
                </div>
              </div>
              <div class="block_item1_entrance_item" style="background:lightgreen">
                <div class="block_item1_entrance_item_title">
                  <div class="title">积分商城</div>
                  <i class="fa fa-list-alt"></i>
                </div>
                <div class="block_item1_entrance_item_content">
                  <div class="content">兑换京东E卡等</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mall_home_indedx_rightContent_bottom_blocks">
          <div class="mall_home_indedx_rightContent_bottom_blocks_item">
            <el-carousel height="200px"
            :autoplay='false' 
            >
              <el-carousel-item v-for="(item,index) in 4" :key="index"><!--swiperList1-->
                <!-- <img :src="item.imgUrl" alt /> -->
                <div class="toptitle"><span class="title">新品推荐</span><span class="more grayWord">更多推荐>></span></div>
                <div class="bottomContent">
                  <div class="leftImg"><img src="../../../img/cb1.png" alt /></div>
                  <div class="rightBlock">
                    <div class="rightBlockTitle">扬兴 晶体谐振器(SMD)YSX211S</div>
                    <div class="rightBlockText">扬兴贴片晶体谐振器(SMD)采用陶瓷焊缝工艺制作，具有高精度、高频率稳定性、可靠性等特点，在使用过程中低</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="mall_home_indedx_rightContent_bottom_blocks_item">
            <el-carousel height="200px"
            :autoplay='false' 
            >
              <el-carousel-item v-for="(item,index) in 4" :key="index"><!--swiperList1-->
                <!-- <img :src="item.imgUrl" alt /> -->
                <div class="toptitle"><span class="title">新品推荐</span><span class="more grayWord">更多推荐>></span></div>
                <div class="bottomContent">
                  <div class="leftImg"><img src="../../../img/cb1.png" alt /></div>
                  <div class="rightBlock">
                    <div class="rightBlockTitle">扬兴 晶体谐振器(SMD)YSX211S</div>
                    <div class="rightBlockText">扬兴贴片晶体谐振器(SMD)采用陶瓷焊缝工艺制作，具有高精度、高频率稳定性、可靠性等特点，在使用过程中低</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="mall_home_indedx_rightContent_bottom_blocks_item">
            <el-carousel height="200px"
            :autoplay='false' 
            >
              <el-carousel-item v-for="(item,index) in 4" :key="index"><!--swiperList1-->
                <!-- <img :src="item.imgUrl" alt /> -->
                <div class="toptitle"><span class="title">新品推荐</span><span class="more grayWord">更多推荐>></span></div>
                <div class="bottomContent">
                  <div class="leftImg"><img src="../../../img/cb1.png" alt /></div>
                  <div class="rightBlock">
                    <div class="rightBlockTitle">扬兴 晶体谐振器(SMD)YSX211S</div>
                    <div class="rightBlockText">扬兴贴片晶体谐振器(SMD)采用陶瓷焊缝工艺制作，具有高精度、高频率稳定性、可靠性等特点，在使用过程中低</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="mall_home_indedx_rightContent_bottom_blocks_item">
            <img src="../../../img/cb3.png" alt /> 
          </div>
        </div>
        <!-- 轮播图 -->
        <!-- <swiper /> -->
        <!-- <div class="> -->
      </div>
    </div>
  </div>
</template>
<script>
// import Swiper from './首页轮播/swiper.vue'; 
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
// import SwiperOne from './首页轮播/swiperItem1.vue'; 
// import SwiperTwo from './首页轮播/swiperItem1.vue'; 
// import SwiperThree from './首页轮播/swiperItem1.vue'; 
export default {
  data(){
    return {
      bocast:true,
      news:false,
      swiperList:[
        {imgUrl:'https://alimg.szlcsc.com/upload/public/index/source/20190622/B41F7DC7BEDB9B2253FAD9CB7A920854.jpg'},
        {imgUrl:'https://alimg.szlcsc.com/upload/public/index/source/20190424/CD06FB8FA6D915467FBD2363EAD7CF12.jpg'},
        {imgUrl:'https://alimg.szlcsc.com/upload/public/index/source/20190621/6DE441F798F140F8C9B257E70B1AD6C0.jpg'},
        {imgUrl:'https://alimg.szlcsc.com/upload/public/index/source/20190626/1E01DA86854967AA635272CDDB8DD0FC.jpg'},
        //https://alimg.szlcsc.com/upload/public/index/source/20190626/1E01DA86854967AA635272CDDB8DD0FC.jpg
      ],
      swiperList1:[
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3332415702,2548684282&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
      ],
      swiperList2:[
        {imgUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=201130600,3896558622&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
      ],
      swiperList3:[
        {imgUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3131660392,319328923&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
        {imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=27&gp=0.jpg'},
      ],
    }
  },
  mounted(){
    this.initSwiper1()
    this.initSwiper2()
    this.initSwiper3()
    this.initSwiper4()
  },
  methods:{
    displayWitch(what){
      if(what == 'bocast'){
        this.news = false;
        this.bocast = true;
      }else if(what == 'news'){
        this.bocast = false
        this.news = true
      }
    },
    initSwiper1 () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('#target-swiper', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 5000
        },
        loop: true,
        noSwiping: true,
        pagination: {
          el: '.swiper-pagination1',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true
      })
    },
    initSwiper2 () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('#target-swiper2', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 5500
        },
        loop: true,
        noSwiping: true,
        pagination: {
          el: '.swiper-pagination1',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true
      })
    },
    initSwiper3 () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('#target-swiper3', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 6000
        },
        loop: true,
        noSwiping: true,
        pagination: {
          el: '.swiper-pagination1',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true
      })
    },
    initSwiper4 () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('#target-swiper4', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 6500
        },
        loop: true,
        noSwiping: true,
        pagination: {
          el: '.swiper-pagination1',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true
      })
    },
  },
  components:{
    // Swiper,SwiperOne,SwiperThree,SwiperTwo,
  }
}
</script>
<style lang="scss" scoped>
  .mall_home_indedx{
    margin:0 auto;
    width:1200px;
    min-height:700px;
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
    .mall_home_indedx_rightContent{
      margin-left:230px;
      margin-top:10px;
      // margin-right:10px;
      width: 970px;
      min-height:200px;
      .mall_home_indedx_rightContent_swiper_blocks{
        display:flex;
        justify-content: space-between;
        .swiper{
          width:70%;
          margin-right:20px;
          height:400px;
          position: relative;
          .swiper-container {
              width: 100%;
              height: 100%;
              background:none;
              margin:0;
          }
          .swiper-wrapper{
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
          .swiper-slide img{
              width:100%;
              height:100%;
          }
        }
        .blocks{
          width:27%;
          min-height:100px;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          .block_item{
            height:180px;
            // min-width:300px;
            border:1px solid lightgray;
            .bocast_news_title{
              margin-top:10px;
              margin-bottom:10px;
              font-size:16px;
              padding-bottom:5px;
              box-sizing: border-box;
              cursor: pointer;
              span{
                margin-left:20px;
              }
              i{
                font-size:14px;
                margin-left:40%;
                color:gray;
              }
            }
            .bocast_content{
              padding:0 10px;
              box-sizing:border-box;
              .bocast_content_item{
                display:flex;
                align-items: center;
                i{
                  font-size:12px;
                  width:30px;
                  color:lightgray;
                }
                p{
                  margin-left:5px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-top:7px;
                }
              }
              .bocast_content_item:hover{
                color:#0094e7;
                cursor: pointer;
              }
            }
            .news_content{
              min-height:100px;
              width:100%;
              padding:0 10px;
              box-sizing:border-box;
              .bocast_content_item{
                display:flex;
                align-items: center;
                i{
                  font-size:12px;
                  width:40px;
                  color:lightgray;
                }
                p{
                  margin-left:5px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-top:7px;
                }
              }
              .bocast_content_item:hover{
                color:#0094e7;
                cursor: pointer;
              }
            }
            .link{
              border-bottom:5px solid #0094e7;
              color:#0094e7;
            }
            .bocast_news_title span:hover{
              color:#0094e7;
            }
            .bocast_news_title .more:hover{
              color:#0094e7;
            }
          }
          .block_item1{
            width:100%;
            height:200px;
            display:flex;
            justify-content: space-between;
            flex-direction: column;
            flex-wrap: wrap;
            .block_item1_entrance_item{
              width:49.5%;
              height:99.5px;
              // background:pink;
              color:white;
              display:flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .block_item1_entrance_item_title{
                margin-bottom:10px;
                font-size:14px;
                display:flex;
                i{
                  margin-left:10px;
                  font-size:16px;
                }
              }
              .block_item1_entrance_item_content{
                font-size:12px;
              }
            }
          }
        }
      }
      //标记
      .mall_home_indedx_rightContent_bottom_blocks{
        width:100%;
        margin-top:10px;
        min-height:100px;
        display:flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .mall_home_indedx_rightContent_bottom_blocks_item{
          width:49%;
          height:200px;
          margin-bottom:15px;
          border:1px solid lightgray;
          position: relative;
          img{
            width:100%;
            height:100%;
          }
          .swiper-container {
            width: 100%;
            height: 100%;
            background:none;
            margin:0;
          }
          .swiper-wrapper{
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
          .swiper-slide img{
              width:100%;
              height:100%;
          }
          .el-carousel__item {
            padding:20px;
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            .toptitle{
              display:flex;
              justify-content: space-between;
              height:30px;
              align-items: center;
              .title{
                font-size:14px;
                color:#0094e7;
                font-weight:bold;
                // overflow: hidden;
                // white-space: nowrap;
                // text-overflow: ellipsis;
              }
              .more{
                color:gray;
              }
              .more:hover{
                color:#0094e7;
                cursor: pointer;
              }
            }
            .bottomContent{
              height:200px;
              display:flex;
              align-items: center;
              .leftImg{
                margin-right:20px;
                img{
                  width:144px;
                  height:96px;
                }
              }
              .rightBlock{
                  display:flex;
                  height:60%;
                  line-height:18px;
                  flex-direction: column;
                  justify-content: space-between;
                  .rightBlockTitle{
                    font-weight:bold;
                  }
                  .rightBlockText{
                    
                    // overflow: hidden;
                    // white-space: nowrap;
                    // text-overflow: ellipsis;
                  }
              }
            }
          }
        }
        ///标记
      }
    }
  }
  
</style>
