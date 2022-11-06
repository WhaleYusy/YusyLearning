<template>
  <div class="history">
    <div class="h-nav">
      <div class="h-label" :class="{'l-active' : active == 0}" @click="onNavClick(0)">搜索历史</div>
      <span>|</span>
      <div class="h-label" :class="{'l-active' : active == 1}" @click="onNavClick(1)">商品浏览历史</div>
    </div>
    <div class="h-warp">
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      currentPage: () => import("./historySearch.vue")
    };
  },
  methods: {
    // 导航切换
    onNavClick(index) {
      this.active = index;
      switch (Number.parseInt(index)) {
        case 0:
          this.currentPage = () => import("./historySearch.vue");
          break;
        case 1:
          this.currentPage = () => import("./historyGoods.vue");
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.history {
  width: 100%;
  .h-nav {
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    .h-label {
      height: 46px;
      border-bottom: 2px solid transparent;
      padding: 0 30px;
      line-height: 46px;
      cursor: pointer;
    }
    .l-active {
      border-bottom: 2px solid #09f;
      color: #09f;
    }
    span {
      padding: 0 15px;
      color: #cccccc;
    }
  }
  .h-warp {
    width: 100%;
    min-height: 600px;
  }
}
</style>


