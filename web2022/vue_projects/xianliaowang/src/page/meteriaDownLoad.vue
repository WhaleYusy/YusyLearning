<template>
  <div class="downLoad">
    <div class="d-title">
      品牌
      <span>Brand name</span>
    </div>
    <div class="d-warp">
      <div class="d-left">
        <div
          class="f-item"
          v-for="(v,k) in leftNavList"
          :key="k"
          :class="active == k ? 'active' : ''"
          @click="onLeftNavClick(v,k)"
        >{{v.name}}</div>
        <div class="no-nore" v-if="leftNavList.length <= 0">暂无数据</div>
      </div>
      <div class="d-right">
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column prop="fileName" label="文件名" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tag
                type="success"
                @click="handleDownload(scope.row, scope.$index)"
                style="cursor: pointer;"
              >下载</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "downLoad",
  data() {
    return {
      leftNavList: [],
      active: 0,
      tableData: [],
      currentPage: 0,
      tableParam: {
        pageNum: 0,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    // 获取品牌名称
    getName() {
      this.$http.get("/pc/download/getName").then(res => {
        this.leftNavList = res.data.data.bandData;
        this.getByName(res.data.data.bandData[0].name);
      });
    },

    // 根据品牌名称获取产品下载列表
    getByName(name) {
      this.$http
        .post(`/pc/download/getByName/`, {
          name,
          pageNum: this.tableParam.pageNum,
          pageSize: this.tableParam.pageSize
        })
        .then(res => {
          //判断是否登录了的（没有登录则导航到登录页面）
          this.$http.judgeIfLogin(res, this);
          this.tableData = res.data.data.data;
        });
    },

    // 左侧导航点击
    onLeftNavClick(data, index) {
      this.active = index;
      this.getByName(data.name);
    },

    // 表格下载按钮
    handleDownload(data, index) {
      let ele = document.createElement("form");
      ele.setAttribute("method", "get");
      ele.setAttribute(
        "action",
        `http://mapi.qzdcloud.com/pc/download/${data.id}`
      );
      document.documentElement.appendChild(ele);
      ele.submit();
    }
  }
};
</script>
<style scoped lang="scss">
.downLoad {
  margin: 20px auto;
  width: 1200px;
  .d-title {
    font-size: 20px;
    margin: 30px 0 30px;
    color: #09f;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    span {
      font-size: 13px;
      padding-left: 10px;
      color: #e8e8e8;
    }
  }
  .d-warp {
    display: flex;
    box-sizing: border-box;
    .d-left {
      flex-basis: 230px;
      box-sizing: border-box;
      .f-item {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e8e8e8;
        border-bottom: 1px solid transparent;
        padding: 0 10px;
        cursor: pointer;
        &:last-of-type {
          border-bottom: 1px solid #e8e8e8;
        }
      }
      .no-nore {
        text-align: center;
        padding: 50px 0;
        color: gray;
      }
      .active {
        background: #e3f1fe;
        // border-bottom: 1px solid #09f !important;
        border-radius: 2px;
      }
    }
    .d-right {
      flex: 1;
      margin-left: 20px;
      .el-icon-download {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #09f;
        }
      }
      .d-pagination {
        text-align: right;
        padding: 20px 0;
      }
    }
  }
}
</style>
