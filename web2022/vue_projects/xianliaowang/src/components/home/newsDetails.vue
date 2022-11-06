<template>
  <div class="news-details">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:;" @click="onBack">返回上一页</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="n-title">
      <p>{{html.title}}</p>
      <p class="n-msg">
        发布时间：
        <span>{{html.createdTime}}</span>
      </p>
    </div>
    <div class="html" v-html="html.content"></div>
  </div>
</template>

<script>
export default {
  name: "newsDetails",
  data() {
    return {
      html: {}
    };
  },
  mounted() {
    this.getNewInfo();
  },
  methods: {
    // 获取详情
    getNewInfo() {
      this.$http.get(`/pc/news/getInfor/${this.$route.query.id}`).then(res => {
        
        this.html = res.data.data.newsData;
      });
    },

    // 返回上一页
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.news-details {
  width: 1200px;
  margin: 20px auto;
  border: 1px solid #e8e8e8;
  padding: 15px;
  box-sizing: border-box;
  .n-title {
    text-align: center;
    font-size: 20px;
    margin: 15px;
    border-bottom: 1px solid #e8e8e8;
    .n-msg {
      padding: 15px;
      font-size: 14px;
      span {
        color: red;
      }
    }
  }
  .el-breadcrumb /deep/ a {
    cursor: pointer;
    &:hover {
      cursor: pointer;
      color: #09f;
    }
  }
  .html /deep/ h1,
  .html /deep/ h2,
  .html /deep/ h3,
  .html /deep/ h4,
  .html /deep/ h5,
  .html /deep/ h6 {
    line-height: 30px;
  }
  .html /deep/ p {
    line-height: 30px;
    font-size: 16px;
    text-align: center;
  }
  .html /deep/ div {
    margin: auto;
    display: flex;
    img {
      margin: auto;
      padding: 20px 0;
    }
  }
  .html /deep/ img {
    width: 100%;
  }
}
</style>


