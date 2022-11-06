<template>
  <div class="mall_home_index_swiper3">
    <div class="swiper-container" id="target-swiper3">
        <!-- id="target-swiper"-->
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
                <img :src="item.imgUrl"  />
            </div>
            <!-- @click="goToUrl(item.toUrl)" -->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows-->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
export default {
  data (){
    return {
      swiperList:[
        {imgUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1858044644.jpg'},
        {imgUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1858044644.jpg'},
        {imgUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1858044644.jpg'},
        {imgUrl:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1858044644.jpg'},
      ]
    }
  },
  mounted(){
    this.initSwiper();
  },
  methods:{
     initSwiper () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 5000
        },
        loop: true,
        noSwiping: true,
        pagination: {
          el: '.swiper-pagination',
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

}
</script>
<style scoped>
  *{
        margin:0;
        padding:0;
    }
    html, body {
        position: relative;
    }
    body {
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color:#000;
        margin: 0;
        padding: 0;
    }
    .swiper-container {
        width: 700px;
        height: 400px;
        min-height:400px;
        background:none;
        margin:0;
    }
    .swiper-wrapper{
        width: 700px;
        height: 400px;
    }
    .swiper-slide {
       width: 700px;
        height: 400px;
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .swiper-slide img{
        width:100%;
        height:100%;
    }
</style>
