<template>
  <div class="about-warp">
    <div class="about">
      <div class="a-left">
        <div class="a-l-title">关于闲料</div>
        <div class="a-l-content">
          <div
            class="a-l-item"
            :class="letNavAcrive == k ? 'is-active' : ''"
            v-for="(v,k) in letNavList"
            :key="k"
            @click="onLeftNavClick(v,k)"
          >{{v.name}}</div>
        </div>
      </div>
      <!-- <div class="a-right">
        <div class="a-r-title">{{rightTitleText}}</div>
        <div class="a-r-content" v-html="html"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      letNavList: [],
      letNavAcrive: 0,
      rightTitleText: "关于我们",
      html: ""
    };
  },
  mounted() {
    this.getAboutMenu();
  },
  methods: {
    // 根据id获取详情
    getByIdDetails(id) {
      this.$http.get(`/pc/about/getById/${id}`).then(res => {
        this.html = res.data.data.aboutData.content;
      });
    },

    // 获取关于菜单列表
    getAboutMenu() {
      this.$http.get("/pc/about/getAboutMenu").then(res => {
        this.letNavList = res.data.data.aboutMenuData;
        this.html = res.data.data.aboutMenuData[0].content;
        this.rightTitleText = res.data.data.aboutMenuData[0].name;
      });
    },

    // 左侧导航点击
    onLeftNavClick(data, index) {
      this.letNavAcrive = index;
      this.rightTitleText = data.name;
      this.getByIdDetails(data.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.about-warp {
  background: #f5f5f5;
  overflow: hidden;
  min-height: 300px;
  .about {
    width: 1200px;
    padding: 20px 0;
    margin: auto;
    box-sizing: border-box;
    .a-left {
      width: 220px;
      box-sizing: border-box;
      background: white;
      border-radius: 3px;
      float: left;
      margin-bottom: 20px;
      .a-l-title {
        height: 50px;
        border-bottom: 1px dashed #e8e8e8;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
        padding: 0 20px;
      }
      .a-l-content {
        .a-l-item {
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          padding: 0 20px;
          cursor: pointer;
          &:hover {
            color: #09f;
          }
        }
        .is-active {
          background: #e1f4ff;
          color: #09f;
        }
      }
    }
    .a-right {
      width: 955px;
      float: right;
      margin-left: 25px;
      background: white;
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
  width: 100%;
}
</style>

