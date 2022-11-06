<template>
  <div class="moreNews_box">
    <div class="m-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/index' }">
          <a href="javascript:;">{{$route.query.type == 1 ? '商城公告' : '商城新闻'}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-content">
      <div
        class="box"
        v-for="(v,k) in moreNewsList"
        :key="k"
        @click="$router.push({path: '/home/newsDetails', query: {id: v.id, type: $route.query.type}})"
      >
        <div class="left">
          <i class="el-icon-caret-right"></i>
          {{v.title}}
          <img :src="v.img" />
        </div>
        <div class="right">{{v.createdTime}}</div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="param.pageNum"
          :page-sizes="[10, 20]"
          :page-size="param.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moreNewsList: [],
      param: {
        pageNum: 1,
        pageSize: 10,
        type: this.$route.query.type
      },
      total: 0
    };
  },
  created() {
    this.getFalseMoreNewsList();
  },
  methods: {
    // 新闻列表
    getFalseMoreNewsList() {
      this.$http.post("/pc/news/getNewsPage", { ...this.param }).then(res => {
        //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res,this);
        this.moreNewsList = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },

    // 分页
    handleSizeChange(val) {
      this.param.pageSize = val;
      this.getFalseMoreNewsList();
    },
    handleCurrentChange(val) {
      this.param.pageNum = val;
      this.getFalseMoreNewsList();
    }
  }
};
</script>

<style scoped lang="scss">
.moreNews_box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  .m-content {
    border: 1px solid #e8e8e8;
    margin: 20px 0;
    .box {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      padding: 0px 15px;
      .left {
        display: flex;
        align-items: center;
        img {
          padding-left: 10px;
          margin: auto;
        }
      }
      &:nth-of-type(2n) {
        background: #f5f5f5;
      }
      &:hover {
        color: #09f;
        cursor: pointer;
      }
    }
    .pagination {
      padding: 15px 10px;
      text-align: right;
    }
  }
  .el-breadcrumb /deep/ a {
    cursor: pointer;
    &:hover {
      cursor: pointer;
      color: #09f;
    }
  }
}
</style>

