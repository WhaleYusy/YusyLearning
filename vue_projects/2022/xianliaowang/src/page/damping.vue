<template>
  <div class="about-warp">
    <div class="d-title">
      涂层电阻
      <span>Damping name</span>
    </div>
    <div class="about">
      <div class="a-right">
        <div class="a-r-content" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "damping",
  data() {
    return {
      rightTitleText: "涂层电阻",
      html: ""
    };
  },
  mounted() {
    this.getAboutMenu();
  },
  methods: {
    // 获取关于菜单列表
    getAboutMenu() {
      this.$http.get("/pc/resistor/getResistorInfo").then(res => {
        this.html = res.data.data.resistor.detail;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.about-warp {
  background: white;
  overflow: hidden;
  min-height: 300px;
  .d-title {
    width: 1200px;
    font-size: 20px;
    margin: 30px auto 30px;
    color: #09f;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    span {
      font-size: 13px;
      padding-left: 10px;
      color: #e8e8e8;
    }
  }
  .about {
    width: 1200px;
    margin: auto;
    box-sizing: border-box;
    .a-right {
      width: 1200px;
      float: right;
      margin-left: 25px;
      background: #f5f5f5;
      border-radius: 3px;
      margin-bottom: 20px;
      .a-r-title {
        height: 50px;
        border-bottom: 1px dashed #e8e8e8;
        font-size: 15px;
        color: gray;
        line-height: 50px;
        padding: 0 20px;
      }
      .a-r-content {
        padding: 20px;
      }
    }
  }
}
.a-r-content /deep/ p,
.a-r-content /deep/ span,
.a-r-content /deep/ a {
  font-size: 15px;
  line-height: 35px;
  word-break: break-all;
  text-align:center;
}
.a-r-content /deep/ a:hover {
  color: #09f !important;
}
.a-r-content /deep/ li {
  font-size: 14px;
  line-height: 35px;
  word-break: break-all;
}
.a-r-content /deep/ img {
  max-width: 100%;
}
</style>

