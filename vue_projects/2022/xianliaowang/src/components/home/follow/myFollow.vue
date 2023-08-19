<template>
  <div class="my-follow">
    <div class="breadcrumb">首页 > {{followText}}</div>
    <div class="m-content">
      <div class="m-title-msg">
        <i class="el-icon-warning-outline"></i>
        “我的关注”是为您量身订制的商品目录，在这里您可以方便快捷的找物料，看行情，查消息。 请
        <span @click="$router.push('/login')">登录</span> 后查看！
      </div>
      <div class="m-nav">
        <div
          class="n-flex"
          v-for="(v,k) in navList"
          :key="k"
          :class="active == k ? 'm-active' : ''"
          @click="onNavClick(v,k)"
        >
          <i class="el-icon-warning-outline"></i>
          {{v.label}}
        </div>
      </div>
      <div class="page">
        <component :is="targetPage"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      followText: "我的关注",
      active: 0,
      navList: [
        { label: "关注型号" },
        { label: "行情指数" },
        { label: "历史记录" },
        { label: "消息中心" }
      ],
      targetPage: () => import("./component/follow")
    };
  },
  methods: {
    // 导航点击
    onNavClick(data, idnex) {
      this.active = idnex;
      this.followText = data.label;
      switch (Number.parseInt(idnex)) {
        case 0:
          this.targetPage = () => import("./component/follow");
          break;
        case 1:
          this.targetPage = () => import("./component/quotation");
          break;
        case 2:
          this.targetPage = () => import("./component/history");
          break;
        case 3:
          this.targetPage = () => import("./component/news");
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-follow {
  width: 1200px;
  margin: auto;
  font-size: 14px;
  .breadcrumb {
    padding: 20px 0;
    font-size: 14px;
  }
  .m-content {
    border: 1px solid #e8e8e8;
    margin-bottom: 20px;
    .m-title-msg {
      height: 40px;
      background: #fffbd8;
      line-height: 40px;
      padding: 0 15px;
      i {
        color: orange;
        font-size: 16px;
      }
      span {
        color: orange;
        cursor: pointer;
      }
    }
    .m-nav {
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      background: #f5f5f5;
      .n-flex {
        border-bottom: 1px solid #e8e8e8;
        border-left: 1px solid #e8e8e8;
        border-top: 1px solid #e8e8e8;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: gray;
        cursor: pointer;
        i {
          margin-right: 10px;
          font-size: 30px;
        }
        &:first-of-type {
          border-left: 1px solid transparent;
        }
        &:hover {
          color: #09f;
        }
      }
      .m-active {
        border-top: 1px solid #e8e8e8;
        border-left: 1px solid white;
        border-bottom: 1px solid transparent;
        background: white;
        color: #09f;
      }
    }
    .page {
      width: 100%;
      padding: 20px 10px;
      box-sizing: border-box;
      min-height: 600px;
    }
  }
}
</style>


