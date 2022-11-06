<template>
  <div class="mall_home_index_swiper">
    <div class="swiper-container" id="target-swiper">
        <!-- id="target-swiper"-->
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
                <img :src="item.imgUrl"  />
            </div>
            <!-- @click="goToUrl(item.toUrl)" -->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        -->
    </div>
  </div>
</template>
